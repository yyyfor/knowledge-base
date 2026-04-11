---
title: System Design Trade-off Review
tags: [system-design, practice, review, trade-offs]
difficulty: advanced
estimated_time: 40 min
last_reviewed: 2026-04-10
prerequisites: [[System Design Trade-offs], [Consistency and CAP], [Scalability]]
---

# System Design Trade-off Review

这页用来练最容易失分的一件事，trade-off。很多候选人会列组件，但说不清为什么当前场景选这个方案，而不是另一个看起来也合理的方案。

## Review 1: Strong Consistency vs Availability

**场景**:
- 用户余额扣减
- 金融或库存类关键写操作
- 错一次代价很高

**问题**:
- 什么时候你会明确偏向强一致
- 为此愿意付出什么代价

**高分答案要点**:
- 先保护正确性，再谈吞吐和延迟
- 可能接受更高写延迟、更复杂故障恢复、局部可用性下降
- 关键是说清“为什么这个业务不能接受读旧值或双花”

## Review 2: Push Model vs Pull Model

**场景**:
- 社交 feed
- 粉丝量分布极不均匀

**问题**:
- 什么情况下 push 更划算，什么情况下 pull 更合理

**高分答案要点**:
- 普通用户占多数时 push 往往让读路径更快
- 大 V 场景下 push 会把写放大得很夸张
- 混合模型通常比纯单一策略更现实

## Review 3: Cache-Aside vs Write-Through

**场景**:
- 读多写少的商品详情
- 需要控制数据库压力

**问题**:
- 为什么大多数业务先从 cache-aside 开始
- 什么场景下 write-through 值得考虑

**高分答案要点**:
- cache-aside 实现简单、常见、写路径侵入低
- write-through 更一致，但会增加写延迟和路径复杂度
- 回答时要补数据一致性要求和写流量特征

## Review 4: Monolith First vs Microservices Early

**场景**:
- 新业务刚启动
- 团队不大
- 需求变化快

**问题**:
- 为什么很多团队一开始不该过早拆微服务

**高分答案要点**:
- 小团队早拆服务，常常先引入部署、联调、观测和 ownership 成本
- 如果组织边界、流量和独立扩展需求还不明确，monolith 往往更快
- 微服务不是“更高级”，而是为特定复杂度买单

## Review 5: Sync Path vs Async Path

**场景**:
- 用户下单后要完成库存、支付、通知、分析埋点

**问题**:
- 哪些动作必须留在同步主链路，哪些适合异步化

**高分答案要点**:
- 同步链路只保留影响用户结果正确性的关键动作
- 通知、分析、非关键衍生任务通常异步
- 但异步化不是免费午餐，需要补重试、幂等、顺序和监控

## A Good Trade-off Answer Template

1. 先说当前场景最优先保护的目标  
2. 再给 baseline 方案  
3. 说明这个方案换来了什么  
4. 再明确它牺牲了什么  
5. 最后补一句什么条件变化时你会改方案

## Red Flags During Review

- 只说“industry best practice”，不说业务前提
- 只说优点，不说代价
- 假装今天就要上终局架构
- 不知道什么指标会触发架构切换

## Related Topics

- [[System Design Trade-offs]]
- [[Consistency and CAP]]
- [[Caching]]
- [[Queues and Asynchronous Processing]]
- [[Scalability]]
