---
date: 2026-01-08
problem: valid-parenthesis-string
source: neetcode
difficulty: medium
time_minutes: 30
topics: [stack, string, implementation]
language: python
---

## Approach

TODO

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(?)
- Space: O(?)

## Results

N/A

## Next Steps

Try the "superposition" solution -- reproduce from memory (max_depth & min_depth within a range)

## Notes

```
'()(())'
 ( -> 1
 ) -> 0
 ( -> 1
 ( -> 2
 ) -> 1
 ) -> 0

 ')('
 ) -> -1 (not allowed, return false)

((**)
((())

 can never go below 0
 ( -> increase depth by 1
 ) -> decrease depth by 1
 * -> increase "tolerance" by 1 (meaning we can tolerate -1 as a balance now)
   # justification
   # if balance was negative, we are treating it as a left paren
   # if balance is positive at the end, we can treat it as a right paren.
   # otherwise we can ignore it.

 ")(*"
 * -> t = 1
 ) -> d = -1 (implication: * is now '(')
 ( -> d = 0 (implication: * is now '')

 Idea is, we "use up" tolerance if we ever go below positive depth.

 if d is invalid:
   # use tolerance if possible, otherwise keep going, and convert tolerance
   # to empty strings at the end.
```
