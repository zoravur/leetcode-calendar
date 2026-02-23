class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        stack = []
        for token in tokens:
            match token:
                case '+':
                    b, a = stack.pop(), stack.pop()
                    stack.append(a + b)
                case '-':
                    b, a = stack.pop(), stack.pop()
                    stack.append(a - b)
                case '*':
                    b, a = stack.pop(), stack.pop()
                    stack.append(a * b)
                case '/':
                    b, a = stack.pop(), stack.pop()
                    stack.append(int(a / b))
                case _:
                    stack.append(int(token))
        return stack[-1]
