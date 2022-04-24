---
meta:
  - name: description
    content: Management registration white list
---

# Management registration white list

<LastUpdated/>

> Configuring a registered list for your user pool, similar to inviting registration rules, after opening, only users in whitelist can register. {{$localeConfig.brandName}} The currently supported white list has a mobile phone number, email, user name.

## Get white list record

> Get white list record

```python
def list(self, type)
```

#### parameter

- `type` \<str\> White list type, USERNAME is the username、EMAIL is the email、PHONE is the phone number

#### Example

```python
management.whiteList.list("USERNAME")
```

#### Sample data

```json
[
  {
    "value": "xx2",
    "createdAt": "2021-09-17T06:14:52+00:00",
    "updatedAt": "2021-09-17T06:14:52+00:00"
  },
  {
    "value": "xx2x",
    "createdAt": "2021-09-17T06:15:26+00:00",
    "updatedAt": "2021-09-17T06:15:26+00:00"
  }
]
```

## Add white list

> Add white list

```python
def add(self, type, list)
```

#### parameter

- `type` \<str\> White list type, USERNAME is the username、EMAIL is the email、PHONE is the phone number
- `list` \<list\> White list list, please pay attention to the mailbox is not case sensitive

#### Example

```python
management.whiteList.add("USERNAME", ["xx2x"])
```

#### Sample data

```json
[
  {
    "value": "xx2",
    "createdAt": "2021-09-17T06:14:52+00:00",
    "updatedAt": "2021-09-17T06:14:52+00:00"
  },
  {
    "value": "xx2x",
    "createdAt": "2021-09-17T06:15:26+00:00",
    "updatedAt": "2021-09-17T06:15:26+00:00"
  }
]
```

## Remove whitelist

> Remove whitelist

```python
def remove(self, type, list)
```

#### parameter

- `type` \<str\> White list type, USERNAME is the username、EMAIL is the email、PHONE is the phone number
- `list` \<list\> White list list, please pay attention to the mailbox is not case sensitive

#### Example

```python
management.whiteList.remove("USERNAME",["xx"])
```

#### Sample data

```json
[
  {
    "value": "xx2",
    "createdAt": "2021-09-17T06:14:52+00:00",
    "updatedAt": "2021-09-17T06:14:52+00:00"
  },
  {
    "value": "xx2x",
    "createdAt": "2021-09-17T06:15:26+00:00",
    "updatedAt": "2021-09-17T06:15:26+00:00"
  }
]
```

## Open white list

> Open white list

```python
def enable_white_list(self, type)
```

#### parameter

- `type` \<str\> White list type, USERNAME is the username、EMAIL is the email、PHONE is the phone number

#### Example

```python
management.whiteList.enable_white_list("USERNAME")
```

#### Sample data

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

## Close white list

> Close white list

```python
def disable_white_list(self, type)
```

#### parameter

- `type` \<str\> White list type, USERNAME is the username、EMAIL is the email、PHONE is the phone number

#### Example

```python
management.whiteList.disable_white_list("USERNAME")
```

#### Sample data

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
