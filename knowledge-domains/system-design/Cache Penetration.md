---
title: Cache Penetration
tags: ["system-design", "architecture"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Cache Penetration

Cache penetration 指的是请求反复查询“本来就不存在”的数据，结果每次都穿透缓存打到数据库或下游服务。

详细解释：

它常见于恶意扫描、参数错误、脏流量或业务上确实经常查不到结果的场景。危险点不在于单次 miss，而在于大量 miss 会让缓存完全失去保护作用，数据库被无意义流量直接击穿。设计时要区分“合法的空结果”和“异常流量”，因为二者的治理手法不完全一样。

如何分析：

先看 miss 流量是否集中在不存在 key、非法 id、异常路径或短时间暴涨的随机参数；再看数据库是否被大量无效查询拖慢。排查时重点看 miss ratio、not-found ratio、下游 QPS、错误码分布，以及这些请求是否来自同一批来源、同一类接口或同一类参数模式。

怎么解决：

- cache null value for a short TTL
- bloom filter or existence filter
- parameter validation before hitting cache
- rate limiting or bot mitigation for abnormal traffic
- negative cache monitoring

适用场景：

- 用户、商品、内容这类存在大量查询但并不是所有 id 都有效的系统
- 对外 API 容易被扫描、撞库或被错误客户端重复请求的场景

常见误区：

- 只会回答“上 Bloom filter”，却不说明哪些 key 适合做 existence filter，哪些场景更适合短 TTL 空值缓存
- 把 penetration 和 breakdown 混为一谈；penetration 的核心是“不存在的数据”，breakdown 的核心是“热点数据失效后被并发打爆”

相关：

- [[Caching]]
- [[Cache Breakdown]]
- [[Rate Limiting]]
- [[Hot Key Overload]]
