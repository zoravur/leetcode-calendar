---
date: 2026-01-15
problem: reverse-linked-list-ii
source: neetcode
difficulty: medium
time_minutes: 30
topics: [linked-list, implementation]
language: python
---

## Approach

It's not particularly complicated, just tricky. There are three main steps to this problem:

- Going to the node before the `left`th nodj in the linked list -- can be done easily using a dummy pointer approach; so that `cur.next` is the `left`th node
- Reversing the linked list
- Stitching the three pieces back together

This just requires delicate pointer surgery, which took me multiple failed attempts.

But I asked ChatGPT, and it gave me another, more elegant solution. Take for example this test case:


```
[1, 2, 3, 4, 5, 6, 7]
left = 3
right = 5
```

Expected result: 

```
[1, 2, 5, 4, 3, 6, 7]
```

Are you familiar with head insertion? Because that's the trick we're going to use.

- You can reverse a linked list by popping from the head and inserting at the head
    - It's like two stacks.
- If we keep popping the next node from the from the first node, `left`, and then inserting it 
    immediately after `left - 1`, because of the way that we encounter nodes the entire list will
    become `..., left - 1, right, right - 1, ..., left + 1, left, right + 1, right + 2, ...`
- The grand insight here is that it's all just splicing. That's why linked list ops often come
    in 4 assignments. 2 to remove (save removed node, and assing prev.next = node.next), and 
    2 to splice (set node.next and new prev.next = node).

## Solution

Two solutions this time. Number 1 (old):
::include{file="solution.py"}

Number 2 (ChatGPT):
::include{file="solution_gpt.py"}

## Complexity

- Time: O(n)
- Space: O(n)

## Results


## Next Steps

Remember this for next implementation

## Notes
