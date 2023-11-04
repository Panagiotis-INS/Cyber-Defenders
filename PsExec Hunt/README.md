# Title:  PsExec Hunt Blue Team Challenge 

## Author: Panagiotis Fiskilis / Neuro

Flag1:`10.0.0.130`

Q1:In order to effectively trace the attacker's activities within our network, can you determine the IP address of the machine where the attacker initially gained access?

Packet with number `126` shows SMB Negotiation request

![](./Images/img1.png)


Q2:To fully comprehend the extent of the breach, can you determine the machine's hostname to which the attacker first pivoted?



Q3:After identifying the initial entry point, it's crucial to understand how far the attacker has moved laterally within our network. Knowing the username of the account the attacker used for authentication will give us insights into the extent of the breach. What is the username utilized by the attacker for authentication?




Q4:After figuring out how the attacker moved within our network, we need to know what they did on the target machine. What's the name of the service executable the attacker set up on the target?



Q5:We need to know how the attacker installed the service on the compromised machine to understand the attacker's lateral movement tactics. This can help identify other affected systems. Which network share was used by PsExec to install the service on the target machine?





Q6:We must identify the network share used to communicate between the two machines. Which network share did PsExec use for communication?



Q7:Now that we have a clearer picture of the attacker's activities on the compromised machine, it's important to identify any further lateral movement. What is the machine's hostname to which the attacker attempted to pivot within our network?
