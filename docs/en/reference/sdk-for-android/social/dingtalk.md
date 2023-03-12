# Login by DingTalk

<LastUpdated/>

## Preparatory work

Configure in [DingTalk open platform](https://open.dingtalk.com/) and [Authing Console](https://authing.cn/)，See [Preparing for  DingTalk](../../../guides/connections/social/dingtalk-mobile/README.md)、[DingTalk document](https://open.dingtalk.com/document/orgapp/android-platform-application-authorization-login-access)。

:::hint-info
This feature was added in android guard sdk 1.5.1 version.
:::

<br>

## Integrate DingTalk login steps

### Step 1：Add dependency

```groovy
implementation 'cn.authing:guard:+'
implementation 'com.alibaba.android:ddopenauth:1.5.0.8'
implementation 'com.alibaba.android:ddsharesdk:1.1.0'
```

:::hint-info
The Guard compileOnly relies on DingTalk sdk, which allows apps to import on demand, preventing the Guard aar package from getting bigger as more third party logins are supported. Therefore, every time a third-party identity source is added, the App needs to manually add the dependency of the identity source.
:::

**Precautions**

If you need to obfuscate code, add the following configuration to proguard.cfg to ensure proper use of the sdk:

```
-keep class com.android.dingtalk.openauth.**{*;}
```

### Step 2：Initialization Guard Android SDK

To initialize when the application starts:

```java
// context is application or initial activity
// ”AUTHING_APP_ID“ is obtained from the Authing console
Authing.init(context, "AUTHING_APP_ID");
Authing.setAuthProtocol(Authing.AuthProtocol.EOIDC)
```

### Step 3：Use in different scenarios

- #### Use in different scenarios

  Start the managed page where login authentication is required:

```java
// this is the activity context
AuthFlow.start(this);
```

By following the preceding steps, you can quickly and easily configure the Authing management console to automatically have the DingTalk login function. The login entry is displayed in the social login button list on the built-in login interface of the Guard.

- #### Use the DingTalk sign In button

  If you use the DingTalk login button we provide.

​		1. Add the following code to the layout file:

```xml
 <cn.authing.guard.social.DingTalkLoginButton
    android:id="@+id/btn_ding_talk_login"
    android:background="@drawable/authing_button_background"
    android:textColor="@color/white"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

​		2. Then handle the event in the code:

```java
DingTalkLoginButton button = findViewById(R.id.btn_ding_talk_login);
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

- #### Log in to the authorization class using DingTalk

  If you don't want to use our built-in buttons and want to implement the UI entirely yourself, you can call the `DingTalk` class authorization function inside the button click event, which integrates the business logic to pull up the DingTalk authorization login:

```java
DingTalk.getInstance().login(appContext, new AuthCallback<UserInfo>() {
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

- #### Log in to the API using DingTalk

  If you want to fully implement the DingTalk login UI and obtain the authorization code logic yourself, after obtaining the authorization code, you can call the following API in exchange for user information:

```java
public static void loginByDingTalk(String authCode, @NotNull AuthCallback<UserInfo> callback)
```

**param**

*`authCode`* DingTalk token

**example**

If you only need to get the user information (`username`, `nickname`, `name`, etc.) and `idToken`, call:

```java
AuthClient.loginByDingTalk(authCode, new AuthCallback<UserInfo>() {
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
oidcClient.loginByDingTalk(authCode, new AuthCallback<UserInfo>() {
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

