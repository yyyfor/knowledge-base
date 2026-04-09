---
title: Glossary
tags: [glossary, reference]
difficulty: beginner
estimated_time: 1 hour
last_reviewed: 2026-04-09
---

# Glossary

A comprehensive glossary of technical terms, concepts, and terminology used across the knowledge base.

## System Design Terms

### A-C
**API Gateway**: 统一入口点，处理路由、认证、限流和监控。 [[API Gateway and Service Boundaries]]

**Availability**: 系统可访问和可操作的程度，通常用正常运行时间的百分比衡量（如 99.9%）。 [[Availability and Reliability]]

**Backpressure**: 在系统中控制数据流速率的机制，防止生产者压垮消费者。 [[Rate Limiting]]

**Cache Hit**: 请求的数据在缓存中找到。 [[Caching]]

**Cache Miss**: 请求的数据不在缓存中，需要从底层存储获取。 [[Caching]]

**CAP Theorem**: 分布式系统最多只能同时满足一致性（Consistency）、可用性（Availability）和分区容错性（Partition Tolerance）中的两个特性。 [[Consistency and CAP]]

**Consistency**: 所有节点在同一时间看到相同的数据。 [[Consistency and CAP]]

**Connection Pool**: 重用数据库连接以减少建立连接的开销。 [[Load Balancing]]

### D-L
**Database Sharding**: 将大型数据库分成更小、更易管理的部分，称为分片。 [[Data Partitioning and Sharding]]

**Denormalization**: 为了提高读取性能而故意引入数据冗余。 [[Database Choices]]

**Eventual Consistency**: 系统最终将达到一致状态，但不能保证何时达到。 [[Consistency and CAP]]

**Fan-out**: 将一个消息分发给多个接收者的过程。 [[Queues and Asynchronous Processing]]

**Graceful Degradation**: 在系统负载过高或部分组件失败时，降低性能而非完全停止服务。 [[Graceful Degradation and Load Shedding]]

**Hot Key**: 被频繁访问的键，可能导致负载不均。 [[Hot Key Overload]]

**Horizontal Scaling**: 通过添加更多机器实例来扩展系统。 [[Scalability]]

**Latency**: 完成操作所需的时间，通常以毫秒为单位。 [[Latency and Throughput]]

**Leader Election**: 在分布式系统中选择一个主节点负责协调工作。 [[Replication and Fault Tolerance]]

**Load Balancer**: 在多个服务器之间分配网络流量的设备或服务。 [[Load Balancing]]

### M-R
**Master-Slave Replication**: 一个主节点处理写操作，多个从节点处理读操作。 [[Replication and Fault Tolerance]]

**Materialized View**: 预先计算并存储的查询结果，用于提高复杂查询的性能。 [[Database Choices]]

**Multi-level Caching**: 在不同层次使用多个缓存（如浏览器缓存、CDN 缓存、应用缓存）。 [[Multi-Level Caching Strategies]]

**Observability**: 系统可被监控、理解和调试的程度，包括日志、指标和追踪。 [[Observability in System Design]]

**Partition Tolerance**: 系统在网络分区（消息丢失或失败）时继续运行的能力。 [[Consistency and CAP]]

**Primary Key**: 数据库表中唯一标识每条记录的列或列组合。 [[Database Choices]]

**Queue**: 一种先进先出（FIFO）的数据结构，用于异步处理消息。 [[Queues and Asynchronous Processing]]

**Rate Limiting**: 控制用户或应用程序在特定时间内可以发出的请求数量。 [[Rate Limiting]]

**Read Replicas**: 数据库的只读副本，用于处理读取操作并减轻主数据库的负载。 [[Replication and Fault Tolerance]]

**Redundancy**: 在系统中包含额外的组件或功能，以提高可靠性。 [[Availability and Reliability]]

**Replication**: 在多个服务器或位置复制数据的过程。 [[Replication and Fault Tolerance]]

