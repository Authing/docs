---
meta:
  - name: description
    content: 管理用户
---

# 管理用户

<LastUpdated/>

此模块可以进行用户目录增删改查、搜索用户、管理用户分组、管理用户角色、管理用户策略授权等操作。

请通过以下方式使用该模块：

```python
from authing.v2.management import ManagementClient, ManagementClientOptions

management_client = ManagementClient(
  options=ManagementClientOptions(
    user_pool_id='AUTHING_USERPOOL_ID',
    secret='AUTHING_USERPOOL_SECRET',
))

management_client.users.list # 获取用户列表
management_client.users.create # 创建用户
management_client.users.list_roles # 获取用户角色列表
management_client.users.search # 搜索用户
```

## 创建用户
>此接口将以管理员身份创建用户，不需要进行手机号验证码检验等安全检测。用户的手机号、邮箱、用户名、externalId 用户池内唯一

```python
def create(self, userInfo, keep_password=False)
```

#### 参数

- `keep_password` \<bool\>: 该参数一般在迁移旧有用户数据到 Authing 的时候会设置。开启这个开关，password 字段会直接写入 Authing 数据库，Authing 不会再次加密此字段。如果你的密码不是明文存储，你应该保持开启，并编写密码函数计算。详情请见 [使用 SDK 导入用户](/guides/migrations/use-api.md)
- `userInfo` \<dict\> 用户资料
- `userInfo.email` \<str\> 邮箱，用户池内唯一
- `userInfo.emailVerified` \<bool\> 邮箱是否已验证
- `userInfo.phone` \<str\> 手机号
- `userInfo.phoneVerified` \<bool\> 手机号是否验证
- `userInfo.unionid` \<str\> 以社会化登录的用户该字段为用户在第三方社会化登录服务商中的唯一 ID
- `userInfo.openid` \<str\> 微信登录返回的 openid
- `userInfo.password` \<str\> 密码
- `userInfo.registerSource` \<str\> 注册来源，可以多选
- `userInfo.username` \<str\> 用户名
- `userInfo.nickname` \<str\> 昵称
- `userInfo.photo` \<str\> 头像
- `userInfo.company` \<str\> 公司
- `userInfo.browser` \<str\> 浏览器
- `userInfo.loginsCount` \<int\> 登录次数，当你从原有用户系统迁移到 {{$localeConfig.brandName}} 时可以设置该字段。
- `userInfo.lastLogin` \<str\> 上次登录时间, 符合 [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) 格式的时间字符串。(如 "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")
- `userInfo.lastIP` \<str\> 用户最近一次登录（或其他活动）的 IP
- `userInfo.signedUp` \<str\> 注册时间，符合 [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) 格式的时间字符串。(如 "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")
- `userInfo.blocked` \<bool\> 账号是否被锁定
- `userInfo.isDeleted` \<bool\> 标记账号是否被删除
- `userInfo.device` \<str\> 设备
- `userInfo.lastIP` \<str\> 最近登录的 IP
- `userInfo.name` \<str\> Name
- `userInfo.givenName` \<str\> Given Name
- `userInfo.familyName` \<str\> Family Name
- `userInfo.middleName` \<str\> Middle Name
- `userInfo.profile` \<str\> Profile Url
- `userInfo.preferredUsername` \<str\> Preferred Name
- `userInfo.website` \<str\> 个人网站
- `userInfo.gender` \<str\> 性别, M（Man） 表示男性、F（Female） 表示女性、未知表示 U（Unknown）
- `userInfo.birthdate` \<str\> 生日
- `userInfo.zoneinfo` \<str\> 时区
- `userInfo.locale` \<str\> 语言
- `userInfo.address` \<str\> 地址
- `userInfo.streetAddress` \<str\> 街道地址
- `userInfo.locality` \<str\>
- `userInfo.region` \<str\> 地域
- `userInfo.postalCode` \<str\> 邮编
- `userInfo.city` \<str\> 城市
- `userInfo.province` \<str\> 省份
- `userInfo.country` \<str\> 国家
- `userInfo.externalId` \<str\> 内部员工 ID，此项在用户目录中为唯一。

