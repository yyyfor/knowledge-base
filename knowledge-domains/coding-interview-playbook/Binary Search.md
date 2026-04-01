---
title: Binary Search
tags: [coding-interview]
---

# Binary Search

Binary search 不只是“在有序数组里找数”，更重要的是识别单调性，然后持续缩小答案空间。

## Notes

如果输入有序，binary search 是直觉；但更高阶的用法是当某个判断函数对答案具有单调性时，也可以对答案空间做二分。很多“最小满足条件”“最大可行值”题都是这一类。

回答时要讲清楚搜索区间、mid 计算、边界收缩条件以及最终返回哪一侧边界。真正容易错的通常不是思想，而是边界不变式没有守住。

## Key Points

- sorted array
- monotonic function or answer space
- maintain invariant on left and right boundaries
- be explicit about return condition

## Supplemental Topics

- [[Problem Modeling]]
- [[Follow-up Strategy]]
- [[Array and String Patterns]]
- [[Top K Problems]]
