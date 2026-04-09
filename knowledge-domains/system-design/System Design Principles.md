---
title: System Design Principles
tags: ["system-design", "architecture"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# System Design Principles

系统设计的核心是围绕约束做权衡，而不是追求某个“标准答案”。

详细解释：

很多设计题没有唯一解。你需要先明确需求、访问模式、数据规模、延迟要求、故障容忍度和团队复杂度，再决定架构。脱离约束谈技术选型通常没有意义。

常见原则：

- start from requirements
- optimize for the real bottleneck
- prefer simple designs first
- make trade-offs explicit
- design for observability and operations

相关：

- [[System Design Trade-offs]]
- [[Scalability]]
- [[Availability and Reliability]]

