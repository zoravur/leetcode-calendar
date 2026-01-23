---
date: 2026-01-19
problem: binary-tree-from-preorder-and-inorder-traversal
source: neetcode
difficulty: medium
time_minutes: 0
topics: [binary-tree]
language: python
---

## Approach

This was a tricky one, with multiple failed submissions (although, I do think that I should partly blame the broken tester. I will have to start creating my own 
harness eventually).

The idea is this: use the inorder traversal + a hashmap to decide whether any two nodes should appear before or after each other in the binary tree. Then, use the preorder
traversal to construct the root, then the left subtree, then the right subtree, yielding if the current node ever appears to the right of the parent.

In other words, consume as many nodes as possible, and then return with the constructed tree, and a pointer to the remainder of the preorder nodes.

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(n)
- Space: O(n)

## Results

[Add performance metrics here, or N/A if not applicable]

## Next Steps

I do need to learn how the tester works. Also, I need to start maintaining my own solution set, and my own testing harness, because I can't afford errors on real coding challenges.

## Notes

[Any additional notes]
