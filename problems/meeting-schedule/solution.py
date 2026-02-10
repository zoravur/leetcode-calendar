"""
Definition of Interval:
class Interval(object):
    def __init__(self, start, end):
        self.start = start
        self.end = end
"""

class Solution:
    def canAttendMeetings(self, intervals: List[Interval]) -> bool:
        # Okay, we have a bunch of intervals.
        # How can we determine if any two intervals overlap?
        # What if we had a single array, of start and end times,
        # annotated with START or END? Then if there's ever two consecutive starts,
        # that means it's over.

        # Okay, I checked the recommended complexity -- nlogn n, which is exactly what I
        # expected for my solution. Time to implement.

        # for inter in intervals:
        #     start, end = inter.start, inter.end
            
        # Wait, we can literally just sort? Using a priority queue doesn't change the
        # complexity at all.

        intervals = [(inter.start, inter.end) for inter in intervals]

        intervals.sort()
        for (_, end), (start, _) in zip(intervals, intervals[1:]):
            if end > start:
                return False
        return True

        # Okay, now I can probably do some test cases.
        # First of all, let's check the examples.
        # Test case: touching
        # Test case: test case, same start, different end

        # Okay, it all passed. Time to submit.

