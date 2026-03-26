# Multi-Level Caching Strategies

高 QPS 系统里的缓存通常不是单层，而是多层协同。

常见层级：

1. client or app cache
2. CDN or edge cache
3. gateway or service local cache
4. distributed cache such as Redis or Valkey

详细解释：

多级缓存的核心目标是把热点越早挡住越便宜。真正的系统成败往往取决于缓存命中率，而不是单台数据库能跑多快。

重点治理问题：

- cache penetration
- cache breakdown
- cache avalanche
- hot key split
- request coalescing
- prewarming
- logical expiration and background refresh

相关：

- [[Caching]]
- [[Design a 10 Million QPS System]]
- [[Bottleneck Analysis in Distributed Systems]]

