---
title: Hashing and Frequency Maps
tags: [coding-interview]
---

# Hashing and Frequency Maps

Hashing 的核心价值是把查找、去重和统计从 O(n) 降到均摊 O(1)，它是大量 O(n) 解法的关键杠杆。

## Notes

当题目需要快速判断某个值是否出现过、统计频率、寻找互补关系或维持窗口状态时，hashmap 往往是最直接的优化工具。它的价值不在于“会用 map”，而在于你能看出它能消除哪一层重复工作。

很多经典题从 O(n²) 到 O(n) 的跨越，都来自一个频率表或索引表。真正要说明的是：你把什么信息提前存起来了，它为什么足以支持后面的常数时间判断。

## Key Points

- frequency map
- deduplication and membership lookup
- store complement or prefix state
- hash lookup is O(1) on average

## Supplemental Topics

- [[Two Sum Pattern]]
- [[Sliding Window]]
- [[Complexity Analysis]]
- [[Problem Modeling]]
