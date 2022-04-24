---
meta:
  - name: description
    content: 管理租户信息
---

# 管理多租户

<LastUpdated/>

此模块可以进行租户管理和身份源连接管理等操作。

请使用以下方式使用该模块：

```go
client := NewClient(userPoolId, secret)

client.GetTenantList() // 获取用户池下的租户列表
client.CreateTenant() // 创建租户
client.UpdateTenant() // 修改租户
client.RemoveTenant() // 删除租户
```

## 获取用户池下的租户列表
>获取用户池下租户列表。

```go
// GetTenantList
// 获取用户池下租户列表
func (c *Client) GetTenantList(request *model.CommonPageRequest) (*model.GetTenantListResponse, error)
```


#### 参数

| 参数         | 类型   | 必填 | 描述                                                         |
| ------------ | ------ | ---- | ------------------------------------------------------------ |
| request.Page  | string | 否   | 分页参数，页数。                                             |
| request.Limit | string | 否   | 分页参数，每页显示个数。当参数 Limit = -1 时，将返回所有数据 |

#### 示例

```go
resp, err := client.GetTenantList(&model.CommonPageRequest{})
```

```go
resp, err := client.GetTenantList(&model.CommonPageRequest{
  Page:  1,
  Limit: 10,
})
```

#### 返回值

```json
{
  list: [
    {
      id: '619b07312d6b99e1af7d8e4e',
      createdAt: '2021-11-22T02:57:53.426Z',
      updatedAt: '2021-11-22T02:57:53.426Z',
      userPoolId: '619b014f144de0ffc38b869d',
      name: '示例名称',
      logo: 'https://files.authing.co/user-contents/photos/bd5bd9c3-3be8-475f-b8f5-752751d91bb6.png',
      description: null,
      css: null,
      ssoPageCustomizationSettings: null,
      defaultLoginTab: 'password',
      defaultRegisterTab: 'email',
      passwordTabConfig: [Object],
      loginTabs: [Array],
      registerTabs: null,
      extendsFields: null
    }
  ],
  totalCount: 1
}
```

## 根据 ID 查询租户详情
> 根据 ID 查询租户详情
```go
// GetTenantDetails
// 获取租户详情
func (c *Client) GetTenantDetails(tenantId string) (*model.TenantDetails, error)
```

#### 参数

| 参数     | 类型   | 必填 | 描述    |
| -------- | ------ | ---- | ------- |
| tenantId | string | 是   | 租户 ID |

#### 示例

```go
resp, err := client.GetTenantDetails("61b83950c110f5a2955221df")
```

#### 返回值

```json
{
  id: '619b07312d6b99e1af7d8e4e',
  createdAt: '2021-11-22T02:57:53.426Z',
  updatedAt: '2021-11-22T02:57:53.426Z',
  userPoolId: '619b014f144de0ffc38b869d',
  name: '示例名称',
  logo: 'https://files.authing.co/user-contents/photos/bd5bd9c3-3be8-475f-b8f5-752751d91bb6.png',
  description: null,
  css: null,
  ssoPageCustomizationSettings: null,
  defaultLoginTab: 'password',
  defaultRegisterTab: 'email',
  passwordTabConfig: {
    enabledLoginMethods: [ 'username-password', 'email-password', 'phone-password' ]
  },
  loginTabs: [ 'phone-code', 'password' ],
  registerTabs: null,
  extendsFields: null,
  apps: [
    {
      qrcodeScanning: [Object],
      id: '619b0150216449466e8728e9',
      createdAt: '2021-11-22T02:32:48.435Z',
      updatedAt: '2021-11-22T02:58:28.862Z',
      userPoolId: '619b014f144de0ffc38b869d',
      protocol: 'oidc',
      isOfficial: false,
      isDeleted: false,
      isDefault: false,
      isDemo: true,
      name: '示例应用名称',
      description: null,
      secret: '48b90d4f2add0bde9f3ceafa3606dac7',
      identifier: 'p12jzu-demo',
      jwks: [Object],
      ssoPageCustomizationSettings: null,
      logo: 'https://files.authing.co/authing-console/default-app-logo.png',
      redirectUris: [Array],
      logoutRedirectUris: [],
      initLoginUrl: null,
      oidcProviderEnabled: true,
      oauthProviderEnabled: false,
      samlProviderEnabled: false,
      casProviderEnabled: false,
      registerDisabled: false,
      loginTabs: [Array],
      passwordTabConfig: [Object],
      defaultLoginTab: 'password',
      registerTabs: [Array],
      defaultRegisterTab: 'email',
      ldapConnections: null,
      adConnections: [],
      extendsFieldsEnabled: false,
      extendsFields: [],
      ext: null,
      css: null,
      oidcConfig: [Object],
      oidcJWEConfig: null,
      samlConfig: null,
      oauthConfig: [Object],
      casConfig: null,
      showAuthorizationPage: false,
      enableSubAccount: false,
      enableDeviceMutualExclusion: false,
      loginRequireEmailVerified: false,
      agreementEnabled: false,
      isIntegrate: false,
      ssoEnabled: false,
      template: null,
      skipMfa: false,
      casExpireBaseBrowser: false,
      appType: 'INDIVIDUAL',
      permissionStrategy: [Object]
    }
  ]
}
```

