---
title: Longest Substring Without Repeating Characters
tags: [coding-interview]
---

# Longest Substring Without Repeating Characters

这题是 sliding window 的代表题，重点在于如何维护一个不含重复字符的动态窗口。

## Notes

它的高频价值在于：你需要同时管理左右指针、窗口约束和去重状态。只要你能把“什么时候扩大窗口、什么时候收缩窗口”讲清楚，很多 substring / subarray 题都会顺着打开。

真正的关键不是背模板，而是理解窗口 invariant：当前窗口始终满足“无重复字符”。一旦 invariant 被破坏，就通过移动左指针恢复。

## Key Points

- model: sliding window
- maintain a window invariant with no duplicates
- use a set or map to track character state
- update answer while expanding and shrinking

## Supplemental Topics

- [[Array and String Patterns]]
- [[Hashing and Frequency Maps]]
- [[Brute Force and Optimization]]
- [[Edge Cases in Coding Interviews]]
