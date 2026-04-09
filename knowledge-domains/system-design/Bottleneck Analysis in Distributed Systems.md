---
title: Bottleneck Analysis in Distributed Systems
tags: ["system-design", "architecture"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Bottleneck Analysis in Distributed Systems

高并发设计的核心能力之一，是分层找瓶颈，而不是抽象地说“加机器”。

常见分层瓶颈：

- ingress: TLS, connection count, auth overhead, bot traffic
- service layer: RPC depth, thread pools, retries, GC
- cache layer: hot key, large value, expiration storms
- queue layer: lag, retry buildup, partition imbalance
- database layer: hot rows, slow queries, replica lag
- cross-region layer: replication delay, failover skew, conflict writes

详细解释：

很多系统在低流量时看不出问题，一旦流量放大，最先暴露的往往不是业务逻辑，而是连接管理、热点倾斜和排队传播。面试里如果你能按层分析，会显得非常成熟。

相关：

- [[Design a 10 Million QPS System]]
- [[Queues and Asynchronous Processing]]
- [[Database Choices]]
- [[Availability and Reliability]]
