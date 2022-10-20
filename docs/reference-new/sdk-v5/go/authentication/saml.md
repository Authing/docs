---
meta:
  - name: description
    content: Node.js/JavaScript SDK
---

<LastUpdated/>


# {{$localeConfig.brandName}} - Node.js SDK SAML 模块

安全断言标记语言（英语：Security Assertion Markup Language，简称 SAML，发音 sam-el）是一个基于 XML 的开源标准数据格式，它在当事方之间交换身份验证和授权数据，尤其是在身份提供者和服务提供者之间交换。

## 生成 SAML2 协议的用户登录链接

>生成 SAML2 协议的用户登录链接

```js
AuthenticationClient().buildAuthorizeUrl(options)
```

### 示例

```javascript
// 拼接 SAML2 登录链接
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  protocol: 'saml',
});
let url = authenticationClient.buildAuthorizeUrl();
```

### 示例数据

```http
https://oidc1.authing.cn/api/v2/saml-idp/5f17a529f64fb009b794a2ff
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
// 拼接前端万能登出链接
const authenticationClient = new AuthenticationClient({
  appId: '应用 ID',
  appHost: 'https://{YOUR_DOMAIN}.authing.cn',
  redirectUri: '业务回调地址',
  protocol: 'saml',
});
let url = authenticationClient.buildLogoutUrl({ redirectUri: 'https://authing.cn' });
```

### 示例数据

```http
https://oidc1.authing.cn/login/profile/logout?redirect_uri=https://authing.cn
```
