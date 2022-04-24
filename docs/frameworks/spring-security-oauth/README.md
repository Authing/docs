---
noToc: true
lastUpdated: true
sidebarType: page
noPageNav: true
downloadDemo:
    title: 本页资源
    description: 下载一个 Spring Security 集成 Authing OAuth 2.0 快速开始的示例程序或在 GitHub 查看。
    downloadUrl: https://github.com/Authing/example-spring-boot-oauth/archive/refs/heads/master.zip
    jumpUrl: https://github.com/Authing/example-spring-boot-oauth
---

# Spring Security 集成 Authing OAuth 2.0 快速开始

> 本文以 Spring 生态中用于提供认证及访问权限控制的 Spring Security 为例，详细介绍 Spring Security 如何接入 Authing OAuth 2.0

Spring Security 是一个**提供安全访问控制解决方案的安全框架**。它提供了一组可以在 Spring 应用上下文中配置的 Bean，充分利用了 Spring IOC（控制反转）、DI（依赖注入）和 AOP（面向切面编程）功能，为应用系统**提供声明式的安全访问控制功能**，**增强**了企业**系统的安全性**，也**减轻**了编写大量**重复代码**的负担。

Spring Security 的主要功能主要包括：

- 认证
- 授权
- 攻击防护

##  集成介绍

&emsp;&emsp;OAuth 2.0 协议定义了如何能让第三方应用以有限的权限访问 HTTP 服务相关规范，可以通过**构建资源拥有者与 HTTP 服务间的许可交互机制**，让第三方应用代表资源拥有者访问服务，或者通过授予权限给第三方应用，让其代表自己访问服务。  
&emsp;&emsp;Spring Security 是一个**功能强大**且**高度可定制的身份验证和访问控制框架**。它是用于保护基于 Spring 的应用程序的实际标准。它致力于为 Java 应用程序**提供身份验证和授权**。与所有 Spring 项目一样，Spring Security 的真正强大之处在于可以轻松扩展以满足自定义要求。

下面以 Authing 提供的 OAuth 2.0 服务为例，将详细介绍使用 Spring Security 集成 Authing OAuth 2.0 单点登录的方法

- 开发工具：IDEA
- 项目管理工具：Maven
- JDK版本：1.8

##  配置Authing
### 获取 Authing 平台信息
首先要在 Authing 注册一个账号，然后进入控制台，按照引导步骤新建一个用户池。

点击左侧的「应用」 菜单项，在右侧会看到一个默认创建好的应用。 
<img alt="创建应用" src="@imagesZhCn/integration/spring-security/stepnew2-1.png" height=350 style="display:block;margin:5px auto;">
 
点击「配置」，看到 App ID、App Secret 和 Issuer url，请妥善保存，之后会用到这些信息。
<img alt="查看应用信息" src="@imagesZhCn/integration/spring-security/stepnew2-2.png" height=350 style="display:block;margin:5px auto;">
 
然后需要在回调地址处添加 <font color='blue'>http://localhost:8080/login/oauth2/code/authing</font> 之后的选项与下图中保持一致。
> Spring Security OAuth 默认的回调地址为 /login/oauth2/code/{clientId}

<img alt="默认回调地址" src="@imagesZhCn/integration/spring-security/stepnew2-3.png" height=350 style="display:block;margin:5px auto;">
 
确认开启 OAuth 2.0 服务并进行配置
<img alt="开启OAuth" src="@imagesZhCn/integration/spring-security/oauth-more.png" height=350 style="display:block;margin:5px auto;">
 

##  项目搭建

### 添加依赖
添加 Spring Web，Spring Security，Spring Oauth2 Client 依赖
<img alt="创建项目2" src="@imagesZhCn/integration/spring-security/create-project-1.png" height=350 style="display:block;margin:5px auto;">

```xml
<dependencies>
   <dependency>
     <groupId>org.springframework.boot</groupId>
     <artifactId>spring-boot-starter-oauth2-client</artifactId>
   </dependency>
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-security</artifactId>
   </dependency>
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-web</artifactId>
   </dependency>   
    <dependency>
        <groupId>cn.authing</groupId>
        <artifactId>java-core</artifactId>
        <version>4.3.40</version>
    </dependency>
</dependencies>                                    
```

