#!/usr/bin/python3
extensions=list()
with open("file","r") as f:
    for Line in f.readlines():
        data=(Line.split("<sip")[0]).split("\"")[1]
        #print(data)
        if data not in extensions:
            extensions.append(data)
print(len(extensions))