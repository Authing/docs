# 管理分组

<LastUpdated/>

此模块用于管理 {{$localeConfig.brandName}} 分组，可以进行分组的增删改查、分组添加/删除用户、获取分组被授权的所有资源等操作。

```javascript
import { ManagementClient } from 'authing-js-sdk'
const managementClient = new ManagementClient({
  userPoolId: 'YOUR_USERPOOL_ID',
  secret: 'YOUR_USERPOOL_SECRET',
})
managementClient.groups.list // 获取分组列表
managementClient.groups.create // 创建分组
managementClient.groups.listUsers // 获取分组用户列表
```

## 创建分组
>创建分组，一个分组必须包含一个用户池全局唯一的标志符（code），此标志符必须为一个合法的英文标志符，如 developers；以及分组名称。

```js
GroupsManagementClient().create(code, name, description)
```


#### 参数

- `code` \<string\> 分组唯一标志符
- `name` \<string\> 分组名称
- `description` \<string\> 描述

#### 示例

```javascript
managementClient.groups.create('group', '分组 xxx')
```

#### 返回值

```json
{
    "code": "developers",
    "name": "开发者",
    "description": null,
    "createdAt": "2021-05-06T15:36:33+08:00",
    "updatedAt": "2021-05-06T15:36:33+08:00"
}
```

## 修改分组
>修改分组，通过 code 唯一标志用户池中的一个分组。你可以修改此分组的 code。

```js
GroupsManagementClient().update(code, input)
```


#### 参数

- `code` \<string\> 分组唯一标志符
- `input` \<object\>
- `input.name` \<string\> 新的名称
- `input.description` \<string\> 新的描述信息
- `input.newCode` \<string\> 新的唯一标志符

#### 示例

```javascript
managementClient.groups.update('group', { newCode: 'newcode' })
```

#### 返回值

返回新的分组详情：

```json
{
    "code": "new-code",
    "name": "开发者",
    "description": null,
    "createdAt": "2021-05-06T15:36:33+08:00",
    "updatedAt": "2021-05-06T15:36:33+08:00"
}
```

## 获取分组详情
>获取分组详情，通过 code 唯一标志用户池中的一个分组。

```js
GroupsManagementClient().detail(code)
```


#### 参数

- `code` \<string\> 分组唯一标志符

#### 示例

```javascript
managementClient.groups.detail('manager')
```

#### 返回值

```json
{
    "code": "developers",
    "name": "开发者",
    "description": null,
    "createdAt": "2021-05-06T15:36:33+08:00",
    "updatedAt": "2021-05-06T15:36:33+08:00"
}
```

## 获取分组列表
>获取分组列表，此接口为分页接口。

```js
GroupsManagementClient().list(page, limit)
```


#### 参数

- `page` \<number\> 页码数 默认值为 : `1`。
- `limit` \<number\> 每页个数 默认值为 : `10`。

#### 示例

```javascript
managementClient.groups.list(1, 10)
```

#### 返回值

```json
{
  "totalCount": 2,
  "list": [
    {
      "code": "code1",
      "name": "名称1",
      "description": null,
      "createdAt": "2021-05-06T15:36:33+08:00",
      "updatedAt": "2021-05-06T15:36:33+08:00"
    },
    {
      "code": "code2",
      "name": "名称2",
      "description": null,
      "createdAt": "2021-05-06T15:36:33+08:00",
      "updatedAt": "2021-05-06T15:36:33+08:00"
    }
  ]
}
```

## 删除分组
>删除分组，通过 code 唯一标志用户池中的一个分组。

```js
GroupsManagementClient().delete(code)
```


#### 参数

- `code` \<string\> 分组唯一标志符

#### 示例

```javascript
managementClient.groups.delete('code')
```

#### 返回值

```json
{
  "code": 200,
  "massage": "删除分组成功"
}
```


## 批量删除分组
>通过分组的 code 批量删除分组。

```js
GroupsManagementClient().deleteMany(codeList)
```


#### 参数

- `codeList` \<string[]\> 分组唯一标志符列表

#### 示例

```javascript
managementClient.groups.deleteMany(['groupa', 'groupb'])
```

#### 返回值

```json
{
  "code": 200,
  "massage": "删除分组成功"
}
```

## 获取分组用户列表
>通过分组 code 获取分组用户列表。此接口为分页接口。

```js
GroupsManagementClient().listUsers(code, options)
```


#### 参数

- `code` \<string\> 分组唯一标志符
- `options`
  - `options.namespace` \<string\> 权限分组
  - `options.page` <number\> 页码数 默认值为 : `1`。
  - `options.limit` \<number\> 每页个数 默认值为 : `10`。
  - `options.withCustomData` \<boolean\> 是否获取自定义数据，默认为 false；如果设置为 true，将会在 `customData` 字段返回用户的所有自定义数据。

#### 示例

- 获取分组「developers」下的用户列表（分页）

```javascript
const code = 'developers'
const { list, totalCount } = await managementClient.groups.listUsers(code)
```

- 获取用户列表的同时，获取用户的自定义数据

```javascript
const code = 'developers'
const { list, totalCount } = await managementClient.groups.listUsers(code, {
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
>分组添加用户。

```js
GroupsManagementClient().addUsers(code, userIds)
```


#### 参数

- `code` \<string\> 分组唯一标志符
- `userIds` \<string[]\> 用户 ID 列表

#### 示例

```javascript
managementClient.groups.addUsers(code, ['USERID1', 'USERID2'])
```

#### 返回值

```json
{
  "code": 200,
  "massage": "添加用户成功"
}
```

## 移除用户
>分组移除用户。

```js
GroupsManagementClient().removeUsers(code, userIds)
```


#### 参数

- `code` \<string\> 分组唯一标志符
- `userIds` \<string[]\> 用户 ID 列表

#### 示例

```javascript
managementClient.groups.removeUsers(code, ['USERID1', 'USERID2'])
```

#### 返回值


```json
{
  "code": 200,
  "massage": "移除用户成功"
}
```

## 获取分组被授权的所有资源列表
>获取一个分组被授权的所有资源。

```js
GroupsManagementClient.listAuthorizedResources(groupCode, namespace, options)
```


#### 参数

- `groupCode` \<string\> 分组 code；
- `namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)；
- `options` \<object\> 
- `options.resourceType` \<string\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
  - `DATA`: 数据类型；
  - `API`: API 类型数据；
  - `MENU`: 菜单类型数据；
  - `BUTTON`: 按钮类型数据。

#### 示例

```javascript
managementClient.groups.listAuthorizedResources('GROUP_CODE', 'code')
```

#### 示例数据

- `type` 为资源类型；
- `code`: 资源描述符，如果是 `DATA` 类型资源，格式为 `resourceType:resourceId`，如 `books:*` 表示所有书籍，`books:1` 表示 ID 为 1 的书籍。
- `actions`: 用户被授权对该资源的操作。

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
