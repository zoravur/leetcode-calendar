class Solution:
    def trap(self, height: List[int]) -> int:
        stack = []
        total = 0
        for i, col in enumerate(height):
            water_line = 0
            while len(stack) > 0 and height[stack[-1]] < col:
                j = stack[-1]
                total += (
                    (i - j - 1) # width of in-between cells
                    * (min(height[j], height[i]) - water_line)
                )
                water_line = height[j]
                stack.pop()
            if len(stack) > 0:
                j = stack[-1]
                total += (
                    (i - j - 1) # width of in-between cells
                    * (min(height[j], height[i]) - water_line)
                )
                # print(total)
            stack.append(i)
        return total
