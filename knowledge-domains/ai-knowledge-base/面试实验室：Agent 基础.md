---
title: 面试实验室：Agent 基础
tags: ["ai", "rag", "agent", "engineering"]
difficulty: intermediate
estimated_time: 20 min
last_reviewed: 2026-10-06
source_complete: true
---

# 面试实验室：Agent 基础

本章收录面试实验室的完整问答，保留题号与英文问题。实现细节来自独立的学习示例项目，不代表现有小程序已部署这些功能，也不代表读者已有相关经历；面试回答应替换为自己的真实实践。

## C1 · 什么是 AI Agent？

英文问题：What is an AI agent?

Agent 是一个由模型在循环中决定下一步的系统。它看到目标和当前状态，提出一个动作，应用校验并执行，观察结果反馈回来，如此反复直到满足停止条件。关键的工程要点：模型提议，应用决定。授权、执行、状态、重试和审批属于 runtime，而不是模型。

不要说： “LLM 调用了 API。”

## C2 · Workflow 与 Agent：什么时候不该用 Agent？

英文问题：Workflow vs agent: when would you NOT use an agent?

如果路径能事先确定，就用确定性的 workflow：更便宜、更快、可测试、可审计。只有当下一步确实取决于刚得到的信息时才用 Agent。大多数生产系统是“workflow + 少数 agentic 节点”。示例项目的 required_tools 正是这样：把必须发生的部分变成 workflow，其余保持自主。

## C3 · 讲讲 function calling 的完整流程。谁执行函数？

英文问题：Walk me through function calling. Who executes the function?

(1) 应用把工具名称、描述和 JSON Schema 发给模型。(2) 模型返回结构化请求：工具名 + 参数。(3) 应用进行授权、校验参数、执行，并校验结果。(4) 结果作为观察返回给模型。模型从不执行代码。在示例项目的 runtime 中，模型返回 AgentAction JSON，Pydantic 按白名单工具的参数模型校验；只读工具直接执行，写工具暂停等待审批。

## C4 · 什么是 ReAct？

英文问题：What is ReAct?

ReAct（“Reason + Act”，Yao 等人 2022）交替进行推理、动作和观察，循环往复。它是大多数使用工具的 Agent 的基础模式。示例项目的循环沿用了它，只是不保存模型的推理，只保存它选择的动作。

## C5 · 你还知道哪些 Agent 模式？

英文问题：What other agent patterns do you know?

来自 Anthropic《Building Effective Agents》：prompt chaining（固定顺序）、routing（先分类再分派）、parallelization（分段或投票）、orchestrator-workers（主模型动态拆分任务）、evaluator-optimizer（生成 → 评审 → 修改），以及完全自主的 Agent。另外还有 plan-and-execute（先计划后执行，失败时重新计划）和 reflection（自我批评）。默认建议是从能工作的最简单模式开始。

## C6 · State、context、memory 的区别？

英文问题：State vs context vs memory?

State 是数据库中权威的任务进度：步骤、观察、待审批、状态。Context 是我这一次调用放在模型面前的内容，由 state 派生。Memory 是有意跨轮次或跨 run 保留的信息，比如用户偏好或学到的事实。不要把聊天记录当作 state；像“已创建 ID 为 X 的 follow-up”这样的业务事实应放在结构化存储中，也就是示例项目的 followups 表。

## C7 · 你会如何给 Agent 加 memory？

英文问题：How would you add memory to an agent?

区分短期记忆（本次 run 的历史，太长时裁剪或摘要）和长期记忆。长期记忆有三类：语义（关于用户或领域的事实）、情节（过去的 run 及结果）、程序性（学到的指令）。有选择地写入，并附来源和时间戳；像 RAG 一样按相关性和新近度检索。风险：过时或错误的记忆、隐私（按用户和租户隔离，提供删除路径），以及通过提示注入进行的记忆投毒。示例项目中示例开发者加了旧观察的压缩，以及按用户隔离、带来源和过期时间的记忆表。

## C8 · 什么是 context engineering？

英文问题：What is context engineering?

精确选择模型每一步看到的内容：指令、工具定义、相关 state、检索到的证据和最近的观察，其余一律不放。上下文越多不等于越好，它耗 token 也分散模型注意力。方法：截断工具输出（示例开发者把命中截到 800 字符）、摘要旧步骤、只检索相关记忆、保持前缀稳定以利于缓存、把大内容放到文件或 ID 中。

## C9 · 如何防止无限循环或失控的 Agent？

英文问题：How do you prevent infinite loops or runaway agents?

分层限制：最大步数、墙钟超时、token 与成本预算、重复动作检测和明确的终止状态。触发限制时返回结构化失败或升级给人，永远不要让模型无限重试。示例项目的会以 max_steps、timeout、budget_exceeded 或 failed 停止；无效动作也算一步，所以持续输出垃圾的模型也一定会终止。

## C10 · 好的工具应该是什么样？

英文问题：What makes a good tool?

职责单一；名称清晰，描述说明何时使用；输入输出有严格类型和限制；明确副作用等级（只读 / 内部写 / 外部）；写明错误类型和重试安全性；尽量幂等；返回简洁、适合模型阅读的输出，而不是 5 MB 的 JSON。不要做 “do_anything(sql)” 这种万能工具。示例项目的 calculate 通过 AST 白名单只接受数字和 + - * / %，从不使用 eval。
