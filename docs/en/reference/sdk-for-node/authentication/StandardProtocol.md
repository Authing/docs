# Standard agreement certification module

<LastUpdated/>

This module contains authentication of OIDC, OAUTH 2.0, SAML, CAS standard protocol, obtains tokens, checking tokens, and logout. The method of initiating authentication needs to be used at the front end, get a token, check the token, and other methods need to be used in the backend.

Instructions:

```javascript
import { AuthenticationClient } from 'authing-js-sdk'
const authenticationClient = new AuthenticationClient({
  appId: 'Application ID',
  secret: 'Application key',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  protocol: 'oidc',
})
authenticationClient.buildAuthorizeUrl // Texture front end login link
authenticationClient.getAccessTokenByCode // Code change Token
authenticationClient.getAccessTokenByClientCredentials // Machine license Access Token
authenticationClient.getUserInfoByAccessToken // Token change user information
authenticationClient.getNewAccessTokenByRefreshToken // Refresh Token
authenticationClient.introspectToken // Test Token legality
authenticationClient.revokeToken // Withdraw Token
authenticationClient.validateTicketV1 // Test CAS 1.0 ticket
authenticationClient.buildLogoutUrl // Texture front end logout link
```

## OIDC

OpenID Connect is abbreviated as OIDC, an extension of OAuth 2.0, which mainly adds a semantic user information field.

### initialization

Parameters when initializing AuthenticationClient:

- `appId` \<string\> Apply ID, required.
- `secret` \<string\> Apply the key, required.
- `appHost` \<string\> Apply the full address, such as https://sample-app.authing.cn, without the last slash '/'.
- `redirectUri` \<string\> Business callback URL, mustal. For details, please check [Document](/guides/federation/oidc.html#授权码模式)。
- `protocol` \<string\> Protocol type, optional value `oidc`、`oauth`、`saml`、`cas`, fill in this `oidc`。
- `tokenEndPointAuthMethod` \<string\> Get the Token End Point Verification Mode, optional value `client_secret_post`、`client_secret_basic`、`none`,the default is `client_secret_post`。
- `introspectionEndPointAuthMethod` \<string\> Check the way to verify the Token Endpoint, optional value `client_secret_post`、`client_secret_basic`、`none`,the default is `client_secret_post`。
- `revocationEndPointAuthMethod` \<string\> Withdrawing the Token Endpoint Validation, optional value is `client_secret_post`、`client_secret_basic`、`none`,the default is `client_secret_post`。

#### Example

```js
const authenticationClient = new AuthenticationClient({
  appId: 'Application ID',
  secret: 'Application key',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: 'Business callback address',
})
```

### A user login link to generate an OIDC protocol

AuthenticationClient.buildAuthorizeUrl(options)

OIDC agreement generated user login link, the user can access the login page Authing online through this link .

#### parameter

- `options` \<object\> Launched to fill the authorization login parameters . For details, see [ use OIDC authorization code mode ](/federation/oidc/authorization-code/)。
- `options.scope` \<string\> Permissions requested items , optional , OIDC protocol by default `openid profile email phone address`, OAuth 2.0 protocol by default `user`。
- `options.nonce` \<string\> Random string , optional , default generated automatically .
- `options.state` \<string\> Random string , optional , default generated automatically .
- `options.responseMode` \<string\> Response type , optional , optional values `query`、`fragment`、`form_post`; the default is `query`, Is redirected by the browser to send the Code to the callback address.
- `options.responseType` \<string\> Response type, optional, optional value `code`、`code id_token token`、`code id_token`、`code id_token`、`code token`、`id_token token`、`id_token`、`none`; the default is `code`, Authorize code mode.
- `options.redirectUri` \<string\> The redirectUri parameter when the callback address, optional, and defaults to SDK initialization.
- `options.codeChallenge` \<string\> A length greater than equal to the string 43 , as sent to Authing code_challenge.
- `options.codeChallengeMethod` \<string\> Can be plain, S256, represents a digest algorithm used to calculate code_challenge, plain do not represent any algorithm , S256 represents code_challenge is calculated using SHA256 .

#### Example

```javascript
// Splicing OIDC authorization link
const authenticationClient = new AuthenticationClient({
  appId: 'Application ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: 'Business callback address',
})
let url = client.buildAuthorizeUrl({ scope: 'openid profile offline_access' })

// PKCE scene using the example
// Generate a code_verifier
let codeChallenge = client.generateCodeChallenge()
// SHA256 digest calculation of code_verifier
let codeChallengeDigest = client.getCodeChallengeDigest({
  codeChallenge,
  method: 'S256',
})
// Construction OIDC authorization code + PKCE mode login URL
let url2 = client.buildAuthorizeUrl({
  codeChallenge: codeChallengeDigest,
  codeChallengeMethod: 'S256',
})
```

#### Sample Data

```http
https://oidc1.authing.cn/oidc/auth?nonce=5485323897342262&state=7400704296715694&scope=openid+profile+offline_access&client_id=5f17a529f64fb009b794a2ff&response_mode=query&redirect_uri=https%3A%2F%2Fbaidu.com&response_type=code&prompt=consent
```

### Code change Token

AuthenticationClient.getAccessTokenByCode(code, options)

Use the authorization code Code to get the user's token information.

#### parameter

- `code` \<string\> Authorize code Code, the user will send the authorization code code to the callback address after the authentication is successful. For details, please refer to [Use OIDC Authorization Code Mode](/federation/oidc/authorization-code/)。
- `options` \<object\> This parameter needs to be filled in when the PKCE is licensed. For details, please see [Use OIDC Authorization Code + PKCE Mode](/federation/oidc/pkce/).
- `options.codeVerifier` \<string\> Original checksum value , not digest value .

#### Example

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'Application ID',
  secret: 'Application key',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: 'Business callback address',
})
let res = await authenticationClient.getAccessTokenByCode('授权码 code')
let res2 = await authenticationClient.getAccessTokenByCode('授权码 code', {
  codeVerifier: 'code_challenge 原始值',
})
```

#### Sample Data

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRmTE90M0xibjhfYThwUk11ZXNzYW1xai1vM0RCQ3MxLW93SExRLVZNcVEifQ.eyJqdGkiOiJsdzg0NW5zdGcwS3EtMTlodVpQOHYiLCJzdWIiOiI1ZmY3MDFkODQ2YjkyMDNlMmY2YWM2ZjMiLCJpYXQiOjE2MTU4ODM1ODYsImV4cCI6MTYxNTg4NzE4Niwic2NvcGUiOiJlbWFpbCBvcGVuaWQgcHJvZmlsZSBwaG9uZSIsImlzcyI6Imh0dHBzOi8vb2lkYzEuYXV0aGluZy5jbi9vaWRjIiwiYXVkIjoiNWYxN2E1MjlmNjRmYjAwOWI3OTRhMmZmIn0.VvYKBcWcr8iIi1b37ugWQ9hsvog4_7EqDQyFqwhIuvM0NHlHH3Bhw83EQIKSNfbWV4nv3ihfeNGPLMzslbQr-wwjnWZTLMYl1bcn7IdVtD_kTN3Zz10MwF5td-VQ7UndU28wJ0HE1mo6E8QH93kYGckS5FSZXmCBa0M5H59Jec_a1MHI1MZrr_V9cZ9EfeF97V-PcqU8JVAwDZclCJ3mWY_Mb65RnMR9yEVqUZzJStmaXGMuRIzjkm2pklqt0CtQQJfzECXq_4USpwRXDiYLWILYPUCcO6hGxDjhMEd8IcxdG51TQP-w1UM6LyIRn61uSJvDsz8zg5dStDKyocypiA",
  "expires_in": 3600,
  "id_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QzQDEyMy5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInN1YiI6IjVmZjcwMWQ4NDZiOTIwM2UyZjZhYzZmMyIsImJpcnRoZGF0ZSI6bnVsbCwiZmFtaWx5X25hbWUiOm51bGwsImdlbmRlciI6IlUiLCJnaXZlbl9uYW1lIjpudWxsLCJsb2NhbGUiOm51bGwsIm1pZGRsZV9uYW1lIjpudWxsLCJuYW1lIjpudWxsLCJuaWNrbmFtZSI6bnVsbCwicGljdHVyZSI6Imh0dHBzOi8vZmlsZXMuYXV0aGluZy5jby9hdXRoaW5nLWNvbnNvbGUvZGVmYXVsdC11c2VyLWF2YXRhci5wbmciLCJwcmVmZXJyZWRfdXNlcm5hbWUiOm51bGwsInByb2ZpbGUiOm51bGwsInVwZGF0ZWRfYXQiOiIyMDIxLTAzLTE1VDA1OjU0OjU0LjY4NVoiLCJ3ZWJzaXRlIjpudWxsLCJ6b25laW5mbyI6bnVsbCwicGhvbmVfbnVtYmVyIjpudWxsLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOmZhbHNlLCJub25jZSI6IjcwVEU3eW9NVFEiLCJhdF9oYXNoIjoiUFNnOGw5eDRldGxmLXA4UDdjYnVoQSIsImlzcyI6Imh0dHBzOi8vb2lkYzEuYXV0aGluZy5jbi9vaWRjIiwiaXNzMiI6Imh0dHBzOi8vYmFpZHUuY29tIiwiYXVkIjoiNWYxN2E1MjlmNjRmYjAwOWI3OTRhMmZmIiwiZXhwIjoxNjE1ODg3MTg3LCJpYXQiOjE2MTU4ODM1ODh9.OlX-FP7znIEqx0YpnOQ8kxadMe1toHDj1KPVm0dbEVc",
  "scope": "email openid profile phone",
  "token_type": "Bearer"
}
```

Fields explained :

| Field name   | meaning                                            |
| ------------ | -------------------------------------------------- |
| token_type   | Token type, fixed value Bearer                     |
| scope        | Mandate , authorized to obtain user rights project |
| id_token     | Id token, Id token issued by Authing               |
| expires_in   | Access token expiration                            |
| access_token | Access token, Access token issued by Authing       |

### Token for user information

AuthenticationClient.getUserInfoByAccessToken('access_token')

Use Access token to get user information.

#### parameter

- `access_token` \<string\> Access token, Use the authorization code Code to exchange the content token content. For details, please see [Using OIDC Authorization Code Mode](/federation/oidc/authorization-code/).

