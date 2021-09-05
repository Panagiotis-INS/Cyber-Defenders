# Author: Panagiotis Fiskilis/Neuro

# Challenge name:CyberDefenders:AfricanFalls

## Description: ##

```
John Doe was accused of doing illegal activities. A disk image of his laptop was taken. Your task is to analyze the image and understand what happened under the hood.
```

# Flags:

- Flag 1:```9471e69c95d8909ae60ddff30d50ffa1```

```bash
cat DiskDrigger.ad1.txt |grep -i "md5"
```

- Flag 2:password cracking lists

Go to:

```
Users/John Doe/AppData/Local/Google/Chrome/User Data/Default/History
```

- Flag 3: 192.168.1.20 

Use FTK Imager for Widows, load the Image and got to:

```
Users/John Doe/AppData/Roaming/FileZila/trustedcerts.xml
```

- Flag 4:```2021-04-29 18:22:17 UTC```

Go to:

```
root/$RecycleBin
```

The password/wordlist files is the: <code>$RW9BJ2Z.txt</code>

- Flag 5:0

Go to:

```
Windows/Prefetch
```

And search for the <code>TOR</code> entry the user has only used the installers

- Flag 6:```dreammaker82@protonmail.com```

Go to:

```
Users/John Doe/AppData/Local/Google/Chrome/User Data/Default/History
```

And search for anything related to email and especially protonmail

- Flag 7:```dfir.science```

Go to:

```
Users/John Doe/AppData/Roaming/Microsoft/Windows/PowerShell/PSReadLine/ConsoleHost_history.txt
```

- Flag 8:Zambia

Go to:

```
Users/John Doe/Pictures/Contact/20210429_152043.jpg
```

We save the image and got to properties and get the Latitude and Longtitude

```
Lat:16;0;0
Long:13;0;0
```

- Flag 9:Camera

- Flag 10:```AFR1CA!```

Get the hash and use john to crack it:

```bash
john --format=NT Annon.hash
```

- Flag 11:ctf2021

Go to:

```
/Windows/System32/config/SAM
```

Open SAM.reg with <code>Registry Browser</code>

Get the NTLM hash:

<code>ecf53750b76cc9a62057ca85ff4c850e</code>

```bash
john john_hash
```
