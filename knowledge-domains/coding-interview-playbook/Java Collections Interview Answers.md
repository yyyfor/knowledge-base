---
title: Java Collections Interview Answers
tags: ["coding-interview", "java", "collections", "interview-answers"]
difficulty: intermediate
estimated_time: 30 min
last_reviewed: 2026-04-20
---

# Java Collections Interview Answers

集合题的核心不是背源码细节，而是理解数据结构、复杂度、并发边界和对象相等语义。

## HashMap 的底层结构是什么？

参考回答：

JDK 8 之后，HashMap 底层是数组 + 链表 + 红黑树。key 经过 hash 扰动后定位到数组桶，如果多个 key 落在同一个桶里，就用链表处理冲突；当链表足够长且数组容量达到一定阈值后，会树化成红黑树，降低极端冲突下的查询复杂度。

正常情况下，HashMap 的 get/put 接近 O(1)。但这依赖 hash 分布比较均匀。如果 key 的 hashCode 实现很差，或者大量 key 冲突，性能会明显下降。

## 为什么 JDK 8 后引入红黑树？

参考回答：

引入红黑树是为了降低哈希冲突严重时的最坏情况复杂度。链表查找是 O(n)，如果恶意构造大量 hash 冲突，HashMap 性能会退化。红黑树可以把冲突桶内查找降低到 O(log n)。

但树化不是一冲突就发生，因为红黑树维护成本更高。只有桶内元素超过阈值且数组容量足够大时才树化；如果容量太小，优先扩容，因为扩容后冲突可能自然缓解。

## HashMap 扩容时发生什么？

参考回答：

HashMap 超过负载因子阈值后会扩容，通常容量翻倍，并把旧数组里的节点重新分布到新数组。JDK 8 利用了容量翻倍的特性，一个节点要么留在原 index，要么移动到 `oldIndex + oldCapacity`，不需要重新完整计算 hash。

扩容代价比较高，所以如果能预估数据量，初始化时给合适容量可以减少 rehash 成本。面试里可以补充：高并发场景不要用普通 HashMap 共享写，否则可能出现数据竞争和结构异常。

## HashMap 为什么不是线程安全的？

参考回答：

HashMap 没有对并发 put/remove/resize 做同步保护。多个线程同时修改时，可能出现覆盖写、size 不准确、遍历异常，甚至在历史版本中 resize 链表处理可能造成环形链表。

如果多个线程只读且初始化后不再修改，风险较低；如果有并发写，应使用 `ConcurrentHashMap`，或者在外层加锁，但外层锁会降低并发度。

## ConcurrentHashMap 如何保证并发安全？

参考回答：

JDK 8 的 ConcurrentHashMap 主要用 CAS + synchronized + volatile 保证并发安全。数组桶为空时可以 CAS 插入；桶不为空时锁住桶头节点做局部修改；size 统计使用分散计数减少竞争。它避免了对整个 Map 加一把大锁。

成熟回答要补边界：ConcurrentHashMap 保证单次操作线程安全，但不代表一组复合操作天然原子。比如“先 get 再 put”仍有竞态，应使用 `putIfAbsent`、`computeIfAbsent` 这类原子方法。

## ArrayList 和 LinkedList 怎么选？

参考回答：

ArrayList 底层是动态数组，随机访问 O(1)，尾部追加通常很快，内存局部性好，是大多数 List 场景的默认选择。LinkedList 是双向链表，理论上中间插入删除 O(1)，但前提是已经定位到节点；实际定位仍是 O(n)，而且对象额外指针多、缓存局部性差。

面试里可以直接说：除非你明确需要队列/双端队列语义，否则 LinkedList 很少是默认最优选择。需要队列时通常也会优先考虑 ArrayDeque。

## HashSet 如何保证元素唯一？

参考回答：

HashSet 底层通常基于 HashMap 实现，元素作为 key，value 用固定占位对象。判断唯一性依赖 `hashCode()` 和 `equals()`：先根据 hashCode 定位桶，再用 equals 判断是否相同。

所以 HashSet 的正确性依赖元素的 equals/hashCode 实现。如果元素字段可变，放入 Set 后再修改参与 hash 的字段，可能导致 contains/remove 失败。

## PriorityQueue 适合什么场景？

参考回答：

PriorityQueue 是基于堆的优先队列，适合每次快速取出最小或最大元素，比如 Top K、任务调度、Dijkstra、合并 K 个有序链表。插入和弹出通常是 O(log n)，查看堆顶是 O(1)。

它不是全局有序集合，遍历 PriorityQueue 不保证排序。如果需要有序遍历，应使用排序或 TreeMap/TreeSet。

## fail-fast 和 fail-safe iterator 有什么区别？

参考回答：

fail-fast 迭代器在遍历过程中检测到集合被结构性修改时，会尽快抛出 `ConcurrentModificationException`，典型如 ArrayList、HashMap。它主要是 bug detection，不是并发安全保证。

fail-safe 通常基于副本或弱一致性遍历，不会因为并发修改立即失败，比如 CopyOnWriteArrayList 或 ConcurrentHashMap 的迭代器。代价是可能看不到最新修改，或者写入成本更高。

## 为什么 mutable object 不适合当 HashMap key？

参考回答：

如果 key 的字段参与 hashCode/equals，放入 HashMap 后再修改这些字段，key 所在桶和逻辑相等关系就可能变化。结果是 Map 里明明有这个对象，却 get/remove 不到，或者出现重复逻辑 key。

更好的做法是使用不可变对象作为 key，或者只用稳定唯一 ID 参与 equals/hashCode。

## Related

- [[Java Interview Questions]]
- [[Java Core Interview Answers]]
- [[Hashing and Frequency Maps]]
