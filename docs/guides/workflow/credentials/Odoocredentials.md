


 Odoo credentials
 [#](#odoo-credentials "Permanent link")
===========================================================



 You can use these credentials to authenticate the following nodes with Odoo:
 


* [Odoo](/integrations/builtin/app-nodes/n8n-nodes-base.odoo/)
* Sign up for Odoo and create an API key or password. Refer to Odoo's documentation for more information:
 [External API](https://www.odoo.com/documentation/15.0/developer/misc/api/odoo.html) 
 . Note that some Odoo modules and settings require API keys, not passwords.
* In n8n, create a new credential. You can either:
	+ Click
	 **Credentials** 
	 >
	 **New** 
	 , then search for
	 **Odoo API** 
	 . After selecting
	 **Odoo API** 
	 , click
	 **Continue** 
	 .
	+ In an Odoo node, click the
	 **Credential for Odoo API** 
	 dropdown, then click
	 **Create new** 
	 .
* Enter your Odoo information:
	+ **Site URL** 
	 : the domain of your Odoo instance.
	+ **Username** 
	 : username as displayed on the user's
	 **Change password** 
	 screen in Odoo.
	+ **Database name** 
	 : the name of the Odoo instance.
	+ **Password or API key** 
	 : the credential you created in step one.
* Click
 **Save** 
 . n8n tests the key to check it can connect to Odoo.




