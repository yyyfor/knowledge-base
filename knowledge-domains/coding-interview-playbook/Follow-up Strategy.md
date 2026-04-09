---
title: Follow-up Strategy
tags: ["coding-interview"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Follow-up Strategy

Follow-up 决定你是只会一道题，还是能把一个模型在约束变化下继续推下去。

## Notes

面试官的追问通常并不是在刁难你，而是在测试你的解法是否真的被你吃透。空间优化、流式输入、排序前提、one-pass 限制、并行化可能性，这些 follow-up 本质上都在问同一件事：你的模型边界在哪里。

高分回答不需要每个 follow-up 都当场写出新代码，但至少要能迅速判断当前方案哪里被打破、应该换哪类思路、复杂度会发生什么变化。

## Key Points

- space optimization often points to in-place algorithm or two pointers
- huge input often points to streaming or external memory
- sorted input often points to binary search or two pointers
- one-pass constraints often point to hashmap or sliding window
- parallelization often points to divide and conquer

## Supplemental Topics

- [[Complexity Analysis]]
- [[Binary Search]]
- [[Heap and Priority Queue]]
- [[Coding Interview Playbook]]
