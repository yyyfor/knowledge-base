---
title: Latency and Throughput
tags: ["system-design", "architecture"]
difficulty: intermediate
estimated_time: 4 min
last_reviewed: 2026-04-12
---

# Latency and Throughput

Latency 是单次请求有多快，throughput 是单位时间内能处理多少请求。

核心判断不是“哪个指标更重要”，而是看用户体验、系统瓶颈和处理路径。

在 system design 里，先问自己四个问题：

- 用户是否在同步等待结果？
- 请求路径里有没有慢依赖，比如数据库、外部 API、跨区调用？
- 系统瓶颈是单次请求慢，还是整体处理能力不够？
- 能不能通过批处理、异步化或缓存改变请求路径？

## Latency

Latency 关注一次请求从发出到完成需要多久。用户点击搜索、打开商品详情、登录、下单支付时，感受到的就是 latency。

面试里不要只说 average latency。真实系统更关心 tail latency，比如 p95、p99，因为少量慢请求就会明显影响用户体验。尤其当一个请求需要串联多个服务时，每个服务的尾延迟会被放大。

常见降低 latency 的方法：

- 缓存热点读路径。
- 减少同步 RPC 数量。
- 把非关键逻辑异步化。
- 数据就近部署，减少跨地域调用。
- 为慢依赖设置 timeout、fallback 和降级策略。
- 预计算或预加载常用结果。

代价是，降低 latency 往往会引入缓存一致性、异步状态、数据新鲜度和系统复杂度。

## Throughput

Throughput 关注单位时间能处理多少请求或消息，比如 QPS、TPS、messages per second、rows per second。

它适合描述高并发读写、日志处理、消息消费、批量任务和流式计算。一个系统 latency 可能不是极低，但 throughput 可以很高，比如离线批处理、日志管道、异步通知系统。

常见提高 throughput 的方法：

- 水平扩展 worker 或服务实例。
- 使用队列削峰填谷。
- 批量写入和批量处理。
- 分区、分片或按 key 拆流量。
- 减少锁竞争和共享状态。
- 把同步写改成 append-only 或异步提交。

代价是，追求 throughput 经常会增加单条请求的等待时间，比如 batching 会等一批数据凑齐，队列会引入排队延迟。

## 常见 Trade-off

批处理、异步化和队列能提高吞吐，但可能增加端到端延迟；强同步链路可以让结果更即时，但更容易把延迟放大。

缓存可以降低读 latency，也能提升读 throughput，但会带来失效、过期、穿透和一致性问题。

分片可以提高整体 throughput，但可能引入 hot shard、跨分片查询、跨分片事务和运维复杂度。

## 面试回答框架

可以这样回答：

我会先区分用户同步路径和后台异步路径。同步路径优先控制 p95/p99 latency，减少串行依赖和慢调用；异步路径优先吞吐和可恢复性，用 queue、batching、partitioning 承接峰值。两者的优化方式不同，不能只看平均 QPS。

常见误区是把“高吞吐”直接等同于“低延迟”。它们相关，但不是一回事。一个系统可以吞吐很高但单条请求很慢，也可以单条请求很快但整体容量不够。

## 相关

- [[Caching]]
- [[Queues and Asynchronous Processing]]
- [[Rate Limiting]]
