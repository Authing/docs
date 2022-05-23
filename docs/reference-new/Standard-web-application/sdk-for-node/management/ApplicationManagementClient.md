---
meta:
  - name: description
    content: 管理应用
---

# 管理应用

<LastUpdated/>

此模块主要用来管理应用相关操作。

请使用以下方式使用该模块：

```javascript
import { ManagementClient } from 'authing-js-sdk'

const managementClient = new ManagementClient({
  userPoolId: 'YOUR_USERPOOL_ID',
  secret: 'YOUR_USERPOOL_SECRET',
})
managementClient.applications.list() // 获取应用列表
managementClient.applications.findById(id) // 通过 id 查找应用
```

## 创建应用
> 在用户池中创建一个应用

```js
ApplicationsManagementClient().create(options)
```


#### 参数

- `options` \<object\> 应用相关参数。
- `options.name` \<string\> 应用名称。
- `options.identifier` \<string\> 应用认证地址。
- `options.redirectUris` \<string []\> 应用回调链接。
- `options.logo` \<string\> 应用 logo，可选参数。

#### 示例

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
  logo: 'logo'
})
```

## 删除应用
> 在用户池中删除一个应用

```js
ApplicationsManagementClient().delete(appId)
```


#### 参数

- `appId` \<string\> 应用 ID。


#### 示例

```javascript
import { ManagementClient } from 'authing-js-sdk'

const managementClient = new ManagementClient({
  userPoolId: 'YOUR_USERPOOL_ID',
  secret: 'YOUR_USERPOOL_SECRET',
})

const apps = await managementClient.applications.delete('appId')
```

#### 返回值

## 获取应用列表
> 获取应用列表相关信息

```js
ApplicationsManagementClient().list(params)
```


#### 参数

- `page` \<number\> 分页序号, 默认为 `1`。
- `limit` \<number\> 每页返回的个数, 默认为 `10`。

#### 示例

```javascript
import { ManagementClient } from 'authing-js-sdk'

const managementClient = new ManagementClient({
  userPoolId: 'YOUR_USERPOOL_ID',
  secret: 'YOUR_USERPOOL_SECRET',
})

const apps = await managementClient.applications.list()
```

#### 返回值

```json
{
  "code": 200,
  "message": "获取列表成功",
  "data": {
    "list": {},
    "totalCount": 1
  }
}
```

## 获取应用详情
>获取应用详情
```js
ApplicationsManagementClient().findById(id)
```

#### 参数

- `id` \<string\> 应用 id

#### 示例

```javascript
const app = await managementClient.applications.findById(id) // 通过 code 是否为 200 判断操作是否成功
```

#### 返回值

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

## 获取资源列表
>获取所有资源。

```js
ApplicationsManagementClient().listResources(appId, options)
```


#### 参数

- `appId` \<string\> 应用 ID
- `options` \<object\> 资源信息对象
- `options.type` \<string\> 资源类型，可选值为 `DATA`、`API`、`MENU`、`UI`、`BUTTON`
- `options.page` \<string\> 分页，获取第几页，默认从 1 开始
- `options.limit` \<string\> 每页条目数量，默认为 10 个

#### 示例

```js
const res = await managementClient.applications.listResources(APP_ID, {
  type: 'DATA',
  page: 1,
  limit: 10,
})
```

#### 返回数据

## 创建资源
>创建一个资源。

```js
ApplicationsManagementClient().createResource(appId, options)
```


#### 参数

- `appId` \<string\> 应用 ID
- `options` \<object\> 资源信息对象
- `options.code` \<string\> 资源标识符，不可使用值 `userpool`、`user`、`application`、`role`、`group`、`org`、`*`、`api`、`resource-namespace`、`custom-resource`
- `options.type` \<string\> 资源类型，可选值为 `DATA`、`API`、`MENU`、`UI`、`BUTTON`
- `options.actions` \<Array<{ name: string, description: string }>\> 资源操作对象数组。其中 name 为操作名称，填写一个**动词**，description
  为操作描述，填写描述信息
- `options.description` \<string\> 资源描述信息

#### 示例

```js
const res = await managementClient.applications.createResource(APP_ID, {
  code: 'book',
  type: 'DATA',
  description: 'book',
  actions: [
    {
      name: 'book:write',
      description: '图书写入操作',
    },
  ],
})
```

#### 返回数据

```json
{
  "userPoolId": "600a8f29cead8fc0127f9da6",
  "code": "book",
  "actions": [
    {
      "name": "book:write",
      "description": "图书写入操作"
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

## 更新资源
>更新一个资源。

```js
ApplicationsManagementClient().updateResource(appId, code)
```


#### 参数

- `appId` \<string\> 应用 ID
- `options` \<object\> 资源信息对象
- `options.code` \<string\> 资源标识符
- `options.namespace` \<string\> 资源所在的权限分组标识
- `options.type` \<string\> 资源类型，可选值为 `DATA`、`API`、`MENU`、`UI`、`BUTTON`
- `options.actions` \<Array<{ name: string, description: string }>\> 资源操作对象数组。其中 name 为操作名称，填写一个**动词**，description
  为操作描述，填写描述信息
- `options.description` \<string\> 资源描述信息

#### 示例

```js
const res = await managementClient.applications.updateResource(APP_ID, {
  code,
  description: '新的描述',
  type: ResourceType.Api,
  actions: [
    { name: 'cardiovascular', description: '心血管的' },
    { name: 'surge', description: '激增' },
  ],
})
```

#### 返回数据

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
      "description": "图书写入操作2"
    },
    {
      "name": "book:read",
      "description": "图书读取操作2"
    }
  ],
  "type": "DATA",
  "description": "新的描述",
  "namespaceId": 22997,
  "apiIdentifier": null
}
```

## 删除资源
>更新一个资源。

```js
ApplicationsManagementClient().deleteResource(appId, code)
```


#### 参数

- `appId` \<string\> 应用 ID
- `code` \<string\> 资源标识符

#### 示例

```js
let deleted = await managementClient.applications.deleteResource(
  APP_ID,
  '600a8f4e37708b363024a3ca'
)

