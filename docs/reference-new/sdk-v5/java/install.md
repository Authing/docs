---
meta:
  - name: description
    content: Authing Java SDK
---

# {{$localeConfig.brandName}} - Java SDK

<LastUpdated/>

{{$localeConfig.brandName}} Java SDK 由两部分组成：用户认证模块（`AuthenticationClient`） 和管理模块（`ManagementClient`）。

用户认证模块（`AuthenticationClient`） 以终端用户（End User）的身份进行请求，提供了登录、注册、登出、管理用户资料、获取授权资源等所有管理用户身份的方法；此模块还提供了各种身份协议的 SDK，如 [OpenID Connect](/guides/federation/oidc.md), [OAuth 2.0](/guides/federation/oauth.md), [SAML](/guides/federation/saml.md) 和 [CAS](/guides/federation/cas.md)。

管理模块（`ManagementClient`） 以管理员（Administrator）的身份进行请求，用于管理用户池资源和执行管理任务，提供了管理用户、角色、应用、资源等方法；一般来说，你在 [{{$localeConfig.brandName}} 控制台](https://console.authing.cn/console/userpool) 中能做的所有操作，都能用此模块完成。

你应该将初始化过后的 `ManagementClient` 实例设置为一个全局变量（只初始化一次），而 `AuthenticationClient` 应该每次请求初始化一个。

### GitHub / Maven 地址

| 条目     | 说明                                        |
| -------- | ------------------------------------------- |
| 支持版本 | Java 8 +                                    |
| GitHub 地址 | [https://github.com/Authing/authing-java-sdk](https://github.com/Authing/authing-java-sdk) |
| Maven 仓库地址 | [https://search.maven.org/artifact/cn.authing/authing-java-sdk](https://search.maven.org/artifact/cn.authing/authing-java-sdk) |

## 安装

### Gradle

```bash
implementation "cn.authing:authing-java-sdk:<{version}>"
```

### Maven

```xml
<dependency>
    <groupId>cn.authing</groupId>
    <artifactId>authing-java-sdk</artifactId>
    <version>{version}</version>
</dependency>
```

> 具体的版本号请前往 [https://search.maven.org/artifact/cn.authing/authing-java-sdk](https://search.maven.org/artifact/cn.authing/authing-java-sdk) 查看。 

## 使用认证模块

`AuthenticationClient` 以终端用户（End User）的身份进行请求，提供了登录、注册、登出、管理用户资料、获取授权资源等所有管理用户身份的方法；此模块还提供了各种身份协议的 SDK，如 [OpenID Connect](/guides/federation/oidc.md), [OAuth 2.0](/guides/federation/oauth.md), [SAML](/guides/federation/saml.md) 和 [CAS](/guides/federation/cas.md)。

### 初始化

#### 获取应用信息

初始化认证模块（`AuthenticationClient`）需要获取应用的相关信息，你可以在 [Authing 控制台](https://console.authing.cn) 的**应用** - **自建应用** - **应用详情** 中获取到相关信息。下面是你会经常使用到的几个配置项：

- 应用 ID（App ID）：应用的唯一标志。
- 应用密钥（App Secret）：用于验证客户端合法性的密钥。

<details>
<summary>取决于你的应用类型和配置的换取 token 身份验证方式，你在初始化 AuthenticationClient 时需要传递应用密钥，以对客户端的身份进行验证。点击展开详情</summary>

<br>

你可以在 [Authing 控制台](https://console.authing.cn) 的**应用** - **自建应用** - **应用详情** - **应用配置** - **其他设置** - **授权配置**
中找到**换取 token 身份验证方式** 配置项：

> 单页 Web 应用和客户端应用隐藏，默认为 \`none\`，不允许修改；后端应用和标准 Web 应用可以修改此配置项。

![](https://files.authing.co/api-explorer/tokenAuthMethod.jpg)

#### 换取 token 身份验证方式为 none 时

初始化 AuthenticationClient 不需要传应用密钥。

#### 换取 token 身份验证方式为 client_secret_post 或 client_secret_basic 时

初始化 AuthenticationClient 需要传应用密钥。

</details>

- 应用域名（App Host）：如 https://example.authing.cn 。
- 登录回调 URL（Redirect Uri）：当用户使用 Authing 的托管登录页进行认证，认证完成之后，会通过浏览器 `302` 重定向回调到此地址。可以配置多个地址，发起登录时可以选择任意一个。
- 退出登录回调 URL（Logout Redirect Uri）：当用户在浏览器端退出登录时，可以通过浏览器 `302` 重定向回调到此地址。可以配置多个地址，发起退出登录时可以选择任意一个。
- 换取 token 身份验证方式（Token Endpoint Auth Method）：调用 OIDC 获取 Token 接口或者 Signin 接口时客户端需要提供的校验方式。
- 检验 token 身份验证方式（Introspection Endpoint Auth Method）：调用 OIDC 校验 Token 合法性时客户端需要提供的校验方式。
- 撤回 token 身份验证方式（Revoke Endpoint Auth Method）：调用 OIDC 校验 Token 合法性时客户端需要提供的校验方式。

#### 初始化

初始化 `AuthenticationClient` 时必须传入 `appId` 和 `appHost` 参数:

```java
import cn.authing.sdk.java.client.AuthenticationClient;
import cn.authing.sdk.java.dto.*;
import cn.authing.sdk.java.model.AuthenticationClientOptions;

// 设置初始化参数
AuthenticationClientOptions clientOptions = new AuthenticationClientOptions();
clientOptions.setAppId("AUTHING_APP_ID"); // Authing 应用 ID
clientOptions.setAppSecret("AUTHING_APP_SECRET"); // Authing 应用密钥
clientOptions.setAppHost("AUTHING_APP_HOST"); // Authing 应用域名，如 https://example.authing.cn
clientOptions.setRedirectUri("AUTHING_APP_REDIRECT_URI"); // Authing 应用配置的回调地址

// 初始化 AuthenticationClient
AuthenticationClient client = new AuthenticationClient(clientOptions);

```

完整的参数和释义如下：

- `appId`: Authing 应用 ID，必填。
- `appSecret`: Authing 应用密钥，必填。
- `appHost`: Authing 应用域名，如 https://example.authing.cn，必填。
- `redirectUri`: 认证完成后的重定向目标 URL，可选。Authing 服务器会对此链接进行校验，需要和控制台的设置保持一致。
- `logoutRedirectUri`: 登出完成后的重定向目标 URL，可选。Authing 服务器会对此链接进行校验，需要和控制台的设置保持一致。
- `scope`: 应用侧向 Authing 请求的权限，以空格分隔，可选。默认为 `'openid profile'`，成功获取的权限项会出现在 `access_token` 的 `scope` 字段中。一些示例：
    - `openid`: OIDC 标准规定的权限，必须包含。
    - `profile`: 获取用户的基本身份信息。
    - `offline_access`: 认证时获取 `refresh_token`，可以通过 `refresh_token` 请求新的 `access_token`。
- `protocol`: 应用协议类型，默认为 `oidc`。可选值为 `oidc`、`oauth`、`cas`、`saml`。
- `tokenEndPointAuthMethod`: 获取 token 端点认证方式，默认为 `client_secret_post`。可选值为 `client_secret_post`, `client_secret_basic` 和 `none`。需要和你在 [Authing 控制台](https://console.authing.cn) 的**应用** - **自建应用** - **应用详情** - **应用配置** - **其他设置** - **授权配置**中的**换取 token 身份验证方式** 配置保持一致。（客户端应用和单页应用默认为 `none` 且不可修改）
- `introspectionEndPointAuthMethod`: 校验 token 状态端点认证方式，默认为 `client_secret_post`。可选值为 `client_secret_post`, `client_secret_basic` 和 `none`。需要和你在 [Authing 控制台](https://console.authing.cn) 的**应用** - **自建应用** - **应用详情** - **应用配置** - **其他设置** - **授权配置**中的**换取 token 身份验证方式** 配置保持一致。（客户端应用和单页应用默认为 `none` 且不可修改）
- `revocationEndPointAuthMethod`: 撤回 token 端点认证方式，默认为 `client_secret_post`。可选值为 `client_secret_post`, `client_secret_basic` 和 `none`。需要和你在 [Authing 控制台](https://console.authing.cn) 的**应用** - **自建应用** - **应用详情** - **应用配置** - **其他设置** - **授权配置**中的**换取 token 身份验证方式** 配置保持一致。（客户端应用和单页应用默认为 `none` 且不可修改）
- `timeout`: 请求超时时间，可选，位为毫秒，默认为 10000（10 秒）。
- `lang`: 接口 Message 返回语言格式（可选），可选值为 zh-CN 和 en-US，默认为 zh-CN。

认证侧相关的使用和方法说明，你可以在 [Authing Java SDK 用户认证模块](./authentication.html) 中查看。

## 使用管理模块

`ManagementClient` 以管理员（Administrator）的身份进行请求，用于管理用户池资源和执行管理任务，提供了管理用户、角色、应用、资源等方法；一般来说，你在 [{{$localeConfig.brandName}} 控制台](https://console.authing.cn/console/userpool) 中能做的所有操作，都能用此模块完成。

### 初始化

#### 获取 AK/SK

Authing Node SDK 使用 AK/SK 本地对请求数据的摘要进行签名的鉴权机制，客户端在调用 API 时，SDK 使用 AK/SK 对请求数据的摘要进行签名计算，并将签名结果传输给服务器端进行签名验证。

在 Authing 中，目前有两种类型的 AK/SK：

- 用户池全局 AK/SK：具备用户池内所有资源的全局操作权限。你可以在 [Authing 控制台](https://console.authing.cn) 的**设置** - **基础设置** - **密钥管理** 获取到**用户池 ID** 和**用户池密钥**，其中**用户池 ID**为 AK（Access Key ID）,**用户池密钥**为 SK（Access Key Secret）。
- 协作管理员 AK/SK：可针对用户池内的资源进行细粒度授权，协作管理员的 AK/SK 只能调用其被授权的 API。

你可以根据自己的需求选择合适的 AK/SK。

#### 初始化

初始化 `ManagementClient` 需要使用 `accessKeyId` 和 `accessKeySecret` 参数:

```java
import cn.authing.sdk.java.client.ManagementClient;
import cn.authing.sdk.java.model.ManagementClientOptions;

// 设置初始化参数
ManagementClientOptions clientOptions = new ManagementClientOptions();
clientOptions.setAccessKeyId(ACCESS_KEY_ID);
clientOptions.setAccessKeySecret(ACCESS_KEY_SECRET);

// 初始化 AuthenticationClient
ManagementClient client = new ManagementClient(clientOptions);
```

完整的参数和释义如下：

- `accessKeyId`: Authing 用户池 ID;
- `accessKeySecret`: Authing 用户池密钥;
- `timeout`: 超时时间，单位为 ms，默认为 10000 ms;
- `host`: Authing 服务器地址，默认为 `https://api.authing.cn`。如果你使用的是 Authing 公有云版本，请忽略此参数。如果你使用的是私有化部署的版本，此参数必填，格式如下: https://authing-api.my-authing-service.com（最后不带斜杠 /）。
- `lang`: 接口 Message 返回语言格式（可选），可选值为 zh-CN 和 en-US，默认为 zh-CN。

### 快速开始

初始化完成 `ManagementClient` 之后，你可以获取 `ManagementClient` 的实例，然后调用此实例上的方法。例如：

- 获取用户列表

```java
import cn.authing.sdk.java.dto.*;
import cn.authing.sdk.java.client.ManagementClient;
import cn.authing.sdk.java.model.ManagementClientOptions;

public static void main(String[] args) {
    ManagementClientOptions clientOptions = new ManagementClientOptions("AUTHING_USERPOOL_ID", "AUTHING_USERPOOL_SECRET");
    ManagementClient managementClient = new ManagementClient(clientOptions);
    ListUsersDto request = new ListUsersDto();
    request.setPage(1);
    request.setLimit(10);
    UserPaginatedRespDto response = managementClient.listUsers(request);
    System.out.println(response);
}
```

- 创建角色

```java
import cn.authing.sdk.java.dto.*;
import cn.authing.sdk.java.client.ManagementClient;
import cn.authing.sdk.java.model.ManagementClientOptions;

public static void main(String[] args) {
    ManagementClientOptions clientOptions = new ManagementClientOptions("AUTHING_USERPOOL_ID", "AUTHING_USERPOOL_SECRET");
    ManagementClient managementClient = new ManagementClient(clientOptions);
    CreateRoleDto request = new CreateRoleDto();
    request.setCode("code");
    request.setNamespace("namespace");
    request.setDescription("description");
    RoleSingleRespDto response = managementClient.createRole(request);
    System.out.println(response);
}
```

完整的接口列表，你可以在 [Authing Open API](https://api.authing.cn/openapi/) 和 [SDK 文档](https://authing-open-api.readme.io/reference/java) 中获取。

## 错误处理

`ManagementClient` 中的每个方法，遵循统一的返回结构：

- `statusCode`: 请求是否成功状态码，当 `statusCode` 为 200 时，表示操作成功，非 200 全部为失败。
- `apiCode`: 细分错误码，当 `apiCode` 非 200 时，可通过此错误码得到具体的错误类型。
- `message`: 具体的错误信息。
- `data`: 具体返回的接口数据。

一般情况下，如果你只需要判断操作是否成功，只需要对比一下 `code` 是否为 200。如果非 200，可以在代码中通抛出异常或者任何你项目中使用的异常处理方式。

```java
import cn.authing.sdk.java.dto.*;
import cn.authing.sdk.java.client.ManagementClient;
import cn.authing.sdk.java.model.ManagementClientOptions;

public static void main(String[] args) {
    ManagementClientOptions clientOptions = new ManagementClientOptions("AUTHING_USERPOOL_ID", "AUTHING_USERPOOL_SECRET");
    ManagementClient managementClient = new ManagementClient(clientOptions);
    CreateRoleDto request = new CreateRoleDto();
    request.setCode("code");
    request.setNamespace("namespace");
    request.setDescription("description");
    RoleSingleRespDto response = managementClient.createRole(request);

    if (response.getCode() != 200) {
    throw new RuntimeException(response.getMessage()); // 抛出异常，由全局异常捕捉中间件进行异常捕捉
    }

    // 继续你的业务逻辑 ...
}
```

## 私有化部署

如果你使用的是私有化部署的 Authing IDaaS 服务，需要指定此 Authing 私有化实例的 `host`，如：

```java
import cn.authing.sdk.java.dto.*;
import cn.authing.sdk.java.model.ManagementClientOptions;

public class ManagementClientTest {

    private static final String ACCESS_KEY_ID = "YOUR_ACCESS_KEY_ID";
    private static final String ACCESS_KEY_SECRET = "YOUR_ACCESS_KEY_SECRET";
    // 你的 Authing 私有化实例 HOST 地址，格式例如 https://core.authing.cn
    private static final String HOST = "YOUR_HOST";
    private ManagementClient managementClient = null;

    public ManagementClientTest() {
        ManagementClientOptions clientOptions = new ManagementClientOptions(ACCESS_KEY_ID, ACCESS_KEY_SECRET);
        clientOptions.setHost(HOST);
        managementClient = new ManagementClient(clientOptions);
    }

}
```

如果你不清楚如何获取，可以联系 Authing IDaaS 服务管理员。
