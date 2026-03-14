# Monte Carlo Simulation

用于复杂衍生品定价和风险计算。

详细解释：

Monte Carlo Simulation 通过大量随机路径逼近未来市场分布，再估计价格、暴露或风险分布。它适合路径依赖产品、多因子模型和缺少解析解的问题，但计算量大，因此常与 [[Distributed Computing]]、variance reduction 和高性能随机数生成一起使用。

应用：

- Option pricing
- VaR calculation
- Risk simulation

关键点：

- 路径生成：不同模型决定不同随机过程
- 误差控制：样本数、置信区间、variance reduction
- 工程实现：并行化、随机种子管理、可重复性

相关：

- [[Derivatives Pricing]]
- [[Value at Risk]]

从哪里继续看：

- 知识库内继续看 [[Distributed Computing]]、[[Risk Calculation System]]
- 理论进阶可看 Glasserman 的 *Monte Carlo Methods in Financial Engineering*
- 如果从平台角度理解，可继续看 [[Pricing Engine]] 和 [[Risk Platform]]
