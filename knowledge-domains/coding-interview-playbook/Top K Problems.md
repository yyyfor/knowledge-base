---
title: Top K Problems
tags: ["coding-interview"]
difficulty: intermediate
estimated_time: 3 min
last_reviewed: 2026-04-09
---

# Top K Problems

Top K 类问题的关键是意识到你不需要对全部元素做全排序，往往只需要维护一小部分最重要的候选。

## Notes

这类题天然适合拿来展示 heap 的价值：当 K 远小于 n 时，用 size 为 K 的 heap 维护候选，通常比全量 sort 更符合题意，也更容易延展到 streaming 场景。

高质量回答要明确 K 和 n 的关系、输入是否一次性可得、是否要求实时更新，以及最终是要返回排序结果还是只要集合。

## Key Points

- model: heap / priority queue
- avoid full sorting when K is small
- heap size often stays at K
- streaming variants are common follow-ups

## Typical Problems and Solutions

- Kth Largest Element in an Array: 用 min-heap 维护 K 个最大元素，堆顶就是第 K 大。时间复杂度 `O(n log K)`，空间复杂度 `O(K)`。也可以用 Quickselect 做 `O(n)` 平均时间。
- Top K Frequent Elements: 统计频率后，用 min-heap 按频率维护前 K 个元素。时间复杂度 `O(n + m log K)`，其中 `m` 是不同元素数量。
- K Closest Points to Origin: 用 max-heap 维护 K 个最近点，距离计算时避免开方。时间复杂度 `O(n log K)`，空间复杂度 `O(K)`。

## Kotlin Solution

```kotlin
fun findKthLargest(nums: IntArray, k: Int): Int {
    val minHeap = PriorityQueue<Int>()
    
    for (num in nums) {
        minHeap.offer(num)
        if (minHeap.size > k) {
            minHeap.poll()
        }
    }
    
    return minHeap.peek()
}

fun topKFrequent(nums: IntArray, k: Int): List<Int> {
    val frequency = HashMap<Int, Int>()
    for (num in nums) {
        frequency[num] = frequency.getOrDefault(num, 0) + 1
    }
    
    val minHeap = PriorityQueue<Int> { a, b -> frequency[a]!! - frequency[b]!! }
    
    for (num in frequency.keys) {
        minHeap.offer(num)
        if (minHeap.size > k) {
            minHeap.poll()
        }
    }
    
    return minHeap.toList()
}

fun kClosest(points: Array<IntArray>, k: Int): Array<IntArray> {
    fun distance(point: IntArray): Int {
        return point[0] * point[0] + point[1] * point[1]
    }
    
    val maxHeap = PriorityQueue<IntArray> { a, b -> distance(b) - distance(a) }
    
    for (point in points) {
        maxHeap.offer(point)
        if (maxHeap.size > k) {
            maxHeap.poll()
        }
    }
    
    return maxHeap.toTypedArray()
}
```

## Python Solution

```python
import heapq
from collections import Counter
from typing import List

def find_kth_largest(nums, k):
    """Find the kth largest element using min-heap."""
    min_heap = []
    
    for num in nums:
        heapq.heappush(min_heap, num)
        if len(min_heap) > k:
            heapq.heappop(min_heap)
    
    return min_heap[0]

def top_k_frequent(nums, k):
    """Find k most frequent elements."""
    frequency = Counter(nums)
    
    # Use negative frequency for max-heap behavior
    min_heap = []
    for num, count in frequency.items():
        heapq.heappush(min_heap, (count, num))
        if len(min_heap) > k:
            heapq.heappop(min_heap)
    
    return [num for count, num in min_heap]

def k_closest(points, k):
    """Find k closest points to origin."""
    def distance(point):
        return point[0] ** 2 + point[1] ** 2
    
    # Use max-heap to keep k smallest distances
    max_heap = []
    for point in points:
        dist = distance(point)
        heapq.heappush(max_heap, (-dist, point))
        if len(max_heap) > k:
            heapq.heappop(max_heap)
    
    return [point for dist, point in max_heap]
```

## Supplemental Topics

- [[Heap and Priority Queue]]
- [[Follow-up Strategy]]
- [[Complexity Analysis]]
- [[Binary Search]]
