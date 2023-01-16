


 ServiceNow
 [#](#servicenow "Permanent link")
===============================================



 You can use these credentials to authenticate the following nodes with serviceNow.
 


* [ServiceNow](/integrations/builtin/app-nodes/n8n-nodes-base.servicenow/)



 Prerequisites
 [#](#prerequisites "Permanent link")
-----------------------------------------------------



 Create a
 [ServiceNow](https://servicenow.com/) 
 account.
 



 Using OAuth
 [#](#using-oauth "Permanent link")
-------------------------------------------------



 From your ServiceNow instance:
 


1. Navigate to
 ***System OAuth***
 >
 ***Application Registry***
 .
2. Click
 ***New***
 button >
 ***Create an OAuth API endpoint for external clients***
 .



![New Application Registry](https://d33wubrfki0l68.cloudfront.net/c18fe0342926a48c1ee0030e21e221ad7b6ddcf9/6b40d/_images/integrations/builtin/credentials/servicenow/servicenow_instance.png)



1. Complete the following fields:
	* **Name** 
	 : Enter a descriptive name for the new endpoint.
	* **Client ID** 
	 : Auto populated field, you will need this ID to configure your n8n credentials.
	* **Client Secret** 
	 : Enter your desired secret or leave blank to auto generate a random string. You will need this to configure your n8n credentials.
	* **Redirect URL** 
	 : Copy the
	 ***OAuth Callback URL***
	 from the n8n credentials window and enter it here.
2. Click
 ***Submit***
 to save and create your new endpoint.



 From n8n:
 


1. Enter a descriptive
 ***Credentials Name***
 .
2. Under
 ***Credential Data***
 complete the following fields:
	* ***Client ID***
	 : Enter the client ID generated above.
	* ***Client Secret***
	 : Enter your client secret created above.
	* ***Subdomain***
	 : Enter the subdomain of your ServiceNow instance. This can be seen in your instance URL:
	 `https://<subdomain>.service-now.com/` 
	 .
3. From the
 ***OAuth***
 section, click the circle button to establish the connection.
4. Click
 ***Save***
 to finalize your n8n credentials.




