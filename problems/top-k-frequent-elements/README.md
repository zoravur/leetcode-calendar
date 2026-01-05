---
date: 2026-01-03
problem: top-k-frequent-elements
source: neetcode
difficulty: medium
time_minutes: 15
topics: [array, hash-map]
language: python
---

This problem was harder than I expected, and it didn't occur to me immediately how to solve it,
so I started checking hints (bad, I know). The key insight is that frequencies form a partition.

Once that was clear, it was easy to organize the collection by frequency, and then select off 
the top k most frequent elements.

## Problem

> Given an integer array nums and an integer k, return the k most frequent elements within the array.
> The test cases are generated so that the solution is unique.

## Approach

The simplest solution would be to generate counts (with a dict), then convert to an array, and sort and 
extract the top k elements.

This solution works, but has a step that is O(nlogn) -- sorting the array.

How can we reduce this O(nlogn) step to O(n)? The key (no pun intended) is realizing that 
the range of frequency values are bounded -- the highest possible frequency is n itself,
because there are at most n elements in the array. It forms a partition.

That means that if we can somehow look up elements based on their frequency, we can 
just iterate from n down to 0, printing the first k elements we encounter.

Therefore, we need only to maintain a grouping of elements by their frequency (which we can hold
in an array because the key values are 0..n), which we can during the count, or after, all in 
one shot. Here, I opted to construct it incrementally, but 3 passes might have been faster.

As promised, we select the top k elements, which is what the last statement does in a more
functional style.

## Solution

::include{file="solution.py"}

## Complexity

TODO

- Time: O(n)
- Space: O(n)

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
