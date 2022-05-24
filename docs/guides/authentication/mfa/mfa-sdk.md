# 通过 SDK 接入 MFA

## 概述

{{$localeConfig.brandName}} 不仅可以通过控制台来配置 MFA 认证流程，你还可以通过 SDK 的方式为 {{$localeConfig.brandName}} 的 MFA 认证流程进行定制化开发

本文将以 [{{$localeConfig.brandName}} - Node/JavaScript SDK](/reference-new/Standard-web-application/sdk-for-node/) 为例，指引用户完成基于 SDK 的 MFA 自定义开发

其中包含：绑定 MFA 认证器、解绑 MFA 认证器、用户二次认证等

## 准备工作

1. <a :href="`${$themeConfig.consoleDomain}`">注册一个 {{$localeConfig.brandName}} 账号</a>
2. [完成用户池和应用的创建](/guides/basics/authenticate-first-user/use-hosted-login-page.md)

## 多因素认证（MFA）API

### 查询用户开启的 MFA 信息

<ApiMethodSpec method="get" :host="$themeConfig.apiDomain" path="/api/v2/mfa/authenticator" summary="查询用户开启的 MFA 信息" description="返回用户开启的 MFA 信息">
<template slot="headers">
<ApiMethodParam name="x-authing-userpool-id" type="string" required description="用户池 ID" />
<ApiMethodParam name="Authorization" type="string" required description="Bearer <用户 Token>" />
</template>
<template slot="queryParams">
<ApiMethodParam name="authenticator_type" type="string" required>

填写 `totp`

</ApiMethodParam>
</template>
<template slot="response">
<ApiMethodResponse>

```json
{
  "code": 200,
  "message": "获取 MFA Authenticator 成功",
  "data": [
    {
      "id": "5f8eea9b018e1407d2ce7975",
      "createdAt": "2020-10-20T13:48:11.288Z",
      "updatedAt": "2020-10-20T13:48:11.288Z",
      "userId": "5cce4a373ed9f9c9c0fd9596",
      "enable": false,
      "secret": "DMDCO7SNNVGU2VKJ",
      "authenticatorType": "totp",
      "recoveryCode": "10af-4f2f-f34f-f224-d21c-bd16"
    }
  ]
}

没有开启 MFA 时返回：
{
  "code": 200,
  "message": "获取 MFA Authenticator 成功",
  "data": []
}
```

</ApiMethodResponse>
</template>
</ApiMethodSpec>

### 请求绑定 MFA 口令

<ApiMethodSpec method="post" :host="$themeConfig.apiDomain" path="/api/v2/mfa/totp/associate" summary="获取 MFA 二维码以及 Secret 信息，用于展示，等待用户确认绑定" description="请求此接口后，用户确认绑定之前，MFA 二次认证不会生效。接口返回 MFA Secret，MFA Uri，MFA 二维码 Data Url，恢复代码。">
<template slot="headers">
<ApiMethodParam name="x-authing-userpool-id" type="string" required description="用户池 ID" />
<ApiMethodParam name="Authorization" type="string" required description="Bearer <用户 Token>" />
</template>
<template slot="bodyParams">
<ApiMethodParam name="authenticator_type" type="string" required>

填写 `totp`

</ApiMethodParam>
</template>
<template slot="response">
<ApiMethodResponse>

```json
{
  "code": 200,
  "message": "获取 MFA 密钥成功",
  "data": {
    "authenticator_type": "totp",
    "secret": "JAPDSOAZLV4BG3RA", // MFA Secret 可用于手动添加 MFA
    "qrcode_uri": "otpauth://totp/playground:getstarted%40{{$themeConfig.officeSiteDomain}}?secret=JAPDSOAZLV4BG3RA&period=30&digits=6&algorithm=SHA1&issuer=playground", // MFA Uri，可用于手动添加 MFA
    // MFA 二维码 Data Url，用于放在 <img> src 中展示二维码
    "qrcode_data_url": "data:image/png;base64,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",
    // 恢复代码
    "recovery_code": "8477-a1a6-662c-a750-bbb4-72a9"
  }
}
```

</ApiMethodResponse>
</template>
</ApiMethodSpec>

### 确认绑定 MFA 口令

