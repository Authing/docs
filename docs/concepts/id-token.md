---
tags:
  - ID_Token
  - IdToken
---
# 什么是 ID Token

<LastUpdated/>

在 `OIDC` 协议中，你会遇到三种 Token: `id_token`, `access_token` 和 `refresh_token`。本文会介绍什么是 **ID Token**，你也可以分别阅读：

- [什么是 Access Token](./access-token.md)
- [什么是 Refresh Token](./refresh-token.md)

[OIDC (OpenID Connect) 协议](https://openid.net/specs/openid-connect-core-1_0.html)对 [OAuth 2.0 协议](https://tools.ietf.org/html/rfc6749) 最主要的一个扩展就是 **ID Token** 数据结构。**ID Token** 相当于用户的身份凭证，开发者的前端访问后端接口时可以携带 **ID Token**，**开发者服务器**可以校验用户的 **ID Token** 以确定用户身份，[验证](/guides/faqs/how-to-validate-user-token.md)通过后返回相关资源。

**ID Token** 本质上是一个 [`JWT Token`](./jwt-token.md)，包含了该用户身份信息相关的 key/value 键值对，例如：

```json
{
   "iss": "https://server.example.com",
   "sub": "24400320", // subject 的缩写，为用户 ID
   "aud": "s6BhdRkqt3",
   "nonce": "n-0S6_WzA2Mj",
   "exp": 1311281970,
   "iat": 1311280970,
   "auth_time": 1311280969,
   "acr": "urn:mace:incommon:iap:silver"
}
```

**ID Token** 本质上是一个 `JWT Token` 意味着：

- 用户的身份信息直接被编码进了 `id_token`，你不需要额外请求其他的资源来获取用户信息；
- `id_token` 可以验证其没有被篡改过，详情请见[如何验证 ID Token](/guides/faqs/how-to-validate-user-token.md)。


## ID Token 完整字段含义

| 字段名 | 翻译 |
| :--- | :--- |
| sub | subject 的缩写，唯一标识，一般为用户 ID |
| name | 姓名 |
| given\_name | 名字 |
| family\_name | 姓氏 |
| middle\_name | 中间名 |
| nickname | 昵称 |
| preferred\_username | 希望被称呼的名字 |
| profile | 基础资料 |
| picture | 头像 |
| website | 网站链接 |
| email | 电子邮箱 |
| email\_verified | 邮箱是否被认证 |
| gender | 性别 |
| birthdate | 生日 |
| zoneinfo | 时区 |
| locale | 区域 |
| phone\_number | 手机号 |
| phone\_number\_verified | 认证手机号 |
| address | 地址 |
| formatted | 详细地址 |
| street\_address | 街道地址 |
| locality | 城市 |
| region | 省 |
| postal\_code | 邮编 |
| country | 国家 |
| updated\_at | 信息更新时间 |

[参考 OIDC 规范](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims)  
