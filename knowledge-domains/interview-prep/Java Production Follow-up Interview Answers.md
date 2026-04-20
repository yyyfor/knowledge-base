---
title: Java Production Follow-up Interview Answers
tags: ["interview", "java", "backend", "production", "follow-up", "interview-answers"]
difficulty: advanced
estimated_time: 35 min
last_reviewed: 2026-04-20
---

# Java Production Follow-up Interview Answers

这些 follow-up 通常不是考单个知识点，而是考你有没有真实线上服务视角。高质量回答要能把现象、指标、排查顺序、短期止血和长期治理讲清楚。

通用答题结构：

- 先确认影响面：哪些接口、哪些实例、错误率、延迟、吞吐、业务指标。
- 再定位瓶颈层：入口、Tomcat、业务线程池、DB 连接池、Redis、MQ、下游 RPC、GC、锁。
- 短期止血：限流、降级、扩容、熔断、关闭非核心功能、回滚。
- 长期治理：容量评估、压测、隔离、幂等、监控告警、runbook。

## 如果流量突然涨 10 倍，这个 Java service 会先在哪里出问题？

参考回答：

我不会先假设某一个点一定会挂，而是按请求链路看瓶颈。入口层可能先遇到网关限流或负载均衡压力；应用层可能是 Tomcat worker 线程、业务线程池、队列、CPU、内存或 GC；数据层通常是数据库连接池、慢 SQL、锁等待、Redis hot key、MQ 积压；下游服务也可能先被打满。

短期我会先看 dashboard：QPS、error rate、p95/p99、CPU、GC、Tomcat busy threads、业务线程池 active/queue/rejected、DB pool active/pending、Redis latency、下游 RPC latency。止血上可以先做限流、降级非核心接口、扩容实例、打开缓存、关闭高成本功能。长期要做容量评估和压测，明确每层的最大吞吐和降级策略。

## 线程池队列满了怎么办？

参考回答：

线程池队列满说明任务提交速度大于处理速度。第一步不是简单加大队列，而是判断为什么处理不过来：任务本身变慢、下游变慢、线程数太小、队列设计不合理，还是流量异常。

短期处理可以按业务语义选择拒绝、CallerRuns、降级、限流或把低优先级任务丢到 MQ。核心交易任务不能静默丢弃，非核心任务可以降级或异步补偿。长期要使用有界队列、明确拒绝策略、线程池隔离、任务超时、队列长度和 rejected count 告警。队列越大不一定越安全，它会隐藏问题并放大延迟。

## 数据库连接池满了怎么办？

参考回答：

数据库连接池满通常说明连接被占用时间过长或并发超过数据库承载能力。我要先看 active connections、pending threads、connection acquire time、SQL latency、事务时长、慢查询和是否有连接泄漏。

短期可以限流、降级、扩容应用前先谨慎，因为应用实例更多可能把 DB 压得更死。如果是慢 SQL，先优化索引或查询；如果是事务太长，缩短事务范围；如果是连接泄漏，打开 leak detection 并修复资源释放；如果是读多，可以加缓存或读写分离。不要把 max pool size 盲目调大，连接数太多会增加 DB 上下文切换和锁竞争。

## 下游慢会如何影响 Tomcat 线程？

参考回答：

如果请求线程里同步调用下游，下游慢会让 Tomcat worker thread 阻塞等待。流量继续进来时，busy threads 会升高，可用线程越来越少，最终新请求排队或超时。这个时候服务本身可能 CPU 不高，但吞吐下降、p99 上升、线程栈大量卡在 HTTP client、RPC client 或 DB driver。

处理上所有下游调用必须有 timeout。对非核心下游要做熔断、降级和隔离线程池；对核心下游要控制重试和并发，避免级联故障。更成熟的设计是把慢下游从主链路移走，或者用异步化、缓存、MQ 和 fallback 降低同步等待。

## 怎么证明是 GC 问题而不是数据库慢？

参考回答：

要用证据区分，而不是猜。GC 问题通常会看到 GC pause 时间和接口延迟尖刺对齐，JVM GC log、JFR、Micrometer JVM metrics 显示频繁 young/full GC，heap 使用率 GC 后不回落，或 allocation rate 异常。数据库慢则会看到 SQL latency、DB connection acquire time、slow query、lock wait 和 DB CPU/IO 指标异常。

我会对齐同一时间窗口的 trace、GC log 和 DB 指标。如果请求 trace 显示大量时间花在 JDBC call，是 DB 或连接池方向；如果 trace 里整体出现停顿，应用线程没有执行，且 GC pause 同时发生，更像 GC。还可以看 `jstat`、GC log、APM JVM pause，以及数据库端慢查询日志来交叉验证。

## 如果接口偶发 p99 很高，你怎么排查？

参考回答：

p99 偶发高要先看它是全局现象还是单接口、单实例、单下游、单用户、单数据分片的问题。平均值正常但 p99 高，通常说明有长尾：慢 SQL、锁等待、GC pause、连接池排队、线程池队列积压、下游抖动、Redis hot key、网络重传、大对象序列化。

排查顺序是先用 trace 拆耗时，看慢在哪里；再按实例维度看是否某台机器异常；然后看线程池、DB pool、Redis、RPC、GC、日志中的 timeout/retry。短期可以降级慢分支、加 timeout、隔离下游、限制大查询。长期要建立 p95/p99、队列耗时、连接获取耗时、慢 SQL、GC pause 和下游延迟的告警。

