---
date: 2026-02-09
problem: longest-repeating-substring-with-replacement
source: neetcode
difficulty: medium
time_minutes: 30
topics: ['sliding-window', 'hash-map']
language: python
---

You are given a string s consisting of only uppercase english characters and an integer k. You can choose up to k characters of the string and replace them with any other uppercase English character.

After performing at most k replacements, return the length of the longest substring which contains only one distinct character.

## Approach

Sliding window. The core realization is that a window is valid if difference between the frequency 
of the most frequent character and the size of the window is less than or equal to k. Therefore, 
all we need to do is grow the window until the first point that the window is invalid. After that,
we shrink the window by increasing the left pointer (i). This will iterate through the largest 
possible window covering each index. At every iteration, we also must check if the current window
size is greater than the greatest size seen so far. 

I missed one optimization which actually changes the complexity -- I will discuss that in next steps.

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(nk)
- Space: O(k)

## Results

28ms (100%), 7.8MB (100%)

## Next Steps

Notice the extra k factor in the time complexity. This can be reduced by realizing that the maximum
seen window size is simply k + the frequency of the most frequent element. Therefore, we can 
monotonically check if the current frequency of the added character is larger than the largest. 
Even if the frequency drops below the highest seen frequency, the fact that the previous window is 
larger than the current window guarantees that the maximum will not be affected. Only when we see 
a new, higher max frequency do we need to update our result, which is precisely when the maximum 
frequency increases.

## Notes

N/A
