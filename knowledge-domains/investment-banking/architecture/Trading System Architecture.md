---
title: Trading System Architecture
tags: ["investment-banking", "finance"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Trading System Architecture

交易系统架构连接前台定价、中台风险、后台数据与报表。

详细解释：

投行交易系统通常不是单体系统，而是由交易录入、市场数据、定价、风险、确认清算、账务和报表等多个系统拼接而成。系统架构决定了数据流是否一致、控制点是否清晰，以及交易从 capture 到 valuation 到 risk report 是否可追踪。

典型模块：

- [[Trade Capture]]
- [[Market Data Pipeline]]
- [[Pricing Engine]]
- risk engine
- reporting

常见设计问题：

- 实时与批量链路如何分工
- 市场数据是否只有一个 golden source
- trade model 和 risk hierarchy 是否一致
- 失败任务如何补跑和审计

相关：

- [[Pricing Engine]]
- [[Risk Platform]]
- [[Distributed Computing]]
- [[Workflow Orchestration]]
- [[Data Lineage]]

从哪里继续看：

- 知识库内建议连着看 [[Trade Lifecycle]]、[[Risk Platform]]、[[Risk Calculation System]]
- 工程领域可看 [[Event-Driven Architecture]]、[[Data Lineage]]、[[Workflow Orchestration]]
- 面试场景可把这篇当作系统设计题提纲
