---
date: 2026-01-17
problem: coin-change
source: neetcode
difficulty: medium
time_minutes: 0
topics: ['bfs', 'dynamic-programming']
language: python
---

## Approach

I went with a BFS solution to this problem. If we view each total as a node in a graph, a BFS 
will give us the shortest path (fewest number of coins) to the solution.

Dynamic programming is another approach. There, you can do it just by incrementing arrays,
assuming no coins are negative.

## Solution

::include{file="solution.py"}

::include{file="solution2.py"}


## Complexity

- Time: O(nt) - because we iterate through every edge at every node, and every outdegree is t, 
    the number of coins.
- Space: O(n) -- because there are at most n nodes, and we hit all of them

## Results

N/A

## Next Steps

TODO

## Notes

[Any additional notes]
