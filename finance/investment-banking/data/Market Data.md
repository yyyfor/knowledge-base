# Market Data

金融模型的输入数据。

详细解释：

Market Data 是定价、风险和估值的原材料，覆盖实时行情、收盘数据、曲线、曲面、信用参数和参考静态数据。很多系统问题最终并不是模型错，而是 market data sourcing、mapping、timestamp 或 quality control 出了问题。

类型：

- prices
- interest rates
- volatility
- credit spreads

数据源：

- Bloomberg
- Refinitiv

实务关注点：

- 数据供应商字段不等于可直接定价输入
- 需要做清洗、校验、归一化和 fallback
- end-of-day、real-time、official close 常常是不同口径

从哪里继续看：

- 知识库内接着看 [[Market Data Pipeline]]、[[Reference Data]]、[[Time Series Data]]、[[Yield Curve]]、[[Volatility Surface]]
- 外部可看 Bloomberg 与 LSEG Refinitiv 的官方数据产品介绍
- 技术实现可查 market data platform、golden source、data quality controls
