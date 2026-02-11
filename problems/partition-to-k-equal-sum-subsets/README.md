---
date: 2026-02-11
problem: partition-to-k-equal-sum-subsets
source: neetcode
difficulty: medium
time_minutes: 0
topics: ['backtracking']
language: python
---

## Approach

Backtracking approach. No real method, besides the fact that I remove elements from the array
when the partition is found.

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(2^n)
- Space: O(n)

## Results

27ms, 7.9MB

## Next Steps

Less memory hungry, check test cases better -- one large test case (bounds) is useful.

## Notes

See solution.
