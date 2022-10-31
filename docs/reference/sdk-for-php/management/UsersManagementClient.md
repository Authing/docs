---
meta:
  - name: description
    content: 管理用户
---

# 管理用户

<LastUpdated/>

此模块可以进行用户目录增删改查、搜索用户、刷新用户 token、管理用户分组、管理用户角色、管理用户策略授权等操作。

请使用以下方式使用该模块：

```php
use Authing\Mgmt\ManagementClient;

// 初始化资源与权限客户端
// 通过用户池 id 与 用户池密码进行初始化
// $management = new ManagementClient("YOUR_USERPOOL_ID", "YOUR_USERPOOL_SECRET");
// 通过回调函数进行初始化
$management = new ManagementClient(function ($options) {
    $options->userPoolId = 'YOUR_USERPOOL_ID';
    $options->secret = 'YOUR_USERPOOL_SECRET';
});

$userManageClient = $management->users();
$userManageClient->create // 创建用户
$userManageClient->update   // 修改用户资料
$userManageClient->detail // 获取用户详情
```

## 创建用户

UsersManagementClient->create(CreateUserInput $userInfo, array $options = [])

此接口将以管理员身份创建用户，不需要进行手机号验证码检验等安全检测。用户的手机号、邮箱、用户名、externalId 用户池内唯一。

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
- `userInfo.isDeleted` \<boolean\> 标记账号是否被删除
- `userInfo.device` \<string\> 设备
- `userInfo.lastIP` \<string\> 最近登录的 IP
- `userInfo.name` \<string\> Name
- `userInfo.givenName` \<string\> Given Name
- `userInfo.familyName` \<string\> Family Name
- `userInfo.middleName` \<string\> Middle Name
- `userInfo.profile` \<string\> Profile Url
- `userInfo.preferredUsername` \<string\> Preferred Name
- `userInfo.website` \<string\> 个人网站
- `userInfo.gender` \<string\> 性别, M（Man） 表示男性、F（Female） 表示女性、未知表示 U（Unknown）
- `userInfo.birthdate` \<string\> 生日
- `userInfo.zoneinfo` \<string\> 时区
- `userInfo.locale` \<string\> 语言
- `userInfo.address` \<string\> 地址
- `userInfo.streetAddress` \<string\> 街道地址
- `userInfo.locality` \<string\> 地方
- `userInfo.region` \<string\> 地域
- `userInfo.postalCode` \<string\> 邮编
- `userInfo.city` \<string\> 城市
- `userInfo.province` \<string\> 省份
- `userInfo.country` \<string\> 国家
- `options` \<array\>
- `options['keepPassword']` \<boolean\> 该参数一般在迁移旧有用户数据到 Authing 的时候会设置。开启这个开关，password 字段会直接写入 Authing 数据库，Authing 不会再次加密此字段。如果你的密码不是明文存储，你应该保持开启，并编写密码函数计算。详情请见 [使用 SDK 导入用户](/guides/migrations/use-api.md)。

#### 示例

```php
use Authing\Types\CreateUserInput;

$email = "test@example.com";
$password = '123456';
$res = $userManageClient->create(
    (new CreateUserInput())
        ->withEmail($email)
        ->withPassword($password)
);
```

#### 示例数据

```json
{
    "id": "60a81fe4fa72b8bf2b25f659",
    "arn": "arn:cn:authing:5f819ffdaaf252c4df2c9266:user:60a81fe4fa72b8bf2b25f659",
    "userPoolId": "5f819ffdaaf252c4df2c9266",
    "status": "Activated",
    "username": null,
    "email": "test@example.com",
    "emailVerified": false,
    "phone": null,
    "phoneVerified": false,
    "unionid": null,
    "openid": null,
    "nickname": null,
    "registerSource": [
        "import:manual"
    ],
    "photo": "https:\/\/files.authing.co\/authing-console\/default-user-avatar.png",
    "password": "cf3f3cbe3cb001aed90f92c3f3d68696",
    "oauth": null,
    "token": null,
    "tokenExpiredAt": null,
    "loginsCount": 0,
    "lastLogin": null,
    "lastIP": null,
    "signedUp": "2021-05-21T21:02:28+00:00",
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
    "createdAt": "2021-05-21T21:02:28+00:00",
    "updatedAt": "2021-05-21T21:02:28+00:00",
    "externalId": null
}
```

## 修改用户资料

UsersManagementClient->update(string $userId, UpdateUserInput $updates)

#### 参数

- `userId` \<string\> 用户 ID
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
- `updates.gender` \<string\> 性别, M（Man） 表示男性、F（Female） 表示女性、未知表示 U（Unknown）
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

#### 示例

```php
use Authing\Types\UpdateUserInput;

$email = 'new email';
$name = 'new name';

$updates = (new UpdateUserInput())->withEmail($email)->withUsername($name);
$res = $userManageClient->update(
    '60b4a136d9xxxxcc3d87e55a',
    $updates
);
```

#### 示例数据

```json
{
    "id": "60a81fe4fa72b8bf2b25f659",
    "arn": "arn:cn:authing:5f819ffdaaf252c4df2c9266:user:60a81fe4fa72b8bf2b25f659",
    "userPoolId": "5f819ffdaaf252c4df2c9266",
    "status": "Activated",
    "username": "new name",
    "email": "new email",
    "emailVerified": false,
    "phone": null,
    "phoneVerified": false,
    "unionid": null,
    "openid": null,
    "nickname": null,
    "registerSource": [
        "import:manual"
    ],
    "photo": "https:\/\/files.authing.co\/authing-console\/default-user-avatar.png",
    "password": "cf3f3cbe3cb001aed90f92c3f3d68696",
    "oauth": null,
    "token": null,
    "tokenExpiredAt": null,
    "loginsCount": 0,
    "lastLogin": null,
    "lastIP": null,
    "signedUp": "2021-05-21T21:02:28+00:00",
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
    "createdAt": "2021-05-21T21:02:28+00:00",
    "updatedAt": "2021-05-21T21:11:09+00:00",
    "externalId": null
}
```

