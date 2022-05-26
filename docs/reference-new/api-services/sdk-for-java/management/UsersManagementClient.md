---
meta:
  - name: description
    content: 管理用户
---

# 管理用户

<LastUpdated />

> 此模块可以进行用户目录增删改查、搜索用户、刷新用户 token、管理用户分组、管理用户角色、管理用户策略授权等操作。

## 创建用户

- managementClient.users().create(userInfo)
- managementClient.users().create(userInfo, options)

> 此接口将以管理员身份创建用户，不需要进行手机号验证码检验等安全检测。用户的手机号、邮箱、用户名、externalId 用户池内唯一。

#### 参数

- `userInfo` \<CreateUserInput\> 用户资料
- `userInfo.email` \<String\> 邮箱，用户池内唯一。
- `userInfo.emailVerified` \<Boolean\> 邮箱是否已验证
- `userInfo.phone` \<String\> 手机号
- `userInfo.phoneVerified` \<Boolean\> 手机号是否验证
- `userInfo.unionid` \<String\> 以社会化登录的用户该字段为用户在第三方社会化登录服务商中的唯一 ID。
- `userInfo.openid` \<String\> 微信登录返回的 openid
- `userInfo.password` \<String\> 密码
- `userInfo.registerSource` \<String\> 注册来源，可以多选。
- `userInfo.username` \<String\> 用户名
- `userInfo.nickname` \<String\> 昵称
- `userInfo.photo` \<String\> 头像
- `userInfo.company` \<String\> 公司
- `userInfo.browser` \<String\> 浏览器
- `userInfo.loginsCount` \<Integer\> 登录次数，当你从原有用户系统迁移到 {{$localeConfig.brandName}} 时可以设置该字段。
- `userInfo.lastLogin` \<String\> 上次登录时间，符合 ISO8601 格式的时间字符串。（如 "2017-06-07T14:34:08.700Z"，"2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00"）
- `userInfo.lastIP` \<String\> 用户最近一次登录（或其他活动）的 IP。
- `userInfo.signedUp` \<String\> 注册时间，符合 ISO8601 格式的时间字符串。（如 "2017-06-07T14:34:08.700Z"，"2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00"）
- `userInfo.blocked` \<Boolean\> 账号是否被锁定
- `userInfo.isDeleted` \<Boolean\> 标记账号是否被删除
- `userInfo.device` \<String\> 设备
- `userInfo.lastIP` \<String\> 最近登录的 IP
- `userInfo.name` \<String\> Name
- `userInfo.givenName` \<String\> Given Name
- `userInfo.familyName` \<String\> Family Name
- `userInfo.middleName` \<String\> Middle Name
- `userInfo.profile` \<String\> Profile Url
- `userInfo.preferredUsername` \<String\> Preferred Name
- `userInfo.website` \<String\> 个人网站
- `userInfo.gender` \<String\> 性别，M（Man） 表示男性、F（Female） 表示女性、未知表示 U（Unknown）。
- `userInfo.birthdate` \<String\> 生日
- `userInfo.zoneinfo` \<String\> 时区
- `userInfo.locale` \<String\> 语言
- `userInfo.address` \<String\> 地址
- `userInfo.streetAddress` \<String\> 街道地址
- `userInfo.locality` \<String\>
- `userInfo.region` \<String\> 地域
- `userInfo.postalCode` \<String\> 邮编
- `userInfo.city` \<String\> 城市
- `userInfo.province` \<String\> 省份
- `userInfo.country` \<String\> 国家
- `userInfo.externalId` \<String\> 用户外部 ID
- `userInfo.formatted` \<String\> 格式化后的地址
- `options` \<CreateUserOptions\> 可选
- `options.keepPassword` \<Boolean\> 该参数一般在迁移旧有用户数据到 Authing 的时候会设置。开启这个开关，password 字段会直接写入 Authing 数据库，Authing 不会再次加密此字段。如果你的密码不是明文存储，你应该保持开启，并编写密码函数计算。详情请见 [使用 SDK 导入用户](/guides/migrations/use-api.md)。

#### 示例