#### 示例

```python
user = management_client.users.create(
  userInfo={
    'username': 'bob',
    'password': '123456',
})

user = management_client.users.create(
  userInfo={
    'username': 'bob',
    'password': '123456',
    'phone': '176xxxx6754', # 由于是管理员操作，所以不需要检验手机号验证码, 如果你需要检验，请使用  AuthenticationClient
    'nickname': 'Nick',
    'loginsCount': 2, # 原有用户系统记录的用户登录次数
    'signedUpd': '2020-10-15T17:55:37+08:00', # 原有用户系统记录的用户注册时间
})
```

#### 返回值

- [用户信息](/guides/user/user-profile.md)

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
>修改用户资料
```python
def update(self, userId, updates)
```

#### 参数

- `userId` \<str\> 用户 ID
- `updates` \<UpdateUserInput\> 修改的用户资料
- `updates.email` \<str\> 邮箱
- `updates.emailVerified` \<bool\> 邮箱是否已验证
- `updates.phone` \<str\> 手机号
- `updates.phoneVerified` \<bool\> 手机号是否验证
- `updates.unionid` \<str\> 以社会化登录的用户该字段为用户在第三方社会化登录服务商中的唯一 ID
- `updates.openid` \<str\> 微信登录返回的 openid
- `updates.password` \<str\> 密码
- `updates.registerSource` \<str\> 注册来源，可以多选
- `updates.tokenExpiredAt` \<str\> token 过期时间，符合 [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) 格式的时间字符串。(如 "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")。
  将该字段设置为小于当前时间可以让用户的 token 失效
- `updates.username` \<str\> 用户名
- `updates.nickname` \<str\> 昵称
- `updates.photo` \<str\> 头像
- `updates.company` \<str\> 公司
- `updates.browser` \<str\> 浏览器
- `updates.loginsCount` \<int\> 登录次数，当你从原有用户系统迁移到 {{$localeConfig.brandName}} 时可以设置该字段。
- `updates.lastLogin` \<str\> 上次登录时间, 符合 [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) 格式的时间字符串。(如 "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")
- `updates.lastIP` \<str\> 用户最近一次登录（或其他活动）的 IP
- `updates.signedUp` \<str\> 注册时间，符合 [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) 格式的时间字符串。(如 "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")
- `updates.blocked` \<bool\> 账号是否被锁定
- `updates.device` \<str\> 设备
- `updates.lastIP` \<str\> 最近登录的 IP
- `updates.name` \<str\> Name
- `updates.givenName` \<str\> Given Name
- `updates.familyName` \<str\> Family Name
- `updates.middleName` \<str\> Middle Name
- `updates.profile` \<str\> Profile Url
- `updates.preferredUsername` \<str\> Preferred Name
- `updates.website` \<str\> 个人网站
- `updates.gender` \<str\> 性别, M（Man） 表示男性、F（Female） 表示女性、未知表示 U（Unknown）
- `updates.birthdate` \<str\> 生日
- `updates.zoneinfo` \<str\> 时区
- `updates.locale` \<str\> 语言
- `updates.address` \<str\> 地址
- `updates.streetAddress` \<str\> 街道地址
- `updates.locality` \<str\>
- `updates.region` \<str\> 地域
- `updates.postalCode` \<str\> 邮编
- `updates.city` \<str\> 城市
- `updates.province` \<str\> 省份
- `updates.country` \<str\> 国家
- `updates.externalId` \<str\> 用户外部 ID

#### 示例

```python
user = management_client.users.update(
  id='xxxxxxx'
  updates={
    'nickname': 'Nick',
})

user = management_client.users.update(
  id='xxxxxxx'
  updates={
    'nickname': 'Nick',
    'phone': '176xxxx6754', # 由于是管理员操作，所以不需要检验手机号验证码, 如果你需要检验，请使用  AuthenticationClient
    'tokenExpiredAt': '2020-10-15T17:55:37+08:00',
})
```

