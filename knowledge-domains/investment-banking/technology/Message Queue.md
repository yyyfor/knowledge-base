---
title: Message Queue
tags: ["investment-banking", "finance"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Message Queue

Message Queue 是系统之间异步传递消息和事件的基础设施。

详细解释：

在交易和风险平台中，message queue 常用于传递 trade events、market data updates、job status 和 downstream notifications。它帮助系统解耦，也能缓冲流量尖峰，但引入了消息顺序、重复消费、死信队列和回放管理问题。

常见用途：

- trade event distribution
- market data publish-subscribe
- asynchronous job coordination
- operational alert fan-out

实务重点：

- 关键消息要定义清晰 schema 和 versioning
- consumer group 与 partition 设计会影响吞吐和顺序
- 死信与 replay 机制必须清楚

相关：

- [[Event-Driven Architecture]]
- [[Workflow Orchestration]]
- [[Market Data Pipeline]]

从哪里继续看：

- 软件技术可查 Kafka、RabbitMQ、Pulsar、SQS
- 知识库内继续看 [[Microservices and APIs]]、[[Data Lineage]]
- 若偏运维控制，可查 observability、lag monitoring、dead-letter queue

