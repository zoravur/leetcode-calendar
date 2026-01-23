class Solution:
    def countComponents(self, n: int, edges: List[List[int]]) -> int:
        g = [[] for _ in range(n)]
        for a, b in edges:
            g[a].append(b)
            g[b].append(a)

        vis = [False] * n

        def dfs(start):
            if vis[start]:
                return False
            vis[start] = True
            for adj in g[start]:
                dfs(adj)
            return True

        total_components = 0
        for s in range(n):
            total_components += int(dfs(s))

        return total_components
