---
meta:
  - name: description
    content: 管理租户信息
---

# 管理多租户

<LastUpdated/>

此模块可以进行租户管理和身份源连接管理等操作。

请使用以下方式使用该模块：

```javascript
import { ManagementClient } from 'authing-js-sdk'
const managementClient = new ManagementClient({
  userPoolId: 'YOUR_USERPOOL_ID',
  secret: 'YOUR_USERPOOL_SECRET',
})

managementClient.tenant.list // 获取用户池下的租户列表
managementClient.tenant.create // 创建租户
managementClient.tenant.update // 修改租户
managementClient.tenant.delete // 删除租户
```

## 获取用户池下的租户列表
>获取用户池下租户列表。

```js
managementClient.tenant.list(params)
```


#### 参数

| 参数         | 类型   | 必填 | 描述                                                         |
| ------------ | ------ | ---- | ------------------------------------------------------------ |
| params.page  | string | 否   | 分页参数，页数。                                             |
| params.limit | string | 否   | 分页参数，每页显示个数。当参数 limit = -1 时，将返回所有数据 |

#### 示例

```javascript
const tenants = await managementClient.tenant.list();
```

```javascript
const tenants = await managementClient.tenant.list({page:1,limit:10});
```

#### 返回值

| 参数       | 类型         | 描述     |
| ---------- | ------------ | -------- |
| list       | object array | 租户列表 |
| totalCount | number       | 总条数   |

#### 示例数据

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
```js
managementClient.tenant.details(tenantId)
```

#### 参数

| 参数     | 类型   | 必填 | 描述    |
| -------- | ------ | ---- | ------- |
| tenantId | string | 是   | 租户 ID |

#### 示例

```javascript
const tenant = await managementClient.tenant.details('租户 ID');
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

```js
managementClient.tenant.create(options)
```

#### 参数

| 参数                | 类型   | 必填 | 描述                                        |
| ------------------- | ------ | ---- | ------------------------------------------- |
| options.name        | string | 是   | 租户名称                                    |
| options.appIds      | string | 是   | 应用 ID，支持关联多个应用，使用英文逗号分隔 |
| options.logo        | string | 否   | 头像资源地址，通过图片上传接口中的 url 值   |
| options.description | string | 否   | 租户描述                                    |

#### 示例

```javascript
const tenant = await managementClient.tenant.create({
    name:"搜索",
    appIds:"619b64e4ccc0467dcba00920",
  });
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

```js
managementClient.tenant.update(tenantId, options);
```

#### 参数

| 参数                | 类型   | 必填 | 描述                                        |
| ------------------- | ------ | ---- | ------------------------------------------- |
| tenantId            | string | 是   | 租户 ID                                     |
| options.name        | string | 否   | 租户名称                                    |
| options.appIds      | string | 否   | 应用 ID，支持关联多个应用，使用英文逗号分隔 |
| options.logo        | string | 否   | logo 图标地址，图片上传接口中的 url 值      |
| options.description | string | 否   | 租户描述                                    |

#### 示例

```javascript
const tenant = await managementClient.tenant.update('6194aeee9ccea057e89738f0',{
    name:"qq"
  });
```

#### 返回值

```json
boolean : true / false
```

## 删除租户
>删除租户

```js
managementClient.tenant.delete(tenantId);
```


#### 参数

| 参数     | 类型   | 必填 | 描述    |
| -------- | ------ | ---- | ------- |
| tenantId | string | 是   | 租户 ID |

#### 示例

```javascript
const tenant = await managementClient.tenant.delete('6194c58fa1a910549fc62aa5');
```

#### 返回值

```json
{
    "code": 200,
    "message": "删除租户成功"
}
```

## 配置租户品牌化
>配置租户品牌化

```js
managementClient.tenant.config(tenantId, options);
```


#### 参数

