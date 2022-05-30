# 管理用户

<LastUpdated/>

此模块可以进行用户目录增删改查、搜索用户、管理用户分组、管理用户角色、管理用户策略授权等操作。

请使用以下方式使用该模块：

```javascript
import { ManagementClient } from 'authing-js-sdk'
const managementClient = new ManagementClient({
  userPoolId: 'YOUR_USERPOOL_ID',
  secret: 'YOUR_USERPOOL_SECRET',
})

managementClient.users.list // 获取用户列表
managementClient.users.create // 创建用户
managementClient.users.listRoles // 获取用户角色列表
managementClient.users.search // 搜索用户
```

## 创建用户
>此接口将以管理员身份创建用户，不需要进行手机号验证码检验等安全检测。用户的手机号、邮箱、用户名、externalId 用户池内唯一。

```js
UsersManagementClient().create(userInfo, options)
```


#### 参数

- `userInfo` \<CreateUserInput\> 用户资料
- `userInfo.email` \<string\> 邮箱，用户池内唯一
- `userInfo.emailVerified` \<boolean\> 邮箱是否已验证
- `userInfo.phone` \<string\> 手机号
- `userInfo.phoneVerified` \<boolean\> 手机号是否验证
- `userInfo.unionid` \<string\> 以社会化登录的用户该字段为用户在第三方社会化登录服务商中的唯一 ID
- `userInfo.openid` \<string\> 微信登录返回的 openid
- `userInfo.password` \<string\> 密码
- `userInfo.registerSource` \<string\> 注册来源，可以多选
- `userInfo.username` \<string\> 用户名
- `userInfo.nickname` \<string\> 昵称
- `userInfo.photo` \<string\> 头像
- `userInfo.company` \<string\> 公司
- `userInfo.browser` \<string\> 浏览器
- `userInfo.loginsCount` \<number\> 登录次数，当你从原有用户系统迁移到 {{$localeConfig.brandName}} 时可以设置该字段。
- `userInfo.lastLogin` \<string\> 上次登录时间, 符合 [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) 格式的时间字符串。(如 "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")
- `userInfo.lastIP` \<string\> 用户最近一次登录（或其他活动）的 IP
- `userInfo.signedUp` \<string\> 注册时间，符合 [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) 格式的时间字符串。(如 "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")
- `userInfo.blocked` \<boolean\> 账号是否被锁定
- `userInfo.device` \<string\> 设备
- `userInfo.lastIP` \<string\> 最近登录的 IP
- `userInfo.name` \<string\> Name
- `userInfo.givenName` \<string\> Given Name
- `userInfo.familyName` \<string\> Family Name
- `userInfo.middleName` \<string\> Middle Name
- `userInfo.profile` \<string\> Profile Url
- `userInfo.preferredUsername` \<string\> Preferred Name
- `userInfo.website` \<string\> 个人网站
- `userInfo.gender` \<string\> 性别, F 表示男性、W 表示女性、未知表示 U
- `userInfo.birthdate` \<string\> 生日
- `userInfo.zoneinfo` \<string\> 时区
- `userInfo.locale` \<string\> 语言
- `userInfo.address` \<string\> 地址
- `userInfo.streetAddress` \<string\> 街道地址
- `userInfo.locality` \<string\>
- `userInfo.region` \<string\> 地域
- `userInfo.postalCode` \<string\> 邮编
- `userInfo.city` \<string\> 城市
- `userInfo.province` \<string\> 省份
- `userInfo.country` \<string\> 国家
- `userInfo.externalId` \<string\> 内部员工 ID，此项在用户目录中为唯一。
- `options` \<object\>
- `options.keepPassword` \<boolean\> 该参数一般在迁移旧有用户数据到 Authing 的时候会设置。开启这个开关，password 字段会直接写入 Authing 数据库，Authing 不会再次加密此字段。如果你的密码不是明文存储，你应该保持开启，并编写密码函数计算。详情请见 [使用 SDK 导入用户](/guides/migrations/use-api.md)。

