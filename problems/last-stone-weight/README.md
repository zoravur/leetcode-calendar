---
date: 2026-01-17
problem: last-stone-weight
source: neetcode
difficulty: easy
time_minutes: 0
topics: ['heap', 'implementation']
language: python
---

## Problem:

> You are given an array of integers stones where stones[i] represents the weight of the ith stone.
> 
> We want to run a simulation on the stones as follows:
> 
> At each step we choose the two heaviest stones, with weight x and y and smash them togethers
> If x == y, both stones are destroyed
> If x < y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x.
> Continue the simulation until there is no more than one stone remaining.
> 
> Return the weight of the last remaining stone or return 0 if none remain.

## Approach

The bounds of the problem mean that you can search the entire array
n times, resulting in an `n^2` algorithm without running into any
problems. The only small optimization was to use a max-heap, which
turned the finding operation from O(n) to O(log n).

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(n log n)
- Space: O(n) (O(1) additional)

## Results

N/A

## Next Steps

Could handle edge cases better. Still not testing or dictating.

## Notes

