# Author: Panagiotis Fiskilis/Neuro

# Challenge name: Cyber Defenders:Ulysses

# Solution:

```bash
mkdir mount_point
sudo mount -o loop victoria-v8.sda1.img mount_point/
sudo cat mount_point/var/log/auth.log |grep ""
```

# Flags:

- Flag1:ulysses

```bash
sudo cat auth.log |grep "user"
```

- Flag2:32

```bash
sudo cat auth.log |grep -i "failed"|wc -l
```

Without adding the null login

- Flag3:Debian GNU/Linux 5.0

```bash
cat /etc/issue.net
```

- Flag4:192.168.56.102

```bash
python2 volatility/vol.py -f victoria-v8.memdump.img --profile=LinuxDebian5_26x86 linux_netstat
```

- Flag5:192.168.56.1,192.168.56.101

```bash
python2 volatility/vol.py -f victoria-v8.memdump.img --profile=LinuxDebian5_26x86 linux_netstat
```

- Flag6:2169

```bash
python2 volatility/vol.py -f victoria-v8.memdump.img --profile=LinuxDebian5_26x86 linux_pslist |grep "nc"
```

- Flag7:exim4

```bash
python2 volatility/vol.py -f victoria-v8.memdump.img --profile=LinuxDebian5_26x86 linux_psaux
```

- Flag8:CVE-2010-4344

```
https://www.cvedetails.com/cve/CVE-2010-4344/
```

A simple google search for: <code>exim4 cve 2010</code>

- Flag9:rk.tar

```bash
sudo ls mount_point/tmp/
```

- Flag10:8888

```bash
python2 volatility/vol.py -f victoria-v8.memdump.img --profile=LinuxDebian5_26x86 linux_netstat
```

- Flag11:45295

```bash
cd mount_point/tmp/
sudo tar xvf rk.tar
cd rk
cat install.sh |grep "port"
```
