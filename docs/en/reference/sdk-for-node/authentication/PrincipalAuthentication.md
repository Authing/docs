---
tags:
  - 关键词一
  - 关键词二
  - 关键词三
---

# Main authentication module

<LastUpdated/>

This module is used to conduct body authentication, such as personal authentication or corporate certification.

Sample code:

```javascript
import { AuthenticationClient } from 'authing-js-sdk'
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
})

authenticationClient.principal.detail
authenticationClient.principal.authenticate
```

### Obtain certification details

PrincipalAuthentication().detail()

> Get the main authentication details

#### parameter

without

#### Example

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
})
const authenticators = await authenticationClient.principal.detail()
```

#### return value

- `Promise<PrincipalDetail | null>`, return when not authenticated `null`

#### Sample data

```json
{
  "id": "60b4d72f56b49fb97281001b",
  "createdAt": "2021-05-31T12:31:43.416Z",
  "updatedAt": "2021-05-31T12:31:43.416Z",
  "userPoolId": "607fe30c14d1650eb1d888ca",
  "userId": "60a336dc179abb512dd64ae7",
  "principalType": "P", // "P" represents personal authentication, "E" individual authentication
  "principalName": "xxx",
  "principalCode": "xxxxxxxxxxxxxxx",
  "authenticationTime": "2021-05-31T12:31:43.414Z"
}
```

### Subject authentication

PrincipalAuthentication().authenticate(principalInfo)

> Subject authentication

#### parameter

The parameters that are incorporated when performing personal authentication and corporate certification, as follows.

##### Personal authentication

- `principalInfo`: \<object\>
  - `principalInfo.type`: \<string\> Personal certification should be passed to the fixed string "P"
  - `principalInfo.name`: \<string\> Personal real name
  - `principalInfo.idCard`: \<string\> Personal ID number
  - `principalInfo.bankCard`: \<string\> Personal bank card number

##### Enterprise Certification

- `principalInfo`: \<object\>
  - `principalInfo.type`: \<string\> Companies should pass authentication fixed string "E"
  - `principalInfo.enterpriseName`: \<string\> Company Name
  - `principalInfo.enterpriseCode`: \<string\> Enterprise unified social credit code
  - `principalInfo.legalPersonName`: \<string\> Corporate legal name

#### Example

```javascript
const authenticationClient = new AuthenticationClient({
  appId: 'YOUR_APP_ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
})
await authenticationClient.principal.authenticate({
  type: 'P',
  name: 'xxx',
  idCard: 'xxxxxxxxxxxxxxxx',
  bankCard: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
})
```

#### return value

- `Promise<boolean>`, the authentication is successful return `true`

#### Sample data

```json
true
```
