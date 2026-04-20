---
title: Java JVM Interview Answers
tags: ["coding-interview", "java", "jvm", "interview-answers"]
difficulty: advanced
estimated_time: 30 min
last_reviewed: 2026-04-20
---

# Java JVM Interview Answers

JVM 题不是只背内存区域和 GC 名词，而是看你能不能定位 CPU、内存、GC、类加载和线程问题。

## JVM 内存区域有哪些？

参考回答：

常见划分包括堆、虚拟机栈、本地方法栈、程序计数器、方法区/元空间，以及直接内存。堆主要放对象实例，是 GC 的主要区域；栈保存方法调用帧、局部变量表、操作数栈；程序计数器记录当前线程执行位置；元空间保存类元数据；直接内存常见于 NIO。

线上排障时要区分不同 OOM：heap OOM、metaspace OOM、direct memory OOM、unable to create native thread，它们原因和处理方式不同。

## heap 和 stack 的区别是什么？

参考回答：

heap 是线程共享的对象存储区域，由 GC 管理，容量大但访问和回收成本更高。stack 是线程私有的调用栈，保存方法调用和局部变量，生命周期随方法调用自动入栈出栈。

如果递归过深，容易 StackOverflowError；如果对象持续被引用无法回收，容易 heap OOM。

## 什么对象会进入老年代？

参考回答：

对象通常先分配在新生代。经过多次 Minor GC 仍存活的对象会晋升到老年代；大对象也可能直接进入老年代；如果 survivor 空间放不下，也可能提前晋升。

老年代增长过快常见原因包括缓存无界、集合持有引用、长生命周期对象过多、消息积压、请求上下文未释放。不能只说“调大内存”，要先看对象生命周期是否合理。

## 常见 GC 算法有哪些？

参考回答：

常见算法包括标记-清除、复制、标记-整理和分代收集。新生代对象大多朝生夕死，适合复制算法；老年代对象存活率高，适合标记-清除或标记-整理。现代 GC 会组合多种策略来平衡吞吐、停顿和内存碎片。

回答 GC 题时要说清楚目标：吞吐优先、低延迟优先，还是资源受限。

## G1 GC 的目标是什么？

参考回答：

G1 的目标是在大堆场景下提供更可预测的停顿时间。它把堆划分成多个 Region，不再严格依赖连续的新生代/老年代空间，通过优先回收收益高的 Region 来控制停顿。

G1 适合需要平衡吞吐和延迟的服务端应用。但如果对象分配速率过高、老年代增长过快或 humongous object 很多，也可能出现 mixed GC 压力和 Full GC。

## 什么情况下会发生 OOM？

参考回答：

常见 OOM 包括 heap 对象无法回收、metaspace 类元数据过多、direct memory 使用超限、线程数太多导致无法创建 native thread。原因可能是缓存无界、集合泄漏、连接/线程未释放、动态类生成过多、NIO buffer 未释放。

排查要先看错误类型，再抓 heap dump、线程栈、GC log 和应用指标，定位是流量增长、配置不合理，还是代码持有引用。

## 如何排查 CPU 飙高？

参考回答：

流程是：用 `top` 找到 Java 进程，用 `top -H -p <pid>` 找到高 CPU 线程，把线程 id 转成 16 进制，然后用 `jstack <pid>` 找对应 nid 的线程栈。看它是在业务循环、正则、序列化、加密、GC 线程还是锁竞争。

如果 CPU 高伴随频繁 GC，要结合 GC log 判断是不是对象分配过快或内存泄漏导致。

## 如何排查内存泄漏？

参考回答：

先看内存曲线是否持续上涨且 GC 后不能回落，再抓 heap dump，用 MAT 或 profiler 看 dominator tree、retained size 和对象引用链。重点找大集合、缓存、ThreadLocal、listener、classloader、队列积压。

修复不是简单调大堆，而是移除无界缓存、加 eviction、释放引用、限制队列、修复生命周期管理。

## 类加载过程是什么？

参考回答：

类加载主要包括加载、验证、准备、解析、初始化。加载是把 class 字节码读入 JVM；验证确保字节码安全；准备给静态变量分配内存并赋默认值；解析把符号引用转成直接引用；初始化执行静态变量赋值和静态代码块。

面试里常追问初始化时机，比如 new 对象、访问静态字段、调用静态方法、反射等都会触发类初始化。

## 双亲委派模型解决什么问题？

参考回答：

双亲委派是类加载器收到加载请求时，先委托父加载器加载，父加载不了再自己加载。它保证核心类库优先由 Bootstrap ClassLoader 加载，避免用户自定义 `java.lang.String` 这类类覆盖 JDK 核心类，也减少重复加载。

在一些框架或容器里会打破或调整双亲委派，比如 SPI、Tomcat、OSGi，目的是实现插件隔离或应用隔离。

## Related

- [[Java Interview Questions]]
- [[Java Production Engineering Interview Answers]]
