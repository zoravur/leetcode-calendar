class Solution:

    def encode(self, strs: List[str]) -> str:
        return ''.join(s for t in zip((chr(len(s)) for s in strs), strs) for s in t) + chr(255)

    def decode(self, s: str) -> List[str]:
        res = []
        while ord(s[0]) != 255:
            l = ord(s[0])
            res.append(s[1:l+1])
            s = s[l+1:]
        return res

