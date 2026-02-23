class Solution:
    def change(self, amount: int, coins: List[int]) -> int:
        # It seems like DP would be our approach here -- feels pascal-triangles / 
        # path-counting ish.
        # so, basically the problem is, how many coins does it take to make target
        # t? well that's just 

        # result = sum[change(t - coin) for coin in coins]
        # with base case 0 if t < 0 (or 1 if t == 0).

        # top down dp would be fastest atp.

        # import functools

        # @functools.cache
        # def change_rec(t, k):
        #     if t < 0:
        #         return 0
        #     if t == 0:
        #         return 1
        #     total = sum(change_rec(t - coins[i], i+1) for i in range(k))
        #     # print(t, total)
        #     return total

        # return change_rec(amount, len(coins))

        # getting stack overflow issues, whcih is surprising
        # whatever, bottom up dp it is

        dp = [[1] + [0] * amount for _ in range(len(coins))]

        for t in range(1, amount+1):
            for i in range(len(coins)):
                dp[i][t] = dp[i-1][t]
                if t-coins[i] >= 0:
                    dp[i][t] += dp[i][t-coins[i]]
        # print(dp)
        return dp[-1][amount]

