---
title: 3Sum
tags: [coding-interview, algorithms]
difficulty: intermediate
estimated_time: 20 min
last_reviewed: 2026-04-09
---

# 3Sum

3Sum 是 Two Sum 的经典扩展题，核心思路通常不是三层枚举，而是先排序，再固定一个数，剩下部分用双指针或 Two Sum 变体处理。真正难点在于去重和边界控制。

## Notes

高分回答通常会先给出 O(n^3) baseline，然后说明为什么排序后能把问题降成 O(n^2)。你需要特别说明重复元素如何跳过，否则答案即使思路对，也很容易在实现阶段出错。

## Kotlin Solution

```kotlin
fun threeSum(nums: IntArray): List<List<Int>> {
    nums.sort()
    val result = mutableListOf<List<Int>>()

    for (i in 0 until nums.size - 2) {
        if (i > 0 && nums[i] == nums[i - 1]) continue
        var left = i + 1
        var right = nums.lastIndex

        while (left < right) {
            val sum = nums[i] + nums[left] + nums[right]
            when {
                sum == 0 -> {
                    result.add(listOf(nums[i], nums[left], nums[right]))
                    left += 1
                    right -= 1
                    while (left < right && nums[left] == nums[left - 1]) left += 1
                    while (left < right && nums[right] == nums[right + 1]) right -= 1
                }
                sum < 0 -> left += 1
                else -> right -= 1
            }
        }
    }

    return result
}
```

## Related Topics

- [[Two Sum Pattern]]
- [[Array and String Patterns]]
- [[4Sum]]
