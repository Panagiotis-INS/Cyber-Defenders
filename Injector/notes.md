# Author: Panagiotis Fiskilis/Neuro

# Challenge name:CyberDefenders:Injector

## Description: ##

```
A company’s web server has been breached through their website. Our team arrived just in time to take a forensic image of the running system and its memory for further analysis. As a security analyst, you are tasked with mounting the image to determine how the system was compromised and the actions/commands the attacker executed.
```

## Basic Enumeration: ##

```bash
volatility -f memdump.mem imageinfo |tee imageinfo.txt
volatility -f memdump.mem --profile=VistaSP1x86 pslist |tee pslist.log
volatility -f memdump.mem --profile=VistaSP1x86 pstree |tee pstree.log
volatility -f memdump.mem --profile=VistaSP1x86 cmdline |tee cmdline.log
volatility -f memdump.mem --profile=VistaSP1x86 cmdscan |tee cmdscan.log
volatility -f memdump.mem --profile=VistaSP1x86 psxview |tee psxview.log
volatility -f memdump.mem --profile=VistaSP1x86 netscan |tee netscan.log
volatility -f memdump.mem --profile=VistaSP1x86 connscan |tee conscan.log
volatility -f memdump.mem --profile=VistaSP1x86 timeliner |tee timeliner.log
volatility -f memdump.mem --profile=VistaSP1x86 consoles |tee consoles.log
volatility -f memdump.mem --profile=VistaSP1x86 filescan |tee filescan.log
```

**Note:**
```--profile=VistaSP1x86```

# Flags:

- Flag 1:WIN-L0ZZQ76PMUF

```bash
volatility -f memdump.mem --profile=VistaSP1x86 hivelist
volatility -f memdump.mem --profile=VistaSP1x86 printkey -o 0x86226008
volatility -f memdump.mem --profile=VistaSP1x86 printkey -o 0x86226008 -K "ControlSet001"
volatility -f memdump.mem --profile=VistaSP1x86 printkey -o 0x86226008 -K "ControlSet001\Control"
volatility -f memdump.mem --profile=VistaSP1x86 printkey -o 0x86226008 -K "ControlSet001\Control\ComputerName"
volatility -f memdump.mem --profile=VistaSP1x86 printkey -o 0x86226008 -K "ControlSet001\Control\ComputerName\ComputerName"
```

- Flag 2:UTC-7 

```bash
mkdir mount_point
testdisk s4a-challenge4
cd mount_point
mkdir mp2
sudo mount -o loop image.dd ./mp2/
```

I finally used autopsy

- Flag 3:XSS

- Flag 4:6001

```bash
strings memdump.mem  |grep "build" |grep "version"
```

- Flag 5:4

```bash
volatility -f memdump.mem --profile=VistaSP1x86 hashdump |tee hashdump.log
cat hashdump.log |wc -l
```

- Flag 6:xampp

```bash
cat ps*.log|grep -i "xa"
```

For Windows the most common webserver package is xampp so we searched for it

- Flag 7:dvwa

```bash
volatility -f memdump.mem --profile=VistaSP1x86 timeliner |head
```

- Flag 8:```sqlmap/1.0-dev-nongit-20150902```

```bash
cat mount_point/mp2/xampp/apache/logs/access.log |grep "php?cmd" |grep "sql"
```

- Flag 9:hosts

Common file

- Flag 10:remotedesktop

```bash
cat cmdscan.log |grep "netsh"
```

- Flag 11:2

user1,hacker

- Flag 12:```2015-09-02 09:05:06 UTC```

```bash
cat consoles.log |grep "user1"
volatility -f memdump.mem --profile=VistaSP1x86 hivelist
volatility -f memdump.mem --profile=VistaSP1x86 printkey -o 0x87b7d008
volatility -f memdump.mem --profile=VistaSP1x86 printkey -o 0x87b7d008 -K "SAM"
volatility -f memdump.mem --profile=VistaSP1x86 printkey -o 0x87b7d008 -K "SAM\Domains"
volatility -f memdump.mem --profile=VistaSP1x86 printkey -o 0x87b7d008 -K "SAM\Domains\Account"
volatility -f memdump.mem --profile=VistaSP1x86 printkey -o 0x87b7d008 -K "SAM\Domains\Account\Users"
volatility -f memdump.mem --profile=VistaSP1x86 printkey -o 0x87b7d008 -K "SAM\Domains\Account\Users\Names"
volatility -f memdump.mem --profile=VistaSP1x86 printkey -o 0x87b7d008 -K "SAM\Domains\Account\Users\Names\user1"
```

- Flag 13:```817875ce4794a9262159186413772644```

From hashdump, the attacker used the same password for both the new accounts/users

- Flag 14:T1136.001

I searched for: <code>local Account creation persistence</code> and got:

```
https://attack.mitre.org/techniques/T1136/001/
```

- Flag 15:cmd

```bash
cd mount_point/mp2/xampp/apache/logs/
cat access.log |grep ".php?"
```

- Flag 16:```5594112b531660654429f8639322218b```

```bash
md5sum mount_point/mp2/xampp/htdocs/DVWA/*
```

- Flag 17:```192.168.56.102```

```bash
volatility -f memdump.mem --profile=VistaSP1x86 timeliner
```

- Flag 18:```4.1.0```

```bash
cat mount_point/mp2/xampp/apache/logs/access.log |grep "sqli"|grep "?id" |cut -d "=" -f 2
```

We decode the payloads and find the version
