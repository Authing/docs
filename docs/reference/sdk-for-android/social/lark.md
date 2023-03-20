# 飞书登录

<LastUpdated/>

## 准备工作

企业自建应用在[飞书开发者后台](https://open.feishu.cn/app) 及 [Authing Console 控制台](https://authing.cn/)进行配置，请参阅[飞书企业自建应用](https://docs.authing.cn/v2/connections/lark-internal-mobile/)。

<br>

## 集成飞书登录步骤

### 第一步：添加依赖

- 下载[飞书授权 sdk 库](https://sf3-cn.feishucdn.com/obj/lark-eco-passport/LarkSSOSDKAndroid-3.0.8.zip)；
- 将下载的 sdk aar 文件拷贝到 app/libs 目录下；
- 在 app 的 build.gradle 文件中引入该 aar，引入相关依赖项。

```groovy
implementation 'cn.authing:guard:+'
implementation files ('libs/larksso-3.0.8.aar')
implementation 'com.alibaba:fastjson:1.1.58.android'
```

> Guard 只是 compileOnly 依赖飞书，这样可以让 App 按需引入，防止 Guard aar 包随着支持的第三方登录增加而越来越大。所以每增加一个第三方身份源，都需要 App 手动加上该身份源的依赖

### 第二步：初始化 Guard Android SDK

在应用启动的时候初始化：

```java
// context is application or initial activity
// ”AUTHING_APP_ID“ is obtained from the Authing console
Authing.init(context, "AUTHING_APP_ID");
Authing.setAuthProtocol(Authing.AuthProtocol.EOIDC)
```





**通过以上步骤即可简单快速的通过 Authing 管理控制台配置后自动获取飞书身份源，登录入口会在 Guard 内置登录界面的社会化登录按钮列表中体现**




- 接下来，如果使用我们提供的飞书登录按钮，则在布局文件里面加上（或者代码初始化添加）

```xml
<cn.authing.guard.social.view.LarkLoginButton
    android:id="@+id/btn_lark_login"
    android:layout_width="48dp"
    android:layout_height="48dp" />
```

然后在 java 代码里面处理事件

```java
LarkLoginButton button = findViewById(R.id.btn_lark_login);
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

- 如果不想使用我们内置的按钮，则可以在自己按钮的点击事件里面调用 Authing 飞书登录授权类

```java
Lark lark = new Lark();
lark.login(appContext, new AuthCallback<UserInfo>() {
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



**注意：使用飞书登录按钮或者飞书登录授权类时，需要在 Activity 的 onResume、onNewIntent、onActivityResult 函数中加入如下代码：**

```java
@Override
protected void onResume() {
    super.onResume();
    try {
        Class.forName("com.ss.android.larksso.LarkSSO");
        LarkSSO.inst().parseIntent(this, getIntent());
    } catch( ClassNotFoundException e ) {
    }
}

@Override
protected void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    try {
        Class.forName("com.ss.android.larksso.LarkSSO");
        LarkSSO.inst().parseIntent(this, intent);
    } catch( ClassNotFoundException e ) {
    }
}

@Override
protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    try {
        Class.forName("com.ss.android.larksso.LarkSSO");
        LarkSSO.inst().parseIntent(this, data);
    } catch( ClassNotFoundException e ) {
    }
}
```

<br>

- 如果想完全自己实现飞书登录，拿到授权码后，可以调用下面 API 换取用户信息

```java
public static void loginByLark(String authCode, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

*`authCode`* 飞书授权码

**示例**

如果你只需要获取到用户信息（`用户名`、`昵称`、`姓名`等）和 `idToken`，调用：

```java
AuthClient.loginByLark(authCode, new AuthCallback<UserInfo>() {
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
oidcClient.loginByLark(authCode, new AuthCallback<UserInfo>() {
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

