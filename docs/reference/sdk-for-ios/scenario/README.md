# 典型场景

<LastUpdated/>

每开发一个移动 App，都需要处理很多认证相关的典型场景，如闪屏自动登录、个人中心、用户信息持久化、登出、删除帐号、手机号一键登录等等

通过我们提供的解决方案，可以帮助开发者快速上线功能完善、安全可靠、易维护、易扩展的移动 App

## 用户标识凭证（ID token）

通过 Guard 完成认证后，默认返回的 token 叫做 ID token，即 *用户标识凭证*。对用户信息的各种操作都需要校验 ID token。虽然业务后台也可以用 ID token 作为资源管理凭证，但更为普遍的做法是引入另外两个凭证：*访问凭证（Access token）* 和 *刷新凭证（Refresh token）*

## 访问凭证（Access token）

一般使用访问凭证来控制资源访问。

Access token 和 ID token 一样，一般都以 JWT 的形式出现，但其 encode 的内容有所不同。根据授权 scope，ID token 可以包含很多个人信息以及扩展信息。而 access token 只应该包含极少的关键信息，不应该包含任何个人信息。

另外，access token 的有效期一般都非常短，通常为数小时，敏感系统的有效期甚至只有数十分钟。这是因为从业务角度看，访问凭证和个人凭证确实应该有不同的有效期。对于业务操作，如转账，需要及时闭环。而更新个人头像却不用太着急。

实际上，我们甚至可以创造更多的凭证，每个凭证都有自己的业务含义，后台系统可以要求前端应用传入准确的凭证。只不过，对于大多数业务系统来说，统一的访问凭证就已经可以满足业务诉求了。

## 刷新凭证（Refresh token）

由于访问凭证时效性很短，一旦过期，就需要用户重新登录。这在一些场景下用户是可以接受的，如银行类 App，但大多数场景，这样的设计会严重影响用户体验。于是就有了 *刷新凭证*

当访问凭证过期后，App 可以通过刷新凭证来获取新的 *用户标识凭证* 和 *访问凭证*。

## 登出场景
退出登录可调用如下方法：

```swift
AuthClient().logout() { code, message in
    if code == 200 {
        //logout success
    }
}
```

## 删除账号
在账号登录的情况下，删除账号可调用如下方法：

```swift
AuthClient().deleteAccount() { code, message in
    if code == 200 {
        //delete success
    }
}
```


## 闪屏界面

几乎每个移动 App 都有闪屏界面。闪屏界面除了可以展示 App 的品牌 Logo 外，还有一个非常重要的功能：加载必要的资源。

绝大部分 App 的资源是和用户有关的，比如抖音个人偏好，微信的聊天记录等等。所以，闪屏页面首先需要完成用户认证。这里的认证又分为首次认证和再次认证。首次认证很好理解，即当用户第一次使用 App 时，需要展示登录界面让用户完成认证。“再次认证”则稍微有点复杂。

一般来说，移动端 App 登录之后，除非帐号出现安全风险，就不会再提示用户登录。早期的 App 通过记住用户名和密码来实现自动登录。出于安全考虑，苹果在引入 Keychain 之前的一段时间是不允许记住密码的，因为密码在越狱的手机上可以被黑客拿到，即使有加密。另外一个问题是，现代的认证流程不提倡使用密码，对于使用手机号+验证码或者生物识别的应用无法通过记住密码来实现自动登录。

Guard 的自动登录通过记住 token 来完成。在闪屏页，调用：

```swift
Authing.autoLogin{ code, message, userInfo in 
    //userInfo
}
```

如果自动登录成功，可以通过下面代码获取用户信息：

```swift
Authing.getCurrentUser()
```

## 使用 WebView OIDC 登录
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