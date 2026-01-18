---
date: 2026-01-18
problem: daily-temperatures
source: neetcode
difficulty: medium
time_minutes: 5
topics: ['monotone-stack', 'stack']
language: python
---

## Approach

Monotone stack problem I've seen before. I can't possibly come up with a better explanation
than the video I watched to understand it the first time:

[](https://www.youtube.com/watch?v=J7Ll0I-GSwA)

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(n) 
- Space: O(n) (O(n) additional)

## Results

[Add performance metrics here, or N/A if not applicable]

## Next Steps

I made a mistake with less than or equal. I also didn't know how to reverse an iterator, or 
that enumerate can't be directly reversed. All this slowed me down and made me noob-ish

## Notes

```
# monotone stack, can go in reverse
```

