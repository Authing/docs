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

你需要先在 Authing 创建一个应用。进入[**控制台**](https://console.authing.cn) > **应用**，点击右上角的「创建自建应用」。

![](~@imagesZhCn/quickstarts/create-app.png)


**应用名称**可以随意填写。

**认证地址**需填入自定义的域名，但不可与 Authing 数据库中的重复。填写后，会拼接成一段 URL 作为这个应用在 Authing 的唯一标识。

**应用类型**可以随意选择，此处以最常用的「标准 Web 应用」为例。

![](~@imagesZhCn/quickstarts/webApp/create-app-2.png)

### 配置应用

在应用列表找到你的应用，单击进入应用详情。在应用详情页面上方的导航栏中单击「应用配置」，进入配置界面。

向下滑动找到「认证配置」卡片，在**登录回调 URL**栏填入 `http://localhost:8080/callback` 。当用户在 Authing 完成认证后，Authing 会将用户重定向到该回调地址。

![](~@imagesZhCn/quickstarts/webApp/javaSpringBoot/config-app.png)

配置完成后，不要忘记**单击对应的「保存」按钮**保存你的设置。

## 建立 Spring Boot 项目

### 在线创建项目
访问 [Spring Initializr](https://start.spring.io/) ，参考图中配置创建 Spring Boot 项目：

![](~@imagesZhCn/quickstarts/webApp/javaSpringBoot/online-init.png)

### 本地创建项目
本地打开 IDEA，参考图中配置创建 Spring Boot 项目：

![](~@imagesZhCn/quickstarts/webApp/javaSpringBoot/local-init.png)

![](~@imagesZhCn/quickstarts/webApp/javaSpringBoot/local-init-2.png)

为简洁起见，上述两种方法只添加了基础的 Spring Web 依赖项，其它依赖项可按需添加。

Java 语言版本也可以按需选择，示例代码中使用版本 8。

## 集成 Authing SDK

打开项目根目录的 pom.xml 文件，在 dependencies 标签下加入如下依赖项：

```xml
<dependency>
	<groupId>cn.authing</groupId>
	<artifactId>authing-java-sdk</artifactId>
	<version>{{LATEST_VERSION}}</version>
</dependency>
```

其中最新的版本号 LATEST_VERSION 可在 [Maven 仓库](https://search.maven.org/artifact/cn.authing/java-core) 找到。

在 properties 标签下加入如下配置项：
> 由于 spring 依赖的 OkHttp 版本过低，所以你需要手动指定一下 OkHttp 的版本。

```xml
<properties>
    <okhttp3.version>4.8.0</okhttp3.version>
</properties>
```

保存文件，大多数 IDE 会自动从 Maven 仓库拉取依赖项。也可以在项目根目录执行以下命令来手动获取依赖项：

```shell
mvn dependency:resolve
```

## 初始化 AuthenticationClient

Authing Java SDK 在 AuthenticationClient 类中封装了和用户登录相关的方法，这里我们将其作为一个 Bean 存放到 Spring 容器中。

创建一个配置类，或者在你的 Main Class（示例中是 AuthingJavaDemoApplication）中添加如下方法：

```java
@Configuration
public class AuthingConfig {
  @Bean
  @Scope("prototype")
  public AuthenticationClient authenticationClient() throws IOException, ParseException {
    //在构造函数中分别填入自己的 App ID、App Secret、APP Host。
    AuthenticationClientOptions options = new AuthenticationClientOptions();
    options.setAppId("YOUR_APP_ID");
    options.setAppSecret("YOUR_APP_SECRET");
    options.setAppHost("YOUR_APP_HOST");
    AuthenticationClient client = new AuthenticationClient(options);
    return client;
  }
}
```

AuthenticationClient 类要求每次调用初始化新实例，因此要将其作用域设为 prototype。关于如何获取App ID、App Secret 和 APP Host，请参考 [如何获取 App ID 和 App Secret](/guides/faqs/get-app-id-and-secret.md) 。

## 编写控制器

### 添加控制器

在项目主启动类同级目录内添加一个控制器，并注入相关依赖：

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

监听 /login 端点，当你访问 http://localhost:8080/login 时，你会被重定向到 Authing 完成认证。

```java
@GetMapping("/login")
public String login() {
    BuildAuthUrlParams params = new BuildAuthUrlParams();
    String redirectUri = authClientFactory.getObject().getOptions().getRedirectUri();
    params.setRedirectUri(redirectUri);
    return "redirect:" + authClientFactory.getObject().buildAuthUrl(params).getUrl();
}
```

#### 处理回调

监听 /callback 端点，当你在 Authing 完成认证后，Authing 会将你重定向到回调地址。在回调地址可以获取用户信息并存放在 session 中，随后将你重定向到应用的其他页面。

```java
@GetMapping("/callback")
@SuppressWarnings("unchecked")
public String callback(@RequestParam String code) throws Exception {
    OIDCTokenResponse oidcTokenResponse = authClientFactory.getObject().getAccessTokenByCode(code);

    session.setAttribute(KEY_ACCESS_TOKEN, oidcTokenResponse.getAccessToken());
    session.setAttribute(KEY_ID_TOKEN, oidcTokenResponse.getIdToken());
    session.setAttribute(KEY_REFRESH_TOKEN, oidcTokenResponse.getRefreshToken());

    return "redirect:/profile";
}
```

#### 登出

监听 /logout 端点，当你访问 http://localhost:8080/logout 时，清除你的 session，随后将你重定向到 Authing 完成登出。

```java
@GetMapping("/logout")
public String logout() {
    String idToken = (String) session.getAttribute(KEY_ID_TOKEN);
    // 用户当前未登录
    if(idToken == null) {
        return "redirect:/profile";
    }
    
    //清空 session
    session.invalidate();

    ILogoutParams params = new ILogoutParams();
    // 此处 RedirectUri 的含义是登出回调，可以自定义
    params.setRedirectUri("http://localhost:8080/profile");

    return "redirect:" + authClientFactory.getObject().buildLogoutUrlWithHost(params);
}
```

以上配置完成后，你可以访问 http://localhost:8080/login 登录；可以访问 http://localhost:8080/logout 从你的应用登出，并从 Authing 登出。

### 展示用户信息

为了能够展示用户信息，你的应用需要一个受保护的路由。只有登录的用户可以访问，并看到自己的信息。

```java
@ResponseBody
@GetMapping("/profile")
public String profile() {
    String accessToken = (String) session.getAttribute(KEY_ACCESS_TOKEN);
    if(accessToken == null) {
        return "未登录";
    }
    return authClientFactory.getObject().getUserinfo(accessToken).toString();
}
```

## 接下来你可能需要

调用其他资源 API：
::: page-ref /quickstarts/apiServer/nodeJsExpress/
:::

自建应用 SSO 方案：
::: page-ref /guides/app-new/sso/
:::
