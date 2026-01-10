class Solution:
    def checkValidString(self, s: str) -> bool:
        d = 0
        t = 0

        for c in s:
            if c == '(':
                d += 1
            if c == '*':
                t += 1
            if c == ')':
                if d > 0:
                    d -= 1
                elif t > 0:
                    t -= 1
                else:
                    return False
        if d - t > 0:
            return False

        d = 0
        t = 0
        for c in s[::-1]:
            if c == ')':
                d += 1
            if c == '*':
                t += 1
            if c == '(':
                if d > 0:
                    d -= 1
                elif t > 0:
                    t -= 1
                else:
                    return False
        if d - t > 0:
            return False


        return True
