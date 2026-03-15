# Stochastic Volatility Model

Stochastic Volatility Model 假设波动率本身也是一个随机过程。

详细解释：

这类模型试图更真实地描述市场中的 smile、skew 和波动率动态。与 local vol 的“确定性曲面”不同，stochastic vol 允许波动率随时间随机变化，因此通常更适合描述未来波动率行为和某些 exotic products 的风险特征。Heston 是最常见的代表模型之一。

核心特点：

- Volatility follows its own stochastic process
- Better smile dynamics than constant-vol models
- More parameters and calibration complexity

实务重点：

- 模型校准与数值稳定性是关键问题
- 常需要 Fourier methods 或 [[Monte Carlo Simulation]]
- 与 local vol、jump-diffusion 常一起比较

相关：

- [[Volatility Surface]]
- [[Black-Scholes Model]]
- [[Local Volatility Model]]

从哪里继续看：

- 知识库内继续看 [[Structured Products]]、[[Monte Carlo Simulation]]
- 进阶可看 Heston model、SABR、jump-diffusion
- 交易语境里可继续查 smile dynamics 和 vega hedging

