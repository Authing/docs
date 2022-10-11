# 手机号一键登录

<LastUpdated/>

集成手机号一键登录需要三个主要步骤：

1. 在网易易盾开放平台进行配置

2. 在 Authing 管理控制台进行配置

3. 集成 Android SDK

<br>

STEP1 和 STEP2 请参考：

[手机号一键登录配置](../../../guides/oneauth/README.md)



## STEP3：集成 Guard Android SDK 

1. 添加依赖

```groovy
implementation 'cn.authing:guard:+'
implementation 'io.github.yidun:quicklogin:3.1.1'
```

> Guard 只是 compileOnly 依赖飞书，这样可以让 App 按需引入，防止 Guard aar 包随着支持的第三方登录增加而越来越大。所以每增加一个第三方身份源，都需要 App 手动加上该身份源的依赖

2. 混淆配置，请参考[易顿官方混淆规则](https://support.dun.163.com/documents/287305921855672320?docId=424017619994976256#%E6%B7%B7%E6%B7%86%E9%85%8D%E7%BD%AE)
2. 在应用启动时初始化 Authing

```java
// context is application or initial activity
// ”AUTHING_APP_ID“ is obtained from the Authing console
Authing.init(context, "AUTHING_APP_ID");
```



**通过以上 3 步即可简单快速的通过 Authing 管理控制台配置后自动拥有一键登录功能，登录入口会在 Guard 内置登录界面的社会化登录按钮列表中体现**



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

* 如果不想使用我们内置的按钮，则可以在自己按钮的点击事件里面调用 Authing 一键登录登录 API：

```java
new oneClick(this).start("your_yidun_business_id", null, ((code, message, userInfo) -> {
    if (code == 200) {
        // userInfo：用户信息
    }
}));
```

* 若需要自定义 UI，首先参考 [易盾文档](https://gitee.com/netease_yidun/quickpass-android-demo) 生成 UnifyUiConfig 对象，然后调用：

```java
UnifyUiConfig config = new UnifyUiConfig.Builder()
                 // build your config here
                .build(this);
new OneClick(this).start("your_yidun_business_id", config, ((code, message, userInfo) -> {
    if (code == 200) {
        // userInfo：用户信息
    }
}));
```

- 若想基于易盾自己实现一键登录流程，在拿到 token 和 access token 后，可以调用：

```java
public static void loginByOneAuth(String token, String accessToken, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

- *token* 运营商返回
- *accessToken* 运营商返回

**示例**

```java
AuthClient.loginByOneAuth(token, accessToken, (code, message, userInfo)->{
    if (code == 200) {
        // userInfo：用户信息
    }
});
```