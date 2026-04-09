---
title: Latency and Throughput
tags: ["system-design", "architecture"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Latency and Throughput

Latency 是单次请求有多快，throughput 是单位时间内能处理多少请求。

详细解释：

很多系统优化会在这两者之间权衡。批处理、异步化和队列能提高吞吐，但可能增加端到端延迟；强同步链路可以让结果更即时，但更容易把延迟放大。

相关：

- [[Caching]]
- [[Queues and Asynchronous Processing]]
- [[Rate Limiting]]

