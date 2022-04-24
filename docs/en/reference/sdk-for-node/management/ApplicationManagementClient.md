---
meta:
  - name: description
    content: Management application
---

# Management application

<LastUpdated/>

This module is primarily used to manage application-related operations.

Please use the module in the following ways:

```javascript
import { ManagementClient } from 'authing-js-sdk'

const managementClient = new ManagementClient({
  userPoolId: 'YOUR_USERPOOL_ID',
  secret: 'YOUR_USERPOOL_SECRET',
})
managementClient.applications.list() // Get an application list
managementClient.applications.findById(id) // by id find App
```

## Create application

ApplicationsManagementClient.create(options)

> Create an app in the user pool

#### parameter

- `options` \<object\> Application related parameters.
- `options.name` \<string\> Application Name.
- `options.identifier` \<string\> Apply the authentication address.
- `options.redirectUris` \<string []\> Apply a callback link.
- `options.logo` \<string\> Apply Logo, optional parameters.

#### Example

```javascript
import { ManagementClient } from 'authing-js-sdk'

const managementClient = new ManagementClient({
  userPoolId: 'YOUR_USERPOOL_ID',
  secret: 'YOUR_USERPOOL_SECRET',
})

const apps = await managementClient.applications.create({
  name: 'app name',
  identifier: 'identifier',
  redirectUris: ['your usi'],
  logo: 'logo',
})
```

## Delete application

ApplicationsManagementClient.delete(appId)

> Remove an application in a user pool

#### parameter

- `appId` \<string\> Application ID。

#### Example

```javascript
import { ManagementClient } from 'authing-js-sdk'

const managementClient = new ManagementClient({
  userPoolId: 'YOUR_USERPOOL_ID',
  secret: 'YOUR_USERPOOL_SECRET',
})

const apps = await managementClient.applications.delete('appId')
```

#### return value

## Get an application list

ApplicationsManagementClient.list(params)

> Get application list related information

#### parameter

- `page` \<number\> Page serial number, default is `1`.
- `limit` \<number\> The number of times returned per page, the default is `10`

#### Example

```javascript
import { ManagementClient } from 'authing-js-sdk'

const managementClient = new ManagementClient({
  userPoolId: 'YOUR_USERPOOL_ID',
  secret: 'YOUR_USERPOOL_SECRET',
})

const apps = await managementClient.applications.list()
```

#### return value

```json
{
  "code": 200,
  "message": "Get a list of success",
  "data": {
    "list": {},
    "totalCount": 1
  }
}
```

## Get application details

ApplicationsManagementClient.findById(id)

#### parameter

- `id` \<string\> Applicaiton id

#### Example

```javascript
const app = await managementClient.applications.findById(id) // Whether it is 200 to determine whether the operation is successful if the Code is 200
```

#### return value

```json
{
  "code": 200,
  "message": "\u83b7\u53d6\u5e94\u7528\u914d\u7f6e\u6210\u529f",
  "data": {
    "qrcodeScanning": {
      "redirect": false,
      "interval": 1500
    },
    "id": "5f97fb40d352ecf69ffe6d98",
    "createdAt": "2020-10-27T10:49:36.817Z",
    "updatedAt": "2021-03-17T10:39:53.650Z",
    "userPoolId": "5f88506c81cd279930195660",
    "protocol": "oidc",
    "isOfficial": false,
    "isDeleted": false,
    "isDefault": false,
    "name": "oo",
    "description": null,
    "secret": "19938f6ef3c84360a9c0ab73c2cc88d7",
    "identifier": "okokiohutuyfrtd",
    "jwks": {
      "keys": {
        "0": {
          // ------
        }
      }
    },
    "ssoPageCustomizationSettings": null,
    "logo": "https://files.authing.co/authing-console/default-app-logo.png",
    // -----
    "casConfig": null,
    "showAuthorizationPage": false,
    "enableSubAccount": false,
    "loginRequireEmailVerified": false,
    "agreementEnabled": false,
    "skipMfa": false,
    "permissionStrategy": {
      "enabled": false,
      "defaultStrategy": "ALLOW_ALL",
      "allowPolicyId": null,
      "denyPolicyId": null
    }
  }
}
```

## Get a list of resources

ApplicationsManagementClient.listResources(appId, options)

Get all resources.

#### parameter

- `appId` \<string\> applicaiton ID
- `options` \<object\> Resource information object
- `options.type` \<string\> Resource type, optional value `DATA`、`API`、`MENU`、`UI`、`BUTTON`
- `options.page` \<string\> Page, get the first few pages, the default starts from 1
- `options.limit` \<string\> The number of entries per page, the default is 10

#### Example

```js
const res = await managementClient.applications.listResources(APP_ID, {
  type: 'DATA',
  page: 1,
  limit: 10,
})
```

#### Return data

## Create resources

ApplicationsManagementClient.createResource(appId, options)

Create a resource.

#### parameter

