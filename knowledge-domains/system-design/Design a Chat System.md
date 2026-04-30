---
title: Design a Chat System
tags: ["system-design", "architecture"]
difficulty: intermediate
estimated_time: 45 min
last_reviewed: 2026-04-09
---

# Design a Chat System

聊天系统是面试里最常见的“实时 + 状态 + 多端同步”场景之一。它的代表性不在于业务多复杂，而在于你能不能把连接管理、消息投递、顺序、一致性和离线补偿这些问题讲清楚。真正的难点不是把消息存下来，而是让消息在多端、多用户和不稳定网络下还能可靠送达。

回答这题时，最好先收敛 scope：先做一对一聊天，再讨论群聊；先支持文本消息、在线状态和历史消息同步，再补文件、语音、已读回执和消息撤回。这样你能先把主链路做对，而不是一开始就被功能列表带散。

核心关注：

- 先拆连接层和消息层，连接层负责 WebSocket 或长连接管理，消息层负责存储、投递、重试和同步。
- message delivery 需要明确在线用户怎么推送，离线用户怎么补拉，失败后怎么重试以及如何避免重复消费。
- ordering and retries 是关键难点，至少要说清在单会话内如何保证顺序，以及重试时如何依赖 message_id 做幂等。
- online presence 不能只说“存 Redis”，还要讲心跳、过期、广播范围和多设备状态同步。
- group chat scaling 需要说明 fan-out 是写扩散、读扩散还是混合方案，以及群规模变化后架构如何演进。

适用场景：

- 适用于 IM、企业协作、客服咨询、游戏聊天和任何强调实时消息送达与多端同步的场景。
- 也适用于练习长连接管理、消息队列、状态同步和高可用设计，因为这些能力会反复出现在其他实时系统里。

常见误区：

- 常见误区是只讲 WebSocket 建连，却没有讲消息怎么持久化、离线怎么补偿、重复怎么去重。
- 另一个误区是直接给出很重的群聊广播方案，却没有先按一对一和小群场景收敛问题。

面试回答方式：

- 开场先说我会把系统分成 connection management、message write path、message delivery 和 history sync 四段。
- 先给出 baseline architecture：Gateway、Connection Service、Chat Service、Message Store、Queue、Presence Service 和 Notification Service。
- 深挖时重点讲消息发送和接收主链路、会话内顺序保证、离线补拉和群聊 fan-out trade-off。
- 收尾时补 observability、消息积压、连接数扩展、跨机房和数据保留策略。

## Chat System Architecture

```mermaid
graph TB
    User[User Client]
    LB[Load Balancer]
    Gateway[WebSocket Gateway]
    Conn[Connection Service]
    Chat[Chat Service]
    MessageDB[(Message DB)]
    MessageQueue[Message Queue]
    Presence[Presence Service]
    Cache[Redis Cache]
    Push[Push Service]
    Analytics[Analytics]

    User -->|WebSocket| Gateway
    Gateway --> LB
    LB --> Conn

    Conn --> Presence
    Conn --> Chat

    Chat --> MessageDB
    Chat --> MessageQueue
    Chat --> Cache

    MessageQueue --> Push
    MessageQueue --> Analytics

    Presence --> Cache

    style Gateway fill:#e1f5ff
    style MessageDB fill:#f0f0f0
    style Cache fill:#fff4e1
    style Push fill:#ffe1f5
```

## Message Send Flow

```mermaid
sequenceDiagram
    participant Sender
    participant ChatService
    participant MessageDB
    participant Queue
    participant Receiver
    participant PushService

    Sender->>ChatService: Send Message
    ChatService->>MessageDB: Store Message
    ChatService->>Queue: Enqueue Message
    ChatService-->>Sender: Message Sent

    Queue->>Receiver: Poll/Subscribe
    Receiver->>PushService: Push Notification
    PushService-->>Receiver: New Message Alert
    Receiver->>ChatService: Fetch Message History
    ChatService-->>Receiver: Return Messages
```

## Online Presence Management

```mermaid
sequenceDiagram
    participant Client
    participant PresenceService
    participant Redis
    participant NotificationService

    Client->>PresenceService: Connect
    PresenceService->>Redis: Set Online Status
    PresenceService->>NotificationService: Broadcast Online
    NotificationService-->>Client: Friend Online Notification

    Note over Client: Heartbeat every 30s

    Client->>PresenceService: Heartbeat
    PresenceService->>Redis: Refresh TTL

    Note over Client: No heartbeat for 90s

    Redis->>PresenceService: TTL Expired
    PresenceService->>NotificationService: Broadcast Offline
    NotificationService-->>Client: Friend Offline Notification
```

