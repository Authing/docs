# Login by Github

<LastUpdated/>

## Preparatory work

Configure in [Github](https://github.com/settings/developers) and [Authing Console](https://authing.cn/)，See [Preparing for  Github](../../../guides/connections/social/github-mobile/README.md)、[Github document](https://docs.github.com/zh/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)。

:::hint-info
This feature was added in android guard sdk 1.5.3 version.
:::

<br>

## Integrate Github login steps

### Step 1：Add dependency

```groovy
implementation 'cn.authing:guard:+'
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

By following the preceding steps, you can quickly and easily configure the Authing management console to automatically have the Github login function. The login entry is displayed in the social login button list on the built-in login interface of the Guard.

- #### Use the Github sign In button

  If you use the Github login button we provide.

​		1. Add the following code to the layout file:

```xml
 <cn.authing.guard.social.view.GithubLoginButton
    android:id="@+id/btn_github_login"
    android:background="@drawable/authing_button_background"
    android:textColor="@color/white"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

​		2. Then handle the event in the code:

```java
GithubLoginButton button = findViewById(R.id.btn_github_login);
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

- #### Log in to the authorization class using Github

  If you don't want to use our built-in buttons and want to implement the UI entirely yourself, you can call the `Github` class authorization function inside the button click event, which integrates the business logic to pull up the Github authorization login:

```java
Github.getInstance().login(appContext, new AuthCallback<UserInfo>() {
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

**Note: When using the Github login button or the Github login authorization class, you need to add the following code to the Activity's onActivityResult function:**

```java
@Override
protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    Github.getInstance().onActivityResult(this, requestCode, resultCode, data);
}
```

- #### Log in to the API using Github

  If you want to fully implement the Github login UI and obtain the authorization code logic yourself, after obtaining the authorization code, you can call the following API in exchange for user information:

```java
public static void loginByGithub(String authCode, @NotNull AuthCallback<UserInfo> callback)
```

**param**

*`authCode`* Github authCode

**example**

If you only need to get the user information (`username`, `nickname`, `name`, etc.) and `idToken`, call:

```java
AuthClient.loginByGithub(authCode, new AuthCallback<UserInfo>() {
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
oidcClient.loginByGithub(authCode, new AuthCallback<UserInfo>() {
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

