---
date: 2026-01-01
problem: n-queens
source: leetcode
difficulty: hard
time_minutes: 90
topics: [backtracking]
language: python
---

## Approach

This is a pretty standard backtracking problem. You generate all the possible boards, but save only the ones
that are valid. Halfway through, I generated some binary strings as practice:

```python
def binaryStringsRec(l: int):
    result = []
    if l == 0:
        result.append([])
        return result
    for c in ['0', '1']:
        for s in binaryStringsRec(l-1):
            result.append([c]+s)
    return result

def binaryStrings(l=8):
    return [''.join(s) for s in binaryStringsRec(l)];
```

In all backtracking problems, we need a way to generate correct partial results (that are correct),
and progressively build them into full solutions. A binary string consists of 0 or 1 prepended to 
a binary string. If length is a parameter, it determines our base case. In the n-queens problem,
a valid solutions is a board where no queens are attacking each other, and our base case is when 
the number of queens is equal to the number of rows and columns on the board (because we can't 
place more).

If we can swap out the logic in the recursive helper, by enumerating and combining board positions 
instead of 0s or 1s, we'd be well on our way to generating a correct solution.

I started by thinking about my board representation. I decided to go with an unrolled list of length n*n,
as in a matrix in row major order. The two primary advantages of this approach (as opposed to a list 
of lists) is that I need only one integer as my index, and that it makes cloning easier (via slicing).
Then I started thinking of a way to generate queen moves from a queen position. It was easiest to
think of this in 2d, so I just created two small helpers to convert to and from a 2d index. And those
helpers gave me a nice opportunity to detect moves off the board as well, so I added that.

Then, in an effort to simplify things further, I wrote markQueenMoves, and made it modify an existing
board instead of returning a new board. This allowed me to not worry about combining moves from two
boards, as I might do if I were writing in a more functional style. This was a choice out of convenience.

solveNQueensRec is the meat of the logic. But that too isn't terribly complicated. You can't place a
queen on a covered square, and once you've placed a queen, if it's your last queen, you're done, and 
if it's not, you place the current queen, and then call the function again to place the remaining 
queens. We return an list because we're accumulating results, not just determining if a solution 
exists. naturally, an empty list corresponds to no solutions, which means we can combine lists using
the + operator, or via append / extend.

solveNQueens is just a wrapper for the recursive helper, and the signature required by the question.

After testing on a 9x9 board, there was just one small wrinkle -- TLE. Turns out you can't enumerate 
EVERY possible queen position as it's too inefficient. There are three levels to the inefficiency:
1) True (n^2)!/(n^2-n)! -- least efficient, but every possible enumeration counting duplicates
2) (n^2)Cn -- easy if you constrain each queen to start after the one placed before it. Cuts down by a n! factor.
3) Row-wise enumeration (just snuck me into passing). Force each queen to start on a new row, but 
    that's all. This leverages the fact that new queens should be on new rows, but there's probably
    more optimizations you could make.


## Complexity

- Time: O(n^n)
Reason: We try every row and every column at most once
- Space: O(?)
Not sure on this one. My initial thought was the number of active boards is proportional to the depth of 
recursion, so O(n^3) because each board is O(n^2) and recursion depth is O(n). But if we count the solution
size, it gets more complicated and turns into a counting problem. An upper bound for it is O(n!n!) 
(permutations of rows and columns) but that's also wildly overestimating the set of solutions that are 
valid.

## Results

119ms (5.58th percentile)
18.29MB (42.66%)

Not good, but not bad for a first hard problem after being rusty.

## Next Steps

I intend to revisit this problem. I think an approach where you slot each queen into a row, column, and 
diagonals, might lead to a faster solution.

## Notes
- pretty standard backtracking.
- i'm sure we could do some invariant stuff with eightfold symmetry, but let's keep it
- simple to start.
- brute force with backtracking.
- We'll need a way to mark off squares that are covered.
- We'll also need a way to mark off covered squares every time we place a queen.
- We could use a boolean array from 1..n^2 for this.
- but first we need a way to generate queen moves.


