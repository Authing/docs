# 标准协议认证模块

<LastUpdated/>

此模块包含 OIDC、OAuth 2.0、SAML、CAS 标准协议的认证、获取令牌、检查令牌、登出等方法。其中发起认证的方法需要在前端使用，获取令牌、检查令牌等方法需要在后端使用。

使用方法：

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient
  options=AuthenticationClientOptions((
    app_id='AUTHING_APP_ID',
    app_host='https://YOUR_DOMAIN.authing.cn',
    secret='AUTHING_APP_SECRET',
    protocol='oidc'
))
authentication_client.build_authorize_url; # 构造前端登录链接
authentication_client.build_logout_url; # 构造前端登出链接
authentication_client.get_access_token_by_code; # Code 换 Token
authentication_client.get_access_token_by_client_credentials; # 机器间授权获取 Access Token
authentication_client.get_user_info_by_access_token; # Token 换用户信息
authentication_client.get_new_access_token_by_refresh_token; # Refresh Token
authentication_client.introspect_token; # 检验 Token 合法性
authentication_client.revoke_token; # 撤回 Token
authentication_client.validate_ticket_v1; # 检验 CAS 1.0 ticket
```

## OIDC

OpenID Connect 简称 OIDC，是 OAuth 2.0 的一个扩展，主要增加了语义化的用户信息字段。

### 初始化

初始化 AuthenticationClient 时的参数：

- `app_id` \<str\> 应用 ID，必填。
- `secret` \<str\> 应用密钥，必填。
- `app_host` \<str\> 应用完整地址，如 https://sample-app.authing.cn，不带最后的斜线 '/'。
- `redirect_uri` \<str\> 业务回调 URL，必填。详情请查看[文档](/guides/federation/oidc.html#授权码模式)。
- `protocol` \<str\> 协议类型，可选值为 `oidc`、`oauth`、`saml`、`cas`，此处填写 `oidc`。
- `token_endpoint_auth_method` \<str\> 获取 token 端点验证方式，可选值为 `client_secret_post`、`client_secret_basic`、`none`，默认为 `client_secret_post`。
- `introspection_endpoint_auth_method` \<str\> 检验 token 端点验证方式，可选值为 `client_secret_post`、`client_secret_basic`、`none`，默认为 `client_secret_post`。
- `revocation_endpoint_auth_method` \<str\> 撤回 token 端点验证方式，可选值为 `client_secret_post`、`client_secret_basic`、`none`，默认为 `client_secret_post`。

#### 示例

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient
  options=AuthenticationClientOptions(
    app_id='AUTHING_APP_ID',
    app_host='https://YOUR_DOMAIN.authing.cn',
    secret='AUTHING_APP_SECRET',
    protocol='oidc',
    redirect_uri='http://localhost:3000',
    token_endpoint_auth_method='client_secret_post',
    introspection_endpoint_auth_method='client_secret_post',
    revocation_endpoint_auth_method='client_secret_post'
))
```

### 生成 OIDC 协议的用户登录链接

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

生成 OIDC 协议的用户登录链接，用户可以通过此链接访问 Authing 的在线登录页面。

#### 参数

发起授权登录时需要填写的参数。详情请见[使用 OIDC 授权码模式](/federation/oidc/authorization-code/)。

- `scope` \<str\> 请求的权限项目，选填，OIDC 协议默认为 `openid profile email phone address`，OAuth 2.0 协议默认为 `user`。
- `nonce` \<str\> 随机字符串，选填，默认自动生成。
- `state` \<str\> 随机字符串，选填，默认自动生成。
- `response_mode` \<str\> 响应类型，选填，可选值为 `query`、`fragment`、`form_post`；默认为 `query`，即通过浏览器重定向发送 code 到回调地址。
- `response_type` \<str\> 响应类型，选填，可选值为 `code`、`code id_token token`、`code id_token`、`code id_token`、`code token`、`id_token token`、`id_token`、`none`；默认为 `code`，授权码模式。
- `redirect_uri` \<str\> 回调地址，必填，默认为 SDK 初始化时的 redirectUri 参数。
- `code_challenge` \<str\> 一个长度大于等于 43 的字符串，作为 code_challenge 发送到 Authing。
- `code_challenge_method` \<str\> 可以为 plain、S256，表示计算 code_challenge 时使用的摘要算法，plain 表示不用任何算法，S256 表示 code_challenge 是使用 SHA256 计算的。

#### 示例

- 拼接 OIDC 授权码模式授权链接

