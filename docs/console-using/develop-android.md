# Android

<LastUpdated/>

本指南将从 Authing Android SDK 的安装开始逐步引导你如何快速为你已有或新开发的 Android 应用添加用户认证能力。

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
Authing.init(context, "AUTHING_APP_ID");
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
AuthClient.registerByEmail(email, password, (code, message, userInfo)->{
    if (code == 200) {
        // userInfo：用户信息
    }
});

//如果想获取到 accessToken 和 refreshToken
new OIDCClient().registerByEmail(email, password, (code, message, userInfo)->{
    if (code == 200) {
        // userInfo：用户信息
    }
});
```

接下来可以进行登录操作：

```java
String account = "test@example.com";
String password = "123456";
//获取到 idToken
AuthClient.loginByAccount(account, password, (code, message, userInfo)->{
    if (code == 200) {
        // userInfo：用户信息
    }
});

//如果想获取到 accessToken 和 refreshToken
new OIDCClient().loginByAccount(account, password, (code, message, userInfo)->{
    if (code == 200) {
        // userInfo：用户信息
    }
});
```

完成登录之后，`updateProfile` 等要求用户登录的方法就可用了：

```java
JSONObject object = new JSONObject();
object.put("name", "test");
AuthClient.updateProfile(object, (code, message, res) -> {
    if (code == 200) {
    
    }
});
```



## 错误处理

错误信息返回在 AuthCallback 回调函数中，可使用 ErrorTextView 组件显示错误信息，在你的布局页面合适的位置放置 ErrorTextView，在函数回调中调用如下代码

```java
Util.setErrorText(view, message);
```