<h1>Author: Panagiotis Fiskilis/Neuro</h1>

<h2>Challenge name: CyberDefenders: HawkEye</h2>

<h3>Description:</h3>

```
An accountant at your organization received an email regarding an invoice with a download link. Suspicious network traffic was observed shortly after opening the email. As a SOC analyst, investigate the network trace and analyze exfiltration attempts.
```

<h3>Flags:</h3>

- Flag 1:```4003```

Q:<code>How many packets does the capture have?</code>

```bash
tshark -r ./stealer.pcap |wc -l
```

![](./Images/flag1.png)

- Flag 2:```2019-04-10 20:37:07 UTC```

Q:<code>At what time was the first packet captured?</code>

```bash
tshark -r ./stealer.pcap -T fields -e frame.time|head -1
```

We got the following date in EEST: Apr 10, 2019 23:37:07.129730000 EEST

We can convert EEST to UTC by decreasing by 3 the hours and get:

```
Apr 10, 2019 20:37:07 UTC
```

Finally we parse to the flag format:

```
2019-04-10 20:37:07 UTC
```

- Flag 3:

Q:<code>What is the duration of the capture?</code>

We will get the first and last timestamp(the first and last packet):

```bash
tshark -r ./stealer.pcap -T fields -e frame.time|head -1 #First packet
tshark -r ./stealer.pcap -T fields -e frame.time|tail -1 #Last packet
```

<i>NOTE:</i> We have to change the timestamps from EEST to UTC

```
Apr 10, 2019 23:37:07.129730000 EEST -> Apr 10, 2019 20:37:07 UTC
Apr 11, 2019 00:40:48.690963000 EEST -> Apr 11, 2019 21:40:48 UTC
```

In order to find the timestamp difference I wrote a quick script in python:

```python

```

- Flag 4:```00:08:02:1c:47:ae```

Q:<code>What is the most active computer at the link level?</code>

I found all the NICs inside the pcap, then I calculated the sum of packages.

Finally found for each NIC how many packages it sent and found the max number of packages.

```bash
tshark -r ./stealer.pcap -T fields -e eth.src_resolved |sort| uniq # Find all the network cards
tshark -r ./stealer.pcap -T fields -e eth.src_resolved | wc -l #4003
tshark -r ./stealer.pcap -T fields -e eth.src_resolved| grep -i "Netgear_b6:93:f1" | wc -l  #1776
tshark -r ./stealer.pcap -T fields -e eth.src_resolved| grep -i "Dell_c2:09:6a" | wc -l #234
tshark -r ./stealer.pcap -T fields -e eth.src_resolved| grep -i "HewlettP_1c:47:ae" | wc -l #1993
tshark -r ./stealer.pcap -T fields -e eth.src |sort |uniq |grep "1c:47:ae"
```

- Flag 5:```hewlett-packard```

Q:<code>Manufacturer of the NIC of the most active system at the link level?</code>

Read the solution for Flag 4 and do some googling

- Flag 6:```Palo Alto```

Q:<code>Where is the headquarter of the company that manufactured the NIC of the most active computer at the link level?</code>

Searched for:

```
hewlett-packard headquarters
```

- Flag 7:```3```

Q:<code>The organization works with private addressing and netmask /24. How many computers in the organization are involved in the capture?</code>

```bash
tshark -r ./stealer.pcap -T fields -e eth.src |sort |uniq |wc -l
```

- Flag 8:

Q:<code>What is the name of the most active computer at the network level?</code>

- Flag 9:

Q:<code>What is the IP of the organization's DNS server?</code>

- Flag 10:

Q:<code>What domain is the victim asking about in packet 204?</code>

- Flag 11:

Q:<code>What is the IP of the domain in the previous question?</code>

- Flag 12:

Q:<code>Indicate the country to which the IP in the previous section belongs.</code>

- Flag 13:

Q:<code>What operating system does the victim's computer run?</code>

- Flag 14:

Q:<code>What is the name of the malicious file downloaded by the accountant?</code>

- Flag 15:

Q:<code>What is the md5 hash of the downloaded file?</code>

- Flag 16:

Q:<code>What is the name of the malware according to Malwarebytes?</code>

- Flag 17:

Q:<code>What software runs the webserver that hosts the malware?</code>

- Flag 18:

Q:<code>What is the public IP of the victim's computer?</code>

- Flag 19:

Q:<code>In which country is the email server to which the stolen information is sent?</code>

- Flag 20:

Q:<code>What is the domain's creation date to which the information is exfiltrated?</code>

- Flag 21:

Q:<code>Analyzing the first extraction of information. What software runs the email server to which the stolen data is sent?</code>

- Flag 22:

Q:<code>To which email account is the stolen information sent?</code>

- Flag 23:

Q:<code>What is the password used by the malware to send the email?</code>

- Flag 24:

Q:<code>Which malware variant exfiltrated the data?</code>

- Flag 25:

Q:<code>What are the bankofamerica access credentials? (username:password)</code>

- Flag 26:

Q:<code>Every how many minutes does the collected data get exfiltrated?</code>
