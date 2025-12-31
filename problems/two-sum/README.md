---
date: 2025-12-31
problem: two-sum
source: leetcode
difficulty: easy
time_minutes: 15
topics: [hash-map, arrays]
language: python
---

## Approach

Use a hash map to store numbers we've seen and their indices. For each number, check if its complement (target - current) exists in the map.

## Complexity

- Time: O(n)
- Space: O(n)
