---
title: Two Sum Pattern - Self Assessment
tags: [coding-interview, quiz, practice]
difficulty: beginner
estimated_time: 30 min
last_reviewed: 2025-04-09
prerequisites: [[Two Sum Pattern]]
---

# Two Sum Pattern - Self Assessment

测试你对Two Sum模式和哈希表应用的理解程度。

## Quick Assessment (5 minutes)

### 1. Concept Check
**问题**: Two Sum问题的最优时间复杂度是多少？

A) O(n²)
B) O(n log n)
C) O(n)
D) O(1)

**答案**: C) O(n)

**解析**: 使用哈希表可以将时间复杂度从O(n²)降低到O(n)，空间复杂度为O(n)。

---

### 2. Pattern Recognition
**问题**: 哪些问题是Two Sum模式的变种？

选择所有适用项：
- [ ] 3Sum
- [ ] 4Sum
- [ ] Subarray Sum Equals K
- [ ] Two Sum II - Sorted Array

**答案**: 全部都是

**解析**:
- **3Sum/4Sum**: 扩展到多个数字，使用哈希表或双指针
- **Subarray Sum**: 前缀和 + 哈希表
- **Two Sum II**: 有序数组用双指针，仍是complement查找思路

---

### 3. Implementation
**问题**: 实现twoSum函数，返回能加起来等于target的两个数的索引。

```kotlin
fun twoSum(nums: IntArray, target: Int): IntArray {
    // Your implementation here
}
```

**参考答案**:
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

    return intArrayOf() // No solution found
}
```

**评分标准**:
- ✅ 使用HashMap存储索引
- ✅ 先检查complement再存储当前值
- ✅ 正确处理没有解的情况
- ✅ 时间复杂度O(n)，空间复杂度O(n)

---

## Practice Problems

### Beginner (8-12 minutes)

#### Problem 1: Basic Two Sum
**描述**: 给定整数数组和目标值，返回两个数的索引，使它们相加等于目标值。

**示例**:
```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: nums[0] + nums[1] = 9
```

**约束**:
- 每个输入只有一个解决方案
- 不能使用同一个元素两次
- 可以按任意顺序返回答案

**提���**:
1. 需要查找什么信息？(target - 当前值)
2. 如何快速查找？(哈希表)
3. 何时存储当前值？(检查complement之后)

---

#### Problem 2: Two Sum with Multiple Pairs
**描述**: 给定数组，找出所有unique的数对，使其和等于目标值。

**示例**:
```
Input: nums = [1,2,3,2,4,0], target = 4
Output: [[1,3], [2,2], [4,0]]
Note: 虽然有两个2，但[2,2]只出现一次
```

**提示**:
1. 如何避免重复？
2. 是否需要排序？
3. 哈希表的键和值分别是什么？

---

### Intermediate (15-20 minutes)

#### Problem 3: Two Sum Less Than K
**描述**: 在数组中找出两个数的最大和，使其小于目标值K。如果不存在这样的对，返回-1。

**示例**:
```
Input: nums = [34,23,1,24,75,33,54,8], K = 60
Output: 58
Explanation: 34 + 24 = 58, 是小于60的最大和
```

**提示**:
1. 排序后用什么方法？(双指针)
2. 如何找到最大和但小于K？
3. 如何处理没有解的情况？

---

#### Problem 4: Count Number of Pairs
**描述**: 给定整数数组，计算有多少个数对(i, j)满足i < j且nums[i] + nums[j]等于目标值。

**示例**:
```
Input: nums = [1,2,3,4,3], target = 5
Output: 2
Explanation:
- (1,4): nums[0] + nums[3] = 1 + 4 = 5
- (2,3): nums[1] + nums[2] = 2 + 3 = 5
```

**提示**:
1. 如何计数���不能只存储一个索引
2. 哈希表的值应该是什么？(频率计数)
3. 如何处理重复数字？

---

### Advanced (20-30 minutes)

#### Problem 5: Two Sum III - Data Structure Design
**描述**: 设计并实现一个TwoSum类，支持add和find操作。

**要求**:
```kotlin
class TwoSum {
    // 添加数字到数据结构
    fun add(number: Int) {}

    // 查找是否有两个数和等于value
    fun find(value: Int): Boolean {}
}
```

**约束**:
- add操作可以有重复数字
- find操作要高效

**实现思路**:
```kotlin
class TwoSum {
    private val numbers = HashMap<Int, Int>()

    fun add(number: Int) {
        numbers[number] = numbers.getOrDefault(number, 0) + 1
    }

