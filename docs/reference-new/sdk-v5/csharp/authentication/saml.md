---
meta:
  - name: description
    content: C# SDK
---

<LastUpdated/>

# {{$localeConfig.brandName}} - C# SDK SAML 模块

安全断言标记语言（英语：Security Assertion Markup Language，简称 SAML，发音 sam-el）是一个基于 XML 的开源标准数据格式，它在当事方之间交换身份验证和授权数据，尤其是在身份提供者和服务提供者之间交换。

## 初始化

初始化 authenticationClient 时的参数：

- `appId` \<string\> 应用 ID，必填。
- `appHost` \<string\> 应用完整地址，如 https://sample-app.authing.cn，不带最后的斜线 "/"。
- `protocol` \<ProtocolEnum\> 协议类型，可选值为 `OIDC`、`OAUTH`、`SAML`、`CAS`，默认为 `OIDC`。

## 生成 SAML2 协议的用户登录链接

```csharp
authenticationClient.BuildAuthorizeUrl()
```

> 生成 SAML2 协议的用户登录链接

### 参数

无

### 示例

```csharp
// 拼接 SAML2 登录链接
var samlstring = await authenticationClient.BuildAuthorizeUrl();
```

### 示例数据

```http
https://oidc1.authing.cn/api/v2/saml-idp/5f17a529f64fb009b794a2ff
```
