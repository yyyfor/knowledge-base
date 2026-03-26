# Design a 10 Million QPS System

设计 1000 万 QPS 系统时，关键不是让数据库硬扛 1000 万，而是把真正落到最昂贵资源上的请求压到极低比例。

高层思路：

1. define traffic model and SLA
2. push filtering and protection to the front
3. rely on multi-level caching
4. keep services stateless and horizontally scalable
5. make write paths asynchronous where possible
6. protect storage with sharding, replication, and access shaping
7. add rate limiting, degradation, and full observability

典型分层：

- DNS / GSLB / Anycast
- CDN / WAF / gateway
- stateless service cluster
- local cache + distributed cache
- MQ / stream layer
- SQL / NoSQL / search / cold storage
- observability and governance

高价值表达：

- 真正瓶颈通常不是单机 CPU
- 更常见瓶颈是连接管理、回源比例、热点不均衡、调用链长度和故障放大
- 系统目标是把 90%~99% 的请求挡在更前面的便宜层

相关：

- [[Multi-Level Caching Strategies]]
- [[Graceful Degradation and Load Shedding]]
- [[Capacity Estimation for System Design]]
- [[Bottleneck Analysis in Distributed Systems]]

