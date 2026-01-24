---
date: 2026-01-24
problem: delete-leaves-with-a-given-value
source: neetcode
difficulty: medium
time_minutes: 0
topics: ['binary-tree']
language: python
---

## Approach

There should be a tier of problems that's between easy and medium just for binary tree recursion problems. But I'll take the free medium.

All you have to do with this one is do a postorder traversal (visit children before their parents). If you make the function return the new
tree, then you can determine whether the current node is a leaf after removing the target from its children. If it is, and the target 
matches the node value, then you `return None`, otherwise, return the node as-is.

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(n)
- Space: O(n) (O(1) additional)

## Results

0.037s

## Next Steps

Need to practice iterative traversals. Easiest way to go from recursive to iterative is to simulate the stack.

## Notes

[Any additional notes]