#### Example

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'Application ID',
  secret: 'Application key',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: 'Business callback address',
})
let res = await authenticationClient.getUserInfoByAccessToken('Access token')
```

#### Sample data

```json
{
  "address": {
    "country": null,
    "postal_code": null,
    "region": null,
    "formatted": null
  },
  "birthdate": null,
  "family_name": null,
  "gender": "U",
  "given_name": null,
  "locale": null,
  "middle_name": null,
  "name": null,
  "nickname": null,
  "picture": "https://files.authing.co/authing-console/default-user-avatar.png",
  "preferred_username": null,
  "profile": null,
  "updated_at": "2021-03-03T06:17:14.485Z",
  "website": null,
  "zoneinfo": null,
  "email": "test1@authing.cn",
  "email_verified": false,
  "sub": "603f184cec4505e2868431fc", // Subject abbreviation for User ID
  "phone_number": null,
  "phone_number_verified": false
}
```

Field Explanation:

| Field name             | translation                                                  |
| :--------------------- | :----------------------------------------------------------- |
| sub                    | subject's abbreviation, unique identifier, generally user ID |
| name                   | name                                                         |
| given_name             | given name                                                   |
| family_name            | family name                                                  |
| middle_name            | middle name                                                  |
| nickname               | nickname                                                     |
| preferred_username     | I hope the name of the name                                  |
| profile                | basic information                                            |
| picture                | avatar                                                       |
| website                | website link                                                 |
| email                  | E-mail                                                       |
| email_verified         | whether the mailbox is certified                             |
| gender                 | gender                                                       |
| birthdate              | birthday                                                     |
| zoneinfo               | time zone                                                    |
| locale                 | area                                                         |
| phone_number           | phone number                                                 |
| phone_number_verified  | certified mobile phone number                                |
| address                | address object                                               |
| address.formatted      | address                                                      |
| address.street_address | street address                                               |
| address.locality       | city                                                         |
| address.region         | province                                                     |
| address.postal_code    | post code                                                    |
| address.country        | nation                                                       |
| updated_at             | information update time                                      |

### Refresh Access Token

AuthenticationClient.getNewAccessTokenByRefreshToken(refreshToken)

Get new Access Token with Refresh Token.

#### parameter

- `refreshToken` \<string\> Refresh token, you can get Refresh_token from the return value of the AuthenticationClient.getAccessTokenbyCode method. For details, please see [Refreshing Access token](/guides/federation/oidc.md#刷新-access-token)。

#### Explanation

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'Application ID',
  secret: 'Application key',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: 'Business callback address',
})
let res = await authenticationClient.getNewAccessTokenByRefreshToken(
  'Access token'
)
```

#### Sample data

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRmTE90M0xibjhfYThwUk11ZXNzYW1xai1vM0RCQ3MxLW93SExRLVZNcVEifQ.eyJqdGkiOiJZUHB4NUVEWGlQWVJvNUFQWXAzci0iLCJzdWIiOiI1ZmY3MDFkODQ2YjkyMDNlMmY2YWM2ZjMiLCJpYXQiOjE2MTQwOTE0OTksImV4cCI6MTYxNDA5NTA5OSwic2NvcGUiOiJvZmZsaW5lX2FjY2VzcyBwcm9maWxlIG9wZW5pZCIsImlzcyI6Imh0dHBzOi8vb2lkYzEuYXV0aGluZy5jbi9vaWRjIiwiYXVkIjoiNWYxN2E1MjlmNjRmYjAwOWI3OTRhMmZmIn0.ZN_SlfVg1oNMz7uAK-5K84dqqqmlZehmAPOLytOR9HnLHImKJ9VO5u1hRsAjGCob0kMUV5wVxQhX3EFks7FtMamiX2Jvn-NYh4V_5T6l3LFf4uoKF6AykAg483nG3EEENuGgQo15bBszsoCGqFnNmUd0T4Cgxx0zbxXPxMdp_dcE14KzmNz1w-Qg3yVeYmSTZFdcLtZA2BYnVEa7LYA2yA3DgawwAcRmrlyEfnvCO3uY2TcsTKEAfQ-QgVIGRWOfyUE5f-_X3TolliO1fXnwZBdxEKMXLGW5E2bPVcePyiV0upYbUnQ079UxBlEiWlgeW_rpkTPXDxHAgiE488gtlg",
  "expires_in": 3600,
  "id_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZmY3MDFkODQ2YjkyMDNlMmY2YWM2ZjMiLCJiaXJ0aGRhdGUiOm51bGwsImZhbWlseV9uYW1lIjpudWxsLCJnZW5kZXIiOiJVIiwiZ2l2ZW5fbmFtZSI6bnVsbCwibG9jYWxlIjpudWxsLCJtaWRkbGVfbmFtZSI6bnVsbCwibmFtZSI6bnVsbCwibmlja25hbWUiOm51bGwsInBpY3R1cmUiOiJodHRwczovL2ZpbGVzLmF1dGhpbmcuY28vYXV0aGluZy1jb25zb2xlL2RlZmF1bHQtdXNlci1hdmF0YXIucG5nIiwicHJlZmVycmVkX3VzZXJuYW1lIjpudWxsLCJwcm9maWxlIjpudWxsLCJ1cGRhdGVkX2F0IjoiMjAyMS0wMi0yM1QxNDo0NDoxOC4wODVaIiwid2Vic2l0ZSI6bnVsbCwiem9uZWluZm8iOm51bGwsImF0X2hhc2giOiIxaWRJSUxaWExpZkRscXJMY3ZNeV9BIiwiS0VZIjoiVkFMVUUiLCJhdWQiOiI1ZjE3YTUyOWY2NGZiMDA5Yjc5NGEyZmYiLCJleHAiOjE2MTQwOTUwOTgsImlhdCI6MTYxNDA5MTQ5OSwiaXNzIjoiaHR0cHM6Ly9vaWRjMS5hdXRoaW5nLmNuL29pZGMifQ._H59237sqpsY0OgyY_RM7CvuG6cFo1x03y-DBhd5hik",
  "refresh_token": "3T49f4Y48szoMmwBXragjqLwQZC4QhgnsM5Oy2WfmU-",
  "scope": "openid offline_access profile",
  "token_type": "Bearer"
}
```

### Check the status of Access token or Refresh token

AuthenticationClient.introspectToken(token)

Check the status of Access Token or Refresh token.

#### parameter

- `token` \<string\> Access token or Refresh token, can be obtained from Access_token, refresh_token, refresh_token, refresh_token, refresh_token from the return value of the AuthenticationClient.getaccessTokenByCode method.

#### Explanation

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'Application ID',
  secret: 'Application key',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: 'Business callback address',
})
let res = await authenticationClient.introspectToken(
  'Access token or Refresh token'
)
```