#### 示例

```javascript
const user = await managementClient.users.create({
  username: 'bob',
  password: 'passw0rd',
})
```

```javascript
const user = await managementClient.users.create({
   nickname: 'Nick',
   phone: '176xxxx6754', // 由于是管理员操作，所以不需要检验手机号验证码, 如果你需要检验，请使用  AuthenticationClient
   loginsCount: 2, // 原有用户系统记录的用户登录次数
   signedUp: '2020-10-15T17:55:37+08:00' // 原有用户系统记录的用户注册时间
})
```

#### 返回值

- [Promise\<User\>](/guides/user/user-profile.md)

#### 示例数据

```json
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
  "externalId": null
}
```

## 修改用户资料
> 修改用户资料
```js
UsersManagementClient().update(id, updates)
```

#### 参数

- `id` \<string\> 用户 ID
- `updates` \<UpdateUserInput\> 修改的用户资料
- `updates.email` \<string\> 邮箱
- `updates.emailVerified` \<boolean\> 邮箱是否已验证
- `updates.phone` \<string\> 手机号
- `updates.phoneVerified` \<boolean\> 手机号是否验证
- `updates.unionid` \<string\> 以社会化登录的用户该字段为用户在第三方社会化登录服务商中的唯一 ID
- `updates.openid` \<string\> 微信登录返回的 openid
- `updates.password` \<string\> 密码
- `updates.registerSource` \<string\> 注册来源，可以多选
- `updates.tokenExpiredAt` \<string\> token 过期时间，符合 [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) 格式的时间字符串。(如 "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")。
  将该字段设置为小于当前时间可以让用户的 token 失效。
- `updates.username` \<string\> 用户名
- `updates.nickname` \<string\> 昵称
- `updates.photo` \<string\> 头像
- `updates.company` \<string\> 公司
- `updates.browser` \<string\> 浏览器
- `updates.loginsCount` \<number\> 登录次数，当你从原有用户系统迁移到 {{$localeConfig.brandName}} 时可以设置该字段。
- `updates.lastLogin` \<string\> 上次登录时间, 符合 [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) 格式的时间字符串。(如 "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")
- `updates.lastIP` \<string\> 用户最近一次登录（或其他活动）的 IP
- `updates.signedUp` \<string\> 注册时间，符合 [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) 格式的时间字符串。(如 "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")
- `updates.blocked` \<boolean\> 账号是否被锁定
- `updates.device` \<string\> 设备
- `updates.lastIP` \<string\> 最近登录的 IP
- `updates.name` \<string\> Name
- `updates.givenName` \<string\> Given Name
- `updates.familyName` \<string\> Family Name
- `updates.middleName` \<string\> Middle Name
- `updates.profile` \<string\> Profile Url
- `updates.preferredUsername` \<string\> Preferred Name
- `updates.website` \<string\> 个人网站
- `updates.gender` \<string\> 性别, F 表示男性、W 表示女性、未知表示 U
- `updates.birthdate` \<string\> 生日
- `updates.zoneinfo` \<string\> 时区
- `updates.locale` \<string\> 语言
- `updates.address` \<string\> 地址
- `updates.streetAddress` \<string\> 街道地址
- `updates.locality` \<string\>
- `updates.region` \<string\> 地域
- `updates.postalCode` \<string\> 邮编
- `updates.city` \<string\> 城市
- `updates.province` \<string\> 省份
- `updates.country` \<string\> 国家
- `updates.externalId` \<String\> 用户外部 ID

#### 示例

```javascript
const user = await managementClient.users.update('USERID', {
  nickname: 'Nick',
})
```

```javascript
const user = await managementClient.users.update('USERID', {
  nickname: 'Nick',
  phone: '176xxxx6754', // 由于是管理员操作，所以不需要检验手机号验证码, 如果你需要检验，请使用  AuthenticationClient
  tokenExpiredAt: '2020-10-15T17:55:37+08:00',
})
```

