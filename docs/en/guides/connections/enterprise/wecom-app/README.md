# Enterprise WeChat Mobile

<LastUpdated/>

## Scenario introduction

- **Overview**: a no-login scenario where Enterprise WeChat is pulled up in a web page for users to log in. Enables secure login to third-party applications or websites using Enterprise WeChat as the identity source for enterprises. Configure and enable enterprise login in {{$localeConfig.brandName}} to quickly get the basic open information of enterprise WeChat and help users to achieve the no-sign-in function through {{$localeConfig.brandName}}.
- **Application Scenario**: PC-side application
- **End-user preview image**.

<img src="./images/00.png" >

## Caution.

- If you do not have an Enterprise WeChat Developer account, please go to [Enterprise WeChat Developer Backend](https://work.weixin.qq.com/) to register first.
- If you do not have a {{$localeConfig.brandName}} console account, please go to [{{$localeConfig.brandName}} Console](https://{{$localeConfig.brandName}}.cn/) to register for a developer account.

## Step 1: Create Enterprise Self-Built App

Go to [Enterprise WeChat Developer Backend](https://work.weixin.qq.com/wework_admin/frame#profile) and

In the **App Management** - **App** page, create a self-built app

<img src="./images/02.png" >

On the app details page, click Set Enterprise Wechat Authorized Login:.

<img src="./images/04.png" >

Set the authorization callback domain to core.authing.cn .
<img src="./images/05.png" >

On the application details page, set the web authorization and JS-SDK domain name to `core.authing.cn`.
<img src="./images/06.png" >

<img src="./images/07.png" >

## Step 2: Configure Enterprise WeChat Mobile in {{$localeConfig.brandName}} Console

2.1 In the {{$localeConfig.brandName}} Console, on the "Enterprise Identity Source" page, click the "Create Enterprise Identity Source" button, go to the "Select Enterprise Identity Source" page, and click the "Enterprise WeChat" identity source button

<img src="./images/09.png" >

2.2 Select "Enterprise WeChat Mobile".

<img src="./images/11.png" >

2.3 Please fill in the relevant field information on the "Enterprise WeChat Mobile" page.
<img src="./images/10.png" >

| 字段 | 描述 |
| ------------ | -------------------------------------------------------------------------------------------------------------------- ---------------------------------------- |
| Unique Identifier | a. The unique identifier consists of lowercase letters, numbers, -, and is less than 32 bits long.  <br />b. This is a unique identifier for this connection and cannot be modified after it is set.                                                    |
| Show name | This name is displayed on the button on the end-user's login screen.                                                                                                                | Enterprise ID
| Enterprise ID | The App ID and App Secret can be found in the backend of the Enterprise Wechat application, under **Credentials and Basic Information**.                                                                                                                                                              |
| AgentID | You can see the App ID and App Secret in the backend of Enterprise Wechat application, **Credentials and Basic Information**.                                                                                |Secret
| App ID and App Secret can be found in **Credentials and Basic Information** in the backend of Enterprise Wechat application.                                                                                |Secret
| Login Mode | After you turn on "Login Only Mode", you can only login to your existing account, you cannot create new account, please choose carefully.                                                                                        |Sign In Mode
| Account Identity Association | If "Account Identity Association" is not enabled, users can create new users by default when they log in through the identity source. If "Account Identity Association" is enabled, you can allow users to log in to existing accounts directly by "Field Matching" or "Ask to Bind". |

You can get the Enterprise ID on the My Enterprise - Enterprise Information page.

<img src="./images/01.png" >

On the app details page, you can get the **AgentId** and **Secret** for the app at.

! [](./images/03.png)

## Step 3: Development Access

- **Recommended development access**: Use hosted login page

- **Description of advantages and disadvantages**: Simple operation and maintenance by {{$localeConfig.brandName}}. Each user pool has a separate secondary domain; if you need to embed it in your application, you need to use the popup mode login, i.e.: after clicking the login button, a window will pop up with {{$localeConfig.brandName}} hosted login page, or redirect the browser to {{$localeConfig.brandName }} hosted login page.

## Step 3: Development Access

- **Recommended development access method**: Use hosted login page

- **Description of advantages and disadvantages**: Simple operation and maintenance by {{$localeConfig.brandName}}. Each user pool has a separate secondary domain; if you need to embed it in your application, you need to use the popup mode login, i.e.: after clicking the login button, a window will pop up with {{$localeConfig.brandName}} hosted login page, or redirect the browser to {{$localeConfig.brandName }} to the hosted login page.

- **Detailed access method**.

  3.1 Create an app in the {{$localeConfig.brandName}} console, for details see: [How to create an app in {{$localeConfig.brandName}}](https://docs.authing.cn/v2/guides/app/create- app.html)

  3.2 In the created Enterprise WeChat internal app sweep login (proxy development mode) identity source connection details page, open and associate an app created in the {{$localeConfig.brandName}} console

<img src="./images/15.png" >

3.3 Experience the Enterprise WeChat internal app swipe login on the login page (proxy development mode) Third-party login

<img src="./images/16.png" >