#### Sample data

Token is returned when returning:

```json
{
  "active": true,
  "sub": "60097f4d5bc08f75da104d18", // Subject Abbreviation for User ID
  "client_id": "60097391b1358c17c5fb0f4e",
  "exp": 1612445888,
  "iat": 1611236288,
  "iss": "https://core.littleimp.cn/oidc",
  "jti": "TV4J0gAbe4KR4-8CtYcOa",
  "scope": "openid profile email phone offline_access",
  "token_type": "Bearer"
}
```

Token returns when it is not legal:

```json
{
  "active": false
}
```

The test process fails will throw an error.

### Online test Id Token or Access Token's legitimacy

AuthenticationClient.validateToken(options)

Online Interface Verify Id token or Access Token via Authing. A network request will be generated.

#### parameter

- `options.idToken` \<string\> ID Token, you can get id_token from the return value of the AuthenticationClient.getAccessTokenByCode method.
- `options.accessToken` \<string\> Access token, you can get Access_token from the return value of the AuthenticationClient.getAccessTokenByCode method.

#### Explanation

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'Application ID',
})
let res = await authing.validateToken({ idToken: 'ID Token' })
```

#### Sample data

id_token verification is legal when returning:

```json
{
  "sub": "5f64afd1ad501364e3b43c1e", // subject Abbreviation for User ID
  "birthdate": null,
  "family_name": null,
  "gender": "U",
  "given_name": null,
  "locale": null,
  "middle_name": null,
  "name": null,
  "nickname": null,
  "picture": "https://usercontents.authing.cn/authing-avatar.png",
  "preferred_username": "test1",
  "profile": null,
  "updated_at": "2020-09-27T06:06:29.853Z",
  "website": null,
  "zoneinfo": null,
  "email": "test1@123.com",
  "email_verified": false,
  "phone_number": null,
  "phone_number_verified": false,
  "nonce": "CQsguqUdl7",
  "at_hash": "10iOtwuTNtyQLzlNYXAHeg",
  "aud": "5f17a529f64fb009b794a2ff",
  "exp": 1601460494,
  "iat": 1601456894,
  "iss": "https://oidc1.authing.cn/oidc"
}
```

Id token verifies illegal return:

```json
{ "code": 400, "message": "id_token format is incorrect" }
```

```json
{ "code": 400, "message": "id_token illegal" }
```

Access token is returned while verifying:

```json
{
  "jti": "K5TYewNhvdGBdHiRifMyW",
  "sub": "5f64afd1ad501364e3b43c1e", //  subject sbbreviation for User ID
  "iat": 1601456894,
  "exp": 1601460494,
  "scope": "openid profile email phone",
  "iss": "https://oidc1.authing.cn/oidc",
  "aud": "5f17a529f64fb009b794a2ff"
}
```

Access token verifies illegal return:

```json
{ "code": 400, "message": "access_token format is incorrect" }
```

```json
{ "code": 400, "message": "access_token illegal" }
```

### withdraw Access Token or Refresh token

AuthenticationClient.revokeToken(token)

Access token withdrawal or Refresh token. Access token or Refresh token holder may notify Authing no longer needed token , I hope Authing be revoked.

#### parameter

- `token` \<string\>Access token or Refresh token, can , refresh_token values obtained from the return access_token AuthenticationClient.getAccessTokenByCode method .

#### Explanation

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'Application ID',
  secret: 'Application key',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: 'Business callback address',
})
let res = await authenticationClient.revokeToken(
  'Access token or Refresh token'
)
```

#### Sample data

Returns true when the withdrawal of success .

Throw an error when withdrawn fail .

### Logout URL splicing

AuthenticationClient.buildLogoutUrl(options)

Stitching up URL.

#### parameter

- `options` \<string\> Out configuration items.
- `expert` \<boolean\> Expert mode is turned on , the default is `false`.
- `redirectUri` \<string\> Backward redirection address.
- `idToken` \<string\> User's IDToken.

#### Explanation

Use the front universal logout link Log :

```javascript
// Use the front universal logout link Log :
const authenticationClient = new AuthenticationClient({
  appId: 'Application ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: 'Business callback address',
})
let url = authenticationClient.buildLogoutUrl({
  redirectUri: 'https://authing.cn',
})
```

使用 OIDC 协议标准链接退出登录，需要传入当前用户的 **Id token**，且登出回调地址**必须与控制台配置的一致**：
Use OIDC protocol standard link Log , need to pass the current user **Id token** ,and logout callback address **must be configured with the same console** :

