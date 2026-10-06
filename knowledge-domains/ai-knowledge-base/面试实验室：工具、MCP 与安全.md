---
title: 面试实验室：工具、MCP 与安全
tags: ["ai", "rag", "agent", "engineering"]
difficulty: intermediate
estimated_time: 20 min
last_reviewed: 2026-10-06
source_complete: true
---

# 面试实验室：工具、MCP 与安全

本章收录面试实验室的完整问答，保留题号与英文问题。实现细节来自独立的学习示例项目，不代表现有小程序已部署这些功能，也不代表读者已有相关经历；面试回答应替换为自己的真实实践。

## D1 · MCP 是什么？它不解决什么？

英文问题：What is MCP, and what does it *not* solve?

Model Context Protocol 是一个开放标准（Anthropic 于 2024 年底推出），用于把 AI 应用（host/client）连接到暴露工具、资源和提示模板的 server，传输方式为 stdio 或 HTTP。它解决的是集成与发现：写一次工具 server，任何 MCP 客户端都能用。它不解决：工具是否可信、终端用户授权、数据隔离、审批或幂等，这些仍是平台的责任。恶意或被攻破的 MCP server 是真实的供应链和提示注入风险，所以要对连接的 server 做白名单。

## D2 · MCP 与 function calling 的区别？

英文问题：MCP vs function calling?

Function calling 是模型 API 的机制，让模型请求调用某个工具。MCP 是应用发现并连接工具的方式，应用再通过 function calling 把工具提供给模型。两者在不同层次，互为补充。

## D3 · 什么是提示注入？如何防御？

英文问题：What is prompt injection, and how do you defend against it?

*直接*注入：用户试图覆盖指令。*间接*注入：恶意指令藏在 Agent 读取的内容里，比如文档、网页、邮件、工具输出。它是 Agent 最大的安全风险，因为模型无法可靠地区分数据和指令。防御是分层的，没有单一解法：把检索内容当作不可信数据（示例项目的 prompt 明确这样写）；最小权限工具和白名单；服务端校验参数；高风险动作要求人工审批；在检索前执行 ACL，让可偷的东西更少；监控外发数据；用对抗性文档测试。示例项目的审批闸门意味着即使被注入了“创建 follow-up”，没有人批准也写不进去。

## D4 · 什么是“致命三要素”（lethal trifecta）？

英文问题：What is the "lethal trifecta"?

Simon Willison 提出的说法：一个 Agent 同时具备 (1) 访问私有数据，(2) 接触不可信内容，(3) 对外通信的途径。攻击者就可以指使它把数据外泄。解决办法是在一次 run 中至少去掉其中一条，或在对外通道上加人工或策略闸门。示例项目的 Agent 没有对外发送的工具，这是有意为之。

## D5 · Guardrail 与授权的区别？

英文问题：Guardrail vs authorization?

Guardrail 检查内容或行为：输出是否安全、符合策略、格式正确？授权检查身份和权限：这个用户能否对这个资源做这个动作？两者都必须在服务端执行。在示例项目的代码里，Pydantic 校验和 AST 计算器是 guardrail；require_role("admin","approver") 以及 get() 中的租户/所有者检查是授权。

## D6 · 你的 Agent 如何安全地访问知识？

英文问题：How does your agent access knowledge safely?

只通过与普通 RAG 相同的、带 ACL 的混合检索，并使用调用者的身份（principal context var）。它从不直接查询 Qdrant 或 Elasticsearch。run 只对同租户同用户可见，审批需要 approver 角色。平台边界见题库 #106、#110。

## D7 · 如何安全地运行模型生成的代码？

英文问题：How do you run model-generated code safely?

不要 eval。需求很窄时，用白名单解释器，比如示例项目的 AST 计算器。通用代码用沙箱：容器或 microVM，默认无网络，限制 CPU、内存和时间，除临时目录外文件系统只读，没有密钥，并限制输出大小。

## D8 · MCP 与 A2A 的区别？

英文问题：MCP vs A2A?

MCP 把 Agent 连接到工具和数据。A2A（Agent2Agent，Google 于 2025 年推出）让 Agent 跨厂商发现并委派任务给其他 Agent。两者可以同时使用：组织之间的 Agent 用 A2A，各自内部用 MCP 连接工具。
