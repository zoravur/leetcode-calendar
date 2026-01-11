---
date: 2026-01-10
problem: two-sum
source: leetcode
difficulty: easy
time_minutes: 5
topics: [array, hash-map]
language: python
---

## Problem

Given an array of integers `nums` and an integer `target`, return the indices `i` and `j` such that `nums[i] + nums[j] == target` and `i != j`.

You may assume that every input has exactly one pair of indices `i` and `j` that satisfy the condition.

Return the answer with the smaller index first.


## Approach

Notice that we if we have to construct a sum of k numbers to equal target t, we can fix
k-1 elements and search for $$t-(n_0+...+n_{k-1})$$. This can be further improved upon
by storing the seen numbers in a structure that allows us to easily verify membership,
along with a map from the number to any of its indexes in the array, because that's what
we want to return. A hash map is best for this, or as it's known in python, a dict. So
we iterate through the array, adding each number we've seen to the dict while simultaneously
checking if the number `target - number` is already in the dict. And if it is, we return
the indices corresponding to these two numbers. It's also made easier by the fact 
that a solution is guaranteed to both exist and be unique, but even if it weren't we could
return [-1, -1] indicating no solution. 


## Solution

::include{file="solution.py"}

## Complexity

- Time: O(n)
- Space: O(n)

## Results

N/A

## Next Steps

N/A

## Notes

classic. hashmap, store each seen num, check if target - cur is in nums
