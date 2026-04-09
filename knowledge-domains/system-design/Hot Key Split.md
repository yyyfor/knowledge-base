---
title: Hot Key Split
tags: ["system-design", "architecture"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Hot Key Split

Hot key split 是针对单个热点 key 过载的一种治理手法：把同一份热点数据拆成多个副本或多个访问入口，分散到不同节点或不同请求路径上。

详细解释：

它的目标不是改变业务语义，而是打散热点集中度。常见做法包括 key replication、按分桶复制热点内容、在应用层做 local cache，或者针对超热点内容走专门读路径。它通常用于热点极强、单 key 已经压到单节点上限的场景。

如何分析：

先确认问题确实是“单 key 太热”而不是“回源太慢”或“value 太大”。再看是否允许多副本、是否能接受短暂不一致、读请求是否可以随机命中多个副本，以及副本更新成本是否可控。

怎么解决：

- replicate hot keys across shards
- route reads randomly or by client hash
- pair with active invalidation or async refresh
- combine with application local cache for ultra-hot reads

适用场景：

- 热门配置、公共榜单、直播间详情、强热点资源页
- 单 key 读取远高于平均值、且读远多于写的场景

常见误区：

- 没有设计副本一致性策略，结果复制了热点却把更新链路搞乱
- 在 value 本身过大时只做 split，不先处理 payload 问题

相关：

- [[Hot Key Overload]]
- [[Cache Breakdown]]
- [[Caching]]
- [[Request Coalescing]]
