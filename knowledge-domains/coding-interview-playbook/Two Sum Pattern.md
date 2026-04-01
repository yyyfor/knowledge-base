---
title: Two Sum Pattern
tags: [coding-interview]
---

# Two Sum Pattern

Two Sum 是最经典的 hashmap 模板题，核心不是题目本身，而是你能否把 O(n²) 的补数查找优化成 O(n)。

## Notes

这题的价值在于它几乎把 coding interview 的完整流程都压缩进去了：先 clarify 是否有重复和是否一定有解，再给 brute force，再用 hashmap 做优化，最后补复杂度和边界。

真正要讲清的是为什么“把已经看过的数存起来”足以支持后续判断，以及什么时候查 complement、什么时候写入当前值。

## Key Points

- model: hashmap
- brute force is O(n²)
- optimized solution is O(n)
- store complement relation or seen values

## Supplemental Topics

- [[Hashing and Frequency Maps]]
- [[Coding Interview Playbook]]
- [[Problem Clarification]]
- [[Complexity Analysis]]
