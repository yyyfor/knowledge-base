---
title: AI Application Development Interview Questions
tags: ["ai", "genai", "interview", "rag", "agent", "mcp"]
difficulty: intermediate
estimated_time: 20 min
last_reviewed: 2026-04-18
---

# AI Application Development Interview Questions

AI 应用开发面试的核心不是“会不会调用一个模型 API”，而是能不能把 LLM 基础、Prompt / Context Engineering、RAG、Agent、工具调用、MCP、安全和评估串成一套可上线的工程方案。

参考 JavaGuide 的 AI 应用开发面试指南，这类面试通常围绕 6 条主线：

- 大模型基础：token、上下文窗口、temperature、结构化输出、幻觉。
- AI Agent：agent loop、workflow、tool use、planning、memory、skills。
- RAG：chunking、embedding、retrieval、reranking、grounding、向量数据库。
- MCP and tool protocols：工具注册、能力发现、权限边界、生产环境 MCP server。
- Harness Engineering：上下文管理、工具编排、状态、降级、观测。
- AI coding and developer workflow：AI IDE、代码生成、重构、排障、人机协作边界。

## LLM 基础高频题

高频题目：

- Token 是什么？为什么中文和英文 token 消耗不同？
- Context window 是什么？长上下文为什么仍然可能“遗忘”关键指令？
- Temperature、top-p、top-k 分别影响什么？
- 为什么 temperature 设为 0 也不一定 100% 稳定？
- 什么是 hallucination？工程上如何降低？
- Structured output 为什么会失败？怎么兜底？
- System prompt、developer instruction、user prompt 的边界是什么？
- 如何估算一次 AI 调用的 latency 和 cost？

答题重点：

- Token 是成本、延迟和上下文容量的基本单位。
- Context window 不是无限工作记忆，越长越要做信息筛选、压缩和优先级管理。
- Sampling 参数影响稳定性和多样性，但不能替代校验、重试和结构化约束。
- 幻觉不能只靠 prompt 解决，要结合 grounding、retrieval、tool use、verification 和 human review。

## Prompt Engineering 高频题

高频题目：

- 好 prompt 的基本结构是什么？
- Role / Task / Context / Format 如何组织？
- zero-shot、few-shot 怎么选？
- Chain-of-thought 要不要显式要求？
- 如何让模型稳定输出 JSON？
- XML tag / delimiter 有什么作用？
- Prompt injection 是什么？如何防？
- prompt versioning 和 evaluation 怎么做？

答题重点：

- Prompt 不是魔法文本，而是接口设计。
- Role 定义身份，Task 定义目标，Context 提供材料，Format 限定输出。
- 结构化输出要配合 schema validation、repair、retry 和 fallback。
- 企业场景必须防 prompt injection，尤其是 RAG 文档和用户输入里的恶意指令。

## Context Engineering 高频题

高频题目：

- Prompt Engineering 和 Context Engineering 有什么区别？
- 如何决定哪些信息进入上下文？
- 上下文太长时怎么压缩？
- 多轮对话如何管理 memory？
- 如何避免旧上下文污染新任务？
- 如何做 token budget 降级？
- 系统规则、用户目标、检索材料、工具结果如何排序？

答题重点：

- Prompt Engineering 关注怎么写指令，Context Engineering 关注运行时给模型喂什么信息。
- 上下文要有优先级：系统规则 > 当前任务 > 权限过滤后的检索材料 > 历史摘要 > 可选背景。
- 长上下文要做 selection、summarization、dedupe、truncation 和 citation。
- 不要把所有历史都塞进去，记忆要可解释、可删除、可审计。

## RAG 高频题

高频题目：

- RAG 是什么？为什么需要 RAG？
- RAG 的核心优势和局限是什么？
- 文档如何切 chunk？
- embedding model 怎么选？
- 向量数据库解决什么问题？
- HNSW、IVF/IVFFLAT 这类索引大致解决什么问题？
- dense retrieval、sparse retrieval、hybrid search 怎么选？
- reranking 在哪里用？
- 如何评估 RAG 质量？
- 为什么检索到了文档，模型仍然答错？

