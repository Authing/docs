# Google 登录

<LastUpdated/>

集成 Google 登录需要三个主要步骤：

1. 在谷歌开放平台进行配置

2. 在 Authing 管理控制台进行配置

3. 集成 Android SDK

<br>

STEP1 和 STEP2 请参考：

[Google 移动端配置](../../../guides/connections/social/google-mobile/README.md)



## STEP3：集成 Guard Android SDK 

1. 添加依赖

```groovy
implementation 'cn.authing:guard:+'
implementation 'com.google.android.gms:play-services-auth:20.2.0'
```

> Guard 只是 compileOnly 依赖 gms，这样可以让 App 按需引入，防止 Guard aar 包随着支持的第三方登录增加而越来越大。所以每增加一个第三方身份源，都需要 App 手动加上该身份源的依赖

2. 在应用启动时初始化 Authing

```java
// context is application or initial activity
// ”AUTHING_APP_ID“ is obtained from the Authing console
Authing.init(context, "AUTHING_APP_ID");
```



**通过以上 3 步即可简单快速的通过 Authing 管理控制台配置后自动拥有 Google 登录功能，登录入口会在 Guard 内置登录界面的社会化登录按钮列表中体现**



* 接下来，如果使用我们提供的 Google 登录按钮，则在布局文件里面加上（或者代码初始化添加）

```xml
 <cn.authing.guard.social.GoogleLoginButton
    android:id="@+id/btn_google_login"
    android:background="@drawable/authing_button_background"
    android:textColor="@color/white"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

认证结果的返回方式为 Guard 标准返回方式，参考 [这里](../develop.md)。也就是说，如果之前已经实现了基础的登录界面，添加“Google 登录”能力就只需要放置一个语义化的按钮。

然后在 java 代码里面处理事件

```java
GoogleLoginButton button = findViewById(R.id.btn_google_login);
button.setOnLoginListener((ok, data) -> {
    if (ok) {
        // 登录成功，data 是用户信息
    } else {
        // 登录失败
    }
});
```



* 如果不想使用我们内置的按钮，则可以在自己按钮的点击事件里面调用 Authing Google 登录登录 API：

```java
Google google = new Google();
google.login(appContext, ((ok, data) -> {
    if (ok) {
        // 登录成功，data 是用户信息
    } else {
        // 登录失败
    }
}));
```



- 如果想完全自己实现 Google 登录，拿到授权码后，可以调用下面 API 换取 Authing 用户信息：

```java
public static void loginByGoogle(String authCode, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

* *`authCode`* Google 授权码

**示例**

```java
AuthClient.loginByGoogle(authCode, (code, message, userInfo)->{
    if (code == 200) {
        // userInfo：用户信息
    }
});
```