---
title: Market Data Pipeline
tags: ["investment-banking", "finance"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Market Data Pipeline

Market Data Pipeline 是把外部行情和内部加工结果稳定输送到定价与风险系统的链路。

详细解释：

原始行情通常不能直接被模型消费。一个完整 pipeline 会从供应商接入开始，经过解析、映射、清洗、归一化、校验、时间戳处理、版本管理，再发布给 pricing、risk 和 reporting 系统。很多生产事故并不发生在模型里，而发生在 pipeline 的字段映射、缺口处理或发布时序上。

典型流程：

- source ingestion
- validation and cleansing
- normalization and symbology mapping
- curve or surface building
- publish to downstream systems

实务重点：

- 同一市场快照必须在多个系统中保持一致
- 需要明确 real-time 与 end-of-day 的数据口径
- 失败数据需要 fallback、override 与审计记录

相关：

- [[Market Data]]
- [[Reference Data]]
- [[Pricing Engine]]
- [[Risk Platform]]

从哪里继续看：

- 知识库内继续看 [[Data Lineage]]、[[Message Queue]]
- 工程实现可查 pub-sub、schema registry、golden source、data quality rules
- 若偏市场对象建模，可继续看 curves、surfaces、fixings、corporate actions

