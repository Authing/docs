# 支付宝登录

<LastUpdated/>

## 准备工作

在[支付宝开放平台](https://open.alipay.com/)及 [Authing Console 控制台](https://authing.cn/)进行配置，请参阅[支付宝](../../../guides/connections/social/alipay-web/README.md)。

<br>


## 集成支付宝登录步骤

### 第一步：下载支付宝 SDK

在这个页面下载 [支付宝 Android SDK](https://opendocs.alipay.com/open/54/104509)

>支付宝将 Android、iOS 的 SDK 和 Demo 打包到一个 zip 包里面，找到里面的安卓 SDK，拷贝到 app 的 libs 目录

### 第二步：添加依赖

```groovy
implementation 'cn.authing:guard:+'
implementation files('libs/alipaysdk.aar')
```

>Guard 只是 compileOnly 依赖支付宝 SDK，这样可以让 App 按需引入，防止 Guard aar 包随着支持的第三方登录增加而越来越大。所以每增加一个第三方身份源，都需要 App 手动加上该身份源的依赖

### 第三步：初始化 Guard Android SDK

在应用启动的时候初始化：

```java
// context is application or initial activity
// ”AUTHING_APP_ID“ is obtained from the Authing console
Authing.init(context, "AUTHING_APP_ID");
```



**通过以上步骤即可简单快速的通过 Authing 管理控制台配置后自动获取飞书身份源，登录入口会在 Guard 内置登录界面的社会化登录按钮列表中体现**



- 接下来，如果使用我们提供的支付宝登录按钮，则在布局文件里面加上（当然也可以用代码初始化）：

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

<br>

- 如果不想使用我们内置的按钮，则可以在自己按钮的点击事件里面调用：


```java
Alipay alipay = new Alipy();
alipay.login(appContext, new AuthCallback<UserInfo>() {
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

`data` 包含 `idToken` 以及用户信息（`用户名`、`昵称`、`姓名`等）。

当你使用组件 `AlipayLoginButton`  或者登录授权类  `Alipay`  时，如果你还想获取到 `accessToken` 和 `refreshToken`，需要在调用

`Authing.init(context, “AUTHING_APP_ID”)` 之后调用 `Authing.setAuthProtocol(Authing.AuthProtocol.EOIDC)`，数据包含在回调的 `data` 中 。

- 如果想完全自己实现支付宝登录，拿到授权码后，可以调用下面 API 换取用户信息：


```java
public static void loginByAlipay(String authCode, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

*`authCode`* 支付宝授权码

**示例**

如果你只需要获取到用户信息（`用户名`、`昵称`、`姓名`等）和 `idToken`，调用：

```java
AuthClient.loginByAlipay(authCode, new AuthCallback<UserInfo>() {
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
oidcClient.loginByAlipay(authCode, new AuthCallback<UserInfo>() {
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