- `appId` \<string\> Application ID
- `options` \<object\> Resource information object
- `options.code` \<string\> Resource identifier, unable value `userpool`、`user`、`application`、`role`、`group`、`org`、`*`、`api`、`resource-namespace`、`custom-resource`
- `options.type` \<string\> Resource type, optional value `DATA`、`API`、`MENU`、`UI`、`BUTTON`
- `options.actions` \<Array<{ name: string, description: string }>\> Resource operation object array. Where Name is an operation name, fill in a ** verb **, For the operation description, fill in the description information
- `options.description` \<string\> Resource description information

#### Example

```js
const res = await managementClient.applications.createResource(APP_ID, {
  code: 'book',
  type: 'DATA',
  description: 'book',
  actions: [
    {
      name: 'book:write',
      description: 'Book writing operation',
    },
  ],
})
```

#### Return data

```json
{
  "userPoolId": "600a8f29cead8fc0127f9da6",
  "code": "book",
  "actions": [
    {
      "name": "book:write",
      "description": "Book writing operation"
    }
  ],
  "type": "DATA",
  "description": "book",
  "namespaceId": 22997,
  "createdAt": "2021-04-06T11:49:07.656Z",
  "updatedAt": "2021-04-06T11:49:07.656Z",
  "id": "606c4ab3d7fb66a8e1517132",
  "apiIdentifier": null
}
```

## Update resources

ApplicationsManagementClient.updateResource(appId, code)

Update a resource.

#### parameter

- `appId` \<string\> Application ID
- `options` \<object\> Resource information object
- `options.code` \<string\> Resource identifier
- `options.namespace` \<string\> Packet ID where resource is located
- `options.type` \<string\> Resource type, optional value `DATA`、`API`、`MENU`、`UI`、`BUTTON`
- `options.actions` \<Array<{ name: string, description: string }>\> Resource operation object array. Where Name is an operation name, fill in a ** verb **, For the operation description, fill in the description information
- `options.description` \<string\> Resource description information

#### Example

```js
const res = await managementClient.applications.updateResource(APP_ID, {
  code,
  description: 'New description',
  type: ResourceType.Api,
  actions: [
    { name: 'cardiovascular', description: 'Cardiovascular' },
    { name: 'surge', description: 'Surge' },
  ],
})
```

#### Return data

```json
{
  "id": "606c4ab3d7fb66a8e1517132",
  "createdAt": "2021-04-06T11:49:07.656Z",
  "updatedAt": "2021-04-06T11:59:26.879Z",
  "userPoolId": "600a8f29cead8fc0127f9da6",
  "code": "book",
  "actions": [
    {
      "name": "book:write",
      "description": "Book writing operation 2"
    },
    {
      "name": "book:read",
      "description": "Book reading operation 2"
    }
  ],
  "type": "DATA",
  "description": "New description",
  "namespaceId": 22997,
  "apiIdentifier": null
}
```

## Delete resources

ApplicationsManagementClient.deleteResource(appId, code)

Update a resource.

#### parameter

- `appId` \<string\> application ID
- `code` \<string\> Resource identifier

#### Example

```js
let deleted = await managementClient.applications.deleteResource(
  APP_ID,
  '600a8f4e37708b363024a3ca'
)

deleted === true
```

#### Return data

```json
true
```

## Get application access control policies

ApplicationsManagementClient.getAccessPolicies(appId, options)

Get an access control policy for an application.

#### parameter

- `appId` \<string\> Application ID
- `options` \<object\> Incoming configuration
- `options.page` \<string\> Page, get the first few pages, the default starts from 1
- `options.limit` \<string\> The number of entries per page, the default is 10

#### Example

```javascript
let res = await managementClient.applications.getAccessPolicies(APP_ID)
```

#### Sample data

