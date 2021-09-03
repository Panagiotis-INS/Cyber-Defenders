# Author:Panagiotis Fiskilis/Neuro

# Challenge name:Cyber Defenders:XLM Macros

Solution:

First things first we setup <code>oledump.py</code> and it's plugin <code>plugin_biff.py</code>

I also added oldeump to <code>/bin/</code> for easy and fast access.

From the zip file we get 2 malware smaples:


1. sample1-fb5ed444ddc37d748639f624397cff2a.bin
2. sample2-b5d469a07709b5ca6fee934b1e5e8e38.bin

We start with some basic enumeration

```bash
file sample1-fb5ed444ddc37d748639f624397cff2a.bin
file sample2-b5d469a07709b5ca6fee934b1e5e8e38.bin
exiftool sample1-fb5ed444ddc37d748639f624397cff2a.bin
exiftool sample2-b5d469a07709b5ca6fee934b1e5e8e38.bin
```

Helpful tutorial:

```
https://www.youtube.com/watch?v=Y7IP0pksEb8
```

Anyrun text Report:

Sample2:

```
https://any.run/report/7d7f9477110643a6f9065cc9ed67440aa091e323ba6b981c1fb504fdd797535c/0c1d725b-fd2a-4bea-892a-3c0be7d143b2#registry
https://tria.ge/210212-1tv5gw7rx6
```

Sample1:

```
https://app.any.run/tasks/1088ebc8-3fe5-4f9e-b3ca-fcc4011d0f69/
```

Sample tool to unhide the hidden xls spread sheets:

```
https://gist.github.com/bontchev/8dc7f37207ba76ed71a9576ad65e0dcd
```

Flags:

- Flag 1:VelvetSweatshop

We see that the sample1 is encrypted we use:

<code>msoffcrypto-tool</code> to decrypt the file

And <code>msoffcrypto-crack.py</code> to get the password

```bash
python2 msoffcrypto-crack.py sample1-fb5ed444ddc37d748639f624397cff2a.bin
```

- Flag 2:SOCWNEScLLxkLhtJp

```bash
exiftool sample1-fb5ed444ddc37d748639f624397cff2a.bin
```

- Flag3:http://rilaer.com

We used anyrun to find the DNS requests

- Flag 4:Dridex

```bash
sudo /opt/ViperMonkey/docker/dockermonkey.sh sample2-b5d469a07709b5ca6fee934b1e5e8e38.bin
msoffcrypto-tool -p VelvetSweatshop sample1-fb5ed444ddc37d748639f624397cff2a.bin Sample1.bin
xlmdeobfuscator -f Sample1.bin
```

Searched on google:

```
what is http://rilaer.com/IfAmGZIJjbwzvKNTxSPM/ixcxmzcvqi.exe
```

And got this report:

```
https://bazaar.abuse.ch/sample/7103c9d1c2a64b80a4b69e3d91487b602fd4ede836722fa9c0daf4fe09a2b7cd/
```

- Flag 5:CSHykdYHvi

```bash
oledump sample2-b5d469a07709b5ca6fee934b1e5e8e38.bin -p /opt/oledump/plugin_biff |grep -i "sheet" |grep -i "hidden"
```

Flag 6:VBAWarnings

Found this public analysis of the malware:

```
https://www.joesandbox.com/analysis/224783/0/pdf
```

Also used oledump:

```
oledump sample2-b5d469a07709b5ca6fee934b1e5e8e38.bin -p plugin_biff |grep -A 10 "reg.exe"
```

- Flag 7:0x1

```bash
xlmdeobfuscator -f sample2-b5d469a07709b5ca6fee934b1e5e8e38.bin |grep "reg" |grep -i "open"
```

- Flag 8:GET.WORKSPACE

Well known

```bash
xlmdeobfuscator -f sample2-b5d469a07709b5ca6fee934b1e5e8e38.bin
```

- Flag9:windows

- Flag 10:DLL

We see from tools such as hybrid analysis and virus total that the malware only uses dll files

- Flag 11:```https://ethelenecrace.xyz/fbb3```

We manually opened the Sample2 file on <b><code>Libre office inside our Linux System so nobody gets infected</code></b>

And extracted a String from the malicious workbook of excel and created the file <code>malicious_download_sample2</code> with the url inside it

- Flag 12:bmjn5ef.html

See the previous description and see where the file is saved

- Flag 13:rundll32.exe

Again we get the payload from the malicious workbook and create the file <code>flag13</code>

- Flag 14:Zloader

Searched for:

```
what is https://ethelenecrace.xyz/fbb3
https://hatching.io/blog/more-excel-xlm-extraction/
```
