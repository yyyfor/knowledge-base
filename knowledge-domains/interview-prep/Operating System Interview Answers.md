---
title: Operating System Interview Answers
tags: ["interview", "operating-system", "backend", "interview-answers"]
difficulty: intermediate
estimated_time: 30 min
last_reviewed: 2026-04-20
---

# Operating System Interview Answers

操作系统题在后端面试里常用于追问线程、内存、I/O、文件和线上性能问题。成熟回答要能把 OS 机制和 Java 服务的表现联系起来。

## 什么是虚拟内存？

参考回答：

虚拟内存让每个进程看到一套连续独立的地址空间，操作系统和 MMU 负责把虚拟地址映射到物理内存。它带来隔离、地址空间管理和按需加载能力。

工程影响是：进程看到的内存不等于真实物理内存；内存不足时可能触发 swap，导致延迟急剧上升。Java 服务线上通常要避免 swap，因为 JVM 停顿和响应时间会变得不可控。

## 分页和分段有什么区别？

参考回答：

分页把地址空间切成固定大小的页，便于内存管理和换入换出；分段按逻辑模块划分，如代码段、数据段、栈段。现代系统主要依赖分页。

分页带来的工程概念包括 page fault、TLB、内存局部性。访问模式差、随机大内存扫描会破坏局部性，影响性能。

## 什么是 page fault？

参考回答：

Page fault 是进程访问的虚拟页当前不在物理内存或没有访问权限时触发的异常。轻微 page fault 可能只是建立映射；严重 page fault 可能要从磁盘加载，成本很高。

如果线上机器频繁 major page fault，接口 p99 可能抖动。排查时可以看 `vmstat`、`sar`、容器 memory limit、RSS、swap 使用。

## 什么是文件描述符？为什么会耗尽？

参考回答：

文件描述符是进程访问文件、socket、pipe 等资源的句柄。每个 TCP 连接、打开文件、日志文件都可能占用 fd。fd 耗尽后，应用可能无法接受新连接、打开文件或连接下游。

原因通常是连接泄漏、文件未关闭、连接池配置过大或突发连接太多。排查可以用 `lsof`、`ulimit -n`、进程 fd 数、连接状态统计。

## 阻塞 I/O、非阻塞 I/O、多路复用有什么区别？

参考回答：

阻塞 I/O 在数据未准备好时线程会等待。非阻塞 I/O 立即返回，需要应用轮询。I/O 多路复用用 select/poll/epoll 让一个线程监听多个 fd 的事件，减少一连接一线程的成本。

Java NIO、Netty、Redis、Nginx 这类高并发系统都和 I/O 多路复用有关。重点不是“非阻塞一定更快”，而是它减少线程阻塞和上下文切换。

## select、poll、epoll 有什么区别？

参考回答：

select 有 fd 数量限制，且每次需要扫描 fd 集合。poll 去掉了固定数量限制，但仍需要线性扫描。epoll 更适合大量连接，它用事件通知机制减少无效扫描。

面试里可以简化为：epoll 在高并发连接场景下扩展性更好，所以 Linux 高性能网络服务常依赖 epoll。

## 什么是零拷贝？

参考回答：

零拷贝是减少数据在用户态和内核态之间的拷贝次数，让数据更直接地从文件系统缓冲区传到网络 socket。典型技术包括 `sendfile`、mmap、DMA。

它适合文件传输、日志传输、消息队列和静态资源服务。Kafka 高吞吐就利用了顺序写和零拷贝思想。

## Load average 高说明什么？

参考回答：

Load average 表示一段时间内可运行和不可中断等待的任务数。它高不一定等于 CPU 高，也可能是 I/O wait、磁盘慢、锁等待或线程太多。

排查要同时看 CPU utilization、run queue、iowait、上下文切换、磁盘延迟和应用线程状态。不能只看 load 就判断 CPU 不够。

## 容器里的 CPU limit 会如何影响 Java 服务？

参考回答：

容器 CPU limit 会限制进程可用 CPU，超过 limit 可能被 throttle。Java 服务如果 CPU throttling 严重，会出现 p99 抖动、GC 变慢、线程调度延迟增加。

排查要看容器 `cpu throttled time`、JVM CPU、GC pause、应用延迟是否对齐。容量评估时不能只看宿主机 CPU，要看容器实际配额。

## Linux 排查线上问题常用哪些命令？

参考回答：

常用命令包括 `top`/`htop` 看 CPU 和进程，`top -H` 看线程，`jstack` 看 Java 线程栈，`vmstat` 看 run queue、swap、iowait，`iostat` 看磁盘，`ss` 看连接，`lsof` 看 fd，`free` 看内存，`dmesg` 看 OOM kill。

成熟回答是把命令和问题对应起来：CPU 高看线程栈，内存高看 heap/RSS/swap，连接异常看 ss/lsof，磁盘慢看 iostat。

## Related

- [[Computer Fundamentals Interview Answers]]
- [[Computer Network Interview Answers]]
- [[Java JVM Interview Answers]]
- [[Java Production Follow-up Interview Answers]]