## 获取用户详情

UsersManagementClient->detail(string $userId)

通过用户 ID 获取用户详情，如果你想通过 token 获取用户详情，请使用 [AuthenticationClient SDK](/reference/sdk-for-node/authentication/AuthenticationClient.md#获取当前登录的用户信息) 。

#### 参数

- `userId` \<string\> 用户 ID

#### 示例

```php
$userManageClient->detail("60b4a136d9xxxxcc3d87e55a");
```

#### 示例数据

```json
{
    "id": "60a81fe4fa72b8bf2b25f659",
    "arn": "arn:cn:authing:5f819ffdaaf252c4df2c9266:user:60a81fe4fa72b8bf2b25f659",
    "userPoolId": "5f819ffdaaf252c4df2c9266",
    "status": "Activated",
    "username": "new name",
    "email": "new email",
    "emailVerified": false,
    "phone": null,
    "phoneVerified": false,
    "identities": [],
    "unionid": null,
    "openid": null,
    "nickname": null,
    "registerSource": [
        "import:manual"
    ],
    "photo": "https:\/\/files.authing.co\/authing-console\/default-user-avatar.png",
    "password": "cf3f3cbe3cb001aed90f92c3f3d68696",
    "oauth": null,
    "token": null,
    "tokenExpiredAt": null,
    "loginsCount": 0,
    "lastLogin": null,
    "lastIP": null,
    "signedUp": "2021-05-21T21:02:28+00:00",
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
    "createdAt": "2021-05-21T21:02:28+00:00",
    "updatedAt": "2021-05-21T21:11:09+00:00",
    "externalId": null
}
```

## 获取自定义数据

UsersManagementClient->getUdfValue(string $userId)

获取用户的自定义数据。你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)。

#### 参数

- `userId` \<string\> 用户 ID

#### 示例

```php
$userManageClient->getUdfValue("60b4a136d9xxxxcc3d87e55a");
```

#### 示例数据

```json
[
    {
        "key": "school",
        "dataType": "STRING",
        "value": "华中科技大学",
        "label": "学校"
    }
]
```

## 批量获取自定义数据

UsersManagementClient->getUdfValueBatch(array $userIds)

批量获取多个用户的自定义数据。你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)。

#### 参数

- `userIds` \<string []\> 用户 ID 列表

#### 示例

```php
$userManageClient->getUdfValueBatch(
    ["USERID_1", "USER_2"]
);
```

#### 示例数据

```json
[
    {
        "targetId": "60a81fe4fa72b8bf2b25f659",
        "data": [
            {
                "key": "school",
                "dataType": "STRING",
                "value": "华中科技大学",
                "label": "学校"
            }
        ]
    },
    {
        "targetId": "608bd543d56f1f0def27c228",
        "data": [
            {
                "key": "school",
                "dataType": "STRING",
                "value": "华中科技大学",
                "label": "学校"
            }
        ]
    }
]
```

## 设置自定义数据

UsersManagementClient->setUdfValue(string $userId, array $data)

设置用户的自定义数据。你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。

#### 参数

- `userId` \<string\> 用户 ID
- `data` \<KeyValuePair\> 关联数组，自定义字段数据，类型为一个对象，参考实例。

#### 示例

```php
$userManageClient->setUdfValue("60b4a136d9xxxxcc3d87e55a", [
    'school' => '华中科技大学',
    'age' => 20,
]);
```

#### 示例数据

```json
[
    {
        "key": "school",
        "dataType": "STRING",
        "value": "华中科技大学",
        "label": "学校"
    }
]
```

## 批量设置自定义数据

UsersManagementClient->setUdfValueBatch(array $input)

批量设置多个用户的自定义数据。你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。如果设置失败，会抛出异常，你需要对异常进行捕捉。

#### 参数

- `input` \<array\> 输入数据，结构请见示例。

#### 示例

```php
$userManageClient->setUdfValueBatch([
    [
        'userId' => 'USERID_1',
        'data' => (object)[
            'school' => 'new 华中科技大学',
        ],
    ],
    [
        'userId' => 'USERID_2',
        'data' => (object)[
            'school' => 'new 清华大学',
            'age' => 100,
        ],
    ],
]);
```

#### 示例数据

```json
{
    "code": 200,
    "message": "设置成功！"
}
```

## 通过用户 ID 和应用 appId 登出某个应用

UsersManagementClient->logout(array $input)

用户登出某个应用

#### 参数

- `userId` \<string\> 用户 ID
- `appId` \<string\> 应用 ID 。

#### 示例

```php
$userManageClient->logout(['userId'=>‘userId’,
'appId'=>'appId']);
```

#### 示例数据

```json
{
    "code": 200,
    "message": "退出成功"
}
```

## 通过用户 ID 刷新 token

UsersManagementClient->refreshToken(string $userId)

刷新 token

#### 参数

- `userId` \<string\> 用户 ID

#### 示例

```php
$userManageClient->refreshToken(['userId'=>'userId']);
```

