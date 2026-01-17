---
date: 2026-01-16
problem: reverse-bits
source: neetcode
difficulty: easy
time_minutes: 5
topics: ['bit-manipulation']
language: python
---

## Approach

Do you know your shift operators? If you don't, you should. Remember that `<<` and `>>` have higher precedence than you'd expect -- you'll have to parenthesize if the shift is computed. But once you know
that, you're basically just reversing a little array, with different ops. Quite unique.


## Solution

::include{file="solution.py"}

## Complexity

- Time: O(n)
- Space: O(n)

I'm going to go with O(n) because the `length` of the number is proportional to its bit count. And 
time complexity is specified in terms of the length of the input. If we had to reverse a 128 bit 
number, it'd take 128 operations.

## Results

N/A

## Next Steps

I didn't do the optimal solution. But mine is pretty good.

## Notes

[Any additional notes]
