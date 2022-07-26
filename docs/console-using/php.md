# PHP

Authing PHP SDK 由两部分组成：`ManagementClient` 和 `AuthenticationClient`。

`ManagementClient` 以管理员（Administrator）的身份进行请求，用于管理用户池资源和执行管理任务，提供了管理用户、角色、应用、资源等方法；一般来说，你在 [Authing 控制台](https://console.authing.cn/console/userpool) 中能做的所有操作，都能用此模块完成。此模块适合在后端或者可信任的前端环境下使用。

`AuthenticationClient` 以终端用户（End User）的身份进行请求，提供了登录、注册、登出、管理用户资料、获取授权资源等所有管理用户身份的方法；此模块还提供了各种身份协议的 SDK，如 OpenID Connect, OAuth 2.0, SAML 和 CAS。此模块适合用于非受信任的浏览器环境和纯后端交互的服务器环境。

你应该将初始化过后的 `ManagementClient` 实例设置为一个全局变量（只初始化一次），而 `AuthenticationClient` 应该每次请求初始化一个。

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

use Authing\AuthenticationClient;

$authentication = new AuthenticationClient(array(
    "appId" => "YOUR_APP_ID",
    "appSecret" => "YOUR_APP_SECRET",
    "host" => "YOUR_APP_HOST",
    "redirectUri" => "YOUR_APP_URL",
));
```

完整的参数和释义如下：

- `appId`: 应用 ID（必填）。
- `appSecret`: 应用 Secret（必填）。
- `host`: 应用对应的用户池域名，例如 pool.authing.cn，最后不带 `/` （必填）。
- `redirectUri`: 认证完成后的重定向目标 URL（必填）。
- `logoutRedirectUri`: 登出完成后的重定向目标 URL（可选）。
- `scope`: 应用侧向 Authing 请求的权限（可选）。
- `serverJWKS`: 服务端的 JWKS 公钥（可选）。
- `cookieKey`: 存储认证上下文的 Cookie 名称（可选）。

### 获取用户身份信息

```php
$user = $authentication->getUserInfo("YOUR_ACCESS_TOKEN");
```

## 管理你的用户

### 初始化

```php
require "vendor/autoload.php";

use Authing\ManagementClient;

$management = new ManagementClient("AUTHING_USERPOOL_ID", "AUTHING_USERPOOL_SECRET");
```

`ManagementClient` 会自动从 Authing 服务器获取  Management API Token，并通过返回的 Token 过期时间自动对 Token 进行缓存。

完整的参数和释义如下：

- `accessKeyId`: 用户池 ID（必填）。
- `accessKeySecret`: 用户池密钥（必填）。
- `host`: Authing 服务器地址。如果你使用的是 Authing 公有云版本，请忽略此参数。如果你使用的是私有化部署的版本，此参数必填，格式如下: `https://authing-api.mydomain.com`，最后不带 `/` 。

### 简单管理用户

`ManagementClient` 以管理员（Administrator）的身份进行请求，用于管理用户池资源和执行管理任务，提供了管理用户、角色、应用、资源等方法；一般来说，你在 [Authing 控制台](https://console.authing.cn/console/userpool) 中能做的所有操作，都能用此模块完成。例如：

- 获取用户列表

```php
$users = $management->listUsers();
```

- 创建角色

```php
$role = $management->createRole(array(
    "code" => "role1",
    "description" => "this is description",
));
```

## 错误处理

你可以使用 `try catch` 进行错误处理：

```php
require "vendor/autoload.php";

use Authing\ManagementClient;

$management = new ManagementClient("AUTHING_USERPOOL_ID", "AUTHING_USERPOOL_SECRET");

try {
    $user = $management->getUser(array(
        "userId" => "62559df6b2xxxx259877b5f4"
    ));
    if ($user["code"] != 200) {
        throw new Exception("Error"); // 抛出异常，由 全局异常捕捉 或 try catch 进行异常捕捉
    }
} catch (\Throwable $th) {
    print_r($e);
}
```
