class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        queue = [0]

        coins.sort()

        vis = set()
        num_coins = 0
        while len(queue) > 0 and queue[0] <= amount:
            new_q = []
            for total in queue:
                if total == amount:
                    return num_coins
                elif total in vis:
                    continue
                vis.add(total)
                new_q.extend(coin+total for coin in coins)
            queue = new_q
            num_coins += 1
        return -1

