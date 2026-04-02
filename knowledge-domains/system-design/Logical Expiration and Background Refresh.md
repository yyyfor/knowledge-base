# Logical Expiration and Background Refresh

Logical expiration and background refresh 是一种“读请求继续拿旧值，刷新在后台完成”的缓存策略，用来降低热点 key 过期时的抖动和尾延迟。

详细解释：

它把“缓存是否还能返回给用户”和“缓存是否需要刷新”分开。数据在逻辑上过期后，系统仍可先返回旧值，再由后台线程或异步任务刷新到新值。这种做法特别适合读多写少、允许短时间轻微陈旧、但不希望失效瞬间大量回源的热点数据。

如何分析：

先判断业务是否允许 stale read、可接受多久的陈旧窗口、刷新失败时是否能继续返回旧值，以及哪些 key 需要后台刷新而不是同步阻塞回源。还要观察刷新任务延迟、失败率和旧值滞留时间。

怎么解决：

- store payload plus logical expire timestamp
- let one worker refresh while others serve stale data
- combine with request coalescing or lock to avoid duplicated refresh
- alert on stale age and refresh backlog

适用场景：

- 热点读流量很高、短时间数据陈旧可接受的榜单、配置、内容详情和推荐结果
- 不希望因为同步回源把尾延迟拉高的系统

常见误区：

- 没有给 stale 数据设置可观测指标，结果后台刷新失败后旧值长期滞留
- 把它用在强一致场景，导致业务上不能接受的脏读

相关：

- [[Cache Breakdown]]
- [[Request Coalescing]]
- [[Caching]]
- [[Consistency and CAP]]