| 参数                                               | 类型    | 必填 | 描述                                                |
| -------------------------------------------------- | ------- | ---- | --------------------------------------------------- |
| tenantId                                           | string  | 是   | 租户 ID                                             |
| options.css                                        | string  | 否   | 自定义 CSS                                          |
| options.ssoPageCustomizationSettings               | object  | 否   | ssoPageCustomizationSettings 对象的内容包含以下参数 |
| ssoPageCustomizationSettings.autoRegisterThenLogin | boolean | 否   | 将注册和登录合并                                    |
| ssoPageCustomizationSettings.hideForgetPassword    | boolean | 否   | 隐藏忘记密码按钮                                    |
| ssoPageCustomizationSettings.hideIdp               | boolean | 否   | 隐藏企业身份源登录                                  |
| ssoPageCustomizationSettings.hideSocialLogin       | boolean | 否   | 隐藏社会化登录按钮                                  |

#### 示例

```javascript
const tenant = await managementClient.tenant.config('6194aeee9ccea057e89738f0', {css:".btnId {\n text-color: #FF00EE}"});
```

#### 返回值

```javascript
boolean : true / false
```



## 获取租户成员列表

>获取租户成员列表

```js
managementClient.tenant.members(tenantId, options);
```


#### 参数

| 参数          | 类型   | 必填 | 描述                                                         |
| ------------- | ------ | ---- | ------------------------------------------------------------ |
| tenantId      | string | 是   | 租户 ID                                                      |
| options.page  | string | 否   | 分页参数，页数。                                             |
| options.limit | string | 否   | 分页参数，每页显示个数。当参数 limit = -1 时，将返回所有数据 |

#### 示例

```javascript
const tenant = await managementClient.tenant.members('6194aeee9ccea057e89738f0');
```

```javascript
const tenant = await managementClient.tenant.members('6194aeee9ccea057e89738f0',{page:1,limit:10});
```

#### 返回值

- `list` 成员列表
- `listTotal` 总条数

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

```js
managementClient.tenant.addMembers(tenantId, userIds);
```


#### 参数

| 参数     | 类型         | 必填 | 描述          |
| -------- | ------------ | ---- | ------------- |
| tenantId | string       | 是   | 租户标识符 ID |
| userIds  | array string | 是   | 用户 ID       |

#### 示例

```javascript
const tenant = await managementClient.tenant.addMembers('6194aeee9ccea057e89738f0',['619b07ab229e3bfa98e94ee2']);
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

```js
managementClient.tenant.removeMembers(tenantId, userId)
```

#### 参数

| 参数     | 类型   | 必填 | 描述    |
| -------- | ------ | ---- | ------- |
| tenantId | string | 是   | 租户 ID |
| userId   | string | 是   | 用户 ID |

#### 示例

```javascript
await managementClient.tenant.removeMembers('619b64fd2cfccd07a8296839','619b07ab229e3bfa98e94ee2');
```

#### 返回值

- 无返回值



## 获取身份源列表
>获取身份源列表

```js
managementClient.tenant.listExtIdp(tenantId)
```

#### 参数

| 参数     | 类型   | 描述    |
| -------- | ------ | ------- |
| tenantId | string | 租户 ID |

#### 示例

```javascript
const result = await managementClient.tenant.listExtIdp('619b07312d6b99e1af7d8e4e');
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

```js
managementClient.tenant.extIdpDetail(extIdpId)
```


#### 参数

| 参数     | 类型   | 描述      |
| -------- | ------ | --------- |
| extIdpId | string | 身份源 ID |

#### 示例

