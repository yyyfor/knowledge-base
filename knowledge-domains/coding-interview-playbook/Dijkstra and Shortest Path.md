---
title: Dijkstra and Shortest Path
tags: [coding-interview]
---

# Dijkstra and Shortest Path

Dijkstra 是带非负权图最短路的标准答案，重点在于优先队列驱动的最短距离扩展和 relaxation 过程。

## Notes

这题最容易暴露的是候选人对“为什么优先弹出当前最短距离节点”理解不够。真正要讲透的是：在非负权前提下，一旦某节点以最小 tentative distance 出堆，它的最短距离就被确定了。

回答时不仅要会写 priority queue，还要说明 distance array、visited 或 lazy deletion、以及 relaxation 更新相邻节点这几步为什么能一起保证正确性。

## Key Points

- model: weighted shortest path with priority queue
- non-negative weights are the core assumption
- relax edges when a shorter path is found
- heap operations drive the next node choice

## Supplemental Topics

- [[Graph Shortest Path]]
- [[Heap and Priority Queue]]
- [[Tree and Graph Traversal]]
- [[Complexity Analysis]]