```python
from urllib.parse import urlparse, parse_qs

def test_oidc_build_authorize_url_authorization_code_mode(self):
    authentication_client = AuthenticationClient(options=AuthenticationClientOptions(
        app_id=os.getenv('AUTHING_APP_ID'),
        app_host=os.getenv('AUTHING_APP_HOST'),
        secret=os.getenv('AUTHING_APP_SECRET'),
        protocol=os.getenv('AUTHING_APP_PROTOCOL'),
        redirect_uri=os.getenv('AUTHING_APP_REDIRECT_URI'),
        token_endpoint_auth_method='client_secret_basic'
    ))
    url = authentication_client.build_authorize_url(response_mode='form_post')
    parsed_url = urlparse(url)
    queries = parse_qs(parsed_url.query)

    self.assertTrue(queries.get('nonce') is not None)
    self.assertTrue(queries.get('state') is not None)
    self.assertTrue(queries.get('scope') is not None)
    self.assertTrue(queries.get('client_id')[0] == os.getenv('AUTHING_APP_ID'))
    self.assertTrue(queries.get('redirect_uri')[0] == os.getenv('AUTHING_APP_REDIRECT_URI'))
    self.assertTrue(queries.get('response_type')[0] == 'code')
    self.assertTrue(queries.get('response_mode')[0] == 'form_post')
```

- 拼接 OIDC 隐式模式授权链接

```python
from urllib.parse import urlparse, parse_qs

def test_oidc_build_authorize_url_implicit_mode(self):
    authentication_client = AuthenticationClient(options=AuthenticationClientOptions(
        app_id=os.getenv('AUTHING_APP_ID'),
        app_host=os.getenv('AUTHING_APP_HOST'),
        secret=os.getenv('AUTHING_APP_SECRET'),
        protocol=os.getenv('AUTHING_APP_PROTOCOL'),
        redirect_uri=os.getenv('AUTHING_APP_REDIRECT_URI'),
        token_endpoint_auth_method='client_secret_basic'
    ))
    url = authentication_client.build_authorize_url(response_type='id_token token')
    parsed_url = urlparse(url)
    queries = parse_qs(parsed_url.query)
    self.assertTrue(queries.get('response_type')[0] == 'id_token token')
```

- 拼接 OIDC 带 refresh_token 能力的授权链接（scope 中包含 `offline_access`）

```python
from urllib.parse import urlparse, parse_qs

def test_oidc_build_authorize_url_offline_access(self):
    authentication_client = AuthenticationClient(options=AuthenticationClientOptions(
        app_id=os.getenv('AUTHING_APP_ID'),
        app_host=os.getenv('AUTHING_APP_HOST'),
        secret=os.getenv('AUTHING_APP_SECRET'),
        protocol=os.getenv('AUTHING_APP_PROTOCOL'),
        redirect_uri=os.getenv('AUTHING_APP_REDIRECT_URI'),
        token_endpoint_auth_method='client_secret_basic'
    ))
    url = authentication_client.build_authorize_url(scope='openid profile offline_access')
    parsed_url = urlparse(url)
    queries = parse_qs(parsed_url.query)
    self.assertTrue(queries.get('prompt')[0] == 'consent')
```

- 拼接 OIDC 授权码 + PKCE 带 refresh_token 能力的授权链接

```python
from urllib.parse import urlparse, parse_qs

def test_oidc_build_authorize_url_pkce_s256(self):
    authentication_client = AuthenticationClient(options=AuthenticationClientOptions(
        app_id=os.getenv('AUTHING_APP_ID'),
        app_host=os.getenv('AUTHING_APP_HOST'),
        secret=os.getenv('AUTHING_APP_SECRET'),
        protocol=os.getenv('AUTHING_APP_PROTOCOL'),
        redirect_uri=os.getenv('AUTHING_APP_REDIRECT_URI'),
        token_endpoint_auth_method='client_secret_basic'
    ))
    code_verifier = authentication_client.generate_code_challenge()
    code_challenge = authentication_client.generate_code_challenge_digest(code_verifier)
    url = authentication_client.build_authorize_url(
        code_challenge=code_challenge,
        code_challenge_method='S256'
    )
    parsed_url = urlparse(url)
    queries = parse_qs(parsed_url.query)

    self.assertTrue(queries.get('code_challenge')[0] == code_challenge)
    self.assertTrue(queries.get('code_challenge_method')[0] == 'S256')
```

- 拼接 OIDC 授权码 + PKCE 带 refresh_token 能力的授权链接

```python
from urllib.parse import urlparse, parse_qs

def test_oidc_build_authorize_url_pkce_plain(self):
    authentication_client = AuthenticationClient(options=AuthenticationClientOptions(
        app_id=os.getenv('AUTHING_APP_ID'),
        app_host=os.getenv('AUTHING_APP_HOST'),
        secret=os.getenv('AUTHING_APP_SECRET'),
        protocol=os.getenv('AUTHING_APP_PROTOCOL'),
        redirect_uri=os.getenv('AUTHING_APP_REDIRECT_URI'),
        token_endpoint_auth_method='client_secret_basic'
    ))
    code_verifier = authentication_client.generate_code_challenge()
    code_challenge = authentication_client.generate_code_challenge_digest(code_verifier, method='plain')
    url = authentication_client.build_authorize_url(
        code_challenge=code_challenge,
        code_challenge_method='plain',
        scope='openid profile offline_access'
    )
    parsed_url = urlparse(url)
    queries = parse_qs(parsed_url.query)

    self.assertTrue(queries.get('code_challenge')[0] == code_challenge)
    self.assertTrue(queries.get('code_challenge_method')[0] == 'plain')
    self.assertTrue(queries.get('prompt')[0] == 'consent')
```