```java
String email = "test@example.com";
String password = "123456";
User user = managementClient.users().create(
  new CreateUserInput()
    .withPhone(email) // 由于是管理员操作，所以不需要检验手机号验证码, 如果你需要检验，请使用  AuthenticationClient
    .withPassword(password)
    .withLoginsCount(2) // 原有用户系统记录的用户登录次数
    .withSignedUp('2020-10-15T17:55:37+08:00') // 原有用户系统记录的用户注册时间
  ).execute();
```

## 修改用户资料

managementClient.users().update(userId, updates)

> 修改用户资料

#### 参数

- `userId` \<String\> 用户 ID
- `updates` \<UpdateUserInput\> 修改的用户资料
- `updates.email` \<String\> 邮箱
- `updates.emailVerified` \<Boolean\> 邮箱是否已验证
- `updates.phone` \<String\> 手机号
- `updates.phoneVerified` \<Boolean\> 手机号是否验证
- `updates.unionid` \<String\> 以社会化登录的用户该字段为用户在第三方社会化登录服务商中的唯一 ID。
- `updates.openid` \<String\> 微信登录返回的 openid
- `updates.password` \<String\> 密码
- `updates.registerSource` \<String\> 注册来源，可以多选。
- `updates.oauth` \<String\> OAUTH
- `updates.tokenExpiredAt` \<String\> token 过期时间，符合 ISO8601 格式的时间字符串。（如 "2017-06-07T14:34:08.700Z"，"2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00"）
  将该字段设置为小于当前时间可以让用户的 token 失效。
- `updates.username` \<String\> 用户名
- `updates.nickname` \<String\> 昵称
- `updates.photo` \<String\> 头像
- `updates.company` \<String\> 公司
- `updates.browser` \<String\> 浏览器
- `updates.loginsCount` \<Integer\> 登录次数，当你从原有用户系统迁移到 {{$localeConfig.brandName}} 时可以设置该字段。
- `updates.lastLogin` \<String\> 上次登录时间，符合 [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) 格式的时间字符串。（如 "2017-06-07T14:34:08.700Z"，"2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00"）
- `updates.lastIP` \<String\> 用户最近一次登录（或其他活动）的 IP。
- `updates.signedUp` \<String\> 注册时间，符合 [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) 格式的时间字符串。（如 "2017-06-07T14:34:08.700Z"，"2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00"）
- `updates.blocked` \<Boolean\> 账号是否被锁定
- `updates.device` \<String\> 设备
- `updates.lastIP` \<String\> 最近登录的 IP
- `updates.name` \<String\> Name
- `updates.givenName` \<String\> Given Name
- `updates.familyName` \<String\> Family Name
- `updates.middleName` \<String\> Middle Name
- `updates.profile` \<String\> Profile Url
- `updates.preferredUsername` \<String\> Preferred Name
- `updates.website` \<String\> 个人网站
- `updates.gender` \<String\> 性别, M（Man） 表示男性、F（Female） 表示女性、未知表示 U（Unknown）。
- `updates.birthdate` \<String\> 生日
- `updates.zoneinfo` \<String\> 时区
- `updates.locale` \<String\> 语言
- `updates.address` \<String\> 地址
- `updates.formatted` \<String\> 格式化后的地址
- `updates.streetAddress` \<String\> 街道地址
- `updates.locality` \<String\>
- `updates.region` \<String\> 地域
- `updates.postalCode` \<String\> 邮编
- `updates.city` \<String\> 城市
- `updates.province` \<String\> 省份
- `updates.country` \<String\> 国家
- `updates.externalId` \<String\> 用户外部 ID

#### 示例

```java
String userId = 'userId';
User result = managementClient.users().update(userId, new UpdateUserInput().withNickname("nickname")).execute();
```

#### 返回值

- [User](/guides/user/user-profile.md)

## 通过 ID 获取用户信息

managementClient.users().detail(userId)

> 通过用户 ID 获取用户详情，如果你想通过 token 获取用户详情，请使用 [AuthenticationClient SDK](/reference-new/api-services/sdk-for-java/authentication/AuthenticationClient.md#获取当前登录的用户信息) 。

#### 参数

- `userId` \<String\> 用户 ID

#### 示例

```java
User result = managementClient.users().detail("userId").execute();
```

#### 返回值

- [User](/guides/user/user-profile.md)

## 获取自定义数据

managementClient.users().getUdfValue(userId)

> 获取用户的自定义数据。你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)。

