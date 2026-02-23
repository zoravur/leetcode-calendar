class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        carry = 1
        i = len(digits) - 1
        while i >= 0:
            digits[i] += carry
            carry = 0
            if digits[i] == 10:
                digits[i] = 0
                carry = 1
            i -= 1
            if carry == 0:
                break
        else:
            digits = [1] + digits

        return digits