#### 示例数据

```http
https://oidc1.authing.cn/oidc/auth?nonce=5485323897342262&state=7400704296715694&scope=openid+profile+offline_access&client_id=5f17a529f64fb009b794a2ff&response_mode=query&redirect_uri=https%3A%2F%2Fbaidu.com&response_type=code&prompt=consent
```

### Code 换 Token

```python
def get_access_token_by_code(self, code, code_verifier=None):
  pass
```

使用授权码 Code 获取用户的 Token 信息。

#### 参数

- `code` \<str\> 授权码 Code，用户在认证成功后，Authing 会将授权码 Code 发送到回调地址，详情请见[使用 OIDC 授权码模式](/federation/oidc/authorization-code/)。
- `code_verifier` \<str\> 校验码原始值，不是摘要值。发起 PKCE 授权登录时需要填写此参数。详情请见[使用 OIDC 授权码 + PKCE 模式](/federation/oidc/pkce/)。

#### 示例

普通授权码模式：

```python
code = 'xxxx'
data = authentication_client.get_access_token_by_code(
  code=code
)
```

PKCE + 授权码模式：

```python
code = 'xxxx'
code_verifier = 'xxx'
data = authentication_client.get_access_token_by_code(
  code=code,
  code_verifier=code_verifier
)
```

#### 示例数据

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRmTE90M0xibjhfYThwUk11ZXNzYW1xai1vM0RCQ3MxLW93SExRLVZNcVEifQ.eyJqdGkiOiJsdzg0NW5zdGcwS3EtMTlodVpQOHYiLCJzdWIiOiI1ZmY3MDFkODQ2YjkyMDNlMmY2YWM2ZjMiLCJpYXQiOjE2MTU4ODM1ODYsImV4cCI6MTYxNTg4NzE4Niwic2NvcGUiOiJlbWFpbCBvcGVuaWQgcHJvZmlsZSBwaG9uZSIsImlzcyI6Imh0dHBzOi8vb2lkYzEuYXV0aGluZy5jbi9vaWRjIiwiYXVkIjoiNWYxN2E1MjlmNjRmYjAwOWI3OTRhMmZmIn0.VvYKBcWcr8iIi1b37ugWQ9hsvog4_7EqDQyFqwhIuvM0NHlHH3Bhw83EQIKSNfbWV4nv3ihfeNGPLMzslbQr-wwjnWZTLMYl1bcn7IdVtD_kTN3Zz10MwF5td-VQ7UndU28wJ0HE1mo6E8QH93kYGckS5FSZXmCBa0M5H59Jec_a1MHI1MZrr_V9cZ9EfeF97V-PcqU8JVAwDZclCJ3mWY_Mb65RnMR9yEVqUZzJStmaXGMuRIzjkm2pklqt0CtQQJfzECXq_4USpwRXDiYLWILYPUCcO6hGxDjhMEd8IcxdG51TQP-w1UM6LyIRn61uSJvDsz8zg5dStDKyocypiA",
  "expires_in": 3600,
  "id_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QzQDEyMy5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInN1YiI6IjVmZjcwMWQ4NDZiOTIwM2UyZjZhYzZmMyIsImJpcnRoZGF0ZSI6bnVsbCwiZmFtaWx5X25hbWUiOm51bGwsImdlbmRlciI6IlUiLCJnaXZlbl9uYW1lIjpudWxsLCJsb2NhbGUiOm51bGwsIm1pZGRsZV9uYW1lIjpudWxsLCJuYW1lIjpudWxsLCJuaWNrbmFtZSI6bnVsbCwicGljdHVyZSI6Imh0dHBzOi8vZmlsZXMuYXV0aGluZy5jby9hdXRoaW5nLWNvbnNvbGUvZGVmYXVsdC11c2VyLWF2YXRhci5wbmciLCJwcmVmZXJyZWRfdXNlcm5hbWUiOm51bGwsInByb2ZpbGUiOm51bGwsInVwZGF0ZWRfYXQiOiIyMDIxLTAzLTE1VDA1OjU0OjU0LjY4NVoiLCJ3ZWJzaXRlIjpudWxsLCJ6b25laW5mbyI6bnVsbCwicGhvbmVfbnVtYmVyIjpudWxsLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOmZhbHNlLCJub25jZSI6IjcwVEU3eW9NVFEiLCJhdF9oYXNoIjoiUFNnOGw5eDRldGxmLXA4UDdjYnVoQSIsImlzcyI6Imh0dHBzOi8vb2lkYzEuYXV0aGluZy5jbi9vaWRjIiwiaXNzMiI6Imh0dHBzOi8vYmFpZHUuY29tIiwiYXVkIjoiNWYxN2E1MjlmNjRmYjAwOWI3OTRhMmZmIiwiZXhwIjoxNjE1ODg3MTg3LCJpYXQiOjE2MTU4ODM1ODh9.OlX-FP7znIEqx0YpnOQ8kxadMe1toHDj1KPVm0dbEVc",
  "scope": "email openid profile phone",
  "token_type": "Bearer"
}
```


字段解释：

| 字段名       | 含义                                      |
| ------------ | ----------------------------------------- |
| token_type   | Token 类型，固定值 Bearer                 |
| scope        | 授权范围，授权获取的用户权限项目          |
| id_token     | Id token，Authing 颁发的 Id token         |
| expires_in   | Access token 过期时间                     |
| access_token | Access token，Authing 颁发的 Access token |

### Token 换用户信息

```python
def get_user_info_by_access_token(self, access_token):
  pass
