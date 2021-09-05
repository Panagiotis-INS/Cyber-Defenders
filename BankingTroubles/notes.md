# Author: Panagiotis Fiskilis/Neuro

# Challenge name:CyberDefenders:BankingTroubles

## Description: ##

```
Company X has contacted you to perform forensics work on a recent incident that occurred. One of their employees had received an e-mail from a co-worker that pointed to a PDF file. Upon opening, the employee did not notice anything; however, they recently had unusual activity in their bank account.

The initial theory is that a user received an e-mail, containing an URL leading to a forged PDF document. Opening that document in Acrobat Reader triggers a malicious Javascript that initiates a sequence of actions to take over the victim's system.

Company X was able to obtain a memory image of the employee's virtual machine upon suspected infection and asked you to analyze the virtual memory and provide answers to the questions.
```

# Solution: #

We start with some basic enumeration:

```bash
volatility -f Bob.vmem imageinfo
volatility -f Bob.vmem --profile=WinXPSP2x86 pslist |tee pslist.log
volatility -f Bob.vmem --profile=WinXPSP2x86 pstree |tee pstree.log
volatility -f Bob.vmem --profile=WinXPSP2x86 psxview |tee psxview.log
volatility -f Bob.vmem --profile=WinXPSP2x86 connscan |tee connscan.log
volatility -f Bob.vmem --profile=WinXPSP2x86 envars |tee envars.log
volatility -f Bob.vmem --profile=WinXPSP2x86 hashdump |tee hashdump.log
volatility -f Bob.vmem --profile=WinXPSP2x86 malfind |tee malfind.log 
```

**NOTE:**

```--profile=WinXPSP2x86```

# Flags:

- Flag 1: 192.168.0.176 

```bash
volatility -f Bob.vmem --profile=WinXPSP2x86 connscan |cut -d " " -f 2 |grep -v "0.0.0.0" |grep -v "127.0.0.1" |cut -d ":" -f 1 |uniq
```

- Flag 2:```Windows_NT```

```bash
volatility -f Bob.vmem --profile=WinXPSP2x86 envars |grep "OS" |cut -d " " -f 42 |uniq
```

- Flag 3:PASSWORD

```bash
volatility -f Bob.vmem --profile=WinXPSP2x86 hashdump |tee hashdump.log
john hashdump.log
```

- Flag 4: AcroRd32.exe 

Using:

```bash
volatility -f Bob.vmem --profile=WinXPSP2x86 pstree
```

And the challenge description we can guess the process name

- Flag 5:pdf

- Flag 6:212.150.164.203

```bash
cat pstree.log |grep -i "Acro" # to get the pid of the Acrobat process
cat connscan.log |grep "1752"
```

- Flag 7: ```http://193.104.22.71/~produkt/9j856f_4m9y8urb.php```

```bash
cat pstree.log |grep "svchost.exe" #To get the pid for the svchost process
mkdir dump
volatility -f Bob.vmem --profile=WinXPSP2x86 memdump -p 1040,1244,948,1100,1384,880 -D dump
strings dump/*.dmp |grep "http" |grep -i "php"|head -1
```

- Flag 8:```2010-03-29 19:31:45```

```bash
volatility -f Bob.vmem --profile=WinXPSP2x86 filescan |tee filescan.log
cat filescan.log |grep "pdf$" #nothing really special
volatility -f Bob.vmem --profile=WinXPSP2x86 memdump -p 1752 -D dump
foremost dump/1752.dmp
md5sum dump/output/pdf/* |grep "528afe08e437765cc" #full hash:f32aa81676c7391528afe08e437765cc
```
For the last step go on <code>virus total</code> and search for the full hashdump

- Flag 9:1752

```bash
cat filescan.log |grep "PDF.php"
volatility -f Bob.vmem --profile=WinXPSP2x86 malfind |tee malfind.log
cat malfind.log |grep -A 40 "Acro"
```

- Flag 10:HNQYxrFW

# Tools: #

```
https://github.com/urule99/jsunpack-n
https://github.com/jesparza/peepdf
https://stackoverflow.com/questions/29342542/how-can-i-extract-a-javascript-from-a-pdf-file-with-a-command-line-tool
```

Followed the guide from stackoverflow:

```bash
cat all-javascripts-from-my.pdf |grep "function"
cat all-javascripts-from-my.pdf |grep "eval"
```

Started analyzing the functions and got the flag

- Flag 11:XiIHG

On a Malware analysis VM I used:

<code>https://github.com/servo/mozjs</code> and <code>https://blog.didierstevens.com/programs/spidermonkey/</code> in order to evaluate the exploit and get the code from the logs

- Flag 12:```066f61950bdd31db4ba95959b86b5269```

```bash
cat pstree.log |grep "winlogon.exe" # to get winlogon pid:644
cat malfind.log |grep "winlogon.exe"
mkdir Flag12
volatility -f Bob.vmem --profile=WinXPSP2x86 malfind -D Flag12
ls Flag12/ |grep "0xa10000\|0x24990000\|0x42e60000\|0x26200000\|0x7a330000\|0x7fc00000"
rm Flag12/(ls Flag12/ |grep -v "0xa10000\|0x24990000\|0x42e60000\|0x26200000\|0x7a330000\|0x7fc00000") #note I was on fish shell in bash it is easier
md5sum Flag12/*
```

Got the hashes and searched them in virus total

- Flag 13:sdra64.exe

```bash
volatility -f Bob.vmem --profile=WinXPSP2x86 hivelist
```

After some trial and error with the <code>printkey</code> plugin I tried the <code>filescan</code> plugin:

```bash
cat filescan.log |grep "WINDOWS"|grep "system32" |grep "exe"
```

I found a weird process: <code>sdra64.exe</code> googled about it and it was the Zeusbot Malware

- Flag 14:```http://search-network-plus.com/load.php?a=a&st=Internet Explorer 6.0&e=2```

We know that both Zeus Malware and the payload infect Explorer so we will search for it

```bash
strings dump/1752.dmp |grep "http://" |grep -i "expl" |sort|uniq
```

- Flag 15:CVE-2008-2992

```bash
python2 jsunpack-n.py -v 00601560.pdf
```
