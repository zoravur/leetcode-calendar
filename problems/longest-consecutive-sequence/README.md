---
date: 2026-01-19
problem: longest-consecutive-sequence
source: neetcode
difficulty: medium
time_minutes: 30
topics: [arrays, hash-map]
language: python
---

## Approach

This one honestly stumped me. I was worried about the order in which I see elements, and it didn't occur to me that I could just use the fact 
that the next element in the sequence was always going to be 1+the current element, which meant I could do an O(1) set lookup to extend a sequence.

Once that was clear to me, I just had to find a way to find the starting element of every sequence.

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(?)
- Space: O(?)

## Results

[Add performance metrics here, or N/A if not applicable]

## Next Steps

[Future improvements or learnings]

## Notes

```
# okay, I think we'll probably have to use hashing for this.
# We could try a strategy where I make a sequence that runs
# like 
```