```json
{
  "list": [
    {
      "assignedAt": "2021-04-06T12:41:33.876Z",
      "inheritByChildren": true,
      "enabled": true,
      "policyId": "60668da2bebdc82f051f3bf4",
      "code": "ApplicationLoginAccess:cNngSbDBe",
      "policy": {
        "id": "60668da2bebdc82f051f3bf4",
        "createdAt": "2021-04-02T03:21:06.645Z",
        "updatedAt": "2021-04-02T03:21:06.645Z",
        "userPoolId": "600a8f29cead8fc0127f9da6",
        "isDefault": true,
        "isAuto": false,
        "hidden": true,
        "code": "ApplicationLoginAccess:cNngSbDBe",
        "description": "允许登录应用 600a8f4e37708b363024a3ca",
        "statements": [
          {
            "resource": "arn:cn:authing:600a8f29cead8fc0127f9da6:application:600a8f4e37708b363024a3ca",
            "actions": ["application:login"],
            "effect": "ALLOW",
            "condition": [],
            "resourceType": null
          }
        ],
        "namespaceId": 22997
      },
      "targetType": "ORG",
      "targetIdentifier": "606c566a6fb32f97cf12002c",
      "target": {
        "id": "606c566a6fb32f97cf12002c",
        "createdAt": "2021-04-06T12:39:06.472Z",
        "updatedAt": "2021-04-06T12:39:06.472Z",
        "userPoolId": "600a8f29cead8fc0127f9da6",
        "orgId": "606c565526b6b92785462033",
        "name": "勘探研究院",
        "nameI18n": null,
        "description": null,
        "descriptionI18n": null,
        "order": null,
        "code": "kantan",
        "__id": null,
        "__parentid": null,
        "__groupid": null,
        "source": [],
        "dataVersion": null,
        "sourceData": null
      },
      "namespace": "600a8f4e37708b363024a3ca"
    },
    {
      "assignedAt": "2021-04-06T12:38:14.003Z",
      "inheritByChildren": null,
      "enabled": true,
      "policyId": "60668da2bebdc82f051f3bf4",
      "code": "ApplicationLoginAccess:cNngSbDBe",
      "policy": {
        "id": "60668da2bebdc82f051f3bf4",
        "createdAt": "2021-04-02T03:21:06.645Z",
        "updatedAt": "2021-04-02T03:21:06.645Z",
        "userPoolId": "600a8f29cead8fc0127f9da6",
        "isDefault": true,
        "isAuto": false,
        "hidden": true,
        "code": "ApplicationLoginAccess:cNngSbDBe",
        "description": "允许登录应用 600a8f4e37708b363024a3ca",
        "statements": [
          {
            "resource": "arn:cn:authing:600a8f29cead8fc0127f9da6:application:600a8f4e37708b363024a3ca",
            "actions": ["application:login"],
            "effect": "ALLOW",
            "condition": [],
            "resourceType": null
          }
        ],
        "namespaceId": 22997
      },
      "targetType": "GROUP",
      "targetIdentifier": "userfolder",
      "target": {
        "id": "606c56241ad7c407cc0d7b3d",
        "createdAt": "2021-04-06T12:37:56.193Z",
        "updatedAt": "2021-04-06T12:37:56.193Z",
        "userPoolId": "600a8f29cead8fc0127f9da6",
        "code": "userfolder",
        "name": "userfolder",
        "description": "userfolder",
        "externalId": null
      },
      "namespace": "600a8f4e37708b363024a3ca"
    },
    {
      "assignedAt": "2021-04-06T12:38:10.087Z",
      "inheritByChildren": null,
      "enabled": true,
      "policyId": "60668da2bebdc82f051f3bf4",
      "code": "ApplicationLoginAccess:cNngSbDBe",
      "policy": {
        "id": "60668da2bebdc82f051f3bf4",
        "createdAt": "2021-04-02T03:21:06.645Z",
        "updatedAt": "2021-04-02T03:21:06.645Z",
        "userPoolId": "600a8f29cead8fc0127f9da6",
        "isDefault": true,
        "isAuto": false,
        "hidden": true,
        "code": "ApplicationLoginAccess:cNngSbDBe",
        "description": "允许登录应用 600a8f4e37708b363024a3ca",
        "statements": [
          {
            "resource": "arn:cn:authing:600a8f29cead8fc0127f9da6:application:600a8f4e37708b363024a3ca",
            "actions": ["application:login"],
            "effect": "ALLOW",
            "condition": [],
            "resourceType": null
          }
        ],
        "namespaceId": 22997
      },
      "targetNamespace": "600a8f4e37708b363024a3ca",
      "targetType": "ROLE",
      "targetIdentifier": "admin",
      "target": {
        "id": "606c55fff48c68be7d0786eb",
        "createdAt": "2021-04-06T12:37:19.971Z",
        "updatedAt": "2021-04-06T12:37:19.971Z",
        "userPoolId": "600a8f29cead8fc0127f9da6",
        "code": "admin",
        "description": "admin",
        "parentCode": null,
        "isSystem": false,
        "namespaceId": 22997
      },
      "namespace": "600a8f4e37708b363024a3ca"
    },
    {
      "assignedAt": "2021-04-06T08:09:30.597Z",
      "inheritByChildren": null,
      "enabled": true,
      "policyId": "60668da2bebdc82f051f3bf4",
      "code": "ApplicationLoginAccess:cNngSbDBe",
      "policy": {
        "id": "60668da2bebdc82f051f3bf4",
        "createdAt": "2021-04-02T03:21:06.645Z",
        "updatedAt": "2021-04-02T03:21:06.645Z",
        "userPoolId": "600a8f29cead8fc0127f9da6",
        "isDefault": true,
        "isAuto": false,
        "hidden": true,
        "code": "ApplicationLoginAccess:cNngSbDBe",
        "description": "允许登录应用 600a8f4e37708b363024a3ca",
        "statements": [
          {
            "resource": "arn:cn:authing:600a8f29cead8fc0127f9da6:application:600a8f4e37708b363024a3ca",
            "actions": ["application:login"],
            "effect": "ALLOW",
            "condition": [],
            "resourceType": null
          }
        ],
        "namespaceId": 22997
      },
      "targetType": "USER",
      "targetIdentifier": "606c173a6111bfa6663948e5",
      "target": {
        "id": "606c173a6111bfa6663948e5",
        "createdAt": "2021-04-06T08:09:30.080Z",
        "updatedAt": "2021-04-06T08:09:30.080Z",
        "userPoolId": "600a8f29cead8fc0127f9da6",
        "isRoot": false,
        "status": "Activated",
        "oauth": null,
        "email": null,
        "phone": null,
        "username": "6lglnofn4med",
        "unionid": null,
        "openid": null,
        "nickname": null,
        "company": null,
        "photo": "https://files.authing.co/authing-console/default-user-avatar.png",
        "browser": null,
        "device": null,
        "password": "2c7b3c25ed9f046f9e7deb4ad2bb720c",
        "salt": "5b9c8nblajm7",
        "token": null,
        "tokenExpiredAt": null,
        "loginsCount": 0,
        "lastIp": null,
        "name": null,
        "givenName": null,
        "familyName": null,
        "middleName": null,
        "profile": null,
        "preferredUsername": null,
        "website": null,
        "gender": "U",
        "birthdate": null,
        "zoneinfo": null,
        "locale": null,
        "address": null,
        "formatted": null,
        "streetAddress": null,
        "locality": null,
        "region": null,
        "postalCode": null,
        "city": null,
        "province": null,
        "country": null,
        "registerSource": ["import:manual"],
        "secretInfo": null,
        "emailVerified": false,
        "phoneVerified": false,
        "lastLogin": null,
        "blocked": false,
        "isDeleted": false,
        "sendSmsCount": 0,
        "sendSmsLimitCount": 1000,
        "dataVersion": null,
        "encryptedPassword": "UFHmd5kr5+xI2LD6sGgqpCEBIvPMTSt+83jRty3fCDxFjucSuhpVUtz6tp8kS93qad61FAsO9aS8DqThqoe1hUw4UlSQIuB/sC7p7yHDh0ak+i94ShY3uD6f9YzdRp4zIMAxwTj5/WFyL2S2IIHUBt1qR0/iEz569cdTR5zLr5c=",
        "signedUp": "2021-04-06T08:09:30.080Z",
        "externalId": null,
        "mainDepartmentId": null,
        "mainDepartmentCode": null,
        "lastMfaTime": null,
        "passwordSecurityLevel": 1,
        "source": null,
        "identities": []
      },
      "namespace": "600a8f4e37708b363024a3ca"
    }
  ],
  "totalCount": 4
}
```

