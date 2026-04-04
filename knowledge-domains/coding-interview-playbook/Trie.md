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

## Typical Problems and Solutions

- Implement Trie (Prefix Tree): 直接实现 `insert`、`search` 和 `startsWith` 三个原语，展示 Trie 的基本节点结构和前缀路径搜索。单次操作时间复杂度 `O(L)`，空间复杂度取决于新增节点数，最坏为 `O(total chars)`。
- Word Search II: 先把词典建成 Trie，再从棋盘每个起点 DFS。搜索过程中一旦 Trie 中不存在后续字符，就立刻剪枝。建 Trie 时间复杂度 `O(total chars)`，搜索最坏较高，常写作 `O(mn * 4^L)`，空间复杂度 `O(total chars + L)`。
- Search Suggestions System: 把商品词典放进 Trie，输入每个前缀时沿路径向下，并从对应子树取字典序最小的若干候选词。建 Trie 时间复杂度 `O(total chars)`，查询每个前缀时间复杂度与前缀长度和收集候选数相关，空间复杂度 `O(total chars)`。

## Kotlin Template

```kotlin
class TrieNode {
    val children = HashMap<Char, TrieNode>()
    var isWord = false
}

class Trie {
    private val root = TrieNode()

    fun insert(word: String) {
        var node = root
        for (ch in word) {
            node = node.children.computeIfAbsent(ch) { TrieNode() }
        }
        node.isWord = true
    }

    fun search(word: String): Boolean {
        val node = walk(word) ?: return false
        return node.isWord
    }

    fun startsWith(prefix: String): Boolean {
        return walk(prefix) != null
    }

    private fun walk(s: String): TrieNode? {
        var node = root
        for (ch in s) {
            node = node.children[ch] ?: return null
        }
        return node
    }
}
```

## Supplemental Topics

- [[Array and String Patterns]]
- [[Hashing and Frequency Maps]]
- [[Problem Modeling]]
- [[Coding Communication]]