#### 示例数据

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InR5cGUiOiJ1c2VyIiwidXNlclBvb2xJZCI6IjYxMzE5NjdmYWYyZWI1NWEyYjdjZWJjYyIsImFwcElkIjpudWxsLCJhcm4iOiJhcm46Y246YXV0aGluZzo2MTMxOTY3ZmFmMmViNTVhMmI3Y2ViY2M6dXNlcjo2MWE5OTY4ZTQ0NzU5MTBlMDJkNWY1NWEiLCJpZCI6IjYxYTk5NjhlNDQ3NTkxMGUwMmQ1ZjU1YSIsInVzZXJJZCI6IjYxYTk5NjhlNDQ3NTkxMGUwMmQ1ZjU1YSIsIl9pZCI6IjYxYTk5NjhlNDQ3NTkxMGUwMmQ1ZjU1YSIsInBob25lIjpudWxsLCJlbWFpbCI6IjEyMDI4MjAxMzlAZ21haWwuY29tIiwidXNlcm5hbWUiOiJ1c2VyXzEyYzQ4NTZhIiwidW5pb25pZCI6bnVsbCwib3BlbmlkIjpudWxsLCJjbGllbnRJZCI6IjYxMzE5NjdmYWYyZWI1NWEyYjdjZWJjYyJ9LCJpYXQiOjE2Mzg1MDQwNzgsImV4cCI6MTYzOTgwMDA3OH0.5BtAes0OMimawHmFsQ4Z2YnA2KtV-lwlkt1gMB5RYSM",
  "iat": 1638504078,
  "exp": 1639800078
}
```

## 发送首次登录验证邮件

UsersManagementClient->sendFirstLoginVerifyEmail(string $userId)

发送首次邮件

#### 参数

- `userId` \<string\> 用户 ID
- `appId` \<string\> 应用 ID

#### 示例

```php
$userManageClient->sendFirstLoginVerifyEmail('userId','appId');
```

#### 示例数据

```json
{
  "code": 200,
  "message": "发送成功"
}
```

## 删除自定义数据

UsersManagementClient->removeUdfValue(string $userId, string $key)

删除自定义数据。

#### 参数

- `userId` \<string\> 用户 ID
- `key` \<string\> 自定义字段的 key 。

#### 示例

```php
$userManageClient->removeUdfValue('60b4a136d9xxxxcc3d87e55a', 'school');
```

#### 示例数据

```json
true
```

## 删除用户

UsersManagementClient->delete(string $userId)

通过用户 ID 删除用户。删除用户会联级删除此用户管理的所有相关数据，无法恢复，请谨慎操作。

#### 参数

- `userId` \<string\> 用户 ID

#### 示例

```php
$userManageClient->delete("60b4a136d9xxxxcc3d87e55a");
```

#### 示例数据

```json
{
    "message": "删除成功！",
    "code": 200
}
```

## 批量删除用户

UsersManagementClient->deleteMany(array $userIds)

批量删除用户，如果传入了不存在的用户 ID，会提示错误。

#### 参数

- `userIds` \<string[]\> 用户 ID 列表

#### 示例

```php
$userManageClient->deleteMany(
    ["USERID_1", "USERID_2"]
);
```

#### 示例数据

```json
{
    "message": "删除成功！",
    "code": 200
}
```

## 批量获取用户

UsersManagementClient->batch(array $identifiers, array $options = [])

通过 id、username、email、phone、email、externalId 批量获取用户详情。

#### 参数

- `identifiers` \<string[]\> 需要查询的数据列表，如用户 ID 列表
- `options` \<array\>
  - `options.queryField` \<string\> 列表类型，可选值为 'id' ,'username' ,'phone' ,'email', 'externalId'，默认为 'id'

#### 示例

```php
// 通过手机号、用户池、邮箱、ExternalId 批量查找用户
$userManageClient->batch(
    [
        'USERID_1',
        'USERID_2'
        // id, username, email, phone -> queryField
    ],
    [
        // 'queryField' => 'id',
        // 'queryField' => 'username',
        // 'queryField' => 'email',
        // 'queryField' => 'phone',
        'queryField' => 'id',
    ]
);
```

#### 示例数据

```json
[
    {
        "id": "608a1c21e99c6eb1c8ec3e2f",
        "createdAt": "2021-04-29T02:38:25.461Z",
        "updatedAt": "2021-04-29T02:38:25.485Z",
        "userPoolId": "5f819ffdaaf252c4df2c9266",
        "isRoot": false,
        "status": "Activated",
        "oauth": null,
        "email": null,
        "phone": null,
        "username": "shubuzuo-test1",
        "unionid": null,
        "openid": null,
        "nickname": null,
        "company": null,
        "photo": "https:\/\/files.authing.co\/authing-console\/default-user-avatar.png",
        "browser": null,
        "device": null,
        "password": "cb0d73539a120af3aa4bb387743e67dc",
        "salt": "ipo5phkmd14",
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
        "registerSource": [
            "basic:username-password"
        ],
        "secretInfo": null,
        "emailVerified": false,
        "phoneVerified": false,
        "lastLogin": null,
        "blocked": false,
        "isDeleted": false,
        "sendSmsCount": 0,
        "sendSmsLimitCount": 1000,
        "dataVersion": null,
        "encryptedPassword": "gmS4blFvIDX+CNbpkOxvp5pF05zDFDCr6N0EHxjbOqlGi3TvvJ5fK1sQ9NYCau\/X66v5gPZyR7Dh3OyDTHvCE83B+goK6njExm677pm0dywucSMJIJkIqVjTYbVu9cySetEbNEEqnpEIIRn90Nu7\/2egiZSQ12QXNXKWUoNw2dU=",
        "signedUp": "2021-04-29T02:38:25.461Z",
        "externalId": null,
        "mainDepartmentId": null,
        "mainDepartmentCode": null,
        "lastMfaTime": null,
        "passwordSecurityLevel": 1,
        "resetPasswordOnFirstLogin": false,
        "source": null
    },
    {
        "id": "608bd3d684d0637251c4b519",
        "createdAt": "2021-04-30T09:54:30.154Z",
        "updatedAt": "2021-04-30T09:54:30.179Z",
        "userPoolId": "5f819ffdaaf252c4df2c9266",
        "isRoot": false,
        "status": "Activated",
        "oauth": null,
        "email": "shubuzuo2@qq.com",
        "phone": null,
        "username": null,
        "unionid": null,
        "openid": null,
        "nickname": null,
        "company": null,
        "photo": "https:\/\/files.authing.co\/authing-console\/default-user-avatar.png",
        "browser": null,
        "device": null,
        "password": "dd6b444a43482c9a82141555e1c57508",
        "salt": "82ip50e227h",
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
        "registerSource": [
            "basic:email"
        ],
        "secretInfo": null,
        "emailVerified": false,
        "phoneVerified": false,
        "lastLogin": null,
        "blocked": false,
        "isDeleted": false,
        "sendSmsCount": 0,
        "sendSmsLimitCount": 1000,
        "dataVersion": null,
        "encryptedPassword": "m2at6rvtAcimjusxLoNrfWQJ1\/6HeLoHRrhOr52w6bfP9DOpj\/x+lH3zDUkCthY9d2XCReH\/eTjIa0Q2sAl6MnL2PHij1lS\/IFEcQ0A\/1eibyPDGolSyatfjaqb\/0XEScyMDvpWXOd9jW4Jq3DsYcOpJG+sUu22IaRXBf4hLoQM=",
        "signedUp": "2021-04-30T09:54:30.154Z",
        "externalId": null,
        "mainDepartmentId": null,
        "mainDepartmentCode": null,
        "lastMfaTime": null,
        "passwordSecurityLevel": 1,
        "resetPasswordOnFirstLogin": false,
        "source": null
    }
]
```

## 获取用户列表

UsersManagementClient->paginate(int $page = 1, int $limit = 10)

获取用户池用户列表

#### 参数

- `page` \<number\> 页码数, 从 1 开始 默认值为 : `1`。
- `limit` \<number\> 每页包含的用户数 默认值为 : `10`。

#### 示例

```php
$userManageClient->paginate();
```

#### 示例数据

```json
{
    "totalCount": 1,
    "list": [
        {
            "id": "60a81fe4fa72b8bf2b25f659",
            "arn": "arn:cn:authing:5f819ffdaaf252c4df2c9266:user:60a81fe4fa72b8bf2b25f659",
            "userPoolId": "5f819ffdaaf252c4df2c9266",
            "status": "Activated",
            "username": "new name",
            "email": "new email",
            "emailVerified": false,
            "phone": null,
            "phoneVerified": false,
            "unionid": null,
            "openid": null,
            "nickname": null,
            "registerSource": [
                "import:manual"
            ],
            "photo": "https:\/\/files.authing.co\/authing-console\/default-user-avatar.png",
            "password": "cf3f3cbe3cb001aed90f92c3f3d68696",
            "oauth": null,
            "token": null,
            "tokenExpiredAt": null,
            "loginsCount": 0,
            "lastLogin": null,
            "lastIP": null,
            "signedUp": "2021-05-21T21:02:28+00:00",
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
            "createdAt": "2021-05-21T21:02:28+00:00",
            "updatedAt": "2021-05-21T21:11:09+00:00",
            "externalId": null
        }
    ]
}
```

## 获取已归档用户列表

UsersManagementClient->listArchivedUsers(int $page = 1, int $limit = 10)

获取用户池已归档用户列表

#### 参数

- `page` \<number\> 页码数, 从 1 开始 默认值为 : `1`。
- `limit` \<number\> 每页包含的用户数 默认值为 : `10`。

#### 示例

```php
$userManageClient->listArchivedUsers();
```

<!-- #### 返回值 -->


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

UsersManagementClient->exists(IsUserExistsParam $options)

通过用户名、邮箱、手机号或者 ExternalId 检查用户是否存在。

#### 参数

- `options` \<IsUserExistsParam\>
- `options.username` \<string\> 用户名，区分大小写。
- `options.email` \<string\> 邮箱，邮箱不区分大小写。
- `options.phone` \<string\> 手机号

#### 示例

```php
use Authing\Types\IsUserExistsParam;

