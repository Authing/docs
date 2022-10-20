---
meta:
  - name: description
    content: PHP SDK
---

<LastUpdated/>

# {{$localeConfig.brandName}} - PHP SDK CSA 模块

CAS 是 Central Authentication Service 的缩写，中央认证服务，一种独立开放指令协议。

## 初始化

初始化 AuthenticationClient 时的参数：

- `appId` \<string\> 应用 ID，必填。
- `appHost` \<string\> 应用完整地址，如 https://sample-app.authing.cn，不带最后的斜线 '/'。
- `protocol` \<string\> 协议类型，可选值为 `oidc`、`oauth`、`saml`、`cas`，此处填写 `cas`。

### 示例

```php
use Authing\Auth\AuthenticationClient;

$authenticationClient = new AuthenticationClient(function ($options) {
    $options->appId = '应用 ID';
    $options->appHost = 'https://{YOUR_DOMAIN}.authing.cn';
    $options->protocol = 'cas';
});

```

## 生成 CAS 协议的用户登录链接

AuthenticationClient->buildAuthorizeUrl(array $options)

生成 CAS 协议的用户登录链接

### 参数

- `options` \<array\> 发起授权登录时需要填写的参数。
- `options.service` \<string\> CAS 协议中的业务回调地址。

### 示例

```php
// 拼接 CAS 登录链接
use Authing\Auth\AuthenticationClient;

$authenticationClient = new AuthenticationClient(function ($options) {
    $options->appId = '应用 ID';
    $options->appHost = 'https://{YOUR_DOMAIN}.authing.cn';
    $options->protocol = 'cas';
});

$url = $authenticationClient->buildAuthorizeUrl([ 'service' => 'service 地址' ]);
```

### 示例数据

```http
https://oidc1.authing.cn/cas-idp/5f17a529f64fb009b794a2ff/login?service=https://example.com
```

## 检验 CAS 1.0 Ticket 合法性

AuthenticationClient->validateTicketV1(string $ticket, string $service)

检验 CAS 1.0 Ticket 合法性。

### 参数

- `ticket` \<string\> CAS 认证成功后，Authing 颁发的 ticket。
- `service` \<string\> CAS 回调地址。

### 示例

```php
use Authing\Auth\AuthenticationClient;

$authenticationClient = new AuthenticationClient(function ($options) {
    $options->appId = '应用 ID';
    $options->appHost = 'https://{YOUR_DOMAIN}.authing.cn';
});

$res = $authenticationClient->validateTicketV1('ticket 内容', 'service 地址');
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

AuthenticationClient->buildLogoutUrl(array $options)

拼接登出 URL。

### 参数

- `options` \<string\> 登出配置项。
- `options.redirectUri` \<string\> 登出后的重定向地址。

### 示例

```php
// 拼接 cas 登出链接
use Authing\Auth\AuthenticationClient;

$authenticationClient = new AuthenticationClient(function ($options) {
    $options->appId = '应用 ID';
    $options->appHost = 'https://{YOUR_DOMAIN}.authing.cn';
    $options->protocol = 'cas';
});

$url = $authenticationClient->buildLogoutUrl([ 'redirectUri' => 'https://authing.cn' ]);
```

### 示例数据

```http
https://oidc1.authing.cn/cas-idp/5f17a529f64fb009b794a2ff/logout?service=https://example.com
```
