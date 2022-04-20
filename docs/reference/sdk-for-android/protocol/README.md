# 标准协议 API

<LastUpdated/>

## 生成 OIDC 协议的用户登录链接

生成登录 URL，传给 WebView 加载

```java
public static String buildAuthorizeUrl(Config config, AuthRequest authRequest)
```

**参数**
* *config* 应用配置，可以通过 Authing.getPublicConfig 获取
* *authRequest* 请求参数

**示例**

```java
AuthRequest authRequest = new AuthRequest();

Authing.getPublicConfig(config -> {
    String url = OIDCClient.buildAuthorizeUrl(config, authRequest);
    myWebView.loadUrl(url);
});
```

**设置 scope 参数**

默认值为 openid profile email phone username address offline_access role extended_fields

```java
authRequest.setScope(String scope)
```

**设置回调参数**

SDK 会自动获取控制台默认回调。如果在控制台修改了回调，则需要设置 authRequest 回调地址。

```java
authRequest.setRedirectURL(String redirectURL)
```

<br>

## code 换 token

通过 OIDC 授权码认证，返回的 UserInfo 里面包含 access token 和 id token。如果登录 url 的 scope 里面包含 offline_access，则该接口也会返回 refresh token

```java
public static void authByCode(String code, AuthRequest authRequest, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

* *code* OIDC 授权码。通过 webview 的回调获取
* *authRequest* 请求参数。

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

## 获取用户信息

通过 access token 获取用户信息。返回的 userInfo 对像和参数传入的是同一个 userInfo 对象

```java
public static void getUserInfoByAccessToken(UserInfo userInfo, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

* *userInfo* 包含 access token 的用户信息
* *callback* 函数回调。通过此回调获取用户信息

**示例**

```java
OIDCClient.getUserInfoByAccessToken(userInfo, (code, message, data)->{
    if (code == 200) {
        // data 为更新了用户信息的 UserInfo 对象，和参数是同一个对象
    }
});
```

<br>

## 通过 refresh token 获取新的 access token 和 id token

access token 的有效期通常较短，比如几个小时或者 1 天。当 access token 过期后，App 不能频繁的弹出登录界面让用户认证，那样体验比较糟糕。所以通常的做法是通过代码，用一个有效期比较长的 refresh token 去刷新 access token，从而保持登录状态。只有当 refresh token 过期才弹出登录界面。

```java
public static void getNewAccessTokenByRefreshToken(String refreshToken, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

* *refreshToken* 刷新凭证。注意登录 URL 里面的参数配置，请参考 “生成 OIDC 协议的用户登录链接”
* *callback* 函数回调。通过此回调获取用户信息

**示例**

```java
OIDCClient.getNewAccessTokenByRefreshToken(rt, (code, message, data)->{
    if (code == 200) {
        Log.d(TAG, "new at:" + data.getAccessToken());
        Log.d(TAG, "new id token:" + data.getIdToken());
        Log.d(TAG, "new rt:" + data.getRefreshToken());
    }
});
```

>注意，每次调用会得到新的 refresh token

<br>
