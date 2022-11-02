---
noToc: true
lastUpdated: true
sidebarType: page
noPageNav: true
downloadDemo:
    title: 本页资源
    description: 下载一个 Spring Security 5 集成 Authing OIDC 快速开始的示例程序或在 GitHub 查看。
    downloadUrl: https://github.com/Authing/example-spring-boot-oidc/archive/refs/heads/master.zip
    jumpUrl: https://github.com/Authing/example-spring-boot-oidc
---


# Spring Security 集成 Authing OIDC 快速开始

> 本文以 Spring 生态中用于提供认证及访问权限控制的 [Spring Security 5](https://spring.io/projects/spring-security/) 为例，详细介绍 [Spring Security 5](https://spring.io/projects/spring-security/) 如何接入 Authing OIDC。

Spring Security 是一个 **提供安全访问控制解决方案的安全框架**。它提供了一组可以在 Spring 应用上下文中配置的 Bean，充分利用了 Spring IOC（控制反转）、DI（依赖注入）和 AOP（面向切面编程）功能，为应用系统 **提供声明式的安全访问控制功能**，**增强** 了企业 **系统的安全性**，也 **减轻** 了编写大量 **重复代码** 的负担。

Spring Security 的主要功能主要包括：

- 认证（认证是关于验证你的凭据，如用户名/手机号/邮箱和密码，以验证访问者的身份。）
- 授权（授权发生在系统完成身份认证之后，最终会授予你访问资源的完全权限，决定了你访问系统的能力以及达到的程度。）
- 攻击防护（用于预防和抵御网络上的恶意攻击。）

##  集成介绍

&emsp;&emsp;Authing OIDC 允许客户端根据授权服务器执行的身份验证来验证最终用户的身份，并以 **可互操作** 和 **类似 REST** 的方式获取有关最终用户的基本配置文件信息。  
&emsp;&emsp;允许所有类型的客户端（包括基于 Web 的客户端、移动客户端和 JavaScript 客户端）请求和接收有关经过身份验证的会话和最终用户的信息。规范套件是可扩展的，允许参与者在对他们有意义的时候使用可选功能，例如身份数据加密、OpenID 提供者的发现和会话管理。允许应用程序和站点开发人员对用户进行身份验证，而 **无需承担存储和管理密码** 的责任，因为互联网上充斥着大量试图为了自己的利益而破坏用户账户的人。  
&emsp;&emsp;它 **简单**、**可靠**、**安全**，并且可以让他们 **摆脱存储和管理他人密码的困难和危险** 工作。还有一个额外的好处是，它还 **使用户的注册过程更轻松**，从而 **减少了用户 [跳出率](https://baike.baidu.com/item/%E8%B7%B3%E5%87%BA%E7%8E%87/2186556?fromtitle=%E8%B7%B3%E8%BD%AC%E7%8E%87&fromid=10256431&fr=aladdin)**。 利用 Authing OIDC 服务作为用户认证中心的统一入口，使所有需要登录的地方都交给 OIDC 服务来做。简单来说就是把需要进行 **用户认证的部分都剥离出来交给 OIDC 认证中心** 来完成。

下面以 Authing 提供的 OIDC 服务为例，将详细介绍使用 Spring Security 5 集成 Authing OIDC 单点登录的方法。

##  Spring Boot 项目搭建
> 本文会介绍 Spring Initializr 和 maven 两种搭建方式。
### 开发环境

- 开发工具：IDEA
- 项目管理工具：Maven
- JDK版本：1.8

###  使用 Spring Initializr 快速构建项目

打开 IDEA，点击 New Project 创建一个新项目，选择 Spring Initializr 创建一个 Spring Boot 项目，输入项目的 Group 以及 Artifact 信息。
<img src="@imagesZhCn/integration/spring-security/stepnew1-1.png" height=550 style="display:block;margin:5px auto;">



添加 Spring Web， Spring Security 依赖。
<img src="@imagesZhCn/integration/spring-security/stepnew1-2.png" height=550 style="display:block;margin:5px auto;">


另外，集成过程中需要在 pom.xml 中添加一些其他的依赖包，如下：
```xml
<dependency>
   <groupId>org.springframework.security</groupId>
   <artifactId>spring-security-config</artifactId>
</dependency>
<dependency>
   <groupId>org.springframework.security</groupId>
   <artifactId>spring-security-oauth2-client</artifactId>
</dependency>
<dependency>
   <groupId>org.springframework.security</groupId>
   <artifactId>spring-security-oauth2-jose</artifactId>
</dependency>
<dependency>
    <groupId>cn.hutool</groupId>
    <artifactId>hutool-http</artifactId>
    <version>5.7.11</version>
</dependency>
```

### 使用 maven 工具构建项目

打开 IDEA，点击 New Project 创建一个新项目，选择 maven 创建一个 maven 项目，然后点击 Next，填写项目名称，最后 Finish 即可。
<img src="@imagesZhCn/integration/spring-security/stepnew1-4.png" height=550 style="display:block;margin:5px auto;">

接下来在 pom.xml 中添加父工程依赖和集成过程中需要的其它依赖包。
```xml
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.5.5</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-config</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-oauth2-client</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-oauth2-jose</artifactId>
        </dependency>
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-http</artifactId>
            <version>5.7.11</version>
        </dependency>
```

🎉🎉🎉至此，你已经完成了 使用 Spring Initializr 和 maven 两种方式构建项目，请选择一种适合自己项目开发的方式即可。


### 测试项目
创建好项目后，在 IDEA 中运行项目。

在项目运行后，使用浏览器访问 `http://localhost:8080` 会自动跳转到 `/login` 路由，可以看到页面上出现了一个基础的登录表单，说明项目初始化成功。
<img src="@imagesZhCn/integration/spring-security/stepnew1-3.png" height=350 style="display:block;margin:5px auto;">

## 配置 Authing
> 在 Authing 控制台对自建应用进行配置。
###  获取 Authing 平台信息
首先要在 Authing 注册一个账号，然后进入控制台，按照引导步骤新建一个用户池。

点击左侧的「应用」 菜单项，选择已有应用或者 [手动创建应用](https://docs.authing.cn/v2/guides/app-new/create-app/create-app.html) 后点击进去。

<img src="@imagesZhCn/integration/spring-security/create-app.png" height=350 style="display:block;margin:5px auto;">

之后会看到 App ID、App Secret、Issuer url 和 Token 端点，请妥善保存，之后会用到这些信息。

<img src="@imagesZhCn/integration/spring-security/stepnew2-2.png" height=350 style="display:block;margin:5px auto;">

然后需要在登录回调 URL 处添加 `http://localhost:8080/callback` 之后的选项与下图中保持一致。

<img src="@imagesZhCn/integration/spring-security/stepnew2-3.png" height=350 style="display:block;margin:5px auto;">

最后还需要在授权配置中，勾选如下的配置，以确保该应用支持的授权模式和 token 的安全配置。
<img src="@imagesZhCn/integration/spring-security/stepnew2-4.png" height=350 style="display:block;margin:5px auto;">


###  配置项目中的配置文件

找到 `src/main/resources/application.properties`，将其重命名为 `application.yml`，并添加如下内容：

```yaml
spring:
  security:
    oauth2:
      client:
        registration:
          authing:
            client-id: {替换为你的App ID如：61319680eaxxxxxxca9ca071}
            client-secret: {替换为你的App Secret如：如：cc8a53d7e22cxxxxxxxd6cc5d9f2}
            redirect-uri: {替换为登录的回调地址 如http://localhost:8080/callback}
            client-authentication-method: post
            scope:
              - openid
              - profile
        provider:
          authing:
            issuer-uri: {替换为你的Issuer，如：https://authing-net-sdk-demo.authing.cn/oidc}
            user-name-attribute: preferred_username

```

需要将这里的 {client-id}、{client-secret}、{redirect-uri}、{issuer-uri} 替换成上一步「应用配置」中的实际信息。

###  自动回调接口编码

在编写回调接口前，我们需要先配置一个配置类，因为 Spring Security 框架默认会对所有的接口进行拦截，我们需要配置我们回调的接口不受拦截，进行放行，以此来进行接口的回调处理。

在 Application 类所在包下新建一个 config 包，然后新建一个 SpringSecurityConfig 类，此配置类作用是对指定接口进行放行。

```java
package cn.authing.springsecurityoidcauthing.config;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import static org.springframework.security.config.Customizer.withDefaults;
@EnableWebSecurity(debug = true)
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //注意此处 callback 是在官网配置的回调地址后缀
        http.formLogin().disable();
        http.csrf().and().cors().disable();
        http.authorizeRequests()
                .mvcMatchers("/callback")
                .permitAll()
                .anyRequest().authenticated();
        // 授权码模式回调
         http.oauth2Login(withDefaults());
        // 密码模式及客户端模式
        // http.oauth2Login().loginPage("/loginByPassword").loginProcessingUrl("callback");
    }
}
```

接下来，再新建另外一个 controller 包，然后新建一个 CallBackController 类，其作用是登录成功后，回调 Authing 控制台配置的回调地址，以此来获取用户 Token 信息。 注意，下面的参数都是 Authing OIDC 的标准，也是标准协议的规定（如果要修改，请遵循 OIDC 协议标准进行修改），参数所对应的值也就是之前在 Authing 平台应用所配置的那些。

```java
package cn.authing.springsecurityoidcauthing.controller;
import cn.hutool.http.HttpUtil;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;
@RestController
public class CallBackController {
    @GetMapping("/callback")
    public String getTokenByCode(String code){
        Map<String,Object> paramMap = new HashMap<>();
        paramMap.put("code",code);
        paramMap.put("client_id","{替换为你的 app_id 如：61319680eaxxxxxxca9ca071}");
        paramMap.put("client_secret","{替换为你的 app_secret 如：cc8a53d7e22cxxxxxxxd6cc5d9f2}");
        paramMap.put("grant_type","authorization_code");
        paramMap.put("redirect_uri","{替换为你的 redirect-uri 如http://localhost:8080/callback}");
        String result = HttpUtil.post("{替换为你的 Token 端点 如https://cjtjls-demo.authing.cn/oidc/token}", paramMap);
        return result;
    }
}
```



###  运行项目

一切准备就绪了，现在启动项目并访问 `http://localhost:8080`，即可看到 Authing 登录窗口。

<img src="@imagesZhCn/integration/spring-security/stepnew3-1.png" height=550 style="display:block;margin:5px auto;">

Spring Security 默认会保护首页，在访问首页时会进行认证，未认证的访问请求会跳转到 `/login`。 注册并登录后（如果登录框中没有看到注册选项，请到控制台 「组织机构」中的「成员管理」 进行配置），会跳转回首页，此时可以看到页面上的欢迎语显示了当前登录用户的用户名。

<img src="@imagesZhCn/integration/spring-security/stepnew3-2.png" height=550 style="display:block;margin:5px auto;">

登录成功后，会自动回调到我们之前的回调地址（即我们在上面所写的 CallbackController），Authing 会返回以下信息。

<img src="@imagesZhCn/integration/spring-security/stepnew3-3.png" height=180 style="display:block;margin:5px auto;">

恭喜 🎉，到此你已经学会了 Spring Security 5 集成 Authing OIDC 认证授权。


##  其他知识学习

###  什么是OIDC

看一下官方的介绍 [http://openid.net/connect/](http://openid.net/connect/)


> OpenID Connect 1.0 is a simple identity layer on top of the OAuth 2.0 protocol. It allows Clients to verify the identity of the End-User based on the authentication performed by an Authorization Server, as well as to obtain basic profile information about the End-User in an interoperable and REST-like manner.

> OpenID Connect allows clients of all types, including Web-based, mobile, and JavaScript clients, to request and receive information about authenticated sessions and end-users. The specification suite is extensible, allowing participants to use optional features such as encryption of identity data, discovery of OpenID Providers, and session management, when it makes sense for them.


简单来说：OIDC 是 **OpenID Connect** 的简称，OIDC = (Identity, Authentication) + OAuth 2.0。它在 OAuth 上构建了一个身份层，是一个 **基于 OAuth 协议的身份认证标准协议**。我们都知道 OAuth 是一个授权协议，它无法提供完善的身份认证功能，OIDC 使用 OAuth 的授权服务器来为第三方客户端提供用户的身份认证，并把对应的身份认证信息传递给客户端，且可以适用于各种类型的客户端（比如服务端应用、移动 APP、JS 应用），且 **完全兼容 OAuth**，也就是说你搭建了一个 OIDC 的服务后，也可以当作一个 OAuth 的服务来用。应用场景如图：
<img src="@imagesZhCn/integration/spring-security/oidc.png" height=450 style="display:block;margin:5px auto;">


###  OIDC 协议族

OIDC 本身是有多个规范构成，其中包含一个核心的规范，多个可选支持的规范来提供扩展支持，简单的来看一下：

- Core：必选。定义 OIDC 的核心功能，在 OAuth 2.0 之上构建身份认证，以及如何使用 Claims 来传递用户的信息。
- Discovery：可选。发现服务，使客户端可以动态的获取 OIDC 服务相关的元数据描述信息（比如支持那些规范，接口地址是什么等等）。
- Dynamic Registration：可选。动态注册服务，使客户端可以动态的注册到 OIDC 的 OP（这个缩写后面会解释）。
- OAuth 2.0 Multiple Response Types：可选。针对 OAuth 2.0 的扩展，提供几个新的 response_type。
- OAuth 2.0 Form Post Response Mode：可选。针对 OAuth 2.0 的扩展，OAuth 2.0 回传信息给客户端是通过 URL 的 querystring 和 fragment 这两种方式，这个扩展标准提供了一基于 form 表单的形式把数据 post 给客户端的机制。
- Session Management：可选。Session 管理，用于规范 OIDC 服务如何管理 Session 信息。
- Front-Channel Logout：可选。基于前端的注销机制，使得 RP（这个缩写后面会解释）可以不使用 OP 的 iframe 来退出。
- Back-Channel Logout：可选。基于后端的注销机制，定义了 RP 和 OP 直接如何通信来完成注销。

###  OIDC 核心概念

OAuth 2.0 提供了 Access Token 来解决授权第三方客户端访问受保护资源的问题，OIDC 在这个基础上提供了 **ID Token** 来 **解决第三方客户端标识用户身份认证** 的问题。OIDC 的核心在于在 OAuth 2.0 的授权流程中，一并提供用户的身份认证信息（ID Token）给到第三方客户端，ID Token 使用 JWT 格式来包装，得益于 JWT 的 **自包含性**，**紧凑性** 以及 **防篡改** 机制，使得 ID Token 可以安全的传递给第三方客户端程序并且容易被验证。此外还提供了 UserInfo 的接口，用户获取用户的更完整的信息。

###  OIDC 主要术语

主要的术语以及概念介绍

- EU：一个人类用户
- RP：用来代指 OAuth 2.0 中的受信任的客户端，身份认证和授权信息的消费方
- OP：有能力提供 EU 认证的服务（比如 OAuth 2.0 中的授权服务），用来为 RP 提供 EU 的身份认证信息
- ID Token：JWT 格式的数据，包含 EU 身份认证的信息
- UserInfo Endpoint：用户信息接口（受 OAuth 2.0 保护），当 RP 使用 Access Token 访问时，返回授权用户的信息，此接口必须使用 HTTPS

###  OIDC 工作流程

抽象的角度来看，OIDC 的流程由以下 5 个步骤构成：

1. RP 发送一个认证请求给 OP
2. OP 对 EU 进行身份认证，然后提供授权
3. OP 把 ID Token 和 Access Token（需要的话）返回给 RP
4. RP 使用 Access Token 发送一个请求 UserInfo EndPoint
5. UserInfo EndPoint 返回 EU 的 Claims
   <img src="@imagesZhCn/integration/spring-security/oidc3.png" height=420 style="display:block;margin:5px auto;">

## 接下来你可能需要

使用 Spring Security 集成 OAuth 2.0
::: page-ref /frameworks/spring-security-oauth/
:::

Express 学习
::: page-ref /frameworks/express-oidc-client/
:::

使用 Spring Security 集成 CAS
::: page-ref /frameworks/spring-security-cas/
:::