<ApiMethodSpec method="post" :host="$themeConfig.apiDomain" path="/api/v2/mfa/totp/associate/confirm" summary="确认绑定 MFA。" description="请求此接口后，用户确认绑定 MFA，之后登录会要求输入二次验证 MFA 口令。">
<template slot="headers">
<ApiMethodParam name="x-authing-userpool-id" type="string" required description="用户池 ID" />
<ApiMethodParam name="Authorization" type="string" required description="Bearer <用户 Token>" />
</template>
<template slot="bodyParams">
<ApiMethodParam name="authenticator_type" type="string" required>

填写 `totp`

</ApiMethodParam>
<ApiMethodParam name="totp" type="string" required>

MFA 口令

</ApiMethodParam>
</template>
<template slot="response">
<ApiMethodResponse description="绑定成功">

```json
{ "code": 200, "message": "TOTP MFA 绑定成功" }
```

</ApiMethodResponse>

<ApiMethodResponse httpCode="400" description="绑定失败">

```json
{ "code": 400, "message": "安全码错误，请重新输入" }
```

</ApiMethodResponse>
</template>
</ApiMethodSpec>

### 一次认证后返回 MFA Token

调用 authing-js-sdk 中的登录方法，参考[登录](/sdk/sdk-for-javascript/README.md#登录)。或者直接调用 [GraphQL 接口](/sdk/open-graphql.md#登录)。你需要存储 mfaToken 以备后续使用。

调用 SDK 的处理方式：

```js
try {
  window.user = await window.authing.login({ email, password })
  alert(`登录成功，信息：${JSON.stringify(window.user)}`)
} catch (err) {
  if (err.message.code === 1635) {
    console.log(err.message.data.email)
    console.log(err.message.data.nickname)
    console.log(err.message.data.username)
    console.log(err.message.data.avatar)
    console.log(err.message.data.mfaToken)
    window.mfaToken = err.message.data.mfaToken
  }
  alert(err.message.message)
}
```

直接调用 GraphQL 接口的返回信息：

```json
{
  "errors": [
    {
      "message": {
        "code": 1635,
        "message": "请输入二次认证安全码",
        "data": {
          "mfaToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJQb29sSWQiOiI1Y2NlNGFhODNlZDlmOTdiNGRmZDk1ZjAiLCJ1c2VySWQiOiI1ZjhlZTYyY2FmYzJmZmFkMzY0MzQ1YjciLCJhcm4iOiJhcm46Y246YXV0aGluZzo1Y2NlNGFhODNlZDlmOTdiNGRmZDk1ZjA6dXNlcjo1ZjhlZTYyY2FmYzJmZmFkMzY0MzQ1YjciLCJzdGFnZSI6MX0sImlhdCI6MTYwMzIwNjcwOCwiZXhwIjoxNjAzMjA3MDY4fQ.PR7LXqpyH--6sF4eAcOcK1yZBi14lRv_lr9qUtbTQM4",
          "nickname": null,
          "email": "q3@123.com",
          "username": null,
          "avatar": "https://usercontents.{{$themeConfig.officeSiteDomain}}/authing-avatar.png"
        }
      },
      "locations": [{ "line": 2, "column": 9 }],
      "path": ["login"],
      "extensions": { "code": "INTERNAL_SERVER_ERROR" }
    }
  ],
  "data": { "login": null }
}
```

### 登录验证 MFA 口令

<ApiMethodSpec method="post" :host="$themeConfig.apiDomain" path="/api/v2/mfa/totp/verify" summary="用于登录时一次认证成功后，检验二次认证口令是否正确。">
<template slot="description">

对于开启二次认证的用户，第一次认证成功后会返回一个 **mfaToken**，需要携带 **mfaToken** 请求本接口完成二次认证

</template>
<template slot="headers">
<ApiMethodParam name="x-authing-userpool-id" type="string" required description="用户池 ID" />
<ApiMethodParam name="Authorization" type="string" required description="Bearer <mfaToken>" />
</template>
<template slot="bodyParams">
<ApiMethodParam name="totp" type="string" required>

MFA 口令

</ApiMethodParam>
</template>
<template slot="response">
<ApiMethodResponse description="登录成功">

```json
{
  "code": 200,
  "message": "二次验证成功",
  "data": {
    "id": "5f8ee62cafc2ffad364345b7",
    "createdAt": "2020-10-20T13:29:16.896Z",
    "updatedAt": "2020-10-20T14:54:07.301Z",
    "userPoolId": "5cce4aa83ed9f97b4dfd95f0",
    "isRoot": false,
    "oauth": null,
    "email": "q3@123.com",
    "phone": null,
    "username": null,
    "unionid": null,
    "openid": null,
    "nickname": null,
    "company": null,
    "photo": "https://usercontents.{{$themeConfig.officeSiteDomain}}/authing-avatar.png",
    "browser": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36",
    "device": null,
    "password": "76847018c664261747924735403ee0a5",
    "salt": "20k8b1318gie",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJQb29sSWQiOiI1Y2NlNGFhODNlZDlmOTdiNGRmZDk1ZjAiLCJhcHBJZCI6bnVsbCwidXNlcklkIjoiNWY4ZWU2MmNhZmMyZmZhZDM2NDM0NWI3IiwiYXJuIjoiYXJuOmNuOmF1dGhpbmc6NWNjZTRhYTgzZWQ5Zjk3YjRkZmQ5NWYwOnVzZXI6NWY4ZWU2MmNhZmMyZmZhZDM2NDM0NWI3IiwiaWQiOiI1ZjhlZTYyY2FmYzJmZmFkMzY0MzQ1YjciLCJfaWQiOiI1ZjhlZTYyY2FmYzJmZmFkMzY0MzQ1YjciLCJwaG9uZSI6bnVsbCwiZW1haWwiOiJxM0AxMjMuY29tIiwidXNlcm5hbWUiOm51bGwsInVuaW9uaWQiOm51bGwsIm9wZW5pZCI6bnVsbH0sImlhdCI6MTYwMzIwNTY0NywiZXhwIjoxNjA0NTAxNjQ3fQ.U1NmmdOydZ-D_yzhQizpZ--Z5hgzSlZbWxKn3e7BYDQ",
    "tokenExpiredAt": "2020-11-04T14:54:07.287Z",
    "loginsCount": 24,
    "lastIp": "124.204.56.98",
    "name": null,
    "givenName": null,
    "familyName": null,
    "middleName": null,
    "profile": null,
    "preferredUsername": null,
    "website": null,
    "gender": "U",
    "birthdate": null,
    "zoneinfo": null,
    "locale": null,
    "address": null,
    "formatted": null,
    "streetAddress": null,
    "locality": null,
    "region": null,
    "postalCode": null,
    "city": null,
    "province": null,
    "country": null,
    "registerSource": ["basic:email"],
    "emailVerified": false,
    "phoneVerified": false,
    "lastLogin": "2020-10-20T14:54:07.298Z",
    "blocked": false,
    "isDeleted": false,
    "sendSmsCount": 0,
    "sendSmsLimitCount": 1000,
    "identities": []
  }
}
```

<ApiMethodResponse httpCode="200" description="口令错误">

```json
{ "code": 6001, "message": "安全码错误，请重新输入" }
```

</ApiMethodResponse>
</ApiMethodResponse>
</template>
</ApiMethodSpec>

### 使用恢复代码

<ApiMethodSpec method="post" :host="$themeConfig.apiDomain" path="/api/v2/mfa/totp/recovery" summary="用于用户登录一次认证成功后，丢失 MFA 口令时恢复账号访问。">
<template slot="description">

如果用户开启了二次认证而丢失了 MFA 口令，需要使用**恢复代码**来恢复账号的访问。使用恢复代码等效于使用 MFA 口令，使用过后会为用户**生成新的恢复代码**。用户可以在登录后解绑 MFA 并重新绑定新的 MFA。

</template>
<template slot="headers">
<ApiMethodParam name="x-authing-userpool-id" type="string" required description="用户池 ID" />
<ApiMethodParam name="Authorization" type="string" required description="Bearer <用户 Token>" />
</template>
<template slot="bodyParams">
<ApiMethodParam name="recoveryCode" type="string" required>

恢复代码，在绑定 MFA 口令时返回的

</ApiMethodParam>
</template>
<template slot="response">
<ApiMethodResponse>

```json
登录成功
{
    "code": 200,
    "message": "二次验证成功",
    "data": {
        "id": "5f8ee62cafc2ffad364345b7",
        "createdAt": "2020-10-20T13:29:16.896Z",
        "updatedAt": "2020-10-20T14:54:07.301Z",
        "userPoolId": "5cce4aa83ed9f97b4dfd95f0",
        "isRoot": false,
        "oauth": null,
        "email": "q3@123.com",
        "phone": null,
        "username": null,
        "unionid": null,
        "openid": null,
        "nickname": null,
        "company": null,
        "photo": "https://usercontents.{{$themeConfig.officeSiteDomain}}/authing-avatar.png",
        "browser": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36",
        "device": null,
        "password": "76847018c664261747924735403ee0a5",
        "salt": "20k8b1318gie",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJQb29sSWQiOiI1Y2NlNGFhODNlZDlmOTdiNGRmZDk1ZjAiLCJhcHBJZCI6bnVsbCwidXNlcklkIjoiNWY4ZWU2MmNhZmMyZmZhZDM2NDM0NWI3IiwiYXJuIjoiYXJuOmNuOmF1dGhpbmc6NWNjZTRhYTgzZWQ5Zjk3YjRkZmQ5NWYwOnVzZXI6NWY4ZWU2MmNhZmMyZmZhZDM2NDM0NWI3IiwiaWQiOiI1ZjhlZTYyY2FmYzJmZmFkMzY0MzQ1YjciLCJfaWQiOiI1ZjhlZTYyY2FmYzJmZmFkMzY0MzQ1YjciLCJwaG9uZSI6bnVsbCwiZW1haWwiOiJxM0AxMjMuY29tIiwidXNlcm5hbWUiOm51bGwsInVuaW9uaWQiOm51bGwsIm9wZW5pZCI6bnVsbH0sImlhdCI6MTYwMzIwNTY0NywiZXhwIjoxNjA0NTAxNjQ3fQ.U1NmmdOydZ-D_yzhQizpZ--Z5hgzSlZbWxKn3e7BYDQ",
        "tokenExpiredAt": "2020-11-04T14:54:07.287Z",
        "loginsCount": 24,
        "lastIp": "124.204.56.98",
        "name": null,
        "givenName": null,
        "familyName": null,
        "middleName": null,
        "profile": null,
        "preferredUsername": null,
        "website": null,
        "gender": "U",
        "birthdate": null,
        "zoneinfo": null,
        "locale": null,
        "address": null,
        "formatted": null,
        "streetAddress": null,
        "locality": null,
        "region": null,
        "postalCode": null,
        "city": null,
        "province": null,
        "country": null,
        "registerSource": [
            "basic:email"
        ],
        "emailVerified": false,
        "phoneVerified": false,
        "lastLogin": "2020-10-20T14:54:07.298Z",
        "blocked": false,
        "isDeleted": false,
        "sendSmsCount": 0,
        "sendSmsLimitCount": 1000,
        "identities": []
    },
    "recoveryCode": "9225-be3f-4646-fa3a-7a32-a098"
}

口令错误
{"code":6002,"message":"恢复代码错误，请重新输入"}
```

</ApiMethodResponse>
</template>
</ApiMethodSpec>

### 解绑 MFA

<ApiMethodSpec method="delete" :host="$themeConfig.apiDomain" path="/api/v2/mfa/totp/associate" summary="解绑 MFA 认证器">
<template slot="description">

请求此接口后，会解绑 MFA，之后登录无需 TOTP MFA 二次认证

</template>
<template slot="headers">
<ApiMethodParam name="x-authing-userpool-id" type="string" required description="用户池 ID" />
<ApiMethodParam name="Authorization" type="string" required description="Bearer <用户 Token>" />
</template>

<template slot="response">
<ApiMethodResponse>

```json
{ "code": 200, "message": "TOTP MFA 解绑成功" }
```

</ApiMethodResponse>
</template>
</ApiMethodSpec>

## 运行方法

双击打开 index.html 文件。

或在项目目录启动一个 http 服务器。

```bash
$ npm install -g http-server
$ http-server
```

然后访问 127.0.0.1:8080

**你可以参考 {{$localeConfig.brandName}} 提供的 [MFA Demo](https://github.com/authing/mfa-demo)**

## 多因素认证（MFA）SDK

## 请求绑定 MFA 认证器：

```javascript
import { AuthenticationClient } from 'authing-js-sdk'

const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://xxx.authing.cn',
})

await authenticationClient.mfa.assosicateMfaAuthenticator({
  authenticatorType: 'totp',
})
```

## 验证 MFA 二次口令：

```javascript
import { AuthenticationClient } from 'authing-js-sdk'

const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://xxx.authing.cn',
})

await authenticationClient.mfa.verifyTotpMfa({
  totp: '112233',
  mfaToken: 'xxx',
})
```

## 获取 MFA 认证器

MfaAuthenticationClient().getMfaAuthenticators()

> 获取 MFA 认证器

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://xxx.authing.cn',
})

