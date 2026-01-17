---
date: 2026-01-16
problem: longest-common-subsequence
source: leetcode
difficulty: easy
time_minutes: 0
topics: []
language: python
---

## Approach

Pretty standard DP -- I've seen this one before. The idea is that we store an 2d array which stores
the longest common subsequence between `text1[:i], text2[:j]` at index `i, j`. This allows

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(mn)
- Space: O(mn)

## Results

N/A

## Next Steps

Make fewer mistakes; stop running code directly in neetcode and make own harness

## Notes

```
# So dp[i][j] will represent the longest common subsequence between
# text1[:i], text2[:j]
```
