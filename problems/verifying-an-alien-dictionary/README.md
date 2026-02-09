---
date: 2026-02-05
problem: verifying-an-alien-dictionary
source: neetcode
difficulty: medium
time_minutes: 7
topics: [lexicographic-ordering]
language: python
---

In an alien language, surprisingly, they also use English lowercase letters, but possibly in a different order. The order of the alphabet is some permutation of lowercase letters.

Given a sequence of words written in the alien language, and the order of the alphabets, return true if and only if the given words are sorted lexicographically in this alien language.

## Approach

If you know how to sort lexicographically, you know how to check if two items are sorted. The only thing weird about this is the different ordering of the characters, but, but if you replace the key from being the char itself (which compares based 
on ascii) with the index in the order list, the problem reduces to verifying a sort.

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(n), where n is the length of the input in bytes
- Space: O(1), because the dictionary is always 26 letters.

## Results

28ms (100%), 7.7MB (100%)

## Next Steps

None.

## Notes

N/A
