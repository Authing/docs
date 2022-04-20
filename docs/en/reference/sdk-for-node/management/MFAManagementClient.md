---
meta:
  - name: description
    content: management MFA
---

# Management MFA

<LastUpdated/>

This module is primarily used to manage MFA-related operations.

Please use the module in the following ways:

```javascript
import { ManagementClient } from 'authing-js-sdk'

const managementClient = new ManagementClient({
  userPoolId: 'YOUR_USERPOOL_ID',
  secret: 'YOUR_USERPOOL_SECRET',
})
managementClient.mfa.getStatus(USER_ID) // User MFA Binding Status
```

## Get user MFA binding status

managementClient.mfa.getStatus(userId)

> Get user MFA binding status

#### parameter

- `userId` \<string\> user ID

#### Example

```javascript
managementClient.mfa.getStatus(USER_ID)
```

#### Sample data

```js
{
  "FACE": true,
  "OTP": false
}
```

## Unfounded user MFA

managementClient.mfa.unAssociateMfa(userId, mfaType)

> Unfounded user MFA

#### parameter

- `userId` \<string\> user ID
- `mfaType` \<string\> Melting type, optional value `FACE`, `OTP`

#### Example

```javascript
managementClient.mfa.unAssociateMfa(USER_ID, 'OTP')
```

#### Sample data

```js
true
```

## Import existing TOTP keys to Authing

managementClient.mfa.importTotp(userId, secret, recoveryCode)

> Import existing TOTP keys to Authing and enable TOTP MFA for users. Suitable for the scene: The business system has an MFA system that users have bind MFA in the original system, and now I hope to migrate the user's MFA authenticator to Authing.

#### parameter

- `userId` \<string\> user ID
- `secret` \<string\> TOTP Key
- `recoveryCode` \<string\> Restore code, you can log in with recovery code when you lose TOTP

#### Example

```javascript
managementClient.mfa.importTotp('USER_ID', 'SECRET', 'RECOVERY_CODE')
```

#### Sample data

```js
{
    userId: '60ae0cf98370aa285819af72',
    enable: true,
    secret: 'XXXXXXXXXXXXX',
    authenticatorType: 'totp',
    recoveryCode: 'xxxx-xxxx-xxxx-xxxx-xxxx-xxxx',
    createdAt: '2021-05-26T09:53:37.268Z',
    updatedAt: '2021-05-26T09:53:37.268Z',
    id: '60ae1aa11d63d248ee25a895',
}
```
