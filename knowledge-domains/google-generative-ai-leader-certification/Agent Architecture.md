---
title: Agent Architecture
tags: ["genai", "machine-learning"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Agent Architecture

Agent Architecture 是对 AI agent 工作流程的结构化描述。

典型流程：

User request  
↓  
Agent  
↓  
Planning  
↓  
Tool calling  
↓  
LLM reasoning  
↓  
Result

详细解释：

考试高频会问 agent workflow 或自动执行任务最适合什么架构。关键判断是：如果系统不仅要回答问题，还要调用工具、访问数据库或执行任务，那么 agent architecture 比单纯 prompt + LLM 更匹配。

相关：

- [[AI Agent]]
- [[Tool Use]]
- [[Planning and Reasoning]]
- [[API Integration]]

从哪里继续看：

- 场景题继续看 [[Scenario Question Patterns]]
- 产品题继续看 [[Google AI Studio]] 和 [[Vertex AI Studio]]

