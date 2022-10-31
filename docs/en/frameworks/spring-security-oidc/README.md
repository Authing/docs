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

# Spring Security integrated Authing OIDC Start quickly

> This article uses Spring Security 5 for certification and access control in Spring ecology as an example, and how to access Authing OIDC

Spring Security is a **Security framework for secure access control solutions**. It provides a set of Beans that can be configured in the Spring application context, Make full use Spring IOC（Control reverse）、DI（Dependency injection）and AOP（Stem programming）function, for the application system **Provide a stateless security access control function**，**Enhanced** Business **System security**，**Reduce** write a lot **Repeat code** burden.

Spring Security main features mainly include:

- Certification
- Authorize
- Attack protection

## Integration introduction

&emsp;&emsp;Authing OIDC Allow the client to verify the identity of the end user based on the authentication executed by the authorization server. And **Interoperable** and **similar REST** the way the basic configuration file information about the end user is obtained.
&emsp;&emsp;Allow all types of clients (including web-based clients, mobile clients, and JavaScript clients) Request and receive information about authenticated session and end users. The specification kit is scalable, Allow participants to use optional features when they make sense, such as identity data encryption, OpenID provider's discovery and session management.Allows applications and site developers to authenticate users, and **does not need to bear the responsibility of storage and management password**, Because the Internet is full of people who try to destroy the user account for their own benefits.
&emsp;&emsp; **simple**、**reliable**、**Safety**，And let them **difficulties and dangers from getting rid of storage and managing passwords** work. There is an additional benefit is that, and **Use the user's registration process easier**，**Reduce user jump out**. Using Authing OIDC Services as a unified entry of the User Certification Center, all places that need to be logged in will be handed over to OIDC services. It is simply that all parts that need to be processed **user authentication will be completed to the OIDC Certification Center**.

The OIDC service provided by Authing as an example below. Will detail the method of integrating Authing OIDC single sign-on using Spring Security 5

## Project construction

### Development environment

- development tools: IDEA
- Project Management Tool: Maven
- JDK version：1.8
- Version Control Tool: Git

### Use Spring Initializr quick build project

Open IDEA, click New Project to create a new project, select Spring Initializr to create a Spring boot project, enter the project's Group and Artifact Information
<img src="@imagesZhCn/integration/spring-security/stepnew1-1.png" height=550 style="display:block;margin:5px auto;">

Add Spring Web， Spring Security rely
<img src="@imagesZhCn/integration/spring-security/stepnew1-2.png" height=550 style="display:block;margin:5px auto;">

In addition, some other dependent packages are added to POM.xml during integration, as follows:

```
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
```

### Use maven Tool build project

Open IDEA, click New Project to create a new project, select maven to create a maven project, then click Next, fill in the project name, and finally Finish
<img src="@imagesZhCn/integration/spring-security/stepnew1-4.png" height=550 style="display:block;margin:5px auto;">

Next, add other dependent packages that parent engineering dependencies and integration in pom.xml.

```
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
```

🎉🎉🎉 At this point, you have completed two ways to use Spring Initializr and maven, please select a way to develop in your project.

### Test items

After creating a good project, run the project in IDEA

After the project is running, use the browser to access the `http://localhost:8080` `/login` Route, you can see a base login form on the page, indicating that the project initialization is successful.
<img src="@imagesZhCn/integration/spring-security/stepnew1-3.png" height=350 style="display:block;margin:5px auto;">

## Configure Authing

### Get an Authing Platform Information

First, you must register an account at Authing and enter the console, and create a user pool according to the boot step.

Click on the "Application" menu item on the left, you will see a default creation application on the right.

<img src="@imagesZhCn/integration/spring-security/stepnew2-1.png" height=350 style="display:block;margin:5px auto;">

Click "Configuration", see the App ID, App Secret, and Issuer url, please save it properly and then use this information.

<img src="@imagesZhCn/integration/spring-security/stepnew2-2.png" height=350 style="display:block;margin:5px auto;">

Then you need to add at the callback address `http://localhost:8080/login/oauth2/code/authing` subsequent options are consistent with the following figure.

<img src="@imagesZhCn/integration/spring-security/stepnew2-3.png" height=350 style="display:block;margin:5px auto;">

Finally, in the authorization configuration, check the following configuration to ensure the authorization mode and token's security configuration supported by the application.
<img src="@imagesZhCn/integration/spring-security/stepnew2-4.png" height=350 style="display:block;margin:5px auto;">

### Configure the configuration file in the project

Find `src/main/resources/application.properties`, Rename it as `application.yml`, add the following:

```
spring:
  security:
    oauth2:
      client:
        registration:
          authing:
            client-id: {Replace your  App ID such as：App Secret5e72d72e3798fb03e1d57b13}
            client-secret: {替换为你的App Secret如：931f19ce2161e5560c072f586c706ee6}
            redirect-uri: '{替换为登录的回调地址}'
            client-authentication-method: post
            scope:
              - openid
              - profile
        provider:
          authing:
            issuer-uri: https://{Replace your Issuer，such as：authing-net-sdk-demo}.authing.cn/oidc
            user-name-attribute: preferred_username

```

