---
title: System Design Interview Practicum
tags: ["system-design", "interview", "api-design", "database-design", "data-structures"]
difficulty: intermediate
estimated_time: 25 min
last_reviewed: 2026-04-18
---

# System Design Interview Practicum

System design 面试的实战关键，不是把组件名堆满，而是能把每类题拆成三件事：API 怎么设计、database/source of truth 怎么设计、核心 data structure / index 怎么支撑访问模式。

一个很稳的答题顺序是：

- 先澄清核心功能和非功能约束。
- 再定义 API，说明用户和系统怎么交互。
- 再定义数据模型，明确 source of truth。
- 再定义核心索引、缓存 key、队列 topic、内存结构。
- 最后讲 scale、failure、consistency 和 trade-off。

## 通用实战模板

### 1. Clarify Requirements

先问：

- 是读多还是写多？
- 是否需要强一致？
- 是否需要低延迟？
- 是否有搜索、排序、推荐、聚合？
- 数据保留多久？
- 峰值流量和平均流量差多少？
- 是否跨地域？

### 2. API Design

API 不要写太多，先覆盖主链路。

常见 API 类型：

- create：创建资源。
- read：按 id 或条件读取资源。
- update：更新状态。
- list/search：列表、分页、搜索。
- action：触发业务动作，比如 send、book、pay。
- webhook/event：异步回调或事件入口。

每个 API 至少说明：

- request fields
- response fields
- idempotency key
- auth / rate limit
- pagination
- error semantics

### 3. Database Design

先定义 source of truth，再定义 query path。

常见表/集合：

- user / account
- core business object
- event / audit log
- status transition
- metadata
- relationship table
- idempotency table

每张表至少说明：

- primary key
- secondary index
- unique constraint
- partition key
- retention policy
- consistency requirement

### 4. Data Structure Design

面试里说 data structure，不只是 LeetCode 结构，也包括系统里的索引、缓存 key、队列分区和内存状态。

常见结构：

- HashMap：id -> object，cache lookup，dedupe。
- Set / Bloom filter：existence check，反滥用，去重。
- Heap / priority queue：Top K，调度，延迟任务。
- Trie / inverted index：搜索、前缀匹配、全文检索。
- Graph adjacency list：关注关系、推荐、路由。
- Time-ordered log：消息、审计、事件流。
- LRU / TTL cache：热点对象和过期策略。
- Consistent hashing：分片和节点扩缩容。

## 题型 1：URL Shortener

核心问题：读多写少、低延迟跳转、短码唯一、热点短链、滥用治理。

API：

- `POST /links`：创建短链。字段：longUrl、customAlias、expireAt、idempotencyKey。
- `GET /{shortCode}`：跳转到 longUrl。
- `GET /links/{id}/stats`：查看点击统计。
- `DELETE /links/{id}`：禁用或删除短链。

Database：

- `short_links(id, short_code, long_url, owner_id, status, expire_at, created_at)`
- unique index on `short_code`
- index on `owner_id, created_at`
- `click_events(short_code, user_agent, ip_hash, referrer, created_at)` 可以异步写入
- source of truth 是 short_links，统计事件可以走 append-only log

Data structures：

- HashMap / cache：`shortCode -> longUrl`
- Bloom filter：快速过滤明显不存在的 shortCode，降低 cache penetration
- Counter / time bucket：点击统计按分钟/小时聚合
- LRU cache：热点短链

Trade-off：

- 更短的 code 会增加冲突概率和协调成本。
- 同步统计会拉高跳转延迟，通常应异步。
- 搜索/分析不应该影响 redirect path。

## 题型 2：Chat System

核心问题：实时连接、消息顺序、多端同步、离线补拉、群聊 fanout、重复消息。

API：

- `POST /conversations`：创建会话。
- `POST /conversations/{id}/messages`：发送消息，带 clientMessageId。
- `GET /conversations/{id}/messages?cursor=`：拉历史消息。
- `POST /messages/{id}/read`：标记已读。
- WebSocket：`message.new`、`message.ack`、`presence.update`。

Database：

