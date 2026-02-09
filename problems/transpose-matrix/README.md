---
date: 2026-02-05
problem: transpose-matrix
source: neetcode
difficulty: easy
time_minutes: 1
topics: ['implementation']
language: python
---

## Approach

How does the solution work? Let's step through:

```
matrix -> [[1,2],[3,4]]
zip(*matrix) -> zip([1, 2], [3, 4])
list(zip(*matrix)) -> ([(1, 3), (2, 4)]
```

This solution relies on the fact that zip accepts any number of arguments, and hence as many as the number of columns in the 
matrix. 

We convert to a list so that it doesn't return a generator. However, this returns a list of tuples (technically wrong).

If we strictly care about returning a list of lists, we must do `[list(r) for r in zip(*matrix)]`.

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(n*m)
- Space: O(n*m) -- building up a new matrix

## Results

27ms (100%), 7.9MB (96.56%)

## Next Steps

Something ergonomic for in-place too?

## Notes

N/A
