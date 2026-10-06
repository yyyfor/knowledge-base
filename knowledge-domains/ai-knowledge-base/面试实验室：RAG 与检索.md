---
title: 面试实验室：RAG 与检索
tags: ["ai", "rag", "agent", "engineering"]
difficulty: intermediate
estimated_time: 20 min
last_reviewed: 2026-10-06
source_complete: true
---

# 面试实验室：RAG 与检索

本章收录面试实验室的完整问答，保留题号与英文问题。实现细节来自独立的学习示例项目，不代表现有小程序已部署这些功能，也不代表读者已有相关经历；面试回答应替换为自己的真实实践。

## B1 · 讲讲你的 RAG 流水线。

英文问题：Walk me through your RAG pipeline

入库：原文保存与版本 → 版面解析 → 结构分块 → 关键词与向量双索引。查询：认证授权 → 各路权限过滤召回 → RRF 融合 → 可选重排 → 权威库核验版本与权限 → 上下文组装 → 带来源的生成 → 引用验证。说明每一层的设计依据，例如按章节切分避免条款失去上下文；重排失败可退回融合顺序，但授权失败不能降级为不检查权限。

## B2 · 为什么要混合检索？

英文问题：Why hybrid search?

BM25 和向量检索的失败方式不同。BM25 能精确命中“Contract C-101”或错误码这类标识符，但对改写说法无能为力。向量检索能匹配语义（“vacation”≈“annual leave”），但会模糊精确的 token 和数字。两者融合在真实的企业查询上更稳健。在示例项目的测试中，单独一种检索都会漏掉另一种能找到的情况。

## B3 · 用数字解释 RRF。

英文问题：Explain RRF with numbers

得分是各检索器 1/(k + rank) 之和，k = 60。文档 A 在 BM25 排第 1、向量排第 3：1/61 + 1/63 ≈ 0.0323。文档 B 只在 BM25 排第 2：1/62 ≈ 0.0161。A 胜出，因为两个检索器都认可它。RRF 只用排名，所以不需要分数归一化；k 削弱了头部位置的影响，使一个“很自信”的检索器无法压倒多个检索器的共识。

## B4 · 为什么需要 reranker？Bi-encoder 和 cross-encoder 的区别？

英文问题：Why a reranker, and bi-encoder vs cross-encoder?

第一阶段检索追求召回，而且必须在上百万个片段上足够快；bi-encoder 可以预先计算文档向量。Cross-encoder 或 LLM reranker 把查询和段落放在一起读，更准但太慢，无法覆盖全部语料。所以只对前 20–100 个候选做 rerank。示例项目的是对融合结果做逐点打分的 LLM reranker，也可选 cross-encoder。

## B5 · Chunk 大小怎么选？

英文问题：How do you pick a chunk size?

没有通用答案：它是精确度与上下文完整性之间的权衡，要用 golden set 测出来。优先按结构（章节、段落）切分，而不是固定长度，并使用适度的重叠。示例开发者实现了递归切分（段落 → 行 → 句子 → 词）和语义切分（相邻句子的 embedding 差异变大时切开）。

## B6 · 如何评估 RAG？

英文问题：How do you evaluate RAG?

分层评估。检索：用期望来源计算 Recall@K、MRR、NDCG。生成：忠实度、答案相关性和正确性。引用：被引用的片段是否存在、匹配并支持该论断？示例项目的评估服务保存每次运行，并在与相同数据集、K 和 judge 的基线相比指标下降时拒绝通过。真实例子：检索得分 1.0 而引用准确率只有 0.5，一个笼统的“质量”分数会掩盖这个问题。

## B7 · 答案错了，怎么排查？

英文问题：The answer is wrong. How do you debug it?

先定位是哪个阶段出错，再去动 prompt。文档被解析了吗？分块合理吗？已索引且是最新的吗？进入前 K 了吗？被 ACL 或治理过滤掉了？排名太低？没放进上下文？还是检索正确但模型用错了？用 golden set 回放，找出退化的阶段。

## B8 · 有了百万 token 的上下文窗口，RAG 过时了吗？

英文问题：With million-token context windows, is RAG dead?

没有。RAG 在成本和延迟（不必每个问题都付百万 token 的钱）、新鲜度、访问控制（已经放进 prompt 的内容无法再过滤）、引用以及超过任何上下文窗口的规模上仍然占优。模型对超长上下文中间部分的利用也不可靠（“lost in the middle”）。长上下文是 RAG 的补充：检索得更宽松，给模型更大的段落。

## B9 · 什么是 Agentic RAG？

英文问题：What is agentic RAG?

检索变成 Agent 可以反复调用的工具：搜索、阅读、改进查询、再搜索，然后回答。它更适合多跳和模糊的问题，但步骤更多、延迟更高、更难评估。示例项目的 search_knowledge 工具就是这个构件，它复用与普通 RAG 相同的、带 ACL 的混合检索路径。