## 如果重试导致重复写，你怎么修？

参考回答：

根因是重试前没有设计幂等。修复时先识别重复写的业务后果，比如重复下单、重复扣款、重复发券、重复发送消息。然后为写接口引入 idempotency key、业务唯一约束、去重表、状态机校验或请求流水号。

对外部调用，先判断错误是否可重试；只有网络超时、临时 5xx 这类不确定结果才谨慎重试，并且要 backoff + jitter + 最大次数。核心写操作最好做到“先查幂等记录，再执行业务，再记录结果”，重复请求直接返回第一次结果。数据库唯一约束是最后防线，不能只靠 Redis 锁。

## 如果线上出现 deadlock，你怎么定位？

参考回答：

Java 层死锁先用 `jstack`、JFR 或 Arthas 看线程状态，重点找 `BLOCKED`、`WAITING` 和 deadlock detection，定位互相持有和等待的锁对象、线程名和代码行。如果是数据库死锁，要看 MySQL `SHOW ENGINE INNODB STATUS`、deadlock log、事务 SQL、锁等待和索引使用。

修复思路是统一加锁顺序、缩小锁范围、避免锁内调用外部服务、减少事务中更新多张表的交叉顺序，必要时用 tryLock/timeout 失败后重试。数据库死锁要保证访问顺序一致、索引命中减少锁范围，并让事务尽快提交。

## Redis hot key 把单 shard 打满怎么办？

参考回答：

先确认是 hot key：看 Redis QPS、latency、big key/hot key 统计、单 shard CPU 和网络是否明显高于其他 shard。短期可以做本地缓存、请求合并、限流、读副本、热点 key 拆分，必要时临时扩容或迁移 slot。

长期要从数据模型上治理：把一个大热点 key 拆成多个分片 key，比如按 hash suffix 拆；对高频只读数据使用本地缓存 + TTL；对计数类用分片计数再聚合；对突发热点做预热和自动识别。还要避免大 value 一次性读写，因为 big key 和 hot key 经常一起出现。

## MySQL 慢查询是索引问题、锁问题还是连接池问题，怎么区分？

参考回答：

先看慢发生在哪里。如果获取连接就很慢，connection acquire time 高、连接池 pending 多，是连接池或 DB 承载问题。如果 SQL 执行时间长，要看慢查询日志和 `EXPLAIN`：type、key、rows、Extra，判断是否全表扫描、索引失效、回表过多、排序临时表。如果 SQL 本身不慢但偶发卡住，要看 lock wait、事务持锁、行锁范围和死锁日志。

索引问题通常表现为 rows 扫描大、key 没用上、Extra 有 filesort/temporary。锁问题通常表现为同一 SQL 偶发很慢、等待其他事务、更新热点行。连接池问题表现为应用端拿不到连接，DB 端可能 SQL 并不慢。排查时要同时看应用 trace、连接池 metrics、MySQL slow log、processlist、InnoDB status。

## 分布式事务失败一半怎么办？

参考回答：

先不要手工乱改数据，要确认业务状态、成功步骤、失败步骤、消息是否投递、补偿是否执行。分布式事务失败一半的本质是跨服务状态不一致，需要通过状态机、事务日志、消息表或 Saga 记录来恢复。

短期可以通过补偿任务、人工运营工具或重放消息把状态修正到一致。长期要避免依赖一个“完美全局事务”，改成可恢复设计：每个本地事务可幂等执行，跨服务通过 Outbox/Saga/TCC 协调，失败后有 retry、DLQ、补偿和人工介入入口。关键是每个状态都可追踪、可重试、可回滚或可补偿。

## JWT 泄漏怎么办？

参考回答：

先按安全事故处理：确认泄漏范围、token 类型、有效期、涉及用户和权限。短期要立即让泄漏 token 失效，比如轮换签名密钥、提升 token version、加入黑名单、强制登出相关用户、撤销 refresh token，并审计异常访问。

长期治理是缩短 access token 有效期，refresh token 服务端可撤销，敏感操作二次校验，token 不进日志和 URL，前端存储降低 XSS 风险，服务端做好权限最小化和审计。JWT 无状态不等于不可撤销，生产系统通常要配合 token version、session registry 或 blacklist。

## 消息重复消费怎么办？

参考回答：

消息系统通常至少一次投递，所以消费者必须幂等。先看重复消费的业务影响，比如重复扣库存、重复发券、重复发通知。修复方式包括消费幂等表、业务唯一约束、状态机、去重 key、版本号和原子更新。

处理流程上，消费成功后再 ack；失败要 retry，并最终进 DLQ。消费者逻辑要能安全重放：同一 messageId 或 businessId 多次到达时，要么直接返回成功，要么只执行一次核心写入。不要假设 MQ 不会重复，也不要把“先查再写”做成非原子逻辑，最后要靠唯一约束或事务保证。

## 面试收尾句

这些题可以用同一句话收尾：

线上稳定性不是靠某一个组件解决，而是靠 timeout、bounded queue、connection pool、idempotency、circuit breaker、metrics/logs/trace、容量评估和故障演练一起保证。面试里我会先止血，再定位根因，最后把问题固化成机制。

## Related

- [[Java Interview Questions]]
- [[Java Production Engineering Interview Answers]]
- [[Java Concurrency Interview Answers]]
- [[Java Database and Persistence Interview Answers]]
- [[Java Redis Interview Answers]]
- [[Java Distributed Systems Interview Answers]]
