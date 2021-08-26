# Author: Panagiotis Fiskilis/Neuro

# Challenge name: Cyber Defenders:RE 101

## Description: ##

```
RE101 challenge is a binary analysis exercise - a task security analysts do to understand how a specific malware works and extract possible intel.
```

# Flags/Challenges:

- Flag1:```flag<0ops_i_used_1337_b64_encryption>```

```bash
strings malware000 |grep "=$" |base64 -d
```

- Flag2:```flag<what_a_cheeky_language!1!>```

This thing is jfuck

Used this site to decode:

```
https://www.dcode.fr/jsfuck-language
```

and got the flag

- Flag3:```flag<Now_THIS_is_programming>```

This thing is brain fuck

Used a brain fuck compiler and got the flag

- Flag4:


- Flag5:sTaCk_strings_LMAO

We disassemble the elf file in ida and find that the flag is pushed to the stack with an offset if we put the offset on the correct oreder we get the Flags

- FLag6:
