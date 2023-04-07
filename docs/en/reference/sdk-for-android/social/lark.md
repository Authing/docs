# Login by Lark

<LastUpdated/>

## Preparatory work

Configure in [Lark open platform](https://open.feishu.cn/app) and [Authing Console](https://authing.cn/)，See [Preparing for Lark](../../../guides/connections/enterprise/lark-internal/README.md).

<br>

## Integrate steps

### Step 1：Add dependency

- Download [Lark sdk library](https://sf3-cn.feishucdn.com/obj/lark-eco-passport/LarkSSOSDKAndroid-3.0.8.zip);
- Copy the downloaded sdk aar file to the app/libs directory;
- Import the aar into your app's build.gradle file and import the dependencies.

```groovy
implementation 'cn.authing:guard:+'
implementation files ('libs/larksso-3.0.8.aar')
implementation 'com.alibaba:fastjson:1.1.58.android'
```

:::hint-info
The Guard compileOnly relies on larksso sdk, which allows apps to import on demand, preventing the Guard aar package from getting bigger as more third party logins are supported. Therefore, every time a third-party identity source is added, the App needs to manually add the dependency of the identity source.
:::

### Step 2：Initialization 

To initialize Guard Android SDK when the application starts:

```java
// context is application or initial activity
// ”AUTHING_APP_ID“ is obtained from the Authing console
Authing.init(context, "AUTHING_APP_ID");
Authing.setAuthProtocol(Authing.AuthProtocol.EOIDC)
```



**By following the above steps, you can quickly and easily obtain the identity source of the flight book automatically after configuring the Authing management console. The login entry will be displayed in the list of social login buttons on the built-in login interface of the Guard**




- Next, if you use the Lark login button we provided, add it to the layout file

```xml
<cn.authing.guard.social.view.LarkLoginButton
    android:id="@+id/btn_login"
    android:layout_width="48dp"
    android:layout_height="48dp" />
```

The event is then processed in java code

```java
LarkLoginButton button = findViewById(R.id.btn_login);
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

<br>

- If you don't want to use our built-in buttons and want to implement the UI entirely yourself, you can call the `Lark` class authorization function inside the button click event, which integrates the business logic to pull up the Line authorization login

```java
Lark.getInstance().login(appContext, new AuthCallback<UserInfo>() {
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



**Note: When using the Lark login button or the Lark login authorization class, you need to add the following code to the Activity's `onResume`, `onNewIntent`, and `onActivityResult` functions：**

```java
@Override
protected void onResume() {
    super.onResume();
    Lark.getInstance().onResume(this);
}

@Override
protected void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    Lark.getInstance().onNewIntent(this, intent);
}

@Override
protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    Lark.getInstance().onActivityResult(this, data);
}
```

<br>

- If you want to fully implement the Lark login UI and obtain the authorization code logic yourself, after obtaining the authorization code, you can call the following API in exchange for user information:

```java
public static void loginByLark(String authCode, @NotNull AuthCallback<UserInfo> callback)
```

**param**

*`authCode`* Lark authCode

**example**

If you only need to get the user information (`username`, `nickname`, `name`, etc.) and `idToken`, call:

```java
AuthClient.loginByLark(authCode, new AuthCallback<UserInfo>() {
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
oidcClient.loginByLark(authCode, new AuthCallback<UserInfo>() {
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