## 创建租户
>创建租户

```go
// CreateTenant
// 创建租户
func (c *Client) CreateTenant(request *model.CreateTenantRequest) (*model.TenantDetails, error)
```

#### 参数

| 参数                | 类型   | 必填 | 描述                                        |
| ------------------- | ------ | ---- | ------------------------------------------- |
| request.Name        | string | 是   | 租户名称                                    |
| request.AppIds      | string | 是   | 应用 ID，支持关联多个应用，使用英文逗号分隔 |
| request.Logo        | string | 否   | 头像资源地址，通过图片上传接口中的 url 值   |
| request.Description | string | 否   | 租户描述                                    |

#### 示例

```go
resp, err := client.CreateTenant(&model.CreateTenantRequest{
  Name:   "测试lnoi",
  AppIds: "61503af19ddff2aa185b665a",
})
```

#### 返回值

```json
{
  userPoolId: '619b014f144de0ffc38b869d',
  name: '搜索',
  createdAt: '2021-11-22T09:38:05.696Z',
  updatedAt: '2021-11-22T09:38:05.696Z',
  id: '619b64fd2cfccd07a8296839',
  logo: null,
  description: null,
  css: null,
  ssoPageCustomizationSettings: null,
  defaultLoginTab: 'password',
  defaultRegisterTab: 'email',
  passwordTabConfig: null,
  loginTabs: null,
  registerTabs: null,
  extendsFields: null,
  apps: [
    {
      qrcodeScanning: [Object],
      id: '619b64e4ccc0467dcba00920',
      createdAt: '2021-11-22T09:37:40.422Z',
      updatedAt: '2021-11-22T09:37:40.462Z',
      userPoolId: '619b014f144de0ffc38b869d',
      protocol: 'oidc',
      isOfficial: false,
      isDeleted: false,
      isDefault: false,
      isDemo: false,
      name: '搜索网',
      description: null,
      secret: '1f264d7d4b2dd2d4996ad7185c45a6f9',
      identifier: 'search',
      jwks: [Object],
      ssoPageCustomizationSettings: null,
      logo: 'https://files.authing.co/authing-console/default-app-logo.png',
      redirectUris: [Array],
      logoutRedirectUris: [],
      initLoginUrl: null,
      oidcProviderEnabled: true,
      oauthProviderEnabled: false,
      samlProviderEnabled: false,
      casProviderEnabled: false,
      registerDisabled: false,
      loginTabs: [Array],
      passwordTabConfig: [Object],
      defaultLoginTab: 'password',
      registerTabs: [Array],
      defaultRegisterTab: 'email',
      ldapConnections: null,
      adConnections: [],
      extendsFieldsEnabled: false,
      extendsFields: [],
      ext: null,
      css: '/* \n' +
        '  Edit login page css\n' +
        '  eg：\n' +
        '  .authing-guard-layout {\n' +
        '    background: black !important;\n' +
        '  }\n' +
        '  Change the background color\n' +
        '*/',
      oidcConfig: [Object],
      oidcJWEConfig: null,
      samlConfig: null,
      oauthConfig: [Object],
      casConfig: null,
      showAuthorizationPage: false,
      enableSubAccount: false,
      enableDeviceMutualExclusion: false,
      loginRequireEmailVerified: false,
      agreementEnabled: false,
      isIntegrate: false,
      ssoEnabled: false,
      template: null,
      skipMfa: false,
      casExpireBaseBrowser: false,
      appType: 'INDIVIDUAL',
      permissionStrategy: [Object]
    }
  ]
}
```

