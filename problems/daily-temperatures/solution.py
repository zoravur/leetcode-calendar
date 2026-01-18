class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        # monotone stack, can go in reverse:
        result = [0] * len(temperatures)
        s = []
        for i, temp in reversed(list(enumerate(temperatures))):
            while len(s) > 0 and temp >= s[-1][1]:
                s.pop()
            if len(s) > 0:
                result[i] = (s[-1][0] - i)
            s.append((i, temp))
        return result
