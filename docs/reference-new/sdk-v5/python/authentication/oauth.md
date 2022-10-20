---
meta:
  - name: description
    content: Python SDK
---

<LastUpdated/>

# {{$localeConfig.brandName}} - Python SDK OAuth2.0 模块

OAuth 是一个关于授权（Authorization）的开放网络标准，目前的版本是 2.0 版。

初始化 AuthenticationClient 时的参数：

- `app_id` \<str\> 应用 ID，必填。
- `secret` \<str\> 应用密钥，必填。
- `app_host` \<str\> 应用完整地址，如 https://sample-app.authing.cn，不带最后的斜线 '/'。
- `redirect_uri` \<str\> 业务回调 URL，必填。详情请查看[文档](/guides/federation/oauth.html#授权码模式)。
- `protocol` \<str\> 协议类型，可选值为 `oidc`、`oauth`、`saml`、`cas`，此处填写 `oauth`。
- `token_endpoint_auth_method` \<str\> 获取 token 端点验证方式，可选值为 `client_secret_post`、`client_secret_basic`、`none`，默认为 `client_secret_post`。
- `introspection_endpoint_auth_method` \<str\> 检验 token 端点验证方式，可选值为 `client_secret_post`、`client_secret_basic`、`none`，默认为 `client_secret_post`。
- `revocation_endpoint_auth_method` \<str\> 撤回 token 端点验证方式，可选值为 `client_secret_post`、`client_secret_basic`、`none`，默认为 `client_secret_post`。

### 示例

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient
  options=AuthenticationClientOptions(
    app_id='AUTHING_APP_ID',
    app_host='https://YOUR_DOMAIN.authing.cn',
    secret='AUTHING_APP_SECRET',
    protocol='oauth',
))
```

## 生成 OAuth 2.0 协议的用户登录链接

```python
def build_authorize_url(
  self,
  redirect_uri=None,
  response_type=None,
  response_mode=None,
  state=None,
  nonce=None,
  scope=None,
  code_challenge_method=None,
  code_challenge=None,
):
  pass
```

生成 OAuth 2.0 协议的用户登录链接，用户可以通过此链接访问 Authing 的在线登录页面。

### 参数

发起授权登录时需要填写的参数。详情请见[使用 OAuth2.0 授权码模式](/federation/oauth2/authorization-code/)。

- `scope` \<str\> 请求的权限项目，选填，OAuth 2.0 协议默认为 `user`。
- `state` \<str\> 随机字符串，选填，默认自动生成。
- `response_type` \<str\> 响应类型，选填，可选值为 `code`、`token` 默认为 `code`，授权码模式。
- `redirect_uri` \<str\> 回调地址，选填，默认为 SDK 初始化时的 redirect_uri 参数。

### 示例

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient
  options=AuthenticationClientOptions(
    app_id='AUTHING_APP_ID',
    app_host='https://YOUR_DOMAIN.authing.cn',
    secret='AUTHING_APP_SECRET',
    protocol='oauth',
    redirect_uri='http://localhost:3000',
))

url = authentication_client.build_authorize_url(
  scope: 'user'
)
```

### 示例数据

```http
https://oidc1.authing.cn/oauth/auth?state=7400704296715694&scope=user&client_id=5f17a529f64fb009b794a2ff&redirect_uri=https%3A%2F%2Fbaidu.com&response_type=code
```

## Code 换 Token

```python
def get_access_token_by_code(self, code):
  pass
```

使用授权码 Code 获取用户的 Token 信息。

### 参数

- `code` \<str\> 授权码 Code，用户在认证成功后，Authing 会将授权码 Code 发送到回调地址，详情请见[使用 OAuth 2.0 授权码模式](/federation/oauth2/authorization-code/)，每个 Code 只能使用一次。

### 示例

初始化 `AuthenticationClient` 的时候，需要将 `protocol` 设置为 `oauth`。

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient
  options=AuthenticationClientOptions(
    app_id='AUTHING_APP_ID',
    app_host='https://YOUR_DOMAIN.authing.cn',
    secret='AUTHING_APP_SECRET',
    protocol='oauth',
))

code = 'xxxx'
data = authentication_client.get_access_token_by_code(
  code=code
)
```

### 示例数据

```json
{
  "access_token": "fa9d2bdd914ea01aa4e434c12d4f919d749fc75c",
  "token_type": "Bearer",
  "expires_in": 1209599,
  "refresh_token": "b5e0e1afe793c6634495434afc262b88ddee9af3",
  "scope": "user"
}
```

字段解释：

| 字段名       | 含义                                      |
| ------------ | ----------------------------------------- |
| token_type   | Token 类型，固定值 Bearer                 |
| scope        | 授权范围，授权获取的用户权限项目          |
| expires_in   | Access token 过期时间                     |
| access_token | Access token，Authing 颁发的 Access token |

## Token 换用户信息

```python
def get_user_info_by_access_token(self, access_token):
  pass
