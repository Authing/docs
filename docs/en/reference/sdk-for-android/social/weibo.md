# Login by Weibo

<LastUpdated/>

## Preparatory work

Configure in [Weibo open platform](https://open.weibo.com/) and [Authing Console](https://authing.cn/)，See [Preparing for  Weibo](../../../guides/connections/social/weibo-mobile/README.md)、[Weibo document](https://open.weibo.com/apps/884123079/info/basic)。

:::hint-info
This feature was added in android guard sdk 1.5.0 version.
:::

<br>

## Integrate Weibo login steps

### Step 1：Add dependency

```groovy
implementation 'cn.authing:guard:+'
implementation 'io.github.sinaweibosdk:core:12.5.0@aar'
```

:::hint-info
The Guard compileOnly relies on sinaweibosdk, which allows apps to import on demand, preventing the Guard aar package from getting bigger as more third party logins are supported. Therefore, every time a third-party identity source is added, the App needs to manually add the dependency of the identity source.
:::

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

By following the preceding steps, you can quickly and easily configure the Authing management console to automatically have the Weibo login function. The login entry is displayed in the social login button list on the built-in login interface of the Guard.

- #### Use the Weibo sign In button

  If you use the Weibo login button we provide.

​		1. Add the following code to the layout file:

```xml
 <cn.authing.guard.social.view.WeiboLoginButton
    android:id="@+id/btn_weibo_login"
    android:background="@drawable/authing_button_background"
    android:textColor="@color/white"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

​		2. Then handle the event in the code:

```java
WeiboLoginButton button = findViewById(R.id.btn_weibo_login);
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

- #### Log in to the authorization class using Weibo

  If you don't want to use our built-in buttons and want to implement the UI entirely yourself, you can call the `Weibo` class authorization function inside the button click event, which integrates the business logic to pull up the Weibo authorization login:

```java
Weibo.getInstance().login(appContext, new AuthCallback<UserInfo>() {
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

**Note: When using the Weibo login button or the Weibo login authorization class, you need to add the following code to the Activity's onActivityResult function:**

```java
@Override
protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    Weibo.getInstance().onActivityResult(this, requestCode, resultCode, data);
}
```

- #### Log in to the API using Weibo

  If you want to fully implement the Weibo login UI and obtain the authorization code logic yourself, after obtaining the authorization code, you can call the following API in exchange for user information:

```java
public static void loginByWeibo(String accessToken, @NotNull AuthCallback<UserInfo> callback)
```

**param**

*`accessToken`* Weibo token

**example**

If you only need to get the user information (`username`, `nickname`, `name`, etc.) and `idToken`, call:

```java
AuthClient.loginByWeibo(accessToken, new AuthCallback<UserInfo>() {
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
oidcClient.loginByWeibo(accessToken, new AuthCallback<UserInfo>() {
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