#### 返回值

- [Promise\<User\>](/guides/user/user-profile.md)

#### 示例数据

```json
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
  "externalId": null
}
```

## 通过 ID 获取用户信息
>通过用户 ID 获取用户详情，如果你想通过 token 获取用户详情，请使用 [AuthenticationClient SDK](/reference-new/web/sdk-for-node/authentication/AuthenticationClient.md#获取当前登录的用户信息) 。

```js
UsersManagementClient().detail(userId, options)
```


#### 参数

- `userId` \<string\> 用户 ID
- `options.withCustomData`: \<boolean\> 是否获取自定义数据，默认为 false；如果设置为 true，将会在 `customData` 字段返回用户的所有自定义数据。示例：

```json
{
  "id": "604a12a261a85949c8ad0259",
  "customData": {
    "school": "清华大学",
    "age": 19
  }
}
```

#### 示例

- 通过用户 ID 获取用户详情

```javascript
const user = await managementClient.users.detail('USERID')
```

- 同时获取用户的自定义数据

```js
const user = await managementClient.users.detail('USERID', {
  withCustomData: true
})
```

#### 返回值

- [Promise\<User\>](/guides/user/user-profile.md)

#### 示例数据

```json
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
  "identities": [],
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
```

## 获取自定义数据
>获取用户的自定义数据。你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)。

```js
UsersManagementClient().getUdfValue(userId)
```

#### 参数

- `userId` \<string\> 用户 ID

#### 示例

```javascript
const data = await managementClient.users.getUdfValue('USER_ID')
```

#### 示例数据

```json
{
  "school": "华中科技大学",
  "age": 20
}
```

## 批量获取自定义数据
>批量获取多个用户的自定义数据。你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)。

```js
UsersManagementClient().getUdfValueBatch(userIds)
```


#### 参数

- `userIds` \<string\> 用户 ID 列表

#### 示例

```javascript
const data = await managementClient.users.getUdfValueBatch([
  'USER_ID1',
  'USER_ID2',
])
```

#### 示例数据

```json
{
  "USER_ID1": {
    "school": "华中科技大学",
    "age": 20
  },
  "USER_ID2": {
    "school": "北京大学",
    "age": 21
  }
}
```

## 设置自定义数据
>设置用户的自定义数据。你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。

```js
UsersManagementClient().setUdfValue(userId, data)
```


#### 参数

- `userId` \<string\> 用户 ID
- `data` \<KeyValuePair>\ 自定义字段数据，类型为一个对象。

#### 示例

```javascript
await managementClient.users.setUdfValue(userId, {
  school: '华中科技大学',
  age: 20,
})
```

## 批量设置自定义数据
>批量设置多个用户的自定义数据。你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。如果设置失败，会抛出异常，你需要对异常进行捕捉。

```js
UsersManagementClient().setUdfValueBatch(input)
```


#### 参数

- `input` \<object\> 输入数据，结构请见示例。

#### 示例

```javascript
await managementClient.users.setUdfValueBatch([
  {
    userId: 'USER_ID1',
    data: {
      school: '华中科技大学',
    },
  },
  {
    userId: 'USER_ID2',
    data: {
      school: '清华大学',
      age: 100,
    },
  },
])
```

## 删除自定义数据
>删除自定义数据。

```js
UsersManagementClient().removeUdfValue(userId, key)
```


#### 参数

- `userId` \<string\> 用户 ID
- `key` \<string\> 自定义字段的 key 。

#### 示例

```javascript
await authenticationClient.removeUdfValue('USER_ID', 'school')
```

## 删除用户
>通过用户 ID 删除用户。删除用户会联级删除此用户管理的所有相关数据，无法恢复，请谨慎操作。

```js
UsersManagementClient().delete(userId)
```

#### 参数

- `userId` \<string\> 用户 ID

#### 示例