## Enable application access control strategy

ApplicationsManagementClient.enableAccessPolicy(appId, options)

Enable an application's access control policy.

#### parameter

- `appId` \<string\> Application ID
- `options` \<object\> Incoming configuration
- `options.targetType` \<string\> Main type, optional value `USER`、`ROLE`、`GROUP`、`ORG`
- `options.targetIdentifiers` \<string\> The main identifier can be a user ID, a role identifier, a packet identifier, an organization node identifier.
- `options.namespace` \<string\> When targetType is `ROLE`、`GROUP`、`ORG` ,fill in its permissions packet identifier
- `options.inheritByChildren` \<boolean\> When `targetType` is `ORG` , whether the child node for specifying the organization inherits the policy

#### Example

```javascript
let res = await managementClient.applications.enableAccessPolicy(APP_ID, {
  targetType: 'USER',
  targetIdentifiers: ['用户 ID'],
})
```

#### Sample data

```json
{
  "code": 200,
  "message": "Enable application access control policies success"
}
```

## Deactivate application access control policies

ApplicationsManagementClient.disableAccessPolicy(appId, options)

Deactivate an access control policy.

#### parameter

- `appId` \<string\> Application ID
- `options` \<object\> Incoming configuration
- `options.targetType` \<string\> Main type, optional value `USER`、`ROLE`、`GROUP`、`ORG`
- `options.targetIdentifiers` \<string\> The main identifier can be a user ID, a role identifier, a packet identifier, an organization node identifier.
- `options.namespace` \<string\> When targetType is `ROLE`、`GROUP`、`ORG`, fill in the permissions group identifier
- `options.inheritByChildren` \<boolean\> When `targetType` is `ORG`, whether the child node used to specify the organization inherit this policy

#### Example

```javascript
let res = await managementClient.applications.disableAccessPolicy(APP_ID, {
  targetType: 'USER',
  targetIdentifiers: ['用户 ID'],
})
```

#### Sample data

```json
{
  "code": 200,
  "message": "Deactivate application access control policies success"
}
```

## Delete Application Access Control Policy

ApplicationsManagementClient.deleteAccessPolicy(appId, options)

Delete an access control policy.

#### parameter

