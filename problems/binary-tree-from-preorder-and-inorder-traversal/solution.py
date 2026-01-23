# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    
    def buildTreeRec(self, preorder: List[int], order: Dict[int, int], cutoff: int):
        root = TreeNode(preorder[self.i])

        self.i += 1
        if self.i >= len(preorder):
            return root

        if order[preorder[self.i]] < order[root.val]:
            root.left = self.buildTreeRec(preorder, order, order[root.val])
        if self.i >= len(preorder):
            return root
        if order[preorder[self.i]] < cutoff:
            root.right = self.buildTreeRec(preorder, order, cutoff)
    
        return root
    
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        order = {v: i for i, v in enumerate(inorder)}
        self.i = 0

        return self.buildTreeRec(preorder, order, len(inorder))