```javascript
const user = await managementClient.users.delete('USERID')
```

#### 返回值

- `Promise<CommonMessage>`

## 批量删除用户
>批量删除用户，如果传入了不存在的用户 ID，会提示错误。

```js
UsersManagementClient().deleteMany(userIds)
```

#### 参数

- `userIds` \<string[]\> 用户 ID 列表

#### 示例

```javascript
const user = await managementClient.users.deleteMany(['USERID'])
```

#### 返回值

- `Promise<CommonMessage>`

## 批量获取用户
>通过 id、username、email、phone、email、externalId 批量获取用户详情。一次最多支持查询 80 个用户。

```js
UsersManagementClient().batch(identifiers, options)
```


#### 参数

- `identifiers` \<string[]\> 需要查询的数据列表，如用户 ID 列表、手机号列表；
- `options` \<object\>
  - `options.queryField` \<string\> 列表类型，可选值为 'id' ,'username' ,'phone' ,'email', 'externalId'，默认为 'id'。
  - `options.withCustomData`: \<boolean\> 是否获取自定义数据，默认为 false；如果设置为 true，将会在 `customData` 字段返回用户的所有自定义数据。示例：

```json
{
  "id": "604a12a261a85949c8ad0259",
  "customData": {
    "school": "清华大学",
    "age": 19
  }
}
```

#### 示例

- 通过 ID 批量获取用户

```javascript
const users = await managementClient.users.batch(['USERID', 'USERID2'], {
  queryField: 'id',
})
```

- 通过手机号批量获取用户

```javascript
const users = await managementClient.users.batch(['176xxxx6754', '158xxxx6954'], {
  queryField: 'phone',
})
```

- 同时获取用户自定义数据

```javascript
const users = await managementClient.users.batch(['USERID', 'USERID2'], {
  queryField: 'id',
  withCustomData: true
})
```

#### 示例数据

```json
[
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
    "identities": [],
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
```

## 获取用户列表
>获取用户池用户列表，该接口为分页接口。

```js
UsersManagementClient().list(page, limit, options)
```


#### 参数

- `page` \<number\> 页码数, 从 1 开始 默认值为 : `1`。
- `limit` \<number\> 每页包含的用户数 默认值为 : `10`。
- `options.withCustomData`: \<boolean\> 是否获取自定义数据，默认为 false；如果设置为 true，将会在 `customData` 字段返回用户的所有自定义数据。示例：

```json
{
  "id": "604a12a261a85949c8ad0259",
  "customData": {
    "school": "清华大学",
    "age": 19
  }
}
```

#### 示例

- 获取用户列表

```javascript
// list: 当前页用户列表
// totalCount: 用户总数
const { totalCount, list } = await managementClient.users.list()
```

- 同时获取用户的自定义数据

```javascript
const { totalCount, list } = await managementClient.users.list(1, 10, {
  withCustomData: true
})
```

#### 返回值

- `Promise<PaginatedUsers>`

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

## 获取已归档用户列表
> 获取用户池已归档用户列表

```js
UsersManagementClient().listArchivedUsers(page, limit)
```


#### 参数

- `page` \<number\> 页码数, 从 1 开始 默认值为 : `1`。
- `limit` \<number\> 每页包含的用户数 默认值为 : `10`。

#### 示例

```javascript
const user = await managementClient.users.listArchivedUsers()
```

#### 返回值

- `Promise<PaginatedUsers>`

示例数据：

```json
{
  "totalCount": 20,
  "list": [
    {
      // user info
    },
    {
      // user info
    }
  ]
}
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
      "externalId": null
    }
  ]
}
```

## 检查用户是否存在
>通过用户名、邮箱、手机号或者 ExternalId 检查用户是否存在。

```js
UsersManagementClient().exists(options)
```

#### 参数

- `options` \<object\>
- `options.username` \<string\> 用户名，区分大小写。
- `options.email` \<string\> 邮箱，**邮箱不区分大小写**。
- `options.phone` \<string\> 手机号
- `options.externalId` \<String\> External ID

