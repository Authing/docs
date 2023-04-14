# Login by Google 

<LastUpdated/>

## Preparatory work

Configure in [Google API Console Credentials](https://console.cloud.google.com/apis/credentials) and [Authing Console](https://authing.cn/)，See [Google Mobile](../../../guides/connections/social/google-mobile/README.md)。

<br>

## Integrate steps

### Step 1：Add dependency

```groovy
implementation 'cn.authing:guard:+'
implementation 'com.google.android.gms:play-services-auth:20.2.0'
```

:::hint-info
The Guard compileOnly relies on gms, which allows apps to import on demand, preventing the Guard aar package from getting bigger as more third party logins are supported. Therefore, every time a third-party identity source is added, the App needs to manually add the dependency of the identity source.
:::

**Precautions**

If you need to obfuscate code, add the following configuration to proguard.cfg to ensure proper use of the sdk:

```
-keep class com.google.android.gms.** { *; }
```

### Step 2：Initialization 

To initialize Guard Android SDK when the application starts:

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

By following the preceding steps, you can quickly and easily configure the Authing management console to automatically have the FaceBook login function. The login entry is displayed in the social login button list on the built-in login interface of the Guard.

- #### Use the Google sign In button
    If you use the Google login button we provide.
    
    1. Add the following code to the layout file:

```xml
 <cn.authing.guard.social.view.GoogleLoginButton
    android:id="@+id/btn_login"
    android:background="@drawable/authing_button_background"
    android:textColor="@color/white"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

​		2.  Then handle the event in the code:

```java
GoogleLoginButton button = findViewById(R.id.btn_login);
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

- #### Log in to the authorization class using FaceBook
  
  If you don't want to use our built-in buttons and want to implement the UI entirely yourself, you can call the FaceBook class authorization function inside the button click event, which integrates the business logic to pull up the FaceBook authorization login:

```java
Google google = new Google();
google.login(appContext, new AuthCallback<UserInfo>() {
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

**Note: When using the Google login button or the FaceBook login authorization class, you need to add the following code to the Activity's onActivityResult function:**

```java
@Override
protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
  	// Guard SDK earlier than 1.5.3
    if (requestCode == Google.RC_SIGN_IN && data != null) {
        data.setAction("cn.authing.guard.broadcast.GOOGLE_LOGIN");
        sendBroadcast(data);
    }
  	// Guard SDK 1.5.3 and later
  	Google.getInstance().onActivityResult(requestCode, resultCode, data);
}
```

- #### Log into the API using Google

  If you want to fully implement the Google login UI and obtain the authorization code logic yourself, after obtaining the authorization code, you can call the following API in exchange for user information:

```java
public static void loginByGoogle(String authCode, @NotNull AuthCallback<UserInfo> callback)
```

**param**

*`authCode`* Google authentication code

**example**

If you only need to get the user information (`username`, `nickname`, `name`, etc.) and `idToken`, call:

```java
AuthClient.loginByGoogle(authCode, new AuthCallback<UserInfo>() {
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
oidcClient.loginByFaceBook(accessToken, new AuthCallback<UserInfo>() {
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

