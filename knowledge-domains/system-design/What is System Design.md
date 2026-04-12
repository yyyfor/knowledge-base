---
title: What is System Design
tags: ["system-design", "architecture"]
difficulty: intermediate
estimated_time: 4 min
last_reviewed: 2026-04-12
---

# What is System Design

System design 是把产品需求转化为可扩展、可维护、可运营的软件系统结构的过程。

核心判断不是“画了多少组件”，而是系统能不能在明确约束下正确、稳定、可扩展地完成业务目标。

在 system design 里，先问自己五个问题：

- 用户要完成什么核心动作？
- 流量、数据量、延迟、可用性、一致性要求是什么？
- 核心实体和 source of truth 是什么？
- 请求路径和数据流怎么走？
- 瓶颈、故障和扩展路径在哪里？

它不只是画几个方框，而是要回答：系统有哪些组件、它们如何通信、数据如何流动、瓶颈在哪里、故障如何处理、如何扩展、如何监控。

## Functional Requirements

Functional requirements 是系统必须提供的功能。

比如设计短链系统时，核心功能可能是：

- 创建短链。
- 根据短链跳转到长链接。
- 支持过期时间。
- 支持基本 analytics。

面试里不要一上来画架构。先把功能范围说清楚，否则后面的数据库、缓存、队列、索引都没有依据。

## Non-Functional Requirements

Non-functional requirements 是系统的质量约束，比如：

- latency
- throughput
- availability
- consistency
- durability
- security
- cost
- operability

这些要求会直接改变设计。比如支付系统会优先正确性和持久性；消息推送系统会更重视吞吐、削峰和重试；搜索系统会重视相关性、索引更新和查询延迟。

## Data Model and Source of Truth

系统设计要尽早明确核心实体和 source of truth。

例如电商系统里，订单、支付、库存、商品、用户、搜索索引不是同一类数据。订单和支付通常需要强一致和审计；商品搜索可以从主数据异步同步到 search engine；购物车热点状态可以放在 key-value store 或 cache。

如果 source of truth 不清楚，后面很容易把 cache、search index、analytics store 当成事实来源，导致一致性和恢复问题。

## Request Path and Data Flow

好的设计要能讲清楚请求从哪里进来、经过哪些组件、读写哪些数据、失败时怎么处理。

比如一个下单请求，不只是“API 调数据库”。它可能包含鉴权、库存预占、订单创建、支付、消息事件、通知、审计和异步补偿。每一步的同步/异步边界都需要解释。

面试官通常不是在找最复杂的图，而是在看你是否能把主链路和异常链路讲清楚。

## Bottlenecks and Evolution

System design 不是一次性设计终局架构，而是说明在当前规模下怎么做，增长后怎么演进。

常见演进路径：

- 单体服务到服务拆分。
- 单数据库到 read replica。
- 读热点到 cache/CDN。
- 写峰值到 queue。
- 大表到 partitioning/sharding。
- 简单查询到 search engine 或 analytics store。

好的答案会说明“为什么现在不做某个复杂方案”，以及“什么时候需要升级”。

## 面试回答框架

可以这样回答：

我会先澄清功能需求和非功能约束，再定义核心数据模型和 source of truth。然后画出主请求路径和数据流，说明同步与异步边界。最后讨论瓶颈、故障处理、扩展路径和可观测性。

好的 system design 不是“最复杂”，而是“在约束下做出合理权衡”。

## 相关

- [[System Design Principles]]
- [[System Design Trade-offs]]
- [[How to Approach a System Design Interview]]
