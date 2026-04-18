---
title: Java Interview Questions
tags: ["coding-interview", "java", "backend", "interview"]
difficulty: intermediate
estimated_time: 20 min
last_reviewed: 2026-04-18
---

# Java Interview Questions

Java 面试不是只背语法点，而是看你能不能把语言特性、集合、并发、JVM、Spring、数据库和线上问题串起来。

核心判断不是“你知道多少 Java 名词”，而是你是否能解释：这个机制解决什么问题，代价是什么，线上如何排查，什么时候不该用。

## 面试通常在考什么

参考 JavaGuide 的知识组织方式，Java 后端面试不能只准备 Java 语言本身，还要覆盖计算机基础、数据库、常用框架、分布式、高性能和高可用。

Java 后端面试通常分成 10 类：

- Core Java：面向对象、equals/hashCode、String、异常、泛型、反射。
- Collections：HashMap、ConcurrentHashMap、ArrayList、LinkedList、Set、Queue。
- IO and network：BIO/NIO/AIO、序列化、HTTP、TCP、连接管理。
- Concurrency：线程池、锁、volatile、synchronized、CAS、CompletableFuture。
- JVM：内存模型、GC、类加载、OOM、CPU 飙高、线程 dump。
- Spring：IoC、AOP、事务、Bean lifecycle、Spring MVC、Spring Boot。
- Database and persistence：JDBC、连接池、MySQL、Redis、事务隔离、索引、MyBatis/JPA。
- Security：认证授权、JWT、SSO、权限模型、数据脱敏、参数校验。
- Distributed systems：CAP、RPC、分布式 ID、分布式锁、分布式事务、配置中心。
- High performance and availability：读写分离、分库分表、消息队列、限流、负载均衡、冗余。
- Production engineering：性能、日志、监控、限流、重试、幂等、排障。

## Core Java 高频题

高频题目：

- Java 中 `==` 和 `equals()` 的区别是什么？
- 为什么重写 `equals()` 通常也要重写 `hashCode()`？
- `String`、`StringBuilder`、`StringBuffer` 有什么区别？
- Java 的异常体系怎么分？checked exception 和 unchecked exception 怎么选？
- `final` 可以修饰什么？分别代表什么含义？
- 泛型的类型擦除是什么？有什么限制？
- 反射有什么用途和风险？
- interface 和 abstract class 怎么选？
- Java 是值传递还是引用传递？
- `Object` 里有哪些常见方法？

回答重点：

- 不要只背定义，要讲使用场景。
- `equals/hashCode` 要联系 HashMap/HashSet。
- String 要联系不可变性、线程安全、常量池和拼接性能。
- 泛型要讲类型擦除导致运行期拿不到具体类型。

## Collections 高频题

高频题目：

- HashMap 的底层结构是什么？
- HashMap 为什么 JDK 8 后会引入红黑树？
- HashMap 扩容时发生什么？
- HashMap 为什么不是线程安全的？
- ConcurrentHashMap 如何保证并发安全？
- ArrayList 和 LinkedList 怎么选？
- HashSet 如何保证元素唯一？
- PriorityQueue 适合什么场景？
- fail-fast 和 fail-safe iterator 有什么区别？
- 为什么 mutable object 不适合当 HashMap key？

答题重点：

- HashMap：数组 + 链表 + 红黑树，关注 hash、冲突、扩容、负载因子。
- ConcurrentHashMap：关注分段思想演进、CAS、synchronized、桶级别并发。
- List 选择：ArrayList 适合随机访问和尾部追加，LinkedList 很少是默认好选择，因为内存局部性差。
- Queue：结合生产消费、BFS、Top K、延迟任务讲。

面试里可以这样说：

HashMap 的核心不是“会不会背源码”，而是理解 hash 分布、冲突处理、扩容成本和线程安全边界。如果 key 的 hashCode 质量很差，或者 key 可变，HashMap 的行为就会变得很危险。

## Concurrency 高频题

高频题目：

- `synchronized` 和 `ReentrantLock` 有什么区别？
- `volatile` 能保证什么，不能保证什么？
- CAS 是什么？ABA 问题是什么？
- Java 线程池的核心参数有哪些？
- 为什么不建议直接 `Executors.newFixedThreadPool()`？
- 线程池拒绝策略有哪些？
- 如何设计一个异步任务处理系统？
- `CountDownLatch`、`CyclicBarrier`、`Semaphore` 分别适合什么场景？
- `CompletableFuture` 怎么做异步编排？
- 如何排查死锁？