#### 参数

- `userId` \<String\> 用户 ID

#### 示例

```java
Map result = managementClient.users().getUdfValue("USER_ID").execute();
```

#### 示例数据

```json
{
  "school": "华中科技大学",
  "age": 20
}
```

## 批量获取自定义数据

managementClient.users().getUdfValueBatch(userIds)

> 批量获取多个用户的自定义数据。你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)。

#### 参数

- `userIds` \<List\<String\>\> 用户 ID 列表

#### 示例

```java
Map result = managementClient.users().getUdfValueBatch(Arrays.asList("5f9d0cef60d09ff5a4c87c06")).execute();
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

managementClient.users().setUdfValue(userId, data)

> 设置用户的自定义字段，需要用户池配置了该字段之后才能设置，且传入值的类型必须和定义的类型匹配。

#### 参数

- `userId ` \<String\> 用户 ID
- `data ` \<Map\<String, String\>\>  用户自定义数据 Map
- `data.key` \<String\> 自定义字段的 Key
- `data.value` \<String\> 所设置的值，传入值的类型必须和定义的类型匹配。

#### 示例

```java
Map<String, String> p = new HashMap();
p.put("dnum", "234");
List<UserDefinedData> result = this.usersManagementClient.setUdfValue("5f9d0cef60d09ff5a4c87c06", p).execute();
```

## 批量设置自定义数据

managementClient.users().setUdfValueBatch(input)

> 批量设置多个用户的自定义数据。你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。如果设置失败，会抛出异常，你需要对异常进行捕捉。

#### 参数

- `input` \<List\<SetUdfValueBatchInputItem\>\> 输入数据，结构请见示例。

#### Type
`SetUdfValueBatchInputItem` 
- `SetUdfValueBatchInputItem.userId` \<String\> 用户 ID
- `SetUdfValueBatchInputItem.data` \<Map\<String, String\>\> 用户自定义属性键值对

#### 示例

```Java
Map<String, String> p = new HashMap();
p.put("dnum", "189");
SetUdfValueBatchInputItem param = new SetUdfValueBatchInputItem("5f9d0cef60d09ff5a4c87c06", p);
List<UserDefinedData> result = managementClient.users().setUdfValueBatch(Arrays.asList(param)).execute();
```

## 删除自定义数据

managementClient.users().removeUdfValue(userId, key)

> 删除自定义数据。

#### 参数

- `userId ` \<String\> 用户 ID
- `key` \<String\> 自定义字段的 Key

#### 示例

```java
List<UserDefinedData> result = managementClient.users().removeUdfValue("5f9d0cef60d09ff5a4c87c06", "dnum").execute();
```

## 判断用户是否有某个角色

UsersManagementClient.hasRole(userId, roleCode, namespace)

> 判断用户是否有某个角色

#### 参数

- `userId` \<String\> 用户 ID
- `roleCode` \<String\> 角色 Code
- `namespace` \<String\> 权限分组的 Code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。

#### 示例

```javascript
managementClient.users.hasRole("USERID", "roleCode", "default");
```

#### 示例数据

```json
true
```

## 删除单个用户

managementClient.users().delete(userId)

> 通过用户 ID 删除用户。删除用户会联级删除此用户管理的所有相关数据，无法恢复，请谨慎操作。

#### 参数

- `userId` \<String\> 用户 ID

#### 示例

```java
managementClient.users().delete("userId").execute();
```

## 批量删除用户

managementClient.users().deleteMany(userIds)

> 批量删除用户，如果传入了不存在的用户 ID，会提示错误。

#### 参数

- `userIds` \<List\<String\>\> 用户 ID 列表

#### 示例

```java
ArrayList<String> userIds = new ArrayList<>();
userIds.add("userId");
managementClient.users().deleteMany(userIds).execute();
```

## 批量获取用户

managementClient.users().batch(identifiers, options)

> 通过 id、username、email、phone、email、externalId 批量获取用户详情，一次最多支持查询 80 个用户。

#### 参数

- `identifiers` \<List\<String\>\> 需要查询的数据列表，如用户 ID 列表、手机号列表。
- `options` \<BatchGetUserOptions\>
  - `options.queryField` \<BatchGetUserQueryFieldEnum\> 列表类型，可选值包含： 
    - BatchGetUserQueryFieldEnum.Id
    - BatchGetUserQueryFieldEnum.Username
    - BatchGetUserQueryFieldEnum.Phone
    - BatchGetUserQueryFieldEnum.Email 
    - BatchGetUserQueryFieldEnum.ExternalId
#### 示例

- 通过用户 ID 批量查询用户

```java
List<String> userIds = new ArrayList<>();
userIds.add("userId1");
userIds.add("userId2");
List<User> users = managementClient.users().batch(userIds).execute();
```

- 通过手机号批量查询用户

```java
ArrayList<String> list = new ArrayList<>();
list.add('phone1');
list.add('phone2');
List<User> users = managementClient.users()
    .batch(list, new BatchGetUserOptions(BatchGetUserQueryFieldEnum. Phone))
    .execute();
