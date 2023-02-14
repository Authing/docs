# 企业微信（代开发模式）登录

<LastUpdated/>

## 准备工作

在[企业微信服务商后台](https://open.work.weixin.qq.com/wwopen/developer#/index)及 [Authing Console 控制台](https://authing.cn/) 进行配置，请参阅[企业微信移动端（代开发模式）](../../../guides/connections/enterprise/wecom-agency-mobile/README.md)。

<br>

## 集成企业微信（代开发模式）登录步骤

### 第一步：添加依赖

- 下载[企业微信 SDK](http://dldir1.qq.com/foxmail/wwopen_docFile/sdk/lib_wwapi-2.0.12.11.aar)；
- 将下载的 sdk  jar 文件拷贝到工程的 libs 目录下；
- 在工程的 build.gradle 文件中引入该 jar，引入相关依赖项。

```groovy
implementation 'cn.authing:guard:+'
implementation files('libs/lib_wwapi-2.0.12.11.aar')
```

> Guard 只是 compileOnly 依赖企业微信，这样可以让 App 按需引入，防止 Guard aar 包随着支持的第三方登录增加而越来越大。所以每增加一个第三方身份源，都需要 App 手动加上该身份源的依赖

​	如果需要混淆代码，为了保证sdk的正常使用，需要在proguard.cfg加上下面两行配置：

```
-keep class com.tencent.wework.api.** {   
		*; 
}
```

### 第二步：初始化 Guard Android SDK

在应用启动的时候初始化：

```java
// context is application or initial activity
// ”AUTHING_APP_ID“ is obtained from the Authing console
Authing.init(context, "AUTHING_APP_ID");
Authing.setAuthProtocol(Authing.AuthProtocol.EOIDC)
```



**通过以上步骤即可简单快速的通过 Authing 管理控制台配置后自动获取企业微信身份源，登录入口会在 Guard 内置登录界面的社会化登录按钮列表中体现**



- 接下来，如果使用我们提供的企业微信登录按钮，则在布局文件里面加上（当然也可以用代码初始化）：


```xml
<cn.authing.guard.WeComLoginButton
    android:id="@+id/btn_wecom_login"
    android:layout_width="44dp"
    android:layout_height="44dp"
    app:layout_constraintLeft_toLeftOf="parent"
    app:layout_constraintRight_toRightOf="parent"/>
```

然后在 java 代码里面处理事件：

```java
WeComLoginButton button = findViewById(R.id.btn_wecom_login);
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

- 如果不想使用我们内置的按钮，则可以在自己按钮的点击事件里面调用 Authing 企业微信登录授权类：

```java
WeCom weCom = new WeCom();
weCom.login(appContext, new AuthCallback<UserInfo>() {
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

`data` 包含用户信息（`用户名`、`昵称`、`姓名`等）以及 `idToken`。

<br>

- 如果想完全自己实现企业微信登录，拿到授权码后，可以调用下面 API 换取用户信息：


```java
public static void loginByWecom(String authCode, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

*`authCode`*  企业微信授权码

**示例**

如果你只需要获取到用户信息（`用户名`、`昵称`、`姓名`等）和 `idToken`，调用：

```java
AuthClient.loginByWecom(authCode, new AuthCallback<UserInfo>() {
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
oidcClient.loginByWecom(authCode, new AuthCallback<UserInfo>() {
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

