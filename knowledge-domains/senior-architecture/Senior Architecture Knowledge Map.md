---
title: Senior Architecture Knowledge Map
tags: ["architecture", "senior", "system-design", "knowledge-base"]
difficulty: advanced
estimated_time: 20 min
last_reviewed: 2026-04-30
---

# Senior Architecture Knowledge Map

这个目录是整个知识库的 senior layer：不再只记概念，而是训练如何从业务目标、系统边界、数据流、风险控制、成本、治理和面试表达角度设计方案。

## Core Frameworks

- [[Senior Architecture Decision Framework]]
- [[Cross-Domain System Flow Patterns]]
- [[Domain Architecture Playbooks]]
- [[Senior Architecture Interview Question Bank]]

## How to Use

学习任何主题时，都按同一套 senior 问法复盘：

- 这个系统服务的业务目标是什么？
- 哪个数据是 source of truth，哪些是 derived views？
- 主链路和异步链路如何拆？
- 一致性、延迟、成本、可用性、审计之间怎么取舍？
- 最容易失败的地方在哪里？
- 如果规模扩大 10 倍，瓶颈会先出现在哪里？
- 如果我是 senior owner，我会怎么分阶段演进？

## Cross-Domain Entry Points

- 金融系统：[[Investment Banking Knowledge Map]]、[[HSBC Risk System Interview Knowledge Base]]
- 系统设计：[[System Design Knowledge Map]]、[[Design a Risk Calculation Platform]]
- GenAI：[[Google Generative AI Leader Certification Knowledge Map]]、[[GenAI System Architecture]]
- 量化程序员：[[Quant Programmer Roadmap]]、[[Backtesting and Research Workflow]]
- 投资与资产配置：[[Investing and Asset Allocation Knowledge Map]]、[[Asset Allocation]]
- 面试准备：[[Interview Prep Knowledge Map]]、[[System Design Project Storytelling Template]]

## Senior Answer Shape

一个 senior 级回答应该包含：

- business context：为什么要做这个系统。
- architecture boundary：哪些系统负责什么，哪些不负责。
- data flow：数据从源头到结果如何流转。
- control flow：任务、状态、审批、发布如何推进。
- failure mode：系统最可能在哪里失败。
- trade-off：为什么选择当前方案，而不是替代方案。
- evolution：MVP、scale-up、governance 三个阶段怎么演进。
- metrics：如何证明系统运行得好。

## 相关

- [[Senior Architecture Decision Framework]]
- [[Cross-Domain System Flow Patterns]]
- [[Domain Architecture Playbooks]]
- [[Senior Architecture Interview Question Bank]]
