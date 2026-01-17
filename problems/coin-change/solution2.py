class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        coins.sort()
        dp = [0] + [float('inf')] * amount
        for i in range(amount+1):
            for c in coins:
                if i+c > amount:
                    break
                dp[i+c] = min(dp[i]+1, dp[i+c])
        return dp[amount] if dp[amount] <= 10000 else -1
