---
date: 2026-01-26
problem: missing-number
source: neetcode
difficulty: easy
time_minutes: 0
topics: [array, sorting]
language: python
---

## Approach

Because the integers span from [0, .., n] except for one, and the indexes are from [0, ..., n-1], 
it actually makes it easy to "bucket sort" everything to its corresponding index. The first 
loop takes some technique -- you have to know that you need to repeatedly place all smaller elements
than the current, because swapping may surface an element that is smaller that is misplaced.

After that, it's just a linear scan.

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(n)
- Space: O(n) (O(1) additional)

## Results

Beats 100% (27 ms). Neetcode has started tracking percentiles.

## Next Steps

I did have some false submissions. Need to get better at producing bug-free code the first time.

## Notes

N/A
