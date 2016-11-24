__author__ = 'Xujin'

import csv
from collections import Counter

"""
This python file clean the data from "input.csv", and then count the number of each professor rank for each university.
And then write to "output_profRank.csv"
"""


path = "input.csv"
result = []

# initialize a counter for each kind: "Full", "Associate", "Assistant"
FullCounter = Counter()
AssociateCounter = Counter()
AssistantCounter = Counter()

university = set()
count = 0

researchArea = set()

with open(path, 'r') as csv_file:
    for row in csv_file:
        line = [r.strip() for r in row.split(',')]
        if line[1] == "University":
            print "Hello"
            # print count
            continue
        university.add(line[1]) # to avoid repeat university name

        profRank = line[3]

        eachProfName = line[1]

        if profRank == "Full":
            FullCounter[eachProfName] += 1
        elif profRank == "Associate":
            AssociateCounter[eachProfName] += 1
        elif profRank == "Assistant":
            AssistantCounter[eachProfName] += 1

        count += 1

university = sorted(university) # sort the university name

# print len(researchArea)


# write to csv file
with open("output_profRank.csv", 'wb') as f2:
    wr = csv.writer(f2)
    title = ["University", 'Full', "Associate", 'Assistant']
    wr.writerow(title)

    for line in university:
        tmp = [line]
        tmp.append(FullCounter[line])
        tmp.append(AssociateCounter[line])
        tmp.append(AssistantCounter[line])

        wr.writerow(tmp)
