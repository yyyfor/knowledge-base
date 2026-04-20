---
title: Java Database and Persistence Interview Answers
tags: ["coding-interview", "java", "database", "mysql", "persistence", "interview-answers"]
difficulty: advanced
estimated_time: 35 min
last_reviewed: 2026-04-20
---

# Java Database and Persistence Interview Answers

数据库题要把 Java persistence、连接池、事务、索引、幂等和线上慢查询放在一起回答。

## JDBC 执行 SQL 的基本流程是什么？

参考回答：

基本流程是获取连接、创建 Statement/PreparedStatement、设置参数、执行 SQL、处理 ResultSet、释放资源。实际项目通常由连接池和 ORM/mapper 框架封装，但底层仍是这些步骤。

成熟回答要提 PreparedStatement：它能预编译 SQL、避免字符串拼接导致 SQL 注入，也有利于参数绑定和执行计划复用。

## 连接池解决什么问题？核心参数有哪些？

参考回答：

数据库连接创建成本高，连接池通过复用连接降低建连开销，并控制应用对数据库的最大并发。核心参数包括最大连接数、最小空闲连接、连接超时、空闲超时、最大生命周期、泄漏检测和连接健康检查。

连接池满通常不是简单加大连接数。要先看 SQL 是否慢、事务是否太长、连接是否泄漏、下游 DB 是否扛得住。

## MyBatis 和 JPA 怎么选？

参考回答：

MyBatis 更接近 SQL mapper，SQL 控制力强，适合复杂查询、性能敏感和需要精确优化的业务。JPA 更偏 ORM，开发效率高，适合领域模型清晰、CRUD 较多的系统。

取舍不是谁高级，而是团队是否需要 SQL 可控、查询复杂度、性能要求、模型稳定性和成员熟悉度。互联网高并发业务里 MyBatis 更常见，因为 SQL 可观测和可优化性更强。

## N+1 query 是什么？怎么优化？

参考回答：

N+1 是先查一批主对象，再对每个对象单独查关联数据，导致 1 次查询变成 N+1 次查询。它会放大数据库压力和接口延迟。

优化方式包括 join fetch、批量查询、IN 查询、预加载、数据冗余或缓存。发现方式可以通过 SQL 日志、APM trace、慢查询和接口调用链。

## 事务隔离级别有哪些？

参考回答：

常见隔离级别包括 Read Uncommitted、Read Committed、Repeatable Read、Serializable。它们分别对应不同程度的脏读、不可重复读、幻读防护和并发性能。

MySQL InnoDB 默认 Repeatable Read，并通过 MVCC 和锁机制处理一致性读和当前读。面试里不要只背定义，要能结合订单扣库存、余额变更这类场景讲隔离和锁。

## 乐观锁和悲观锁怎么选？

参考回答：

悲观锁假设冲突多，先加锁再修改，比如 `select ... for update`。它一致性强，但会降低并发并可能造成锁等待。乐观锁假设冲突少，更新时用 version 或条件判断，失败后重试或提示用户。

高冲突核心资源如库存扣减可能需要数据库锁或原子更新；低冲突编辑类场景适合乐观锁。

## 索引为什么能加速查询？

参考回答：

MySQL InnoDB 常用 B+Tree 索引。B+Tree 高度低，叶子节点有序，适合等值查询、范围查询和排序。索引能减少扫描行数，把全表扫描变成按树定位。

但索引不是越多越好。索引会占空间，写入时要维护索引，低选择性字段或不符合查询模式的索引收益有限。

## 什么情况下索引会失效？

参考回答：

常见情况包括不满足最左前缀、在索引列上做函数或计算、隐式类型转换、前导模糊匹配、OR 条件使用不当、选择性太低导致优化器选择全表扫描。

成熟回答要说会用 `EXPLAIN` 验证，而不是凭感觉判断。重点看 type、key、rows、Extra、filtered。

## 深分页为什么慢？怎么优化？

参考回答：

`limit offset, size` 深分页慢，是因为数据库要扫描并丢弃 offset 条记录，再返回 size 条。offset 越大，扫描越多。

优化方式包括基于游标的 seek pagination，比如 `where id > last_id order by id limit size`；或者先用覆盖索引定位 id，再回表；搜索场景也可以用 search_after。

## 如何保证接口幂等？

参考回答：

幂等是同一个请求重复执行多次，结果和执行一次一致。常见方案包括 idempotency key、唯一约束、去重表、状态机、请求流水号和分布式锁。

支付、下单、退款这类接口必须先设计幂等，再设计重试。否则重试会把临时故障变成重复扣款或重复发货。

## redo log、undo log、binlog 分别做什么？

参考回答：

redo log 是 InnoDB 的物理日志，用于 crash recovery，保证已提交事务持久化。undo log 记录修改前版本，用于事务回滚和 MVCC。binlog 是 MySQL server 层的逻辑日志，用于主从复制和增量恢复。

面试里可以补两阶段提交：redo log 和 binlog 要协调提交，保证崩溃恢复和复制一致性。

## MVCC 如何实现快照读？

参考回答：

MVCC 通过隐藏字段、undo log 和 ReadView 实现多版本并发控制。快照读根据事务可见性规则读取某个版本的数据，不需要阻塞写，从而提升读写并发。

但当前读，比如 update、delete、select for update，需要读取最新数据并加锁，所以不能简单说“MVCC 不加锁”。

## Related

- [[Java Interview Questions]]
- [[Database Choices]]
- [[Java Spring Interview Answers]]
