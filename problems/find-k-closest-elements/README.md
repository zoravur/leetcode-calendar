---
date: 2026-02-01
problem: find-k-closest-elements
source: neetcode
difficulty: medium
time_minutes: 5
topics: ['array', 'two-pointers']
language: python
---

## Problem

You are given a sorted integer array arr, two integers k and x, return the k closest integers to x in the array. The result should also be sorted in ascending order.

An integer a is closer to x than an integer b if:

|a - x| < |b - x|, or
|a - x| == |b - x| and a < b

[](https://neetcode.io/problems/find-k-closest-elements/question)

## Approach

It's a two pointers problem. You can tell this because the array is sorted. 
All you have to do is find the subarray that is closest to x. You start from the outside and work
your way in, stopping when your subarray is size k. At each step, you reject whichever element
is further from x. You continue until your segment is size k. Because the element rejected is always
the one furthest away from x, and our subarray initially includes all elements, by rejecting n-k, 
you guarantee that the remaining k are all the closest to x.

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(n)
- Space: O(1)

## Results

28ms, 8.7MB, beats 100%

## Next Steps

I think I could have explained this better

## Notes

[Any additional notes]
