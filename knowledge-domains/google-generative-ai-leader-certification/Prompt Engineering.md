---
title: Prompt Engineering
tags: ["genai", "machine-learning"]
difficulty: intermediate
estimated_time: 1 min
last_reviewed: 2026-04-09
---

# Prompt Engineering

Prompt Engineering 是通过设计提示词来引导模型输出。

详细解释：

这是高频概念题。考试要求理解 prompt engineering 的目标不是“写得越长越好”，而是更稳定地约束任务、格式、角色和上下文，以提高准确性、减少 hallucination，并控制输出风格。

目标：

- improve accuracy
- reduce hallucination
- control output format

常见方法：

- zero-shot
- one-shot
- few-shot
- chain-of-thought
- prompt chaining

官方补充里常与 prompt 一起出现的参数控制：

- temperature
- top-k
- top-p

这些通常不考具体数值，但会考“为什么输出会更随机或更稳定”。

相关：

- [[Hallucination]]
- [[RAG]]
- [[Grounding]]
- [[Sampling Parameters]]

从哪里继续看：

- 高频联动题先看 [[Hallucination]] 和 [[Scenario Question Patterns]]
- 若题目涉及 agent，再看 [[AI Agent]] 和 [[Tool Use]]
