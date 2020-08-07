#!/bin/python3

import math
import os
import random
import re
import sys

# Complete the beautifulDays function below.
def beautifulDays(i, j, k):
    res = 0
    while i <= j:
        r = reverseNr(i)
        if (abs(i - r) % k) == 0:
            res += 1
        i += 1
    return res


def reverseNr(n):
    res = 0
    while n > 0:
        remainder = n % 10
        res = res * 10 + remainder
        n = n // 10
    return res


if __name__ == "__main__":

    ijk = input().split()

    i = int(ijk[0])

    j = int(ijk[1])

    k = int(ijk[2])

    result = beautifulDays(i, j, k)

    print(result)
