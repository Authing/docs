---
meta:
  - name: description
    content: Go SDK
---

<LastUpdated/>

# {{$localeConfig.brandName}} - Go SDK CSA 模块

CAS 是 Central Authentication Service 的缩写，中央认证服务，一种独立开放指令协议。

## 初始化

- `appId` \<string\> 应用 ID，必填。
- `appHost` \<string\> 应用完整地址，如 https://sample-app.authing.cn，不带最后的斜线 '/'。
- `protocol` \<string\> 协议类型，可选值为 `oidc`、`oauth`、`saml`、`cas`，此处填写 `cas`。

### 示例

```go
    authenticationClient := NewClient("appid", "sec")
	authenticationClient.Host = "https://demo.authing.cn"
	authenticationClient.RedirectUri = "https://mvnrepository.com/"
	authenticationClient.Protocol = constant.CAS
```

## 生成 CAS 协议的用户登录链接

```go
func (c *Client) BuildAuthorizeUrlByCas(service *string) string
```

生成 CAS 协议的用户登录链接。

### 参数

无

### 示例

```go
    authenticationClient := NewClient(AppId, Secret)
	authenticationClient.userPoolId = UserPool
	authenticationClient.Protocol = constant.CAS
	resp, ee := authenticationClient.BuildAuthorizeUrlByCas("service")

```

### 示例数据

```http
https://oidc1.authing.cn/cas-idp/5f17a529f64fb009b794a2ff/login?service=https://example.com
```

## 检验 CAS 1.0 Ticket 合法性

```go
// ValidateTicketV1
// 检验 CAS 1.0 Ticket 合法性
func (c *Client) ValidateTicketV1(ticket, service string) (*struct {
	Valid    bool   `json:"code"`
	Message  string `json:"message"`
	Username string `json:"username"`
}, error)
```

检验 CAS 1.0 Ticket 合法性。

### 参数

- `ticket` \<string\> CAS 认证成功后，Authing 颁发的 ticket。
- `service` \<string\> CAS 回调地址。

### 示例

```go
    authenticationClient := NewClient(AppId, Secret)
	authenticationClient.userPoolId = UserPool
	authenticationClient.Protocol = constant.CAS
	resp, ee := authenticationClient.ValidateTicketV1("ticket 内容","service 地址")

```

### 示例数据

ticket 合法时返回：

```json
{
  "valid": true,
  "username": "user1"
}
```

ticket 不合法时返回：

```json
{
  "valid": false,
  "message": "ticket 不合法"
}
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
	authenticationClient.Protocol = constant.CAS
    url = authenticationClient.BuildLogoutUrl("http://localhost:3000")
```

### 示例数据

```http
https://oidc1.authing.cn/cas-idp/5f17a529f64fb009b794a2ff/logout?service=https://example.com
```
