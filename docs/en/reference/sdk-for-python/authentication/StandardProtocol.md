# Standard agreement certification module

<LastUpdated/>

This module contains authentication of OIDC、OAuth 2.0, SAML, CAS standard protocol, obtains tokens, checking tokens, and logout. The method of initiating authentication needs to be used at the front end, get a token, check the token, and other methods need to be used in the backend.

Instructions:

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient
  options=AuthenticationClientOptions(
    app_id='AUTHING_APP_ID',
    app_host='https://YOUR_DOMAIN.authing.cn',
    secret='AUTHING_APP_SECRET',
    protocol='oidc'
))
authentication_client.build_authorize_url; # Texture front end login link
authentication_client.build_logout_url; # Texture front end logout link
authentication_client.get_access_token_by_code; # Code exchange Token
authentication_client.get_access_token_by_client_credentials; # Machine license Access Token
authentication_client.get_user_info_by_access_token; # Token Change user information
authentication_client.get_new_access_token_by_refresh_token; # Refresh Token
authentication_client.introspect_token; # Test Token legality
authentication_client.revoke_token; # withdraw Token
authentication_client.validate_ticket_v1; # test CAS 1.0 ticket
```

## OIDC

OpenID Connect is abbreviated as OIDC, an extension of OAuth 2.0, which mainly adds a semantic user information field.

### initialization

Parameters when initializing AuthenticationClient:

- `app_id` \<str\> Apply ID, required.
- `secret` \<str\> Apply the key, required.
- `app_host` \<str\> Apply the full address, such as https://sample-app.authing.cn, without the last slash '/'。
- `redirect_uri` \<str\> Business callback URL, mustal. Please see [Document](/guides/federation/oidc.html#授权码模式)。
- `protocol` \<str\> Protocol type, optional value `oidc`、`oauth`、`saml`、`cas`, Fill in this `oidc`。
- `token_endpoint_auth_method` \<str\> Get the Token End Point Verification Mode, optional value `client_secret_post`、`client_secret_basic`、`none`, the default is `client_secret_post`。
- `introspection_endpoint_auth_method` \<str\> Check the way to verify the Token Endpoint, optional value `client_secret_post`、`client_secret_basic`、`none`, the default is `client_secret_post`。
- `revocation_endpoint_auth_method` \<str\> Withdrawing the Token Endpoint Validation, optional value is `client_secret_post`、`client_secret_basic`、`none`, the default is `client_secret_post`。

#### Example

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

### A user login link to generate an OIDC protocol

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

The user login link of the OIDC protocol is generated, and the user can access the an Authing online login page through this link.

#### parameter

Parameters that need to be filled in when launching a license login. For details, please see [Using OIDC Authorization Code Mode](/federation/oidc/authorization-code/)。

- `scope` \<str\> Request permission item, option, OIDC protocol default`openid profile email phone address`, OAuth 2.0 protocol is default `user`.
- `nonce` \<str\> Random strings, optional, default automatically generated.
- `state` \<str\> Random strings, optional, default automatically generated.
- `response_mode` \<str\>Response type, optional, optional value `query`、`fragment`、`form_post`; the default is `query`, is redirected by the browser to send the Code to the callback address.
- `response_type` \<str\> Response type, optional, optional value `code`、`code id_token token`、`code id_token`、`code id_token`、`code token`、`id_token token`、`id_token`、`none`; the default is `code`, Authorize code mode.
- `redirect_uri` \<str\> the redirectUri parameter when the callback address, optional, and defaults to SDK initialization.
- `code_challenge` \<str\> A string having a length greater than or equal to 43, sent as code_challenge to Authing.
- `code_challenge_method` \<str\> A summary algorithm that can be used for plain, S256, indicating calculating code_challenge, plain means that S256 indicates that code_challenge is calculated using SHA256.

#### Example

- Splicing OIDC Authorized Code Mode Authorization Link

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

- Splicing OIDC implicit mode license link

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

- Stitching OIDC authorization link with refresh_token ability (scope including `offline_access`)

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

- Stitching OIDC authorization code + PKCE license with refresh_token ability

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

- Stitching OIDC authorization code + PKCE license with refresh_token ability

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

#### Sample data

```http
https://oidc1.authing.cn/oidc/auth?nonce=5485323897342262&state=7400704296715694&scope=openid+profile+offline_access&client_id=5f17a529f64fb009b794a2ff&response_mode=query&redirect_uri=https%3A%2F%2Fbaidu.com&response_type=code&prompt=consent
```

### Code Change Token

```python
def get_access_token_by_code(self, code, code_verifier=None):
  pass
