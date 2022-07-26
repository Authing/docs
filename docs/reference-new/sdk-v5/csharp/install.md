# 安装

<LastUpdated/>

## Nuget

```powershell
Install-Package Authing.CSharp.SDK
```

Github 仓库： <https://github.com/Authing/authing-csharp-sdk>

## 初始化

初始化 `ManagementClient` 需要使用 `accessKeyId` 和 `accessKeySecret` 参数:

```c#
using Authing.CSharp.SDK.Models;
using Authing.CSharp.SDK.Services;

ManagementClientOptions options = new ManagementClientOptions()
{
	AccessKeyId = "YOUR_ACCESS_KEY_ID",
	AccessKeySecret = "YOUR_ACCESS_KEY_SECRET"
};

ManagementClient managementClient = new ManagementClient(options);
```

`ManagementClient` 会自动从 Authing 服务器获取 Management API Token，并通过返回的 Token 过期时间自动对 Token 进行缓存。

完整的参数和释义如下：

- `accessKeyId`: Authing 用户池 ID;
- `accessKeySecret`: Authing 用户池密钥;
- `timeout`: 超时时间，单位为 ms，默认为 10000 ms;
- `host`: Authing 服务器地址，默认为 `https://api.authing.cn`。如果你使用的是 Authing 公有云版本，请忽略此参数。如果你使用的是私有化部署的版本，此参数必填，格式如下: https://authing-api.my-authing-service.com（最后不带斜杠 /）。
- `lang`: 接口 Message 返回语言格式（可选），可选值为 zh-CN 和 en-US，默认为 zh-CN。

## 快速开始

初始化完成 `ManagementClient` 之后，你可以获取 `ManagementClient` 的实例，然后调用此实例上的方法。例如：

- 获取用户列表

```c#
UserPaginatedRespDto userPaginatedRespDto =await managementClient.ListUsers();
```

- 创建角色

```c#
CreateRoleDto dto = new CreateRoleDto()
{
	Code = "管理员",
	Namespace = "default",
	Description = "管理员角色描述"
};

RoleSingleRespDto roleSingle =await managementClient.CreateRole(dto);
```

完整的接口列表，你可以在 [Authing Open API](https://api.authing.cn/openapi/) 和 [SDK 文档](https://authing-open-api.readme.io/reference/nodejs) 中获取。

## 错误处理

`ManagementClient` 中的每个方法，遵循统一的返回结构：

- `statusCode`: 请求是否成功状态码，当 `statusCode` 为 200 时，表示操作成功，非 200 全部为失败。
- `apiCode`: 细分错误码，当 `apiCode` 非 200 时，可通过此错误码得到具体的错误类型。
- `message`: 具体的错误信息。
- `data`: 具体返回的接口数据。

一般情况下，如果你只需要判断操作是否成功，只需要对比一下 `code` 是否为 200。如果非 200，可以在代码中通抛出异常或者任何你项目中使用的异常处理方式。

```c#
UserSingleRespDto userSingleRespDto =await managementClient.GetUser("61c188ccfff26fef0ca6880d");

if (userSingleRespDto.StatusCode !== 200)
{
	throw new Exception(userSingleRespDto.Message); // 抛出异常，由全局异常捕捉中间件进行异常捕捉
}
  // 继续你的业务逻辑 ...
```

## 私有化部署

如果你使用的是私有化部署的 Authing IDaaS 服务，需要指定此 Authing 私有化实例的 `host`，如：

```c#
using Authing.CSharp.SDK.Models;
using Authing.CSharp.SDK.Services;

ManagementClientOptions options = new ManagementClientOptions()
{
	AccessKeyId = "YOUR_ACCESS_KEY_ID",
	AccessKeySecret = "YOUR_ACCESS_KEY_SECRET",
   	Host="https://authing-api.my-authing-service.com"
};

ManagementClient managementClient = new ManagementClient(options);

```

如果你不清楚如何获取，可以联系 Authing IDaaS 服务管理员。
