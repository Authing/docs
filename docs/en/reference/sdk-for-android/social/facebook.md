# Login by Facebook

<LastUpdated/>

## Preparatory work

Configure in [Facebook open platform](https://developers.facebook.com/) and [Authing Console](https://authing.cn/)，See [Preparing for FaceBook](../../../guides/connections/social/facebook/README.md)、[FaceBook document](https://developers.facebook.com/docs/facebook-login/android)。 

:::hint-info
This feature was added in android guard sdk 1.4.8 version.
:::

<br>

## Integrate Facebook login steps

### Step 1：Add dependency

1. You need to open it first in your project **your_app** > **Gradle Scripts** > **build.gradle (Project)**，Make sure the following repositories have been added to `buildscript { repositories {}}`：

```groovy
mavenCentral() 
```

2. In the project, open **your_app** > **Gradle Scripts** > **build.gradle (Module: app)** and add the following execution statement to the  `dependencies{}` section, adding the following dependencies：

```groovy
implementation 'cn.authing:guard:+'
implementation 'com.facebook.android:facebook-login:latest.release'
```

:::hint-info
The Guard compileOnly relies on gms, which allows apps to import on demand, preventing the Guard aar package from getting bigger as more third party logins are supported. Therefore, every time a third-party identity source is added, the App needs to manually add the dependency of the identity source.
:::

### Step 2：Add resources and listings

1. Open `/app/res/values/strings.xml`.

2. Add a string element named  `facebook_app_id`、`fb_login_protocol_scheme` and `facebook_client_token`，And set the [app id](https://developers.facebook.com/docs/android/getting-started#app-id) and [client token](https://developers.facebook.com/docs/android/getting-started#client-token). For example, if your application number is' 1234 'and the guest port order is' 56789', the code format looks like this:

   ```xml
   <string name="facebook_app_id">1234</string>
   <string name="fb_login_protocol_scheme">fb1234</string>
   <string name="facebook_client_token">56789</string>
   ```

3. Open `/app/manifest/AndroidManifest.xml`.

4. Add the `meta-data` element to the `application` element of the application number and customer port order:

   ```xml
   <application android:label="@string/app_name" ...>
       ...
      	<meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>
      	<meta-data android:name="com.facebook.sdk.ClientToken" android:value="@string/facebook_client_token"/>
       ...
   </application>
   ```

5. In the `application` element, add an activity for Facebook, and add an activity and intent filter for the Chrome custom TAB:

   ```xml
   <activity android:name="com.facebook.FacebookActivity"
       android:configChanges=
               "keyboard|keyboardHidden|screenLayout|screenSize|orientation"
       android:label="@string/app_name" />
   <activity
       android:name="com.facebook.CustomTabActivity"
       android:exported="true">
       <intent-filter>
           <action android:name="android.intent.action.VIEW" />
           <category android:name="android.intent.category.DEFAULT" />
           <category android:name="android.intent.category.BROWSABLE" />
           <data android:scheme="@string/fb_login_protocol_scheme" />
       </intent-filter>
   </activity>
   ```

6. Add a `application` element to the list after the `uses-permission` element：

   ```xml
   <uses-permission android:name="android.permission.INTERNET"/>
   ```

7. (optional) to disable  [ads code permissions](https://developers.facebook.com/docs/android/getting-started#ad-id-permissions)，Add the `uses-permission` element to the listing after the `application` element:

   ```
   <uses-permission android:name="com.google.android.gms.permission.AD_ID" tools:node="remove"/>
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

By following the preceding steps, you can quickly and easily configure the Authing management console to automatically have the FaceBook login function. The login entry is displayed in the social login button list on the built-in login interface of the Guard.

- #### Use the Facebook sign In button
    If you use the facebook login button we provide.

​		1. Add the following code to the layout file:

```xml
 <cn.authing.guard.social.FaceBookLoginButton
    android:id="@+id/btn_face_book_login"
    android:background="@drawable/authing_button_background"
    android:textColor="@color/white"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

​		2. Then handle the event in the code:

```java
FaceBookLoginButton button = findViewById(R.id.btn_face_book_login);
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

- #### Log in to the authorization class using Facebook
  If you don't want to use our built-in buttons and want to implement the UI entirely yourself, you can call the `FaceBook` class authorization function inside the button click event, which integrates the business logic to pull up the FaceBook authorization login:

```java
FaceBook faceBook = FaceBook.getInstance();
faceBook.login(appContext, new AuthCallback<UserInfo>() {
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

**Note: When using the FaceBook login button or the FaceBook login authorization class, you need to add the following code to the Activity's onActivityResult function:**

```java
@Override
protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    FaceBook.getInstance().onActivityResult(requestCode, resultCode, data);
}
```

- #### Log in to the API using Facebook

  If you want to fully implement the Facebook login UI and obtain the authorization code logic yourself, after obtaining the authorization code, you can call the following API in exchange for user information:

```java
public static void loginByFaceBook(String accessToken, @NotNull AuthCallback<UserInfo> callback)
```

**param**

*`accessToken`* Facebook token

**example**

If you only need to get the user information (`username`, `nickname`, `name`, etc.) and `idToken`, call:

```java
AuthClient.loginByFaceBook(accessToken, new AuthCallback<UserInfo>() {
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