### S-Z
**Scalability**: 系统处理增长的工作量的能力。 [[Scalability]]

**Secondary Index**: 除主键之外的索引，用于加速基于非主键列的查询。 [[Database Choices]]

**Sharding**: 将数据库水平分割成更小、更易管理的部分。 [[Data Partitioning and Sharding]]

**Strong Consistency**: 系统保证所有读取操作都返回最近的写入操作的结果。 [[Consistency and CAP]]

**Throughput**: 系统在给定时间内可以处理的请求数量。 [[Latency and Throughput]]

**Time-to-live (TTL)**: 缓存项在被移除之前在缓存中保留的时间。 [[Caching]]

**Vertical Scaling**: 通过增加单个机器的资源来扩展系统。 [[Scalability]]

**Write-through Cache**: 写入操作同时更新缓存和后端存储的策略。 [[Caching]]

## Coding Interview Terms

### A-D
**Backtracking**: 通过探索所有可能的候选解来找出所有解的算法，当发现候选解不能导致有效解时回溯。 [[Backtracking]]

**Big O Notation**: 描述算法性能或复杂度随输入大小增长而变化的数学表示法。 [[Complexity Analysis]]

**Binary Search**: 在已排序数组中查找目标值的高效算法，每次将搜索范围减半。 [[Binary Search]]

**Breadth-First Search (BFS)**: 从根节点开始，逐层遍历图或树的算法。 [[Tree and Graph Traversal]]

**Brute Force**: 通过尝试所有可能的解决方案来解决问题的方法。 [[Brute Force and Optimization]]

**Depth-First Search (DFS)**: 沿着树的深度遍历尽可能深的分支的算法。 [[Tree and Graph Traversal]]

**Dynamic Programming**: 通过将复杂问题分解为更简单的子问题来解决问题的技术。 [[Dynamic Programming]]

### E-M
**Edge Cases**: 极端或特殊情况，可能未被常规测试覆盖，导致问题。 [[Edge Cases in Coding Interviews]]

**Frequency Map**: 用于跟踪元素出现次数的数据结构，通常是哈希表。 [[Hashing and Frequency Maps]]

**Greedy Algorithm**: 在每一步选择局部最优解，希望找到全局最优解的算法。 [[Greedy]]

**Hash Table**: 使用哈希函数将键映射到值的数据结构，提供快速插入、删除和查找。 [[Hashing and Frequency Maps]]

**Heap**: 满足堆属性的专门基于树的数据结构，常用于实现优先队列。 [[Heap and Priority Queue]]

**Interval Problem**: 涉及处理数值范围或时间段的问题，如合并重叠区间。 [[Interval Problems]]

**Memoization**: 通过存储昂贵函数调用的结果来加速计算机程序的技术。 [[Dynamic Programming]]

**Monotonic Stack**: 保持元素单调递增或递减顺序的栈。 [[Monotonic Stack]]

### N-S
**Permutation**: 对一组项目进行重新排列的所有可能方式。 [[Permutations and Backtracking]]

**Priority Queue**: 每个元素都有优先级的抽象数据类型，高优先级元素先被处理。 [[Heap and Priority Queue]]

**Recursion**: 通过让函数调用自身来解决问题的方法。 [[Backtracking]]

**Sliding Window**: 一种处理数组/字符串子数组的技巧，通过维护一个可变大小的窗口。 [[Array and String Patterns]]

**Space Complexity**: 算法运行所需内存空间随输入大小增长的度量。 [[Complexity Analysis]]

**Time Complexity**: 算法运行时间随输入大小增长的度量。 [[Complexity Analysis]]

**Top K Problems**: 需要找到前 K 个最大或最小元素的问题。 [[Top K Problems]]

**Trie**: 也称为前缀树，用于存储字符串的树形数据结构。 [[Trie]]

**Two Pointers**: 使用两个指针同时遍历数组或列表的技巧。 [[Two Sum Pattern]]

