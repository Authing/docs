


 Twitter
 [#](#twitter "Permanent link")
=========================================



 You can use these credentials to authenticate the following nodes with Twitter.
 


* [Twitter](/integrations/builtin/app-nodes/n8n-nodes-base.twitter/)



 Prerequisites
 [#](#prerequisites "Permanent link")
-----------------------------------------------------



 Create a
 [Twitter developer account](https://developer.twitter.com/) 
 .
 



 Using OAuth
 [#](#using-oauth "Permanent link")
-------------------------------------------------


1. Access the
 [Twitter Developer](https://developer.twitter.com/en/portal/projects-and-apps) 
 portal.
2. Fill out the questionnaire to gain essential access and click
 **Next** 
 once done.
 ![Getting essential access to the Twitter API](https://d33wubrfki0l68.cloudfront.net/e9fa9f32795289f1c7ba7ac103b18c4fdf563beb/d8b9f/_images/integrations/builtin/credentials/twitter/essential-access.png)
3. Confirm the Developer agreement by checking the box and clicking
 **Submit** 
 once done.
 ![The Twitter Developer Agreement](https://d33wubrfki0l68.cloudfront.net/e2bd268d225e7a71f694e27571b2d9ea90f1a903/7521c/_images/integrations/builtin/credentials/twitter/developer-agreement.png)
4. Twitter will now send you a confirmation email. Click the
 **Confirm your email** 
 button in the email.
 ![Email Validation Email](https://d33wubrfki0l68.cloudfront.net/66c6f59cdca01363b86fb0666ce601cb4a404fc8/a36c8/_images/integrations/builtin/credentials/twitter/email-validation.png)
5. After confirming your email, you are redirected to the
 [#Welcome to the Twitter Developer Platform](https://developer.twitter.com/en/portal/register/welcome) 
 page. Enter a name for your Twitter application and click the
 **Get keys** 
 button.
6. Copy the
 **API Key** 
 ,
 **API Key Secret** 
 shown on the next page.
 ![API Keys provided by Twitter](https://d33wubrfki0l68.cloudfront.net/8e96fb733b43fadc78e9f5896c82dca9a1cf9aa5/28455/_images/integrations/builtin/credentials/twitter/api-keys.png)
7. Click the
 **Skip to dashboard** 
 link at the bottom of the page and click the
 **Yes, I saved them** 
 button.
8. Click the
 **Gear button** 
 next to your newly created app to open it's
 **App settings** 
 .
 ![The App settings button](https://d33wubrfki0l68.cloudfront.net/901090a4a81ff043abdefbc95c567eff2cfb29d4/77e8e/_images/integrations/builtin/credentials/twitter/app-settings-button.png)
9. In the Authentication settings sections, click
 **Edit** 
 .
10. Turn on the
 **Enable 3-legged OAuth** 
 switch and paste the URL shown in the
 **OAuth Redirect URL** 
 of the n8n credentials screen into the
 **Callback URLs** 
 field of your Twitter apps authentication settings.
11. Enter a valid Website URL in the respective field (for example https://n8n.io).
 ![The App settings button](https://d33wubrfki0l68.cloudfront.net/cfa1d1920eafc31798aff8a86f6801812588ae95/f7ca5/_images/integrations/builtin/credentials/twitter/oauth-settings.png)
12. Save your input by clicking the
 **Save** 
 button at the bottom of the page.
13. Under App permissions, click
 **Edit** 
 and choose the appropriate permissions for your app (pick
 **Read and write and Direct message** 
 if you want to use all functions of the Twitter n8n in n8n) and click
 **Save** 
 to confirm.
14. In the sidebar on the left, click on the Project your app has been created in (usually
 **Project 1** 
 ) and then on the
 **Apply for Elevated** 
 button.
15. Fill out the questionnaire and confirm the inputs on each questionnaire page with a click on
 **Next** 
 (
 **Submit** 
 on the final page).
 ![Application process for elevated access to the Twitter API](https://d33wubrfki0l68.cloudfront.net/5169448205e6f64dd5eb729c12a336cedd6b357e/d60e1/_images/integrations/builtin/credentials/twitter/elevated-access.png)
16. Once you receive confirmation that your application has been approved, you're ready to use the n8n Twitter node.
17. In the n8n credentials screen, paste your
 **API Key** 
 from steps 6 above into the
 **Consumer Key** 
 field, and your
 **API Key Secret** 
 into the
 **Consumer Secret** 
 field.
18. Click
 **Connect my account** 
 and confirm the connection by clicking
 **Authorize app** 
 .



 Further Reference
 [#](#further-reference "Permanent link")
-------------------------------------------------------------


* [Application-only Authentication](https://developer.twitter.com/en/docs/authentication/oauth-2-0/application-only)




