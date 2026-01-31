---
date: 2026-01-30
problem: design-twitter-feed
source: neetcode
difficulty: medium
time_minutes: 25
topics: ['hash-map', 'heap', 'merge']
language: python
---

## Approach

Two options:

1. Maintain a global list of tweets, and filter out tweets that are not followed by the current user
2. Generate a feed by merging each user's tweets as needed, only ever processing the tweets of followees to determine the top 10.

I gravitated towards the second approach because despite the efficiency of filtering a global list (which is very fast), the 
total number of tweets far exceeds the tweets for the set of followees. Furthermore, the worst case complexity would balloon
from O(f + 10log f) = O(f) to O(n), where f is the number of followers for the user and n is the number of tweets total. 
In most scenarios, f << u << n, where u is the number of users.

## Solution

::include{file="solution.py"}

## Complexity

Time:
- postTweet: O(1)
- follow: O(1)
- unfollow: O(1)
- getNewsFeed: O(u), where u is the number of users
Space:
- O(n + u), where n, and u are the number of tweets and followers

## Results

- Memory: 7.9MB
- Time: 29ms

## Next Steps

I made some mistakes because this was a real world data structure with some invalid operations. I should have handled them
better as if it was a real API, especially considering the flavour of the question.

## Notes

