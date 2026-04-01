---
title: Backtracking
tags: [coding-interview]
---

# Backtracking

Backtracking 的核心不是暴力枚举，而是通过路径、选择和撤销，把搜索空间按规则系统地遍历一遍。

## Notes

当题目要求列出所有组合、排列、分割或合法构造方案时，backtracking 往往是最自然的模型。它和普通 DFS 的区别在于，你需要显式维护当前路径，并在递归返回时撤销选择。

高质量回答会说明搜索树是什么、每层做什么选择、剪枝条件在哪里、以及为什么当前递归状态足以描述剩余问题。

## Key Points

- path, choice, and undo
- recursive exploration of a search tree
- pruning conditions matter
- careful state restoration is required

## Supplemental Topics

- [[Permutations and Backtracking]]
- [[Tree and Graph Traversal]]
- [[Dynamic Programming]]
- [[Edge Cases in Coding Interviews]]
