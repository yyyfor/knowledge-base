---
title: Binomial Tree Model
tags: ["investment-banking", "finance"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Binomial Tree Model

Binomial Tree Model 用离散时间树结构近似标的价格路径，并据此定价衍生品。

详细解释：

它把未来时间离散化，在每个时间步只允许价格向上或向下变化，然后从终点 payoff 反向递推回当前价值。该方法结构直观，尤其适合处理 American options、early exercise 和一些 path-dependent features。

典型特点：

- Discrete-time approximation
- Backward induction
- Easy handling of early exercise
- Useful teaching and prototyping tool

实务重点：

- 时间步越细，结果通常越接近连续时间模型
- 对复杂高维产品时，tree method 会迅速变重
- 常作为解析模型与数值模型之间的中间层

相关：

- [[Options]]
- [[Derivatives Pricing]]
- [[Black-Scholes Model]]

从哪里继续看：

- 知识库内继续看 [[Monte Carlo Simulation]] 和 [[Structured Products]]
- 数值方法入门可结合 finite difference、trinomial tree 一起理解
- 教材可看 Hull 的数值定价章节

