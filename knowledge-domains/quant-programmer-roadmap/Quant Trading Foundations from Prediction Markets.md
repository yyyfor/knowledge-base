# Quant Trading Foundations from Prediction Markets

这篇笔记基于 gemchanger 的 *How I'd Become a Quant If I Had to Start Over Tomorrow* 以及 MrRyanChi 的中文改写整理。它最有价值的地方，不是给你一个“必胜策略”，而是把量化学习路径重新排成一个更贴近交易实战的顺序。

详细解释：

文章反复强调一个核心转变：不要先问“我觉得会不会涨”，而要先问“我的概率是怎么算出来的、这个价格有没有优势、如果我错了会亏多少、仓位该怎么控”。这套思维对预测市场适用，对股票、期权、做市和投行交易台同样适用。

核心心法：

- 从观点转向概率，而不是从情绪转向仓位
- 从单笔盈亏转向重复博弈下的正期望值
- 从“看对方向”转向“数据、模型、执行”三类 edge
- 从漂亮回测转向对估计误差和过拟合的敬畏

建议学习顺序：

1. 概率与贝叶斯更新：先掌握 base rate、条件概率、posterior update、期望值和方差。对应 [[Probability and Statistics for Quants]]。
2. 统计与研究纪律：学会区分 signal 和 noise，理解 hypothesis testing、multiple comparisons、out-of-sample 验证。对应 [[Backtesting and Research Workflow]]、[[Research Reproducibility]]。
3. 线性代数与优化：开始处理相关性、协方差矩阵、约束组合与仓位分配。对应 [[Linear Algebra for Quants]]、[[Calculus and Optimization]]。
4. 随机过程与定价：理解 GBM、Itô、Black-Scholes、Greeks、Monte Carlo。对应 [[Stochastic Processes for Finance]]、[[Derivatives for Quant Developers]]、[[Numerical Methods]]。
5. 微观结构与执行：把定价观点放进真实市场机制里，理解 spread、inventory risk、adverse selection、latency。对应 [[Market Microstructure]]、[[Low-Latency and Performance Engineering]]。
6. 工程与平台：把研究、数据、回测、部署和监控连成一条链。对应 [[Time Series and Data Engineering]]、[[Software Engineering for Quants]]、[[Distributed Systems for Finance]]。

文章特别提醒的实务问题：

- 条件概率比孤立概率更重要，因为市场总在吸收新信息
- 半凯利通常比满凯利更稳健，因为你的参数估计几乎一定有误差
- 回测结果越好，越要先怀疑数据挖掘和 multiple testing
- 真正可持续的 edge 往往来自独特数据、独特模型或独特执行，不只是会写代码
- 数学直觉仍然是长期护城河，AI 只能放大已有理解，不能替代理解

适合做成项目的练习：

- 模拟 10,000 次抛硬币，观察大数定律和方差收敛
- 写一个 Bayesian updater，把新闻事件转成概率更新
- 做一个带 walk-forward 验证的小型策略回测，专门检查过拟合
- 同时实现 Black-Scholes 和 Monte Carlo 定价，比较误差和性能
- 为二元事件市场写一个最简做市模拟器，加入 inventory limit 和 spread control

迁移到投行语境：

- 预测市场是学习“概率定价”和“事件驱动做市”的极简练习场
- 文中的 LMSR、CLOB、库存风险、执行速度，可以直接迁移到电子做市和交易平台理解
- 文中的估计误差、风险预算、仓位控制，也能直接映射到 desk risk、VaR 和 model risk 讨论

相关：

- [[Quant Programmer Roadmap]]
- [[Quant Programmer Learning Sequence]]
- [[Prediction Markets and LMSR]]

来源：

- 原文：gemchanger, *How I'd Become a Quant If I Had to Start Over Tomorrow*
- 中文改写：MrRyanChi, BlockBeats《2026年，普通人如何开始量化交易？》
- 链接：https://www.theblockbeats.info/news/61793
