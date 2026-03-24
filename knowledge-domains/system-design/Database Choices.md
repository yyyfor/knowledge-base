# Database Choices

数据库选型取决于访问模式，而不是流行度。

详细解释：

system design 里常见的问题是：什么时候用 relational database，什么时候用 key-value、document、time-series 或 search engine。没有一种数据库适合所有场景。

常见考虑：

- read/write pattern
- query flexibility
- consistency needs
- indexing and scale

相关：

- [[Consistency and CAP]]
- [[Data Partitioning and Sharding]]
- [[Design a Search System]]