答题重点：

- `volatile` 保证可见性和有序性，不保证复合操作的原子性。
- `synchronized` 简洁，适合普通互斥；`ReentrantLock` 支持可中断、公平锁、tryLock、多个 Condition。
- 线程池一定要讲 corePoolSize、maximumPoolSize、queue、keepAliveTime、rejection policy。
- 不建议无脑用 `Executors`，因为默认队列可能无界，流量高时容易 OOM。

线程池回答框架：

- 任务类型：CPU-bound 还是 IO-bound。
- 队列是否有界：避免无限堆积。
- 拒绝策略：fail fast、caller runs、丢弃还是降级。
- 监控指标：active threads、queue size、rejected count、task latency。
- 失败处理：timeout、retry、dead-letter、幂等。

## JVM 高频题

高频题目：

- JVM 内存区域有哪些？
- heap 和 stack 的区别是什么？
- 什么对象会进入老年代？
- 常见 GC 算法有哪些？
- G1 GC 的目标是什么？
- 什么情况下会发生 OOM？
- 如何排查 CPU 飙高？
- 如何排查内存泄漏？
- 类加载过程是什么？
- 双亲委派模型解决什么问题？

排障回答框架：

- CPU 高：`top` 找进程，`top -H` 找线程，线程 id 转 16 进制，`jstack` 看栈。
- 内存高：看 heap usage，抓 heap dump，用 MAT / profiler 找 dominator tree 和 retained size。
- 频繁 GC：看 GC log，判断 allocation rate、promotion、old gen、full GC 原因。
- OOM：区分 heap OOM、metaspace OOM、direct memory OOM、unable to create native thread。

面试里不要只说“调大内存”。更成熟的回答是先判断是流量增长、对象生命周期异常、缓存无界、线程池/队列无界，还是 classloader 泄漏。

## Spring / Spring Boot 高频题

高频题目：

- Spring IoC 是什么？
- AOP 的实现原理是什么？
- JDK dynamic proxy 和 CGLIB 有什么区别？
- Spring Bean 生命周期是什么？
- `@Autowired` 和构造器注入怎么选？
- Spring 事务为什么有时不生效？
- `@Transactional` 的传播行为有哪些？
- Spring MVC 请求链路是什么？
- Spring Boot 自动配置原理是什么？
- 如何设计一个可测试的 Spring service？

事务不生效高频原因：

- 同类方法内部调用，绕过 proxy。
- 方法不是 public。
- 异常被 catch 掉，没有抛出触发 rollback。
- 默认只对 unchecked exception rollback。
- 数据库引擎或连接配置不支持事务。
- 多数据源事务边界不清。

回答 Spring 题时，最好把机制和线上影响连起来。比如 AOP 不只是“切面”，它会影响事务、监控、鉴权、日志；proxy 边界不清，事务就可能失效。

## IO and Network 高频题

高频题目：

- Java BIO、NIO、AIO 有什么区别？
- NIO 的 Buffer、Channel、Selector 分别负责什么？
- Netty 为什么常用于高并发网络通信？
- 序列化和反序列化有什么风险？
- HTTP 和 HTTPS 的区别是什么？
- TCP 三次握手和四次挥手分别解决什么问题？
- 连接超时和读取超时有什么区别？
- 长连接、连接池和 keep-alive 怎么理解？
- 大文件上传如何避免内存打爆？
- 如何处理接口偶发超时？

答题重点：

- IO 题要从阻塞模型、线程模型和内存拷贝角度讲。
- 网络题要能把 TCP/HTTP 概念连接到 Java service 的 timeout、connection pool、thread pool。
- 大文件和流式处理不要一次性读入内存，要讲 chunk、stream、backpressure。

成熟回答：

NIO 的价值不是“比 BIO 高级”，而是用 Selector 管理多个 Channel，减少一连接一线程的资源浪费。但它也提高了编程复杂度，所以真实项目通常会用 Netty 这类框架来封装事件循环、编解码、连接管理和背压。

## Database, MySQL and Persistence 高频题

高频题目：

- JDBC 执行 SQL 的基本流程是什么？
- 连接池解决什么问题？核心参数有哪些？
- MyBatis 和 JPA 怎么选？
- N+1 query 是什么？怎么发现和优化？
- 事务隔离级别有哪些？
- 乐观锁和悲观锁怎么选？
- 索引为什么能加速查询？
- 什么情况下索引会失效？
- 如何设计分页查询？
- 如何保证接口幂等？
- MySQL 的 redo log、undo log、binlog 分别做什么？
- MVCC 如何实现快照读？
- explain 重点看哪些字段？
- 深分页为什么慢？怎么优化？
- 分库分表什么时候需要？

