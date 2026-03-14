# Pricing Engine

定价系统核心组件。

详细解释：

Pricing Engine 是把交易条款、市场数据和模型组合起来，批量输出价格与风险指标的核心服务。它既可能是交易前台的实时服务，也可能是夜间批量风险计算的一部分。对大型机构而言，pricing engine 的重点不仅是数学正确，还包括速度、稳定性、可扩展性和审计可追踪性。

结构：

Market Data  
↓  
Pricing Model  
↓  
Risk Metrics

常见能力：

- trade normalization
- model selection
- sensitivity calculation
- scenario revaluation

相关：

- [[Derivatives Pricing]]
- [[Risk Calculation System]]
- [[Black-Scholes Model]]
- [[Monte Carlo Simulation]]

从哪里继续看：

- 知识库内建议看 [[Distributed Computing]]、[[Trading System Architecture]]
- 工程实现可查 pricing library、model registry、cache strategy 和 batch orchestration
- 若偏定量方法，返回看 [[Derivatives Pricing]]、[[Black-Scholes Model]] 和 [[Monte Carlo Simulation]]
