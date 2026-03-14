# Initial Margin

Initial Margin 是为覆盖潜在未来风险而预先缴纳的保证金。

详细解释：

与 variation margin 主要覆盖已发生的市值变动不同，initial margin 用于覆盖在交易对手违约到头寸平仓期间可能产生的潜在损失。对 cleared products 和 uncleared derivatives 来说，initial margin 都是重要的风险缓释机制，同时也是 [[MVA]] 的关键来源。

常见场景：

- Centrally cleared derivatives
- Uncleared OTC derivatives
- Prime brokerage or futures accounts

实务重点：

- IM 模型可能使用历史 VaR、stress period 或 SIMM
- IM 要求会显著影响交易 economics
- 大规模 IM 计算需要稳定的 risk simulation 和 legal set mapping

相关：

- [[MVA]]
- [[Collateral and CSA]]
- [[Futures and Forwards]]
- [[Expected Exposure]]

从哪里继续看：

- 知识库内建议看 [[Stress Testing]]、[[Value at Risk]]
- 监管背景可查 uncleared margin rules、ISDA SIMM、CCP margin methodology
- 技术实现可继续看 margin engine、sensitivity-based IM 和 dispute workflow