```

## 获取用户列表

managementClient.users().list()
managementClient.users().list(page)
managementClient.users().list(page, limit)
managementClient.users().list(page, limit, sortBy)
managementClient.users().list(param)

> 获取用户池用户列表，该接口为分页接口。

#### 参数

- `page` \<Integer\> 页码数，从 1 开始，默认值：`1`。
- `limit` \<Integer\> 每页包含的用户数，默认值：`10`。
- `sortBy` \<SortByEnum\> 排序规则 CREATEDAT_DESC：创建时间倒序 CREATEDAT_ASC：创建时间顺序 UPDATEDAT_DESC：更新时间倒序 UPDATEDAT_ASC：更新事时间顺序
- `param` \<UsersParam\> 查询参数。
#### 示例

```java
PaginatedUsers result = managementClient.users().list().execute();
// 当前页用户列表
List<User> list = result.getList();
// 用户总数
Integer totalCount = result.getTotalCount();
```

#### 返回值
- `totalCount` \<Integer\> 总数
- `list` \<List\<User\>\> 用户列表 [User](/guides/user/user-profile.md)。


## 检查用户是否存在

managementClient.users().exists(options)

> 通过用户名、邮箱、手机号或者 External ID 检查用户是否存在。

#### 参数

- `options` \<IsUserExistsParam\>
- `options.username` \<String\> 用户名，区分大小写。
- `options.email` \<String\> 邮箱，**邮箱不区分大小写**。
- `options.phone` \<String\> 手机号
- `options.externalId` \<String\> External ID

#### 示例

- 通过用户名查询用户是否存在

```java
Boolean exists = managementClient.users()
    .exists(new IsUserExistsParam().withUsername("test"))
    .execute();
```

- 通过手机号查询用户是否存在

```java
Boolean exists = managementClient.users()
    .exists(new IsUserExistsParam().withPhone(phone))
    .execute();
