---
title: Caching
tags: ["system-design", "architecture"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Caching

Caching 通过提前保存热点数据来降低延迟和后端压力。

详细解释：

缓存是 system design 里最高频的优化手段之一，但它会带来失效、一致性和热点键问题。设计时要明确缓存对象、更新策略和失效策略。高并发系统里，缓存往往不是附属优化，而是主结构的一部分。

## Architecture Diagram

```mermaid
graph TB
    Client[Client Request]
    LB[Load Balancer]
    L1[Browser/CDN Cache]
    App[Application Server]
    L2[Redis/Memcached]
    L3[Local Cache]
    DB[(Database)]

    Client --> LB
    LB --> L1
    L1 -->|Cache Miss| App
    App --> L3
    App -->|Local Miss| L2
    L2 -->|Cache Miss| DB

    style L1 fill:#e1f5ff
    style L2 fill:#fff4e1
    style L3 fill:#ffe1f5
    style DB fill:#f0f0f0
```

## Cache Strategies Comparison

```mermaid
graph LR
    subgraph "Cache-Aside"
        A1[Check Cache] -->|Miss| B1[Load from DB]
        B1 --> C1[Write to Cache]
        A1 -->|Hit| D1[Return Data]
    end

    subgraph "Write-Through"
        A2[Write Request] --> B2[Update Cache]
        B2 --> C2[Update DB]
        C2 --> D2[Return Success]
    end

    subgraph "Write-Back"
        A3[Write Request] --> B3[Update Cache]
        B3 --> C3[Async DB Write]
        C3 --> D3[Return Success]
    end
```

## Cache Invalidation Flow

```mermaid
sequenceDiagram
    participant App as Application
    participant Cache as Redis Cache
    participant DB as Database
    participant Pub as Message Queue

    App->>Cache: Check Cache
    alt Cache Hit
        Cache-->>App: Return Data
    else Cache Miss
        Cache-->>App: Cache Miss
        App->>DB: Query Database
        DB-->>App: Return Data
        App->>Cache: Write to Cache
        App->>Pub: Publish Invalidation Event
    end

    App->>App: Update Data
    App->>DB: Update Database
    App->>Cache: Invalidate Cache
    Pub->>Cache: Invalidate Distributed Cache
```

高并发场景中的典型问题：

- [[Cache Penetration]]
- [[Cache Breakdown]]
- [[Cache Avalanche]]
- [[Hot Key Overload]]
- [[Large Value Overhead]]

相关：

- [[Latency and Throughput]]
- [[Scalability]]
- [[Database Choices]]
- [[Multi-Level Caching Strategies]]
