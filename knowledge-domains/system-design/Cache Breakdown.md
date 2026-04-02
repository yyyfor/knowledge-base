# Cache Breakdown

Cache breakdown 指的是某个非常热点的 key 在失效瞬间被大量并发请求同时打到数据库，导致下游瞬时被压垮。

详细解释：

它也常被叫作 hot key breakdown。和普通 miss 不同，这里的 key 通常是热点数据，比如首页配置、爆款商品、热榜内容或热门用户信息。一旦缓存过期，成千上万的请求会同时回源，数据库或下游服务会在很短时间内出现尖峰负载。

如何分析：

先确认问题是否集中在少数热点 key；再看缓存过期时间、并发数、回源耗时和下游连接数是否同步飙升。监控上要关注 top hot keys、回源 QPS、回源耗时、锁等待时间，以及缓存命中率在故障窗口内的变化。

怎么解决：

- singleflight or request coalescing
- mutex lock around rebuild
- logical expiration with background refresh
- never expire for ultra-hot data with active invalidation
- stale-while-revalidate for read-heavy traffic

适用场景：

- 首页配置、热榜、营销页、热门 feed、公共元数据等高并发读取场景
- 少数 key 承担极大流量占比的系统

常见误区：

- 以为加长 TTL 就等于解决 breakdown；如果没有回源合并或后台刷新，热点 key 仍然会在失效时造成尖峰
- 只在 Redis 层解决，却不看应用层是否还有重复回源和级联重试

相关：

- [[Caching]]
- [[Hot Key Overload]]
- [[Request Coalescing]]
- [[Logical Expiration and Background Refresh]]
