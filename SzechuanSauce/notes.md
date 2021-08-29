# Author: Panagiotis Fiskilis/Neuro

# Challenge name:Cyber Defenders:Szechuan Sauce

## Description: ##

```
Your bedroom door bursts open, shattering your pleasant dreams. Your mad scientist of a boss begins dragging you out of bed by the ankle. He simultaneously explains between belches that the FBI contacted him. They found his recently-developed Szechuan sauce recipe on the dark web. As you careen past the door frame you are able to grab your incident response “Go-Bag”. Inside is your trusty incident thumb drive and laptop.
```

# Flags:

- Flag1:2012 R2

```bash
sudo ewfmount 20200918_0417_DESKTOP-SDN1RPT.E01 /mnt/
strings ewf1 |grep "Windows" |grep "Server" |grep "<!" |grep ">" |less
```

- Flag2:Windows 10 Enterprise Evaluation

From autopsy

- Flag3:10.42.85.10

```bash
tshark -r case001.pcap -Y "dns" |head -1
```

- Flag4:

From the drives

```bash
mkdir mount_point1
mkdir mount_point2
mkdir mount_point3
mkdir mount_point4
```

- Flag5:RDP

From the following command we can see that the attacker is dowing an RDP brute-force

```bash
tshark -r  case001.pcap -Y "tcp" |grep "3389"
```

- Flag6:coreupdater

```bash
volatility -f citadeldc01.mem --profile=Win8SP0x64 pstree |grep ".ex"
```

- Flag7:spoolsv

```bash
volatility -f citadeldc01.mem --profile=Win8SP0x64 psscan
volatility -f citadeldc01.mem --profile=Win8SP0x64 pslist
volatility -f citadeldc01.mem --profile=Win8SP0x64 pstree
volatility -f citadeldc01.mem --profile=Win8SP0x64 psxview
volatility -f DESKTOP-SDN1RPT.mem --profile=Win10x64_19041 malfind

```

From an educated quess we find the process that tried to hide

- Flag8:194.61.24.102

From the Flag5

- Flag9:203.78.103.109

We got the coreupdater.exe from the case001.pcap file and used virus total to see the ip that it contacted

- Flag10:C:\Windows\System32\coreupdater.exe

```bash
volatility -f DESKTOP-SDN1RPT.mem  --profile=Win10x64_19041 filescan
volatility -f DESKTOP-SDN1RPT.mem  --profile=Win10x64_19041 mftparser |grep -A 10 -B 10 "coreupdater"
```

- Flag11:Metasploit

From virus total

- Flag12: 203.78.103.109 

Same as the callback

- Flag13:194.61.24.102

Pure luck

- Flag14:DESKTOP-SDN1RPT

From both wireshark and the filenames

- Flag15:Rick Sanchez

*wabalaba dabda*

- Flag16:!BETHEYBOO12!

```bash
python2 secretsdump.py -ntds ntds.dit -system SYSTEM -hashes lmhash:nthash LOCAL -outputfile hashes.txt
```

- Flag17:```SECRET_beth.txt```

From autopsy

- Flag18:Earth Beth is the real Beth

From autopsy

- Flag19:T1543.003

```
https://attack.mitre.org/groups/G0008/
```
