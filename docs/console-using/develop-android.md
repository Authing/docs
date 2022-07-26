# Android

<LastUpdated/>

本教程演示如何快速集成用户登录到你的 Android 应用程序。

Authing Android SDK 由两大部分组成：`超组件（Hyper Component）`、`AuthClient / OIDCClient`。

`超组件（Hyper Component）`组件帮助开发者快速构建注册、登录认证页面。

`AuthClient / OIDCClient` 以终端用户（End User）的身份进行请求，提供了登录、注册、登出、管理用户资料、获取授权资源等所有管理用户身份的方法；此模块还提供了各种身份协议的 SDK，如 OpenId Connect，OAuth 2.0，SAML 和 CAS。此模块适用于自己构建认证 UI 界面进行用户身份认证的场景。

<AppDetailSiderBar />

## 安装


在工程根目录的 build.gradle 文件里面需包含 mavenCentral

 ```groovy
 buildscript {
    repositories {
        mavenCentral()

        // other repositories
    }
 }
 ```

在项目 build.gradle 文件里面依赖 guard

```groovy
implementation 'cn.authing:guard:+'
```

在应用启动时初始化:

```java
// context is application or initial activity
// ”your_authing_app_id“ is obtained from the Authing console
Authing.init(context, "your_authing_app_id");
```



## 接入标准认证界面

在需要认证的地方调用:

```java
// this is the activity context
AuthFlow.start(this);
```

如上启动登录页面登录成功会返回 idToken，已满足大部分场景，如果你想获取到 accessToken，请这么调用:

```java
// this is the activity context
AuthFlow flow = AuthFlow.start(this);
flow.setAuthProtocol(AuthContainer.AuthProtocol.EOIDC);
```

接下来，我们获取登录成功回调信息：

```java
  @Override
  protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    if (requestCode == RC_LOGIN && resultCode == OK && data != null) {
      //login success，do next task
    }
  }
```

登录成功后也可以通过如下代码获取本地用户数据

```java
UserInfo userInfo = Authing.getCurrentUser();
```



## 认证你的用户

确保完成上面初始化动作之后，接下来可以进行注册操作：

```java
String email = "test@example.com";
String password = "123456";
//获取到 idToken
AuthClient.registerByEmail(email, password, this::fireCallback);

//如果想获取到 accessToken和refreshToken
new OIDCClient().registerByEmail(email, password, this::fireCallback);
```

接下来可以进行登录操作：

```java
String account = "test@example.com";
String password = "123456";
//获取到 idToken
AuthClient.loginByAccount(account, password, this::fireCallback);

//如果想获取到 accessToken和refreshToken
new OIDCClient().loginByAccount(account, password, this::fireCallback);
```

完成登录之后，`updateProfile` 等要求用户登录的方法就可用了：

```java
JSONObject object = new JSONObject();
object.put("name", "test");
AuthClient.updateProfile(object, (code, message, res) -> {
    if (code == 200) {
        finish();
    } else {
        Util.setErrorText(btnSubmit, message);
    }
});
```



## 错误处理

错误信息返回在 AuthCallback 回调函数中，可使用 ErrorTextView 组件显示错误信息，在你的布局页面合适的位置放置 ErrorTextView，在函数回调中调用如下代码

```
Util.setErrorText(this, message);
```