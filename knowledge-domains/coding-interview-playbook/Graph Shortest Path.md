---
title: Graph Shortest Path
tags: [coding-interview]
---

# Graph Shortest Path

图最短路问题的关键是先识别边权特征，再决定 BFS、Dijkstra 还是别的更重算法。

## Notes

如果边权统一或每步成本相同，BFS 常常就足够；如果边权非负，则 Dijkstra 往往是标准答案。真正重要的是先看问题结构，而不是一看到 shortest path 就默认上最复杂算法。

这类题的高分点在于你能解释“为什么这个最短路模型成立”，以及优先队列、visited 状态和距离更新规则如何配合。

## Key Points

- unweighted shortest path often uses BFS
- non-negative weighted shortest path often uses Dijkstra
- distance relaxation is the core step
- priority queue often appears in weighted cases

## Supplemental Topics

- [[Tree and Graph Traversal]]
- [[Heap and Priority Queue]]
- [[Dijkstra and Shortest Path]]
- [[Problem Modeling]]
