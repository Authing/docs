


 Slack
 [#](#slack "Permanent link")
=====================================



 You can use these credentials to authenticate the following nodes:
 


* [Slack](/integrations/builtin/app-nodes/n8n-nodes-base.slack/)



 Prerequisites
 [#](#prerequisites "Permanent link")
-----------------------------------------------------



 Create a
 [Slack](https://slack.com/) 
 account.
 



 Using OAuth
 [#](#using-oauth "Permanent link")
-------------------------------------------------




 Note for n8n Cloud users
 



 You'll only need to enter the Credentials Name and click on the circle button in the OAuth section to connect your Slack account to n8n.
 



1. Open the
 [Slack API](https://api.slack.com/) 
 page.
2. Click on the
 ***Create an app***
 button and select
 **From scratch** 
 .
3. Enter an
 ***App Name***
 in the corresponding field.
4. ***Select a workspace***
 for your app from the dropdown list.
5. Click on the
 ***Create App***
 button.
6. Scroll down to the
 ***App Credentials***
 section.
7. Copy and paste
 ***Client ID***
 and
 ***Client Secret***
 in the corresponding fields of your n8n credentials.
8. On the Basic Information page, navigate to
 ***Building Apps for Slack***
 >
 ***Add features and functionality***
 >
 ***Permissions***
 .
9. In the
 ***Redirect URLs***
 section, click on
 ***Add New Redirect URL***
 .
10. Copy the
 ***OAuth Callback URL***
 provided in n8n and paste it here.
11. Click on the
 ***Save URLs***
 button.
12. Scroll down to the
 ***Scopes***
 section.
13. Add the required scopes under the
 ***Bot Token Scopes***
 section. You can refer to the list of scopes on the
 [Scopes and permissions](https://api.slack.com/scopes) 
 documentation on Slack.
14. Click on the circle button in the OAuth section to connect a Slack account to n8n.
15. Click the
 ***Save***
 button to save your credentials in n8n.
16. Return to the Slack OAuth & Permissions page, scroll up to the
 ***OAuth Tokens for Your Workspace***
 section and click on
 ***Install to Workspace***
 button.
17. Click on the
 ***Allow***
 button.




 Using Access Token
 [#](#using-access-token "Permanent link")
---------------------------------------------------------------


1. Open the
 [Slack API](https://api.slack.com/) 
 page.
2. Click on the
 ***Create an app***
 button and select
 **From scratch** 
 .
3. Enter an
 ***App Name***
 in the corresponding field.
4. ***Select a workspace***
 for your app from the dropdown list.
5. Click on the
 ***Create App***
 button.
6. In the
 ***Add features and functionality***
 section select
 **Permissions** 
 .
7. Scroll down to the
 ***Scopes***
 section and:
 


	* If you want your app to act on behalf of users that authorize the app, add the required scopes under the
	 ***User Token Scopes***
	 section.
	* If you're building a bot, add the required scopes under the
	 ***Bot Token Scopes***
	 section.

 Tip
 



 You can refer to the list of scopes on the officials Slack
 [Scopes and permissions](https://api.slack.com/scopes) 
 documentation.
8. From the
 ***OAuth Tokens for Your Workspace***
 section click on the
 ***Install to Workspace***
 button.
9. Click on the
 ***Allow***
 button.
10. In n8n, enter the
 ***Access Token***
 created above.
11. Click the
 ***Save***
 button to save your credentials in n8n.




 Privacy policy
 [#](#privacy-policy "Permanent link")
-------------------------------------------------------



 For details about how you data is collected and used, see the
 [n8n](https://n8n.io/legal/) 
 and
 [Slack](https://slack.com/intl/en-de/trust/privacy/privacy-policy) 
 privacy policies.
 




