# Volatility Surface

波动率曲面描述不同期限与执行价下的隐含波动率分布。

详细解释：

真实市场并不满足“所有期权共享同一个常数波动率”的假设，因此交易员和模型会用二维曲面表示不同到期日和 moneyness 下的隐含波动率。它直接影响期权定价、Vega 风险和模型校准，是期权业务中最关键的市场输入之一。

应用：

- option pricing
- volatility arbitrage
- model calibration

常见观察维度：

- Term structure：不同期限的波动率变化
- Smile/Skew：不同执行价对应的曲线形状
- Surface dynamics：市场冲击后曲面如何移动和扭曲

相关：

- [[Derivatives]]
- [[Derivatives Pricing]]
- [[Market Data]]
- [[Local Volatility Model]]
- [[Stochastic Volatility Model]]

从哪里继续看：

- 知识库内先看 [[Greeks]]、[[Market Data]]
- 入门推荐 Natenberg；更偏模型可看 Gatheral 的 *The Volatility Surface*
- 技术实现可查 curve/surface builder 和 market data calibration
