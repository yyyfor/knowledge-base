# Hot Key Overload

Hot key overload 指的是极少数 key 承担了异常高的访问量，导致缓存节点、应用实例或下游依赖在这些 key 上出现局部过载。

详细解释：

即使缓存命中率很高，hot key 仍然可能把系统打出问题。原因是压力可能集中在某个 Redis shard、某台应用实例、某个局部锁、某条序列化链路，甚至集中在单个大 value 的网络传输上。它本质上是“负载分布不均”问题，而不是简单的“有没有缓存”。

如何分析：

先找 top keys、单 shard QPS、单实例 CPU、网络带宽、序列化耗时和回源次数。再判断热点是不是短时突发、业务活动引起、推荐系统放大还是恶意流量触发。很多时候真正的瓶颈不是数据库，而是单点热点把上层先打满。

怎么解决：

- hot key split or key replication
- local cache in application layer
- dedicated path for ultra-hot content
- async refresh and immutable snapshot for read-mostly data
- load shedding or traffic shaping for bursty access

适用场景：

- 热榜、热门直播间、爆款商品、活动配置、公共资源页等热点集中型系统
- 流量头部效应明显、请求分布极不均匀的业务

常见误区：

- 把 hot key overload 简化成“缓存加机器就行”；如果 key 分布不均，更多机器也可能只是放大单 shard 热点
- 只关注 Redis QPS，不看应用层是否也因为序列化、锁或网络复制产生瓶颈

相关：

- [[Caching]]
- [[Hot Key Split]]
- [[Cache Breakdown]]
- [[Load Balancing]]