```

使用 Access token 获取用户信息。

#### 参数

- `access_token` \<str\> Access token，使用授权码 Code 换取的 Access token 的内容。详情请见[使用 OIDC 授权码模式](/federation/oidc/authorization-code/)。

#### 示例

```javascript
data = authentication_client.get_user_info_by_access_token('Access token');
```

#### 示例数据

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

| 字段名                 | 翻译                    |
| :--------------------- | :---------------------- |
| sub                    | subject 的缩写，唯一标识，一般为用户 ID |
| name                   | 姓名                    |
| given_name             | 名字                    |
| family_name            | 姓氏                    |
| middle_name            | 中间名                  |
| nickname               | 昵称                    |
| preferred_username     | 希望被称呼的名字        |
| profile                | 基础资料                |
| picture                | 头像                    |
| website                | 网站链接                |
| email                  | 电子邮箱                |
| email_verified         | 邮箱是否被认证          |
| gender                 | 性别                    |
| birthdate              | 生日                    |
| zoneinfo               | 时区                    |
| locale                 | 区域                    |
| phone_number           | 手机号                  |
| phone_number_verified  | 认证手机号              |
| address                | 地址对象                |
| address.formatted      | 详细地址                |
| address.street_address | 街道地址                |
| address.locality       | 城市                    |
| address.region         | 省                      |
| address.postal_code    | 邮编                    |
| address.country        | 国家                    |
| updated_at             | 信息更新时间            |

### 刷新 Access Token


```python
def get_new_access_token_by_refresh_token(self, refresh_token):
  pass
```

使用 Refresh token 获取新的 Access token。

#### 参数

- `refresh_token` \<str\> Refresh token，可以从 AuthenticationClient.get_access_token_by_code 方法的返回值中的 refresh_token 获得。详情请见[刷新 Access token](/guides/federation/oidc.md#刷新-access-token)。

#### 示例

```python
data = authentication_client.get_new_access_token_by_refresh_token('Refresh Token');
```

#### 示例数据

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRmTE90M0xibjhfYThwUk11ZXNzYW1xai1vM0RCQ3MxLW93SExRLVZNcVEifQ.eyJqdGkiOiJZUHB4NUVEWGlQWVJvNUFQWXAzci0iLCJzdWIiOiI1ZmY3MDFkODQ2YjkyMDNlMmY2YWM2ZjMiLCJpYXQiOjE2MTQwOTE0OTksImV4cCI6MTYxNDA5NTA5OSwic2NvcGUiOiJvZmZsaW5lX2FjY2VzcyBwcm9maWxlIG9wZW5pZCIsImlzcyI6Imh0dHBzOi8vb2lkYzEuYXV0aGluZy5jbi9vaWRjIiwiYXVkIjoiNWYxN2E1MjlmNjRmYjAwOWI3OTRhMmZmIn0.ZN_SlfVg1oNMz7uAK-5K84dqqqmlZehmAPOLytOR9HnLHImKJ9VO5u1hRsAjGCob0kMUV5wVxQhX3EFks7FtMamiX2Jvn-NYh4V_5T6l3LFf4uoKF6AykAg483nG3EEENuGgQo15bBszsoCGqFnNmUd0T4Cgxx0zbxXPxMdp_dcE14KzmNz1w-Qg3yVeYmSTZFdcLtZA2BYnVEa7LYA2yA3DgawwAcRmrlyEfnvCO3uY2TcsTKEAfQ-QgVIGRWOfyUE5f-_X3TolliO1fXnwZBdxEKMXLGW5E2bPVcePyiV0upYbUnQ079UxBlEiWlgeW_rpkTPXDxHAgiE488gtlg",
  "expires_in": 3600,
  "id_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZmY3MDFkODQ2YjkyMDNlMmY2YWM2ZjMiLCJiaXJ0aGRhdGUiOm51bGwsImZhbWlseV9uYW1lIjpudWxsLCJnZW5kZXIiOiJVIiwiZ2l2ZW5fbmFtZSI6bnVsbCwibG9jYWxlIjpudWxsLCJtaWRkbGVfbmFtZSI6bnVsbCwibmFtZSI6bnVsbCwibmlja25hbWUiOm51bGwsInBpY3R1cmUiOiJodHRwczovL2ZpbGVzLmF1dGhpbmcuY28vYXV0aGluZy1jb25zb2xlL2RlZmF1bHQtdXNlci1hdmF0YXIucG5nIiwicHJlZmVycmVkX3VzZXJuYW1lIjpudWxsLCJwcm9maWxlIjpudWxsLCJ1cGRhdGVkX2F0IjoiMjAyMS0wMi0yM1QxNDo0NDoxOC4wODVaIiwid2Vic2l0ZSI6bnVsbCwiem9uZWluZm8iOm51bGwsImF0X2hhc2giOiIxaWRJSUxaWExpZkRscXJMY3ZNeV9BIiwiS0VZIjoiVkFMVUUiLCJhdWQiOiI1ZjE3YTUyOWY2NGZiMDA5Yjc5NGEyZmYiLCJleHAiOjE2MTQwOTUwOTgsImlhdCI6MTYxNDA5MTQ5OSwiaXNzIjoiaHR0cHM6Ly9vaWRjMS5hdXRoaW5nLmNuL29pZGMifQ._H59237sqpsY0OgyY_RM7CvuG6cFo1x03y-DBhd5hik",
  "refresh_token": "3T49f4Y48szoMmwBXragjqLwQZC4QhgnsM5Oy2WfmU-",
  "scope": "openid offline_access profile",
  "token_type": "Bearer"
}
```

