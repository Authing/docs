---
meta:
  - name: description
    content: 管理用户
---

# 管理用户

<LastUpdated/>

> {{$localeConfig.brandName}} 管理模块。

此模块可以进行用户目录增删改查、搜索用户、刷新用户 token、管理用户分组、管理用户角色、管理用户策略授权等操作。

## 创建用户
```csharp
managementClient.Users.Create( CreateUserInput userInfo)
```
> 此接口将以管理员身份创建用户，不需要进行手机号验证码检验等安全检测。

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
- `userInfo.lastLogin` \<string\> 上次登录时间, 符合 ISO8601 格式的时间字符串。(如 "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")
- `userInfo.lastIP` \<string\> 用户最近一次登录（或其他活动）的 IP
- `userInfo.signedUp` \<string\> 注册时间，符合 ISO8601 格式的时间字符串。(如 "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")
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
- `userInfo.locality` \<string\>
- `userInfo.region` \<string\> 地域
- `userInfo.postalCode` \<string\> 邮编
- `userInfo.city` \<string\> 城市
- `userInfo.province` \<string\> 省份
- `userInfo.country` \<string\> 国家

#### 示例

```csharp
var email = "test@example.com";
var password = "123456";
var user = managementClient.Users.Create(new CreateUserInput()
{
  Email = email,
  Password = password,
})
```

## 修改用户资料
```csharp
managementClient.Users.Update(string userId, UpdateUserInput updates)
```
> 修改用户资料

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
- `updates.tokenExpiredAt` \<string\> token 过期时间，符合 ISO8601 格式的时间字符串。(如 "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")。
  将该字段设置为小于当前时间可以让用户的 token 失效。
- `updates.username` \<string\> 用户名
- `updates.nickname` \<string\> 昵称
- `updates.photo` \<string\> 头像
- `updates.company` \<string\> 公司
- `updates.browser` \<string\> 浏览器
- `updates.loginsCount` \<number\> 登录次数，当你从原有用户系统迁移到 {{$localeConfig.brandName}} 时可以设置该字段。
- `updates.lastLogin` \<string\> 上次登录时间, 符合 ISO8601 格式的时间字符串。(如 "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")
- `updates.lastIP` \<string\> 用户最近一次登录（或其他活动）的 IP
- `updates.signedUp` \<string\> 注册时间，符合 ISO8601 格式的时间字符串。(如 "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")
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

```csharp
var updates = new UpdateUserInput()
{  
  email = "***@**.com",            
}
managementClient.Users.Update("userId",  updates)
```
## 通过 ID 获取用户信息

```csharp
managementClient.Users.Detail(string userId, bool withCustomData = false)
```
> 通过用户 ID 获取用户详情，如果你想通过 token 获取用户详情，请使用 AuthenticationClient SDK 。

#### 参数

- `userId` \<string\> 用户 ID
- `withCustomData` \<boolean\> 是否带用户自定义数据，默认值false

#### 示例

```csharp
var user = await managementClient.Users.Detail("userId");
```

#### 返回值

- [User](/guides/user/user-profile.md)

## 获取自定义数据

```csharp
managementClient.Users.GetUdfValue(string userId)
```
> 获取用户的自定义数据。你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)。

#### 参数

- `userId` \<string\> 用户 ID

#### 示例

```csharp
managementClient.Users.GetUdfValue("USER_ID")
```

#### 示例数据

```json
{
  "school": "华中科技大学",
  "age": 20
}
```

## 批量获取自定义数据

```csharp
managementClient.Users.GetUdfValueBatch(string[] userIds)
```
> 批量获取多个用户的自定义数据。你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)。

#### 参数

- `userIds` \<List\<string\>\> 用户 ID 列表

#### 示例

