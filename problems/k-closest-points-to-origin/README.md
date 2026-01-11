---
date: 2026-01-10
problem: k-closest-points-to-origin
source: neetcode
difficulty: medium
time_minutes: 20
topics: [heap]
language: python
---

## Approach

You can keep a running tally of the top `k` elements according to some measure in O(nlog k) 
time, as long as you have a data structure that can insert an element / eject the smallest element
in O(log m) time, where m is the size of the data structure. Setting m = k, the idea is to iterate 
through the list of elements and repeatedly insert an element, ejecting when we exceed m, our count.
This results in a complexity of O(n) * (O(log k) + O(log k)) = O(n log k), which is the best 
that we can do. 

A max-heap is the data structure that satisfies this O(log k) requirement. Because older versions
of Python use a min-heap (which ejects the smallest element), you can negate the keys to order in 
the opposite way). This is sufficient.

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(n log k)
- Space: O(n) (O(k) additional)

## Results

0.71 seconds

## Next Steps

I got max and min heap confused, and had to look up documentation which slowed me down. Just need
more practice.

## Notes

N/A
