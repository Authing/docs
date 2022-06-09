# Become OpenID Connect Identity Source

<LastUpdated/>

This article introduces how to make Authing an OIDC identity resource, other systems can connect to Authing as identity providers through OIDC protocol.

OpenID Connect protocol (OIDC) is a lightweight and secure identity authentication and authorization protocol. OIDC is a superset of the OAuth 2.0 protocol.

OpenID Connect protocol has the following authorization modes, which are:

- [Authorization code mode](#authorization-code-modee)
- [Implicit mode](#implicit-mode)
- [Hybrid mode](#hybrid-mode)
- [Client Credentials mode](#client-credentials-mode)
- [Password mode](#password-mode)

After becoming an OpenID Connect identity source, Other applications can use the corresponding process of the mode to complete user authentication and authorization.

You can understand the OIDC protocol in depth [here](/concepts/oidc/oidc-overview.md).

## Create an Application

In order for your application to have identity authentication capabilities, you need to create an application in Authing. It is recommended to fill in the name of your actual application project. In **Console** > **Applications** > **Application List**, click “Create Application”.

![](~@imagesZhCn/guides/federation/oidc/1-1.png)

Fill in the **application name**, for example, Web Note Project, specify an **authentication address** for your project, where your users will complete authentication. Fill in the **callback address** as the **back-end route** of your project. Authing will send user information (authorization code actually) to this address. Finally, click “Create”.

![](~@imagesZhCn/guides/federation/oidc/1-2.png)

## Authorization code mode

If your application project has a **back-end service** that can store secret key safety, the **authorization code mode** is recommended.

In **Console** > **Applications**, find your application, in the application details page, in the "Configuration" card below, check `authorization_code` in the authorization mode, check `code` in the return type, and then click Save.

![](~@imagesZhCn/guides/federation/oidc/1-3.png)

There are the following processes.

1. In your application, let the user visit the login link, the browser redirects to Authing, the user completes **authentication** in Authing.
2. The browser receives an **authorization code** from Authing service.
3. The browser sends the **authorization code** to your application **back-end** using redirection.
4. Your application service sends the **authorization code** to Authing to obtain **AccessToken** and **IdToken**, refresh token also will be returned if necessary.
5. Now your application back-end knows the user’s identity and can save user information later, redirect to other front-end pages, use AccessTokan to call other resources’ API, etc.

Below is the workflow:

![](~@imagesZhCn/guides/federation/oidc/authorization-code-flow.png)

[Check the document.](/federation/oidc/authorization-code/)。

## Implicit mode

If your application is a **SPA front-end application** and doesn’t have back-end services, it is recommended to use the **implicit mode** to complete user authentication and authorization. Implicit mode **fits the scenario that the secrete key cannot be stored safely**(such as in front-end browsers). In **implicit mode**, applications don’t need to use code to exchange tokens, don’t need to call the `/token` endpoint, AccessToken and IdToken will be returned directly from the **authentication endpoint**.

:::hint-info
Implicit mode **fits the scenario that the secrete key cannot be stored safely**, so it does not support get refresh token.
:::

In **Console** > **Applications**, find your application, in the application details page, in the "Configuration" card below, check `implicit` in the authorization mode, check `id_token token` and `id_token` in the return type, and then click Save.

![](~@imagesZhCn/guides/federation/oidc/1-4.png)

There are the following processes.

1. In your application, let the user visit the login link, the browser redirects to Authing, the user completes **authentication** in Authing.
2. Authing redirects the browser to your application callback address. AccessToken and IdToken are sent as **URL hash**.
3. Your application retrieves token from URL.
4. Your application can save AccessToken and IdToken for further use. Such as carrying AccessToken to access the resource service, carrying IdToken to request the service so that the server can identify the user's identity.

Below is the workflow:

![](~@imagesZhCn/guides/federation/oidc/implicit-flow.png)

[Check the document](/federation/oidc/implicit/).

## Hybrid mode

In some scenarios, you may not only want to directly obtain token from the authentication endpoint but also obtain the authorization code for further obtaining the refresh token. It is recommended to use **hybrid mode**. In **hybrid mode**, applications will receive token and code. Applications can choose to send code to back-end services to obtain users’ AccessToken, IdToken, refresh token from `/token` endpoint.

In **Console** > **Applications**, find your application, in the application details page, in the "Configuration" card below, check `authorization_code` and `implicit` in the authorization mode, check `code id_token token`, `code id_token` and `code token` in the return type, and then click Save.

![](~@imagesZhCn/guides/federation/oidc/1-5.png)

There are the following processes.

1. In your application, let the user visit the login link, the browser redirects to Authing, the user completes **authentication** in Authing.
2. Authing redirects the browser to your application callback address. Code, AccessToken and IdToken are sent as **URL hash**.
3. Your application retrieves code and token from URL.
4. Your application can save AccessToken and IdToken for further use. Such as carrying AccessToken to access the resource service, carrying IdToken to request the service so that the server can identify the user's identity.
5. Your application can send code to the back-end.
6. Application back-end can use code to obtain users’ AccessToken, IdTokn and refresh token. In the future to save user information, use AccessToken to call other APIs of the resource party, and so on.

Below is the workflow:

![](~@imagesZhCn/guides/federation/oidc/hybrid-flow.png)

[Check the document](/federation/oidc/hybrid/).

## Client Credentials mode

Client Credentials mode is used for server-to-server authorization (M2M authorization), there is no user involved. You need to create a programming access account. And give AK, SK secret key to your resource caller.

In **Console** > **Applications**, find your application, in the application details page, in the "Configuration" card below, check `RS256` as the id_token signature algorithm, check `client_credentials` in the authorization mode, and then click Save.

![](~@imagesZhCn/guides/federation/oidc/1-6.png)

There are the following processes.

1. Resource caller sends his credentials AK, SK, and the requested permission scope to the Authing authorization endpoint.
2. If the credentials are correct and the caller has resource permissions, Authing issues an AccessToken for it.

Below is the workflow:

![](~@imagesZhCn/guides/federation/oidc/client-credentials-flow.png)

[Check the document](/federation/oidc/client-credentials/).

## Password Mode

It is not recommended to use this mode, try to use other modes as much as you can. **Password mode** will be considered only when other modes cannot solve the problem. If using password mode, please make sure your application code logic is very safe and will not be attacked by hackers, otherwise, **the user's account credentials will be directly disclosed**. It is generally used to integrate very old applications, otherwise, you should **never take** it as your first choice.

In **Console** > **Applications**, find your application, in the application details page, in the "Configuration" card below, check `password` in the authorization mode, and then click Save.

![](~@imagesZhCn/guides/federation/oidc/1-7.png)

There are the following processes.

1. Your application asks the user to enter credential information.
2. Your application sends user credential to Authing.
3. If the credential is correct, Authing returns token.

Below is the workflow:

![](~@imagesZhCn/guides/federation/oidc/password-flow.png)

[Check the document](/federation/oidc/password/).

## Refresh Access Token

Refresh Token is required to refresh Access Token. You can learn about Refresh Token [here](/concepts/refresh-token.md). Refresh Token is used to obtain a new Access Token and keep the user sign in.

### Obtain Refresh Token

If you want to obtain [Refresh Token](/concepts/refresh-token.md), you need to send the request to Authing to get [Refresh Token](/concepts/refresh-token.md).

Only **authorization code mode** and **password mode** can support [Refresh Token](/concepts/refresh-token.md).

When the combination of authorization mode and Scope shown in the following table is sent to the Token endpoint, Authing will return Refresh Token.

| Authroization mode | Scope          |
| ------------------ | -------------- |
| refresh_token      | offline_access |
| password           | offline_access |

::: hint-warning
Warning : When using the **authorization code mode**, you must carry the scope when requesting the **authorization endpoint**(`/oidc/auth`), scope value **must** include `offline_access`, and the prompt parameter **must** be included, which value must be `consent`. Otherwise, Authing **will not return any Refresh Token**.
:::

#### Obtain Refresh Token in Authorization Code Mode

When using the authorization code mode, you must carry the scope to access **authorization endpoint**(`/oidc/auth`), scope **must** include `offline_access`, and the prompt parameter **must** be included, which value must be `consent`. Obtaining an authorization code and send it to **Token Endopoint**, Authing will return Access Token, Id Token and Refresh Token. Check [using OIDC authorization code mode](/federation/oidc/authorization-code/) to get further information.

#### Obtain authorization code and refresh token example

The following request example can obtain the authorization code and Refresh Token, pay attention to the `offline_access` content in the scope.

```http
https://{your application domain name}/oidc/auth?client_id={Application ID}
&response_type=code
&scope=openid%20profile%20email%20phone%20address%20offline_access
&redirect_uri={Callback address}
&state=4756806
```

#### Obtaining Access Token, Id Token and Refresh Token Example

The following request example can obtain Access Token, Id Token, and Refresh Token from the Token endpoint. The value of the `code` parameter is the **authorization code** returned from the authentication endpoint in the previous step.

```http
POST https://${你的应用域名}/oidc/token?grant_type=authorization_code
&redirect_uri={Callback address}
&code={Authroization code}
&client_id={Application ID}
&client_secret={Application Secret}
```

#### Response Example:

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

#### Obtain Refresh Token in Password Mode

In password mode, you will only use the **Token Endpoint**. See [Using Password Mode](/federation/oidc/password/) for more information.

Include `offline_access` in the request scope of the password mode.

```http
POST https://${Your Application domain name}/oidc/token?grant_type=password
&client_id={Application ID}
&client_secret={Application Secret}
&username={Username}
&password={Password}
&scope=openid%20offline_access
```

#### Response example

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
