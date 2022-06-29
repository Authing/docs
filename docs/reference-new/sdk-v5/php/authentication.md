# 认证模块

此模块是基于 OIDC 标准协议进行认证的，支持获取认证地址、认证、获取令牌、检查令牌、登出等方法。本模块只支持在服务端调用。

```php
$authentication->buildAuthUrl(); //生成用户登录链接
$authentication->getLoginStateByAuthCode(); //用授权码获取用户登录态
$authentication->getUserInfo(); //通过 Access Token 获取用户身份信息
$authentication->refreshLoginState(); //通过 Refresh Token 刷新用户的登录态，延长过期时间
$authentication->buildLogoutUrl(); //生成登出 URL
$authentication->loginWithRedirect(); //将用户浏览器重定向到 Authing 的认证发起 URL 进行认证
$authentication->handleRedirectCallback(); //应用回调端点处理认证返回结果
$authentication->logoutWithRedirect(); //将浏览器重定向到 Authing 的登出发起 URL 进行登出
```

## 初始化

```php
require "vendor/autoload.php";

use Authing\AuthenticationClient;

// 使用 appId、appSecret、host、redirectUri 进行初始化
$authentication = new AuthenticationClient(options);
```

### 参数

- `appId` \<String\> Authing 应用 ID ;
- `appSecret` \<String\> Authing 应用 Secret;
- `host` \<String\> 应用对应的用户池域名，例如 pool.authing.cn;
- `redirectUri` \<String\> 认证完成后的重定向目标 URL, 认证时会进行校验，需要和控制台的设置保持一致。
- `logoutRedirectUri` \<String\> 登出完成后的重定向目标 URL。
- `scope` \<String\> 应用侧向 Authing 请求的权限，以空格分隔，默认为 'openid profile'，成功获取的权限会出现在 Access Token 的 scope 字段中。
- `serverJWKS` \<String\> 服务端的 JWKS 公钥，用于验证 Token 签名，默认会通过网络请求从服务端的 JWKS 端点自动获取。
- `cookieKey` \<String\> 存储认证上下文的 Cookie 名称。

### 示例

```php
$authentication = new AuthenticationClient(array(
    "appId" => "62ba7bxxxxx597d3",
    "appSecret" => "69fed9ed06xxxxx522ce43dc6",
    "host" => "xxxxx.authing.cn",
    "redirectUri" => "https://xxxxx.com",
));
```

## 生成用户登录链接

```php
$authentication->buildAuthUrl(options);
```

> 调用方法，生成用户登录链接返回给客户端，在合适的时机触发登录认证流程

### 参数

- `scope` \<String\> 应用侧向 Authing 请求的权限，覆盖初始化参数中的对应设置。
- `state` \<String\> 随机字符串，选填，默认自动生成。
- `nonce` \<String\> 随机字符串，选填，默认自动生成。
- `redirectUri` \<String\> 回调地址，覆盖初始化参数中的对应设置。
- `forced` \<Boolean\> 即便用户已经登录也强制显示登录页。

### 示例

```php
$data = $authentication->buildAuthUrl();
```

### 示例数据

```php
array(3) {
  ["url"]=>
  string(216) "https://xxxxx.authing.cn/oidc/auth?redirect_uri=https%3A%2F%2Fxxxxx.com&response_mode=query&response_type=code&client_id=62bxxxxxb597d3&scope=openid+profile&state=MMYMMlr3xMG3SfS&nonce=rrrxMMrrYfMf3M"
  ["state"]=>
  string(15) "MMYMMlr3xMG3SfS"
  ["nonce"]=>
  string(14) "rrrxMMrrYfMf3M"
}
```

## 用授权码获取用户登录态

```php
$authentication->getLoginStateByAuthCode(code, redirectUri);
```

> 使用授权码 Code 获取用户的登录态信息。

### 参数

- `code` \<String\> 授权码 Code，用户在认证成功后，Authing 会将授权码 Code 发送到回调地址，每个 Code 只能使用一次。
- `redirectUri` \<String\> 发起认证时传入的回调地址。

