class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        # It's not immediately obvious to me how to solve this one.
        # After looking at hint 1 and 2, it says I'm supposed to 
        # group numbers based on their frequency.
        # it's also obvious that my solution should be O(n) time.
        # If we had a dictionary from frequency -> set of values,
        # Then I could start from the highest frequency and move down
        # Iterating through the range of frequency values could be expensive.
        # Actually, since the frequencies form a partition of n, the 
        # length of the list, I have to through n -> 0 to hit every
        # possible frequency.
        # And we could further optimize by using a list of sets
        # instead of a dictionary of sets. That would improve performance.

        d = collections.defaultdict(int)
        groups = [set(nums)] + [set() for _ in range(len(nums))]
        for num in nums:
            i = d[num]
            d[num] += 1
            groups[i].remove(num)
            groups[i+1].add(num)
        return [num for s in groups for num in s][-k:]
