# 标准协议 API

<LastUpdated/>

## OIDC

OpenID Connect 简称 [OIDC](https://docs.authing.cn/v2/apn/#关于-oidc)，是 OAuth 2.0 的一个扩展，主要增加了语义化的用户信息字段。

### 初始化

OIDCClient 会自动获取控制台默认回调，如需要自定义 scope, redirect_uri 等参数，可创建 AuthRequest 对象，重新给 scope 或 redirect_uri 属性赋值。

**示例**

```swift
let authRequest = AuthRequest()
authRequest.scope = "openid"
OIDCClient(authRequest).loginByXXX()
```
<br>

### 邮箱密码注册

使用 OIDC 邮箱注册帐号，邮箱不区分大小写且用户池内唯一。此接口不要求用户对邮箱进行验证，用户注册之后 emailVerified 字段会为 false 。

```swift
func registerByEmail(email: String, password: String, _ context: NSDictionary? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *email* 邮箱
* *password* 明文密码
* *context* 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。

**示例**

```swift
OIDCClient().registerByEmail(email: "test@example.com", password: "strong") { code, message, userInfo in
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

使用 OIDC 邮箱验证码，邮箱不区分大小写且用户池内唯一。调用此接口之前，需要先调用 [发送邮件](https://docs.authing.cn/v2/reference/sdk-for-ios/authentication/#发送邮件) 接口以获取邮箱验证码。

```swift
func registerByEmailCode(email: String, code: String, _ context: NSDictionary? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *email* 邮箱
* *password* 明文密码
* *context* 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。

**示例**

```swift
OIDCClient().registerByEmailCode(email: "test@example.com", code: "code") { code, message, userInfo in
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
func registerByUserName(username: String, password: String, _ context: NSDictionary? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *username* 用户名
* *password* 明文密码
* *context* 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。

**示例**

```swift
OIDCClient().registerByUserName(username: "test", password: "strong") { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```

**错误码**

* 2026 用户名已存在

<br>

### 短信验证码注册

通过 OIDC 手机号和短信验证码注册帐号。手机号需要在用户池内唯一。调用此接口之前，需要先调用 [发送短信验证码](https://docs.authing.cn/v2/reference/sdk-for-ios/authentication/#发送短信验证码) 接口以获取短信验证码。

```swift
func registerByPhoneCode(phone: String, code: String, password: String, _ context: NSDictionary? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *phone* 手机号
* *code* 短信验证码
* *password* 明文密码
* *context* 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。

**示例**

```swift
OIDCClient().registerByPhoneCode(phone: "188xxxx8888", code: "1234", password: "password") { code, message, userInfo in
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
func loginByAccount(account: String, password: String, _ autoRegister: Bool = false, _ context: NSDictionary? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *account* 账号
* *password* 密码
* *autoRegister* 是否自动注册。如果检测到用户不存在，会根据登录账密自动创建一个账号。
* *context* 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。

**示例**

```swift
OIDCClient().loginByAccount(account: "test", password: "password") { code,  message,  userInfo in
    print("\(userInfo?.accessToken ?? "")")
    print("\(userInfo?.idToken ?? "")")
    print("\(userInfo?.refreshToken ?? "")")
}
```

<br>

### 手机号验证码登录

通过 OIDC 手机号验证码登录，需要先调用 [发送短信验证码](https://docs.authing.cn/v2/reference/sdk-for-ios/authentication/#发送短信验证码) 接口。返回的 UserInfo 里面包含 access token , id token 和 refresh token。

```swift
func loginByPhoneCode(phone: String, code: String, _ autoRegister: Bool = false, _ context: NSDictionary? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *phone* 手机号
* *code* 验证码
* *autoRegister* 是否自动注册。如果检测到用户不存在，会根据登录账密自动创建一个账号。
* *context* 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。

**示例**

```swift
OIDCClient().loginByPhoneCode(phone: "188xxxx8888", code: "1234") { code, message, userInfo in
    print("\(userInfo?.accessToken ?? "")")
    print("\(userInfo?.idToken ?? "")")
    print("\(userInfo?.refreshToken ?? "")")
}
```

<br>

### 邮箱验证码登录

使用 OIDC 邮箱验证码登录，邮箱不区分大小写且用户池内唯一。调用此接口之前，需要先调用 [发送邮件](https://docs.authing.cn/v2/reference/sdk-for-ios/authentication/#发送邮件) 接口以获取邮箱验证码。

```swift
func loginByEmail(email: String, code: String, _ autoRegister: Bool = false, _ context: NSDictionary? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void) 
```

**参数**

* *email* 邮箱
* *code* 验证码
* *autoRegister* 是否自动注册。如果检测到用户不存在，会根据登录账密自动创建一个账号。
* *context* 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。

**示例**

```swift
OIDCClient().loginByEmail(email: "test@example.com", code: "1234") { code, message, userInfo in
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
OIDCClient().loginByWechat("authCode") { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```

<br>

### 获取用户信息

通过 access token 获取用户信息。返回的 userInfo 对像和参数传入的是同一个 userInfo 对象，此接口只返回协议相关用户信息字段。

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

>注意，每次调用会得到新的 refresh token 。

<br>