```

使用 Access token 获取用户信息。

### 参数

- `access_token` \<str\> Access token，使用授权码 Code 换取的 Access token 的内容。详情请见[使用 OIDC 授权码模式](/federation/oidc/authorization-code/)。

### 示例

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient
  options=AuthenticationClientOptions(
    app_id='AUTHING_APP_ID',
    app_host='https://YOUR_DOMAIN.authing.cn',
    secret='AUTHING_APP_SECRET',
    protocol='oauth',
))
data = authentication_client.get_user_info_by_access_token('Access token');
```

### 示例数据

```json
{
  "address": {
    "country": null,
    "postal_code": null,
    "region": null,
    "formatted": null
  },
  "birthdate": null,
  "family_name": null,
  "gender": "U",
  "given_name": null,
  "locale": null,
  "middle_name": null,
  "name": null,
  "nickname": null,
  "picture": "https://files.authing.co/authing-console/default-user-avatar.png",
  "preferred_username": null,
  "profile": null,
  "updated_at": "2021-03-03T06:17:14.485Z",
  "website": null,
  "zoneinfo": null,
  "email": "test1@authing.cn",
  "email_verified": false,
  "sub": "603f184cec4505e2868431fc", // subject 的缩写，为用户 ID
  "phone_number": null,
  "phone_number_verified": false
}
```

字段解释：

| 字段名                 | 翻译                                    |
| :--------------------- | :-------------------------------------- |
| sub                    | subject 的缩写，唯一标识，一般为用户 ID |
| name                   | 姓名                                    |
| given_name             | 名字                                    |
| family_name            | 姓氏                                    |
| middle_name            | 中间名                                  |
| nickname               | 昵称                                    |
| preferred_username     | 希望被称呼的名字                        |
| profile                | 基础资料                                |
| picture                | 头像                                    |
| website                | 网站链接                                |
| email                  | 电子邮箱                                |
| email_verified         | 邮箱是否被认证                          |
| gender                 | 性别                                    |
| birthdate              | 生日                                    |
| zoneinfo               | 时区                                    |
| locale                 | 区域                                    |
| phone_number           | 手机号                                  |
| phone_number_verified  | 认证手机号                              |
| address                | 地址对象                                |
| address.formatted      | 详细地址                                |
| address.street_address | 街道地址                                |
| address.locality       | 城市                                    |
| address.region         | 省                                      |
| address.postal_code    | 邮编                                    |
| address.country        | 国家                                    |
| updated_at             | 信息更新时间                            |

## 刷新 Access Token

```python
def get_new_access_token_by_refresh_token(self, refresh_token):
  pass
```

使用 Refresh token 获取新的 Access token。

### 参数

- `refresh_token` \<str\> Refresh token，可以从 get_access_token_by_code 方法的返回值中的 refresh_token 获得。

### 示例

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient
  options=AuthenticationClientOptions(
    app_id='AUTHING_APP_ID',
    app_host='https://YOUR_DOMAIN.authing.cn',
    secret='AUTHING_APP_SECRET',
    protocol='oauth',
))

data = authentication_client.get_new_access_token_by_refresh_token('Refresh Token');
```

### 示例数据

```json
{
  "access_token": "fa9d2bdd914ea01aa4e434c12d4f919d749fc75c",
  "token_type": "Bearer",
  "expires_in": 1209599,
  "refresh_token": "b5e0e1afe793c6634495434afc262b88ddee9af3",
  "scope": "user"
}
```

## 检查 Access token 或 Refresh Token

```python
def introspect_token(self, token):
  pass
```

检查 Access Token 或 Refresh Token 的状态。

### 参数

- `token` \<str\> Access token 或 Refresh token，可以从 get_access_token_by_code 方法的返回值中的 access_token、refresh_token 获得。

### 示例

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient
  options=AuthenticationClientOptions(
    app_id='AUTHING_APP_ID',
    app_host='https://YOUR_DOMAIN.authing.cn',
    secret='AUTHING_APP_SECRET',
    protocol='oauth',
))

data = authentication_client.introspect_token('Access Token');
```

### 示例数据

Token 合法时返回：

```json
{
  "active": true,
  "sub": "5f719946524ee1099229496b", // subject 的缩写，为用户 ID
  "client_id": "5f17a529f64fb009b794a2ff",
  "exp": 1619083024,
  "iat": 1617873424,
  "iss": "https://core.authing.cn/oauth",
  "jti": "qbovGK-HZL0O_20wY7uXj",
  "scope": "user",
  "token_type": "Bearer"
}
```

Token 不合法时返回：

```json
{
  "active": false
}
```

检验过程失败会抛出错误。

## 撤回 Access Token 或 Refresh token

```python
def revoke_token(self, token):
  pass
```

撤回 Access token 或 Refresh token。Access token 或 Refresh token 的持有者可以通知 Authing 已经不再需要令牌，希望 Authing 将其吊销。

### 参数

- `token` \<str\> Access token 或 Refresh token，可以从 get_access_token_by_code 方法的返回值中的 access_token、refresh_token 获得。

### 示例

```python
data = authentication_client.revoke_token('Access token 或 Refresh token');
```

### 示例数据

撤回成功时返回 true。

撤回失败时抛出错误。

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
    protocol='oauth',
))
url = authentication_client.build_logout_url(
  redirect_uri="http://localhost:3000"
);
```
