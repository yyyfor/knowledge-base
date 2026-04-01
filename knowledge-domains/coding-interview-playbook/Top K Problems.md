---
title: Top K Problems
tags: [coding-interview]
---

# Top K Problems

Top K 类问题的关键是意识到你不需要对全部元素做全排序，往往只需要维护一小部分最重要的候选。

## Notes

这类题天然适合拿来展示 heap 的价值：当 K 远小于 n 时，用 size 为 K 的 heap 维护候选，通常比全量 sort 更符合题意，也更容易延展到 streaming 场景。

高质量回答要明确 K 和 n 的关系、输入是否一次性可得、是否要求实时更新，以及最终是要返回排序结果还是只要集合。

## Key Points

- model: heap / priority queue
- avoid full sorting when K is small
- heap size often stays at K
- streaming variants are common follow-ups

## Supplemental Topics

- [[Heap and Priority Queue]]
- [[Follow-up Strategy]]
- [[Complexity Analysis]]
- [[Binary Search]]
