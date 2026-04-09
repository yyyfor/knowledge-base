---
title: Problem Modeling
tags: ["coding-interview"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Problem Modeling

Problem modeling 是 coding interview 里最核心的能力，因为面试官真正想看的是你能否把题目转成可解的抽象模型。

## Notes

很多题表面上写的是业务故事，但底层往往只是几个高频模型之一，例如 sliding window、two pointers、prefix sum、DFS/BFS、DP、hashing、heap 或 binary search。建模对了，数据结构和复杂度往往就顺着出来了。

高分信号通常是你能主动说出 “This problem can be modeled as X.” 这代表你不是在碰运气试算法，而是在识别结构。真正的熟练不是背答案，而是能从输入特征和目标函数里看出题型。

## Key Points

- Array and String 通常先想 sliding window、two pointers、prefix sum
- Tree and Graph 通常先判断 DFS、BFS、recursion 或 topological sort
- DP 先定义状态，再找转移方程
- Hashing 适合 frequency map、去重和 O(1) 查找
- Heap 适合 top K 和 streaming
- Binary search 适用于 sorted array 或 monotonic function

## Supplemental Topics

- [[Array and String Patterns]]
- [[Tree and Graph Traversal]]
- [[Dynamic Programming]]
- [[Hashing and Frequency Maps]]
- [[Heap and Priority Queue]]
- [[Binary Search]]
