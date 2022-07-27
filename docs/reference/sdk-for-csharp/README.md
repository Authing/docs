---
meta:
  - name: description
    content: C# SDK
---

# {{$localeConfig.brandName}} - C#

<LastUpdated/>

{{$localeConfig.brandName}} C# SDK 由两部分组成：`ManagementClient` 和 `AuthenticationClient`。

`AuthenticationClient` 以终端用户（End User）的身份进行请求，提供了登录、注册、登出、管理用户资料、获取授权资源等所有管理用户身份的方法；此模块还提供了各种身份协议的 SDK，如 [OpenID Connect](/guides/federation/oidc.md), [OAuth 2.0](/guides/federation/oauth.md), [SAML](/guides/federation/saml.md) 和 [CAS](/guides/federation/cas.md)。此模块适合用于非受信任的浏览器环境和纯后端交互的服务器环境。

`ManagementClient` 以管理员（Administrator）的身份进行请求，用于管理用户池资源和执行管理任务，提供了管理用户、角色、应用、资源等方法；一般来说，你在 [{{$localeConfig.brandName}} 控制台](https://console.authing.cn/console/userpool) 中能做的所有操作，都能用此模块完成。此模块适合在后端或者**可信任**的前端环境下使用。


## GitHub 下载地址

| 条目     | 说明                                        |
| -------- | ------------------------------------------- |
| 支持版本 | 所有版本                                    |
| 仓库地址 | [https://github.com/Authing/authing-csharp-sdk-neo](https://github.com/Authing/authing-csharp-sdk-neo) |

## 安装

安装 [Authing.Library](https://www.nuget.org/packages/Authing.Library)：

```sh
# 包管理器
Install-Package Authing.Library -Version 0.0.22
# .Net Cli
dotnet add package Authing.Library --version 0.0.22
# packagereference 
<PackageReference Include="Authing.Library" Version="0.0.22" />
```

如果您想要获取最新版本，请查阅 [Authing.Library](https://www.nuget.org/packages/Authing.Library)

## 使用管理模块

初始化 `ManagementClient` 需要 `userPoolId`（用户池 ID） 和 `secret`（用户池密钥）:

> 你可以在此[了解如何获取 UserPoolId 和 Secret](/guides/faqs/get-userpool-id-and-secret.md) .

```csharp
using Authing.ApiClient.Domain.Client.Impl.ManagementBaseClient;

var managementClient = new ManagementClient("AUTHING_USERPOOL_ID", "AUTHING_USERPOOL_SECRET");
```

现在 `ManagementClient()` 实例就可以使用了。例如可以获取用户池中的用户列表：

```csharp
var managementClient = new ManagementClient("AUTHING_USERPOOL_ID", "AUTHING_USERPOOL_SECRET");
var data = await managementClient.Users.List();
```

### 管理模块包含以下子模块：

::: page-ref /reference/sdk-for-csharp/management/UsersManagementClient.md
:::

::: page-ref /reference/sdk-for-csharp/management/RolesManagementClient.md
:::

::: page-ref /reference/sdk-for-csharp/management/PoliciesManagementClient.md
:::

::: page-ref /reference/sdk-for-csharp/management/AclManagementClient.md
:::

::: page-ref /reference/sdk-for-csharp/management/GroupsManagementClient.md
:::

::: page-ref /reference/sdk-for-csharp/management/UdfManagementClient.md
:::

::: page-ref /reference/sdk-for-csharp/management/UserpoolManagementClient.md
:::

::: page-ref /reference/sdk-for-csharp/management/WhitelistManagementClient.md
:::

## 使用认证模块

初始化 `ManagementClient` 需要 `AppId` （应用 ID）：

> 你可以在控制台的 **应用** 中查看自己的应用列表。

```csharp
using Authing.ApiClient.Domain.Client.Impl.AuthenticationClient;

var authenticationClient = new AuthenticationClient(opt =>
            {
                opt.AppId = "AUTHING_APP_ID";
            });
```

接下来可以进行注册登录等操作：

```csharp
var username = GetRandomString(10);
var password = GetRandomString(10);
var user = await authenticationClient.LoginByUsername(
    username,
    password,
)
```

完成登录之后，`update_profile` 等要求用户登录的方法就可用了：

```csharp
await authenticationClient.UpdateProfile(new UpdateUserInput() {
  Nickname = "Nick",
})
```

你也可以在初始化后设置 `Token` 参数, 不需要每次都调用 `LoginByXXX` 方法:

```csharp
using Authing.ApiClient.Domain.Client.Impl.AuthenticationClient;

var authenticationClient = new AuthenticationClient(
  opt =>
        {
            opt.AppId = "AUTHING_APP_ID";
        }
);
authenticationClient.Token = "ID_TOKEN";
```

再次执行 `UpdateProfile` 方法，发现也成功了:

```csharp
await authenticationClient.UpdateProfile(new UpdateUserInput() {
  Nickname = "Nick",
})
```

## 私有化部署

**私有化部署**场景需要指定你私有化的 Authing 服务的 GraphQL 端点（**不带协议头和 Path**）以及密码加密公钥，如果你不清楚可以联系 Authing IDaaS 服务管理员。

## 获取帮助

Join us on forum: [#authing-chat](https://forum.authing.cn/)