```js
// OIDC stitching line with protocol standards logout link
const authenticationClient = new AuthenticationClient({
  appId: 'Application ID',
  secret: 'Application key',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: 'Business callback address',
  protocol: 'oidc',
})
let url = authenticationClient.buildLogoutUrl({
  expert: true,
  idToken: 'idToken to be quit the user',
  redirectUri: 'https://authing.cn',
})
```

### Client Credentials Pattern Get Access Token

AuthenticationClient.getAccessTokenByClientCredentials(scope, options)

Access token with [program access account](/guides/authorization/m2m-authz.html#m2m-授权) is obtained.

#### Parameter

- `scope` \<string\> Permission items, space separated strings, each represents a permission. For details, please see [Machine (M2M) Authorization](/guides/authorization/m2m-authz.html#获取具备权限的-accesstoken)。
- `options`, Programmatically access the AK and SK information of the account.
- `options.accessKey`, programming access account AccessKey.
- `options.secretKey`, programming access account Secretkey.

#### Explanation

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'Application ID',
  secret: 'Application key',
  redirectUri: 'Business callback address',
})
let res = await authenticationClient.getAccessTokenByClientCredentials(
  'email openid profile phone',
  {
    accessKey: 'Programming Access Account AK',
    secretKey: 'Programming Access Account SK',
  }
)
```

#### Sample data

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRmTE90M0xibjhfYThwUk11ZXNzYW1xai1vM0RCQ3MxLW93SExRLVZNcVEifQ.eyJqdGkiOiJsdzg0NW5zdGcwS3EtMTlodVpQOHYiLCJzdWIiOiI1ZmY3MDFkODQ2YjkyMDNlMmY2YWM2ZjMiLCJpYXQiOjE2MTU4ODM1ODYsImV4cCI6MTYxNTg4NzE4Niwic2NvcGUiOiJlbWFpbCBvcGVuaWQgcHJvZmlsZSBwaG9uZSIsImlzcyI6Imh0dHBzOi8vb2lkYzEuYXV0aGluZy5jbi9vaWRjIiwiYXVkIjoiNWYxN2E1MjlmNjRmYjAwOWI3OTRhMmZmIn0.VvYKBcWcr8iIi1b37ugWQ9hsvog4_7EqDQyFqwhIuvM0NHlHH3Bhw83EQIKSNfbWV4nv3ihfeNGPLMzslbQr-wwjnWZTLMYl1bcn7IdVtD_kTN3Zz10MwF5td-VQ7UndU28wJ0HE1mo6E8QH93kYGckS5FSZXmCBa0M5H59Jec_a1MHI1MZrr_V9cZ9EfeF97V-PcqU8JVAwDZclCJ3mWY_Mb65RnMR9yEVqUZzJStmaXGMuRIzjkm2pklqt0CtQQJfzECXq_4USpwRXDiYLWILYPUCcO6hGxDjhMEd8IcxdG51TQP-w1UM6LyIRn61uSJvDsz8zg5dStDKyocypiA",
  "expires_in": 3600,
  "scope": "email openid profile phone",
  "token_type": "Bearer"
}
```

### Generate a PKCE check code

AuthenticationClient.generateCodeChallenge()

Generate a PKCE check code.

#### parameter

without

#### Explanation

```javascript
let codeChallenge = client.generateCodeChallenge()
```

#### Sample data

```
VrpGRU_3FQ5au1TqCvzeh1nTij7HkcnpP1qWzJMGX_Y
```

### Generate a summary value of the PKCE check code

AuthenticationClient.getCodeChallengeDigest(options)

Generate a PKCE check code.

#### parameter

- `options`, PKCE check code, summary algorithm parameter.
- `options.codeChallenge`, The code_challenge original value of the abstract value is generated, and a random string having a length greater than or equal to 43.
- `options.method`,a summary algorithm that can be used for plain、S256, indicating code_challenge, and plain means that it is not necessary to return any algorithm, and S256 represents the use of SHA256 to calculate the code_challenge summary.

#### Explanation

```javascript
// Generate a code_verifier
let codeChallenge = client.generateCodeChallenge()
// SHA256 digest calculation of code_verifier
let codeChallengeDigest = client.getCodeChallengeDigest({
  codeChallenge,
  method: 'S256',
})
```

#### Sample data

```
Bu6RP796BBiAwGwdUpHpKfhmQqahszBcGep8qT31XOy
```

## OAuth 2.0

OAuth is an open network standards for authorization (Authorization) , the current version is 2.0 .

### initialization

Parameters when initializing AuthenticationClient:

