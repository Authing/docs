# Login by Alipay

<LastUpdated/>

1. Go to this page to download [Alipay Android SDK](https://opendocs.alipay.com/open/54/104509)

:::hint-info
Alipay put Android、iOS SDK, as well as Demo into one single folder. Locate Android SDK inside this folder and copy it to app's libs folder.
:::

2. Add dependency：
```groovy
implementation 'cn.authing:guard:+'
implementation files('libs/alipaysdk.aar')
```

3. Init Authing upon App startup. e.g. Application's onCreate:
```java
// AUTHING_APP_ID is Authing app id which can be obtained at Authing console
Authing.init(context, “AUTHING_APP_ID”);
```

Next, we recommend to use our UI component, all you need to do is 'place' it on the layout xml where you think appropriate, you can also create an instance of this component via code:

```xml
<cn.authing.guard.AlipayLoginButton
    android:id="@+id/btn_alipay_login"
    android:layout_width="44dp"
    android:layout_height="44dp"
    app:layout_constraintLeft_toLeftOf="parent"
    app:layout_constraintRight_toRightOf="parent"/>
```

Then handle callback event after login:

```java
AlipayLoginButton button = findViewById(R.id.btn_alipay_login);
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

In case you don't want to use our UI component, you can have your own Button, and then inside your Button's onClick event, you can start alipay authentication and handle callback event like this:

```java
Alipay alipay = new Alipy();
alipay.login(appContext, new AuthCallback<UserInfo>() {
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

`userInfo` contains  `idToken` and user information (`username`, `nickname`, `name`, etc.).

When you use component  `AlipayLoginButton` or Login Authorization class `Alipay`, if you also want to get `accessToken` and `refreshToken`,  you need to call  `Authing.setAuthProtocol(Authing.AuthProtocol.EOIDC) ` after

` Authing.init(context, "AUTHING_APP_ID") ` , data included in the callback ` data `.

<br>

If you want to implement the whole process by your own, right after you get auth code, please call this API to get Authing user info:

```java
public static void loginByAlipay(String authCode, @NotNull AuthCallback<UserInfo> callback)
```

**param**

*`authCode`* auth code from alipay

**example**

If all you need is access to user information (`username`, `nickname`, `name`, etc.) and `idToken`，call like this:

```java
AuthClient.loginByAlipay(authCode, new AuthCallback<UserInfo>() {
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

If you need to get user information (`username`, `nickname`, `name`, etc.) , `idToken`, `accessToken` and `refreshToken`, call like this:

```java
OIDCClient oidcClient = new OIDCClient();
oidcClient.loginByAlipay(authCode, new AuthCallback<UserInfo>() {
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

