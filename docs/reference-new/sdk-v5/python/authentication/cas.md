---
meta:
  - name: description
    content: Node.js/JavaScript SDK
---

<LastUpdated/>


# {{$localeConfig.brandName}} - Node.js SDK CSA 模块

CAS 是 Central Authentication Service 的缩写，中央认证服务，一种独立开放指令协议。

## 生成 CAS 协议的用户登录链接
>生成 CAS 协议的用户登录链接

```js
AuthenticationClient().buildAuthorizeUrl(options)
```

### 参数

- `options` \<object\> 发起授权登录时需要填写的参数。
- `options.service` \<string\> CAS 协议中的业务回调地址。

### 示例

```js
// 拼接 CAS 登录链接
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  protocol: 'cas',
});
let url = authenticationClient.buildAuthorizeUrl({ service: 'service 地址' });
```

### 示例数据

```http
https://oidc1.authing.cn/cas-idp/5f17a529f64fb009b794a2ff/login?service=https://example.com
```

## 检验 CAS 1.0 Ticket 合法性
>检验 CAS 1.0 Ticket 合法性。

```js
AuthenticationClient().validateTicketV1(ticket, service)
```


### 参数

- `ticket` \<string\> CAS 认证成功后，Authing 颁发的 ticket。
- `service` \<string\> CAS 回调地址。

### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
});
let res = await authenticationClient.validateTicketV1('ticket 内容', 'service 地址');
```

### 示例数据

ticket 合法时返回：

```json
{
  "valid": true,
}
```

ticket 不合法时返回：

```json
{
  "valid": false,
  "message": "ticket 不合法"
}
```

## 检验 CAS 2.0 Ticket 合法性
>检验 CAS 2.0 Ticket 合法性，同时返回用户属性，数据格式默认为 JSON，可以选择 XML。

```js
AuthenticationClient().validateTicketV2(ticket, service, format)
```


### 参数

- `ticket` \<string\> CAS 认证成功后，Authing 颁发的 ticket。
- `service` \<string\> CAS 回调地址。
- `format` \<string\> 返回数据格式，可选值为 XML、JSON，默认为 JSON。

### 示例

```javascript
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
});
let res = await authenticationClient.validateTicketV2('ticket 内容', 'service 地址');
```

### 示例数据

ticket 合法时返回，JSON 格式：

```json
{
  "serviceResponse": {
    "authenticationSuccess": {
      "user": "test1@123.com",
      "attributes": {
        "updated_at": "2021-06-16T14:03:17.358Z",
        "address": {
          "country": null,
          "postal_code": null,
          "region": null,
          "formatted": null
        },
        "phone_number_verified": false,
        "phone_number": null,
        "locale": null,
        "zoneinfo": null,
        "birthdate": null,
        "gender": "U",
        "email_verified": true,
        "email": "test1@123.com",
        "website": null,
        "picture": "https://files.authing.co/user-contents/photos/9a9dc4d7-e756-45b1-81d8-095a28e476c6.jpg",
        "profile": null,
        "preferred_username": "test1@123.com",
        "nickname": null,
        "middle_name": null,
        "family_name": null,
        "given_name": "AAA",
        "name": null,
        "sub": "5f719946524ee1099229496b",
        "external_id": null,
        "unionid": "ldap:f63ed82a-ab77-40da-97bd-defd910d2afd:uid=5fa0354af2c5d2f5c377c991,ou=users,o=5fa029ac692f1d4b55a87623,dc=authing,dc=cn"
      }
    }
  }
}
```

XML 格式：

```xml
<cas:serviceResponse xmlns:cas="http://www.yale.edu/tp/cas">
  <cas:authenticationSuccess>
    <cas:user>test1@123.com</cas:user>
    <cas:attributes>
      <cas:authenticationDate>2021-06-16T13:12:29.369Z</cas:authenticationDate>
      <cas:longTermAuthenticationRequestTokenUsed>false</cas:longTermAuthenticationRequestTokenUsed>
      <cas:updated_at/>
      <cas:address>
        <cas:locality/>
        <cas:street_address/>
      </cas:address>
      <cas:phone_number_verified>false</cas:phone_number_verified>
      <cas:gender>U</cas:gender>
      <cas:email_verified>false</cas:email_verified>
      <cas:email>test1@123.com</cas:email>
      <cas:picture>https://files.authing.co/authing-console/default-user-avatar.png</cas:picture>
      <cas:nickname>aaa</cas:nickname>
      <cas:sub>6063fcd01d0d2e39d4596904</cas:sub>
      <cas:external_id>046bb9d1-8501-11e9-bfaa-7cd30abeb5de</cas:external_id>
    </cas:attributes>
  </cas:authenticationSuccess>
</cas:serviceResponse>
```

ticket 不合法时返回，JSON 格式：

```json
{
  "serviceResponse": {
    "authenticationFailure": {
      "code": "INVALID_TICKET",
      "description": "Ticket 不合法"
    }
  }
}
```

XML 格式：

```xml
<cas:serviceResponse xmlns:cas='http://www.yale.edu/tp/cas'>
    <cas:authenticationFailure code="INVALID_TICKET">
        Ticket 不合法
    </cas:authenticationFailure>
</cas:serviceResponse>
```

## 拼接登出 URL
>拼接登出 URL。

```js
AuthenticationClient().buildLogoutUrl(options)
```


### 参数

- `options` \<string\> 登出配置项。
- `options.redirectUri` \<string\> 登出后的重定向地址。

### 示例

```javascript
// 拼接 cas 登出链接
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  protocol: 'cas',
});
let url = authenticationClient.buildLogoutUrl({ redirectUri: 'https://authing.cn' });
```

### 示例数据

```http
https://oidc1.authing.cn/cas-idp/5f17a529f64fb009b794a2ff/logout?service=https://example.com
```
