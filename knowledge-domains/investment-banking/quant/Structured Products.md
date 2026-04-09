---
title: Structured Products
tags: ["investment-banking", "finance"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Structured Products

结构化产品是将多个基础金融工具或衍生品条款组合而成的定制化产品。

详细解释：

Structured Products 通常将债券、期权和 path-dependent payoff 组合在一起，以实现特定收益分布、资本保护、票息增强或主题暴露。它们在私人银行、财富管理和机构定制交易中常见，也是 Quant 定价和风险系统最复杂的产品类别之一。

常见特征：

- Path dependency
- Barrier or autocall feature
- Coupon linked to market conditions
- Principal protection or leverage

实务重点：

- 定价往往依赖 [[Monte Carlo Simulation]]
- 风险暴露通常具有强非线性和 jumpy behavior
- 需要更强的情景分析和 [[Stress Testing]]

相关：

- [[Options]]
- [[Monte Carlo Simulation]]
- [[Greeks]]
- [[Stress Testing]]

从哪里继续看：

- 知识库内继续看 [[Volatility Surface]]、[[Local Volatility Model]]、[[Stochastic Volatility Model]]
- 产品视角可继续扩展 barrier、autocallable、convertible note
- 工程视角可继续看 [[Pricing Engine]] 与 model validation

