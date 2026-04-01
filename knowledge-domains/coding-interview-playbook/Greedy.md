---
title: Greedy
tags: [coding-interview]
---

# Greedy

Greedy 适合每一步都能做局部最优且不会破坏全局最优的问题，关键是先证明贪心选择的正确性，而不是只凭直觉。

## Notes

很多贪心题的真正难点不在实现，而在于识别是否存在一个“当前最优选择”能够安全地延伸到全局最优。常见信号包括按某个关键维度排序后顺序决策、或每次挑最早结束、最小代价、最大收益的那个对象。

高质量回答要说明为什么这个局部规则是安全的。哪怕不给完整数学证明，也要讲交换论证、排序后不变式或“如果不这么选会更差”的 reasoning。

## Key Points

- make the locally optimal choice
- justify why local choice leads to global optimum
- sorting is often the first step
- common in scheduling and interval optimization

## Supplemental Topics

- [[Interval Problems]]
- [[Problem Modeling]]
- [[Complexity Analysis]]
- [[Follow-up Strategy]]
