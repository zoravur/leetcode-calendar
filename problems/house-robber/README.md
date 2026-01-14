---
date: 2026-01-14
problem: house-robber
source: neetcode
difficulty: medium
time_minutes: 10
topics: [dynamic-programming]
language: python
---

## Approach

I've seen this one before -- it's a classic DP problem.

Every DP problem consists of two things:
1) overlapping subproblems - a problem which can be decomposed into subproblems, where each 
    subproblem is used more than once in evaluating the solution to the whole. A trivial example
    is computing x^n: it can be decomposed in terms of x^(n%2) * x^(n/2) * x^(n/2), where x^(n/2) 
    can be computed once instead of twice / reused. This is the foundation of the exponentiation 
    by squaring algorithm which computes exponents in O(log n) time.
2) optimal substructure - a problem where an optimal solution can be constructed efficiently from 
    an optimal solution to the subproblems. In this example, the optimal solution to determining 
    which houses to rob on the street can be decomposed as the problem of determining whether 
    to rob the current house or the house before it, provided all the houses to the left are 
    robbed optimally. To be more precise, assuming we know how best to rob the subarray [0, ..., i-1],
    and [0, ..., i], whether to rob the (i+1)st house depends on whether the sum from [0, ..., i] is
    larger than the sub from [0, ..., i-1] + nums[i]. Notice that we access the solution to the 
    subproblem [0, ..., i] twice, once when calculating whether to rob i+1 and once when calculating
    i+2. If we didn't cache this with our dp array, we'd run into an exponential blowup, as each 
    problem depends on two smaller subproblems. But because they overlap, we can compute the solution
    once instead of `2^recursion_depth`. And because of optimality, we are always going to rely
    on the best known solution, instead of having to select a solution that isn't as good now 
    in order to get a better one later.


## Solution

::include{file="solution.py"}

## Complexity

- Time: O(n)
- Space: O(n)

## Results

N/A

## Next Steps

- Could do well to create fewer bugs / false submissions

## Notes

N/A
