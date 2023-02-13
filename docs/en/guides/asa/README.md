# Authing Secure Authentication (ASA)

<LastUpdated/>

Authing Secure Authentication (ASA) is a feature developed by {{$localeConfig.brandName}} to provide single sign-on (SSO) for external web applications that do not support standard authentication protocols (OAuth2.0, OIDC, SAML, CAS) ) Function.

Administrators can assign application account secrets to users. {{$localeConfig.brandName}} stores the account secret in the database encrypted. When a user accesses the login interface of an app assigned an account password, {{$localeConfig.brandName}} will automatically fill in the account password and log in. End users can directly access the assigned application by simply logging in to {{$localeConfig.brandName}}.

## How to use

### Create ASA Application

Find an application that supports ASA in the {{$localeConfig.brandName}} application market. Let's take the "ShiMo" as an example to demonstrate.

![](~@imagesZhCn/guides/asa/1.png)

Click to enter the details, click "Get"

![](~@imagesZhCn/guides/asa/2.png)

Fill in the application name and click "Next"

![](~@imagesZhCn/guides/asa/3.png)

Click "Finish"

![](~@imagesZhCn/guides/asa/4.png)

On the account assignment page, assign an application account to the user

![](~@imagesZhCn/guides/asa/5.png)

On the access authorization page, select "Allow all users to access"

![](~@imagesZhCn/guides/asa/6.png)

### Download Plugin

End users need to download a browser plug-in to use the ASA. The download list of the browser plug-in is as follows, if the browser you use is not in the list below, please try to install the Chrome version of the plug-in:

| Browser           | Instructions                                                                                                                                                                                                                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Google Chrome     | <ul><li>Try opening the [Chrome Web Store](https://chrome.google.com/webstore/detail/authing-secure-authentica/oeikeglindpddkmhcfgjadjmkbemfohm) to install</li><li>If you can't access the link above, check out the <a href="./chrome-manual-install.html" target="_blank">Chrome Manual Install Plugin</a> to install it</li></ul> |
| 360 Speed Browser | Go to the [Application Center](https://ext.chrome.360.cn/webstore/detail/djnmokbcodildihilkkhomijjmpmcdmk) to download and install, and you can use this plugin after logging in to the Authing application panel                                                                                                                     |
| 360 Safe Browser  | Go to the [Application Center](https://ext.se.360.cn/webstore/detail/djnmokbcodildihilkkhomijjmpmcdmk) to download and install, and you can use this plugin after logging in to the Authing application panel                                                                                                                         |
| Firefox           | Go to the [ADD-ONS](https://addons.mozilla.org/en-US/firefox/addon/authing-secure-authentication/) to download and install, and you can use this plugin after logging in to the Authing application panel                                                                                                                             |

<!-- | Safari         | 进入 [App Store](https://apps.apple.com/cn/app/%E6%90%9C%E7%8B%97%E8%BE%93%E5%85%A5%E6%B3%95-%E8%AF%AD%E9%9F%B3%E5%8F%98%E5%A3%B0%E6%96%97%E5%9B%BE%E8%A1%A8%E6%83%85/id917670924) 下载并安装，登录 Authing 应用面板后即可使用此插件                                                         | -->

### Experience Login

Click the "Experience Login" button in the single sign-on application list to enter the {{$localeConfig.brandName}} application panel login page.

![](~@imagesZhCn/guides/asa/7.png)

Enter the email address and password of the user who was assigned an account before, click "Login" to enter the application panel.

![](~@imagesZhCn/guides/asa/8.png)

A red exclamation mark will appear on the plug-in icon, click the "plug-in icon" to open the plug-in page, and click "Trust" the current account.

![](~@imagesZhCn/guides/asa/9.png)

The plug-in will display a list of all applications assigned to the current account by the administrator, and you can see the "ShiMo" you added before.

![](~@imagesZhCn/guides/asa/10.png)

Enter the login interface of the corresponding application, and the {{$localeConfig.brandName}} browser plug-in will automatically fill in the previously assigned account password and log in automatically. Sometimes the application needs to perform some man-machine verification. This behavior requires manual operation by the user, and the plug-in cannot skip it.

![](~@imagesZhCn/guides/asa/11.png)

After the verification is completed, the login is successful.

![](~@imagesZhCn/guides/asa/12.png)

We are accelerating the ASA plugin to support more applications, if you want your application to be supported, you can learn more details in [Join APN Overview](../../apn/README.md).

## Custom ASA Application

If you cannot find the application you need in the application market, you can use a custom ASA application.

### Create a custom ASA application

Let's take "ShiMo" as an example to illustrate. First find the **Custom ASA App** in the app store.

![](~@imagesZhCn/guides/asa/custom-1.png)

Click to enter the details, then click "Get Application" to enter the application configuration interface, upload the application logo, fill in the application name, and click "Next".

![](~@imagesZhCn/guides/asa/custom-2.png)

Enter the ASA configuration interface

- First enter **app login page URL**, for example, the login page URL of "Shimo Document" is **https://shimo.im/loginByPassword**.
- Then fill in **ASA automatic login steps**, the automatic login steps must be a legal JSON string, and it is an object array, and the ASA plug-in will perform object operations in order according to this array. All keys of objects in the array are as follows:

  - **action**: Indicates the operation type of the current step, all operation types are

    - **type**: input, such as input account number
    - **click**: Click, such as clicking the login button
    - **selectFrame**: switch the iframe, some website login boxes will be nested in the iframe, at this time you need to switch to the iframe where the login box is located to enter the account password to log in
    - **wait**: Wait for a certain period of time. For example, after entering the account password on some web pages, you need to wait for a certain period of time before clicking the login button

  - **target**: Indicates the operation target of the current step, the value is a string, accepts all [querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) can Accepted dom element selectors, such as `#password`
  - **value**: Indicates the operation value of the current step
    - When used in the **type** operation, the value is a string, <code><span v-pre>{{account}}</span></code> can be used to indicate the bound account, and <code><span v-pre>{{password}}</span></code> can be used to indicate the bound password
    - When used in the **wait** operation, the value is a number in milliseconds, such as 1000 means waiting for 1 second

- The account allocation method currently only supports **administrator setting account and password**

![](~@imagesZhCn/guides/asa/custom-3.png)

Click "Finish" to assign an application account to the user on the account assignment page

![](~@imagesZhCn/guides/asa/custom-4.png)

On the access authorization page, select "Allow all users to access"

![](~@imagesZhCn/guides/asa/custom-5.png)

Follow up [Experience login](#experience-login)
