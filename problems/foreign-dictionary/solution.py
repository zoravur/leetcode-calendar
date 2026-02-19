class Solution:
    def foreignDictionary(self, words: List[str]) -> str:
        # Can determine partial order by bucketing words
        # Can determine candidate total order through topological sort I think

        # Topological sorts work only on DAGs

        # It makes sense that we should have a DAG after order determining.

        nested = lambda: defaultdict(nested)

        d = nested()

        for word in words:
            cur = d
            for c in word:
                if c in cur:
                    if c != cur['last']:
                        return ''
                cur['last'] = c
                cur = cur[c]

        dicts = [d]

        chains = []
        while len(dicts) > 0:
            new_dicts = []
            for cur in dicts:
                chain = [k for k in cur if k != 'last']
                new_dicts.extend(cur[k] for k in chain)
                chains.append(chain)
            dicts = new_dicts

        # print(chains)

        g = defaultdict(list)

        for chain in chains:
            for node in chain:
                g[node]
            for s, e in zip(chain, chain[1:]):
                g[e].append(s)

        # print(g)
        
        # g (our graph. Time to topo-sort)
        result = []

        visited = set()
        def dfs(node, iteration=0):
            if node in visited:
                return
            visited.add(node)
            for adj in g[node]:
                dfs(adj, iteration)
            result.append(node)

        for node in list(g.keys()):
            dfs(node)

        # copy pasted from verify alien dict
        order = {c: i for i, c in enumerate(result)}
        
        for w1, w2 in zip(words, words[1:]):
            for c1, c2 in zip(w1, w2):
                if order[c1] > order[c2]:
                    return ''
                elif order[c1] < order[c2]:
                    break
            else:
                if len(w1) > len(w2):
                    return ''

        return ''.join(result)
