---
date: 2026-02-06
problem: excel-sheet-column-title
source: neetcode
difficulty: medium
time_minutes: 30
topics: ['modulus', 'base-conversion', 'ascii']
language: python
---

## Approach

I had two incorrect submissions before the correct one, and many, many failed test
cases. I'm not sure I'm qualified to explain the solution I pretty much found
by trial and error. The idea is just to notice that to compute digits, we're
basically trying to find a number in base 26, except for the fact that the 26th 
number (which normally corresponds to "10", actually corresponds to "Z" (single digit), and there is no analog for 0. Basically, the way I solved this, is instead of 
having a "0" digit in case the modulus was equal to 0, I actually had a special
case which would take off an additional 26 in order to create a 0 digit. This way,
we rolled over at 27 (which is what we want) instead of 26. This way, we actually
never return "0" as a digit, and this is evidenced by the fact that ord('A') has 1
subtracted from it -- if d were 0 then we would get the ascii character before 'A'
which is not a letter at all.

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(log n) (base 26!)
- Space: O(log n)

## Results

27ms (100%), 7.7MB (99.39%)

## Next Steps

I will need to resolve this to get a better understanding of it.

## Notes

N/A
