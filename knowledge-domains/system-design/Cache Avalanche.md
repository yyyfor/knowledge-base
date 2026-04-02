# Cache Avalanche

Cache avalanche 指的是大量缓存 key 在同一时间段集中失效，导致回源请求成片涌向数据库或下游服务。

详细解释：

它和 breakdown 的差别在于：breakdown 通常集中在一个或少数热点 key，avalanche 则是大批 key 一起过期、缓存节点故障、批量发布或批量预热失误之后造成的系统性回源洪峰。危险在于它影响面更广，容易把缓存、数据库、消息队列和依赖服务一起拖进雪崩。

如何分析：

先看缓存 TTL 是否被统一设置、是否存在整批 key 同时写入、是否有节点重启或主从切换；再看数据库 QPS、线程池饱和、错误率、降级命中率是否同步上升。最好把故障时间点和发布、预热、缓存集群事件一起对照。

怎么解决：

- add TTL jitter to avoid synchronized expiration
- multi-level caching
- graceful degradation and load shedding
- read replicas or fallback data source
- prewarming after restart or failover

适用场景：

- 大批量缓存同时写入、统一 TTL、批处理刷新很重的系统
- 缓存集群重启、故障切换或大促前后流量陡增的场景

常见误区：

- 只把 avalanche 当成“Redis 挂了”；实际上 TTL 设计不合理、批量刷新和统一失效也会制造 avalanche
- 没有准备 fallback 和限流，只盯着缓存层本身

相关：

- [[Caching]]
- [[Multi-Level Caching Strategies]]
- [[Graceful Degradation and Load Shedding]]
- [[Cache Prewarming]]