$param = (new IsUserExistsParam())->withUsername('bob');
$res = $userManageClient->exists($param);
```
#### 示例数据

```json
true
```

## 查找用户

UsersManagementClient->find(array $options)

通过用户名、邮箱、手机号、externalId 查找用户

#### 参数

- `options` \<array\>
- `options['username']` \<string\> 用户名，区分大小写。
- `options['email']` \<string\> 邮箱，邮箱不区分大小写。
- `options['phone']` \<string\> 手机号
- `options['externalId']` \<string\> External Id


#### 示例

```php
$userManageClient->find(
    [
        // 'username' => 'username',
        'email' => 'test@qq.com',
        // 'phone' => 'phone',
        // 'externalId' => 'find externalId',
    ]
);
```

#### 示例数据

```json
{
    "id": "608266fc3e314f39c174029f",
    "arn": "arn:cn:authing:5f819ffdaaf252c4df2c9266:user:608266fc3e314f39c174029f",
    "userPoolId": "5f819ffdaaf252c4df2c9266",
    "status": "Activated",
    "username": null,
    "email": "test@qq.com",
    "emailVerified": false,
    "phone": null,
    "phoneVerified": false,
    "unionid": null,
    "openid": null,
    "nickname": null,
    "registerSource": [
        "basic:email"
    ],
    "photo": "https:\/\/files.authing.co\/authing-console\/default-user-avatar.png",
    "password": "f1d08e901748f439ff73ca3a79e53488",
    "oauth": null,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDgyNjZmYzNlMzE0ZjM5YzE3NDAyOWYiLCJiaXJ0aGRhdGUiOm51bGwsImZhbWlseV9uYW1lIjpudWxsLCJnZW5kZXIiOiJVIiwiZ2l2ZW5fbmFtZSI6bnVsbCwibG9jYWxlIjpudWxsLCJtaWRkbGVfbmFtZSI6bnVsbCwibmFtZSI6bnVsbCwibmlja25hbWUiOm51bGwsInBpY3R1cmUiOiJodHRwczovL2ZpbGVzLmF1dGhpbmcuY28vYXV0aGluZy1jb25zb2xlL2RlZmF1bHQtdXNlci1hdmF0YXIucG5nIiwicHJlZmVycmVkX3VzZXJuYW1lIjpudWxsLCJwcm9maWxlIjpudWxsLCJ1cGRhdGVkX2F0IjoiMjAyMS0wNC0yM1QwNjoxOTo0MC4wNzBaIiwid2Vic2l0ZSI6bnVsbCwiem9uZWluZm8iOm51bGwsImFkZHJlc3MiOnsiY291bnRyeSI6bnVsbCwicG9zdGFsX2NvZGUiOm51bGwsInJlZ2lvbiI6bnVsbCwiZm9ybWF0dGVkIjpudWxsfSwicGhvbmVfbnVtYmVyIjpudWxsLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOmZhbHNlLCJlbWFpbCI6InRlc3RAcXEuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJleHRlcm5hbF9pZCI6bnVsbCwidW5pb25pZCI6bnVsbCwiZGF0YSI6eyJ0eXBlIjoidXNlciIsInVzZXJQb29sSWQiOiI1ZjgxOWZmZGFhZjI1MmM0ZGYyYzkyNjYiLCJhcHBJZCI6IjVmODJiOWI5YzIzOWI3OWQ0ZjBkOTNiZSIsImlkIjoiNjA4MjY2ZmMzZTMxNGYzOWMxNzQwMjlmIiwidXNlcklkIjoiNjA4MjY2ZmMzZTMxNGYzOWMxNzQwMjlmIiwiX2lkIjoiNjA4MjY2ZmMzZTMxNGYzOWMxNzQwMjlmIiwicGhvbmUiOm51bGwsImVtYWlsIjoidGVzdEBxcS5jb20iLCJ1c2VybmFtZSI6bnVsbCwidW5pb25pZCI6bnVsbCwib3BlbmlkIjpudWxsLCJjbGllbnRJZCI6IjVmODE5ZmZkYWFmMjUyYzRkZjJjOTI2NiJ9LCJ1c2VycG9vbF9pZCI6IjVmODE5ZmZkYWFmMjUyYzRkZjJjOTI2NiIsImF1ZCI6IjVmODJiOWI5YzIzOWI3OWQ0ZjBkOTNiZSIsImV4cCI6MTYxOTE2MjM4NCwiaWF0IjoxNjE5MTU4Nzg0LCJpc3MiOiJodHRwczovL3NodWJ1enVvLW9hdXRoLmF1dGhpbmcuY24vb2lkYyJ9.FVkibq_Y5LjLapt_7mUJhVc3bZOA_g-uIOZ7KRdqZ-M",
    "tokenExpiredAt": "2021-04-23T07:19:44+00:00",
    "loginsCount": 1,
    "lastLogin": "2021-04-23T06:19:44+00:00",
    "lastIP": null,
    "signedUp": "2021-04-23T06:19:40+00:00",
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
    "createdAt": "2021-04-23T06:19:40+00:00",
    "updatedAt": "2021-04-23T06:19:44+00:00",
    "externalId": null
}
```
## 搜索用户

UsersManagementClient->search(string $query, array $options)

根据关键字根据关键字模糊搜索用户，该接口为分页接口。模糊搜索用户。

#### 参数

- `query` \<string\> 搜索内容
- `options` \<array\> 选项
- `options['fields']` \<string[]\> 搜索用户字段，如果不指定，默认会从 `username`、`nickname`、`email`、`phone`、`company`、`name`、`givenName`、`familyName`、`middleName`、`profile`、`preferredUsername` 这些字段进行模糊搜索。
  如果你需要精确查找，请使用 find 方法。
- `options['page']` \<number\> 默认值为 : `1`。
- `options['limit']` \<number\> 默认值为 : `10`。

#### 示例

```php
$userManageClient->search("bob", [
    'withCustomData' => true
]);
```

#### 示例数据

```json
{
    "totalCount": 3,
    "list": [
        {
            "id": "60a81fe4fa72b8bf2b25f659",
            "arn": "arn:cn:authing:5f819ffdaaf252c4df2c9266:user:60a81fe4fa72b8bf2b25f659",
            "userPoolId": "5f819ffdaaf252c4df2c9266",
            "status": "Activated",
            "username": "new name",
            "email": "new email",
            "emailVerified": false,
            "phone": null,
            "phoneVerified": false,
            "unionid": null,
            "openid": null,
            "nickname": null,
            "registerSource": [
                "import:manual"
            ],
            "photo": "https:\/\/files.authing.co\/authing-console\/default-user-avatar.png",
            "password": "cf3f3cbe3cb001aed90f92c3f3d68696",
            "oauth": null,
            "token": null,
            "tokenExpiredAt": null,
            "loginsCount": 0,
            "lastLogin": null,
            "lastIP": null,
            "signedUp": "2021-05-21T21:02:28+00:00",
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
            "createdAt": "2021-05-21T21:02:28+00:00",
            "updatedAt": "2021-05-21T21:11:09+00:00",
            "externalId": null
        }
    ]
}
```

## 强制下线一批用户

UsersManagementClient->kick(array $userIds)

强制让一批用户在 Authing 下线。

#### 参数

- `userIds` \<string[]\> 用户 ID 数组

#### 示例

```php
$userManageClient->kick(
    ['USERID_1', 'USERID_2']
);
```

#### 示例数据

```json
{ "code": 200, "message": "强制下线成功" }
```

<!-- ## 检测密码是否合法

ManagementClient->isPasswordValid(string $password)

检测密码是否合法

#### 参数

- `isPasswordValid` \<string\> 要检测的密码

#### 示例

```php
use Authing\Mgmt\ManagementClient;

