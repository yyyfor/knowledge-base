# Knowledge Cutoff

Knowledge Cutoff 指模型训练数据所覆盖时间范围的边界。

详细解释：

这是解释“为什么模型不知道最新信息”的关键概念。考试常把它和 [[Hallucination]]、[[RAG]] 放在一起考。正确理解是：模型不知道最新信息，不一定是模型坏了，而是训练知识范围有限，因此要通过 retrieval 或 grounding 补充最新数据。

相关：

- [[LLM]]
- [[RAG]]
- [[Grounding]]

从哪里继续看：

- 若题目强调“最新数据”，先回到 [[RAG]]
- 若题目强调风险控制，再看 [[Hallucination]]

