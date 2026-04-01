---
title: Tree and Graph Traversal
tags: [coding-interview]
---

# Tree and Graph Traversal

树和图题的基础骨架通常就是 DFS、BFS、recursion 和 traversal state 的管理。

## Notes

这类题首先要判断结构是树还是一般图，因为是否存在环、是否需要 visited、是否能依赖 parent-child 关系，会直接改变遍历策略。

DFS 更适合递归展开、路径回溯和子树聚合，BFS 更适合按层遍历、最短步数和从源点逐层扩展。高分关键不是背遍历模板，而是知道为什么当前题要用这个遍历顺序。

## Key Points

- DFS / BFS
- recursion
- visited set and traversal state
- 树和图要先区分是否有环

## Supplemental Topics

- [[Graph Shortest Path]]
- [[Backtracking]]
- [[Dijkstra and Shortest Path]]
- [[Problem Modeling]]
