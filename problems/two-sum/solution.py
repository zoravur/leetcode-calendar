class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seenAt = {}
        for i, num in enumerate(nums):
            if target - num in seenAt:
                return [seenAt[target-num], i]
            seenAt[num] = i
        return [-1, -1]
