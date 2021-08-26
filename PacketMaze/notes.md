# Author: Panagiotis Fiskilis/Neuro

# Challenge name: Cyber Defenders:PacketMaze

## Description: ##

```
As an analyst working for a security service provider, you have been tasked with analyzing a packet capture for a customer's employee whose network activity has been monitored for a while -possible insider.
```

# Solution:


# Flags:

- Flag1:AfricaCTF2021

```bash
tshark -r UNODC-GPC-001-003-JohnDoe-NetworkCapture-2021-04-29.pcapng -Y "ftp" |grep -i "pass"
```

- Flag2:fe80::c80b:adff:feaa:1db7

We used this command to get the dns names

```bash
tshark -r UNODC-GPC-001-003-JohnDoe-NetworkCapture-2021-04-29.pcapng -Y "dns" |grep "....::....:....:....:...." 
```

and then analyzed the pcapng file in wireshark

- Flag3:www.7-zip.org

We found the filter from wireshark and 'translated' it to the following tshark command

```bash
tshark -r UNODC-GPC-001-003-JohnDoe-NetworkCapture-2021-04-29.pcapng -Y "udp.stream eq 46"
```

- Flag4:10

```bash
tshark -r UNODC-GPC-001-003-JohnDoe-NetworkCapture-2021-04-29.pcapng -Y "ip.src==192.168.1.26 && ip.dst==24.39.217.246 && udp" |wc -l
```

- Flag5:c8:09:a8:57:47:93

From wireshark

- FLag6:LM-Q725K

We open wireshark, follow the ftp stream and get to the data segment of the ftp with filter:

```
tcp.stream eq 14
```

We get to the exif header and get the camera model from the meta data

- Flag7:04edcc123af7b13e90ce101a31c2f996f471a7c8f48a1b81d765085f548059a550f3f4f62ca1f0e8f74d727053074a37bceb2cbdc7ce2a8994dcd76dd6834eefc5438c3b6da929321f3a1366bd14c877cc83e5d0731b7f80a6b80916efd4a23a4d

Wireshark filter:

```
tls.handshake.session_id == da:4a:00:00:34:2e:4b:73:45:9d:73:60:b4:be:a9:71:cc:30:3a:c1:8d:29:b9:90:67:e4:6d:16:cc:07:f4:ff
```
Find the packet and go to the Pubkey field and get the flag.


- Flag8:24e92513b97a0348f733d16996929a79be21b0b1400cd7e2862a732ce7775b70

We know that the ip of protonmail.com is:185.70.41.35 from Resolved Address from wireshark and get the filter for wireshark:

```
tls && ip.dst==185.70.41.35
```

And search for the random on the TLS header from the client.

- Flag9:United States

The MAC of the ftp server is:c8:09:a8:57:47:93

Used Shodan:

```
https://www.shodan.io/search?query=c8%3A09%3Aa8%3A57%3A47%3A93
```

- Flag10:17:53

We find packet 530 and find that inside the 'home' directory is a non-standard directory the ftp directory

- Flag11:dfir.science

The user requested the ip:

|packet|ip|
|:---|---:|
|27300|172.67.162.206|


```bash
tshark -nr UNODC-GPC-001-003-JohnDoe-NetworkCapture-2021-04-29.pcapng -Y "dns.flags.response == 0" -T fields -e dns.qry.name #to get dns names
```

The first way is to do some osint work and get the ipv4

or just go to wireshark:

Statistics -> Resolved Address and get the last flag

![Flag11](./Images/flag11.png)
