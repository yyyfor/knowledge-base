---
title: Heap and Priority Queue
tags: [coding-interview]
---

# Heap and Priority Queue

Heap / priority queue 的价值在于持续维护一组“当前最重要的元素”，尤其适合 top K 和 streaming 场景。

## Notes

如果题目不是要整体排序，而是只关心当前前 K 大、前 K 小、最早结束、最短距离这类局部优先关系，heap 往往比 sort 更自然。它的优势来自增量维护，而不是一次性全局重排。

答题时要说明为什么 heap 的比较规则能正确表达“优先级”，以及为什么维持一个 size 为 K 的 heap 比把所有元素都处理一遍再排序更合适。

## Key Points

- top K
- streaming input
- min-heap vs max-heap
- heap operation is O(log k) or O(log n)

## Typical Problems and Solutions

- Kth Largest Element in an Array: 维护一个 size 为 `k` 的 min-heap。遍历数组时若堆大小超过 `k` 就弹出最小值，最后堆顶就是第 `k` 大。
- Top K Frequent Elements: 先用 hashmap 统计频率，再用 min-heap 维护前 `k` 个最高频元素，避免对全部元素按频率全排序。
- Merge K Sorted Lists: 把每条链表当前头节点放入 min-heap，每次弹出最小节点接到答案后，再把该节点的下一个入堆。

## Kotlin Template

```kotlin
import java.util.PriorityQueue

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

fun topKFrequent(nums: IntArray, k: Int): IntArray {
    val count = HashMap<Int, Int>()
    for (num in nums) {
        count[num] = (count[num] ?: 0) + 1
    }

    val minHeap = PriorityQueue<Pair<Int, Int>>(compareBy { it.second })
    for ((num, freq) in count) {
        minHeap.offer(num to freq)
        if (minHeap.size > k) {
            minHeap.poll()
        }
    }

    return minHeap.map { it.first }.toIntArray()
}
```

## Supplemental Topics

- [[Top K Problems]]
- [[Dijkstra and Shortest Path]]
- [[Complexity Analysis]]
- [[Follow-up Strategy]]
