# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseBetween(self, head: Optional[ListNode], left: int, right: int) -> Optional[ListNode]:
        dummy = ListNode(next=head)
        
        cur = dummy

        for _ in range(1, left):
            cur = cur.next

        l = cur.next

        p = cur
        r = cur.next
        for _ in range(right - left + 1):
            tmp = r.next
            r.next = p
            p = r
            r = tmp
        else:
            l.next = r
            cur.next = p
        return dummy.next
        
