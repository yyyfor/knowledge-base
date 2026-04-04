---
title: Array and String Patterns
tags: [coding-interview]
---

# Array and String Patterns

数组和字符串题的核心不是记很多小技巧，而是优先识别 sliding window、two pointers 和 prefix sum 这几类高频模型。

## Notes

Array / string 是 coding interview 最常见的题型，也是模型感最容易建立的一组题。很多看起来不同的题，底层其实只是“窗口怎么移动”“两个指针如何夹逼”“前缀信息如何复用”。

高质量回答要先判断输入是否有顺序、窗口是否连续、是否需要统计局部区间、是否存在单调性或重复扫描问题。这样你选出的模型才有结构基础。

## Key Points

- sliding window
- two pointers
- prefix sum
- 注意顺序、窗口连续性和重复元素处理

## Typical Problems and Solutions

- Longest Substring Without Repeating Characters: 用 sliding window + HashSet/HashMap 维护当前无重复窗口。右指针扩张，出现重复时左指针收缩，直到窗口重新合法，再更新答案。时间复杂度 `O(n)`，空间复杂度 `O(min(n, charset))`。
- Container With Most Water: 用 two pointers 从两端夹逼。每次移动较短的一侧，因为面积由短板决定，移动长板不可能得到更优解。时间复杂度 `O(n)`，空间复杂度 `O(1)`。
- Subarray Sum Equals K: 用 prefix sum + hashmap 统计历史前缀和出现次数。若当前前缀和为 `s`，则查 `s - k` 出现了多少次，就有多少个以当前结尾的合法子数组。时间复杂度 `O(n)`，空间复杂度 `O(n)`。

## Kotlin Template

```kotlin
fun lengthOfLongestSubstring(s: String): Int {
    val lastSeen = HashMap<Char, Int>()
    var left = 0
    var answer = 0

    for (right in s.indices) {
        val ch = s[right]
        if (ch in lastSeen) {
            left = maxOf(left, lastSeen[ch]!! + 1)
        }
        lastSeen[ch] = right
        answer = maxOf(answer, right - left + 1)
    }

    return answer
}

fun maxArea(height: IntArray): Int {
    var left = 0
    var right = height.lastIndex
    var answer = 0

    while (left < right) {
        val h = minOf(height[left], height[right])
        answer = maxOf(answer, h * (right - left))
        if (height[left] < height[right]) left++ else right--
    }

    return answer
}
```

## Supplemental Topics

- [[Longest Substring Without Repeating Characters]]
- [[Two Sum Pattern]]
- [[Binary Search]]
- [[Problem Modeling]]
