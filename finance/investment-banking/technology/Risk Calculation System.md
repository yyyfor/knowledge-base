# Risk Calculation System

用于计算投资组合风险指标。

详细解释：

Risk Calculation System 负责把交易和市场数据转化成可管理的风险输出。它通常包括 trade loading、market snapshot、pricing call、risk aggregation、result storage 和 downstream reporting。对中大型机构而言，这类系统的价值在于稳定、批量、可解释，而不只是“能算出来”。

功能：

- Greeks
- VaR
- scenario analysis

关键要求：

- calculation consistency
- horizontal scalability
- rerun and auditability
- fast drill-down from portfolio to trade

相关：

- [[Greeks]]
- [[Value at Risk]]
- [[Stress Testing]]
- [[Distributed Computing]]

从哪里继续看：

- 知识库内继续看 [[Risk Platform]]、[[Risk Aggregation]]、[[PnL Explain]]
- 工程架构可查 risk cube、result store、calculation DAG 和 scheduling
- 面试准备时建议同时整理 batch vs real-time risk 的取舍
