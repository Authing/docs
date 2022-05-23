---
meta:
  - name: description
    content: 管理用户
---

# 管理用户

<LastUpdated/>

此模块可以进行用户目录增删改查、搜索用户、管理用户分组、管理用户角色、管理用户策略授权等操作。

请通过以下方式使用该模块：

```go
client := NewClient(userPoolId, secret)
client.ListUser() # 获取用户列表
client.CreateUser() # 创建用户
```

## 创建用户
>此接口将以管理员身份创建用户，不需要进行手机号验证码检验等安全检测。用户的手机号、邮箱、用户名、externalId 用户池内唯一

```go
// CreateUser
// 创建用户
func (c *Client) CreateUser(request model.CreateUserRequest) (*model.User, error)
```

#### 参数
- `request` \<CreateUserRequest\> 用户资料
- `CreateUserRequest.Email` \<string\> 邮箱，用户池内唯一
- `CreateUserRequest.EmailVerified` \<bool\> 邮箱是否已验证
- `CreateUserRequest.Phone` \<string\> 手机号
- `CreateUserRequest.PhoneVerified` \<bool\> 手机号是否验证
- `CreateUserRequest.Unionid` \<string\> 以社会化登录的用户该字段为用户在第三方社会化登录服务商中的唯一 ID
- `CreateUserRequest.Openid` \<string\> 微信登录返回的 openid
- `CreateUserRequest.Password` \<string\> 密码
- `CreateUserRequest.RegisterSource` \<string\> 注册来源，可以多选
- `CreateUserRequest.Username` \<string\> 用户名
- `CreateUserRequest.Nickname` \<string\> 昵称
- `CreateUserRequest.Photo` \<string\> 头像
- `CreateUserRequest.Company` \<string\> 公司
- `CreateUserRequest.Browser` \<string\> 浏览器
- `CreateUserRequest.LoginsCount` \<int\> 登录次数，当你从原有用户系统迁移到 {{$localeConfig.brandName}} 时可以设置该字段
- `CreateUserRequest.LastLogin` \<string\> 上次登录时间, 符合 [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) 格式的时间字符串。(如 "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")
- `CreateUserRequest.LastIP` \<string\> 用户最近一次登录（或其他活动）的 IP
- `CreateUserRequest.SignedUp` \<string\> 注册时间，符合 [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) 格式的时间字符串。(如 "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")
- `CreateUserRequest.Blocked` \<bool\> 账号是否被锁定
- `CreateUserRequest.IsDeleted` \<bool\> 标记账号是否被删除
- `CreateUserRequest.Device` \<string\> 设备
- `CreateUserRequest.LastIP` \<string\> 最近登录的 IP
- `CreateUserRequest.Name` \<string\> Name
- `CreateUserRequest.GivenName` \<string\> Given Name
- `CreateUserRequest.FamilyName` \<string\> Family Name
- `CreateUserRequest.MiddleName` \<string\> Middle Name
- `CreateUserRequest.Profile` \<string\> Profile Url
- `CreateUserRequest.PreferredUsername` \<string\> Preferred Name
- `CreateUserRequest.Website` \<string\> 个人网站
- `CreateUserRequest.Gender` \<string\> 性别, M（Man） 表示男性、F（Female） 表示女性、未知表示 U（Unknown）
- `CreateUserRequest.Birthdate` \<string\> 生日
- `CreateUserRequest.Zoneinfo` \<string\> 时区
- `CreateUserRequest.Locale` \<string\> 语言
- `CreateUserRequest.Address` \<string\> 地址
- `CreateUserRequest.StreetAddress` \<string\> 街道地址
- `CreateUserRequest.Locality` \<string\>
- `CreateUserRequest.Region` \<string\> 地域
- `CreateUserRequest.PostalCode` \<string\> 邮编
- `CreateUserRequest.City` \<string\> 城市
- `CreateUserRequest.Province` \<string\> 省份
- `CreateUserRequest.Country` \<string\> 国家
- `CreateUserRequest.ExternalId` \<string\> 内部员工 ID，此项在用户目录中为唯一