- `appId` \<string\> application ID, required.
- `secret` \<string\> Application key,required.
- `appHost` \<string\> Apply complete address, such as https://sample-app.authing.cn, do not bring the final slash '/'。
- `redirectUri` \<string\> Business callback URL, mustal. Please see [Document] for details.(/guides/federation/oauth.html#授权码模式)。
- `protocol` \<string\> Protocol type, optional value `oidc`、`oauth`、`saml`、`cas`, fill in this `oauth`。
- `tokenEndPointAuthMethod` \<string\> Get the Token endpoint validation method, optional value `client_secret_post`、`client_secret_basic`、`none`, the default is `client_secret_post`。
- `introspectionEndPointAuthMethod` \<string\> Check the way to verify the Token endpoint, optional value `client_secret_post`、`client_secret_basic`、`none`, the default is `client_secret_post`。
- `revocationEndPointAuthMethod` \<string\> Withdrawing the Token endpoint validation, optional value is `client_secret_post`、`client_secret_basic`、`none`, the default is `client_secret_post`。

#### Explanation

```js
const authenticationClient = new AuthenticationClient({
  appId: 'Application ID',
  secret: 'Application key',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: 'Business callback address',
  protocol: 'oauth',
})
```

### User login link to generate OAuth 2.0 protocol

AuthenticationClient.buildAuthorizeUrl(options)

A user login link to the OAuth 2.0 protocol, the user can access the an Authing online login page through this link.

#### parameter

- `options` \<object\> Parameters that need to be filled in when launching a license login. For details, please see [Use OAUTH2.0 Authorized Code Mode](/federation/oauth2/authorization-code/)。
- `options.scope` \<string\> Request permission item, optional, OAuth 2.0 protocol defaults to `User`.
- `options.state` \<string\> Random strings, optional, default automatically generated.
- `options.responseType` \<string\> Response type, optional, optional value is `Code`,`token` default is `code`, authorization code mode.
- `options.redirectUri` \<string\> The redirectUri parameter when the callback address, optional, and defaults to SDK initialization.

#### Explanation

```javascript
// Splicing OAUTH 2.0 Authorization Link
const authenticationClient = new AuthenticationClient({
  appId: 'Applicaiton ID',
  secret: 'Application key',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: 'Business callback address',
  protocol: 'oauth',
})
let url = authenticationClient.buildAuthorizeUrl({ scope: 'user' })
```

#### Sample data

```http
https://oidc1.authing.cn/oauth/auth?state=7400704296715694&scope=user&client_id=5f17a529f64fb009b794a2ff&redirect_uri=https%3A%2F%2Fbaidu.com&response_type=code
```

### Code change Token

AuthenticationClient.getAccessTokenByCode(code)

Use the authorization code Code to get the user's Token information.

#### parameter

- `code` \<string\>authorize code Code, the user will send the authorization code Code to the callback address after the authentication is successful. For details, please refer to [Use OAuth 2.0 Authorized Code Mode](/federation/oauth2/authorization-code/)。

#### Explanation

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'Application ID',
  secret: 'Application key',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: 'Business callback address',
})
let res = await authenticationClient.getAccessTokenByCode('授权码 code')
```

#### Sample data

```json
{
  "access_token": "fa9d2bdd914ea01aa4e434c12d4f919d749fc75c",
  "token_type": "Bearer",
  "expires_in": 1209599,
  "refresh_token": "b5e0e1afe793c6634495434afc262b88ddee9af3",
  "scope": "user"
}
```

Field Explanation:

| Field name   | meaning                                      |
| ------------ | -------------------------------------------- |
| token_type   | Token type, fixed value Bearer               |
| scope        | Wheelcence, authorized acquisition items     |
| expires_in   | Access token expiration                      |
| access_token | Access token, Access token issued by Authing |

### Token for user information

AuthenticationClient.getUserInfoByAccessToken('access_token')

Use Access token to get user information.

#### parameter

- `access_token` \<string\> Access token, use the contents of Access token with the authorization code code. For details, please see [Use OAuth 2.0 Authorization Code Mode](/federation/oauth2/authorization-code/)。

#### Example

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'Applicaiton ID',
  secret: 'Application key',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: 'Business callback address',
})
let res = await authenticationClient.getUserInfoByAccessToken('Access token')
```

#### Sample data

```json
{
  "address": {
    "country": null,
    "postal_code": null,
    "region": null,
    "formatted": null
  },
  "birthdate": null,
  "family_name": null,
  "gender": "U",
  "given_name": null,
  "locale": null,
  "middle_name": null,
  "name": null,
  "nickname": null,
  "picture": "https://files.authing.co/authing-console/default-user-avatar.png",
  "preferred_username": null,
  "profile": null,
  "updated_at": "2021-03-03T06:17:14.485Z",
  "website": null,
  "zoneinfo": null,
  "email": "test1@authing.cn",
  "email_verified": false,
  "sub": "603f184cec4505e2868431fc",
  "phone_number": null,
  "phone_number_verified": false
}
```

Field Explanation:

| Field name             | translation                                                  |
| :--------------------- | :----------------------------------------------------------- |
| sub                    | subject's abbreviation, unique identifier, generally user ID |
| name                   | name                                                         |
| given_name             | given name                                                   |
| family_name            | family name                                                  |
| middle_name            | middle name                                                  |
| nickname               | nickname                                                     |
| preferred_username     | I hope the name of the name                                  |
| profile                | basic information                                            |
| picture                | avator                                                       |
| website                | website link                                                 |
| email                  | E-mail                                                       |
| email_verified         | whether the mailbox is certified                             |
| gender                 | gender                                                       |
| birthdate              | birthdate                                                    |
| zoneinfo               | time zone                                                    |
| locale                 | area                                                         |
| phone_number           | phone number                                                 |
| phone_number_verified  | certified mobile phone number                                |
| address                | address object                                               |
| address.formatted      | address                                                      |
| address.street_address | street address                                               |
| address.locality       | city                                                         |
| address.region         | province                                                     |
| address.postal_code    | post code                                                    |
| address.country        | nation                                                       |
| updated_at             | information update time                                      |

### Refresh Access Token

AuthenticationClient.getNewAccessTokenByRefreshToken(refreshToken)

Get new Access Token with Refresh Token.

