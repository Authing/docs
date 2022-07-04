# 认证模块

此模块是基于 OIDC 标准协议进行认证的，支持获取认证地址、认证、获取令牌、检查令牌、登出等方法。本模块只支持在服务端调用。

```python
from authing import AuthenticationClient

authentication = AuthenticationClient(options) #初始化

authentication.buildAuthUrl() # 生成用户登录链接
authentication.getLoginStateByAuthCode() # 用授权码获取用户登录态
authentication.getUserInfo() # 通过 Access Token 获取用户身份信息
authentication.refreshLoginState() # 通过 Refresh Token 刷新用户的登录态，延长过期时间
authentication.buildLogoutUrl() # 生成登出 URL
```

## 初始化

```python
from authing import AuthenticationClient

authentication = AuthenticationClient(options)
```

### 参数

- `appId` \<String\> Authing 应用 ID ;
- `appSecret` \<String\> Authing 应用 Secret;
- `host` \<String\> 应用对应的用户池域名，例如 pool.authing.cn;
- `redirectUri` \<String\> 认证完成后的重定向目标 URL, 认证时会进行校验，需要和控制台的设置保持一致。
- `logoutRedirectUri` \<String\> 登出完成后的重定向目标 URL。
- `scope` \<String\> 令牌具备的资源权限（应用侧向 Authing 请求的权限），以空格分隔，默认为 'openid profile'，成功获取的权限会出现在 Access Token 的 scope 字段中。
- `serverJWKS` \<String\> 服务端的 JWKS 公钥，用于验证 Token 签名，默认会通过网络请求从服务端的 JWKS 端点自动获取。
- `cookieKey` \<String\> 存储认证上下文的 Cookie 名称。

### 示例

```python
authentication = AuthenticationClient(
    appId="62ba7bxxxxxd3b597d3",
    appSecret="69fed9edxxxxxfd522ce43dc6",
    host="xxxxx.authing.cn",
    redirectUri="https://xxxxx.com"
)
```

## 生成用户登录链接

```python
authentication.buildAuthUrl(options)
```

> 调用方法，生成用户登录链接返回给客户端，在合适的时机触发登录认证流程

### 参数

- `scope` \<String\> 令牌具备的资源权限（应用侧向 Authing 请求的权限），覆盖初始化参数中的对应设置。
- `state` \<String\> 随机字符串，选填，默认自动生成。
- `nonce` \<String\> 随机字符串，选填，默认自动生成。
- `redirectUri` \<String\> 回调地址，覆盖初始化参数中的对应设置。
- `forced` \<Boolean\> 即便用户已经登录也强制显示登录页。

### 示例

```python
data = authentication.buildAuthUrl(scope="openid profile offline_access")
```

### 示例数据

```python
{'url': 'https://xxxxx.authing.cn/oidc/auth?redirect_uri=https%3A%2F%2Fxxxxx.com&response_mode=query&response_type=code&client_id=62ba7b1dxxxxx597d3&scope=openid+profile+offline_access&state=7XKduDqxxxxxgjck3&nonce=NqlxxxxxZfJxVTU&prompt=consent', 'state': '7XKduDqxxxxxgjck3', 'nonce': 'NqlxxxxxZfJxVTU'}
```

## 用授权码获取用户登录态

```python
authentication.getLoginStateByAuthCode(code, redirectUri)
```

> 使用授权码 Code 获取用户的登录态信息。

### 参数

- `code` \<String\> 授权码 Code，用户在认证成功后，Authing 会将授权码 Code 发送到回调地址，每个 Code 只能使用一次。
- `redirectUri` \<String\> 发起认证时传入的回调地址。

### 示例

```python
data = authentication.getLoginStateByAuthCode("H5Sm-cxxxHVTbqqcOO", "https://xxx.com")
```

### 示例数据

```python
{'accessToken': 'xxxxx', 'idToken': 'xxxxx', 'refreshToken': 'xxxxx', 'expireAt': 1209600, 'parsedIDToken': {'sub': '62946eexxxxx4ffab6', 'birthdate': None, 'family_name': None, 'gender': 'M', 'given_name': None, 'locale': None, 'middle_name': None, 'name': 'xxxxx', 'nickname': 'xxxxx', 'picture': 'https://i2.hdslb.com/bfs/face/xxxxxa411f5e5c7d3e9d366a.jpg@100Q.webp', 'preferred_username': None, 'profile': None, 'updated_at': '2022-06-30T06:24:28.934Z', 'website': None, 'zoneinfo': None, 'nonce': 'NqlL4bxxxxxfJxVTU', 'at_hash': 'AsSMPrxxxxxb1OXcg', 'aud': '62ba7b1dxxxxx3b597d3', 'exp': 1657780627, 'iat': 1656571027, 'iss': 'https://xxxxx.authing.cn/oidc'}, 'parsedAccessToken': {'jti': 'mYDDY27xxxxx9nSy0', 'sub': '62946ee413xxxxx44ffab6', 'iat': 1656571027, 'exp': 1657780627, 'scope': 'openid offline_access profile', 'iss': 'https://xxxxx.authing.cn/oidc',
'aud': '62ba7b1d1xxxxx3b597d3'}}
```

