class Solution:
    def minEnd(self, n: int, x: int) -> int:

        unset_bits = ~x
        m = 0

        n = n-1
        i = 0
        for i in range(32):
            if n >> i == 0:
                break
            lowest_unset = unset_bits & -unset_bits
            if n & (1 << i):
                m |= lowest_unset
            unset_bits &= ~lowest_unset

        return x | m
