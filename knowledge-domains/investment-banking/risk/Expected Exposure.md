---
title: Expected Exposure
tags: ["investment-banking", "finance"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Expected Exposure

Expected Exposure 是未来某个时间点上交易组合正向暴露的期望值。

详细解释：

它通常来自大量市场路径模拟，用于衡量在不同未来时点，若交易对手违约时我方可能面临的平均损失暴露。Expected Exposure 是 [[Counterparty Credit Risk]] 和 [[CVA]] 计算中的关键中间变量。其变体包括 EPE、ENE、PFE 等。

常见相关指标：

- EE: Expected Exposure
- EPE: Expected Positive Exposure
- PFE: Potential Future Exposure
- ENE: Expected Negative Exposure

实务重点：

- 暴露分布依赖产品组合、净额集和市场模拟
- collateral 与 margining 会显著改变 exposure profile
- exposure engine 常与 [[Monte Carlo Simulation]] 结合

相关：

- [[Counterparty Credit Risk]]
- [[CVA]]
- [[Monte Carlo Simulation]]
- [[Collateral and CSA]]

从哪里继续看：

- 知识库内继续看 [[Initial Margin]]、[[MVA]]
- 监管方向可看 PFE limit、SA-CCR
- 平台实现可查 exposure simulation engine 和 netting set analytics

