# OIDC API

<LastUpdated/>

## OIDC

OpenID Connect is abbreviated as OIDC, an extension of OAuth 2.0, which mainly adds a semantic user information field.

### initialization

`OIDCClient` will automatically obtain the default value of the console. If you need to customize parameters such as `scope` and `redirect_uri`, you can pass in a custom `AuthReuest`.

**example**

```swift
let authRequest = AuthRequest()
authRequest.scope = "openid"
OIDCClient(authRequest).buildAuthorizeUrl() { url in }
```
<br>


### build login URL

Use this API to generate login url, then pass this url to Webview

```swift
public func buildAuthorizeUrl(completion: @escaping (URL?) -> Void)
```

**example**

```swift
OIDCClient().buildAuthorizeUrl() { url in
    if url != nil {
        // self is your view controller
        // webView is a WKWebView object
        self.webView?.load(URLRequest(url: url!))
    }
}
```

**set scope**

use this API to set OIDC scope.
Default `scope` is: openid profile email phone username address offline_access role extended_fields

```swift
let authRequest = AuthRequest()
authRequest.scope = "openid"
OIDCClient(authRequest).buildAuthorizeUrl() { url in }
```

<br>

### get token by auth code

This API returns token(s) by auth code. Note that in order to return *refresh token* make sure the scope includes *offline_access*, which is included by default.

```swift
public func authByCode(code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**param**

* `code` OIDC auth code

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
        OIDCClient(authRequest).authByCode(code: authCode) { code, message, userInfo in
            if (code == 200) {
                
            }
        }
    }
    decisionHandler(.cancel)
}
```

<br>


### Use email and password registration

Use the email registration, the mailbox is not case sensitive and the only userpool is unique. This interface does not require the user to verify the mailbox, after the user registration, the emailVerified field will be false.

