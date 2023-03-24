# 快手登录

<LastUpdated/>

## 准备工作

在 [快手开放平台](https://open.kuaishou.com/platform) 及 [Authing Console 控制台](https://authing.cn/)进行配置，请参阅 [快手接入准备](../../../guides/connections/social/kuaishou-mobile/README.md)、[快手官方文档](https://open.kuaishou.com/platform/openApi?menu=11)。

:::hint-info
此功能在 android guard sdk 1.5.4 版本新增。
:::

<br>

## 集成快手登录步骤

### 第一步：添加依赖

```groovy
dependencies {
    implementation 'cn.authing:guard:+'
		implementation "com.github.kwaisocial:kwai-opensdk-withauth:3.0.4"
}
```

:::hint-info
Guard 只是 compileOnly 依赖快手 sdk，这样可以让 App 按需引入，防止 Guard aar 包随着支持的第三方登录增加而越来越大。所以每增加一个第三方身份源，都需要 App 手动加上该身份源的依赖。
:::

### 第二步：应用配置

接入方应用需要在 `build.gradle` 中配置如下信息（必须）：

```groovy
android {
    defaultConfig {
        applicationId "com.kwai.chat.demo" // 接入方的包名
        manifestPlaceholders = [
            "KWAI_APP_ID": "ks703687443040312600", // 申请分配的appId
            "KWAI_SCOPE" : "user_info" // 账号授权需要申请的scope权限，多个scope可以使用","分割，代表需要用户授权什么能力
        ]
    }
}
```

### 第三步：初始化 Guard Android SDK

在 `Application` 中初始化：

```java
// context is application or initial activity
// ”AUTHING_APP_ID“ is obtained from the Authing console
Authing.init(context, "AUTHING_APP_ID");
Authing.setAuthProtocol(Authing.AuthProtocol.EOIDC)
KwaiAuthAPI.init(this);
```


### 第四步：分场景使用

- #### 使用托管页
  在需要登录认证的地方启动托管页：
```java
// this is the activity context
AuthFlow.start(this);
```

通过以上步骤即可简单快速地通过配置 Authing 管理控制台后自动拥有快手登录功能，登录入口会在 Guard 内置登录界面的社会化登录按钮列表中体现。

- #### 使用快手录按钮
    如果使用我们提供的快手登录按钮。

​		1. 布局文件里面加上如下代码：

```xml
 <cn.authing.guard.social.view.KuaiShouLoginButton
    android:id="@+id/btn_login"
    android:background="@drawable/authing_button_background"
    android:textColor="@color/white"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

​		2. 然后在代码里面处理事件：

```java
KuaiShouLoginButton button = findViewById(R.id.btn_login);
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

- #### 使用快手登录授权类
  如果不想使用我们内置的按钮，想完全自己实现 UI，则可以在按钮的点击事件里面调用 `KuaiShou` 类的授权函数，此类集成了拉起快手授权登录的业务逻辑：

```java
KuaiShou.getInstance().login(appContext, new AuthCallback<UserInfo>() {
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

- #### 使用快手登录 API 

  如果想完全自己实现快手登录 UI 以及获取授权码逻辑，拿到授权码后，可以调用下面 API 换取用户信息：

```java
public static void loginByKuaiShou(String accessToken, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

*`authCode`* 快手 authCode

**示例**

如果你只需要获取到用户信息（`用户名`、`昵称`、`姓名`等）和 `idToken`，调用：

```java
AuthClient.loginByKuaiShou(accessToken, new AuthCallback<UserInfo>() {
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
oidcClient.loginByKuaiShou(accessToken, new AuthCallback<UserInfo>() {
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

