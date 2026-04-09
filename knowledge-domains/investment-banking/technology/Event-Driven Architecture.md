---
title: Event-Driven Architecture
tags: ["investment-banking", "finance"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Event-Driven Architecture

Event-Driven Architecture 用事件而不是同步调用作为系统之间协作的主要机制。

详细解释：

在交易平台里，trade booked、market data updated、margin call generated、risk job completed 这类事件都可以作为下游动作的触发器。事件驱动架构能够提升系统解耦和实时响应能力，但也会带来顺序性、幂等性、重放和一致性管理的复杂度。

常见事件：

- trade booked
- trade amended
- market snapshot published
- risk result available
- settlement status changed

实务重点：

- 需要清楚区分 event time 和 processing time
- consumer 必须能处理重复、乱序和延迟事件
- 适合实时通知，不一定适合作为所有关键计算的唯一真相来源

相关：

- [[Message Queue]]
- [[Microservices and APIs]]
- [[Trade Lifecycle]]

从哪里继续看：

- 知识库内建议继续看 [[Data Lineage]]、[[Batch Processing]]
- 软件技术可查 Kafka、schema registry、event sourcing、outbox pattern
- 架构设计可继续看 exactly-once illusion、at-least-once delivery、idempotent consumers