const authenticators = await authenticationClient.mfa.getMfaAuthenticators({
  type: 'totp',
})
```

#### 返回值

- `Promise<IMfaAuthenticators>`

## 请求 MFA 二维码和密钥信息

MfaAuthenticationClient().assosicateMfaAuthenticator()

> 请求 MFA 二维码和密钥信息

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://xxx.authing.cn',
})

const authenticators = await authenticationClient.mfa.assosicateMfaAuthenticator(
  { authenticatorType: 'totp' }
)
```

#### 返回值

- `Promise<IMfaAssociation>`

## 解绑 MFA

MfaAuthenticationClient().deleteMfaAuthenticator()

> 解绑 MFA

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://xxx.authing.cn',
})

const authenticators = await authenticationClient.mfa.deleteMfaAuthenticator()
```

#### 返回值

- `Promise<IMfaDeleteAssociation>`

## 确认绑定 MFA

MfaAuthenticationClient().confirmAssosicateMfaAuthenticator()

> 确认绑定 MFA

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://xxx.authing.cn',
})

const authenticators = await authenticationClient.mfa.confirmAssosicateMfaAuthenticator(
  { authenticatorType: 'totp', totp: '112233' }
)
```

#### 返回值

- `Promise<IMfaConfirmAssociation>`

## 检验二次验证 MFA 口令

