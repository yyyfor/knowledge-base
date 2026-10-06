---
title: Java 并发与轻量服务实践
tags: ["ai", "rag", "agent", "engineering"]
difficulty: intermediate
estimated_time: 20 min
last_reviewed: 2026-10-06
source_complete: true
---

# Java 并发与轻量服务实践

Java 后端工程关注如何把接口、状态与资源控制组成可靠服务。语言特性应服务于数据建模与并发需求，不能仅用“新版本”证明系统更快。

## 入门：record 和 sealed 类型

record（记录类）是固定组件的数据载体，自动生成访问器、相等性等方法。它是浅层不可变：字段引用不可重新赋值，但引用的 List 仍可能被修改。构造时用 List.copyOf 等方式进行防御性复制；复制列表也不自动深拷贝其元素。

sealed（密封类型）限制哪些类型可继承它，可用来建模 Draft、AwaitingApproval、Completed 等有限状态。Java 17 提供密封类型；Java 21 的模式匹配 switch 可帮助检查状态处理是否完整。预览特性要按项目 JDK 版本确认，不能当成所有版本可直接启用的能力。

## 进阶：虚拟线程不增加数据库容量

Virtual Thread（虚拟线程）由 JVM 调度，Java 21 正式提供，适合大量等待网络或磁盘的阻塞任务。它让同步代码可以承载更多等待，不会让 CPU 密集计算无限加速。数据库连接池、第三方并发额度和内存仍然有限。

为模型请求设置 Semaphore（信号量）限制在途调用，同时设置请求超时、总任务期限、取消和退避重试。不要为每个请求保留巨大的 ThreadLocal 数据。Java 21 中 synchronized 内阻塞可能固定载体线程；JDK 24 的 JEP 491 改善了该情况，排查时必须说明 JDK 版本及其他原生调用边界。

## 项目实践：显式组装服务

Framework-light（轻量框架）不是“不用任何库”，而是减少隐式机制。建立 composition root（组装入口），显式创建配置、DataSource、Repository、Service 和 HTTP 路由，再通过构造函数注入依赖。参数校验、事务、认证、中间件与优雅关闭仍需完整实现。

练习做一个文档状态 API：GET /health、POST /documents、GET /documents/{id}。配置缺少数据库凭据时启动失败；业务服务可用内存 Repository 做单元测试。选择成熟框架或轻量方案都可以，比较开发成本、可观测性、依赖维护和团队能力，不使用未经测量的固定内存或启动时间结论。

## 高阶：排查并发与内存

volatile 提供可见性与排序保证，不让 count++ 自动原子化。ConcurrentHashMap 提供并发安全操作，但跨多次调用的业务不变量仍可能需要 compute、锁或数据库事务。CPU 热点用分析器确认，OOM 结合堆、原生内存、线程与容器限制排查。

GC 选型比较实际工作负载中的暂停、吞吐和内存，不按固定堆大小给出唯一答案。练习在模型延迟升高时压测服务，检查在途请求是否受限、取消是否释放许可、数据库连接是否耗尽，超载是否快速而明确地失败。

## 参考资料

[Oracle：Record 的浅层不可变语义](https://docs.oracle.com/en/java/javase/24/docs/api/java.base/java/lang/Record.html)

[OpenJDK：虚拟线程 JEP 444](https://openjdk.org/jeps/444)

[OpenJDK：同步与虚拟线程 JEP 491](https://openjdk.org/jeps/491)