答题重点：

- 连接池要讲 max pool size、idle timeout、connection timeout、leak detection。
- ORM 要讲开发效率和 SQL 控制权的 trade-off。
- 事务隔离要联系 dirty read、non-repeatable read、phantom read。
- 幂等要讲 idempotency key、唯一约束、状态机、去重表。
- 索引题要讲最左前缀、回表、覆盖索引、索引下推、隐式转换、函数计算。
- 日志题要讲 redo 保证 crash recovery，undo 支持 rollback/MVCC，binlog 用于复制和恢复。

## Redis 高频题

高频题目：

- Redis 为什么快？
- Redis 常见数据结构有哪些？
- Redis 过期删除策略和内存淘汰策略是什么？
- 缓存穿透、击穿、雪崩怎么处理？
- Redis 持久化 RDB 和 AOF 有什么区别？
- Redis 主从复制和哨兵解决什么问题？
- Redis Cluster 如何分片？
- Redis 能不能做消息队列？
- 如何实现分布式锁？
- 大 key、热 key 会造成什么问题？

答题重点：

- Redis 快，不只是因为内存，还包括单线程事件循环、IO 多路复用、数据结构紧凑。
- 缓存问题要能讲 null cache、Bloom filter、singleflight、TTL jitter、prewarm、logical expiration。
- 分布式锁要讲唯一 token、过期时间、续租、释放校验，以及锁并不等于事务。
- Redis 做消息队列要讲 Stream/List/PubSub 的语义差异，尤其是可靠性和消费确认。

## Security 高频题

高频题目：

- 认证和授权有什么区别？
- JWT 的优缺点是什么？
- Session 和 JWT 怎么选？
- SSO 单点登录怎么实现？
- RBAC 和 ABAC 有什么区别？
- 为什么前后端都要做参数校验？
- 敏感数据如何脱敏？
- 密码为什么只能重置，不能找回？
- 常见加密算法怎么分类？
- 如何防止接口被刷？

答题重点：

- 认证是确认“你是谁”，授权是确认“你能做什么”。
- JWT 无状态但撤销困难，适合短有效期 + refresh token + 黑名单/版本号。
- 权限系统要讲 subject、resource、action、condition。
- 安全题不要只讲算法，要讲密钥管理、传输安全、日志脱敏、审计和风控。

## Distributed Systems 高频题

高频题目：

- CAP 和 BASE 怎么理解？
- RPC 和 HTTP API 有什么区别？
- Dubbo / gRPC 这类 RPC 框架通常解决什么问题？
- 分布式 ID 有哪些方案？
- 一致性哈希解决什么问题？
- 分布式锁有哪些实现？
- 分布式事务怎么处理？
- 本地消息表、Outbox、Saga、TCC 有什么区别？
- 配置中心解决什么问题？
- API Gateway 的职责是什么？

答题重点：

- CAP 不要背定义，要讲故障时系统选择停止写、返回旧数据还是继续接受请求。
- 分布式 ID 要比较数据库自增、号段、Snowflake、UUID 的顺序性、可读性、冲突概率和时钟风险。
- 分布式事务不要默认 2PC，很多业务更适合 Saga / Outbox / compensation。
- API Gateway 不应该承载过多业务逻辑，主要负责认证、路由、限流、灰度、观测。

## High Performance and High Availability 高频题

高频题目：

- 如何做数据库读写分离？
- 分库分表怎么选 shard key？
- 冷热数据如何分离？
- 深分页如何优化？
- 消息队列解决什么问题？
- Kafka / RocketMQ / RabbitMQ 怎么选？
- 如何做限流？
- 负载均衡有哪些策略？
- CDN 适合什么场景？
- 高可用系统如何设计冗余和故障切换？

答题重点：

- 高性能不是单点优化，而是从入口、缓存、队列、数据库、异步链路逐层削峰。
- 消息队列要讲削峰、解耦、异步，但必须补幂等、重试、顺序、DLQ。
- 限流要区分全局、用户、租户、接口、资源维度。
- 高可用要讲 RTO/RPO、health check、failover、graceful degradation、circuit breaker。

## Production Java 高频题

高频题目：

- 如何设计一个高可靠的下单接口？
- 如何避免重复提交？
- 如何做接口限流？
- 如何处理下游服务超时？
- 如何设计重试？
- 日志应该打什么？
- 如何设计统一异常处理？
- 如何做灰度发布和回滚？
- 如何排查线上慢接口？
- 如何提升接口吞吐？

