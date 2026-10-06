---
title: Agent Architecture and Engineering Practice
tags: ["ai", "agent", "architecture", "context-engineering", "tool-use", "harness"]
difficulty: advanced
estimated_time: 45 min
last_reviewed: 2026-07-05
source: https://tw93.fun/2026-03-21/agent.html
---

# Agent Architecture and Engineering Practice

Agent 的工程价值不在于让模型“自主多想几步”，而在于把控制流、上下文、工具、记忆、评估、追踪、安全和恢复机制组合成一个可验证的系统。

## 来源信息

- 原网页标题：你不知道的 Agent：原理、架构与工程实践
- 来源/作者/机构：Tw93
- 发布时间：2026-03-21
- 链接：[https://tw93.fun/2026-03-21/agent.html](https://tw93.fun/2026-03-21/agent.html)
- 适用领域：AI Agent、工程架构、上下文工程、工具调用、多 Agent、评估与安全
- 可信度判断：中高。文章覆盖 Agent 工程多个关键模块，适合做架构学习和工程 checklist；其中涉及具体数值和项目案例的部分需要结合原始出处或自身项目验证。

## 适用层级

- Level 1 Beginner：理解 Agent Loop、Workflow 与 Agent 的区别。
- Level 2 Intermediate：掌握控制模式、上下文分层、工具设计和 Skills 设计。
- Level 3 Advanced：关注 Harness、Eval、Tracing、安全、Crash Recovery 和生产级 Agent 架构。

## 一句话总结

生产级 Agent 是 model + loop + tools + state + policy + evaluation + recovery 的组合，不是一个更长的 prompt。

## 核心结论

Agent 的主循环本身并不复杂，复杂性主要来自循环外部的上下文、工具、状态、权限、验证和恢复机制。Workflow 和 Agent 的核心区别是控制权：Workflow 的路径由代码预设，Agent 的下一步由模型动态判断。Harness 比单纯换更强模型更关键，因为任务目标、验证方式、执行边界和回退机制决定 Agent 是否可控。上下文工程决定模型能看到什么，工具设计决定模型能做什么，评估和追踪决定系统是否能被持续改进。

## 核心概念

- Agent Loop：模型接收消息，判断是否调用工具，执行工具，把结果写回上下文，再继续下一轮，直到输出最终文本。
- Workflow：执行路径由代码预定义，同样输入通常走同样路径。
- Agent：执行路径由 LLM 动态决定，可能根据工具结果、错误反馈和中间推理改变路线。
- Harness：围绕 Agent 的测试、验证、约束和回退基础设施。
- Context Engineering：管理信息进入模型的顺序、层级、频率、压缩和保留优先级。
- Skills：系统提示只保留能力索引，真正需要时再加载完整知识。
- Tool Design：工具描述、schema、权限、错误返回和结果压缩共同决定工具是否可用。
- Memory：跨会话经验和偏好不应全部常驻上下文，而应可检索、可更新、可审计。
- Tracing：记录 prompt、工具调用、模型响应、成本、延迟和失败路径，帮助复盘 Agent 行为。
- Crash Recovery：长任务需要持久化进度，支持恢复、重试和回滚。

## 为什么重要

很多 Agent Demo 看起来能工作，是因为任务短、权限低、验证宽松。一旦进入真实业务，Agent 会遇到长上下文、工具误用、状态漂移、权限边界、成本增长和失败恢复问题。只有把 Agent 当成工程系统设计，才能避免它变成不可控的自动化脚本。

## 关键点

- Agent Loop 稳定，新增能力通常不应该塞进主循环，而应放在工具、系统提示、文件状态或数据库状态中。
- 判断是否使用 Agent，要先看任务是否需要动态推理；固定流程优先用 Workflow 或 Prompt Chaining。
- 控制模式包括 Prompt Chaining、Routing、Parallelization、Orchestrator-Workers 和 Evaluator-Optimizer。
- 多 Agent 不是默认方案，先把单 Agent 的工具、上下文和验证做好，再考虑拆分子 Agent。
- Harness 至少包含验收基线、执行边界、反馈信号和回退手段。
- 上下文越长不等于效果越好，噪声会稀释关键信号。
- 可以用常驻层、按需加载、运行时注入、记忆层和系统层分层管理上下文。
- Skills 描述要像路由条件，写清 Use when、Do not use、产出物和反例。
- 工具数量、工具定义长度和 MCP schema 都会消耗上下文预算。
- 长任务必须有 heartbeat、状态持久化、任务恢复和完成标准。

## 基础例子

一个代码修复 Agent 不应该只是“读文件然后改代码”。更完整的流程是：确认工作区和任务边界，读取相关文件，复现问题，制定计划，修改代码，运行验证，记录结果，必要时回滚，并把未完成项明确反馈给用户。这里模型负责判断下一步，外部系统负责工具、权限、状态和验证。

## 实务应用

- 代码助手：用文件系统做上下文接口，按需读取代码和文档，避免一次性塞入大量内容。
- 企业自动化：高风险工具调用需要权限、审批、日志和回滚。
- 知识库助手：RAG 不能只做检索，还要做权限过滤、引用、评估和反馈闭环。
- 长任务处理：使用 heartbeat 或定时唤醒检查任务状态，避免任务漂移或中断后无法恢复。
- 团队 Skills 库：把高频任务拆成小 Skill，每个 Skill 只做一类事，并写清触发条件。

## 典型流程

- Step 1：判断任务类型，是固定路径还是动态决策。
- Step 2：选择控制模式，避免所有任务都上 Agent。
- Step 3：设计上下文层级，保持常驻层短、稳定、可执行。
- Step 4：设计工具 schema、权限、timeout、retry 和错误返回。
- Step 5：设计任务状态和停止条件。
- Step 6：设计验证方式，包括自动测试、人工确认、日志和指标。
- Step 7：设计恢复机制，包括进度文件、rollback note 和 crash recovery。
- Step 8：用 tracing 复盘失败路径，再优化 prompt、工具和 eval。

## 可复用框架 / 方法论

### Agent 选型矩阵

- 流程固定 + 验收可代码判定：Workflow 或 Prompt Chaining。
- 输入可分类到不同分支：Routing。
- 需要中间推理 + 验收清晰：单 Agent ReAct Loop。
- 任务可拆 + 子任务可并行：Orchestrator-Workers。
- 质量标准难以代码化：Evaluator-Optimizer。
- 高风险决策 + 需要多视角：Parallelization 或投票。

### Context 分层框架

- 常驻层：身份、硬约束、禁止项、完成标准。
- 按需加载：Skills、领域知识、长文档。
- 运行时注入：当前时间、用户、渠道、任务状态。
- 记忆层：长期偏好、项目经验、历史决策。
- 系统层：Hooks、代码规则、权限控制、Linter、CI。

### Tool Design Checklist

- 工具名称是否能准确表达动作。
- description 是否说明何时使用和何时不要使用。
- 参数 schema 是否足够严格。
- 返回内容是否经过压缩和结构化。
- 错误信息是否能指导模型修正。
- 是否有 timeout、retry、rate limit 和 audit log。
- 是否限制高风险写操作。
- 是否能被 eval 覆盖。

### Long Task Recovery Checklist

- 当前任务目标是否写入状态文件。
- 已完成步骤和下一步是否明确。
- 修改过哪些文件是否记录。
- 验证状态是 pass、fail 还是未运行。
- 是否保留 rollback note。
- 任务中断后能否从状态文件恢复。

## 常见误区

- 误区：Agent Loop 越复杂越强。主循环应该稳定，复杂性应放到外部状态、工具和策略。
- 误区：多 Agent 一定比单 Agent 强。多 Agent 会引入协调成本、上下文隔离和结果合并问题。
- 误区：把所有文档放进系统提示。低频知识应该按需加载。
- 误区：工具越多越好。工具过多会增加 token 成本和选择错误。
- 误区：只调 prompt 不看工具定义。很多工具误选来自描述不准、schema 不清或错误返回无用。
- 误区：只看 Agent 输出，不看执行轨迹。没有 tracing 就无法复盘失败原因。

## 风险点

- 上下文污染：旧错误路径留在上下文中，影响后续决策。
- 权限外泄：子 Agent 或工具获得不该拥有的记忆、Skills 或写权限。
- 工具误用：模型选错工具、传错参数或误解错误返回。
- 成本失控：长上下文、多工具、多轮循环和 MCP schema 都会增加成本。
- 验证缺失：没有明确 pass/fail 标准，Agent 可能“看起来完成”但实际不可用。
- 恢复失败：长任务中断后没有进度文件，无法安全继续。

## 进阶内容

### Prompt Caching

Prompt Caching 依赖精确前缀匹配，稳定的系统提示、工具定义和长文档更容易命中缓存。动态信息应放在后面，避免破坏前缀稳定性。这个原则也支持“常驻层短而稳定，低频内容按需加载”的上下文设计。

### Skills vs MCP

Skills 更适合加载文本知识、流程和 checklist；MCP 更适合需要维护状态、连接外部系统或提供工具生态的场景。两者都要控制常驻成本，避免把大量低频能力塞进默认上下文。

### OpenClaw 系统提示分层

OpenClaw 的实现思路是把身份、行为约束、任务完成标准、项目规则、工具说明、用户偏好、记忆和运行时信息按层组合。普通会话、子 Agent 和 heartbeat 模式加载范围不同，以降低权限外泄和任务漂移。

### Heartbeat

Heartbeat 让 Agent 不依赖用户消息也能按节奏检查任务状态。适合长任务、定时任务和需要恢复的工程任务，但必须配合任务状态文件和明确的完成标准。

## 案例

### 案例 1：Agent 代码修复

一个修复 bug 的 Agent 应先验证当前状态和复现路径，再修改代码，最后运行测试或应用验证。它不能只生成 patch，而要把验证结果和限制反馈给用户。质量来自工具链、测试和观测，而不只是模型能力。

### 案例 2：工具结果压缩

如果工具每次返回大量 JSON，模型上下文会快速膨胀。更好的方式是把完整结果写到文件，给模型返回摘要和文件路径，让模型通过 grep、rg 或脚本按需读取。

### 案例 3：上下文 rewind

当 Agent 走错方案时，继续纠正可能把错误路径留在上下文里。更稳的做法是回到关键节点，用已经知道的信息重新发起任务，避免错误历史污染决策。

## 重要数据 / 案例 / 引用

- 文中提到 Agent Loop 可抽象成很小的循环，但生产复杂度在循环外部。
- 文中提到 Context Rot 和长上下文质量下降问题，具体阈值受模型和任务影响，需定期验证。
- 文中提到 MCP 工具定义可能消耗大量 token，实际成本取决于工具数量和 schema。
- 文中提到 Skills 加反例会提升触发准确率，该数据需结合实验来源交叉验证。
- OpenAI/Codex 开发实践案例属于经验性案例，适合启发工程思路，但不应直接当作普遍速度承诺。

## 我的应用建议

- 工作决策：先用 Agent 选型矩阵判断是否真的需要 Agent。
- 项目管理：把 Agent 项目拆成控制流、上下文、工具、验证、安全和恢复六个模块。
- 行业研究：判断 Agent 产品时，看它有没有 Harness、Tracing、Eval 和权限控制，而不是只看模型演示。
- 写作素材：可扩展为“Agent 从 Demo 到生产”的工程文章。
- 培训分享：适合给工程团队做 Agent 架构培训。
- 后续提问或深度研究：继续研究 Agent Eval、MCP 权限、工具 schema 设计和长任务恢复。

## Checklist

- 是否先判断任务适合 Workflow 还是 Agent？
- 是否有明确目标、边界、停止条件和预算？
- 是否把常驻上下文控制在短、硬、稳定的范围？
- 是否将低频知识做成按需加载？
- 是否为工具定义了 schema、权限、timeout、retry 和错误返回？
- 是否有 tracing 记录 prompt、工具调用、响应、成本和延迟？
- 是否有自动或人工验证标准？
- 是否有任务状态文件、rollback note 和恢复机制？

## 相关

- [[AI Knowledge Base Map]]
- [[AI Agent and AI Coding Knowledge Synthesis]]
- [[AI Application Development Interview Questions]]
- [[Senior Architecture Decision Framework]]
- [[System Design Knowledge Map]]
