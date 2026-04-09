---
title: Graph Shortest Path
tags: ["coding-interview"]
difficulty: intermediate
estimated_time: 2 min
last_reviewed: 2026-04-09
---

# Graph Shortest Path

图最短路问题的关键是先识别边权特征，再决定 BFS、Dijkstra 还是别的更重算法。

## Notes

如果边权统一或每步成本相同，BFS 常常就足够；如果边权非负，则 Dijkstra 往往是标准答案。真正重要的是先看问题结构，而不是一看到 shortest path 就默认上最复杂算法。

这类题的高分点在于你能解释“为什么这个最短路模型成立”，以及优先队列、visited 状态和距离更新规则如何配合。

中等题示例：Network Delay Time。题目是给你一个带非负权的有向图和起点 `k`，要求计算信号传播到所有节点所需的最短总时间；若有节点不可达则返回 `-1`。标准解法是 Dijkstra：最小堆每次弹出当前最短距离节点，并对邻边做 relaxation。

## Key Points

- unweighted shortest path often uses BFS
- non-negative weighted shortest path often uses Dijkstra
- distance relaxation is the core step
- priority queue often appears in weighted cases

## Typical Problems and Solutions

- Word Ladder: 把每次变一个字符视为一条等权边，用 BFS 从起点按层扩张，第一次到达终点时步数最短。常见做法时间复杂度约为 `O(N * L * 26)`，空间复杂度 `O(N)`，其中 `L` 是单词长度。
- Network Delay Time: 边权非负，用 Dijkstra 维护源点到各节点的当前最短距离，每次弹出距离最小的未确定节点继续松弛邻边。时间复杂度 `O((V + E) log V)`，空间复杂度 `O(V + E)`。
- 0-1 Matrix / Rotting Oranges 一类最短步数题: 若每步代价相同，可用多源 BFS，把所有初始源点一起入队并向外分层扩散。时间复杂度 `O(mn)`，空间复杂度 `O(mn)`。

## Kotlin Solution

```kotlin
import java.util.PriorityQueue

fun networkDelayTime(times: Array<IntArray>, n: Int, k: Int): Int {
    val graph = Array(n + 1) { mutableListOf<Pair<Int, Int>>() }
    for ((u, v, w) in times) {
        graph[u].add(v to w)
    }

    val dist = IntArray(n + 1) { Int.MAX_VALUE }
    dist[k] = 0
    val pq = PriorityQueue<Pair<Int, Int>>(compareBy { it.second })
    pq.offer(k to 0)

    while (pq.isNotEmpty()) {
        val (node, cost) = pq.poll()
        if (cost > dist[node]) continue

        for ((next, weight) in graph[node]) {
            val newCost = cost + weight
            if (newCost < dist[next]) {
                dist[next] = newCost
                pq.offer(next to newCost)
            }
        }
    }

    var answer = 0
    for (node in 1..n) {
        if (dist[node] == Int.MAX_VALUE) return -1
        answer = maxOf(answer, dist[node])
    }
    return answer
}
```

## Supplemental Topics

- [[Tree and Graph Traversal]]
- [[Heap and Priority Queue]]
- [[Dijkstra and Shortest Path]]
- [[Problem Modeling]]