### T-Z
**Union Find**: 一种维护不相交集合的数据结构，支持高效的合并和查找操作。 [[Union Find]]

## Quant Finance Terms

### A-C
**Algorithmic Trading**: 使用计算机程序自动执行交易策略。 [[Quant Trading Foundations from Prediction Markets]]

**Alpha**: 投资策略相对于基准的超额收益。 [[Stochastic Processes for Finance]]

**Arbitrage**: 同时在不同市场买卖资产以利用价格差异获利。 [[Market Microstructure]]

**Asset Allocation**: 在不同资产类别之间分配投资资金。 [[Asset Allocation]]

**At-the-money (ATM)**: 期权执行价格等于标的资产当前市场价格的期权。 [[Derivatives for Quant Developers]]

**Autoregressive (AR) Model**: 一种统计模型，其中当前值基于过去的值。 [[Time Series and Data Engineering]]

**Backtesting**: 在历史数据上测试交易策略以评估其表现。 [[Backtesting and Research Workflow]]

**Beta**: 衡量资产相对于整个市场的波动性。 [[Stochastic Processes for Finance]]

**Black-Scholes Model**: 用于定价欧式期权数学模型。 [[Derivatives for Quant Developers]]

**Brownian Motion**: 描述随机运动的数学模型，广泛用于金融领域。 [[Stochastic Processes for Finance]]

**Calculus**: 研究变化率的数学分支，对金融建模至关重要。 [[Calculus and Optimization]]

**Call Option**: 给予持有者在特定日期前以特定价格购买资产权利的期权。 [[Derivatives for Quant Developers]]

### C-L
**Capital Asset Pricing Model (CAPM)**: 描述预期回报与风险之间关系的模型。 [[Stochastic Processes for Finance]]

**Cointegration**: 描述多个非平稳时间序列之间长期均衡关系的统计特性。 [[Time Series and Data Engineering]]

**Correlation**: 衡量两个变量如何一起变化的统计度量。 [[Probability and Statistics for Quants]]

**Covariance**: 衡量两个变量如何一起变化的统计度量。 [[Probability and Statistics for Quants]]

**Delta**: 期权价格对标的资产价格变化的敏感度。 [[Derivatives for Quant Developers]]

**Derivative**: 其价值取决于标的资产的金融合约。 [[Derivatives for Quant Developers]]

**Drawdown**: 从峰值到谷值的投资价值下降。 [[Drawdowns and Sequence Risk]]

**Efficient Market Hypothesis (EMH)**: 认为资产价格反映所有可用信息的理论。 [[Market Microstructure]]

**Expected Value**: 随机变量的长期平均值。 [[Probability and Statistics for Quants]]

**Gamma**: 期权的 delta 对标的资产价格变化的敏感度。 [[Derivatives for Quant Developers]]

**Greeks**: 用于衡量期权风险的各种指标（delta、gamma、theta、vega）。 [[Derivatives for Quant Developers]]

**High-Frequency Trading (HFT)**: 利用高速算法和数据分析在极短时间内执行大量交易。 [[Low-Latency and Performance Engineering]]

**Implied Volatility**: 市场对未来波动性的预期，从期权价格推导出来。 [[Derivatives for Quant Developers]]

**In-the-money (ITM)**: 执行价格有利于持有者的期权。 [[Derivatives for Quant Developers]]

**Liquidity**: 在不影响价格的情况下买卖资产的难易程度。 [[Market Microstructure]]

**Log-normal Distribution**: 常用于建模股票价格的随机变量的概率分布。 [[Probability and Statistics for Quants]]

**Long Position**: 购买资产希望价格上涨的投资策略。 [[Market Microstructure]]

### M-S
**Margin**: 交易者必须存入的保证金，以覆盖潜在损失。 [[Derivatives for Quant Developers]]

**Market Microstructure**: 研究资产价格如何形成和变化的金融领域。 [[Market Microstructure]]

