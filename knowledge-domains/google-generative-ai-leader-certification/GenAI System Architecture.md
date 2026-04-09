---
title: GenAI System Architecture
tags: ["genai", "machine-learning"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# GenAI System Architecture

GenAI 系统架构是考试里的综合高频题。

典型架构：

User  
↓  
Application layer  
↓  
Prompt  
↓  
LLM  
↓  
Retrieval  
↓  
Enterprise data

核心组件：

- Prompt
- LLM
- Embedding model
- [[Vector Database]]
- Agent tools

详细解释：

题目通常会考“企业知识问答系统的关键组件是什么”或“哪个组件负责检索语义相近内容”。做题时要先识别是单纯生成、检索增强还是 agent workflow。

相关：

- [[RAG]]
- [[Embeddings]]
- [[AI Agent]]
- [[Enterprise Knowledge Assistant]]

从哪里继续看：

- 继续看 [[Scenario Question Patterns]]
- 然后做 [[Mock Exam Questions]]

