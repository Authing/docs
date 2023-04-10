# Login by WeCom

<LastUpdated/>

## Preparatory work

Configure in [WeCom open platform](https://open.work.weixin.qq.com/wwopen/developer#/index) and [Authing Console](https://authing.cn/)，See [WeCom mobile](../../../guides/connections/enterprise/wecom-mobile/README.md)、[WeCom mobile agent](../../../guides/connections/enterprise/wecom-agency-mobile/README.md)。

<br>

## Integrate steps

### Step 1：Add dependency

- download [WeCom SDK](http://dldir1.qq.com/foxmail/wwopen_docFile/sdk/lib_wwapi-2.0.12.11.aar)；
- Copy the downloaded sdk jar file to the libs directory of the project；
- Import the jar into your project's build.gradle file, importing the dependencies。

```groovy
implementation 'cn.authing:guard:+'
implementation files('libs/lib_wwapi-2.0.12.11.aar')
```

:::hint-info
The Guard compileOnly relies on wecom sdk, which allows apps to import on demand, preventing the Guard aar package from getting bigger as more third party logins are supported. Therefore, every time a third-party identity source is added, the App needs to manually add the dependency of the identity source.
:::

If you need to obfuscate code, add the following two lines to proguard.cfg to ensure normal use of the sdk:

```
-keep class com.tencent.wework.api.** {   
		*; 
}
```

### Step 2：Initialization 

To initialize Guard Android SDK when the application starts:

```java
// context is application or initial activity
// ”AUTHING_APP_ID“ is obtained from the Authing console
Authing.init(context, "AUTHING_APP_ID");
Authing.setAuthProtocol(Authing.AuthProtocol.EOIDC)
```



By following the preceding steps, you can quickly and easily configure the Authing management console to automatically have the WeCom login function. The login entry is displayed in the social login button list on the built-in login interface of the Guard.



- If you use the WeCom login button we provide.


```xml
<cn.authing.guard.social.view.WeComLoginButton
    android:id="@+id/btn_login"
    android:layout_width="44dp"
    android:layout_height="44dp"
    app:layout_constraintLeft_toLeftOf="parent"
    app:layout_constraintRight_toRightOf="parent"/>
```

Then handle the event in the code:

```java
WeComLoginButton button = findViewById(R.id.btn_login);
//button.setType(Const.TYPE_WECHAT_COM_AGENCY);//Agent development mode
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

- If you don't want to use our built-in buttons and want to implement the UI entirely yourself, you can call the `WeCom` class authorization function inside the button click event, which integrates the business logic to pull up the WeCom authorization login:

```java
WeCom weCom = new WeCom();
//WeCom weCom = new WeCom(Const.TYPE_WECHAT_COM_AGENCY);//Agent development mode
weCom.login(appContext, new AuthCallback<UserInfo>() {
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

<br>

- If you want to fully implement the WeCom login UI and obtain the authorization code logic yourself, after obtaining the authorization code, you can call the following API in exchange for user information:


```java
public static void loginByWecom(String authCode, @NotNull AuthCallback<UserInfo> callback)
```

**param**

*`authCode`*  Wecom code

**example**

If you only need to get the user information (`username`, `nickname`, `name`, etc.) and `idToken`, call:

```java
AuthClient.loginByWecom(authCode, new AuthCallback<UserInfo>() {
    @Override
    public void call(int code, String message, UserInfo data) {
        if (code == 200) {
          // login success, data is user info, contains idToken.
        } else {
          // login fail
        }
    }
});

//Agent development mode
AuthClient.loginByWecomAgency(authCode, new AuthCallback<UserInfo>() {
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
oidcClient.loginByWecom(authCode, new AuthCallback<UserInfo>() {
    @Override
    public void call(int code, String message, UserInfo data) {
        if (code == 200) {
          // login success, data is user info, contains idToken.
        } else {
          // login fail
        }
    }
});

//Agent development mode
oidcClient.loginByWecomAgency(authCode, new AuthCallback<UserInfo>() {
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

