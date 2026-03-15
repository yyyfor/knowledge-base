# Derivatives Pricing

衍生品定价用于计算金融产品理论价格。

详细解释：

定价的核心问题是：给定交易条款、市场数据和模型假设后，产品今天应该值多少钱。理论上这是未来现金流在风险中性框架下的贴现；工程上则要处理模型选择、参数校准、市场数据质量和系统性能。投行里做定价时通常还会同时输出 [[Greeks]] 与其他风险指标。

常见方法：

- [[Black-Scholes Model]]
- [[Binomial Tree Model]]
- Monte Carlo

这些方法的典型适用场景：

- [[Black-Scholes Model]]：适合欧式期权等闭式解问题
- [[Binomial Tree Model]]：适合早行权和离散时间结构
- [[Monte Carlo Simulation]]：适合路径依赖和高维问题

相关主题：

- [[Greeks]]
- [[Pricing Engine]]
- [[Risk Calculation]]
- [[Local Volatility Model]]
- [[Stochastic Volatility Model]]

从哪里继续看：

- 知识库内建议顺序：[[Derivatives]] -> [[Greeks]] -> [[Pricing Engine]]
- 数学方法可看 Hull；Monte Carlo 进阶可看 Glasserman
- 系统实现可继续看 [[Risk Calculation System]] 和 [[Trading System Architecture]]
