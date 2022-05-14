# Use Account & Password to Authenticate

<LastUpdated/>

In Authing, account passwords are divided into the following three forms:

1. Email + password login
2. Username + password login
3. Phone number + password login

When providing users with account and password authentication methods, as an IT system administrator or developer, you also need to implement the following functions:

1. Password reset: the password can be retrieved by email verification code or SMS verification code;
2. Modify the password: You can reset the password with the existing password.
   To use Authing to achieve these functions, we provide three different integrate methods:

3. [使用 {{$localeConfig.brandName}} 托管登录页](#使用托管登录页)，无需一行代码，你可以通过 {{$themeConfig.sampleAppDomain}} 体验。
4. [使用 {{$localeConfig.brandName}} 提供的内嵌登录组件](#使用内嵌登录组件)，可以集成到你的 Web 和移动端项目中，你不需要自己实现登录表单 UI。
5. [使用 API & SDK](#使用-api-sdk)，{{$localeConfig.brandName}} 提供 RESTFul 和 GraphQL 两种形式的 API 以及 10 余种语言或框架的 SDK，你可以基于此自定义 UI 和认证流程。

6. Use Authing hosted login page. No coding work needed. You can experience it through sample-sso.authing.cn.
7. Using the embedded login component provided by Authing. It can be integrated into your web and mobile projects. You don't need to implement the login form UI yourself.
8. Use API & SDK. Authing provides APIs in two forms, RESTFul and GraphQL, and SDKs in more than 10 languages or frameworks. You can customize the UI and authentication process based on this.

## Use hosted login page

### Registration

After the user has successfully registered, the system will send a welcome email to the user's mailbox:

![](../../images/register-by-email.png)

> You can turn off the option of registering to send welcome email in the console settings > security information > user pool security configuration, and you can also modify the default welcome email template in the console settings > message service.

After the user has successfully registered, Authing will send a verification email to the user's mailbox:

![](../../images/verify-user-email.png)

The user can verify the mailbox by clicking the verify button.

### Login

![](../../images/login-page.png)

By default, accounts with unverified mailboxes can log in. You can also modify this configuration in the application details:

![](../../images/disable-unverified-email-login.png)

After the user logs in successfully, it will call back to the callback link you configured. You can get user information here. For details, please see: Use Authing hosted login page to authenticate.

### Modify password

![](../../images/forget-password.png)

Users can modify password in the personal center.

![](../../images/change-password.png)

## Use embedded login component

The embedded login component and the online hosting login page are basically the same in style and interaction. The difference is that the online hosting login page is fully managed and maintained by Authing, which is completely independent of your application. The embedded login component can be integrated in your application.
For detailed usage, please see: [Use the embedded login component to authenticate]().

。

## Use API & SDK

### Register

<StackSelector snippet="register-by-email-password" selectLabel="选择语言" :order="['java', 'javascript', 'python', 'csharp']"/>

### Login

<StackSelector snippet="login-by-email-password" selectLabel="选择语言" :order="['java', 'javascript', 'python', 'csharp']"/>

### Reset password

<StackSelector snippet="reset-password" selectLabel="选择语言" :order="['java', 'javascript', 'python', 'csharp']"/>

### Modify password

<StackSelector snippet="update-password" selectLabel="选择语言" :order="['java', 'javascript', 'python', 'csharp']"/>
