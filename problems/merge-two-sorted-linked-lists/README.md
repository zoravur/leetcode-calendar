---
date: 2026-01-07
problem: merge-two-sorted-linked-lists
source: neetcode
difficulty: easy
time_minutes: 0
topics: [linked-list, sorting]
language: python
---

## Approach

Classic merge algorithm, all you need to know is pointer manipulation. The dummy list head reduces edge cases.
Got this one on the first try.

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(n)
- Space: O(n) (O(1) additional)

## Results

N/A

## Next Steps

Shouldn't've iterated through the linked list after the main merge, because appending the head automatically appends 
the rest of the list. Meaning:
```python
while list1 is not None:
    cur.next = list1
    list1 = list1.next
    cur = cur.next

while list2 is not None:
    cur.next = list2
    list2 = list2.next
    cur = cur.next
```
should have been:
```python
if list1:
    cur.next = list1
else:
    cur.next = list2
```

## Notes

None.
