---
title: Reference Data
tags: ["investment-banking", "finance"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Reference Data

Reference Data 是描述金融对象和系统主数据的静态或低频变化数据。

详细解释：

它包括 instrument identifiers、counterparty 信息、book hierarchy、legal entity、currency、calendar、settlement convention 等内容。相比实时市场数据，reference data 变化更慢，但错误影响非常大，因为它决定交易和风险结果如何被解释、聚合和入账。

常见内容：

- instrument static fields
- counterparty and legal entity
- holiday calendars
- book and portfolio hierarchy
- settlement convention

实务重点：

- reference data 错误会引发错误聚合、错误贴现和错误报表
- 跨系统 identifier mapping 是常见痛点
- 需要严肃的 ownership、approval 和 lineage

相关：

- [[Market Data]]
- [[Risk Aggregation]]
- [[Trade Capture]]
- [[Data Lineage]]

从哪里继续看：

- 知识库内建议继续看 [[Trade Lifecycle]]、[[Market Data Pipeline]]
- 工程资料可查 MDM、instrument master、counterparty master、symbology mapping
- 如果偏系统控制，可查 data stewardship、approval workflow、reconciliation

