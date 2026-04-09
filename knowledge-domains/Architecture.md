---
title: Architecture
tags: [architecture, systems, overview]
difficulty: intermediate
estimated_time: 15 min
last_reviewed: 2026-04-09
---

# Architecture

Architecture 在这个知识库里更偏“系统怎么拆、数据怎么流、风险点怎么控”的高层设计，而不是某一张静态框图。无论是 system design 还是金融系统，真正重要的是边界、职责和演进路径。

## Notes

如果题目问 architecture，优先回答三件事：核心实体和主链路是什么、哪些组件必须同步保证正确性、哪些可以异步换吞吐。只有把这些说清楚，架构图才不是一堆名词拼贴。

## Recommended Entry Points

- [[Trading System Architecture]]
- [[System Design Knowledge Map]]
- [[API Gateway and Service Boundaries]]
- [[Event-Driven Architecture for System Design]]
- [[Replication and Fault Tolerance]]

## Interview Hint

回答 architecture 类问题时，先给 baseline architecture，再深挖最关键的 1 到 2 个 trade-off。这样比从第一分钟开始堆 Redis、Kafka、Sharding 更像成熟工程判断。
