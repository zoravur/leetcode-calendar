class Solution:
    def addBinary(self, a: str, b: str) -> str:
        a = '0' * (max(len(a), len(b)) - len(a)) + a
        b = '0' * (max(len(a), len(b)) - len(b)) + b

        result = []
        carry = 0
        for d1, d2 in zip(a[::-1], b[::-1]):
            total = int(d1) + int(d2) + carry
            if total >= 2:
                total -= 2
                carry = 1
            else:
                carry = 0
            result.append(total)
        if carry:
            result.append(carry)
        
        return ''.join(str(d) for d in result[::-1])
