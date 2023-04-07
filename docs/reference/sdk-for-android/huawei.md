# 华为登录

<LastUpdated/>

## 准备工作

**配置工作**：在 [华为终端开发者平台](https://developer.huawei.com/consumer/cn/appgallery/) 及 [Authing Console 控制台](https://authing.cn/)进行应用配置，请参阅 [华为接入准备](../../../guides/connections/social/huawei-mobile/README.md)。

**开发参阅**：请参阅 [华为官方文档](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/android-introduction-0000001098842325)，目前我们使用华为账号服务的 Authorization Code模式接入华为帐号（OAuth 2.0），请先完成  [配置AppGallery Connect](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/config-agc-0000001050196065)。

:::hint-info
此功能在 android guard sdk 1.5.6 版本新增。

非华为手机需要安装 HMS Core。

:::

<br>

## 集成步骤

### 第一步：集成 HMS Core

请参考 [集成HMS Core SDK](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/as-integration-hms-core-sdk-0000001050436235) 、[配置混淆脚本](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/config-obfuscation-script-0000001056835760) 先完成环境配置。

### 第二步：添加依赖

```groovy
dependencies {
    implementation 'cn.authing:guard:+'
  	implementation 'com.huawei.hms:hwid:6.9.0.301'
}
```

:::hint-info
Guard 只是 compileOnly 依赖 HMS Core sdk，这样可以让 App 按需引入，防止 Guard aar 包随着支持的第三方登录增加而越来越大。所以每增加一个第三方身份源，都需要 App 手动加上该身份源的依赖。
:::

### 第三步：初始化

在应用启动的时候初始化 Guard Android SDK：

```java
// context is application or initial activity
// ”AUTHING_APP_ID“ is obtained from the Authing console
Authing.init(context, "AUTHING_APP_ID");
Authing.setAuthProtocol(Authing.AuthProtocol.EOIDC)
```


### 第四步：分场景使用

#### 使用托管页
在需要登录认证的地方启动托管页：

```java
// this is the activity context
AuthFlow.start(this);
```

通过以上步骤即可简单快速地通过配置 Authing 管理控制台后自动拥有华为登录功能，登录入口会在 Guard 内置登录界面的社会化登录按钮列表中体现。

#### 使用登录按钮

如果使用我们提供的小米登录按钮。

1. 布局文件里面加上如下代码：

```xml
 <cn.authing.guard.social.view.HuaWeiLoginButton
    android:id="@+id/btn_login"
    android:background="@drawable/authing_button_background"
    android:textColor="@color/white"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

2. 然后在代码里面处理事件：

```java
HuaWeiLoginButton button = findViewById(R.id.btn_login);
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

#### 使用登录授权类
如果不想使用我们内置的按钮，想完全自己实现 UI，则可以在按钮的点击事件里面调用 `HuaWei` 类的授权函数，此类集成了拉起华为授权登录的业务逻辑：

```java
HuaWei.getInstance().login(appContext, new AuthCallback<UserInfo>() {
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

**注意：使用登录按钮或者登录授权类时，需要在 Activity 的 onActivityResult 函数中加入如下代码：**

```java
@Override
protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    HuaWei.getInstance().onActivityResult(requestCode, resultCode, data);
}
```

#### 使用登录 API 

如果想完全自己实现华为登录 UI 以及获取授权码逻辑，拿到授权码后，可以调用下面 API 换取用户信息：

```java
public static void loginByHuaWei(String authCode, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

*`authCode`* 华为 authCode

**示例**

如果你只需要获取到用户信息（`用户名`、`昵称`、`姓名`等）和 `idToken`，调用：

```java
AuthClient.loginByHuaWei(authCode, new AuthCallback<UserInfo>() {
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
oidcClient.loginByHuaWei(authCode, new AuthCallback<UserInfo>() {
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

