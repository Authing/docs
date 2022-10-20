---
meta:
  - name: description
    content: Python SDK
---

<LastUpdated/>

# {{$localeConfig.brandName}} - Python SDK CSA 模块

CAS 是 Central Authentication Service 的缩写，中央认证服务，一种独立开放指令协议。

## 初始化

- `app_id` \<str\> 应用 ID，必填。
- `app_host` \<str\> 应用完整地址，如 https://sample-app.authing.cn，不带最后的斜线 '/'。
- `protocol` \<str\> 协议类型，可选值为 `oidc`、`oauth`、`saml`、`cas`，此处填写 `cas`。

### 示例

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient
  options=AuthenticationClientOptions(
    app_id='AUTHING_APP_ID',
    app_host='https://YOUR_DOMAIN.authing.cn',
    protocol='cas',
))
```

## 生成 CAS 协议的用户登录链接

```python
def build_authorize_url(self):
  pass
```

生成 CAS 协议的用户登录链接。

### 参数

无

### 示例

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient
  options=AuthenticationClientOptions(
    app_id='AUTHING_APP_ID',
    app_host='https://YOUR_DOMAIN.authing.cn',
    protocol='cas',
))

url = authentication_client.build_authorize_url()
```

### 示例数据

```http
https://oidc1.authing.cn/cas-idp/5f17a529f64fb009b794a2ff/login?service=https://example.com
```

## 检验 CAS 1.0 Ticket 合法性

```python
def validate_ticket_v1(self, ticket, service):
  pass
```

检验 CAS 1.0 Ticket 合法性。

### 参数

- `ticket` \<str\> CAS 认证成功后，Authing 颁发的 ticket。
- `service` \<str\> CAS 回调地址。

### 示例

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient
  options=AuthenticationClientOptions(
    app_id='AUTHING_APP_ID',
    app_host='https://YOUR_DOMAIN.authing.cn',
    protocol='cas',
))

data = authentication_client.validate_ticket_v1(
  ticket='ticket 内容',
  service='service 地址'
)
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

```python
def build_logout_url(self, redirect_uri=None):
  pass
```

拼接登出 URL。

### 参数

- `redirect_uri` \<str\> 登出后的重定向地址。

### 示例

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient
  options=AuthenticationClientOptions(
    app_id='AUTHING_APP_ID',
    app_host='https://YOUR_DOMAIN.authing.cn',
    protocol='cas',
))

data = authentication_client.build_logout_url(
  redirect_uri='http://localhost:3000',
)

```

### 示例数据

```http
https://oidc1.authing.cn/cas-idp/5f17a529f64fb009b794a2ff/logout?service=https://example.com
```
