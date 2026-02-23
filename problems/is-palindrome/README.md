---
date: 2026-02-22
problem: is-palindrome
source: neetcode
difficulty: easy
time_minutes: 3
topics: ['palindrome', 'array', 'implementation']
language: python
---

## Approach

This is fully automatic. You start from the edges and work your way in, ensuring that the furthest
match each other and get closer. To deal with the case-insensitive, non-alphanumeric-ignoring, you
just have to filter and lowercase the string. 

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(n)
- Space: O(n)

## Results

27ms, 7.7MB

## Next Steps

Could have read the question first. I made a mistake on not filtering alphanumeric characters.

## Notes

N/A