#### 示例

- 查询用户名 `test` 是否存在

```javascript
const exists = await managementClient.users.exists({
  username: 'test',
})
```

- 通过手机号查询用户是否存在

```javascript
const exists = await managementClient.users.exists({
  phone: '176xxxx6754',
})
```

#### 返回值
```text
如果用户存在，返回 `true`；如果用户不存在，返回 `false`。
```

## 查找用户
>通过用户名、邮箱、手机号、External ID 精准查找用户。

```js
UsersManagementClient().find(options)
```


#### 参数

- `options` \<object\>
- `options.username` \<string\> 用户名，区分大小写。
- `options.email` \<string\> 邮箱，邮箱不区分大小写。
- `options.phone` \<string\> 手机号
- `options.externalId` \<string\> External Id
- `options.withCustomData`: \<boolean\> 是否获取自定义数据，默认为 false；如果设置为 true，将会在 `customData` 字段返回用户的所有自定义数据。示例：

```json
{
  "id": "604a12a261a85949c8ad0259",
  ...
  "customData": {
    "school": "清华大学",
    "age": 19
  }
}
```

#### 示例

- 通过用户名查询用户

```javascript
const users = await managementClient.users.find({
  username: 'test',
})
```

- 通过手机号查找用户

```javascript
const users = await managementClient.users.find({
  phone: '176xxxx7041',
})
```

- 同时获取用户自定义数据

```javascript
const users = await managementClient.users.find({
  phone: '176xxxx7041',
  withCustomData: true
})
```
#### 返回值

- [Promise\<User\>](/guides/user/user-profile.md)

#### 示例数据

```json
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
```

## 搜索用户
>根据关键字根据关键字模糊搜索用户，该接口为分页接口。你可以搜索整个用户目录中的用户、搜索某个部门（包含其子节点）下的用户、搜索某个角色下的用户、搜索某个分组下的用户，同时可以获取到用户的自定义数据。

```js
UsersManagementClient().search(query, options)
```


#### 参数

- `query` \<string\> 搜索内容
- `options` \<object\> 选项
  - `options.page` \<number\> 默认值为 : `1`。
  - `options.limit` \<number\> 默认值为 : `10`。
  - `options.withCustomData` \<boolean\> 是否获取自定义数据，默认为 false；如果设置为 true，将会在 `customData` 字段返回用户的所有自定义数据。
  - `options.fields` \<string[]\> 搜索用户字段，如果不指定，默认会从 `username`、`nickname`、`email`、`phone`、`company`、`name`、`givenName`、`familyName`、`middleName`、`profile`、`preferredUsername` 这些字段进行模糊搜索。
    如果你需要精确查找，请使用 find 方法。
  - `options.departmentOpts` \<Array\<object\>\> 限制条件，用户所在部门
    - `options.departmentOpts.departmentId` \<string\> 部门 ID
    - `options.departmentOpts.includeChildrenDepartments` \<boolean\> 是否搜索子节点
  - `options.groupOpts` \<Array\<object\>\> 限制条件，用户所在分组
    - `options.groupOpts.code` \<string\> 分组 code
  - `options.roleOpts` \<Array\<object\>\> 限制条件，用户所属角色
    - `options.roleOpts.namespace` \<string\> 角色命名空间
    - `options.roleOpts.code` \<string\> 角色 code


#### 示例

- 模糊搜索用户池下面的所有用户

```javascript
const { totalCount, list } = await managementClient.users.search('Bob')
```

- 搜索某个部门下的用户

```javascript
// 部门 ID
const departmentId = 'xxxx'
const { totalCount, list } = await managementClient.users.search('Bob', {
  departmentOpts: [
    {
      departmentId,
      // 同时搜索此节点的所有自节点中的用户
      includeChildrenDepartments: true
    }
  ]
})
```

- 同时获取用户的自定义数据