$management = new ManagementClient("AUTHING_USERPOOL_ID", "AUTHING_USERPOOL_SECRET");
// 获取管理员权限
$management->requestToken();
$password = 'php@-isok+_?';
// 检测 token 的最新状态，能够获取到该用户对应的 token
$management.isPasswordValid($password);
``` -->

<!-- #### 返回值 -->


## 通过用户 ID 查找用户所在分组

UsersManagementClient->listGroups(string $userId)

获取用户的分组列表

#### 参数

- `userId` \<string\> 用户 ID

#### 示例

```php
$userManageClient->listGroups("60b4a136d9xxxxcc3d87e55a");
```

#### 示例数据

```json
{
    "groups": {
        "totalCount": 1,
        "list": [
            {
                "code": "5584",
                "name": "Users",
                "description": "这是根组织",
                "createdAt": "2021-04-23T06:40:54+00:00",
                "updatedAt": "2021-04-23T06:40:54+00:00"
            }
        ]
    }
}
```

## 通过用户 ID 查找用户所在组织

UsersManagementClient->listOrgs(string $userId)

获取用户的组织列表

#### 参数

- `userId` \<string\> 用户 ID

#### 示例

```php
$userManageClient->listOrgs("60b4a136d9xxxxcc3d87e55a");
```

#### 示例数据

```json
[
  [{
    "type": "org",
    "id": "619dd2e6606b23286db3f1a6",
    "createdAt": "2021-11-24T05:51:34.870Z",
    "updatedAt": "2021-11-24T05:51:34.900Z",
    "userPoolId": "6131967faf2eb55a2b7cebcc",
    "rootNodeId": "619dd2e6538518c7c6fe3632",
    "logo": null
  }, {
    "type": "node",
    "id": "619dd2e6538518c7c6fe3632",
    "createdAt": "2021-11-24T05:51:34.881Z",
    "updatedAt": "2021-11-24T05:51:34.881Z",
    "userPoolId": "6131967faf2eb55a2b7cebcc",
    "orgId": "619dd2e6606b23286db3f1a6",
    "name": "aaa",
    "nameI18n": null,
    "description": "aaa",
    "descriptionI18n": null,
    "order": null,
    "code": "aaa",
    "leaderUserId": null
  }],
  [{
    "type": "org",
    "id": "619dd2e6606b23286db3f1a6",
    "createdAt": "2021-11-24T05:51:34.870Z",
    "updatedAt": "2021-11-24T05:51:34.900Z",
    "userPoolId": "6131967faf2eb55a2b7cebcc",
    "rootNodeId": "619dd2e6538518c7c6fe3632",
    "logo": null
  }, {
    "type": "node",
    "id": "619dd2e6538518c7c6fe3632",
    "createdAt": "2021-11-24T05:51:34.881Z",
    "updatedAt": "2021-11-24T05:51:34.881Z",
    "userPoolId": "6131967faf2eb55a2b7cebcc",
    "orgId": "619dd2e6606b23286db3f1a6",
    "name": "aaa",
    "nameI18n": null,
    "description": "aaa",
    "descriptionI18n": null,
    "order": null,
    "code": "aaa",
    "leaderUserId": null
  }],
  [{
    "type": "org",
    "id": "619dd2e6606b23286db3f1a6",
    "createdAt": "2021-11-24T05:51:34.870Z",
    "updatedAt": "2021-11-24T05:51:34.900Z",
    "userPoolId": "6131967faf2eb55a2b7cebcc",
    "rootNodeId": "619dd2e6538518c7c6fe3632",
    "logo": null
  }, {
    "type": "node",
    "id": "619dd2e6538518c7c6fe3632",
    "createdAt": "2021-11-24T05:51:34.881Z",
    "updatedAt": "2021-11-24T05:51:34.881Z",
    "userPoolId": "6131967faf2eb55a2b7cebcc",
    "orgId": "619dd2e6606b23286db3f1a6",
    "name": "aaa",
    "nameI18n": null,
    "description": "aaa",
    "descriptionI18n": null,
    "order": null,
    "code": "aaa",
    "leaderUserId": null
  }],
  [{
    "type": "org",
    "id": "61a07de7c8610413d6671eac",
    "createdAt": "2021-11-26T06:25:43.814Z",
    "updatedAt": "2021-11-26T06:25:43.831Z",
    "userPoolId": "6131967faf2eb55a2b7cebcc",
    "rootNodeId": "61a07de7d77edb43569e521d",
    "logo": null
  }, {
    "type": "node",
    "id": "61a07de7d77edb43569e521d",
    "createdAt": "2021-11-26T06:25:43.823Z",
    "updatedAt": "2021-11-26T06:25:43.823Z",
    "userPoolId": "6131967faf2eb55a2b7cebcc",
    "orgId": "61a07de7c8610413d6671eac",
    "name": "726337746",
    "nameI18n": null,
    "description": "\u65b0\u5efa\u7684\u7ec4\u7ec7\u7ed3\u6784",
    "descriptionI18n": null,
    "order": null,
    "code": "726337746",
    "leaderUserId": null
  }]
]
```

## 通过用户 ID 查找用户所在部门

UsersManagementClient->listDepartment(string $userId)

获取用户的部门列表

#### 参数

- `userId` \<string\> 用户 ID

#### 示例

```php
$userManageClient->listDepartment("60b4a136d9xxxxcc3d87e55a");
```

#### 示例数据

```json
{
  "departments": {
    "totalCount": 4,
    "list": [{
      "department": {
        "id": "619dd41e757e82bc908df26f",
        "orgId": "619dd2e6606b23286db3f1a6",
        "name": "\u6d4b\u8bd5\u8282\u70b9",
        "nameI18n": null,
        "description": "\u6d4b\u8bd5\u63cf\u8ff0",
        "descriptionI18n": null,
        "order": null,
        "code": "test-code",
        "root": false,
        "depth": null,
        "path": ["619dd2e6538518c7c6fe3632", "619dd87eff3026b6fb6777da", "619dd41e757e82bc908df26f"],
        "codePath": ["aaa", "563707497", "test-code"],
        "namePath": ["aaa", "563707497", "\u6d4b\u8bd5\u8282\u70b9"],
        "createdAt": "2021-11-24T05:56:46+00:00",
        "updatedAt": "2021-11-24T05:56:46+00:00",
        "children": []
      },
      "isMainDepartment": false,
      "joinedAt": "2021-11-24T05:57:38+00:00"
    }, {
      "department": {
        "id": "619dd67e01ed0421cba07246",
        "orgId": "619dd2e6606b23286db3f1a6",
        "name": "\u6d4b\u8bd5\u8282\u70b9111",
        "nameI18n": null,
        "description": "\u6d4b\u8bd5\u63cf\u8ff0",
        "descriptionI18n": null,
        "order": null,
        "code": "test-code111",
        "root": false,
        "depth": null,
        "path": ["619dd2e6538518c7c6fe3632", "619dd67e01ed0421cba07246"],
        "codePath": ["aaa", "test-code111"],
        "namePath": ["aaa", "\u6d4b\u8bd5\u8282\u70b9111"],
        "createdAt": "2021-11-24T06:06:54+00:00",
        "updatedAt": "2021-11-24T06:06:54+00:00",
        "children": []
      },
      "isMainDepartment": false,
      "joinedAt": "2021-12-03T03:25:59+00:00"
    }, {
      "department": {
        "id": "619dd6f0eb4b4f40dd7188ce",
        "orgId": "619dd2e6606b23286db3f1a6",
        "name": "\u6d4b\u8bd5\u8282\u70b9333",
        "nameI18n": null,
        "description": "\u6d4b\u8bd5\u63cf\u8ff0",
        "descriptionI18n": null,
        "order": null,
        "code": "test-code333",
        "root": false,
        "depth": null,
        "path": ["619dd2e6538518c7c6fe3632", "619dd6f0eb4b4f40dd7188ce"],
        "codePath": ["aaa", "test-code333"],
        "namePath": ["aaa", "\u6d4b\u8bd5\u8282\u70b9333"],
        "createdAt": "2021-11-24T06:08:48+00:00",
        "updatedAt": "2021-11-24T06:08:48+00:00",
        "children": []
      },
      "isMainDepartment": false,
      "joinedAt": "2021-12-03T03:26:08+00:00"
    }, {
      "department": {
        "id": "61a07de7d77edb43569e521d",
        "orgId": "61a07de7c8610413d6671eac",
        "name": "726337746",
        "nameI18n": null,
        "description": "\u65b0\u5efa\u7684\u7ec4\u7ec7\u7ed3\u6784",
        "descriptionI18n": null,
        "order": null,
        "code": "726337746",
        "root": true,
        "depth": null,
        "path": ["61a07de7d77edb43569e521d"],
        "codePath": ["726337746"],
        "namePath": ["726337746"],
        "createdAt": "2021-11-26T06:25:43+00:00",
        "updatedAt": "2021-11-26T06:25:43+00:00",
        "children": []
      },
      "isMainDepartment": false,
      "joinedAt": "2021-12-03T03:30:02+00:00"
    }]
  }
}
```

## 加入分组

UsersManagementClient->addGroup(string $userId, string $group)

将用户加入分组

#### 参数

- `userId` \<string\> 用户 ID
- `group` \<string\> 分组 code

#### 示例

```php
$userManageClient->addGroup("60b4a136d9xxxxcc3d87e55a", "GROUP_CODE");
```


#### 示例数据

```json
{
    "message": "添加成功！",
    "code": 200
}
```

## 退出分组

UsersManagementClient->removeGroup(string $userId, string $group)

退出分组

#### 参数

- `userId` \<string\> 用户 ID
- `group` \<string\> 分组 code

#### 示例

```php
$userManageClient->removeGroup("60b4a136d9xxxxcc3d87e55a", "GROUP_CODE");
```

#### 示例数据

```json
{
    "message": "移除成功",
    "code": 200
}
```

## 获取用户角色列表

UsersManagementClient->listRoles(string $userId, string $namespace = '')

获取用户的角色列表

#### 参数

- `userId` \<string\> 用户 ID

#### 示例

```php
$userManageClient->listRoles("60b4a136d9xxxxcc3d87e55a");
```

#### 示例数据

```json
{
    "totalCount": 1,
    "list": [
        {
            "code": "test_role_code",
            "namespace": "default",
            "arn": "arn:cn:authing:5f819ffdaaf252c4df2c9266:role:6076a2f503bbc684184a7ed9",
            "description": "测试使用的 test_role_code",
            "createdAt": "2021-04-14T08:08:21+00:00",
            "updatedAt": "2021-04-14T08:08:21+00:00",
            "parent": null
        }
    ]
}
```

## 添加角色

UsersManagementClient->addRoles(string $userId, array $roles, string $namespace = '')

将用户加入角色

#### 参数

- `userId` \<string\> 用户 ID
- `roles` \<string []\> 角色 code 列表

#### 示例

```php
$userManageClient->addRoles(
  "userId", 
  ["role code"]
);
```

#### 示例数据

```json
{
    "message": "授权角色成功",
    "code": 200
}
```

## 移除角色

UsersManagementClient->removeRoles(string $userId, array $roles, string $namespace = '')

将用户从角色中移除

#### 参数

- `userId` \<string\> 用户 ID
- `roles` \<string []\> 角色 code 列表

#### 示例

```php
$userManageClient->removeRoles(
  "userId", 
  ["role code"]
);
```

#### 示例数据

```json
{
    "message": "撤销角色成功",
    "code": 200
}
```

## 判断用户是否有某个角色

UsersManagementClient->hasRole(string $userId, string $roleCode, string $namespace = '')

判断用户是否有某个角色

#### 参数

- `userId` \<string\> 用户 ID；
- `roleCode` \<string\> 角色 Code；
- `namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。

