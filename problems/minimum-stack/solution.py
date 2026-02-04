class MinStack:
    def __init__(self):
        self.mini = []
        self.stack = []

    def push(self, val: int) -> None:
        if len(self.mini) == 0:
            self.mini.append(val)
            self.stack.append(val)
            return
        self.mini.append(min(val, self.mini[-1]))
        self.stack.append(val)
        

    def pop(self) -> None:
        self.mini.pop()
        self.stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.mini[-1]
