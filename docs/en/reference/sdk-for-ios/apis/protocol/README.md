# OIDC API

<LastUpdated/>

## build login URL

Use this API to generate login url, then pass this url to Webview

```swift
static func buildAuthorizeUrl(authRequest: AuthRequest, completion: @escaping (URL?) -> Void)
```

**param**
* `authRequest` auth request object

**example**

```swift
let authRequest = AuthRequest()
OIDCClient().buildAuthorizeUrl(authRequest: authRequest) { url in
    if url != nil {
        // self is your view controller
        // webView is a WKWebView object
        self.webView?.load(URLRequest(url: url!))
    }
}
```

**set scope**

use this API to set OIDC scope.
Default scope is: openid profile email phone username address offline_access role extended_fields

```swift
authRequest.scope = "openid"
```

<br>

## get token by auth code

This API returns token(s) by auth code. Note that in order to return *refresh token* make sure the scope includes *offline_access*, which is included by default.

```swift
static func authByCode(code: String, authRequest: AuthRequest, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**param**

* `code` OIDC auth code
* `authRequest` auth request object

**example**

The WKNavigationDelegate protocol callback function is implemented to obtain the authorization code, and then the authentication is completed by the authorization code

```swift
func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
    guard let url = navigationAction.request.url,
            url.absoluteString.hasPrefix(authRequest.redirect_uri) == true else {
        decisionHandler(.allow)
        return
    }
    
    if let authCode = Util.getQueryStringParameter(url: url, param: "code") {
        OIDCClient().authByCode(code: authCode, authRequest: authRequest) { code, message, userInfo in
            if (code == 200) {
                
            }
        }
    }
    decisionHandler(.cancel)
}
```

<br>

## OIDC Use the username to login

OIDC Use the username to login，The returned UserInfo contains the Access token, ID token, and Refresh token.

```swift
public static func loginByAccount(account: String, password: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**param**

* `account` The phone number / email address / username
* `password` password

**example**

```swift
OIDCClient().loginByAccount(account: account, password: password) { code,  message,  userInfo in
    print("\(userInfo?.accessToken ?? "")")
    print("\(userInfo?.idToken ?? "")")
    print("\(userInfo?.refreshToken ?? "")")
}
```

<br>

## OIDC Login by phone code 

login by phone number and a verification code. Must call [sendSms](#send-sms-code) method to get an SMS verification code before calling this method.

```swift
public static func loginByPhoneCode(phone: String, code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**params**

- `phone` phone number
- `code` SMS code

**example**

```swift
OIDCClient().loginByPhoneCode(phone: phone, code: code) { code, message, userInfo in
    print("\(userInfo?.accessToken ?? "")")
    print("\(userInfo?.idToken ?? "")")
    print("\(userInfo?.refreshToken ?? "")")
}
```

<br>

## Get user info

Get detailed user info by access token. The returned UserInfo object is the same as the UserInfo object in parameter.

```swift
static func getUserInfoByAccessToken(userInfo: UserInfo?, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**param**

* `userInfo` includes access token

**example**

```swift
OIDCClient().getUserInfoByAccessToken(userInfo: userInfo) { code, message, data in
    if (code == 200) {
        // data
    }
}
```

<br>

## Obtain new access token and id token by refresh token

the valid duration of an access token is usually short. After it expires, instead of pop up login dialog, which is not very user friendly, we should use refresh token to get new access token. Only show login page when refresh token is expired.

```swift
static func getNewAccessTokenByRefreshToken(userInfo: UserInfo?, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**param**

* `userInfo.refreshToken` refresh token

**example**

```swift
OIDCClient().getNewAccessTokenByRefreshToken(userInfo: userInfo) { code, message, userInfo in
    if (code == 200) {
        
    }
    self.goHome()
}
OIDCClient().getNewAccessTokenByRefreshToken(userInfo: userInfo) { code, message, userInfo in
    print("\(userInfo?.accessToken ?? "")")
    print("\(userInfo?.idToken ?? "")")
    print("\(userInfo?.refreshToken ?? "")")
}
```

>Note: refresh token will also be refreshed

<br>
