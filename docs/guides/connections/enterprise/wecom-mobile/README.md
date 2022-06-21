# Enterprise WeChat Mobile

<LastUpdated/>

## 场景介绍

- **概述**：在移动应用中拉起企业微信 APP 让用户进行登录的免登录场景。 为企业实现以企业微信为身份源安全登录第三方应用或者网站。 在 {{$localeConfig.brandName}} 中配置并开启 企业微信移动端 的企业登录，即可实现通过 {{$localeConfig.brandName}} 快速获取 企业微信 基本开放的信息和帮助用户实现免密登录功能。
- **应用场景**：移动端应用
- **终端用户预览图**：

<img src="./images/00.png" >

## 注意事项：

- 如果您未开通 企业微信开发者 账号，请先前往 [企业微信开发者后台](https://work.weixin.qq.com/) 进行注册；
- If you do not have a {{$localeConfig.brandName}} console account, please go to [{{$localeConfig.brandName}} Console](https://{{$localeConfig.brandName}}.cn/) to register for a developer account.

## Step 1: Create Enterprise Self-Built App

Go to [Enterprise WeChat Developer Backend](https://work.weixin.qq.com/wework_admin/frame#profile) and

In the **App Management** - **App** page, create a self-built app

<img src="./images/create-app.png" >


On the app details page, click Set Enterprise Wechat Authorized Login:.

<img src="./images/click-wechat-work-authz.png" >

点击 IOS 或 Android 选项，获取 schema 并填入应用的应用签名和包名
<img src="./images/schema.png" >


## 步骤 2：在 {{$localeConfig.brandName}} 控制台配置 企业微信移动端

2.1 请在 {{$localeConfig.brandName}} Console 控制台 的「企业身份源」页面，点击「创建企业身份源」按钮，进入「选择企业身份源」页面，点击「企业微信」身份源按钮

<img src="./images/01.png" >

2.2 选择 「企业微信移动端」。

<img src="./images/02.png" >

2.3 请在「企业微信移动端」页面，填写相关的字段信息。
<img src="./images/03.png" >

| 字段 | 描述 |
| ------------- | ------------------------------------------------------------------------------------------------------------------- ----------------------------------------- |
| 唯一标识 | a. 唯一标识由小写字母、数字、- 组成，且长度小于 32 位。 <br />b. 这是此连接的唯一标识，设置之后不能修改。                                                    |
| 显示名称 | 这个名称会显示在终端用户的登录界面的按钮上。                                                                                                                |
| 企业 ID | 在企业微信应用的后台， **凭证与基础信息** 中可以看到 App ID 和 App Secret 。                                                                                                                            |
| AgentID | 在企业微信应用的后台， **凭证与基础信息** 中可以看到 App ID 和 App Secret 。                                                                                                                            |
| Secret | 在企业微信应用的后台， **凭证与基础信息** 中可以看到 App ID 和 App Secret 。                                                                                                                        |
| Schema | The App ID and App Secret can be found in **Credentials and Basic Information** in the backend of the Enterprise Wechat application.                                                                                                                         |Schema
| Login Mode | After you turn on "Login Only Mode", you can only login to your existing account, you cannot create new account, please choose carefully.                                                                                         |Sign In Mode
| Account Identity Association | When "Account Identity Association" is not enabled, users can create new users by default when they log in through the identity source. If "Account Identity Association" is enabled, you can allow users to log in to existing accounts directly by "Field Matching" or "Ask to Bind". |

You can get the Enterprise ID on the My Enterprise - Enterprise Information page.

<img src="./images/get-corp-id.png" >

On the app details page, you can get the **AgentId** and **Secret** for the app at.

! [](./images/get-agentid-secret.png)

## Step 3: Development Access

- **Recommended development access**: Use hosted login page

- **Description of advantages and disadvantages**: Simple operation and maintenance by {{$localeConfig.brandName}}. Each user pool has a separate secondary domain; if you need to embed it in your application, you need to use the popup mode login, i.e.: after clicking the login button, a window will pop up with {{$localeConfig.brandName}} hosted login page, or redirect the browser to {{$localeConfig.brandName }} to the hosted login page.

- **Detailed access method**.

## Mobile access sdk
