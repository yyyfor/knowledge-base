---
title: Value at Risk
tags: ["investment-banking", "finance"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Value at Risk

VaR 衡量投资组合在一定置信度下的最大潜在损失。

详细解释：

更准确地说，VaR 表示在给定持有期和置信度下，损失分布的某个分位数。例如 99% one-day VaR 表示在模型假设成立时，99% 的交易日损失不会超过这个数。它是投行限额和监管报表中的常见指标，但无法完整反映极端尾部损失，因此通常要搭配压力测试或 Expected Shortfall。

计算方法：

- Historical Simulation
- Parametric Method
- Monte Carlo

方法差异：

- Historical Simulation：直观，但依赖历史窗口
- Parametric Method：快，但依赖分布假设
- Monte Carlo：灵活，但计算最重

相关：

- [[Risk Aggregation]]

从哪里继续看：

- 知识库内接着看 [[Stress Testing]]、[[Monte Carlo Simulation]]
- 入门推荐 Jorion 的 *Value at Risk*
- 若想理解监管语境，可继续查 Basel market risk 和 Expected Shortfall
