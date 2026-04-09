---
title: Yield Curve
tags: ["investment-banking", "finance"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Yield Curve

收益率曲线描述不同期限利率工具的收益率水平。

详细解释：

收益率曲线是利率产品定价和贴现的基础。它通常不是直接观察到的单一对象，而是通过存款、FRA、IRS、国债、OIS 等市场报价 bootstrap 出来的。现代投行估值里，forecast curve 与 discount curve 的区分非常重要。

应用：

- discounting
- curve construction
- interest rate derivatives pricing

实务重点：

- Bootstrapping：从市场报价反推零息曲线
- OIS discounting：危机后常见的贴现框架
- Curve shifts：平移、陡峭化、蝶式变化会影响 rates risk

相关：

- [[Market Data]]
- [[Valuation]]
- [[Derivatives Pricing]]

从哪里继续看：

- 知识库内建议看 [[Valuation]]、[[FVA]]
- 利率建模可看 Brigo and Mercurio 的 *Interest Rate Models*
- 系统实现可查 curve construction library、market conventions 和 holiday calendar