```

Use the authorization code Code to get the user's Token information.

#### parameter

- `code` \<str\> Authorization code Code，after the user is successful, Authing will send the authorization code Code to the callback address. For details, please see [Using OIDC Authorization Code Mode](/federation/oidc/authorization-code/)。
- `code_verifier` \<str\> The verified value is not a summary value. This parameter needs to be filled in when the PKCE is licensed.For details, please see [Use OIDC Authorization Code + PKCE Mode](/federation/oidc/pkce/)。

#### Example

Ordinary authorization code mode:

```python
code = 'xxxx'
data = authentication_client.get_access_token_by_code(
  code=code
)
```

PKCE + Authorized code mode:

```python
code = 'xxxx'
code_verifier = 'xxx'
data = authentication_client.get_access_token_by_code(
  code=code,
  code_verifier=code_verifier
)
```

#### Sample data

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRmTE90M0xibjhfYThwUk11ZXNzYW1xai1vM0RCQ3MxLW93SExRLVZNcVEifQ.eyJqdGkiOiJsdzg0NW5zdGcwS3EtMTlodVpQOHYiLCJzdWIiOiI1ZmY3MDFkODQ2YjkyMDNlMmY2YWM2ZjMiLCJpYXQiOjE2MTU4ODM1ODYsImV4cCI6MTYxNTg4NzE4Niwic2NvcGUiOiJlbWFpbCBvcGVuaWQgcHJvZmlsZSBwaG9uZSIsImlzcyI6Imh0dHBzOi8vb2lkYzEuYXV0aGluZy5jbi9vaWRjIiwiYXVkIjoiNWYxN2E1MjlmNjRmYjAwOWI3OTRhMmZmIn0.VvYKBcWcr8iIi1b37ugWQ9hsvog4_7EqDQyFqwhIuvM0NHlHH3Bhw83EQIKSNfbWV4nv3ihfeNGPLMzslbQr-wwjnWZTLMYl1bcn7IdVtD_kTN3Zz10MwF5td-VQ7UndU28wJ0HE1mo6E8QH93kYGckS5FSZXmCBa0M5H59Jec_a1MHI1MZrr_V9cZ9EfeF97V-PcqU8JVAwDZclCJ3mWY_Mb65RnMR9yEVqUZzJStmaXGMuRIzjkm2pklqt0CtQQJfzECXq_4USpwRXDiYLWILYPUCcO6hGxDjhMEd8IcxdG51TQP-w1UM6LyIRn61uSJvDsz8zg5dStDKyocypiA",
  "expires_in": 3600,
  "id_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QzQDEyMy5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInN1YiI6IjVmZjcwMWQ4NDZiOTIwM2UyZjZhYzZmMyIsImJpcnRoZGF0ZSI6bnVsbCwiZmFtaWx5X25hbWUiOm51bGwsImdlbmRlciI6IlUiLCJnaXZlbl9uYW1lIjpudWxsLCJsb2NhbGUiOm51bGwsIm1pZGRsZV9uYW1lIjpudWxsLCJuYW1lIjpudWxsLCJuaWNrbmFtZSI6bnVsbCwicGljdHVyZSI6Imh0dHBzOi8vZmlsZXMuYXV0aGluZy5jby9hdXRoaW5nLWNvbnNvbGUvZGVmYXVsdC11c2VyLWF2YXRhci5wbmciLCJwcmVmZXJyZWRfdXNlcm5hbWUiOm51bGwsInByb2ZpbGUiOm51bGwsInVwZGF0ZWRfYXQiOiIyMDIxLTAzLTE1VDA1OjU0OjU0LjY4NVoiLCJ3ZWJzaXRlIjpudWxsLCJ6b25laW5mbyI6bnVsbCwicGhvbmVfbnVtYmVyIjpudWxsLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOmZhbHNlLCJub25jZSI6IjcwVEU3eW9NVFEiLCJhdF9oYXNoIjoiUFNnOGw5eDRldGxmLXA4UDdjYnVoQSIsImlzcyI6Imh0dHBzOi8vb2lkYzEuYXV0aGluZy5jbi9vaWRjIiwiaXNzMiI6Imh0dHBzOi8vYmFpZHUuY29tIiwiYXVkIjoiNWYxN2E1MjlmNjRmYjAwOWI3OTRhMmZmIiwiZXhwIjoxNjE1ODg3MTg3LCJpYXQiOjE2MTU4ODM1ODh9.OlX-FP7znIEqx0YpnOQ8kxadMe1toHDj1KPVm0dbEVc",
  "scope": "email openid profile phone",
  "token_type": "Bearer"
}
```