## 修改租户
>修改租户

```go
// UpdateTenant
// 修改租户
func (c *Client) UpdateTenant(tenantId string, request *model.CreateTenantRequest) (*bool, error)
```

#### 参数

| 参数                | 类型   | 必填 | 描述                                        |
| ------------------- | ------ | ---- | ------------------------------------------- |
| tenantId            | string | 是   | 租户 ID                                     |
| request.Name        | string | 否   | 租户名称                                    |
| request.AppIds      | string | 否   | 应用 ID，支持关联多个应用，使用英文逗号分隔 |
| request.Logo        | string | 否   | logo 图标地址，图片上传接口中的 url 值      |
| request.Description | string | 否   | 租户描述                                    |

#### 示例

```go
resp, err := client.UpdateTenant("61b95412098eb8dd16d5a7f4", &model.CreateTenantRequest{
  Name: "测试修改",
})
```

#### 返回值

```json
bool : true / false
```

## 删除租户
>删除租户

```go
// RemoveTenant
// 删除租户
func (c *Client) RemoveTenant(tenantId string) (*string, error)
```


#### 参数

| 参数     | 类型   | 必填 | 描述    |
| -------- | ------ | ---- | ------- |
| tenantId | string | 是   | 租户 ID |

#### 示例

```go
resp, err := client.RemoveTenant("61b95412098eb8dd16d5a7f4")
```

#### 返回值

```json
{
    "message": "删除租户成功"
}
```

## 配置租户品牌化
>配置租户品牌化

```go
// ConfigTenant
// 配置租户品牌化
func (c *Client) ConfigTenant(tenantId string, request *model.ConfigTenantRequest) (*string, error)
```


#### 参数

| 参数                                               | 类型    | 必填 | 描述                                                |
| -------------------------------------------------- | ------- | ---- | --------------------------------------------------- |
| tenantId                                           | string  | 是   | 租户 ID                                             |
| request.CSS                                        | string  | 否   | 自定义 CSS                                          |
| request.SsoPageCustomizationSettings               | TenantSsoPageCustomizationSettings  | 否   | SsoPageCustomizationSettings 对象的内容包含以下参数 |
| SsoPageCustomizationSettings.AutoRegisterThenLogin | bool | 否   | 将注册和登录合并                                    |
| SsoPageCustomizationSettings.HideForgetPassword    | bool | 否   | 隐藏忘记密码按钮                                    |
| SsoPageCustomizationSettings.HideIdp               | bool | 否   | 隐藏企业身份源登录                                  |
| SsoPageCustomizationSettings.HideSocialLogin       | bool | 否   | 隐藏社会化登录按钮                                  |

#### 示例

```go
resp, err := client.ConfigTenant("61b83950c110f5a2955221df", &model.ConfigTenantRequest{
  CSS: ".btnId {\n text-color: #ffff}",
  SsoPageCustomizationSettings: &model.TenantSsoPageCustomizationSettings{
    AutoRegisterThenLogin: false,
  },
})
```

#### 返回值

```go
bool : true / false
```



## 获取租户成员列表

>获取租户成员列表

```go
// GetTenantMembers
// 获取租户成员列表
func (c *Client) GetTenantMembers(tenantId string, request *model.CommonPageRequest) (*model.TenantMembersResponse, error)
```


#### 参数

| 参数          | 类型   | 必填 | 描述                                                         |
| ------------- | ------ | ---- | ------------------------------------------------------------ |
| tenantId      | string | 是   | 租户 ID                                                      |
| request.Page  | string | 否   | 分页参数，页数。                                             |
| request.Limit | string | 否   | 分页参数，每页显示个数。当参数 Limit = -1 时，将返回所有数据 |

#### 示例

```go
resp, err := client.GetTenantMembers("61b83950c110f5a2955221df", &model.CommonPageRequest{})
```

