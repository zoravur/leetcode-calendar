# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        
        rightView = []

        def rightSideViewRec(cur: Optional[TreeNode], depth=0):
            nonlocal rightView

            if not cur:
                return

            if depth >= len(rightView):
                rightView.append(cur.val)

            rightSideViewRec(cur.right, depth=depth+1)
            rightSideViewRec(cur.left, depth=depth+1)
        
        rightSideViewRec(root)

        return rightView
            