```csharp
var userIdList = ["USER_ID1","USER_ID2"]
managementClient.Users.GetUdfValueBatch(userIdList)
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

```csharp
managementClient.Users.SetUdfValue(string userId, KeyValueDictionary data)
```
> 设置用户的自定义字段，需要用户池配置了该字段之后才能设置，且传入值的类型必须和定义的类型匹配。

#### 参数

- `userId ` \<string\> 用户 ID
- `data ` \<KeyValueDictionary\<string, string\>\>  用户自定义数据
- `data.key` \<string\> 自定义字段的 Key
- `data.value` \<string\> 所设置的值，传入值的类型必须和定义的类型匹配。

#### 示例

```csharp
var p = new Dictionary<string, string>();
p.Add("dnum", "234");
List<UserDefinedData> result = managementClient.Users.SetUdfValue("5f9d0cef60d09ff5a4c87c06", p);
```

## 批量设置自定义数据
```csharp
managementClient.Users.setUdfValueBatch(SetUserUdfValueBatchParam[] setUdfValueBatchInput)
```
> 批量设置多个用户的自定义数据。你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。如果设置失败，会抛出异常，你需要对异常进行捕捉。

#### 参数

- `input` \<List\<SetUdfValueBatchInputItem\>\> 输入数据，结构请见示例。

#### Type
`SetUdfValueBatchInputItem` 
- `SetUdfValueBatchInputItem.userId` \<string\> 用户 ID
- `SetUdfValueBatchInputItem.data` \<Dictionary\<string, string\>\> 用户自定义属性键值对

#### 示例

```csharp

var udf = new Types.KeyValueDictionary();
udf.Add("asdad", "val1");
var udfBatch = new Domain.Model.Management.Udf.SetUserUdfValueBatchParam()
{
  UserId = user.Id,
  Data = udf
};
var result = await managementClient.Users.setUdfValueBatch(new Domain.Model.Management.Udf.SetUserUdfValueBatchParam[] { udfBatch }));
```

## 删除自定义数据
```csharp
managementClient.Users.removeUdfValue(string userId, string key)
```
> 删除自定义数据。

#### 参数

- `userId ` \<string\> 用户 ID
- `key` \<string\> 自定义字段的 Key

#### 示例

```csharp
var result = await managementClient.Users.removeUdfValue("5f9d0cef60d09ff5a4c87c06", "dnum")
```
## 判断用户是否有某个角色
```csharp
managementClient.Users.HasRole(string userId, string roleCode, string _namespace = null)
```
> 判断用户是否有某个角色

#### 参数

- `userId` \<string\> 用户 ID
- `roleCode` \<string\> 角色 Code
- `namespace` \<string\> 权限分组的 Code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。

#### 示例

```csharp
managementClient.Users.HasRole("60b4a136d9xxxxcc3d87e55a", "roleCode", "default");
```

#### 示例数据

```json
true
```

## 删除单个用户
```csharp
managementClient.Users.Delete(string userId)
```
> 通过用户 ID 删除用户。删除用户会联级删除此用户管理的所有相关数据，无法恢复，请谨慎操作。

#### 参数

- `userId` \<string\> 用户 ID

#### 示例

```csharp
var result = await managementClient.Users.Delete("userId");
```


## 批量删除用户
```csharp
managementClient.Users.DeleteMany(IEnumerable<string> userIds)
```
> 批量删除用户，如果传入了不存在的用户 ID，会提示错误。

#### 参数

- `userIds` \<List\<string\>\> 用户 ID 列表

#### 示例

```csharp
managementClient.Users.DeleteMany(new string[] { "userId" });
```

## 批量获取用户
```csharp
managementClient.Users.Batch( IEnumerable<string> userIds,, options)
```
> 通过 id、username、email、phone、email、externalId 批量获取用户详情，一次最多支持查询 80 个用户。

#### 参数

- `userIds` \<List\<string\>\> 需要查询的数据列表，如用户 ID 列表、手机号列表。
#### 示例

- 通过用户 ID 批量查询用户

```csharp
var userIdList = new List<string>() { "userId1", "userId2" };
var result = await managementClient.Users.Batch(userIdList);
```

## 获取用户列表
```csharp

