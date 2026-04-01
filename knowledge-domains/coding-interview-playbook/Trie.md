---
title: Trie
tags: [coding-interview]
---

# Trie

Trie 适合做前缀查询、多词共享前缀存储和按字符逐步匹配的问题，核心是把字符串拆成逐层字符节点。

## Notes

如果题目频繁问“某个前缀是否存在”“有哪些单词共享这个前缀”“能否按字符流逐步匹配”，Trie 往往比 HashSet 更有结构优势。它把字符串搜索从整串比较变成按字符走路径。

高分回答要说明 Trie 为什么适合前缀问题，以及它在时间和空间上的 trade-off。它通常用更多空间换更稳定的按长度查询时间。

## Key Points

- prefix search
- character-by-character traversal
- shared prefix storage
- insert, search, startsWith

## Supplemental Topics

- [[Array and String Patterns]]
- [[Hashing and Frequency Maps]]
- [[Problem Modeling]]
- [[Coding Communication]]