### 授权码模式

#### 授权码模式工作流程
1. 用户访问**客户端**，**客户端**通过重定向引导用户至**授权服务器**
2. **授权服务器**对**资源所有者**进行身份验证，认证成功后重定向至**客户端**并返回**授权码**
3. **客户端**通过**授权码**与**授权服务器**交换访问**访问令牌**
4. **客户端**使用**访问令牌**访问**资源服务器**
5. **资源服务器**验证访问令牌，并返回受保护数据
>执行流程图如下
<img  alt="执行流程图" src="@imagesZhCn/integration/spring-security/oauth-flow.png" height=350 style="display:block;margin:5px auto;">

####  修改项目配置文件

找到 `src/main/resources/application.properties`，填入项目信息：

``` properties
server.port=8081
spring.security.oauth2.client.registration.authing.client-id={替换为你的App ID如：App Secret5e72d72e3798fb03e1d57b13}
spring.security.oauth2.client.registration.authing.client-name=authing
spring.security.oauth2.client.registration.authing.client-secret={替换为你的App Secret如：931f19ce2161e5560c072f586c706ee6}
spring.security.oauth2.client.registration.authing.authorization-grant-type=authorization_code
spring.security.oauth2.client.registration.authing.client-authentication-method=POST
spring.security.oauth2.client.registration.authing.redirect-uri=http://localhost:${server.port}/login/oauth2/code/authing

spring.security.oauth2.client.registration.authing.scope=profile
spring.security.oauth2.client.provider.authing.user-info-authentication-method=form
spring.security.oauth2.client.provider.authing.authorization-uri=https://{替换为你的Issuer，如：authing-net-sdk-demo}.authing.cn/oauth/auth
spring.security.oauth2.client.provider.authing.user-name-attribute=username
spring.security.oauth2.client.provider.authing.token-uri=https://{替换为你的Issuer，如：authing-net-sdk-demo}.authing.cn/oauth/token
spring.security.oauth2.client.provider.authing.user-info-uri=https://core.authing.cn/oauth/me
 
```

需要将这里的 {clientId}、{secret}、{authorization-uri} 替换成上一步 应用配置 中的实际信息


### 密码模式
####  修改项目配置文件

找到 `src/main/resources/application.properties`，填入项目信息：

``` properties
server.port=8081
spring.security.oauth2.client.registration.authing.client-id={替换为你的App ID如：App Secret5e72d72e3798fb03e1d57b13}
spring.security.oauth2.client.registration.authing.client-name=authing
spring.security.oauth2.client.registration.authing.client-secret={替换为你的App Secret如：931f19ce2161e5560c072f586c706ee6}
spring.security.oauth2.client.registration.authing.authorization-grant-type=password
spring.security.oauth2.client.registration.authing.client-authentication-method=POST 
spring.security.oauth2.client.registration.authing.scope=profile
spring.security.oauth2.client.provider.authing.token-uri=https://{替换为你的Issuer，如：authing-net-sdk-demo}.authing.cn/oauth/token
 
```

需要将这里的 {clientId}、{secret}、{token-uri} 替换成上一步 应用配置 中的实际信息

#### 业务端处理
<img  alt="密码模式" src="@imagesZhCn/integration/spring-security/oauth-password.png" height=350 style="display:block;margin:5px auto;">

密码模式是通过用户名密码直接换取令牌 
>认证地址 https://{域名}.authing.cn/oauth/token?username={用户名}&password={密码}&grant_type=password&scope={Scope}&client_id={客户端ID}&client_secret={客户端秘钥}

### 客户端模式
####  修改项目配置文件
找到 `src/main/resources/application.properties`，填入项目信息：

``` properties
server.port=8081
spring.security.oauth2.client.registration.authing.client-id={替换为你的App ID如：App Secret5e72d72e3798fb03e1d57b13}
spring.security.oauth2.client.registration.authing.client-name=authing
spring.security.oauth2.client.registration.authing.client-secret={替换为你的App Secret如：931f19ce2161e5560c072f586c706ee6}
spring.security.oauth2.client.registration.authing.authorization-grant-type=client_credentials
spring.security.oauth2.client.registration.authing.client-authentication-method=POST 
spring.security.oauth2.client.registration.authing.scope=profile
spring.security.oauth2.client.provider.authing.token-uri=https://{替换为你的Issuer，如：authing-net-sdk-demo}.authing.cn/oauth/token
 
```

