# Workflow Orchestration

Workflow Orchestration 是对批处理和多阶段任务进行编排、调度和监控的能力。

详细解释：

在投行平台里，风险计算、EOD 估值、报表发布和数据同步通常都不是一步完成，而是由几十到几百个依赖任务组成。orchestration 层负责决定任务执行顺序、失败重试、补跑、依赖管理和运行可视化，是保证整个平台每天按时产出的关键。

典型能力：

- dependency scheduling
- retry and rerun
- backfill
- SLA monitoring
- operational alerting

实务重点：

- 任务重跑必须与数据版本绑定
- 依赖关系需要足够显式，不能靠人工记忆
- 对月末、季末和监管报表日要有更强的控制和容量规划

相关：

- [[Batch Processing]]
- [[Risk Platform]]
- [[Trading System Architecture]]

从哪里继续看：

- 知识库内继续看 [[Data Lineage]]、[[Message Queue]]
- 软件技术可查 Airflow、Control-M、Dagster、Argo Workflows
- 设计角度可继续看 DAG、idempotency、checkpointing

