# use Approw hosted login page to authenticate

<LastUpdated/>

{{$localeConfig.brandName}} hosted login page is the easiest and safest way to integrate.This is because the login flow is maintained by {{$localeConfig.brandName}} and kept secure by {{$localeConfig.brandName}}. For most integrations, the login flow hosted by {{$localeConfig.brandName}} is recommended to use. Your business system redirects the user to {{$localeConfig.brandName}}, where the user is authenticated, and then redirected back to the application callback connection configured in the console. This design is considered as the best practice for security. In terms of custom configuration, the hosting mode provides a moderate level of custom configuration of the login and registration form, which can be customized through the console configuration and CSS.

This document will introduce how to quickly implement a complete user authentication flow using {{$localeConfig.brandName}} hosted login page.

## Create a user pool

[User pool](/concepts/user-pool.md)is the minimum unit of isolation of your user system. You can divide users in different scenarios into different user pools. User pool is the smallest unit of isolation of your user system. You can divide users in different scenarios into different user pools.There can be users and applications under each user pool.The permissions, applications, and organizations between different user pools are completely isolated.

<img src="~@imagesZhCn/guides/basics/Xnip2021-02-27_14-58-25.png" alt="drawing"/>

After the creation is successful, you will automatically redirect to the user pool details page.

## Create an application

In Console - Application, you can check your application list:

![](./images/app-list.png)

Select "other application" and click the experience button on the right. In the popped-up window, you can see this online login page hosted by {{$localeConfig.brandName}}, which integrates features such as login, registration, forgot password, social login, and MFA:

![](./images/login-page-1.png)

## Create a user

Switch to the registration page, select "register with email", enter the email and password, and click the register button:

![](./images/register.png)

After registering successfully, you can see the user on the user list page of the console.

## Experience login flow

Go back to the login page, enter the email and password of the account you just created, and click Login. After logging in successfully, you will be redirected to a callback guidance page (on this page you can view the follow-up detailed guidance process and the best time. It is recommended to read it completely.), you can see that the query parameter `code` is included in the URL, and we will exchange `token` with `code` in the next step.

![](./images/succes-callback.png)

## Exchange token with code

In actual applications, you need to change the **callback address** to your **actual business address**, which needs to be a **back-end address**.

