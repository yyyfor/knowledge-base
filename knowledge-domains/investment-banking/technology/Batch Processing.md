---
title: Batch Processing
tags: ["investment-banking", "finance"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Batch Processing

Batch Processing 是按固定时间窗口或任务批次处理大量数据和计算的方式。

详细解释：

投行很多关键流程仍然以 batch 为中心，例如 end-of-day valuation、overnight risk、XVA recalculation、regulatory reporting 和 PnL explain。相较于实时系统，batch 更强调完整性、一致性和可重放性，但通常会牺牲时效性。

典型场景：

- EOD pricing
- overnight VaR
- stress testing runs
- daily PnL explain
- monthly or quarter-end reporting

实务重点：

- batch cutoff time 和 snapshot policy 必须清晰
- rerun 时要能固定输入版本和模型版本
- 产出结果需要进入统一 result store 或 reporting layer

相关：

- [[Workflow Orchestration]]
- [[Risk Calculation System]]
- [[PnL Explain]]

从哪里继续看：

- 知识库内继续看 [[Data Lineage]]、[[Distributed Computing]]
- 软件技术可查 scheduler、distributed batch engine、checkpointing、partitioned workloads
- 面试或设计题可对比 batch vs real-time risk

