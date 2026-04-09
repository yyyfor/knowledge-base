---
title: Capacity Estimation for System Design
tags: ["system-design", "architecture"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Capacity Estimation for System Design

容量估算不是为了得到精确数字，而是为了证明你理解系统压力会落到哪里。

详细解释：

system design 面试里，一个清晰的量级估算通常比背很多术语更有说服力。你需要能从入口流量逐层估算：多少被 CDN 吃掉，多少被缓存挡住，最终多少真正落到数据库。

一个典型思路：

- start from peak QPS, not average QPS
- estimate cache hit ratio
- estimate fan-out and write amplification
- identify peak shard or hotspot pressure
- reserve N+1 or higher headroom

高价值表达：

- 不按平均值规划，而按峰值、突刺和故障切流后容量规划
- 把最贵资源的真实承压量算出来，而不是拿总流量直接套数据库

相关：

- [[Design a 10 Million QPS System]]
- [[Multi-Level Caching Strategies]]
- [[Bottleneck Analysis in Distributed Systems]]

