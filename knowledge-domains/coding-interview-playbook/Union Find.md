---
title: Union Find
tags: [coding-interview]
---

# Union Find

Union Find 适合处理动态连通性问题，核心是用 parent 结构维护元素所属集合，并用路径压缩和按秩合并把操作摊还到接近 O(1)。

## Notes

当题目不断问“这两个点是否连通”“加入一条边后会不会成环”“一共有多少个连通块”时，Union Find 往往是最自然的模型。它把集合合并和连通性查询变成两个非常稳定的原语：union 和 find。

高质量回答要说明为什么 parent 树能表示集合、为什么路径压缩能加速 find、以及为什么 union by rank 或 by size 能避免树退化。

## Key Points

- dynamic connectivity
- find representative parent
- path compression
- union by rank or size

## Typical Problems and Solutions

- Number of Connected Components in an Undirected Graph: 初始化每个点各自成集，每合并一条有效边就把连通块数量减一。
- Redundant Connection: 顺序处理边，若一条边的两个端点已经属于同一集合，则这条边会形成环，它就是多余连接。
- Accounts Merge: 把同一账户里的邮箱 union 到一起，再按根节点分组收集邮箱，最终得到合并后的账户结果。

## Kotlin Template

```kotlin
class UnionFind(n: Int) {
    private val parent = IntArray(n) { it }
    private val size = IntArray(n) { 1 }

    fun find(x: Int): Int {
        if (parent[x] != x) {
            parent[x] = find(parent[x])
        }
        return parent[x]
    }

    fun union(a: Int, b: Int): Boolean {
        var rootA = find(a)
        var rootB = find(b)
        if (rootA == rootB) return false

        if (size[rootA] < size[rootB]) {
            val tmp = rootA
            rootA = rootB
            rootB = tmp
        }

        parent[rootB] = rootA
        size[rootA] += size[rootB]
        return true
    }
}
```

## Supplemental Topics

- [[Tree and Graph Traversal]]
- [[Graph Shortest Path]]
- [[Problem Modeling]]
- [[Complexity Analysis]]
