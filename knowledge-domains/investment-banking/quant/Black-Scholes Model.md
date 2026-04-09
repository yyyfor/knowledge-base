---
title: Black-Scholes Model
tags: ["investment-banking", "finance"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Black-Scholes Model

Black-Scholes Model 是最经典的期权定价模型之一。

详细解释：

它假设标的价格服从几何布朗运动，波动率和无风险利率在定价区间内为常数，并在无套利条件下给出欧式期权的闭式解。虽然真实市场不满足这些假设，但 Black-Scholes 仍然是现代衍生品定价、隐含波动率和 [[Greeks]] 分析的基础语言。

核心假设：

- Lognormal price dynamics
- Constant volatility
- Constant risk-free rate
- Frictionless market and no arbitrage

优点与局限：

- 优点：解析清晰、计算快、便于风险敏感度分析
- 局限：无法自然解释 smile/skew，需要依赖 [[Volatility Surface]]

相关：

- [[Options]]
- [[Derivatives Pricing]]
- [[Greeks]]
- [[Volatility Surface]]

从哪里继续看：

- 知识库内建议继续看 [[Binomial Tree Model]]、[[Local Volatility Model]]、[[Stochastic Volatility Model]]
- 入门可看 Hull
- 如果你更关心交易语言，继续看隐含波动率和 delta hedging

