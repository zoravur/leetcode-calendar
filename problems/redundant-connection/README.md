---
date: 2026-02-23
problem: redundant-connection
source: neetcode
difficulty: medium
time_minutes: 40
topics: ['union-find', 'cycle-detection']
language: cpp
---

You are given a connected undirected graph with n nodes labeled from 1 to n. Initially, it contained no cycles and consisted of n-1 edges.

We have now added one additional edge to the graph. The edge has two different vertices chosen from 1 to n, and was not an edge that previously existed in the graph.

The graph is represented as an array edges of length n where edges[i] = [ai, bi] represents an edge between nodes ai and bi in the graph.

Return an edge that can be removed so that the graph is still a connected non-cyclical graph. If there are multiple answers, return the edge that appears last in the input edges.

## Approach

The idea is that we use a disjoint set data structure. As soon as we try to connect two nodes in the same set
together, there must already exist a path between them, which means that that is the last edge of a cycle.

## Solution

::include{file="solution.cpp"}

## Complexity

- Time: O(n)
- Space: O(n)

## Results

2ms (92.62%), 152.9MB (6.82%)

## Next Steps

Next time, do this without looking up union-find.

## Notes

N/A
