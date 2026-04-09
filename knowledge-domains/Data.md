---
title: Data
tags: [data, finance, overview]
difficulty: intermediate
estimated_time: 15 min
last_reviewed: 2026-04-09
---

# Data

Data 在这个知识库里主要指市场数据、参考数据、时间序列和结果解释链路。很多金融和量化问题最后都不是“模型不会”，而是数据口径、刷新时点、映射关系或血缘没讲清楚。

## Notes

讲数据时要同时回答数据来源、更新频率、质量校验和下游消费者。尤其在投行系统里，价格、曲线、静态属性和交易结果往往来自不同源头，任何一个口径出错都会影响定价、风控和报表。

## Core Topics

- [[Market Data]]
- [[Reference Data]]
- [[Time Series Data]]
- [[Market Data Pipeline]]
- [[PnL Explain]]
- [[Data Lineage]]

## Practical Use

如果题目既涉及模型又涉及系统，数据往往是最值钱的展开点。先说明哪个字段驱动模型，再解释它怎么进入平台、如何校验，以及出了问题会影响哪类结果。
