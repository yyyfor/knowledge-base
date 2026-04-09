---
title: 4Sum
tags: [coding-interview, algorithms]
difficulty: intermediate
estimated_time: 20 min
last_reviewed: 2026-04-09
---

# 4Sum

4Sum 可以看成 3Sum 的继续扩展。常见做法是先排序，然后固定前两个数，把后面部分降成双指针问题。答题时要强调复杂度、去重策略，以及为什么没有必要回到四层暴力枚举。

## Notes

如果面试官在 Two Sum 或 3Sum 后追问 4Sum，真正想听的通常不是完整代码，而是你是否能说明模式如何扩展：排序、固定若干位置、把剩余部分压缩成更熟悉的子问题，再处理重复结果。

## Kotlin Solution

```kotlin
fun fourSum(nums: IntArray, target: Int): List<List<Int>> {
    nums.sort()
    val result = mutableListOf<List<Int>>()

    for (i in 0 until nums.size - 3) {
        if (i > 0 && nums[i] == nums[i - 1]) continue
        for (j in i + 1 until nums.size - 2) {
            if (j > i + 1 && nums[j] == nums[j - 1]) continue
            var left = j + 1
            var right = nums.lastIndex

            while (left < right) {
                val sum = nums[i].toLong() + nums[j] + nums[left] + nums[right]
                when {
                    sum == target.toLong() -> {
                        result.add(listOf(nums[i], nums[j], nums[left], nums[right]))
                        left += 1
                        right -= 1
                        while (left < right && nums[left] == nums[left - 1]) left += 1
                        while (left < right && nums[right] == nums[right + 1]) right -= 1
                    }
                    sum < target -> left += 1
                    else -> right -= 1
                }
            }
        }
    }

    return result
}
```

## Related Topics

- [[Two Sum Pattern]]
- [[3Sum]]
- [[Array and String Patterns]]
