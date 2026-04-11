---
title: Coding Interview Pattern Recognition Quiz
tags: [coding-interview, quiz, practice, patterns]
difficulty: intermediate
estimated_time: 35 min
last_reviewed: 2026-04-10
prerequisites: [[Problem Modeling], [Array and String Patterns], [Complexity Analysis]]
---

# Coding Interview Pattern Recognition Quiz

这套练习的目标不是考你会不会背模板，而是训练你在读完题面后的前 30 到 90 秒里，快速判断“这题更像什么模型，为什么不是别的模型”。

## Part 1: Quick Recognition

### 1. Longest Substring With At Most K Distinct Characters

**题面信号**:
- 输入是字符串
- 目标是最长连续子串
- 约束随着窗口移动动态变化

**问题**: 你优先考虑什么模型？

A) Dynamic Programming  
B) Sliding Window  
C) Binary Search  
D) Union Find

**答案**: B) Sliding Window

**为什么**:
- 题目是连续区间
- 条件能通过窗口扩张和收缩维护
- 状态通常是频率表和 distinct count

**为什么不是其他**:
- DP 没有明显的状态转移优势
- Binary Search 需要配合可验证单调性，这里不是第一反应
- Union Find 适合连通性，不适合子串约束

---

### 2. Search in a Rotated Sorted Array

**题面信号**:
- 数组原本有序
- 发生过一次旋转
- 需要 O(log n)

**问题**: 最自然的起手模型是什么？

A) Binary Search  
B) Heap  
C) Backtracking  
D) Prefix Sum

**答案**: A) Binary Search

**为什么**:
- 题目明确给了对数复杂度
- 结构里仍保留“局部有序”这一关键信号
- 核心在于判断哪一半仍然有序

---

### 3. Kth Largest Element in a Stream

**题面信号**:
- 数据流持续进入
- 只关心 top-k 边界
- 需要在线更新

**问题**: 最优先考虑什么结构？

A) Monotonic Stack  
B) Min Heap  
C) Trie  
D) Hash Set

**答案**: B) Min Heap

**为什么**:
- heap 天然适合维护动态 top-k
- 只保留 k 个元素时，空间受控
- 流式场景不适合每次全量排序

---

### 4. Number of Islands with Repeated Merge Operations

**题面信号**:
- 连通块数量
- 多次 union 操作
- 需要快速回答当前组件数量

**问题**: 你优先考虑什么模型？

A) DFS 每次重算  
B) Union Find  
C) Sliding Window  
D) Greedy

**答案**: B) Union Find

**为什么**:
- 这是标准的连通性 + 动态合并问题
- path compression + union by rank 很适合高频 merge

---

### 5. Daily Temperatures / Next Greater Element

**题面信号**:
- 对每个元素找右边第一个更大值
- 线性扫描
- 需要保留“还没被解决”的候选项

**问题**: 最自然的模型是什么？

A) Monotonic Stack  
B) Binary Search  
C) DP  
D) BFS

**答案**: A) Monotonic Stack

**为什么**:
- 这是“为未完成元素等待更优答案”的经典结构
- 栈里维护单调性，遇到更大值时批量结算

---

### 6. Cheapest Path in a Weighted Graph with Non-negative Edges

**题面信号**:
- 图
- 带权
- 最短路径
- 权重非负

**问题**: 最优先模型是什么？

A) Plain BFS  
B) Dijkstra  
C) Union Find  
D) Topological Sort

**答案**: B) Dijkstra

**为什么**:
- 非负权最短路就是 Dijkstra 的主场
- BFS 只适合无权图或等权边

## Part 2: Explain Why Not

对下面两题，先写出你会选的模型，再补一句“为什么不是另一个很像的模型”。

### 1. Subarray Sum Equals K

**高分答案要点**:
- 先说 `prefix sum + hashmap`
- 再补一句“这题虽然也是连续子数组，但不像 sliding window，因为窗口条件不具备稳定的单调收缩性质，负数会破坏简单双指针”

### 2. Top K Frequent Elements

**高分答案要点**:
- 先说 `hashmap counting + heap` 或 `bucket sort`
- 再补一句“这题核心不是排序全部元素，而是只维护频率最高的 k 个候选”

## Part 3: Mini Implementation Check

### Problem A: Longest Substring Without Repeating Characters

补全下面的 Kotlin skeleton，并说出循环不变量。

```kotlin
fun lengthOfLongestSubstring(s: String): Int {
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

**不变量**:
- 任意时刻窗口 `s[left..right]` 都不包含重复字符

### Problem B: Kth Largest in a Stream

解释为什么 size 为 `k` 的 min heap 比 max heap 更自然。

**答案要点**:
- min heap 的堆顶就是当前第 k 大
- 新元素只需和堆顶比较，低于堆顶直接丢弃
- max heap 会保留太多无关元素

## Part 4: Self-Review Rubric

每题做完后按下面打分：

- `1 分` 看到题面后 30 秒内给出合理候选模型
- `1 分` 能说明关键识别信号
- `1 分` 能解释为什么不是最容易混淆的另一个模型
- `1 分` 能说出时间复杂度和空间复杂度
- `1 分` 能指出至少一个 edge case

**15 分以上**: 模型识别已经比较稳定  
**10-14 分**: 还需要在“为什么不是别的模型”上补强  
**10 分以下**: 先回到 [[Problem Modeling]] 和 [[Brute Force and Optimization]]

## Related Topics

- [[Problem Modeling]]
- [[Sliding Window]]
- [[Binary Search]]
- [[Heap and Priority Queue]]
- [[Monotonic Stack]]
- [[Graph Shortest Path]]
