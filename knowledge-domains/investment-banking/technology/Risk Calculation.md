# Risk Calculation

风险计算是从市场数据与交易数据出发，生成敏感度、情景损失和聚合风险指标的过程。

详细解释：

Risk Calculation 更像一条计算链路，而不是单个数值。它先决定用什么市场快照和产品模型，再计算单笔交易风险，然后做净额和聚合，最后产出 desk 或 firm 级结果。这个过程决定了风险数字的可解释性和可复现性。

核心输出：

- [[Greeks]]
- [[Value at Risk]]
- [[Stress Testing]]

相关：

- [[Risk Calculation System]]
- [[Pricing Engine]]

从哪里继续看：

- 知识库内建议看 [[Risk Aggregation]]、[[PnL Explain]]
- 如果想区分概念，可把 pricing 理解为估值，把 risk calculation 理解为估值对风险因子的响应
- 工程视角可查 bump-and-revalue、analytic sensitivities、scenario engine
