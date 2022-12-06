# OIDC API

<LastUpdated/>

## build login URL

Use this API to generate login url, then pass this url to Webview

```java
public static String buildAuthorizeUrl(Config config, AuthRequest authRequest)
```

**Parameter**
* `config` application configuration, obtained by Authing.getPublicConfig
* `authRequest` auth request object

**example**

```java
AuthRequest authRequest = new AuthRequest();

Authing.getPublicConfig(config -> {
    String url = OIDCClient.buildAuthorizeUrl(config, authRequest);
    myWebView.loadUrl(url);
});
```

**set scope**

use this API to set OIDC scope.
Default scope is: openid profile email phone username address offline_access role extended_fields

```java
authRequest.setScope(String scope)
```

**set redirect url**

SDK will get the default redirect url from console. Use this API if you want to use a specific redirect url.

```java
authRequest.setRedirectURL(String redirectURL)
```

<br>

## get token by auth code

This API returns token(s) by auth code. Note that in order to return *refresh token* make sure the scope includes *offline_access*, which is included by default.

```java
public static void authByCode(String code, AuthRequest authRequest, @NotNull AuthCallback<UserInfo> callback)
```

**Parameter**

* `code` OIDC auth code
* `authRequest` auth request object

**example**

```java
myWebView.setWebViewClient(new WebViewClient() {
    @Override
    public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
        String url = request.getUrl().toString();
        if (url.startsWith(authRequest.getRedirectURL())) {
            try {
                String authCode = Util.getAuthCode(url);
                if (authCode != null) {
                    OIDCClient.authByCode(authCode, authRequest, (code, message, userInfo) -> {
                        // got user info
                    });
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            return true;
        }
        return false;
    }
});
```

<br>

## Get user info

Get detailed user info by access token. The returned UserInfo object is the same as the UserInfo object in parameter.

```java
public static void getUserInfoByAccessToken(UserInfo userInfo, @NotNull AuthCallback<UserInfo> callback)
```

**Parameter**

* `userInfo` includes access token
* `callback` returns detailed user info if succeeds

**example**

```java
OIDCClient.getUserInfoByAccessToken(userInfo, (code, message, data)->{
    if (code == 200) {
        // data is the same object as the first parameter
    }
});
```

<br>

## Obtain new access token and id token by refresh token

the valid duration of an access token is usually short. After it expires, instead of pop up login dialog, which is not very user friendly, we should use refresh token to get new access token. Only show login page when refresh token is expired.

```java
public static void getNewAccessTokenByRefreshToken(String refreshToken, @NotNull AuthCallback<UserInfo> callback)
```

**Parameter**

* `refreshToken` refresh token
* `callback` includes new access token and id token

**example**

```java
OIDCClient.getNewAccessTokenByRefreshToken(rt, (code, message, data)->{
    if (code == 200) {
        Log.d(TAG, "new at:" + data.getAccessToken());
        Log.d(TAG, "new id token:" + data.getIdToken());
        Log.d(TAG, "new rt:" + data.getRefreshToken());
    }
});
```

>Note: refresh token will also be refreshed

<br>

## Get Access Token、ID Token 和 Refresh Token

### Use email registration

Use the email registration, the mailbox is not case sensitive and the only userpool is unique. This interface does not require the user to verify the mailbox, after the user registration, the emailVerified field will be false.

```java
public void registerByEmail(String email, String password, String context, @NotNull AuthCallback<UserInfo> callback)
```

**Parameter**

