---
date: 2026-01-03
problem: top-k-frequent-elemnts
source: neetcode
difficulty: medium
time_minutes: 15
topics: [array, hash-map]
language: python
---

TODO -- copy from previous solutions and update template

## Approach

TODO

## Complexity

TODO

- Time: O(?)
- Space: O(?)

## Notes

It's not immediately obvious to me how to solve this one.
After looking at hint 1 and 2, it says I'm supposed to 
group numbers based on their frequency.
it's also obvious that my solution should be O(n) time.
If we had a dictionary from frequency -> set of values,
Then I could start from the highest frequency and move down
Iterating through the range of frequency values could be expensive.
Actually, since the frequencies form a partition of n, the 
length of the list, I have to through n -> 0 to hit every
possible frequency.
And we could further optimize by using a list of sets
instead of a dictionary of sets. That would improve performance.
