---
title: Availability and Reliability
tags: ["system-design", "architecture"]
difficulty: intermediate
estimated_time: 4 min
last_reviewed: 2026-04-12
---

# Availability and Reliability

Availability 关注系统“能不能用”，reliability 关注系统“结果是否稳定可信”。

核心判断不是“系统永远不坏”，而是坏的时候能不能隔离、恢复，并且不产生错误结果。

在 system design 里，先问自己五个问题：

- 哪些组件是单点故障？
- 哪些请求必须强一致，哪些可以降级或最终一致？
- 失败时应该 retry、fallback、fail fast，还是进入人工处理？
- 系统的 RTO 和 RPO 是多少？
- 如何发现故障、定位故障、恢复故障？

## Availability

Availability 是系统在某个时间点能正常服务请求的概率。用户看到的“页面能不能打开”“下单接口能不能返回”“消息能不能发送”，都属于 availability。

常见提高 availability 的方法：

- 多实例部署，避免单点故障。
- load balancing 和 health check。
- replication 和 failover。
- timeout、retry、circuit breaker。
- graceful degradation 和 fallback。
- 多可用区或多地域容灾。

代价是，availability 通常会牵扯一致性和复杂度。比如多副本可以提高可用性，但主从延迟、脑裂、冲突写和故障切换都要处理。

## Reliability

Reliability 更强调系统长期运行时结果是否正确、稳定、可恢复。一个系统可能“可用”，但如果返回脏数据、重复扣款、消息丢失，就不可靠。

典型可靠性问题：

- 重试导致重复写。
- 消息消费失败或重复消费。
- 缓存和数据库不一致。
- failover 后数据回退。
- 跨服务调用部分成功。
- 故障恢复时没有审计和补偿。

提高 reliability 的常见方法：

- 幂等设计。
- durable queue。
- transaction 或 saga。
- 数据校验和审计日志。
- backfill、reconciliation 和补偿任务。
- 明确 source of truth。

## RTO and RPO

RTO 是恢复服务需要多久，RPO 是最多能接受丢多少数据。

支付、订单、账户这类系统对 RPO 非常敏感，通常不能丢交易事实；内容推荐、搜索索引、统计看板通常可以接受短时间延迟或重建。

面试里讲 availability 时补上 RTO/RPO，会比只说“多副本”成熟很多。

## 常见误区

常见误区是只讲主流程成功，不讲失败路径。真正的高可用设计要说明下游慢了怎么办、依赖挂了怎么办、重试堆积怎么办、恢复后怎么保证数据正确。

另一个误区是把 retry 当成万能解。没有 timeout、backoff、幂等和熔断的 retry，可能会把局部故障放大成全站故障。

## 面试回答框架

可以这样回答：

我会先定义关键链路的可用性目标和正确性要求。读路径可以通过 replica、cache 和 fallback 提高可用性；写路径要更谨慎，重点保证幂等、持久化、恢复和补偿。对核心交易数据，可靠性优先；对非核心体验，可以用降级换可用性。

## 相关

- [[Replication and Fault Tolerance]]
- [[Observability in System Design]]
- [[Consistency and CAP]]
