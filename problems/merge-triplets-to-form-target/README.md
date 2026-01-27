---
date: 2026-01-27
problem: merge-triplets-to-form-target
source: neetcode
difficulty: medium
time_minutes: 10
topics: ['array']
language: python
---

## Approach

The key was to realize that max is special because it is equal to its larger argument. Therefore, 
there would have to be at least one combining element where target is equal to the element in each
of the three values (repeats possible). Furthermore, as soon as you combine an element that is 
larger in at least one of the positions, that entire triplet is now worthless, as you can never
get it back down to the target. Therefore, we need elements that contain one of the numbers in 
target, but otherwise are, at worst, smaller or equal to target in the other positions. Then it was
clear that you could pick 3 such elements to create such a target, regardless of the rest of the
array. Therefore I found that finding these three elements was a both sufficient and necessary 
condition. So that's exactly what I did, in linear time. Though the implementation could use work. 
It's just a matter of iterating and filtering.

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(n)
- Space: O(1)

## Results

27ms, 7.7MB

## Next Steps

Could have solved it faster / more elegantly. I should do a second pass where I clean up my code
more often.

## Notes