deleted === true
```

#### 返回数据

```json
true
```

## 获取应用访问控制策略
>获取一个应用的访问控制策略。

```js
ApplicationsManagementClient().getAccessPolicies(appId, options)
```


#### 参数

- `appId` \<string\> 应用 ID
- `options` \<object\> 传入配置
- `options.page` \<string\> 分页，获取第几页，默认从 1 开始
- `options.limit` \<string\> 每页条目数量，默认为 10 个

#### 示例

```javascript
let res = await managementClient.applications.getAccessPolicies(
  APP_ID
)
```

#### 示例数据

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

## 启用应用访问控制策略
>启用一个应用的访问控制策略。
```js
ApplicationsManagementClient().enableAccessPolicy(appId, options)
```


#### 参数

- `appId` \<string\> 应用 ID
- `options` \<object\> 传入配置
- `options.targetType` \<string\> 主体类型，可选值为 `USER`、`ROLE`、`GROUP`、`ORG`
- `options.targetIdentifiers` \<string\> 主体标识符，可以为用户 id、角色标识符、分组标识符、组织机构节点标识符
- `options.namespace` \<string\> 当 targetType 为 `ROLE`、`GROUP`、`ORG` 时，填写其所在的权限分组标识符
- `options.inheritByChildren` \<boolean\> 当 `targetType` 为 `ORG` 时，用于指定组织机构的子节点是否继承该策略

#### 示例

```javascript
let res = await managementClient.applications.enableAccessPolicy(APP_ID, {
  targetType: 'USER',
  targetIdentifiers: ['用户 ID'],
})
```

#### 示例数据

```json
{
  "code": 200,
  "message": "启用应用访问控制策略成功"
}
```

## 停用应用访问控制策略
>停用一个应用的访问控制策略。

```js
ApplicationsManagementClient().disableAccessPolicy(appId, options)
```


#### 参数

- `appId` \<string\> 应用 ID
- `options` \<object\> 传入配置
- `options.targetType` \<string\> 主体类型，可选值为 `USER`、`ROLE`、`GROUP`、`ORG`
- `options.targetIdentifiers` \<string\> 主体标识符，可以为用户 id、角色标识符、分组标识符、组织机构节点标识符
- `options.namespace` \<string\> 当 targetType 为 `ROLE`、`GROUP`、`ORG` 时，填写其所在的权限分组标识符
- `options.inheritByChildren` \<boolean\> 当 `targetType` 为 `ORG` 时，用于指定组织机构的子节点是否继承该策略

#### 示例

```javascript
let res = await managementClient.applications.disableAccessPolicy(APP_ID, {
  targetType: 'USER',
  targetIdentifiers: ['用户 ID'],
})
```

#### 示例数据

```json
{
  "code": 200,
  "message": "停用应用访问控制策略成功"
}
```

## 删除应用访问控制策略
>删除一个应用的访问控制策略。

```js
ApplicationsManagementClient().deleteAccessPolicy(appId, options)
```


#### 参数

- `appId` \<string\> 应用 ID
- `options` \<object\> 传入配置
- `options.targetType` \<string\> 主体类型，可选值为 `USER`、`ROLE`、`GROUP`、`ORG`
- `options.targetIdentifiers` \<string\> 主体标识符，可以为用户 id、角色标识符、分组标识符、组织机构节点标识符
- `options.namespace` \<string\> 当 targetType 为 `ROLE`、`GROUP`、`ORG` 时，填写其所在的权限分组标识符
- `options.inheritByChildren` \<boolean\> 当 `targetType` 为 `ORG` 时，用于指定组织机构的子节点是否继承该策略

#### 示例

```javascript
let res = await managementClient.applications.deleteAccessPolicy(
  APP_ID,
  {
    targetType: 'USER',
    targetIdentifiers: ['用户 ID'],
  }
)

