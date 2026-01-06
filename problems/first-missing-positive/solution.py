class Solution:
    def firstMissingPositive(self, nums: List[int]) -> int:
        for i in range(len(nums)):
            num = nums[i]
            j = num-1

            while num >= 1 and num <= len(nums) and nums[j] != num:
                nums[i] = nums[j]
                nums[j] = num
                num = nums[i]
                j = num-1

        for i in range(len(nums)):
            if nums[i] != i+1:
                return i+1
        return len(nums)+1