需要将这里的 {clientId}、{secret}、{token-uri} 替换成上一步 应用配置 中的实际信息

#### 业务端处理
<img  alt="密码模式" src="@imagesZhCn/integration/spring-security/oauth-client_credentials.png" height=350 style="display:block;margin:5px auto;">

客户端模式与密码模式雷同，通过应用 ID 和应用秘钥换取令牌
>认证地址 https://{域名}.authing.cn/oauth/token?grant_type=client_credentials&scope={Scope}&client_id={客户端ID}&client_secret={客户端秘钥}


### 简化模式
####  修改项目配置文件
找到 `src/main/resources/application.properties`，填入项目信息：

``` properties
server.port=8080
spring.security.oauth2.client.registration.authing.client-id={替换为你的App ID如：App Secret5e72d72e3798fb03e1d57b13}
spring.security.oauth2.client.registration.authing.client-name=authing
spring.security.oauth2.client.registration.authing.client-secret={替换为你的App Secret如：931f19ce2161e5560c072f586c706ee6}
spring.security.oauth2.client.registration.authing.authorization-grant-type=implicit
spring.security.oauth2.client.registration.authing.client-authentication-method=POST
spring.security.oauth2.client.registration.authing.redirect-uri=http://localhost:${server.port}/callback
spring.security.oauth2.client.registration.authing.scope=profile
spring.security.oauth2.client.provider.authing.token-uri=https://{替换为你的Issuer，如：authing-net-sdk-demo}.authing.cn/oauth/token
```

需要将这里的 {clientId}、{secret}、{token-uri}、{redirect-uri} 替换成上一步 应用配置 中的实际信息


<img  alt="简化模式" src="@imagesZhCn/integration/spring-security/oauth-implicit.png" height=350 style="display:block;margin:5px auto;">

简化模式下，用户通过浏览器直接发起令牌交换操作，无需后台参与
>认证地址 https://{域名}.authing.cn/oauth/authorize?response_type=token&client_id={客户端ID}&redirect_uri={回调地址}&scope={SCOPE}&state={state}

<img  alt="简化模式访问" src="@imagesZhCn/integration/spring-security/oauth-implicit-url.png" height=350 style="display:block;margin:5px auto;">

认证授权之后，浏览器重定向到回调地址并携带访问令牌
<img  alt="简化模式成功" src="@imagesZhCn/integration/spring-security/oauth-implicit-success.png" height=350 style="display:block;margin:5px auto;">

 

## 单点登录
### 分别创建项目 server-file，server-pic
<img alt="项目列表" src="@imagesZhCn/integration/spring-security/sso-project-list.png" height=350 style="display:block;margin:5px auto;">

