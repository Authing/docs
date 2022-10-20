---
meta:
  - name: description
    content: Authing Java SDK
---

# {{$localeConfig.brandName}} - Java SDK

<LastUpdated/>

{{$localeConfig.brandName}} Java SDK 由两部分组成：用户认证模块（AuthenticationClient） 和管理模块（ManagementClient）。

!!!include(reference-new/sdk-v5/common/authentication_client_desc.md)!!!

!!!include(reference-new/sdk-v5/common/management_client_desc.md)!!!

在一个项目中，ManagementClient 应该只应该被初始化一次，而 AuthenticationClient 一个实例对应一个终端用户，应该在每次请求中初始化一次。

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

## 使用用户认证模块

!!!include(reference-new/sdk-v5/common/authentication_client_desc.md)!!!

### 初始化

#### 获取应用信息

!!!include(reference-new/sdk-v5/common/get_app_info.md)!!!

#### 初始化

初始化示例代码如下所示：

```java
import cn.authing.sdk.java.client.AuthenticationClient;
import cn.authing.sdk.java.dto.*;
import cn.authing.sdk.java.model.AuthenticationClientOptions;

// 设置初始化参数
AuthenticationClientOptions clientOptions = new AuthenticationClientOptions();
clientOptions.setAppId("AUTHING_APP_ID"); // Authing 应用 ID
clientOptions.setAppSecret("AUTHING_APP_SECRET"); // Authing 应用密钥
clientOptions.setAppHost("AUTHING_APP_HOST"); // Authing 应用域名，如 https://example.authing.cn
clientOptions.setRedirectUri("AUTHING_APP_REDIRECT_URI"); // Authing 应用配置的登录回调地址

// 初始化 AuthenticationClient
AuthenticationClient authenticationClient = new AuthenticationClient(clientOptions);
```

