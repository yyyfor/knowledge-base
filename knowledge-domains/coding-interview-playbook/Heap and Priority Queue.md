---
title: Heap and Priority Queue
tags: [coding-interview]
---

# Heap and Priority Queue

Heap / priority queue 的价值在于持续维护一组“当前最重要的元素”，尤其适合 top K 和 streaming 场景。

## Notes

如果题目不是要整体排序，而是只关心当前前 K 大、前 K 小、最早结束、最短距离这类局部优先关系，heap 往往比 sort 更自然。它的优势来自增量维护，而不是一次性全局重排。

答题时要说明为什么 heap 的比较规则能正确表达“优先级”，以及为什么维持一个 size 为 K 的 heap 比把所有元素都处理一遍再排序更合适。

## Key Points

- top K
- streaming input
- min-heap vs max-heap
- heap operation is O(log k) or O(log n)

## Supplemental Topics

- [[Top K Problems]]
- [[Dijkstra and Shortest Path]]
- [[Complexity Analysis]]
- [[Follow-up Strategy]]
