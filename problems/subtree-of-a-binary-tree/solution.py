# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:   
    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
    
        def treeEqual(root1, root2): 
            if root1 is None and root2 is None:
                return True
            if root1 is None or root2 is None:
                return False
            return (root1.val == root2.val and treeEqual(root1.left, root2.left) 
                        and treeEqual(root1.right, root2.right))

        if root is None and subRoot is not None:
            return False

        return (treeEqual(root, subRoot) or self.isSubtree(root.left, subRoot) 
                                    or self.isSubtree(root.right, subRoot))