### 示例

```php
$data = $authentication->getLoginStateByAuthCode("H5Sm-cxxxHVTbqqcOO", "https://xxx.com");
```

### 示例数据

```php
array(6) {
  ["accessToken"]=>
  string(718) "xxx"
  ["idToken"]=>
  string(823) "xxx"
  ["refreshToken"]=>
  NULL
  ["expireAt"]=>
  int(1209600)
  ["parsedIDToken"]=>
  array(21) {
    ["sub"]=>
    string(24) "62946ee4xxxcc44ffab6"
    ["birthdate"]=>
    NULL
    ["family_name"]=>
    NULL
    ["gender"]=>
    string(1) "M"
    ["given_name"]=>
    NULL
    ["locale"]=>
    NULL
    ["middle_name"]=>
    NULL
    ["name"]=>
    string(9) "xxx"
    ["nickname"]=>
    string(6) "xxx"
    ["picture"]=>
    string(84) "https://i2.hdslb.com/bfs/face/1f3f6ae9666xxxf5e5c7d3e9d366a.jpg@100Q.webp"
    ["preferred_username"]=>
    NULL
    ["profile"]=>
    NULL
    ["updated_at"]=>
    string(24) "2022-06-28T11:29:07.054Z"
    ["website"]=>
    NULL
    ["zoneinfo"]=>
    NULL
    ["nonce"]=>
    string(16) "rlGMxxxlf"
    ["at_hash"]=>
    string(22) "rizO2pxxxnZ-euWjQ"
    ["aud"]=>
    string(24) "62ba7b1xxx597d3"
    ["exp"]=>
    int(1657700008)
    ["iat"]=>
    int(1656490408)
    ["iss"]=>
    string(36) "https://xxxxx.authing.cn/oidc"
  }
  ["parsedAccessToken"]=>
  array(7) {
    ["jti"]=>
    string(21) "eswqqxxxpjWC59"
    ["sub"]=>
    string(24) "62946exxxffab6"
    ["iat"]=>
    int(1656490408)
    ["exp"]=>
    int(1657700008)
    ["scope"]=>
    string(14) "openid profile"
    ["iss"]=>
    string(36) "https://xxxxx.authing.cn/oidc"
    ["aud"]=>
    string(24) "62ba7b1xxxb597d3"
  }
}
```

## 通过 Access Token 获取用户身份信息

```php
$authentication->getUserInfo(accessToken);
```

> 使用 Access token 获取用户信息。

### 参数

- `accessToken` \<String\> Access token，使用授权码 Code 换取的 Access token 的内容。详情请见[使用 OIDC 授权码模式](/federation/oidc/authorization-code/)。

### 示例

```php
$data = $authentication->getUserInfo("xxxxx");
```

### 示例数据