- `appId` \<string\> Application ID
- `options` \<object\> Incoming configuration
- `options.targetType` \<string\> Main type, optional value `USER`、`ROLE`、`GROUP`、`ORG`
- `options.targetIdentifiers` \<string\> The main identifier can be a user ID, a role identifier, a packet identifier, an organization node identifier.
- `options.namespace` \<string\> when targetType is `ROLE`、`GROUP`、`ORG` , fill in the permissions group identifier
- `options.inheritByChildren` \<boolean\> When `targetType` is `ORG`, Whether the child node used to specify the organization inherit this policy

#### Example

```javascript
let res = await managementClient.applications.deleteAccessPolicy(APP_ID, {
  targetType: 'USER',
  targetIdentifiers: ['用户 ID'],
})

res === true
```

#### Sample data

```json
true
```

## Configuring the control strategy for "allowing the main body (user, role, group, organization node) access application

ApplicationsManagementClient.allowAccess(appId, options)

Configure the control policy that allows the main body (user, role, grouping, organization node) access application.

#### parameter

- `appId` \<string\> Application ID
- `options` \<object\> Incoming configuration
- `options.targetType` \<string\> Main type, optional value `USER`、`ROLE`、`GROUP`、`ORG`
- `options.targetIdentifiers` \<string\> The main identifier can be a user ID, a role identifier, a packet identifier, an organization node identifier.
- `options.namespace` \<string\> When targetType is `ROLE`、`GROUP`、`ORG` , fill in the permissions group identifier
- `options.inheritByChildren` \<boolean\> When `targetType` is `ORG`, Whether the child node used to specify the organization inherit this policy

#### Example

```javascript
let res = await managementClient.applications.allowAccess(APP_ID, {
  targetType: 'USER',
  targetIdentifiers: ['User ID'],
})
```

#### Sample data

```json
{
  "code": 200,
  "message": "Allow the policy configuration of the main access application to take effect"
}
```

## Configure the control policy of "Rejecting the subject (user, role, grouping, organization node) access application"

ApplicationsManagementClient.denyAccess(appId, options)

Configure the control policies that "reject the subject (user, role, grouping, organization node) access application.

#### parameter

- `appId` \<string\> Application ID
- `options` \<object\> Incoming configuration
- `options.targetType` \<string\> Main type, optional value `USER`、`ROLE`、`GROUP`、`ORG`
- `options.targetIdentifiers` \<string\> The main identifier can be a user ID, a role identifier, a packet identifier, an organization node identifier.
- `options.namespace` \<string\> When targetType is `ROLE`、`GROUP`、`ORG`, fill in the permissions group identifier
- `options.inheritByChildren` \<boolean\> When `targetType` is `ORG`, Whether the child node used to specify the organization inherit this policy

#### Example

```javascript
let res = await managementClient.applications.denyAccess(APP_ID, {
  targetType: 'USER',
  targetIdentifiers: ['User ID'],
})
```

#### Sample data

```json
{
  "code": 200,
  "message": "The policy configuration of rejecting the main access application has taken effect"
}
```

## Change the default application access policy

ApplicationsManagementClient.updateDefaultAccessPolicy(appId, defaultStrategy)

Modify the default application access policy: Default Reject all user access applications, the default allows all users to access applications

#### parameter

- `appId` \<string\> Application ID
- `defaultStrategy` \<string\> Default application access policies, optional value `ALLOW_ALL`、`DENY_ALL`Meaning the default allows all users to access, reject all users access

#### Example

```javascript
let res = await managementClient.applications.updateDefaultAccessPolicy(
  APP_ID,
  'ALLOW_ALL'
)
```

#### Return data

