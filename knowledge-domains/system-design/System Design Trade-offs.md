---
title: System Design Trade-offs
tags: ["system-design", "architecture"]
difficulty: intermediate
estimated_time: 4 min
last_reviewed: 2026-04-12
---

# System Design Trade-offs

几乎所有 system design 题的本质都是 trade-off。

核心判断不是“哪个方案最好”，而是哪个方案在当前约束下牺牲最合理。

在 system design 里，先问自己五个问题：

- 这个系统最不能错的是什么？
- 用户最敏感的是延迟、可用性、准确性，还是成本？
- 当前规模下真正瓶颈在哪里？
- 失败时宁愿返回旧数据、拒绝请求、排队等待，还是冒一致性风险？
- 这个复杂度是否值得现在引入？

## Common Trade-offs

- consistency vs availability
- latency vs correctness
- simplicity vs flexibility
- cost vs performance
- build fast vs build robust

## Consistency vs Availability

如果网络分区、节点故障或跨区域复制出现问题，系统经常要在一致性和可用性之间做取舍。

支付、账户、库存这类系统更偏向 correctness 和 consistency。即使牺牲部分可用性，也不能重复扣款、超卖或写出错误账务。

推荐流、搜索、统计、feed 这类系统通常可以接受短时间 stale data，用最终一致换更高可用性和更低延迟。

## Latency vs Correctness

同步校验、强事务、跨服务确认可以提高正确性，但会增加 latency 和失败面。

缓存、异步化、预计算可以降低 latency，但会引入数据新鲜度、重复消费和补偿问题。

面试里要说清楚：哪些链路必须同步正确，哪些链路可以最终一致。比如下单核心写路径不能随便异步“假成功”，但发送通知、更新搜索索引、写 analytics 可以异步。

## Simplicity vs Flexibility

简单设计更容易上线、调试和维护，但扩展空间可能有限。灵活设计能支持更多场景，但通常带来抽象、配置、运维和认知成本。

成熟的选择不是永远简单，也不是永远灵活，而是按当前阶段决定。早期产品可以用更简单的数据模型和服务边界；当多团队、多租户、多区域、多业务线出现后，再引入更强的抽象。

## Cost vs Performance

高性能通常要付出成本，比如更多副本、更大的机器、更激进的缓存、更复杂的索引、更短的跨区距离。

不是所有系统都需要 p99 低到极致。后台报表、离线任务、非关键推荐可以接受更高延迟，以换取更低成本。支付、登录、核心搜索、交易撮合则可能需要为低延迟和可靠性付费。

## Build Fast vs Build Robust

面试里可以承认阶段性取舍。

MVP 阶段可以优先清晰、可验证、可演进。核心交易系统、合规系统、金融账务系统则不能用“以后再补”来处理数据正确性、审计和恢复。

关键不是“快”或“稳”二选一，而是知道哪些部分可以后补，哪些部分从第一天就必须严肃设计。

## 面试回答框架

可以这样回答：

我不会只说某个技术更好，而会先明确约束。核心交易数据优先 consistency、durability 和 auditability；用户体验路径优先 latency 和 availability；非核心派生数据可以异步和最终一致。每个选择都说明收益、代价和未来扩展路径。

面试官通常更看重你是否知道为什么这样选，而不是你是否选了某个“正确技术”。能把 trade-off 说清楚，通常比堆术语更重要。

## 相关

- [[System Design Principles]]
- [[Consistency and CAP]]
- [[Scalability]]
