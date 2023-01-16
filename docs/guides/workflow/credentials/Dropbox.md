


 Dropbox
 [#](#dropbox "Permanent link")
=========================================



 You can use these credentials to authenticate the following nodes with Dropbox.
 


* [Dropbox](/integrations/builtin/app-nodes/n8n-nodes-base.dropbox/)



 Prerequisites
 [#](#prerequisites "Permanent link")
-----------------------------------------------------



 Create a
 [Dropbox](https://www.dropbox.com/) 
 account.
 



 Using OAuth
 [#](#using-oauth "Permanent link")
-------------------------------------------------




 Note for n8n Cloud users
 



 You'll only need to enter the Credentials Name and click on the circle button in the OAuth section to connect your Dropbox account to n8n.
 



1. Access the
 [Dropbox app creation](https://www.dropbox.com/developers/apps/create) 
 page.
2. Select 'Scoped access' under the
 ***Choose an API***
 section.
3. Select an access type under the
 ***Choose the type of access you need***
 . You can read more about the access type
 [here](https://www.dropbox.com/developers/reference/developer-guide) 
 .
4. In the
 ***Name your app***
 section, enter a name for your app.
5. Click on the
 ***Create app***
 button.
6. Click on the
 ***Permissions***
 tab and give all the permissions under the
 ***Files and folders***
 section.
7. Click on the
 ***Submit***
 button.
8. Click on the
 ***Settings***
 tab.
9. Copy your OAuth Callback URL from the 'Create New Credentials' screen in n8n and paste in the
 ***Redirect URIs***
 field under the
 ***OAuth 2***
 section.
10. Click on the
 ***Add***
 button.
11. Enter the provided
 ***App key***
 and the
 ***App secret***
 in the
 ***Client ID***
 and
 ***Client Secret***
 field, respectively, in your Dropbox OAuth2 API credentials in n8n.
12. Click on the circle button in the OAuth section to connect your Dropbox account to n8n.
13. Click on the
 ***Save***
 button to save your credentials.



![Getting Dropbox credentials](https://d33wubrfki0l68.cloudfront.net/1056904e5b9df14cf7a08866afb5404dcc9583e4/7d7c0/_images/integrations/builtin/credentials/dropbox/using-oauth.gif)




 Using Access Token
 [#](#using-access-token "Permanent link")
---------------------------------------------------------------


1. Access the
 [Dropbox app creation](https://www.dropbox.com/developers/apps/create) 
 page.
2. Select 'Scoped access' under the
 ***Choose an API***
 section.
3. Select an access type under the
 ***Choose the type of access you need***
 . You can read more about the access type
 [here](https://www.dropbox.com/developers/reference/developer-guide) 
 .
4. In the
 ***Name your app***
 section, enter a name for your app.
5. Click on the
 ***Create app***
 button.
6. Click on the
 ***Permissions***
 tab and give all the permissions under the
 ***Files and folders***
 section.
7. Click on the
 ***Submit***
 button.
8. Click on the
 ***Settings***
 tab.
9. Scroll down to the
 ***OAuth 2***
 section and select 'No expiration' from the
 ***Access token expiration***
 dropdown list.
10. Click on the
 ***Generate***
 button.
11. Use the displayed
 ***Generated access token***
 with your Dropbox credentials in n8n.



![Getting Dropbox credentials](https://d33wubrfki0l68.cloudfront.net/1aa520f68d3f6d441a431b8c8fce6e13979c1da7/5dda4/_images/integrations/builtin/credentials/dropbox/using-access-token.gif)





