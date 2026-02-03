class Solution:
    def majorityElement(self, nums: List[int]) -> List[int]:
        result = []
        counts = []

        for num in nums:
            try:
                idx = result.index(num)
                counts[idx] += 2
            except ValueError:
                if len(result) < 3:
                    result.append(num)
                    counts.append(2)
                else: 
                    # element not in list
                    for idx in range(len(counts)-1, -1, -1):
                        counts[idx] -= 1
                        if counts[idx] == 0:
                            result = result[:idx] + result[idx+1:]
                            counts = counts[:idx] + counts[idx+1:]

        candidates = [result[i] for i in range(len(counts)) if counts[i] >= 2]

        d = {c: 0 for c in candidates}

        for num in nums:
            if num in d:
                d[num] += 1
        return [num for num in d if d[num] > math.floor(len(nums) / 3)]


