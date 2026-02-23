class Solution:
    def jump(self, nums: List[int]) -> int:
        dp = [0] + [float('inf')] * (len(nums) - 1)
        for i in range(len(nums)):
            for j in range(min(nums[i]+1, len(nums)-i)):
                dp[i+j] = min(dp[i] + 1, dp[i+j])
        # print(dp)
        return dp[-1]
