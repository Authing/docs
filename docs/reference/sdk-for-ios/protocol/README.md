# 标准协议 API

<LastUpdated/>

## OIDC

OpenID Connect 简称 OIDC，是 OAuth 2.0 的一个扩展，主要增加了语义化的用户信息字段。

### 初始化

OIDCClient 会自动获取控制台默认回调，如需要自定义 scope, redirect_uri 等参数，可传入自定义 AuthReuest。

**示例**

```swift
let authRequest = AuthRequest()
authRequest.scope = "openid"
OIDCClient(authRequest).buildAuthorizeUrl() { url in }
```
<br>

### 生成 OIDC 协议的用户登录链接

生成登录 URL，传给 WebView 加载

```swift
func buildAuthorizeUrl(completion: @escaping (URL?) -> Void)
```

**示例**

```swift
OIDCClient().buildAuthorizeUrl() { url in
    if url != nil {
        // self is your view controller
        // webView is a WKWebView object
        self.webView?.load(URLRequest(url: url!))
    }
}
```

**设置 scope 参数**

默认值为 openid profile email phone username address offline_access role extended_fields

```swift
let authRequest = AuthRequest()
authRequest.scope = "openid"
OIDCClient(authRequest).buildAuthorizeUrl() { url in }
```

**设置回调参数**

SDK 会自动获取控制台默认回调。如果在控制台修改了回调，则需要设置 authRequest 回调地址。

```swift
let authRequest = AuthRequest()
authRequest.redirect_uri = "your_uri"
OIDCClient(authRequest).buildAuthorizeUrl() { url in }
```

<br>

### code 换 token

通过 OIDC 授权码认证，返回的 UserInfo 里面包含 access token 和 id token。如果登录 url 的 scope 里面包含 offline_access，则该接口也会返回 refresh token

