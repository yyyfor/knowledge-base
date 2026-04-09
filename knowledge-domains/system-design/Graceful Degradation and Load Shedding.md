---
title: Graceful Degradation and Load Shedding
tags: ["system-design", "architecture"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Graceful Degradation and Load Shedding

高并发系统不是保证所有请求都成功，而是保证核心请求优先活下来。

详细解释：

当系统接近极限或依赖故障时，不能把压力继续往后推。更合理的做法是：前面层级先拒绝一部分请求，对次要功能降级，对关键路径留足资源。

常见手段：

- gateway-level throttling
- endpoint prioritization
- fallback to stale cache
- default or simplified responses
- disable expensive features
- queue threshold shedding

相关：

- [[Rate Limiting]]
- [[Availability and Reliability]]
- [[Design a 10 Million QPS System]]

