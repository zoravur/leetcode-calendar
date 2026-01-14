# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def goodNodes(self, root: TreeNode, max_seen:int=float('-inf')) -> int:
        if not root:
            return 0

        total = 0
        if root.val >= max_seen:
            max_seen = root.val
            total += 1

        total += self.goodNodes(root.left, max_seen)
        total += self.goodNodes(root.right, max_seen)
        
        return total
