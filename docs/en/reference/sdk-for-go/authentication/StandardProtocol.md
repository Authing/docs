# Standard agreement certification module

<LastUpdated/>

This module contains authentication of OIDC、OAuth 2.0、SAML、CAS standard protocol, obtains tokens, checking tokens, and logout. The method of initiating authentication needs to be used at the front end, get a token, check the token, and other methods need to be used in the backend.

Instructions:

```go
// Initialization using AppId and secret
authenticationClient := NewClient(AppId, Secret)
```

```go
authenticationClient.BuildAuthorizeUrl; // Texture front end login link
authenticationClient.GetAccessTokenByCode; // Code change Token
authenticationClient.GetUserInfoByAccessToken; // Token change user information
authenticationClient.GetNewAccessTokenByRefreshToken; // Refresh Token
authenticationClient.IntrospectToken; // check Token status
authenticationClient.ValidateToken; // check Token legality
authenticationClient.RevokeToken; // withdraw Token
authenticationClient.GetAccessTokenByClientCredentials; // Machine license Access Token
```

## OIDC

OpenID Connect is abbreviated as OIDC, an extension of OAuth 2.0, which mainly adds a semantic user information field.

### initialization

Parameters when initializing AuthenticationClient:

- `appId` \<String\> Apply ID, required.
- `secret` \<String\> Apply the key, required.
- `host` \<String\> Apply the full address, such as https://sample-app.authing.cn, without the last slash '/'.
- `redirectUri` \<String\> Business callback URL, mustal. Please see [Document](/guides/federation/oidc.html#授权码模式)。
- `protocol` \<ProtocolEnum\> Protocol type, optional value `OIDC`、`OAUTH`、`SAML`、`CAS`, default is `OIDC`。
- `tokenEndPointAuthMethod` \<AuthMethodEnum\> Get the Token endpoint Verification Mode, optional value `CLIENT_SECRET_POST`、`CLIENT_SECRET_BASIC`、`NONE`, default is `CLIENT_SECRET_POST`。
- `introspectionEndPointAuthMethod` \<AuthMethodEnum\> Check the way to verify the Token endpoint, optional value `CLIENT_SECRET_POST`、`CLIENT_SECRET_BASIC`、`NONE`, default is `CLIENT_SECRET_POST`.
- `revocationEndPointAuthMethod` \<AuthMethodEnum\> Withdraw the Token endpoint Validation, optional value is `CLIENT_SECRET_POST`、`CLIENT_SECRET_BASIC`、`NONE`, default is `CLIENT_SECRET_POST`。

#### Example

```java
// Initialization using AppId and secret
AuthenticationClient authentication = new AuthenticationClient(AppId, Secret);
authenticationClient.Host = "https://demo.authing.cn"
authenticationClient.Protocol = constant.OIDC
authenticationClient.TokenEndPointAuthMethod = constant.None
// Business callback address
authentication.setRedirectUri(REDIRECT_URI);
```

### A user login link to generate an OIDC protocol

authenticationClient.BuildAuthorizeUrlByOidc(options)

A user login link to generate an OIDC protocol

#### parameter

- `options` \<model.OidcParams\> Parameters that need to be filled in when launching a license login. Please see [Using OIDC Authorization Code Mode](/federation/oidc/authorization-code/)。
- `options.scope` \<String\> Request permission item, option, OIDC protocol default `openid profile email phone address`, OAuth 2.0 protocol is default `user`.
- `options.nonce` \<String\> Random strings, optional, default automatically generated.
- `options.state` \<String\> Random strings, optional, default automatically generated.
- `options.responseMode` \<String\> Response type, optional, optional value `query`、`fragment`、`form_post`; default is `query`, Is redirected by the browser to send the Code to the callback address.
- `options.responseType` \<String\> Response type, optional, optional value `code`、`code id_token token`、`code id_token`、`code id_token`、`code token`、`id_token token`、`id_token`、`none` ; default is`code`, Authorize code mode.
- `options.redirectUri` \<String\> The redirectUri parameter when the callback address, optional, and defaults to SDK initialization.

#### Example

```go
// Splicing OIDC license link
authenticationClient := NewClient(AppId, Secret)
	authenticationClient.Protocol = constant.OIDC
	authenticationClient.TokenEndPointAuthMethod = constant.None
	req := model.OidcParams{
		AppId:               AppId,
		RedirectUri:         "https://xxxxx.com/",
		Nonce:               "test",
	}
	resp, err := authenticationClient.BuildAuthorizeUrlByOidc(req)
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(resp)
	}

```

#### Sample data

```http
https://oidcdemo.authing.cn/oidc/auth?client_id=60a6f980dd9a9a7642da768a&nonce=test&redirect_uri=https%3A%2F%2Fmvnrepository.com%2F&response_type=code&scope=openid+profile+email+phone+address&state=stcnehi8rt57
```

### Code change Token

authenticationClient.getAccessTokenByCode(code)

Use the authorization code Code to get the user's Token information.

#### parameter

- `code` \<String\> Authorization code Code, the user will send the authorization code code to the callback address after the authentication is successful. Please see [OIDC Authorization Code Mode](/federation/oidc/authorization-code/).

#### Example

```go
resp, err := authenticationClient.GetAccessTokenByCode('Authorization code')
```

#### Sample data

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRmTE90M0xibjhfYThwUk11ZXNzYW1xai1vM0RCQ3MxLW93SExRLVZNcVEifQ.eyJqdGkiOiJsdzg0NW5zdGcwS3EtMTlodVpQOHYiLCJzdWIiOiI1ZmY3MDFkODQ2YjkyMDNlMmY2YWM2ZjMiLCJpYXQiOjE2MTU4ODM1ODYsImV4cCI6MTYxNTg4NzE4Niwic2NvcGUiOiJlbWFpbCBvcGVuaWQgcHJvZmlsZSBwaG9uZSIsImlzcyI6Imh0dHBzOi8vb2lkYzEuYXV0aGluZy5jbi9vaWRjIiwiYXVkIjoiNWYxN2E1MjlmNjRmYjAwOWI3OTRhMmZmIn0.VvYKBcWcr8iIi1b37ugWQ9hsvog4_7EqDQyFqwhIuvM0NHlHH3Bhw83EQIKSNfbWV4nv3ihfeNGPLMzslbQr-wwjnWZTLMYl1bcn7IdVtD_kTN3Zz10MwF5td-VQ7UndU28wJ0HE1mo6E8QH93kYGckS5FSZXmCBa0M5H59Jec_a1MHI1MZrr_V9cZ9EfeF97V-PcqU8JVAwDZclCJ3mWY_Mb65RnMR9yEVqUZzJStmaXGMuRIzjkm2pklqt0CtQQJfzECXq_4USpwRXDiYLWILYPUCcO6hGxDjhMEd8IcxdG51TQP-w1UM6LyIRn61uSJvDsz8zg5dStDKyocypiA",
  "expires_in": 3600,
  "id_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QzQDEyMy5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInN1YiI6IjVmZjcwMWQ4NDZiOTIwM2UyZjZhYzZmMyIsImJpcnRoZGF0ZSI6bnVsbCwiZmFtaWx5X25hbWUiOm51bGwsImdlbmRlciI6IlUiLCJnaXZlbl9uYW1lIjpudWxsLCJsb2NhbGUiOm51bGwsIm1pZGRsZV9uYW1lIjpudWxsLCJuYW1lIjpudWxsLCJuaWNrbmFtZSI6bnVsbCwicGljdHVyZSI6Imh0dHBzOi8vZmlsZXMuYXV0aGluZy5jby9hdXRoaW5nLWNvbnNvbGUvZGVmYXVsdC11c2VyLWF2YXRhci5wbmciLCJwcmVmZXJyZWRfdXNlcm5hbWUiOm51bGwsInByb2ZpbGUiOm51bGwsInVwZGF0ZWRfYXQiOiIyMDIxLTAzLTE1VDA1OjU0OjU0LjY4NVoiLCJ3ZWJzaXRlIjpudWxsLCJ6b25laW5mbyI6bnVsbCwicGhvbmVfbnVtYmVyIjpudWxsLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOmZhbHNlLCJub25jZSI6IjcwVEU3eW9NVFEiLCJhdF9oYXNoIjoiUFNnOGw5eDRldGxmLXA4UDdjYnVoQSIsImlzcyI6Imh0dHBzOi8vb2lkYzEuYXV0aGluZy5jbi9vaWRjIiwiaXNzMiI6Imh0dHBzOi8vYmFpZHUuY29tIiwiYXVkIjoiNWYxN2E1MjlmNjRmYjAwOWI3OTRhMmZmIiwiZXhwIjoxNjE1ODg3MTg3LCJpYXQiOjE2MTU4ODM1ODh9.OlX-FP7znIEqx0YpnOQ8kxadMe1toHDj1KPVm0dbEVc",
  "scope": "email openid profile phone",
  "token_type": "Bearer"
}
```

Field Explanation:

| Field name   | meaning                                   |
| ------------ | ----------------------------------------- |
| token_type   | Token Type, fixed value Bearer            |
| scope        | Wheelcence, authorized acquisition items  |
| id_token     | Id token，Authing Issued Id token         |
| expires_in   | Access token expiration                   |
| access_token | Access token，Authing Issued Access token |

### Token for user information

authenticationClient.getUserInfoByAccessToken('access_token')

Use Access token to get user information.

#### parameter

- `access_token` \<String\> Access token, use the contents of Access token with the authorization code code. Please see[Using OIDC Authorization Code Mode](/federation/oidc/authorization-code/).

#### Example

```go
resp, err := authenticationClient.GetUserInfoByAccessToken('Access token')
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
| sub                    | Subject's abbreviation, unique identifier, generally user ID |
| name                   | name                                                         |
| given_name             | given name                                                   |
| family_name            | family name                                                  |
| middle_name            | middle name                                                  |
| nickname               | nickname                                                     |
| preferred_username     | preferred username                                           |
| profile                | Basic information                                            |
| picture                | Avatar                                                       |
| website                | website                                                      |
| email                  | email                                                        |
| email_verified         | Whether the mailbox is certified                             |
| gender                 | gender                                                       |
| birthdate              | birthdate                                                    |
| zoneinfo               | Time zone                                                    |
| locale                 | area                                                         |
| phone_number           | phone number                                                 |
| phone_number_verified  | Certified mobile phone number                                |
| address                | Address object                                               |
| address.formatted      | Address                                                      |
| address.street_address | Street address                                               |
| address.locality       | city                                                         |
| address.region         | region                                                       |
| address.postal_code    | postal code                                                  |
| address.country        | country                                                      |
| updated_at             | Information update time                                      |

