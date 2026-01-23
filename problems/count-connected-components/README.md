---
date: 2026-01-23
problem: count-connected-components
source: neetcode
difficulty: medium
time_minutes: 10
topics: ['graph', 'dfs']
language: python
---

## Approach

If you've ever done "count islands", it's pretty similar to that. It's just that the adjacency is determined by a graph
instead of by an actual grid. All you have to do is maintain a global visited array, so that every node is visited at most
once. Nodes in the same component are grouped together because they will be visited in the same dfs, whereas nodes in other
components belong to separated to top level dfs calls. All this means that if we count each dfs at most once, skipping over
situations where a call is made on an already visited node (because it's part of a component that we've already touched), 
we'll get the number of components

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(n) -- proportional to edges
- Space: O(n) -- we create an O(n) auxiliary data structure.

## Results

0.028s -- I have a feeling neetcode will start tracking percentiles soon.

## Next Steps

[Future improvements or learnings]

## Notes

[Any additional notes]
