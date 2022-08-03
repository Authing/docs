# PHP

本指南将从 Authing PHP SDK 的安装开始逐步引导你如何快速为你已有或新开发的应用添加用户认证与管理能力。

<AppDetailSiderBar />

## 安装



```bash
#使用 `composer` 进行安装
composer require authing-sdk/php
```

## 认证你的用户

### 初始化

```php
require "vendor/autoload.php";

use Authing\Auth\AuthenticationClient;

$authentication = new AuthenticationClient(function ($options) {
    $options->appId = "AUTHING_APP_ID";// 应用 ID
    $options->secret = "AUTHING_SECRET";// 应用 Secret
    $options->appHost = "AUTHING_DOMAIN";// 应用对应的用户池域名
    $options->redirectUri = "AUTHING_REDIRECTURI";// 认证完成后的重定向目标 URL
});
```

### 简单认证用户

```php
#生成 OIDC 协议的用户登录链接
$data = $authentication->buildAuthorizeUrl(["scope" => "openid profile offline_access"]);
```

## 管理你的用户

### 初始化

```php
require "vendor/autoload.php";

use Authing\Mgmt\ManagementClient;

$management = new ManagementClient(function ($options) {
    $options->userPoolId = "AUTHING_USERPOOL_ID";// 用户池 ID
    $options->secret = "AUTHING_USERPOOL_SECRET";// 用户池密钥
    $options->appHost = "AUTHING_DOMAIN";// Authing 服务器地址
});

$management->requestToken();
```

### 简单管理用户


```php
#创建用户
use Authing\Types\CreateUserInput;

$data = $management->users()->create(
    (new CreateUserInput())
        ->withEmail("admin@test.com")
        ->withPassword("test")
);
```

## 错误处理


```php
require "vendor/autoload.php";

use Authing\Auth\AuthenticationClient;
use Authing\Types\UpdateUserInput;

$authentication = new AuthenticationClient(function ($options) {
    $options->appId = "AUTHING_APP_ID";
});
$authentication->setToken("YOUR_ACCESS_TOKEN");

try {
    $data = $authentication->updateProfile((new UpdateUserInput())->withNickname("nickname"));
} catch (Exception $e) {
    print_r($e);
}
```
