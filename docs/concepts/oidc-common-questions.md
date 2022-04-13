---
meta:
  - name: description
    content: OIDC 常见问题
---

# OIDC 常见问题

<LastUpdated/>

OIDC 的全称是 OpenID Connect，是一个基于 OAuth 2.0 的轻量级认证 + 授权协议，是 OAuth 2.0 的超集。它规定了其他应用，例如你开发的应用 A（XX 邮件系统），应用 B（XX 聊天系统），应用 C（XX 文档系统），如何到你的中央数据表中取出用户数据，约定了交互方式、安全规范等，确保了你的用户能够在访问所有应用时，只需登录一遍，而不是反反复复地输入密码，而且遵循这些规范，你的用户认证环节会很安全。

## OIDC 在后端如何处理

请参考 GitHub 上的示例：[oidc-demo](https://github.com/Authing/oidc-demo)

## OIDC 三种认证流程的特征对比

| 特性                           | 授权码模式 | 隐式模式 | 混合模式 |
| :----------------------------- | :--------- | :------- | :------- |
| 所有 token 全部从授权端点返回  | no         | yes      | no       |
| 所有 token 都从 token 端点返回 | yes        | no       | no       |
| token 不会暴露给前端           | yes        | no       | no       |
| 客户端可以被 OP 认证           | yes        | no       | yes      |
| 可以刷新 token                 | yes        | no       | yes      |
| 一次交互                       | no         | yes      | no       |
| 必须服务器-服务器通信          | yes        | no       | varies   |

## 不同 response-type 对应的授权流程

| "response_type" value | Flow                                  |
| :-------------------- | :------------------------------------ |
| code                  | Authorization Code Flow（授权码模式） |
| id_token              | Implicit Flow（隐式模式）             |
| id_token token        | Implicit Flow（隐式模式）             |
| code id_token         | Hybrid Flow（混合模式）               |
| code token            | Hybrid Flow（混合模式）               |
| code id_token token   | Hybrid Flow（混合模式）               |

[参考 OIDC 规范](https://openid.net/specs/openid-connect-core-1_0.html#Authentication)

## 如何验证 Token 合法性

请参考：

::: page-ref /guides/basics/authenticate-first-user/how-to-validate-user-token.md
:::

## scope 参数对应的用户信息

| scope 名称     | 对应信息                                                                                                                                             |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| username | username |
| address        | address                                                                                                                                              |
| email          | email，email_verified                                                                                                                                |
| phone          | phone_number, phone_number_verified                                                                                                                  |
| profile        | birthdate，family_name，gender，given_name，locale，middle_name，name，nickname，picture，preferred_username，profile，updated_at，website，zoneinfo |
| offline_access | 如果存在此参数，token 接口会返回 refresh_token 字段                                                                                                  |
| roles      | 对应 role 信息，用户的角色列表                                                                                        |
| unionid | 用户的 unionid 字段 |
| openid | 用户的 openid 字段 |
| external_id | 用户在原有系统的用户 ID |
| extended_fields           | 用户的扩展字段信息，内容为一个对象，key 为扩展字段名，value 为扩展字段值      |



## OIDC 用户信息字段含义

| 字段名                | 翻译                    |
| :-------------------- | :---------------------- |
| sub                   | subject 的缩写，唯一标识，一般为用户 ID |
| name                  | 姓名                    |
| given_name            | 名字                    |
| family_name           | 姓氏                    |
| middle_name           | 中间名                  |
| nickname              | 昵称                    |
| preferred_username    | 希望被称呼的名字        |
| profile               | 基础资料                |
| picture               | 头像                    |
| website               | 网站链接                |
| email                 | 电子邮箱                |
| email_verified        | 邮箱是否被认证          |
| gender                | 性别                    |
| birthdate             | 生日                    |
| zoneinfo              | 时区                    |
| locale                | 区域                    |
| phone_number          | 手机号                  |
| phone_number_verified | 认证手机号              |
| address               | 地址                    |
| formatted             | 详细地址                |
| street_address        | 街道地址                |
| locality              | 城市                    |
| region                | 省                      |
| postal_code           | 邮编                    |
| country               | 国家                    |
| updated_at            | 信息更新时间            |

[参考 OIDC 规范](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims)

## IdToken 与 AccessToken 的区别

**IdToken** 相当于用户的身份证，开发者的前端访问后端接口时应当携带 **IdToken**，**开发者服务器**应该校验用户的 **IdToken**，验证通过后返回相关资源，可用 OIDC 应用的密钥或 OIDC 应用公钥验签，然后可以得到此 token 对应的用户 ID 以及基本信息。示例代码请见：[使用应用密钥验证 Token](/guides/basics/authenticate-first-user/how-to-validate-user-token.md#使用应用密钥验证-hs256-算法签名的-token)。

**AccessToken** 用于请求 {{$localeConfig.brandName}} 服务器上该用户持有的资源。你访问 {{$localeConfig.brandName}} 服务器的请求需要在 Authorization 请求头中携带此 **AccessToken**，示例代码如下：

```js
const axios = require("axios");
axios
  .get({
    url: "https://core.authing.cn/api/v2/your/resources",
    headers: {
      Authorization: "Bearer YOUR_OIDC_ACCESS_TOKEN",
    },
  })
  .then((res) => {
    // custom codes
  });
```

## 为什么 OIDC 授权码流程要 code 换 token 再换用户信息

OIDC 授权码模式的认证流程中涉及三方：用户、OIDC 服务器（OIDC Provider，简称 OP）、应用业务服务器（Service Provider，简称 SP）。

SP、用户、OP 的交互目的分为以下几点：

1. SP 希望拿到一个可信的身份断言，从而让用户登录。
2. SP 发起登录，会跳转到 OP 的认证页面，OP 让用户登录，并授权自己的信息，然后 OP 将一个授权码（code）发给 SP。实际上这是在通过引用来传递用户信息。
3. SP 收到授权码 code 后，结合 Client ID 和 Client Secret 到 OP 换取该用户的 `access_token`。
4. SP 利用 `access_token` 到 OP 去获取用户的相关信息，从而得到一个可信的身份断言，让用户登录。

OIDC 协议中，用户登录成功后，OIDC 认证服务器会将用户的浏览器回调到一个回调地址，并携带一个授权码（code）。此授权码一般有效期十分钟且一次有效，用后作废。这避免了在前端暴露 `access_token` 或者用户信息的风险，`access_token` 的有效期都比较长，一般为 1~2 个小时。如果泄露会对用户造成一定影响。

后端收到这个 code 之后，需要使用 Client Id + Client Secret + Code 去 OIDC 认证服务器换取用户的 `access_token`。在这一步，实际上 OIDC Server 对 OAuth Client 进行了认证，能够确保来 OIDC 认证服务器获取 `access_token` 的机器是可信任的，而不是任何一个人拿到 code 之后都能来 OIDC 认证服务器进行 code 换 token。

如果 code 被黑客获取到，如果他没有 Client Id + Client Secret 也无法使用，就算有，也要和真正的应用服务器竞争，因为 code 一次有效，用后作废，加大了攻击难度。相反，如果不经过 code 直接返回 `access_token` 或用户信息，那么一旦泄露就会对用户造成影响。