```go
resp, err := client.GetTenantMembers("61b83950c110f5a2955221df", &model.CommonPageRequest{
  Page:  1,
  Limit: 10,
})
```

#### 返回值

- `list` 成员列表
- `totalCount` 总条数

#### 示例数据

```json
{
	"list": [{
		"id": "619b7b5b626abd61ffeebd8e",
		"tenantId": "619b64fd2cfccd07a8296839",
		"user": {
			"id": "619b07826feaa09f07b598de",
			"arn": "arn:cn:authing:619b014f144de0ffc38b869d:user:619b07826feaa09f07b598de",
			"userPoolId": "619b014f144de0ffc38b869d",
			"photo": "https://files.authing.co/authing-console/default-user-avatar.png",
			"email": null,
			"emailVerified": false,
			"phone": null,
			"phoneVerified": false,
			"unionid": null,
			"openid": null,
			"username": "zy",
			"nickname": null,
			"country": null,
			"province": null,
			"company": null,
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
			"address": null,
			"formatted": null,
			"streetAddress": null,
			"region": null,
			"postalCode": null,
			"city": null,
			"blocked": false
		}
	}],
	"listTotal": 1
}
```



## 添加租户成员

>添加租户成员，仅支持现用户池内存在的用户。

```go
// AddTenantMembers
// 添加租户成员
func (c *Client) AddTenantMembers(tenantId string, userIds []string) (*model.AddTenantMembersResponse, error)
```


#### 参数

| 参数     | 类型         | 必填 | 描述          |
| -------- | ------------ | ---- | ------------- |
| tenantId | string       | 是   | 租户标识符 ID |
| userIds  | []string     | 是   | 用户 ID       |

#### 示例

```go
resp, err := client.AddTenantMembers("61b83950c110f5a2955221df", []string{"61b85b9da80ac34ac3a9451d", "61b85b945468e9865acae737"})
```

#### 返回值

```json
{
  id: '619b64fd2cfccd07a8296839',
  createdAt: '2021-11-22T09:38:05.696Z',
  updatedAt: '2021-11-22T09:38:05.696Z',
  userPoolId: '619b014f144de0ffc38b869d',
  name: '聚合搜索',
  logo: null,
  description: null,
  css: '.btnId {\n text-color: #FF00EE}',
  ssoPageCustomizationSettings: null,
  defaultLoginTab: 'password',
  defaultRegisterTab: 'email',
  passwordTabConfig: {
    enabledLoginMethods: [ 'username-password', 'email-password', 'phone-password' ]
  },
  loginTabs: [ 'phone-code', 'password' ],
  registerTabs: null,
  extendsFields: null,
  users: [
    {
      id: '619b07ab229e3bfa98e94ee2',
      arn: 'arn:cn:authing:619b014f144de0ffc38b869d:user:619b07ab229e3bfa98e94ee2',
      userPoolId: '619b014f144de0ffc38b869d',
      photo: 'https://files.authing.co/authing-console/default-user-avatar.png',
      email: null,
      emailVerified: false,
      phone: null,
      phoneVerified: false,
      unionid: null,
      openid: null,
      username: 'jl',
      nickname: null,
      country: null,
      province: null,
      company: null,
      loginsCount: 0,
      lastIp: null,
      name: null,
      givenName: null,
      familyName: null,
      middleName: null,
      profile: null,
      preferredUsername: null,
      website: null,
      gender: 'U',
      birthdate: null,
      zoneinfo: null,
      address: null,
      formatted: null,
      streetAddress: null,
      region: null,
      postalCode: null,
      city: null,
      blocked: false
    }
  ]
}
```



## 删除租户成员

>删除租户成员

```go
// RemoveTenantMembers
// 删除租户成员
func (c *Client) RemoveTenantMembers(tenantId string, userId string) (*string, error)
```

#### 参数

| 参数     | 类型   | 必填 | 描述    |
| -------- | ------ | ---- | ------- |
| tenantId | string | 是   | 租户 ID |
| userId   | string | 是   | 用户 ID |

#### 示例

```go
resp, err := client.RemoveTenantMembers("61b83950c110f5a2955221df", "61b85b9da80ac34ac3a9451d")
```

#### 返回值

```json
{
  "message": "删除租户成员成功"
}
```



## 获取身份源列表
>获取身份源列表

