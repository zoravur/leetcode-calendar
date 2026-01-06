---
date: 2026-01-06
problem: first-missing-positive
source: neetcode
difficulty: hard
time_minutes: 30
topics: [array]
language: python
---

## Approach

This'll be a terser explanation, due to time constraints.

I started by doing the algorithm where you move each element to its corresponding sorted index, 
except that we would shift the range 1..n to 0..n-1. Then, since the first missing positive integer
would be the first mismatch, we'd immediately find the solution upon iterating through the array.

I started by moving each positive integer I encountered in the range 1..n to its corresponding index.
In order to preserve the set, I would move the integer in target index to the current position.
I spent 2 incorrect answers debugging, before I realized that I wasn't replacing the new integer
at the current position in case it was also in the range. This resulted in me missing certain
swaps that needed to happen.

But this was sufficient to get the correct answer.

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(n)
    - justification: we rotate each subsequence at most once, which means that each element is 
        compared at most twice, which means a constant number of operations per element, or O(n)
- Space: O(1) (auxiliary)
    - justification: we never create an array, or create new elements in a loop. All modifications
        happen in place, meaning that we use no extra space.

## Results

N/A (neetcode)

## Next Steps

Flesh out this explanation in more detail.
Switch to using binary search for the final step.

## Notes

[Any additional notes]