### 检查 Access Token 或 Refresh token 的状态

```python
def introspect_token(self, token):
  pass
```

检查 Access token 或 Refresh token 的状态。

#### 参数

- `token` \<str\> Access token 或 Refresh token，可以从 AuthenticationClient.get_access_token_by_code 方法的返回值中的 access_token、refresh_token 获得。**注意: refresh_token 只有在 scope 中包含 offline_access 才会返回。**

#### 示例

```python
data = authentication_client.introspect_token('Refresh Token');
```

#### 示例数据

Token 合法时返回：

```json
{
  "active": true,
  "sub": "60097f4d5bc08f75da104d18", // subject 的缩写，为用户 ID
  "client_id": "60097391b1358c17c5fb0f4e",
  "exp": 1612445888,
  "iat": 1611236288,
  "iss": "https://core.littleimp.cn/oidc",
  "jti": "TV4J0gAbe4KR4-8CtYcOa",
  "scope": "openid profile email phone offline_access",
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

### 检验 Id Token 或 Access Token 的合法性

```python
def validate_token(self, id_token=None, access_token=None):
  pass
```

通过 Authing 提供的在线接口验证 Id token 或 Access Token。会产生网络请求。

#### 参数

- `id_token` \<str\> Access token 或 Refresh token，可以从 get_access_token_by_code 方法的返回值中的 id_token 获得。
- `access_token` \<str\> Access token，可以从 get_access_token_by_code 方法的返回值中的 access_token 获得。

#### 示例

- 检查 id_token 的合法性

```python
data = authentication_client.validate_token(
  id_token='xxx'
)
```

- 检查 access_token 的合法性

```python
data = authentication_client.validate_token(
  access_token='xxx'
)
```

#### 示例数据

id_token 验证合法时返回：

```json
{
  "sub": "5f64afd1ad501364e3b43c1e", // subject 的缩写，为用户 ID
  "birthdate": null,
  "family_name": null,
  "gender": "U",
  "given_name": null,
  "locale": null,
  "middle_name": null,
  "name": null,
  "nickname": null,
  "picture": "https://usercontents.authing.cn/authing-avatar.png",
  "preferred_username": "test1",
  "profile": null,
  "updated_at": "2020-09-27T06:06:29.853Z",
  "website": null,
  "zoneinfo": null,
  "email": "test1@123.com",
  "email_verified": false,
  "phone_number": null,
  "phone_number_verified": false,
  "nonce": "CQsguqUdl7",
  "at_hash": "10iOtwuTNtyQLzlNYXAHeg",
  "aud": "5f17a529f64fb009b794a2ff",
  "exp": 1601460494,
  "iat": 1601456894,
  "iss": "https://oidc1.authing.cn/oidc"
}
```

Id token 验证非法时返回：

```json
{ "code": 400, "message": "id_token 格式有误" }
```

```json
{ "code": 400, "message": "id_token 不合法" }
```

Access token 验证合法时返回：

```json
{
  "jti": "K5TYewNhvdGBdHiRifMyW",
  "sub": "5f64afd1ad501364e3b43c1e", // subject 的缩写，为用户 ID
  "iat": 1601456894,
  "exp": 1601460494,
  "scope": "openid profile email phone",
  "iss": "https://oidc1.authing.cn/oidc",
  "aud": "5f17a529f64fb009b794a2ff"
}
```

Access token 验证非法时返回：

```json
{ "code": 400, "message": "access_token 格式有误" }
```

```json
{ "code": 400, "message": "access_token 不合法" }
```

### 撤回 Access Token 或 Refresh token

```python
def revoke_token(self, token):
  pass
