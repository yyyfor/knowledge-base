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

## Typical Problems and Solutions

- Next Greater Element: 维护递减栈，当前元素一旦更大，就持续弹出栈中更小元素，并把当前值记为它们的下一个更大元素。时间复杂度 `O(n)`，空间复杂度 `O(n)`。
- Daily Temperatures: 栈中存索引并保持温度递减。当前温度更高时弹栈，利用索引差得到等待天数。时间复杂度 `O(n)`，空间复杂度 `O(n)`。
- Largest Rectangle in Histogram: 维护递增栈来找每个柱子左右两侧第一个更小元素，从而确定以它为高的最大宽度。时间复杂度 `O(n)`，空间复杂度 `O(n)`。

## Kotlin Template

```kotlin
fun dailyTemperatures(temperatures: IntArray): IntArray {
    val answer = IntArray(temperatures.size)
    val stack = ArrayDeque<Int>() // store indices

    for (i in temperatures.indices) {
        while (stack.isNotEmpty() && temperatures[i] > temperatures[stack.last()]) {
            val idx = stack.removeLast()
            answer[idx] = i - idx
        }
        stack.addLast(i)
    }

    return answer
}
```

## Supplemental Topics

- [[Array and String Patterns]]
- [[Brute Force and Optimization]]
- [[Complexity Analysis]]
- [[Top K Problems]]
