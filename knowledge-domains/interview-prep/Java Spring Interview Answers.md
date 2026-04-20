---
title: Java Spring Interview Answers
tags: ["coding-interview", "java", "spring", "interview-answers"]
difficulty: advanced
estimated_time: 30 min
last_reviewed: 2026-04-20
---

# Java Spring Interview Answers

Spring 题的核心不是背注解，而是理解 IoC、AOP、事务、Bean 生命周期和请求链路如何影响真实业务系统。

## Spring IoC 是什么？

参考回答：

IoC 是控制反转，原来对象自己创建和管理依赖，现在交给 Spring 容器创建、装配和管理。DI 是 IoC 的常见实现方式，容器把依赖注入到对象里。

它解决的是对象依赖管理和解耦问题。业务代码不需要关心具体实现的创建细节，更容易替换实现、做测试和统一管理生命周期。

## AOP 的实现原理是什么？

参考回答：

AOP 是面向切面编程，把日志、事务、鉴权、监控这类横切逻辑从业务代码里抽出来。Spring AOP 主要基于代理实现：如果目标类实现接口，默认可用 JDK dynamic proxy；否则通常用 CGLIB 创建子类代理。

成熟回答要补 proxy 边界：只有通过 Spring 代理对象调用的方法才会经过切面。同类内部方法调用不会经过代理，这也是事务不生效的常见原因。

## JDK dynamic proxy 和 CGLIB 有什么区别？

参考回答：

JDK dynamic proxy 基于接口生成代理类，要求目标对象实现接口。CGLIB 基于继承生成目标类子类，不要求接口，但不能代理 final 类和 final 方法。

在 Spring Boot 中，具体使用哪种代理取决于配置和场景。面试重点不是背默认值，而是知道代理机制会影响 AOP、事务和方法可见性。

## Spring Bean 生命周期是什么？

参考回答：

大致流程是：实例化 Bean、填充属性、执行 aware 回调、执行 BeanPostProcessor 前置处理、初始化方法、BeanPostProcessor 后置处理，最后 Bean 可用；容器关闭时执行销毁回调。

实际面试里要能联系场景：依赖注入发生在初始化前，AOP 代理通常在后置处理阶段创建，初始化方法适合做轻量本地初始化，不适合做耗时外部调用。

## `@Autowired` 和构造器注入怎么选？

参考回答：

推荐优先构造器注入。它能让依赖显式化，支持 final 字段，避免对象处于半初始化状态，也更方便单元测试。字段注入写起来短，但隐藏依赖，不利于测试，也容易让类依赖过多而不自知。

如果构造器参数越来越多，通常说明这个 service 职责过大，需要拆分。

## Spring 事务为什么有时不生效？

参考回答：

高频原因包括：同类内部调用绕过代理；方法不是 public；异常被 catch 掉没有抛出；默认只对 unchecked exception 回滚；数据库表引擎不支持事务；事务传播行为设置不符合预期；多数据源或异步线程导致事务边界断开。

面试里要把机制讲清楚：`@Transactional` 通常依赖 AOP 代理，事务是在方法调用进入代理时开启、退出时提交或回滚。如果调用没有经过代理，就没有事务增强。

## `@Transactional` 的传播行为有哪些？

参考回答：

常见传播行为包括 REQUIRED、REQUIRES_NEW、SUPPORTS、NOT_SUPPORTED、MANDATORY、NEVER、NESTED。最常用的是 REQUIRED：有事务就加入，没有就新建。REQUIRES_NEW 会挂起当前事务，新开一个事务。

回答时最好用场景：主订单事务里写审计日志，如果希望审计日志独立提交，可以考虑 REQUIRES_NEW；但要谨慎，因为它会改变一致性语义，不能乱用。

## Spring MVC 请求链路是什么？

参考回答：

请求进入 DispatcherServlet，经过 HandlerMapping 找到 handler，再由 HandlerAdapter 调用 Controller。参数绑定、校验、消息转换、异常处理、返回值处理都在这个链路里完成，最后渲染视图或返回 JSON。

线上问题通常出在参数校验、序列化、拦截器、异常映射、线程池和下游调用。回答时可以把链路和 observability 结合起来。

## Spring Boot 自动配置原理是什么？

参考回答：

Spring Boot 自动配置基于 classpath、配置属性和条件注解自动创建 Bean。常见条件包括 `@ConditionalOnClass`、`@ConditionalOnMissingBean`、`@ConditionalOnProperty`。它让应用引入 starter 后能获得默认配置，同时允许用户自定义 Bean 覆盖默认行为。

成熟回答要补：自动配置提升开发效率，但线上系统不能完全依赖默认值。线程池、连接池、超时、序列化、事务等关键配置必须显式审查。

## 如何设计一个可测试的 Spring service？

参考回答：

让 service 职责清晰，依赖通过构造器注入，业务逻辑和外部 IO 隔离。核心规则尽量放在纯函数或领域服务中，数据库、RPC、消息发送通过接口抽象，单元测试 mock 外部依赖，集成测试覆盖 repository 和事务。

不要把所有逻辑堆在 Controller 或一个巨大 Service 里，否则测试会变成启动整个 Spring 容器才能测一点业务规则。

## Related

- [[Java Interview Questions]]
- [[Java Database and Persistence Interview Answers]]
- [[Java Production Engineering Interview Answers]]