```

撤回 Access token 或 Refresh token。Access token 或 Refresh token 的持有者可以通知 Authing 已经不再需要令牌，希望 Authing 将其吊销。

#### 参数

- `token` \<str\> Access token 或 Refresh token，可以从 get_access_token_by_code 方法的返回值中的 access_token、refresh_token 获得。**注意: refresh_token 只有在 scope 中包含 offline_access 才会返回。**

#### 示例

```python
success = authentication_client.revoke_token(token='xxx')
```

#### 示例数据

撤回成功时返回 true。

撤回失败时抛出错误。

### 拼接登出 URL

```python
def build_logout_url(self, expert=None, redirect_uri=None, id_token=None):
  pass
```

拼接登出 URL。

#### 参数

- `expert` \<boolean\> 是否开启专家模式，默认为 `false`。
- `redirect_uri` \<str\> 登出后的重定向地址。
- `id_token` \<str\> 用户的 idToken。

#### 示例

使用前端万能登出链接退出登录：

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient
  options=AuthenticationClientOptions(
    app_id='AUTHING_APP_ID',
    app_host='https://YOUR_DOMAIN.authing.cn',
    redirect_uri='http://localhost:3000',
    protocol='oidc'
))
# 此处 redirect_uri 可以任意填
url = authentication_client.build_logout_url(
  redirect_uri='https://authing.cn'
);
```

使用 OIDC 协议标准链接退出登录，需要传入当前用户的 **Id token**，且登出回调地址**必须与控制台配置的一致**：

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient
  options=AuthenticationClientOptions(
    app_id='AUTHING_APP_ID',
    app_host='https://YOUR_DOMAIN.authing.cn',
    redirect_uri='http://localhost:3000',
    protocol='oidc'
))
# 此处 redirect_uri 可以任意填
url = authentication_client.build_logout_url(
  expert=True,
  id_token='待退出用户的 idToken',
  redirect_uri='http://localhost:3000'
);
```

### Client Credentials 模式获取 Access Token

```python
def get_access_token_by_client_credentials(self, scope, access_key, access_secret):
  pass
```

使用[编程访问账号](/guides/authorization/m2m-authz.html#m2m-授权)获取具备权限的 Access Token。

#### 参数

- `scope` \<str\> 权限项目，空格分隔的字符串，每一项代表一个权限。详情请见[机器间（M2M）授权](/guides/authorization/m2m-authz.html#获取具备权限的-accesstoken)。
- `access_key`，编程访问账号 AccessKey。
- `access_secret`，编程访问账号 SecretKey。

#### 示例

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient
  options=AuthenticationClientOptions(
    app_id='AUTHING_APP_ID',
    app_host='https://YOUR_DOMAIN.authing.cn',
    secret='AUTHING_APP_SECRET',
    redirect_uri='http://localhost:3000',
    protocol='oidc'
))
res = authentication_client.get_access_token_by_client_credentials(
  scope='email openid profile phone',
  access_key='编程访问账号 AK',
  access_secret='编程访问账号 SK'
)
```

#### 示例数据

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRmTE90M0xibjhfYThwUk11ZXNzYW1xai1vM0RCQ3MxLW93SExRLVZNcVEifQ.eyJqdGkiOiJsdzg0NW5zdGcwS3EtMTlodVpQOHYiLCJzdWIiOiI1ZmY3MDFkODQ2YjkyMDNlMmY2YWM2ZjMiLCJpYXQiOjE2MTU4ODM1ODYsImV4cCI6MTYxNTg4NzE4Niwic2NvcGUiOiJlbWFpbCBvcGVuaWQgcHJvZmlsZSBwaG9uZSIsImlzcyI6Imh0dHBzOi8vb2lkYzEuYXV0aGluZy5jbi9vaWRjIiwiYXVkIjoiNWYxN2E1MjlmNjRmYjAwOWI3OTRhMmZmIn0.VvYKBcWcr8iIi1b37ugWQ9hsvog4_7EqDQyFqwhIuvM0NHlHH3Bhw83EQIKSNfbWV4nv3ihfeNGPLMzslbQr-wwjnWZTLMYl1bcn7IdVtD_kTN3Zz10MwF5td-VQ7UndU28wJ0HE1mo6E8QH93kYGckS5FSZXmCBa0M5H59Jec_a1MHI1MZrr_V9cZ9EfeF97V-PcqU8JVAwDZclCJ3mWY_Mb65RnMR9yEVqUZzJStmaXGMuRIzjkm2pklqt0CtQQJfzECXq_4USpwRXDiYLWILYPUCcO6hGxDjhMEd8IcxdG51TQP-w1UM6LyIRn61uSJvDsz8zg5dStDKyocypiA",
  "expires_in": 3600,
  "scope": "email openid profile phone",
  "token_type": "Bearer"
}
```

### 生成 PKCE 校验码

```python
def generate_code_challenge(self, length=43):
  pass
