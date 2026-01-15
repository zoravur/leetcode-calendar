---
date: 2026-01-15
problem: design-word-search-data-structure
source: neetcode
difficulty: medium
time_minutes: 20
topics: ['trie']
language: python
---

## Approach

It's like a trie. The only wrinkle is '.' means that you need to follow all paths at the position
you're currently at. If you generalize the trie to a set of tries, not worrying about duplication
because it's a tree, you can just iterate through every letter and maintain a solution set, 
rejecting when there's no branch to take.

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(m)
- Space: O(m)

## Results

N/A

## Next Steps

Could stand to test my code better. I missed an edge case where we don't extend to '$'.

## Notes

N/A
