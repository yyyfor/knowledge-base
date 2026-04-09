---
title: Consistency and CAP
tags: ["system-design", "architecture"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Consistency and CAP

Consistency 是分布式系统设计里的关键权衡之一。

详细解释：

当系统分布式化后，通常无法同时无限制地兼得强一致、高可用和分区容忍。system design 题里更重要的是知道业务到底需要多强的一致性，而不是机械背 CAP 定理。

## CAP Theorem Visualized

```mermaid
graph TB
    subgraph "CAP Triangle"
        C[Consistency]
        A[Availability]
        P[Partition Tolerance]

        C --- A
        A --- P
        P --- C
    end

    subgraph "CA Systems - No Partition Tolerance"
        CA1[Single-node DB]
        CA2[Traditional RDBMS]
    end

    subgraph "CP Systems - sacrifice Availability"
        CP1[Redis with Sentinel]
        CP2[HBase]
        CP3[MongoDB with Primary]
    end

    subgraph "AP Systems - sacrifice Strong Consistency"
        AP1[Cassandra]
        AP2[DynamoDB]
        AP3[CouchDB]
    end

    style C fill:#ff9999
    style A fill:#99ff99
    style P fill:#9999ff
```

## Consistency Models Comparison

```mermaid
graph LR
    subgraph "Strong Consistency"
        S1[Linearizability]
        S2[Sequential Consistency]
    end

    subgraph "Weak Consistency"
        W1[Eventual Consistency]
        W2[Read-after-write]
        W3[Session Consistency]
    end

    S1 -->|Time| S2
    S2 -->|Time| W2
    W2 -->|Time| W3
    W3 -->|Time| W1
```

## Replication Consistency Flow

```mermaid
sequenceDiagram
    participant Client
    participant Primary
    participant Replica1
    participant Replica2

    Client->>Primary: Write Data
    Primary->>Primary: Apply Write
    Primary->>Replica1: Replicate Async
    Primary->>Replica2: Replicate Async
    Primary-->>Client: Write Confirmed

    Note over Client,Replica2: Replication Lag

    Client->>Replica1: Read Data (Consistent)
    Client->>Replica2: Read Data (Stale)
```

## Consistency Patterns

**Strong Consistency (CP)**
- 所有节点同时看到相同数据
- 写操作等待所有副本确认
- 示例：金融交易、库存管理

**Eventual Consistency (AP)**
- 系统最终达到一致状态
- 读写可以到不同节点
- 示例：社交媒体、DNS

**Read-after-Write**
- 用户能立即看到自己的写入
- 其他用户可能有延迟
- 示例：用户配置文件

**Causal Consistency**
- 保持因果关系的顺序
- 因果无关的操作可以乱���
- 示例：聊天应用

常见区分：

- strong consistency
- eventual consistency
- read-after-write consistency

相关：

- [[Database Choices]]
- [[Replication and Fault Tolerance]]
- [[System Design Trade-offs]]

