---
date: 2026-02-16
problem: jump-game-ii
source: neetcode
difficulty: medium
time_minutes: 10
topics: [array]
language: python
---

You are given an array of integers nums, where nums[i] represents the maximum length of a jump towards the right from index i. For example, if you are at nums[i], you can jump to any index i + j where:

- j <= nums[i]
- i + j < nums.length
- You are initially positioned at nums[0].

Return the minimum number of jumps to reach the last position in the array (index nums.length - 1). You may assume there is always a valid answer.


## Approach

I pretty much went with a DP approach. It is O(n * m), where n is the
number of cells, and m is the max jump distance. 

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(n*m)
- Space: O(n)

## Results

29ms, 7.8MB

## Next Steps

Could be improved by using a min-max window, according to the solution.
I guess this would work, because if index k is reachable, k-1 is 
reachable as well, because whichever step reaches k from an index
before k, that starting position can also reach k - 1. This is 
suffficient to realize an optimal solution.

All you would have to do, is whenever you extend a window, check the
furthest reachable cells by iterating through the cells which have been
added.

Easy money.

## Notes