```

#### 返回值

如果用户存在，返回 `true`；如果用户不存在，返回 `false`。

## 查找用户

managementClient.users().find(options)

> 通过用户名、邮箱、手机号、External ID 精准查找用户。

#### 参数

- `options` \<FindUserParam\>
- `options.username` \<String\> 用户名，区分大小写。
- `options.email` \<String\> 邮箱，邮箱不区分大小写。
- `options.phone` \<String\> 手机号
- `options.externalId` \<String\> 用户外部 ID

#### 示例

- 通过用户名查询用户

```java
User user = managementClient.users().find(new FindUserParam().withUsername(username)).execute();
```

- 通过手机号查找用户

```java
User user = managementClient.users().find(new FindUserParam().withPhone(phone)).execute();
```

## 搜索用户

- managementClient.users().search(query, options, page, limit)
- managementClient.users().search(param)

> 根据关键字模糊搜索用户，该接口为分页接口。

#### 参数

- `query` \<String\> 搜索内容
- `options` \<List\<String\>\> 选项
- `options.fields` \<List\<String\>\> 搜索用户字段，如果不指定，默认会从 `username`、`nickname`、`email`、`phone`、`company`、`name`、`givenName`、`familyName`、`middleName`、`profile`、`preferredUsername` 这些字段进行模糊搜索。
  如果你需要精确查找，请使用 find 方法。
- `page` \<Integer\> 页码，默认值：`1`。
- `limit` \<Integer\> 每页展示条数，默认值：`10`。
- `param` \<SearchUserParam\> 用户查询入参
- `param.query` \<SearchUserParam\> 用户查询入参
- `param.fields` \<SearchUserParam\> 用户查询入参
- `param.page` \<Integer\> 页码，默认值：`1`。
- `param.limit` \<Integer\> 每页展示条数，默认值：`10`。
- `param.departmentOpts` \<List\<SearchUserDepartmentOptInput\>\> 部门查询选项
- `param.departmentOpts.departmentId` \<String\> 部门 ID
- `param.departmentOpts.includeChildrenDepartments` \<Boolean\> 是否包含子部门
- `param.groupOpts` \<List\<SearchUserGroupOptInput\>\> 分组查询选项
- `param.groupOpts.code` \<String\> 分组 Code
- `param.roleOpts` \<List<\SearchUserRoleOptInput\>\> 角色查询选项
- `param.roleOpts.namespace` \<String\> 角色权限分组 Code
- `param.roleOpts.code` \<String\> 角色 Code


#### 示例

```java
String query = "query";
PaginatedUsers result = managementClient.users().search(query).execute();
// 当前页用户列表
List<User> list = result.getList();
// 用户总数
Integer totalCount = result.getTotalCount();
```

## 强制下线一批用户

managementClient.users().kick(userIds)

> 强制让一批用户在 Authing 下线

#### 参数

- `userIds` \<List\<String\>\> 用户 ID 数组

#### 示例

```java
List<String> userIds = Arrays.asList("604b34ca6aa796c8b77d6c26", "604b34c44c27edbfd3d5293c");
Boolean res = managementClient.users().kick(userIds).execute();
```

#### 返回值

```json
{ "code": 200, "data": true, "message": "强制下线成功" }
```

## 获取用户分组列表

managementClient.users().listGroups(userId)

> 获取用户的分组列表。

#### 参数

- `userId` \<String\> 用户 ID

#### 示例

```java
managementClient.users().listGroups("userId").execute();
```

## 加入分组

managementClient.users().addGroup(userId, group)

> 将用户加入分组。

#### 参数

- `userId` \<String\> 用户 ID
- `group` \<String\> 分组的 Code，如 `admin`。

#### 示例

```java
managementClient.users().addGroup("userId", "admin").execute();
```

## 退出分组

managementClient.users().removeGroup(userId, group)

> 退出分组

#### 参数

- `userId` \<String\> 用户 ID
- `group` \<String\> 分组 Code

#### 示例

```java
managementClient.users().removeUdv("userId", "groupId").execute();
```

## 获取用户策略列表

- managementClient.users().listPolicies(userId)
- managementClient.users().listPolicies(userId, page)
- managementClient.users().listPolicies(userId, page, limit)

> 获取用户策略列表

#### 参数

- `userId` \<String\> 用户 ID
- `page` \<Integer\> 页码
- `limit` \<Integer\> 每页条数

#### 示例

```java
managementClient.users().listPolicies("userId", 1, 10).execute();
```

## 给用户添加策略

managementClient.users().addPolicies(userId, policies)

> 给用户添加策略

#### 参数

- `userId` \<String\> 用户 ID
- `policies` \<Integer\> 策略集合

#### 示例

```java
managementClient.users().addPolicies("userId", Arrays.asList("policy1", "policy2")).execute();
```

## 批量移除用户策略

managementClient.users().removePolicies(userId, policies)

> 批量移除用户策略

#### 参数

- `userId` \<String\> 用户 ID
- `policies` \<Integer\> 策略集合

#### 示例

```java
managementClient.users().removePolicies("userId", Arrays.asList("policy1", "policy2")).execute();
```

## 获取当前用户的自定义数据列表

managementClient.users().listUdv(userId)

> 获取当前用户的自定义数据列表

#### 参数

- `userId` \<String\> 用户 ID

#### 示例

```java
managementClient.users().listUdv("userId").execute();
```

## 设置当前用户的自定义数据

managementClient.users().setUdv(userId, data)

> 设置当前用户的自定义数据

#### 参数

- `userId` \<String\> 用户 ID
- `data` \<Map\<String, String\>\> 自定义数据
- `data.key` \<String\> 自定义数据的 Key
- `data.value` \<String\> 自定义数据 Value

#### 示例

```java
Map<String, String> data = new HashMap<>();
data.put("k", "v");
managementClient.users().setUdv("userId", data).execute();
```

## 移除用户的自定义数据

managementClient.users().removeUdv(userId, key)

> 移除用户的自定义数据

#### 参数

- `userId` \<String\> 用户 ID
- `key` \<String\> 自定义数据的 Key

#### 示例

```java
managementClient.users().removeUdv("userId", "key").execute();
```


## 获取用户所在组织机构列表

managementClient.users().listOrgs(userId)

> 获取用户所在组织机构列表

#### 参数

- `userId` \<String\> 用户 ID

#### 示例

```java
managementClient.users().listOrgs("userId").execute();
```


## 获取用户角色列表

- managementClient.users().listRoles(userId)
- managementClient.users().listRoles(userId, namespace)

> 获取用户的角色列表

#### 参数

- `userId` \<String\> 用户 ID
- `namespace` \<String\> 角色权限分组 Code

#### 示例

```java
PaginatedRoles roles = managementClient.users().listRoles("userId").execute();
```

## 添加角色

- managementClient.users().addRoles(userId, roles)
- managementClient.users().addRoles(userId, roles, namespace)

> 将用户加入角色

#### 参数

- `userId` \<String\> 用户 ID
- `roles` \<List\<String\>\> 角色 Code 列表
- `namespace` \<String\> 角色权限分组 Code

#### 示例

```java
ArrayList<String> roles = new ArrayList<>();
roles.add("role code");
managementClient.users().addRoles("userId", roles);
```

## 移除角色

- managementClient.users().removeRoles(userId, roles)
- managementClient.users().removeRoles(userId, roles, namespace)

> 将用户从角色中移除

#### 参数

- `userId` \<String\> 用户 ID
- `roles` \<List\<String\>\> 角色 Code 列表
- `namespace` \<String\> 角色权限分组 Code

#### 示例

```java
ArrayList<String> roles = new ArrayList<>();
roles.add("role code");
managementClient.users().removeRoles("userId", roles).execute();
```

## 刷新用户 token 

managementClient.users().refreshToken(userId)

> 刷新用户 token 刷新当前用户的 token，调用此接口要求先登录

#### 参数

- `userId` \<String\> 用户 ID

#### 示例

```java

