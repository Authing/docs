---
meta:
  - name: description
    content: context 对象
---

# context 对象

<LastUpdated/>


context 对象中保存了当前认证流程的上下文，包括认证手段、身份提供方，以及请求 IP, 地址等。


## 属性

| 属性名           | 类型   | 说明                                                                                                        |
| :--------------- | :----- | :---------------------------------------------------------------------------------------------------------- |
| protocol         | string | 认证协议。具体说明见下文。                                                                                  |
| connection       | string | 身份提供方。具体说明见下文。                                                                                |  |
| userPoolId       | string | 用户池 ID                                                                                                   |
| userPoolName     | string | 用户池 名称                                                                                                 |
| userPoolMetadata | object | 用户池配置                                                                                                  |
| appId       | string | 当前用户的 ID                                                                                                   |
| appName     | string | 当前应用的 名称                                                                                                 |
| appMetadata | object | 当前应用的配置信息                                                                                                  |
| request          | object | 当前请求的详细信息，包括: <br> `ip`: 客户端 IP <br> `geo`: 通过 IP 解析的客户端地理位置 <br> `body`: 请求体 <br> `query`: query string 对象，你可以通过 `request.query.xxx` 获取对应 query 参数 |
| accessTokenTarget | Enum: `programmaticAccount`, `user` | 仅在签发 accessToken 前的 pipeline 中有值，表示当前是为编程访问账号还是用户签发 accessToken |

## protocol

认证协议。

| 可能值   | 说明                                                                                                          |
| :------- | :------------------------------------------------------------------------------------------------------------ |
| password | 基于账号密码的认证方式                                                                                        |
| sms      | 基于短信验证码的认证方式                                                                                      |
| social   | 社会化登录认证默认，当使用 {{$localeConfig.brandName}} 集成的社会化登录手段登录时为此值。                                         |
| ldap     | 使用 LDAP 进行认证。有关如何接入 LDAP 请见 [配置 LDAP 服务](../../connections/ldap/)。              |
| saml     | 使用 SAML 进行认证。有关如何接入 SAML 请见 [接入 SAML](../../connections/saml/)。                      |
| oidc     | 使用 OIDC 协议认证。有关如何接入 OIDC 请见[使用 OIDC 授权](../../connections/oidc/)。 |

## connection

身份提供方。

<table>
  <thead>
    <tr>
      <th style="text-align:left">可能值</th>
      <th style="text-align:left">说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">ldap	</td>
      <td style="text-align:left">使用 lDAP 协议进行登录。 一个 {{$localeConfig.brandName}} LDAP 服务对应一个 {{$localeConfig.brandName}} 用户目录或第三方用户目录，详情请见
        <a
        href="../../connections/ldap/">配置 LDAP 服务</a> 和 <a href="../../guides/users/ldap-user-directory"> 使用 {{$localeConfig.brandName}} 的 LDAP 用户目录</a>。</td>
    </tr>
    <tr>
      <td style="text-align:left">saml</td>
      <td style="text-align:left">使用 SAML 协议进行登录。有关如何接入 SAML 请见 <a href="../../connections/saml/">接入 SAML</a>。</td>
    </tr>
    <tr>
      <td style="text-align:left">oidc</td>
      <td style="text-align:left">使用 OIDC 协议认证。有关如何接入 OIDC 请见 <a href="../../connections/oidc/">使用 OIDC 授权</a>。</td>
    </tr>
    <tr>
      <td style="text-align:left">github</td>
      <td style="text-align:left">使用 GitHub 登录。详情见
        <a
        href="../../connections/github/">接入 GitHub 登录</a>。</td>
    </tr>
    <tr>
      <td style="text-align:left">
        <p></p>
        <p>wechat</p>
      </td>
      <td style="text-align:left">PC 微信扫码登录。详情见
        <a
        href="../../connections/wechat-pc/">接入 PC 微信扫码登录</a>。</td>
    </tr>
    <tr>
      <td style="text-align:left">wechat:miniprogram</td>
      <td style="text-align:left">使用微信小程序登录。详情见
        <a
        href="../../connections/wechat-miniprogram-qrconnect/">接入微信小程序登录</a>。</td>
    </tr>
    <tr>
      <td style="text-align:left">wechatwork</td>
      <td style="text-align:left">使用企业微信登录。</td>
    </tr>
    <tr>
      <td style="text-align:left">qq</td>
      <td style="text-align:left">使用 QQ 网页版登录。详情见
        <a
        href="../../connections/qq/">接入 QQ 登录</a>。</td>
    </tr>
    <tr>
      <td style="text-align:left">weibo</td>
      <td style="text-align:left">使用微博网页版登录。详情见
        <a
        href="../../connections/weibo/">接入微博登录</a>。</td>
    </tr>
    <tr>
      <td style="text-align:left">dingtalk</td>
      <td style="text-align:left">使用钉钉网页版登录。详情见
        <a
        href="../../connections/dingtalk/">接入钉钉登录</a>。</td>
    </tr>
    <tr>
      <td style="text-align:left">alipay</td>
      <td style="text-align:left">使用支付宝 APP 登录。详情见
        <a
        href="../../connections/alipay/">接入移动 APP 支付宝登录
      </a>。</td>
    </tr>
  </tbody>
</table>


## data 对象

### 注册前、注册后

注册前、注册后 Pipeline 中 data 对象部分请求字段如下：详情请见 [{{$localeConfig.brandName}} GraphQL 调试器](https://authing.cn/graphiql/) **用户鉴权** - **注册**接口。

::: hint-warning
email, phone, unionid 等字段不一定同时存在，使用前请先判断其是否存在！如

```js
const email = context.request.body.email;
if (email) {
  // 表示是用邮箱注册
  // 可以进行邮箱注册白名单的逻辑

  if (!email.endsWith("example.com")) {
    return callback(new Error("Access Denied!"));
  }
}
```

:::

| 字段名     | 类型    | 是否一定存在 | 说明                                       |
| :--------- | :------ | ------------ | :----------------------------------------- |
| username   | string  | 否           | 用户名，使用用户名注册的时候不为空。       |
| email      | string  | 否           | 邮箱，使用用户名注册的时候不为空。         |
| phone      | string  | 否           | 手机号，使用手机号注册的时候不为空。       |
| forceLogin | boolean | 否           | 注册时候是否自动进行登录流程，默认为 false |
| profile    | object  | 是           | 用户注册所填的数据用户信息                 |

### 认证前、认证后

认证前、认证后 Pipeline 中 data 对象部分请求字段如下：

::: hint-warning
这些字段不一定全部存在，使用前请先判断是否存在！
:::

| 字段名   | 类型   | 是否一定存在 | 说明                                 |
| :------- | :----- | ------------ | :----------------------------------- |
| username | string | 否           | 用户名，使用用户名登录的时候不为空。 |
| email    | string | 否           | 邮箱，使用邮箱登录的时候不为空。     |
| phone    | string | 否           | 手机号，使用手机号登录的时候不为空。 |

## userPool 对象
用户池相关信息。
| 字段名 | 类型   | 说明       |
| :----- | :----- | :--------- |
| id     | string | 用户池 ID  |
| name   | string | 用户池名称 |

## geo 属性

示例数据：

```json
{
  "province": "北京市",
  "city": "北京市",
  "adcode": "110000",
  "rectangle": "116.0119343,39.66127144;116.7829835,40.2164962"
}
```
