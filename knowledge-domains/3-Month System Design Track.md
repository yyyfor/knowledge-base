---
title: 3-Month System Design Track
tags: [system-design, learning-track, roadmap]
difficulty: intermediate
estimated_time: 3 months
last_reviewed: 2025-04-09
prerequisites: [[What is System Design]]
---

# 3-Month System Design Track

从系统设计基础到复杂架构设计的结构化学习路径。适合准备系统设计面试，或希望提升架构设计能力的工程师。

## Target Audience
- **Experience Level**: 2-5年工作经验
- **Current Role**: 软件工程师、后端工程师、全栈工程师
- **Goals**: 系统设计面试、架构能力提升、技术lead角色

## Learning Objectives

完成本track后，你将能够：
- 🎯 独立设计medium-complexity系统
- 🎯 识别和解决常见系统设计问题
- 🎯 理解trade-offs并做出合理架构决策
- 🎯 有效沟通设计思路和rationale
- 🎯 通过大型科技公司的系统设计面试

## Week-by-Week Schedule

### Month 1: Fundamentals (Weeks 1-4)

#### Week 1: System Design Basics
**学习目标**: 理解系统设计的核心概念和框架

**必读内容**:
- [[What is System Design]]
- [[System Design Principles]]
- [[Scalability]]

**练习任务**:
- [ ] 选择一个熟悉系统（如Twitter）分析其架构
- [ ] 写出系统的关键components和数据流
- [ ] 识别3个关键trade-offs

**时间投入**: 10-12小时

---

#### Week 2: Core Concepts
**学习目标**: 掌握系统设计的核心概念

**必读内容**:
- [[Availability and Reliability]]
- [[Consistency and CAP]]
- [[Latency and Throughput]]

**练习任务**:
- [ ] 设计一个简单的URL shortener
- [ ] 分析系统的可用性目标
- [ ] 评估consistency需求和CAP权衡

**时间投入**: 12-15小时

---

#### Week 3: Data & Storage
**学习目标**: 理解数据存储和数据库选择

**必读内容**:
- [[Database Choices]]
- [[Caching]]
- [[Data Partitioning and Sharding]]

**练习任务**:
- [ ] 为一个application选择合适的数据库
- [ ] 设计caching strategy
- [ ] 规划data partitioning approach

**时间投入**: 12-15小时

---

#### Week 4: Architecture Patterns
**学习目标**: 掌握常见架构模式

**必读内容**:
- [[Load Balancing]]
- [[Queues and Asynchronous Processing]]
- [[Event-Driven Architecture for System Design]]

**练习任务**:
- [ ] 设计一个high-traffic web application
- [ ] 规划load balancing strategy
- [ ] 设计async processing workflow

**时间投入**: 12-15小时

---

### Month 2: Design Practice (Weeks 5-8)

#### Week 5: Simple System Design
**学习目标**: 开始实际系统设计练习

**必读内容**:
- [[How to Approach a System Design Interview]]
- [[Design a URL Shortener]]

**设计任务**:
- [ ] 完整设计URL shortener系统
- [ ] 估算容量和性能要求
- [ ] 识别bottlenecks和优化方案
- [ ] Mock interview练习

**时间投入**: 15-18小时

---

#### Week 6: Real-time Systems
**学习目标**: 设计实时通信系统

**必读内容**:
- [[Design a Chat System]]

**设计任务**:
- [ ] 设计聊天系统架构
- [ ] 规划message delivery和persistence
- [ ] 处理online presence和sync
- [ ] Mock interview练习

**时间投入**: 15-18小时

---

#### Week 7: Search & Discovery
**学习目标**: 设计搜索和推荐系统

**必读内容**:
- [[Design a Search System]]
- [[Design a Recommendation System]]

**设计任务**:
- [ ] 设计搜索引擎架构
- [ ] 规划indexing strategy
- [ ] 设计ranking和relevance
- [ ] Mock interview练习

**时间投入**: 15-18小时

---

#### Week 8: Content & Storage Systems
**学习目标**: 设计内容存储和分发系统

**必读内容**:
- [[Design a Notification System]]
- [[Design a File Storage System]]

**设计任务**:
- [ ] 设计通知系统
- [ ] 规划file storage和distribution
- [ ] 处理scalability和reliability
- [ ] Mock interview练习

**时间投入**: 15-18小时

---

### Month 3: Advanced Systems (Weeks 9-12)

#### Week 9: E-commerce Systems
**学习目标**: 设计复杂业务系统

**必读内容**:
- [[Design an Expedia-like Travel Booking System]]

**设计任务**:
- [ ] 设计e-commerce platform
- [ ] 规划inventory和order management
- [ ] 处理payment和transactions
- [ ] Mock interview练习

**时间投入**: 15-18小时

---