RefreshToken refreshToken = managementClient.users().refreshToken("userId").execute();
```

## 获取用户被授权的所有资源列表

- managementClient.users().listAuthorizedResources(userId)
- managementClient.users().listAuthorizedResources(userId, namespace)
- managementClient.users().listAuthorizedResources(param)

> 获取一个用户被授权的所有资源，用户被授权的所有资源里面包括从角色、分组、组织机构继承的资源。

#### 参数

- `namespuserIdace` \<String\> 用户 ID
- `namespace` \<String\> 权限分组的 Code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。
- `param` \<ListUserAuthorizedResourcesParam\> 获取用户被授权的所有资源列表参数对象。
- `param.id` \<String\> 用户 ID
- `param.namespace` \<String\> 权限分组的 Code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。
- `param.resourceType` \<String\> 资源类型

#### 示例

```java
PaginatedAuthorizedResources res = managementClient.users()
    .listAuthorizedResources("userId").execute();
```

#### 示例数据

- `type` 为资源类型，一共有以下几种资源类型：
  - `DATA`：数据类型；
  - `API`：API 类型数据；
  - `MENU`：菜单类型数据；
  - `BUTTON`：按钮类型数据。
- `code` 资源描述符，如果是 `DATA` 类型资源，格式为 `resourceType:resourceId`，如 `books:*` 表示所有书籍，`books:1` 表示 ID 为 1 的书籍。
- `actions` 用户被授权对该资源的操作。

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

## 查看用户操作日志

managementClient.users().listUserActions(options)

> 查看用户操作日志

#### 参数

- `options` \<ListUserActionsParams\> 配置对象
- `options.clientIp` \<String\> 客户端 IP 地址，可选值。
- `options.operationName` \<String\> 操作类型，可选值。
- `options.operatoArn` \<String\> 用户 Arn 通过 searchUser 方法获得，可选值。
- `options.page` \<Integer\> 页码数，从 1 开始 默认值: `1`，可选值。
- `options.limit` \<Integer\> 每页包含的用户数 默认值: `10`，可选值。

#### 示例

```java
Pagination<Object> res = managementClient.users().listUserActions().execute();
```

## 获取用户所在部门

managementClient.users().listDepartment(userId)

> 获取用户所在部门列表

#### 参数

- `userId` \<String\> 用户 ID

#### 实例

```java
Pagination<UserDepartment> page = managementClient.users().listDepartment("USER_ID").execute();
```

## 检查用户登录状态

managementClient.users().checkLoginStatus(param)

> 检查用户登录状态

#### 参数

- `param` \<CheckLoginStatusParams\> 请求入参对象
- `param.appId` \<String\> 应用唯一标识
- `param.deviceId` \<String\> 设备唯一标识
- `param.userId` \<String\> 用户唯一标识

#### 实例

```java
UserCheckLoginStatusResponse user = managementClient.users().checkLoginStatus(new CheckLoginStatusParams("userId")).execute();
```

## 用户登出

managementClient.users().logout(param)

> 用户登出

#### 参数

- `param` \<UserLogoutParams\> 请求入参对象
- `param.appId` \<String\> 应用唯一标识
- `param.userId` \<String\> 用户唯一标识

#### 实例

```java
User user = managementClient.users().logout(new UserLogoutParams("userId")).execute();
```

## 获取已归档用户列表

managementClient.users().listArchivedUsers(page, limit)

> 获取已归档用户列表

#### 参数

- `page` \<Integer\> 页码数，从 1 开始 默认值：`1`。
- `limit` \<Integer\> 每页包含的用户数 默认值：`10`。

#### 实例

```java
PaginatedUsers res = managementClient.users().listArchivedUsers(1, 10).execute();
```


## 发送首次登录验证邮件

managementClient.users().sendFirstLoginVerifyEmail(appId, userId)

> 发送首次登录验证邮件

#### 参数

- `appId`  \<String\> 应用 ID
- `userId` \<String\> 用户 ID

#### 实例

```java
PaginatedUsers res = managementClient.users().sendFirstLoginVerifyEmail("appId", "userId").execute();
```

## 给用户绑定一个身份信息

managementClient.users().identityLink(param)

> 给用户绑定一个身份信息

#### 参数

- `param.userIdInIdp`  \<String\> 用户在外部身份源的唯一标识
- `param.isSocial` \<String\> 是否为社会化登录类型的身份源，可以传 boolean：true 和 false
- `param.type` \<String\> 该条身份的类型，可以随意填写，例如 openid 表示这是一个 openid 身份，unionid 表示这是一条 unionid 身份
- `param.extIdpId` \<string\>  必传，身份源 ID，用于指定该身份属于哪个身份源。
- `param.userId` \<String\> Authing 用户 ID，为这个用户绑定一个身份信息
- `param.identifier` \<String\> 身份源标识，用于指定该身份属于哪个身份源

#### 实例

```java
IdentityLinkParam identityLinkParam = new IdentityLinkParam("619c973baa9c48f77196cd5c",true,"unionid","61c45f1418c93578bbbac3c9","lq11");
CommonMessage commonMessage = managementClient().users.identityLink(identityLinkParam).execute();
```

## 解除用户某个身份源下的所有身份

managementClient.users().unIdentityLink(param)

> 给用户绑定一个身份信息

#### 参数

- `param.isSocial` \<String\> 是否为社会化登录类型的身份源，可以传 boolean：true 和 false
- `param.type` \<String\> 该条身份的类型，可以随意填写，例如 openid 表示这是一个 openid 身份，unionid 表示这是一条 unionid 身份
- `param.extIdpId` \<string\>  必传，身份源 ID，用于指定该身份属于哪个身份源。
- `param.userId` \<String\> Authing 用户 ID，为这个用户绑定一个身份信息
- `param.identifier` \<String\> 身份源标识，用于指定该身份属于哪个身份源

#### 实例

```java
UnIdentityLinkParam identityLinkParam = new UnIdentityLinkParam(true,"unionid","61c45f1418c93578bbbac3c9","lq11");
CommonMessage commonMessage =  managementClient().users.unIdentityLink(identityLinkParam).execute();
```
