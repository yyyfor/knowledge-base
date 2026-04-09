---
title: Database Choices
tags: ["system-design", "architecture"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Database Choices

数据库选型取决于访问模式，而不是流行度。

详细解释：

system design 里常见的问题是：什么时候用 relational database，什么时候用 key-value、document、time-series 或 search engine。没有一种数据库适合所有场景。

常见考虑：

- read/write pattern
- query flexibility
- consistency needs
- indexing and scale

高并发场景下还要重点考虑：

- read-write separation
- hot row or hot shard risk
- precomputation vs real-time queries
- cross-shard transaction avoidance

相关：

- [[Consistency and CAP]]
- [[Data Partitioning and Sharding]]
- [[Design a Search System]]
- [[Design a 10 Million QPS System]]