MfaAuthenticationClient().verifyTotpMfa()

> 检验二次验证 MFA 口令

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://xxx.authing.cn',
})

const authenticators = await authenticationClient.mfa.verifyTotpMfa({
  authenticatorType: 'totp',
  totp: '112233',
})
```

#### 返回值

- [Promise\<User\>](/guides/user/user-profile.md)

## 检验二次验证 MFA 短信验证码

MfaAuthenticationClient().verifyAppSmsMfa()

> 检验二次验证 MFA 短信验证码

#### 参数

- `options` \<Object\>
- `options.phone` \<string\> 用户手机号。
- `options.code` \<string\> 手机验证码。
- `options.mfaToken` \<string\> 登录接口返回的 mfaToken。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://xxx.authing.cn',
})

const authenticators = await authenticationClient.mfa.verifySmsMfa({
  mfaToken: 'xxxxxx',
  phone: '173xxxxxxxx',
  code: 'xxxx',
})
```

#### 返回值

- [Promise\<User\>](/guides/user/user-profile.md)

## 检验二次验证 MFA 邮箱验证码

MfaAuthenticationClient().verifyAppEmailMfa()

> 检验二次验证 MFA 邮箱验证码

#### 参数

- `options` \<Object\>
- `options.email` \<string\> 用户邮箱。
- `options.code` \<string\> 手机验证码。
- `options.mfaToken` \<string\> 登录接口返回的 mfaToken。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://xxx.authing.cn',
})

