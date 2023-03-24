# Login by GitLab

<LastUpdated/>

## Preparatory work

Configure in [GitLab](https://github.com/settings/developers) and [Authing Console](https://authing.cn/)，See [Preparing for GitLab](../../../guides/connections/social/gitlab-mobile/README.md)、[GitLab document](https://docs.gitlab.cn/jh/api/oauth2.html#pkce-%E6%8E%88%E6%9D%83%E7%A0%81%E6%B5%81%E7%A8%8B)。

:::hint-info
This feature was added in android guard sdk 1.5.4 version.
:::

<br>

## Integrate GitLab login steps

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

By following the preceding steps, you can quickly and easily configure the Authing management console to automatically have the GitLab login function. The login entry is displayed in the social login button list on the built-in login interface of the Guard.

- #### Use the GitLab sign In button

  If you use the GitLab login button we provide.

​		1. Add the following code to the layout file:

```xml
 <cn.authing.guard.social.view.GitLabLoginButton
    android:id="@+id/btn_login"
    android:background="@drawable/authing_button_background"
    android:textColor="@color/white"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

​		2. Then handle the event in the code:

```java
GitLabLoginButton button = findViewById(R.id.btn_login);
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

- #### Log in to the authorization class using GitLab

  If you don't want to use our built-in buttons and want to implement the UI entirely yourself, you can call the `GitLab` class authorization function inside the button click event, which integrates the business logic to pull up the GitLab authorization login:

```java
GitLab.getInstance().login(appContext, new AuthCallback<UserInfo>() {
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

**Note: When using the GitLab login button or the GitLab login authorization class, you need to add the following code to the Activity's onActivityResult function:**

```java
@Override
protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    GitLab.getInstance().onActivityResult(requestCode, resultCode, data);
}
```

- #### Log in to the API using GitLab

  If you want to fully implement the GitLab login UI and obtain the authorization code logic yourself, after obtaining the authorization code, you can call the following API in exchange for user information:

```java
public static void loginByGitLab(String authCode, @NotNull AuthCallback<UserInfo> callback)
```

**param**

*`authCode`* GitLab authCode

**example**

If you only need to get the user information (`username`, `nickname`, `name`, etc.) and `idToken`, call:

```java
AuthClient.loginByGitLab(authCode, new AuthCallback<UserInfo>() {
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
oidcClient.loginByGitLab(authCode, new AuthCallback<UserInfo>() {
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