```javascript
const result = await managementClient.tenant.extIdpDetail('619b33a00412723ba777eabf');
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

```js
managementClient.tenant.createExtIdp(options)
```


#### 参数

| 参数        | 类型         | 必填 | 描述                                         |
| ----------- | ------------ | ---- | -------------------------------------------- |
| tenantId    | string       | 否   | 租户 ID，如不填则创建个体型身份源            |
| name        | string       | 是   | 身份源名称                                   |
| type        | string       | 是   | 身份源类型，可选值如下：<br />wechat 微信    |
| connections | object array | 是   | 包含任意多个 “连接对象” 的数组，详见下方说明 |

- 连接对象：表示属于该身份源的连接，来自同一身份源的不同连接之间的身份信息可以互通

| 参数            | 类型         | 必填 | 描述                                                         |
| --------------- | ------------ | ---- | ------------------------------------------------------------ |
| type            | string       | 是   | 连接类型，可选值如下：<br />wechat:pc 微信 PC 端网页扫码登录<br />wechat:mobile 原生 APP 内部调用微信登录<br />wechat:webpage-authorization 微信浏览器内部网页授权登录<br />wechatmp-qrcode 接收微信公众号扫码、关注事件，自动创建用户<br />wechat:miniprogram:default 用户自主开发小程序内部登录<br />wechat:miniprogram:qrconnect 『Authing 小登录』扫码登录<br />wechat:miniprogram:app-launch 原生 APP 拉起小登录 |
| identifier      | string       | 是   | 连接的唯一标识符                                             |
| displayName     | string       | 是   | 连接在登录页的显示名称                                       |
| fields          | object       | 是   | 连接的详细配置信息                                           |
| userMatchFields | string array | 否   | 用户表自定义匹配字段（只供前端使用）                         |
| logo            | string       | 否   | 连接的 logo                                                  |

#### 示例

```javascript
const result = await managementClient.tenant.createExtIdp({
    tenantId: '619b07312d6b99e1af7d8e4e',
     name: '飞书身份源',
     type: 'lark',
     connections: [{
       type: 'lark-internal',
       identifier: 'feishusdk',
       displayName: '飞书身份源连接',
       fields: {'clientSecret':'d1cuu12KrcItRyD6T','clientID':'cli_a196bf9013','displayName':'飞书身份源连接'},
       userMatchFields: ['ss']
     }]
  });
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

```js
managementClient.tenant.updateExtIdp(extIdpId, options)
```


#### 参数

| 参数         | 类型   | 必填 | 描述       |
| ------------ | ------ | ---- | ---------- |
| extIdpId     | string | 是   | 身份源 ID  |
| options.name | string | 是   | 身份源名称 |

#### 示例

```javascript
await managementClient.tenant.updateExtIdp('619b399e812c47c972900129',{'name':'飞书身份源'});
```

#### 返回值

- 无返回值



## 删除身份源
>在某个已有身份源下创建新连接

```js
managementClient.tenant.deleteExtIdp(extIdpId)
```

#### 参数

| 参数     | 类型   | 必填 | 描述      |
| -------- | ------ | ---- | --------- |
| extIdpId | string | 是   | 身份源 ID |

#### 示例

```javascript
await managementClient.tenant.deleteExtIdp('619b399e812c47c972900129');
```

#### 返回值
- 无返回值



## 创建身份源连接
>创建身份源连接

```js
managementClient.tenant.createExtIdpConnection(options)
```


#### 参数

| 参数            | 类型         | 必填 | 描述                                 |
| --------------- | ------------ | ---- | ------------------------------------ |
| extIdpId        | string       | 是   | 所属身份源 ID                        |
| type            | string       | 是   | 连接类型                             |
| identifier      | string       | 是   | 连接的唯一标识符                     |
| displayName     | string       | 是   | 连接在登录页的显示名称               |
| fields          | object       | 是   | 连接的详细配置信息                   |
| userMatchFields | string array | 否   | 用户表自定义匹配字段（只供前端使用） |
| logo            | string       | 否   | 连接的 logo                          |

#### 示例

```javascript
test('createExtIdpConnection', async t => {
  const result = await managementClient.tenant.createExtIdpConnection({
    extIdpId: '619c917f534a3b8ad988a209',
    type: 'wechatmp-qrcode',
    identifier: 'wechatc2',
    displayName: '微信身份源连接1',
    fields: {'clientSecret':'d1cuu12KrcItRyD6T','clientID':'cli_a196bf9013','displayName':'飞书身份源连接1'},
    userMatchFields: ['ss']
  });
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

```js
managementClient.tenant.updateExtIdpConnection(extIdpConnectionId, options)
```


#### 参数

| 参数                    | 类型         | 必填 | 描述                                 |
| ----------------------- | ------------ | ---- | ------------------------------------ |
| extIdpConnectionId      | string       | 是   | 身份源连接 ID                        |
| options.displayName     | string       | 是   | 连接在登录页的显示名称               |
| options.fields          | object       | 是   | 连接的详细配置信息                   |
| options.userMatchFields | string array | 否   | 用户表自定义匹配字段（只供前端使用） |
| options.logo            | string       | 否   | 连接的 logo                          |


#### 示例

```javascript
await managementClient.tenant.updateExtIdpConnection('619c9490d7b1cec02bf982f6',{
    displayName: '微信身份源连接2',
    fields: {'clientSecret':'d1cuu12KrcItRyD6T','clientID':'cli_a196bf9013','displayName':'飞书身份源连接1'},
    userMatchFields: ['ss']
  });
