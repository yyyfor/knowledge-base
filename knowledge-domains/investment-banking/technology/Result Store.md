---
title: Result Store
tags: ["investment-banking", "finance"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Result Store

Result Store 是集中存储风险、估值和解释结果的系统或数据层。

详细解释：

计算引擎本身只负责产出结果，而真正被用户和下游系统消费的通常是一个可查询、可聚合、可回溯的结果存储层。它需要支持 portfolio-level summary、trade-level drill-down、历史版本查询和权限控制，是风险报表和 API 查询的核心依赖。

典型存储内容：

- risk sensitivities
- VaR and stress results
- exposure profiles
- PnL explain breakdown
- run metadata

实务重点：

- 结果粒度和压缩策略会影响存储成本与查询速度
- 必须和 run id、market snapshot、trade version 关联
- 常常需要同时支持批量导出和交互式查询

相关：

- [[Risk Calculation System]]
- [[Data Lineage]]
- [[Risk Aggregation]]

从哪里继续看：

- 知识库内继续看 [[Risk Platform]]、[[PnL Explain]]
- 软件技术可查 OLAP store、columnar database、query federation、semantic layer
- 设计角度可继续看 partitioning、versioned results、access control