### Refresh Access Token

authenticationClient.getNewAccessTokenByRefreshToken(refreshToken)

Use Refresh token get new Access token。

#### parameter

- `refreshToken` \<String\> Refresh token，可以从 authenticationClient.getAccessTokenByCode 方法的返回值中的 refresh_token 获得。详情请见[刷新 Access token](/guides/federation/oidc.md#刷新-access-token)。

#### Example

```go
resp, err := authenticationClient.GetNewAccessTokenByRefreshToken('Access token')
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

### Check Access Token

authenticationClient.introspectToken(token)

Check Access token or Refresh token status.

#### parameter

- `token` \<String\> Access token or Refresh token, you can get access_token、refresh_token from the return value of authenticationClient.getAccessTokenByCode.

#### Example

```go
resp, err := authenticationClient.IntrospectToken('Access token or Refresh token')
```

#### Sample data

Token is returned when returning:

```json
{
  "active": true,
  "sub": "60097f4d5bc08f75da104d18", // subject 的缩写，为用户 ID
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

### check Id Token legality

authenticationClient.validateToken(param)

Online Interface Verify Id token or Access token via Authing. A network request will be generated.

#### parameter

- `param` \<ValidateTokenParams\>
- `param.dToken` \<String\> Access token or Refresh token, you can get id_token from the return value of authenticationClient.getAccessTokenByCode.
- `param.accessToken` \<String\> Access token, you can get access_token from the return value of authenticationClient.getAccessTokenByCode

#### Example

```java
req := model.ValidateTokenRequest{
		AccessToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjQ0bnJHU05YQ3NDLTByd1J5Q0hENjBzdmc0elpLNF9iV2VnQjluOFRhQzQifQ.eyJqdGkiOiJ3NjJmNkVieHYxd19wbEV3YWMwWlIiLCJzdWIiOiI2MGUyNmI2ZjdiMGRkN2MwYWY4M2VjZDkiLCJpYXQiOjE2MjU0OTI3NjUsImV4cCI6MTYyNjcwMjM2NSwic2NvcGUiOiJvcGVuaWQgcGhvbmUgYWRkcmVzcyBwcm9maWxlIGVtYWlsIiwiaXNzIjoiaHR0cHM6Ly8zMmw1aGItZGVtby5hdXRoaW5nLmNuL29pZGMiLCJhdWQiOiI2MGE2Zjk4MGRkOWE5YTc2NDJkYTc2OGEifQ.KOMWqEtbyH3qdBv_bHX3Dof2t_3XBQ7QDg4-x7fIr9W2YtCnwNnqVehOVYjWpcF-pkVyzBlpmKIc6_X9F8GA-oYbdUKJzhxfoAATj1JnRCRs6Wsxpo3U41up1pgXs5B7JS7gVbiw_IucMg4vLYw_QJ_aPgBTkjCkBZVsPf3NRYCd2cVwiZwvoa8GT6jGP9PJ908rJSSSdsqt6JNzydVbJ9a7p4mBhV3WxUAckXePjIE0QDNDe_GxFwFDktkTbLBIJZBL4bSg3pHGQKHiF9wabfjBRfWV8ChRe8i95n7pq-Gw9fw2fKNv7ieC5bK52D1j6R9L5h7wRvTstgiR7p8krQ",
		IdToken:     "",
	}
	resp, err := authenticationClient.ValidateToken(req)
```

#### Sample data

id_token Returns when verifying:

```json
{
  "sub": "5f64afd1ad501364e3b43c1e",
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

Id token returns the illegal time:

```json
{ "code": 400, "message": "id_token Format is incorrect" }
```

```json
{ "code": 400, "message": "id_token illegal" }
```

Access token Returns when verifying:

```json
{
  "jti": "K5TYewNhvdGBdHiRifMyW",
  "sub": "5f64afd1ad501364e3b43c1e", // subject 的缩写，为用户 ID
  "iat": 1601456894,
  "exp": 1601460494,
  "scope": "openid profile email phone",
  "iss": "https://oidc1.authing.cn/oidc",
  "aud": "5f17a529f64fb009b794a2ff"
}
```

Access token returns the illegal time:

```json
{ "code": 400, "message": "access_token Format is incorrect" }
```

```json
{ "code": 400, "message": "access_token illegal" }
```

### Client Credentials Mode acquisition Access Token

authenticationClient.getAccessTokenByClientCredentials(scope, options)

Use [Programming Access Account](/guides/authorization/m2m-authz.html#m2m-授权)get permission Access Token。

#### parameter

- `scope` \<String\> Permission items, space separated strings, each represents a permission. Please see [Machine (M2M) Authorization](/guides/authorization/m2m-authz.html#获取具备权限的-accesstoken)。
- `options` \<ClientCredentialInput\> Programming Access AK and SK information.
- `options.accessKey` \<String\> Programming Access Account AccessKey.
- `options.secretKey` \<String\> Programming Access Account SecretKey.

#### Example

```go
input := model.ClientCredentialInput{
		AccessKey: "60519949a70e7dda12785693",
		SecretKey: "be1a5596b3185d88c097ae310e3184ed",
	}
	req := model.GetAccessTokenByClientCredentialsRequest{
		Scope:                 "openid",
		ClientCredentialInput: &input,
	}
	resp, err := authenticationClient.GetAccessTokenByClientCredentials(req)
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(resp)
	}
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

### Withdraw Access Token or Refresh token

authenticationClient.revokeToken(token)

Withdraw Access token or Refresh token. Access token or Refresh token holders can notify Authing no longer need token, I hope Authing will revoke it.

#### parameter

- `token` \<string\> Access token or Refresh token, you can get access_token、refresh_token from the value of authenticationClient.GetAccessTokenByCode.

#### Example

```go
resp, err := authenticationClient.RevokeToken("Access token 或 Refresh token")
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(resp)
	}
```

#### Sample data

Returns True when the withdrawn is successful.

Throw an error when the withdrawal fails.
