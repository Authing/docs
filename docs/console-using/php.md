# PHP

本指南将从 Authing PHP SDK 的安装开始逐步引导你如何快速为你已有或新开发的应用添加用户认证与管理能力。

<AppDetailSiderBar />

## 安装

我们推荐使用 `composer` 进行安装，它可以与一些模块打包工具很好地配合使用。

```bash
$ composer require authing-sdk/php
```

## 认证你的用户

### 初始化

```php
require "vendor/autoload.php";

use Authing\Auth\AuthenticationClient;

$authentication = new AuthenticationClient(function ($options) {
    $options->appId = "AUTHING_APP_ID";
    $options->secret = "AUTHING_SECRET";
    $options->appHost = "AUTHING_DOMAIN";
    $options->redirectUri = "AUTHING_LOGOUTREDIRECTURI";
});
```

参数和释义如下：

- `appId`: 应用 ID（必填）。
- `secret`: 应用 Secret（必填）。
- `appHost`: 应用对应的用户池域名，例如 pool.authing.cn，最后不带 `/` （必填）。
- `redirectUri`: 认证完成后的重定向目标 URL（必填）。

### 检测 Token 登录状态

```php
$user = $authentication->checkLoginStatus("YOUR_ACCESS_TOKEN");
```

## 管理你的用户

### 初始化

```php
require "vendor/autoload.php";

use Authing\Mgmt\ManagementClient;

$management = new ManagementClient(function ($options) {
    $options->userPoolId = "AUTHING_USERPOOL_ID";
    $options->secret = "AUTHING_USERPOOL_SECRET";
    $options->appHost = "AUTHING_DOMAIN";
});

$management->requestToken();
```

参数和释义如下：

- `userPoolId`: 用户池 ID（必填）。
- `secret`: 用户池密钥（必填）。
- `appHost`: Authing 服务器地址。如果你使用的是 Authing 公有云版本，请忽略此参数。如果你使用的是私有化部署的版本，此参数必填，格式如下: `https://authing-api.mydomain.com`，最后不带 `/` 。

### 简单管理用户

`ManagementClient` 以管理员（Administrator）的身份进行请求，用于管理用户池资源和执行管理任务，提供了管理用户、角色、应用、资源等方法；一般来说，你在 [Authing 控制台](https://console.authing.cn/console/userpool) 中能做的所有操作，都能用此模块完成。例如：

- 获取用户列表

```php
$user = $management->users()->paginate();
```

- 获取用户详情

```php
$user = $management->users()->detail("USERID");
```

## 错误处理

你可以使用 `try catch` 进行错误处理：

```php
require "vendor/autoload.php";

use Authing\Auth\AuthenticationClient;
use Authing\Types\UpdateUserInput;

$authentication = new AuthenticationClient(function ($options) {
    $options->appId = "AUTHING_APP_ID";
});
$authentication->setToken("YOUR_ACCESS_TOKEN");

try {
    $user = $authentication->updateProfile((new UpdateUserInput())->withNickname("nickname"));
} catch (Exception $e) {
    print_r($e);
}
```
