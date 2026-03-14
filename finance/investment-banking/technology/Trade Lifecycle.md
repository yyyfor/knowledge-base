# Trade Lifecycle

Trade Lifecycle 指一笔交易从成交到到期或终止的完整系统和业务流程。

详细解释：

一笔交易不会只在成交瞬间存在。它会经历 booking、确认、净额、抵押品处理、估值、风险计算、结算、会计过账、生命周期事件处理，最终到期或提前终止。理解 lifecycle 能帮助把前台系统、中台风险和后台运营放在一条完整链路里看。

典型阶段：

- [[Trade Capture]]
- confirmation and enrichment
- valuation and risk
- collateral and settlement
- accounting and reporting
- maturity, unwind, novation or termination

实务重点：

- lifecycle event 会改变现金流、exposure 和 PnL
- 不同产品类型的事件模型差异很大
- 系统之间需要共享一致的 trade identity 和 event history

相关：

- [[Collateral and CSA]]
- [[PnL Explain]]
- [[Trading System Architecture]]

从哪里继续看：

- 知识库内建议继续看 [[Trade Capture]]、[[Batch Processing]]、[[Data Lineage]]
- 系统设计可查 event sourcing、state machine、workflow engine
- 业务流程可继续看 confirmation、settlement、corporate action、novation

