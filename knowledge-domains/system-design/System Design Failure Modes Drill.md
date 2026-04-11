---
title: System Design Failure Modes Drill
tags: [system-design, practice, review, reliability]
difficulty: advanced
estimated_time: 35 min
last_reviewed: 2026-04-10
prerequisites: [[Caching], [Observability in System Design], [Graceful Degradation and Load Shedding]]
---

# System Design Failure Modes Drill

这页练的不是“会不会画架构图”，而是系统已经出问题时，你能不能快速判断故障类型、优先级和止血动作。很多面试官用这类题看 senior 感。

## Drill 1: Cache Hit Rate Suddenly Drops

**现象**:
- Redis hit rate 从 92% 掉到 48%
- 数据库 QPS 暴涨
- 下游延迟飙升

**你要先回答什么**:
1. 这是更像 penetration、breakdown、avalanche，还是普通热点变化？
2. 先看哪些指标？
3. 第一波止血动作是什么？

**高分答案要点**:
- 先区分是大面积 key 同时失效，还是单一热点 key 回源
- 指标优先级：miss rate、top keys、DB QPS、cache TTL 分布、错误率
- 止血动作：限流、请求合并、临时延长 TTL、热点隔离、降级兜底

## Drill 2: Queue Backlog Keeps Growing

**现象**:
- 消息堆积越来越多
- consumer lag 拉大
- 用户异步通知明显延迟

**问题**:
- 你如何判断是生产过快、消费过慢，还是下游故障？
- 你会优先看哪些指标？

**高分答案要点**:
- 生产速率、消费速率、失败重试率、单条处理耗时必须一起看
- 如果是下游依赖慢，盲目扩 consumer 往往只是把压力继续放大
- 止血动作可以包括降级非关键事件、限流、死信隔离、批处理优化

## Drill 3: One Region p99 Latency Is 5x Higher

**现象**:
- 只有一个 region 的 p99 明显升高
- error rate 没有同步明显上升
- 其他 region 正常

**问题**:
- 你会优先怀疑哪些层？
- 为什么不能只看平均延迟？

**高分答案要点**:
- 先看 region 内的 LB、网络抖动、实例健康、下游依赖和副本延迟
- p99 反映的是尾延迟，不看它很容易错过少量慢请求对用户体验的真实伤害
- 需要按 region、AZ、endpoint、instance 分桶看数据

## Drill 4: Hot Key Overload

**现象**:
- 某个热门商品详情页请求量暴涨
- 单个 Redis shard CPU 打满
- 其余 shard 很空

**问题**:
- 这是容量问题还是访问分布问题？
- 你会怎么止血，长期怎么治理？

**高分答案要点**:
- 这是典型访问分布问题，不是简单加机器就能解决
- 短期：复制热点 key、请求合并、边缘缓存、局部限流
- 长期：热点识别、multi-level cache、热点拆分和预热机制

## Drill 5: Replica Lag Causes Stale Reads

**现象**:
- 用户刚修改资料，读请求却看到旧数据
- 主库写入成功
- 只在读写分离路径里复现

**问题**:
- 这是 consistency 还是 availability 取舍问题？
- 哪几种缓解方式最常见？

**高分答案要点**:
- 本质是 replica lag 带来的读写一致性问题
- 常见解法：read-after-write stickiness、关键路径回主库、版本戳校验、延迟读副本

## Incident Response Template

答这类题时，建议固定按下面顺序说：

1. **Symptom**，用户和指标看到了什么  
2. **Classification**，这更像哪一类故障  
3. **Metrics**，先看哪些观测项  
4. **Containment**，第一波止血动作  
5. **Root Cause**，最可能的问题链路  
6. **Long-term Fix**，如何避免再次发生

## Self-Review Rubric

- `1 分` 能先分类，不直接给通用答案
- `1 分` 指标说得具体，不只说“看监控”
- `1 分` 止血动作和根因分析分开讲
- `1 分` 能解释 trade-off
- `1 分` 能补长期治理

## Related Topics

- [[Cache Breakdown]]
- [[Cache Avalanche]]
- [[Hot Key Overload]]
- [[Request Coalescing]]
- [[Observability in System Design]]
- [[Graceful Degradation and Load Shedding]]
