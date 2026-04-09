---
title: Binary Search
tags: ["coding-interview"]
difficulty: intermediate
estimated_time: 2 min
last_reviewed: 2026-04-09
---

# Binary Search

Binary search 不只是“在有序数组里找数”，更重要的是识别单调性，然后持续缩小答案空间。

## Notes

如果输入有序，binary search 是直觉；但更高阶的用法是当某个判断函数对答案具有单调性时，也可以对答案空间做二分。很多“最小满足条件”“最大可行值”题都是这一类。

回答时要讲清楚搜索区间、mid 计算、边界收缩条件以及最终返回哪一侧边界。真正容易错的通常不是思想，而是边界不变式没有守住。

中等题示例：Koko Eating Bananas。题目是给你若干堆香蕉和总小时数 `h`，要求找出最小吃速使得 Koko 能在 `h` 小时内吃完。这里不是在数组上二分，而是在答案空间上二分，因为“速度越大越能吃完”满足单调性。

## Key Points

- sorted array
- monotonic function or answer space
- maintain invariant on left and right boundaries
- be explicit about return condition

## Typical Problems and Solutions

- Binary Search / Search Insert Position: 在有序数组上维护闭区间或半开区间不变式，比较 `mid` 和目标值后收缩左右边界，最终返回命中位置或插入点。时间复杂度 `O(log n)`，空间复杂度 `O(1)`。
- Find First and Last Position of Element in Sorted Array: 分别做两次 binary search，第一次找左边界，第二次找右边界，关键是边界条件写清。时间复杂度 `O(log n)`，空间复杂度 `O(1)`。
- Koko Eating Bananas: 对“吃香蕉速度”这个答案空间二分。定义判定函数为“在 `h` 小时内能否吃完”，因为速度越大越可行，满足单调性。时间复杂度 `O(n log M)`，空间复杂度 `O(1)`，其中 `M` 是最大堆大小。

## Kotlin Solution

```kotlin
fun search(nums: IntArray, target: Int): Int {
    var left = 0
    var right = nums.lastIndex

    while (left <= right) {
        val mid = left + (right - left) / 2
        when {
            nums[mid] == target -> return mid
            nums[mid] < target -> left = mid + 1
            else -> right = mid - 1
        }
    }

    return -1
}

fun minEatingSpeed(piles: IntArray, h: Int): Int {
    var left = 1
    var right = piles.max()

    fun canFinish(speed: Int): Boolean {
        var hours = 0L
        for (pile in piles) {
            hours += (pile + speed - 1L) / speed
        }
        return hours <= h
    }

    while (left < right) {
        val mid = left + (right - left) / 2
        if (canFinish(mid)) right = mid else left = mid + 1
    }

    return left
}
```

## Supplemental Topics

- [[Problem Modeling]]
- [[Follow-up Strategy]]
- [[Array and String Patterns]]
- [[Top K Problems]]
