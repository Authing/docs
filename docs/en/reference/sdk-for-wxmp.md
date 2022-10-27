# WeChat web page authorization login SDK

> {{$localeConfig.brandName}} WeChat web page authorization SDK, five minutes to access WeChat web page authorization login.

## Development preparation

- WeChat public number: Go to [WeChat public platform](https://mp.weixin.qq.com/) register
- Must be a service number
- Must pass the WeChat certification

Development of the WeChat Public Platform Background -> Basic Configuration Page Get the Developer ID (AppID) and Developer Password (AppSecret).

Settings in the background of the WeChat public platform -> Public number settings -> Features Settings page settings **Web licensorship domain name**.

Domain name fill in:`core.authing.cn`。

![](~@imagesZhCn/reference/sdk-for-wxapp/mpverify.jpg)

For security verification, the WeChat server needs to be verified by the {{$localeConfig.brandName}} server, the developer needs to download the txt file and record the **file name** and **text content**.

Finally in {{$localeConfig.brandName}} console **connection identity source** -> **Social login** Open **WeChat web page authorization login**:

![](./images/Xnip2021-02-27_14-03-15.png)

Fill in the pop-up form:

<img src="~@imagesZhCn/reference/Xnip2021-02-27_14-04-15.png" alt="drawing"/>

- AppID：WeChat developer ID
- Appsecret: WeChat developer password
- Redirect：Your business callback link
- Txt Filename：The name of the txt file recorded earlier
- Txt Content：Previous records of txt text

## Install

use CDN：

```javascript
<script src="https://cdn.jsdelivr.net/npm/@authing/wxmp/dist/authing-wxmp-sdk.min.js"></script>
```

Then you can reference the `AuthingWxmp` under the browser environment.

use npm / yarn：

```
npm install --save @authing/wxmp
```

or

```
yarn add @authing/wxmp
```

Then introduced in the following ways:

```javascript
import AuthingWxmp from "@authing/wxmp";
```

## Launched WeChat Authorization

> First from [{{$localeConfig.brandName}} console](https://console.authing.cn) [Get Userpool ID](/guides/faqs/get-userpool-id-and-secret.md).

```javascript
const authingWx = new AuthingWxmp({
  userPoolId: "YOUR_USERPOOLID"
});

// Jump to WeChat Authorization page
window.location = authingWx.getAuthorizationUrl();
```

## Get user information

```javascript
// Jump back to the business callback link to get user information
// If the callback page AuthingWx is not initialized, it is necessary to initialize first, and the specific initialization method reference is

const { ok, userinfo, message } = authingWx.getUserInfo();
if (ok) {
  // do with userinfo
  console.log(userinfo);
} else if (message) {
  // message contains error tips
  alert(message);
}
```

> Complete DEMO can be obtained from the [examples](./examples/) directory.

## Complete API list

- checkWechatUA
- getAuthorizationUrl
- getUserInfo

### Constructor

parameter:

- options
  - userPoolId: userpool ID, required.
  - host: Specify OAuth server address, option, default
    `javascript { oauth: "https://oauth.authing.cn/" }`
    Example:

```javascript
const authingWx = new AuthingWxmp({
  userPoolId: "YOUR_USERPOOLID"
});
```

### checkWechatUA

> Determine if the current environment is the WeChat client.

Example:

```javascript
if (!authingWx.checkWechatUA()) {
  alert("Please open in the WeChat client!");
}
```

### getAuthorizationUrl

> Get WeChat Authorization Link

Example:

```javascript
// Click the login button to jump to the WeChat web authorization page
loginBtn.onclick = function() {
  window.location = authingWx.getAuthorizationUrl();
};
```

### getUserInfo

> Get user information from the Search section of the current page URL

parameter:

- search：Search section of the browser page link, optional, default `window.location.search`。

Example:

```javascript
const { ok, userinfo, message } = authingWx.getUserInfo();
if (ok) {
  // do with userinfo
  console.log(userinfo);
} else if (message) {
  // message contains error tips
  alert(message);
}
```

## Authorization process

1. Developers guide users to jump to {{$localeConfig.brandName}} settings for the authorization link: `https://oauth.authing.cn/oauth/wechatmp/url:userPoolId`, common ways are:

- When the user opens through the WeChat client web page, let the browser automatically jump.
- When the user opens through the WeChat client web page, click the login button to jump

2. {{$localeConfig.brandName}} and WeChat server complete OAuth authentication authorization

- {{$localeConfig.brandName}} saves the developer to save authorization_code, get Access_token, in exchange for the process of user information, and true zero line code access.

- For detailed procedures, please see [WeChat official documentation](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html)。

3. {{$localeConfig.brandName}} Carry User Information Jump back to the developer in **{{$localeConfig.brandName}} background** set **business jump link**, carrying data with `Code`,`Message`, `data`:

- `code`
  - 200: Get the success of user information
  - Other: Get user information failure
- `message`: Error prompt information (when getting user information failure)
- `data`: User information (available for user information)

`data` Example:

```
{
    "_id": "5dc10bcb6f94c178c6ffffb9",
    "email": null,
    "emailVerified": false,
    "unionid": "oiPbDuG4S7msrKHPKDc8MECSe8jM",
    "openid": "oiPbDuG4S7msrKHPKDc8MECSe8jM",
    "oauth": "{\"openid\":\"oiPbDuG4S7msrKHPKDc8MECSe8jM\",\"nickname\":\"张三\",\"sex\":1,\"language\":\"zh_CN\",\"city\":\"海淀\",\"province\":\"北京\",\"country\":\"中国\",\"headimgurl\":\"http://thirdwx.qlogo.cn/mmopen/vi_32/GkxYERPDdTMk7bOk3BgBmEEYul8oMcOoLgNHLoibZn5ibe4EulWBp1xo6uN4az59eoSBYBW0QmXB9TrsJEM0EoPw/132\",\"privilege\":[]}",
    "registerMethod": "oauth:wxmp",
    "username": "张三",
    "nickname": "张三",
    "company": "",
    "photo": "https://usercontents.authing.cn/avatar-5dc10bcb6f94c178c6ffffb9-1572932555337",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVuaW9uaWQiOiJvaVBiRHVHNFM3bXNyS0hQS0RjOE1FQ1NlOGpNIiwiaWQiOiI1ZGMxMGJjYjZmOTRjMTc4YzZmZmZmYjkiLCJjbGllbnRJZCI6IjVkYTdlZGFiNTAzOTZjMWFkOTYyMzc4YSJ9LCJpYXQiOjE1NzI5NTY0MjUsImV4cCI6MTU3NDI1MjQyNX0.OTgl72WZS8So3R5DbWCJ7I_Bd0LaZa4S0TAVMg9qaYQ",
    "tokenExpiredAt": "11/20/2019, 8:20:25 PM",
    "loginsCount": 43,
    "lastLogin": "11/5/2019, 8:20:25 PM",
    "lastIP": "127.0.0.1",
    "signedUp": "11/5/2019, 1:42:35 PM",
    "blocked": false,
    "isDeleted": false
}
```

4. Developers use token to maintain login status

The `token` is a login credential, and the developer should save properly, and **the subsequent request needs to be carried on this token**:

Set the Authorization request head as "Bearer" + token, for example:

```
Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVuaW9uaWQiOiJvaVBiRHVHNFM3bXNyS0hQS0RjOE1FQ1NlOGpNIiwiaWQiOiI1ZGMxMGJjYjZmOTRjMTc4YzZmZmZmYjkiLCJjbGllbnRJZCI6IjVkYTdlZGFiNTAzOTZjMWFkOTYyMzc4YSJ9LCJpYXQiOjE1NzI5NTY0MjUsImV4cCI6MTU3NDI1MjQyNX0.OTgl72WZS8So3R5DbWCJ7I_Bd0LaZa4S0TAVMg9qaYQ"
```

If you are using Nodejs [axios](https://github.com/axios/axios), you can write this:

```javascript
axios.get(SOME_SERVICE_URL, {
  headers: {
    Authorization: `Bearer ${userinfo.token}`
  }
});
```

When the end user carries this Toekn to access the developer's interface, **developers need to judge whether this token is legal and in the login status**, Authing provides several ways: [Verify the user token](/guides/faqs/how-to-validate-user-token.md). The data returned by Authing contains information such as the user ID, the user ID, the user ID, after which the developer can process the request according to the needs of the specific service.

1. Summarize the above flow

- Developers guide users to jump to the WeChat Authorization page: https://oauth.authing.cn/oauth/wechatmp/url:userPoolId.
- The end user agrees to authorize.
  - Authing and WeChat completed user information interaction based on the OAuth protocol.
  - Authing Send User Information (including Token) to developer custom business callback link
- The end user follow-up request will carry token.
- The developer calls [{{$localeConfig.brandName}} method](/guides/faqs/how-to-validate-user-token.md) checks the legality and login status of token.
- The request is processed according to the login status of {{$localeConfig.brandName}} and the developer's own business logic.
