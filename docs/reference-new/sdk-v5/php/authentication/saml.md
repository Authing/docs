---
meta:
  - name: description
    content: PHP SDK
---

<LastUpdated/>

# {{$localeConfig.brandName}} - PHP SDK SAML 模块

安全断言标记语言（英语：Security Assertion Markup Language，简称 SAML，发音 sam-el）是一个基于 XML 的开源标准数据格式，它在当事方之间交换身份验证和授权数据，尤其是在身份提供者和服务提供者之间交换。

## 初始化

初始化 AuthenticationClient 时的参数：

- `appId` \<string\> 应用 ID，必填。
- `appHost` \<string\> 应用完整地址，如 https://sample-app.authing.cn，不带最后的斜线 '/'。
- `protocol` \<string\> 协议类型，可选值为 `oidc`、`oauth`、`saml`、`cas`，此处填写 `saml`。

### 示例

```php
use Authing\Auth\AuthenticationClient;

$authenticationClient = new AuthenticationClient(function ($options) {
    $options->appId = '应用 ID';
    $options->appHost = 'https://{YOUR_DOMAIN}.authing.cn';
    $options->protocol = 'saml';
});

```

## 生成 SAML2 协议的用户登录链接

AuthenticationClient->buildAuthorizeUrl(array $options)

生成 SAML2 协议的用户登录链接

### 参数

无

### 示例

```php
// 拼接 SAML2 登录链接
use Authing\Auth\AuthenticationClient;

$authenticationClient = new AuthenticationClient(function ($options) {
    $options->appId = '应用 ID';
    $options->appHost = 'https://{YOUR_DOMAIN}.authing.cn';
    $options->protocol = 'saml';
});

$url = $authenticationClient->buildAuthorizeUrl();
```

### 示例数据

```http
https://oidc1.authing.cn/api/v2/saml-idp/5f17a529f64fb009b794a2ff
```

## 拼接登出 URL

AuthenticationClient->buildLogoutUrl(array $options)

拼接登出 URL。

### 参数

- `options` \<string\> 登出配置项。
- `options.redirectUri` \<string\> 登出后的重定向地址。

### 示例

```php
// 拼接前端万能登出链接
use Authing\Auth\AuthenticationClient;

$authenticationClient = new AuthenticationClient(function ($options) {
    $options->appId = '应用 ID';
    $options->appHost = 'https://{YOUR_DOMAIN}.authing.cn';
    $options->redirectUri = '业务回调地址';
    $options->protocol = 'saml';
});

$url = $authenticationClient->buildLogoutUrl([ 'redirectUri' => 'https://authing.cn' ]);
```

### 示例数据

```http
https://oidc1.authing.cn/login/profile/logout?redirect_uri=https://authing.cn
```
