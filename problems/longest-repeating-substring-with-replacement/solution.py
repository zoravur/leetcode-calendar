class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        i = 0
        j = 0
        cnt = collections.defaultdict(int)

        maxi = 0
        while j < len(s):
            j += 1
            l = j - i
            cnt[s[j-1]] += 1
            ch = max(cnt, key=cnt.get)
            if l - cnt[ch] > k:
                i += 1
                cnt[s[i-1]] -= 1
                l -= 1
            maxi = max(maxi, l)
        return maxi
