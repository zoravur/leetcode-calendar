---
date: 2026-01-31
problem: minimum-array-end
source: neetcode
difficulty: medium
time_minutes: 35
topics: ['bit-manipulation']
language: python
---

## Problem

You are given two integers n and x. You have to construct an array of positive integers nums of size n where for every 0 <= i < n - 1, nums[i + 1] is greater than nums[i], and the result of the bitwise AND operation between all elements of nums is x.

Return the minimum possible value of nums[n - 1].


## Approach

This one was tricky. But all you have to do is realize that every number must include the bits of x,
otherwise the and operation will fail. Then you need to realize that we always want to pick the 
smallest integer bigger than the current which has the bits of x. The smallest such element is x,
so our first element is always x and any AND operation that includes extraneous bits (besides the 
ones in x) will be removed from the final result. This means that we can set the remaining bits
however we like, but it's best to do it in a way that always picks the smallest integer.

How do we do that? Well, the bits in x are constrained (forced to be 1). Furthermore, among the 
remaining bits, we should "count up in binary". Doing so will give us the smallest final result 
because the ordering of integers corresponds to the lexicographic ordering of their binary strings.

This is the same trick that allows string timestamps to be compared.

So, how do we actually "count up in binary"? Well, all we need is the (n-1)th, element, which will
have the remaining bits (in lexicographic order) set according to the bits of n-1 among the bits
not set in x. Then it's a matter of implementation -- how do shift the bits in n-1 so that each 
place value is shifted left the appropriate amount to a bit not set in x? I used a loop for this.

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(n)
- Space: O()

## Results

[Add performance metrics here, or N/A if not applicable]

## Next Steps

- Memorize the "first set bit" trick -- I had to look it up.

## Notes

```
The smallest number will be x (it has to be).
Beyond that, we are setting bits which are not already set.

First example:
n = 011, x = 010, unset bits = 101, n - 1 = 010, 
aligned:
n - 1: 1 0
unset: 101
010
011
110

Second example:
n = 101, x = 011
00011
00111
01011
01111
10011
```
