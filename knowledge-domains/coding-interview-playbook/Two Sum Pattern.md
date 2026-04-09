---
title: Two Sum Pattern
tags: ["coding-interview", "algorithms", "hashing"]
difficulty: beginner
estimated_time: 15 min
last_reviewed: 2025-04-09
prerequisites: ["[Array and String Patterns]"]
related_problems: ["LeetCode 1", "LeetCode 15", "LeetCode 167"]
time_complexity: O(n)
space_complexity: O(n)
companies: ["Google", "Meta", "Amazon", "Microsoft"]
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

## Typical Problems and Solutions

- Two Sum: 扫描数组时把已见元素写入 hashmap，并查询 `target - num` 是否出现过，从而把两层枚举降到一层。时间复杂度 `O(n)`，空间复杂度 `O(n)`。
- Two Sum II - Input Array Is Sorted: 双指针解法更优。左指针从头、右指针从尾，根据和与目标的关系移动指针。时间复杂度 `O(n)`，空间复杂度 `O(1)`。
- 3Sum: 先排序，再固定第一个数，后两个数用双指针。关键在于跳过重复元素避免重复解。时间复杂度 `O(n²)`，空间复杂度 `O(1)`（不计输出）。

## Kotlin Solution

```kotlin
fun twoSum(nums: IntArray, target: Int): IntArray {
    val indexByValue = HashMap<Int, Int>()

    for (i in nums.indices) {
        val need = target - nums[i]
        if (need in indexByValue) {
            return intArrayOf(indexByValue[need]!!, i)
        }
        indexByValue[nums[i]] = i
    }

    return intArrayOf()
}

fun twoSumII(numbers: IntArray, target: Int): IntArray {
    var left = 0
    var right = numbers.lastIndex

    while (left < right) {
        val sum = numbers[left] + numbers[right]
        when {
            sum == target -> return intArrayOf(left + 1, right + 1)
            sum < target -> left++
            else -> right--
        }
    }

    return intArrayOf()
}

fun threeSum(nums: IntArray): List<List<Int>> {
    nums.sort()
    val result = mutableListOf<List<Int>>()

    for (i in nums.indices) {
        if (i > 0 && nums[i] == nums[i - 1]) continue

        var left = i + 1
        var right = nums.lastIndex

        while (left < right) {
            val sum = nums[i] + nums[left] + nums[right]
            when {
                sum == 0 -> {
                    result.add(listOf(nums[i], nums[left], nums[right]))
                    left++
                    right--
                    while (left < right && nums[left] == nums[left - 1]) left++
                    while (left < right && nums[right] == nums[right + 1]) right--
                }
                sum < 0 -> left++
                else -> right--
            }
        }
    }

    return result
}
```

## Python Solution

```python
def two_sum(nums, target):
    """Return indices of two numbers that add up to target."""
    index_by_value = {}
    for i, num in enumerate(nums):
        need = target - num
        if need in index_by_value:
            return [index_by_value[need], i]
        index_by_value[num] = i
    return []

def two_sum_ii(numbers, target):
    """Two Sum II - sorted array with two pointers."""
    left, right = 0, len(numbers) - 1
    while left < right:
        current_sum = numbers[left] + numbers[right]
        if current_sum == target:
            return [left + 1, right + 1]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    return []

def three_sum(nums):
    """Find all unique triplets that sum to zero."""
    nums.sort()
    result = []
    
    for i in range(len(nums)):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
            
        left, right = i + 1, len(nums) - 1
        while left < right:
            current_sum = nums[i] + nums[left] + nums[right]
            if current_sum == 0:
                result.append([nums[i], nums[left], nums[right]])
                left += 1
                right -= 1
                while left < right and nums[left] == nums[left - 1]:
                    left += 1
                while left < right and nums[right] == nums[right + 1]:
                    right -= 1
            elif current_sum < 0:
                left += 1
            else:
                right -= 1
                
    return result
```

## Supplemental Topics

- [[Hashing and Frequency Maps]]
- [[Coding Interview Playbook]]
- [[Problem Clarification]]
- [[Complexity Analysis]]