```json
{
  "qrcodeScanning": {
    "redirect": false,
    "interval": 1500
  },
  "id": "600a8f4e37708b363024a3ca",
  "createdAt": "2021-01-22T08:39:43.970Z",
  "updatedAt": "2021-04-06T13:30:07.477Z",
  "userPoolId": "600a8f29cead8fc0127f9da6",
  "protocol": "oidc",
  "isOfficial": false,
  "isDeleted": false,
  "isDefault": false,
  "name": "bazooka",
  "description": null,
  "identifier": "bazooka1",
  "jwks": {
    "keys": [
      {
        "e": "AQAB",
        "n": "rc_YUeVUD6xPF6-9yuL2OXVZukRqmOgg3t0VOb_PYbGOSptBeHAhe4YZhWj_beKTl-9HcN_5ucRur_3Bb8wpVvEWYBuAgcy0PuuamSX13bKg4hqP7JblYIot_nV8kwJJG958jxW1VyEX0OjApiNyWobEvHwgBPUB5DbpjRzfT7BOY-MJ4Qlqhzq51ubdQvLJHp4_vf0-0APW-YNffJaoILS_FyCeP_CM_HvlMpCnlWyye3PX2ybmijaiA5sI2aj0vdOkytEVWZx8K0F4vc348grr7dTn-l8R64524xfkEqbWS7a59XtMdo1A02SMrsNPPtmNM8Aobg7AroxEDdmc9w",
        "d": "Km0Kc2sT6sN3huOZ4zUlPv87CLF8h5hZtaynarI8L6-EeQeOopRUR--CuULY3nyo5DQ-7vls3oBpOEIrfluKV7N_b7Qm2QgbkyQ1V16hthzNEoPDT8_Ba6Au--a3orazG79iDhcRbZQhWRgHNkZ-ukQdL5jow-z-KjORLKW4iJ2sSropK_5da7ftjR3Atldn5p0_K5J_o9fzNSq72J2KpRTqWKhcg7f2D6hNX2yC0IZiwNTyBYqY9bj0p0OfRVi9B1CyDjAQ5GExCzRHZeW_fxMjYNddGl2UyEEp8OJzks6ftTyOGD1Pv_YDSUaICtUXLHCQkp4aIurPpYLt1xtjWQ",
        "p": "3_vXEJp4jWrRKalAUk9-F9SlfqPfdMz-FdFcc-Fonbg6zKVNi-UXD5ozfVSLxlZ8cR_Y73sj2NZrZMan8fRMmwpk2kYLBU1oFsnQwb3Rd6wYywsb-qw9kd1fxo0WbGyAArMVTCgUI1CN6kL4pRae3fadoS8--VpNWEN7ZwXkOOM",
        "q": "xqgVYpbDqqb19AU0w6HSmCHFEWyJgH0RY0wgsejmdH9-5rBy7EQ2tfXrsypvbI0ob_iZcBKci9lOaOghFumV2_LPH4thh9KwRLppbIDO497cPr9gOSXTCP7mfwORaDO2B3bT-iLN8rvei0X-lUTgaeVzpOnRG1hcd8q9FQJOS90",
        "dp": "Nc3qYLuqn9X7_rUAlYUw9gqH4r78y7L-ikEro06PceuyfDxtP2C9xGq3WbD4jqFx7T7IPubmuozvaVrrNw0HZer-RQy0UwbALVE3i4LMkaHOpt-5TeMYOzThb_GuZEdADOX2BMBP7hfIr3B9CDNB4HIAdZrC1uVhVQWI3DunEh8",
        "dq": "d8_MBgfzvqqv0BqLtimU_9fuKRIS5AGKSR8S4Pocc8qpWKy2wzRo4tmM7CP9y7Re3RlMQUGYVOgc2DyYKF982IjazqWbjvVNBkZ_asdNADXbE6UMfasIWnaRwaz_N59oe5v5QPVYzLrt_4WZg6Fkz7lpQ98ZFKr4Ke-GlnMrkak",
        "qi": "XzXay0PADNPQ9BHQuQ5EYzHGPk247Tyy-XpuVRvT-3Jm0uemF5uGf-wMtH2SHzspp-9SvphwnXhNAyFYas-b4Agb4oRrcwtTKMJmkcxjC0v1hgOvBzRFSM9X8y9Xev3cd2lJd_vuOKeK4COgPllrkBBzQ-VExKtFNM2ogLHQH_k",
        "kty": "RSA",
        "kid": "VgEx8UtFMPwTf4htfvzghLtSsmr-pJoFqusaRM29Qfc",
        "alg": "RS256",
        "use": "sig"
      }
    ]
  },
  "ssoPageCustomizationSettings": null,
  "logo": "https://files.authing.co/authing-console/default-app-logo.png",
  "redirectUris": ["https://yelexin.cn"],
  "logoutRedirectUris": [],
  "oidcProviderEnabled": true,
  "oauthProviderEnabled": false,
  "samlProviderEnabled": false,
  "casProviderEnabled": false,
  "registerDisabled": false,
  "loginTabs": ["phone-code", "password"],
  "defaultLoginTab": "password",
  "registerTabs": ["email", "phone"],
  "defaultRegisterTab": "email",
  "ldapConnections": null,
  "adConnections": [],
  "disabledSocialConnections": null,
  "disabledOidcConnections": [],
  "disabledSamlConnections": [],
  "disabledOauth2Connections": [],
  "disabledCasConnections": [],
  "disabledAzureAdConnections": [],
  "extendsFieldsEnabled": false,
  "extendsFields": [],
  "ext": null,
  "css": "/* \n  在此编辑认证页面的 css 代码\n  如：\n  body {\n    background: #6699 !important;\n  } \n  用于修改背景色\n*/",
  "oidcConfig": {
    "grant_types": ["authorization_code", "refresh_token"],
    "response_types": ["code"],
    "id_token_signed_response_alg": "RS256",
    "token_endpoint_auth_method": "client_secret_post",
    "authorization_code_expire": 600,
    "id_token_expire": 1209600,
    "access_token_expire": 1209600,
    "refresh_token_expire": 2592000,
    "cas_expire": 1209600,
    "skip_consent": true,
    "redirect_uris": ["https://yelexin.cn"],
    "post_logout_redirect_uris": [],
    "client_id": "600a8f4e37708b363024a3ca",
    "introspection_endpoint_auth_method": "client_secret_post",
    "revocation_endpoint_auth_method": "client_secret_post"
  },
  "samlConfig": null,
  "oauthConfig": {
    "id": "600a8f4e37708b363024a3ca",
    "redirect_uris": ["https://yelexin.cn"],
    "grants": ["authorization_code"],
    "access_token_lifetime": 1209600,
    "refresh_token_lifetime": 2592000,
    "introspection_endpoint_auth_method": "client_secret_post",
    "revocation_endpoint_auth_method": "client_secret_post"
  },
  "casConfig": null,
  "showAuthorizationPage": false,
  "enableSubAccount": false,
  "loginRequireEmailVerified": false,
  "agreementEnabled": false,
  "skipMfa": false,
  "permissionStrategy": {
    "enabled": true,
    "defaultStrategy": "ALLOW_ALL",
    "allowPolicyId": "60668da2bebdc82f051f3bf4",
    "denyPolicyId": "60668da2d8ee483c3a37c0aa"
  }
}
```

