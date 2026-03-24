# Design a URL Shortener

URL shortener 是 system design 的经典入门题。

核心关注：

- short code generation
- redirect latency
- read-heavy traffic
- collision handling
- analytics optionality

为什么它经典：

它覆盖了键值存储、缓存、读多写少模式和 ID 生成等基础问题，适合作为 system design 入门场景。

相关：

- [[Database Choices]]
- [[Caching]]
- [[Scalability]]

