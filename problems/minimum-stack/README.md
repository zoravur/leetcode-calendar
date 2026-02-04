---
date: 2026-02-04
problem: minimum-stack
source: neetcode
difficulty: medium
time_minutes: 5
topics: ['stack', 'data-structure']
language: python
---

Design a stack class that supports the push, pop, top, and getMin operations.

MinStack() initializes the stack object.

void push(int val) pushes the element val onto the stack.

void pop() removes the element on the top of the stack.

int top() gets the top element of the stack.

int getMin() retrieves the minimum element in the stack.

Each function should run in O(1) time.

## Approach

You have to keep track of the minimum at all times, and the minimum is computed 
to be the minimum of all the elements currently in the stack. The key is realizing
we don't need a heap or anything like that because we never actually have to remove
the smallest element. It's just a matter of dynamically updating the smallest
value. This is easy to compute inductively when growing the stack -- the min of 
the arr[1..n] is just min(arr[1..n-1], arr[n]). "Undoing" a min operation, however,
is impossible because it destroys the information of its larger argument. Therefore, we must store what the minimum was at each step. This whole thing works because
the elements come out in LIFO order -- it's guaranteed that self.mini[i-1] is always
the minimum of self.stack[0..i].

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(1)
- Space: O(n)

## Results

29ms (100%), 7.7MB (100%).

## Next Steps

None here -- I pretty much nailed this one first try.

## Notes

N/A