```go
// ListExtIdp
// 获取身份源列表
func (c *Client) ListExtIdp(tenantId string) (*[]model.ListExtIdpResponse, error)
```

#### 参数

| 参数     | 类型   | 描述    |
| -------- | ------ | ------- |
| tenantId | string | 租户 ID |

#### 示例

```go
resp, err := client.ListExtIdp("61b83950c110f5a2955221df")
```

#### 返回值

```json
[{
	"id": "619b33a00412723ba777eabf",
	"name": "身份源名称",
	"type": "lark",
	"tenantId": "619b07312d6b99e1af7d8e4e",
	"connections": [{
		"id": "619b33a059f92af971ad4042",
		"type": "lark-internal",
		"identifier": "feishuljl",
		"displayName": "身份源连接名称",
		"logo": null,
		"enabled": true
	}]
}]
```



## 获取身份源详细信息
>获取身份源详细信息

```go
// ExtIdpDetail
// 获取身份源详细信息
func (c *Client) ExtIdpDetail(extIdpId string) (*model.ExtIdpDetailResponse, error) 
```


#### 参数

| 参数     | 类型   | 描述      |
| -------- | ------ | --------- |
| extIdpId | string | 身份源 ID |

#### 示例

```go
resp, err := client.ExtIdpDetail("61b868aea25030db174529f1")
```

#### 返回值

```json
{
	"id": "619b33a00412723ba777eabf",
	"name": "示例名称",
	"type": "lark",
	"connections": [{
		"id": "619b33a059f92af971ad4042",
		"type": "lark-internal",
		"identifier": "feishuljl",
		"displayName": "示例名称",
		"fields": {
			"clientSecret": "d1cuu12KrcItRyD6T",
			"clientID": "cli_a196bf9013",
			"displayName": "示例名称"
		},
		"logo": null,
		"userMatchFields": null
	}]
}
```

## 创建身份源
>创建身份源

```go
// CreateExtIdp
// 创建身份源
func (c *Client) CreateExtIdp(request *model.CreateExtIdpRequest) (*model.ExtIdpDetailResponse, error)
```


#### 参数

| 参数        | 类型         | 必填 | 描述                                         |
| ----------- | ------------ | ---- | -------------------------------------------- |
| request.TenantId    | string       | 否   | 租户 ID，如不填则创建个体型身份源            |
| request.Name        | string       | 是   | 身份源名称                                   |
| request.Type        | string       | 是   | 身份源类型，可选值如下：<br />wechat 微信    |
| request.Connections | []ExtIdpConnection | 是   | 包含任意多个 “连接对象” 的数组，详见下方说明 |

- 连接对象：表示属于该身份源的连接，来自同一身份源的不同连接之间的身份信息可以互通

| 参数            | 类型         | 必填 | 描述                                                         |
| --------------- | ------------ | ---- | ------------------------------------------------------------ |
| Type            | string       | 是   | 连接类型，可选值如下：<br />wechat:pc 微信 PC 端网页扫码登录<br />wechat:mobile 原生 APP 内部调用微信登录<br />wechat:webpage-authorization 微信浏览器内部网页授权登录<br />wechatmp-qrcode 接收微信公众号扫码、关注事件，自动创建用户<br />wechat:miniprogram:default 用户自主开发小程序内部登录<br />wechat:miniprogram:qrconnect 『Authing 小登录』扫码登录<br />wechat:miniprogram:app-launch 原生 APP 拉起小登录 |
| Identifier      | string       | 是   | 连接的唯一标识符                                             |
| DisplayName     | string       | 是   | 连接在登录页的显示名称                                       |
| Fields          | interface{}       | 是   | 连接的详细配置信息                                           |
| UserMatchFields | []string | 否   | 用户表自定义匹配字段（只供前端使用）                         |
| logo            | string       | 否   | 连接的 logo                                                  |

#### 示例

```go
fields := map[string]string{
  "displayName":  "飞书身份源连接",
  "clientID":     "everwew",
  "clientSecret": "everwew",
}

resp, err := client.CreateExtIdp(&model.CreateExtIdpRequest{
Name:     "飞书身份源",
Type:     "lark",
TenantUd: "61b83950c110f5a2955221df",
Connections: []model.ExtIdpConnection{{
  	Identifier:  "nboenboei",
  	Type:        "lark-internal",
  	DisplayName: "飞书身份源连接",
  	Fields:      fields,
  }},
})
```

