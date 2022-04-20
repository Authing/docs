# IdToken 添加自定义字段

<LastUpdated/>

## 什么是 IdToken

**id_token** 相当于用户的身份证，开发者的前端访问后端接口时应当携带 id_token，**开发者服务器**需要校验前端传递的 id_token。可用 OIDC 应用的密钥或 OIDC 应用公钥验签，然后可以得到此 token 对应的用户 ID 以及基本信息。示例代码请见：[使用应用密钥验证 Token](/guides/basics/authenticate-first-user/how-to-validate-user-token.md#使用应用密钥验证-hs256-算法签名的-token)。

在 {{$localeConfig.brandName}} 中，[用户信息](/guides/user/user-profile.md)的 `token` 字段就是一个 IdToken。

## IdToken 默认包含字段

一个 OIDC IdToken 默认包含以下字段，[参考 OIDC 规范](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims)：

| 字段名 | 含义 |
| :--- | :--- |
| sub | subject 的缩写，为用户 ID |
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

## IdToken 添加自定义字段

你可以使用 {{$localeConfig.brandName}} 的 [Pipeline 能力](/guides/pipeline/)在用户认证流程中插入自定义代码段，给用户添加自定义 `IdToken` 字段。例如下面的例子中，我们给用户的 `id_token` 添加了 `KEY` 这个字段，值为 `VALUE`： 

```javascript
async function pipe(user, context, callback) {
  user.addToken('KEY', 'VALUE')
  callback(null, user, context)
}
```

> 你可以在[这个网站](https://jwt.yelexin.cn)解析 `id_token` 。

