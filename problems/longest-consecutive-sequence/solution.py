class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        # okay, I think we'll probably have to use hashing for this.
        # We could try a strategy where I make a sequence that runs
        # like 

        starts = set()
        s = set(nums)

        for n in s:
            while n-1 in s:
                n -= 1
            starts.add(n)


        maxi = 0
        for i in starts:
            j = 0
            while i+j in s:
                j += 1
            maxi = max(maxi, j)
        return maxi
