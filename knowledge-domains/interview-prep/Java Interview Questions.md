---
title: Java Interview Questions
tags: ["coding-interview", "java", "backend", "interview"]
difficulty: intermediate
estimated_time: 25 min
last_reviewed: 2026-04-20
---

# Java Interview Questions

Java 面试不是只背语法点，而是看你能不能把语言特性、集合、并发、JVM、Spring、数据库和线上问题串起来。

核心判断不是“你知道多少 Java 名词”，而是你是否能解释：这个机制解决什么问题，代价是什么，线上如何排查，什么时候不该用。

## 面试通常在考什么

参考 JavaGuide 的知识组织方式，Java 后端面试不能只准备 Java 语言本身，还要覆盖计算机基础、数据库、常用框架、分布式、高性能和高可用。

Java 后端面试通常分成 11 类：

- [[Java Core Interview Answers]]：面向对象、equals/hashCode、String、异常、泛型、反射。
- [[Java Collections Interview Answers]]：HashMap、ConcurrentHashMap、ArrayList、Set、Queue。
- [[Java Concurrency Interview Answers]]：线程池、锁、volatile、synchronized、CAS、CompletableFuture。
- [[Java JVM Interview Answers]]：内存模型、GC、类加载、OOM、CPU 飙高、线程 dump。
- [[Java Spring Interview Answers]]：IoC、AOP、事务、Bean lifecycle、Spring MVC、Spring Boot。
- [[Java IO and Network Interview Answers]]：BIO/NIO/AIO、序列化、HTTP、TCP、连接池、超时。
- [[Java Database and Persistence Interview Answers]]：JDBC、连接池、MySQL、事务、索引、MyBatis/JPA。
- [[Java Redis Interview Answers]]：Redis 数据结构、缓存问题、持久化、集群、分布式锁。
- [[Java Security Interview Answers]]：认证授权、JWT、SSO、权限模型、数据脱敏、接口防刷。
- [[Java Distributed Systems Interview Answers]]：CAP、RPC、分布式 ID、分布式事务、配置中心、网关。
- [[Java Production Engineering Interview Answers]]：限流、重试、幂等、日志、监控、线上排障。
- [[Java Production Follow-up Interview Answers]]：流量突增、线程池/连接池打满、p99、GC、hot key、重复写、死锁和故障恢复。

## 答题方式

可以按这个结构回答大多数 Java 问题：

- 先定义：这个机制是什么。
- 再讲场景：什么时候用。
- 再讲原理：底层大致怎么实现。
- 再讲 trade-off：它解决什么问题，引入什么代价。
- 最后讲线上：如果出问题，怎么观测和排查。

例子：

线程池不是“把任务丢进去异步执行”这么简单。它的核心是控制并发、复用线程、隔离资源和提供背压。设计线程池时我会先判断任务是 CPU-bound 还是 IO-bound，再设置有界队列、拒绝策略、超时和监控指标，避免任务无限堆积导致 OOM。

## 高频 Follow-up

这类问题建议直接看 [[Java Production Follow-up Interview Answers]]，重点不是背单点结论，而是讲清排查顺序、止血动作和长期治理。

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
- [[Java Production Follow-up Interview Answers]]

## 参考

- [JavaGuide GitHub Repository](https://github.com/snailclimb/JavaGuide)
- [JavaGuide AI 应用开发面试指南](https://javaguide.cn/ai/)
