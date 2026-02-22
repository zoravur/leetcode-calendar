---
date: 2026-02-22
problem: subtree-of-a-binary-tree
source: neetcode
difficulty: easy
time_minutes: 7
topics: ['binary-tree']
language: python
---

Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.

A subtree of a binary tree tree is a tree that consists of a node in tree and all of this node's descendants. The tree tree could also be considered as a subtree of itself.

## Approach

Fully recursive solution works here. treeEqual determines if two trees are equal, recursively. Then, 
we try all subtrees of root.

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(n*m), where n and m are the size of the trees. The worst case is when there are many, many
    nodes with the same value.
- Space: O(log n)

## Results

40ms, 8.2MB

## Next Steps

There's a serialization approach as well. Z-function is a linear string matching algorithm, 
which is way more efficient than O(n*m) (O(n+m)).

## Notes

N/A