Field Explanation:

| Field name   | meaning                                   |
| ------------ | ----------------------------------------- |
| token_type   | Token type, Fixed value Bearer            |
| scope        | Wheelcence, authorized acquisition items  |
| id_token     | Id token，Authing Issued Id token         |
| expires_in   | Access token Expiration                   |
| access_token | Access token，Authing Issued Access token |

### Token for user information

```python
def get_user_info_by_access_token(self, access_token):
  pass
```

Use Access token to get user information.

#### parameter

- `access_token` \<str\> Access token, Use the authorization code Code changed Access token contens. For details, please see [Using OIDC Authorization Code Mode](/federation/oidc/authorization-code/)。

#### Example

```javascript
data = authentication_client.get_user_info_by_access_token('Access token')
```

#### Sample data

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
  "sub": "603f184cec4505e2868431fc",
  "phone_number": null,
  "phone_number_verified": false
}
```

Field Explanation:

| Field name             | translation                                                  |
| :--------------------- | :----------------------------------------------------------- |
| sub                    | Subject's abbreviation, unique identifier, generally user ID |
| name                   | name                                                         |
| given_name             | given name                                                   |
| family_name            | family name                                                  |
| middle_name            | middle name                                                  |
| nickname               | nickname                                                     |
| preferred_username     | breferred username                                           |
| profile                | Basic information                                            |
| picture                | Avatar                                                       |
| website                | Website link                                                 |
| email                  | E-mail                                                       |
| email_verified         | Whether the mailbox is certified                             |
| gender                 | gender                                                       |
| birthdate              | birthdate                                                    |
| zoneinfo               | Time zone                                                    |
| locale                 | area                                                         |
| phone_number           | phone number                                                 |
| phone_number_verified  | Certified mobile phone number                                |
| address                | Address object                                               |
| address.formatted      | Address                                                      |
| address.street_address | street address                                               |
| address.locality       | city                                                         |
| address.region         | region                                                       |
| address.postal_code    | postal code                                                  |
| address.country        | country                                                      |
| updated_at             | Information update time                                      |

### Refresh Access Token

```python
def get_new_access_token_by_refresh_token(self, refresh_token):
  pass
```

Get new Access Token with Refresh Token.

#### parameter

- `refresh_token` \<str\> Refresh token，you can get refresh_token from return value of AuthenticationClient.get_access_token_by_code please see [Refreshing Access token](/guides/federation/oidc.md#刷新-access-token).

#### Example

```python
data = authentication_client.get_new_access_token_by_refresh_token('Refresh Token');
```

#### Sample data

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

### Check Access Token or Refresh token status

```python
def introspect_token(self, token):
  pass
```

Check Access Token or Refresh token status

#### parameter

- `token` \<str\> Access token or Refresh token, you can get access_token, refresh_token, from the return value of AuthenticationClient.**Notice: refresh_token is only returned to the scope contains offline_access**.

#### Example

```python
data = authentication_client.introspect_token('Refresh Token');
```

#### Sample data

Token is returned when returning:

```json
{
  "active": true,
  "sub": "60097f4d5bc08f75da104d18",
  "client_id": "60097391b1358c17c5fb0f4e",
  "exp": 1612445888,
  "iat": 1611236288,
  "iss": "https://core.littleimp.cn/oidc",
  "jti": "TV4J0gAbe4KR4-8CtYcOa",
  "scope": "openid profile email phone offline_access",
  "token_type": "Bearer"
}
```

Token returns when it is not legal:

```json
{
  "active": false
}
```

The test process fails will throw an error.

### Check Id Token or Access Token Legitimacy

```python
def validate_token(self, id_token=None, access_token=None):
  pass
