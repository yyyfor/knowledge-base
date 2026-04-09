---
title: Prediction Markets and LMSR
tags: ["investment-banking", "finance"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Prediction Markets and LMSR

Prediction market 可以看成一种以概率报价的事件衍生品市场。对投行语境来说，它不是主流产品，但它把定价、做市、库存风险和执行速度这些核心问题压缩到了一个更容易观察的实验场里。

详细解释：

文章先从 LMSR（Logarithmic Market Scoring Rule）讲起，再引到 Polymarket 当前更接近传统电子市场的 CLOB（Central Limit Order Book）结构。这个演化过程很适合拿来理解“公式驱动定价”和“订单簿驱动价格形成”之间的差异。

LMSR 的核心直觉：

- 它通过一个成本函数把一组仓位映射成一组概率价格
- 所有结果价格之和恒等于 1，天然满足概率约束
- 流动性参数决定盘口有多“厚”
- 做市商的最大理论亏损是有上界的

为什么这对投行知识库有价值：

- 二元事件合约本质上和 digital payoff 的直觉相通，适合训练 [[Derivatives Pricing]] 的概率视角
- 当市场从 LMSR 转向 CLOB，问题就从“套公式”变成“如何围绕 fair value 双边报价并控制库存风险”
- 这与电子期权做市、流动性提供和高频执行的很多核心问题是同构的
- 文章里关于估计误差、半凯利、相关性风险和执行速度的讨论，也可以直接迁移到 [[Market Risk]]、[[Value at Risk]]、[[Trading System Architecture]] 的理解

CLOB 与投行电子交易的共性：

- fair value 先由模型给出，但成交价格由订单簿博弈决定
- spread 不是纯利润，它是 adverse selection、库存风险和手续费的补偿
- 只要报价慢、概率错、对冲慢，流动性提供者就会被更快或更准的对手方挑走
- 交易架构必须把 market data、quote engine、order routing、risk checks 和 PnL explain 串起来

对投行场景的推导：

以下几条不是文章原文，而是基于文章观点迁移到投资银行语境的应用。

- 预测市场价格接近 50% 时，仓位和对冲会更敏感，这有助于建立对 [[Greeks]] 中 delta 和 gamma 风险的直觉
- 对事件驱动或 jump-heavy 产品，概率更新速度往往比静态估值公式更重要
- “独特 edge 来自数据、模型、执行” 这件事，在 sell-side 里可以分别映射到独家数据源、定价模型质量和交易系统性能
- 文章强调的 estimation error，本质上就是投行里 model risk 和 parameter uncertainty 的另一种说法

从哪里继续看：

- 产品与定价：[[Derivatives]]、[[Options]]、[[Derivatives Pricing]]、[[Greeks]]
- 风险管理：[[Market Risk]]、[[Value at Risk]]、[[Stress Testing]]
- 系统架构：[[Trading System Architecture]]、[[Pricing Engine]]、[[Risk Platform]]、[[Market Data]]

来源：

- 原文：gemchanger, *How I'd Become a Quant If I Had to Start Over Tomorrow*
- 中文改写：MrRyanChi, BlockBeats《2026年，普通人如何开始量化交易？》
- 链接：https://www.theblockbeats.info/news/61793
