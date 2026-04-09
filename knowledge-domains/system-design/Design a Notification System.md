---
title: Design a Notification System
tags: ["system-design", "architecture"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Design a Notification System

通知系统常用于考察异步处理、多通道发送和可靠交付。

核心关注：

- email / SMS / push channels
- fan-out
- retries and dead-letter handling
- rate limiting
- user preferences

相关：

- [[Queues and Asynchronous Processing]]
- [[Rate Limiting]]
- [[Event-Driven Architecture for System Design]]

