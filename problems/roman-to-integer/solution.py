class Solution:
    def romanToInt(self, s: str) -> int:
        m = dict(
            I=1,
            V=5,
            X=10,
            L=50,
            C=100,
            D=500,
            M=1000
        )
        
        largest_seen='I'
        total = 0
        for c in s[::-1]:
            if m[c] < m[largest_seen]:
                total -= m[c]
            else:
                largest_seen = c
                total += m[c]
        return total