```php
array(15) {
  ["sub"]=>
  string(24) "62946exxxxx4ffab6"
  ["birthdate"]=>
  NULL
  ["family_name"]=>
  NULL
  ["gender"]=>
  string(1) "M"
  ["given_name"]=>
  NULL
  ["locale"]=>
  NULL
  ["middle_name"]=>
  NULL
  ["name"]=>
  string(9) "xxxxx"
  ["nickname"]=>
  string(6) "xxxxx"
  ["picture"]=>
  string(84) "https://i2.hdslb.com/bfs/face/1f3f6ae9666efxxxxxe5c7d3e9d366a.jpg@100Q.webp"
  ["preferred_username"]=>
  NULL
  ["profile"]=>
  NULL
  ["updated_at"]=>
  string(24) "2022-06-28T11:29:07.054Z"
  ["website"]=>
  NULL
  ["zoneinfo"]=>
  NULL
}
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

```php
$authentication->refreshLoginState(refreshToken);
```

> 使用 Refresh token 刷新登录态，并延长 accessToken 有效时间。

### 参数

- `refreshToken` \<String\> Refresh token，为了获取 Refresh Token，需要在 scope 参数中加入 offline_access, 然后可以从 `$authentication->getLoginStateByAuthCode` 方法的返回值中获得 refresh_token 。

### 示例

```php
//$data = $authentication->buildAuthUrl("openid profile offline_access");
$data = $authentication->refreshLoginState("xxxxx");
```

### 示例数据

```php
array(6) {
  ["accessToken"]=>
  string(738) "xxxxx"
  ["idToken"]=>
  string(821) "xxxxx"
  ["refreshToken"]=>
  string(43) "xxxxx"
  ["expireAt"]=>
  int(1209600)
  ["parsedIDToken"]=>
  array(21) {
    ["birthdate"]=>
    NULL
    ["family_name"]=>
    NULL
    ["gender"]=>
    string(1) "M"
    ["given_name"]=>
    NULL
    ["locale"]=>
    NULL
    ["middle_name"]=>
    NULL
    ["name"]=>
    string(9) "xxx"
    ["nickname"]=>
    string(6) "xxx"
    ["picture"]=>
    string(84) "https://i2.hdslb.com/bfs/face/1f3f6ae9666xxxxxd3e9d366a.jpg@100Q.webp"
    ["preferred_username"]=>
    NULL
    ["profile"]=>
    NULL
    ["updated_at"]=>
    string(24) "2022-06-28T11:29:07.054Z"
    ["website"]=>
    NULL
    ["zoneinfo"]=>
    NULL
    ["sub"]=>
    string(24) "62946eexxxc44ffab6"
    ["nonce"]=>
    string(15) "rf3xxxlM3xM"
    ["at_hash"]=>
    string(22) "fkA-0lAxxxGVpI_Q"
    ["aud"]=>
    string(24) "62ba7xxx323d3b597d3"
    ["exp"]=>
    int(1657700476)
    ["iat"]=>
    int(1656490876)
    ["iss"]=>
    string(36) "https://xxxxx.authing.cn/oidc"
  }
  ["parsedAccessToken"]=>
  array(7) {
    ["jti"]=>
    string(21) "AfKbhxxxpoNR-l"
    ["sub"]=>
    string(24) "62946ee4xxxffab6"
    ["iat"]=>
    int(1656490876)
    ["exp"]=>
    int(1657700476)
    ["scope"]=>
    string(29) "profile openid offline_access"
    ["iss"]=>
    string(36) "https://xxxxx.authing.cn/oidc"
    ["aud"]=>
    string(24) "62ba7xxx3b597d3"
  }
}
```

## 生成登出 URL
```php
$authentication->buildLogoutUrl(options)
```

> 生成登出 URL。

### 参数

- `idToken` \<String\> 用户登录时获取的 ID Token，用于无效化用户 Token，建议传入。
- `redirectUri` \<String\> 登出完成后的重定向目标 URL，覆盖初始化参数中的对应设置。
- `state` \<String\> 传递到目标 URL 的中间状态标识符。

### 示例

```php
$data = $authentication->buildLogoutUrl();
```

### 示例数据

```php
string(49) "https://xxxxx.authing.cn/oidc/session/end?"
```

## 将用户浏览器重定向到 Authing 的认证发起 URL 进行认证

```php
$authentication->loginWithRedirect(options);
```

> 用户发起认证请求，你可以在服务端直接调用这个方法，通过操作请求的 response 对象，把用户的浏览器重定向到 Authing 的认证发起 URL 进行认证

### 参数

- `scope` \<String\> 应用侧向 Authing 请求的权限，覆盖初始化参数中的对应设置。
- `state` \<String\> 随机字符串，选填，默认自动生成。
- `nonce` \<String\> 随机字符串，选填，默认自动生成。
- `redirectUri` \<String\> 回调地址，覆盖初始化参数中的对应设置。
- `forced` \<Boolean\> 即便用户已经登录也强制显示登录页。

### 示例

```php
$data = $authentication->loginWithRedirect();
```

### 示例数据

```php
array(2) {
  ["cookie"]=>
  string(168) "X-Authing-Node-OIDC-State=eyJxxxxxdFVyaSI6Imh0dHBzOlwvXC9iYWlkdS5jb20ifQ; HttpOnly; SameSite=Lax"
  ["url"]=>
  string(216) "https://xxxxx.authing.cn/oidc/auth?redirect_uri=https%3A%2F%2Fxxxxx.com&response_mode=query&response_type=code&client_id=62xxxxx97d3&scope=openid+profile&state=YxfMl3llG3MYl&nonce=rlGMlGlY3SMMl3lf"
}
```

## 应用回调端点处理认证返回结果

```php
$authentication->handleRedirectCallback(url, cookie)
```

> 用户完成认证后，跳转到回调地址，通过调用本方法，校验 state 值，并消费 code 获取相应的登录信息

### 参数

- `url` \<String\> 完整的回调地址 URL。
- `cookie` \<String\> 上下文 Cookie。

### 示例

```php
$data = $authentication->handleRedirectCallback("https://www.xxxxx.com/?code=EVU5_SSjI57IxxxxxpFFom4FdE5EH9IZX&state=MGMY333GYf3rMS3f", "X-Authing-Node-OIDC-State=eyJzdGF0ZSI6IlNZcnhsZlNsWXJZZllTIiwibm9uY2UiOiJsWXxxxxxRwczpcL1wvYmFpZHUuY29tIn0; HttpOnly; SameSite=Lax");
```

### 示例数据

```php
array(6) {
  ["accessToken"]=>
  string(718) "xxxxx"
  ["idToken"]=>
  string(819) "xxxxx"
  ["refreshToken"]=>
  NULL
  ["expireAt"]=>
  int(1209600)
  ["parsedIDToken"]=>
  array(21) {
    ["sub"]=>
    string(24) "62946exxxxxc44ffab6"
    ["birthdate"]=>
    NULL
    ["family_name"]=>
    NULL
    ["gender"]=>
    string(1) "M"
    ["given_name"]=>
    NULL
    ["locale"]=>
    NULL
    ["middle_name"]=>
    NULL
    ["name"]=>
    string(9) "xxxxx"
    ["nickname"]=>
    string(6) "xxxxx"
    ["picture"]=>
    string(84) "https://i2.hdslb.com/bfs/face/1f3f6ae9666ef214xxxxxd3e9d366a.jpg@100Q.webp"
    ["preferred_username"]=>
    NULL
    ["profile"]=>
    NULL
    ["updated_at"]=>
    string(24) "2022-06-28T11:29:07.054Z"
    ["website"]=>
    NULL
    ["zoneinfo"]=>
    NULL
    ["nonce"]=>
    string(13) "lYxGxxxxxSG"
    ["at_hash"]=>
    string(22) "VkZ_MGxxxxxYkZoDlg"
    ["aud"]=>
    string(24) "62ba7bxxxxx3d3b597d3"
    ["exp"]=>
    int(1657699719)
    ["iat"]=>
    int(1656490119)
    ["iss"]=>
    string(36) "https://xxxxx.authing.cn/oidc"
  }
  ["parsedAccessToken"]=>
  array(7) {
    ["jti"]=>
    string(21) "vlXxJxxxxxafAaCx-"
    ["sub"]=>
    string(24) "62946xxxxxbcc44ffab6"
    ["iat"]=>
    int(1656490119)
    ["exp"]=>
    int(1657699719)
    ["scope"]=>
    string(14) "openid profile"
    ["iss"]=>
    string(36) "https://xxxxx.authing.cn/oidc"
    ["aud"]=>
    string(24) "62ba7xxxxx23d3b597d3"
  }
}
```

## 将浏览器重定向到 Authing 的登出发起 URL 进行登出

```php
$authentication->logoutWithRedirect(options);
```

### 参数

- `idToken` \<String\> 用户登录时获取的 ID Token，用于无效化用户 Token，建议传入。
- `redirectUri` \<String\> 登出完成后的重定向目标 URL，覆盖初始化参数中的对应设置。
- `state` \<String\> 传递到目标 URL 的中间状态标识符。

### 示例

```php
$data = $authentication->logoutWithRedirect();
```
### 示例数据

```php
string(49) "https://xxxxx.authing.cn/oidc/session/end?"
```