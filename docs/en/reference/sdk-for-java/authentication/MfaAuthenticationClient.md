# Multi-factor authentication module

<LastUpdated/>

This module is used to bind to user, solve TOTP, SMS, Mailbox, Face Identification and other secondary certificates. For example, when the user has a differential behavior, you want the user to make a secondary authentication, and current Authing supports a variety of secondary verification, including TOTP, SMS, Mailbox, Face recognition, etc.

Sample code:

```javascript
import { AuthenticationClient } from 'authing-js-sdk'
const authenticationClient = new AuthenticationClient({
  appId: 'AUTHING_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
})

authenticationClient.mfa.getMfaAuthenticators
authenticationClient.mfa.assosicateMfaAuthenticator
authenticationClient.mfa.verifyTotpMfa
authenticationClient.mfa.verifyFaceMfa
authenticationClient.mfa.associateFaceByLocalFile
authenticationClient.mfa.associateFaceByBlob
authenticationClient.mfa.associateFaceByUrl
authenticationClient.mfa.verifyTotpRecoveryCode
authenticationClient.mfa.phoneOrEmailBindable
authenticationClient.mfa.verifyAppEmailMfa
authenticationClient.mfa.verifyAppSmsMfa
authenticationClient.mfa.confirmAssosicateMfaAuthenticator
authenticationClient.mfa.deleteMfaAuthenticator
```

## TOTP Certification

### Get TOTP authenticator information

MfaAuthenticationClient().getMfaAuthenticators()

> Get TOTP MFA certifiers

#### parameter

- `options`: \<object\>
  - `options.totp`: \<string\>, TOTP recovery code.

#### Example

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'AUTHING_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
})
const authenticators = await authenticationClient.mfa.getMfaAuthenticators({
  type: 'totp',
})
```

#### return value

- `Promise<IMfaAuthenticators>`

### Request to bind TOTP authenticator

MfaAuthenticationClient().assosicateMfaAuthenticator(options)

> Request TOTP MFA QR code and key information to complete the binding

#### parameter

- `options`: \<object\>
  - `options.authenticatorType`: [\<string\>]The bound MFA type can only pass 'totp'.
  - `options.mfaToken`: [\<string\>] mfaToken returned to the rearmost end of the MFA when the MFA is not logged in.
  - `options.source`: [\<string\>] From the application binding or personal center binding, optional value is 'APPLICATION'、'SELF', default is 'SELF'.

#### Example

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'AUTHING_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
})
const authenticators = await authenticationClient.mfa.assosicateMfaAuthenticator(
  { authenticatorType: 'totp' }
)
```

#### return value

- `Promise<IMfaAssociation>`

### Confirm binding TOTP authenticator

MfaAuthenticationClient().confirmAssosicateMfaAuthenticator()

> Confirm binding TOTP authenticator

#### parameter

- `options`: \<object\>
  - `options.totp`: \<string\>, totp code.
  - `options.authenticatorType`: [\<string\>], bound MFA type, can only pass 'totp'。
  - `options.mfaToken`: [\<string\>] mfaToken。 returned to the rearmost end of the MFA when the MFA is not logged in.
  - `options.source`: [\<string\>] from the application binding or personal center binding, optional value is'APPLICATION'、'SELF', default is 'SELF'。

#### Example

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'AUTHING_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
})
const authenticators = await authenticationClient.mfa.confirmAssosicateMfaAuthenticator(
  { authenticatorType: 'totp', totp: '112233' }
)
```

#### return value

- `Promise<IMfaConfirmAssociation>`

### Check the TOTP certification instrument

MfaAuthenticationClient().verifyTotpMfa()

> Test secondary verification TOTP password

#### parameter

- `options`: \<object\>
  - `options.totp`: \<string\>, totp code.
  - `options.authenticatorType`: \<string\>, Binding MFA types can only pass 'totp'.

#### Example

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'AUTHING_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
})
const authenticators = await authenticationClient.mfa.verifyTotpMfa({
  authenticatorType: 'totp',
  totp: '112233',
})
```

#### return value

- [Promise\<User\>](/guides/user/user-profile.md)

### Check TOTP authenticator recovery code

MfaAuthenticationClient().verifyTotpRecoveryCode()

> Test secondary verification TOTP MFA recovery code

#### parameter

- `options`: \<object\>
  - `options.totp`: \<string\>, TOTP recovery code.
  - `options.authenticatorType`: \<string\>bound MFA type can only pass 'totp'.

#### Example

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'AUTHING_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
})
const authenticators = await authenticationClient.mfa.verifyTotpRecoveryCode({
  authenticatorType: 'totp',
  totp: '112233',
})
```

#### return value

- [Promise\<User\>](/guides/user/user-profile.md)

### Unfounded MFA

MfaAuthenticationClient().deleteMfaAuthenticator()

> Unfounded TOTP MFA

#### parameter

#### Example

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'AUTHING_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
})
const authenticators = await authenticationClient.mfa.deleteMfaAuthenticator()
```

#### return value

- `Promise<IMfaDeleteAssociation>`

## Mobile phone verification code authenticator

### Check SMS verification code authentication

