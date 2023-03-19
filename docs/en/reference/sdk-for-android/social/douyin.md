# Login by Douyin

<LastUpdated/>

## Preparatory work

Configure in [Douyin open platform](https://developer.open-douyin.com/) and [Authing Console](https://authing.cn/)，See [Preparing for Douyin](../../../guides/connections/social/douyin-mobile/README.md)、[Douyin document](https://developer.open-douyin.com/docs/resource/zh-CN/dop/develop/sdk/mobile-app/permission/android/permission-develop-guide)。

:::hint-info
This feature was added in android guard sdk 1.5.4 version.
:::

<br>

## Integrate Douyin login steps

### Step 1：Add dependency

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
The Guard compileOnly relies on douyin sdk, which allows apps to import on demand, preventing the Guard aar package from getting bigger as more third party logins are supported. Therefore, every time a third-party identity source is added, the App needs to manually add the dependency of the identity source.
:::

### Step 2：Initialization Guard Android SDK

To initialize when the application starts:

```java
// context is application or initial activity
// ”AUTHING_APP_ID“ is obtained from the Authing console
Authing.init(context, "AUTHING_APP_ID");
Authing.setAuthProtocol(Authing.AuthProtocol.EOIDC)
```

### Step 3：Create DouYinEntryActivity

1. Create a new `ddauth` folder in the directory corresponding to the package name and add `DouYinEntryActivity`. Suppose your package name is `com.example.myapp` and its contents only need to inherit from our implementation class:

```java
package com.example.myapp.douyinapi;

import cn.authing.guard.social.callback.douyinapi.DouYinCallBackActivity;

public class DouYinEntryActivity extends DouYinCallBackActivity {
}
```

2. Add a declaration to the project `AndroidManifest.xml`：

   ```xml
   <activity
     android:name=".douyinapi.DouYinEntryActivity"
     android:launchMode="singleTask"
     android:taskAffinity="you appliation packge name"
     android:exported="true">
   </activity>
   ```

### Step 4：Use in different scenarios

- #### Use in different scenarios

  Start the managed page where login authentication is required:

```java
// this is the activity context
AuthFlow.start(this);
```

By following the preceding steps, you can quickly and easily configure the Authing management console to automatically have the Douyin login function. The login entry is displayed in the social login button list on the built-in login interface of the Guard.

- #### Use the Douyin sign In button

  If you use the Douyin login button we provide.

​		1. Add the following code to the layout file:

```xml
 <cn.authing.guard.social.view.DouyinLoginButton
    android:id="@+id/btn_douyin_login"
    android:background="@drawable/authing_button_background"
    android:textColor="@color/white"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

​		2. Then handle the event in the code:

```java
DouyinLoginButton button = findViewById(R.id.btn_douyin_login);
button.setOnLoginListener(new AuthCallback<UserInfo>() {
    @Override
    public void call(int code, String message, UserInfo data) {
      	if (code == 200) {
        	// login success, data is user info.
       	} else {
        	// login fail
      	}
    }
});
```

- #### Log in to the authorization class using Douyin

  If you don't want to use our built-in buttons and want to implement the UI entirely yourself, you can call the `Douyin` class authorization function inside the button click event, which integrates the business logic to pull up the Douyin authorization login:

```java
Douyin.getInstance().login(appContext, new AuthCallback<UserInfo>() {
    @Override
    public void call(int code, String message, UserInfo data) {
        if (code == 200) {
        	// login success, data is user info.
       	} else {
        	// login fail
      	}
    }
});
```

​	`data` contains `idToken` and user information (`user name`, `nickname`, `name`, etc.).

- #### Log in to the API using Douyin

  If you want to fully implement the Douyin login UI and obtain the authorization code logic yourself, after obtaining the authorization code, you can call the following API in exchange for user information:

```java
public static void loginByDouYin(String accessToken, @NotNull AuthCallback<UserInfo> callback)
```

**param**

*`authCode`* Douyin authCode

**example**

If you only need to get the user information (`username`, `nickname`, `name`, etc.) and `idToken`, call:

```java
AuthClient.loginByDouYin(accessToken, new AuthCallback<UserInfo>() {
    @Override
    public void call(int code, String message, UserInfo data) {
        if (code == 200) {
          // login success, data is user info, contains idToken.
        } else {
          // login fail
        }
    }
});
```

If you only need to get the user information (`username`, `nickname`, `name`, etc.) and `idToken`、`accessToken` 和 `refreshToken`，call：

```java
OIDCClient oidcClient = new OIDCClient();
oidcClient.loginByDouYin(accessToken, new AuthCallback<UserInfo>() {
    @Override
    public void call(int code, String message, UserInfo data) {
        if (code == 200) {
          // ogin success, data is user info, contains idToken、accessToken and refreshToken.
        } else {
          // login fail
        }
    }
});
```