    fun find(value: Int): Boolean {
        for (num in numbers.keys) {
            val complement = value - num
            if (complement != num) {
                if (complement in numbers) return true
            } else {
                if (numbers[num]!! > 1) return true
            }
        }
        return false
    }
}
```

**优化方向**:
- 如果add操作多，find操作少：使用哈希表
- 如果find操作多，add操作少：使用列表+排序

---

#### Problem 6: Two Sum with Constraints
**描述**: 给定两个整数数组nums1和nums2，以及目标值target。从nums1选一个元素，nums2选一个元素，使它们的和最接近target。

**示例**:
```
Input: nums1 = [1,2,3], nums2 = [4,5,6], target = 7
Output: [1,6]
Explanation: 1 + 6 = 7, 正好等于target
```

**提示**:
1. 如何处理两个数组？
2. 如何找到最接近的组合？
3. 可以使用什么数据结构加速？

---

## Interview Simulation

### Mock Interview Question (45 minutes)

**问题**: Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

**面试流程**:

#### Phase 1: Clarification (2-3 minutes)
**你要问的问题**:
- 数组是否有序？
- 是否有重复元素？
- 是否保证有解？
- 如果没有解怎么处理？
- 空数组怎么处理？
- 同一个元素能用两次吗？

#### Phase 2: Approach Discussion (10-15 minutes)
**讨论要点**:
1. **Brute Force**: O(n²) time, O(1) space
2. **Hash Map Solution**: O(n) time, O(n) space
3. **If Sorted**: Two Pointers O(n) time, O(1) space

**你要解释的trade-offs**:
- 时间 vs 空间
- 代码复杂度 vs 性能
- 是否可以修改输入数组

#### Phase 3: Implementation (15-20 minutes)
```kotlin
fun twoSum(nums: IntArray, target: Int): IntArray {
    // 1. Handle edge cases
    if (nums.size < 2) return intArrayOf()

    // 2. Use HashMap for complement lookup
    val indexMap = HashMap<Int, Int>()

    // 3. Single pass through array
    for (i in nums.indices) {
        val complement = target - nums[i]

        // 4. Check if complement exists
        if (complement in indexMap) {
            return intArrayOf(indexMap[complement]!!, i)
        }

        // 5. Store current number's index
        indexMap[nums[i]] = i
    }

    // 6. No solution found
    return intArrayOf()
}
```

#### Phase 4: Testing & Follow-up (5-10 minutes)
**测试用例**:
```kotlin
// Normal case
assert(twoSum(intArrayOf(2,7,11,15), 9).contentEquals(intArrayOf(0,1)))

// Duplicate numbers
assert(twoSum(intArrayOf(3,3), 6).contentEquals(intArrayOf(0,1)))

// Negative numbers
assert(twoSum(intArrayOf(-1,2,3,4), 1).contentEquals(intArrayOf(0,2)))

// No solution
assert(twoSum(intArrayOf(1,2,3), 7).contentEquals(intArrayOf()))
```

**Follow-up讨论**:
- Q: 如果数组很大，不能全部放入内存？
- A: 外部排序 + two pointers 或 distributed hash map

- Q: 如何处理多次查询？
- A: 预处理排序，然后two pointers

- Q: 如果要返回所有可能的pairs怎么办？
- A: 需要不同的算法，可能需要处理重复

---

## Self-Grading Rubric

### Understanding (40%)
- ⭐⭐⭐: 能清楚解释为什么使用哈希表
- ⭐⭐: 理解基本思路但不够深入
- ⭐: 只是记住了解法

### Implementation (30%)
- ⭐⭐⭐: 代码简洁、正确、考虑边界情况
- ⭐⭐: 代码基本正确但有minor issues
- ⭐: 逻辑混乱或有明显错误

### Communication (20%)
- ⭐⭐⭐: 能清晰解释思路、复杂度和trade-offs
- ⭐⭐: 能基本解释但不够清晰
- ⭐: 很难解释清楚

### Problem Solving (10%)
- ⭐⭐⭐: 能识别相关问题并解决变种
- ⭐⭐: 能解决基本问题
- ⭐: 只能背诵答案

---

## Next Steps

**如果得分 < 60%**:
- 重新阅读[[Two Sum Pattern]]
- 练习更多基础哈希表问题
- 专注于理解complement lookup思想

**如果得分 60-80%**:
- 练习intermediate和advanced问题
- 关注变种问题和优化
- 提升代码质量和边界情况处理

**如果得分 > 80%**:
- 学习[[3Sum]], [[4Sum]]等扩展问题
- 练习[[Hashing and Frequency Maps]]相关模式
- 尝试在constrain条件下优化解法

## Related Practice

- **Direct Practice**: [[Top K Problems]], [[Hashing and Frequency Maps]]
- **Pattern Extension**: [[3Sum]], [[4Sum]], [[Array and String Patterns]]
- **System Design**: 应用哈希表到实际问题