成熟回答通常包含：

- timeout：所有外部调用都要有超时。
- retry：只对可重试错误重试，并且要 backoff。
- idempotency：重试前先保证不会重复写。
- circuit breaker：下游异常时避免级联故障。
- observability：metrics、logs、trace、业务指标。
- fallback：非核心能力可以降级，核心交易不能假成功。

## Java 面试答题模板

可以按这个结构回答大多数 Java 问题：

- 先定义：这个机制是什么。
- 再讲场景：什么时候用。
- 再讲原理：底层大致怎么实现。
- 再讲 trade-off：它解决什么问题，引入什么代价。
- 最后讲线上：如果出问题，怎么观测和排查。

例子：

线程池不是“把任务丢进去异步执行”这么简单。它的核心是控制并发、复用线程、隔离资源和提供背压。设计线程池时我会先判断任务是 CPU-bound 还是 IO-bound，再设置有界队列、拒绝策略、超时和监控指标，避免任务无限堆积导致 OOM。

## Example: Java 有界线程池

面试里如果被问到“如何设计异步任务处理”，不要只说 `Executors.newFixedThreadPool()`。更好的答案是显式设置有界队列、线程命名、拒绝策略和监控指标。

```java
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

public class BoundedExecutorExample {
    private static final AtomicInteger THREAD_ID = new AtomicInteger(1);

    private final ThreadPoolExecutor executor = new ThreadPoolExecutor(
            8,
            16,
            60,
            TimeUnit.SECONDS,
            new ArrayBlockingQueue<>(1000),
            runnable -> {
                Thread thread = new Thread(runnable);
                thread.setName("order-worker-" + THREAD_ID.getAndIncrement());
                thread.setDaemon(false);
                return thread;
            },
            new ThreadPoolExecutor.CallerRunsPolicy()
    );

    public void submit(Runnable task) {
        executor.execute(wrapWithMetrics(task));
    }

    private Runnable wrapWithMetrics(Runnable task) {
        return () -> {
            long start = System.currentTimeMillis();
            try {
                task.run();
            } finally {
                long latency = System.currentTimeMillis() - start;
                // record activeCount, queueSize, completedTaskCount, latency
                System.out.println("task latency ms=" + latency);
            }
        };
    }
}
```

这个例子的重点不是代码本身，而是答题时能说清楚：

- 队列有界，避免任务无限堆积。
- 线程数有上限，避免把机器打爆。
- 拒绝策略明确，避免静默丢任务。
- 线程命名可读，方便 `jstack` 排查。
- 任务耗时可观测，方便发现慢任务和队列堆积。

## 高频 Follow-up

- 如果流量突然涨 10 倍，这个 Java service 会先在哪里出问题？
- 线程池队列满了怎么办？
- 数据库连接池满了怎么办？
- 下游慢会如何影响 Tomcat 线程？
- 怎么证明是 GC 问题而不是数据库慢？
- 如果接口偶发 p99 很高，你怎么排查？
- 如果重试导致重复写，你怎么修？
- 如果线上出现 deadlock，你怎么定位？
- Redis hot key 把单 shard 打满怎么办？
- MySQL 慢查询是索引问题、锁问题还是连接池问题，怎么区分？
- 分布式事务失败一半怎么办？
- JWT 泄漏怎么办？
- 消息重复消费怎么办？

## 复习顺序建议

如果时间有限，不要平均复习。建议按下面顺序：

1. Java 基础、集合、并发、JVM。
2. Spring / Spring Boot、事务、MyBatis。
3. MySQL、Redis、索引、事务、缓存问题。
4. 线程池、连接池、限流、重试、幂等、日志、监控。
5. 分布式 ID、锁、事务、MQ、配置中心、API Gateway。
6. 高性能和高可用场景题。

这样准备更接近 JavaGuide 的主线：先把 Java 后端基础打牢，再进入数据库、框架、分布式、高性能和高可用。

## 相关

- [[Coding Interview Playbook]]
- [[Complexity Analysis]]
- [[Hashing and Frequency Maps]]
- [[Heap and Priority Queue]]
- [[System Design Principles]]
- [[Database Choices]]
- [[Caching]]
- [[Queues and Asynchronous Processing]]

## 参考

- [JavaGuide GitHub Repository](https://github.com/snailclimb/JavaGuide)
- [JavaGuide AI 应用开发面试指南](https://javaguide.cn/ai/)
