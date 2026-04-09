# Standardized Frontmatter Template

This template defines the standardized metadata structure for all knowledge base files.

## Required Fields

```yaml
---
title: Topic Name
tags: [domain, subdomain, specific-tags]
difficulty: beginner|intermediate|advanced
estimated_time: XX min
last_reviewed: YYYY-MM-DD
---

# Title

One-line summary of what this topic covers and why it matters.

## Quick Summary

2-3 sentences explaining the core concept in simple terms.

## Key Insights

- Point 1
- Point 2
- Point 3

## Common Pitfalls

- Mistake 1
- Mistake 2
- Mistake 3

## Related Topics

- [[Related Topic 1]]
- [[Related Topic 2]]

## Further Reading

- Resource 1
- Resource 2
```

## Field Definitions

### title
- **Required**: Yes
- **Format**: Sentence case, descriptive
- **Example**: "Binary Search on Monotonic Functions"

### tags
- **Required**: Yes
- **Format**: Array of strings
- **Standard tags by domain**:
  - Coding Interview: `[coding-interview, algorithms, data-structures]`
  - System Design: `[system-design, architecture, scalability]`
  - Quant Programming: `[quant, finance, algorithms, mathematics]`
  - Investment Banking: `[investment-banking, finance, valuation]`
  - Investing: `[investing, asset-allocation, portfolio-management]`
  - GenAI: `[genai, machine-learning, llm, google-cloud]`

### difficulty
- **Required**: Yes
- **Values**: `beginner`, `intermediate`, `advanced`
- **Guidelines**:
  - `beginner`: Foundational concepts, no prerequisites
  - `intermediate`: Requires basic understanding of related topics
  - `advanced`: Complex concepts, requires strong background

### estimated_time
- **Required**: Yes
- **Format**: Number followed by unit (min, hours)
- **Examples**: `15 min`, `1 hour`, `2 hours`
- **Guidelines**: Based on careful reading + understanding

### last_reviewed
- **Required**: Yes
- **Format**: YYYY-MM-DD
- **Purpose**: Track content freshness

### Optional Fields (for specific domains)

#### For Coding Interview Topics
```yaml
prerequisites: [[Topic 1], [Topic 2]]
related_problems: [LeetCode 1, LeetCode 15]
time_complexity: O(n log n)
space_complexity: O(n)
companies: [Google, Meta, Amazon]
```

#### For System Design Topics
```yaml
prerequisites: [[Basic System Design], [Scalability]]
scale: [million-users, billion-users]
related_companies: [Uber, Airbnb, Twitter]
trade_offs: [consistency vs availability, latency vs throughput]
```

#### For Quant Topics
```yaml
prerequisites: [[Calculus], [Probability]]
math_level: intermediate
applications: [option-pricing, risk-management]
related_tools: [NumPy, Pandas, scikit-learn]
```

## Migration Script Usage

To update existing files:

```bash
# Update frontmatter for a single file
node scripts/update-frontmatter.js path/to/file.md

# Update all files in a directory
node scripts/update-frontmatter.js knowledge-domains/coding-interview-playbook/

# Update all files
node scripts/update-frontmatter.js knowledge-domains/
```

## Validation Rules

1. **Title**: Must be unique across the knowledge base
2. **Tags**: At least 2 tags, first tag should be primary domain
3. **Difficulty**: Must be one of: beginner, intermediate, advanced
4. **Estimated Time**: Must be reasonable for content depth
5. **Last Reviewed**: Cannot be in the future
6. **Prerequisites**: All referenced topics must exist
7. **Related Topics**: Maintain bidirectional links
