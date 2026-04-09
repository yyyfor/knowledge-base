---
title: Sliding Window
tags: [coding-interview, algorithms]
difficulty: intermediate
estimated_time: 15 min
last_reviewed: 2026-04-09
---

# Sliding Window

Sliding window 适合处理连续子数组或子串问题，核心是维护一个会移动的区间，而不是对每个起点都重新计算一遍。它常见于最长/最短子串、满足约束的连续区间和流式统计问题。

## Notes

判断能不能用 sliding window，关键看区间是否具有“右边扩张、左边收缩”的可维护性质。如果窗口状态能在加入一个元素、移出一个元素后用 O(1) 或均摊 O(1) 更新，这个模式通常就值得考虑。

## Key Points

- 适合连续区间，不适合任意子序列
- 常与频率表、双指针一起出现
- 先定义窗口状态，再定义何时扩张或收缩

## Kotlin Template

```kotlin
fun longestWindow(s: String): Int {
    val freq = HashMap<Char, Int>()
    var left = 0
    var best = 0

    for (right in s.indices) {
        freq[s[right]] = (freq[s[right]] ?: 0) + 1

        while ((freq[s[right]] ?: 0) > 1) {
            val ch = s[left]
            freq[ch] = (freq[ch] ?: 0) - 1
            left += 1
        }

        best = maxOf(best, right - left + 1)
    }

    return best
}
```

## Related Topics

- [[Array and String Patterns]]
- [[Hashing and Frequency Maps]]
- [[Two Sum Pattern]]