Need to {clientId}、{secret}、{issuerUrl} replace the actual information in the previous application configuration

### Run project

Everything is ready, start the project and visit `http://localhost:8080`，You can see the Authing login window.

<img src="@imagesZhCn/integration/spring-security/stepnew3-1.png" height=550 style="display:block;margin:5px auto;">

Spring Security defaults to protect the home page, authenticating, and unauthenticated access requests will jump to `/ login`. After registering and logging in, you will jump back to your home page. At this time, you can see the welcome language on the page shows the username of the current login user.

<img src="@imagesZhCn/integration/spring-security/stepnew3-2.png" height=550 style="display:block;margin:5px auto;">

Congratulations 🎉，I have learned here. Spring Security 5 integrated Authing OIDC certified

## Other knowledge learning

### What is OIDC

Look at the official introduction [http://openid.net/connect/](http://openid.net/connect/)

> OpenID Connect 1.0 is a simple identity layer on top of the OAuth 2.0 protocol. It allows Clients to verify the identity of the End-User based on the authentication performed by an Authorization Server, as well as to obtain basic profile information about the End-User in an interoperable and REST-like manner.

> OpenID Connect allows clients of all types, including Web-based, mobile, and JavaScript clients, to request and receive information about authenticated sessions and end-users. The specification suite is extensible, allowing participants to use optional features such as encryption of identity data, discovery of OpenID Providers, and session management, when it makes sense for them.

Simply, OIDC is an abbreviation, OIDC = (Identity, Authentication) + OAuth 2.0. It builds an identity layer on OAuth, is a **OAuth protocol based identity authentication standard protocol**. We all know that OAuth is an authorization agreement that cannot provide a complete identity authentication function. OIDC uses OAuth's authorization server to provide users' authentication for the third-party client, and pass the corresponding identity authentication information to the client, and can Applicable to various types of clients (such as server applications, mobile app, js applications), and **completely compatible with OAuth**, that is, after you build an OIDC service, you can also be used as an OAuth service. Use. Application scenario, like a picture:
<img src="@imagesZhCn/integration/spring-security/oidc.png" height=450 style="display:block;margin:5px auto;">

### OIDC Protocol

OIDC itself has several specifications, including a core specification, multiple optional support specifications to provide extended support, simple to look at:

- Core：required. Define the core function of OIDC, build an identity authentication above OAuth 2.0, and how to use Claims to deliver users.
- Discovery：Optional. Discover the service to make the client can dynamically obtain Metadata description information related to OIDC services (such as supporting those specification, what is the interface address, etc.).
- Dynamic Registration：Optional. Dynamic registration service allows the client to register the OP's OP (this abbreviation will explain).
- OAuth 2.0 Multiple Response Types：Optional. For OAuth 2.0 extensions, there are several new response_types.
- OAuth 2.0 Form Post Response Mode：Optional. For OAuth 2.0 expansion, OAuth 2.0 return information gives the client two ways of querystring and fragment, which provides a mechanism for the client based on the form of forms.
- Session Management：Optional. Session Management, how to specify how OIDC services manages Session information.
- Front-Channel Logout：Optional. Based on the front-end logout mechanism, the RP (this abbreviation will be explained) may exit without using the iframe of OP.
- Back-Channel Logout：Optional. Based on the rear end logout mechanism defines how RP and OP communicate directly to complete the logout.

### OIDC Core idea

OAuth 2.0 provides Access Token to resolve the issue of authorized third-party clients to access protected resources, OIDC provides **ID token** to **solve the problem of third-party client identifying user authentication**. The core of OIDC is in the authorization process of OAuth 2.0, and provides users' identity authentication information (ID token) to third-party clients, ID token is packaged in JWT format, thanks to JWT **self-inclusive**, **Compact** and **tamper-proof** mechanism, allows ID Token to be securely passed to third-party client programs and is easily verified. In addition, UserInfo interface is also provided, and the user obtains more complete information.

### OIDC Main term

Main terms and concept introductions

- EU：A human user
- RP：RP: used to refer OAuth 2.0 trusted client, identity authentication, and authorized information for the consumption
- OP: Ability to provide EU certified services (such as authorization services in OAuth 2.0), used to provide EU identity authentication information for RP
- ID Token：JWT format data, including EU authentication information
- UserInfo Endpoint：User information interface (protected by OAuth 2.0), returns information of authorized users when RP uses Access token access, this interface must use HTTPS

### OIDC work process

From an abstract point of view, the OIDC process consists of the following five steps:

1. RP Send an authentication request to OP
2. OP authenticates EU and then provides authorization
3. OP returns ID token and Access Token to RP
4. RP use Access Token send a request UserInfo EndPoint
5. UserInfo EndPoint return EU Claims
   <img src="@imagesZhCn/integration/spring-security/oidc3.png" height=420 style="display:block;margin:5px auto;">

## Next you may need

Use Spring Security integrated OAuth 2.0
::: page-ref /frameworks/spring-security-oauth/
:::

Express Learn
::: page-ref /en/frameworks/express-oidc-client/
:::

Use Spring Security integrated CAS
::: page-ref /en/frameworks/spring-security-cas/
:::
