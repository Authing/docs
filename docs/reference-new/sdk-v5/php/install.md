# 安装

<LastUpdated/>

我们推荐使用 `composer` 进行安装，它可以与一些模块打包工具很好地配合使用。

```bash
composer require authing-sdk/php
```

Github 仓库： <https://github.com/Authing/authing-php-sdk> （目前在 `v5.0` 分支）

## 初始化

初始化 `ManagementClient` 需要使用 `accessKeyId` 和 `accessKeySecret` 参数，并且应该将初始化过后的 `ManagementClient` 实例设置为一个全局变量（只初始化一次）:

```php
require "vendor/autoload.php";

use Authing\Mgmt\ManagementClient;

$management = new ManagementClient("AUTHING_USERPOOL_ID", "AUTHING_USERPOOL_SECRET");
```

`ManagementClient` 会自动从 Authing 服务器获取 Management API Token，并通过返回的 Token 过期时间自动对 Token 进行缓存。

完整的参数和释义如下：

- `accessKeyId`: Authing 用户池 ID；
- `accessKeySecret`: Authing 用户池密钥；
- `host`: Authing 服务器地址，默认为 `https://api.authing.cn`。如果你使用的是 Authing 公有云版本，请忽略此参数。如果你使用的是私有化部署的版本，此参数必填，格式如下: https://authing-api.my-authing-service.com （最后不带斜杠 / ）。

## 快速开始

初始化完成 `ManagementClient` 之后，你可以获取 `ManagementClient` 的实例，然后调用此实例上的方法。例如：

- 获取用户列表

```php
$users = $management->listUsers();
```

- 获取用户

```php
$user = $management->getUser(array(
    "userId" => "62559df6b2xxxx259877b5f4"
));
```

完整的接口列表，你可以在 [Authing Open API](https://api.authing.cn/openapi/) 和 [SDK 文档](https://authing-open-api.readme.io/reference/php) 中获取。

## 错误处理

`ManagementClient` 中的每个方法，遵循统一的返回结构：

- `statusCode`: 请求是否成功状态码，当 `statusCode` 为 200 时，表示操作成功，非 200 全部为失败。
- `apiCode`: 细分错误码，当 `apiCode` 非 200 时，可通过此错误码得到具体的错误类型。
- `message`: 具体的错误信息。
- `data`: 具体返回的接口数据。

一般情况下，如果你只需要判断操作是否成功，只需要对比一下 `code` 是否为 200。如果非 200，可以在代码中通抛出异常或者任何你项目中使用的异常处理方式。

```php
require "vendor/autoload.php";

use Authing\Mgmt\ManagementClient;

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

## 私有化部署

如果你使用的是私有化部署的 Authing IDaaS 服务，需要指定此 Authing 私有化实例的 `host`，如：

```php
require "vendor/autoload.php";

use Authing\Mgmt\ManagementClient;

$management = new ManagementClient("AUTHING_USERPOOL_ID", "AUTHING_USERPOOL_SECRET", "https://authing-api.my-authing-service.com");
```

如果你不清楚如何获取，可以联系 Authing IDaaS 服务管理员。