#### 返回值

```json
{
  id: '619c84ce946e9c1913247af1',
  name: '飞书身份源',
  type: 'lark',
  connections: [
    {
      id: '619c84ce84aac1e944b05ffe',
      type: 'lark-internal',
      identifier: 'feishusdk1',
      displayName: '飞书身份源连接',
      fields: [Object],
      logo: null,
      userMatchFields: [Array]
    }
  ]
}
```



## 更新身份源

> 更新身份源

```go
// UpdateExtIdp
// 更新身份源
func (c *Client) UpdateExtIdp(extIdpId string, request *model.UpdateExtIdpRequest) (*string, error)
```


#### 参数

| 参数         | 类型   | 必填 | 描述       |
| ------------ | ------ | ---- | ---------- |
| extIdpId     | string | 是   | 身份源 ID  |
| request.Name | string | 是   | 身份源名称 |

#### 示例

```go
resp, err := client.UpdateExtIdp("61b958a18a3f153bf3674e5b", &model.UpdateExtIdpRequest{
  Name: "cscwecw",
})
```

#### 返回值

```json
{
  "message": "更新成功"
}
```



## 删除身份源
>在某个已有身份源下创建新连接

```go
// DeleteExtIdp
// 删除身份源
func (c *Client) DeleteExtIdp(extIdpId string) (*string, error) 
```

#### 参数

| 参数     | 类型   | 必填 | 描述      |
| -------- | ------ | ---- | --------- |
| extIdpId | string | 是   | 身份源 ID |

#### 示例

```go
resp, err := client.DeleteExtIdp("61b958a18a3f153bf3674e5b")
```

#### 返回值
```json
{
  "message": "删除成功"
}
```



## 创建身份源连接
>创建身份源连接

```go
// CreateExtIdpConnection
// 创建身份源连接
func (c *Client) CreateExtIdpConnection(request *model.CreateExtIdpConnectionRequest) (*model.ExtIdpConnectionDetails, error)
```


#### 参数

| 参数            | 类型         | 必填 | 描述                                 |
| --------------- | ------------ | ---- | ------------------------------------ |
| request.ExtIdpId        | string       | 是   | 所属身份源 ID                        |
| request.Type            | string       | 是   | 连接类型                             |
| request.Identifier      | string       | 是   | 连接的唯一标识符                     |
| request.DisplayName     | string       | 是   | 连接在登录页的显示名称               |
| request.Fields          | interface{}       | 是   | 连接的详细配置信息                   |
| request.UserMatchFields | []string | 否   | 用户表自定义匹配字段（只供前端使用） |
| request.Logo            | string       | 否   | 连接的 logo                          |

#### 示例

```go
fields := map[string]string{
  "displayName":  "飞书身份源连接1",
  "clientID":     "cli_a196bf9013",
  "clientSecret": "d1cuu12KrcItRyD6T",
}

resp, err := client.CreateExtIdpConnection(&model.CreateExtIdpConnectionRequest{
  ExtIdpId:    "61b955fd8f70040602f8ebe4",
  Identifier:  "wechatc2",
  Type:        "wechatmp-qrcode",
  DisplayName: "飞书身份源连接1",
  Fields:      fields,
})
```

#### 返回值

```json
{
  id: '619c9490d7b1cec02bf982f6',
  type: 'wechatmp-qrcode',
  identifier: 'wechatc2',
  displayName: '飞书身份源连接1',
  fields: {
    clientSecret: 'd1cuu12KrcItRyD6T',
    clientID: 'cli_a196bf9013',
    displayName: '飞书身份源连接1'
  },
  logo: null,
  userMatchFields: [ 'ss' ]
}
```



## 更新身份源连接

>更新身份源连接

```go
// UpdateExtIdpConnection
// 更新身份源连接
func (c *Client) UpdateExtIdpConnection(extIdpConnectionId string, request *model.UpdateExtIdpConnectionRequest) (*string, error)
```


#### 参数