res === true
```

#### 示例数据

```json
true
```

## 配置「允许主体（用户、角色、分组、组织机构节点）访问应用」的控制策略
>配置「允许主体（用户、角色、分组、组织机构节点）访问应用」的控制策略。

```js
ApplicationsManagementClient().allowAccess(appId, options)
```


#### 参数

- `appId` \<string\> 应用 ID
- `options` \<object\> 传入配置
- `options.targetType` \<string\> 主体类型，可选值为 `USER`、`ROLE`、`GROUP`、`ORG`
- `options.targetIdentifiers` \<string\> 主体标识符，可以为用户 id、角色标识符、分组标识符、组织机构节点标识符
- `options.namespace` \<string\> 当 targetType 为 `ROLE`、`GROUP`、`ORG` 时，填写其所在的权限分组标识符
- `options.inheritByChildren` \<boolean\> 当 `targetType` 为 `ORG` 时，用于指定组织机构的子节点是否继承该策略

#### 示例

```javascript
let res = await managementClient.applications.allowAccess(APP_ID, {
  targetType: 'USER',
  targetIdentifiers: ['用户 ID'],
})
```

#### 示例数据

```json
{
  "code": 200,
  "message": "允许主体访问应用的策略配置已生效"
}
```

## 配置「拒绝主体（用户、角色、分组、组织机构节点）访问应用」的控制策略
>配置「拒绝主体（用户、角色、分组、组织机构节点）访问应用」的控制策略。

```js
ApplicationsManagementClient().denyAccess(appId, options)
```


#### 参数

- `appId` \<string\> 应用 ID
- `options` \<object\> 传入配置
- `options.targetType` \<string\> 主体类型，可选值为 `USER`、`ROLE`、`GROUP`、`ORG`
- `options.targetIdentifiers` \<string\> 主体标识符，可以为用户 id、角色标识符、分组标识符、组织机构节点标识符
- `options.namespace` \<string\> 当 targetType 为 `ROLE`、`GROUP`、`ORG` 时，填写其所在的权限分组标识符
- `options.inheritByChildren` \<boolean\> 当 `targetType` 为 `ORG` 时，用于指定组织机构的子节点是否继承该策略

#### 示例

```javascript
let res = await managementClient.applications.denyAccess(APP_ID, {
  targetType: 'USER',
  targetIdentifiers: ['用户 ID'],
})
```

#### 示例数据

```json
{
  "code": 200,
  "message": "拒绝主体访问应用的策略配置已生效"
}
```

## 更改默认应用访问策略
>修改默认应用访问策略：默认拒绝所有用户访问应用、默认允许所有用户访问应用

```js
ApplicationsManagementClient().updateDefaultAccessPolicy(appId, defaultStrategy)
```


#### 参数

- `appId` \<string\> 应用 ID
- `defaultStrategy` \<string\> 默认应用访问策略，可选值为 `ALLOW_ALL`、`DENY_ALL`，含义为默认允许所有用户访问、拒绝所有用户访问

#### 示例

```javascript
let res = await managementClient.applications.updateDefaultAccessPolicy(
  APP_ID,
  'ALLOW_ALL'
)
```

#### 返回数据

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

## 在应用下创建角色
> 创建角色，可以指定不同的权限分组。

```js
ApplicationsManagementClient().createRole(appId, options)
```


#### 参数

- `appId` \<string\> 应用 ID
- `options.code` \<string\> 角色唯一标志符
- `options.description` \<string\> 描述

#### 示例

```javascript
managementClient.applications.createRole(APP_ID, {
  code: 'CODE',
  description: 'DESCRIPTION',
})
```

#### 返回值

- `Promise<DeepPartial<Role>>`

## 删除应用下的角色
> 删除角色

```js
ApplicationsManagementClient().deleteRole(appId, code)
```


#### 参数

- `appId` \<string\> 应用 ID
- `code` \<string\> 角色唯一标志符

#### 示例

```javascript
managementClient.applications.deleteRole(APP_ID, 'rolea')
```

#### 返回值

- `Promise<CommonMessage>`

## 批量删除应用下的角色
> 批量删除应用下的角色

```js
ApplicationsManagementClient().deleteRoles(appId, codes)
```


- `appId` \<string\> 应用 ID
- `codes` \<string[]\> 角色唯一标志符 数组

#### 示例

```javascript
managementClient.applications.deleteRoles(APP_ID, ['rolea'])
```

#### 返回值

- `Promise<CommonMessage>`

## 修改应用下的角色
> 修改角色

```js
ApplicationsManagementClient().updateRole(appId, options)
```


#### 参数

- `appId` \<string\> 应用 ID
- `options` \<object\>
- `options.code` \<string\> 角色唯一标志符
- `options.description` \<string\> 描述信息
- `options.newCode` \<string\> 新的唯一标志符

#### 示例

```javascript
managementClient.applications.updateRole(APP_ID, { newCode: 'newcode' })
```

#### 返回值

- `Promise<DeepPartial<Role>>`

## 获取应用下的角色详情
>获取应用下的角色详情。

```js
ApplicationsManagementClient().findRole(appId, code)
```


#### 参数

- `appId` \<string\> 应用 ID
- `code` \<string\> 角色唯一标志符

#### 示例

```javascript
managementClient.applications.findRole(APP_ID, CODE)
```

#### 返回值

- `Promise<DeepPartial<Role>>`

## 获取应用下的角色列表
>获取应用下的角色列表。

```js
ApplicationsManagementClient().getRoles(appId, options)
```


#### 参数

- `appId` \<string\> 应用 ID
- `options` \<object\>
- `options.page` \<number\> 页码数 默认值为 : `1`。
- `options.limit` \<number\> 每页个数 默认值为 : `10`。

#### 示例

```javascript
managementClient.applications.getRoles(APP_ID, {
  page: 1,
  limit: 10,
})
```

#### 返回值

- `Promise<DeepPartial<PaginatedRoles>>`

## 获取应用下角色的用户列表
>获取应用下角色的用户列表。

```js
ApplicationsManagementClient().getUsersByRoleCode(appId, code)
```


#### 参数

- `appId` \<string\> 应用 ID
- `code` \<string\> 角色唯一标志符

#### 示例

```javascript
managementClient.applications.getUsersByRoleCode(APP_ID, CODE)
```

#### 返回值

- `Promise<DeepPartial<PaginatedUsers>>`

## 应用下的角色添加用户
>应用下的角色添加用户。

```js
ApplicationsManagementClient().addUsersToRole(appId, code, userIds)
```


#### 参数

- `appId` \<string\> 应用 ID
- `code` \<string\> 角色唯一标志符
- `userIds` \<string[]\> 用户 ID 列表

#### 示例

```javascript
managementClient.applications.addUsersToRole(APP_ID, CODE, [
  USER_ID_1,
  USER_ID_2,
])
```

#### 返回值

- `Promise<CommonMessage>`

## 应用下的角色移除用户
>应用下的角色移除用户。

```js
ApplicationsManagementClient().removeUsersFromRole(appId, code, userIds)
```


#### 参数

- `appId` \<string\> 应用 ID
- `code` \<string\> 角色唯一标志符
- `userIds` \<string[]\> 用户 ID 列表

#### 示例

```javascript
managementClient.applications.removeUsersFromRole(APP_ID, CODE, [
  USER_ID_1,
  USER_ID_2,
])
```

#### 返回值

- `Promise<CommonMessage>`

## 获取应用下角色被授权的所有资源列表
>获取应用下角色被授权的所有资源列表。

```js
ApplicationsManagementClient().listAuthorizedResourcesByRole(appId, code, resourceType)
```


#### 参数

- `appId` \<string\> 应用 ID
- `code` \<string\> 角色 code；
- `resourceType` \<string\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
  - `DATA`: 数据类型；
  - `API`: API 类型数据；
  - `MENU`: 菜单类型数据；
  - `BUTTON`: 按钮类型数据。

#### 示例

```javascript
managementClient.applications.listAuthorizedResourcesByRole(
  APP_ID,
  CODE,
  'DATA'
)
```

#### 示例数据

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

## 创建注册协议
> 创建一个注册协议
```js
ApplicationsManagementClient().createAgreement(appId, options)
```



#### 参数

- `appId` \<string\> 应用 ID
- `options` \<string\> 注册协议配置；
  - `options.title`: 协议标题，可以包含 HTML A 标签；
  - `options.required`: 是否必须勾选同意才允许注册，默认为 true；
  - `options.lang`: 协议标题语言，可选 zh-CN, en-US，默认为 zh-CN，在托管登录页面中会根据界面语言展示协议；

#### 示例

```javascript
managementClient.applications.createAgreement(APP_ID, {
  title:
    'I agreement this <a href="https://example.com/policy" target="_blank">policy</a>',
  required: true,
})
```

#### 示例数据

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

## 修改注册协议
> 修改注册协议

```js
ApplicationsManagementClient().modifyAgreement(appId, agreementId, updates)
```


#### 参数

- `appId` \<string\> 应用 ID
- `agreementId` \<number\> 协议 ID
- `updates` \<string\> 要更新的数据；
  - `updates.title`: 协议标题，可以包含 HTML A 标签；
  - `updates.required`: 是否必须勾选同意才允许注册，默认为 true；
  - `updates.lang`: 协议标题语言，可选 zh-CN, en-US，默认为 zh-CN，在托管登录页面中会根据界面语言展示协议；

#### 示例

```javascript
managementClient.applications.modifyAgreement(APP_ID, AGREEMENT_ID, {
  required: false,
})
```

#### 示例数据

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

## 获取注册协议列表
> 获取注册协议列表

```js
ApplicationsManagementClient().listAgreement(appId)
```


#### 参数

- `appId` \<string\> 应用 ID

#### 示例

```javascript
managementClient.applications.listAgreement(APP_ID)
```

#### 示例数据

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

## 删除注册协议
> 删除注册协议

```js
ApplicationsManagementClient().deleteAgreement(appId, agreementId)
```


#### 参数

- `appId` \<string\> 应用 ID
- `agreementId` \<number\> 协议 ID

#### 示例

```javascript
managementClient.applications.deleteAgreement(APP_ID, AGREEMENT_ID)
```

#### 示例数据

```js
true
```

## 注册协议排序
> 注册协议排序

```js
ApplicationsManagementClient().sortAgreement(appId, order)
```


#### 参数

- `appId` \<string\> 应用 ID
- `order` \<number\> 应用下所有协议的 ID 列表，按需要的顺序排列

#### 示例

```javascript
managementClient.applications.sortAgreement(APP_ID, [
  AGREEMENT_ID1,
  AGREEMENT_ID2,
  AGREEMENT_ID3,
])
```

#### 示例数据

```js
true
```

## 查看已登录用户
> 查看应用下已登录用户

```js
ApplicationsManagementClient().activeUsers(appId, page, limit)
```


#### 参数

- `appId` \<string\> 应用 ID
- `page` \<number\> 分页序号, 默认为 `1`。
- `limit` \<number\> 每页返回的个数, 默认为 `10`。

#### 示例

```javascript
managementClient.applications.activeUsers(APP_ID, 1, 10);
```

#### 示例数据

## 刷新应用密钥
> 刷新应用密钥

```js
ApplicationsManagementClient().refreshApplicationSecret(appId)
```


#### 参数

- `appId` \<string\> 应用 ID

#### 示例

```javascript
managementClient.applications.refreshApplicationSecret(APP_ID);
```



## 更改应用类型

> 更改应用类型

```js
ApplicationsManagementClient().changeApplicationType(appId, type)
```


#### 参数

- `appId` \<string\> 应用 ID
- `type` \<ApplicationType\> 应用类型，可选值为 INDIVIDUAL：个体型，Tenant：租户型，BOTH：兼容型

#### 示例

```javascript
managementClient.applications.changeApplicationType('6194a3c595908f00ff698d3a', ApplicationType.BOTH);
```



## 获取应用关联的租户

> 获取应用关联的租户

```js
ApplicationsManagementClient().applicationTenants(appId)
```


#### 参数

- `appId` \<string\> 应用 ID

#### 示例

```javascript
managementClient.applications.applicationTenants('6194a3c595908f00ff698d3a');
```