#### 返回值

- [用户信息](/guides/user/user-profile.md)

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
>通过用户 ID 获取用户详情，如果你想通过 token 获取用户详情，请使用 [AuthenticationClient SDK](/reference-new/web/sdk-for-node/authentication/AuthenticationClient.md#获取当前登录的用户信息)

```python
def detail(self, user_id, with_custom_data=False)
```

#### 参数

- `user_id` \<str\> 用户 ID
- `with_custom_data`: \<bool\> 是否获取自定义数据，默认为 false；如果设置为 true，将会在 `customData` 字段返回用户的所有自定义数据。示例：
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

```python
data = management_client.users.detail(
  user_id="USERID"
)
```

- 同时获取用户的自定义数据

```python
data = management_client.users.detail(
  user_id="USERID",
  with_custom_data=True
)
```

#### 返回值

- [用户信息](/guides/user/user-profile.md)

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
>获取用户的自定义数据。你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)

```python
def get_udf_value(self, user_id)
```
#### 参数

- `user_id` \<str\> 用户 ID

#### 示例

```python
data = await management_client.users.get_udf_value('USER_ID')
```

#### 示例数据

```json
{
  "school": "华中科技大学",
  "age": 20
}
```

## 批量获取自定义数据

>批量获取多个用户的自定义数据。你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)

```python
def get_udf_value_batch(self, user_ids)
```

#### 参数

- `userIds` \<str\> 用户 ID 列表

#### 示例

```python
data = await management_client.users.get_udf_value_batch(
  user_ids=[
    'USER_ID1',
    'USER_ID2',
  ]
)
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
>设置用户的自定义数据。你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配

```python
def set_udf_value(self, user_id, data)
```
#### 参数
- `user_id` \<str\> 用户 ID
- `data` \<dict>\ 自定义字段数据，类型为一个对象
#### 示例

```python
management_client.users.set_udf_value(
    user_id=user.get('id'),
    data={
        'school': '华中科技大学',
        'age': 22
    }
)
```

## 批量设置自定义数据
>批量设置多个用户的自定义数据。你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。如果设置失败，会抛出异常，你需要对异常进行捕捉

```python
def set_udf_value_batch(self, data)
```


#### 参数

- `data` \<dict\> 输入数据，结构请见示例

#### 示例

```python
user1_id = 'xxx'
user2_id = 'xxx'
management_client.users.set_udf_value_batch(
    {
        user1_id: {
            'school': '清华大学',
            'age': 21
        },
        user2_id: {
            'school': '北京大学',
            'age': 22
        }
    }
)
```

## 删除自定义数据
>删除自定义数据

```python
def remove_udf_value(self, user_id, key)
```


#### 参数

- `user_id` \<str\> 用户 ID
- `key` \<str\> 自定义字段的 key

#### 示例

```python
user_id = 'xxx'
management_client.users.remove_udf_value(
  user_id=user_id,
  key='school'
)
```

## 删除用户
>通过用户 ID 删除用户。删除用户会联级删除此用户管理的所有相关数据，无法恢复，请谨慎操作
```python
def delete(self, userId)
```
#### 参数

- `userId` \<str\> 用户 ID

#### 示例

```python
data = management_client.users.delete(
  userId="USERID1"
)
```

## 批量删除用户
>批量删除用户，如果传入了不存在的用户 ID，会提示错误
```python
def delete_many(self, userIds)
```
#### 参数

- `userIds` \<str[]\> 用户 ID 列表

#### 示例

```python
data = management_client.users.delete(
  userIds=["USERID1", "USERID2"]
)
```

## 批量获取用户
>通过 id、username、email、phone、email、externalId 批量获取用户详情。一次最多支持查询 80 个用户

```python
def batch_get(self, identifiers, query_field='id', with_custom_data=False)
```


#### 参数

- `identifiers` \<list\> 需要查询的数据列表，如用户 ID 列表、手机号列表
- `query_field` \<str\> 列表类型，可选值为 'id' ,'username' ,'phone' ,'email', 'externalId'，默认为 'id'
- `with_custom_data`: \<boolean\> 是否获取自定义数据，默认为 false；如果设置为 true，将会在 `customData` 字段返回用户的所有自定义数据。示例：
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

- 通过 ID 查询

```python
data = management_client.users.batch_get(
  identifiers=["USERID1", "USERID2"],
  query_field='id'
)
```

- 通过手机号查询

```python
data = management_client.users.batch_get(
  identifiers=["176xxxx6754", "158xxxx4186"],
  query_field='phone'
)
```

- 同时获取用户自定义数据

```python
data = management_client.users.batch_get(
  identifiers=["176xxxx6754", "158xxxx4186"],
  query_field='phone',
  with_custom_data=True
)
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
    "externalId": null
  }
]
```


## 获取用户列表
>获取用户池用户列表，该接口为分页接口

```python
def list(self, page=1, limit=10)
```


#### 参数

- `page` \<int\> 页码数, 从 1 开始 默认值为 : `1`
- `limit` \<int\> 每页包含的用户数 默认值为 : `10`

#### 示例

```python
data = management_client.users.list()
totalCount = data['totalCount'] # 总数
users = data['list'] # 当前页
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

