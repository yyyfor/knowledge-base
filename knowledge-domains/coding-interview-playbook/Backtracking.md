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

## Typical Problems and Solutions

- Subsets: 每个元素只有“选”或“不选”两种决策，可用回溯按索引递进生成整棵选择树。
- Combination Sum: 路径里维护当前和，递归时可重复选择当前数字；一旦和超过目标值就剪枝。
- N-Queens: 每一行尝试放一个皇后，并用列、主对角线、副对角线集合判断是否合法，不合法立即回退。

## Kotlin Template

```kotlin
fun subsets(nums: IntArray): List<List<Int>> {
    val result = mutableListOf<List<Int>>()
    val path = mutableListOf<Int>()

    fun dfs(start: Int) {
        result.add(path.toList())
        for (i in start until nums.size) {
            path.add(nums[i])
            dfs(i + 1)
            path.removeAt(path.lastIndex)
        }
    }

    dfs(0)
    return result
}

fun combinationSum(candidates: IntArray, target: Int): List<List<Int>> {
    val result = mutableListOf<List<Int>>()
    val path = mutableListOf<Int>()
    candidates.sort()

    fun dfs(start: Int, remain: Int) {
        if (remain == 0) {
            result.add(path.toList())
            return
        }

        for (i in start until candidates.size) {
            val value = candidates[i]
            if (value > remain) break
            path.add(value)
            dfs(i, remain - value)
            path.removeAt(path.lastIndex)
        }
    }

    dfs(0, target)
    return result
}
```

## Supplemental Topics

- [[Permutations and Backtracking]]
- [[Tree and Graph Traversal]]
- [[Dynamic Programming]]
- [[Edge Cases in Coding Interviews]]
