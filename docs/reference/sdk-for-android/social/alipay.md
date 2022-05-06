# 支付宝登录

<LastUpdated/>

1. 在这个页面下载 [支付宝 Android SDK](https://opendocs.alipay.com/open/54/104509)

>支付宝将 Android、iOS 的 SDK 和 Demo 打包到一个 zip 包里面，找到里面的安卓 SDK，拷贝到 app 的 libs 目录

2. 设置依赖：
```groovy
implementation 'cn.authing:guard:+'
implementation files('libs/alipaysdk.aar')
```

>Guard 只是 compileOnly 依赖支付宝 SDK，这样可以让 App 按需引入，防止 Guard aar 包随着支持的第三方登录增加而越来越大。所以每增加一个第三方身份源，都需要 App 手动加上该身份源的依赖

3. 在应用启动的时候初始化 Authing：
```java
// context is application or initial activity
// ”your_authing_app_id“ is obtained from the Authing console
Authing.init(context, "your_authing_app_id");
```

接下来，如果使用我们提供的支付宝登录按钮，则在布局文件里面加上（当然也可以用代码初始化）：

```xml
<cn.authing.guard.AlipayLoginButton
    android:id="@+id/btn_alipay_login"
    android:layout_width="44dp"
    android:layout_height="44dp"
    app:layout_constraintLeft_toLeftOf="parent"
    app:layout_constraintRight_toRightOf="parent"/>
```

然后在 java 代码里面处理事件：

```java
AlipayLoginButton button = findViewById(R.id.btn_alipay_login);
button.setOnLoginListener((ok, data) -> {
    if (ok) {
        // 登录成功，data 是用户信息
    } else {
        // 登录失败
    }
});
```

<br>

如果不想使用我们内置的按钮，则可以在自己按钮的点击事件里面调用：

```java
Alipay.login(appContext, ((ok, data) -> {
    if (ok) {
        // 登录成功，data 是用户信息
    } else {
        // 登录失败
    }
}));
```

如果想完全自己实现支付宝登录，拿到授权码后，可以调用下面 API 换取 Authing 用户信息：

```java
public static void loginByAlipay(String authCode, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

* *authCode* 支付宝授权码

**示例**

```java
AuthClient.loginByAlipay(authCode, (code, message, userInfo)->{
    if (code == 200) {
        // userInfo：用户信息
    }
});
```