```

生成一个 PKCE 校验码（长度至少为 43）。

#### 参数

无

#### 示例

```python
code_challenge = authentication_client.generate_code_challenge()
```

#### 示例数据

```
VrpGRU_3FQ5au1TqCvzeh1nTij7HkcnpP1qWzJMGX_Y
```

### 生成 PKCE 校验码摘要值

```python
def generate_code_challenge_digest(self, code_challenge, method=None):
  pass
```

生成一个 PKCE 校验码。

#### 参数

- `code_challenge`，待生成摘要值的 code_challenge 原始值，一个长度大于等于 43 的随机字符串。
- `method`，可以为 plain、S256，表示计算 code_challenge 时使用的摘要算法，plain 表示不用任何算法原样返回，S256 表示使用 SHA256 计算 code_challenge 摘要。


#### 示例

```python
# 生成一个 code_challenge
code_challenge = authentication_client.generate_code_challenge()

# 计算 code_challenge 的 SHA256 摘要
code_challenge_digest = authentication_client.generate_code_challenge_digest(
  code_challenge=code_challenge,
  method='S256'
)
```

#### 示例数据

```
Bu6RP796BBiAwGwdUpHpKfhmQqahszBcGep8qT31XOy
```

## OAuth 2.0

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

#### 示例

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

### 生成 OAuth 2.0 协议的用户登录链接

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

#### 参数

发起授权登录时需要填写的参数。详情请见[使用 OAuth2.0 授权码模式](/federation/oauth2/authorization-code/)。

- `scope` \<str\> 请求的权限项目，选填，OAuth 2.0 协议默认为 `user`。
- `state` \<str\> 随机字符串，选填，默认自动生成。
- `response_type` \<str\> 响应类型，选填，可选值为 `code`、`token` 默认为 `code`，授权码模式。
- `redirect_uri` \<str\> 回调地址，选填，默认为 SDK 初始化时的 redirect_uri 参数。

#### 示例

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

#### 示例数据

```http
https://oidc1.authing.cn/oauth/auth?state=7400704296715694&scope=user&client_id=5f17a529f64fb009b794a2ff&redirect_uri=https%3A%2F%2Fbaidu.com&response_type=code
```

### Code 换 Token

```python
def get_access_token_by_code(self, code):
  pass
```

使用授权码 Code 获取用户的 Token 信息。

#### 参数

- `code` \<str\> 授权码 Code，用户在认证成功后，Authing 会将授权码 Code 发送到回调地址，详情请见[使用 OAuth 2.0 授权码模式](/federation/oauth2/authorization-code/)。

#### 示例

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

#### 示例数据

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

### Token 换用户信息


```python
def get_user_info_by_access_token(self, access_token):
  pass
```

使用 Access token 获取用户信息。

#### 参数

- `access_token` \<str\> Access token，使用授权码 Code 换取的 Access token 的内容。详情请见[使用 OIDC 授权码模式](/federation/oidc/authorization-code/)。

#### 示例

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


#### 示例数据

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

| 字段名                 | 翻译                    |
| :--------------------- | :---------------------- |
| sub                    | subject 的缩写，唯一标识，一般为用户 ID |
| name                   | 姓名                    |
| given_name             | 名字                    |
| family_name            | 姓氏                    |
| middle_name            | 中间名                  |
| nickname               | 昵称                    |
| preferred_username     | 希望被称呼的名字        |
| profile                | 基础资料                |
| picture                | 头像                    |
| website                | 网站链接                |
| email                  | 电子邮箱                |
| email_verified         | 邮箱是否被认证          |
| gender                 | 性别                    |
| birthdate              | 生日                    |
| zoneinfo               | 时区                    |
| locale                 | 区域                    |
| phone_number           | 手机号                  |
| phone_number_verified  | 认证手机号              |
| address                | 地址对象                |
| address.formatted      | 详细地址                |
| address.street_address | 街道地址                |
| address.locality       | 城市                    |
| address.region         | 省                      |
| address.postal_code    | 邮编                    |
| address.country        | 国家                    |
| updated_at             | 信息更新时间            |

### 刷新 Access Token

```python
def get_new_access_token_by_refresh_token(self, refresh_token):
  pass
