**Author:Neuro/Fiskils Panagiotis**

*Challenge name:Hammered*


flags:

- 1:ssh (ssh bruteforce/hammer)

- 2:4.2.4-1ubuntu3

```
cat kern.log |grep -i "ubuntu"
```

- 3:root

```cat auth.log |less```

On the first few lines

- 4:missed

- 5:6 hackers 

```
cat auth.log |grep "Accepted"
```
Count the Ips

- 6:219.150.161.20


```
cat auth.log |grep "Accepted" |cut -d " " -f 11 |tee ../Attackers
```

To extract the Ips and It's counting time

- 7:365

First things first:
	- we sceem through the www-accesss.log file and see that all the request go to the apple server so:
	
	```
	cat www-access.log |wc -l
	```


- 8:6 Rules

```
cat auth.log |grep -i "fail"
```

We have to see the failed attempts in order tofind the hard way the fierwall rules

- 9:nmap

```
cat term.log |grep -i "nmap"
```

- 10:04/19/2010 05:56:05 AM

Apr 19 05:56:05 (from the auth.log file)

2010 (from the checkroot file)

```
cat auth.log |grep "219.150.161.20" |grep -v "Fail" |grep -v "failure" |grep -v "Invalid"
```

- 11:mysql.user contains 2 root accounts without password!

```
cat daemon.log |grep -i "mysql" |grep "WARNING"
```

Last Line.

- 12:wind3str0y

```
cat auth.log |grep "Apr 26 04:43:15"
```

- 13:pxyscand/2.1


```
cat www-access.log |grep -i "proxy"
```

|

V

http://proxyjudge1.proxyfire.net/fastenv