**Markov Process**: 一种随机过程，其中未来状态仅取决于当前状态。 [[Stochastic Processes for Finance]]

**Mean Reversion**: 价格趋向于回到平均价值的理论。 [[Time Series and Data Engineering]]

**Monte Carlo Simulation**: 使用随机 sampling 来估计可能结果的计算技术。 [[Probability and Statistics for Quants]]

**Moving Average**: 通过创建不断更新的平均价格来平滑价格数据的技术。 [[Time Series and Data Engineering]]

**Normal Distribution**: 也称为高斯分布或钟形曲线。 [[Probability and Statistics for Quants]]

**Option**: 给予持有者但非义务在特定日期前以特定价格买卖资产权利的金融合约。 [[Derivatives for Quant Developers]]

**Out-of-the-money (OTM)**: 执行价格不利于持有者的期权。 [[Derivatives for Quant Developers]]

**Put Option**: 给予持有者在特定日期前以特定价格出售资产权利的期权。 [[Derivatives for Quant Developers]]

**Quantitative Analysis**: 使用数学和统计分析金融数据和市场的做法。 [[Quant Programmer Roadmap]]

**R-squared**: 统计度量，表示因变量的方差中可以由自变量解释的比例。 [[Probability and Statistics for Quants]]

**Random Walk**: 认为资产价格变化是随机且不可预测的理论。 [[Stochastic Processes for Finance]]

**Risk Management**: 识别、分析和减轻金融风险的过程。 [[Risk and Valuation Basics]]

**Sharpe Ratio**: 衡量投资表现相对于所承担风险的指标。 [[Probability and Statistics for Quants]]

**Short Position**: 出售借入的资产希望价格下跌的投资策略。 [[Market Microstructure]]

**Skewness**: 描述概率分布不对称性的统计度量。 [[Probability and Statistics for Quants]]

**Standard Deviation**: 衡量数据集分散程度的统计度量。 [[Probability and Statistics for Quants]]

**Stochastic Process**: 随时间演变的随机变量系统。 [[Stochastic Processes for Finance]]

**Strike Price**: 期权持有者可以买卖标的资产的价格。 [[Derivatives for Quant Developers]]

### T-V
**Technical Analysis**: 通过分析市场活动如价格和成交量来预测价格方向的方法。 [[Market Microstructure]]

**Theta**: 期权价格对时间衰减的敏感度。 [[Derivatives for Quant Developers]]

**Time Series Analysis**: 分析按时间顺序索引的数据点的方法。 [[Time Series and Data Engineering]]

**Value at Risk (VaR)**: 在给定置信水平下投资组合在特定时期内可能损失的最大金额。 [[Risk and Valuation Basics]]

**Variance**: 衡量数据集分散程度的统计度量。 [[Probability and Statistics for Quants]]

**Vega**: 期权价格对波动性变化的敏感度。 [[Derivatives for Quant Developers]]

**Volatility**: 资产价格随时间变化的程度。 [[Stochastic Processes for Finance]]

## Investment Banking Terms

**Accretion/Dilution**: 分析收购交易如何影响收购公司的每股收益。 [[Valuation]]

**Capital Structure**: 公司为运营融资所使用的债务和股权组合。 [[Valuation]]

**Commodities**: 可以互换的原始材料或初级农产品，如黄金、石油或小麦。 [[Investment Banking Knowledge Map]]

**Credit Default Swap (CDS)**: 一种金融衍生品，旨在转移固定收益产品的信用风险敞口。 [[Risk]]

**Currency**: 货币交换系统，如美元、欧元或日元。 [[Investment Banking Knowledge Map]]

**DCF (Discounted Cash Flow)**: 一种基于未来现金流量现值的估值方法。 [[Valuation]]

**Debt**: 一方欠另一方的钱，通常需要支付利息。 [[Investment Banking Knowledge Map]]

**Derivatives**: 其价值取决于标的资产或一组资产的金融合约。 [[Derivatives for Quant Developers]]

