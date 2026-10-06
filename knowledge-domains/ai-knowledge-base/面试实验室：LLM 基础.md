---
title: 面试实验室：LLM 基础
tags: ["ai", "rag", "agent", "engineering"]
difficulty: intermediate
estimated_time: 20 min
last_reviewed: 2026-10-06
source_complete: true
---

# 面试实验室：LLM 基础

本章收录面试实验室的完整问答，保留题号与英文问题。实现细节来自独立的学习示例项目，不代表现有小程序已部署这些功能，也不代表读者已有相关经历；面试回答应替换为自己的真实实践。

## A1 · LLM 是如何生成文本的？

英文问题：How does an LLM generate text?

它是一个被训练来预测下一个 token 的 transformer。推理时以自回归方式运行：对整个词表预测一个概率分布，采样一个 token，把它接到末尾，再重复。Attention 让每个 token 参考上下文中所有之前的 token。模型并不“查询事实”，知识被压缩在权重里，所以它可能自信地出错，这也是我们用检索来给它提供依据（grounding）的原因。

## A2 · 什么是 token？Agent 工程师为什么要关心它？

英文问题：What is a token and why should an agent engineer care?

Token（词元）是模型的编码单位，可能是词的一部分、汉字、标点或代码片段。文本占用量取决于实际 tokenizer，不能用固定的中英文比例准确计费。Agent 多步调用会重复携带历史，因此每步应估算输入与输出预算，最终以模型服务报告的用量结算，并在超过预算时停止。

## A3 · Temperature 和 top-p：Agent 应该怎么设？

英文问题：Temperature and top-p: what do you set for an agent?

它们控制采样的随机性。工具选择和参数生成示例开发者用低 temperature，因为需要一致性。但 temperature 0 也不保证完全确定：批处理和浮点误差仍会带来差异。所以我按“结果不确定”来设计：做校验、对无效输出重试，并且评估时多次运行。

## A4 · LLM 为什么会幻觉？如何减少？

英文问题：Why do LLMs hallucinate, and how do you reduce it?

模型被训练成生成“看起来合理”的续写，而不是经过验证的事实。缺少知识时，它仍会输出流畅的文本。缓解方法：用检索提供依据并要求引用；用 schema 约束输出；允许它说“我不知道”（示例项目的 RAG 服务在没有命中时不调用模型）；用来源核对论断（引用检查）；把模型不擅长的事交给工具，比如算术，这就是 calculate 存在的原因。

不要说： “更好的 prompt 就能解决幻觉。”

## A5 · Prompt、RAG 和微调：各在什么时候用？

英文问题：Prompting vs RAG vs fine-tuning: when to use each?

Prompt 改变行为，便宜且立即生效。RAG 添加知识：私有的、需要新鲜的、需要引用的，并且访问控制仍然可以执行。微调改变行为或格式的一致性，比如风格、领域特定的输出格式，或让小而便宜的模型模仿大模型；它不适合注入会变化的事实。常见顺序：prompt → RAG → 只有评估显示前两者解决不了的差距时才微调。

## A6 · 什么是结构化输出？为什么还要再校验？

英文问题：What is structured output, and why validate anyway?

结构化输出约束解码，使输出符合某个 JSON Schema。示例项目的 runtime 把动作 schema 传给 Ollama。它只保证形状，不保证含义：参数仍可能错误、不安全或引用不存在的东西。所以我再用严格的 Pydantic 模型校验（extra="forbid"、长度和范围限制），并在服务端检查业务规则。

## A7 · 什么是推理模型？Agent 里什么时候用？

英文问题：What are reasoning models, and when would you use one in an agent?

推理模型在回答前花额外的 token 思考。它们更擅长多步规划、数学和代码，但更慢更贵。在 Agent 中，我会把它用在规划器或困难决策上；路由、抽取和简单工具调用交给更便宜更快的模型，也就是模型分层。

## A8 · 什么是 embedding？它是怎么训练出来的？

英文问题：What are embeddings and how are they trained?

Embedding 把文本映射到固定维度的向量，常用对比学习使相关问题与段落靠近。查询和文档应使用兼容的编码空间与版本；双编码器可以有不同的查询和文档编码器，但必须是匹配训练或明确兼容的一对。更换模型后需要重建对应索引并评估，不能混用同维度但不同语义空间的向量。

## A9 · Prompt caching 和 KV cache 是什么？为什么对 Agent 很重要？

英文问题：What are prompt caching and the KV cache, and why do they matter for agents?

生成过程中，模型会缓存已处理 token 的 attention key 和 value（KV cache）。很多厂商还会跨请求缓存重复的 prompt 前缀：更便宜，首 token 更快。Agent 每一步都重发相同的系统提示、工具定义和历史，所以保持前缀稳定（不要把时间戳放在最前面）能实实在在地节省成本和延迟。
