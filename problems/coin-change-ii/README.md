---
date: 2026-02-20
problem: coin-change-ii
source: neetcode
difficulty: medium
time_minutes: 25
topics: [dynamic-programmnig]
language: python
---

You are given an integer array coins representing coins of different denominations (e.g. 1 dollar, 5 dollars, etc) and an integer amount representing a target amount of money.

Return the number of distinct combinations that total up to amount. If it's impossible to make up the amount, return 0.

You may assume that you have an unlimited number of each coin and that each value in coins is unique.

## Approach

The approach I used was to use DP. My initial attempt was top-down, but that ran into space 
requirements so I switched to bottom-up. With bottom-up the approach was fairly simple, although
I did originally make the mistake of counting permutations. The key is to realize that once
you stop adding a coin, you can't go back to it, as that would generate a permutation (addition order)
that is not sorted in the initial order of the coins. By always maintaining sorted order, we don't
have to deduplicate, and simply never generate duplicate permutations in the first place.

Then the DP was straightforward. In fact, it's kind of like a Dyck path -- at each step, take one
step to the right (change coin denomination) or take one step up (add one more of the current coin).
Path counting the Dyck paths is all we need to generate our solution.

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(n * k) -- n is the amount, and is the number of coins
- Space: O(n * k) additional -- as above

## Results

60ms, 8.8MB

## Next Steps

I could try implementing a more optimal solution -- DP problems that depend only on the previous row
is a good heuristic for getting memory down.

## Notes

See solution.
