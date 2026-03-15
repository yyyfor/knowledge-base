# Distributed Computing

风险计算通常需要大规模计算。

详细解释：

当组合规模、风险场景和定价复杂度同时上升时，单机已无法在时限内完成计算，因此需要把任务拆分到多台机器并行执行。分布式计算在投行里常见于 overnight risk、Monte Carlo、stress revaluation 和大规模 sensitivities 计算。

技术：

- Spark
- Grid Computing
- HPC

选择差异：

- Spark：适合数据处理和通用分布式作业
- Grid Computing：传统投行批量风险场景常见
- HPC：更强调低延迟和高数值性能

相关：

- [[Risk Platform]]
- [[Risk Calculation System]]

从哪里继续看：

- 知识库内结合 [[Monte Carlo Simulation]]、[[Pricing Engine]] 看更完整
- 官方资料可看 Apache Spark 文档，以及常见 grid scheduler/HPC 基础介绍
- 设计角度可继续看 job partitioning、fault tolerance 和 deterministic rerun