| 参数                    | 类型         | 必填 | 描述                                 |
| ----------------------- | ------------ | ---- | ------------------------------------ |
| extIdpConnectionId      | string       | 是   | 身份源连接 ID                        |
| request.DisplayName     | string       | 是   | 连接在登录页的显示名称               |
| request.Fields          | interface{}       | 是   | 连接的详细配置信息                   |
| request.UserMatchFields | []string | 否   | 用户表自定义匹配字段（只供前端使用） |
| request.Logo            | string       | 否   | 连接的 logo                          |


#### 示例

```go
fields := map[string]string{
  "displayName":  "测试连接修改2",
  "clientID":     "123456",
  "clientSecret": "123456",
}

resp, err := client.UpdateExtIdpConnection("61b9602bac8e32162db6d9d5", &model.UpdateExtIdpConnectionRequest{
  DisplayName: "测试连接修改2",
  Fields:      fields,
})
```

#### 返回值

```json
{
  "message": "更新成功"
}
```


## 删除身份源连接
>删除身份源连接

```go
// DeleteExtIdpConnection
// 删除身份源连接
func (c *Client) DeleteExtIdpConnection(extIdpConnectionId string) (*string, error)
```


#### 参数

| 参数               | 类型   | 必填 | 描述          |
| ------------------ | ------ | ---- | ------------- |
| extIdpConnectionId | string | 是   | 身份源连接 ID |

#### 示例

```go
resp, err := client.DeleteExtIdpConnection("61b9602bac8e32162db6d9d5")
```

#### 返回值

```json
{
  "message": "删除成功"
}
```



## 检查连接唯一标识是否已存在
> 检查连接唯一标识是已存在

```go
// CheckExtIdpConnectionIdentifierUnique
// 检查连接唯一标识是否冲突
func (c *Client) CheckExtIdpConnectionIdentifierUnique(identifier string) (bool, error)
```


#### 参数

| 参数       | 类型   | 必填 | 描述           |
| ---------- | ------ | ---- | -------------- |
| identifier | string | 是   | 待检查的标识符 |

#### 示例

```go
resp, err := client.CheckExtIdpConnectionIdentifierUnique("emoo")
```

#### 返回值

```go
bool : true - 已存在 / false - 不存在
```



## 开关身份源连接

>开关身份源连接

```go
// ChangeExtIdpConnectionState
// 开关身份源连接
func (c *Client) ChangeExtIdpConnectionState(extIdpConnectionId string, request *model.ChangeExtIdpConnectionStateRequest) (*string, error)
```


#### 参数

| 参数               | 类型    | 必填 | 描述                      |
| ------------------ | ------- | ---- | ------------------------- |
| extIdpConnectionId | string  | 是   | 身份源连接 ID             |
| request.AppID              | string  | 否   | 应用 ID，应用开关场景必填 |
| request.TenantID           | string  | 否   | 租户 ID，租户开关场景必填 |
| request.Enabled            | bool | 是   | 是否开启                  |

#### 示例

```go
resp, err := client.ChangeExtIdpConnectionState("61b868ae560f5e2ef2bd9e91", &model.ChangeExtIdpConnectionStateRequest{
  Enabled:  true,
  TenantID: "61b83950c110f5a2955221df",
})
```

#### 返回值

```json
bool : true - 操作成功 / false - 操作失败
```



## 批量开关身份源连接

>批量开关身份源连接

```js
// BatchChangeExtIdpConnectionState
// 批量开关身份源连接
func (c *Client) BatchChangeExtIdpConnectionState(extIdpId string, request *model.ChangeExtIdpConnectionStateRequest) (*string, error)
```


#### 参数

| 参数     | 类型    | 必填 | 描述                      |
| -------- | ------- | ---- | ------------------------- |
| extIdpId | string  | 是   | 身份源 ID                 |
| request.AppID    | string  | 否   | 应用 ID，应用开关场景必填 |
| request.TenantID | string  | 否   | 租户 ID，租户开关场景必填 |
| request.Enabled  | bool | 是   | 是否开启                  |

#### 示例

```go
resp, err := client.BatchChangeExtIdpConnectionState("61b98798fab83706ed7f853f", &model.ChangeExtIdpConnectionStateRequest{
  Enabled:  false,
  TenantID: "61b83950c110f5a2955221df",
})
```

#### 返回值

```go
bool : true - 操作成功 / false - 操作失败
```