## 获取已归档用户列表
>获取用户池已归档用户列表

```python
def list_archived_users(self, page=1, limit=10)
```


#### 参数

- `page` \<int\> 页码数, 从 1 开始 默认值为 : `1`
- `limit` \<int\> 每页包含的用户数 默认值为 : `10`

#### 示例

```python
data = management_client.users.list_archived_users()
```

#### 示例数据

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

## 检查用户是否存在
>通过用户名、邮箱、手机号或者 ExternalId 检查用户是否存在

```python
def exists(self, username=None, email=None, phone=None, external_id=None)
```


#### 参数

- `username` \<str\> 用户名，区分大小写
- `email` \<str\> 邮箱，**邮箱不区分大小写**
- `phone` \<str\> 手机号
- `externalId` \<str\> External ID

#### 示例

- 查询用户名 `test` 是否存在

```python
exists = management_client.users.exists(
  username='test'
)
```

- 通过手机号查询用户是否存在

```python
exists = management_client.users.exists(
  phone='176xxxx6754'
)
```

#### 返回值
```python
如果用户存在，返回 True 如果用户不存在，返回 False

```

## 查找用户
>通过用户名、邮箱、手机号、External ID 精准查找用户

```python
def find(self, email=None, username=None, phone=None, external_id=None, with_custom_data=False)
```


#### 参数

- `username` \<str\> 用户名，区分大小写
- `email` \<str\> 邮箱，邮箱不区分大小写
- `phone` \<str\> 手机号
- `external_id`: External ID
- `with_custom_data`: \<boolean\> 是否获取自定义数据，默认为 false；如果设置为 true，将会在 `customData` 字段返回用户的所有自定义数据。示例：

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

- 通过用户名 `test` 查找

```python
user = management_client.users.find(
  username='test'
)
```

- 通过手机号查找用户

```python
user = management_client.users.find(
  phone='176xxxx6754'
)
```

- 同时获取用户自定义数据

```python
user = management_client.users.find(
  phone='176xxxx6754',
  with_custom_data=True
)
```

#### 返回值

- [用户信息](/guides/user/user-profile.md)

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
>根据关键字根据关键字模糊搜索用户，该接口为分页接口。模糊搜索用户

```python
def search(self, 
  query, 
  page=1, 
  limit=10, 
  department_opts=None, 
  group_opts=None, 
  role_opts=None,
  with_custom_data=False
)
```


#### 参数

