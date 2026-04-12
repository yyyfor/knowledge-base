---
title: Queues and Asynchronous Processing
tags: ["system-design", "architecture"]
difficulty: intermediate
estimated_time: 5 min
last_reviewed: 2026-04-12
---

# Queues and Asynchronous Processing

队列和异步处理用于削峰、解耦和提升吞吐。

核心判断不是“用了消息队列就高级”，而是看这件事是否真的需要请求方同步等待。

在 system design 里，先问自己五个问题：

- 用户是否必须立刻看到结果？
- 这个步骤失败后能不能稍后重试？
- 下游处理能力是否明显小于上游峰值？
- 是否需要解耦生产者和消费者的发布节奏？
- 是否能接受最终一致性？

如果一个流程不需要请求发起方同步等待，就可以考虑异步化。

## When to Use Queue

队列适合把“必须接收请求”和“可以稍后处理”的工作拆开。

典型场景：

- 发送邮件、短信、push notification。
- 图片、视频、文档转码。
- 日志、埋点、metrics 写入。
- 订单后续履约事件。
- 搜索索引异步更新。
- 高峰写入削峰，比如秒杀、活动报名。
- webhook 或第三方 API 调用。

它的优势是隔离峰值流量、平滑后端负载、解耦服务边界、提高系统整体吞吐。

## When Not to Use Queue

队列不适合所有链路。

如果用户必须立刻知道最终结果，比如登录成功、余额扣减、库存是否预占成功、支付是否已提交，就不能简单把核心事实丢进队列然后马上返回成功。

也不要用队列掩盖数据模型问题。如果两个步骤本质上需要强事务，一味异步化可能会制造更多补偿和一致性问题。

## Delivery Semantics

面试里讲 queue 时，要主动提 delivery semantics：

- at-most-once：最多处理一次，可能丢消息。
- at-least-once：至少处理一次，可能重复。
- exactly-once：语义上只处理一次，但通常依赖幂等、事务、去重或特定基础设施。

大多数真实系统会围绕 at-least-once 设计，然后用 idempotency key、dedupe table、唯一约束、业务状态机来处理重复消费。

## Ordering and Partitioning

队列常见误区是默认所有消息都有全局顺序。真实系统里，全局顺序很贵，也会限制吞吐。

更常见的做法是按业务 key 保证局部顺序，比如同一个 order id、user id、device id 的事件进入同一个 partition。这样既能保留必要顺序，又能横向扩展。

代价是可能出现 partition hotspot。如果某个 key 特别热，就要考虑拆 key、分桶、限流或特殊处理。

## Backpressure and Failure

队列能削峰，但不能消灭负载。如果生产速度长期大于消费速度，queue lag 会持续增长，最终还是会影响系统。

需要设计：

- consumer autoscaling。
- retry with exponential backoff。
- dead-letter queue。
- poison message handling。
- queue lag alert。
- producer rate limit。
- 幂等消费和补偿任务。

## 常见 Trade-off

队列有助于提升 throughput 和 availability，但会增加端到端 latency，也会带来最终一致性、重复消费、顺序、监控和排障复杂度。

一个成熟的回答不是“加 MQ”，而是说明哪些步骤异步、哪些步骤必须同步，以及失败后如何恢复。

## 面试回答框架

可以这样回答：

我会把用户必须同步等待的核心写路径保留在请求内，把非关键、可重试、可最终一致的工作放入 queue。队列负责削峰和解耦，但消费者必须做幂等，消息要有 retry、dead-letter queue、lag monitoring，并按业务 key 设计 partition 和顺序保证。

高负载场景下常见问题：

- queue lag
- retry buildup
- duplicate consumption
- partition hotspot
- backpressure design

## 相关

- [[Latency and Throughput]]
- [[Event-Driven Architecture for System Design]]
- [[Design a Notification System]]
- [[Bottleneck Analysis in Distributed Systems]]