managementClient.Users.List(int page, int limit)

```
> 获取用户池用户列表，该接口为分页接口。

#### 参数

- `page` \<int\> 页码数，从 1 开始，默认值：1。
- `limit` \<int\> 每页包含的用户数，默认值：10。
#### 示例

```csharp
PaginatedUsers result = managementClient.Users.List(1，10);
```

#### 返回值
- `totalCount` \<int\> 总数
- `list` \<List\<User\>\> 用户列表 [User](/guides/user/user-profile.md)。

## 检查用户是否存在
```csharp
managementClient.Users.Exists(ExistsOption options)
```
> 通过用户名、邮箱、手机号或者 External ID 检查用户是否存在。

#### 参数

- `options` \<IsUserExistsParam\>
- `options.Username` \<string\> 用户名，区分大小写。
- `options.Email` \<string\> 邮箱，**邮箱不区分大小写**。
- `options.Phone` \<string\> 手机号
- `options.ExternalId` \<string\> External ID

#### 示例

- 通过用户名查询用户是否存在

```csharp
var options = new FindUserOption()
    {
        UserName = "小明"
    };
var  B = await managementClient.Users.Exists(options);
```

- 通过手机号查询用户是否存在

```csharp
var options = new FindUserOption()
    {
        Phone = "1******"
    };
var B = await  managementClient.Users.Exists(options);
```

#### 返回值

```csharp
如果用户存在，返回 `true`；如果用户不存在，返回 `false`。
```
## 查找用户
```csharp
managementClient.Users.Find (FindUserOption options)
```
> 通过用户名、邮箱、手机号、External ID 精准查找用户。

#### 参数

- `options` \<FindUserParam\>
- `options.Username` \<string\> 用户名，区分大小写。
- `options.Email` \<string\> 邮箱，邮箱不区分大小写。
- `options.Phone` \<string\> 手机号
- `options.ExternalId` \<string\> 用户外部 ID

#### 示例

- 通过用户名查询用户

```csharp
var options = new FindUserOption()
    {
        Username = "username"
    };
var user = await managementClient.Users.Find(options);
```

- 通过手机号查找用户

```csharp
var options = new FindUserOption()
    {
        Phone = "1******"
    };
User user = managementClient.Users.Find(options);
```

## 搜索用户
```csharp
 managementClient.Users.Search( string query,SearchOption option = null)
