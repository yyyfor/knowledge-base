---
title: System Design Principles
tags: ["system-design", "architecture"]
difficulty: intermediate
estimated_time: 4 min
last_reviewed: 2026-04-12
---

# System Design Principles

系统设计的核心是围绕约束做权衡，而不是追求某个“标准答案”。

核心判断不是“用了哪些技术名词”，而是每个选择是否能被需求、访问模式、正确性和规模约束推出来。

在 system design 里，先问自己五个问题：

- 这个系统最重要的用户动作是什么？
- 正确性、延迟、吞吐、可用性哪个最不能牺牲？
- 数据的 source of truth 在哪里？
- 当前瓶颈是什么，下一阶段瓶颈是什么？
- 哪些复杂度现在值得引入，哪些应该推迟？

很多设计题没有唯一解。你需要先明确需求、访问模式、数据规模、延迟要求、故障容忍度和团队复杂度，再决定架构。脱离约束谈技术选型通常没有意义。

## Start from Requirements

先讲需求，不要先讲组件。

功能需求决定系统要做什么，非功能需求决定系统怎么做。比如同样是“消息系统”，聊天消息、营销短信、交易通知、监控告警对延迟、可靠性、顺序和重试的要求完全不同。

如果需求没有澄清，后面的数据库、队列、缓存、分片选择都只是猜。

## Optimize for the Real Bottleneck

不要为了显得复杂而堆组件。先定位真正瓶颈：

- 读多：cache、CDN、read replica。
- 写多：queue、partitioning、batching。
- 搜索复杂：search engine。
- 数据关系复杂：relational database。
- 时间序列写入：time-series database。
- 下游慢：timeout、fallback、异步化、限流。

一个常见误区是用 NoSQL、微服务、消息队列来回答所有扩展问题。技术选型必须跟 access pattern 对上。

## Prefer Simple Designs First

简单不是低级，而是可解释、可运营、可演进。

早期设计可以先用单体服务、一个主数据库、明确的缓存层和少量异步任务。等瓶颈出现或规模明确，再引入 sharding、event-driven architecture、多区域部署、复杂一致性协议。

面试里可以提出演进路径，而不是一开始就上终局架构。

## Make Trade-offs Explicit

每个系统设计选择都有代价：

- cache 降低 latency，但引入一致性问题。
- queue 提高 throughput，但增加端到端延迟和重复消费。
- sharding 提升容量，但增加跨分片查询和迁移成本。
- replication 提高 availability，但引入复制延迟和 failover 复杂度。
- search engine 提升检索体验，但不适合做 source of truth。

成熟的回答会直接说“我选这个，因为当前约束是 X；代价是 Y；如果规模变成 Z，我会演进到 W”。

## Design for Operations

系统不是画完就结束，还要能上线、监控、排障、回滚和恢复。

至少要考虑：

- metrics、logs、traces。
- alerting 和 SLO。
- timeout、retry、circuit breaker。
- data backfill 和 reconciliation。
- deployment、rollback 和 migration。
- capacity planning 和 cost。

## 面试回答框架

可以这样回答：

我会先从需求和约束出发，再根据 access pattern 和 correctness model 选技术。默认先用简单架构，只有当瓶颈明确时才引入 cache、queue、sharding、search 或多区域。每个选择都说明 trade-off，并补上可观测性和故障恢复。

## 相关

- [[System Design Trade-offs]]
- [[Scalability]]
- [[Availability and Reliability]]
