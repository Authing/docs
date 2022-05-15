# WeChat internal web page uses WeChat Authorized Login

<LastUpdated/>

{{$localeConfig.brandName}} developer provides the developer with a method of obtaining user information in the WeChat web page and completing the login. If the user accesses a third-party web page in the WeChat client, the public account can obtain the basic information of the user through the WeChat webpage authorization mechanism, and then implement business logic.

- Application Scene: WeChat web page, public number;
- Overview: The WeChat Authorization box is popped up within the webpage within the WeChat app. After the user authorizes the current user information;
- View [WeChat official document](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html)。

<img src="./images/wechat-web-authorize.png" height="400px" style="display:block;margin: 0 auto;"/>

## Sample code

You can get sample code here:[https://github.com/authing/wechat-eco-solution](https://github.com/authing/wechat-eco-solution), Access [online sample application](https://authing.cn/sample-wx.html)。

## Step 1: Create a WeChat service number in the WeChat public platform

Please go to the [WeChat public platform](https://mp.weixin.qq.com/cgi-bin/readtemplate?t=register/step1_tmpl&lang=zh_CN&token=) guide creates a WeChat service number.

You need to record the **developer ID (App ID)** and **Developer Key (App Secret)**, It needs to be used later. In the background of WeChat public platform **setting** -> **Public number setting** -> **Function setting** page settings **Web Page Authorization Scope** is `core.authing.cn`. In the process, you need to check the legality of the domain name. For details, please see the next step.

## Step 2: In the {{$localeConfig.brandName}} console Configure WeChat webpage authorization applications

In the console's social login configuration page, find **WeChat webpage license login** app, fill in the following configuration:

- App ID: Developer ID;
- App Secret: Developer key;
- Callback URL：This is your business callback domain name, and the callback link configured by the socialized login application is different. For example, your website domain name is https://example.com , deal with {{$localeConfig.brandName}} callback request url is /auth/callback , Then you should fill in https://example.com/auth/callback. If you need to configure the callback link separately in your application, this address can be filled in: #.
- Txt Filename: txt file name used to verify the domain name.
- Txt Content: txt file content used to verify the domain name.

Click "OK" to save information after the configuration is complete.

## Step 3: Start development access

First use CDN introduction `authing-wxmp-sdk`：

```html
<script src="https://cdn.jsdelivr.net/npm/@authing/wxmp/dist/authing-wxmp-sdk.min.js"></script>
```

> `authing-wxmp-sdk` For detailed documentation, please see:[WeChat web page authorization login SDK](/reference/sdk-for-wxmp.md)。

### initialization SDK

Use the userpool ID to initialize SDK:

```javascript
const authingWx = new AuthingWxmp({
  userPoolId: "YOUR_USERPOOLID"
});
```

### Launched WeChat Authorization

Call the `getAuthorizationUrl` method Get the WeChat Authorized Login link, modify the`window.location` jump to the WeChat login authorization page:

```javascript
// Jump to WeChat Authorization page
window.location = authingWx.getAuthorizationUrl();
```

### Get user information

Jump back to the business callback link After getting user information by `getUserInfo` method:

```javascript
// If the callback page authingWx is not initialized, it is necessary to initialize first, and the specific initialization method reference is

const { ok, userinfo, message } = authingWx.getUserInfo();
if (ok) {
  // do with userinfo
  console.log(userinfo);
} else if (message) {
  // message contains an error message
  alert(message);
}
```

## Next

!!!include(en/common/what-to-do-when-you-get-userinfo.md)!!!
