# Instagram Social Login

<LastUpdated/>

## Scenario introduction

- **Overview**: Enterprise WeChat internal application sweep code login (proxy development mode) is to realize secure login to third-party applications or websites with enterprise WeChat as the identity source for third-party enterprises by providing proxy development applications by service providers and sweep code authorization by third-party enterprises. By configuring and enabling Instagram social login in Authing, you can quickly access Instagram basic open information and help users to achieve password-free login function through Authing.
- **Application Scenario**: PC website
- **End-user preview image**.

<img src=". /images/00-viewResult.png" >

## Caution.

- If you do not have an Instagram Open Platform account, please go to [Instagram Open Platform](https://developers.facebook.com/) to register a developer account first. Since Instagram is owned by Facebook, the Instagram Open Platform here is the Facebook Open Platform.
- Open an [Instagram account](https://www.instagram.com/) that contains multimedia material.
- If you do not have an Authing Console account, go to [Authing Console Console](https://authing.cn/) to register a developer account first.

## Step 1: Create Facebook Application

Go to [developers.facebook.com](https://developers.facebook.com/), click on **My Apps**, then create a new app and select **Consumer** or **No App Type** and fill in the app name.

<img src=". /images/01-createapp.png" >

<img src=". /images/02-saveapp.png" >

In the Control Panel, find the **Instagram Basic Display** product and click Settings to add it to your app.

<img src=". /images/03-addinstagram.png" >

Scroll to the bottom of the page, then click **Create New App**.

<img src=". /images/04-saveins.png" >

## Step 2: Configure Instagram in Authing Console

2.1 Please click the "Create Social Identity Source" button on the "Social Identity Source" page of Authing Console console to enter the "Select Social Identity Source" page.

<img src=". /images/05-addSocial.png" >

2.2 Please click the "Instagram" identity source button on the "Social Identity Sources" - "Select Social Identity Also" page in the Authing Console console to enter the "Instagram Login Mode" page.

<img src=". /images/06-choiceIns.png" >

2.3 Please configure the relevant field information in the "Social Identity Source" - "Instagram" page of the Authing Console console.

<img src=". /images/07-insconfig.png" >

| Number | Field/Function               | Description                                                                                                                                                                                                                                                                                                                |
| ------ | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2.3.1  | Unique identifier            | a. The unique identifier consists of lowercase letters, numbers, and -, and is less than 32 bits long. b. This is the unique identifier for this connection and cannot be changed after it is set.                                                                                                                         | 2.3.2 |
| 2.3.2  | Display name                 | This name is displayed on the button in the end-user's login screen.                                                                                                                                                                                                                                                       | This is a unique identifier for this connection. |
| 2.3.3  | App number                   | The app number, which needs to be obtained on the Instagram Open Platform.                                                                                                                                                                                                                                                 |
| 2.3.4  | App key                      | The app number, which needs to be obtained on the Instagram Open Platform                                                                                                                                                                                                                                                  |
| 2.3.5  | Callback address             | A valid OAuth jump URI for Instagram.                                                                                                                                                                                                                                                                                      | This URL needs to be configured to the Instagram Open Platform. |
| 2.3.6  | Login Mode                   | When "Login Only Mode" is enabled, you can only login to your existing account and cannot create a new one, so please choose carefully.                                                                                                                                                                                    | Please choose carefully. |
| 2.3.7  | Account Identity Association | When "Account Identity Association" is not enabled, new users will be created by default when users log in through the identity source. If you enable "Account Identity Association", you can allow users to log in to existing accounts directly through "Field Matching" or "Ask to Bind". a. Association Method: Select | . |

After the configuration is finished, click "Create" or "Save" button to complete the creation.

After creating the Instagram identity source on the Authing console, you need to configure the callback address into the Instagram app on Instagram's open platform **OAuth client authorization settings**.

In the final step, Instagram needs to gain access to the **instagram_graph_user_profile**, so this needs to be added. Then click and save the changes to create the instagram app successfully.

<img src=". /images/08-insconfig-success.png" >

## Step 3: Development Access

- **Recommended development access**: Use a hosted login page

- **Description of advantages and disadvantages**: Simple to operate and maintain, with Authing taking care of the operation and maintenance. Each user pool has an independent secondary domain; if you need to embed it into your application, you need to use pop-up mode login, i.e.: after clicking the login button, a window will pop up with the Authing hosted login page, or redirect your browser to the Authing hosted login page.

- **Detailed access method**.

  3.1 Create an application in Authing console, for more details see: [How to create an application in Authing](https://docs.authing.cn/v2/guides/app/create-app.html)

  3.2 Open and associate an app created in Authing console in the created Instagram identity connection details page

<img src=". /images/09-openapp.png" >

3.3 Experience Instagram third-party login on the login page

<img src=". /images/10-login.png" >
