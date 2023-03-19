# Google 登录

<LastUpdated/>

## 准备工作

在 [Google API Console Credentials](https://console.cloud.google.com/apis/credentials) 及 [Authing Console 控制台](https://authing.cn/)进行配置，请参阅 [Google 移动端](../../../guides/connections/social/google-mobile/README.md)。

<br>

## 集成 Google 登录步骤

### 第一步：添加依赖

```groovy
implementation 'cn.authing:guard:+'
implementation 'com.google.android.gms:play-services-auth:20.2.0'
```

:::hint-info
Guard 只是 compileOnly 依赖 gms，这样可以让 App 按需引入，防止 Guard aar 包随着支持的第三方登录增加而越来越大。所以每增加一个第三方身份源，都需要 App 手动加上该身份源的依赖。
:::

**注意事项**

如果需要混淆代码，为了保证 sdk 的正常使用，需要在 proguard.cfg 加上下面配置：

```
-keep class com.google.android.gms.** { *; }
```

### 第二步：初始化 Guard Android SDK

在应用启动的时候初始化：

```java
// context is application or initial activity
// ”AUTHING_APP_ID“ is obtained from the Authing console
Authing.init(context, "AUTHING_APP_ID");
Authing.setAuthProtocol(Authing.AuthProtocol.EOIDC)
```

### 第三步：分场景使用

- #### 使用托管页
  在需要登录认证的地方启动托管页：
```java
// this is the activity context
AuthFlow.start(this);
```

通过以上步骤即可简单快速地通过配置 Authing 管理控制台后自动拥有 Google 登录功能，登录入口会在 Guard 内置登录界面的社会化登录按钮列表中体现。

- #### 使用 Google 登录按钮
    如果使用我们提供的 Google 登录按钮。

​		1. 布局文件里面加上（或者代码初始化添加）如下代码：

```xml
 <cn.authing.guard.social.view.GoogleLoginButton
    android:id="@+id/btn_google_login"
    android:background="@drawable/authing_button_background"
    android:textColor="@color/white"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

​		2. 然后在代码里面处理事件：

```java
GoogleLoginButton button = findViewById(R.id.btn_google_login);
button.setOnLoginListener(new AuthCallback<UserInfo>() {
    @Override
    public void call(int code, String message, UserInfo data) {
      	if (code == 200) {
        	// 登录成功，data 是用户信息
       	} else {
        	// 登录失败
      	}
    }
});
```

- #### 使用 Google 登录授权类
  如果不想使用我们内置的按钮，想完全自己实现 UI，则可以在按钮的点击事件里面调用 Google 类的授权函数，此类集成了拉起  Google 授权登录的业务逻辑：

```java
Google google = new Google();
google.login(appContext, new AuthCallback<UserInfo>() {
    @Override
    public void call(int code, String message, UserInfo data) {
        if (code == 200) {
          // 登录成功，data 是用户信息
        } else {
          // 登录失败
        }
    }
});
```

​	`data` 包含 `idToken` 以及用户信息（`用户名`、`昵称`、`姓名`等）。

**注意：使用 Google 登录按钮或者 Google 登录授权类时，需要在 Activity 的 onActivityResult 函数中加入如下代码：**

```java
@Override
protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
  	// Guard SDK 1.5.3 之前版本
    if (requestCode == Google.RC_SIGN_IN && data != null) {
        data.setAction("cn.authing.guard.broadcast.GOOGLE_LOGIN");
        sendBroadcast(data);
    }
  	// Guard SDK 1.5.3 及之后版本
  	Google.getInstance().onActivityResult(this, requestCode, resultCode, data);
}
```

- #### 使用 Google 登录 API 

  如果想完全自己实现 Google 登录 UI 以及获取授权码逻辑，拿到授权码后，可以调用下面 API 换取用户信息：

```java
public static void loginByGoogle(String authCode, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

*`authCode`* Google 授权码

**示例**

如果你只需要获取到用户信息（`用户名`、`昵称`、`姓名`等）和 `idToken`，调用：

```java
AuthClient.loginByGoogle(authCode, new AuthCallback<UserInfo>() {
    @Override
    public void call(int code, String message, UserInfo data) {
        if (code == 200) {
          // 登录成功，data 是用户信息, 包含 idToken。
        } else {
          // 登录失败
        }
    }
});
```

如果你需要获取到用户信息（`用户名`、`昵称`、`姓名`等）、`idToken`、`accessToken` 和 `refreshToken`，调用：

```java
OIDCClient oidcClient = new OIDCClient();
oidcClient.loginByGoogle(authCode, new AuthCallback<UserInfo>() {
    @Override
    public void call(int code, String message, UserInfo data) {
        if (code == 200) {
          // 登录成功，data 是用户信息, 包含 idToken、accessToke and refreshToken。
        } else {
          // 登录失败
        }
    }
});
```

