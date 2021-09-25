# Author: Panagiotis Fiskilis/Neuro

# Challenge name:Cyber Defenders:Intel101

## Description: ##

```
Open-source intelligence (OSINT) exercise to practice mining and analyzing public data to produce meaningful intel when investigating external threats.
```

# Flags:

- Flag 1:namecheap

Website:<code>jameskainth.com</code>

```bash
whois jameskainth.com |grep -i "url" |head -1
```

- Flag 2:timewarnercable

I just searched the phone on google:

```
https://www.callercenter.com/855-707-7328.html
```

- Flag 3:539-544-323-> ```539544323```

I found this article by searching the exact description:

```
https://metro.co.uk/2020/03/31/boris-johnson-sparks-security-concerns-revealing-zoom-id-cabinet-meeting-12489236/
```

- Flag 4:82.5%

Went on:

```
https://www.ucan-network.org/
```

And searched for:

```
Champlain College
```

- Flag 5:```c96ee03c4043c366c6f573bb1d194dec8f4c0c81150c60d310bc59d9e17a6906```

Searched for:

```
Champlain College public excel
```

Got this Link:

```
https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwixg8aJruPyAhVjhP0HHX1JAZoQFnoECAoQAQ&url=https%3A%2F%2Fmy.champlain.edu%2Fmedia%2Fphysical_addresses.xls&usg=AOvVaw3S_Y319Yl23IVYWUXaf1tO
```

And did a sha256sum

- Flag 6:```f4952b314eb15acf0eec79c954f83881c17d50d2b5922ee37e8fc5e5cd1aeac2```

- Flag 7:```Todd Schroeder```

Again a weird/failed google search:

```
university of toledo champlain.edu/academics/
```

Gave us the flag

- Flag 8:```Saccopharyngiformes```

We will use a google query:

```
Ichthyology fish name 2019 site:www.uvm.edu
```
Found the uvm website and searched for the word fish

And got a xls file with fish names

- Flag 9:```Virginia```

From the given picture we try tools such us: <code>exiftool</code> and google reverse image search

Finally I started searching for dinosaur parks in the USA and found the:

```
dinosaur land in Virginia
```