```

#### 返回值

- 无返回值



## 删除身份源连接
>删除身份源连接

```js
managementClient.tenant.updateExtIdpConnection(extIdpConnectionId)
```


#### 参数

| 参数               | 类型   | 必填 | 描述          |
| ------------------ | ------ | ---- | ------------- |
| extIdpConnectionId | string | 是   | 身份源连接 ID |

#### 示例

```javascript
managementClient.tenant.deleteExtIdpConnection('619c9490d7b1cec02bf982f6');
```

#### 返回值

- 无返回值



## 检查连接唯一标识是否已存在
> 检查连接唯一标识是已存在

```js
managementClient.tenant.checkExtIdpConnectionIdentifierUnique(identifier)
```


#### 参数

| 参数       | 类型   | 必填 | 描述           |
| ---------- | ------ | ---- | -------------- |
| identifier | string | 是   | 待检查的标识符 |

#### 示例

```javascript
managementClient.tenant.checkExtIdpConnectionIdentifierUnique('wechatc4');
```

#### 返回值

```js
boolean : true - 已存在 / false - 不存在
```



## 开关身份源连接

>开关身份源连接

```js
managementClient.tenant.changeExtIdpConnectionState(extIdpConnectionId, options)
```


#### 参数

| 参数               | 类型    | 必填 | 描述                      |
| ------------------ | ------- | ---- | ------------------------- |
| extIdpConnectionId | string  | 是   | 身份源连接 ID             |
| appId              | string  | 否   | 应用 ID，应用开关场景必填 |
| tenantId           | string  | 否   | 租户 ID，租户开关场景必填 |
| enabled            | boolean | 是   | 是否开启                  |

#### 示例

```javascript
const result = await managementClient.tenant.changeExtIdpConnectionState('619cc337075fdb26f5fdbfa2', {
    tenantId: '619b64fd2cfccd07a8296839',
    enabled: true
  });
```

#### 返回值

```json
boolean : true - 操作成功 / false - 操作失败
```



## 批量开关身份源连接

>批量开关身份源连接

```js
managementClient.tenant.batchChangeExtIdpConnectionState(extIdpId, options)
```


#### 参数

| 参数     | 类型    | 必填 | 描述                      |
| -------- | ------- | ---- | ------------------------- |
| extIdpId | string  | 是   | 身份源 ID                 |
| appId    | string  | 否   | 应用 ID，应用开关场景必填 |
| tenantId | string  | 否   | 租户 ID，租户开关场景必填 |
| enabled  | boolean | 是   | 是否开启                  |

#### 示例

```javascript
const result = await managementClient.tenant.batchChangeExtIdpConnectionState('619c917f534a3b8ad988a209', {
    tenantId: '619b64fd2cfccd07a8296839',
    enabled: true
  });