```javascript
const { totalCount, list } = await managementClient.users.search('Bob', {
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

## 强制下线一批用户
>强制让一批用户在 Authing 下线。

```js
UsersManagementClient().kick(userIds)
```


#### 参数

- `userIds` \<string[]\> 用户 ID 数组

#### 示例

```javascript
let data = await managementClient.users.kick(['USER_ID1', 'USER_ID2'])
```

#### 返回值

```json
{ "code": 200, "message": "强制下线成功" }
```

## 检测密码是否合法
> 检测密码是否合法

```js
ManagementClient().isPasswordValid(password)
```


#### 参数

- `isPasswordValid` \<string\> 要检测的密码

#### 示例

```javascript
// 检测 token 的最新状态，能够获取到该用户对应的 token

const data = await managementClient.isPasswordValid(password)
```

#### 返回值

-

```js

Promise<{
  valid: boolean
  message: string
}>

```

## 获取用户分组列表
>获取用户的分组列表。

```js
UsersManagementClient().listGroups(userId)
```


#### 参数

- `userId` \<string\> 用户 ID

#### 示例

```javascript
const { list, totalCount } = await managementClient.users.listGroups('USERID')
```

#### 返回值

- `Promise<DeepPartial<PaginatedGroups>>`

#### 示例数据

```json
{
  "totalCount": 1,
  "list": [
    {
      "code": "test_group",
      "name": "testGroup",
      "description": null,
      "createdAt": "2021-03-15T18:56:56+08:00",
      "updatedAt": "2021-03-15T18:56:56+08:00"
    }
  ]
}
```

## 加入分组
>将用户加入分组。

```js
UsersManagementClient().addGroup(userId, group)
```


#### 参数

- `userId` \<string\> 用户 ID
- `group` \<string\> 分组 code，如 `admin`。

#### 示例

```javascript
const { code, message } = await managementClient.users.addGroup(
  'USERID',
  'admin'
)
```

#### 返回值

- `Promise<CommonMessage>`

## 退出分组
> 退出分组

```js
UsersManagementClient().removeGroup(userId, group)
```


#### 参数

- `userId` \<string\> 用户 ID
- `group` \<string\> 分组 code

#### 示例

```javascript
const { code, message } = await managementClient.users.removeGroup(
  'USERID',
  'GROUP_CODE'
)
```

#### 返回值

- `Promise<CommonMessage>`

## 获取用户角色列表
>获取用户在某个权限分组下面的角色列表。

```js
UsersManagementClient().listRoles(userId, namespace)
```


#### 参数

- `userId` \<string\> 用户 ID
- `namespace`: 权限分组的 code，默认为默认权限分组。

#### 示例

```javascript
const { list, totalCount } = await managementClient.users.listRoles('USERID')
```

#### 返回值

- `Promise<DeepPartial<PaginatedRoles>>`

#### 示例数据

```json

{
  totalCount: 20,
  list: [
    {
      /** 权限组 code */
      namespace: 'default',
      /** 唯一标志 code */
      code: 'example_code',
      /** 资源描述符 arn */
      arn: 'arn:xxxxxxx:xxxxxxx',
      /** 角色描述 */
      description?: '角色 1',
      /** 是否为系统内建，系统内建的角色不能删除 */
      isSystem?: false,
      /** 创建时间 */
      createdAt?: '2020-10-20T13:48:11.288Z',
      /** 修改时间 */
      updatedAt?: '2020-10-20T13:48:11.288Z',
      /** 被授予此角色的用户列表 */
      users: PaginatedUsers,
      /** 父角色 */
      parent?: null,
    }
  ]
};

