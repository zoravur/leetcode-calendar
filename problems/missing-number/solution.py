class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        for i in range(len(nums)):
            while nums[i] < i:
                nums[nums[i]], nums[i] = nums[i], nums[nums[i]]
        for i in range(len(nums)):
            if nums[i] != i:
                return i
        else:
            return len(nums)
