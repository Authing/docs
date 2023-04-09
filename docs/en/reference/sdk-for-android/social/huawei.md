# Login by Huawei

<LastUpdated/>

## Preparatory work

**Configuration work**：In [Huawei developer platform](https://developer.huawei.com/consumer/cn/appgallery/) and [Authing Console](https://authing.cn/) Configure the application，see [Huawei Access Preparations](../../../guides/connections/social/huawei-mobile/README.md)。

**Development reference**：Please refer to [Huawei official documentation](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/android-introduction-0000001098842325), Currently, we use the Authorization Code mode of Huawei account services to access Huawei accounts (OAuth 2.0). Please complete [Configure AppGallery](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/config-agc-0000001050196065) first The Connect.

:::hint-info
This feature was added in android guard sdk 1.5.6 version.
Non-huawei phones must install HMS Core.
:::

<br>

## Integrate steps

### Step 1：Add HMS Core

Please refer to  [Integrated HMS Core SDK](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/as-integration-hms-core-sdk-0000001050436235) 、[Confused configuration script](https://developer.huawei.com/consumer/cn/doc/development/HMSCore-Guides/config-obfuscation-script-0000001056835760) Complete the environment configuration first.

### Step 2：Add dependency

```groovy
dependencies {
    implementation 'cn.authing:guard:+'
    implementation 'com.huawei.hms:hwid:6.9.0.301'
}
```

:::hint-info
The Guard compileOnly relies on HMS Core sdk, which allows apps to import on demand, preventing the Guard aar package from getting bigger as more third party logins are supported. Therefore, every time a third-party identity source is added, the App needs to manually add the dependency of the identity source.
:::

### Step 3：Initialization 

Initialize Guard Android SDK in `Application` :

```java
// context is application or initial activity
// ”AUTHING_APP_ID“ is obtained from the Authing console
Authing.init(context, "AUTHING_APP_ID");
Authing.setAuthProtocol(Authing.AuthProtocol.EOIDC)
```


### Step 4：Use in different scenarios

#### Use in different scenarios
Start the managed page where login authentication is required:

```java
// this is the activity context
AuthFlow.start(this);
```

By following the preceding steps, you can quickly and easily configure the Authing management console to automatically have the Huawei login function. The login entry is displayed in the social login button list on the built-in login interface of the Guard.

#### Use the login button

If you use the HuaWei login button we provide.

1. Add the following code to the layout file:

```xml
 <cn.authing.guard.social.view.HuaWeiLoginButton
    android:id="@+id/btn_login"
    android:background="@drawable/authing_button_background"
    android:textColor="@color/white"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

2. Then handle the event in the code:

```java
HuaWeiLoginButton button = findViewById(R.id.btn_login);
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

#### Use the login authorization class 
If you don't want to use our built-in buttons and want to implement the UI entirely yourself, you can call the `HuaWei` class authorization function inside the button click event, which integrates the business logic to pull up the Huawei authorization login:

```java
HuaWei.getInstance().login(appContext, new AuthCallback<UserInfo>() {
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

`data` contains `idToken` and user information (`user name`, `nickname`, `name`, etc.).

**Note: When using the login button or the login authorization class, you need to add the following code to the Activity's onActivityResult function:**

```java
@Override
protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    HuaWei.getInstance().onActivityResult(requestCode, resultCode, data);
}
```

#### Use the login API 

If you want to fully implement the Huawei login UI and obtain the authorization code logic yourself, after obtaining the authorization code, you can call the following API in exchange for user information:

```java
public static void loginByHuaWei(String authCode, @NotNull AuthCallback<UserInfo> callback)
```

**param**

*`authCode`* Huawei authCode

**example**

If you only need to get the user information (`username`, `nickname`, `name`, etc.) and `idToken`, call:

```java
AuthClient.loginByHuaWei(authCode, new AuthCallback<UserInfo>() {
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
oidcClient.loginByHuaWei(authCode, new AuthCallback<UserInfo>() {
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

