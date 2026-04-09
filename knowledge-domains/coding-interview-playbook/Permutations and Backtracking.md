---
title: Permutations and Backtracking
tags: ["coding-interview"]
difficulty: intermediate
estimated_time: 3 min
last_reviewed: 2026-04-09
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

## Typical Problems and Solutions

- Permutations: 生成数组的所有排列。用 swap in-place 或 visited 数组避免重复使用。时间复杂度 `O(n! × n)`，空间复杂度 `O(n)`（递归栈深度）。
- Permutations II: 数组包含重复元素，生成不重复的排列。需要先排序并在递归时跳过重复元素。时间复杂度 `O(n! × n)`，空间复杂度 `O(n)`。
- Combination Sum: 给定候选数组和目标值，找出所有组合，每个数可重复使用。用 backtracking 减去当前值，避免重复解。时间复杂度 `O(n^(t/min + 1))`，其中 t 是目标值，min 是最小候选数。
- Subsets: 生成数组所有子集。每个元素可以选择包含或不包含。时间复杂度 `O(2^n × n)`，空间复杂度 `O(n)`。

## Kotlin Solution

```kotlin
fun permute(nums: IntArray): List<List<Int>> {
    val result = mutableListOf<List<Int>>()
    val n = nums.size
    
    fun backtrack(start: Int) {
        if (start == n) {
            result.add(nums.toList())
            return
        }
        
        for (i in start until n) {
            // Swap current element with start element
            nums[start] = nums[i].also { nums[i] = nums[start] }
            backtrack(start + 1)
            // Backtrack: swap back
            nums[start] = nums[i].also { nums[i] = nums[start] }
        }
    }
    
    backtrack(0)
    return result
}

fun permuteUnique(nums: IntArray): List<List<Int>> {
    val result = mutableListOf<List<Int>>()
    nums.sort()
    val used = BooleanArray(nums.size)
    val current = mutableListOf<Int>()
    
    fun backtrack() {
        if (current.size == nums.size) {
            result.add(current.toList())
            return
        }
        
        for (i in nums.indices) {
            if (used[i]) continue
            if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) continue
            
            used[i] = true
            current.add(nums[i])
            backtrack()
            current.removeAt(current.size - 1)
            used[i] = false
        }
    }
    
    backtrack()
    return result
}

fun combinationSum(candidates: IntArray, target: Int): List<List<Int>> {
    val result = mutableListOf<List<Int>>()
    val current = mutableListOf<Int>()
    
    fun backtrack(start: Int, remaining: Int) {
        if (remaining == 0) {
            result.add(current.toList())
            return
        }
        if (remaining < 0) return
        
        for (i in start until candidates.size) {
            current.add(candidates[i])
            backtrack(i, remaining - candidates[i])
            current.removeAt(current.size - 1)
        }
    }
    
    backtrack(0, target)
    return result
}

fun subsets(nums: IntArray): List<List<Int>> {
    val result = mutableListOf<List<Int>>()
    val current = mutableListOf<Int>()
    
    fun backtrack(start: Int) {
        result.add(current.toList())
        
        for (i in start until nums.size) {
            current.add(nums[i])
            backtrack(i + 1)
            current.removeAt(current.size - 1)
        }
    }
    
    backtrack(0)
    return result
}
```

## Python Solution

```python
from typing import List

def permute(nums):
    """Generate all permutations of array."""
    result = []
    n = len(nums)
    
    def backtrack(start):
        if start == n:
            result.append(nums[:])
            return
        
        for i in range(start, n):
            # Swap current element with start element
            nums[start], nums[i] = nums[i], nums[start]
            backtrack(start + 1)
            # Backtrack: swap back
            nums[start], nums[i] = nums[i], nums[start]
    
    backtrack(0)
    return result

def permute_unique(nums):
    """Generate all unique permutations (with duplicates)."""
    result = []
    nums.sort()
    used = [False] * len(nums)
    current = []
    
    def backtrack():
        if len(current) == len(nums):
            result.append(current[:])
            return
        
        for i in range(len(nums)):
            if used[i]:
                continue
            if i > 0 and nums[i] == nums[i - 1] and not used[i - 1]:
                continue
            
            used[i] = True
            current.append(nums[i])
            backtrack()
            current.pop()
            used[i] = False
    
    backtrack()
    return result

def combination_sum(candidates, target):
    """Find all combinations that sum to target (can reuse elements)."""
    result = []
    current = []
    
    def backtrack(start, remaining):
        if remaining == 0:
            result.append(current[:])
            return
        if remaining < 0:
            return
        
        for i in range(start, len(candidates)):
            current.append(candidates[i])
            backtrack(i, remaining - candidates[i])
            current.pop()
    
    backtrack(0, target)
    return result

def subsets(nums):
    """Generate all subsets of array."""
    result = []
    current = []
    
    def backtrack(start):
        result.append(current[:])
        
        for i in range(start, len(nums)):
            current.append(nums[i])
            backtrack(i + 1)
            current.pop()
    
    backtrack(0)
    return result
```

## Supplemental Topics

- [[Backtracking]]
- [[Edge Cases in Coding Interviews]]
- [[Coding Communication]]
- [[Problem Modeling]]
