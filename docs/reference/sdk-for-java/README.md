---
meta:
  - name: description
    content: Java / Kotlin SDK
---

# {{$localeConfig.brandName}} - Java / Kotlin

<LastUpdated/>

{{$localeConfig.brandName}} Java SDK 是用 Kotlin 语言开发而诞生的。Kotlin 是由 JetBrains 开发的静态类型的开源编程语言，可以在 Java 虚拟机（JVM）上有效地运行。最终的产物是 jar 文件，可与 Java 实现 100% 互操作性，你可以将 SDK 引入你的 Java / Android / Kotlin 的项目中使用。

{{$localeConfig.brandName}} Java SDK 由两部分组成：`ManagementClient` 和 `AuthenticationClient`。

`AuthenticationClient` 以终端用户（End User）的身份进行请求，提供了登录、注册、登出、管理用户资料、获取授权资源等所有管理用户身份的方法；此模块还提供了各种身份协议的 SDK，如 [OpenID Connect](/guides/federation/oidc.md), [OAuth 2.0](/guides/federation/oauth.md), [SAML](/guides/federation/saml.md) 和 [CAS](/guides/federation/cas.md)。此模块适合用于非受信任的浏览器环境和纯后端交互的服务器环境。

`ManagementClient` 以管理员（Administrator）的身份进行请求，用于管理用户池资源和执行管理任务，提供了管理用户、角色、应用、资源等方法；一般来说，你在 [{{$localeConfig.brandName}} 控制台](https://console.authing.cn/console/userpool) 中能做的所有操作，都能用此模块完成。此模块适合在后端或者**可信任**的前端环境下使用。

## GitHub 下载地址

| 条目     | 说明                                        |
| -------- | ------------------------------------------- |
| 支持版本 | JDK 1.7 +                                     |
| 仓库地址 | [https://github.com/Authing/authing-java-sdk](https://github.com/Authing/authing-java-sdk) |

## 安装

### gradle 项目

在 build.gradle 内的 dependencies 中添加：

```
implementation "cn.authing:java-core:<LATEST_VERSION>"
```

> 你可以在 [https://search.maven.org/artifact/cn.authing/java-core](https://search.maven.org/artifact/cn.authing/java-core) 查看最新的版本。

### maven 项目

在 pom.xml 内的 dependencies 中添加：

> 如果你需要在 `spring` 中使用此 SDK，由于 `spring` 依赖的 `OkHttp` 版本过低，所以你需要手动指定一下 `OkHttp` 的版本。

```
<dependency>
    <groupId>cn.authing</groupId>
    <artifactId>java-core</artifactId>
    <version><LATEST_VERSION></version>
</dependency>
<properties>
    <okhttp3.version>4.8.0</okhttp3.version>
</properties>
```

## 使用管理模块

`ManagementClient` 以管理员（Administrator）的身份进行请求，用于管理用户池资源和执行管理任务，提供了管理用户、角色、应用、资源等方法；一般来说，你在 [{{$localeConfig.brandName}} 控制台](https://console.authing.cn/console/userpool) 中能做的所有操作，都能用此模块完成。此模块适合在后端或者**可信任**的前端环境下使用。

### 初始化

`ManagementClient` 初始化需要传入用户池 ID `userPoolId` 和用户池密钥 `secret`：

> 你可以在此[了解如何获取 UserPoolId 和 Secret](/guides/faqs/get-userpool-id-and-secret.md) .

```java
import cn.authing.core.mgmt.ManagementClient;

public class ManagementClientTest {
    public static void main(String[] args){
      ManagementClient managementClient = new ManagementClient("AUTHING_USERPOOL_ID", "AUTHING_USERPOOL_SECRET");

      // 获取管理员权限
      managementClient.requestToken().execute();
    }
}
```

`ManagementClient` 完整属性列表如下：

- `setAppId` {{$localeConfig.brandName}} [应用 ID](/guides/faqs/get-app-id-and-secret.md)；
- `setHost` {{$localeConfig.brandName}} 服务器地址。如果你使用的是公有云版本，请忽略此参数。如果你使用的是私有化部署的版本，此参数必填。格式如下: `https://authing-api.mydomain.com`，最后不带 `/`。
- `setPublicKey` 密码非对称加密公钥，如果你使用的是 {{$localeConfig.brandName}} 公有云服务，可以忽略；如果你使用的是私有化部署的 {{$localeConfig.brandName}}，请联系 {{$localeConfig.brandName}} IDaaS 服务管理员。
- `setClientTimeOut` 设置请求超时时间，默认为 10 秒（10000 毫秒）。
  - `connectTimeOut` \<Long\> 连接超时时间。
  - `readTimeOut` \<Long\> 读取超时时间。

```java
import cn.authing.core.mgmt.ManagementClient;

public class ManagementClientTest {
    public static void main(String[] args){
        ManagementClient managementClient = new ManagementClient("AUTHING_USERPOOL_ID", "AUTHING_USERPOOL_SECRET");
        // 获取管理员权限
        managementClient.requestToken().execute();

        PaginatedUsers users = managementClient.users().list().execute();
    }
}
```

## 使用认证模块

`AuthenticationClient` 初始化需要传入 `appId` （应用 ID）和 `appHost`（应用域名，格式为 `https://YOUR_DOMAIN.authing.cn`）：

> 你可以在此[了解如何获取 UserPoolId](/guides/faqs/get-userpool-id-and-secret.md), 在控制台的**应用**中查看自己的应用列表。

```java
import cn.authing.core.auth.AuthenticationClient;

public class AuthenticationClientTest {
    public static void main(String[] args){
        // 使用 AppId 和 AppHost 进行初始化
        AuthenticationClient authentication = new AuthenticationClient("APP_ID", "APP_HOST");
        
        authenticationClient.setSecret("AUTHING_APP_SECRET");
    }
}
```

完整参数列表如下：

- `setUserPoolId` 用户池 ID。
- `setSecret` 用户池密钥。
- `setPublicKey` 密码非对称加密公钥，如果你使用的是 {{$localeConfig.brandName}} 公有云服务，可以忽略；如果你使用的是私有化部署的 {{$localeConfig.brandName}}，请联系 {{$localeConfig.brandName}} IDaaS 服务管理员。
- `setClientTimeOut` 设置请求超时时间。默认为 10 秒（10000 毫秒）
  - `connectTimeOut` \<Long\> 连接超时时间。
  - `readTimeOut` \<Long\> 读取超时时间。

接下来可以进行注册登录等操作：

```java
import cn.authing.core.auth.AuthenticationClient;

public class AuthenticationClientTest {
    public static void main(String[] args){
        // 使用 AppId 和 AppHost 进行初始化
        AuthenticationClient authentication = new AuthenticationClient(APP_ID, APP_HOST);
        
        authenticationClient.setSecret("AUTHING_APP_SECRET");

        String email = "test@example.com";
        String password = "123456";
        User user = authenticationClient.registerByEmail(new RegisterByEmailInput(email, password)).execute();
    }
}
```

完成登录之后，`updateProfile` 等要求用户登录的方法就可用了：

```java
import cn.authing.core.auth.AuthenticationClient;

public class AuthenticationClientTest {
    public static void main(String[] args){
        // 使用 AppId 和 AppHost 进行初始化
        AuthenticationClient authentication = new AuthenticationClient(APP_ID, APP_HOST);
        
        authenticationClient.setSecret("AUTHING_APP_SECRET");

        String email = "test@example.com";
        String password = "123456";
        authenticationClient.loginByEmail(new LoginByEmailInput(email, password)).execute();

        User user = authenticationClient.updateProfile(new UpdateUserInput().withNickname("nickname")).execute();
    }
}
```

你也可以通过用户的 `token` 初始化 SDK，不需要每次都调用 `LoginByXXX` 方法：

```java
import cn.authing.core.auth.AuthenticationClient;

public class AuthenticationClientTest {
    public static void main(String[] args){
        // 使用 AppId 和 AppHost 进行初始化
        AuthenticationClient authentication = new AuthenticationClient(APP_ID, APP_HOST);
        
        authenticationClient.setSecret("AUTHING_APP_SECRET");
        authenticationClient.setToken("ID_TOKEN");
    }
}
```

再次执行 `updateProfile` 方法，发现也成功了：

```java
import cn.authing.core.auth.AuthenticationClient;

public class AuthenticationClientTest {
    public static void main(String[] args){
        // 使用 AppId 和 AppHost 进行初始化
        AuthenticationClient authentication = new AuthenticationClient(APP_ID, APP_HOST);
        
        authenticationClient.setSecret("AUTHING_APP_SECRET");
        authenticationClient.setToken("ID_TOKEN");
        User user = authenticationClient.updateProfile(new UpdateUserInput().withNickname("nickname")).execute();
    }
}
```

## 错误处理

```java
import cn.authing.core.auth.AuthenticationClient;
import cn.authing.core.graphql.GraphQLException;
import java.io.IOException;


public class AuthenticationClientTest {
    public static void main(String[] args){
        // 使用 AppId 和 AppHost 进行初始化
        AuthenticationClient authentication = new AuthenticationClient(APP_ID, APP_HOST);
        
        authenticationClient.setSecret("AUTHING_APP_SECRET");
        authenticationClient.setToken("ID_TOKEN");

        try {
            User user = authenticationClient.updateProfile(new UpdateUserInput().withNickname("nickname")).execute();
        } catch (GraphQLException | IOException e) {
            e.printStackTrace();
        }
    }
}
```

## 私有化部署

**私有化部署**场景需要指定你私有化的 Authing 服务的 GraphQL 端点（**不带协议头和 Path**）以及密码加密公钥，如果你不清楚可以联系 Authing IDaaS 服务管理员。

如：

```java
ManagementClient managementClient = new ManagementClient("AUTHING_USERPOOL_ID", "AUTHING_USERPOOL_SECRET");
// 配置自定义域名
managementClient.setHost("https://core.you-authing-service.com");
// 配置自定义公钥
managementClient.setPublicKey("public key");
```

### 使用管理模块

初始化 `ManagementClient` 需要 `userPoolId`（用户池 ID） 和 `secret`（用户池密钥）：

```java
import cn.authing.core.mgmt.ManagementClient;

public class ManagementClientTest {
    public static void main(String[] args){
      ManagementClient managementClient = new ManagementClient("AUTHING_USERPOOL_ID", "AUTHING_USERPOOL_SECRET");
      // 获取管理员权限
      managementClient.requestToken().execute();
    }
}
```

### 使用认证模块

初始化 `AuthenticationClient` 需要 `userPoolId`（用户池 ID）：

```java
import cn.authing.core.auth.AuthenticationClient;

public class AuthenticationClientTest {
    public static void main(String[] args){
        // 使用 AppId 和 appHost 进行初始化
        AuthenticationClient authentication = new AuthenticationClient(USER_POOL_ID);
        // 配置应用 ID
        authenticationClient.setAppId(APP_ID);
        // 配置应用秘钥
        authenticationClient.setSecret(APP_SECRET);
        // 配置自定义公钥
        authenticationClient.setPublicKey("public key");
    }
}
```

管理模块包含以下子模块：

::: page-ref /reference/sdk-for-java/management/UsersManagementClient.md
:::

::: page-ref /reference/sdk-for-java/management/RolesManagementClient.md
:::

::: page-ref /reference/sdk-for-java/management/PoliciesManagementClient.md
:::

::: page-ref /reference/sdk-for-java/management/AclManagementClient.md
:::

::: page-ref /reference/sdk-for-java/management/UdfManagementClient.md
:::

::: page-ref /reference/sdk-for-java/management/GroupsManagementClient.md
:::

::: page-ref /reference/sdk-for-java/management/OrgManagementClient.md
:::

::: page-ref /reference/sdk-for-java/management/UserpoolManagementClient.md
:::

::: page-ref /reference/sdk-for-java/management/WhitelistManagementClient.md
:::

::: page-ref /reference/sdk-for-java/management/ApplicationManagementClient.md
:::

## 获取帮助

请访问 [Authing 论坛](https://forum.authing.cn/)。
