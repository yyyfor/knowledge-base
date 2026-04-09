---
title: Local Volatility Model
tags: ["investment-banking", "finance"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Local Volatility Model

Local Volatility Model 假设波动率是时间和标的价格的确定性函数。

详细解释：

它通过市场观测到的 [[Volatility Surface]] 反推出局部波动率函数，使模型在校准时能精确拟合 vanilla options 的隐含波动率曲面。Local vol 常用于 exotic options 定价，因为它比 Black-Scholes 更贴近市场曲面，但仍保持相对可控的模型结构。

核心特点：

- Volatility depends on spot and time
- Can fit vanilla implied volatility surface
- Deterministic volatility function

局限：

- 对未来 smile dynamics 的刻画未必真实
- 对某些 exotic payoff 的 hedge 表现可能不稳定

相关：

- [[Volatility Surface]]
- [[Black-Scholes Model]]
- [[Structured Products]]

从哪里继续看：

- 知识库内继续看 [[Stochastic Volatility Model]]、[[Monte Carlo Simulation]]
- 量化进阶可看 Dupire local vol framework
- 产品语境里通常与 barrier、autocallable 定价一起出现

