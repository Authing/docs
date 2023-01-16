


 Formstack Trigger
 [#](#formstack-trigger "Permanent link")
=============================================================



 You can use these credentials to authenticate the following nodes:
 


* [Formstack Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.formstacktrigger/)



 Prerequisites
 [#](#prerequisites "Permanent link")
-----------------------------------------------------



 Create a
 [Formstack](https://www.formstack.com/) 
 account.
 



 Using Access token
 [#](#using-access-token "Permanent link")
---------------------------------------------------------------



 After creating your Formstack account:
 


1. From the user menu select
 **API** 
 .
2. Select
 **New Application** 
 .
3. In the
 *Create Application* 
 window enter the following:
	* *Application Name* 
	 : Provide a descriptive name.
	* *Redirect URI* 
	 : Enter the OAuth callback URL for your n8n instance in the format
	 `http://<n8n_url>/rest/oauth2-credential/callback` 
	 . For example
	 `http://localhost:5678/rest/oauth2-credential/callback` 
	 .
	* *Description* 
	 : Enter a brief description.
	* *Platform* 
	 : Select
	 **Website** 
	 .
4. Click
 **Create Application** 
 .
5. Copy the
 *Access Token* 
 for your new application.



 From n8n:
 


1. Enter a descriptive
 ***Credentials Name***
 .
2. Enter your Formstack
 ***Access Token***
 .
3. Click
 **Create** 
 to save your new credentials.



 Using OAuth2
 [#](#using-oauth2 "Permanent link")
---------------------------------------------------



 After creating your Formstack account:
 


1. From the user menu select
 **API** 
 .
2. Select
 **New Application** 
 .
3. In the
 *Create Application* 
 window enter the following:
	* *Application Name* 
	 : Provide a descriptive name.
	* *Redirect URI* 
	 : Enter the OAuth callback URL for your n8n instance in the format
	 `http://<n8n_url>/rest/oauth2-credential/callback` 
	 . For example
	 `http://localhost:5678/rest/oauth2-credential/callback` 
	 .
	* *Description* 
	 : Enter a brief description.
	* *Platform* 
	 : Select
	 **Website** 
	 .
4. Click
 **Create Application** 
 .
5. Select your new application to view the
 *Application Details* 
 .
6. Copy the
 *Client ID* 
 and
 *Client Secret* 
 .



 From n8n:
 


1. Enter a descriptive
 ***Credentials Name***
 .
2. Enter your Formstack
 ***Client ID***
 .
3. Enter your Formstack
 ***Client Secret***
 .
4. Click the circle button to initiate the OAuth2 flow.
5. In the modal window select
 **Authorize** 
 .
6. Click
 **Create** 
 to save your new credentials.




