class Solution:
    def findClosestElements(self, arr: List[int], k: int, x: int) -> List[int]:
        i = 0
        j = len(arr)-1
        
        while (j - i + 1) > k:
            if x-arr[i] > arr[j]-x:
                i += 1
            else:
                j -= 1
        return arr[i:j+1]
