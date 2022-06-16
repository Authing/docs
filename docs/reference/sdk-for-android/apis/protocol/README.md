# 标准协议 API

<LastUpdated/>

## 生成 OIDC 协议的用户登录链接

生成登录 URL，传给 WebView 加载

```java
public String buildAuthorizeUrl(Callback<String> callback)
```

**参数**

* `callback` 回调

**示例**

```java
AuthRequest authRequest = new AuthRequest();

new OIDCClient(authRequest).buildAuthorizeUrl(new Callback<String>() {
  	@Override
  	public void call(boolean ok, String data) {
    	myWebView.loadUrl(data);
  	}
});
```

**设置 scope 参数**

默认值为 openid profile email phone username address offline_access roles extended_fields

```java
authRequest.setScope(String scope)
```

**设置回调参数**

SDK 会自动获取控制台默认回调。如果在控制台修改了回调，则需要设置 authRequest 回调地址。

```java
authRequest.setRedirectURL(String redirectURL)
```

<br>

## Code 换 Token

通过 OIDC 授权码认证，返回的 UserInfo 里面包含 access token 和 id token。如果登录 url 的 scope 里面包含 offline_access，则该接口也会返回 refresh token

```java
public void authByCode(String code, AuthRequest authRequest, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

* `code` OIDC 授权码。通过 webview 的回调获取，每个 Code 只能使用一次。
* `authRequest` 请求参数。

**示例**

```java
myWebView.setWebViewClient(new WebViewClient() {
    @Override
    public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
        String url = request.getUrl().toString();
        if (url.startsWith(authRequest.getRedirectURL())) {
            try {
                String authCode = Util.getAuthCode(url);
                if (authCode != null) {
                    new OIDCClient().authByCode(authCode, authRequest, (code, message, userInfo) -> {
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

## 获取用户信息

通过 access token 获取用户信息。返回的 userInfo 对像和参数传入的是同一个 userInfo 对象

```java
public void getUserInfoByAccessToken(UserInfo userInfo, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

* `userInfo` 包含 access token 的用户信息
* `callback` 函数回调。通过此回调获取用户信息

**示例**

```java
new OIDCClient().getUserInfoByAccessToken(userInfo, (code, message, data)->{
    if (code == 200) {
        // data 为更新了用户信息的 UserInfo 对象，和参数是同一个对象
    }
});
```

<br>

## 通过 Refresh Token 获取新的 Access Token 和 ID Token

access token 的有效期通常较短，比如几个小时或者 1 天。当 access token 过期后，App 不能频繁的弹出登录界面让用户认证，那样体验比较糟糕。所以通常的做法是通过代码，用一个有效期比较长的 refresh token 去刷新 access token，从而保持登录状态。只有当 refresh token 过期才弹出登录界面。

```java
public void getNewAccessTokenByRefreshToken(String refreshToken, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

* `refreshToken` 刷新凭证。注意登录 URL 里面的参数配置，请参考 “生成 OIDC 协议的用户登录链接”
* `callback` 函数回调。通过此回调获取用户信息

**示例**

```java
new OIDCClient().getNewAccessTokenByRefreshToken(rt, (code, message, data)->{
    if (code == 200) {
        Log.d(TAG, "new at:" + data.getAccessToken());
        Log.d(TAG, "new id token:" + data.getIdToken());
        Log.d(TAG, "new rt:" + data.getRefreshToken());
    }
});
```

>注意，每次调用会得到新的 refresh token

<br>

## 获取 Access Token、ID Token 和 Refresh Token

### 邮箱注册

使用邮箱注册帐号，邮箱不区分大小写且用户池内唯一。此接口不要求用户对邮箱进行验证，用户注册之后 emailVerified 字段会为 false 。

```java
public void registerByEmail(String email, String password, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

* `email` 邮箱
* `password` 明文密码

**示例**

```java
new OIDCClient().registerByEmail("me@gmail.com", "strong", (code, message, userInfo)->{
    if (code == 200) {
        // userInfo：用户信息
    }
});
```

**错误码**

* `2003` 非法邮箱地址
* `2026` 邮箱已注册

<br>

### 邮箱验证码注册

使用邮箱验证码注册帐号，邮箱不区分大小写且用户池内唯一。此接口不要求用户对邮箱进行验证，用户注册之后 emailVerified 字段会为 false，需要先调用 [发送邮箱](./authentication/#发送邮箱) 接口（场景值为 `VERIFY_CODE`）。

```java
public void registerByEmailCode(String email, String vCode, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

* `email` 邮箱
* `vCode` 验证码

**示例**

```java
new OIDCClient().registerByEmailCode("me@gmail.com", "1234", (code, message, userInfo)->{
    if (code == 200) {
        // userInfo：用户信息
    }
});
```

**错误码**

* `2003` 非法邮箱地址
* `2026` 邮箱已注册

<br>

### 短信验证码注册

通过手机号和短信验证码注册帐号。手机号需要在用户池内唯一。调用此接口之前，需要先调用 [发送短信验证码](./authentication/#发送短信验证码) 接口以获取短信验证码

```java
public void registerByPhoneCode(String phoneCountryCode, String phone, String code, String password, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

* `phoneCountryCode` 电话国家码。可以为空，为空时默认为 +86
* `phone` 手机号
* `code` 短信验证码
* `password` 明文密码，如果没有可传 “” 或者 null

**示例**

```java
new OIDCClient().registerByPhoneCode("+86", "13012345678", "1234", "strong", (code, message, userInfo)->{
    if (code == 200) {
        // userInfo：用户信息
    }
});
```

**错误码**

* `2001` 验证码错误
* `2026` 手机号已注册

<br>

### 帐号密码登录

```java
public void loginByAccount(String account, String password, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

* `account` 可以是手机号 / 邮箱 / 用户名
* `password` 明文密码

**示例**

```java
new OIDCClient().loginByAccount("account", "strong", (code, message, userInfo)->{
    if (code == 200) {
        // userInfo：用户信息
    }
});
```

**错误码**

* `2333` 帐号或密码错误

<br>

### 邮箱验证码登录

通过邮箱验证码登录，需要先调用 [发送邮箱](./authentication/#发送邮箱) 接口（场景值为 `VERIFY_CODE`）。

```java
public void loginByEmailCode(String email, String code, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

* `email` 邮箱
* `code` 验证码

**示例**

```java
new OIDCClient().loginByEmailCode("me@gmail.com", "1234", (code, message, userInfo)->{
    if (code == 200) {
        // userInfo：用户信息
    }
});
```

**错误码**

* `2001` 验证码不正确

<br>

### 短信验证码登录

通过短信验证码登录，需要先调用 [发送短信验证码](./authentication/#发送短信验证码) 接口。

```java
public void loginByPhoneCode(String phoneCountryCode, String phone, String code, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

* `phoneCountryCode` 电话国家码。可以为空，为空时默认为 +86
* `phone` 手机号
* `code` 短信验证码

**示例**

```java
new OIDCClient().loginByPhoneCode("+86", "13012345678", "1234", (code, message, userInfo)->{
    if (code == 200) {
        // userInfo：用户信息
    }
});
```

**错误码**

* `2001` 短信验证码不正确

<br>

## 获取 Authorization Code

### 邮箱注册

```java
public void authCodeByEmailRegister(String email, String password, @NotNull AuthCallback<AuthResult> callback)
```

**参数**

* `email` 邮箱
* `password` 明文密码

**示例**

```java
AuthRequest authRequest = new AuthRequest();
authRequest.setScope("自定义的scope");

new OIDCClient(authRequest).authCodeByEmailRegister("me@gmail.com", "strong", (code, message, data)->{
    if (code == 200) {
        // data：authorization code
    }
});
```

**错误码**

* `2003` 非法邮箱地址
* `2026` 邮箱已注册

<br>

### 邮箱验证码注册

```java
public void authCodeByEmailCodeRegister(String email, String vCode, @NotNull AuthCallback<AuthResult> callback)
```

**参数**

* `email` 邮箱
* `vCode` 验证码

**示例**

```java
AuthRequest authRequest = new AuthRequest();
authRequest.setScope("自定义的scope");

new OIDCClient(authRequest).authCodeByEmailCodeRegister("me@gmail.com", "1234", (code, message, data)->{
    if (code == 200) {
        // data：authorization code
    }
});
```

**错误码**

* `2003` 非法邮箱地址
* `2026` 邮箱已注册

<br>

### 短信验证码注册

```java
public void authCodeByPhoneCodeRegister(String phoneCountryCode, String phone, String code, String password, @NotNull AuthCallback<AuthResult> callback)
```

**参数**

* `phoneCountryCode` 电话国家码。可以为空，为空时默认为 +86
* `phone` 手机号
* `code` 短信验证码
* `password` 明文密码，如果没有可传 “” 或者 null

**示例**

```java
AuthRequest authRequest = new AuthRequest();
authRequest.setScope("自定义的scope");

new OIDCClient(authRequest).authCodeByPhoneCodeRegister("+86", "13012345678", "1234", "strong", (code, message, data)->{
    if (code == 200) {
        // data：authorization code
    }
});
```

**错误码**

* `2001` 验证码错误
* `2026` 手机号已注册

<br>

### 帐号密码登录

```java
public void authCodeByAccountLogin(String account, String password, @NotNull AuthCallback<AuthResult> callback)
```

**参数**

* `account` 可以是手机号 / 邮箱 / 用户名
* `password` 明文密码

**示例**

```java
AuthRequest authRequest = new AuthRequest();
authRequest.setScope("自定义的scope");

new OIDCClient(authRequest).authCodeByAccountLogin("account", "strong", (code, message, data)->{
    if (code == 200) {
        // data：authorization code
    }
});
```

**错误码**

* `2333` 帐号或密码错误

<br>

### 邮箱验证码登录

```java
public void authCodeByEmailCodeLogin(String email, String code, @NotNull AuthCallback<AuthResult> callback)
```

**参数**

* `email` 邮箱
* `code` 验证码

**示例**

```java
AuthRequest authRequest = new AuthRequest();
authRequest.setScope("自定义的scope");

new OIDCClient(authRequest).authCodeByEmailCodeLogin("me@gmail.com", "1234", (code, message, data)->{
    if (code == 200) {
        // data：authorization code
    }
});
```

**错误码**

* `2001` 验证码不正确

<br>

### 短信验证码登录

```java
public void authCodeByPhoneCodeLogin(String phoneCountryCode, String phone, String code, @NotNull AuthCallback<AuthResult> callback)
```

**参数**

* `phoneCountryCode` 电话国家码。可以为空，为空时默认为 +86
* `phone` 手机号
* `code` 短信验证码

**示例**

```java
AuthRequest authRequest = new AuthRequest();
authRequest.setScope("自定义的scope");

new OIDCClient(authRequest).authCodeByPhoneCodeLogin("+86, ""13012345678", "1234", (code, message, data)->{
    if (code == 200) {
        // data：authorization code
    }
});
```

**错误码**

* `2001` 短信验证码不正确

<br>

