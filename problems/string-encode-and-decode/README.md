---
date: 2026-01-04
problem: string-encode-and-decode
source: neetcode
difficulty: medium
time_minutes: 10
topics: ["string", "design"]
language: python
---

## Problem

Design an algorithm to encode a list of strings to a string. The encoded string is then sent over the network and is decoded back to the original list of strings.


## Approach

First approach was to cheat a bit, just to see if it would work. `repr()` converts a python value to a
string that evaluates to the original value. Then, ast.literal_eval on the other side is the 
"inverse" of repr that definitely works for relatively simple things like lists of strings.

How does repr and ast.literal_eval encode values as python objects? Fundamentally, the core problem with 
any parsing task such as this is separating the data from the metadata. How do you know if something is 
a value or not? That's done through program state. Roughly, here's the matrix:

+---------------------+----------------------------------------------------------------------+------------------------------------------------------------+
| Expecting \ Actual  | Data                                                                 |  Metadata                                                  | 
+---------------------+----------------------------------------------------------------------+------------------------------------------------------------+
| Data                | Normal parse                                                         |  dropped headers / fields; bad state, security risk likely |
| Metadata            | Direct injection risk, very bad. User controls program control flow  |  Normal parse                                              |
+---------------------+----------------------------------------------------------------------+------------------------------------------------------------+

Because we control both the encoder and the decoder, we can easily sync the initial state. We can either start with data/data,
or metadata/metadata. How do we pick which is better?

Suppose we chose our algorithm to start on data/data. Great. We start transmitting the string, one
character at a time. How do we know when the next string begins? We could emit a special character 
sequence, called a delimiter. but the problem is that the string itself could contain any possible
ascii sequence! That makes it impsosible to tell whether the delimiter represents the end of the 
string, or is part of the string itself.

Here, one possible approach is try to make this work by mapping some characters onto two character 
sequences -- we call this "escaping". For instance, we could say that strings are null terminated,
always ending in `chr(0)`, or `'\0'`. But then, what happens if `chr(0)` is in the string itself? Then,
we would escape, letting `"\\0"` represent the null terminator if it's in a string. But then what 
about `'\'` itself? Well, we would map that one to `'\\'`. Now, `'\'` is a special character that determines
how the next character is processed, and `chr(0)` actually never appears directly in the strings 
themselves.

This is complicated! Luckily, there is a simpler approach, which is what I used. If we switch to
metadata/metadata to start, we can include everything needed to process the first string right at 
the beginning. If we prefix each string with its length, we can process the following data 
up to that length, before switching back to processing metadata. here's what I mean:

```
["Hello", "world"] -> [5Hello5world]
```

Decoding, we read off the number at the start, process that many characters and append it to our list,
which reverses the above.

There's some problems with this approach. How do we know when the number ends? What if 
the string starts with a number, For instance, take the following cases:

```
["verylongstring", "wow"] -> 14verylongstring3wow
["1337", "speak"] -> 413375speak
```

In the first example, we read off multiple digits to handle a string over 9 characters. All's well and good,
we can just stop parsing after the first non-digit. But as soon as we try to implement that, the second 
case bites us: we try to read a string of length 413375, not knowing that the first string actually
consists of the numbers "1337".

Here, we need only introduce a separator between the number and the string it represents. ',' works fine
-- it unambiguously signals the end of the number.

This works and is the most flexible approach, but it's a bit annoying that the number spans multiple characters. 
So, I noticed that the max string length was 200 <= 255 = 2^8-1, the max size of a char, meaning we could use a 
single character to store the length.

So that's how my solution deviates. I use a single char/byte anyway, relying on the fact that strings are at most
200 characters long. But even if we allowed infinite length strings, the previous approach still works.

I also add a 255 as a control character to determine the end of the sequence. This is not required for the
problem, as we have the full string and can check if the string is empty. But in real network scenarios,
we might run into a situation where we are streaming data and it's not obvious that the data is finished.
Which is why I included that.


## Solution

::include{file="solution.py"}

## Complexity

- Time: O(n)
- Space: O(n)

## Results

N/A (neetcode)

## Next Steps

Need to improve explanation. Should get better at talking and start recording self.

## Notes

No notes this time. Straight to implementation.
