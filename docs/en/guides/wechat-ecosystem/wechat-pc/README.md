# PC website using WeChat scan code to log in

<LastUpdated/>

WeChat PC scan code login allows users to securely log in to third-party applications or websites with WeChat identity. After enabling WeChat scan code login in Authing, it can quickly obtain basic open information of WeChat users through Authing and help users realize basic open functions.

- Application scenario: PC website;
- Overview: Jump to the WeChat QR code page in the PC website application, and then use WeChat to scan the code to log in to the application;
- View WeChat official [documentation](https://developers.weixin.qq.com/doc/oplatform/en/Website_App/WeChat_Login/Wechat_Login.html).

<img src="../images/wechat-pc-scan-login.png" height="400px" style="display:block;margin: 0 auto;"/>

<!-- ## Sample Code

You can get sample code here: [https://github.com/Authing/wechat-eco-solution](https://github.com/Authing/wechat-eco-solution)。 -->

## Step 1: Create a website application on the WeChat open platform

Please open the [WeChat platform](https://open.weixin.qq.com/cgi-bin/frame?t=home/web_tmpl) Guide to create a WeChat website application, you need to record the `App ID` and `App Secret` of the application , which will be used later. Please make sure that the app has obtained the permission to `log in with WeChat` , and set the authorization callback domain to `core.authing.cn`.

## Step 2: Configure the WeChat scan code application in the Authing console

On the social login configuration page of the console, find the `WeChat` PC scan code login application, and fill in the following configuration:

- App ID: WeChat application ID;
- App Secret: WeChat application key;
- Callback URL: This is your business callback domain name, which is not a concept related to the callback link configured by the self-built application, nor is it related to the callback address configuration of the third-party social login console . For example, the domain name of your website is https://example.com, and the url for processing the Authing callback request is /auth/callback, then you should fill in as https://example.com/auth/callback. This parameter has been deprecated. It is recommended to configure the callback link separately in the application, where the address can be filled with `#`.

# Step 3: Start developing access

Authing social login supports four access methods: using JavaScript SDK , using embedded login component , using managed login page and manually invoking social login interface . Each access method has its own advantages and disadvantages. You can choose the appropriate method according to your business needs.

Here's a comparison of the pros and cons of each approach:

| Access method                            | Advantage                                                                                                                                               | disadvantage                                                                                                                                                                                                                                                                       | Recommend |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| JavaScript SDK                           | Access is simple and only requires a few lines of code. The most customizable.                                                                          |                                                                                                                                                                                                                                                                                    | Yes       |
| embedded login component                 | Access is simple and only requires a few lines of code. This component can be integrated into your application. Relatively high degree of customization |                                                                                                                                                                                                                                                                                    | Yes       |
| hosted login page                        | Simple operation and maintenance, Authing is responsible for operation and maintenance. Each user pool has an independent second-level domain name.     | If you need to embed into your application, you need to use the pop-up mode to log in, that is: after clicking the login button, a window will pop up with the content of the login page hosted by Authing, or the browser will be redirected to the login page hosted by Authing. | Yes       |
| Manually call the social login interface |                                                                                                                                                         | User information needs to be parsed manually from the URL. Access is relatively complicated and troublesome.                                                                                                                                                                       | No        |

<StackSelector snippet="social-login" selectLabel="Method" :order="['sdk', 'embeded-component', 'hosted-page', 'manually']"/>

## Next

!!!include(en/common/what-to-do-when-you-get-userinfo.md)!!!