#### 示例

```php
$namespace = 'NAMESPACE_CODE';
$roleCode = 'ROLECODE';
$userManageClient->hasRole('60b4a136d9xxxxcc3d87e55a', $roleCode, $namespace);
```

#### 示例数据

```json
true | false
```


## 获取用户被授权的所有资源列表

UsersManagementClient->listAuthorizedResources(string $userId, string $namespace, string $resourceType = '')

获取一个用户被授权的所有资源，用户被授权的所有资源里面包括从角色、分组、组织机构继承的资源。

#### 参数

- `userId` \<string\> 用户 ID；
- `namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)；
- `resourceType` \<string\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
  - `DATA`: 数据类型；
  - `API`: API 类型数据；
  - `MENU`: 菜单类型数据；
  - `BUTTON`: 按钮类型数据。

#### 示例

```php
$userManagementClient = $managementClient->users();

$res = $userManageClient->listAuthorizedResources('60b4a136d9xxxxcc3d87e55a', "NAMESPACE_CODE");
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

## 获取用户审计日志

UsersManagementClient->listUserActions(array $options = [
        'page' =>  1,
        'limit' =>  10,
])

用户审计日志列表

#### 参数

- `options` \<array\> 配置对象。
- `options['clientIp']` \<string\> 客户端 IP 地址, 可选值。
- `options['operationName']` \<string\> 操作类型, 可选值。
- `options['operatoArn']` \<string\> 用户 Arn 通过 searchUser 方法获得, 可选值。
- `options['page']` \<number\> 页码数, 从 1 开始 默认值为 : `1`, 可选值。
- `options['limit']` \<number\> 每页包含的用户数 默认值为 : `10`, 可选值。

