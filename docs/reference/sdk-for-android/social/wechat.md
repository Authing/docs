# 微信登录

<LastUpdated/>

## 准备工作

在[微信开放平台](https://open.weixin.qq.com/cgi-bin/index?t=home/index&lang=zh_CN)及 [Authing Console 控制台](https://authing.cn/) 进行配置，请参阅[微信移动端](../../../guides/connections/social/wechat-mobile/README.md)。

<br>

## 集成微信登录步骤

### 第一步：添加依赖

```groovy
implementation 'cn.authing:guard:+'
implementation 'com.tencent.mm.opensdk:wechat-sdk-android:6.8.0'
```

>Guard 只是 compileOnly 依赖微信，这样可以让 App 按需引入，防止 Guard aar 包随着支持的第三方登录增加而越来越大。所以每增加一个第三方身份源，都需要 App 手动加上该身份源的依赖

### 第二步：初始化 Guard Android SDK

在应用启动的时候初始化：

```java
// context is application or initial activity
// ”AUTHING_APP_ID“ is obtained from the Authing console
Authing.init(context, "AUTHING_APP_ID");
```

### 第三步：创建WXEntryActivity

由于微信的限制，必须在应用包名所在的目录下创建一个 wxapi/WXEntryActivity。假设你的应用包名为：

com.example.myapp

则需要按照如下方式创建：

![](./images/wechat/wxentry.png)

其内容只需要继承我们的实现类：

```java
package com.example.myapp.wxapi;

import cn.authing.guard.social.wechat.WXCallbackActivity;

public class WXEntryActivity extends WXCallbackActivity {
}
```

### 第四步：在 Manifest 里面声明微信回调 Activity

```xml
<activity
    android:name=".wxapi.WXEntryActivity"
    android:exported="true" />
```



**通过以上步骤即可简单快速的通过 Authing 管理控制台配置后自动获取微信身份源，登录入口会在 Guard 内置登录界面的社会化登录按钮列表中体现**



- 接下来，如果使用我们提供的微信登录按钮，则在布局文件里面加上（当然也可以用代码初始化）：


```xml
<cn.authing.guard.WechatLoginButton
    android:id="@+id/btn_wechat_login"
    android:layout_width="44dp"
    android:layout_height="44dp"
    app:layout_constraintLeft_toLeftOf="parent"
    app:layout_constraintRight_toRightOf="parent"/>
```

然后在 java 代码里面处理事件：

```java
WechatLoginButton wechatLoginButton = findViewById(R.id.btn_wechat_login);
wechatLoginButton.setOnLoginListener(new AuthCallback<UserInfo>() {
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

- 如果不想使用我们内置的按钮，则可以在自己按钮的点击事件里面调用 Authing 微信登录 API：


```java
Wechat wechat = new Wechat();
wechat.login(appContext, new AuthCallback<UserInfo>() {
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

当你使用组件 `WechatLoginButton`  或者登录授权类 `Wechat`  时，如果你还想获取到 `accessToken` 和 `refreshToken`，需要在调用

`Authing.init(context, “AUTHING_APP_ID”)` 之后调用 `Authing.setAuthProtocol(Authing.AuthProtocol.EOIDC)`，数据包含在回调的 `data` 中 。

<br>

- 如果想完全自己实现微信登录，拿到授权码后，可以调用下面 API 换取用户信息：


```java
public static void loginByWechat(String authCode, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

*`authCode`* 微信授权码

**示例**

如果你只需要获取到用户信息（`用户名`、`昵称`、`姓名`等）和 `idToken`，调用：

```java
AuthClient.loginByWechat(authCode, new AuthCallback<UserInfo>() {
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
oidcClient.loginByWechat(authCode, new AuthCallback<UserInfo>() {
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