managementClient.Users.Search(param)
```
> 根据关键字模糊搜索用户，该接口为分页接口。

#### 参数

- `query` \<string\> 搜索内容
- `options` \<List\<string\>\> 选项
- `options.Fields` \<List\<string\>\> 搜索用户字段，如果不指定，默认会从 `username`、`nickname`、`email`、`phone`、`company`、`name`、`givenName`、`familyName`、`middleName`、`profile`、`preferredUsername` 这些字段进行模糊搜索。
  如果你需要精确查找，请使用 find 方法。
- `options.Page` \<int\> 页码，默认值：1。
- `options.Limit` \<int\> 每页展示条数，默认值：10。
- `options.DepartmentOpts` \<List\<SearchUserGroupOpt>\> 
- `options.GroupOpts` \<List\<SearchUserRoleOpt>\> 
- `options.WithCustomData` \<bool\> 
-


#### 示例

```csharp
var query = "query";
var result = managementClient.Users.Search(query);
```

## 强制下线一批用户
```csharp
managementClient.Users.Kick(IEnumerable<string> userIds)
```
> 强制让一批用户在 Authing 下线

#### 参数

- `userIds` \<List\<string\>\> 用户 ID 数组

#### 示例

```csharp
var userIds = new List<string>(){"604b34ca6aa796c8b77d6c26", "604b34c44c27edbfd3d5293c"}
var res = await managementClient.Users.Kick(userIds);
```

#### 返回值

```json
{ "code": 200, "data": true, "message": "强制下线成功" }
```

## 获取用户分组列表
```csharp
managementClient.Users.ListGroups(string userId)
```
> 获取用户的分组列表。

#### 参数

- `userId` \<string\> 用户 ID

#### 示例

```csharp
managementClient.Users.ListGroups("userId");
```


## 加入分组
```csharp
managementClient.Users.AddGroup(string userId, string group)
```
> 将用户加入分组。

#### 参数

- `userId` \<string\> 用户 ID
- `group` \<string\> 分组 ID

#### 示例

```csharp
managementClient.Users.AddGroup("userId","groupId");
```

## 退出分组

```csharp
managementClient.Users.RemoveGroup(string userId, string group)
```
> 退出分组

#### 参数

- `userId` \<string\> 用户 ID
- `group` \<string\> 分组 Code

#### 示例

```csharp
var result = await managementClient.Users.RemoveGroup("userId", "groupId")
```

## 获取用户策略列表
```csharp
RolesManagementClient.Roles.ListPolicies(string code, int page = 1, int limit = 10)
```
> 获取用户策略列表

#### 参数

- `code` \<string\> 用户 ID
- `page` \<int\> 页码
- `limit` \<int\> 每页条数

#### 示例

```csharp
RolesManagementClient.Roles.ListPolicies("userId")
```

## 给用户添加策略

```csharp
RolesManagementClient.Roles.AddPolicies(string code, IEnumerable<string> policies)
```
> 给用户添加策略

#### 参数

- `userId` \<string\> 用户 ID
- `policies` \<List\<string>\> 策略集合

#### 示例

```csharp
var options = new List<string>{"604b34ca6aa796c8b77d6c26", "604b34c44c27edbfd3d5293c"}
RolesManagementClient.Roles.AddPolicies("userId", options)
```
## 批量移除用户策略

```csharp
RolesManagementClient.Roles.RemovePolicies(string code,IEnumerable<string> policies)
```
> 批量移除用户策略

#### 参数

- `userId` \<string\> 用户 ID
- `policies` \<IEnumerable\<string>\> 策略集合

#### 示例

```csharp
var policiesList = new List<string>() { "policy1", "policy2" };
RolesManagementClient.Roles.RemovePolicies("userId", policiesList);
```

## 设置当前用户的自定义数据

```csharp
managementClient.Users.setUdv(string key, object value)
```
> 设置当前用户的自定义数据

#### 参数

- `userId` \<string\> 用户 ID
- `data` \<IEnumerable\<string\>\> 自定义数据
- `data.key` \<string\> 自定义数据的 Key
- `data.value` \<string\> 自定义数据 Value

## 移除用户的自定义数据

```csharp
managementClient.Users.RemoveUdv(string key)
```
> 移除用户的自定义数据

#### 参数

- `userId` \<string\> 用户 ID
- `key` \<string\> 自定义数据的 Key

#### 示例

```csharp
managementClient.Users.RemoveUdv("key")
```


## 获取用户所在组织机构列表
```csharp
managementClient.Users.ListOrgs(string userId)
```
> 获取用户所在组织机构列表

#### 参数

- `userId` \<string\> 用户 ID

#### 示例

```csharp
managementClient.Users.ListOrgs("userId");
```

## 刷新用户 token 

```csharp
managementClient.Users.RefreshToken(string accessToken)
```
> 刷新用户 token 刷新当前用户的 token，调用此接口要求先登录

#### 参数

- `userId` \<string\> 用户 ID

#### 示例

```csharp
managementClient.Users.RefreshToken("accessToken")
```

## 获取用户被授权的所有资源列表

```csharp
managementClient.Users.ListAuthorizedResources(string nameSpace, ResourceType? _resourceTyp)