```

## 添加角色
> 将用户加入角色

```js
UsersManagementClient().addRoles(userId, roles, namespace)
```


#### 参数

- `userId` \<string\> 用户 ID
- `roles` \<string\> 角色 code 列表
- `namespace` \<string\> 权限组 Code
#### 示例

```javascript
const { code, message } = await managementClient.users.addRoles('USERID', [
  'ROLEA',
])
```

#### 返回值

- `Promise<CommonMessage>`

## 移除角色
> 将用户从角色中移除

```js
UsersManagementClient().removeRoles(userId, roles, namespace)
```


#### 参数

- `userId` \<string\> 用户 ID
- `roles` \<string\> 角色 code 列表
- `namespace` \<string\> 权限组 Code
#### 示例

```javascript
const { code, message } = await managementClient.users.removeRoles('USERID', [
  'ROLEA',
])
```

#### 返回值

- `Promise<CommonMessage>`

## 判断用户是否有某个角色
> 判断用户是否有某个角色

```js
UsersManagementClient.hasRole(userId, roleCode, namespace)
```


#### 参数

- `userId` \<string\> 用户 ID；
- `roleCode` \<string\> 角色 Code；
- `namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。

#### 示例

```javascript
managementClient.users.hasRole('USERID', 'roleCode', 'default')
```

#### 示例数据

```json
true
```

## 获取用户被授权的所有资源列表
> 获取一个用户被授权的所有资源，用户被授权的所有资源里面包括从角色、分组、组织机构继承的资源。

```js
UsersManagementClient.listAuthorizedResources(userId, namespace)
```


#### 参数

- `userId` \<string\> 用户 ID；
- `namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。

#### 示例

```javascript
managementClient.users.listAuthorizedResources('USERID', 'code')
```

#### 示例数据

- `type` 为资源类型，一共有以下几种资源类型
  - `DATA`: 数据类型；
  - `API`: API 类型数据；
  - `MENU`: 菜单类型数据；
  - `BUTTON`: 按钮类型数据；
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

## 获取用户审计日志
>用户审计日志列表

```js
UsersManagementClient().listUserActions(page, limit)
```


#### 参数

- `options` \<object\> 配置对象。
- `options.clientIp` \<string\> 客户端 IP 地址, 可选值。
- `options.operationName` \<string\> 操作类型, 可选值。
- `options.operatoArn` \<string\> 用户 Arn 通过 searchUser 方法获得, 可选值。
- `options.page` \<number\> 页码数, 从 1 开始 默认值为 : `1`, 可选值。
- `options.limit` \<number\> 每页包含的用户数 默认值为 : `10`, 可选值。

#### 示例

```javascript
const user = await managementClient.users.listUserActions({
  page: 1,
  limit: 10,
})
```


## 刷新用户 Token
> 刷新用户 Token

```js
UsersManagementClient().refreshToken(id)
```
#### 参数

- `id` \<string\>  用户 ID

#### 示例

```js
   const user = await managementClient.users.create({
    username: generateRandomString(),
    password: '123456!'
  });
  const { token } = await managementClient.users.refreshToken(user.id);