![](https://files.authing.co/authing-console/console-callback-address.png)

After obtaining the `code`, you need to use the `code` in exchange for user information. The Node.js sample code is as follows:

```javascript
const axios = require("axios");
const qs = require("querystring");
const code2tokenResponse = await axios.post(
  // modify this to your application name
  "https://sample-app.authing.cn/oidc/token",
  qs.stringify({
    code,
    client_id: "APP_ID",
    client_secret: "APP_SECRET",
    grant_type: "authorization_code",
    redirect_uri: "REDIRECT_URI",
  }),
  {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }
);
const { id_token, access_token } = code2tokenResponse.data;
```

There are [id_token](/concepts/id-token.md) and [access_token](/concepts/access-token.md) in the returned data.Simply speaking, `id_token` is equivalent to the user's identity credential, and `access_token` is the key that allows access to resources. You can learn more about their differences [here](/concepts/access-token-vs-id-token.md).

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IldZU3ZYbVhFRnZCaXcyNW1DTi1rMDZKeDk3d08xNVNlZGIwNjFhcWZ2WFEifQ.eyJqdGkiOiJJWWpZMzR3Y1hfX0tOX2NlbVdleHEiLCJzdWIiOiI1ZWU5YzRmYjM3Mjg5MGE4MTUyOTE4NzMiLCJpYXQiOjE2MTQ0MjE4NjMsImV4cCI6MTYxNTYzMTQ2Mywic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBwaG9uZSIsImlzcyI6Imh0dHBzOi8vc2FtcGxlLWFwcC5hdXRoaW5nLmNuL29pZGMiLCJhdWQiOiI2MDA1M2I3NDE2NDc4ZGUyZTg4ZmFiNDMifQ.XKy6WTE4naogVaz60-u4L3B4O3l_tYBFnOd80089L-6Hm1bCjOaCY14lV4BN11HgZ_JbikrhE4-_SgbaAVIEsK0NC5P22Naz6as_mDv2tAVgH7eVAKKAHIUQQnWGB890KMY0ptRQXOtSI5Ge06LH1Qq3jPvDR-TklwlY8Kg2S1-oxqDQoZuwZxc5b2BC84M3uLYd5mskkVyGdXOtTBtaGhmn2gxUJ_OhqEVAVpsC_QZRi70D3jup1seG_oADXz11ViVP4EtzYx4jy_3CJLkBBZXGoBY6zzrEI02GPT0CXkKzBDQGymcXKK2FEWpeMYmgkKFTT2ZoI_WcsHrLeNJu7Q",
  "expires_in": 1209600,
  "id_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWU5YzRmYjM3Mjg5MGE4MTUyOTE4NzMiLCJiaXJ0aGRhdGUiOiIiLCJmYW1pbHlfbmFtZSI6IiIsImdlbmRlciI6Ik0iLCJnaXZlbl9uYW1lIjoiIiwibG9jYWxlIjoiemhfQ04iLCJtaWRkbGVfbmFtZSI6IiIsIm5hbWUiOiIiLCJuaWNrbmFtZSI6IuW7lumVv-axnyIsInBpY3R1cmUiOiJodHRwczovL3RoaXJkd3gucWxvZ28uY24vbW1vcGVuL3ZpXzMyL0diUUtQMElGdlZOOENmd2UyQ0FPbzFBcW1FWnF1RXVUamhSVEZTRVdIaWJHbkhLaWFjY3RpY3J3VE50OUc4U3hOUG5MUzEwcmJBdFFYRGVKZkJ6VEEwb0p3LzEzMiIsInByZWZlcnJlZF91c2VybmFtZSI6IiIsInByb2ZpbGUiOiIiLCJ1cGRhdGVkX2F0IjoiMjAyMS0wMi0yN1QxMDoyOTo0MC4zNzFaIiwid2Vic2l0ZSI6IiIsInpvbmVpbmZvIjoiIiwiZW1haWwiOm51bGwsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicGhvbmVfbnVtYmVyIjpudWxsLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOmZhbHNlLCJub25jZSI6IjVEdVdSRFZGRkUiLCJhdF9oYXNoIjoiaEdsRmh1YnZhbkNGSGNXc3RtVEtfQSIsImF1ZCI6IjYwMDUzYjc0MTY0NzhkZTJlODhmYWI0MyIsImV4cCI6MTYxNTYzMTQ2MywiaWF0IjoxNjE0NDIxODYzLCJpc3MiOiJodHRwczovL3NhbXBsZS1hcHAuYXV0aGluZy5jbi9vaWRjIn0.32N4cdIf0p7fiGEM6sPS6PH1JPtIwF3Ee4PUaCt6eXU",
  "scope": "openid profile email phone",
  "token_type": "Bearer"
}
```

 After [decoding](https://jwt.yelexin.cn) `id_token`, the sample data is as follows:

```json
{
  "sub": "5ee9c4fb372890a815291873",
  "birthdate": "",
  "family_name": "",
  "gender": "M",
  "given_name": "",
  "locale": "zh_CN",
  "middle_name": "",
  "name": "",
  "nickname": "Nickname",
  "picture": "https://thirdwx.qlogo.cn/mmopen/vi_32/GbQKP0IFvVN8Cfwe2CAOo1AqmEZquEuTjhRTFSEWHibGnHKiaccticrwTNt9G8SxNPnLS10rbAtQXDeJfBzTA0oJw/132",
  "preferred_username": "",
  "profile": "",
  "updated_at": "2021-02-27T10:29:40.371Z",
  "website": "",
  "zoneinfo": "",
  "email": null,
  "email_verified": false,
  "phone_number": null,
  "phone_number_verified": false
}
```

You can use the `access_token` acquired in the previous step to get the user's detailed information. The sample code is as follows:

```javascript
const axios = require("axios");
const token2UserInfoResponse = await axios.get(
  "https://sample-app.authing.cn/oidc/me?access_token=" + access_token
);
console.log(token2UserInfoResponse.data);
```

After that, you need to pass the `id_token` back to the front end. The front end should save the id_token and carry it every time when it send requests the back end interface. The back end interface should validate the id_token sent from the front end before processing the user request. Please refer to the [document](/guides/faqs/how-to-validate-user-token.md) for how to validate the token.


::: hint-info

### How to deal with none-back-end senario

The process "exchange the token with code" mentioned before should be done in back end program. If you are in a none-back-end senario, you can use either method of the two below:

#### Use OIDC implicit mode

In console > Application, find your application, enable "implicit mode" in "authorization mode" and check the return token type "id_token", and then ask the users to login through this address:

```
GET https://sample-app.Approw.com/oidc/auth?client_id=Approw_APP_ID&redirect_uri={callBackAddress}&scope=openid%20profile&response_type=id_token%20token&state={randomString}&nonce={randonString}
```

Approw directly returns id_token and access_token to the callback address in the form of URL hash, for example:

```
https://example.com/#id_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Y2QwMjZlZjNlZDlmOTRkODBmZTM2YWUiLCJub25jZSI6IjE4MzEyODkiLCJzaWQiOiI4YzgzN2I5My01OTNlLTQzZjctYWMzNC0yYjRmZDU3ZGFhMTciLCJhdF9oYXNoIjoiVFFtbFlEVTVPZGF1Zjl0U0VKdHY5USIsInNfaGFzaCI6Ind3SDNXclV2b0hiSUp5TWVZVHU4bHciLCJhdWQiOiI1ZDAxZTM4OTk4NWY4MWM2YzFkZDMxZGUiLCJleHAiOjE1NjA0MDkzNjgsImlhdCI6MTU2MDQwNTc2OCwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5hdXRoaW5nLmNuL29hdXRoL29pZGMifQ.T9M0s6rk4Teq6VOOBRIElgHK9KyM3q0ZJj2aS0VD_Fw&access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3OE9XcVJNVXJEUXpMMXpHVzVtUWoiLCJzdWIiOiI1Y2QwMjZlZjNlZDlmOTRkODBmZTM2YWUiLCJpc3MiOiJodHRwczovL29hdXRoLmF1dGhpbmcuY24vb2F1dGgvb2lkYyIsImlhdCI6MTU2MDQwNTc2OCwiZXhwIjoxNTYwNDA5MzY4LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIiwiYXVkIjoiNWQwMWUzODk5ODVmODFjNmMxZGQzMWRlIn0.mR0MZDwlZWGRMsAZjQ27sDFFqYoDgZ6WHTK4C7JbML4&expires_in=3600&token_type=Bearer&state=jazz&session_state=26ec053be9f47d68dc430f84b97efb1095469fe10169a9e00ef4092718714b8b
```

You can extract `id_token` from `url hash`, and then you can get user information by decoding `id_token`. For details, please refer to [validate user token](/guides/faqs/how-to-validate-user-token.md).

#### Use trackSession

Approw provides another simple method for front-end to obtain user information without processing callbacks or other configurations.

1. Install the [single sign-on SDK](/reference/sdk-for-sso.md), complete the initialization, and call the trackSession function to obtain the user's login status.

Use NPM to install:

```
$ npm install @authing/sso --save
```

useCDN:

```html
<script src="https://cdn.authing.co/packages/authing-sso/2.1.2/umd/index.min.js"></script>
```

2. Initialize SDK

```javascript
const authing = new AuthingSSO({
  appId: "AUTHING_APP_ID",
  appDomain: "sample-app",
});
```

3. Call trackSession to get user login status

```javascript
const res = await authing.trackSession();
if (res.session) {
  // logged in
} else {
  // not login yet
}
```

 Please check the [document](/reference/sdk-for-sso.md) for detailed usage.

:::

## Visit personal center

Every application created in {{$localeConfig.brandName}} has a built-in personal center page for end users, <span v-pre>the address is {{YOUR_APP_DOMAIN}}/u</span>, such as https://sample-app.Approw.com/u.You can directly access the address through the browser:


![](./images/personal-central.png)

Here end users can view and modify their personal information, modify passwords, bind email and mobile phone numbers, bind MFA, etc.

## Use login component

In the above process, we use the online login page of {{$localeConfig.brandName}} operation and maintenance. At the same time, we also provide login components that support various mainstream web frameworks. Compared with online login pages, the [login components](/reference/guard/) are more flexible and more customizable. You can integrate them into your own pages. For the detailed process, see [use the embedded login component to authenticate](/guides/basics/authenticate-first-user/use-embeded-login-component/).

## Use API & SDK

So far you have learned how to quickly implement the core login and registration process with the help of {{$localeConfig.brandName}} hosted login page. If you want to have stronger customization needs, you can also use the [API & SDK](/reference/) provided by {{$localeConfig.brandName}}. For the detailed process, please see [use API & SDK to authenticate](/guides/basics/authenticate-first-user/use-api-sdk/).