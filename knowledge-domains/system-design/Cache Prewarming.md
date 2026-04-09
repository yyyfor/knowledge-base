---
title: Cache Prewarming
tags: ["system-design", "architecture"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Cache Prewarming

Cache prewarming 指的是在正式流量到来前，主动把高概率会被访问的数据装入缓存，降低冷启动和大流量开场时的回源压力。

详细解释：

它常用于缓存重启、节点扩容、大促、活动发布、首页改版和热门内容上线等场景。预热做得好，可以明显降低冷启动窗口的 miss 风险；预热做得差，则可能制造批量写入、批量失效和不必要的数据污染。它不是“把所有东西都提前塞进缓存”，而是要基于热点预测与容量预算来做选择。

如何分析：

先判断哪些对象值得预热：稳定热点、启动必需数据、活动核心数据、访问峰值之前高概率被读的数据。再评估预热窗口、缓存容量、写入节奏、是否需要分批、以及预热失败时是否有 fallback。

怎么解决：

- prewarm by top hot keys and critical paths only
- rate-limit prewarm jobs to avoid self-made spikes
- verify hit rate improvement after warmup
- combine with TTL jitter and multi-level cache

适用场景：

- 缓存集群重启、应用新实例上线、活动流量预期明显的系统
- 首页、热门 feed、核心配置和必须低延迟的公共读路径

常见误区：

- 预热范围过大，把冷数据也写进去，反而挤掉真正热点
- 预热任务没有限速或分批，自己制造一轮回源洪峰

相关：

- [[Cache Avalanche]]
- [[Multi-Level Caching Strategies]]
- [[Caching]]
- [[Capacity Estimation for System Design]]
