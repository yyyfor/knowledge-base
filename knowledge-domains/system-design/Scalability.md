---
title: Scalability
tags: ["system-design", "architecture"]
difficulty: intermediate
estimated_time: 4 min
last_reviewed: 2026-04-12
---

# Scalability

Scalability 是系统在负载增长时仍能维持服务能力的能力。

核心判断不是“能不能加机器”，而是系统的瓶颈能不能随着资源增加而被移走。

在 system design 里，先问自己五个问题：

- 增长的是读流量、写流量、数据量，还是连接数？
- 瓶颈在 stateless service、database、cache、queue、storage，还是外部依赖？
- 访问模式是否均匀，还是有 hot key、hot row、hot shard？
- 扩容后是否会引入跨节点协调、跨分片查询或一致性问题？
- 系统需要扩到 10 倍、100 倍，还是只是应对短期峰值？

## Vertical Scaling

Vertical scaling 是给单机加 CPU、内存、磁盘、网络带宽。它的优势是简单，对应用改动小，适合早期系统或瓶颈还不复杂的阶段。

代价是上限明显，而且单机越大越贵。更重要的是，它不能自然解决单点故障，也不能无限提升数据库写入能力。

经验上，早期可以先 vertical scaling，但面试里不能停在“换大机器”。你要说明什么时候它会到上限，以及下一步怎么拆。

## Horizontal Scaling

Horizontal scaling 是通过增加节点来提升容量，比如增加 stateless web server、consumer、cache shard、database shard。

它适合负载可以拆分的场景。stateless service 最容易横向扩展，因为请求可以通过 load balancer 分发到任意实例。数据库和有状态存储最难，因为要处理数据分片、一致性、迁移、热点和跨分片查询。

常见手段：

- web 层无状态化。
- 读路径加 cache 和 CDN。
- 写路径用 queue 削峰。
- 数据按 user id、tenant id、region 或时间分区。
- 热点 key 拆分或复制。
- 对分析类查询单独走 OLAP 或 search path。

## Scale Bottleneck

面试里要先定位 scale bottleneck，再谈技术。比如：

- 读多写少：优先 cache、CDN、read replica。
- 写多读少：优先 append-only、partitioning、batching、queue。
- 数据量大：优先 sharding、cold storage、retention、归档。
- 搜索复杂：优先 search engine，而不是让 OLTP 数据库硬扛全文检索。
- 热点明显：优先 hot key 拆分、请求合并、限流、预计算。

## 常见误区

常见误区是把 scalability 简化成“加机器”。如果共享数据库、全局锁、单分区队列、单个热点 key 或中心化 coordinator 没有被拆掉，加机器只会把瓶颈推到下游。

另一个误区是过早设计超大规模。scalability 不是一开始就上最复杂的架构，而是知道当前瓶颈、下一阶段瓶颈和演进路径。

## 面试回答框架

可以这样回答：

我会先区分读、写、存储和搜索的增长，再定位瓶颈。stateless 层通过 load balancing 横向扩展；读路径用 cache/CDN/read replica；写路径用 queue、partitioning 和批处理；数据层如果成为瓶颈，再做 sharding，并单独处理热点和跨分片查询。

## 相关

- [[Load Balancing]]
- [[Caching]]
- [[Data Partitioning and Sharding]]
- [[Latency and Throughput]]
