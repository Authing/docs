# Login by Kuaishou

<LastUpdated/>

## Preparatory work

Configure in [Kuaishou open platform](https://open.kuaishou.com/platform) and [Authing Console](https://authing.cn/)，See [Preparing for Kuaishou](../../../guides/connections/social/kuaishou-mobile/README.md)、[Kuaishou document](https://open.kuaishou.com/platform/openApi?menu=11)。

:::hint-info
This feature was added in android guard sdk 1.5.4 version.
:::

<br>

## Integrate Kuaishou login steps

### Step 1：Add dependency

```groovy
dependencies {
    implementation 'cn.authing:guard:+'
		implementation "com.github.kwaisocial:kwai-opensdk-withauth:3.0.4"
}
```

:::hint-info
The Guard compileOnly relies on kuaishou sdk, which allows apps to import on demand, preventing the Guard aar package from getting bigger as more third party logins are supported. Therefore, every time a third-party identity source is added, the App needs to manually add the dependency of the identity source.
:::

### Step 2：Application configuration

The following information needs to be configured in `build.gradle`  (Required)：

```groovy
android {
    defaultConfig {
        applicationId "com.kwai.chat.demo" // package name
        manifestPlaceholders = [
            "KWAI_APP_ID": "ks703687443040312600", // appId
            "KWAI_SCOPE" : "user_info" // Account authorization needs to apply for scope permissions. Multiple scopes can be divided by ",", which means what capabilities do users need to authorize
        ]
    }
}
```

### Step 3：Initialization Guard Android SDK

Initialize in `Application` :

```java
// context is application or initial activity
// ”AUTHING_APP_ID“ is obtained from the Authing console
Authing.init(context, "AUTHING_APP_ID");
Authing.setAuthProtocol(Authing.AuthProtocol.EOIDC)
KwaiAuthAPI.init(this);
```

### Step 4：Use in different scenarios

- #### Use in different scenarios

  Start the managed page where login authentication is required:

```java
// this is the activity context
AuthFlow.start(this);
```

By following the preceding steps, you can quickly and easily configure the Authing management console to automatically have the kuaishou login function. The login entry is displayed in the social login button list on the built-in login interface of the Guard.

- #### Use the Kuaishou sign In button

  If you use the Kuaishou login button we provide.

​		1. Add the following code to the layout file:

```xml
 <cn.authing.guard.social.view.KuaishouLoginButton
    android:id="@+id/btn_login"
    android:background="@drawable/authing_button_background"
    android:textColor="@color/white"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

​		2. Then handle the event in the code:

```java
KuaishouLoginButton button = findViewById(R.id.btn_login);
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

- #### Log in to the authorization class using Kuaishou

  If you don't want to use our built-in buttons and want to implement the UI entirely yourself, you can call the `Kuaishou` class authorization function inside the button click event, which integrates the business logic to pull up the Kuaishou authorization login:

```java
Kuaishou.getInstance().login(appContext, new AuthCallback<UserInfo>() {
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

- #### Log in to the API using Kuaishou

  If you want to fully implement the Kuaishou login UI and obtain the authorization code logic yourself, after obtaining the authorization code, you can call the following API in exchange for user information:

```java
public static void loginByKuaiShou(String accessToken, @NotNull AuthCallback<UserInfo> callback)
```

**param**

*`authCode`* Kuaishou authCode

**example**

If you only need to get the user information (`username`, `nickname`, `name`, etc.) and `idToken`, call:

```java
AuthClient.loginByKuaiShou(accessToken, new AuthCallback<UserInfo>() {
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
oidcClient.loginByKuaiShou(accessToken, new AuthCallback<UserInfo>() {
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

