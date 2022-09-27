# Facebook Social Login

<LastUpdated/>

## Introduce

- **Overview**：Facebook social login is the secure login of a third-party application or website by a user using Facebook as the identity source. By configuring and enabling Facebook's social login in Authing, you can quickly obtain basic open Facebook information through Authing and help users achieve password-free login.
- **Application scenarios**：PC Website
- **End-User Preview**：

![](./images/00-viewResult.png)

## Precautions：

- If you do not have an Instagram account, please go to [Instagram Open Platform](https://developers.facebook.com/) to register a developer account. Because Instagram belongs to Facebook, the Instagram open platform mentioned here is Facebook's open platform;
- Open an [Instagram account](https://www.instagram.com/) with multimedia content;
- If you do not have an Authing console account, please go to the [Authing Console](https://authing.cn/) to register a developer account;

## Step 1：Create a Facebook app

Go to [developers.facebook.com](https://developers.facebook.com/), click **My Apps**, then create a new app and select **Consumer** or **No App Type** , fill in the application name.

![](./images/1-metaCreateApp.png)

![](./images/2-metaSaveApp.png)

In the control panel, find the **Facebook Login** product and click Settings to add it to your app. Then find the app ID and app key in Settings > Basic in the menu on the left, and record it.

![](./images/3-metaAddFacebook.png)

![](./images/6-appidSecret.png)

## Step 2：Configure Instagram in the Authing console

2.1 On the 「Social Identity Source」 page of the Authing Console, click the 「Create Social Identity Source」button to enter the 「Select Social Identity Source」page.

![](./images/4-addMeta.png)

2.2 Please go to the 「Social Identity Source」 - 「Select Social Identity」 page of the Authing Console, and click the 「Facebook」 identity source button to enter the 「Facebook Login Mode」 page.

![](./images/5-choiceMeta.png)

2.3 Please configure the relevant field information on the 「Social Identity Sources」 - 「Facebook」 page of the Authing Console.

![](./images/7-savefacebook.png)

| No    | Field/Function               | Description                                                  |
| ----- | ---------------------------- | ------------------------------------------------------------ |
| 2.3.1 | unique identifier            | a. The unique identifier consists of lowercase letters, numbers, and -, and the length is less than 32 digits. b. This is the unique identifier of this connection and cannot be modified after setting. |
| 2.3.2 | display name                 | This name will be displayed on the button on the end user's login screen. |
| 2.3.3 | application number           | application number，Requires access on Facebook Open Platform |
| 2.3.4 | application secret           | application secret，Requires access on Facebook Open Platform |
| 2.3.5 | Scopes                       | Scopes, data permissions need to be applied for on the Facebook open platform |
| 2.3.6 | redirect url                 | Facebook valid OAuth redirect URI. This URL needs to be configured on the Instagram Open Platform. |
| 2.3.7 | login mode                   | After enabling 「Login Only Mode」, you can only log in to an existing account and cannot create a new account. Please choose carefully. |
| 2.3.8 | Account identity association | When 「Account Identity Association」is not enabled, a new user is created by default when a user logs in through an identity source. After enabling 「Account Identity Association」, you can allow users to log in to existing accounts directly through 「Field Matching」 or 「Asking for Binding」. |

After the configuration is complete, click the "Create" or "Save" button to complete the creation.

After the Facebook identity source is created on the Authing console, the callback address needs to be configured in the Facebook app on Facebook's open platform **OAuth Client Authorization Settings**.

![](./images/9-oauthUrl.png)

## Step3: Development Access

- **Recommended development access method**：Use a hosted login page

- **Description of advantages and disadvantages**：The operation and maintenance are simple, and Authing is responsible for the operation and maintenance. Each user pool has an independent second-level domain name; if you need to embed it into your application, you need to use the pop-up mode to log in, that is: after clicking the login button, a window will pop up, the content is the login page hosted by Authing, or the browser The server redirects to the login page hosted by Authing.

- **Detailed access method**：

3.1 Create an app in the Authing console. For details, see: [How to create an app in Authing](/guides/app-new/create-app/create-app.md).

3.2 On the created Facebook'= identity source connection details page, open and associate an app created in the Authing console.

![](./images/8-openapp.png)

3.3 Experience third-party login for Facebook on the login page.

![](./images/10-loginpage.png)

