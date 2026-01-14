---
date: 2026-01-14
problem: roman-to-integer
source: neetcode
difficulty: easy
time_minutes: 5
topics: [implementation]
language: python
---

## Approach

This isn't hard, it just requires some creativity to handle the edge cases. The fact that the 
roman numeral is guaranteed to be valid makes it easier too. Every character in a roman numeral
adds to the value, unless it appears to the left of something larger, in which case, it subtracts
from the one to the right of it -- this can be implemented by subtracting from a total, and iterating
in reverse so we never have to look ahead.

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(n)
- Space: O(n)

## Results

N/A

## Next Steps

No syntax errors ideally

## Notes

[Any additional notes]
