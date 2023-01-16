


 Webex by Cisco
 [#](#webex-by-cisco "Permanent link")
=======================================================



 You can use these credentials to authenticate the following nodes:
 


* [Webex by Cisco](/integrations/builtin/app-nodes/n8n-nodes-base.ciscowebex/)
* [Webex by Cisco Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.ciscowebextrigger/)



 Prerequisites
 [#](#prerequisites "Permanent link")
-----------------------------------------------------



 Create a
 [Webex by Cisco](https://www.webex.com/) 
 account.
 



 Using OAuth
 [#](#using-oauth "Permanent link")
-------------------------------------------------


1. Navigate to
 [Webex for Developers](https://developer.webex.com/) 
 and sign in using your Webex by Cisco account.
2. From the user menu select
 **My Webex Apps** 
 , then
 **Create a New App** 
 .
3. From the
 ***Create a New App***
 page select
 **Create an Integration** 
 .
4. Complete the following required fields for your new integration:
	* ***Integration Name***
	 : Provide a name for your Webex app.
	* ***Contact Email***
	 : Enter your email address.
	* ***Icon***
	 : Provide an icon for your app or select one of the available defaults.
	* ***Description***
	 : Enter a brief description of your app.
	* ***Redirect URIs***
	 : Enter the
	 **OAuth Callback URL** 
	 from the n8n credentials modal.
	* ***Scopes***
	 : Enable the following scopes:
		+ `spark:rooms_read`
		+ `spark:messages_write`
		+ `spark:messages_read`
		+ `spark:membership_read`
		+ `spark_membership_write`
		+ `meeting:recordings_write`
		+ `meeting:recordings_read`
		+ `meeting:preferences_read`
		+ `meeting:schedules_write`
		+ `meeting:schedules_read`
5. Click
 **Add Integration** 
 to create your app.
6. Copy the
 ***Client ID***
 and
 ***Client Secret***
 for this new app.



 From n8n:
 


1. Enter a descriptive
 ***Credentials Name***
 .
2. Under
 ***Credential Data***
 , enter the
 ***Client ID***
 and
 ***Client Secret***
 obtained above.
3. Under
 ***OAuth***
 , click the circle button to initiate authentication. A popup may appear prompting you to login to your Webex by Cisco account.
4. After authentication is complete, click
 **Create** 
 to save your new credentials.




