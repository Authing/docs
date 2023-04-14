# OPPO 登录

<LastUpdated/>

## 准备工作

**配置工作**：在 [OPPO 开放平台](https://open.oppomobile.com/) 及 [Authing Console 控制台](https://authing.cn/) 进行应用申请以及配置，请参阅 [OPPO 接入准备](../../../guides/connections/social/oppo-mobile/README.md)。

**开发参阅**：请参阅 [OPPO 官方文档](https://open.oppomobile.com/new/developmentDoc/info?id=10156)。

:::hint-info
此功能在 android guard sdk 1.5.6 版本新增。
:::

<br>

## 集成步骤

### 第一步：添加依赖

1. 在项目的根目录的 build.gradle 文件的 `repositories` 节点下配置

```groovy
maven {
    url 'https://maven.columbus.heytapmobi.com/repository/maven-public/'
    credentials {
        username 'cmuser'
        password 'c0b08da17ery566c3870fed67789bcb36abc2e32'
    }
}
```

2. 在 app module 里面的 build.gradle 文件的 `dependencies` 节点下添加如下依赖

```groovy
dependencies {
    implementation 'cn.authing:guard:+'
    implementation 'com.heytap.msp.sdk:msp-sdk:1.10.1.2'
    implementation 'com.heytap.msp.sdk:msp-oauth-sdk:1.10.1.2'
}
```

:::hint-info
Guard 只是 compileOnly 依赖 oppo sdk，这样可以让 App 按需引入，防止 Guard aar 包随着支持的第三方登录增加而越来越大。所以每增加一个第三方身份源，都需要 App 手动加上该身份源的依赖。
:::

### 第二步：配置 AndroidManifest

在 AndroidManifest.xml 文件的 application 节点下配置MSP开放平台生成的 APPID。

```xml
<meta-data
    android:name="com.heytap.msp.client.appid"
    android:value="xxxxxxxx" />
```

### 第三步：**配置混淆脚本**

打开 Android Studio 工程的混淆配置文件 progurad-rules.pro，加入混淆配置

```none
-ignorewarning 
-keepattributes Annotation 
-keepattributes Exceptions 
-keepattributes InnerClasses 
-keepattributes Signature 
-keepattributes SourceFile,LineNumberTable 
-keepclassmembers enum * {
    public static [] values();
    public static ** valueOf(java.lang.String);
}
-keep class * implements android.os.Parcelable {
    public static final android.os.Parcelable$Creator ;
}
-keep class * implements java.io.Serializable{;}
-keep class com.bun.miitmdid. {;}
-keeppackagenames com.heytap.msp**
-keep class com.heytap.openid.sdk.HeytapIDSDK{;}
-keep class com.heytap.usercenter.{;}
-keep class com.platform.usercenter.annotation.Keep
-keep @com.platform.usercenter.annotation.Keep class * {;}
-keep interface com.heytap.msp.{;}
-keep class com.heytap.msp.sdk.base.**{;}

-keep class com.heytap.msp.sdk.SdkAgent{;}
-keep class com.heytap.msp.sdk.common.**{;}
-keep class com.heytap.msp.sdk.agent.AccountSdkAgent{;}
-keep class com.heytap.msp.sdk.AccountSdk{;}
-keep class com.heytap.msp.sdk.agent.OAuthSdkAgent{;}
-keep class com.heytap.msp.sdk.OAuthSdk{;}
-keep class com.platform.oms.**{*;}
```

### 第四步：初始化

在 Application 中初始化 Guard Android SDK：

```java
// context is application or initial activity
// ”AUTHING_APP_ID“ is obtained from the Authing console
Authing.init(context, "AUTHING_APP_ID");
Authing.setAuthProtocol(Authing.AuthProtocol.EOIDC)
SdkAgent.init(this);
```


### 第五步：分场景使用

#### 使用托管页
在需要登录认证的地方启动托管页：

```java
// this is the activity context
AuthFlow.start(this);
```

通过以上步骤即可简单快速地通过配置 Authing 管理控制台后自动拥有 OPPO 登录功能，登录入口会在 Guard 内置登录界面的社会化登录按钮列表中体现。

#### 使用登录按钮

如果使用我们提供的 OPPO 登录按钮。

​		1. 布局文件里面加上如下代码：

```xml
 <cn.authing.guard.social.view.OPPOLoginButton
    android:id="@+id/btn_login"
    android:background="@drawable/authing_button_background"
    android:textColor="@color/white"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

​		2. 然后在代码里面处理事件：

```java
OPPOLoginButton button = findViewById(R.id.btn_login);
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
如果不想使用我们内置的按钮，想完全自己实现 UI，则可以在按钮的点击事件里面调用 `OPPO` 类的授权函数，此类集成了拉起 OPPO 授权登录的业务逻辑：

```java
OPPO.getInstance().login(appContext, new AuthCallback<UserInfo>() {
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

#### 使用登录 API 

如果想完全自己实现华为登录 UI 以及获取授权码逻辑，拿到授权码后，可以调用下面 API 换取用户信息：

```java
public static void loginByOppo(String authCode, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

*`authCode`* OPPO authCode

**示例**

如果你只需要获取到用户信息（`用户名`、`昵称`、`姓名`等）和 `idToken`，调用：

```java
AuthClient.loginByOppo(authCode, new AuthCallback<UserInfo>() {
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
oidcClient.loginByOppo(authCode, new AuthCallback<UserInfo>() {
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