### 修改项目配置文件
> server-file
``` properties
server.port=8081
spring.security.oauth2.client.registration.authing.client-id={替换为你的App ID如：App Secret5e72d72e3798fb03e1d57b13}
spring.security.oauth2.client.registration.authing.client-name=authing
spring.security.oauth2.client.registration.authing.client-secret={替换为你的App Secret如：931f19ce2161e5560c072f586c706ee6}
spring.security.oauth2.client.registration.authing.authorization-grant-type=authorization_code
spring.security.oauth2.client.registration.authing.client-authentication-method=POST
spring.security.oauth2.client.registration.authing.redirect-uri=http://localhost:${server.port}/login/oauth2/code/authing

spring.security.oauth2.client.registration.authing.scope=profile
spring.security.oauth2.client.provider.authing.user-info-authentication-method=form
spring.security.oauth2.client.provider.authing.authorization-uri=https://{替换为你的Issuer，如：authing-net-sdk-demo}.authing.cn/oauth/auth
spring.security.oauth2.client.provider.authing.user-name-attribute=username
spring.security.oauth2.client.provider.authing.token-uri=https://{替换为你的Issuer，如：authing-net-sdk-demo}.authing.cn/oauth/token
spring.security.oauth2.client.provider.authing.user-info-uri=https://core.authing.cn/oauth/me
```
> server-pic
``` properties
server.port=8082
spring.security.oauth2.client.registration.authing.client-id={替换为你的App ID如：App Secret5e72d72e3798fb03e1d57b13}
spring.security.oauth2.client.registration.authing.client-name=authing
spring.security.oauth2.client.registration.authing.client-secret={替换为你的App Secret如：931f19ce2161e5560c072f586c706ee6}
spring.security.oauth2.client.registration.authing.authorization-grant-type=authorization_code
spring.security.oauth2.client.registration.authing.client-authentication-method=POST
spring.security.oauth2.client.registration.authing.redirect-uri=http://localhost:${server.port}/login/oauth2/code/authing

spring.security.oauth2.client.registration.authing.scope=profile
spring.security.oauth2.client.provider.authing.user-info-authentication-method=form
spring.security.oauth2.client.provider.authing.authorization-uri=https://{替换为你的Issuer，如：authing-net-sdk-demo}.authing.cn/oauth/auth
spring.security.oauth2.client.provider.authing.user-name-attribute=username
spring.security.oauth2.client.provider.authing.token-uri=https://{替换为你的Issuer，如：authing-net-sdk-demo}.authing.cn/oauth/token
spring.security.oauth2.client.provider.authing.user-info-uri=https://core.authing.cn/oauth/me
```

### 在 Authing 控制台增加回调地址
<img alt="sso 回调地址" src="@imagesZhCn/integration/spring-security/sso-callback.png" height=350 style="display:block;margin:5px auto;">

### 设置项目 server-file 受保护资源
<img alt="项目a资源" src="@imagesZhCn/integration/spring-security/oauth-server-a-resource.png" height=350 style="display:block;margin:5px auto;">

### 设置项目 server-pic 受保护资源
<img alt="项目b资源" src="@imagesZhCn/integration/spring-security/oauth-server-b-resource.png" height=350 style="display:block;margin:5px auto;">

### 验证单点登录效果
#### 分别启动项目 server-file，server-pic
<img alt="启动项目a" src="@imagesZhCn/integration/spring-security/oauth-startup-server-a.png"   height=350 style="display:block;margin:5px auto;">
<img alt="启动项目b" src="@imagesZhCn/integration/spring-security/oauth-startup-server-b.png"   height=350 style="display:block;margin:5px auto;">

#### 访问受保护资源 
此时无论访问 server-file 还是 server-pic 都会被重定向到 Authing 认证页面

<img alt="重定向登录" src="@imagesZhCn/integration/spring-security/oauth-sso-redirct.png" height=350 style="display:block;margin:5px auto;">

#### 登录后访问受保护资源
完成登录后,直接访问 server-pic 的资源也不需要重新进行认证

<img alt="登录成功" src="@imagesZhCn/integration/spring-security/oauth-sso-success.png" height=350 style="display:block;margin:5px auto;">

## 基于 Spring Security 进行扩展
### 对 Spring Security 进行配置

<img alt="自定义spring" src="@imagesZhCn/integration/spring-security/oauth-custom-config.png" height=350 style="display:block;margin:5px auto;">

### 增加项目回调地址

<img alt="自定义回调地址" src="@imagesZhCn/integration/spring-security/oauth-custom-setting.png" height=350 style="display:block;margin:5px auto;">

### 引入 Authing SDK 进行自定义扩展
```xml
 <dependency>
    <groupId>cn.authing</groupId>
    <artifactId>java-core</artifactId>
    <version>4.3.40</version>
</dependency>
```
<img alt="自定义扩展点" src="@imagesZhCn/integration/spring-security/oauth-custom-callback.png" height=350 style="display:block;margin:5px auto;">

## 接下来你可能需要

使用 Spring Security 集成 OIDC
::: page-ref /frameworks/spring-security-oidc/
:::

Express 学习
::: page-ref /frameworks/express-oidc-client/
:::

使用 Spring Security 集成 CAS
::: page-ref /frameworks/spring-security-cas/
:::