* `email` email address
* `password` password
* `context` Request context, set here `context` you can get [pipeline context](https://docs.authing.cn/v2/guides/pipeline/context-object.html). This parameter can be passed to `null` if not required.

**example**

```java
JSONObject context = new JSONObject();
context.put("userId", "userId");
new OIDCClient().registerByEmail("test@example.com", "xxxxxx", context.toString(), (code, message, userInfo)->{
    if (code == 200) {
        // userInfo
    }
});
```

**Error Code**

* `2003` Illegal email address
* `2026` Registered mailbox

<br>

### Use email code registration

Use the email registration, the mailbox is not case sensitive and the only userpool is unique. This interface does not require the user to verify the mailbox, after the user registration, the emailVerified field will be false. You need to use it first [sendEmail](./authentication/#send-email) sends a email verification code.（scene is `VERIFY_CODE`）.

```java
public void registerByEmailCode(String email, String vCode, String context, @NotNull AuthCallback<UserInfo> callback)
```

**Parameter**

* `email` email address
* `vCode` code
* `context` Request context, set here `context` you can get [pipeline context](https://docs.authing.cn/v2/guides/pipeline/context-object.html). This parameter can be passed to `null` if not required.

**example**

```java
JSONObject context = new JSONObject();
context.put("userId", "userId");
new OIDCClient().registerByEmailCode("test@example.com", "1234", context.toString(), (code, message, userInfo)->{
    if (code == 200) {
        // userInfo
    }
});
```

**Error Code**

* `2003` Illegal email address
* `2026`  Registered mailbox

<br>

### Use mobile phone number registration

Use your mobile phone number to register, you can set the initial password of the account at the same time. You can pass [sendSmsCode](#send-verification-code) method sends SMS verification code.

```java
public void registerByPhoneCode(String phoneCountryCode, String phone, String code, String password, String context, @NotNull AuthCallback<UserInfo> callback)
```

**Parameter**

* `phoneCountryCode` Telephone country code, If null, the default value is `+86`.
* `phone` The phone number
* `code` SMS verification code
* `password` initial password, it can be `null`
* `context` Request context, set here `context` you can get [pipeline context](https://docs.authing.cn/v2/guides/pipeline/context-object.html). This parameter can be passed to `null` if not required.

**example**

```java
JSONObject context = new JSONObject();
context.put("userId", "userId");
new OIDCClient().registerByPhoneCode("+86", "188xxxx8888", "1234", "strong", false, context.toString(), (code, message, userInfo)->{
    if (code == 200) {
        // userInfo
    }
});
```

**Error Code**

* `2001` SMS verification code error
* `2026` Cell phone number registered

<br>

## Custom field registration

You can directly log in to an account registered with a user-defined field using the account password.

```java
public static void registerByExtendField(String fieldName, String account, String password, String context, @NotNull AuthCallback<UserInfo> callback)
```

**Parameter**

- `fieldName` custom field name

* `account` account
* `password`  initial password, it can be `null`
* `context` Request context, set here `context` you can get [pipeline context](https://docs.authing.cn/v2/guides/pipeline/context-object.html). This parameter can be passed to `null` if not required.

**Example**

```java
JSONObject context = new JSONObject();
context.put("userId", "userId");
new OIDCClient().registerByExtendField("extendId", "188xxxx8888", "xxxxxx", context.toString(), (code, message, userInfo)->{
    if (code == 200) {
        // userInfo
    }
});
```

**Error Code**

* `2026` The user name already exists

<br>

### Use the username to login

```java
public void loginByAccount(String account, String password, boolean autoRegister, String context, @NotNull AuthCallback<UserInfo> callback)
```

**Parameter**

* `account`  The phone number / email address / username
* `password` password
* `autoRegister` Whether it is automatically registered. If the user does not exist, an account is automatically created according to the login book.
* `context` Request context, set here `context` you can get [pipeline context](https://docs.authing.cn/v2/guides/pipeline/context-object.html). This parameter can be passed to `null` if not required.

**Example**

```java
JSONObject context = new JSONObject();
context.put("userId", "userId");
new OIDCClient().loginByAccount("account", "xxxxxx", false, context.toString(), (code, message, userInfo)->{
    if (code == 200) {
        // userInfo
    }
});
```

**Error Code**

* `2333` The account or password is incorrect

<br>

### Use email code  to login

Use the email verification code to log in. You need to use it first [sendEmail](./authentication/#send-email) sends a email verification code.（scene is`VERIFY_CODE`）。

```java
public void loginByEmailCode(String email, String vCode, boolean autoRegister, String context, @NotNull AuthCallback<UserInfo> callback)
```

**Parameter**

* `email` email address
* `vCode` code
* `autoRegister` Whether it is automatically registered. If the user does not exist, an account is automatically created according to the login book.
* `context` Request context, set here `context` you can get [pipeline context](https://docs.authing.cn/v2/guides/pipeline/context-object.html). This parameter can be passed to `null` if not required.

**Example**

```java
JSONObject context = new JSONObject();
context.put("userId", "userId");
new OIDCClient().loginByEmailCode("test@example.com", "1234", false, context.toString(), (code, message, userInfo)->{
    if (code == 200) {
        // userInfo
    }
});
```

**Error Code**

* `2001` email verification code error

<br>

### Use the mobile phone number verification code to login

Use the mobile phone number verification code to log in. You need to use it first [sendSmsCode](#send-verification-code) sends a SMS verification code.

```java
public void loginByPhoneCode(String phoneCountryCode, String phone, String code, boolean autoRegister, String context, @NotNull AuthCallback<UserInfo> callback)
```

**Parameter**

* `phoneCountryCode` Telephone country code, If null, the default value is +86
* `phone` The phone number
* `code` SMS verification code
* `autoRegister` Whether it is automatically registered. If the user does not exist, an account is automatically created according to the login book.
* `context` Request context, set here `context` you can get [pipeline context](https://docs.authing.cn/v2/guides/pipeline/context-object.html). This parameter can be passed to `null` if not required.

**Example**

```java
JSONObject context = new JSONObject();
context.put("userId", "userId");
new OIDCClient().loginByPhoneCode("+86", "188xxxx8888", "1234", false, context.toString(), (code, message, userInfo)->{
    if (code == 200) {
        // userInfo
    }
});
```

**Error Code**

* `2001` SMS verification code error

<br>
