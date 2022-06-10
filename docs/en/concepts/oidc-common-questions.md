---
meta:
  - name: description
    content: OpenID Connect
---

# OpenID Connect

<LastUpdated/>

OpenID Connect (OIDC) is a simple identity layer on top of the OAuth 2.0 protocol, which allows different Application to verify the identity of an end-user based on the authentication performed by an authorization server. User only need to login once to access all the applications.

## How OIDC works in Backend

Example on GitHub: [oidc-demo](https://github.com/Authing/oidc-demo)

## Flow Features

|
| Authorization Code Flow | Implicit Flow | Hybrid Flow |
| --- | --- | --- | --- |
| Token Form Authorization Endpoint | no | yes | no |
| Token Form Token Endpoint | yes | no | no |
| Token won&#39;t exposed to Front End | yes | no | no |
| Client can be authorized | yes | no | yes |
| Can use Refersh Token | yes | no | yes |
| Communication in one trip | no | yes | no |
| Server - Server communication | yes | no | varies |

## Response Types by Flow

| &quot;response_type&quot; value | Flow                    |
| ------------------------------- | ----------------------- |
| code                            | Authorization Code Flow |
| id_token                        | Implicit Flow           |
| id_token token                  | Implicit Flow           |
| code id_token                   | Hybrid Flow             |
| code token                      | Hybrid Flow             |
| code id_token token             | Hybrid Flow             |

Refer to [OIDC Protocol](https://openid.net/specs/openid-connect-core-1_0.html#Authentication).

## How to Verify Token

Please refer to：

::: page-ref /guides/basics/authenticate-first-user/how-to-validate-user-token.md
:::

## Information Stored in socpe

| scope          | Infomation                                                                                                                                           |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| address        | address                                                                                                                                              |
| email          | email，email_verified                                                                                                                                |
| phone          | phone_number, phone_number_verified                                                                                                                  |
| profile        | birthdate，family_name，gender，given_name，locale，middle_name，name，nickname，picture，preferred_username，profile，updated_at，website，zoneinfo |
| offline_access | If present，return refresh_token                                                                                                                     |
| role           | user role list                                                                                                                                       |

## OIDC Claim Example

| Claim              | Claim                 |
| ------------------ | --------------------- |
| sub                | birthdate             |
| name               | zoneinfo              |
| given_name         | locale                |
| family_name        | phone_number          |
| middle_name        | phone_number_verified |
| nickname           | address               |
| preferred_username | formatted             |
| profile            | street_address        |
| picture            | locality              |
| website            | region                |
| email              | postal_code           |
| email_verified     | country               |
| gender             | updated_at            |

Refer to [OIDC Protocol](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims)

## ID Token and Access Token

When calling Back End, ID Token should be sent with the request. Developer Server should validate ID Token and decrypt ID Token by OIDC Secret Key or Public Key
Refer to [How to Verify Token](/guides/basics/authenticate-first-user/how-to-validate-user-token.md#Use 应用密钥验证-hs256-算法签名的-token).

When requesting resources, Access Token should be sent within the Authorization Header. Eg:

```js
const axios = require("axios");
axios
  .get({
    url: "https://core.authing.cn/api/v2/your/resources",
    headers: {
      Authorization: "Bearer YOUR_OIDC_ACCESS_TOKEN"
    }
  })
  .then(res => {
    // custom codes
  });
```

## Why OIDC Prefer Authorization Code Flow

There are three parties in OIDC Authorization Code Flow: User, OIDC Provider (OP) and Service Provider (SP).
Flow between SP, OP and User:

1. SP send SAML Request and Redirect User to OP login page.
2. User Login then OP send Authorization Code to SP.
3. SP receive Authorization Code and exchange `access_token` with Client ID and Client Secret.
4. SP use `access_token` to request SAML Assertion from OP.

Authorization Code Flow avoided access_token or user information exposed at Front End. In OIDC Protocol, after successful login, OP will redirect user browser to callback URL with an Authorization Code. In general, Authorization Code have 10 min lifetime and one time use only. However, `access_token` have a relatively long lifetime, typically 1 to 2 hours.

Back End exchange access_token from OP by Authorization Code, Client Id and Client Secret. During this step. OP verified those information to ensure the request came from authorized SP. If Authorization Code was hacked, without Client Id and Secret, there is no way to request user information from OP. Even the Client Id and Secret also breached. Authorization Code is one time use only with 10 mins lifetime. It significantly reduces the chance of data breach.
