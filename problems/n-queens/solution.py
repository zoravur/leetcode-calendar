from typing import List

class Solution:
    DIRS = [
        (-1, -1),
        (0, -1),
        (1, -1),
        (-1, 0),
        (1, 0),
        (-1, 1),
        (0, 1),
        (1, 1),
    ]

    def to_2d(self, k, n):
        return k // n, k % n

    def from_2d(self, i, j, n):
        if not (0 <= i and i <= n - 1 and 0 <= j and j <= n - 1):
            return -1
        return i * n + j

    def markQueenMoves(self, k, n, board):
        i, j = self.to_2d(k, n)

        for d in self.DIRS:
            x, y = i, j
            while self.from_2d(x, y, n) != -1:
                board[self.from_2d(x, y, n)] = True
                x, y = x + d[0], y + d[1]
        # print(board)
        return board

    def solveNQueensRec(self, n: int, m: int, board: List[int], covered):
        result = []
        for j in range((n-m)*n, (n-m)*n+n):
            b = board[:]
            if covered[j] == True:
                continue
            b[j] = True

            if m == 1:
                result.append(b)
            else:
                result.extend(
                    self.solveNQueensRec(
                        n, m - 1, b[:], self.markQueenMoves(j, n, covered[:])
                    )
                )
        return result

    def formatBoard(self, board, n):
        return '\n'.join(''.join('Q' if x else '.' for x in board[i*n:i*n+n]) for i in range(n))

    def solveNQueens(self, n: int) -> List[List[str]]:
        # pretty standard backtracking.
        # i'm sure we could do some invariant stuff with eightfold symmetry, but let's keep it
        # simple to start.
        # brute force with backtracking.
        # We'll need a way to mark off squares that are covered.
        # We'll also need a way to mark off covered squares every time we place a queen.
        # We could use a boolean array from 1..n^2 for this.
        # but first we need a way to generate queen moves.

        return [
            self.formatBoard(sol, n).split('\n')
            for sol in self.solveNQueensRec(
                n, n, [False] * (n * n), [False] * (n * n)
            )
        ]

