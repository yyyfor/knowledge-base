# Design a Search System

搜索系统考察的不是“会不会用 Elasticsearch”，而是你能不能把 indexing、retrieval、ranking、freshness 和 latency 这几条链路讲成一个完整系统。最稳的答法，是先明确你做的是通用文档搜索、站内商品搜索还是垂类检索，然后再把系统拆成 ingest、index、query、ranking 和 serving 五段。

面试里不要一上来就说搜索引擎内部实现细节。更重要的是先收敛 scope：支持 keyword search、基础过滤和排序、相关性排名、高亮和分页；先不做复杂个性化、广告混排和多模态召回。这样你能把核心链路讲扎实，再根据时间讨论更高级能力。

核心关注：

- indexing pipeline 需要说明数据源怎么进入系统、如何做解析、分词、倒排索引构建、增量更新和删除传播。
- ranking 不能只说 BM25，要讲召回和排序分层，以及业务排序、质量分、个性化特征怎样进入主链路。
- query latency 通常需要多级缓存、并行 shard 查询、top-k merge 和超时降级策略。
- freshness 是搜索系统的关键 trade-off，需要明确近实时索引、批量重建和 query-time 补偿之间怎么平衡。
- shard strategy 需要结合数据规模、写入速度、热点分布和扩缩容成本，而不是空泛地说“按 hash 分片”。

适用场景：

- 适用于站内文档搜索、电商搜索、日志搜索、企业知识检索和任何以检索质量加低延迟为核心目标的系统。
- 也适用于面试里需要区分“静态召回”和“动态补充”的场景，例如商品、内容和本地生活搜索。

常见误区：

- 常见误区是只讲倒排索引和分词，却没有解释 query path、缓存、排序延迟和结果新鲜度。
- 另一个误区是把所有字段都当成强实时更新目标，结果写入链路复杂度和成本远超业务需要。

面试回答方式：

- 开场先说我会先区分 ingest path 和 query path，因为搜索系统通常是典型的读写分离架构。
- 高层架构可以拆成 Data Ingestion、Document Processing、Index Builder、Search Serving、Ranking Service、Cache 和 Metrics Pipeline。
- 深挖时优先讲索引更新、查询扇出、相关性排序和 freshness trade-off，说明哪些数据可以近实时，哪些可以最终一致。
- 收尾时补 shard rebalance、热点 query、降级策略、离线评估和线上指标。

相关：

- [[Database Choices]]
- [[Data Partitioning and Sharding]]
- [[Caching]]
