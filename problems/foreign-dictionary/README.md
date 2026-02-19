---
date: 2026-02-19
problem: foreign-dictionary
source: neetcode
difficulty: hard
time_minutes: 56
topics: ['lexicographic-ordering', 'topological-sort']
language: python
---

## Approach

The approach here is to first determine a partial order based on the items in the dictionary.
Obviously, the orders in which the first letter of each word appears corresponds to the order of 
the dictionary. Similarly, at each level, we group the words by common prefix up to i, and then
compare the i'th letter. This way, we generate every implied order in the dictionary.

We take each ordering implied by the dictionary (call it a chain), and generate a dependency graph
from it. This can then be used in a standard topological sort, which will tell us a candidate 
ordering.

Lastly, we verify the ordering, because the solution that I came up with will generate an invalid
order if the test case is invalid. A quick and dirty way to do this is to verify the candidate 
ordering again. If the validation fails, there must not be any valid ordering, because the algorithm
is guaranteed to generate a valid one if it exists.

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(n*m), where n, m are the number and length of words, respectively
- Space: O(n)

## Results

[Add performance metrics here, or N/A if not applicable]

## Next Steps

Solution is quite slow, could be significantly faster

## Notes

See solution
