---
title: PostgreSQL 迁移与查询实践
tags: ["ai", "rag", "agent", "engineering"]
difficulty: intermediate
estimated_time: 20 min
last_reviewed: 2026-10-06
source_complete: true
---

# PostgreSQL 迁移与查询实践

数据库迁移（Schema Migration）改变表结构或数据口径。可靠迁移把数据库升级与应用切换解耦，允许新旧应用在过渡阶段共同运行，不把“SQL 执行成功”等同于“发布安全”。

## 入门：关系列与 JSONB

稳定、用于连接、外键、唯一性和报表的字段放关系列；变化较多的扩展属性可放 JSONB（二进制 JSON）。JSONB 灵活，但仍需 Schema、CHECK 或应用校验约束字段类型和业务规则，不能认为所有字段装进 JSON 就不需要数据模型。

B-tree 支持常见等值与范围查询；GIN（广义倒排索引）适合 JSONB、数组和全文检索；BRIN（块范围索引）利用物理分布相关性压缩大表索引。选择索引要看实际查询和写入成本，不是每个字段都加一个。

## 进阶：低停机迁移的步骤

先加允许空值的新列，新旧应用兼容；批量回填，避免一次长事务；确认数据完整后增加约束，再切换读取；最后删除旧列。DDL 即使不重写全表也可能需要强锁，为迁移设置合理 lock_timeout 与 statement_timeout，并先在真实规模副本上验证。

支持相关版本时，新增非空约束可先建立 CHECK(column IS NOT NULL) NOT VALID，再 VALIDATE CONSTRAINT，最后 SET NOT NULL。不同 PostgreSQL 版本对直接 NOT NULL NOT VALID 的支持不同，迁移脚本应以实际版本为准，不能混用语法。

CREATE INDEX CONCURRENTLY 降低索引建立对写入的阻塞，但仍有等待与资源开销，不能放在普通事务块中；失败可能留下无效索引，要检查并清理后重试。常量默认值和 volatile 默认表达式的表重写行为也不同。

## 项目实践：从查询计划定位问题

EXPLAIN 查看计划；EXPLAIN (ANALYZE, BUFFERS) 会真正执行语句。对修改语句先在隔离环境或可回滚事务中检查，避免为了诊断改了生产数据。比较估算行数与实际行数、循环次数、过滤丢弃和读取缓冲块，再判断统计信息、索引或 SQL 是否需要调整。

全表扫描不一定错误，小表或查询大部分行时可能更便宜。索引优化后同时测查询耗时、写入耗时、索引大小和实际并发，不能只比较一条 SQL 的执行时间。

## 高阶：事务与容量

MVCC（Multi-Version Concurrency Control，多版本并发控制）让读取使用一致的可见版本，旧行版本由 vacuum 回收。长事务可阻碍清理，造成膨胀。Read Committed 是常见默认级别，Repeatable Read 仍可能出现写偏差；Serializable 可能拒绝冲突事务，应用需设计重试。

以统一顺序锁定多个资源可以减少死锁，但不能承诺完全消除。虚拟线程数量不等于数据库连接数，连接池与慢查询共同决定吞吐。上线迁移时检查锁等待、活跃事务、复制延迟和回填进度；应用回滚不意味着破坏性 DDL 可自动恢复。

## 参考资料

[PostgreSQL 官方：ALTER TABLE](https://www.postgresql.org/docs/current/sql-altertable.html)

[PostgreSQL 官方：CREATE INDEX](https://www.postgresql.org/docs/current/sql-createindex.html)
