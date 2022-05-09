# OIDC API

<LastUpdated/>

## build login URL

Use this API to generate login url, then pass this url to Webview

```java
public static String buildAuthorizeUrl(Config config, AuthRequest authRequest)
```

**param**
* *config* application configuration, obtained by Authing.getPublicConfig
* *authRequest* auth request object

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

**param**

* *code* OIDC auth code
* *authRequest* auth request object。

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

**param**

* *userInfo* includes access token
* *callback* returns detailed user info if succeeds

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

**param**

* *refreshToken* refresh token
* *callback* includes new access token and id token

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
