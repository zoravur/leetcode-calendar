class WordDictionary:

    def __init__(self):
        def trie():
            return collections.defaultdict(trie)
        self.trie = trie()

    def addWord(self, word: str) -> None:
        cur = self.trie
        for c in word:
            cur = cur[c]
        cur["$"] = True


    def search(self, word: str) -> bool:
        subtrees = [self.trie]
        for c in word:
            if len(subtrees) == 0:
                return False
            new_subtrees = []
            if c == '.':
                for subtree in subtrees:
                    new_subtrees.extend(subtree[c] for c in subtree if c != "$")
            else:
                for subtree in subtrees:
                    if c in subtree:
                        new_subtrees.append(subtree[c])
            subtrees = new_subtrees
        return any(["$" in subtree for subtree in subtrees])
        

