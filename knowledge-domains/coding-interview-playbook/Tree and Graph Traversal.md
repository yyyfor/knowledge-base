---
title: Tree and Graph Traversal
tags: ["coding-interview"]
difficulty: intermediate
estimated_time: 2 min
last_reviewed: 2026-04-09
---

# Tree and Graph Traversal

树和图题的基础骨架通常就是 DFS、BFS、recursion 和 traversal state 的管理。

## Notes

这类题首先要判断结构是树还是一般图，因为是否存在环、是否需要 visited、是否能依赖 parent-child 关系，会直接改变遍历策略。

DFS 更适合递归展开、路径回溯和子树聚合，BFS 更适合按层遍历、最短步数和从源点逐层扩展。高分关键不是背遍历模板，而是知道为什么当前题要用这个遍历顺序。

中等题示例：Number of Islands。题目是给你一个由 `'1'` 和 `'0'` 组成的二维网格，`'1'` 代表陆地、`'0'` 代表海水，要求返回岛屿数量。核心是每发现一块未访问陆地，就用 DFS 或 BFS 一次性淹没整块连通区域。

## Key Points

- DFS / BFS
- recursion
- visited set and traversal state
- 树和图要先区分是否有环

## Typical Problems and Solutions

- Binary Tree Level Order Traversal: 用 BFS 和 queue 按层推进。每轮先记录当前层节点数，再逐个弹出并把左右孩子入队。时间复杂度 `O(n)`，空间复杂度 `O(w)`，其中 `w` 是树的最大层宽，最坏为 `O(n)`。
- Number of Islands: 把每个陆地格子视为图节点，用 DFS 或 BFS 淹没整块连通区域。每发现一个未访问陆地，岛屿计数加一。时间复杂度 `O(mn)`，空间复杂度 `O(mn)`，递归栈或队列最坏会到整个网格规模。
- Clone Graph: 用 DFS/BFS 遍历原图，并用 hashmap 保存 `原节点 -> 新节点` 映射，避免重复拷贝和环导致的无限递归。时间复杂度 `O(V + E)`，空间复杂度 `O(V)`。

## Kotlin Solution

```kotlin
class TreeNode(var `val`: Int) {
    var left: TreeNode? = null
    var right: TreeNode? = null
}

fun levelOrder(root: TreeNode?): List<List<Int>> {
    if (root == null) return emptyList()

    val result = mutableListOf<List<Int>>()
    val queue = ArrayDeque<TreeNode>()
    queue.addLast(root)

    while (queue.isNotEmpty()) {
        val size = queue.size
        val level = mutableListOf<Int>()
        repeat(size) {
            val node = queue.removeFirst()
            level.add(node.`val`)
            node.left?.let(queue::addLast)
            node.right?.let(queue::addLast)
        }
        result.add(level)
    }

    return result
}

fun numIslands(grid: Array<CharArray>): Int {
    if (grid.isEmpty()) return 0

    val rows = grid.size
    val cols = grid[0].size
    var count = 0

    fun dfs(r: Int, c: Int) {
        if (r !in 0 until rows || c !in 0 until cols || grid[r][c] != '1') return
        grid[r][c] = '0'
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
    }

    for (r in 0 until rows) {
        for (c in 0 until cols) {
            if (grid[r][c] == '1') {
                count++
                dfs(r, c)
            }
        }
    }

    return count
}
```

## Supplemental Topics

- [[Graph Shortest Path]]
- [[Backtracking]]
- [[Dijkstra and Shortest Path]]
- [[Problem Modeling]]