```

By Authing online interface verification Id token or Access Token. A network request will be generated.

#### parameter

- `id_token` \<str\> Access token or Refresh token，you can get id_token from the return value of get_access_token_by_code .
- `access_token` \<str\> Access token，可以从 get_access_token_by_code 方法的返回值中的 access_token 获得。

#### Example

- Check id_token Legitimacy

```python
data = authentication_client.validate_token(
  id_token='xxx'
)
```

- Check access_token Legitimacy

```python
data = authentication_client.validate_token(
  access_token='xxx'
)
```

#### Sample data

id_token verification is legal when returning:

```json
{
  "sub": "5f64afd1ad501364e3b43c1e",
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

Id token returns the illegal time:

```json
{ "code": 400, "message": "id_token format is incorrect" }
```

```json
{ "code": 400, "message": "id_token illegal" }
```

Access token returns when verifying:

```json
{
  "jti": "K5TYewNhvdGBdHiRifMyW",
  "sub": "5f64afd1ad501364e3b43c1e",
  "iat": 1601456894,
  "exp": 1601460494,
  "scope": "openid profile email phone",
  "iss": "https://oidc1.authing.cn/oidc",
  "aud": "5f17a529f64fb009b794a2ff"
}
```

Access token returns the illegal time:

```json
{ "code": 400, "message": "access_token format is incorrect" }
```

```json
{ "code": 400, "message": "access_token illegal" }
```

### Recover Access Token or Refresh token

```python
def revoke_token(self, token):
  pass
```

Recover Access token or Refresh token。Access token or Refresh token holders can notify Authing no longer need token, hoping authing to revoke it.

#### parameter

- `token` \<str\> Access token or Refresh token, you can get access_token、refresh_token from the return value of get_access_token_by_code. **Notice: refresh_token is only returned in scope offline_access.**

#### Example

```python
success = authentication_client.revoke_token(token='xxx')
```

#### Sample data

Returns when the withdrawal is successful true。

Throw an error when the withdrawal fails.

### Splicing URL

```python
def build_logout_url(self, expert=None, redirect_uri=None, id_token=None):
  pass
```

Stitching up URL.

#### parameter

- `expert` \<boolean\> Whether to open an expert mode, default `false`。
- `redirect_uri` \<str\> Backward redirection address.
- `id_token` \<str\> User's idToken。

#### Example

Use the front-end universal logout link to exit login:

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient
  options=AuthenticationClientOptions(
    app_id='AUTHING_APP_ID',
    app_host='https://YOUR_DOMAIN.authing.cn',
    redirect_uri='http://localhost:3000',
    protocol='oidc'
))
# redirect_uri here can fill any
url = authentication_client.build_logout_url(
  redirect_uri='https://authing.cn'
);
```

Use the OIDC protocol standard link to exit login, you need to pass the current user's **Id token**, and logout of the callback address **must be consistent with the console**:

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient
  options=AuthenticationClientOptions(
    app_id='AUTHING_APP_ID',
    app_host='https://YOUR_DOMAIN.authing.cn',
    redirect_uri='http://localhost:3000',
    protocol='oidc'
))
# redirect_uri here can fill any
url = authentication_client.build_logout_url(
  expert=True,
  id_token='待退出用户的 idToken',
  redirect_uri='http://localhost:3000'
);
```

### Client Credentials Mode acquisition Access Token

```python
def get_access_token_by_client_credentials(self, scope, access_key, access_secret):
  pass
```

