# System Design Offer-Level Playbook

System design 面试不是在回答孤立问题，而是在约束下主导一场设计讨论。高质量回答的关键，不是组件越多越好，而是你能否稳定地把节奏控住：先问准问题，再做规模估算，再给高层设计，再把瓶颈、trade-off、failure handling 和演进路径讲透。

详细解释：

Offer 级回答通常遵循固定顺序：clarify requirements and constraints → quick estimation → high-level architecture → data flow → deep dive → bottleneck → trade-offs → failure handling → evolution → close. 这个顺序的价值在于，它让面试官看到你不是在随机输出知识点，而是在像真正的 senior engineer 一样组织决策。

开局最关键。你可以直接说：
- "Before jumping into design, let me clarify requirements and constraints to make sure we are solving the right problem."

必须问的问题：
- scale（DAU / QPS）
- latency requirement（ms vs seconds）
- consistency（strong vs eventual）
- read/write ratio
- core features（优先级）

Senior 加分问题：
- Is this system read-heavy or write-heavy?
- Are we optimizing for cost or performance?

规模估算：
- "Let me do a quick estimation to guide design decisions."
- 10M users
- 10% active -> 1M
- peak QPS as an order-of-magnitude estimate
- This helps us decide whether we need sharding or not

高层设计时至少要有：
- client
- load balancer
- service
- cache
- DB

高层设计时可以主动补一句：
- I will keep services stateless to enable horizontal scaling

Data flow 必须线性讲清楚：
- request -> load balancer
- load balancer -> service
- service -> cache
- cache miss -> DB
- clarify what is synchronous vs asynchronous
- point out where latency is likely to happen

Deep dive 不要贪多，通常只选 1 到 2 个点：
- data model（schema / indexing）
- scaling（cache / replica / sharding）
- consistency（strong vs eventual / SAGA）
- caching（strategy / invalidation）

黄金句：
- I will focus on X because this is likely the bottleneck.

瓶颈分析：
- The first bottleneck will likely be the database.
- Typical optimization order: cache -> read replica -> sharding

高频 trade-offs：
- consistency vs availability
- latency vs cost
- simplicity vs scalability
- Using cache reduces DB load, but introduces potential data inconsistency

Failure handling：
- service crash
- network failure
- retry with backoff
- circuit breaker
- fallback
- We should avoid cascading failures by introducing circuit breakers

Evolution thinking：
- I would start simple and evolve the system as traffic grows.
- v1 -> monolith
- v2 -> introduce cache
- v3 -> microservices

标准收尾：
- "That covers the main design. I can dive deeper into scaling, consistency, or failure handling."

Payment system 示例：
- strong consistency required
- high reliability
- moderate latency acceptable
- API layer
- payment service
- ledger DB
- queue for async processing
- use ledger DB for immutability and auditability
- avoid distributed transaction when possible
- use SAGA where appropriate
- DB write contention can become the bottleneck
- partition by user or account when needed
- strong consistency usually means higher latency
- use payment retry plus idempotency key

面试官追问路径：
- Level 1: how to scale? what is bottleneck?
- Level 2: how to handle failure? how to ensure consistency?
- Level 3: how to evolve system? what if traffic 10x?
- Level 4: what would you remove to simplify? what are hidden risks?

反问面试官：
- What tradeoffs would you prioritize here?
- How does your team handle this in production?

相关：
- [[How to Approach a System Design Interview]]
- [[Capacity Estimation for System Design]]
- [[Bottleneck Analysis in Distributed Systems]]
- [[System Design Trade-offs]]
- [[Graceful Degradation and Load Shedding]]
- [[Design a 10 Million QPS System]]
