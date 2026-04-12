---
title: Database Choices
tags: ["system-design", "architecture"]
difficulty: intermediate
estimated_time: 5 min
last_reviewed: 2026-04-09
---

# Database Choices

核心判断不是“数据库类型谁更高级”，而是看访问模式、数据关系、查询形态、一致性要求、扩展方式。

在 system design 里，先问自己五个问题：

- 数据有没有复杂关系？
- 读写路径是按主键查，还是多条件搜索？
- 是否需要事务？
- 是否要横向扩展到很大规模？
- 数据是不是天然按时间流入？

大多数数据库选型，其实都能被这五个问题推出来。

## Relational Database

Relational database 适合结构清晰、关系明确、事务重要、查询需要 join、聚合、约束的系统。

典型场景：

- 订单
- 支付
- 账户
- 库存
- 审计台账
- ERP
- CRM

它的强项是 schema 清晰、数据完整性强、支持 ACID、SQL 表达力强，尤其适合“一个写错就出事”的核心业务。

代价是横向扩展通常比 key-value store 更难。到超大规模高吞吐时，往往要考虑分库分表；复杂查询和高写入并存时，也容易让数据库变重。

经验上，只要一开始就在处理 money、inventory、identity、workflow state，默认先想 relational，除非有明确证据说明它扛不住。

## Key-Value Store

Key-value store 适合按 key 读写、极低延迟、高吞吐、数据访问路径简单的场景。

典型场景：

- session
- cache
- user profile snapshot
- feature flag
- 购物车
- id 映射
- 热点计数器
- rate limit
- 短链映射

它的优势是模型简单、读写快、横向扩展容易，非常适合 serving path。

缺点也很明显：不擅长复杂查询，不擅长 ad hoc analytics，也不适合多实体关系建模。

一个好用的判断标准是：如果 95% 请求都是 `get(key)` / `put(key)`，几乎不需要 join，也不需要复杂过滤，那 key-value store 往往最自然。

## Document Database

Document database 适合单条记录内部结构复杂、字段经常变化、以聚合对象为中心读写的系统。

典型场景：

- 商品 catalog
- 内容管理
- 用户配置
- 日志事件 envelope
- 消息模板
- 博客文章
- 某些 profile 系统

它比 relational database 更灵活，适合半结构化数据，开发速度往往更快。特别是在一个对象本来就应该整体存取时，document database 会很方便。

问题在于，一旦开始需要跨 document 强约束、复杂 join、强事务、多维聚合，它就会变 awkward。

简单说，document store 适合“对象为中心”，而 relational database 更适合“关系为中心”。

## Time-Series Database

Time-series database 适合数据天然按时间追加写入，核心查询围绕时间窗口、聚合、降采样、保留策略的场景。

典型场景：

- 监控指标
- IoT 传感器数据
- 交易 ticks
- 应用 telemetry
- 运维 metrics

它的优势是对高写入吞吐、时间范围查询、按 tag 聚合、冷热分层、压缩和 retention 都做了专门优化。

它不是拿来替代通用 OLTP 数据库的，因为它通常不适合复杂业务事务，也不擅长一般实体关系。

只要问题是“过去 5 分钟 CPU p99 是多少”“近 30 天某设备温度趋势”，time-series database 就很对路。

## Search Engine

Search engine 适合全文检索、相关性排序、模糊匹配、多字段检索、聚合搜索的场景。

典型场景：

- 站内搜索
- 文档检索
- 商品搜索
- 日志搜索
- 安全事件查询
- 知识库检索

它的核心不是存储事务真相，而是提供高质量检索体验：倒排索引、分词、BM25、faceting、highlight、prefix query、fuzzy query。

弱点是写后立即一致性通常较弱，事务语义弱，不适合作为唯一 source of truth。

经验上，search engine 应该放在“查询层”而不是“真相层”：主数据在 relational database、document database 或 object store，搜索索引异步同步过去。

## Polyglot Persistence

面试里，最好不要把这些数据库讲成互斥关系。真实系统通常是组合拳。

比如电商系统里：

- 订单和支付用 relational database。
- session 和购物车热点数据放 Redis 这类 key-value store。
- 商品详情页原始对象可能放 document store。
- 监控用 time-series database。
- 商品检索和站内搜索用 Elasticsearch 或 OpenSearch。

这不是“选一个库打天下”，而是把不同数据库放在不同 data path 上。

## 快速判断框架

- 先用 relational database，当你需要事务、约束、join、强一致、核心业务数据。
- 改用 key-value store，当访问模式几乎都是主键读写，追求极低延迟和水平扩展。
- 用 document database，当对象结构灵活且整体读写，不想被 rigid schema 绑死。
- 用 time-series database，当数据按时间流入，查询主要是时间窗口统计和趋势。
- 用 search engine，当用户是在“搜”而不是“查”，需要相关性、模糊匹配和全文检索。

面试时再补一句会显得更成熟：

不要让 search engine 承担交易真相，不要让 time-series database 承担业务事务，不要让 key-value store 硬扛复杂关系，不要让 relational database 去做它不擅长的全文搜索和超高吞吐缓存层。

一个常见误区是把“高并发”直接等同于 NoSQL。其实不对。很多高并发系统的核心账务仍然是 relational database，只是前面加 cache、后面做分片、旁边配 search、index、analytics。

数据库类型不是按流行程度选，而是按 access pattern 和 correctness model 选。

在 system design 里可以直接这样回答：

先定义 source of truth，再定义 query path，再定义 scale bottleneck，最后决定是否 polyglot persistence。

这样会比单纯背数据库分类强很多。

## 相关

- [[Consistency and CAP]]
- [[Data Partitioning and Sharding]]
- [[Design a Search System]]
- [[Design a 10 Million QPS System]]
