---
date: 2026-01-24
problem: trapping-rain-water
source: neetcode
difficulty: hard
time_minutes: 90
topics: ['stack', 'two-pointers', 'dp']
language: python
---

## Approach

This one was harder than I expected. I expected it to fall quickly to the monotone stack, but it put up surprising resistance.
I just bashed my head against edge cases until I was able to do it successfully.

The idea is this: you store the highest boundaries seen so far in a decreasing monotone stack, and once you encounter a right
boundary that is higher than some boundary on the stack, you fill up to the lower of the two boundaries, and increase the water
level up to the height of that lower boundary. For instance, let's say you have this:

```
#   #
#   #
#@# #
    ^
```

Let's say you encounter the right boundary. `@` represents water, `#` represents wall. When we first encounter the right boundary, 
our stack looks like [0, 2] (pointing to the first and second walls). On the first stage, we pop out the first lower wall (2), and
it looks like this:

```
#   #
#   #
#@#@#
```

We set `water_line = 1`. Then, when we do the next step, we don't recount the bottom layer of water and wall (3 cells). The second step
(which is also after we exit the loop, looks like this:

```
#@@@#
#@@@#
#@#@#
```

And then we are done.


## Solution

There are much better solutions, and my code is inelegant. However, I'm first committing the minimum.

::include{file="solution.py"}

## Complexity

- Time: O(n)
- Space: O(n) (O(n) additional)

## Results

0.028s

## Next Steps

I want to try the DP approach, where you simply compute the highest boundary to the left and to the right.
I also want to try the two pointer approach, which is basically the same as DP but O(1) space by computing
the recurrence "just in time". A recurrence might not seem possible, until you realize that the water level
will alway increase monotonically before decreasing monotonically.

## Notes

[Any additional notes]
