---
title: Request Coalescing
tags: ["system-design", "architecture"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Request Coalescing

Request coalescing 指的是在缓存失效或回源阶段，把同一份数据的并发请求合并成一次实际回源，其余请求等待或复用结果。

详细解释：

它是治理 breakdown 和重复回源最直接的手段之一。没有 coalescing 时，同一个 key 失效后会有大量并发请求各自发起数据库查询；有 coalescing 后，只有一个请求负责回源，其他请求共享结果。实现上可以是 mutex、singleflight、promise deduplication 或请求级合并。

如何分析：

先看同一 key 的并发 miss 数、同一时刻重复回源次数、锁等待时长和回源成功率。需要同时判断“等待共享结果”是否会引入新的尾延迟，以及锁是否可能成为瓶颈或单点。

怎么解决：

- singleflight in application layer
- distributed lock when multiple instances rebuild the same key
- timeout and fallback around lock waits
- pair with stale read to keep tail latency stable

适用场景：

- 热点 key 失效后会出现大量重复请求的读多写少系统
- 多实例应用访问同一缓存与下游数据源的场景

常见误区：

- 上了锁却没有超时和降级，反而把用户请求全部堵在等待链路上
- 只在单机做 coalescing，却忽略多实例情况下仍然可能重复回源

相关：

- [[Cache Breakdown]]
- [[Logical Expiration and Background Refresh]]
- [[Caching]]
- [[Queues and Asynchronous Processing]]
