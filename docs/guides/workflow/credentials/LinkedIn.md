


 LinkedIn
 [#](#linkedin "Permanent link")
===========================================



 You can use these credentials to authenticate the following nodes with LinkedIn.
 


* [LinkedIn](/integrations/builtin/app-nodes/n8n-nodes-base.linkedin/)



 Prerequisites
 [#](#prerequisites "Permanent link")
-----------------------------------------------------



 Create a
 [LinkedIn](https://www.linkedin.com/) 
 account.
 



 Using OAuth
 [#](#using-oauth "Permanent link")
-------------------------------------------------




 Note for n8n Cloud users
 



 You'll only need to enter the Credentials Name and click on the circle button in the OAuth section to connect your LinkedIn account to n8n.
 



1. Access the
 [LinkedIn app creation page](https://www.linkedin.com/developers/apps/new) 
 .
2. Enter a name in the
 ***App name***
 field.
3. Enter your LinkedIn Page/Profile in the
 ***LinkedIn Page***
 field.
4. Add a logo by clicking on the
 ***Upload a logo***
 button.
5. Agree to the terms and conditions in the
 ***Legal agreement***
 section and click the
 ***Create app***
 button at the bottom of the page.
6. Verify your application. You can find instructions on how to verify your LinkedIn application in the FAQs below.
7. Enable APIs for your application. You can find instructions on how and which APIs to enable for your LinkedIn application in the FAQs below.
8. Back in the LinkedIn application creation page, click on the
 ***Auth***
 tab.
9. Copy the 'OAuth Callback URL' provided in the LinkedIn OAuth2 API credentials in n8n and add it in the 'Authorized redirect URLs for your app' section in the LinkedIn application creation page.
10. Use the displayed
 ***Client ID***
 and the
 ***Client Secret***
 with your LinkedIn OAuth API credentials in n8n.
11. Click on the circle button in the OAuth section to connect a LinkedIn account to n8n.
12. Click the
 ***Save***
 button to save your credentials in n8n.



![Getting LinkedIn credentials](https://d33wubrfki0l68.cloudfront.net/ce0c45e710e8cea06129e045d4435ffd3099fe51/65a45/_images/integrations/builtin/credentials/linkedin/using-oauth.gif)




 FAQs
 [#](#faqs "Permanent link")
-----------------------------------


### 
 How do I verify my LinkedIn application?
 [#](#how-do-i-verify-my-linkedin-application "Permanent link")


1. Open the application's page on the LinkedIn developers portal.
2. Click on the
 ***Verify***
 button.
3. Click on the
 ***Generate URL***
 button under the
 ***Verification URL***
 section.
4. Copy the generated URL and open it in your web browser.
5. Click on the
 ***Verify***
 button to verify your LinkedIn OAuth application.


### 
 How do I enable APIs for my LinkedIn application?
 [#](#how-do-i-enable-apis-for-my-linkedin-application "Permanent link")


1. Click on the
 ***Products***
 tab in your LinkedIn application page.
2. Click the
 ***Select***
 button next to the API you want to enable in the
 ***Products***
 section.
3. Click the checkbox to accept the terms and conditions and then click on the
 ***Add product***
 button.



**Note:** 
 You will need to enable the
 ***Share on LinkedIn***
 and
 ***Sign In with LinkedIn***
 products to connect with n8n. If you would like to connect an organizational LinkedIn account to n8n, then you also additionally need to enable the
 ***Marketing Developer Platform***
 product.
 




