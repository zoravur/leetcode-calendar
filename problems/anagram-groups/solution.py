class Solution:
    def countsToKey(self, d: dict) -> str:
        return ','.join(str(d[chr(ord('a')+i)]) for i in range(26))

    def strToCounts(self, s: str) -> dict:
        d = collections.defaultdict(int)
        for c in s:
            d[c] += 1
        return d

    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        d = {}
        for s in strs:
            k = self.countsToKey(self.strToCounts(s))
            if k not in d:
                d[k] = []
            d[k].append(s)
        return list(d.values())
