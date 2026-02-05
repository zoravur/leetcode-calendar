---
date: 2026-02-05
problem: time-based-key-value-store
source: neetcode
difficulty: medium
time_minutes: 0
topics: [array, binary-search, dictionary]
language: python
---

Implement a time-based key-value data structure that supports:

- Storing multiple values for the same key at specified time stamps
- Retrieving the key's value at a specified timestamp

Implement the TimeMap class:

- TimeMap() Initializes the object.
- void set(String key, String value, int timestamp) Stores the key key with the value value at the given time timestamp.
- String get(String key, int timestamp) Returns the most recent value of key if set was previously called on it and the most recent timestamp for that key prev_timestamp is less than or equal to the given timestamp (prev_timestamp <= timestamp). If there are no values, it returns "".

Note: For all calls to set, the timestamps are in strictly increasing order.

## Approach

Fairly straightforward, especially because O(log n) for lookup is permissible, and 
because timestamps are in strictly increasing order.

All we have to do is store the timestamp associated with each value, and that
becomes a sequence. When get is called, we just binary search the timestamps. 

Because the timestamps are nondecreasing (actually, increasing), it's guaranteed
that each subarray is sorted.

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(1) (set), O(log n) (get)
- Space: O(n) (where n is the total number of elements in the data structure)

## Results

33ms (100%), 7.9MB (100%)

## Next Steps

Could stand to read the function signatures more carefully -- I missed that the
default return should be an empty string, not null.

## Notes

N/A
