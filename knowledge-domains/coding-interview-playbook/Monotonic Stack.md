---
title: Monotonic Stack
tags: [coding-interview]
---

# Monotonic Stack

Monotonic stack 适合解决“下一个更大/更小元素”以及区间边界类问题，关键在于用单调性把重复比较压掉。

## Notes

这类结构的核心不是 stack 本身，而是你维护的单调不变式。例如递减栈常用于找下一个更大元素，递增栈常用于找下一个更小元素或区间边界。

高分回答要说明为什么一个元素一旦被弹出，就不再可能成为后面答案的一部分。这个解释决定你是否真的理解了单调栈如何把朴素 O(n²) 扫描降到 O(n)。

## Key Points

- maintain monotonic increasing or decreasing order
- use stack to remove dominated candidates
- common in next greater element and range boundary problems
- each index is pushed and popped at most once

## Supplemental Topics

- [[Array and String Patterns]]
- [[Brute Force and Optimization]]
- [[Complexity Analysis]]
- [[Top K Problems]]
