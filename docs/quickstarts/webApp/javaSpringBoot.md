---
noToc: true
lastUpdated: true
sidebarType: page
noPageNav: true
downloadDemo:
  title: 本页资源
  description: 下载一个 Java Spring Boot 快速开始的示例程序或在 GitHub 查看。
  downloadUrl: https://github.com/Authing/mvc-demo-java-spring-boot/archive/refs/heads/master.zip
  jumpUrl: https://github.com/Authing/mvc-demo-java-spring-boot
---

# Spring Boot Web App 快速开始

本教程讲述在 Spring Boot 框架下处理用户登录、检查登录状态、获取用户信息、登出的方式。

环境要求：Spring Boot 2.4+

## 配置 Authing

### 创建应用

你需要先在 Authing 创建一个应用。进入[**控制台**](https://console.authing.cn) > **应用**，点击右上角的「添加应用」。

![](~@imagesZhCn/quickstarts/webApp/javaSpringBoot/create-app.png)

**认证地址**填写一个域名，作为这个应用在 Authing 的唯一标识，**回调链接**填写：`http://localhost:8080/callback`

![](~@imagesZhCn/quickstarts/webApp/javaSpringBoot/create-app-2.png)

### 配置应用

在应用列表找到你的应用，单击「配置」按钮进入应用详情。

在下方的「授权」卡片中，**id_token 签名算法**选择 **RS256**。

当用户在 Authing 完成认证后，Authing 会将用户重定向到回调地址。请在「URL 设置」卡片中**配置回调地址白名单**，否则用户会遇到回调地址不匹配的错误信息。本教程需要用到的回调地址是 `http://localhost:8080/callback` ，请在「登录回调 URL」框中粘贴此链接。

![](~@imagesZhCn/quickstarts/webApp/javaSpringBoot/config-app.png)

配置完成后，不要忘记**单击对应的「保存」按钮**保存你的设置。

## 建立 Spring Boot 项目

访问 [Spring Initializr](https://start.spring.io/) ，按照图中配置创建 Spring Boot 项目：

![](~@imagesZhCn/quickstarts/webApp/javaSpringBoot/init.png)

为简洁起见，这里只添加了基础的 Spring MVC 依赖项，其它依赖项可按需添加。

## 集成 Authing SDK

打开项目根目录的 pom.xml 文件，在 dependencies 标签下加入如下依赖项：

```xml
<dependency>
	<groupId>cn.authing</groupId>
	<artifactId>java-core</artifactId>
	<version>4.3.21</version>
</dependency>
```

最新的版本号可在 [Maven 仓库](https://search.maven.org/artifact/cn.authing/java-core) 找到。

在 properties 标签下加入如下配置项：

```xml
<okhttp3.version>4.8.0</okhttp3.version>
```

保存文件，大多数 IDE 会自动从 Maven 仓库拉取依赖项。也可以在项目根目录执行以下命令来手动获取依赖项：

```shell
mvn dependency:resolve
```

## 初始化 AuthenticationClient

Authing Java SDK 在 AuthenticationClient 类中封装了和用户登录相关的方法，这里我们将其作为一个 Bean 存放到 Spring 容器中。

在你的 Main Class（示例中是 JavaBasicDemoApplication）中添加如下方法：

```java
@Bean
@Scope(value = "prototype")
public AuthenticationClient authenticationClient() {
    AuthenticationClient client = new AuthenticationClient("POOL_ID"); // 改成自己的用户池ID

    client.setAppId("APP_ID"); // 改成自己的 App ID
    client.setSecret("APP_SECRET"); // 改成自己的 App Secret
    client.setRedirectUri("http://localhost:8080/callback"); // 填写之前设置的回调地址

    return client;
}
```

AuthenticationClient 类要求每次调用初始化新实例，因此要将其作用域设为 prototype。关于如何获取用户池 ID、App ID 和 App Secret，请参考 [这里](/guides/faqs/get-userpool-id-and-secret.md) 和 [这里](/guides/faqs/get-app-id-and-secret.md) 。

## 编写控制器

### 添加控制器

在项目中添加一个控制器，并注入相关依赖：

```java
package cn.authing.javaexpressdemo.controller;

// import 语句请自行添加

@Controller
public class DemoController {

    public static final String KEY_ACCESS_TOKEN = "access_token";
    public static final String KEY_ID_TOKEN = "id_token";
    public static final String KEY_REFRESH_TOKEN = "refresh_token";

    private final HttpSession session;
    private final ObjectFactory<AuthenticationClient> authClientFactory;

    public DemoController(HttpSession session, ObjectFactory<AuthenticationClient> authClientFactory) {
        this.session = session;
        this.authClientFactory = authClientFactory;
    }

   	// 在这里添加路由方法……

}

```

### 添加认证能力

为了给应用添加认证能力，需要监听三个路由：**登录**、**回调**、**登出**。

#### 发起登录

监听 /login 端点，当用户访问 http://localhost:8080/login 时，将用户重定向到 Authing 完成认证。

```java
@GetMapping("/login")
public String login() {
    return "redirect:" + authClientFactory.getObject().buildAuthorizeUrl(new IOidcParams());
}
```

#### 处理回调

监听 /callback 端点，当用户在 Authing 完成认证后，Authing 会将用户重定向到回调地址。在回调地址可以获取用户信息并存放在 session 中，随后将用户重定向到应用的其他页面。

```java
@GetMapping("/callback")
@SuppressWarnings("unchecked")
public String callback(@RequestParam String code) throws IOException {
    Map<String, String> res =
        (Map<String, String>) authClientFactory.getObject().getAccessTokenByCode(code).execute();

    session.setAttribute(KEY_ACCESS_TOKEN, res.get("access_token"));
    session.setAttribute(KEY_ID_TOKEN, res.get("id_token"));
    session.setAttribute(KEY_REFRESH_TOKEN, res.get("refresh_token"));

    return "redirect:/profile";
}
```

#### 登出

监听 /logout 端点，用户访问 http://localhost:8080/logout 时，清除用户 session，随后将用户重定向到 Authing 完成登出。

```java
@GetMapping("/logout")
public String logout() {
    String idToken = (String) session.getAttribute(KEY_ID_TOKEN);
    if(idToken == null) {
        return "redirect:/profile"; // 用户当前未登录
    }

    session.invalidate();
    return "redirect:" + authClientFactory.getObject().buildLogoutUrl(
        new ILogoutParams(
            null,
            "http://localhost:8080/profile", // 登出完成后的回调地址
            null
        )
    );
}
```

在 ILogoutParams 类中可以指定登出完成后的回调地址。

以上配置完成后，用户可以访问 http://localhost:8080/login 登录；用户可以访问 http://localhost:8080/logout 从你的应用登出，并从 Authing 登出。

### 展示用户信息

为了能够展示用户信息，你的应用需要一个受保护的路由。只有登录的用户可以访问，并看到自己的信息。

```java
@ResponseBody
@GetMapping("/profile")
public String profile() throws IOException {
    String accessToken = (String) session.getAttribute(KEY_ACCESS_TOKEN);
    if(accessToken == null) {
        return "未登录";
    }

    return authClientFactory.getObject().getUserInfoByAccessToken(accessToken).execute().toString();
}
```

## 接下来你可能需要

调用其他资源 API：
::: page-ref /quickstarts/apiServer/nodeJsExpress/
:::

自建应用 SSO 方案：
::: page-ref /guides/app-new/sso/
:::
