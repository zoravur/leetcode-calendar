---
date: 2026-01-02
problem: anagram-groups
source: neetcode
difficulty: medium
time_minutes: 10
topics: ["hash-map", "string"]
language: python
---

## Approach

This problem is mostly about clean implementation once you know that the best way to determine
anagrams is by counting characters. There's the added wrinkle that your counts object is not
hashable, which means it's hard to group strings based on them having the same counts. But 
that's easy if you either use a frozenset, which allows you to hash non hashable types, or you
do what I did, and convert the unhashable type to a canonical string directly.

I could have also used python Counters, to make it even easier, but I haven't fully memorized 
the API so I thought it'd be better if I stuck to less powerful approaches.

collections.defaultdict is very powerful though, and worth learning.

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(n)
- Space: O(n)

## Results

N/A (NeetCode)

## Next Steps

There's a little bit of inconsistency with the APIs used, as I threw in 
collections.defaultdict to fix a bug with key generation. Sticking to something simpler 
despite the annoyance, or going all out with all the upgraded APIs, would probably be better.

Claude suggested I used tuple() instead of string generation, for a few reasons:
- Hashing — Tuples of ints hash directly. Strings require hashing each character, and your string is longer (commas, multi-digit numbers) than a 26-int tuple's logical content.
- String building — ','.join(...) creates intermediate strings and a generator. tuple(counts) on a list is a single C-level copy.
- Memory — "0,0,0,3,0,..." takes more bytes than (0,0,0,3,0,...) since each digit is a character.

Will try to remember tuples for future problems.

## Notes

N/A
