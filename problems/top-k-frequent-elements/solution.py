class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        d = collections.defaultdict(int)
        groups = [set(nums)] + [set() for _ in range(len(nums))]
        for num in nums:
            i = d[num]
            d[num] += 1
            groups[i].remove(num)
            groups[i+1].add(num)
        return [num for s in groups for num in s][-k:]