```swift
func registerByEmail(email: String, password: String, _ context: String? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Parameter**

* `email` email address
* `password` password
* `context` Request context, set here `context` you can get [pipeline context](/guides/pipeline/context-object.md) .

**Example**

```swift
OIDCClient().registerByEmail(email: "me@gmail.com", password: "strong") { code, message, userInfo in
    if (code == 200) {
        // userInfo
    }
}
```

**Error Code**

* `2003` Illegal email address
* `2026` Registered mailbox

<br>

### Use email and verification code registration

Use the email registration, the mailbox is not case sensitive and the only userpool is unique, you need to call [sendEmail](#Send-email) interface to send a reset password message (the scene value `VERIFY_CODE`).

```swift
func registerByEmailCode(email: String, code: String, _ context: String? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Parameter**

* `email` email address
* `code` code
* `context` Request context, set here `context` you can get [pipeline context](/guides/pipeline/context-object.md) .

**Example**

```swift
OIDCClient().registerByEmailCode(email: "me@gmail.com", code: "code") { code, message, userInfo in
    if (code == 200) {
        // userInfo
    }
}
```

**Error Code**

* `2003` Illegal email address
* `2026` Registered mailbox

<br>

### Register using username

Use the username to register, the username is case sensitive and the only user pool.

```swift
func registerByUserName(username: String, password: String, _ context: String? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Parameter**

* `username` username
* `password` password
* `context` Request context, set here `context` you can get [pipeline context](/guides/pipeline/context-object.md) .

**Example**

```swift
OIDCClient().registerByUserName(username: "username", password: "strong") { code, message, userInfo in
    if (code == 200) {
        // userInfo
    }
}
```

**Error Code**

* `2026` The user name already exists

<br>

### Use mobile phone number registration

Use your mobile phone number to register, you can set the initial password of the account at the same time. You can pass [sendSmsCode](#Send-verification-code) method sends SMS verification code.

```swift
func registerByPhoneCode(phone: String, code: String, password: String, _ context: String? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Parameter**

* `phone` The phone number
* `code` SMS verification code
* `password` initial password, it can be null
* `context` Request context, set here `context` you can get [pipeline context](/guides/pipeline/context-object.md) .

**Example**

```swift
OIDCClient().registerByPhoneCode(phone: "188xxxx8888", code: "1234", password: "strong") { code, message, userInfo in
    if (code == 200) {
        // userInfo
    }
}
```

**Error Code**

* `2001` SMS verification code error
* `2026` Cell phone number registered

<br>

### Use the username to login

Use the username to login，The returned `UserInfo` contains the `Access token`, `ID token`, and `Refresh token`.

```swift
public func loginByAccount(account: String, password: String, _ autoRegister: Bool = false, _ context: String? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**param**

* `account` The phone number / email address / username
* `password` password
* `autoRegister` Whether to register automatically.If it detects that the user does not exist, an account will be automatically created based on the login account password.
* `context` Request context, set here `context` you can get [pipeline context](/guides/pipeline/context-object.md) .

**example**

```swift
OIDCClient().loginByAccount(account: account, password: password) { code,  message,  userInfo in
    print("\(userInfo?.accessToken ?? "")")
    print("\(userInfo?.idToken ?? "")")
    print("\(userInfo?.refreshToken ?? "")")
}
```

<br>

### Login by phone code 

login by phone number and a verification code. Must call [sendSms](#Send-verification-code) method to get an SMS verification code before calling this method.

```swift
public func loginByPhoneCode(phone: String, code: String, _ autoRegister: Bool = false, _ context: String? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**params**

- `phone` phone number
- `code` SMS code
* `autoRegister` Whether to register automatically.If it detects that the user does not exist, an account will be automatically created based on the login account password.
* `context` Request context, set here `context` you can get [pipeline context](/guides/pipeline/context-object.md) .

**example**

```swift
OIDCClient().loginByPhoneCode(phone: phone, code: code) { code, message, userInfo in
    print("\(userInfo?.accessToken ?? "")")
    print("\(userInfo?.idToken ?? "")")
    print("\(userInfo?.refreshToken ?? "")")
}
```

<br>

### Login by email code

```swift
public func loginByEmail(email: String, code: String, _ autoRegister: Bool = false, _ context: String? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void) 
```

**params**

* `email` email
* `code` code
* `autoRegister` Whether to register automatically.If it detects that the user does not exist, an account will be automatically created based on the login account password.
* `context` Request context, set here `context` you can get [pipeline context](/guides/pipeline/context-object.md) .

**example**

```swift
OIDCClient().loginByEmail(phone: phone, code: code) { code, message, userInfo in
    print("\(userInfo?.accessToken ?? "")")
    print("\(userInfo?.idToken ?? "")")
    print("\(userInfo?.refreshToken ?? "")")
}
```

<br>


### login by Wechat auth code

```swift
public func loginByWechat(_ code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**params**

* *code* auth code from Wechat

**example**

```swift
OIDCClient().loginByWechat(authCode) { code, message, userInfo in
    if (code == 200) {
        // userInfo
    }
}
```

<br>

### Get user info

Get detailed user info by access token. The returned UserInfo object is the same as the UserInfo object in parameter.

```swift
public getUserInfoByAccessToken(userInfo: UserInfo?, completion: @escaping(Int, String?, UserInfo?) -> Void)
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

### Get new access token and id token by refresh token

the valid duration of an access token is usually short. After it expires, instead of pop up login dialog, which is not very user friendly, we should use refresh token to get new access token. Only show login page when refresh token is expired.

```swift
public func getNewAccessTokenByRefreshToken(userInfo: UserInfo?, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**param**

* `userInfo.refreshToken` refresh token

**example**

```swift
OIDCClient().getNewAccessTokenByRefreshToken(userInfo: userInfo) { code, message, userInfo in
    print("\(userInfo?.accessToken ?? "")")
    print("\(userInfo?.idToken ?? "")")
    print("\(userInfo?.refreshToken ?? "")")
}
```

>Note: refresh token will also be refreshed

<br>
