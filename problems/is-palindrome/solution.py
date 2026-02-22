class Solution:
    def isPalindrome(self, s: str) -> bool:
        s = ''.join(c for c in s.lower() if 'a' <= c <= 'z' or '0' <= c <= '9')
        i = 0
        j = len(s) - 1
        while i < j:
            if s[i] != s[j]:
                return False
            i += 1
            j -= 1
        return True
