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

## Supplemental Topics

- [[Tree and Graph Traversal]]
- [[Graph Shortest Path]]
- [[Problem Modeling]]
- [[Complexity Analysis]]
