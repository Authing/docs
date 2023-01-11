---
meta:
  - name: description
    content: 用户字段释义
---

# 用户字段释义

<LastUpdated/>

{{$localeConfig.brandName}} 用户的所有字段及其释义如下：

- `id`: 用户 ID，示例为 `5f927f5daa7ba859b6b5c21f`，是 {{$localeConfig.brandName}} 自动生成的唯一 ID。
- `arn`: ARN
- `status`: 用户状态
- `token`: 用户的身份凭证，值为一个 [OIDC IdToken](/concepts/id-token.md)。通过此字段可以验证用户身份以及判断用户登录态，详情请见 [验证 Token](../faqs/how-to-validate-user-token.md)。
- `userPoolId`: 用户池 ID，示例为 `5f927f5daa7ba859b6b5c21f`，是 {{$localeConfig.brandName}} 自动生成的唯一 ID。
- `username`: 用户名，用户池内唯一，区分大小写。
- `email`: 邮箱，用户池内唯一，不区分大小写，如 `Bob@example.com` 和 `bob@example.com` 会识别为同一个邮箱。
- `emailVerified`: 邮箱是否已验证，{{$localeConfig.brandName}} 默认不会阻止邮箱未验证的用户登录，如果你希望强制要求用户邮箱验证之后才能登录，[请见此](/guides/users/settings.html#%E7%A6%81%E6%AD%A2%E9%82%AE%E7%AE%B1%E6%9C%AA%E9%AA%8C%E8%AF%81%E7%9A%84%E7%94%A8%E6%88%B7%E7%99%BB%E5%BD%95)。
- `phone`: 手机号，用户池内唯一。
- `phoneVerified`: 手机号是否已验证，使用手机号验证码注册、登录的用户该字段为 `true`，管理员手动创建的用户此字段为 `false` 。
- `unionid`: 使用第三方身份源或社会化登录的用户，该字段为用户在第三方的 ID。
- `openid`: 第三方身份源用户，返回的 openid。
- `nickname`: 用户昵称，该字段不具备唯一性。
- `photo`: 用户头像。
- `oauth`: 通过社会化登录方式注册的用户，该字段保存了第三方社会化登录服务商返回的原始用户信息。如 github 注册的用户，此字段通过 JSON 解析之后，是[小程序返回的原始用户信息](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/user-info/wx.getUserInfo.html)。
- `tokenExpiredAt`: token 过期时间, 为符合 ISO8601 格式的时间字符串。(如 "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")。
- `loginsCount`: 累计登录次数。
- `lastLogin`: 上次登录时间，为符合 ISO8601 格式的时间字符串。(如 "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")。
- `signedUp`: 注册时间，为符合 ISO8601 格式的时间字符串。(如 "2017-06-07T14:34:08.700Z", "2017-06-07T14:34:08.700 or "2017-06-07T14:34:08+04:00")。
- `blocked`: 用户账号是否被锁定，被锁定的账号无法进行登录。
- `lastIP`: 用户上次登录时的客户端 IP。
- `device`: 上次登录时使用的设备。
- `browser`: 上次登录时使用的浏览器。
- `company`: 公司。
- `name`: OIDC 标准字段。
- `givenName`: OIDC 标准字段。
- `familyName`: OIDC 标准字段。
- `middleName`: OIDC 标准字段。
- `preferredUsername`: OIDC 标准字段。
- `profile`: 用户的 Profile Url，使用 GitHub 登录的用户，该字段为其 GitHub 个人主页链接。
- `website`: 个人网站
- `gender`: 性别, M（Man） 表示男性、F（Female） 表示女性、 U（Unknown）表示未知。
- `birthdate`: 生日
- `zoneinfo`: 时区
- `locale`: 语言
- `address`: 地址
- `streetAddress`: 街道地址
- `locality`: Locality
- `region`: 地域
- `postalCode`： 邮编
- `city`: 城市
- `province`: 省份
- `country`: 国家

以下是 JSON 格式的示例用户信息：

```json
{
  "id": "5f8d4c6ee7cbcaf59486c93d",
  "arn": "arn:cn:authing:59f86b4832eb28071bdd9214:user:5f8d4c6ee7cbcaf59486c93d",
  "userPoolId": "59f86b4832eb28071bdd9214",
  "username": "USERNAME",
  "email": null,
  "emailVerified": false,
  "phone": null,
  "phoneVerified": false,
  "unionid": "UNIONID",
  "openid": "OPENID",
  "nickname": null,
  "photo": "https://files.authing.co/user-contents/59f86b4832eb28071bdd9214/avatar/5c7cd4a4-4ea4-443c-9656-705f0b247a29.jpg",
  "oauth": "OAUTH",
  "token": "TOKEN",
  "tokenExpiredAt": "2020-10-19T16:21:02+08:00",
  "loginsCount": 1,
  "lastLogin": "2020-10-19T16:21:02+08:00",
  "lastIP": null,
  "signedUp": "2020-10-19T16:21:02+08:00",
  "blocked": false,
  "isDeleted": false,
  "device": null,
  "browser": null,
  "company": null,
  "name": null,
  "givenName": null,
  "familyName": null,
  "middleName": null,
  "profile": "https://github.com/shat810",
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
  "country": null,
  "createdAt": "2020-10-19T16:21:02+08:00",
  "updatedAt": "2020-10-19T16:21:04+08:00"
}
```