Use [Programming Access Account](/guides/authorization/m2m-authz.html#m2m-授权)get permission Access Token。

#### parameter

- `scope` \<str\> Permission items, space separated strings, each represents a permission. For details, please see [Machine (M2M) Authorization](/guides/authorization/m2m-authz.html#获取具备权限的-accesstoken)。
- `access_key`, Programming access account AccessKey。
- `access_secret`, Programming access account SecretKey。

#### Example

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
  access_key='Programming Access Account AK',
  access_secret='Programming Access Account SK'
)
```

#### Sample data

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRmTE90M0xibjhfYThwUk11ZXNzYW1xai1vM0RCQ3MxLW93SExRLVZNcVEifQ.eyJqdGkiOiJsdzg0NW5zdGcwS3EtMTlodVpQOHYiLCJzdWIiOiI1ZmY3MDFkODQ2YjkyMDNlMmY2YWM2ZjMiLCJpYXQiOjE2MTU4ODM1ODYsImV4cCI6MTYxNTg4NzE4Niwic2NvcGUiOiJlbWFpbCBvcGVuaWQgcHJvZmlsZSBwaG9uZSIsImlzcyI6Imh0dHBzOi8vb2lkYzEuYXV0aGluZy5jbi9vaWRjIiwiYXVkIjoiNWYxN2E1MjlmNjRmYjAwOWI3OTRhMmZmIn0.VvYKBcWcr8iIi1b37ugWQ9hsvog4_7EqDQyFqwhIuvM0NHlHH3Bhw83EQIKSNfbWV4nv3ihfeNGPLMzslbQr-wwjnWZTLMYl1bcn7IdVtD_kTN3Zz10MwF5td-VQ7UndU28wJ0HE1mo6E8QH93kYGckS5FSZXmCBa0M5H59Jec_a1MHI1MZrr_V9cZ9EfeF97V-PcqU8JVAwDZclCJ3mWY_Mb65RnMR9yEVqUZzJStmaXGMuRIzjkm2pklqt0CtQQJfzECXq_4USpwRXDiYLWILYPUCcO6hGxDjhMEd8IcxdG51TQP-w1UM6LyIRn61uSJvDsz8zg5dStDKyocypiA",
  "expires_in": 3600,
  "scope": "email openid profile phone",
  "token_type": "Bearer"
}
```

### Generate a PKCE check code

```python
def generate_code_challenge(self, length=43):
  pass
```

Generate a PKCE check code (at least 43 in length).

#### parameter

No

#### Example

```python
code_challenge = authentication_client.generate_code_challenge()
```

#### Sample data

```
VrpGRU_3FQ5au1TqCvzeh1nTij7HkcnpP1qWzJMGX_Y
```

### Generate a summary value of the PKCE check code

```python
def generate_code_challenge_digest(self, code_challenge, method=None):
  pass
```

Generate a PKCE check code.

#### parameter

- `code_challenge`, the code_challenge original value of the abstract value is generated, and a random string having a length greater than or equal to 43.
- `method`, can be plain、S256, Indicating the summary algorithm used when calculating code_challenge, plain means that no algorithm returns, S256 represents the use of SHA256 to calculate the code_challenge summary.

#### Example

```python
# Generate a code_challenge
code_challenge = authentication_client.generate_code_challenge()

# Calculate code_challenge SHA256 Summary
code_challenge_digest = authentication_client.generate_code_challenge_digest(
  code_challenge=code_challenge,
  method='S256'
)
```

#### Sample data

```
Bu6RP796BBiAwGwdUpHpKfhmQqahszBcGep8qT31XOy
```

## OAuth 2.0

OAuth is an open network standard for authorization (Authorization), the current version is version 2.0.

Parameters when initializing AuthenticationClient:

- `app_id` \<str\> Apply ID, required.
- `secret` \<str\> Apply the key, required.
- `app_host` \<str\> Apply the full address, such as https://sample-app.authing.cn, without the last slash '/'.
- `redirect_uri` \<str\> Business callback URL, mustal.Please see [Document](/guides/federation/oauth.html#授权码模式).
- `protocol` \<str\> Protocol type, optional value `oidc`、`oauth`、`saml`、`cas`, fill in this `oauth`。
- `token_endpoint_auth_method` \<str\> Get the Token endpoint Verification Mode, optional value `client_secret_post`、`client_secret_basic`、`none`, default is `client_secret_post`。
- `introspection_endpoint_auth_method` \<str\> Check the way to verify the Token Endpoint, optional value `client_secret_post`、`client_secret_basic`、`none`, default is `client_secret_post`。
- `revocation_endpoint_auth_method` \<str\> Withdrawing the Token Endpoint Validation, optional value is `client_secret_post`、`client_secret_basic`、`none`, default is `client_secret_post`。

#### Example

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

### User login link to generate OAuth 2.0 protocol

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

A user login link to the OAuth 2.0 protocol, the user can access the an Authing online login page through this link.

#### parameter

Parameters that need to be filled in when launching a license login. For details, please see [Use OAUTH2.0 Authorized Code Mode](/federation/oauth2/authorization-code/).

- `scope` \<str\> Request permission item, optional, OAuth 2.0 protocol defaults to `User`.
- `state` \<str\> Random strings, optional, default automatically generated.
- `response_type` \<str\> Response type, optional, optional value is `code`,`token` default is `code`, authorization code mode.
- `redirect_uri` \<str\> The callback address, optional, the redirect_uri parameter when the SDK is initialized.

#### Example

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

#### Sample data

```http
https://oidc1.authing.cn/oauth/auth?state=7400704296715694&scope=user&client_id=5f17a529f64fb009b794a2ff&redirect_uri=https%3A%2F%2Fbaidu.com&response_type=code
```

### Code Change Token

```python
def get_access_token_by_code(self, code):
  pass
```

Use the authorization code Code to get the user's Token information.

#### parameter

- `code` \<str\> Authorization code Code, after the user is successful, Authing will send the authorization code Code to the callback address.For details, please see [Use OAuth 2.0 Authorization Code Mode](/federation/oauth2/authorization-code/).

#### Example

Initialization `AuthenticationClient` , you need to set the `protocol` is `oauth`.

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

#### Sample data

```json
{
  "access_token": "fa9d2bdd914ea01aa4e434c12d4f919d749fc75c",
  "token_type": "Bearer",
  "expires_in": 1209599,
  "refresh_token": "b5e0e1afe793c6634495434afc262b88ddee9af3",
  "scope": "user"
}
```

Field Explanation:

| Field name   | meaning                                   |
| ------------ | ----------------------------------------- |
| token_type   | Token Type, fixed value Bearer            |
| scope        | Wheelcence, authorized acquisition items  |
| expires_in   | Access token Expiration                   |
| access_token | Access token，Authing Issued Access token |

### Token Change user information

```python
def get_user_info_by_access_token(self, access_token):
  pass
```

Use Access token to get user information.

#### parameter

- `access_token` \<str\>Access token, use the contents of Access token with the authorization code Code. For details, please see[Use OIDC authorization code mode](/federation/oidc/authorization-code/).
  [Using OIDC Authorization Code Mode]

#### Example

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

#### Sample data

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
  "sub": "603f184cec4505e2868431fc",
  "phone_number": null,
  "phone_number_verified": false
}
```

Field Explanation:

| Field name             | translation                                                  |
| :--------------------- | :----------------------------------------------------------- |
| sub                    | Subject's abbreviation, unique identifier, generally user ID |
| name                   | name                                                         |
| given_name             | given name                                                   |
| family_name            | family name                                                  |
| middle_name            | middle name                                                  |
| nickname               | nickname                                                     |
| preferred_username     | preferred username                                           |
| profile                | Basic information                                            |
| picture                | Avatar                                                       |
| website                | website                                                      |
| email                  | email                                                        |
| email_verified         | Whether the mailbox is certified                             |
| gender                 | gender                                                       |
| birthdate              | birthdate                                                    |
| zoneinfo               | Time zone                                                    |
| locale                 | area                                                         |
| phone_number           | phone number                                                 |
| phone_number_verified  | Certified mobile phone number                                |
| address                | Address object                                               |
| address.formatted      | Address                                                      |
| address.street_address | Street address                                               |
| address.locality       | city                                                         |
| address.region         | region                                                       |
| address.postal_code    | postal code                                                  |
| address.country        | country                                                      |
| updated_at             | Information update time                                      |

### Refresh Access Token

```python
def get_new_access_token_by_refresh_token(self, refresh_token):
  pass
```

Get new Access Token with Refresh token.

#### parameter

- `refresh_token` \<str\> Refresh token, you can get refresh_token from the return value of get_access_token_by_code .

#### Example

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

#### Sample data

```json
{
  "access_token": "fa9d2bdd914ea01aa4e434c12d4f919d749fc75c",
  "token_type": "Bearer",
  "expires_in": 1209599,
  "refresh_token": "b5e0e1afe793c6634495434afc262b88ddee9af3",
  "scope": "user"
}
```

### Check Access token or Refresh Token

```python
def introspect_token(self, token):
  pass
```

Check Access Token or Refresh Token status

#### parameter

- `token` \<str\> Access token or Refresh token, you can get access_token、refresh_token form the return value of get_access_token_by_code

#### Example

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

#### Sample data

Token returns when legal

```json
{
  "active": true,
  "sub": "5f719946524ee1099229496b",
  "client_id": "5f17a529f64fb009b794a2ff",
  "exp": 1619083024,
  "iat": 1617873424,
  "iss": "https://core.authing.cn/oauth",
  "jti": "qbovGK-HZL0O_20wY7uXj",
  "scope": "user",
  "token_type": "Bearer"
}
```

Token returns when not legal:

```json
{
  "active": false
}
```

The test process fails will throw an error.

### withdraw Access Token or Refresh token

```python
def revoke_token(self, token):
  pass
```

withdraw Access token or Refresh token. Access token or Refresh token holder can notify Authing no longer need token, I hope Authing will revoke it.

#### parameter

- `token` \<str\> Access token or Refresh token, you can get access_token、refresh_token from the return value of get_access_token_by_code

#### Example

```python
data = authentication_client.revoke_token('Access token 或 Refresh token');
```

#### Sample data

Returns true when the withdrawn is successful.

Throw an error when the withdrawal fails.

### Splicing URL

```python
def build_logout_url(self, redirect_uri=None):
  pass
```

Splicing URL, users can exit login through this link.

#### parameter

- `redirect_uri` \<str\> Backward redirection address.

#### Example

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

Security Assertion Markup Language is an XML-based open source standard data format, which exchange authentication and authorization data between the parties, especially in identity providers. Switch between service providers.

### initialization

- `app_id` \<str\> Apply ID, required.
- `app_host` \<str\> Apply the full address, such as https://sample-app.authing.cn, without the last slash '/'.
- `protocol` \<str\> 协议类型，可选值为 `oidc`、`oauth`、`saml`、`cas`，此处填写 `saml`。

#### Example

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient
  options=AuthenticationClientOptions(
    app_id='AUTHING_APP_ID',
    app_host='https://YOUR_DOMAIN.authing.cn',
    protocol='saml',
))
```

### User login link to generate SAML2 protocol

```python
def build_authorize_url(self):
  pass
```

The user login link for generating a SAML2 protocol.

#### parameter

No

#### Example

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

#### Sample data

```http
https://oidc1.authing.cn/api/v2/saml-idp/5f17a529f64fb009b794a2ff
```

### Splicing URL

```python
def build_logout_url(self, redirect_uri=None):
  pass
```

Splicing URL, users can exit login through this link.

#### parameter

- `redirect_uri` \<str\> Backward redirection address.

#### Example

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

#### Sample data

```http
https://oidc1.authing.cn/login/profile/logout?redirect_uri=https://authing.cn
```

## CAS

CAS is Central Authentication Service , Central certification service, an independent open instruction protocol.

### initialization

- `app_id` \<str\> Apply ID, required.
- `app_host` \<str\>Apply complete address, such as https://sample-app.authing.cn ,not bring the final slash '/'.
- `protocol` \<str\> Protocol type, optional value `oidc`、`oauth`、`saml`、`cas`, fill in this `cas`。

#### Example

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient
  options=AuthenticationClientOptions(
    app_id='AUTHING_APP_ID',
    app_host='https://YOUR_DOMAIN.authing.cn',
    protocol='cas',
))
```

### User login link to generate a CAS protocol

```python
def build_authorize_url(self):
  pass
