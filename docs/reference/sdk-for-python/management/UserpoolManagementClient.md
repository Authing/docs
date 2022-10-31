---
meta:
  - name: description
    content: 管理用户池配置
---

# 管理用户池配置

<LastUpdated/>

> {{$localeConfig.brandName}} 用户池配置管理模块。

## 查询用户池配置
> 查询用户池配置
```python
def detail(self)
```
#### 示例

```python
management.userPool.detail()
```
#### 示例数据
```json
{
  "message": "获取成功",
  "code": 200,
  "data": {
    "domain": "n1sj",
    "whitelist": {
      "phoneEnabled": true,
      "usernameEnabled": true,
      "emailEnabled": false
    },
    "userId": "61384cf9628539c0f8394",
    "verifyCodeLength": 4,
    "ownerId": "61384cf9628539c0f839",
    "qrcodeLoginStrategy": {
      "qrcodeExpiresAfter": 120,
      "ticketExpiresAfter": 300,
      "returnFullUserInfo": false,
      "allowExchangeUserInfoFromBrowser": true
    },
    "updatedAt": "2021-09-08T05:42:22.498Z",
    "logo": "https://files.authing.co/authing-console/login_logo.svg",
    "frequentRegisterCheck": {
      "timeInterval": 300,
      "enabled": false,
      "limit": 50
    },
    "id": "61384d3e302f1f75e69c",
    "createdAt": "2021-09-08T05:42:22.498Z",
    "appSsoEnabled": false,
    "loginPasswordFailCheck": {
      "timeInterval": 300,
      "enabled": false,
      "limit": 50
    },
    "changeEmailStrategy": {
      "verifyOldEmail": true
    },
    "defaultNamespaceId": 47036,
    "useCustomUserStore": false,
    "userpoolTypes": null,
    "jwtSecret": "1fb9f7fea152ce5b1a9af09fe18c",
    "app2WxappLoginStrategy": {
      "ticketExchangeUserInfoNeedSecret": false,
      "ticketExpiresAfter": 120
    },
    "emailVerifiedDefault": false,
    "secret": "ff053c05e4fb664a560556ea7c2c",
    "packageType": -1,
    "isDeleted": false,
    "customSMSProvider": {
      "config": null,
      "enabled": false,
      "provider": null
    },
    "allowedOrigins": "",
    "description": "",
    "isRoot": false,
    "changePhoneStrategy": {
      "verifyOldPhone": true
    },
    "passwordUpdatePolicy": {
      "forcedCycle": null,
      "enabled": false,
      "differenceCycle": null
    },
    "loginFailCheck": {
      "timeInterval": 300,
      "enabled": false,
      "limit": 50
    },
    "customDb": {
      "loggingConfig": null,
      "enabled": false,
      "cahceConfig": null,
      "connection": null,
      "mode": null,
      "scripts": []
    },
    "passwordStrength": 0,
    "loginFailStrategy": "captcha",
    "passwordFaas": {
      "encryptUrl": null,
      "enabled": false,
      "validateUrl": null,
      "decryptUrl": null
    },
    "name": "newSDK",
    "systemNamespaceId": 47035,
    "sendWelcomeEmail": true,
    "customPasswordStrength": {
      "regex": null,
      "message": null,
      "enabled": false
    },
    "registerDisabled": false,
    "tokenExpiresAfter": 1296000,
    "loginRequireEmailVerified": false
  }
}
```
## 更新用户池配置
> 更新用户池配置
```python
def update(self, updates)
```


#### 参数
- `updates` \<dict\>  参数集合
- `updates[name]` \<str\>  用户池名称
- `updates[logo]` \<str\>  用户池 logo
- `updates[domain]` \<str\>  用户池企业应用面板二级域名
- `updates[description]` \<str\>  描述信息
- `updates[emailVerifiedDefault]` \<bool\> 设置邮箱默认为已验证状态（用户的 emailVerified 字段为 true）
- `updates[appSsoEnabled]` \<bool\> 开启用户池下的应用之间单点登录
- `updates[sendWelcomeEmail]` \<bool\> 用户注册之后是否发送欢迎邮件
- `updates[registerDisabled]` \<bool\> 是否关闭注册，当用户池关闭注册之后，普通用户将无法注册账号，只有管理员能够手动创建账号。
- `updates[allowedOrigins]` \<str\> 安全域配置，安全域（Allowed Origins） 是允许从 JavaScript 向 Authing API
发出请求的 URL（通常与 CORS 一起使用）。 默认情况下，系统会允许你使用所有网址。 如果需要，此字段允许你输入其他来源。
你可以通过逐行分隔多个有效 URL，并在子域级别使用通配符（例如：https://*.sample.com）。验证这些 URL 时不考虑查询字符串和哈希信息，
如果带上了查询字符串和哈希信息系统会自动忽略整个域名。如果有多条请以换行符分隔。
- `updates[whitelist]` \<dict\>  用户池白名单配置
- `updates[whitelist][phoneEnabled]` \<bool\> 是否开启手机号白名单
- `updates[whitelist][emailEnabled]` \<bool\> 是否开启邮箱白名单
- `updates[whitelist][usernameEnabled]` \<bool\> 是否开启用户名白名单
- `updates[tokenExpiresAfter]` \<int\> token 过期时间
- `updates[loginFailCheck]` \<dict\> 频繁登录失败限制，开启之后，在规定时间内超过次数后再次登录需要验证码。如果你的业务存在同一区域同一时间段并发登录的场景，请将此检测关闭。
- `updates[loginFailCheck][enabled]` \<bool\> 是否开启
- `updates[loginFailCheck][timeInterval]` \<int\> 检测周期，单位为秒。
- `updates[loginFailCheck][limit]` \<int\> 同一 IP 登录失败次数达到多少次的时候会触发限制条件。
- `updates[frequentRegisterCheck]` \<dict\> 频率注册限制，开启之后同一 IP 频繁注册账号时会触发频率限制，需要等一段时间之后才能重新注册。如果你的业务存在同一区域同一时间段并发注册的场景，请将此检测关闭。
- `updates[frequentRegisterCheck][enabled]` \<bool\> 是否开启
- `updates[frequentRegisterCheck][timeInterval]` \<str\> 检测周期，单位为秒。
- `updates[frequentRegisterCheck][limit]` \<str\> 同一个周期内同一 IP 注册次数达到此数目时会触发频率限制。
#### 示例