const authenticators = await authenticationClient.mfa.verifyAppEmailMfa({
  mfaToken: 'xxxxxx',
  email: 'example@{{$themeConfig.officeSiteDomain}}',
  code: 'xxxx',
})
```

#### 返回值

- [Promise\<User\>](/guides/user/user-profile.md)

## 检测手机号或邮箱是否已被绑定

MfaAuthenticationClient().phoneOrEmailBindable()

> 当需要手机或邮箱 MFA 登录，而用户未绑定手机或邮箱时，可先让用户输入手机号或邮箱，用此接口先检测手机或邮箱是否可绑定，再进行 MFA 验证

#### 参数

- `options` \<Object\>
- `[options.email]` \<string\> 要检测的邮箱。
- `[options.phone]` \<string\> 要检测的手机号。
- `options.mfaToken` \<string\> 登录接口返回的 mfaToken。

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://xxx.authing.cn',
})

const authenticators = await authenticationClient.mfa.phoneOrEmailBindable({
  mfaToken: 'xxxxxx',
  email: 'example@{{$themeConfig.officeSiteDomain}}',
})
```

#### 返回值

- `Promise<boolean>`

## 检验二次验证 MFA 恢复代码

MfaAuthenticationClient().verifyTotpRecoveryCode()

> 检验二次验证 MFA 恢复代码

#### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://xxx.authing.cn',
})

const authenticators = await authenticationClient.mfa.verifyTotpRecoveryCode({
  authenticatorType: 'totp',
  totp: '112233',
})
```

#### 返回值

- [Promise\<User\>](/guides/user/user-profile.md)