```

A user login link to generate a CAS protocol.

#### parameter

No

#### Example

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

#### Sample data

```http
https://oidc1.authing.cn/cas-idp/5f17a529f64fb009b794a2ff/login?service=https://example.com
```

### Test CAS 1.0 Ticket legality

```python
def validate_ticket_v1(self, ticket, service):
  pass
```

Test CAS 1.0 Ticket legality

#### parameter

- `ticket` \<str\> After the CAS certification is successful, Authing issued ticket.
- `service` \<str\> CAS callback address.

#### Example

```python
from authing.v2.authentication import AuthenticationClient, AuthenticationClientOptions

authentication_client = AuthenticationClient
  options=AuthenticationClientOptions(
    app_id='AUTHING_APP_ID',
    app_host='https://YOUR_DOMAIN.authing.cn',
    protocol='cas',
))

data = authentication_client.validate_ticket_v1(
  ticket='ticket content',
  service='service address'
)
```

#### Sample data

ticket returns when legal

```json
{
  "valid": true,
  "username": "user1"
}
```

ticket returns when not legal:

```json
{
  "valid": false,
  "message": "ticket illegal"
}
```

### Splicing URL

```python
def build_logout_url(self, redirect_uri=None):
  pass
```

Stitching up URL.

#### parameter

- `redirect_uri` \<str\> Backward redirection address.

#### Example

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

#### Sample data

```http
https://oidc1.authing.cn/cas-idp/5f17a529f64fb009b794a2ff/logout?service=https://example.com
```
