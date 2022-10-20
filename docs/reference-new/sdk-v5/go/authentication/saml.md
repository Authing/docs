---
meta:
  - name: description
    content: Go SDK
---

<LastUpdated/>

# {{$localeConfig.brandName}} - Go SDK SAML 模块

安全断言标记语言（英语：Security Assertion Markup Language，简称 SAML，发音 sam-el）是一个基于 XML 的开源标准数据格式，它在当事方之间交换身份验证和授权数据，尤其是在身份提供者和服务提供者之间交换。

## 初始化

- `appId` \<string\> 应用 ID，必填。
- `appHost` \<string\> 应用完整地址，如 https://sample-app.authing.cn，不带最后的斜线 '/'。
- `protocol` \<string\> 协议类型，可选值为 `oidc`、`oauth`、`saml`、`cas`，此处填写 `saml`。

### 示例

```go
    authenticationClient := NewClient("appid", "sec")
	authenticationClient.Host = "https://demo.authing.cn"
	authenticationClient.RedirectUri = "https://mvnrepository.com/"
	authenticationClient.Protocol = constant.SAML

```

## 生成 SAML2 协议的用户登录链接

```go
func (c *Client) BuildAuthorizeUrlBySaml() string
```

生成 SAML2 协议的用户登录链接。

### 参数

无

### 示例

```go
url = authenticationClient.BuildAuthorizeUrlBySaml()
```

### 示例数据

```http
https://oidc1.authing.cn/api/v2/saml-idp/5f17a529f64fb009b794a2ff
```

## 拼接登出 URL

```go
//BuildLogoutUrl
//拼接登出 URL
func (c *Client) BuildLogoutUrl(expert, redirectUri, idToken *string) string
```

拼接登出 URL，用户可以通过此链接退出登录。

### 参数

- `expert` \<string\> 忽视即可。
- `redirectUri` \<string\> 登出后的重定向地址。
- `idToken` \<string\> 忽视即可。

### 示例

```go
    authenticationClient := NewClient("appid", "sec")
	authenticationClient.Host = "https://demo.authing.cn"
	authenticationClient.RedirectUri = "https://mvnrepository.com/"
	authenticationClient.Protocol = constant.SAML
    url = authenticationClient.BuildLogoutUrl("http://localhost:3000")
```

### 示例数据

```http
https://oidc1.authing.cn/login/profile/logout?redirect_uri=https://authing.cn
```
