---
date: 2026-02-10
problem: meeting-schedule
source: neetcode
difficulty: easy
time_minutes: 10
topics: ['intervals']
language: python
---

## Approach

Sort intervals and check if end of previous meeting ever exceeds start of next.

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(nlogn)
- Space: O(n)

## Results

28ms (100%), 7.9MB (97.50%) -- judge is a bit weird though

## Next Steps

One-shotted this one. I could start using the stopwatch / timer and calculate times more precisely.

## Notes

See solution
