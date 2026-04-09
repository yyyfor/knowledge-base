---
title: Greeks
tags: ["investment-banking", "finance"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Greeks

Greeks 衡量价格对市场变量变化的敏感度。

详细解释：

Greeks 本质上是价格对风险因子的局部导数，用来回答“市场变量变动一点，价格会怎么变”。它们是交易对冲、风险限额、PnL explain 和日终风险报表的共同语言。风险系统通常先计算 trade-level Greeks，再向 desk 和 portfolio 聚合。

| Greek | Meaning |
| ------ | ------ |
| Delta | price sensitivity |
| Gamma | delta change |
| Vega | volatility sensitivity |
| Theta | time decay |
| Rho | interest rate sensitivity |

实务要点：

- Delta/Gamma 主要反映标的价格风险
- Vega 主要反映隐含波动率变化风险
- Theta 常用于解释期权时间价值流失
- Rho 在利率产品和长期交易中更关键

相关：

- [[Derivatives Pricing]]
- [[Risk Calculation]]

从哪里继续看：

- 知识库内可继续看 [[Market Risk]]、[[PnL Explain]]、[[Risk Calculation System]]
- 入门教材可看 Hull 和 Natenberg
- 若想理解计算实现，可继续查 analytic sensitivities、bump-and-revalue、AAD
