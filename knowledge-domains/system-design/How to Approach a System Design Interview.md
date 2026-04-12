---
title: How to Approach a System Design Interview
tags: ["system-design", "architecture"]
difficulty: intermediate
estimated_time: 5 min
last_reviewed: 2026-04-12
---

# How to Approach a System Design Interview

system design 面试最重要的是结构化表达，而不是背现成答案。

核心判断不是“答案里出现了多少组件”，而是你能不能把需求、数据、链路、瓶颈和 trade-off 串成一个可运营的系统。

一个稳定的回答顺序是：

1. clarify requirements
2. estimate scale
3. define APIs and core entities
4. draw high-level architecture
5. deep dive into bottlenecks
6. discuss trade-offs
7. cover reliability, monitoring, and security

## 1. Clarify Requirements

不要一上来画架构。先问清楚系统到底要支持什么。

通常要澄清：

- 核心用户是谁？
- 最重要的 2-3 个功能是什么？
- 哪些功能明确不做？
- 是读多写少，还是写多读少？
- 是否需要强一致、事务、顺序、实时性？
- 是否有地域、权限、安全、合规要求？

比如设计 URL shortener，核心功能是创建短链和跳转；analytics、custom alias、expiration、abuse detection 可以作为扩展。先收窄范围，后面才不会乱。

## 2. Estimate Scale

规模估算不是为了精确算数学题，而是为了推导架构压力。

重点估算：

- QPS / TPS。
- read/write ratio。
- storage size。
- bandwidth。
- peak vs average traffic。
- retention period。
- object size。

比如 10M DAU、每人每天 20 次读，就是 200M reads/day，平均约 2.3K QPS；如果峰值是平均 10 倍，就是 23K QPS。这个数字会影响是否需要 cache、CDN、sharding、queue。

## 3. Define APIs and Core Entities

API 帮你确定请求边界，核心实体帮你确定数据模型。

可以先写很简单的接口：

- `POST /short-links`
- `GET /{shortCode}`
- `GET /short-links/{id}/stats`

然后列核心实体：

- User
- ShortLink
- ClickEvent

这一步能自然引出 database choices、index、cache key、source of truth 和异步事件。

## 4. Draw High-Level Architecture

高层架构先画主路径，不要立刻堆所有组件。

一个常见结构是：

- client
- load balancer / API gateway
- stateless service
- cache
- primary database
- queue
- background workers
- search / analytics / object store as needed

讲图时要按请求流说：创建请求怎么写入，读取请求怎么命中缓存，缓存 miss 怎么回源，异步任务怎么处理，失败时怎么恢复。

## 5. Deep Dive into Bottlenecks

面试的关键通常在 deep dive。

根据题目选择 1-2 个最重要的瓶颈讲深：

- 高读流量：cache、CDN、hot key、cache breakdown。
- 高写流量：partitioning、queue、batching、idempotency。
- 大数据量：sharding、retention、cold storage、indexing。
- 搜索体验：search engine、ranking、index freshness。
- 强一致：transaction、locking、saga、reconciliation。
- 实时通信：connection management、fanout、presence、ordering。

不要平均用力。面试官更想看你能不能抓住这个系统最危险的地方。

## 6. Discuss Trade-offs

每个技术选择都要解释为什么，以及代价是什么。

比如：

- cache 降低 latency，但带来一致性和失效问题。
- queue 提升 throughput 和削峰能力，但带来最终一致性、重复消费和延迟。
- sharding 提升容量，但带来跨分片查询和迁移复杂度。
- search engine 提升检索体验，但不应该做 source of truth。
- multi-region 提高可用性，但带来复制延迟和冲突处理。

成熟的表达是：“我先选 A，因为当前瓶颈是 X；它的代价是 Y；如果规模继续增长或约束变成 Z，我会演进到 B。”

## 7. Cover Reliability, Monitoring, and Security

最后要补运营视角，因为真实系统不是画完就结束。

至少覆盖：

- timeout、retry、circuit breaker。
- idempotency 和 duplicate handling。
- graceful degradation。
- metrics、logs、traces、alerts。
- backup、restore、reconciliation。
- auth、rate limiting、abuse prevention。
- data privacy 和 audit log。

如果是支付、订单、账户、库存这类系统，要特别强调 source of truth、审计、幂等、补偿和恢复。

## 表达建议

- 不要一上来就堆组件
- 先讲流量模型、SLA、一致性要求和容灾目标
- 再解释为什么要这样分层
- 把同步路径和异步路径分开讲
- 把 source of truth 和 query path 分开讲
- 每引入一个组件，都说明它解决什么瓶颈、带来什么代价

可以用这句话收束：

我会先定义需求和 source of truth，再画主请求路径；然后根据 scale bottleneck 决定 cache、queue、sharding、search 是否必要，最后补 reliability、observability 和 security。

常见误区是背一个模板架构，然后不管题目是什么都套 load balancer、cache、MQ、database、microservices。真正的 system design 是按 access pattern 和 correctness model 推出来的。

## 相关

- [[What is System Design]]
- [[System Design Trade-offs]]
- [[Observability in System Design]]
- [[Design a 10 Million QPS System]]
