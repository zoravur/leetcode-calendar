---
date: 2026-02-09
problem: evaluate-reverse-polish-notation
source: leetcode
difficulty: medium
time_minutes: 25
topics: ['stack', 'arithmetic']
language: python
---

You are given an array of strings tokens that represents a valid arithmetic expression in Reverse Polish Notation.

Return the integer that represents the evaluation of the expression.

- The operands may be integers or the results of other operations.
- The operators include '+', '-', '*', and '/'.
- Assume that division between integers always truncates toward zero.

## Approach

Reverse Polish Notation is easily evaluable using a stack approach. The rightmost argument is on the 
top of the stack, and the argument to its left is the second highest item on the stack. When we
encounter an op, RPN assumes that the op applies to the rightmost two arguments. Therefore, all
we need to do is pop the top two elements as arguments, and apply the op, and push the result back
on to the stack. 

The only intricacies are 1) op order, as some operands are not commutative, and 2) a quirk of Python
that the integer division operator rounds towards negative infinity instead of truncating toward 0.
As long as you keep in mind that the first pop is the right element, and that int(a / b) is the 
idiomatic way to do a truncating division, you should be fine.

## Solution

::include{file="solution.py"}

## Complexity

- Time: O(n)
- Space: O(n)

## Results

30ms (100%), 7.9MB (100%)

## Next Steps

Remember the truncation thing. That threw me off majorly.

## Notes

N/A
