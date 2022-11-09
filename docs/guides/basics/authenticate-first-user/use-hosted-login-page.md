# 使用托管登录页完成认证

<LastUpdated/>

{{$localeConfig.brandName}} 托管登录页是最简单、安全的集成方式。这是因为登录流程由 {{$localeConfig.brandName}} 维护，并由 {{$localeConfig.brandName}} 保证安全。对于应用集成，建议使用 {{$localeConfig.brandName}} 托管的登录流程。你的业务系统将用户重定向到 {{$localeConfig.brandName}} 登录页，在此用户进行身份验证，然后重定向回在控制台配置的应用回调连接。此设计被认为是安全性最佳实践。在自定义配置方面，托管模式提供了登录注册表单自定义配置，可通过控制台配置和 CSS 进行界面自定义。

本文档将会介绍如何使用 {{$localeConfig.brandName}} 托管的登录页快速实现一个完整的用户认证流程。

## 创建一个用户池

[用户池](/concepts/user-pool.md) 是你用户系统的隔离的最小单位，你可以把不同场景的用户划分在不同的用户池。每个用户池下都可以有用户和应用程序，不同用户池之间的权限、应用、组织是完全隔离的。

如果你还没有 {{$localeConfig.brandName}} 开发者账号，你需要先在[控制台](https://console.authing.cn)注册一个 {{$localeConfig.brandName}} 开发者账号。注册完成之后，会引导你创建自己的用户池。

如果你已经有账号，想再创建一个用户池，可以点击左侧导航栏最上方的按钮：

<img src="./images/create-userpool-3.png" width="300" alt="drawing"/>

选择用户池类型：

<img src="./images/select-trial-userpool.png" height=400 style="display:block;margin: 0 auto;">

有关创建用户池详情，请参阅 [新老用户如何创建用户池](/guides/basics/trial/admin.md)。

## 创建一个应用

在控制台 **自建应用** 页，你可以查看自己的应用列表：

![](./images/app-list.png)

应用创建成功后，点击右侧的 **体验登录** 按钮体验登录该应用：

![](./images/try-login.png)

在弹出的新窗口中，你可以看到这个由 {{$localeConfig.brandName}} 托管的在线登录页，该登录页集成了登录、注册、忘记密码、社交登录、MFA 等功能：

<img src="./images/login-page.png" height=450 style="display:block;margin: 0 auto;">

有关创建和配置应用详情，请参阅 [自建应用综述](/guides/app-new/create-app/)。

## 创建一个用户

点击 **立即注册**，选择 **密码注册**，输入邮箱和密码，再次确认密码，勾选同意隐私和服务条款后，点击 **注册** 按钮。


<img src="./images/register.png" height=450 style="display:block;margin: 0 auto;">

注册成功之后，你可以在控制台的 [用户列表](控制台 **用户管理** 菜单下) 页看到该用户。

## 体验登录

回到登录页面，输入刚刚创建账号的邮箱和密码，点击 **登录**，登录成功之后，你将跳转到一个回调指引页面（在这个页面你可以查看后续详细的指引流程以及最佳实践，建议完整阅读一遍），你可以看到在 URL 中包含了 `code` 查询参数，我们下一步会用此 `code` 换取 `token`。

![](./images/success-callback.png)

## 使用 code 换取 token

在实际应用中，你需要 **修改回调地址为实际业务地址**，该地址需要为一个后端地址。

![](./images/console-callback-address.png)

获取到 `code` 之后，你需要使用 `code` 换取用户信息，Node.js 示例代码如下：

```javascript
const axios = require("axios");
const qs = require("querystring");
const code2tokenResponse = await axios.post(
  // 修改为你的应用域名
  "https://AUTHING_APP_HOST/oidc/token",
  qs.stringify({
    code,
    client_id: "AUTHING_APP_ID",
    client_secret: "AUTHING_APP_SECRET",
    grant_type: "authorization_code",
    redirect_uri: "AUTHING_APP_REDIRECTURI",
  }),
  {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }
);
const { id_token, access_token } = code2tokenResponse.data;
```

返回的数据中有 [id_token](/concepts/id-token.md) 和 [access_token](/concepts/access-token.md)。简单来说，`id_token` 相当于用户的身份凭证；`access_token` 是允许访问资源的钥匙。有关 Access Token 和 ID Token 的区别，请参阅 [Access Token vs Id Token](/concepts/access-token-vs-id-token.md)。

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IldZU3ZYbVhFRnZCaXcyNW1DTi1rMDZKeDk3d08xNVNlZGIwNjFhcWZ2WFEifQ.eyJqdGkiOiJJWWpZMzR3Y1hfX0tOX2NlbVdleHEiLCJzdWIiOiI1ZWU5YzRmYjM3Mjg5MGE4MTUyOTE4NzMiLCJpYXQiOjE2MTQ0MjE4NjMsImV4cCI6MTYxNTYzMTQ2Mywic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBwaG9uZSIsImlzcyI6Imh0dHBzOi8vc2FtcGxlLWFwcC5hdXRoaW5nLmNuL29pZGMiLCJhdWQiOiI2MDA1M2I3NDE2NDc4ZGUyZTg4ZmFiNDMifQ.XKy6WTE4naogVaz60-u4L3B4O3l_tYBFnOd80089L-6Hm1bCjOaCY14lV4BN11HgZ_JbikrhE4-_SgbaAVIEsK0NC5P22Naz6as_mDv2tAVgH7eVAKKAHIUQQnWGB890KMY0ptRQXOtSI5Ge06LH1Qq3jPvDR-TklwlY8Kg2S1-oxqDQoZuwZxc5b2BC84M3uLYd5mskkVyGdXOtTBtaGhmn2gxUJ_OhqEVAVpsC_QZRi70D3jup1seG_oADXz11ViVP4EtzYx4jy_3CJLkBBZXGoBY6zzrEI02GPT0CXkKzBDQGymcXKK2FEWpeMYmgkKFTT2ZoI_WcsHrLeNJu7Q",
  "expires_in": 1209600,
  "id_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWU5YzRmYjM3Mjg5MGE4MTUyOTE4NzMiLCJiaXJ0aGRhdGUiOiIiLCJmYW1pbHlfbmFtZSI6IiIsImdlbmRlciI6Ik0iLCJnaXZlbl9uYW1lIjoiIiwibG9jYWxlIjoiemhfQ04iLCJtaWRkbGVfbmFtZSI6IiIsIm5hbWUiOiIiLCJuaWNrbmFtZSI6IuW7lumVv-axnyIsInBpY3R1cmUiOiJodHRwczovL3RoaXJkd3gucWxvZ28uY24vbW1vcGVuL3ZpXzMyL0diUUtQMElGdlZOOENmd2UyQ0FPbzFBcW1FWnF1RXVUamhSVEZTRVdIaWJHbkhLaWFjY3RpY3J3VE50OUc4U3hOUG5MUzEwcmJBdFFYRGVKZkJ6VEEwb0p3LzEzMiIsInByZWZlcnJlZF91c2VybmFtZSI6IiIsInByb2ZpbGUiOiIiLCJ1cGRhdGVkX2F0IjoiMjAyMS0wMi0yN1QxMDoyOTo0MC4zNzFaIiwid2Vic2l0ZSI6IiIsInpvbmVpbmZvIjoiIiwiZW1haWwiOm51bGwsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicGhvbmVfbnVtYmVyIjpudWxsLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOmZhbHNlLCJub25jZSI6IjVEdVdSRFZGRkUiLCJhdF9oYXNoIjoiaEdsRmh1YnZhbkNGSGNXc3RtVEtfQSIsImF1ZCI6IjYwMDUzYjc0MTY0NzhkZTJlODhmYWI0MyIsImV4cCI6MTYxNTYzMTQ2MywiaWF0IjoxNjE0NDIxODYzLCJpc3MiOiJodHRwczovL3NhbXBsZS1hcHAuYXV0aGluZy5jbi9vaWRjIn0.32N4cdIf0p7fiGEM6sPS6PH1JPtIwF3Ee4PUaCt6eXU",
  "scope": "openid profile email phone",
  "token_type": "Bearer"
}
```

将 `id_token` [解码](https://jwt.yelexin.cn) 之后，得到的示例数据如下，各字段含义参见上述 [id_token](/concepts/id-token.md)：

```json
{
  "sub": "5ee9c4fb372890a815291873", // subject 的缩写，为用户 ID
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

你可以使用上一步换到的 `access_token` 来获取用户的详细信息，示例代码如下：

```javascript
const axios = require("axios");
const token2UserInfoResponse = await axios.get(
  "https://sample-app.authing.cn/oidc/me?access_token=" + access_token
);
console.log(token2UserInfoResponse.data);
```

之后你需要将 `id_token` 传递回给前端，前端应该保存 `id_token`，并在每次请求后端接口时携带。后端接口应当先验证前端传来的 `id_token` 合法性，再处理用户请求。有关验证 Token 合法性的详情，请参阅 [如何验证用户身份凭证（token）](/guides/faqs/how-to-validate-user-token.md)。

::: hint-info

### 无后端场景该如何处理？

前面提到的 `code 换 token` 需要在后端完成，如果你属于无后端场景，可以使用以下两种模式：

#### 使用 OIDC implicit 模式

在控制台 **应用->自建应用** 找到你的应用，在 **应用配置->其他配置->授权配置->授权模式** 开启 **implicit** 模式，并勾选 **id_token token** 返回类型，然后让你的用户使用以下地址发起登录：

```
GET https://sample-app.authing.cn/oidc/auth?client_id=AUTHING_APP_ID&redirect_uri={回调地址}&scope=openid%20profile&response_type=id_token%20token&state={随机字符串}&nonce={随机字符串}
```

{{$localeConfig.brandName}} 以 URL hash 的形式直接返回 `id_token` 和 `access_token` 到回调地址，例如：

```
https://example.com/#id_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Y2QwMjZlZjNlZDlmOTRkODBmZTM2YWUiLCJub25jZSI6IjE4MzEyODkiLCJzaWQiOiI4YzgzN2I5My01OTNlLTQzZjctYWMzNC0yYjRmZDU3ZGFhMTciLCJhdF9oYXNoIjoiVFFtbFlEVTVPZGF1Zjl0U0VKdHY5USIsInNfaGFzaCI6Ind3SDNXclV2b0hiSUp5TWVZVHU4bHciLCJhdWQiOiI1ZDAxZTM4OTk4NWY4MWM2YzFkZDMxZGUiLCJleHAiOjE1NjA0MDkzNjgsImlhdCI6MTU2MDQwNTc2OCwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5hdXRoaW5nLmNuL29hdXRoL29pZGMifQ.T9M0s6rk4Teq6VOOBRIElgHK9KyM3q0ZJj2aS0VD_Fw&access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3OE9XcVJNVXJEUXpMMXpHVzVtUWoiLCJzdWIiOiI1Y2QwMjZlZjNlZDlmOTRkODBmZTM2YWUiLCJpc3MiOiJodHRwczovL29hdXRoLmF1dGhpbmcuY24vb2F1dGgvb2lkYyIsImlhdCI6MTU2MDQwNTc2OCwiZXhwIjoxNTYwNDA5MzY4LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIiwiYXVkIjoiNWQwMWUzODk5ODVmODFjNmMxZGQzMWRlIn0.mR0MZDwlZWGRMsAZjQ27sDFFqYoDgZ6WHTK4C7JbML4&expires_in=3600&token_type=Bearer&state=jazz&session_state=26ec053be9f47d68dc430f84b97efb1095469fe10169a9e00ef4092718714b8b
```

你可以从 `url hash` 中取出 `id_token`，然后可以通过解码 `id_token` 获取用户信息，详情请见 [验证用户身份凭证（token）](/guides/faqs/how-to-validate-user-token.md)。

#### 使用 Authing Browser SDK

Authing 提供另外一种简单的前端获取用户信息的方式，无需处理回调或进行其他配置。

详细使用方式请查看 [单点登录（SSO）](/reference/sdk-for-sso-spa.md)。

:::

## 访问个人中心

在 {{$localeConfig.brandName}} 中创建的每个应用都有一个内置的给终端用户的个人中心页，<span v-pre>地址为 `{YOUR_APP_DOMAIN}/u`</span>，如 `https://sample-app.authing.cn/u`，你可以通过浏览器直接访问该地址：

![](./images/personal-center.png)

在此，终端用户可以查看和修改自己的个人信息、修改密码、绑定邮箱手机号、绑定 MFA 等。

## 使用登录组件

上述流程中，我们使用的是 {{$localeConfig.brandName}} 运维的托管登录页面。同时我们还提供支持各种主流 Web 框架的 [登录组件](/reference/guard/v2/)。相比在线的登录页，登录组件更加灵活，自定义能力更强。你可以将其集成到的自己的页面中，有关登录组件详情，请参阅 [使用内嵌登录组件完成认证](/guides/basics/authenticate-first-user/use-embeded-login-component/)。

## 使用 API & SDK

至此你已经了解了如何借助 {{$localeConfig.brandName}} 的托管登录页快速实现核心的登录注册流程。如果你想有更强的自定义需求，也可以使用 {{$localeConfig.brandName}} 提供的 [API & SDK](/reference/) ，详细流程请见 [使用 API & SDK 完成认证](/guides/basics/authenticate-first-user/use-api-sdk/)。
