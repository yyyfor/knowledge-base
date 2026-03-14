# Risk Aggregation

风险聚合用于计算组合整体风险。

详细解释：

单笔交易的风险值意义有限，真正的管理对象通常是 desk、book、portfolio、entity 乃至全行层级的合并风险。Risk Aggregation 关注如何在统一层级和统一口径下，把 trade-level 风险汇总成管理层可用指标，同时保留向下追踪到交易的能力。

流程：

Trade -> Desk -> Portfolio -> Firm

工程难点：

- 层级映射和 book 结构是否稳定
- 不同资产类别的风险口径是否统一
- 结果是否可解释、可回放、可复算

相关：

- [[Value at Risk]]
- [[Risk Platform]]

从哪里继续看：

- 知识库内继续看 [[Risk Calculation System]]、[[PnL Explain]]
- 系统设计可结合 [[Trading System Architecture]]
- 如果偏管理框架，可查 enterprise risk aggregation 和 limit framework
