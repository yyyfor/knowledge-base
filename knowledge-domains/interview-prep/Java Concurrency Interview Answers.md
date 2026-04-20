---
title: Java Concurrency Interview Answers
tags: ["coding-interview", "java", "concurrency", "interview-answers"]
difficulty: advanced
estimated_time: 35 min
last_reviewed: 2026-04-20
---

# Java Concurrency Interview Answers

并发题看的是你能不能把线程安全、资源隔离、背压、可观测性和线上排障串起来。

## `synchronized` 和 `ReentrantLock` 有什么区别？

参考回答：

`synchronized` 是 JVM 层面的内置锁，语法简单，进入和退出代码块自动加锁释放锁，异常时也能自动释放。`ReentrantLock` 是 JUC 提供的显式锁，需要手动 `lock()` 和 `unlock()`，但功能更灵活，支持可中断锁、公平锁、`tryLock()`、多个 Condition。

一般业务互斥优先用 synchronized，简单且不容易忘记释放锁。如果需要超时获取锁、可中断等待、多个等待队列，才考虑 ReentrantLock。无论哪种锁，都要控制锁粒度和锁内执行时间，避免把 IO、RPC、复杂计算放进锁里。

## `volatile` 能保证什么，不能保证什么？

参考回答：

`volatile` 保证变量的可见性和一定的有序性：一个线程写入 volatile 变量后，其他线程能尽快看到；同时它能禁止特定指令重排序。它不能保证复合操作的原子性，比如 `count++` 包含读、加、写三个步骤，多个线程下仍会丢更新。

适合 volatile 的场景是状态标记、开关、单写多读配置引用。计数器要用 AtomicLong、LongAdder 或加锁。

## CAS 是什么？ABA 问题是什么？

参考回答：

CAS 是 Compare-And-Swap，先比较内存里的值是否等于预期值，如果相等就更新，否则失败重试。它是很多无锁结构和原子类的基础。

ABA 问题是：一个值从 A 变成 B 又变回 A，CAS 只看到当前仍是 A，以为没有变化，但中间状态可能已经影响业务语义。解决方式可以用版本号，比如 `AtomicStampedReference`，或者让状态变化不可逆。

## Java 线程池的核心参数有哪些？

参考回答：

核心参数包括 `corePoolSize`、`maximumPoolSize`、`keepAliveTime`、工作队列、线程工厂和拒绝策略。提交任务时，如果运行线程少于 core，先创建核心线程；否则进入队列；队列满后如果线程数没到 max，再创建非核心线程；还满就触发拒绝策略。

成熟回答必须补：队列要有界，线程要命名，拒绝策略要符合业务语义，线程池要监控 active count、queue size、rejected count、task latency。

## 为什么不建议直接 `Executors.newFixedThreadPool()`？

参考回答：

`newFixedThreadPool()` 默认使用无界队列。高流量或下游变慢时，任务会无限堆积，最终可能 OOM，而且问题暴露得很晚。`newCachedThreadPool()` 则可能创建过多线程，把机器打爆。

更好的做法是显式创建 ThreadPoolExecutor：有界队列、合理线程数、可识别线程名、明确拒绝策略和监控指标。

## 如何设计异步任务处理系统？

参考回答：

先判断任务类型：CPU-bound 还是 IO-bound。CPU-bound 线程数接近 CPU core；IO-bound 可以更高，但要受下游容量限制。然后设计有界队列和拒绝策略，避免无限堆积。任务执行要有 timeout、retry、幂等、失败落库或 DLQ。最后补监控：队列长度、处理耗时、失败率、拒绝数、积压量。

如果任务需要跨进程可靠执行，不要只靠本地线程池，应该考虑消息队列或任务表。

## `CountDownLatch`、`CyclicBarrier`、`Semaphore` 怎么选？

参考回答：

`CountDownLatch` 是一次性倒计时门闩，适合主线程等待多个子任务完成。`CyclicBarrier` 是可复用屏障，适合多个线程互相等待到同一阶段再继续。`Semaphore` 是信号量，适合限制并发访问资源，比如最多 20 个线程同时调用某个下游。

面试里要说出业务场景，不要只背定义。

## `CompletableFuture` 怎么做异步编排？

参考回答：

CompletableFuture 可以把多个异步任务串联、并联和聚合，比如 `thenApply` 做转换，`thenCompose` 做依赖链，`thenCombine` 合并两个结果，`allOf` 等待多个任务完成。使用时要显式传入业务线程池，不要把阻塞任务丢进 common pool。

还要处理异常和超时，否则一个子任务卡住会拖住整条链路。线上要关注线程池隔离，避免一个慢下游把所有异步任务拖死。

## 如何排查死锁？

参考回答：

先通过监控发现线程阻塞、接口卡住或 CPU 不高但请求不返回。然后用 `jstack` 或 arthas 查看线程栈，关注 `BLOCKED` 状态和 deadlock detection，找到互相等待的锁对象和代码位置。修复上通常是统一加锁顺序、缩小锁范围、避免锁内调用外部方法，或者用 tryLock + timeout 降级。

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

## Related

- [[Java Interview Questions]]
- [[Java Production Engineering Interview Answers]]
- [[Queues and Asynchronous Processing]]
