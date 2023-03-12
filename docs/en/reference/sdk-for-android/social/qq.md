# Login by QQ

<LastUpdated/>

## Preparatory work

Configure in [QQ open platform](https://connect.qq.com/index.html/) and [Authing Console](https://authing.cn/)，See [Preparing for  QQ](../../../guides/connections/social/qq-mobile/README.md)、[QQ document](https://wiki.connect.qq.com/qq%e7%99%bb%e5%bd%95)。

:::hint-info
This feature was added in android guard sdk 1.5.0 version.
:::

<br>

## Integrate QQ login steps

### Step 1：Add dependency

1. Add the `jcenter` reference to `build.gradle` in the project root directory：

```groovy
jcenter() 
```

2. Add dependencies to build.gradle's `dependencies`:

```groovy
implementation 'cn.authing:guard:+'
implementation 'com.tencent.tauth:qqopensdk:3.52.0'
```

:::hint-info
The Guard compileOnly relies on qqopensdk, which allows apps to import on demand, preventing the Guard aar package from getting bigger as more third party logins are supported. Therefore, every time a third-party identity source is added, the App needs to manually add the dependency of the identity source.
:::

### Step 2：Set AndroidManifest

1. Open `/app/manifest/AndroidManifest.xml` , Add permission：

   ```xml
   <uses-permission android:name="android.permission.INTERNET" />
   <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
   ```

2. Setting `activity`，if you AppId is “222222”，`<data> `set it like this `<data android:scheme="tencent222222" />`：

   ```xml
   <activity
        android:name="com.tencent.tauth.AuthActivity"
        android:noHistory="true"
        android:launchMode="singleTask" >
     <intent-filter>
            <action android:name="android.intent.action.VIEW" />
            <category android:name="android.intent.category.DEFAULT" />
            <category android:name="android.intent.category.BROWSABLE" />
            <data android:scheme="tencent你的AppId" />
     </intent-filter>
   </activity>
   ```

### Step 3：Initialization Guard Android SDK

To initialize when the application starts:

```java
// context is application or initial activity
// ”AUTHING_APP_ID“ is obtained from the Authing console
Authing.init(context, "AUTHING_APP_ID");
Authing.setAuthProtocol(Authing.AuthProtocol.EOIDC)
```

### Step 4：Use in different scenarios

- #### Use in different scenarios
  Start the managed page where login authentication is required:
```java
// this is the activity context
AuthFlow.start(this);
```

By following the preceding steps, you can quickly and easily configure the Authing management console to automatically have the QQ login function. The login entry is displayed in the social login button list on the built-in login interface of the Guard.

- #### Use the QQ sign In button
    If you use the facebook login button we provide.

​		1. Add the following code to the layout file:

```xml
 <cn.authing.guard.social.QQLoginButton
    android:id="@+id/btn_qq_login"
    android:background="@drawable/authing_button_background"
    android:textColor="@color/white"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

​		2. Then handle the event in the code:

```java
QQLoginButton button = findViewById(R.id.btn_qq_login);
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

- #### Log in to the authorization class using QQ
  If you don't want to use our built-in buttons and want to implement the UI entirely yourself, you can call the `QQ` class authorization function inside the button click event, which integrates the business logic to pull up the QQ authorization login:

```java
QQ.getInstance().login(appContext, new AuthCallback<UserInfo>() {
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

**Note: When using the QQ login button or the QQ login authorization class, you need to add the following code to the Activity's onActivityResult function:**

```java
@Override
protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    QQ.getInstance().onActivityResult(requestCode, resultCode, data);
}
```

- #### Log in to the API using QQ

  If you want to fully implement the QQ login UI and obtain the authorization code logic yourself, after obtaining the authorization code, you can call the following API in exchange for user information:

```java
public static void loginByQQ(String accessToken, @NotNull AuthCallback<UserInfo> callback)
```

**param**

*`accessToken`* QQ token

**example**

If you only need to get the user information (`username`, `nickname`, `name`, etc.) and `idToken`, call:

```java
AuthClient.loginByQQ(accessToken, new AuthCallback<UserInfo>() {
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
oidcClient.loginByQQ(accessToken, new AuthCallback<UserInfo>() {
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