**Dividend**: 公司向股东分配的部分利润。 [[Valuation]]

**Equity**: 公司的所有权权益，代表股东的权益。 [[Investment Banking Knowledge Map]]

**ETF (Exchange-Traded Fund)**: 在证券交易所交易的投资基金， much like a stock。 [[Investing and Asset Allocation Knowledge Map]]

**Fixed Income**: 定期支付固定金额的金融工具，如债券。 [[Investment Banking Knowledge Map]]

**Forward Contract**: 双方同意在未来特定日期以特定价格买卖资产的合约。 [[Derivatives for Quant Developers]]

**Futures**: 标准化的 forward contracts，在交易所交易。 [[Derivatives for Quant Developers]]

**Hedge**: 为减少损失风险而进行的投资。 [[Risk]]

**IPO (Initial Public Offering)**: 私营公司首次向公众出售股票的过程。 [[Investment Banking Knowledge Map]]

**Leverage**: 使用借入资本增加投资回报潜力。 [[Risk]]

**LBO (Leveraged Buyout)**: 主要使用借入资金收购公司的交易。 [[Investment Banking Knowledge Map]]

**Liquidity**: 在不影响价格的情况下买卖资产的难易程度。 [[Investment Banking Knowledge Map]]

**M&A (Mergers and Acquisitions)**: 公司通过合并或收购进行整合的活动。 [[Investment Banking Knowledge Map]]

**Margin**: 交易者必须存入的保证金，以覆盖潜在损失。 [[Derivatives for Quant Developers]]

**Market Capitalization**: 公司的总市值，通过股价乘以流通股数计算。 [[Valuation]]

**Option**: 给予持有者但非义务在特定日期前以特定价格买卖资产权利的金融合约。 [[Derivatives for Quant Developers]]

**Portfolio**: 投资者持有的金融资产集合。 [[Investing and Asset Allocation Knowledge Map]]

**Private Equity**: 直接投资私人公司或对上市公司进行收购的资本。 [[Investment Banking Knowledge Map]]

**ROI (Return on Investment)**: 投资效率的度量，计算为投资回报除以投资成本。 [[Valuation]]

**Securitization**: 将各种类型的债务（如抵押贷款）聚合并转化为可销售证券的过程。 [[Risk]]

**Spot Price**: 商品或资产用于立即交割的当前价格。 [[Investment Banking Knowledge Map]]

**Spread**: 两个价格、利率或收益率之间的差异。 [[Investment Banking Knowledge Map]]

**Stock**: 公司所有权的表示，以股份形式。 [[Investment Banking Knowledge Map]]

**Stop Loss**: 当证券达到特定价格时自动出售证券的订单，旨在限制投资者的损失。 [[Risk]]

**Swap**: 双方交换金融工具或现金流的衍生品合约。 [[Derivatives for Quant Developers]]

**Volatility**: 资产价格随时间变化的程度。 [[Risk]]

**Yield**: 投资产生的收入，通常以投资成本的百分比表示。 [[Investment Banking Knowledge Map]]

## Generative AI Terms

### A-E
**Embedding**: 将文本、图像或其他数据表示为高维向量，捕获语义含义。 [[Semantic Search]]

**Encoder-Decoder**: 一种神经网络架构，将输入序列编码为固定长度表示，然后解码为输出序列。 [[Pre-trained Model]]

**Epoch**: 训练过程中整个训练数据集的完整传递。 [[MLOps for GenAI]]

**Few-shot Learning**: 只提供少量示例就能学习新任务的能力。 [[Foundation Model]]

**Fine-tuning**: 在较小的特定数据集上进一步训练预训练模型的过程。 [[Pre-trained Model]]

**Forward Pass**: 输入数据通过神经网络产生输出的过程。 [[Foundation Model]]

**FLOP (Floating Point Operation)**: 计算机执行���单次浮点算术运算。 [[MLOps for GenAI]]