```

使用 Refresh token 获取新的 Access token。

#### 参数

- `refresh_token` \<str\> Refresh token，可以从 get_access_token_by_code 方法的返回值中的 refresh_token 获得。

#### 示例

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

#### 示例数据

```json
{
  "access_token": "fa9d2bdd914ea01aa4e434c12d4f919d749fc75c",
  "token_type": "Bearer",
  "expires_in": 1209599,
  "refresh_token": "b5e0e1afe793c6634495434afc262b88ddee9af3",
  "scope": "user"
}
```

### 检查 Access token 或 Refresh Token

```python
def introspect_token(self, token):
  pass
```

检查 Access Token 或 Refresh Token 的状态。


#### 参数

- `token` \<str\> Access token 或 Refresh token，可以从 get_access_token_by_code 方法的返回值中的 access_token、refresh_token 获得。

#### 示例

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

#### 示例数据

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

### 撤回 Access Token 或 Refresh token

```python
def revoke_token(self, token):
  pass
```

撤回 Access token 或 Refresh token。Access token 或 Refresh token 的持有者可以通知 Authing 已经不再需要令牌，希望 Authing 将其吊销。

#### 参数

- `token` \<str\> Access token 或 Refresh token，可以从 get_access_token_by_code 方法的返回值中的 access_token、refresh_token 获得。

#### 示例

```python
data = authentication_client.revoke_token('Access token 或 Refresh token');
```

#### 示例数据

撤回成功时返回 true。

撤回失败时抛出错误。

### 拼接登出 URL

```python
def build_logout_url(self, redirect_uri=None):
  pass
```

拼接登出 URL，用户可以通过此链接退出登录。

#### 参数

- `redirect_uri` \<str\> 登出后的重定向地址。

#### 示例

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

## SAML2

安全断言标记语言（英语：Security Assertion Markup Language，简称 SAML，发音 sam-el）是一个基于 XML 的开源标准数据格式，它在当事方之间交换身份验证和授权数据，尤其是在身份提供者和服务提供者之间交换。

### 初始化

- `app_id` \<str\> 应用 ID，必填。
- `app_host` \<str\> 应用完整地址，如 https://sample-app.authing.cn，不带最后的斜线 '/'。
- `protocol` \<str\> 协议类型，可选值为 `oidc`、`oauth`、`saml`、`cas`，此处填写 `saml`。

#### 示例

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient
  options=AuthenticationClientOptions(
    app_id='AUTHING_APP_ID',
    app_host='https://YOUR_DOMAIN.authing.cn',
    protocol='saml',
))
```

### 生成 SAML2 协议的用户登录链接

```python
def build_authorize_url(self):
  pass
```

生成 SAML2 协议的用户登录链接。

#### 参数

无

#### 示例

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

#### 示例数据

```http
https://oidc1.authing.cn/api/v2/saml-idp/5f17a529f64fb009b794a2ff
```

### 拼接登出 URL

```python
def build_logout_url(self, redirect_uri=None):
  pass
```

拼接登出 URL，用户可以通过此链接退出登录。

#### 参数

- `redirect_uri` \<str\> 登出后的重定向地址。

#### 示例

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

#### 示例数据

```http
https://oidc1.authing.cn/login/profile/logout?redirect_uri=https://authing.cn
```

## CAS

CAS 是 Central Authentication Service 的缩写，中央认证服务，一种独立开放指令协议。

### 初始化

- `app_id` \<str\> 应用 ID，必填。
- `app_host` \<str\> 应用完整地址，如 https://sample-app.authing.cn，不带最后的斜线 '/'。
- `protocol` \<str\> 协议类型，可选值为 `oidc`、`oauth`、`saml`、`cas`，此处填写 `cas`。

#### 示例

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient
  options=AuthenticationClientOptions(
    app_id='AUTHING_APP_ID',
    app_host='https://YOUR_DOMAIN.authing.cn',
    protocol='cas',
))
```

### 生成 CAS 协议的用户登录链接

```python
def build_authorize_url(self):
  pass
```

生成 CAS 协议的用户登录链接。

#### 参数

无

#### 示例

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

#### 示例数据

```http
https://oidc1.authing.cn/cas-idp/5f17a529f64fb009b794a2ff/login?service=https://example.com
```

### 检验 CAS 1.0 Ticket 合法性

```python
def validate_ticket_v1(self, ticket, service):
  pass
```

检验 CAS 1.0 Ticket 合法性。

#### 参数

- `ticket` \<str\> CAS 认证成功后，Authing 颁发的 ticket。
- `service` \<str\> CAS 回调地址。

#### 示例

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

#### 示例数据

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

### 拼接登出 URL

```python
def build_logout_url(self, redirect_uri=None):
  pass
```

拼接登出 URL。

#### 参数

- `redirect_uri` \<str\> 登出后的重定向地址。

#### 示例

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
#### 示例数据

```http
https://oidc1.authing.cn/cas-idp/5f17a529f64fb009b794a2ff/logout?service=https://example.com
```
