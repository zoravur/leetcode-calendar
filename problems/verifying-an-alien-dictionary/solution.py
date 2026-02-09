class Solution:
    def isAlienSorted(self, words: List[str], order: str) -> bool:
        order = {c: i for i, c in enumerate(order)}
        
        for w1, w2 in zip(words, words[1:]):
            for c1, c2 in zip(w1, w2):
                if order[c1] > order[c2]:
                    return False
                elif order[c1] < order[c2]:
                    break
            else:
                if len(w1) > len(w2):
                    return False

        return True
