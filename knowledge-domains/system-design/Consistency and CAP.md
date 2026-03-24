# Consistency and CAP

Consistency 是分布式系统设计里的关键权衡之一。

详细解释：

当系统分布式化后，通常无法同时无限制地兼得强一致、高可用和分区容忍。system design 题里更重要的是知道业务到底需要多强的一致性，而不是机械背 CAP 定理。

常见区分：

- strong consistency
- eventual consistency
- read-after-write consistency

相关：

- [[Database Choices]]
- [[Replication and Fault Tolerance]]
- [[System Design Trade-offs]]

