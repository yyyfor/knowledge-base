---
title: Senior Architecture Interview Question Bank
tags: ["architecture", "interview", "senior", "question-bank"]
difficulty: advanced
estimated_time: 45 min
last_reviewed: 2026-04-30
---

# Senior Architecture Interview Question Bank

这组问题用于把知识库中的每个主题都提升到 senior 级别。每个问题都应该能引导出设计边界、取舍、失败模式和演进路径。

## Universal Senior Questions

### Q1：这个系统的核心 business goal 是什么？

A：先讲用户或业务方要完成的决策或动作，再讲系统指标。比如 risk platform 的目标不是“跑 batch”，而是准时交付可审计风险数字；GenAI assistant 的目标不是“回答问题”，而是提升知识获取效率且降低 hallucination 风险。

### Q2：source of truth 是什么？

A：明确谁拥有事实，谁只是派生视图。Senior 回答必须区分 transaction truth、event truth、analytical truth 和 serving view。

### Q3：主链路和异步链路怎么拆？

A：主链路只保留必须同步完成的动作；日志、统计、通知、索引、聚合、报表尽量异步化。但异步链路必须有幂等、重试、DLQ、监控和回放能力。

### Q4：如何处理 partial failure？

A：先分类 failure：transient、data、business/model、infrastructure。不同 failure 有不同 retry、quarantine、fallback、manual review 和 escalation。

### Q5：如果规模扩大 10 倍，瓶颈在哪里？

A：从 dominant path 分析：读、写、计算、存储、网络、外部依赖、查询、队列、热点。不要直接说“加机器”。

### Q6：如何证明系统设计是成功的？

A：用 metrics 证明：latency、availability、cost、data quality、business SLA、manual effort reduction、audit completeness、model quality 或 portfolio outcome。

## System Design Deep-Dive

Q：为什么不能只用一个数据库解决？

A：不同 workload 有不同访问模式。OLTP 适合事务和点查，cache 适合低延迟热点读，search/vector index 适合检索，warehouse/columnar store 适合分析。Senior 不是追求数据库多，而是按 workload 分离。

Q：什么时候引入 queue？

A：当副作用不需要同步完成、需要削峰、需要多消费者、需要 retry 或需要解耦上下游时引入 queue。引入 queue 的代价是最终一致、重复消息、顺序问题和可观测复杂度。

Q：什么时候 cache 是危险的？

A：当数据强一致、权限敏感、失效复杂、key 热点严重、或 cache miss 会打穿下游时，cache 需要更严格设计。cache 不是银弹。

## Investment Banking / Risk Deep-Dive

Q：front office 系统和 risk 系统的设计目标有什么不同？

A：front office 更关注交易响应、报价速度和 trader workflow；risk 系统更关注 portfolio-level aggregation、official numbers、lineage、auditability 和 batch SLA。

Q：VaR、Greeks、PnL Explain 在系统上有什么不同？

A：Greeks 是 sensitivity 计算，任务容易随 risk factor explosion 增长；VaR 是 portfolio-level distribution，需要 scenario aggregation；PnL Explain 是 attribution，需要比较 market move、position change 和 model effect。

Q：为什么金融系统特别强调 reconciliation？

A：因为多个系统拥有不同真相：trade、market data、finance ledger、risk result。没有 reconciliation，数字差异会进入报表和监管流程，问题会被放大。

## GenAI Deep-Dive

Q：什么时候不用 GenAI？

A：如果任务是确定性规则、简单搜索、结构化报表或低容错自动化，传统系统可能更可靠、更便宜。Senior 回答要先判断 problem fit，而不是默认加 LLM。

Q：RAG 系统最容易失败在哪里？

A：文档权限过滤、chunking、embedding mismatch、retrieval recall、reranking、citation faithfulness、prompt injection、stale index 和 evaluation。RAG 失败不一定是模型失败。

Q：Agent 最大风险是什么？

A：错误工具调用、权限越界、无限循环、成本失控、不可解释决策和高风险 action 无人审。需要 tool policy、approval gate、budget、timeout、audit 和 eval。

## Quant / Research Deep-Dive

Q：如何设计一个可信 backtest？

A：固定数据版本，处理 corporate actions，避免 look-ahead 和 survivorship bias，纳入交易成本和流动性，保留 config/code version，并做 out-of-sample 和 sensitivity test。

Q：research platform 和 production trading system 的边界是什么？

A：research platform 优先实验速度和可复现；production system 优先稳定、延迟、风控、监控和执行正确性。两者要共享数据定义和 signal contract，但不能混用 runtime 假设。

## Investing / Allocation Deep-Dive

Q：如何评价一个投资策略？

A：不能只看历史收益。要看风险暴露、最大回撤、波动、相关性、成本、税费、容量、流动性、行为可执行性和不同市场环境下的表现。

Q：为什么再平衡是一种系统设计？

A：再平衡有触发条件、阈值、交易成本、税务影响、现金流约束和执行纪律。它不是临时操作，而是 portfolio control loop。

## Behavioral / Career Deep-Dive

Q：Senior 项目故事最重要的是什么？

A：不是任务规模，而是你如何在约束下做判断、对齐 stakeholder、承担 trade-off、降低风险、交付可验证结果，并沉淀成团队能力。

Q：如何回答“你会如何改进这个系统”？

A：先承认当前阶段的合理性，再按 risk、scale、cost、governance 分阶段改进。不要直接否定旧系统，也不要提出无法落地的大重构。

## 相关

- [[Senior Architecture Decision Framework]]
- [[Domain Architecture Playbooks]]
- [[System Design Interview Practicum]]
- [[Quant Interview Notes]]
- [[AI Application Development Interview Questions]]
