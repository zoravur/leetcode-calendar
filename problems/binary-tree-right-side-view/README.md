---
date: 2026-01-11
problem: binary-tree-right-side-view
source: neetcode
difficulty: medium
time_minutes: 5
topics: [binary-tree, recursion]
language: python
---

## Approach

If we do a preorder traversal, but start with the right subtree, then the rightmost node at every
level will be the node that we first encounter. Also, because we always encounter a parent before its child, it's enough to monotonically extend the list if we encounter a new node at a depth greater 
than the max depth of the current list (which is equal to its length - 1).

Then it's just a matter of doing a preorder traversal with the right subtree first.

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(n)
- Space: O(n) (O(n) additional worst case, O(log n) on average)

## Results

N/A

## Next Steps

None. This one was pretty easy. For the explanation, I clicked into the solution because I was 
a little confused about the test case generation. I need to stop doing that.

## Notes


