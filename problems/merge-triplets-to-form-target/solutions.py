class Solution:
    def mergeTriplets(self, triplets: List[List[int]], target: List[int]) -> bool:
        def tupleLeq(lhs, rhs):
            return all(l <= r for l, r in zip(lhs, rhs))

        def findInTriplet(triplets, pos):
            return [t for t in triplets if (t[pos] == target[pos] 
                and tupleLeq(t[:pos] + t[pos+1:], target[:pos] + target[pos+1:]))]

        return all(len(findInTriplet(triplets, i)) > 0 for i in range(3))
