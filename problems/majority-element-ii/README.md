---
date: 2026-02-03
problem: majority-element-ii
source: neetcode
difficulty: medium
time_minutes: 54
topics: ['array', 'hash-map', 'counting']
language: python
---

## Problem

You are given an integer array nums of size n, find all elements that appear more than ⌊ n/3 ⌋ times. You can return the result in any order.

## Approach

This one was kinda hard and ad-hoc. I had one failed submission. I don't know how I would explain
how I did this beyond acknowledging that it's a balance problem. The elements which appear
more than a third of the time necessarily dominate all the other elements. The size of the hashmap
actually compensates for the reduced frequency of each individual element.

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(n)
- Space: O(1)

## Results

- 58ms (100%)
- 9.2MB (100%)

## Next Steps

Memorize the solution. I honestly don't see a better way of doing this.
I guess I could spend more time refining my implementations. I usually stop after test cases pass.
1 failed attempt.

## Notes

```
# Start time: 8:12AM
# Finish time: 9:06AM

# seems like a "balance" problem.
# because greater than a third is a sufficiently high fraction to be suspicious.
# What would we do if we had to find all elements that appear more than 
# half the time?

# If any element appears more than half the time, it is sufficient to "annihilate"
# all other elements. So the question becomes, if we have a candidate, like
# [3,4,2,2,2]
# or 
# [2,2,3,4,2]
# Is it possible to make it so that each of the twos, "annihilate" all the others?
# If we stored a "candidateNum", and "balance" (AND "total_seen"), we can determine
# whether the current most seen element represents a balance greater than a half.

# I've convinced myself that a solution is possible.

# Now, how would things change for the three case?
# Well, there are three real cases; we need an algorithm for all 3:
# 1) No dominant element
#   - Come back to this
# 2) One dominant element 
#   - Has to appear with fraction greater than 1/3rd.
#   - If we always remove from the smaller element, then the 2nd and 3rd 3rd 
#     annihilate each other, leaving the first third full.
#   - What happens if there were really 2 dominant elements?
# 3) Two dominant elements
#   - Well, in that case, 2 alone is sufficient to overpower the rest, _provided_
#       1 really does dominate the rest of the elements.

# Regarding the no dominant element case:
# If we always eliminate from the smaller candidate, protecting the other, it's possible for 
# something not representing a 1/3rd fraction to rise to the top.

# For instance, take this example:
# [1,1,2,3,2,4,2,5,2,6,2,7]
# 2 is the only dominant element. But 1 has positive balance. So that won't work.

# Additionally, we can't keep track of 2s because the balance keeps hitting 0.
# That means that you _have to_ alternate because otherwise the other element never
# gets rotated out.

# Okay, what happens if you always target the one with more?
# [1, 1, 2, 3, 4, 2, 2] 3 > 2 = floor(7/3) -> 2 dominant
# Here, we eliminate 1, then 1 (or 2), and then if we eliminate 1, then 2 can come, but 
# 2 will always be in the final total.
# But one might also be in the final total. 

# Wait, what if you always subtracted oldest added? That doesn't seem right.

# Okay, I'm confusing myself atp. Let's just try to implement something.
```
