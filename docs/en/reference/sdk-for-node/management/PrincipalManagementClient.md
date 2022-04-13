# Management certification body

<LastUpdated/>

This module is used to conduct body authentication, such as personal authentication or corporate certification.

Sample code:

```javascript
import { ManagementClient } from 'authing-js-sdk'
const managementClient = new AuthenticationClient({
  userPoolId: 'YOUR_USERPOOL_ID',
  secret: 'YOUR_USERPOOL_SECRET',
})

authenticationClient.principal.detail
authenticationClient.principal.authenticate
```

### Get a certification details

PrincipalManagementClient().detail(userId)

> Get the main authentication details

#### parameter

- `userId` \<string\>, user ID

#### Example

```javascript
const managementClient = new ManagementClient({
  userPoolId: 'YOUR_USERPOOL_ID',
  secret: 'YOUR_USERPOOL_SECRET',
})

const principalInfo = await managementClient.principal.detail('xxxxxxxxxxxxx')
```

#### return value

- `Promise<PrincipalDetail | null>`, Return when not authenticated `null`

#### Sample data

```json
{
  "id": "60b4d72f56b49fb97281001b",
  "createdAt": "2021-05-31T12:31:43.416Z",
  "updatedAt": "2021-05-31T12:31:43.416Z",
  "userPoolId": "607fe30c14d1650eb1d888ca",
  "userId": "60a336dc179abb512dd64ae7",
  "principalType": "P", // "P" represents personal authentication, "e" represents personal authentication
  "principalName": "xxx",
  "principalCode": "xxxxxxxxxxxxxxx",
  "authenticationTime": "2021-05-31T12:31:43.414Z"
}
```

### 进行主体认证

PrincipalAuthentication().authenticate(userId, principalInfo)

> Subject authentication

#### parameter

The parameters that are incorporated when performing personal authentication and corporate certification, as follows.

##### Personal authentication

- `userId`: \<string\> user ID
- `principalInfo`: \<object\>
  - `principalInfo.type`: \<string\> Personal certification should be passed to the fixed string "P"
  - `principalInfo.name`: \<string\> Personal name
  - `principalInfo.idCard`: \<string\> Personal ID number
  - `principalInfo.bankCard`: \<string\> Personal bank card number

##### Enterprise Certification

- `principalInfo`: \<object\>
  - `principalInfo.type`: \<string\>Companies should pass authentication fixed string "E"
  - `principalInfo.enterpriseName`: \<string\> Company Name
  - `principalInfo.enterpriseCode`: \<string\> Enterprise unified social credit code
  - `principalInfo.legalPersonName`: \<string\> Corporate legal name

#### Example

```javascript
const managementClient = new ManagementClient({
  userPoolId: 'YOUR_USERPOOL_ID',
  secret: 'YOUR_USERPOOL_SECRET',
})

await managementClient.principal.authenticate({
  type: 'P',
  name: 'xxx',
  idCard: 'xxxxxxxxxxxxxxxx',
  bankCard: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
})
```

#### return value

- `Promise<boolean>`, certification successfully returned `true`

#### Sample data

```json
true
```
