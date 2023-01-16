


 GetResponse
 [#](#getresponse "Permanent link")
=================================================



 You can use these credentials to authenticate the following nodes with GetResponse.
 


* [GetResponse](/integrations/builtin/app-nodes/n8n-nodes-base.getresponse/)
* [GetResponse Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.getresponsetrigger/)



 Prerequisites
 [#](#prerequisites "Permanent link")
-----------------------------------------------------



 Create a
 [GetResponse](https://www.getresponse.com/) 
 account.
 



 Using OAuth
 [#](#using-oauth "Permanent link")
-------------------------------------------------




 Callback URL with GetResponse
 



**Note:** 
 The Redirect URL should be a URL in your domain. For example,
 `https://mytemplatemaker.example.com/gr_callback` 
 . GetResponse doesn't accept the localhost callback URL. Refer to the
 [FAQs](#_1-how-to-configure-the-oauth-credentials-for-the-local-environment) 
 to learn to configure the credentials for the local environment.
 



1. Open your
 [GetResponse dashboard](https://app.getresponse.com/dashboard) 
 .
2. Click on
 ***Menu***
 and select 'Integrations and API'.
3. Click on the
 ***Custom apps***
 tab.
4. Click on the
 ***Register your app***
 button.
5. Enter all the necessary information.
6. Copy your OAuth Callback URL from the 'Create New Credentials' screen in n8n and paste it in the
 ***Redirect URL***
 field.
7. Click on the
 ***Add***
 button.
8. Click on the app you created to get the
 ***Client ID***
 and the
 ***Client Secret***
 .
9. Copy the displayed
 ***Client ID***
 .
10. Enter a name for your credentials in the
 ***Credentials Name***
 field in the 'GetResponse OAuth2 API' credentials in n8n.
11. Paste the Client ID in the
 ***Client ID***
 field in the 'GetResponse OAuth2 API' credentials in n8n.
12. Copy the
 ***Client secret key***
 from GetResponse.
13. Paste it in the
 ***Client Secret***
 field in the 'GetResponse OAuth2 API' credentials in n8n.
14. Click on the circle button in the OAuth section to connect a GetResponse account to n8n.
15. Click on the
 ***Save***
 button to save your credentials in n8n.



 The following video demonstrates the steps mentioned above.
 







 Using API Key
 [#](#using-api-key "Permanent link")
-----------------------------------------------------


1. Open your
 [GetResponse dashboard](https://app.getresponse.com/dashboard) 
 .
2. Click on
 ***Menu***
 and select 'Integrations and API'.
3. Click on the
 ***API***
 tab.
4. Click on the
 ***Generate API key***
 button.
5. Enter a name for your key.
6. Click on the
 ***Generate***
 button.
7. Copy the displayed
 ***API key***
 .
8. Enter a name for your credentials in the
 ***Credentials Name***
 field in the 'GetResponse API' credentials in n8n.
9. Paste the API key in the
 ***API Key***
 field in the 'GetResponse API' credentials in n8n.
10. Click the
 ***Create***
 button to create your credentials in n8n.



 The following video demonstrates the steps mentioned above.
 







 FAQs
 [#](#faqs "Permanent link")
-----------------------------------


### 
 How to configure the OAuth credentials for the local environment?
 [#](#how-to-configure-the-oauth-credentials-for-the-local-environment "Permanent link")



 GetResponse doesn't accept the localhost callback URL. However, you can follow the steps mentioned below to configure the OAuth credentials for the local environment:
1. We will use
 [ngrok](https://ngrok.com/) 
 to expose the local server running on port
 `5678` 
 to the internet. In your terminal, run the following command:
 


|  |  |
| --- | --- |
| 

```
1
```

 | 

```
ngrok http 5678

```

 |



 2. Run the following command in a new terminal. Replace
 `<YOUR-NGROK-URL>` 
 with the URL that you get from the previous step.
 


|  |  |
| --- | --- |
| 

```
1
```

 | 

```
export WEBHOOK\_URL=<YOUR-NGROK-URL>

```

 |



 3. Start your n8n instance.
4. Follow the instructions mentioned in the
 [Using OAuth](#using-oauth) 
 section to configure your credentials.
 



 Further Reference
 [#](#further-reference "Permanent link")
-------------------------------------------------------------


* [OAuth 2.0 - Authorization Code](https://apidocs.getresponse.com/v3/case-study/oauth2-authorization-code)
* [Authentication - API key](https://apireference.getresponse.com/#section/Authentication)




