# Time Series Data

金融数据通常按时间序列存储。

详细解释：

时间序列数据强调“变量随时间变化的连续观测”。在投行场景里，它既包括价格序列，也包括收益率、波动率、PnL、风险因子和模型参数历史。时间序列是回测、校准、风险统计和异常监控的基础。

应用：

- risk analysis
- model calibration

常见问题：

- 缺失值和异常点处理
- 不同市场日历和时区对齐
- corporate actions 或 roll convention 导致的序列不连续

从哪里继续看：

- 知识库内继续看 [[Value at Risk]]、[[PnL Explain]]
- 数据工程方向可看 time-series database、event time、data replay
- 统计方法可看 volatility modeling 和 stationarity 入门资料

相关：

- [[Market Data]]
- [[PnL Explain]]
