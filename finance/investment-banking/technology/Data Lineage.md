# Data Lineage

Data Lineage 用于追踪数据从源头到结果的来源、变换和依赖关系。

详细解释：

在风险和估值平台里，任何一个最终数字都应该能回答三个问题：它来自哪些源数据，经过了哪些转换，以及由哪个版本的模型和任务生成。Data lineage 是审计、复盘、监管解释和补跑控制的核心能力，尤其适用于 EOD risk、XVA 和财务报表。

典型追踪对象：

- trade source and version
- market snapshot version
- model version
- workflow run id
- result publication path

实务重点：

- 没有 lineage 的 rerun 很难保证结果可比
- lineage 需要跨系统而不是只在单个 job 内可见
- 它通常和 metadata store、run registry、audit trail 结合

相关：

- [[Trade Lifecycle]]
- [[Market Data Pipeline]]
- [[Workflow Orchestration]]

从哪里继续看：

- 知识库内建议继续看 [[Batch Processing]]、[[PnL Explain]]
- 软件技术可查 metadata catalog、OpenLineage、data provenance、run registry
- 如果偏控制框架，可继续看 auditability、reconciliation、model governance

