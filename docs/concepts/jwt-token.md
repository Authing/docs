---
tags:
  - JSON_WEB_TOKEN
  - JWT
  - JsonWebToken
meta:
  - name: description
    content: 了解 JWT Token 释义及使用
---

# 了解 JWT Token 释义及使用

<LastUpdated/>

了解在 {{$localeConfig.brandName}} 系统中如何验证 token:

::: page-ref /guides/faqs/how-to-validate-user-token.md
:::

## JWT 简介

JSON Web Token (JWT，[RFC 7519](https://tools.ietf.org/html/rfc7519))，是为了在网络应用环境间传递声明而执行的一种基于 JSON 的开放标准（\(RFC 7519\)。该 token 被设计为紧凑且安全的，特别适用于分布式站点的单点登录（SSO）场景。JWT 的声明一般被用来在身份提供者和服务提供者间传递被认证的用户身份信息，以便于从资源服务器获取资源，也可以增加一些额外的其它业务逻辑所必须的声明信息，该 token 也可直接被用于认证，也可被加密。

详细内容可以参考这篇文章：[什么是 JWT](https://www.jianshu.com/p/576dbf44b2ae)。

## 认证流程

![](~@imagesZhCn/concepts/jwt-flow.png)


### 用户认证的流程

- 用户使用账号（手机/邮箱/用户名）密码请求服务器
- 服务器验证用户账号是否和数据库匹配
- 服务器通过验证后发送给客户端一个 JWT Token
- **客户端存储 Token，并在每次请求时携带该 Token（**[**如何携带?**](#客户端附带-jwt-token-的方式)**）**
- **服务端验证 Token 值，并根据 Token 合法性返回对应资源（**[**如何验证?**](/guides/faqs/how-to-validate-user-token.md)**）**

## 安全限制

为防止用户恶意注册，系统对 IP 默认进行了限制，条件如下：

- 单 IP `5 分钟`内连续注册超过 `3 次`会被禁止；
- 单 IP `5 分钟`内连续登录失败超过 `3 次`会要求输入验证码；

> 你可以自定义时间范围和该时间段内次数的阈值。

若想开启/关闭或修改此限制，请参考：[开启/关闭/配置注册频率限制](/guides/security/config-register-limit.md)。

## 客户端附带 JWT Token 的方式

用户在完成认证后会返回开发者一个 JWT Token，开发者需将此 Token 存储于客户端，然后将此 Token 发送给开发者受限的后端服务器进行验证。

建议使用 **HTTP Header Authorization** 的形式携带 Token，以下以 JavaScript 的 axios 库为例示范如何携带：

```js
const axios = require("axios");
axios
  .get({
    url: "https://yourdomain.com/api/v1/your/resources",
    headers: {
      Authorization: "Bearer ID_TOKEN",
    },
  })
  .then((res) => {
    // custom codes
  });
```

注意第五行前面有 **Bearer 类型。**

### 什么是 Bearer?

Bearer Token \([RFC 6750](http://www.rfcreader.com/#rfc6750)\) 用于授权访问资源，任何 Bearer 持有者都可以无差别地用它来访问相关的资源，而无需证明持有加密 key。一个 Bearer 代表授权范围、有效期，以及其他授权事项；一个 Bearer 在存储和传输过程中应当防止泄露，需实现 Transport Layer Security \(TLS\)；一个 Bearer 有效期不能过长，过期后可用 Refresh Token 申请更新。

建议开发者遵循规范，在每次请求的 Token 前附带 Bearer。