## Create a role in your application

ApplicationsManagementClient.createRole(appId, options)

> Create a role to specify a different permissions grouping.

#### parameter

- `appId` \<string\> Application ID
- `options.code` \<string\> Role unique marker
- `options.description` \<string\> description

#### Example

```javascript
managementClient.applications.createRole(APP_ID, {
  code: 'CODE',
  description: 'DESCRIPTION',
})
```

#### return value

- `Promise<DeepPartial<Role>>`

## Delete the role

ApplicationsManagementClient.deleteRole(appId, code)

> Delete role

#### parameter

- `appId` \<string\> Application ID
- `code` \<string\> Role unique marker

#### Example

```javascript
managementClient.applications.deleteRole(APP_ID, 'rolea')
```

#### return value

- `Promise<CommonMessage>`

## Batch delete the role

ApplicationsManagementClient.deleteRoles(appId, codes)

> Batch delete the role

- `appId` \<string\> Application ID
- `codes` \<string[]\> Role unique marker array

#### Example

```javascript
managementClient.applications.deleteRoles(APP_ID, ['rolea'])
```

#### return value

- `Promise<CommonMessage>`

## Modify the role under the application

managementClient.applications.updateRole(appId, options)

> Modify the role

#### parameter

- `appId` \<string\> Application ID
- `options` \<Object\>
- `options.code` \<string\> Role unique marker
- `options.description` \<string\> Description
- `options.newCode` \<string\> New unique marker

#### Example

```javascript
managementClient.applications.updateRole(APP_ID, { newCode: 'newcode' })
```

#### return value

- `Promise<DeepPartial<Role>>`

## Get the role of the application details

managementClient.applications.findRole(appId, code)

Get the role details.

#### parameter

- `appId` \<string\> application ID
- `code` \<string\> Role unique marker

#### Example

```javascript
managementClient.applications.findRole(APP_ID, CODE)
```

#### return value

- `Promise<DeepPartial<Role>>`

## Get the list of characters

managementClient.applications.getRoles(appId, options)

Get the list of characters under the application.

#### parameter

- `appId` \<string\> Application ID
- `options` \<object\>
- `options.page` \<number\> The number of page numbers is: `1`.
- `options.limit` \<number\> The number of defaults per page is: `10`.

#### Example

```javascript
managementClient.applications.getRoles(APP_ID, {
  page: 1,
  limit: 10,
})
```

#### return value

- `Promise<DeepPartial<PaginatedRoles>>`

## 获取应用下角色的用户列表

managementClient.applications.getUsersByRoleCode(appId, code)

Get the list of users in the application role.

#### parameter

- `appId` \<string\> Application ID
- `code` \<string\> Role unique marker

#### Example

```javascript
managementClient.applications.getUsersByRoleCode(APP_ID, CODE)
```

#### return value

- `Promise<DeepPartial<PaginatedUsers>>`

## Role unique marker

managementClient.applications.addUsersToRole(appId, code, userIds)

Applying the role to add users.

#### parameter

- `appId` \<string\> Application ID
- `code` \<string\> Role unique marker
- `userIds` \<string[]\> User ID list

#### Example

```javascript
managementClient.applications.addUsersToRole(APP_ID, CODE, [
  USER_ID_1,
  USER_ID_2,
])
```

#### return value

- `Promise<CommonMessage>`

## Application role removal user

managementClient.applications.removeUsersFromRole(appId, code, userIds)

The role under application is applied.

#### parameter

- `appId` \<string\> Application ID
- `code` \<string\> Role unique marker
- `userIds` \<string[]\> User ID list

#### Example

```javascript
managementClient.applications.removeUsersFromRole(APP_ID, CODE, [
  USER_ID_1,
  USER_ID_2,
])
```

#### return value

- `Promise<CommonMessage>`

## Get all resource lists of the application role authorized

managementClient.applications.listAuthorizedResourcesByRole(appId, code, resourceType)

Get all resource lists that the role authorized.

#### parameter

