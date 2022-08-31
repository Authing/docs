---
noToc: true
lastUpdated: true
sidebarType: page
noPageNav: true
downloadDemo:
    title: 本页资源
    description: 下载一个 authing-spring-boot-starter 快速开始的示例程序或在 GitHub 查看。
    downloadUrl: https://github.com/Authing/authing-spring-boot-starter/archive/refs/tags/1.1.2.zip
    jumpUrl: https://github.com/Authing/authing-spring-boot-starter
---


# authing-spring-boot-starter


> 本文以 Spring 生态中用于提供认证及访问权限控制的 Spring Boot 2.x 为例，详细介绍 Spring Boot 如何接入 Authing Spring Boot Starter。



Spring Boot 可以轻松创建可以**直接运行**的独立的、生产级的基于 Spring 的应用程序。

Spring Boot 的特征主要有：

- 创建独立的 Spring 应用程序
- 提供版本仲裁的入门依赖项以简化您的构建配置
- 尽可能自动配置 Spring 和 3rd 方库
- 完全无需代码生成，无需 XML 配置



## 集成介绍

Authing Spring Boot Starter 可以为您提供拦截校验 token 的功能。

您可以新建一个您的 spring-boot 工程来使用本项目，或直接使用我们在 `/example/use-this-starter` 提供的示例项目进行试用。



## 配置 Authing

### 获取 Authing 平台信息

首先要在 Authing 注册一个账号，然后进入控制台，按照引导步骤新建一个用户池。

点击左侧的「应用」 菜单项，在右侧会看到一个默认创建好的应用。

![](https://cdn.authing.co/authing-docs-v2/1.3.98/assets/img/stepnew2-1.5f55fe46.png)

为您的示例应用创建一些测试用户。

![image-20220825161101516](D:\authing\TempCode\doc framework starter.assets\image-20220825161101516.png)

如果想看某个用户的 token, 可在示例应用中点击「体验登录」模拟以此用户身份登录。

![image-20220825161351907](D:\authing\TempCode\doc framework starter.assets\image-20220825161351907.png)



## 项目搭建

### 开发环境

- 开发工具：IDEA
- 项目管理工具：Maven
- JDK版本：1.8
- 版本控制工具：Git

### 使用 Spring Initializr 快速构建项目

打开 IDEA，点击 New Project 创建一个新项目，选择 Spring Initializr 创建一个 Spring Boot 项目，输入项目的 Group 以及 Artifact 信息

![img](https://cdn.authing.co/authing-docs-v2/1.3.98/assets/img/cas1.bb1e679c.png)

集成过程中需要在 pom.xml 中添加一些其他的依赖包，如下：



###  添加依赖

以下两种引用方式二选一。

####  从中央仓库引入

在您的 Spring 项目中引入：

```xml
<dependency>
    <groupId>cn.authing</groupId>
    <artifact>authing-spring-boot-starter</artifact>
    <version>{latest-version}</version>
</dependency>
```

####  以 jitpack 方式从 github 源码引入：

添加 repository,

```xml
 <repositories>
    <repository>
      <id>jitpack.io</id>
      <url>https://jitpack.io</url>
    </repository>
  </repositories>
```

添加 dependency,

```xml
<dependency>
  <groupId>com.github.Authing</groupId>
  <artifactId>authing-spring-boot-starter</artifactId>
  <version>{authing.version}</version>
</dependency>
```

此处`authing.version` 为 github 最新 tag.

<br>

引入 `authing-spring-boot-starter`完成后，

> 由于 okhttp3 的版本冲突问题，请从您的 `spring-boot-starter-web`中排除 `okhttp`, 使用 `okhttp:4.8.0`版本。

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
  <exclusions>
    <exclusion>
      <groupId>com.squareup.okhttp3</groupId>
      <artifactId>okhttp</artifactId>
    </exclusion>
  </exclusions>
</dependency>
<dependency>
  <groupId>com.squareup.okhttp3</groupId>
  <artifactId>okhttp</artifactId>
  <version>4.8.0</version>
</dependency>
```

###  配置

#### 配置用户池与应用

这里以 `yml`格式为例。 在 `application.yml` 配置文件中添加您的用户池与应用的相关配置：

```yml
authing:
  user-pool:
    user-pool-id: AUTHING_USERPOOL_ID
    secret: AUTHING_USERPOOL_SECRET

  app:
    app-id: APP_ID
    app-host: APP_HOST
```

- `authing.user-pool.user-pool-id`：用户池 ID。
- `authing.user-pool.secret`：用户池密钥。
- `authing.app.app-id`：应用ID。
- `authing.app.app-host`：应用域名，格式为 `https://YOUR_DOMAIN.authing.cn`

> 你可以在此[了解如何获取 UserPoolId](https://docs.authing.cn/v2/guides/faqs/get-userpool-id-and-secret.html), 在控制台的**应用**中查看自己的应用列表。

#### 配置授权规则

##### 需要校验登录态


默认情况下，所有资源都为受保护资源，需要特定用户拥有特定权限才可访问。

细节请参考这里[对用户进行权限管理](https://docs.authing.cn/v2/guides/access-control/) 创建相应的`资源`以及`授权`。

注意，资源操作请填 'read'，目前仅支持 read 操作。

![](D:\authing\TempCode\doc framework starter.assets\ins.png)





##### 不需要校验登录态

如果您希望暴露某些资源，如注册页/ 登录页等，来允许未登录者访问，请将资源地址配置在 `application.yml`中：

```yaml
authing:
  exclude-paths:
    - /demo0/url0
    - /demo1/url1
```

`authing.exclude-paths`: 不需要校验的 url 白名单列表。

### 失败处理

如果您希望全局地给验证失败的请求返回特定异常，如 HTTP 403 异常，可在您的全局异常处理器中添加以下内容：

```java
@ControllerAdvice(basePackages = "YOUR-PACKAGE")
@ResponseBody
@Slf4j
public class GlobalExceptionHandler {
    @ExceptionHandler(AuthingException.class)
    public ResponseResult handleAuthingException(AuthingException e) {
        log.error("log:*token error{},exception class:{}",e.getMessage(),e.getClass());
        return ResponseVO.fail(403,"wrong token");
    }
}
```

### 开始使用

进行功能测试。

#### 访问受保护的资源

对于受保护的资源：

```java
@RestController
public class DemoController {
  @GetMapping("/test/resources")
  public ResponseVO getResource() {
    return ResponseVO.success().setMessage("some resource need authorization");
  }
}
```

携带正确的 token:

```http
GET /product/attr/info/<attrId> HTTP/1.1
Host: localhost:8080
User-Agent: apifox/1.0.0 (https://www.apifox.cn)
Authorization: YOUR TOKEN
```

响应结果：

```json
{
    "code":200,
    "message":"some resource need authorization"
}
```

不携带 token 或携带错误的 token :

```http
GET /product/attr/info/<attrId> HTTP/1.1
Host: localhost:8080
User-Agent: apifox/1.0.0 (https://www.apifox.cn)
Authorization: WRONG TOKEN
```

响应结果：

```json
{
    "code":403,
    "message":"wrong token"
}
```

#### 访问不受保护的资源

```http
GET /product/attr/info/<attrId> HTTP/1.1
Host: localhost:8080
User-Agent: apifox/1.0.0 (https://www.apifox.cn)
Authorization: NO TOKEN
```

```json
{
    "code":200,
    "message":"ok"
}
```