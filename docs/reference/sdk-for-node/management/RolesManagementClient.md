# 管理角色

<LastUpdated/>

此模块用于管理 {{$localeConfig.brandName}} 角色，可以进行角色的增删改查、角色添加/删除用户等操作。

请使用以下方式使用该模块，而不要直接初始化该模块：

```javascript
import { ManagementClient } from 'authing-js-sdk'
const managementClient = new ManagementClient({
  userPoolId: 'YOUR_USERPOOL_ID',
  secret: 'YOUR_USERPOOL_SECRET',
})
managementClient.roles.list // 获取角色列表
managementClient.roles.create // 创建角色
managementClient.roles.listUsers // 获取用户列表
```

## 创建角色
>创建角色，可以指定不同的权限分组。

```javascript
RolesManagementClient().create(code, description, namespace)
```


#### 参数

- `code` \<string\> 角色唯一标志符
- `description` \<string\> 描述
- `namespace` \<string\> 权限分组 code

#### 示例

```javascript
managementClient.roles.create('rolea', 'RoleA')
```

#### 返回值

- `Promise<DeepPartial<Role>>`

## 删除角色
>删除角色。
```javascript
RolesManagementClient().delete(code, namesapce)
```


#### 参数

- `code` \<string\> 角色唯一标志符
- `namespace` \<string\> 权限分组 code

#### 示例

```javascript
managementClient.roles.delete('rolea', 'namespaceCode')
```

#### 返回值

- `Promise<CommonMessage>`

## 批量删除角色
> 批量删除角色

```javascript
RolesManagementClient().deleteMany(codeList,namespace)
```


#### 参数

- `codeList` \<string[]\> 角色唯一标志符列表
- `namespace` \<string\> 权限分组 code
#### 示例

```javascript
managementClient.roles.deleteMany(['rolea'])
```

#### 返回值

- `Promise<CommonMessage>`

## 修改角色
> 修改角色

```javascript
RolesManagementClient().update(code, input)
```


#### 参数

- `code` \<string\> 角色唯一标志符
- `input` \<object\>
- `input.namespace` \<string\> 权限分组 code
- `input.description` \<string\> 描述信息
- `input.newCode` \<string\> 新的唯一标志符

#### 示例

```javascript
managementClient.roles.update('rolea', { newCode: 'newcode' })
```

#### 返回值

- `Promise<DeepPartial<Role>>`

## 获取角色详情
> 获取角色详情
```javascript
RolesManagementClient().findByCode(code,namespace)
```


#### 参数

- `code` \<string\> 角色唯一标志符
- `namespace` \<string\> 权限分组 code
#### 示例

```javascript
managementClient.roles.findByCode('manager')
```

#### 返回值

- `Promise<DeepPartial<Role>>` 角色详情

## 获取角色列表
> 获取角色列表
```javascript
RolesManagementClient().list(options)
```

#### 参数

- `options` \<object\>
- `options.page` \<number\> 页码数 默认值为 : `1`。
- `options.limit` \<number\> 每页个数 默认值为 : `10`。
- `options.namespace` \<string\> 权限分组 code
#### 示例

```javascript
managementClient.roles.list({
  page: 1,
  limit: 10
})
```

#### 返回值

- `Promise<DeepPartial<PaginatedRoles>>`


## 获取用户列表
>获取用户列表。此接口为分页接口。

```javascript
RolesManagementClient().listUsers(code, options)
```


#### 参数

- `code` \<string\> 角色唯一标志符
- `options` \<object\>
  - `options.namespace` \<string\> 权限分组
  - `options.page` <number\> 页码数 默认值为 : `1`。
  - `options.limit` \<number\> 每页个数 默认值为 : `10`。
  - `options.withCustomData` \<boolean\> 是否获取自定义数据，默认为 false；如果设置为 true，将会在 `customData` 字段返回用户的所有自定义数据。

#### 示例

- 获取「默认权限分组」下面的角色 「role」的用户（分页）

```javascript
const code = 'role'
const { list, totalCount } = await managementClient.roles.listUsers(code, {
  page: 1,
  limit: 10
})
```

- 获取用户列表的同时，获取用户的自定义数据

```javascript
const code = 'role'
const { list, totalCount } = await managementClient.roles.listUsers(code, {
  page: 1,
  limit: 10,
  withCustomData: true
})
```

#### 示例数据

```json
{
  "totalCount": 1,
  "list": [
    {
      "id": "604a12a261a85949c8ad0259",
      "arn": "arn:cn:authing:604a12a22d45ab775db56160:user:604a12a261a85949c8ad0259",
      "userPoolId": "604a12a22d45ab775db56160",
      "status": "Activated",
      "username": "test",
      "email": null,
      "emailVerified": false,
      "phone": null,
      "phoneVerified": false,
      "unionid": null,
      "openid": null,
      "nickname": null,
      "registerSource": ["unknown"],
      "photo": "https://files.authing.co/authing-console/default-user-avatar.png",
      "password": null,
      "oauth": null,
      "token": null,
      "tokenExpiredAt": null,
      "loginsCount": 0,
      "lastLogin": null,
      "lastIP": null,
      "signedUp": "2021-03-11T20:52:50+08:00",
      "blocked": false,
      "isDeleted": false,
      "device": null,
      "browser": null,
      "company": null,
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
      "createdAt": "2021-03-11T20:52:50+08:00",
      "updatedAt": "2021-03-11T20:52:50+08:00",
      "externalId": null,
      "customData": {
        "school": "清华大学",
        "age": 19
      }
    }
  ]
}
```


## 添加用户
> 添加用户

```javascript
RolesManagementClient().addUsers(code, userIds,namespace)
```


#### 参数

