---
title: Greedy
tags: [coding-interview]
---

# Greedy

Greedy 适合每一步都能做局部最优且不会破坏全局最优的问题，关键是先证明贪心选择的正确性，而不是只凭直觉。

## Notes

很多贪心题的真正难点不在实现，而在于识别是否存在一个“当前最优选择”能够安全地延伸到全局最优。常见信号包括按某个关键维度排序后顺序决策、或每次挑最早结束、最小代价、最大收益的那个对象。

高质量回答要说明为什么这个局部规则是安全的。哪怕不给完整数学证明，也要讲交换论证、排序后不变式或“如果不这么选会更差”的 reasoning。

## Key Points

- make the locally optimal choice
- justify why local choice leads to global optimum
- sorting is often the first step
- common in scheduling and interval optimization

## Typical Problems and Solutions

- Jump Game: 从左到右维护当前最远可达位置，只要当前位置不超过最远边界，就能继续推进；若最终能覆盖末尾则可达。时间复杂度 `O(n)`，空间复杂度 `O(1)`。
- Gas Station: 若总油量小于总消耗则无解；否则从左到右累计净油量，一旦前缀和为负，就把起点移动到下一站，这是典型贪心剪枝。时间复杂度 `O(n)`，空间复杂度 `O(1)`。
- Task Scheduler / Meeting Rooms II 一类调度题: 先按时间排序，再每步优先处理最早结束或最可行对象，核心是解释“更早释放资源”为什么不会让答案变差。常见解法时间复杂度 `O(n log n)`，空间复杂度通常为 `O(n)` 或 `O(1)` 到 `O(log n)`，取决于是否使用 heap。

## Kotlin Template

```kotlin
fun canJump(nums: IntArray): Boolean {
    var farthest = 0

    for (i in nums.indices) {
        if (i > farthest) return false
        farthest = maxOf(farthest, i + nums[i])
    }

    return true
}

fun canCompleteCircuit(gas: IntArray, cost: IntArray): Int {
    var total = 0
    var tank = 0
    var start = 0

    for (i in gas.indices) {
        val diff = gas[i] - cost[i]
        total += diff
        tank += diff
        if (tank < 0) {
            start = i + 1
            tank = 0
        }
    }

    return if (total >= 0) start else -1
}
```

## Supplemental Topics

- [[Interval Problems]]
- [[Problem Modeling]]
- [[Complexity Analysis]]
- [[Follow-up Strategy]]
