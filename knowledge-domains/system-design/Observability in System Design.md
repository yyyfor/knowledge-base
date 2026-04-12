---
title: Observability in System Design
tags: ["system-design", "architecture"]
difficulty: intermediate
estimated_time: 4 min
last_reviewed: 2026-04-12
---

# Observability in System Design

可观测性决定你能不能真正运营一个系统。

核心判断不是“有没有日志”，而是线上出问题时能不能快速回答：发生了什么、影响了谁、原因在哪里、是否恢复。

在 system design 里，先问自己五个问题：

- 关键用户路径有哪些 SLI 和 SLO？
- 请求跨了哪些服务，能不能 trace 到完整链路？
- 出错时能不能按 user、request id、region、shard、dependency 定位？
- 告警是面向用户影响，还是只盯机器指标？
- 是否需要审计日志来解释业务事实？

## Metrics

Metrics 用来回答“系统整体是否健康”。常见指标包括 latency、traffic、errors、saturation，也就是请求延迟、流量、错误率和资源饱和度。

典型例子：

- API p95/p99 latency。
- QPS、consumer lag、queue depth。
- error rate、timeout rate、retry rate。
- CPU、memory、disk、connection pool、thread pool。
- cache hit rate、database slow query、replication lag。

指标适合做 dashboard 和 alert，但它通常不能解释单个请求为什么失败。

## Logs

Logs 用来回答“具体发生了什么”。好的日志应该包含 request id、user id 或 tenant id、关键业务对象 id、错误类型、依赖调用结果和耗时。

日志的重点不是越多越好，而是能在 incident 中复盘关键事实。对于支付、订单、权限、风控这类系统，审计日志也很重要，因为它记录的是业务事实，不只是技术错误。

代价是日志有成本，也有隐私和安全风险。不要随意记录 token、密码、PII 或支付敏感数据。

## Traces

Tracing 用来回答“请求慢在哪里”。当一次请求跨 API gateway、多个服务、cache、database、queue 时，trace 可以显示每一段耗时和错误。

它特别适合排查分布式系统里的 tail latency、级联超时和下游依赖慢的问题。

没有 trace 的系统，经常只能看到“接口慢了”，但不知道是 auth 慢、DB 慢、search 慢，还是某个外部 API 慢。

## Alerts

告警应该围绕用户影响，而不是只围绕机器资源。

更好的告警：

- checkout success rate 降低。
- p99 latency 超过 SLO。
- error budget burn rate 过高。
- queue lag 持续增长。
- replication lag 超过可接受窗口。

较差的告警是每个 CPU spike 都叫醒人，但真正的用户失败率上升反而没人知道。

## 面试回答框架

可以这样回答：

我会给关键链路定义 metrics、logs、traces 和 alerts。Metrics 看整体健康和 SLO；logs 解释具体错误和业务事实；traces 定位跨服务耗时；alerts 按用户影响触发。这样系统不是只被设计出来，而是能被运营、排障和复盘。

很多设计题只讲功能和扩展，却忽略日志、指标、trace、告警和审计。没有可观测性，系统出问题时你只会知道“坏了”，却不知道“为什么坏”。

## 相关

- [[Availability and Reliability]]
- [[How to Approach a System Design Interview]]
- [[System Design Principles]]