- `query` \<str\> 搜索内容
- `page` \<int\> 默认值为 : `1`
- `limit` \<int\> 默认值为 : `10`
- `department_opts` \<list\> 限制条件，用户所在部门
  - `department_opts.departmentId` \<str\> 部门 ID
  - `department_opts.includeChildrenDepartments` \<boolean\> 是否搜索子节点
- `group_opts` \<list\>\> 限制条件，用户所在分组
  - `group_opts.code` \<str\> 分组 code
- `role_opts` \<list\>\> 限制条件，用户所属角色
  - `role_opts.namespace` \<str\> 角色命名空间
  - `role_opts.code` \<str\> 角色 code
- `with_custom_data`: \<boolean\> 是否获取自定义数据，默认为 false；如果设置为 true，将会在 `customData` 字段返回用户的所有自定义数据。示例：

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

- 模糊搜索用户

```python
query = 'Bob'
data = management_client.users.search(query=query)
totalCount = data['totalCount'] # 总数
users = data['list'] # 角色列表
```

- 部门下模糊搜索用户

模糊搜索部门（包含此部门的子部门）下的用户

```python
query = 'Bob'
data = management_client.users.search(
  query=query,
  department_opts=[
    {
      'departmentId': '部门 ID',
      'includeChildrenDepartments': True
    }
  ]
)
```

- 角色内模糊搜索用户

```python
query = 'Bob'
data = management_client.users.search(
  query=query,
  role_opts=[
    {
      'namespace': '权限分组 namespace',
      'code': 'roleA'
    }
  ]
)
```

- 分组内模糊搜索用户

```python
query = 'Bob'
data = management_client.users.search(
  query=query,
  group_opts=[
    {
      'code': 'groupA'
    }
  ]
)
```

- 同时获取用户的自定义数据

```python
query = 'Bob'
data = management_client.users.search(
  query=query,
  with_custom_data=True
)
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

## 强制下线一批用户
>强制让一批用户在 Authing 下线

```python
def kick(self, user_ids)
```


#### 参数

- `user_ids` \<str[]\> 用户 ID 数组

#### 示例

```python
success = management_client.users.kick(
  user_ids=['USER_ID1', 'USER_ID2']
)
```

#### 返回值

```json
{ "code": 200, "message": "强制下线成功" }
```


## 获取用户分组列表
>获取用户的分组列表
```python
def list_groups(self, userId)
```


#### 参数

- `userId` \<str\> 用户 ID

#### 示例

```python
data = management_client.users.list_groups()
totalCount = data['totalCount'] # 总数
users = data['list'] # 当前页
```

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
>将用户加入分组
```python
def add_group(self, userId, group)
```


#### 参数

- `userId` \<str\> 用户 ID
- `group` \<str\> 分组 code

#### 示例

```python
data = management_client.users.add_group('USER_ID', 'GEOUP_CODE')
code, message = data['code'], data['message']
```

## 退出分组
>将用户移出分组
```python
def remove_group(self, userId, group)
```

#### 参数

- `userId` \<str\> 用户 ID
- `group` \<str\> 分组 code

#### 示例

```python
data = management_client.users.remove_group('USER_ID', 'GEOUP_CODE')
code, message = data['code'], data['message']
```

## 获取用户角色列表
>获取用户在某个权限分组下面的角色列表

```python
def list_roles(self, userId, namespace=None)
```


#### 参数

- `userId` \<str\> 用户 ID
- `namespace` \<str\> 权限分组的 code，默认为默认权限分组。

#### 示例

```python
data = management_client.users.list_roles(
  namespace='default'
)
totalCount = data['totalCount'] # 总数
users = data['list'] # 角色列表
```

#### 示例数据
```json

{
  "totalCount": 20,
  "list": [
    {
     
      "namespace": "default",
      /** 唯一标志 code */
      "code": "example_code",
      /** 资源描述符 arn */
      "arn": "arn:xxxxxxx:xxxxxxx",
      /** 角色描述 */
      "description": "角色 1",
      /** 是否为系统内建，系统内建的角色不能删除 */
      "isSystem": false,
      /** 创建时间 */
      "createdAt": "2020-10-20T13:48:11.288Z",
      /** 修改时间 */
      "updatedAt": "2020-10-20T13:48:11.288Z",
      /** 被授予此角色的用户列表 */
      "users": "PaginatedUsers",
      /** 父角色 */
      "parent": null
    }
  ]
}