```swift
func authByCode(code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *code* OIDC 授权码。通过 webview 的回调获取，每个 Code 只能使用一次。

**示例**

通过实现 WKNavigationDelegate 协议回调函数获取授权码，然后通过授权码完成认证

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

### 邮箱密码注册

使用 OIDC 邮箱注册帐号，邮箱不区分大小写且用户池内唯一。此接口不要求用户对邮箱进行验证，用户注册之后 emailVerified 字段会为 false 。

```swift
func registerByEmail(email: String, password: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *email* 邮箱
* *password* 明文密码

**示例**

```swift
OIDCClient().registerByEmail(email: "me@gmail.com", password: "strong") { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```

**错误码**

* 2003 非法邮箱地址
* 2026 邮箱已注册

<br>

### 邮箱验证码注册

使用 OIDC 邮箱验证码，邮箱不区分大小写且用户池内唯一。调用此接口之前，需要先调用 [发送邮件](https://docs.authing.cn/v2/reference/sdk-for-ios/authentication/#发送邮件) 接口以获取邮箱验证码

```swift
func registerByEmailCode(email: String, code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *email* 邮箱
* *password* 明文密码

**示例**

```swift
OIDCClient().registerByEmailCode(email: "me@gmail.com", code: "code") { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```

**错误码**

* 2003 非法邮箱地址
* 2026 邮箱已注册

<br>

### 用户名注册

通过 OIDC 用户名注册帐号。用户名区分大小写且用户池内唯一。

```swift
func registerByUserName(username: String, password: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *username* 用户名
* *password* 明文密码

**示例**

```swift
OIDCClient().registerByUserName(username: "username", password: "strong") { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```

**错误码**

* 2026 用户名已存在

<br>

### 短信验证码注册

通过 OIDC 手机号和短信验证码注册帐号。手机号需要在用户池内唯一。调用此接口之前，需要先调用 [发送短信验证码](https://docs.authing.cn/v2/reference/sdk-for-ios/authentication/#发送短信验证码) 接口以获取短信验证码

```swift
func registerByPhoneCode(phone: String, code: String, password: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *phone* 手机号
* *code* 短信验证码
* *password* 明文密码

**示例**

```swift
OIDCClient().registerByPhoneCode(phone: "13012345678", code: "1234", password: "strong") { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```

**错误码**

* 2001 验证码错误
* 2026 手机号已注册

<br>


### 账号密码登录

通过 OIDC 账号密码登录，返回的 UserInfo 里面包含 access token , id token 和 refresh token。

```swift
func loginByAccount(account: String, password: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *account* 账号
* *password* 密码

**示例**

```swift
OIDCClient().loginByAccount(account: account, password: password) { code,  message,  userInfo in
    print("\(userInfo?.accessToken ?? "")")
    print("\(userInfo?.idToken ?? "")")
    print("\(userInfo?.refreshToken ?? "")")
}
```

<br>

### 手机号验证码登录

通过 OIDC 手机号验证码登录，需要先调用 [发送短信验证码](https://docs.authing.cn/v2/reference/sdk-for-ios/authentication/#发送短信验证码) 接口。返回的 UserInfo 里面包含 access token , id token 和 refresh token。

```swift
func loginByPhoneCode(phone: String, code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *phone* 手机号
* *code* 验证码

**示例**

```swift
OIDCClient().loginByPhoneCode(phone: phone, code: code) { code, message, userInfo in
    print("\(userInfo?.accessToken ?? "")")
    print("\(userInfo?.idToken ?? "")")
    print("\(userInfo?.refreshToken ?? "")")
}
```

<br>

### 邮箱验证码登录

使用 OIDC 邮箱验证码登录，邮箱不区分大小写且用户池内唯一。调用此接口之前，需要先调用 [发送邮件](https://docs.authing.cn/v2/reference/sdk-for-ios/authentication/#发送邮件) 接口以获取邮箱验证码

```swift
func loginByEmail(email: String, code: String, completion: @escaping(Int, String?, UserInfo?) -> Void) 
```

**参数**

* *email* 邮箱
* *code* 验证码

**示例**

```swift
OIDCClient().loginByEmail(phone: phone, code: code) { code, message, userInfo in
    print("\(userInfo?.accessToken ?? "")")
    print("\(userInfo?.idToken ?? "")")
    print("\(userInfo?.refreshToken ?? "")")
}
```

<br>

### 微信授权码登录

```swift
func loginByWechat(_ code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *code* 微信授权码

**示例**

```swift
OIDCClient().loginByWechat(authCode) { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```

<br>

### 获取用户信息

通过 access token 获取用户信息。返回的 userInfo 对像和参数传入的是同一个 userInfo 对象

```swift
func getUserInfoByAccessToken(userInfo: UserInfo?, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *userInfo* 包含 access token 的用户信息

**示例**

```swift
OIDCClient().getUserInfoByAccessToken(userInfo: userInfo) { code, message, data in
    if (code == 200) {
        // data 为更新了用户信息的 UserInfo 对象，和参数是同一个对象
    }
}
```

<br>

### 通过 refresh token 获取新的 access token 和 id token

access token 的有效期通常较短，比如几个小时或者 1 天。当 access token 过期后，App 不能频繁的弹出登录界面让用户认证，那样体验比较糟糕。所以通常的做法是通过代码，用一个有效期比较长的 refresh token 去刷新 access token，从而保持登录状态。只有当 refresh token 过期才弹出登录界面。

```swift
func getNewAccessTokenByRefreshToken(userInfo: UserInfo?, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *refreshToken* 刷新凭证。注意登录 URL 里面的参数配置，请参考 “生成 OIDC 协议的用户登录链接”

**示例**

```swift
OIDCClient().getNewAccessTokenByRefreshToken(userInfo: userInfo) { code, message, userInfo in
    print("\(userInfo?.accessToken ?? "")")
    print("\(userInfo?.idToken ?? "")")
    print("\(userInfo?.refreshToken ?? "")")
}
```

>注意，每次调用会得到新的 refresh token

<br>
