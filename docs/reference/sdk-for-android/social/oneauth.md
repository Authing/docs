# 手机号一键登录

<LastUpdated/>

## 准备工作

在[易盾服务管理后台 ](https://dun.163.com/dashboard#/m/verification/index)及 [Authing Console 控制台](https://authing.cn/) 进行配置，请参阅 [网易易盾（一键登录）](../../../guides/oneauth/README.md)。

<br>

## 集成一键登录登录步骤

### 第一步：添加依赖

```groovy
implementation 'cn.authing:guard:+'
implementation 'io.github.yidun:quicklogin:3.1.1'
```

> Guard 只是 compileOnly 依赖易盾，这样可以让 App 按需引入，防止 Guard aar 包随着支持的第三方登录增加而越来越大。所以每增加一个第三方身份源，都需要 App 手动加上该身份源的依赖

混淆配置，请参考[易盾官方混淆规则](https://support.dun.163.com/documents/287305921855672320?docId=424017619994976256#%E6%B7%B7%E6%B7%86%E9%85%8D%E7%BD%AE)

### 第二步：初始化 Guard Android SDK

在应用启动的时候初始化：

```java
// context is application or initial activity
// ”AUTHING_APP_ID“ is obtained from the Authing console
Authing.init(context, "AUTHING_APP_ID");
Authing.setAuthProtocol(Authing.AuthProtocol.EOIDC)
```



**通过以上步骤即可简单快速的通过 Authing 管理控制台配置后自动拥有一键登录功能，登录入口会在 Guard 内置登录界面的社会化登录按钮列表中体现**



* 接下来，如果使用我们提供的一键登录按钮，则在布局文件里面加上（或者代码初始化添加）

```xml
 <cn.authing.guard.oneclick.OneClickAuthButton
    android:id="@+id/btn_one_click_login"
    android:background="@drawable/authing_button_background"
    android:textColor="@color/white"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

认证结果的返回方式为 Guard 标准返回方式，参考 [这里](../develop.md)。也就是说，如果之前已经实现了基础的登录界面，添加“手机号一键登录”能力就只需要放置一个语义化的按钮。

然后在 java 代码里面处理事件

```java
OneClickAuthButton button = findViewById(R.id.btn_one_click_login);
button.setOnLoginListener((ok, data) -> {
    if (ok) {
        // 登录成功，data 是用户信息
    } else {
        // 登录失败
    }
});
```

<br>

* 如果不想使用我们内置的按钮，则可以在自己按钮的点击事件里面调用 Authing 一键登录登录 API：

```java
OneClick onClick = new OneClick(appContext);
onClick.start("your_yidun_business_id", null, new AuthCallback<UserInfo>() {
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

<br>

* 若需要自定义 UI，首先参考 [易盾文档](https://gitee.com/netease_yidun/quickpass-android-demo) 生成 UnifyUiConfig 对象，然后调用：

```java
UnifyUiConfig config = new UnifyUiConfig.Builder()
                 // build your config here
                .build(this);
new OneClick(this).start("your_yidun_business_id", config, ((code, message, userInfo) -> {
    if (code == 200) {
       // 登录成功，data 是用户信息
    } else {
       // 登录失败
    }
}));
```

`data` 包含 `idToken` 以及用户信息（`用户名`、`昵称`、`姓名`等）。

<br>

- 若想基于易盾自己实现一键登录流程，在拿到 `token` 和 `access token` 后，可以调用：

```java
public static void loginByOneAuth(String token, String accessToken, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

- *`token`* 运营商返回
- *`accessToken`* 运营商返回

**示例**

如果你只需要获取到用户信息（`用户名`、`昵称`、`姓名`等）和 `idToken`，调用：

```java
AuthClient.loginByOneAuth(authCode, new AuthCallback<UserInfo>() {
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
oidcClient.loginByOneAuth(authCode, new AuthCallback<UserInfo>() {
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

