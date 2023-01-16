


 Nextcloud
 [#](#nextcloud "Permanent link")
=============================================



 You can use these credentials to authenticate the following nodes with Nextcloud.
 


* [Nextcloud](/integrations/builtin/app-nodes/n8n-nodes-base.nextcloud/)



 Prerequisites
 [#](#prerequisites "Permanent link")
-----------------------------------------------------



 Create a
 [Nextcloud](https://nextcloud.com/) 
 account.
 



 Using OAuth
 [#](#using-oauth "Permanent link")
-------------------------------------------------


1. Log in to your Nextcloud account.
2. Click on the user icon in the top right.
3. Select 'Settings' in the drop down menu.
4. Click on 'Security' under Administration in the sidebar.
5. Copy the 'OAuth Callback URL' provided in the Nextcloud OAuth2 API credentials in n8n and paste it in the
 *Redirection URI* 
 field under the 'OAuth 2.0 clients' section in the Nextcloud page.
6. Fill out any other information that is necessary and click on the 'Add' button.
7. Click on the eye icon to reveal the Secret and use the 'Client Identifier' and the 'Secret' with your Nextcloud OAuth2 API credentials in n8n.
8. Replace your domain in the samples for the
 *Authorization URL* 
 and
 *Access Token URL* 
 fields.
9. Enter your
 [Web DAV URL](https://docs.nextcloud.com/server/stable/user_manual/en/files/access_webdav.html) 
 in the
 *Web DAV URL* 
 field.
10. Click on the circle button in the OAuth section to connect a Nextcloud account to n8n.
11. Click the
 *Save* 
 button to save your credentials.



![Getting Nextcloud OAuth credentials](https://d33wubrfki0l68.cloudfront.net/6f4c29876923c5779ee381b98723efa47f782255/c7a9d/_images/integrations/builtin/credentials/nextcloud/using-oauth.gif)




 Using Username and Password
 [#](#using-username-and-password "Permanent link")
---------------------------------------------------------------------------------



 Use your
 [Web DAV URL](https://docs.nextcloud.com/server/stable/user_manual/en/files/access_webdav.html) 
 along with your Nextcloud username and password in the node credentials.
 




