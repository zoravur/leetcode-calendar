class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        count = collections.Counter(nums)

        result = [[]]

        for num in count:
            new_result = result[:]
            for partial in result:
                for i in range(1, count[num]+1):
                    new_result.append((partial + [num] * i))
            
            result = new_result

        return result
