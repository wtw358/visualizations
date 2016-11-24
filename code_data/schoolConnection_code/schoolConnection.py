"""
schoolConnection.py generates connected university names for each university.
"""
import csv
import re
import json
import numpy as np

nameList = []
originalName = []
nameMap = {}
newProfPaper = {}
NamUniversity = {}  #original name
ProfUniver = {} #map professor and university original name and its format
processName = {}  #map newName and format
authorMap = {} #name and co author
authorUni ={} #professer and author's university



with open("ProfInfo.tsv",'rb') as fName:
        freader = csv.reader(fName, delimiter="\t")
        freader.next()
        for line in freader:
            if line[1] not in nameList:
                nameList.append(line[1])
                originalName.append(line[1])
                ProfUniver[line[1]] = [line[2]]

        for i in range(len(nameList)):
            nameList[i] = re.sub(r' Jr.','',nameList[i])
            nameList[i] = re.sub(r' \(\w*\)','',nameList[i])
            nameList[i] = re.sub(r" \'\w*\'",'',nameList[i])
            nameList[i] = re.sub(r' III','',nameList[i])
            nameList[i] = re.sub(r' II','',nameList[i])
            nameMap[nameList[i]] = originalName[i]

        for name in nameList:
            cname = name.split()
            length = len(cname)
            if length == 2:
                format1 = name  #Tianwei Wang
                format2 = list(cname[0])[0] + '. ' + cname[1] #T. Wang
                processName[nameMap[name]]= [format1, format2]
            elif length > 2:
                format1 = name #'Wang Srwe Liu'
                format2 = cname[0] + ' ' + cname[length-1] #'Wang Liu'
                format3 = cname[0] + ' '
                format4 = list(cname[0])[0] + '. '
                for e in cname[1:length-1]:
                    format3 += list(e)[0] +'. '  #'Wang S. Liu'
                    format4 += list(e)[0] +'. '   #'W. S. Liu'
                format3 += cname[length-1]
                format4 += cname[length-1]
                processName[nameMap[name]]= [format1, format2,format3,format4]
            elif length == 1:
                format1 = name
                processName[nameMap[name]]= [format1]


        for key in ProfUniver:
            ProfUniver[key].append(processName[key])
        print ProfUniver #now original name: [university, format]
        with open('newProfPaper.json','r') as fjson:
            d=json.load(fjson)
            for key in d:
                if d[key] != []:
                    authorList = []
                    name = key.encode('utf-8')
                    for eachPaper in d[key]:
                        alist = eachPaper[1][2:].split(', ')
                        for author in alist:
                            authorList.append(author.encode('utf-8'))
                    authorMap[name] = authorList
                else:
                    authorMap[key.encode('utf-8')] = [] #authorMap-> {orginal name:[author1, author2]}
            uniList = []
            uniFormat = {}
            uniauthor = {}

            for key in ProfUniver:
                university = ProfUniver[key][0]
                if university not in uniList:
                    uniList.append(university)
                    uniFormat[university] = ProfUniver[key][1]
                    uniauthor[university] = authorMap[key]
                else:
                    uniFormat[university] += ProfUniver[key][1]
                    uniauthor[university] += authorMap[key]
            for key in uniFormat:
                uniFormat[key] = list(set(uniFormat[key]))
            for key in uniauthor:
                authorL = uniauthor[key]
                formatL = uniFormat[key]
                uniauthor[key] = [x for x in authorL if x not in formatL]
            uniuniauthor ={}
            uniNamelist = []
            for key1 in uniauthor:
                uniuniauthor[key1] = []
                uniNamelist.append(key1)
                for eachauthor in uniauthor[key1]:
                    for key2 in uniFormat:
                        for eachforamt in uniFormat[key2]:
                            if eachauthor == eachforamt:
                                uniuniauthor[key1].append(key2)

            uniNumber = {} #university vs its coauthor university frequency
            for key in uniuniauthor:
                uniNumber[key] = []
                for eachuni in uniuniauthor[key]:
                    uniNumber[key].append(uniNamelist.index(eachuni))
            print "result1:", uniNumber
            print "result2:", uniNamelist