- `appId` \<string\> application ID
- `code` \<string\> Role code；
- `resourceType` \<string\> Optional, resource type, default will return all permissions, existing resource types are as follows:
  - `DATA`: type of data;
  - `API`: API type of data;
  - `MENU`: Menu type data;
  - `BUTTON`: Button type data.

#### Example

```javascript
managementClient.applications.listAuthorizedResourcesByRole(
  APP_ID,
  CODE,
  'DATA'
)
```

#### Sample data

```json
{
  "totalCount": 12,
  "list": [
    {
      "code": "menu_a",
      "type": "MENU"
    },
    {
      "code": "menu_b",
      "type": "MENU"
    },
    {
      "code": "books:1",
      "type": "DATA",
      "actions": ["books:delete", "books:update"]
    }
  ]
}
```

## Create a registration protocol

managementClient.applications.createAgreement(appId, options)

> Create a registration protocol

#### parameter

- `appId` \<string\> Application ID
- `options` \<string\> Registration protocol configuration;
  - `options.title`: The protocol title can contain HTML A tags;
  - `options.required`: Whether you must check the consent to allow registration, default is true;
  - `options.lang`: Protocol Title Language, optional zh-CN, en-US, default is zh-CN, In the hosted login page, the protocol is displayed according to the interface language;

#### Example

```javascript
managementClient.applications.createAgreement(APP_ID, {
  title:
    'I agreement this <a href="https://example.com/policy" target="_blank">policy</a>',
  required: true,
})
```

#### Sample data

```json
{
  "userPoolId": "607543c19f711c9b91fa9400",
  "appId": "607543c1ec30828efb065adb",
  "title": "I agreement this <a href=\"https://example.com/policy\" target=\"_blank\">policy</a>",
  "lang": "zh-CN",
  "required": true,
  "order": 6,
  "id": 148
}
```

## Modify registration protocol

managementClient.applications.modifyAgreement(appId, agreementId, updates)

> Modify registration protocol

#### parameter

- `appId` \<string\> Application ID
- `agreementId` \<number\> protocol ID
- `updates` \<string\> To update the data;
  - `updates.title`: The protocol title can contain HTML A tags;
  - `updates.required`: Whether you must check the consent to allow registration, default is true;
  - `updates.lang`: Protocol Title Language, optional zh-CN, en-US, default is zh-CN, In the hosted login page, the protocol is displayed according to the interface language;

#### Example

```javascript
managementClient.applications.modifyAgreement(APP_ID, AGREEMENT_ID, {
  required: false,
})
```

#### Sample data

```json
{
  "userPoolId": "607543c19f711c9b91fa9400",
  "appId": "607543c1ec30828efb065adb",
  "title": "I agreement this <a href=\"https://example.com/policy\" target=\"_blank\">policy</a>",
  "lang": "zh-CN",
  "required": true,
  "order": 6,
  "id": 148
}
```

## Get a list of registration protocols

managementClient.applications.listAgreement(appId)

> Get a list of registration protocols

#### parameter

- `appId` \<string\> Application ID

#### Example

```javascript
managementClient.applications.listAgreement(APP_ID)
```

#### Sample data

```json
[
  {
    "userPoolId": "607543c19f711c9b91fa9400",
    "appId": "607543c1ec30828efb065adb",
    "title": "I agreement this <a href=\"https://example.com/policy\" target=\"_blank\">policy</a>",
    "lang": "zh-CN",
    "required": true,
    "order": 6,
    "id": 148
  }
]
```

## Delete registration protocol

managementClient.applications.deleteAgreement(appId, agreementId)

> Delete registration protocol

#### parameter

- `appId` \<string\> Application ID
- `agreementId` \<number\> protocol ID

#### Example

```javascript
managementClient.applications.deleteAgreement(APP_ID, AGREEMENT_ID)
```

#### Sample data

```js
true
```

## Registration protocol sort

managementClient.applications.sortAgreement(appId, order)

> Registration protocol sort

#### parameter

- `appId` \<string\> Application ID
- `order` \<number\> Apply all the ID lists of all protocols, arrange them in order required

#### Example

```javascript
managementClient.applications.sortAgreement(APP_ID, [
  AGREEMENT_ID1,
  AGREEMENT_ID2,
  AGREEMENT_ID3,
])
```

#### Sample data

```js
true
```

## View logged in user

managementClient.applications.activeUsers(appId, page, limit)

> View the logged in user

#### parameter

- `appId` \<string\> Application ID
- `page` \<number\> Page serial number, default is `1`.
- `limit` \<number\> The number of times returned per page, the default is `10`

#### Example

```javascript
managementClient.applications.activeUsers(APP_ID, 1, 10)
```

#### Sample data

## Refresh application key

managementClient.applications.refreshApplicationSecret(appId)

> Refresh application key

#### parameter

- `appId` \<string\> Application ID

#### Example

```javascript
managementClient.applications.refreshApplicationSecret(APP_ID)
```

#### Sample data
