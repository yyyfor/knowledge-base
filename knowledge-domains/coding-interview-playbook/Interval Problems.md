---
title: Interval Problems
tags: [coding-interview]
---

# Interval Problems

区间题的关键是先判断是否需要排序、合并还是扫描边界，很多看似不同的题本质上都围绕起点终点关系展开。

## Notes

典型区间题通常先按起点排序，再顺序扫描；一旦当前区间和上一个区间重叠，就做合并或更新边界。核心不在于记具体题，而在于你能否识别“排序后局部决策就足够”这个结构。

回答时要先澄清区间是闭区间还是开区间、是否已排序、是否允许原地修改，以及结果是要合并区间、统计重叠还是找最少删除数。

## Key Points

- sort by start time first
- merge overlapping intervals
- track current end boundary
- clarify closed vs open interval semantics

## Supplemental Topics

- [[Greedy]]
- [[Array and String Patterns]]
- [[Problem Modeling]]
- [[Complexity Analysis]]