#### parameter

- `refreshToken` \<string\>Refresh token, you can get Refresh_token from the return value of the AuthenticationClient.getAccessTokenbyCode method.

#### Explanation

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'Application ID',
  secret: 'Application key',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: 'Business callback address',
})
let res = await authenticationClient.getNewAccessTokenByRefreshToken(
  'Access token'
)
```

#### Sample data

```json
{
  "access_token": "fa9d2bdd914ea01aa4e434c12d4f919d749fc75c",
  "token_type": "Bearer",
  "expires_in": 1209599,
  "refresh_token": "b5e0e1afe793c6634495434afc262b88ddee9af3",
  "scope": "user"
}
```

### Check Access token or Refresh token

AuthenticationClient.introspectToken(token)

Check the status of Access Token or Refresh token.

#### parameter

- `token` \<string\> Access Token or Refresh Token, you can get access_token, refresh_token, from the return value of the AuthenticationClient.getAccessTokenByCode method.

#### Explanation

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'Application ID',
  secret: 'Application key',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: 'Business callback address',
})
let res = await authenticationClient.introspectToken(
  'Access token or Refresh token'
)
```

#### Sample data

Token is returned when returning:

```json
{
  "active": true,
  "sub": "5f719946524ee1099229496b",
  "client_id": "5f17a529f64fb009b794a2ff",
  "exp": 1619083024,
  "iat": 1617873424,
  "iss": "https://core.authing.cn/oauth",
  "jti": "qbovGK-HZL0O_20wY7uXj",
  "scope": "user",
  "token_type": "Bearer"
}
```

Token returns when it is not legal:

```json
{
  "active": false
}
```

The test process fails will throw an error.

### withdraw Access Token or Refresh token

AuthenticationClient.revokeToken(token)

withdraw Access token or Refresh token. Access token or Refresh token holder may notify Authing no longer needed token , I hope Authing be revoked.

#### parameter

- `token` \<string\> Access Token or Refresh Token, you can get access_token, refresh_token, rom the return value of the AuthenticationClient.getAccessTokenByCode method.

#### Explanation

```javascript
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  secret: '应用密钥',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: '业务回调地址',
})
let res = await authenticationClient.revokeToken(
  'Access token 或 Refresh token'
)
```

#### Sample data

Returns true when the withdrawal of success .

Throw an error when withdrawn fail .

### Logout URL splicing

AuthenticationClient.buildLogoutUrl(options)

Stitching up URL.

#### parameter

- `options` \<string\> Stitching up URL.
- `options.redirectUri` \<string\> Backward redirection address.

#### Explanation

```javascript
// Splicing out the front universal link
const authenticationClient = new AuthenticationClient({
  appId: 'Application ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: 'Business callback address',
  protocol: 'oauth',
})
let url = authenticationClient.buildLogoutUrl({
  redirectUri: 'https://authing.cn',
})
```

## SAML2

Security Assertion Markup Language ( English : Security Assertion Markup Language, referred to as SAML, pronunciation sam-el) is an XML-based open standard data format to exchange authentication and authorization data between the parties , especially in the identity provider and between service providers exchange .

### initialization

Parameters when initializing AuthenticationClient:

- `appId` \<string\> Application ID, Required。
- `appHost` \<string\> Apply complete address, such as https://sample-app.authing.cn, do not bring the final slash '/'。
- `protocol` \<string\> Protocol type, optional value `oidc`、`oauth`、`saml`、`cas`, fill in this `saml`。

#### Explanation

```js
const authenticationClient = new AuthenticationClient({
  appId: 'Application ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  protocol: 'saml',
})
```

### SAML2 generated user login link protocol

AuthenticationClient.buildAuthorizeUrl(options)

SAML2 generated user login link protocol

#### parameter

without

#### Explanation

```javascript
// Splicing SAML2 login link
const authenticationClient = new AuthenticationClient({
  appId: 'Application ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  protocol: 'saml',
})
let url = authenticationClient.buildAuthorizeUrl()
```

#### Sample data

```http
https://oidc1.authing.cn/api/v2/saml-idp/5f17a529f64fb009b794a2ff
```

### Logout URL splicing

AuthenticationClient.buildLogoutUrl(options)

Stitching up URL.

#### parameter

- `options` \<string\> Log out the configuration item.
- `options.redirectUri` \<string\> Backward redirection address.

#### Explanation

```javascript
// Splicing front end universal logout link
const authenticationClient = new AuthenticationClient({
  appId: 'Application ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: 'Business callback address',
  protocol: 'saml',
})
let url = authenticationClient.buildLogoutUrl({
  redirectUri: 'https://authing.cn',
})
```

#### Sample data

```http
https://oidc1.authing.cn/login/profile/logout?redirect_uri=https://authing.cn
```

## CAS

CAS is the abbreviation of the Central Authentication Service, a central authentication service, an independent open instruction protocol.

### initialization

Parameters when initializing AuthenticationClient:

- `appId` \<string\> Applicaiton ID, required。
- `appHost` \<string\> Apply complete address, such as https://sample-app.authing.cn, do not bring the final slash '/'。
- `protocol` \<string\> Protocol type, optional value `oidc`、`oauth`、`saml`、`cas`, fill in this `cas`。

#### Example

```js
const authenticationClient = new AuthenticationClient({
  appId: 'Application ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  protocol: 'cas',
})
```

### User login link to generate a CAS protocol

