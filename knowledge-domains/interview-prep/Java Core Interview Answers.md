---
title: Java Core Interview Answers
tags: ["coding-interview", "java", "core-java", "interview-answers"]
difficulty: intermediate
estimated_time: 25 min
last_reviewed: 2026-04-20
---

# Java Core Interview Answers

Core Java 题目主要考语言基础是否扎实，以及你能不能把基础机制连接到真实代码质量、线上 bug 和框架行为。

## `==` 和 `equals()` 的区别是什么？

参考回答：

`==` 比较的是两个变量的值。对于基本类型，它比较数值是否相等；对于引用类型，它比较两个引用是否指向同一个对象。`equals()` 是对象的逻辑相等判断，默认实现和 `==` 类似，但很多类会重写它，比如 `String` 会按字符内容比较。

面试里要补一句：如果一个类有业务意义上的相等关系，比如 User 用 userId 判断相等，就应该重写 `equals()`，并且通常必须同步重写 `hashCode()`，否则放进 `HashMap`、`HashSet` 时会出现查不到、重复插入等问题。

## 为什么重写 `equals()` 通常也要重写 `hashCode()`？

参考回答：

Java 的约定是：两个对象如果 `equals()` 相等，它们的 `hashCode()` 必须相等。HashMap/HashSet 会先用 hashCode 定位桶，再在桶里用 equals 判断是否是同一个逻辑对象。如果只重写 equals，不重写 hashCode，同一个逻辑对象可能落到不同桶里，集合语义就会错。

一个成熟的回答还要提到：用作 key 的字段最好不可变，否则对象放入 HashMap 后字段变了，hashCode 也变了，后续可能无法定位原来的桶。

## `String`、`StringBuilder`、`StringBuffer` 有什么区别？

参考回答：

`String` 是不可变对象，每次拼接可能产生新对象，优点是线程安全、可缓存 hash、适合做常量和 Map key。`StringBuilder` 是可变字符序列，非线程安全，适合单线程高频拼接。`StringBuffer` 也是可变字符序列，但方法加了同步，线程安全，性能通常比 StringBuilder 低。

实际项目里，大多数局部字符串拼接用 `StringBuilder` 或编译器优化后的 `+` 就够了；跨线程共享可变字符串很少是好设计，不要因为“线程安全”就默认用 `StringBuffer`。

## checked exception 和 unchecked exception 怎么选？

参考回答：

checked exception 要求调用方显式处理或继续抛出，适合调用方有明确恢复动作的场景，比如文件不存在、外部资源不可用。unchecked exception 是运行时异常，适合程序 bug、非法参数、状态不一致等无法在当前层合理恢复的问题。

在业务系统里，不要滥用 checked exception 把所有层都污染成 `throws Exception`。更常见的做法是用业务异常表达可预期失败，用统一异常处理映射成错误码和响应，同时保留日志和 trace id 方便排查。

## `final` 可以修饰什么？

参考回答：

`final` 修饰类表示不能被继承，修饰方法表示不能被重写，修饰变量表示引用或值不能重新赋值。对于引用类型，`final` 只保证引用不变，不保证对象内部状态不可变。

面试里可以补：不可变类通常需要类 `final`、字段 `private final`、不暴露可变内部对象、构造后状态不可变。`String` 就是典型例子。不可变对象天然线程安全，也更适合做缓存 key。

## 泛型的类型擦除是什么？

参考回答：

Java 泛型主要在编译期做类型检查，运行期大多数泛型信息会被擦除，比如 `List<String>` 和 `List<Integer>` 在运行期都是 `List`。这带来一些限制：不能直接 `new T()`，不能创建泛型数组，运行期不能直接判断 `list instanceof List<String>`。

泛型的价值是把类型错误提前到编译期，同时减少强制类型转换。框架如果需要运行期类型信息，通常要通过 `Class<T>`、`TypeReference` 或反射保存额外 metadata。

## 反射有什么用途和风险？

参考回答：

反射允许程序在运行期获取类、方法、字段、注解并动态调用。Spring、ORM、JSON 序列化、测试框架都大量使用反射来做依赖注入、对象映射和注解解析。

风险是性能比直接调用差一些，破坏封装，编译期类型检查变弱，也可能带来安全问题。业务代码里不应该为了“灵活”滥用反射；如果使用，要控制范围、做好缓存、异常处理和权限边界。

## interface 和 abstract class 怎么选？

参考回答：

interface 更适合定义能力和协议，强调“能做什么”，一个类可以实现多个接口。abstract class 更适合抽取一组类的公共状态和公共流程，强调“是什么的一种”，并且可以提供字段、构造器和部分默认实现。

设计上优先用接口表达边界，用组合代替继承。只有多个实现确实共享模板流程或状态时，再考虑抽象类。

## Java 是值传递还是引用传递？

参考回答：

Java 只有值传递。基本类型传递的是值的副本；引用类型传递的是引用地址的副本。方法内部可以通过这个引用修改对象内部状态，但不能让调用方的引用变量指向另一个对象。

常见误区是把“能修改对象内容”理解成引用传递。真正的引用传递意味着方法里重新赋值引用会影响调用方变量，Java 做不到这一点。

## `Object` 里有哪些常见方法？

参考回答：

常见方法包括 `equals()`、`hashCode()`、`toString()`、`getClass()`、`clone()`、`wait()`、`notify()`、`notifyAll()`、`finalize()`。面试重点通常不是背列表，而是理解 equals/hashCode 的集合语义，wait/notify 必须配合 monitor 使用，以及 finalize 已不推荐依赖。

## 回答时的成熟补充

Core Java 题如果只背定义，区分度不高。更好的表达是把语言机制落到代码质量上：不可变对象减少并发风险，equals/hashCode 影响集合正确性，泛型减少运行期类型错误，异常设计影响接口边界和可观测性。

## Related

- [[Java Interview Questions]]
- [[Java Collections Interview Answers]]
- [[Java Concurrency Interview Answers]]