```

## 添加角色
>将用户加入角色

```python
def add_roles(self, userId, roles, namespace=None)
```


#### 参数

- `userId` \<str\> 用户 ID
- `roles` \<str\> 角色 code 列表
- `namespace` \<str\> 权限分组的 code，默认为默认权限分组

#### 示例

```python
data = management_client.users.add_roles(
   userId='USERID',
   roles=['ROLE1', 'ROLE2']
)
totalCount = data['totalCount'] # 最新的总数
users = data['list'] # 最新的角色列表
```

## 移除角色
>将用户从角色中移除

```python
def remove_roles(self, userId, roles, namespace=None)
```


#### 参数

- `userId` \<str\> 用户 ID
- `roles` \<str\> 角色 code 列表

#### 示例

```python
data = management_client.users.remove_roles(
   userId='USERID',
   roles=['ROLE1', 'ROLE2']
)
totalCount = data['totalCount'] # 最新的总数
users = data['list'] # 最新的角色列表
```

## 判断用户是否有某个角色
>判断用户是否有某个角色

```python
def has_role(self, user_id, role_code, namespace=None)
```


#### 参数

- `user_id` \<str\> 用户 ID
- `role_code` \<str\> 角色 Code
- `namespace` \<str\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)

#### 示例

```python
has_role = management_client.users.has_role(
  user_id='USERID',
  role_code='roleCode',
  namespace='default'
)
```

#### 示例数据

```python
bool
```

## 获取用户被授权的所有资源列表
>获取一个用户被授权的所有资源，用户被授权的所有资源里面包括从角色、分组、组织机构继承的资源

```python
def list_authorized_resources(self,
 user_id,
 namespace,
 resource_type=None)
```


#### 参数

- `user_id` \<str\> 用户 ID
- `namespace` \<str\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)
- `resource_type` \<str\> 资源类型，可选值包含 DATA、API、MENU、UI、BUTTON

#### 示例

```python
data = management_client.users.list_authorized_resources(
  user_id='xxx',
  namespace='default',
  resource_type='DATA'
)
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


## 获取审计日志列表
> 审计日志列表

```python
def list_user_actions(
  self, 
  page=1, 
  limit=10, 
  client_ip=None, 
  operation_name=None, 
  operato_arn=None
)
```



#### 参数

- `page` \<int\> 页码数, 从 1 开始 默认值为 : `1`, 可选值
- `limit` \<int\> 每页包含的用户数 默认值为 : `10`, 可选值
- `client_ip` \<str\> 客户端 IP 地址, 可选值
- `operation_name` \<str\> 操作类型, 可选值
- `operato_arn` \<str\> 用户 Arn 通过 searchUser 方法获得, 可选值

#### 示例

```python
data = management_client.users.list_user_actions()
```


## 刷新用户 Token
> 刷新用户 Token

```python
def refresh_token(self, userId)
```
#### 参数
 
- `userId` \<str\>  用户 ID

#### 示例

```python
user = management.users.create(
            userInfo={
                'username': get_random_string(10),
                'password': get_random_string(10)
            }
        )
data = management.users.refresh_token(userId=user['id'])
token, iat, exp = data['token'], data['iat'], data['exp']
```
#### 示例数据
```json
{
	"iat": 1632462741,
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXo",
	"exp": 1633758741
}
```



## 获取策略列表
> 获取策略列表

```python
def list_policies(self, userId, page=1, limit=10)
```
#### 参数

- `userId` \<str\>  用户 ID
- `page` \<int\> 页码数, 从 1 开始 默认值为 : `1`
- `limit` \<int\> 每页包含的用户数 默认值为 : `10`
#### 示例

