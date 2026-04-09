---
title: Trade Capture
tags: ["investment-banking", "finance"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Trade Capture

Trade Capture 是把交易员、销售或电子平台产生的交易记录正式写入系统的过程。

详细解释：

这是整个交易和风险链路的起点。一个 trade 一旦被 capture，后续定价、确认、结算、PnL、风险和监管报送都会基于这份记录展开。Trade capture 系统需要保证字段完整、产品模型正确、版本可追踪，并尽量减少前台录入和中后台消费之间的语义偏差。

典型输入：

- Front-office blotter
- Electronic trading venue
- Booking API
- Post-trade enrichment

实务重点：

- trade schema 是否稳定会直接影响下游系统
- amendment、cancel、rebook 需要有明确版本语义
- 产品条款标准化是后续 [[Pricing Engine]] 和 [[Risk Calculation System]] 的前提

相关：

- [[Trade Lifecycle]]
- [[Trading System Architecture]]
- [[Microservices and APIs]]

从哪里继续看：

- 知识库内建议继续看 [[Trade Lifecycle]]、[[Data Lineage]]
- 工程实现可查 booking service、trade normalization、schema evolution
- 若偏控制，可继续看 audit trail、maker-checker 和 exception queue

