import bisect

class TimeMap:
    def __init__(self):
        self.d = collections.defaultdict(list)

    def set(self, key: str, value: str, timestamp: int) -> None:
        self.d[key].append((timestamp, value))

    def get(self, key: str, timestamp: int) -> str:
        arr = self.d[key]
        idx = bisect.bisect_right(arr, timestamp, key=lambda x: x[0])
        if idx-1 >= 0:
            return arr[idx-1][1]
        return ""
