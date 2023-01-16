


 SSH
 [#](#ssh "Permanent link")
=================================



 You can use these credentials to authenticate the following nodes:
 


* [SSH](/integrations/builtin/core-nodes/n8n-nodes-base.ssh/)



 Prerequisites
 [#](#prerequisites "Permanent link")
-----------------------------------------------------



 Authentication for the SSH node requires that you have a username and password for connecting to the remote server, or an SSH key configured for the server or service you are connecting to. 
See
 [Connecting to GitHub with SSH](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh) 
 for an example.
 



 Using Password
 [#](#using-password "Permanent link")
-------------------------------------------------------


1. From the SSH Credentials dropdown, select
 ***Create New***
 and complete the following fields:
	* ***Credentials Name***
	 : Enter a descriptive name, here we used
	 `ssh_demo` 
	 .
	* ***Host***
	 : Enter the IP address of the server you are connecting to. Here we are using
	 `192.168.1.8` 
	 for a local Mac set up for SSH access.
	* ***Port***
	 : Enter the port to use for this connection. SSH used port 22 by default.
	* ***User***
	 : Enter the your username for this server.
	* ***Password***
	 : Enter your password for the provided username.
2. Click
 ***Save***
 to make these credentials available for use.



![SSH Password credentials](https://d33wubrfki0l68.cloudfront.net/bbf8dd673c9f4013822bd15160a9e9f76e031546/402bc/_images/integrations/builtin/credentials/ssh/ssh_credentials.png)




 Using Private Key
 [#](#using-private-key "Permanent link")
-------------------------------------------------------------


1. With
 ***Private Key***
 selected in the
 ***Authentication***
 field, from the SSH Credentials dropdown select
 ***Create New***
 .
2. Complete the following fields:
	* ***Credentials Name***
	 : Enter a descriptive name, here we used
	 `ssh_demo` 
	 .
	* ***Host***
	 : Enter the IP address of the server you are connecting to.
	* ***Port***
	 : Enter the port to use for this connection. SSH used port 22 by default.
	* ***Private Key***
	 : Enter your SSH private key.
	* ***Passphrase***
	 : Enter your passphrase used to secure this key.



![SSH Private Key credentials](https://d33wubrfki0l68.cloudfront.net/1090db8cb91342fe645d927d3c7aba64a116875b/da05d/_images/integrations/builtin/credentials/ssh/private_key_credential.png)





