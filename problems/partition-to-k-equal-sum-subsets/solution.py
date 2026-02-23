class Solution:
    def canPartitionKSubsets(self, nums: List[int], k: int) -> bool:
        # first, sum(nums) and k together determine the target for each subset.
        # second, it's a matter of hitting the target sum(nums) / k.

        # Honestly, if we could do this is linear time I'd be very impressed.
        # nlogn is pretty much the next best thing, which is equivalent to sorting 
        # in any case. And once we've sorted,

        # wait a second, even if we did sort, two pointers approach wouldn't work here.
        
        # It's kind of like two-sum, honestly. 

        # And why is the frequency of each element no more than 4? 
        # And why is nums.length only 16? Maybe we need to backtrack?

        # Let's try backtracking first, at least.

        if sum(nums) % k != 0:
            return False
        target = sum(nums) / k
        
        def recPartition(nums, i, k):
            if k == 0:
                # print("Found partition")
                return []
            if i == len(nums) or k < 0:
                return None

            res = recPartition(nums, i+1, k-nums[i])
            if res is not None:
                res.append(i)
                return res
            res = recPartition(nums, i+1, k)
            if res is not None:
                return res
            return None

        for _ in range(k-1):
            partition = recPartition(nums, 0, target)
            if partition is None:
                return False
            nums = [num for i, num in enumerate(nums) if i not in partition]

        return True
