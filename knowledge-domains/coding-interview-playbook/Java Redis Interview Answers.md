---
title: Java Redis Interview Answers
tags: ["coding-interview", "java", "redis", "cache", "interview-answers"]
difficulty: intermediate
estimated_time: 25 min
last_reviewed: 2026-04-20
---

# Java Redis Interview Answers

Redis 题要围绕数据结构、缓存一致性、异常流量、持久化、集群和锁语义回答。

## Redis 为什么快？

参考回答：

Redis 快不只是因为数据在内存里，还因为它使用高效数据结构、单线程事件循环避免大量锁竞争、IO 多路复用处理连接，并且命令执行路径短。

但单线程也意味着不能执行慢命令和大 key 操作，否则会阻塞其他请求。线上要关注 slowlog、latency、hot key、big key 和网络带宽。

## Redis 常见数据结构有哪些？

参考回答：

String 适合缓存值、计数器、分布式锁 token；Hash 适合对象字段；List 适合简单队列；Set 适合去重和交并差；ZSet 适合排行榜和延迟队列；Stream 适合更可靠的消息流。

回答时要从业务场景出发，不要只背类型。比如排行榜用 ZSet，因为它天然按 score 排序。

## 过期删除和内存淘汰策略是什么？

参考回答：

Redis 过期删除通常结合惰性删除和定期删除。惰性删除是在访问 key 时发现过期再删；定期删除是周期性抽样清理过期 key。

内存达到上限后会根据 maxmemory-policy 淘汰，比如 allkeys-lru、volatile-lru、allkeys-lfu、noeviction。生产环境要明确策略，否则缓存写满后行为可能不符合预期。

## 缓存穿透、击穿、雪崩怎么处理？

参考回答：

缓存穿透是查询不存在的数据，绕过缓存打到 DB。可用 null cache、Bloom filter、参数校验。缓存击穿是热点 key 过期瞬间大量请求打到 DB，可用互斥锁、singleflight、逻辑过期、热点预热。缓存雪崩是大量 key 同时过期或 Redis 故障，可用 TTL jitter、多级缓存、限流降级、预热和高可用。

成熟回答要强调：缓存是保护数据库的，不应该在异常时把所有压力直接转移给 DB。

## RDB 和 AOF 有什么区别？

参考回答：

RDB 是周期性生成内存快照，恢复快、文件紧凑，但可能丢失最近一段数据。AOF 记录写命令，持久性更好，可配置每秒 fsync，但文件更大，恢复可能更慢，需要 rewrite。

选择取决于数据重要性和恢复目标。缓存场景可以接受一定丢失；用 Redis 承载重要状态时要谨慎评估持久化和主从复制延迟。

## 主从复制和哨兵解决什么问题？

参考回答：

主从复制用于读扩展和数据副本，写入主节点后复制到从节点。哨兵负责监控主从、故障检测、自动 failover 和通知客户端新主节点。

要补充复制是异步的，故障切换可能丢少量数据。强一致交易真相不应该只放 Redis。

## Redis Cluster 如何分片？

参考回答：

Redis Cluster 使用 16384 个 hash slot。key 根据 hash slot 分布到不同节点，每个主节点负责一部分 slot，并可以有从节点做副本。客户端根据 MOVED/ASK 重定向访问正确节点。

面试里可以补 hash tag：`{user:1}:profile` 和 `{user:1}:orders` 可以落到同一个 slot，便于多 key 操作，但不能滥用导致倾斜。

## Redis 能不能做消息队列？

参考回答：

可以，但要看可靠性要求。List 可以做简单队列，Pub/Sub 适合实时广播但不保留消息，Stream 支持消费组、ack、pending list，更接近可靠消息队列。

如果是核心交易消息，Kafka/RocketMQ/RabbitMQ 这类专业 MQ 通常更合适。Redis Stream 可以用于轻量可靠队列，但也要设计 ack、重试、死信和积压监控。

## 如何实现分布式锁？

参考回答：

最基本是 `SET key token NX PX ttl`，释放时用 Lua 脚本校验 token 后删除，避免误删别人的锁。锁要有过期时间，业务执行可能超时时要考虑续租。获取失败时要有超时和降级。

重点是：分布式锁不等于事务。它只能减少并发冲突，不能替代数据库唯一约束、状态机和幂等设计。

## 大 key、热 key 会造成什么问题？

参考回答：

大 key 会导致网络传输大、序列化慢、删除阻塞、迁移困难。热 key 会让大量请求集中到单个 shard，造成单点瓶颈。

处理方式包括拆 key、压缩结构、异步删除、热点本地缓存、读副本、请求合并、限流和 key 分片。

## Related

- [[Java Interview Questions]]
- [[Caching]]
- [[Java Production Engineering Interview Answers]]
