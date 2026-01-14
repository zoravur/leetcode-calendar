---
date: 2026-01-14
problem: count-good-nodes-in-binary-tree
source: neetcode
difficulty: medium
time_minutes: 5
topics: [binary-tree]
language: python
---

## Approach

Binary trees problems are easy because they lend themselves to straightforward recursion.

Here, as we go down a tree, we have to determine whether we have seen any nodes larger than the 
current node. This is not hard, if we store a max per path.

Combine that with the fact that the total number of good nodes is the sum of the nodes in the two
subtrees, and all we have to do is recursively call the main function across the two subtrees.

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(n)
- Space: O(n)

## Results

N/A

## Next Steps

Got this one first try. Maybe explain it better.

## Notes

No notes.