#### Week 10: Scale & Performance
**学习目标**: 处理超大规模系统

**必读内容**:
- [[Design a 10 Million QPS System]]

**设计任务**:
- [ ] 设计超high-scale system
- [ ] 规划multi-region deployment
- [ ] 处理catastrophic failures
- [ ] Mock interview练习

**时间投入**: 15-18小时

---

#### Week 11: System Trade-offs & Failure Modes
**学习目标**: 深入理解系统trade-offs

**必读内容**:
- [[System Design Trade-offs]]
- [[Cache Avalanche]]
- [[Cache Breakdown]]
- [[Cache Penetration]]
- [[Hot Key Overload]]

**设计任务**:
- [ ] 分析已知系统的failure modes
- [ ] 设计mitigation strategies
- [ ] 规划monitoring和alerting
- [ ] Mock interview练习

**时间投入**: 15-18小时

---

#### Week 12: Interview Preparation & Polish
**学习目标**: 面试技巧和综合练习

**必读内容**:
- [[System Design Offer-Level Playbook]]
- [[Observability in System Design]]

**练习任务**:
- [ ] 完成5+ mock interviews
- [ ] 练习白板设计
- [ ] 优化communication和presentation
- [ ] 准备behavioral questions

**时间投入**: 18-20小时

---

## Daily Schedule Template

### Weekday (2-3 hours)
**Deep Learning Block (1.5小时)**:
- 45分钟：阅读核心内容
- 30分钟：做笔记和整理知识
- 15分钟：自我测验

**Practice Block (1小时)**:
- 30分钟：设计练习或系统分析
- 30分钟：Mock interview或代码实现

### Weekend Day (4-6小时)
**Morning Session (2-3小时)**:
- 集中学习新内容
- 完成主要设计任务

**Afternoon Session (2-3小时)**:
- Review和巩固
- Mock interview练习
- 准备下周内容

## Weekly Milestones

### Completion Checklist
每周末，确保完成：
- [ ] 阅读完所有必读内容
- [ ] 完成所有设计任务
- [ ] 更新知识笔记
- [ ] 完成至少1次mock interview
- [ ] Review本周学习成果

### Self-Assessment Questions
1. 我能独立设计本周要求的系统吗？
2. 我能清楚解释关键设计决策的rationale吗？
3. 我能识别系统的主要trade-offs吗？
4. 我能估算系统的基本性能指标吗？

## Mock Interview Schedule

### Frequency
- **Weeks 1-4**: 每2周1次
- **Weeks 5-8**: 每1周1次
- **Weeks 9-12**: 每3-4天1次

### Interview Format
**Standard 45-minute session**:
- 5分钟：Clarification和scope
- 15-20分钟：High-level design
- 15-20分钟：Deep dive on 1-2 components
- 5-10分钟：Trade-offs和extension

### Feedback Focus
每次mock interview后，评估：
- **Communication**: 是否清晰表达设计思路？
- **Structure**: 是否有清晰的设计框架？
- **Depth**: 是否展示了足够的technical depth？
- **Trade-offs**: 是否识别并讨论了关键trade-offs？
- **Questions**: 是否问了好的clarifying questions？

## Additional Resources

### Practice Platforms
- **System Design Interview**: 在线练习平台
- **Pramp**: 免费mock interview伙伴
- **Interviewing.io**: 真实面试官mock interview

### Books
- "Designing Data-Intensive Applications" by Martin Kleppmann
- "System Design Interview" by Alex Xu
- "Distributed Systems for Fun and Profit"

### Communities
- **System Design subreddit**: r/systemdesign
- **Discord servers**: 系统设计学习小组
- **Meetup groups**: 本地系统设计meetup

## Common Pitfalls to Avoid

### 1. Memorizing Solutions
❌ **错误**: 背诵具体问题的答案
✅ **正确**: 理解设计原则和模式

### 2. Over-designing
❌ **错误**: 一上来就设计复杂系统
✅ **正确**: 从简单开始，逐步添加复杂度

### 3. Ignoring Requirements
❌ **错误**: 假设需求和constraints
✅ **正确**: 先clarify，再设计

### 4. Poor Communication
❌ **错误**: 只画图不解释
✅ **正确**: 边设计边解释rationale

## Success Metrics

完成本track后，你应该：
- ✅ 能够在45分钟内设计medium-complexity系统
- ✅ 清晰表达设计决策和trade-offs
- ✅ 回答follow-up questions和extensions
- ✅ 通过FAANG级别公司的系统设计面试

## Next Steps

**完成后，继续学习**:
- [[Career Development for Technical Professionals]]
- [[Technical Leadership]]
- [[Production-Ready Algorithm Implementation]]

**或选择其他track**:
- [[2-Month Coding Interview Track]]
- [[3-Month Quant Programming Track]]
