__author__ = 'Xujin'
import csv

from collections import Counter

"""
This python file clean the data from "input.csv", and then count the number of each research area.
The research areas are simplifed to five categories "Theory", "Data Science & Machine Learning", "Scientific", "Systems"
and "Informatics"
And then write to "output_profRank.csv" file.
"""

path = "input.csv"
result = []

university = set()
count = 0

# The research areas are simplifed to five categories "Theory", "Data Science & Machine Learning", "Scientific", "Systems"
# and "Informatics"

switcher = {
    "Algorithms & Theory": "Theory",
    "Machine Learning & Pattern Recognition": "Data Science & Machine Learning",
    "Bioinformatics & Computational Biology": "Scientific",
    "Compilers": "Systems",
    "Computer Education": "Informatics",
    "Computer Vision": "Data Science & Machine Learning",
    "Data Mining": "Data Science & Machine Learning",
    "Databases": "Systems",
    "Distributed & Parallel Computing": "Systems",
    "Graphics": "Informatics",
    "Hardware & Architecture": "Systems",
    "Human-Computer Interaction": "Systems",
    "Information Retrieval": "Informatics",
    "Multimedia": "Informatics",
    "Natural Language & Speech": "Data Science & Machine Learning",
    "Networks & Communications": "Systems",
    "Operating Systems": "Systems",
    "Programming Languages": "Systems",
    "Real-Time & Embedded Systems": "Systems",
    "Scientific Computing": "Scientific",
    "Security & Privacy": "Informatics",
    "Software Engineering": "Informatics",
    "World Wide Web": "Informatics",
    "Artificial Intelligence": "Data Science & Machine Learning"
}

researchArea = set()

TheoryCounter = Counter()
DataScienceCounter = Counter()
ScientificCounter = Counter()
SystemsCounter = Counter()
InformaticsCounter = Counter()

with open(path, 'r') as csv_file:
    for row in csv_file:
        line = [r.strip() for r in row.split(',')]
        if line[1] == "University":
            print "Hello"
            # print count
            continue
        university.add(line[1])
        researchArea.add(line[4])

        area = line[4]

        if switcher[area] == "Theory":
            TheoryCounter[line[1]] += 1
        elif switcher[area] == "Data Science & Machine Learning":
            DataScienceCounter[line[1]] += 1
        elif switcher[area] == "Scientific":
            ScientificCounter[line[1]] += 1
        elif switcher[area] == "Systems":
            SystemsCounter[line[1]] += 1
        elif switcher[area] == "Informatics":
            InformaticsCounter[line[1]] += 1

        count += 1

university = sorted(university)

researchArea = sorted(researchArea)

print researchArea

# Write the counted result to output csv file.
with open("output_researchArea.csv", 'wb') as f2:
    wr = csv.writer(f2)
    title = ["University", 'Theory', "DataScienceCounter", 'Scientific', 'Systems', "Informatics"]

    wr.writerow(title)
    for line in university:
        tmp = [line]
        tmp.append(TheoryCounter[line])
        tmp.append(DataScienceCounter[line])
        tmp.append(ScientificCounter[line])
        tmp.append(SystemsCounter[line])
        tmp.append(InformaticsCounter[line])

        wr.writerow(tmp)