RAG 标准链路：

- ingest：文档解析、清洗、切块、metadata、权限。
- index：embedding、向量索引、倒排索引、版本。
- retrieve：query rewrite、hybrid retrieval、metadata filter。
- rerank：cross-encoder 或 LLM rerank。
- generate：带引用生成答案。
- evaluate：faithfulness、answer relevance、retrieval recall、latency、cost。

常见坑：

- chunk 太大，召回噪音多；chunk 太小，语义不完整。
- 只做向量检索，忽略关键词、时间、权限、业务字段。
- 没有 rerank，top-k 里混入低质量上下文。
- 没有 citation 和 grounding check，用户无法信任答案。
- 没有离线评估集，优化全靠感觉。

## Vector Database 高频题

高频题目：

- 向量数据库和普通数据库有什么区别？
- embedding 维度、距离函数、索引参数如何影响效果？
- HNSW 的核心直觉是什么？
- IVF / IVFFLAT 的核心直觉是什么？
- 如何处理向量库里的权限过滤？
- 向量索引如何更新和删除？
- metadata filter 会不会影响召回性能？
- 如何做冷热数据和索引重建？

答题重点：

- 向量数据库优化的是相似度检索，不是事务真相。
- HNSW 偏图搜索，常用于高召回、低延迟近似最近邻。
- IVF/IVFFLAT 偏聚类分桶，先找候选桶再在桶内搜索。
- 企业 RAG 不能只看向量相似度，权限、版本、时间、业务过滤同样重要。

## AI Agent 高频题

高频题目：

- AI Agent 和普通 LLM 调用有什么区别？
- Agent、Workflow、传统程序三者怎么区分？
- Agent loop 通常包含哪些步骤？
- Tool calling 如何设计？
- Agent memory 应该存什么，不该存什么？
- Planning and reasoning 如何控制？
- Agent 失败如何恢复？
- 多 agent 是否一定更好？
- Agent 如何做权限控制和审计？

答题重点：

- Agent 不是“更长的 prompt”，而是 model + loop + tools + state + policy。
- Workflow 适合确定流程，Agent 适合开放目标和动态决策。
- 工具调用要定义 schema、权限、timeout、retry、error handling、audit log。
- Agent 必须有 stop condition、budget limit 和 fallback，否则容易 runaway。

## MCP and Tool Protocols 高频题

高频题目：

- MCP 解决什么问题？
- 为什么有人把 MCP 类比成 AI 工具生态的统一接口？
- MCP server 应该暴露哪些能力？
- 工具 schema 如何设计？
- MCP 和 function calling 有什么区别？
- 生产环境 MCP server 要考虑什么？
- 如何做权限、审计和租户隔离？

答题重点：

- MCP 的价值是统一模型/客户端与外部工具、数据源之间的连接方式。
- Function calling 偏单次模型调用里的工具描述；MCP 更像工具和上下文能力的协议化暴露。
- 生产级 MCP server 要考虑 auth、rate limit、input validation、least privilege、logging、timeout、versioning。

## Harness Engineering 高频题

高频题目：

- 为什么说决定 Agent 上限的不只是模型，而是 harness？
- Harness 包含哪些层？
- 如何管理上下文窗口？
- 如何做工具编排？
- 如何处理模型输出不稳定？
- 如何设计 AI 应用的 fallback？
- 如何观测 AI 应用质量？

答题重点：

- Harness 是模型外面的工程系统：context builder、tool router、policy guard、memory manager、evaluator、observability。
- 好 harness 会控制 token budget、工具权限、重试、结构化校验、降级、审计。
- 线上 AI 应用必须有 tracing：prompt、retrieved chunks、tool calls、model response、latency、cost、user feedback。

## AI 应用系统设计题

### 题型 1：企业知识库问答

