# Add customize field with IdToken

<LastUpdated/>

## What is IdToken

**id_token** is equivalent to the user's ID. The developer's front-end should carry the id_token when accessing the back-end interface, and the developer server needs to verify the id_token passed by the front-end. You can use the key of the OIDC application or the public key of the OIDC application to verify the signature, and then you can get the user ID and basic information corresponding to this token. For sample code, please see:：[Verify Token with Application Key.](/guides/basics/authenticate-first-user/how-to-validate-user-token.md#使用应用密钥验证-hs256-算法签名的-token)

In {{$localeConfig.brandName}}, the `token` field of [user information](/guides/user/user-profile.md) is an IdToken.

## Default IdToken fields

An OIDC IdToken contains the following fields by default, refer to the [OIDC Specification](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims)：

| Fields                | Description                |
| :-------------------- | :------------------------- |
| sub                   | Unique id                  |
| name                  | User name                  |
| given_name            | Given name                 |
| family_name           | Family name                |
| middle_name           | Middle name                |
| nickname              | Display name               |
| preferred_username    | Preferred usrname          |
| profile               | User profile               |
| picture               | Profile image              |
| website               | Website link               |
| email                 | Email                      |
| email_verified        | If email has been verified |
| gender                | Gender                     |
| birthdate             | Date of birth              |
| zoneinfo              | Timezone                   |
| locale                | Zone                       |
| phone_number          | Phone number               |
| phone_number_verified | Verified phone number      |
| address               | Address                    |
| formatted             | Detailed address           |
| street_address        | Street                     |
| locality              | Street address             |
| region                | State                      |
| postal_code           | Zip code                   |
| country               | Country                    |
| updated_at            | Update time                |

## IdToken add customize fields

You can use Authing's [Pipeline Capability](/guides/pipeline/)to insert custom code snippets in the user authentication process and add custom `IdToken` fields to users. For example, in the following example, we have added the `KEY` field to the user's `id_token` with a value of `VALUE`:

```javascript
async function pipe(user, context, callback) {
  user.addToken("KEY", "VALUE");
  callback(null, user, context);
}
```

> You can parse `id_token` on this [website](https://jwt.yelexin.cn).