```
> 获取一个用户被授权的所有资源，用户被授权的所有资源里面包括从角色、分组、组织机构继承的资源。

#### 参数


- `namespace` \<string\> 权限分组的 Code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。
- `param.resourceType` \<string\> 资源类型

#### 示例

```csharp
  managementClient.Users.ListAuthorizedResources("roleId")
```

## 查看用户操作日志

```csharp
managementClient.Users.ListUserActions(ListUserActionsParam listUserActionsParam = nul)
```
> 查看用户操作日志

#### 参数

- `options` \<ListUserActionsParams\> 配置对象
- `options.clientIp` \<string\> 客户端 IP 地址，可选值。
- `options.operationName` \<string\> 操作类型，可选值。
- `options.operatoArn` \<string\> 用户 Arn 通过 searchUser 方法获得，可选值。
- `options.page` \<int\> 页码数，从 1 开始 默认值: `1`，可选值。
- `options.limit` \<int\> 每页包含的用户数 默认值: `10`，可选值。

#### 示例

```csharp
var option = new ListUserActionsParam(){}
managementClient.Users.ListUserActions(option);
```
## 获取用户所在部门

```csharp
managementClient.Users.listDepartment(string userId)
```
> 获取用户所在部门列表

#### 参数

- `userId` \<string\> 用户 ID

#### 实例

```csharp
 managementClient.Users.listDepartment("USER_ID");
```


## 检查用户登录状态
```csharp
managementClient.Users.CheckLoginStatus(string userId, string appId = null, string devicdId = null)
```
> 检查用户登录状态

#### 参数

- `appId` \<string\> 应用唯一标识
- `deviceId` \<string\> 设备唯一标识
- `userId` \<string\> 用户唯一标识

#### 实例

```csharp
managementClient.Users.CheckLoginStatus("userId");
```
## 用户登出
```csharp
managementClient.Users.Logout(LogoutParam logoutParam)
```
> 用户登出

#### 参数

- `param` \<LogoutParam\> 请求入参对象
- `param.appId` \<string\> 应用唯一标识
- `param.userId` \<string\> 用户唯一标识

#### 实例

```csharp
var user = managementClient.Users.Logout(new LogoutParam(){appId = "appId",userId = "userId"});
```

## 获取已归档用户列表

```csharp
managementClient.Users.ListArchivedUsers( int page = 1, int limit = 10 )
```
> 获取已归档用户列表

#### 参数

- `page` \<int\> 页码数，从 1 开始 默认值：`1`。
- `limit` \<int\> 每页包含的用户数 默认值：`10`。

#### 实例

```csharp
var res = managementClient.Users.ListArchivedUsers(1, 10);
```

## 发送首次登录验证邮件

```csharp
managementClient.Users.SendFirstLoginVerifyEmail(SendFirstLoginVerifyEmailParam option)
```
> 发送首次登录验证邮件

#### 参数
- `option` \<SendFirstLoginVerifyEmailParam\>
- `option.AppId`  \<string\> 应用 ID
- `option.UserId` \<string\> 用户 ID

#### 实例

```csharp
var option = new SendFirstLoginVerifyEmailParam(){
  AppId = "AppId",
  UserId = "UserId"
}
var res = managementClient.Users.SendFirstLoginVerifyEmail(option);
```


```csharp
managementClient.Users.LinkIdentity(LinkIdentityOption option)

```
> 给用户绑定一个身份

#### 参数


- `option` \<LinkIdentityOption\> 
- `option.UserId` \<string\> 用户 ID
- `option.UserIdInIdp` \<string\> 用户在外部身份源的唯一标识
- `option.IsSocial` \<boolean\> 是否为社会化登录类型的身份源，可以传 boolean：true 和 false
- `option.Type` \<string\> 该条身份的类型，可以随意填写，例如 openid 表示这是一个 openid 身份，unionid 表示这是一条 unionid 身份  可选值
- `option.Identifier` \<string\> 身份源标识，用于指定该身份属于哪个身份源
#### 示例

```csharp
var option = new LinkIdentityOption()
{
  UserId = "UserId",
  UserIdInIdp = "UserIdInIdp"
  IsSocial = true 
  Identifier = "Identifier"
} 
var result = await managementClient.Users.ListAuthorizedResources(option)
```



```csharp
managementClient.Users.UnlinkIdentity(UnlinkIdentityOption option)

