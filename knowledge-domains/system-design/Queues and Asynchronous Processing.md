---
title: Queues and Asynchronous Processing
tags: ["system-design", "architecture"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Queues and Asynchronous Processing

队列和异步处理用于削峰、解耦和提升吞吐。

详细解释：

如果一个流程不需要请求发起方同步等待，就可以考虑异步化。队列有助于隔离峰值流量、平滑后端负载和拆分系统边界，但也带来重试、幂等、顺序和监控复杂度。

高负载场景下常见问题：

- queue lag
- retry buildup
- duplicate consumption
- partition hotspot
- backpressure design

相关：

- [[Latency and Throughput]]
- [[Event-Driven Architecture for System Design]]
- [[Design a Notification System]]
- [[Bottleneck Analysis in Distributed Systems]]
