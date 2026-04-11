---
title: Data Partitioning and Sharding
tags: ["system-design", "architecture"]
difficulty: intermediate
estimated_time: 45 min
last_reviewed: 2026-04-09
---

# Data Partitioning and Sharding

当单机数据库无法承受数据量或流量时，通常需要分片。

详细解释：

分片的核心问题不是“怎么切”，而是“按什么键切、热点如何处理、跨分片查询怎么办”。它通常是规模上来后的必要复杂度。

## Sharding Strategies

```mermaid
graph TB
    subgraph "Horizontal Sharding"
        H1[Shard 1: Users A-F]
        H2[Shard 2: Users G-L]
        H3[Shard 3: Users M-Z]
    end

    subgraph "Vertical Sharding"
        V1[Database 1: User Profile]
        V2[Database 2: User Messages]
        V3[Database 3: User Analytics]
    end

    subgraph "Directory-based Sharding"
        D1[Lookup Service]
        D2[Shard A]
        D3[Shard B]
        D4[Shard C]

        D1 --> D2
        D1 --> D3
        D1 --> D4
    end
```

## Sharding Key Selection

```mermaid
graph LR
    subgraph "Hash-based Sharding"
        A[User ID] --> B[Hash Function]
        B --> C[Shard 1-3]
    end

    subgraph "Range-based Sharding"
        D[User ID] --> E{Range Check}
        E -->|1-1000| F[Shard 1]
        E -->|1001-2000| G[Shard 2]
        E -->|2001-3000| H[Shard 3]
    end

    subgraph "Geographic Sharding"
        I[IP/Location] --> J{Geo Routing}
        J -->|Asia| K[Asia Shard]
        J -->|Europe| L[Europe Shard]
        J -->|US| M[US Shard]
    end
```

## Query Routing with Sharding

```mermaid
sequenceDiagram
    participant App
    participant Router
    participant Config
    participant Shard1
    participant Shard2

    App->>Router: Query User 123
    Router->>Config: Get Shard Mapping
    Config-->>Router: User 123 -> Shard 2
    Router->>Shard2: Query User 123
    Shard2-->>Router: Return Data
    Router-->>App: Return Result

    App->>Router: Query All Users
    Router->>Shard1: Query Users
    Router->>Shard2: Query Users
    Shard1-->>Router: Partial Results
    Shard2-->>Router: Partial Results
    Router->>Router: Merge Results
    Router-->>App: Return All Users
```

## Rebalancing Strategy

```mermaid
graph TB
    subgraph "Before Rebalancing"
        B1[Shard 1: 70GB]
        B2[Shard 2: 20GB]
        B3[Shard 3: 10GB]
    end

    subgraph "After Rebalancing"
        A1[Shard 1: 33GB]
        A2[Shard 2: 33GB]
        A3[Shard 3: 34GB]
    end

    B1 -->|Move 37GB| A3
    B2 -->|Move 13GB| A1
    B3 -->|Move 23GB| A2

    style B1 fill:#ff9999
    style B2 fill:#ffff99
    style B3 fill:#99ff99
```

## Key Considerations

**选择分片键的考虑因素：**
- 查询模式：主要查询的维度
- 数据分布：避免热点
- 扩展性：支持增加分片
- 路由效率：减少跨分片查询

**常见分片策略：**

1. **Hash-based Sharding**
   - 优点：数据分布均匀
   - 缺点：难以按范围查询
   - 适合：用户数据、订单数据

2. **Range-based Sharding**
   - 优点：支持范围查询
   - 缺点：可能导致数据倾斜
   - 适合：时间序列数据、日志数据

3. **Directory-based Sharding**
   - 优点：灵活映射，易于重新平衡
   - 缺点：依赖查找服务
   - 适合：需要动态调整的场景

4. **Geographic Sharding**
   - 优点：减少延迟，符合合规要求
   - 缺点：可能数据分布不均
   - 适合：全球部署的应用

## Common Failure Modes

- 分片键只按数据量均匀选择，却没有匹配主要查询模式，导致大量 scatter-gather 查询。
- 按时间 range sharding 后，所有新写入集中到最新分片，形成写热点。
- 跨分片事务没有边界控制，订单、支付、库存更新被拆到多个 shard 后一致性复杂度暴涨。
- rebalancing 没有在线迁移方案，只能停机搬数据。
- shard mapping 缓存不一致，路由层把请求打到旧 shard。

## Interview Guidance

- 先说明为什么需要分片：容量、QPS、热点、合规或地域延迟。
- 分片键要从查询模式推导，不要只说 hash user_id。
- 主动讲跨分片查询、全局唯一 ID、rebalancing、热点 shard 和 shard mapping。
- 如果业务核心是订单或聊天，优先保证同一用户、同一会话或同一订单相关数据尽量共址。
- 收尾补 observability：per-shard QPS、storage、latency、hot key、migration lag 和 routing error。

相关：

- [[Database Choices]]
- [[Scalability]]
- [[Replication and Fault Tolerance]]
