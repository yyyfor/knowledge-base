---
title: Interval Problems
tags: [coding-interview]
---

# Interval Problems

区间题的关键是先判断是否需要排序、合并还是扫描边界，很多看似不同的题本质上都围绕起点终点关系展开。

## Notes

典型区间题通常先按起点排序，再顺序扫描；一旦当前区间和上一个区间重叠，就做合并或更新边界。核心不在于记具体题，而在于你能否识别“排序后局部决策就足够”这个结构。

回答时要先澄清区间是闭区间还是开区间、是否已排序、是否允许原地修改，以及结果是要合并区间、统计重叠还是找最少删除数。

## Key Points

- sort by start time first
- merge overlapping intervals
- track current end boundary
- clarify closed vs open interval semantics

## Typical Problems and Solutions

- Merge Intervals: 先按起点排序，再维护当前合并区间；若新区间起点不超过当前终点就合并，否则把当前区间写入答案并开启新区间。时间复杂度 `O(n log n)`，空间复杂度 `O(n)`，若允许原地覆盖可进一步优化。
- Insert Interval: 把新区间插入到已排序区间集中，分三段处理：左侧不重叠、与新区间重叠、右侧不重叠。时间复杂度 `O(n)`，空间复杂度 `O(n)`。
- Non-overlapping Intervals: 按结束时间排序后做 greedy，尽量保留结束更早的区间，从而为后续区间留下更大空间，删除数最小。时间复杂度 `O(n log n)`，空间复杂度 `O(1)` 到 `O(log n)`，取决于排序实现。

## Kotlin Template

```kotlin
fun merge(intervals: Array<IntArray>): Array<IntArray> {
    if (intervals.isEmpty()) return emptyArray()

    intervals.sortBy { it[0] }
    val merged = mutableListOf<IntArray>()
    var current = intervals[0].clone()

    for (i in 1 until intervals.size) {
        val next = intervals[i]
        if (next[0] <= current[1]) {
            current[1] = maxOf(current[1], next[1])
        } else {
            merged.add(current)
            current = next.clone()
        }
    }

    merged.add(current)
    return merged.toTypedArray()
}
```

## Supplemental Topics

- [[Greedy]]
- [[Array and String Patterns]]
- [[Problem Modeling]]
- [[Complexity Analysis]]
