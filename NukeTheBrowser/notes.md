**Author: Fiskilis Panagiotis/Neuro**

#Challenge name:NukeTheBrowser/lab44

*files:*

- NukeTheBrowser.pcap

**password:NukeTheBrowser.pcap**

**NOTES:**

ip.src==10.0.3.15 attacker

ip.src==10.0.3.15 && http

flags:

1:10.0.5.15 (Pure guessing)

3:HTTP (packet NO=128 sends a payload for login bypass) 

4:http://sploitme.com.cn/fg/load.php (either enum with wireshark or use NetworkMiner)

5:299 (the first time he uses google.fr)

6:osCommerce Online Merchant

(OsCommerce found a osCsid on frame.number==418)

7:366

We have to find the JS cod that is using some ind of tokens

It does not actually use tokens uses curls and files

8:CVE-2005-2127 (google: msds.dll cve)

9:e.exe

(packet==535,frame.number==535 from netminer)

10:52312bb96ce72f230f0350e78873f791

(from net miner we searched on the files section for exe and one the video.exe files had this md5 hash)

11:aolwinamp

(from the code that we extracted from frame.number==535 on the last stage of obfuscation we find this function)

12:84c090bd86

You can either deobfuscate the payload or find out that the onclick is the s value on the get parameter s=84c090bd86

13:3feb5a6b2f

enum with netminer

14:3.4.5 (tcp.stream==5/packet=203)

15:URLDownloadToFile

