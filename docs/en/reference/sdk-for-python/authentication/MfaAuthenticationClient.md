# Multi-factor authentication module

<LastUpdated/>

'This module is used to bind to user, solve TOTP, SMS, Mailbox, Face Identification and other secondary certificates. For example, when the user has a differential behavior, you want the user to make a secondary authentication, and current Authing supports a variety of secondary verification, including TOTP, SMS, Mailbox, Face recognition, etc.

Sample code:

```javascript
import { AuthenticationClient } from 'authing-js-sdk'
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
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

## Get MFA certifiers

```python
def get_mfa_authenticators(self, mfa_token=None, type='totp', source='SELF'):
  pass
```

Get MFA certifiers

#### parameter

- `mfa_token` \<str\> Token
- `type` \<str\> type
- `source` \<str\> data source

#### Example

```python
tt = self.authentication.login_by_email("fptvmzqyxn@authing.cn", "pwd")
authentication.get_mfa_authenticators(mfa_token=tt['token'])
```

#### Sample data

```json
{
  "message": "获取 MFA Authenticator 成功",
  "code": 200,
  "data": []
}
```

## Request MFA QR code and key information

```python
def assosicate_mfa_authenticator(self, mfa_token=None, authenticator_type='totp', source='SELF'):
  pass
```

Request MFA QR code and key information

#### parameter

- `mfa_token` \<str\> Token
- `authenticator_type` \<str\> type
- `source` \<str\> data source

#### Example

```python
tt = self.authentication.login_by_email("fptvmzqyxn@authing.cn", "pwd")
res = self.authentication.assosicate_mfa_authenticator(tt['token'])
```

#### Sample data

```json
{
  "message": "Get successful MFA key",
  "code": 200,
  "data": {
    "recovery_code": "bc5a-6879-617a-6e94-9dd1-9dd2",
    "authenticator_type": "totp",
    "qrcode_data_url": "data:image/png;base64,iVBO Wse1lrXPKy1rnlYa13zsNa65mGtdc3DWuuah7XWNQ9rrWse1lrX/B//adHsf5AaswAAAABJRU5ErkJggg==",
    "secret": "JRYQWOZNJMQXQOAO",
    "qrcode_uri": "otpauth://totp/newSDK:fptvm K"
  }
}
```

## Mensize MFA

```python
def delete_mfa_authenticator(self):
  pass
```

Mensize MFA

#### Example

```python
tt = self.authentication.login_by_email("fptvmzqyxn@authing.cn", "pwd")
res = authentication.delete_mfa_authenticator()
```

#### Sample data

```json
{
  "message": "TOTP MFA 解绑成功",
  "code": 200
}
```

## Confirm binding MFA

```python
def confirm_assosicate_mfa_authenticator(self,
                                           totp,
                                           authenticator_type='totp',
                                           source='SELF',
                                           mfa_token=None):
  pass
```

Confirm binding MFA

#### parameter

- `totp` \<str\> Verification code
- `authenticator_type` \<str\> type
- `source` \<str\> data source
- `mfa_token` \<str\> Token

#### Example

```python
tt = self.authentication.login_by_email("fptvmzqyxn@authing.cn", "pwd")
authentication.confirm_assosicate_mfa_authenticator(tt['token'])
```

## Test secondary verification MFA password

```python
def verify_totp_mfa(self, totp, mfa_token):
  pass
```

Test secondary verification MFA password

#### parameter

- `totp` \<str\> Verification code
- `mfa_token` \<str\> Token

#### Example

```python
tt = self.authentication.login_by_email("fptvmzqyxn@authing.cn", "pwd")
authentication.verify_totp_mfa("",tt['token'])
```

## Test secondary verification MFA SMS verification code

```python
def verify_app_sms_mfa(self, phone, code, mfa_token):
  pass
```

Test secondary verification MFA SMS verification code

#### parameter

- `phone` \<str\> phone
- `code` \<str\> Verification code
- `mfa_token` \<str\> Token

#### Example

```python
tt = self.authentication.login_by_email("fptvmzqyxn@authing.cn", "pwd")
authentication.verify_app_sms_mfa("phone","11",tt['token'])
```

## Test secondary verification MFA mailbox verification code

```python
def verify_app_email_mfa(self, email, code, mfa_token):
  pass
```

Test secondary verification MFA mailbox verification code

#### parameter

- `email` \<str\> email
- `code` \<str\> code
- `mfa_token` \<str\> Token

#### Example

```python
tt = self.authentication.login_by_email("fptvmzqyxn@authing.cn", "pwd")
authentication.verify_app_email_mfa("email","11",tt['token'])
```

## Check if the phone number or mailbox has been bound

```python
def phone_or_email_bindable(self, mfa_token, phone=None, email=None):
  pass
```

Check if the phone number or mailbox has been bound

#### parameter

- `email` \<str\> email
- `phone` \<str\> phone
- `mfa_token` \<str\> Token

#### Example

```python
tt = self.authentication.login_by_email("fptvmzqyxn@authing.cn", "pwd")
authentication.phone_or_email_bindable("email",tt['token'])
```

## Test secondary verification MFA recovery code

```python
def verify_totp_recovery_code(self, recovery_code, mfa_token):
  pass
```

Test secondary verification MFA recovery code

#### parameter

- `recovery_code` \<str\> Restore verification code
- `mfa_token` \<str\> Token

#### Example

```python
tt = self.authentication.login_by_email("fptvmzqyxn@authing.cn", "pwd")
authentication.verify_totp_recovery_code("xxx",tt['token'])
```

## Bind people through pictures URL

```python
def associate_face_by_url(self, base_face, compare_face, mfa_token=None):
  pass
```

Bind people through pictures URL

#### parameter

- `base_face` \<str\> Basic photo
- `compare_face` \<str\> Basic photo
- `mfa_token` \<str\> Token

#### Example

```python
tt = self.authentication.login_by_email("fptvmzqyxn@authing.cn", "pwd")
authentication.associate_face_by_url("url",otherUrl",tt['token'])
```

## Face-faced two certification

```python
def verify_face_mfa(self, photo, mfa_token):
  pass
```

Face-faced two certification

#### parameter

- `photo` \<str\> Avatar
- `mfa_token` \<str\> Token

#### Example

```python
tt = self.authentication.login_by_email("fptvmzqyxn@authing.cn", "pwd")
authentication.verify_face_mfa("otherUrl",tt['token'])
```
