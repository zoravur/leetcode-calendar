---
date: 2026-02-22
problem: lowest-common-ancestor-in-binary-search-tree
source: leetcode
difficulty: medium
time_minutes: 13
topics: ['binary-tree', 'binary-search-tree']
language: python
---

Given a binary search tree (BST) where all node values are unique, and two nodes from the tree p and q, return the lowest common ancestor (LCA) of the two nodes.

The lowest common ancestor between two nodes p and q is the lowest node in a tree T such that both p and q as descendants. The ancestor is allowed to be a descendant of itself.

## Approach

I actually solved a different problem -- lowest common ancestor in binary tree (not search). But 
that also gave me sufficient performance, which makes me wonder how good the TLE test cases are 
on neetcode. I think I'm going to switch.

Regardless, the solution to that problem works for this one, so let me explain it.

We are simply looking for the first node which contains in its subtree, all of the elements of the 
our set (of 2 nodes). Therefore, all that is needed is to save the first node for which the count
of valid descendants equals 2. After that, we have to be careful not to overwrite the result value
via an ancestor, but that is straightforward.

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(n)
- Space: O(log n) (stack)

## Results

28ms, 8.3MB

## Next Steps

Read the problem more carefully. Bad habit of skimming if I've seen something similar.

## Notes

N/A.
