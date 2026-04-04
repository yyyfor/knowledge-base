---
title: Hashing and Frequency Maps
tags: [coding-interview]
---

# Hashing and Frequency Maps

Hashing 的核心价值是把查找、去重和统计从 O(n) 降到均摊 O(1)，它是大量 O(n) 解法的关键杠杆。

## Notes

当题目需要快速判断某个值是否出现过、统计频率、寻找互补关系或维持窗口状态时，hashmap 往往是最直接的优化工具。它的价值不在于“会用 map”，而在于你能看出它能消除哪一层重复工作。

很多经典题从 O(n²) 到 O(n) 的跨越，都来自一个频率表或索引表。真正要说明的是：你把什么信息提前存起来了，它为什么足以支持后面的常数时间判断。

## Key Points

- frequency map
- deduplication and membership lookup
- store complement or prefix state
- hash lookup is O(1) on average

## Typical Problems and Solutions

- Two Sum: 扫描数组时把已见元素写入 hashmap，并查询 `target - num` 是否出现过，从而把两层枚举降到一层。
- Valid Anagram: 用频率表统计两个字符串各字符出现次数，最后比较计数是否一致。若字符集固定，也可用定长数组代替 hashmap。
- Group Anagrams: 用排序后的字符串或 26 维频率向量作为 key，把同组单词聚到同一个 hashmap bucket 中。

## Kotlin Template

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

fun groupAnagrams(strs: Array<String>): List<List<String>> {
    val groups = HashMap<String, MutableList<String>>()

    for (s in strs) {
        val key = s.toCharArray().sorted().joinToString("")
        groups.computeIfAbsent(key) { mutableListOf() }.add(s)
    }

    return groups.values.toList()
}
```

## Supplemental Topics

- [[Two Sum Pattern]]
- [[Sliding Window]]
- [[Complexity Analysis]]
- [[Problem Modeling]]