- `code` \<string\> 角色唯一标志符
- `userIds` \<string[]\> 用户 ID 列表
- `namespace` \<string\> 权限分组 code
#### 示例

```javascript
managementClient.roles.addUsers(code, ['USERID1', 'USERID2'])
```

#### 返回值

- `Promise<CommonMessage>`

## 移除用户
> 移除用户

```javascript
RolesManagementClient().removeUsers(code, userIds,namespace)
```


#### 参数

- `code` \<string\> 角色唯一标志符
- `userIds` \<string[]\> 用户 ID 列表
- `namespace` \<string\> 权限分组 code
#### 示例

```javascript
managementClient.roles.removeUsers(code, ['USERID1', 'USERID2'])
```

#### 返回值

- `Promise<CommonMessage>`

## 获取角色被授权的所有资源列表
> 获取一个角色被授权的所有资源。

```javascript
RolesManagementClient.listAuthorizedResources(roleCode, namespace, options)
```


#### 参数

- `roleCode` \<string\> 角色 code；
- `namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)；
- `resourceType` \<string\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
  - `DATA`: 数据类型；
  - `API`: API 类型数据；
  - `MENU`: 菜单类型数据；
  - `BUTTON`: 按钮类型数据。

#### 示例

```javascript
import { ResourceType } from 'authing-js-sdk'

managementClient.roles.listAuthorizedResources('ROLE_CODE', 'code', {
  resourceType: ResourceType.MENU,
})
```

#### 示例数据

- `type` 为资源类型；
- `code`  资源描述符，如果是 `DATA` 类型资源，格式为 `resourceType:resourceId`，如 `books:*` 表示所有书籍，`books:1` 表示 ID 为 1 的书籍。
- `actions`  用户被授权对该资源的操作。

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

## 获取某个角色扩展字段列表
> 获取某个角色扩展字段列表

```javascript
RolesManagementClient.getUdfValue(roleId)
```


#### 参数

- `roleId` \<string\> 角色 ID；

#### 示例

```javascript
import { ResourceType } from 'authing-js-sdk'

managementClient.roles.getUdfValue('roleId')
```
 
#### 示例数据

```json
{
  "key": "value"
}
```

## 获取某个角色某个扩展字段
> 获取某个角色某个扩展字段

```javascript
RolesManagementClient.getSpecificUdfValue(roleId, udfKey)
```


#### 参数

- `roleId` \<string\> 角色 ID；
- `udfKey` \<string\> 扩展字段 Key；

#### 示例

```javascript
import { ResourceType } from 'authing-js-sdk'

managementClient.roles.getSpecificUdfValue('roleId', 'udfKey')
```


## 获取多个角色扩展字段列表
> 获取多个角色扩展字段列表

```javascript
RolesManagementClient.getUdfValueBatch(roleIds)
```


#### 参数

- `roleIds` \<string []\> 角色 ID 列表；

#### 示例

```javascript
import { ResourceType } from 'authing-js-sdk'

managementClient.roles.getUdfValueBatch(['roleId1', 'roleId2'])
```

#### 示例数据

```json
{
  "ROLE_ID1": {
    "key1": "value1",
  },
  "ROLE_ID2": {
    "key1": "value2",
  }
}
```

## 设置角色扩展字段
>设置角色扩展字段。

```javascript
RolesManagementClient.setUdfValue(roleId, data)
```


#### 参数

- `roleId` \<string []\> 角色 ID 列表；
- `data` \<KeyValuePair\> 扩展字段，key: value；

#### 示例

```javascript
import { ResourceType } from 'authing-js-sdk'

managementClient.roles.setUdfValue('roleId1', {
  'key1': 'value1',
  'key2': 'value2'
})
```

## 设置多个角色扩展字段列表
> 设置多个角色扩展字段列表

```javascript
RolesManagementClient.setUdfValueBatch(input)
```

#### 参数

- `input` \<object\> 数据输入；
- `input.data` \<KeyValuePair []\> 扩展字段数组；
- `input.roleId` \<string]\> 角色 ID 列表；

#### 示例

```javascript
import { ResourceType } from 'authing-js-sdk'

managementClient.roles.setUdfValueBatch('roleId1', [{
  'key1': 'value1',
  'key2': 'value2'
}])
```

#### 示例数据

## 删除角色的扩展字段
>删除角色的扩展字段。

```javascript
RolesManagementClient().removeUdfValue(roleId, key)
```

#### 参数

- `roleId` \<string\> 角色 ID；
- `key` \<string\> 扩展字段名；

#### 示例

```javascript
import { ResourceType } from 'authing-js-sdk'

managementClient.roles.removeUdfValue('roleId1', 'key1')
```


## 获取角色策略列表
>获取角色策略列表
```js
RolesManagementClient().listPolicies(code,page,limit)
```
#### 参数

- `code` \<string\> 角色 code
- `page` <int\> 页码数 默认值为 : `1`
- `limit` \<int\> 每页个数 默认值为 : `10`
#### 示例
```js
management.roles.listPolicies('code')
```

## 给角色授权策略
>给角色授权策略
```js
RolesManagementClient().addPoliciess(code, policies)
```
#### 参数

- `code` \<string\> 角色 code
- `policies` <string[]\> 策略编码

#### 示例
```js
const data = await managementClient.roles.addPolicies("nodeSDKRole",["ehsncbahxr"])
```


## 角色移除策略
>角色移除策略
```js
RolesManagementClient().removePolicies( code, policies)
```
#### 参数
- `code` \<string\> 角色 code
- `policies` <string[]\> 策略编码
#### 示例
```js
const data = await managementClient.roles.removePolicies("nodeSDKRole",["ehsncbahxr"])
```