```

#### 返回值

```js
boolean : true - 操作成功 / false - 操作失败
```

## 租户下创建组织机构
> 创建组织机构，会创建一个只有一个节点的组织机构。

```js
OrgManagementClient().create(name, description, code, tenantId)
```


#### 参数

- `name` \<string\> 组织机构名称，该名称会作为该组织机构根节点的名称。
- `description` \<string\> 根节点描述
- `code` \<string\> 根节点唯一标志，必须为合法的英文字符。
- `tenantId` \<string\> 租户 id。

#### 示例

```javascript
const org = await managementClient.org.create(
  '北京非凡科技',
  '北京非凡科技有限公司',
  'feifan',
  '61d6899f58c07514981da4a3'
)
```

#### 返回值

```json
{
  id: '61d69c0c4011cffeea9ac887',
  rootNode: {
    id: '61d69c0cf11e11e83d64b87b',
    orgId: '61d69c0c4011cffeea9ac887',
    name: '北京非凡科技',
    nameI18n: null,
    description: '北京非凡科技有限公司',
    descriptionI18n: null,
    order: null,
    code: 'feifan',
    root: true,
    depth: null,
    path: [ '61d69c0cf11e11e83d64b87b' ],
    createdAt: '2022-01-06T07:36:44+00:00',
    updatedAt: '2022-01-06T07:36:44+00:00',
    children: []
  },
  nodes: [
    {
      id: '61d69c0cf11e11e83d64b87b',
      orgId: '61d69c0c4011cffeea9ac887',
      name: '北京非凡科技',
      nameI18n: null,
      description: '北京非凡科技有限公司',
      descriptionI18n: null,
      order: null,
      code: 'feifan',
      root: true,
      depth: 0,
      path: [Array],
      createdAt: '2022-01-06T07:36:44+00:00',
      updatedAt: '2022-01-06T07:36:44+00:00',
      children: []
    }
  ]
}
```

## 获取租户下组织机构
> 获取租户下组织机构

```js
OrgManagementClient().getOrgByTenantId(tenantId)
```


#### 参数

- `tenantId` \<string\> 租户 Id 。

#### 示例

```javascript
const result = await managementClient.org.getOrgByTenantId(tenantId)
```

#### 返回值
```json
[
  {
    id: '61d699490abab9f144f296cd',
    createdAt: '2022-01-06T07:24:57.684Z',
    updatedAt: '2022-01-06T07:24:57.684Z',
    userPoolId: '61d53225d92b7010a565e668',
    orgId: '61d6994988de6be5745ee57c',
    name: 'main',
    nameI18n: null,
    description: null,
    descriptionI18n: null,
    order: null,
    code: null,
    leaderUserId: null,
    __id: null,
    __parentid: null,
    __groupid: null,
    members: [],
    children: []
  }
]
```

## 租户下组织机构的其他操作
> [获取租户下组织机构](#获取租户下组织机构)后，可通过组织机构部门 id 对租户下部门进行增删改查或移除成员，具体请参考 [管理组织机构模块](./OrgManagementClient.md)


#### 示例：增加一个下级节点
```javascript
const result = await managementClient.org.getOrgByTenantId(tenantId)
if (result){
  const { id: orgId } = result[0]
  const node = await managementClient.org.addNode(orgId, orgId, {
    name: '运营部门',
  })
}
```

#### 示例返回值
```javascript
{
	"nodes": [{
		"code": null,
		"description": null,
		"updatedAt": "2022-01-06T08:35:31+00:00",
		"children": [],
		"order": null,
		"descriptionI18n": null,
		"depth": 1,
		"orgId": "6142c2c41c6e6c6cc3edf8",
		"path": ["6142c2c4f8abf18c6c978b2c", "614c3c5372b6b3f340ab6937"],
		"nameI18n": null,
		"root": false,
		"id": "614c3c5372b6b3f340ab6937",
		"createdAt": "2022-01-06T08:35:31+00:00",
		"name": "add"
	}],
	"rootNode": {
		"code": "codes",
		"description": "",
		"updatedAt": "2022-01-06T10:24:03+00:00",
		"children": ["614c3c5372b6b3f340ab6937", "6142c32360021c1a05081579", "6142e03436f09aa7e66c1935", "6142e0483f54818690c99600", "6142e07e163a22fd3db10e83"],
		"order": null,
		"descriptionI18n": null,
		"depth": null,
		"orgId": "6142c2c41c6e6c6cc3edfd88",
		"path": ["6142c2c4f8abf18c6c978b2c"],
		"nameI18n": null,
		"root": true,
		"id": "6142c2c4f8abf18c6c978b2c",
		"createdAt": "2022-01-06T04:06:28+00:00",
		"name": "xx2"
	},
	"id": "6142c2c41c6e6c6cc3edfd88"
}
```

