---
title: Dynamic Programming
tags: [coding-interview]
---

# Dynamic Programming

DP 的本质不是背表格，而是先找到可复用状态，再写出正确的状态转移。

## Notes

一旦题目具有最优子结构和重叠子问题，你就要开始考虑 DP。真正关键的是状态定义是否准确，因为状态一旦错了，后面的转移和初始化都会一起歪掉。

答题时最好按固定顺序讲：state 是什么、transition 怎么来、base case 是什么、遍历顺序为什么这样选。这样 DP 就会从“神秘技巧”变成清楚的建模。

## Key Points

- define the state clearly
- write the transition equation
- identify the base case
- decide iteration order or memoized recursion

## Supplemental Topics

- [[Problem Modeling]]
- [[Complexity Analysis]]
- [[Backtracking]]
- [[Common Coding Interview Mistakes]]
