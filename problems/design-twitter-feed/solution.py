import itertools

class Twitter:

    def __init__(self):
        self.following = collections.defaultdict(set)
        self.tweets = collections.defaultdict(list)
        self.timeCounter = 0

    def postTweet(self, userId: int, tweetId: int) -> None:
        self.timeCounter += 1
        self.tweets[userId].append((self.timeCounter, tweetId))

    def getNewsFeed(self, userId: int) -> List[int]:
        h = [self.tweets[followedUser][-1] + (followedUser, -1) 
            for followedUser in itertools.chain([userId], self.following[userId])
            if len(self.tweets[followedUser]) > 0]

        heapq.heapify_max(h)

        result = []

        for _ in range(10):
            if len(h) == 0:
                return result
            _, tweetId, user, idx = heapq.heappop_max(h)
            print(_, tweetId, user, idx)
            result.append(tweetId)
            if len(self.tweets[user]) < -(idx-1):
                continue
            heapq.heappush_max(h, self.tweets[user][idx-1] + (user, idx-1))

        return result

    def follow(self, followerId: int, followeeId: int) -> None:
        if followerId == followeeId:
            return
        self.following[followerId].add(followeeId)

    def unfollow(self, followerId: int, followeeId: int) -> None:
        if followerId == followeeId:
            return
        self.following[followerId].discard(followeeId)