```python
management.users.list_policies(userId=user['id'])
```
#### 示例数据
```json
{
  "totalCount": 1,
  "list": [{
    "targetType": "USER",
    "code": "ewaoadwbbd",
    "targetIdentifier": "614d68580d2abcd10f9e9a66"
  }]
}
```


## 批量添加策略
> 批量添加策略

```python
def add_policies(self, userId, policies)
```
#### 参数

- `userId` \<str\>  用户 ID
- `policies` \<list\> 策略集合
#### 示例

```python
policy = management.policies.create(
            code=get_random_string(10),
            statements=[
                {
                    'resource': 'book:123',
                    'actions': ['books:read'],
                    'effect': 'ALLOW'
                }
            ]
        )
management.users.add_policies(userId=user['id'],
                              policies=[policy['code']])
```
#### 示例数据
```json
{
  "message": "授权成功",
  "code": 200
}
```



## 批量移除策略
> 批量移除策略

```python
def remove_policies(self, userId, policies)
```
#### 参数

- `userId` \<str\>  用户 ID
- `policies` \<list\> 策略集合
#### 示例

```python
management.users.remove_policies(
            userId=user['id'],
            policies=[policy['code']]
        )
```
#### 示例数据
```json
{
  "message": "取消授权成功",
  "code": 200
}
```



## 获取当前用户的自定义数据列表
> 获取当前用户的自定义数据列表

```python
def list_udv(self, userId)
```
#### 参数
- `userId` \<str\>  用户 ID 
#### 示例

```python
management.users.list_udv(user['id'])
```
#### 示例数据
```json
[{
  "dataType": "NUMBER",
  "value": 18,
  "key": "age",
  "label": "学校"
}]
```


## 添加自定义数据
> 添加自定义数据

```python
def set_udv(self, userId, key, value)
```
#### 参数
- `userId` \<str\>  用户 ID
- `key` \<str\>  自定义 Key
- `value` \<str\>  自定义 Value
#### 示例

```python
management.users.set_udv(
            userId=user['id'],
            key='is_boss',
            value=False
        )
```
#### 示例数据
```json
[{
  "dataType": "BOOLEAN",
  "value": "false",
  "key": "is_boss",
  "label": "是否为 boss"
}]
```



## 移除自定义数据
> 移除自定义数据

```python
def remove_udv(self, userId, key)
```
#### 参数
- `userId` \<str\>  用户 ID
- `key` \<str\>  自定义 Key
#### 示例

```python
management.users.remove_udv(
            userId=user['id'],
            key='age',
        )
```


## 获取用户所在组织机构
> 获取用户所在组织机构

```python
def list_org(self, user_id)
```
#### 参数
- `user_id` \<str\>  用户 ID
#### 示例

```python
management.users.list_org('613ad7c00eb52ddadba7efdc')
```


## 获取用户所在部门
> 获取用户所在部门

```python
def list_department(self, user_id)
```
#### 参数
- `user_id` \<str\>  用户 ID
#### 示例

```python
management.users.list_department('613872b19c90be7d4da44466')
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

```python
def send_first_login_verify_email(self, app_id, user_id)
```
#### 参数
- `user_id` \<str\>  用户 ID
- `app_id` \<str\>  应用 ID
#### 示例

```python
management.users.send_first_login_verify_email(app_id="6139c4d24e78a4d706b7545b",
                                                user_id="613872b19c90be7d4da44466")
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

```python
def logout(self, user_id, app_id=None)
```
#### 参数
- `user_id` \<str\>  用户 ID
- `app_id` \<str\>  应用 ID
#### 示例

```python
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

```python
def check_login_status(self, user_id, app_id=None, device_id=None)
```
#### 参数
- `user_id` \<str\>  用户 ID
- `app_id` \<str\>  应用 ID
- `device_id` \<str\>  设备 ID
#### 示例

```python
management.users.check_login_status("613872b19c90be7d4da44466")
```