AuthenticationClient.buildAuthorizeUrl(options)

User login link to generate a CAS protocol

#### parameter

- `options` \<object\> Parameters that need to be filled in when launching a license login.
- `options.service` \<string\> Business callback address in the CAS protocol.

#### Example

```js
// CAS Registry stitching link
const authenticationClient = new AuthenticationClient({
  appId: 'Application ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  protocol: 'cas',
})
let url = authenticationClient.buildAuthorizeUrl({ service: 'service 地址' })
```

#### Sample data

```http
https://oidc1.authing.cn/cas-idp/5f17a529f64fb009b794a2ff/login?service=https://example.com
```

### CAS Registry stitching link

AuthenticationClient.validateTicketV1(ticket, service)

Inspection CAS 1.0 Ticket legitimacy

#### parameter

- `ticket` \<string\> After the CAS certification is successful, Authing issued Ticket.
- `service` \<string\> CAS callback address.

#### Example

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'Application ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
})
let res = await authenticationClient.validateTicketV1(
  'ticket 内容',
  'service 地址'
)
```

#### Sample data

ticket returns legitimate :

```json
{
  "valid": true
}
```

return ticket is not lawful :

```json
{
  "valid": false,
  "message": "ticket illegal"
}
```

### Inspection CAS 2.0 Ticket legitimacy

AuthenticationClient.validateTicketV2(ticket, service, format)

Inspection CAS 2.0 Ticket legitimacy , and returns user attributes, data format defaults to JSON, you can choose XML.

#### parameter

- `ticket` \<string\> After CAS authentication is successful , Authing issued a ticket.
- `service` \<string\> CAS callback address.
- `format` \<string\> Returns the data format, optional value is XML, JSON, default is JSON.

#### Example

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'Application ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
})
let res = await authenticationClient.validateTicketV2(
  'ticket content',
  'service address'
)
```

#### Sample data

ticket returns when ticket is legal, JSON format:

```json
{
  "serviceResponse": {
    "authenticationSuccess": {
      "user": "test1@123.com",
      "attributes": {
        "updated_at": "2021-06-16T14:03:17.358Z",
        "address": {
          "country": null,
          "postal_code": null,
          "region": null,
          "formatted": null
        },
        "phone_number_verified": false,
        "phone_number": null,
        "locale": null,
        "zoneinfo": null,
        "birthdate": null,
        "gender": "U",
        "email_verified": true,
        "email": "test1@123.com",
        "website": null,
        "picture": "https://files.authing.co/user-contents/photos/9a9dc4d7-e756-45b1-81d8-095a28e476c6.jpg",
        "profile": null,
        "preferred_username": "test1@123.com",
        "nickname": null,
        "middle_name": null,
        "family_name": null,
        "given_name": "AAA",
        "name": null,
        "sub": "5f719946524ee1099229496b",
        "external_id": null,
        "unionid": "ldap:f63ed82a-ab77-40da-97bd-defd910d2afd:uid=5fa0354af2c5d2f5c377c991,ou=users,o=5fa029ac692f1d4b55a87623,dc=authing,dc=cn"
      }
    }
  }
}
```

XML Format:

```xml
<cas:serviceResponse xmlns:cas="http://www.yale.edu/tp/cas">
  <cas:authenticationSuccess>
    <cas:user>test1@123.com</cas:user>
    <cas:attributes>
      <cas:authenticationDate>2021-06-16T13:12:29.369Z</cas:authenticationDate>
      <cas:longTermAuthenticationRequestTokenUsed>false</cas:longTermAuthenticationRequestTokenUsed>
      <cas:updated_at/>
      <cas:address>
        <cas:locality/>
        <cas:street_address/>
      </cas:address>
      <cas:phone_number_verified>false</cas:phone_number_verified>
      <cas:gender>U</cas:gender>
      <cas:email_verified>false</cas:email_verified>
      <cas:email>test1@123.com</cas:email>
      <cas:picture>https://files.authing.co/authing-console/default-user-avatar.png</cas:picture>
      <cas:nickname>aaa</cas:nickname>
      <cas:sub>6063fcd01d0d2e39d4596904</cas:sub>
      <cas:external_id>046bb9d1-8501-11e9-bfaa-7cd30abeb5de</cas:external_id>
    </cas:attributes>
  </cas:authenticationSuccess>
</cas:serviceResponse>
```

return ticket is not lawful , JSON format :

```json
{
  "serviceResponse": {
    "authenticationFailure": {
      "code": "INVALID_TICKET",
      "description": "Ticket 不合法"
    }
  }
}
```

XML Format:

```xml
<cas:serviceResponse xmlns:cas='http://www.yale.edu/tp/cas'>
    <cas:authenticationFailure code="INVALID_TICKET">
        Ticket illegal
    </cas:authenticationFailure>
</cas:serviceResponse>
```

### Stitching up URL.

AuthenticationClient.buildLogoutUrl(options)

Stitching up URL.

#### parameter

- `options` \<string\> Log out the configuration item.
- `options.redirectUri` \<string\> Backward redirection address.

#### Example

```javascript
// Splicing cas logout link
const authenticationClient = new AuthenticationClient({
  appId: 'Application ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  protocol: 'cas',
})
let url = authenticationClient.buildLogoutUrl({
  redirectUri: 'https://authing.cn',
})
```

#### Sample data

```http
https://oidc1.authing.cn/cas-idp/5f17a529f64fb009b794a2ff/logout?service=https://example.com
```