```
> 给用户绑定一个身份

#### 参数


- `option` \<UnlinkIdentityOption\> 
- `option.UserId` \<string\> 用户 ID
- `option.IsSocial` \<boolean\> 是否为社会化登录类型的身份源，可以传 boolean：true 和 false
- `option.Type` \<string\> 该条身份的类型，可以随意填写，例如 openid 表示这是一个 openid 身份，unionid 表示这是一条 unionid 身份
- `option.Identifier` \<string\> 身份源标识，用于指定该身份属于哪个身份源
#### 示例

```csharp
var option = new LinkIdentityOption()
  {
    UserId = "UserId",
    UserIdInIdp = "UserIdInIdp"
    IsSocial = true 
    Identifier = "Identifier"
  } 
managementClient.Users.UnlinkIdentity(option)
```


## 批量撤销用户角色

```csharp
managementClient.Users. RemoveRoles(
  string userId,
  IEnumerable<string> roles,
  string _namespace = null
  )
```
#### 参数

- `userId` \<string\> 用户 ID
- `roles` \<IEnumerable\<string\>\>   用户角色 Code 列表
#### 示例

```csharp
managementClient.Users.RemoveRoles(user.Id, new List<string>() { "test" });
```


## 获取用户所在组织机构

```csharp
managementClient.Users.ListOrgs(string userId)
```
#### 参数

- `userId` \<string\> 用户 ID
#### 示例

```csharp
managementClient.Users.ListOrgs("userId");
```

## 获取用户所在部门

```csharp
managementClient.Users.ListDepartment(string userId)
```
#### 参数

- `userId` \<string\> 用户 ID
#### 示例

```csharp
managementClient.Users.ListDepartment("userId");
```

## 获取用户被授权的所有资源

```csharp
managementClient.Users.ListAuthorizedResources(
  string userId,
  string _namespace,
  ListAuthorizedResourcesOption option = null
)
```
#### 参数

- `userId` \<string\> 用户 ID
- `_namespace` \<string\> 资源分组
- `option` \<ListAuthorizedResourcesOption\>
#### 示例

```csharp
managementClient.Users.ListDepartment("userId","_namespace");
```


## 清除用户的自定义数据

```csharp
managementClient.Users.RemoveUdfValue(string userId, string key)
```
#### 参数

- `userId` \<string\> 用户 ID
- `key` \<string\> 
#### 示例

```csharp
managementClient.Users.RemoveUdfValue("userId","key");
```

## 判断用户是否有某个角色

```csharp
managementClient.Users.hasRole(string userId, string roleCode, string _namespace = null)
```
#### 参数

- `userId` \<string\> 用户 ID
- `roleCode` \<string\> 角色 Code
- `_namespace` \<string\> 权限分组 ID
#### 示例

```csharp
managementClient.Users.hasRole("userId", "roleCode")
```

## 批量导入用户

```csharp
managementClient.Users.CreateUsers(IEnumerable<CreateUserInput> userInfos)
```
#### 参数

- `userInfos`  \<List\<CreateUserInput\>\>  用户信息列表
#### 示例

```csharp
var userInfos = new IEnumerable<CreateUserInput>(){}
managementClient.Users.hasRole(userInfos)
```

## 获取用户所在租户

```csharp
managementClient.Users.GetUserTenants(string userId)
```
#### 参数

- `userId`  \<string\>  用户 ID
#### 示例

```csharp
managementClient.Users.GetUserTenants("userId")
```