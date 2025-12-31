---
date: 2025-12-30
problem: valid-parentheses
source: leetcode
difficulty: easy
time_minutes: 10
topics: [stack, string]
language: python
---

## Approach

Use a stack to track opening brackets. When we encounter a closing bracket, check if it matches the most recent opening bracket (top of stack).

## Complexity

- Time: O(n)
- Space: O(n)
