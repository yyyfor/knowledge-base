---
title: RAG
tags: ["genai", "machine-learning"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# RAG

RAG 是 Retrieval Augmented Generation，先检索外部知识，再让模型生成答案。

详细解释：

RAG 几乎是整个考试最重要的技术概念之一。它适合需要最新数据、企业私有知识或更低 hallucination 风险的场景，因此在企业知识问答题里通常是首选答案。

典型流程：

User question  
↓  
[[Embeddings]]  
↓  
[[Vector Database]] search  
↓  
Retrieve documents  
↓  
LLM generate answer

优点：

- reduces hallucination
- uses current or enterprise data
- avoids full fine-tuning in many cases

相关：

- [[Embeddings]]
- [[Vector Database]]
- [[Semantic Search]]
- [[Grounding]]

从哪里继续看：

- 高频做题路径：[[Embeddings]] -> [[Vector Database]] -> [[Semantic Search]]
- 企业问答场景再看 [[Enterprise Knowledge Assistant]]

