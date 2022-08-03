# Android

本指南将从 Authing Android SDK 的安装开始逐步引导你如何快速为你已有或新开发的 Android 应用添加用户认证能力。

<AppDetailSiderBar />

## 安装

在工程根目录的 build.gradle 文件里面需包含 mavenCentral：

 ```groovy
 buildscript {
    repositories {
        mavenCentral()
        // other repositories
    }
 }
 ```

在项目 build.gradle 文件里面依赖 guard：

```groovy
implementation 'cn.authing:guard:+'
```

在应用启动时初始化:

```java
// context is application or initial activity
// ”AUTHING_APP_ID“ is obtained from the Authing console
Authing.init(context, "AUTHING_APP_ID");
```

## 认证你的用户

注册

```java
String email = "test@example.com";
String password = "123456";
AuthClient.registerByEmail(email, password, (code, message, userInfo)->{
    if (code == 200) {
        // userInfo：用户信息
    }
});
```

登录：

```java
String account = "test@example.com";
String password = "123456";
AuthClient.loginByAccount(account, password, (code, message, userInfo)->{
    if (code == 200) {
        // userInfo：用户信息
    }
});
```


## 错误处理

```java
//错误信息返回在 AuthCallback 回调函数中，可使用 ErrorTextView 组件显示错误信息，在你的布局页面合适的位置放置 ErrorTextView，在函数回调中调用如下代码：
Util.setErrorText(view, message);
```