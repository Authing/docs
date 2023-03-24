# 抖音登录

<LastUpdated/>

## 准备工作

在 [抖音开放平台](https://developer.open-douyin.com/) 及 [Authing Console 控制台](https://authing.cn/)进行配置，请参阅 [抖音接入准备](../../../guides/connections/social/douyin-mobile/README.md)、[抖音官方文档](https://developer.open-douyin.com/docs/resource/zh-CN/dop/develop/sdk/mobile-app/permission/android/permission-develop-guide)。

:::hint-info
此功能在 android guard sdk 1.5.4 版本新增。
:::

<br>

## 集成抖音登录步骤

### 第一步：添加依赖

```groovy
//gradle文件中添加：
repositories {
    maven { url 'https://artifact.bytedance.com/repository/AwemeOpenSDK' }
}

dependencies {
    implementation 'cn.authing:guard:+'
		implementation 'com.bytedance.ies.ugc.aweme:opensdk-china-external:0.1.9.6'
		implementation 'com.bytedance.ies.ugc.aweme:opensdk-common:0.1.9.6'
}
```

:::hint-info
Guard 只是 compileOnly 依赖抖音 sdk，这样可以让 App 按需引入，防止 Guard aar 包随着支持的第三方登录增加而越来越大。所以每增加一个第三方身份源，都需要 App 手动加上该身份源的依赖。
:::

### 第二步：初始化 Guard Android SDK

在应用启动的时候初始化：

```java
// context is application or initial activity
// ”AUTHING_APP_ID“ is obtained from the Authing console
Authing.init(context, "AUTHING_APP_ID");
Authing.setAuthProtocol(Authing.AuthProtocol.EOIDC)
```

### 第三步：创建 DouYinEntryActivity

1. 在包名相应目录下新建 `douyinapi` 文件夹，并新增 `DouYinEntryActivity`，假设你的包名为 `com.example.myapp`，其内容只需要继承我们的实现类：

```java
package com.example.myapp.douyinapi;

import cn.authing.guard.social.callback.douyinapi.DouYinCallBackActivity;

public class DouYinEntryActivity extends DouYinCallBackActivity {
}
```

2. 在工程 `AndroidManifest.xml` 中添加声明：

   ```xml
   <activity
     android:name=".douyinapi.DouYinEntryActivity"
     android:launchMode="singleTask"
     android:taskAffinity="你的包名"
     android:exported="true">
   </activity>
   ```


### 第四步：分场景使用

- #### 使用托管页
  在需要登录认证的地方启动托管页：
```java
// this is the activity context
AuthFlow.start(this);
```

通过以上步骤即可简单快速地通过配置 Authing 管理控制台后自动拥有抖音登录功能，登录入口会在 Guard 内置登录界面的社会化登录按钮列表中体现。

- #### 使用抖音登录按钮
    如果使用我们提供的抖音登录按钮。

​		1. 布局文件里面加上如下代码：

```xml
 <cn.authing.guard.social.view.DouYinLoginButton
    android:id="@+id/btn_douyin_login"
    android:background="@drawable/authing_button_background"
    android:textColor="@color/white"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

​		2. 然后在代码里面处理事件：

```java
DouYinLoginButton button = findViewById(R.id.btn_douyin_login);
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

- #### 使用抖音登录授权类
  如果不想使用我们内置的按钮，想完全自己实现 UI，则可以在按钮的点击事件里面调用 `DouYin` 类的授权函数，此类集成了拉起抖音授权登录的业务逻辑：

```java
DouYin.getInstance().login(appContext, new AuthCallback<UserInfo>() {
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

- #### 使用抖音登录 API 

  如果想完全自己实现抖音登录 UI 以及获取授权码逻辑，拿到授权码后，可以调用下面 API 换取用户信息：

```java
public static void loginByDouYin(String accessToken, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

*`authCode`* 抖音 authCode

**示例**

如果你只需要获取到用户信息（`用户名`、`昵称`、`姓名`等）和 `idToken`，调用：

```java
AuthClient.loginByDouYin(accessToken, new AuthCallback<UserInfo>() {
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
oidcClient.loginByDouYin(accessToken, new AuthCallback<UserInfo>() {
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

