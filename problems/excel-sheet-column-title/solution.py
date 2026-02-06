class Solution:
    def convertToTitle(self, columnNumber: int) -> str:
        digits = []

        while columnNumber > 0:
            if columnNumber % 26 == 0:
                digits.append(26)
                columnNumber = (columnNumber - 1) // 26
            else:
                digit, columnNumber = (columnNumber) % 26, (columnNumber) // 26
                digits.append(digit)


        print(digits)
        return ''.join(chr(d + ord('A')-1) for d in digits[::-1])
