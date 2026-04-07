---
title: Dynamic Programming
tags: [coding-interview]
---

# Dynamic Programming

DP 的本质不是背表格，而是先找到可复用状态，再写出正确的状态转移。

## Notes

一旦题目具有最优子结构和重叠子问题，你就要开始考虑 DP。真正关键的是状态定义是否准确，因为状态一旦错了，后面的转移和初始化都会一起歪掉。

答题时最好按固定顺序讲：state 是什么、transition 怎么来、base case 是什么、遍历顺序为什么这样选。这样 DP 就会从“神秘技巧”变成清楚的建模。

中等题示例：House Robber。题目是给你一个非负整数数组，表示每间房子的金额，不能偷相邻房子，问最多能偷多少。关键是把 `dp[i]` 定义成“考虑到当前位置时的最优收益”，再写出抢或不抢当前房子的状态转移。

## Key Points

- define the state clearly
- write the transition equation
- identify the base case
- decide iteration order or memoized recursion

## Typical Problems and Solutions

- Climbing Stairs: 定义 `dp[i]` 为到第 `i` 阶的方法数，转移是 `dp[i] = dp[i - 1] + dp[i - 2]`。这是最基础的一维 DP 建模。时间复杂度 `O(n)`，空间复杂度 `O(n)`，若做状态压缩可降到 `O(1)`。
- House Robber: 定义 `dp[i]` 为考虑前 `i` 个房子时的最大收益，转移为“抢当前 + `dp[i - 2]`”和“不抢当前 + `dp[i - 1]`”二选一。时间复杂度 `O(n)`，空间复杂度 `O(n)`，若做状态压缩可降到 `O(1)`。
- Longest Increasing Subsequence: 基础解法定义 `dp[i]` 为以 `i` 结尾的 LIS 长度，枚举前面更小元素做转移；若要优化，可引出 `tails` + binary search 的 `O(n log n)` 解法。基础 DP 时间复杂度 `O(n^2)`，空间复杂度 `O(n)`。

## Kotlin Solution

```kotlin
fun climbStairs(n: Int): Int {
    if (n <= 2) return n

    var prev2 = 1
    var prev1 = 2
    for (i in 3..n) {
        val current = prev1 + prev2
        prev2 = prev1
        prev1 = current
    }
    return prev1
}

fun rob(nums: IntArray): Int {
    var prev2 = 0
    var prev1 = 0

    for (num in nums) {
        val current = maxOf(prev1, prev2 + num)
        prev2 = prev1
        prev1 = current
    }

    return prev1
}
```

## Supplemental Topics

- [[Problem Modeling]]
- [[Complexity Analysis]]
- [[Backtracking]]
- [[Common Coding Interview Mistakes]]