**GPT (Generative Pre-trained Transformer)**: 一类大型语言模型，使用 transformer 架构进行文本生成。 [[Foundation Model]]

**Ground Truth**: 用于训练和评估模型的正确答案或标签。 [[MLOps for GenAI]]

### H-M
**Hallucination**: AI 模型生成看似合理但实际上不正确或无意义的信息。 [[Enterprise Knowledge Assistant]]

**Hyperparameter**: 在训练过程开始前设置的模型配置参数。 [[MLOps for GenAI]]

**In-context Learning**: 模型通过提示中的示例学习新任务的能力，无需更新权重。 [[Foundation Model]]

**Inference**: 使用训练好的模型对新数据进行预测或生成内容的过程。 [[MLOps for GenAI]]

**LaMDA (Language Model for Dialogue Applications)**: Google 开发的对话式大型语言模型。 [[Foundation Model]]

**Learning Rate**: 优化算法在每次迭代中调整模型权重的步长。 [[MLOps for GenAI]]

**LLM (Large Language Model)**: 在海量文本数据上训练的深度学习模型，能够理解和生成人类语言。 [[Foundation Model]]

**Loss Function**: 衡量模型预测与实际目标之间差异的指标。 [[MLOps for GenAI]]

**MLOps (Machine Learning Operations)**: 机器学习模型的部署、监控和维护的实践。 [[MLOps for GenAI]]

### N-S
**Neural Network**: 受人脑结构启发的计算模型，由相互连接的节点（神经元）组成。 [[Foundation Model]]

**Overfitting**: 模型对训练数据学习得很好，但在新数据上表现不佳。 [[MLOps for GenAI]]

**PaLM (Pathways Language Model)**: Google 开发的大型语言模型。 [[Foundation Model]]

**Parameter**: 模型在训练过程中学习的内部变量。 [[Foundation Model]]

**Prompt Engineering**: 设计和优化输入提示以引导 AI 模型产生所需输出的实践。 [[Enterprise Knowledge Assistant]]

**RAG (Retrieval-Augmented Generation)**: 通过从外部知识库检索相关信息来增强大型语言模型生成的技术。 [[RAG]]

**Reinforcement Learning**: 代理通过与环境交互并接收奖励或惩罚来学习最优策略的机器学习类型。 [[Foundation Model]]

**Semantic Search**: 基于查询的含义而非关键词匹配来搜索内容的技术。 [[Semantic Search]]

**Supervised Learning**: 使用标记数据训练机器学习模型的类型。 [[Foundation Model]]

### T-Z
**Temperature**: 控制生成模型输出随机性和多样性的参数。 [[Enterprise Knowledge Assistant]]

**Token**: 文本的基本单位，可以是单词、词的一部分或字符。 [[Foundation Model]]

**Transformer**: 一种神经网络架构，使用自注意力机制处理序列数据，是现代大型语言模型的基础。 [[Foundation Model]]

**Underfitting**: 模型过于简单，无法捕捉训练数据中的模式。 [[MLOps for GenAI]]

**Unsupervised Learning**: 使用未标记数据训练机器学习模型的类型。 [[Foundation Model]]

**Validation Set**: 用于调整超参数和评估模型性能的数据集，独立于训练集。 [[MLOps for GenAI]]

**Vector Database**: 专门为存储和查询高维向量嵌入而优化的数据库。 [[Semantic Search]]

**Zero-shot Learning**: 模型在未经明确训练的情况下执行任务的能力。 [[Foundation Model]]

## Browse by Topic

- **System Design**: [[System Design Knowledge Map]]
- **Coding Interview**: [[Coding Interview Knowledge Map]]
- **Quant Finance**: [[Quant Programmer Roadmap]]
- **Investment Banking**: [[Investment Banking Knowledge Map]]
- **Investing**: [[Investing and Asset Allocation Knowledge Map]]
- **Generative AI**: [[Google Generative AI Leader Certification Knowledge Map]]
