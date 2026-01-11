class Solution:
    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:

        def distance(p):
            return p[0]*p[0]+p[1]*p[1]

        h = []

        for p in points:
            d = distance(p)
            if len(h) < k:
                heapq.heappush(h, (-d, p))
            else:
                heapq.heappushpop(h, (-d, p))
            # print((d,p))

        return [p for (d, p) in h]
