---
title: Permutations and Backtracking
tags: [coding-interview]
---

# Permutations and Backtracking

排列题是 backtracking 的标准模版，核心在于路径选择、使用状态和撤销操作的配合。

## Notes

这类题很适合展示你是否真的理解 backtracking，因为它要求你显式维护当前路径、可选元素集合和回溯恢复过程。排列和组合的差别，也能在这里被讲得很清楚。

高分回答会说明搜索树的每一层代表什么、为什么 visited 数组或 swap in-place 能避免重复使用、以及结果集合在什么时候收集。

## Key Points

- model: backtracking
- maintain current path and used state
- undo after recursive call returns
- be explicit about duplicate handling if needed

## Supplemental Topics

- [[Backtracking]]
- [[Edge Cases in Coding Interviews]]
- [[Coding Communication]]
- [[Problem Modeling]]
