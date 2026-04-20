---
title: Computer Network Interview Answers
tags: ["interview", "network", "backend", "interview-answers"]
difficulty: intermediate
estimated_time: 35 min
last_reviewed: 2026-04-20
---

# Computer Network Interview Answers

计算机网络题在后端面试里经常从 TCP/HTTP 基础延伸到超时、连接池、重试、负载均衡和线上排障。

## TCP 和 UDP 有什么区别？

参考回答：

TCP 是面向连接、可靠、有序、面向字节流的协议，有重传、拥塞控制和流量控制。UDP 无连接、不保证可靠和有序，但开销低、延迟小。

业务系统里 HTTP/1.1、HTTP/2 通常跑在 TCP 上；直播、游戏、DNS、实时音视频可能使用 UDP 或基于 UDP 的协议。选择不是谁高级，而是看可靠性、延迟和应用层是否能处理丢包。

## TCP 三次握手为什么不是两次？

参考回答：

三次握手用于确认双方发送和接收能力，并同步初始序列号。两次握手无法让服务端确认客户端已经收到自己的响应，也容易受到历史连接请求影响。

面试里可以补工程影响：建连有成本，所以服务间调用通常用连接池和 keep-alive 复用连接。

## TCP 四次挥手为什么可能出现 TIME_WAIT？

参考回答：

TCP 是全双工，双方发送方向要分别关闭，所以通常需要四次挥手。主动关闭方进入 TIME_WAIT，是为了确保最后的 ACK 能被对方收到，并让旧连接中的延迟报文自然过期。

TIME_WAIT 太多可能来自短连接过多。优化方向是连接复用、合理 keep-alive、端口范围和超时配置，而不是盲目调内核参数。

## HTTP 和 HTTPS 有什么区别？

参考回答：

HTTP 明文传输，HTTPS 在 HTTP 下加入 TLS，提供加密、身份认证和完整性保护。TLS 通过证书验证服务器身份，并协商会话密钥。

HTTPS 只能保护传输链路，不代表应用安全。仍要做认证授权、参数校验、防重放、日志脱敏和权限控制。

## HTTP/1.1、HTTP/2、HTTP/3 有什么区别？

参考回答：

HTTP/1.1 支持 keep-alive，但同一连接上容易有队头阻塞。HTTP/2 支持多路复用、头部压缩和二进制帧，能在一个连接上并发多个流。HTTP/3 基于 QUIC/UDP，减少 TCP 层队头阻塞，并优化握手延迟。

工程上要关注代理、网关、客户端和服务端是否支持，以及连接数、延迟和兼容性。

## DNS 解析慢会怎样影响接口？

参考回答：

如果服务调用每次都做 DNS 解析，或者 DNS 解析异常，连接建立会变慢，表现为接口偶发超时或 p99 抖动。很多 HTTP client 会缓存 DNS，但缓存时间和刷新策略不同。

排查要看 trace 中 DNS、connect、TLS、request wait 的耗时拆分。治理上可以使用连接池、合理 DNS cache、服务发现、熔断和超时。

## 连接超时、读取超时、整体超时有什么区别？

参考回答：

连接超时是建立连接阶段超时；读取超时是连接建立后等待响应数据超时；整体超时是整个请求从开始到结束的最大时间限制。

生产系统三个都要考虑。只有 connect timeout 没有 read timeout，会导致线程长时间卡住；没有整体 deadline，重试链路可能超过用户可接受时间。

## 什么是拥塞控制和流量控制？

参考回答：

流量控制是接收方告诉发送方自己还能接收多少，避免把接收方缓冲区打爆。拥塞控制是发送方根据网络拥塞情况调整发送速率，避免把网络打爆。

应用层也有类似思想：限流保护服务，背压保护下游，队列有界防止无限堆积。

## 负载均衡有哪些策略？

参考回答：

常见策略包括 round-robin、weighted round-robin、least connections、random、consistent hashing、基于延迟或健康状态的动态调度。不同策略适合不同场景。

如果请求有状态或缓存局部性强，可以考虑一致性哈希或 sticky session，但 sticky 会降低故障切换灵活性。大多数服务应尽量无状态化。

## 大量连接处于 CLOSE_WAIT 说明什么？

参考回答：

CLOSE_WAIT 通常表示对端已经关闭连接，本端应用还没有关闭 socket。大量 CLOSE_WAIT 往往是应用没有正确释放连接或读写流程卡住。

排查要看应用连接池、HTTP client 是否关闭 response body、线程是否阻塞、fd 是否增长。修复通常是正确关闭资源、设置超时和连接池回收策略。

## Related

- [[Java IO and Network Interview Answers]]
- [[Operating System Interview Answers]]
- [[Java Production Follow-up Interview Answers]]

