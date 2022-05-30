---
meta:
  - name: description
    content: 管理注册白名单
---

# 管理注册白名单

<LastUpdated/>


> 为你的用户池配置一个注册白名单，类似于邀请注册规则，开启后，只有白名单里的用户才能进行注册。 {{$localeConfig.brandName}} 目前支持的白名单方式有手机号、邮箱、用户名。

## 获取白名单记录

> 获取白名单记录


```go
//GetWhileList
//获取白名单记录
func (c *Client) GetWhileList(whileListType model.EnumWhitelistType) (*[]model.WhiteList, error) 
```
#### 参数

- `whileListType` \<EnumWhitelistType\> 白名单类型，USERNAME 为用户名、EMAIL 为邮箱、PHONE 为手机号

#### 示例

```go
resp, err := client.GetWhileList(model.EnumWhitelistTypeUsername)
```
#### 示例数据
```json
[{
	"value": "xx2",
	"createdAt": "2021-09-17T06:14:52+00:00",
	"updatedAt": "2021-09-17T06:14:52+00:00"
}, {
	"value": "xx2x",
	"createdAt": "2021-09-17T06:15:26+00:00",
	"updatedAt": "2021-09-17T06:15:26+00:00"
}]
```

## 添加白名单
> 添加白名单
```go
//AddWhileList
//添加白名单记录
func (c *Client) AddWhileList(whileListType model.EnumWhitelistType, ids []string) (*[]model.WhiteList, error)
```

#### 参数

- `whileListType` \<EnumWhitelistType\> 白名单类型，USERNAME 为用户名、EMAIL 为邮箱、PHONE 为手机号
- `ids` \<[]string\> 白名单列表，请注意邮箱不区分大小写

#### 示例

```go
resp, err := client.AddWhileList(model.EnumWhitelistTypeUsername, []string{"qqxccx", "qweqwe"})
```
#### 示例数据
```json
[{
	"value": "xx2",
	"createdAt": "2021-09-17T06:14:52+00:00",
	"updatedAt": "2021-09-17T06:14:52+00:00"
}, {
	"value": "xx2x",
	"createdAt": "2021-09-17T06:15:26+00:00",
	"updatedAt": "2021-09-17T06:15:26+00:00"
}]
```


## 移除白名单
> 移除白名单

```go
//RemoveWhileList
//移除白名单记录
func (c *Client) RemoveWhileList(whileListType model.EnumWhitelistType, ids []string) (*[]model.WhiteList, error)
```
#### 参数
- `whileListType` \<EnumWhitelistType\> 白名单类型，USERNAME 为用户名、EMAIL 为邮箱、PHONE 为手机号
- `ids` \<[]string\> 白名单列表，请注意邮箱不区分大小写
#### 示例

```go
resp, err := client.RemoveWhileList(model.EnumWhitelistTypeUsername, []string{"qqxccx"})
```
#### 示例数据
```json
[{
	"value": "xx2",
	"createdAt": "2021-09-17T06:14:52+00:00",
	"updatedAt": "2021-09-17T06:14:52+00:00"
}, {
	"value": "xx2x",
	"createdAt": "2021-09-17T06:15:26+00:00",
	"updatedAt": "2021-09-17T06:15:26+00:00"
}]
```


## 开启白名单
> 开启白名单
```go
//EnableWhileList
//开启白名单
func (c *Client) EnableWhileList(whileListType model.EnumWhitelistType) (*model.UserPool, error)
```

#### 参数

- `whileListType` \<EnumWhitelistType\> 白名单类型，USERNAME 为用户名、EMAIL 为邮箱、PHONE 为手机号

#### 示例

```go
resp, err := client.EnableWhileList(model.EnumWhitelistTypeUsername)
```
#### 示例数据
```json
{
  "domain": "n1s8",
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
  "id": "61384d3e302f1f769c5a",
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
  "jwtSecret": "1fb9f7fea152ce5b1a9af0fe18c56",
  "app2WxappLoginStrategy": {
    "ticketExchangeUserInfoNeedSecret": false,
    "ticketExpriresAfter": null
  },
  "emailVerifiedDefault": false,
  "secret": "ff053c05e4fb66a560556ec2cb715",
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


## 关闭白名单
> 关闭白名单
 
```go
//DisableWhileList
//关闭白名单
func (c *Client) DisableWhileList(whileListType model.EnumWhitelistType) (*model.UserPool, error)
```

#### 参数

- `whileListType` \<EnumWhitelistType\> 白名单类型，USERNAME 为用户名、EMAIL 为邮箱、PHONE 为手机号

#### 示例

```go
resp, err := client.DisableWhileList(model.EnumWhitelistTypeUsername)
```
#### 示例数据
```json
{
  "domain": "n1s8",
  "whitelist": {
    "phoneEnabled": true,
    "usernameEnabled": false,
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
  "id": "61384d3e302f1f769c5a",
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
  "jwtSecret": "1fb9f7fea152ce5b1a9af0fe18c56",
  "app2WxappLoginStrategy": {
    "ticketExchangeUserInfoNeedSecret": false,
    "ticketExpriresAfter": null
  },
  "emailVerifiedDefault": false,
  "secret": "ff053c05e4fb66a560556ec2cb715",
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
