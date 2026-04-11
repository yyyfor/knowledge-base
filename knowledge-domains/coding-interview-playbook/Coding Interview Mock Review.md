---
title: Coding Interview Mock Review
tags: [coding-interview, practice, review, mock-interview]
difficulty: intermediate
estimated_time: 40 min
last_reviewed: 2026-04-10
prerequisites: [[Coding Interview Playbook], [Problem Clarification], [Follow-up Strategy]]
---

# Coding Interview Mock Review

这页不是再给你一题，而是给你一套 mock interview 复盘框架。真正拉开差距的，往往不是“最后写没写出来”，而是你有没有按高分节奏推进。

## Mock Prompt

> 给定整数数组 `nums` 和整数 `k`，返回和为 `k` 的连续子数组个数。

**示例**:
- `nums = [1, 1, 1], k = 2`，答案是 `2`
- `nums = [1, 2, 3], k = 3`，答案是 `2`

## What a Strong Candidate Usually Does

### Phase 1: Clarification

会先确认：
- 数组里是否可能有负数
- 只需要返回数量，还是也要返回区间
- 数据规模大概多大

这一步很关键，因为如果有负数，很多人会错误地直接套 sliding window。

### Phase 2: Baseline

先给出最直接的思路：
- 枚举所有子数组
- 计算区间和
- 时间复杂度 O(n^2) 或更差

这不是浪费时间，而是在给后续优化建立对照组。

### Phase 3: Optimization

高分主线通常会转到 `prefix sum + hashmap`。

```kotlin
fun subarraySum(nums: IntArray, k: Int): Int {
    val countByPrefix = HashMap<Int, Int>()
    countByPrefix[0] = 1

    var prefix = 0
    var answer = 0

    for (num in nums) {
        prefix += num
        answer += countByPrefix[prefix - k] ?: 0
        countByPrefix[prefix] = (countByPrefix[prefix] ?: 0) + 1
    }

    return answer
}
```

### Phase 4: Defense

强答案会主动补这几件事：
- 为什么不是 sliding window
- hashmap 里存的是什么，为什么初始要放 `0 -> 1`
- 重复 prefix sum 为什么合法
- 时间复杂度 O(n)，空间复杂度 O(n)

## Review Checklist

做完一次 mock 后，逐项检查：

- 我有没有先澄清负数、返回值和规模约束
- 我有没有明确说出 baseline，而不是直接跳最优解
- 我有没有解释“为什么这个模型成立”
- 我有没有主动讲复杂度和 edge case
- 我有没有在写代码时保持变量命名和不变量清晰

## Common Review Notes

### 1. Candidate Jumped Too Fast

表现:
- 上来就写 hashmap
- 解释不清为什么要存 prefix
- 面试官一追问就断线

修正:
- 先说 brute force 的瓶颈是“重复计算区间和”
- 再说 prefix sum 如何复用信息

### 2. Candidate Picked the Wrong Pattern

表现:
- 看到“连续子数组”就条件反射 sliding window
- 忽略负数会破坏窗口单调性

修正:
- 每次看到区间问题，先问窗口条件是否能稳定收缩

### 3. Candidate Solved It but Looked Risky

表现:
- 代码大致对
- 但没有结构化表达
- 复杂度、edge case、follow-up 都是被动补

修正:
- 强化 `clarify -> baseline -> optimize -> defend` 这条口头主线

## Scoring Rubric

- `0-2`: 只会写代码，表达和建模都不稳定
- `3-4`: 能做题，但节奏和解释仍然容易失控
- `5-6`: 建模、实现、复杂度和 defense 都比较完整

如果你复盘时发现自己总在同一阶段丢分，就回到对应条目补：

- clarify 弱，回看 [[Problem Clarification]]
- 建模弱，回看 [[Problem Modeling]]
- follow-up 弱，回看 [[Follow-up Strategy]]
- 表达弱，回看 [[Coding Communication]]

## Related Topics

- [[Coding Interview Playbook]]
- [[Problem Clarification]]
- [[Problem Modeling]]
- [[Coding Communication]]
- [[Follow-up Strategy]]
