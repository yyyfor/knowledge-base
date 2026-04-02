# Large Value Overhead

Large value overhead 指的是单个缓存 value 过大，导致网络传输、序列化、反序列化和内存占用成本异常高。

详细解释：

很多系统命中缓存后仍然慢，问题不在 miss，而在拿到的是一个过大的 value。它会带来更高的网络 IO、更长的反序列化时间、更大的 GC 压力和更差的缓存利用率。对于热点 key，这个问题还会被放大成带宽瓶颈和实例抖动。

如何分析：

先看 top value size、网络带宽、P99 latency、反序列化耗时、对象分配和 GC 时间。再判断是不是把多个字段无差别打包、是不是缓存了过度冗余的数据，或者是不是多个调用方只需要其中一小部分字段。

怎么解决：

- split large value into smaller objects
- cache projection instead of full object
- compress only when payload and CPU tradeoff is worth it
- use tiered storage or different cache policy for large objects
- avoid making hot keys carry oversized payloads

适用场景：

- feed、画像、复杂配置、聚合对象、报表快照等容易长成大对象的场景
- 单 key 读取频繁但消费者只需要部分字段的接口

常见误区：

- 只看缓存命中率，不看命中后的 payload size 和序列化成本
- 把压缩当成默认答案，却不评估 CPU 开销和端到端延迟收益

相关：

- [[Caching]]
- [[Hot Key Overload]]
- [[Database Choices]]
- [[Latency and Throughput]]