<details>
<summary>点此展开 AuthenticationClient 的完整参数及释义</summary>

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
- `tokenEndPointAuthMethod`: 获取 token 端点认证方式，默认为 `client_secret_post`。可选值为 `client_secret_post`, `client_secret_basic` 和 `none`。需要和你在 [Authing 控制台](https://console.authing.cn) 的**应用** - **自建应用** - **应用详情** - **应用配置** - **其他设置** - **授权配置**中的**换取 token 身份验证方式** 配置保持一致。
- `introspectionEndPointAuthMethod`: 校验 token 状态端点认证方式，默认为 `client_secret_post`。可选值为 `client_secret_post`, `client_secret_basic` 和 `none`。需要和你在 [Authing 控制台](https://console.authing.cn) 的**应用** - **自建应用** - **应用详情** - **应用配置** - **其他设置** - **授权配置**中的**检验 token 身份验证方式** 配置保持一致。
- `revocationEndPointAuthMethod`: 撤回 token 端点认证方式，默认为 `client_secret_post`。可选值为 `client_secret_post`, `client_secret_basic` 和 `none`。需要和你在 [Authing 控制台](https://console.authing.cn) 的**应用** - **自建应用** - **应用详情** - **应用配置** - **其他设置** - **授权配置**中的**撤回 token 身份验证方式** 配置保持一致。
- `timeout`: 请求超时时间，可选，位为毫秒，默认为 10000（10 秒）。
- `lang`: 接口 Message 返回语言格式（可选），可选值为 zh-CN 和 en-US，默认为 zh-CN。


</details>

### 快速开始

初始化完成用户认证模块（AuthenticationClient）之后，你可以获取 AuthenticationClient 的实例，然后调用此实例上的方法。

#### 使用在线托管登录页登录

Authing 为所有开发者提供了开箱即用的在线托管登录页，Java SDK 提供了自动生成登录链接、处理登录回调等方法。

<details>
<summary>点此展开 Authing 托管登录页的详细介绍</summary>

Authing 托管登录页是最简单，最安全的集成方式。这是因为登录流程由 Authing 维护，并由 Authing 保持安全。对于大多数集成，建议使用 Authing 托管的登录流程。你的业务系统将用户重定向到 Authing，在此用户进行身份验证，然后重定向回在控制台配置的应用回调连接。此设计被认为是安全性最佳实践。在自定义配置方面，托管模式提供了中等程度的登录注册表单自定义配置，可通过控制台配置和 CSS 进行界面自定义。[点此在线体验](https://sample-sso.authing.cn/)。

![](~@imagesZhCn/reference-new/sample-sso-app.jpg)

</details>

使用这种方式，Java SDK 生成了登录地址之后，可以引导用户在浏览器访问此链接。终端用户点击此链接之，会通过浏览器 302 重定向跳转到你在 Authing 托管的在线登录页进行认证，认证完成之后回调到你的应用系统。Authing 托管登录页支持 Authing 现支持所有的认证能力，包含密码认证、社会化登录认证、扫码登录等，这也是我们最推荐的认证方式。

##### 生成一次性登录链接

生成用于登录的一次性地址，并引导用户访问此链接。

```java
import cn.authing.sdk.java.client.AuthenticationClient;
import cn.authing.sdk.java.dto.*;
import cn.authing.sdk.java.model.AuthenticationClientOptions;

public static void main(String[] args) {
    // 设置初始化参数
    AuthenticationClientOptions clientOptions = new AuthenticationClientOptions();
    clientOptions.setAppId("AUTHING_APP_ID"); // Authing 应用 ID
    clientOptions.setAppSecret("AUTHING_APP_SECRET"); // Authing 应用密钥
    clientOptions.setAppHost("AUTHING_APP_HOST"); // Authing 应用域名，如 https://example.authing.cn
    clientOptions.setRedirectUri("AUTHING_APP_REDIRECT_URI"); // Authing 应用配置的登录回调地址

    // 初始化 AuthenticationClient
    AuthenticationClient authenticationClient = new AuthenticationClient(clientOptions);

    // 生成用于登录的一次性地址，之后可以引导用户访问此地址
    String url = authenticationClient.buildAuthorizeUrl();
    System.out.println(url);
}
```

##### 处理登录回调

当用户在 Authing 的托管登录页完成登录之后，将会回调到你配置的登录回调地址（及初始化 AuthenticationClient 时传入的 `redirectUri`），并且会在 URL 的 Query 参数中携带一次性临时凭证 `code`，你可以使用此 `code` 换取 `access_token`。

```java
import cn.authing.sdk.java.client.AuthenticationClient;
import cn.authing.sdk.java.dto.*;
import cn.authing.sdk.java.model.AuthenticationClientOptions;

public static void main(String[] args) {
    // 设置初始化参数
    AuthenticationClientOptions clientOptions = new AuthenticationClientOptions();
    clientOptions.setAppId("AUTHING_APP_ID"); // Authing 应用 ID
    clientOptions.setAppSecret("AUTHING_APP_SECRET"); // Authing 应用密钥
    clientOptions.setAppHost("AUTHING_APP_HOST"); // Authing 应用域名，如 https://example.authing.cn
    clientOptions.setRedirectUri("AUTHING_APP_REDIRECT_URI"); // Authing 应用配置的登录回调地址

    // 初始化 AuthenticationClient
    AuthenticationClient authenticationClient = new AuthenticationClient(clientOptions);

    // 生成用于登录的一次性地址，之前可以引导用户访问此地址
    String code = "REPLACE_ME_WITH_REAL_CODE";
    // 使用 code 换取 access_token
    OIDCTokenResponse resp = authenticationClient.getAccessTokenByCode(code);
    System.out.println(resp);
}
```

#### 邮箱 + 密码登录

除了上述使用托管登录页的认证方式，如果你需要自建登录页面，Authing 也提供接口形式的认证方法，如果认证成功，也可以拿到用户的 `access_token`。拿到 `access_token` 之后，就可以调用修改用户信息等方法了。

```java
import cn.authing.sdk.java.client.AuthenticationClient;
import cn.authing.sdk.java.dto.*;
import cn.authing.sdk.java.model.AuthenticationClientOptions;

public static void main(String[] args) {
    // 设置初始化参数
    AuthenticationClientOptions clientOptions = new AuthenticationClientOptions();
    clientOptions.setAppId("AUTHING_APP_ID"); // Authing 应用 ID
    clientOptions.setAppSecret("AUTHING_APP_SECRET"); // Authing 应用密钥
    clientOptions.setAppHost("AUTHING_APP_HOST"); // Authing 应用域名，如 https://example.authing.cn
    clientOptions.setRedirectUri("AUTHING_APP_REDIRECT_URI"); // Authing 应用配置的登录回调地址

    // 初始化 AuthenticationClient
    AuthenticationClient authenticationClient = new AuthenticationClient(clientOptions);

    // 调用 AuthenticationClient 的方法，如 signInByEmailPassword
    LoginTokenRespDto signInresp = authenticationClient.signInByEmailPassword(
        "test@example.com",
        "passw0rd",
        new SignInOptionsDto()
    );

    // 你可以从 LoginTokenRespDto 中得到用户的 access_token，此 access_token 代表了用户访问接口的凭证
    String accessToken = signInresp.getData().getAccessToken();
    // 之后使用此 accessToken 调用 AuthenticationClient 的 setAccessToken 方法，AuthenticationClient 便可以调用获取用户资料、修改用户资料、获取角色列表等要求登录才能访问的接口了。
    authenticationClient.setAccessToken(accessToken)

    // 调用其他需要登录才能访问的接口，如修改用户资料
    UpdateUserProfileDto updateProfileDto = new UpdateUserProfileDto();
    updateProfileDto.setNickname("张三"); // 修改昵称为张三
    UserSingleRespDto resp = authenticationClient.updateProfile(updateProfileDto);
    System.out.println(resp);
}
```


## 使用管理模块

管理模块（ManagementClient） 以管理员（Administrator）的身份进行请求，用于管理用户池资源和执行管理任务，提供了管理用户、角色、应用、资源等方法；一般来说，你在 [{{$localeConfig.brandName}} 控制台](https://console.authing.cn/console/userpool) 中能做的所有操作，都能用此模块完成。

### 初始化

#### 获取 AK/SK

Authing Node SDK 使用 AK/SK 本地对请求数据的摘要进行签名的鉴权机制，客户端在调用 API 时，SDK 使用 AK/SK 对请求数据的摘要进行签名计算，并将签名结果传输给服务器端进行签名验证。

在 Authing 中，目前有两种类型的 AK/SK：

- 用户池全局 AK/SK：具备用户池内所有资源的全局操作权限。你可以在 [Authing 控制台](https://console.authing.cn) 的**设置** - **基础设置** - **密钥管理** 获取到**用户池 ID** 和**用户池密钥**，其中**用户池 ID**为 AK（Access Key ID）,**用户池密钥**为 SK（Access Key Secret）。
- 协作管理员 AK/SK：可针对用户池内的资源进行细粒度授权，协作管理员的 AK/SK 只能调用其被授权的 API。

你可以根据自己的需求选择合适的 AK/SK。

#### 初始化

初始化示例代码如下所示：


```java
import cn.authing.sdk.java.client.ManagementClient;
import cn.authing.sdk.java.model.ManagementClientOptions;

// 设置初始化参数
ManagementClientOptions clientOptions = new ManagementClientOptions();
clientOptions.setAccessKeyId("AUTHING_ACCESS_KEY_ID");
clientOptions.setAccessKeySecret("AUTHING_ACCESS_KEY_SECRET");

// 初始化 ManagementClient
ManagementClient managementClient = new ManagementClient(clientOptions);
```


<details>
<summary>点此展开 ManagementClient 的完整参数及释义</summary>

- `accessKeyId`: Authing 用户池 ID;
- `accessKeySecret`: Authing 用户池密钥;
- `timeout`: 超时时间，单位为 ms，默认为 10000 ms;
- `host`: Authing 服务器地址，默认为 `https://api.authing.cn`。如果你使用的是 Authing 公有云版本，请忽略此参数。如果你使用的是私有化部署的版本，此参数必填，格式如下: https://authing-api.my-authing-service.com（最后不带斜杠 /）。
- `lang`: 接口 Message 返回语言格式（可选），可选值为 zh-CN 和 en-US，默认为 zh-CN。

</details>


### 快速开始

初始化完成 ManagementClient 之后，你可以获取 ManagementClient 的实例，然后调用此实例上的方法。

#### 获取用户列表

```java
import cn.authing.sdk.java.dto.*;
import cn.authing.sdk.java.client.ManagementClient;
import cn.authing.sdk.java.model.ManagementClientOptions;

public static void main(String[] args) {
    // 设置初始化参数
    ManagementClientOptions clientOptions = new ManagementClientOptions();
    clientOptions.setAccessKeyId("AUTHING_ACCESS_KEY_ID");
    clientOptions.setAccessKeySecret("AUTHING_ACCESS_KEY_SECRET");

    // 初始化 ManagementClient
    ManagementClient managementClient = new ManagementClient(clientOptions);

    // 获取用户列表
    ListUsersRequestDto dto = new ListUsersRequestDto();
    UserPaginatedRespDto resp = managementClient.listUsers(dto);
    System.out.println(resp);
}
```

#### 创建角色

```java
import cn.authing.sdk.java.dto.*;
import cn.authing.sdk.java.client.ManagementClient;
import cn.authing.sdk.java.model.ManagementClientOptions;

public static void main(String[] args) {
    // 设置初始化参数
    ManagementClientOptions clientOptions = new ManagementClientOptions();
    clientOptions.setAccessKeyId("AUTHING_ACCESS_KEY_ID");
    clientOptions.setAccessKeySecret("AUTHING_ACCESS_KEY_SECRET");

    // 初始化 ManagementClient
    ManagementClient managementClient = new ManagementClient(clientOptions);

    // 创建角色
    CreateRoleDto dto = new CreateRoleDto();
    dto.setCode("admin");
    dto.setDescription("管理员");
    RoleSingleRespDto resp = client.createRole(dto);
    System.out.println(resp);
}
```

完整的接口列表，你可以在 [Authing Open API](https://api.authing.cn/openapi/) 和 [SDK 文档](https://authing-open-api.readme.io/reference/java) 中获取。

## 错误处理

Authing Java SDK 方法在请求接口时，不会抛出 Exception（网络错误除外），除非特殊说明，所有的方法返回值都会包含两个状态码：`statusCode` 和 `apiCode`：

- `statusCode`: `statusCode` 为请求状态码，不包含具体的业务错误信息。**当且仅当 `statusCode` 为 `200` 时，表示接口请求成功**，此时不会带有 `apiCode`。`statusCode` 不为 `200` 的情况下，
  表示接口请求失败或者需要进行额外操作（比如登录接口需要进行 MFA 二次验证），你需要对此进行关注，进行必要的错误处理。每个 `statusCode` 对应一个类型的错误，
  具体的错误分类请见下文。在大多数情况下，除非你需要对某些特定的异常做出响应，否则你只需要关注 `statusCode`，不需要关注 `apiCode`。
- `apiCode`: `apiCode` 为业务状态码，每个 `apiCode` 具备特定的错误含义，具体的 `apiCode` 列表见下文。`apiCode` 只会在 `statusCode` 非 200 且错误原因具备业务含义时才会返回。
- `requestId`: 请求 ID，当请求失败时会返回。如果你在使用 Node SDK 的过程中遇到了错误，可以使用此 `requestId` 咨询 Authing 开发人员。

详细的 `statusCode` 列表和 `apiCode` 请见[错误码](../../other/error-code.md)。

```java
import cn.authing.sdk.java.dto.*;
import cn.authing.sdk.java.client.ManagementClient;
import cn.authing.sdk.java.model.ManagementClientOptions;

public static void main(String[] args) {
    // 设置初始化参数
    ManagementClientOptions clientOptions = new ManagementClientOptions();
    clientOptions.setAccessKeyId("AUTHING_ACCESS_KEY_ID");
    clientOptions.setAccessKeySecret("AUTHING_ACCESS_KEY_SECRET");

    // 初始化 ManagementClient
    ManagementClient managementClient = new ManagementClient(clientOptions);

    // 创建角色
    CreateRoleDto dto = new CreateRoleDto();
    dto.setCode("admin");
    dto.setDescription("管理员");
    RoleSingleRespDto resp = client.createRole(dto);
    if (resp.getCode() != 200) {
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

public static void main(String[] args) {
    // 设置初始化参数
    ManagementClientOptions clientOptions = new ManagementClientOptions();
    clientOptions.setAccessKeyId("AUTHING_ACCESS_KEY_ID");
    clientOptions.setAccessKeySecret("AUTHING_ACCESS_KEY_SECRET");
    // 设置私有化 Authing 服务的地址
    clientOptions.setHost("https://api.your-authing-service.com")

    // 初始化 ManagementClient
    ManagementClient managementClient = new ManagementClient(clientOptions);
}
```

如果你不清楚如何获取，可以联系 Authing IDaaS 服务管理员。

## 获取帮助

有任何建议或者问题反馈，欢迎在 [Authing 论坛](https://forum.authing.cn/)中提出。