#### 示例

```php
$usersManagementClient->listUserActions();
```

#### 示例数据

```json
{
    "totalCount": 1,
    "list": [
        {
            "geoip": {
                "country_code2": "CN",
                "continent_code": "AS",
                "country_name": "China",
                "location": {
                    "lon": 116.3889,
                    "lat": 39.9288
                },
                "latitude": 39.9288,
                "ip": "117.136.0.63",
                "longitude": 116.3889,
                "country_code3": "CN",
                "city_name": "Beijing",
                "region_name": "Beijing",
                "region_code": "BJ",
                "timezone": "Asia\/Shanghai"
            },
            "userpool_id": "5f819ffdaaf252c4df2c9266",
            "host": "logstash-ds-ndb2f",
            "path": "\/var\/log\/authing-server\/user-action.2021-04-30.log",
            "message": "[2021-04-30T10:00:35.615-0000] requestId=99293c57-b5c0-4e7b-b777-a8d6537fb056 userPoolId=5f819ffdaaf252c4df2c9266 appId=5f81a04818860aca72aac021 operatorArn=arn:cn:authing:5f819ffdaaf252c4df2c9266:user:608bd543d56f1f0def27c228 operationName=register clientIp=117.136.0.63 userAgent=\"null\" success=true extraData={\"registerMethod\":\"registerByUsername\",\"args\":{\"username\":\"shubuzuo-test4\",\"password\":\"aY02mmIci4xKfQsOT3KXSVlea6ZAx4Kjwiry+pfJxLGlEInY4WrNA5HWrXduQ4Mj5jIscvv3+Hk8i2aJSInJzdc+vT7JC0uh0YrTfeeMbFYKoIrtkO3YDXyC9wD4bcPrafxWUsP\/5AD1g4a8K5VFP1Tvwtac1UliZt8c2QvB5bw=\"}}",
            "timestamp": "2021-04-30T10:00:35.615-0000",
            "app_id": "5f81a04818860aca72aac021",
            "operator_arn": "arn:cn:authing:5f819ffdaaf252c4df2c9266:user:608bd543d56f1f0def27c228",
            "operation_name": "register",
            "clientip": "117.136.0.63",
            "user_agent": "\"null\"",
            "@version": "1",
            "extra_data": "{\"registerMethod\":\"registerByUsername\",\"args\":{\"username\":\"shubuzuo-test4\",\"password\":\"aY02mmIci4xKfQsOT3KXSVlea6ZAx4Kjwiry+pfJxLGlEInY4WrNA5HWrXduQ4Mj5jIscvv3+Hk8i2aJSInJzdc+vT7JC0uh0YrTfeeMbFYKoIrtkO3YDXyC9wD4bcPrafxWUsP\/5AD1g4a8K5VFP1Tvwtac1UliZt8c2QvB5bw=\"}}",
            "filedate": "2021.04.30",
            "ua": {
                "device": "Other",
                "build": "",
                "os": "Other",
                "name": "Other",
                "os_name": "Other"
            },
            "success": "true",
            "@timestamp": "2021-05-07T12:42:23.609Z",
            "request_id": "99293c57-b5c0-4e7b-b777-a8d6537fb056",
            "user": {
                "userPoolId": "5f819ffdaaf252c4df2c9266",
                "displayName": "shubuzuo-test4",
                "id": "608bd543d56f1f0def27c228",
                "photo": "https:\/\/files.authing.co\/authing-console\/default-user-avatar.png"
            },
            "app": {
                "qrcodeScanning": [],
                "id": "5f81a04818860aca72aac021",
                "name": "firstdemo",
                "description": null,
                "identifier": "shubuzuo-oidc",
                "logo": "https:\/\/files.authing.co\/user-contents\/photos\/64b0396d-825e-40e1-b71b-c8f90e93f339.jpg",
                "loginTabs": [
                    "phone-code",
                    "password"
                ],
                "registerTabs": [
                    "email",
                    "phone"
                ],
                "adConnections": [],
                "disabledOidcConnections": [],
                "disabledSamlConnections": [],
                "extendsFields": [],
                "disabledAzureAdConnections": [],
                "disabledOauth2Connections": [],
                "disabledCasConnections": []
            },
            "operation_desc": "注册"
        }
    ]
}
```