## Group Chat Message Distribution

```mermaid
graph TB
    subgraph "Fan-out on Write"
        Sender[Sender]
        ChatService[Chat Service]
        Receiver1[Receiver 1]
        Receiver2[Receiver 2]
        Receiver3[Receiver 3]

        Sender -->|1 Message| ChatService
        ChatService -->|Copy 1| Receiver1
        ChatService -->|Copy 2| Receiver2
        ChatService -->|Copy 3| Receiver3
    end

    subgraph "Fan-out on Read"
        Sender[Sender]
        ChatService[Chat Service]
        GroupInbox[Group Inbox]
        Receiver1[Receiver 1]
        Receiver2[Receiver 2]

        Sender -->|1 Message| ChatService
        ChatService -->|1 Copy| GroupInbox
        Receiver1 -->|Fetch| GroupInbox
        Receiver2 -->|Fetch| GroupInbox
    end
```

## Storage Estimation

假设：

- 10 million DAU。
- 每个 DAU 每天发送 40 条消息。
- 平均消息正文 200 bytes，metadata 300 bytes，包括 message_id、conversation_id、sender_id、timestamp、status、device_id 和索引 overhead。
- 消息三副本，热消息保留在缓存 7 天，历史消息长期保留 1 年。
- 在线状态记录 200 bytes per active device，平均每个用户 1.5 台设备在线峰值。

估算：

- 每日消息数：10M * 40 = 400M messages/day。
- 每条消息总量：200 B + 300 B = 500 B。
- 每日消息原始存储：400M * 500 B = 200 GB/day。
- 三副本：600 GB/day，一年约 219 TB。
- 热消息缓存 7 天：200 GB/day * 7 = 1.4 TB，考虑副本和 overhead 可按 3 到 4 TB cache/storage tier 估。
- 在线状态峰值：10M * 1.5 * 200 B = 3 GB，Redis overhead 和副本后可按 10 到 20 GB 估。
- 群聊 fan-out on write 会放大 inbox 存储，例如平均 fan-out 20，则 inbox index 可能比原始消息大得多；大群要考虑 fan-out on read 或混合方案。

面试表达：

- 消息正文、消息索引、会话 inbox 和附件要分开估。
- 附件不要放进 message store，只存 object key 和 metadata。
- 群聊规模会改变存储模型，小群可写扩散，大群应避免为每个成员复制完整消息。

## Key Components

- **WebSocket Gateway**: 管理长连接，处理连接建立和断开
- **Connection Service**: 维护在线用户连接，路由消息到正确连接
- **Chat Service**: 处理消息发送、接收和存储
- **Message Store**: 持久化消息历史，支持分片
- **Message Queue**: 异步消息分发，解耦发送和推送
- **Presence Service**: 管理用户在线状态，处理心跳和多设备
- **Push Service**: 向离线用户推送通知
- **Cache Layer**: 缓存最近消息和在线状态

## 高频追问与标准回答

Q1：WebSocket 推送成功是否代表消息发送成功？

A：不代表。消息成功的标准应该是写入 message store 并生成 committed message id。WebSocket push 只是派生投递路径，可能失败、重复或延迟，客户端要用 ack 和 cursor 做补拉。

Q2：如何保证消息顺序？

A：通常只保证 conversation 内顺序，不保证全局顺序。可以按 conversation_id 分区写入消息日志，由服务端生成递增 message_id 或 logical sequence，客户端按 sequence 展示。

Q3：群聊 fanout-on-write 和 fanout-on-read 怎么选？

A：小群适合 fanout-on-write，读快且离线 inbox 简单；超大群适合 fanout-on-read 或混合方案，避免为每个成员复制完整消息。面试中要根据群规模和读写比例选择。

Q4：慢客户端怎么办？

A：每个连接设置 bounded outbound buffer。缓冲区满时可以丢弃 presence/typing 这类非关键事件，消息事件则要求客户端用 cursor 补拉；持续慢连接可以断开并让客户端重连。

Q5：重复发送怎么处理？

A：发送 API 带 clientMessageId，服务端对 `(sender_id, clientMessageId)` 建唯一约束。重复请求返回同一个 committed message，而不是创建新消息。

相关：

- [[Load Balancing]]
- [[Queues and Asynchronous Processing]]
- [[Availability and Reliability]]
- [[System Design Project Storytelling Template]]
