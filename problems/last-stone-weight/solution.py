class Solution:
    def lastStoneWeight(self, stones: List[int]) -> int:
        heapq.heapify_max(stones)
        while True:
            l = heapq.heappop_max(stones)
            if len(stones) > 0:
                r = heapq.heappop_max(stones)
                if r == 0:
                    return l
                heapq.heappush_max(stones, l-r)
            else:
                return l

