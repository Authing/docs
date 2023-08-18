---
meta:
  - name: description
    content: Authing - PHP
---

# {{$localeConfig.brandName}} - PHP

<LastUpdated/>

Authing PHP SDK 由两部分组成：`ManagementClient` 和 `AuthenticationClient`。

`ManagementClient` 中进行的所有操作均以管理员的身份进行，包含管理用户、管理角色、管理权限策略、管理用户池配置等模块。

`AuthenticationClient` 中的所有操作以当前终端用户的身份进行，包含登录、注册、修改用户资料、退出登录等方法。

你应该将初始化过后的 `ManagementClient` 实例设置为一个全局变量（只初始化一次），而 `AuthenticationClient` 应该每次请求初始化一个。

## GitHub 下载地址

| 条目     | 说明                                                                                     |
| -------- | ---------------------------------------------------------------------------------------- |
| 支持版本 | PHP 7.1 +                                                                                |
| 仓库地址 | [https://github.com/Authing/authing-php-sdk](https://github.com/Authing/authing-php-sdk) |

## 安装

我们推荐使用 `composer` 进行安装， 它可以与一些模块打包工具很好地配合使用。

> 需要注意你的 `php 相关版本`，[官方版本相关说明](https://www.php.net/supported-versions.php)。
> 官方 sdk 开发采用 `php 8.0`，经过 `Retor` 兼容 `低版本` php 来使用

默认包 `authing-sdk/php` 支持 `php 7.1` 以及以上，如果你想使用自己当前 `php` 版本的一些特性，可以安装适合自己版本的 sdk。以下是 `authing-sdk/php` 相关包，版本都与 `authing-sdk/php` 对齐，列表如下：

- `authing-sdk/php` (默认支持 `7.1` 及 `7.1+`)
- `authing-sdk/php-71` (支持 `7.1` 拥有当前版本特性)
- `authing-sdk/php-72` (支持 `7.2` 拥有当前版本特性)
- `authing-sdk/php-73` (支持 `7.3` 拥有当前版本特性)
- `authing-sdk/php-74` (支持 `7.4` 拥有当前版本特性)
- `authing-sdk/php-80` (支持 `8.0` 拥有当前版本特性)

```shell
# 默认 sdk
$ composer require authing-sdk/php:dev-main

# php-71
$ composer require authing-sdk/php-71

# php-72
$ composer require authing-sdk/php-72

# php-73
$ composer require authing-sdk/php-73

# php-74
$ composer require authing-sdk/php-74

# php-80
$ composer require authing-sdk/php-80
```

`sdk` 的使用上并没有差异，只是每个版本各有自己的特性。详情可以参考 `php 版本` 相关语言特性说明。

## 使用管理模块

初始化 `ManagementClient` 需要 `userPoolId`（用户池 ID） 和 `secret`（用户池密钥）:

> 你可以在此[了解如何获取 UserPoolId 和 Secret](/guides/faqs/get-userpool-id-and-secret.md) .

```php
use Authing\Mgmt\ManagementClient;

$management = new ManagementClient("AUTHING_USERPOOL_ID", "AUTHING_USERPOOL_SECRET");
// 获取管理员权限
$management->requestToken();
```

现在 `managementClient` 实例就可以使用了。例如可以获取用户池中的用户列表：

```php
use Authing\Mgmt\ManagementClient;

$management = new ManagementClient("AUTHING_USERPOOL_ID", "AUTHING_USERPOOL_SECRET");
// 获取管理员权限
$management->requestToken();
$users = $management->users()->paginate();
```

### `管理模块` 包含以下子模块：

::: page-ref /reference/sdk-for-php/management/UsersManagementClient.md
:::

::: page-ref /reference/sdk-for-php/management/RolesManagementClient.md
:::

::: page-ref /reference/sdk-for-php/management/PoliciesManagementClient.md
:::

::: page-ref /reference/sdk-for-php/management/AclManagementClient.md
:::

::: page-ref /reference/sdk-for-php/management/UdfManagementClient.md
:::

::: page-ref /reference/sdk-for-php/management/ApplicationManagementClient.md
:::

## 使用认证模块

`AuthenticationClient` 以终端用户（End User）的身份进行请求，提供了登录、注册、登出、管理用户资料、获取授权资源等所有管理用户身份的方法；此模块还提供了各种身份协议的 SDK，如 [OpenID Connect](/guides/federation/oidc.md), [OAuth 2.0](/guides/federation/oauth.md), [SAML](/guides/federation/saml.md) 和 [CAS](/guides/federation/cas.md)。此模块适合用于纯后端交互的服务器环境。

## 初始化

`AuthenticationClient` 需要 `appId`（应用 ID）：

> 你可以在此[了解如何获取 AppId](/guides/faqs/get-app-id-and-secret.md) .

```php
use Authing\Auth\AuthenticationClient;

$authentication = new AuthenticationClient(function ($opts) {
    $opts->appId = "YOUR_APPID";
});
```

接下来可以进行注册登录等操作：

```php
use Authing\Auth\AuthenticationClient;
use Authing\Types\LoginByEmailInput;

$authentication = new AuthenticationClient(function ($opts) {
    $opts->appId = "YOUR_APPID";
});
$user = $authentication->loginByEmail(new LoginByEmailInput("test@example.com", "123456"));
```

完成登录之后，`update_profile` 等要求用户登录的方法就可用了：

```php
use Authing\Auth\AuthenticationClient;
use Authing\Types\LoginByEmailInput;
use Authing\Types\UpdateUserInput;

$authentication = new AuthenticationClient(function ($opts) {
    $opts->appId = "YOUR_APPID";
});
$authentication->loginByEmail(new LoginByEmailInput("test@example.com", "123456"));

$user = $authentication->updateProfile((new UpdateUserInput())->withNickname("nickname"));
```

你也可以在初始化后设置 `AccessToken` 参数, 不需要每次都调用类似 `loginByEmail` 方法:

```php
use Authing\Auth\AuthenticationClient;

$authentication = new AuthenticationClient(function ($opts) {
    $opts->appId = "YOUR_APPID";
});
$authentication->setToken("ACCESS_TOKEN");
```

再次执行 `UpdateProfile` 方法，发现也成功了:

```php
use Authing\Auth\AuthenticationClient;
use Authing\Types\UpdateUserInput;

$authentication = new AuthenticationClient(function ($opts) {
    $opts->appId = "YOUR_APPID";
});
$authentication->setToken("ACCESS_TOKEN");

$user = $authentication->updateProfile((new UpdateUserInput())->withNickname("nickname"));
```

## 错误处理

统一使用 try catch 处理：

```php
use Authing\Auth\AuthenticationClient;
use Authing\Types\UpdateUserInput;

$authentication = new AuthenticationClient(function ($opts) {
    $opts->appId = "YOUR_APPID";
});
$authentication->setToken("ACCESS_TOKEN");

try {
    $user = $authentication->updateProfile((new UpdateUserInput())->withNickname("nickname"));
} catch (Exception $e) {
    print_r($e);
}
```

## 私有化部署

**私有化部署**场景需要指定你私有化的 Authing 服务的 API 端点（**不带协议头和 Path**）和密码加密公钥，如果你不清楚可以联系 Authing IDaaS 服务管理员。

```php
use Authing\Auth\AuthenticationClient;

$authentication = new AuthenticationClient(function ($opts) {
    $opts->appId = "YOUR_APPID";
});

$authentication->setHost('https://your-app.you-authing-service.com');
$authentication->setPublicKey('YOUR_PUBLIC_KEY');
```

```php
use Authing\Mgmt\ManagementClient;

$management = new ManagementClient("AUTHING_USERPOOL_ID", "AUTHING_USERPOOL_SECRET");

$management->setHost('https://your-app.you-authing-service.com');
$management->setPublicKey('YOUR_PUBLIC_KEY');
```

## 获取帮助

请访问 [Authing 论坛](https://forum.authing.cn/)。
