class Solution:
    def reverseBits(self, n: int) -> int:
        print("{0:b}".format(n))
        r = 0
        for i in range(32):
            r |= ((n >> i) & 0b1) << (31-i)
        print("{0:b}".format(r))
        return r