MfaAuthenticationClient().verifyAppSmsMfa()

> Test secondary verification MFA SMS verification code

#### parameter

- `options` \<Object\>
- `options.phone` \<string\> phone
- `options.code` \<string\> Mobile phone verification code
- `options.mfaToken` \<string\> Login interface returned mfaToken。

#### Example

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'AUTHING_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
})
const authenticators = await authenticationClient.mfa.verifySmsMfa({
  mfaToken: 'xxxxxx',
  phone: '188xxxx8888',
  code: 'xxxx',
})
```

#### return value

- [Promise\<User\>](/guides/user/user-profile.md)

### Detect if the mobile phone number has been bound

MfaAuthenticationClient().phoneOrEmailBindable()

> When you need a mobile phone or email MFA login, and when the user is not binding the phone or mailbox, let the user enter the mobile phone number or email, use this interface to detect if the phone or mailbox can be bound, then MFA verification

#### parameter

- `options` \<Object\>
- `[options.phone]` \<string\> The phone number to be detected
- `options.mfaToken` \<string\> mfaToken returned by the login interface.

#### Example

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'AUTHING_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
})
const authenticators = await authenticationClient.mfa.phoneOrEmailBindable({
  mfaToken: 'xxxxxx',
  phone: '手机号',
})
```

#### return value

- `Promise<boolean>`

## Mailbox authenticator

### Check the mailbox verification code authentication

MfaAuthenticationClient().verifyAppEmailMfa()

> Test second verification TOTP MFA mailbox verification code

#### parameter

- `options` \<Object\>
- `options.email` \<string\> User email.
- `options.code` \<string\> Mobile phone verification code.
- `options.mfaToken` \<string\> mfaToken returned by the login interface.

#### Example

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'AUTHING_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
})
const authenticators = await authenticationClient.mfa.verifyAppEmailMfa({
  mfaToken: 'xxxxxx',
  email: 'example@authing.cn',
  code: 'xxxx',
})
```

#### return value

- [Promise\<User\>](/guides/user/user-profile.md)

### Detect whether the mailbox has been bound

MfaAuthenticationClient().phoneOrEmailBindable()

> When you need a mobile phone or email MFA login, and when the user is not binding the phone or mailbox, let the user enter the mobile phone number or email, use this interface to detect if the phone or mailbox can be bound, then MFA verification

#### parameter

- `options` \<Object\>
- `[options.email]` \<string\> The mailbox to be detected.
- `options.mfaToken` \<string\> mfaToken returned by the login interface.

#### Example

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'AUTHING_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
})
const authenticators = await authenticationClient.mfa.phoneOrEmailBindable({
  mfaToken: 'xxxxxx',
  email: 'example@authing.cn',
})
```

#### return value

- `Promise<boolean>`

## Face certifier

### Bind people through pictures URL

MfaAuthenticationClient().associateFaceByUrl(options)

> Bind people through pictures URL

#### parameter

- `options` \<object\>
  - `options.baseFace` \<string\>, Basic face picture link
  - `options.compareFace` \<string\>, Human face picture comparison link, used to compare the basic face picture
  - `options.mfaToken` \<string\>,Optional, incoming when the user's second login authentication binding face

#### Example

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'AUTHING_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
})
const authenticators = await authenticationClient.mfa.associateFaceByUrl({
  baseFace: 'https://example.com/photo/photoA.jpg',
  compareFace: 'https://example.com/photo/photoB.jpg',
  mfaToken: 'xxxxx',
})
```

#### return value

- [Promise\<User\>](/guides/user/user-profile.md)

### Bind people's face through blog

MfaAuthenticationClient().associateFaceByBlob(options)

> Bind people's face through blog

#### parameter

- `options` \<object\>
  - `options.baseFace` \<Blob\>, Basic human face information `blob`
  - `options.compareFace` \<Blob\>, Human face information`blob` object, used to confirm the basic human face
  - `options.mfaToken` \<string\>Optional, incoming when the user's second login authentication binding face

#### Example

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'AUTHING_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
})
const authenticators = await authenticationClient.mfa.associateFaceByBlob({
  baseFace: new Blob(...),
  compareFace: new Blob(...),
  mfaToken: 'xxxxx',
})
```

#### return value

- [Promise\<User\>](/guides/user/user-profile.md)

### Bind people's face by uploading local files

MfaAuthenticationClient().associateFaceByLocalFile()

> Bringing the face by uploading the local file, the file selection box is automatically popped in the browser.

#### parameter

No

#### Example

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'AUTHING_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
})
const authenticators = await authenticationClient.mfa.associateFaceByLocalFile()
```

#### return value

- [Promise\<User\>](/guides/user/user-profile.md)

### Test human face certifier

MfaAuthenticationClient().verifyFaceMfa(url)

> Detect secondary login face verification

#### parameter

`url` \<string\>, Face picture address

#### Example

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'AUTHING_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
})
const authenticators = await authenticationClient.mfa.verifyFaceMfa(
  'http://example.com/photo/photo.jpg'
)
```

#### return value

- [Promise\<User\>](/guides/user/user-profile.md)