```python
management.userPool.update(updates={
            "name": "newSDK",
            "whitelist": {
                "phoneEnabled":True
            }
        })
```

#### 示例数据
```json
{
	"domain": "n1s",
	"whitelist": {
		"phoneEnabled": true,
		"usernameEnabled": true,
		"emailEnabled": false
	},
	"verifyCodeLength": 4,
	"qrcodeLoginStrategy": {
		"qrcodeExpiresAfter": 120,
		"ticketExpiresAfter": 300,
		"returnFullUserInfo": false,
		"allowExchangeUserInfoFromBrowser": true
	},
	"updatedAt": "2021-09-08T05:42:22+00:00",
	"logo": "https://files.authing.co/authing-console/login_logo.svg",
	"frequentRegisterCheck": {
		"timeInterval": 300,
		"enabled": false,
		"limit": 50
	},
	"id": "61384d3e302f1f75e9c",
	"isDeleted": false,
	"appSsoEnabled": false,
	"loginPasswordFailCheck": {
		"timeInterval": 300,
		"enabled": false,
		"limit": 50
	},
	"changeEmailStrategy": {
		"verifyOldEmail": true
	},
	"useCustomUserStore": false,
	"userpoolTypes": null,
	"jwtSecret": "1fb9f7fea152ce5b1a9af09fe18c",
	"app2WxappLoginStrategy": {
		"ticketExchangeUserInfoNeedSecret": false,
		"ticketExpriresAfter": null
	},
	"emailVerifiedDefault": false,
	"secret": "ff053c05e4fb664a560556ea7c2c",
	"packageType": -1,
	"createdAt": "2021-09-08T05:42:22+00:00",
	"customSMSProvider": {
		"config": null,
		"enabled": false,
		"provider": null
	},
	"allowedOrigins": "",
	"description": "",
	"changePhoneStrategy": {
		"verifyOldPhone": true
	},
	"sendWelcomeEmail": true,
	"loginFailCheck": {
		"timeInterval": 300,
		"enabled": false,
		"limit": 50
	},
	"loginFailStrategy": "captcha",
	"name": "newSDK",
	"registerDisabled": false,
	"tokenExpiresAfter": 1296000,
	"loginRequireEmailVerified": false,
	"showWxQRCodeWhenRegisterDisabled": null
}

```
## 获取环境变量列表
> 获取用户池环境变量列表。用户池配置的环境变量可以在 pipeline 场景下使用，详情请见：https://docs.authing.cn/v2/guides/pipeline/env.html
```python
def list_env(self)
```

#### 示例

```python
management.userPool.list_env()
```
#### 示例数据
```json
{
	"messgae": "获取环境变量列表成功",
	"code": 200,
	"data": [{
		"userPoolId": "61384d3e302f1f75e69c",
		"value": "xx",
		"key": "tt",
		"updatedAt": "2021-09-23T07:51:52.455Z",
		"id": "614c32185690d9d9455c5be6",
		"createdAt": "2021-09-23T07:51:52.455Z"
	}]
}
```

## 添加环境变量
> 添加环境变量
```python
def add_env(self, key, value)
```

#### 参数

- `key` \<str\> 环境变量键
- `value` \<str\> 环境变量值

#### 示例

```python
management.userPool.add_env("tt", "xx")
```
#### 示例数据
```json
{
	"messgae": "设置环境变量成功",
	"code": 200,
	"data": {
		"id": "614c3287d1c3f2dffe65af",
		"createdAt": "2021-09-23T07:53:43.111Z",
		"key": "tct",
		"userPoolId": "61384d3e302f1f75e69c",
		"updatedAt": "2021-09-23T07:53:43.111Z"
	}
}
```

## 删除环境变量
> 删除环境变量
```python
def remove_env(self, key)
```

#### 参数

- `key` \<str\> 环境变量键

#### 示例

```python
management.userPool.remove_env("tt")
```
#### 示例数据
````json
{
	"messgae": "删除成功",
	"code": 200
}
````
