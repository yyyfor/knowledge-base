---
title: AI 服务发布与可观测性
tags: ["ai", "rag", "agent", "engineering"]
difficulty: intermediate
estimated_time: 20 min
last_reviewed: 2026-10-06
source_complete: true
---

# AI 服务发布与可观测性

可观测性（Observability）让工程师从系统输出理解运行状态。AI 服务除了请求成功率，还要知道证据质量、模型费用和用户是否采纳；高频部署也必须遵守权限、安全和数据兼容要求。

## 入门：四组信号

Metrics（指标）显示请求量、错误率、延迟分位数、队列积压和费用。Logs（日志）保存结构化事件。Traces（链路）连接解析、检索、重排、模型和工具调用。Quality（质量）不是替代前三者，而是额外衡量召回、引用、拒答及人工修订。

OpenTelemetry 提供通用的追踪与遥测接口。每个请求保留 traceId，分别测量 retrieval、rerank、generation 的耗时。敏感文档、提示和回答不要默认全文写日志，应采用最小化、脱敏、访问控制与明确保留期限。

## 进阶：部署不等于开放功能

Feature Flag（功能开关）让代码部署和功能开放分离，便于逐步启用。开关本身要测试、可审计并定期清理，不能用它代替授权。蓝绿或金丝雀发布保留旧版本与回退路径，但数据库必须兼容旧应用才能真正回退。

Kubernetes 的 readiness（就绪探针）控制是否接收流量，liveness（存活探针）判断是否需要重启，startup（启动探针）为初始化留出时间。不要因为外部模型短暂不可用就不断重启健康进程，否则可能放大故障。

## 项目实践：发布一项检索改动

流水线运行接口契约、用户隔离、迁移及知识评估测试，检查依赖与镜像安全，再部署到验证环境。新重排器先在影子流量上比较，模型输入只使用允许的数据；评估通过后小范围开放，观察延迟、费用和引用质量。

设置停止条件，例如越权事件立即停止，错误率或延迟超出约定范围回退。不要用一个平均质量分数掩盖权限失败。旧版本必须能读取新数据，并验证关闭开关不会破坏用户原有搜索与阅读。

## 高阶：容器资源与治理

JVM 堆只是容器内存的一部分，还包括元空间、直接缓冲、线程栈和本地库。现代 JVM 通常具备容器感知，仍需检查实际 JDK 与配置；设置 MaxRAMPercentage 不保证绝不 OOMKilled。CPU 限额也会影响延迟和探针，须用压测验证。

记录部署频率、变更前置时间、变更失败与恢复情况，用它们改善交付而不是给个人排名。模型、提示、评估集和索引配置也属于版本化发布资产。优雅关闭应停止接新任务、让在途工作完成或可恢复，再退出。

## 参考资料

[Kubernetes 官方：探针配置](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)

[OpenTelemetry 官方：可观测性基础](https://opentelemetry.io/docs/concepts/observability-primer/)
