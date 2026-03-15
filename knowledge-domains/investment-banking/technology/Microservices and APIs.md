# Microservices and APIs

Microservices and APIs 指通过多个边界清晰的服务以及接口协议来组织系统能力。

详细解释：

现代投行平台越来越少采用单体系统，而是将 booking、pricing、market data、risk aggregation、reporting 等能力拆成独立服务，通过 REST、gRPC、message bus 或 internal SDK 交互。这样有助于团队分工和独立扩展，但也会增加服务治理、接口兼容性和端到端调试成本。

常见服务：

- booking service
- pricing service
- market data service
- risk aggregation service
- reporting API

实务重点：

- API contract 必须稳定并有版本策略
- 服务拆分应围绕能力边界，而不是盲目细粒度
- 同步 API 与异步 event 的职责要分清

相关：

- [[Trade Capture]]
- [[Event-Driven Architecture]]
- [[Message Queue]]

从哪里继续看：

- 软件技术可查 REST、gRPC、OpenAPI、service mesh
- 知识库内继续看 [[Workflow Orchestration]]、[[Trading System Architecture]]
- 架构设计可查 backward compatibility、contract testing、observability