#### 示例

```go
    phone := "15761403457222"
	username := "xx"
	pwd := "123456789"
	var userInfo = &model.CreateUserInput{
		Username: &username,
		Phone:    &phone,
		Password: &pwd,
	}
	req := model.CreateUserRequest{
		UserInfo: *userInfo,
	}
	resp, err := client.CreateUser(req)
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
```go
//UpdateUser
//修改用户资料
func (c *Client) UpdateUser(id string, updateInfo model.UpdateUserInput) (*model.User, error) 
```

#### 参数

- `userId` \<string\> 用户 ID
- `updateInfo` \<UpdateUserInput\> 修改的用户资料
- `UpdateUserInput.Email` \<string\> 邮箱
- `UpdateUserInput.EmailVerified` \<bool\> 邮箱是否已验证
- `UpdateUserInput.Phone` \<string\> 手机号
- `UpdateUserInput.PhoneVerified` \<bool\> 手机号是否验证
- `UpdateUserInput.Unionid` \<string\> 以社会化登录的用户该字段为用户在第三方社会化登录服务商中的唯一 ID
- `UpdateUserInput.Openid` \<string\> 微信登录返回的 openid
- `UpdateUserInput.Password` \<string\> 密码
- `UpdateUserInput.RegisterSource` \<string\> 注册来源，可以多选
- `UpdateUserInput.TokenExpiredAt` \<string\> token 过期时间，符合 [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) 格式的时间字符串。(如 "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")。
  将该字段设置为小于当前时间可以让用户的 token 失效
- `UpdateUserInput.Username` \<string\> 用户名
- `UpdateUserInput.Nickname` \<string\> 昵称
- `UpdateUserInput.Photo` \<string\> 头像
- `UpdateUserInput.Company` \<string\> 公司
- `UpdateUserInput.Browser` \<string\> 浏览器
- `UpdateUserInput.LoginsCount` \<int\> 登录次数，当你从原有用户系统迁移到 {{$localeConfig.brandName}} 时可以设置该字段
- `UpdateUserInput.LastLogin` \<string\> 上次登录时间, 符合 [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) 格式的时间字符串。(如 "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")
- `UpdateUserInput.LastIP` \<string\> 用户最近一次登录（或其他活动）的 IP
- `UpdateUserInput.SignedUp` \<string\> 注册时间，符合 [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) 格式的时间字符串。(如 "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")
- `UpdateUserInput.Blocked` \<bool\> 账号是否被锁定
- `UpdateUserInput.Device` \<string\> 设备
- `UpdateUserInput.LastIP` \<string\> 最近登录的 IP
- `UpdateUserInput.Name` \<string\> Name
- `UpdateUserInput.GivenName` \<string\> Given Name
- `UpdateUserInput.FamilyName` \<string\> Family Name
- `UpdateUserInput.MiddleName` \<string\> Middle Name
- `UpdateUserInput.Profile` \<string\> Profile Url
- `UpdateUserInput.PreferredUsername` \<string\> Preferred Name
- `UpdateUserInput.Website` \<string\> 个人网站
- `UpdateUserInput.Gender` \<string\> 性别, M（Man） 表示男性、F（Female） 表示女性、未知表示 U（Unknown）
- `UpdateUserInput.Birthdate` \<string\> 生日
- `UpdateUserInput.Zoneinfo` \<string\> 时区
- `UpdateUserInput.Locale` \<string\> 语言
- `UpdateUserInput.Address` \<string\> 地址
- `UpdateUserInput.StreetAddress` \<string\> 街道地址
- `UpdateUserInput.Locality` \<string\>
- `UpdateUserInput.Region` \<string\> 地域
- `UpdateUserInput.PostalCode` \<string\> 邮编
- `UpdateUserInput.City` \<string\> 城市
- `UpdateUserInput.Province` \<string\> 省份
- `UpdateUserInput.Country` \<string\> 国家
- `UpdateUserInput.ExternalId` \<string\> 用户外部 ID

#### 示例

```go
    var userInfo = &model.UpdateUserInput{
		Username: &username,
		Phone:    &phone,
	}

	resp, err := client.UpdateUser("616d4333b809f9f4768db847", *userInfo)
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
>通过用户 ID 获取用户详情，如果你想通过 token 获取用户详情，请使用 [AuthenticationClient SDK](/reference/sdk-for-go/authentication/AuthenticationClient.md#获取当前登录的用户信息)

```go
// Detail
// 获取用户详情
func (c *Client) Detail(userId string) (*model.User, error)
```

#### 参数
- `userId` \<string\> 用户 ID
 
#### 示例
```go
resp, _ := client.Detail("60a6f9ad5bcccc51834950c5")
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

```go
//GetUserUdfValue
//获取某个用户的所有自定义数据
func (c *Client) GetUserUdfValue(userId string) (*[]model.UserDefinedData, error)
```
#### 参数

- `userId` \<string\> 用户 ID

#### 示例

```go
resp, err := client.GetUserUdfValue("616d41b7410a33da0cb70e65")
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

```go
// BatchGetUserUdfValue
// 批量获取多个用户的自定义数据
func (c *Client) BatchGetUserUdfValue(ids []string) (map[string][]model.UserDefinedData, error)
```

#### 参数

- `ids` \<[]string\> 用户 ID 列表

#### 示例

```go
resp, err := client.BatchGetUserUdfValue([]string{"616d41b7410a33da0cb70e65"})
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

```go
// SetUserUdfValue
// 设置某个用户的自定义数据
func (c *Client) SetUserUdfValue(id string, udv *model.KeyValuePair) (*[]model.UserDefinedData, error)
```
#### 参数
- `id` \<string\> 用户 ID
- `udv` \<KeyValuePair>\ 自定义字段数据，类型为一个对象
#### 示例

```go
    udv := model.KeyValuePair{
		Key:   "school",
		Value: "1x1",
	}
	resp, err := client.SetUserUdfValue("616d41b7410a33da0cb70e65", &udv)
```

## 批量设置自定义数据
>批量设置多个用户的自定义数据。你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。如果设置失败，会抛出异常，你需要对异常进行捕捉

```go
// BatchSetUserUdfValue
// 批量设置自定义数据
func (c *Client) BatchSetUserUdfValue(request *[]model.SetUdfValueBatchInput) (*model.CommonMessageAndCode, error)
```

#### 参数
- `request` \<SetUdfValueBatchInput\> 
- `SetUdfValueBatchInput.TargetId` \<string\> 目标标识
- `SetUdfValueBatchInput.Key` \<string\> 自定义 Key
- `SetUdfValueBatchInput.Value` \<string\> 自定义 Value

#### 示例

```go
resp, err := client.SetUserUdfValue([]model.SetUdfValueBatchInput{{
    TargetId:"id",
    Key:"key",
    Value:"val",
}})
```

## 删除自定义数据
>删除自定义数据

```go
// RemoveUserUdfValue
// 清除用户的自定义数据
func (c *Client) RemoveUserUdfValue(id, key string) (*[]model.UserDefinedData, error)
```

#### 参数
- `id` \<string\> 用户 ID
- `key` \<string\> 自定义字段的 key
#### 示例
```go
resp, err := client.RemoveUserUdfValue("id","key")
```

## 删除用户
>通过用户 ID 删除用户。删除用户会联级删除此用户管理的所有相关数据，无法恢复，请谨慎操作
```go
//DeleteUser
//删除用户
func (c *Client) DeleteUser(id string) (*model.CommonMessageAndCode, error)
```
#### 参数

- `id` \<string\> 用户 ID

#### 示例

```go
resp, err := client.DeleteUser("616d57e96dfa54908eda326f")
```

## 批量删除用户
>批量删除用户，如果传入了不存在的用户 ID，会提示错误
```go
//BatchDeleteUser
//批量删除用户
func (c *Client) BatchDeleteUser(ids []string) (*model.CommonMessageAndCode, error)
```
#### 参数

- `ids` \<[]string\> 用户 ID 列表

#### 示例

```go
resp, err := client.BatchDeleteUser([]string{"616d430d58dbf82d1364453e"})
```

## 批量获取用户
>通过 id、username、email、phone、email、externalId 批量获取用户详情。一次最多支持查询 80 个用户

```go
//BatchGetUser
//通过 ID、username、email、phone、email、externalId 批量获取用户详情
func (c *Client) BatchGetUser(ids []string, queryField string, withCustomData bool) (*[]model.User, error)
```


#### 参数

- `ids` \<[]string\> 需要查询的数据列表，如用户 ID 列表、手机号列表
- `queryField` \<string\> 列表类型，可选值为 'id' ,'username' ,'phone' ,'email', 'externalId'，默认为 'id'
- `withCustomData`: \<bool\> 是否获取自定义数据，默认为 false；如果设置为 true，将会在 `customData` 字段返回用户的所有自定义数据
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
```go
resp, err := client.BatchGetUser([]string{"xxq", "xx"}, "username", true)
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

```go
// GetUserList
// 获取用户列表
func (c *Client) GetUserList(request model.QueryListRequest) (*model.PaginatedUsers, error)
```


#### 参数
- `request` \<QueryListRequest\>  
- `QueryListRequest.Page` \<int\> 页码数, 从 1 开始 默认值为 : `1`
- `QueryListRequest.Limit` \<int\> 每页包含的用户数 默认值为 : `10`

#### 示例

```go
    custom := true
	req := model.QueryListRequest{
		Page:           1,
		Limit:          10,
		SortBy:         enum.SortByCreatedAtAsc,
		WithCustomData: &custom,
	}
	resp, _ := client.GetUserList(req)
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

```go
//ListArchivedUsers
//获取已归档用户列表
func (c *Client) ListArchivedUsers(request model.CommonPageRequest) (*model.CommonPageUsersResponse, error)
```


#### 参数
- `request` \<CommonPageRequest\>  
- `CommonPageRequest.Page` \<int\> 页码数, 从 1 开始 默认值为 : `1`
- `CommonPageRequest.Limit` \<int\> 每页包含的用户数 默认值为 : `10`

#### 示例

```go
    resp, err := client.ListArchivedUsers(model.CommonPageRequest{
		Page:  1,
		Limit: 10,
	})
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

```go
// CheckUserExists
// 检查用户是否存在
func (c *Client) CheckUserExists(request model.CheckUserExistsRequest) (bool, error)
```


#### 参数

- `request` \<CheckUserExistsRequest\>  
- `CheckUserExistsRequest.Username` \<string\> 用户名，区分大小写
- `CheckUserExistsRequest.Email` \<string\> 邮箱，**邮箱不区分大小写**
- `CheckUserExistsRequest.Phone` \<string\> 手机号
- `CheckUserExistsRequest.ExternalId` \<string\> External ID

#### 示例

- 查询用户名 `test` 是否存在

```go
    phone := "15761403457"
	req := model.CheckUserExistsRequest{
		Email:      nil,
		Phone:      &phone,
		Username:   nil,
		ExternalId: nil,
	}
	resp, _ := client.CheckUserExists(req)
```

#### 返回值
```
如果用户存在，返回 True 如果用户不存在，返回 False
```

## 查找用户
>通过用户名、邮箱、手机号、External ID 精准查找用户

```go
//FindUser
//查找用户
func (c *Client) FindUser(request *model.FindUserRequest) (*model.User, error)
```
#### 参数
- `request` \<FindUserRequest\>  
- `FindUserRequest.Username` \<string\> 用户名，区分大小写
- `FindUserRequest.Email` \<string\> 邮箱，邮箱不区分大小写
- `FindUserRequest.Phone` \<string\> 手机号
- `FindUserRequest.ExternalId`: External ID
- `FindUserRequest.WithCustomData`: \<bool\> 是否获取自定义数据，默认为 false；如果设置为 true，将会在 `customData` 字段返回用户的所有自定义数据

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

```go
    userName := "xxqq"
	resp, err := client.FindUser(&model.FindUserRequest{
		Username: &userName,
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
  "externalId": null,
  "customData": {
    "school": "清华大学",
    "age": 19
  }
}
```

## 搜索用户
>根据关键字根据关键字模糊搜索用户，该接口为分页接口。模糊搜索用户

```go
//SearchUser
//搜索用户
func (c *Client) SearchUser(request *model.SearchUserRequest) (*model.CommonPageUsersResponse, error)
```


#### 参数

- `request` \<SearchUserRequest\>  
- `SearchUserRequest.Query` \<string\> 搜索内容
- `SearchUserRequest.Page` \<int\> 默认值为 : `1`
- `SearchUserRequest.Limit` \<int\> 默认值为 : `10`
- `SearchUserRequest.DepartmentOpts` \<string\> 限制条件，用户所在部门
  - `DepartmentOpts.DepartmentId` \<string\> 部门 ID
  - `DepartmentOpts.IncludeChildrenDepartments` \<bool\> 是否搜索子节点
- `GroupOpts` \<string\>\> 限制条件，用户所在分组
  - `GroupOpts.Code` \<string\> 分组 code
- `RoleOpts` \<string\>\> 限制条件，用户所属角色
  - `RoleOpts.Namespace` \<string\> 角色命名空间
  - `RoleOpts.Code` \<string\> 角色 code
- `WithCustomData`: \<bool\> 是否获取自定义数据，默认为 false；如果设置为 true，将会在 `customData` 字段返回用户的所有自定义数据

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

```go
    resp, err := client.SearchUser(&model.SearchUserRequest{
		Query: "xxqq",
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
      "externalId": null
    }
  ]
}
```

## 强制下线一批用户
>强制让一批用户在 Authing 下线

```go
//KickUser
//强制一批用户下线
func (c *Client) KickUser(userIds []string) (*model.CommonMessageAndCode, error)
```


#### 参数

- `userIds` \<[]string\> 用户 ID 数组

#### 示例

```go
resp, err := client.KickUser([]string{"5a597f35085a2000144a10ed"})
```

#### 返回值

```json
{ "code": 200, "message": "强制下线成功" }
```


## 获取用户分组列表
>获取用户的分组列表
```go
func (c *Client) GetUserGroupList(userId string) (*model.PaginatedGroups, error)
```


#### 参数

- `userId` \<string\> 用户 ID

#### 示例

```go
resp, _ := client.GetUserGroupList("611a149db64310ca4764ab15")
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
```go
//AddUserToGroup
//将用户加入分组
func (c *Client) AddUserToGroup(userId, groupCode string) (*model.CommonMessageAndCode, error)
```


#### 参数

- `userId` \<string\> 用户 ID
- `groupCode` \<string\> 分组 code

#### 示例

```go
resp, err := client.AddUserToGroup("616d41b7410a33da0cb70e65", "pngrn")
```

## 退出分组
>将用户移出分组
```go
//RemoveUserInGroup
//将用户退出分组
func (c *Client) RemoveUserInGroup(userId, groupCode string) (*model.CommonMessageAndCode, error)
```

#### 参数

- `userId` \<string\> 用户 ID
- `groupCode` \<string\> 分组 code

#### 示例

```go
resp, err := client.RemoveUserInGroup("616d41b7410a33da0cb70e65", "pngrn")
```

## 获取用户角色列表
>获取用户在某个权限分组下面的角色列表

```go
//GetUserRoles
//获取用户角色列表
func (c *Client) GetUserRoles(request model.GetUserRolesRequest) (*struct {
	TotalCount int               `json:"totalCount"`
	List       []model.RoleModel `json:"list"`
}, error)
```

#### 参数
- `request` \<GetUserRolesRequest\>  
- `GetUserRolesRequest.Id` \<string\> 用户 ID
- `GetUserRolesRequest.Namespace` \<string\> 权限分组的 code，默认为默认权限分组

#### 示例

```go
    request := &model.GetUserRolesRequest{
		Id: "616d41b7410a33da0cb70e65",
	}
	resp, err := client.GetUserRoles(*request)
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

```go
//AddUserToRoles
//将用户加入角色
func (c *Client) AddUserToRoles(request model.UserRoleOptRequest) (*model.CommonMessageAndCode, error)
```


#### 参数
- `request` \<UserRoleOptRequest\>  
- `UserRoleOptRequest.UserIds` \<[]string\> 用户 ID
- `UserRoleOptRequest.RoleCodes` \<[]string\> 角色 code 列表
- `UserRoleOptRequest.Namespace` \<string\> 权限分组的 code，默认为默认权限分组

#### 示例

```go
    request := &model.UserRoleOptRequest{
		UserIds:   []string{"616d41b7410a33da0cb70e65"},
		RoleCodes: []string{"wwqhd"},
	}
	resp, err := client.AddUserToRoles(*request)
```

## 移除角色
>将用户从角色中移除

```go
//RemoveUserInRoles
//将用户从角色中移除
func (c *Client) RemoveUserInRoles(request model.UserRoleOptRequest) (*model.CommonMessageAndCode, error)
```

#### 参数
- `request` \<UserRoleOptRequest\>  
- `UserRoleOptRequest.UserIds` \<[]string\> 用户 ID
- `UserRoleOptRequest.RoleCodes` \<[]string\> 角色 code 列表
- `UserRoleOptRequest.Namespace` \<string\> 权限分组的 code，默认为默认权限分组

#### 示例

```go
    request := &model.UserRoleOptRequest{
		UserIds:   []string{"616d41b7410a33da0cb70e65"},
		RoleCodes: []string{"wwqhd"},
	}
	resp, err := client.RemoveUserInRoles(*request)
```

## 判断用户是否有某个角色
>判断用户是否有某个角色

```go
// UserHasRole
// 判断用户是否有某个角色
func (c *Client) UserHasRole(userId, roleCode, namespace string) (bool, error)
```


#### 参数

- `userId` \<string\> 用户 ID
- `roleCode` \<string\> 角色 Code
- `namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)

#### 示例

```go
resp, err := client.UserHasRole("616d41b7410a33da0cb70e65", "NewCode", "default")
```

#### 示例数据

```go
bool
```
 

## 刷新用户 Token
> 刷新用户 Token

```go
//RefreshUserToken
//刷新用户 token
func (c *Client) RefreshUserToken(userId string) (*model.RefreshToken, error) 
```
#### 参数
 
- `userId` \<string\>  用户 ID

#### 示例

```go
resp, err := client.RefreshUserToken("616d41b7410a33da0cb70e65")
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

```go
// ListUserPolicies
// 获取策略列表
func (c *Client) ListUserPolicies(request model.ListPoliciesOnIdRequest) (*model.ListPoliciesResponse, error)
```
#### 参数
- `request` \<ListPoliciesOnIdRequest\> 
- `ListPoliciesOnIdRequest.Id` \<string\>  用户 ID
- `ListPoliciesOnIdRequest.Page` \<int\> 页码数, 从 1 开始 默认值为 : `1`
- `ListPoliciesOnIdRequest.Limit` \<int\> 每页包含的用户数 默认值为 : `10`
#### 示例

```go
    req := model.ListPoliciesOnIdRequest{
		Id: "616d41b7410a33da0cb70e65",
	}
	resp, err := client.ListUserPolicies(req)
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

```go
// AddUserPolicies
// 批量添加策略
func (c *Client) AddUserPolicies(userId string, policiesCode []string) (*model.CommonMessageAndCode, error)
```
#### 参数

- `userId` \<string\>  用户 ID
- `policiesCode` \<[]string\> 策略集合
#### 示例

```go
resp, err := client.AddUserPolicies("616d41b7410a33da0cb70e65", []string{"ehsncbahxr"})
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

```go
// RemoveUserPolicies
// 批量移除策略
func (c *Client) RemoveUserPolicies(userId string, policiesCode []string) (*model.CommonMessageAndCode, error)
```
#### 参数

- `userId` \<string\>  用户 ID
- `policiesCode` \<[]string\> 策略集合
#### 示例

```go
resp, err := client.RemoveUserPolicies("616d41b7410a33da0cb70e65", []string{"ehsncbahxr"})
```
#### 示例数据
```json
{
  "message": "取消授权成功",
  "code": 200
}
```


 

## 获取用户所在组织机构
> 获取用户所在组织机构

```go
//ListUserOrg
//获取用户所在组织机构
func (c *Client) ListUserOrg(userId string) (*[][]model.OrgModel, error)
```
#### 参数
- `userId` \<string\>  用户 ID
#### 示例

```go
resp, err := client.ListUserOrg("616d41b7410a33da0cb70e65")
```


## 获取用户所在部门
> 获取用户所在部门

```go
// GetUserDepartments
// 获取用户所在部门
func (c *Client) GetUserDepartments(request model.GetUserDepartmentsRequest) (*model.PaginatedDepartments, error)
```
#### 参数

- `request` \<GetUserDepartmentsRequest\> 
- `GetUserDepartmentsRequest.Id` \<string\>  用户 ID
- `GetUserDepartmentsRequest.OrgId` \<string\>  机构 ID
 
#### 示例

```go
    req := model.GetUserDepartmentsRequest{
		Id:    "60e400c1701ea5b98dae628d",
		OrgId: nil,
	}
	resp, _ := client.GetUserDepartments(req)
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

```go
// SendFirstLoginVerifyEmail
// 发送首次登录验证邮件
func (c *Client) SendFirstLoginVerifyEmail(userId, appId string) (*model.CommonMessageAndCode, error)
```
#### 参数
- `userId` \<string\>  用户 ID
- `appId` \<string\>  应用 ID
#### 示例

```go
resp, err := client.SendFirstLoginVerifyEmail("616d4333b809f9f4768db847", "6168f95e81d5e20f9cb72f22")
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

```go
//LogOut
//用户退出
func (c *Client) LogOut(userId string, appId *string) (*model.CommonMessageAndCode, error)
```
#### 参数
- `userId` \<string\>  用户 ID
- `appId` \<string\>  应用 ID
#### 示例

```go
resp, err := client.LogOut("5a597f35085a2000144a10ed", nil)
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

```go
//CheckLoginStatus
//检查用户登录状态
func (c *Client) CheckLoginStatus(userId string, appId, deviceId *string) (*model.CommonMessageAndCode, error) 
```
#### 参数
- `userId` \<string\>  用户 ID
- `appId` \<string\>  应用 ID
- `deviceId` \<string\>  设备 ID
#### 示例

```go
resp, err := client.CheckLoginStatus("5a597f35085a2000144a10ed", nil, nil)
```

## 获取用户所在的租户

> 获取用户所在的租户

```go
// GetUserTenants
// 获取用户所在租户
func (c *Client) GetUserTenants(userId string) (*model.GetUserTenantsResponse, error)
```

#### 参数

- `userId` \<string\>  用户 ID

#### 示例

```go
resp, err := client.GetUserTenants("61b85b945468e9865acae737")
```
