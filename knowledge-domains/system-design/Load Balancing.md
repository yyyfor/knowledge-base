---
title: Load Balancing
tags: ["system-design", "architecture"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Load Balancing

Load Balancing 用于把流量合理分配到多个实例。

详细解释：

它是横向扩展和高可用的基础能力。system design 题里常见于 web service、API service 和 stateful connection 管理场景。

## Load Balancer Placement

```mermaid
graph TB
    User[Users]
    DNS[DNS]
    GLB[Global Load Balancer]
    LBL1[Region 1 LB]
    LBL2[Region 2 LB]
    WS1[Web Server 1]
    WS2[Web Server 2]
    WS3[Web Server 3]
    WS4[Web Server 4]

    User --> DNS
    DNS --> GLB
    GLB --> LBL1
    GLB --> LBL2
    LBL1 --> WS1
    LBL1 --> WS2
    LBL2 --> WS3
    LBL2 --> WS4

    style GLB fill:#ff9999
    style LBL1 fill:#99ccff
    style LBL2 fill:#99ccff
    style WS1 fill:#99ff99
    style WS2 fill:#99ff99
    style WS3 fill:#99ff99
    style WS4 fill:#99ff99
```

## Load Balancing Algorithms

```mermaid
graph LR
    subgraph "Round Robin"
        A1[Request 1] --> B1[Server 1]
        A2[Request 2] --> B2[Server 2]
        A3[Request 3] --> B3[Server 3]
        A4[Request 4] --> B4[Server 1]
    end

    subgraph "Least Connections"
        C1[Request] --> D1[Server 1: 2 conns]
        C2[Request] --> D2[Server 2: 5 conns]
        C3[Request] --> D3[Server 3: 1 conn]
    end

    subgraph "IP Hash"
        E1[Client IP: 1.2.3.4] --> F1[Server 2]
        E2[Client IP: 1.2.3.4] --> F2[Server 2]
        E3[Client IP: 5.6.7.8] --> F3[Server 1]
    end
```

## Health Check Flow

```mermaid
sequenceDiagram
    participant LB as Load Balancer
    participant S1 as Server 1
    participant S2 as Server 2
    participant S3 as Server 3

    LB->>S1: Health Check
    S1-->>LB: 200 OK

    LB->>S2: Health Check
    S2-->>LB: Timeout

    LB->>S3: Health Check
    S3-->>LB: 200 OK

    Note over LB: Remove S2 from rotation
    Note over LB: Route traffic to S1, S3
```

## Key Algorithms

- **Round Robin**: 依次分发，适合服务器性能相近
- **Weighted Round Robin**: 按权重分发，适合服务器性能不同
- **Least Connections**: 分发到当前连接数最少的服务器
- **IP Hash**: 根据 client IP 做 hash，保证同一用户路由到同一服务器
- **Least Response Time**: 分发到响应时间最短的服务器

相关：

- [[Scalability]]
- [[Availability and Reliability]]
- [[Design a Chat System]]