- `conversations(id, type, created_at)`
- `conversation_members(conversation_id, user_id, role, joined_at, last_read_message_id)`
- `messages(conversation_id, message_id, sender_id, body, created_at, client_message_id)`
- primary key 可以是 `(conversation_id, message_id)`
- index on `user_id` for inbox / membership
- unique index on `(sender_id, client_message_id)` 做幂等

Data structures：

- Append-only log：每个 conversation 的 message stream
- HashMap：connectionId -> userId，userId -> active connections
- Queue：fanout jobs
- Ordered cursor：message_id / timestamp cursor
- Set：在线用户和会话成员

Trade-off：

- 大群 fanout-on-write 延迟高但读快；fanout-on-read 写快但读复杂。
- 全局顺序很贵，通常只保证 conversation 内顺序。
- WebSocket 在线送达和持久化写入要分清，不能把 push success 当成 message committed。

## 题型 3：Notification System

核心问题：多渠道、异步发送、优先级、用户偏好、频控、重试、去重。

API：

- `POST /notifications`：创建通知请求。
- `GET /users/{id}/notifications`：站内信列表。
- `POST /notifications/{id}/ack`：已读/确认。
- webhook/callback：接收第三方渠道 delivery status。

Database：

- `notification_requests(id, user_id, type, priority, template_id, status, idempotency_key, created_at)`
- `notification_preferences(user_id, channel, enabled, quiet_hours)`
- `notification_deliveries(id, request_id, channel, status, retry_count, provider_message_id)`
- unique index on `idempotency_key`
- index on `user_id, created_at`

Data structures：

- Priority queue：高优先级事务通知优先发送
- Delay queue：失败重试和退避
- Dedup Set：防止同一事件重复通知
- Rate limiter token bucket：按用户/渠道频控
- Template map：templateId -> rendering config

Trade-off：

- 事务通知可靠性优先，营销通知频控和退订优先。
- 多渠道兜底能提升送达率，但会增加成本和打扰风险。
- 重试必须和幂等、去重一起设计。

## 题型 4：Search System

核心问题：索引构建、查询解析、召回、排序、过滤、新鲜度、分片。

API：

- `GET /search?q=&filters=&sort=&cursor=`
- `POST /documents`：写入或更新文档。
- `DELETE /documents/{id}`
- `POST /index/rebuild`：后台重建索引。

Database：

- source of truth 可以在 relational/document/object store
- search index 是 query path，不是交易真相
- `documents(id, owner_id, title, body, status, updated_at)`
- `index_jobs(document_id, operation, status, created_at)` 用于异步索引更新

Data structures：

- Inverted index：term -> document ids
- Trie：prefix / autocomplete
- Heap：Top K ranking
- Bitmap：filter by category/tag/status
- Segment files：不可变索引段 + merge
- Cache：query result cache / popular query cache

Trade-off：

- 更实时的索引刷新会增加写入成本和系统抖动。
- 更复杂排序会挤压 query latency budget。
- search engine 不应该承担 source of truth。

## 题型 5：Travel Booking / Expedia-like System

核心问题：搜索库存、报价、预订、支付、外部供应商、库存一致性、补偿。

API：

- `GET /search/hotels?city=&dateRange=&guests=`
- `GET /hotels/{id}/availability`
- `POST /bookings`：创建 booking intent。
- `POST /bookings/{id}/confirm`：确认并支付。
- `POST /supplier/webhooks`：供应商状态回调。

Database：

- `hotels(id, metadata, city, status)`
- `room_inventory(hotel_id, room_type, date, available_count, version)`
- `booking_intents(id, user_id, hotel_id, room_type, date_range, status, expires_at)`
- `payments(id, booking_id, status, amount, idempotency_key)`
- `booking_events(booking_id, event_type, payload, created_at)` 做审计

Data structures：

- Interval / date range index：按日期查库存
- Cache：hotel metadata 和热门搜索结果
- State machine：booking status transition
- Distributed lock / optimistic version：库存预占
- Queue：供应商确认、支付回调、补偿任务

Trade-off：

- 搜索结果可以最终一致，但 booking confirm 需要严格控制库存和支付状态。
- 供应商慢或失败时，要有 pending / expired / compensated 状态。
- 不要用单个分布式事务包住供应商、支付和库存，通常用 saga + compensation。

## 题型 6：File Storage System

