# Author:Panagiotis Fiskilis/Neuro

## challenge name:CyberDefenders:Insider ##

## Description: ##

```
After Karen started working for 'TAAUSAI,' she began to do some illegal activities inside the company. 'TAAUSAI' hired you to kick off an investigation on this case.

You acquired a disk image and found that Karen uses Linux OS on her machine. Analyze the disk image of Karen's computer and answer the provided questions.
```

### Tools: ###

- FlareVM

- FTK Imager(Windows Version)

### Flags: ###

- Flag 1:```kali```

Really common

![flag1](./Images/flag1.png)

- Flag 2:```d41d8cd98f00b204e9800998ecf8427e```

We export the <code>/var/log/apache2/access.log</code> and do an md5sum

- Flag 3:```mimikatz_trunk.zip```

We find mimikatz zip file on root's Download folder:

![flag3](./Images/flag3.png)

- Flag 4:```/root/Desktop/SuperSecretFile.txt```

![flag4](./Images/flag4.png)

- Flag 5:```binwalk```

![flag5](./Images/flag5.png)

- Flag 6:```profit```

![flag6](./Images/flag6.png)

![not_a_meme](./Images/flag6_meme.webp)

- Flag 7:```0```

All the <code>apache2</code> logs are empty

![flag7](./Images/flag7.png)

- Flag 8:```irZLAohl.jpeg```

![flag8](./Images/flag8.png)

- Flag 9:```Young```

![flag9](./Images/flag9.png)

- Flag 10:```postgres```

![flag10](./Images/flag10.png)

- Flag 11:```/root/Documents/myfirsthack/```

![flag11](./Images/flag11.png)
