# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def lowestCommonAncestor(self, root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
        result = None

        def lca_rec(cur: TreeNode, p: TreeNode, q: TreeNode):
            nonlocal result
            if cur is None or result is not None:
                return 0
            
            is_target = cur.val == p.val or cur.val == q.val
            
            num_seen = sum([is_target, lca_rec(cur.left, p, q), lca_rec(cur.right, p, q)])
            
            if result is not None:
                return 0

            if num_seen == 2:
                result = cur
            return num_seen
        
        lca_rec(root, p, q)
        return result
