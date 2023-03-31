# Login by Xiaomi

<LastUpdated/>

## Preparatory work

Configure in [Xiaomi open platform](https://dev.mi.com/platform) and [Authing Console](https://authing.cn/)，See [Preparing for Xiaomi](../../../guides/connections/social/xiaomi-mobile/README.md)、[Douyin document](https://developer.open-douyin.com/docs/resource/zh-CN/dop/develop/sdk/mobile-app/permission/android/permission-develop-guide)。

:::hint-info
This feature was added in android guard sdk 1.5.4 version.
:::

<br>

## Integrate steps

### Step 1：Add dependency

```groovy
//gradle：
repositories {
  	// maven { url 'https://raw.githubusercontent.com/xiaomi-passport/maven-repository/master/releases' }
    // github如果被X，需要换成下面这一行
    maven { url 'https://gitlab.com/xiaomi-passport/maven-repository/raw/master/releases' }   
}

dependencies {
    implementation 'cn.authing:guard:+'
  	implementation 'com.xiaomi.account:oauth-android:latest.release' 
}
```

:::hint-info
The Guard compileOnly relies on xiaomi sdk, which allows apps to import on demand, preventing the Guard aar package from getting bigger as more third party logins are supported. Therefore, every time a third-party identity source is added, the App needs to manually add the dependency of the identity source.
:::

### Step 2：Add permission

Add permissions to `AndroidManifest.xml`:

```xml
<uses-permission android:name="com.xiaomi.permission.AUTH_SERVICE" />
<uses-permission android:name="android.permission.GET_ACCOUNTS" />
```

### Step 3：Initialization 

To initialize Guard Android SDK when the application starts:

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

By following the preceding steps, you can quickly and easily configure the Authing management console to automatically have the Xiaomi login function. The login entry is displayed in the social login button list on the built-in login interface of the Guard.

- #### Use the Xiaomi sign In button

  If you use the Douyin login button we provide.

​		1. Add the following code to the layout file:

```xml
 <cn.authing.guard.social.view.XiaomiLoginButton
    android:id="@+id/btn_login"
    android:background="@drawable/authing_button_background"
    android:textColor="@color/white"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

​		2. Then handle the event in the code:

```java
XiaomiLoginButton button = findViewById(R.id.btn_login);
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

- #### Log in to the authorization class using Xiaomi

  If you don't want to use our built-in buttons and want to implement the UI entirely yourself, you can call the `Xiaomi` class authorization function inside the button click event, which integrates the business logic to pull up the Xiaomi authorization login:

```java
Xiaomi.getInstance().login(appContext, new AuthCallback<UserInfo>() {
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

- #### Log in to the API using Xiaomi

  If you want to fully implement the Xiaomi login UI and obtain the authorization code logic yourself, after obtaining the authorization code, you can call the following API in exchange for user information:

```java
public static void loginByXiaomi(String accessToken, @NotNull AuthCallback<UserInfo> callback)
```

**param**

*`authCode`* Xiaomi authCode

**example**

If you only need to get the user information (`username`, `nickname`, `name`, etc.) and `idToken`, call:

```java
AuthClient.loginByXiaomi(accessToken, new AuthCallback<UserInfo>() {
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
oidcClient.loginByXiaomi(accessToken, new AuthCallback<UserInfo>() {
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