```
#### 示例数据
```json
{
	"iat": 1632462741,
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXo",
	"exp": 1633758741
}
```


## 获取用户所在组织机构
> 获取用户所在组织机构

```js
UsersManagementClient().listOrgs(userId)
```
#### 参数
- `userId` \<string\>  用户 ID
#### 示例

```js
management.users.listOrgs('613ad7c00eb52ddadba7efdc')
```


## 获取用户所在部门
> 获取用户所在部门

```js
UsersManagementClient().listDepartment(userId)
```
#### 参数
- `userId` \<string\>  用户 ID
#### 示例

```js
management.users.listDepartment('613872b19c90be7d4da44466')
```
#### 示例数据
```json
{
	"departments": {
		"totalCount": 0,
		"list": []
	}
}
```



## 发送首次登录验证邮件
> 发送首次登录验证邮件

```js
UsersManagementClient().sendFirstLoginVerifyEmail(options)
```
#### 参数
- `options` \<object\>   
- `options.userId` \<string\>  用户 ID
- `options.appId` \<string\>  应用 ID
#### 示例

```js
management.users.sendFirstLoginVerifyEmail({appId:"6139c4d24e78a4d706b7545b", userId:"613872b19c90be7d4da44466"})
```
#### 示例数据
```json
{
  "message": "发送成功",
  "code": 200
}
```



## 用户退出登录
> 用户退出登录

```js
UsersManagementClient().logout(options) 
```
#### 参数
- `options` \<object\>  
- `options.userId` \<string\>  用户 ID
- `options.appId` \<string\>  应用 ID
#### 示例

```js
management.users.logout("613872b19c90be7d4da44466")
```
#### 示例数据
```json
{
  "message": "退出成功",
  "code": 200
}
```

## 检查用户登录状态
> 检查用户登录状态

```js
UsersManagementClient().checkLoginStatus(userId, appId, deviceId)
```
#### 参数
- `userId` \<string\>  用户 ID
- `appId` \<string\>  应用 ID
- `deviceId` \<string\>  设备 ID
#### 示例

```js
management.users.checkLoginStatus("613872b19c90be7d4da44466")
```



## 获取用户所在的租户

> 获取用户所在的租户

```js
UsersManagementClient().getUserTenants(userId)
```

#### 参数

- `userId` \<string\>  用户 ID

#### 示例

```js
managementClient.users.getUserTenants('6194bb53a6c4dca57363182c')
```



## 给用户绑定一个身份信息

> 用户池管理员手动将来自外部身份源的身份信息绑定到用户上。绑定完成后，可以用执行过绑定操作的身份源登录到对应的 Authing 用户。

```js
UsersManagementClient().linkIdentity(options)
```

#### 参数

- `options` \<object\>  请求参数对象，包含以下字段：
- `userId` \<string\>  必传，进行绑定操作的 Authing 用户 ID。
- `userIdInIdp` \<string\>  必传，用户在该外部身份源的唯一标识，需要从外部身份源的认证返回值中获取。
- `extIdpId` \<string\>  必传，身份源 ID，用于指定该身份属于哪个身份源。
- `identifier` \<string\>  必传，身份源连接唯一标识，用于指定该身份属于哪个身份源。
- `type` \<string\>  非必传，表示该条身份的具体类型，可从用户身份信息的 `type` 字段中获取。如果不传，默认为 `generic`。
- `isSocial` \<boolean\>  已废弃，可任意传入，未来将移除该字段。

#### 示例

```javascript
const result = await managementClient.users.linkIdentity({
    userId: '619b07826feaa09f07b598de',
    userIdInIdp: 'user001',
    isSocial: true,
    type: 'openid',
    identifier: 'wechat',
  });
```

#### 返回示例

```json
{ code: 200, message: '绑定成功' }
```



## 解除绑定用户在身份源下的所有身份信息

> 解除绑定用户在某个身份源下的所有身份信息。解绑后，将无法使用执行过解绑操作的身份源登录到对应的 Authing 用户，除非重新绑定身份信息。

```js
UsersManagementClient().unlinkIdentity(options)
```

#### 参数

- `options` \<object\>  请求参数对象，包含以下字段：
- `userId` \<string\>  必传，进行解绑操作的 Authing 用户 ID。
- `identifier` \<string\>  必传，身份源连接唯一标识，用于指定该身份属于哪个身份源。
- `type` \<string\>  非必传，表示该条身份的具体类型，可从用户身份信息的 `type` 字段中获取。如果传入，只删除 `type` 字段与传入值相同的身份。
- `extIdpId` \<string\>  必传，身份源 ID，用于指定该身份属于哪个身份源。
- `isSocial` \<boolean\>  已废弃，可任意传入，未来将移除该字段。

#### 示例

```javascript
const result = await managementClient.users.unlinkIdentity({
    userId: '619b07826feaa09f07b598de',
    isSocial: true,
    type: 'openid',
    identifier: 'wechat',
  });
```

#### 返回示例

```json
{ code: 200, message: '解绑成功' }
```

