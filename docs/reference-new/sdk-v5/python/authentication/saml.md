---
meta:
  - name: description
    content: Python SDK
---

<LastUpdated/>

# {{$localeConfig.brandName}} - Python SDK SAML 模块

安全断言标记语言（英语：Security Assertion Markup Language，简称 SAML，发音 sam-el）是一个基于 XML 的开源标准数据格式，它在当事方之间交换身份验证和授权数据，尤其是在身份提供者和服务提供者之间交换。

## 初始化

- `app_id` \<str\> 应用 ID，必填。
- `app_host` \<str\> 应用完整地址，如 https://sample-app.authing.cn，不带最后的斜线 '/'。
- `protocol` \<str\> 协议类型，可选值为 `oidc`、`oauth`、`saml`、`cas`，此处填写 `saml`。

### 示例

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient
  options=AuthenticationClientOptions(
    app_id='AUTHING_APP_ID',
    app_host='https://YOUR_DOMAIN.authing.cn',
    protocol='saml',
))
```

## 生成 SAML2 协议的用户登录链接

```python
def build_authorize_url(self):
  pass
```

生成 SAML2 协议的用户登录链接。

### 参数

无

### 示例

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient
  options=AuthenticationClientOptions(
    app_id='AUTHING_APP_ID',
    app_host='https://YOUR_DOMAIN.authing.cn',
    protocol='saml',
))

url = authentication_client.build_authorize_url()
```

### 示例数据

```http
https://oidc1.authing.cn/api/v2/saml-idp/5f17a529f64fb009b794a2ff
```

## 拼接登出 URL

```python
def build_logout_url(self, redirect_uri=None):
  pass
```

拼接登出 URL，用户可以通过此链接退出登录。

### 参数

- `redirect_uri` \<str\> 登出后的重定向地址。

### 示例

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient
  options=AuthenticationClientOptions(
    app_id='AUTHING_APP_ID',
    app_host='https://YOUR_DOMAIN.authing.cn',
    secret='AUTHING_APP_SECRET',
    protocol='saml',
))
url = authentication_client.build_logout_url(
  redirect_uri="http://localhost:3000"
);
```

### 示例数据

```http
https://oidc1.authing.cn/login/profile/logout?redirect_uri=https://authing.cn
```