核心链路：

- 文档上传 -> 解析 -> chunk -> embedding -> index。
- 用户问题 -> query rewrite -> retrieval -> rerank -> generation -> citation。
- feedback -> eval dataset -> prompt/retrieval/index 调优。

API：

- `POST /documents`
- `POST /chat`
- `GET /answers/{id}`
- `POST /feedback`

Database / storage：

- object store：原文档。
- relational/document DB：document metadata、permissions、versions。
- vector DB：chunk embeddings。
- search engine：keyword / hybrid search。
- evaluation store：golden questions、answers、feedback。

核心 data structure：

- chunk list with metadata
- vector index
- inverted index
- permission filter
- conversation state
- citation map

### 题型 2：Agent 自动化助手

核心链路：

- user goal -> plan -> tool selection -> tool execution -> observation -> next step -> final answer。

API：

- `POST /agents/runs`
- `GET /agents/runs/{id}`
- `POST /tools/{name}/execute`
- `POST /runs/{id}/cancel`

Database / storage：

- `agent_runs(id, user_id, goal, status, budget, created_at)`
- `agent_steps(run_id, step_no, thought_summary, tool_name, tool_input, tool_output, status)`
- `tool_permissions(user_id, tool_name, scope)`
- `audit_logs(run_id, actor, action, payload, created_at)`

核心 data structure：

- run state machine
- tool registry
- context window buffer
- memory store
- priority queue for async runs
- policy rules

### 题型 3：AI 编程助手

核心链路：

- repo context -> task decomposition -> code edit -> test -> review -> patch。

面试重点：

- 如何选上下文文件。
- 如何避免改错文件。
- 如何运行测试验证。
- 如何处理大仓库 token budget。
- 如何防止 secrets 泄漏。
- 如何让人类保持最终控制权。

## 质量评估和上线指标

AI 应用不能只看“能回答”。至少要看：

- answer relevance
- faithfulness / groundedness
- retrieval recall
- citation correctness
- tool success rate
- hallucination rate
- latency p95 / p99
- cost per request
- human escalation rate
- user feedback score

上线策略：

- 先做 offline eval。
- 再做 shadow traffic。
- 再小流量灰度。
- 高风险场景加 human-in-the-loop。
- 记录 prompt/version/model/index 版本，方便回滚。

## 安全高频题

- Prompt injection 怎么防？
- RAG 文档里的恶意指令怎么办？
- 用户能不能越权检索到别人的文档？
- Tool calling 如何防止危险操作？
- 如何避免把 secret 放进 prompt？
- AI 输出如何做合规过滤？
- 审计日志应该记录什么？

答题重点：

- 输入不可信，检索文档也不可信。
- 权限过滤必须发生在 retrieval 前和 generation 前。
- 工具调用要 least privilege、human approval、dry run、audit log。
- 高风险动作不能只靠模型判断。

## 面试回答模板

回答 AI 应用开发题，可以按这个顺序：

- 先定义用户场景和成功指标。
- 再说明是 RAG、Agent、Workflow，还是普通 LLM 调用。
- 再画 online path 和 offline/indexing path。
- 再讲 context、prompt、retrieval、tools、memory。
- 再讲安全、权限、评估和观测。
- 最后讲成本、延迟和 fallback。

一句话版本：

AI 应用不是模型 API 的薄封装，而是一个带数据链路、上下文工程、工具协议、权限控制、评估系统和观测闭环的后端系统。

## 相关

- [[LLM]]
- [[Prompt Engineering]]
- [[Context Window]]
- [[RAG]]
- [[Vector Database]]
- [[AI Agent]]
- [[Tool Use]]
- [[Agent Architecture]]
- [[API Integration]]
- [[GenAI System Architecture]]

## 参考

- [JavaGuide AI 应用开发面试指南](https://javaguide.cn/ai/)
- [JavaGuide GitHub Repository](https://github.com/snailclimb/JavaGuide)
