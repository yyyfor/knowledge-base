---
title: Complexity Analysis
tags: ["coding-interview"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Complexity Analysis

复杂度不是补充题，而是算法答案的一部分；如果你不主动说，面试官通常会默认你没有真的想清楚。

## Notes

高质量的 complexity analysis 不只是报一个 O(n) 或 O(log n)，而是解释为什么是这样。面试官想听的是：你做了几次遍历、查找成本是多少、是否用了额外存储、状态是否被复用。

复杂度分析也是你 defend 解法的重要武器。很多 follow-up 都围绕“能不能更省空间”“能不能少一遍扫描”“输入更大怎么办”展开，本质上就是逼你重新审视复杂度。

## Key Points

- always state time complexity and space complexity explicitly
- explain complexity with one pass, nested loop, or hash lookup cost
- separate input storage from extra auxiliary space
- connect optimization claims to complexity improvements

## Supplemental Topics

- [[Brute Force and Optimization]]
- [[Follow-up Strategy]]
- [[Hashing and Frequency Maps]]
- [[Heap and Priority Queue]]
