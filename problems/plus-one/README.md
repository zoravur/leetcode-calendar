---
date: 2026-02-19
problem: plus-one
source: neetcode
difficulty: easy
time_minutes: 5
topics: [array, math, addition]
language: python
---

You are given an integer array digits, where each digits[i] is the ith digit of a large integer. It is ordered from most significant to least significant digit, and it will not contain any leading zero.

Return the digits of the given integer after incrementing it by one.

## Approach

We simulate the addition operation (ripple carry).

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(n)
- Space: O(1) additional

## Results

28ms, 7.9MB

## Next Steps

The code could be significantly cleaner.

## Notes

N/A