核心问题：大文件上传、分块、元数据、权限、下载加速、去重、生命周期。

API：

- `POST /files/initiate-upload`
- `PUT /files/{id}/parts/{partNumber}`
- `POST /files/{id}/complete`
- `GET /files/{id}/download-url`
- `DELETE /files/{id}`

Database：

- `files(id, owner_id, bucket, object_key, size, checksum, status, created_at)`
- `file_parts(file_id, part_number, checksum, size, status)`
- `file_permissions(file_id, principal_id, permission)`
- object content 放 object store，metadata 放 relational/document store

Data structures：

- Multipart manifest：partNumber -> checksum/objectKey
- Merkle tree / checksum list：校验完整性
- ACL map：fileId -> principals
- CDN cache key：object path + version
- Reference count：去重和生命周期清理

Trade-off：

- 元数据和对象内容要分离。
- CDN 提升下载速度，但权限和过期 URL 要设计清楚。
- 去重节省存储，但会增加隐私、安全和引用计数复杂度。

## 题型 7：Recommendation System

核心问题：召回、排序、特征、反馈闭环、冷启动、延迟预算。

API：

- `GET /recommendations?userId=&context=`
- `POST /events`：曝光、点击、收藏、购买等反馈。
- `POST /models/{id}/deploy`
- `GET /experiments/{id}/metrics`

Database：

- `user_events(user_id, item_id, event_type, timestamp)`
- `items(id, metadata, category, status)`
- `user_features(user_id, feature_vector, updated_at)`
- `item_features(item_id, feature_vector, updated_at)`
- online feature store + offline warehouse

Data structures：

- Candidate set：多路召回结果集合
- Vector index：embedding nearest neighbors
- Heap：Top K ranking
- Feature map：user/item/context -> features
- Bloom filter / Set：过滤已看、已购买、黑名单
- Event log：行为反馈流

Trade-off：

- 更实时的特征提升效果，但增加延迟和一致性压力。
- 更复杂模型提升排序质量，但可能超出在线 latency budget。
- 推荐系统不能只讲模型，要讲数据链路、在线服务和反馈闭环。

## 题型 8：10 Million QPS System

核心问题：不是让数据库硬扛 1000 万 QPS，而是逐层削峰，把请求挡在便宜层。

API：

- 通常 API 很简单，重点是读路径。
- `GET /resource/{id}`
- `GET /feed`
- `GET /config`
- `POST /events` 异步写入行为事件。

Database：

- source of truth 只服务少量回源和后台更新
- read replicas / sharding 兜底
- precomputed tables / materialized views
- event log 用于异步统计和回放

Data structures：

- CDN cache key
- Multi-level cache：edge -> gateway -> local -> Redis
- Hot key replicas：热点 key 多副本
- Bloom filter：过滤不存在 key
- Token bucket：限流
- Consistent hashing：缓存分片

Trade-off：

- 高 QPS 题优先讲回源比例，不要直接讲 DB。
- 缓存越激进，越要说明新鲜度和失效策略。
- 热点、雪崩、穿透、击穿必须提前处理。

## 面试里的高分表达

- “I’ll first define the APIs because they force us to clarify the access pattern.”
- “The database schema should follow the write path and the query path, not the other way around.”
- “This index exists because this is the dominant read pattern.”
- “This table is the source of truth; the cache and search index are derived views.”
- “For this system, I would guarantee ordering only within this boundary, not globally.”
- “I would keep the first version simple, then add cache, queue, sharding, and search only when the bottleneck requires them.”

## 常见扣分点

- 只画组件，不写 API。
- 只说“用数据库”，不定义 source of truth、主键、索引和一致性。
- 只说“加缓存”，不讲 key、TTL、失效和回源保护。
- 只说“用消息队列”，不讲幂等、重试、顺序和 DLQ。
- 只讲 happy path，不讲失败状态和补偿。
- 数据结构只停留在 LeetCode，不会映射到系统里的 index、cache、queue、log。

## 相关

- [[How to Approach a System Design Interview]]
- [[System Design Offer-Level Playbook]]
- [[Database Choices]]
- [[API Gateway and Service Boundaries]]
- [[Data Partitioning and Sharding]]
- [[Caching]]
- [[Queues and Asynchronous Processing]]
