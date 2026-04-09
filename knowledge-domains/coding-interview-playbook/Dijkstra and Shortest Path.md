---
title: Dijkstra and Shortest Path
tags: ["coding-interview"]
difficulty: intermediate
estimated_time: 3 min
last_reviewed: 2026-04-09
---

# Dijkstra and Shortest Path

Dijkstra 是带非负权图最短路的标准答案，重点在于优先队列驱动的最短距离扩展和 relaxation 过程。

## Notes

这题最容易暴露的是候选人对“为什么优先弹出当前最短距离节点”理解不够。真正要讲透的是：在非负权前提下，一旦某节点以最小 tentative distance 出堆，它的最短距离就被确定了。

回答时不仅要会写 priority queue，还要说明 distance array、visited 或 lazy deletion、以及 relaxation 更新相邻节点这几步为什么能一起保证正确性。

## Key Points

- model: weighted shortest path with priority queue
- non-negative weights are the core assumption
- relax edges when a shorter path is found
- heap operations drive the next node choice

## Typical Problems and Solutions

- Dijkstra's Algorithm: 使用 priority queue 按当前最短距离扩展节点，每次弹出最小距离的节点并 relax 相邻边。时间复杂度 `O((V + E) log V)`，空间复杂度 `O(V)`。
- Network Delay Time: 计算信号从源节点传播到所有节点的时间，本质是求单源最短路的最大值。时间复杂度 `O((V + E) log V)`，空间复杂度 `O(V + E)`。
- Path with Minimum Effort: 在网格图中找最小最大边权路径，可以用 Dijkstra 的变种，距离定义为路径上最大高度差。时间复杂度 `O(mn log(mn))`，空间复杂度 `O(mn)`。

## Kotlin Solution

```kotlin
fun dijkstra(n: Int, edges: Array<IntArray>, start: Int): IntArray {
    val adj = Array(n) { mutableListOf<Pair<Int, Int>>() }
    for ((from, to, weight) in edges) {
        adj[from].add(to to weight)
        adj[to].add(from to weight)
    }

    val dist = IntArray(n) { Int.MAX_VALUE }
    dist[start] = 0
    val minHeap = PriorityQueue<Pair<Int, Int>> { a, b -> a.second.compareTo(b.second) }
    minHeap.offer(start to 0)

    while (minHeap.isNotEmpty()) {
        val (node, d) = minHeap.poll()
        if (d > dist[node]) continue

        for ((neighbor, weight) in adj[node]) {
            val newDist = dist[node] + weight
            if (newDist < dist[neighbor]) {
                dist[neighbor] = newDist
                minHeap.offer(neighbor to newDist)
            }
        }
    }

    return dist
}

fun networkDelayTime(times: Array<IntArray>, n: Int, k: Int): Int {
    val adj = Array(n) { mutableListOf<Pair<Int, Int>>() }
    for ((from, to, time) in times) {
        adj[from - 1].add((to - 1) to time)
    }

    val dist = IntArray(n) { Int.MAX_VALUE }
    dist[k - 1] = 0
    val minHeap = PriorityQueue<Pair<Int, Int>> { a, b -> a.second.compareTo(b.second) }
    minHeap.offer((k - 1) to 0)

    while (minHeap.isNotEmpty()) {
        val (node, time) = minHeap.poll()
        if (time > dist[node]) continue

        for ((neighbor, travelTime) in adj[node]) {
            val arrivalTime = dist[node] + travelTime
            if (arrivalTime < dist[neighbor]) {
                dist[neighbor] = arrivalTime
                minHeap.offer(neighbor to arrivalTime)
            }
        }
    }

    val maxTime = dist.maxOrNull() ?: -1
    return if (maxTime == Int.MAX_VALUE) -1 else maxTime
}
```

## Python Solution

```python
import heapq
from typing import List, Tuple
from collections import defaultdict

def dijkstra(n: int, edges: List[Tuple[int, int, int]], start: int) -> List[int]:
    """Standard Dijkstra's algorithm for single-source shortest paths."""
    adj = defaultdict(list)
    for from_node, to_node, weight in edges:
        adj[from_node].append((to_node, weight))
        adj[to_node].append((from_node, weight))

    dist = [float('inf')] * n
    dist[start] = 0
    min_heap = [(0, start)]

    while min_heap:
        current_dist, node = heapq.heappop(min_heap)
        
        if current_dist > dist[node]:
            continue

        for neighbor, weight in adj[node]:
            new_dist = dist[node] + weight
            if new_dist < dist[neighbor]:
                dist[neighbor] = new_dist
                heapq.heappush(min_heap, (new_dist, neighbor))

    return dist

def network_delay_time(times: List[List[int]], n: int, k: int) -> int:
    """Calculate time for signal to reach all nodes."""
    adj = defaultdict(list)
    for u, v, w in times:
        adj[u - 1].append((v - 1, w))

    dist = [float('inf')] * n
    dist[k - 1] = 0
    min_heap = [(0, k - 1)]

    while min_heap:
        current_time, node = heapq.heappop(min_heap)
        
        if current_time > dist[node]:
            continue

        for neighbor, time in adj[node]:
            arrival_time = dist[node] + time
            if arrival_time < dist[neighbor]:
                dist[neighbor] = arrival_time
                heapq.heappush(min_heap, (arrival_time, neighbor))

    max_time = max(dist)
    return -1 if max_time == float('inf') else max_time
```

## Supplemental Topics

- [[Graph Shortest Path]]
- [[Heap and Priority Queue]]
- [[Tree and Graph Traversal]]
- [[Complexity Analysis]]
