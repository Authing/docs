# WebView

<LastUpdated/>

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