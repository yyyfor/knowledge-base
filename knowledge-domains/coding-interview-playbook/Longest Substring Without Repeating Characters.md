---
title: Longest Substring Without Repeating Characters
tags: ["coding-interview"]
difficulty: intermediate
estimated_time: 4 min
last_reviewed: 2026-04-09
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

## Typical Problems and Solutions

- Longest Substring Without Repeating Characters: 维护滑动窗口和字符集合，右边界遇到重复字符时收缩左边界。时间复杂度 `O(n)`，空间复杂度 `O(min(m, n))`，其中 m 是字符集大小。
- Longest Substring with At Most Two Distinct Characters: 用 hashmap 记录字符最后出现位置，窗口内最多允许两个不同字符。时间复杂度 `O(n)`，空间复杂度 `O(1)`。
- Minimum Window Substring: 需要包含目标字符串所有字符的最小子串。用两个 hashmap 维护窗口和目标字符频率。时间复杂度 `O(n + m)`，空间复杂度 `O(k)`，其中 k 是目标字符串的不同字符数。

## Kotlin Solution

```kotlin
fun lengthOfLongestSubstring(s: String): Int {
    val charIndex = HashMap<Char, Int>()
    var left = 0
    var maxLength = 0

    for (right in s.indices) {
        val char = s[right]
        if (char in charIndex && charIndex[char]!! >= left) {
            left = charIndex[char]!! + 1
        }
        charIndex[char] = right
        maxLength = maxOf(maxLength, right - left + 1)
    }

    return maxLength
}

fun lengthOfLongestSubstringTwoDistinct(s: String): Int {
    val charCount = HashMap<Char, Int>()
    var left = 0
    var maxLength = 0

    for (right in s.indices) {
        charCount[s[right]] = charCount.getOrDefault(s[right], 0) + 1

        while (charCount.size > 2) {
            charCount[s[left]] = charCount[s[left]]!! - 1
            if (charCount[s[left]] == 0) {
                charCount.remove(s[left])
            }
            left++
        }

        maxLength = maxOf(maxLength, right - left + 1)
    }

    return maxLength
}

fun minWindow(s: String, t: String): String {
    if (s.isEmpty() || t.isEmpty() || s.length < t.length) return ""

    val targetCount = HashMap<Char, Int>()
    for (char in t) {
        targetCount[char] = targetCount.getOrDefault(char, 0) + 1
    }

    val windowCount = HashMap<Char, Int>()
    var formed = 0
    var left = 0
    var minLen = Int.MAX_VALUE
    var minLeft = 0

    for (right in s.indices) {
        val char = s[right]
        windowCount[char] = windowCount.getOrDefault(char, 0) + 1

        if (char in targetCount && windowCount[char] == targetCount[char]) {
            formed++
        }

        while (formed == targetCount.size) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1
                minLeft = left
            }

            val leftChar = s[left]
            windowCount[leftChar] = windowCount[leftChar]!! - 1
            if (leftChar in targetCount && windowCount[leftChar]!! < targetCount[leftChar]!!) {
                formed--
            }
            left++
        }
    }

    return if (minLen == Int.MAX_VALUE) "" else s.substring(minLeft, minLeft + minLen)
}
```

## Python Solution

```python
def length_of_longest_substring(s: str) -> int:
    """Find length of longest substring without repeating characters."""
    char_index = {}
    left = 0
    max_length = 0

    for right, char in enumerate(s):
        if char in char_index and char_index[char] >= left:
            left = char_index[char] + 1
        char_index[char] = right
        max_length = max(max_length, right - left + 1)

    return max_length

def length_of_longest_substring_two_distinct(s: str) -> int:
    """Find longest substring with at most two distinct characters."""
    char_count = {}
    left = 0
    max_length = 0

    for right, char in enumerate(s):
        char_count[char] = char_count.get(char, 0) + 1

        while len(char_count) > 2:
            char_count[s[left]] -= 1
            if char_count[s[left]] == 0:
                del char_count[s[left]]
            left += 1

        max_length = max(max_length, right - left + 1)

    return max_length

def min_window(s: str, t: str) -> str:
    """Find minimum window substring containing all characters of t."""
    if not s or not t or len(s) < len(t):
        return ""

    target_count = {}
    for char in t:
        target_count[char] = target_count.get(char, 0) + 1

    window_count = {}
    formed = 0
    left = 0
    min_len = float('inf')
    min_left = 0

    for right, char in enumerate(s):
        window_count[char] = window_count.get(char, 0) + 1

        if char in target_count and window_count[char] == target_count[char]:
            formed += 1

        while formed == len(target_count):
            if right - left + 1 < min_len:
                min_len = right - left + 1
                min_left = left

            left_char = s[left]
            window_count[left_char] -= 1
            if left_char in target_count and window_count[left_char] < target_count[left_char]:
                formed -= 1
            left += 1

    return "" if min_len == float('inf') else s[min_left:min_left + min_len]
```

## Supplemental Topics

- [[Array and String Patterns]]
- [[Hashing and Frequency Maps]]
- [[Brute Force and Optimization]]
- [[Edge Cases in Coding Interviews]]
