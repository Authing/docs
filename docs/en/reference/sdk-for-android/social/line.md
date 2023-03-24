# Login by Line

<LastUpdated/>

## Preparatory work

Configure in [Line](https://developers.line.biz/) and [Authing Console](https://authing.cn/)，See [Preparing for Line](../../../guides/connections/social/line-mobile/README.md)、[Line document](https://developers.line.biz/en/docs/android-sdk/)。

:::hint-info
This feature was added in android guard sdk 1.5.5 version.
:::

<br>

## Integrate Line login steps

### Step 1：Add dependency

```groovy
repositories {
   mavenCentral()
}

dependencies {
  	implementation 'cn.authing:guard:+'
    implementation 'com.linecorp:linesdk:latest.release'
}
```

:::hint-info
The Guard compileOnly relies on line sdk, which allows apps to import on demand, preventing the Guard aar package from getting bigger as more third party logins are supported. Therefore, every time a third-party identity source is added, the App needs to manually add the dependency of the identity source.
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

By following the preceding steps, you can quickly and easily configure the Authing management console to automatically have the Line login function. The login entry is displayed in the social login button list on the built-in login interface of the Guard.

- #### Use the Line sign In button

  If you use the Line login button we provide.

​		1. Add the following code to the layout file:

```xml
 <cn.authing.guard.social.view.LineLoginButton
    android:id="@+id/btn_login"
    android:background="@drawable/authing_button_background"
    android:textColor="@color/white"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

​		2. Then handle the event in the code:

```java
LineLoginButton button = findViewById(R.id.btn_login);
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

- #### Log in to the authorization class using Line

  If you don't want to use our built-in buttons and want to implement the UI entirely yourself, you can call the `Line` class authorization function inside the button click event, which integrates the business logic to pull up the Line authorization login:

```java
Line.getInstance().login(appContext, new AuthCallback<UserInfo>() {
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

**Note: When using the Line login button or the Line login authorization class, you need to add the following code to the Activity's onActivityResult function:**

```java
@Override
protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    Line.getInstance().onActivityResult(requestCode, resultCode, data);
}
```

- #### Log in to the API using Line

  If you want to fully implement the Line login UI and obtain the authorization code logic yourself, after obtaining the authorization code, you can call the following API in exchange for user information:

```java
public static void loginByLine(String accessToken, String idToken, @NotNull AuthCallback<UserInfo> callback)
```

**param**

*`accessToken`* Line accessToken

*`idToken`* Line idToken

**example**

If you only need to get the user information (`username`, `nickname`, `name`, etc.) and `idToken`, call:

```java
AuthClient.loginByLine(accessToken, idToken, new AuthCallback<UserInfo>() {
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
oidcClient.loginByLine(ccessToken, idToken, new AuthCallback<UserInfo>() {
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