## 通过 Access Token 获取用户身份信息

```python
authentication.getUserInfo(accessToken)
```

> 使用 Access token 获取用户信息。

### 参数

- `accessToken` \<String\> Access token，使用授权码 Code 换取的 Access token 的内容。详情请见[使用 OIDC 授权码模式](/federation/oidc/authorization-code/)。

### 示例

```python
data = authentication.getUserInfo("xxxxx")
```

### 示例数据

```python
{'sub': '62946xxxxxbcc44ffab6', 'birthdate': None, 'family_name': None, 'gender': 'M', 'given_name': None, 'locale': None, 'middle_name': None, 'name': 'xxxxx', 'nickname': 'xxxxx', 'picture': 'https://i2.hdslb.com/bfs/face/1f3fxxxxx05a411f5e5c7d3e9d366a.jpg@100Q.webp', 'preferred_username': None, 'profile': None, 'updated_at': '2022-06-30T06:24:28.934Z', 'website': None, 'zoneinfo': None}
```

字段解释：

| 字段名             | 翻译                                    |
| :----------------- | :-------------------------------------- |
| sub                | subject 的缩写，唯一标识，一般为用户 ID |
| name               | 姓名                                    |
| given_name         | 名字                                    |
| family_name        | 姓氏                                    |
| middle_name        | 中间名                                  |
| nickname           | 昵称                                    |
| preferred_username | 希望被称呼的名字                        |
| profile            | 基础资料                                |
| picture            | 头像                                    |
| website            | 网站链接                                |
| gender             | 性别                                    |
| birthdate          | 生日                                    |
| zoneinfo           | 时区                                    |
| locale             | 区域                                    |
| updated_at         | 信息更新时间                            |

## 通过 Refresh Token 刷新用户的登录态，延长过期时间

```python
authentication.refreshLoginState(refreshToken)
```

> 使用 Refresh token 刷新登录态，并延长 accessToken 有效时间。

### 参数

- `refreshToken` \<String\> Refresh token，为了获取 Refresh Token，需要在 scope 参数中加入 offline_access, 然后可以从 `authentication.getLoginStateByAuthCode` 方法的返回值中获得 refresh_token 。

### 示例

```python
data = authentication.refreshLoginState("w7_gPfxxxxxovbv00")
```

### 示例数据

```python
{'accessToken': 'xxxxx', 'idToken': 'xxxxx', 'refreshToken': 'xxxxx', 'expireAt': 1209600, 'parsedIDToken': {'sub': '62946eexxxxx4ffab6', 'birthdate': None, 'family_name': None, 'gender': 'M', 'given_name': None, 'locale': None, 'middle_name': None, 'name': 'xxxxx', 'nickname': 'xxxxx', 'picture': 'https://i2.hdslb.com/bfs/face/xxxxxa411f5e5c7d3e9d366a.jpg@100Q.webp', 'preferred_username': None, 'profile': None, 'updated_at': '2022-06-30T06:24:28.934Z', 'website': None, 'zoneinfo': None, 'nonce': 'NqlL4bxxxxxfJxVTU', 'at_hash': 'AsSMPrxxxxxb1OXcg', 'aud': '62ba7b1dxxxxx3b597d3', 'exp': 1657780627, 'iat': 1656571027, 'iss': 'https://xxxxx.authing.cn/oidc'}, 'parsedAccessToken': {'jti': 'mYDDY27xxxxx9nSy0', 'sub': '62946ee413xxxxx44ffab6', 'iat': 1656571027, 'exp': 1657780627, 'scope': 'openid offline_access profile', 'iss': 'https://xxxxx.authing.cn/oidc',
'aud': '62ba7b1d1xxxxx3b597d3'}}
```

## 生成登出 URL

```python
authentication.buildLogoutUrl(options)
```

> 生成登出 URL。

### 参数

- `idToken` \<String\> 用户登录时获取的 ID Token，用于无效化用户 Token，建议传入。
- `redirectUri` \<String\> 登出完成后的重定向目标 URL，覆盖初始化参数中的对应设置。
- `state` \<String\> 传递到目标 URL 的中间状态标识符。

### 示例

```python
data = authentication.buildLogoutUrl()
```

### 示例数据

```python
"https://xxxxx.authing.cn/oidc/session/end?"
```
