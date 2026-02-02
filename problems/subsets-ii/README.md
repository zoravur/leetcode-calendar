---
date: 2026-02-02
problem: subsets-ii
source: neetcode
difficulty: medium
time_minutes: 10
topics: [backtracking]
language: python
---

You are given an array nums of integers, which may contain duplicates. Return all possible subsets.

The solution must not contain duplicate subsets. You may return the solution in any order.

## Approach

This is a simple backtracking problem. I opted for an iterative solution, kind of for no particular
reason. It just seemed simpler. I build up my result by repeatedly appending to the subsets 
generated from the previous elements.

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(m^n), where m is the largest cardinality and n is the number of unique elements.
- Space: O(m^n), since we have to store all the elements we generate anyway.

## Results

Memory 8MB, Time 28ms.
Beats 97.44%, 100% respectively.

## Next Steps

I ran into an issue with array copying. I had to randomly slice arrays to prevent the shallow copy 
issue.

## Notes

N/A
