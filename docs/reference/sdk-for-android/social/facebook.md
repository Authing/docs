# Facebook 登录

<LastUpdated/>

## 准备工作

在 [Facebook 开放平台](https://developers.facebook.com/) 及 [Authing Console 控制台](https://authing.cn/)进行配置，请参阅 [FaceBook 接入准备](../../../guides/connections/social/facebook-mobile/README.md)、[FaceBook 官方文档](https://developers.facebook.com/docs/facebook-login/android)。

:::hint-info
此功能在 android guard sdk 1.4.8 版本新增。
:::


<br>

## 集成 Facebook 登录步骤

### 第一步：添加依赖

1. 需要先在项目中，打开 **your_app** > **Gradle Scripts** > **build.gradle (Project)**，确保已将下列存储库添加到 `buildscript { repositories {}}` 中：

```groovy
mavenCentral() 
```

2. 在项目中，打开 **your_app** > **Gradle Scripts** > **build.gradle (Module: app)** 并将下列执行语句添加到 `dependencies{}` 部分，添加如下依赖：

```groovy
implementation 'cn.authing:guard:+'
implementation 'com.facebook.android:facebook-login:latest.release'
```

:::hint-info
Guard 只是 compileOnly 依赖 gms，这样可以让 App 按需引入，防止 Guard aar 包随着支持的第三方登录增加而越来越大。所以每增加一个第三方身份源，都需要 App 手动加上该身份源的依赖。
:::

### 第二步：添加资源和清单

1. 打开 `/app/res/values/strings.xml` 文件。

2. 添加名称为 `facebook_app_id`、`fb_login_protocol_scheme` 以及 `facebook_client_token` 的 `string` 元素，并设置[应用编号](https://developers.facebook.com/docs/android/getting-started#app-id)和[客户端口令](https://developers.facebook.com/docs/android/getting-started#client-token)的值。例如，如果您的应用编号为 `1234`，并且客户端口令为 `56789`，则代码格式如下所示：

   ```xml
   <string name="facebook_app_id">1234</string>
   <string name="fb_login_protocol_scheme">fb1234</string>
   <string name="facebook_client_token">56789</string>
   ```

3. 打开 `/app/manifest/AndroidManifest.xml` 文件。

4. 将 `meta-data` 元素添加到应用编号和客户端口令的 `application` 元素中：

   ```xml
   <application android:label="@string/app_name" ...>
       ...
      	<meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>
      	<meta-data android:name="com.facebook.sdk.ClientToken" android:value="@string/facebook_client_token"/>
       ...
   </application>
   ```

5. 在 `application` 元素中，为 Facebook 添加活动，并为 Chrome 自定义选项卡添加活动和意图筛选条件：

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

6. 在 `application` 元素后的清单中添加 `uses-permission` 元素：

   ```xml
   <uses-permission android:name="android.permission.INTERNET"/>
   ```

7. （可选）要禁用[广告编号权限](https://developers.facebook.com/docs/android/getting-started#ad-id-permissions)，请在 `application` 元素后的清单中添加 `uses-permission` 元素：

   ```
   <uses-permission android:name="com.google.android.gms.permission.AD_ID" tools:node="remove"/>
   ```

### 第三步：初始化 Guard Android SDK

在应用启动的时候初始化：

```java
// context is application or initial activity
// ”AUTHING_APP_ID“ is obtained from the Authing console
Authing.init(context, "AUTHING_APP_ID");
Authing.setAuthProtocol(Authing.AuthProtocol.EOIDC)
```

### 第四步：分场景使用

- #### 使用托管页
  在需要登录认证的地方启动托管页：
```java
// this is the activity context
AuthFlow.start(this);
```

通过以上步骤即可简单快速地通过配置 Authing 管理控制台后自动拥有 FaceBook 登录功能，登录入口会在 Guard 内置登录界面的社会化登录按钮列表中体现。

- #### 使用 Facebook 登录按钮
    如果使用我们提供的 FaceBook 登录按钮。

​		1. 布局文件里面加上（或者代码初始化添加）如下代码：

```xml
 <cn.authing.guard.social.FaceBookLoginButton
    android:id="@+id/btn_face_book_login"
    android:background="@drawable/authing_button_background"
    android:textColor="@color/white"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

​		2. 然后在代码里面处理事件：

```java
FaceBookLoginButton button = findViewById(R.id.btn_face_book_login);
button.setOnLoginListener(new AuthCallback<UserInfo>() {
    @Override
    public void call(int code, String message, UserInfo data) {
      	if (code == 200) {
        	// 登录成功，data 是用户信息
       	} else {
        	// 登录失败
      	}
    }
});
```

- #### 使用 Facebook 登录授权类
  如果不想使用我们内置的按钮，想完全自己实现 UI，则可以在按钮的点击事件里面调用 `FaceBook` 类的授权函数，此类集成了拉起  FaceBook 授权登录的业务逻辑：

```java
FaceBook faceBook = FaceBook.getInstance();
faceBook.login(appContext, new AuthCallback<UserInfo>() {
    @Override
    public void call(int code, String message, UserInfo data) {
        if (code == 200) {
          // 登录成功，data 是用户信息
        } else {
          // 登录失败
        }
    }
});
```

​	`data` 包含 `idToken` 以及用户信息（`用户名`、`昵称`、`姓名`等）。

**注意：使用 FaceBook 登录按钮或者 FaceBook 登录授权类时，需要在 Activity 的 onActivityResult 函数中加入如下代码：**

```java
@Override
protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    FaceBook.getInstance().onActivityResult(requestCode, resultCode, data);
}
```

- #### 使用 Facebook 登录 API 

  如果想完全自己实现 Facebook 登录 UI 以及获取授权码逻辑，拿到授权码后，可以调用下面 API 换取用户信息：

```java
public static void loginByFaceBook(String accessToken, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

*`accessToken`* Facebook token

**示例**

如果你只需要获取到用户信息（`用户名`、`昵称`、`姓名`等）和 `idToken`，调用：

```java
AuthClient.loginByFaceBook(accessToken, new AuthCallback<UserInfo>() {
    @Override
    public void call(int code, String message, UserInfo data) {
        if (code == 200) {
          // 登录成功，data 是用户信息, 包含 idToken。
        } else {
          // 登录失败
        }
    }
});
```

如果你需要获取到用户信息（`用户名`、`昵称`、`姓名`等）、`idToken`、`accessToken` 和 `refreshToken`，调用：

```java
OIDCClient oidcClient = new OIDCClient();
oidcClient.loginByFaceBook(accessToken, new AuthCallback<UserInfo>() {
    @Override
    public void call(int code, String message, UserInfo data) {
        if (code == 200) {
          // 登录成功，data 是用户信息, 包含 idToken、accessToke and refreshToken。
        } else {
          // 登录失败
        }
    }
});
```

