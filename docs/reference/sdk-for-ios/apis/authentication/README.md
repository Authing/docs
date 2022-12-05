# 核心认证 API

<LastUpdated/>

## 邮箱密码注册

使用邮箱注册帐号，邮箱不区分大小写且用户池内唯一。此接口不要求用户对邮箱进行验证，用户注册之后 emailVerified 字段会为 false 。

```swift
func registerByEmail(email: String, password: String, _ context: String? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *email* 邮箱
* *password* 明文密码
* *context* 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。

**示例**

```swift
AuthClient().registerByEmail(email: "test@example.com", password: "password") { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```

**错误码**

* 2003 非法邮箱地址
* 2026 邮箱已注册

<br>

## 邮箱验证码注册

使用邮箱验证码，邮箱不区分大小写且用户池内唯一。调用此接口之前，需要先调用 [发送邮件](#发送邮件) 接口以获取邮箱验证码。

```swift
func registerByEmailCode(email: String, code: String, _ context: String? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *email* 邮箱
* *password* 明文密码
* *context* 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。

**示例**

```swift
AuthClient().registerByEmailCode(email: "test@example.com", code: "1234") { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```

**错误码**

* 2003 非法邮箱地址
* 2026 邮箱已注册

<br>

## 用户名注册

通过用户名注册帐号。用户名区分大小写且用户池内唯一。

```swift
func registerByUserName(username: String, password: String, _ context: String? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *username* 用户名
* *password* 明文密码
* *context* 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。

**示例**

```swift
AuthClient().registerByUserName(username: "username", password: "strong") { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```

**错误码**

* 2026 用户名已存在

<br>

## 短信验证码注册

通过手机号和短信验证码注册帐号。手机号需要在用户池内唯一。调用此接口之前，需要先调用 [发送短信验证码](#发送短信验证码) 接口以获取短信验证码。

```swift
func registerByPhoneCode(phone: String, code: String, password: String, _ context: String? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *phone* 手机号
* *code* 短信验证码
* *password* 明文密码
* *context* 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。

**示例**

```swift
AuthClient().registerByPhoneCode(phone: "188xxxx8888", code: "1234", password: "strong") { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```

**错误码**

* 2001 验证码错误
* 2026 手机号已注册

<br>

## 邮箱登录

```swift
func loginByEmail(email: String, code: String, _ autoRegister: Bool = false, _ context: String? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *email* 邮箱
* *code* 邮箱验证码
* *autoRegister* 是否自动注册。如果检测到用户不存在，会根据登录账密自动创建一个账号。
* *context* 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。

**示例**

```swift
AuthClient().loginByEmail(email: "test@example.com", code: "1234") { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```

**错误码**

* 2001 邮箱验证码错误

<br>

## 帐号密码登录

```swift
func loginByAccount(account: String, password: String, _ autoRegister: Bool = false, _ context: String? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *account* 可以是手机号 / 邮箱 / 用户名
* *password* 明文密码
* *autoRegister* 是否自动注册。如果检测到用户不存在，会根据登录账密自动创建一个账号。
* *context* 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。

**示例**

```swift
AuthClient().loginByAccount(account: "account", password: "strong") { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```

**错误码**

* 2333 帐号或密码错误

<br>

## 手机验证码登录

通过短信验证码登录，需要先调用 [发送短信验证码](#发送短信验证码) 接口。

```swift
func loginByPhoneCode(phone: String, code: String, _ autoRegister: Bool = false, _ context: String? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *phone* 手机号
* *code* 短信验证码
* *autoRegister* 是否自动注册。如果检测到用户不存在，会根据登录账密自动创建一个账号。
* *context* 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。

**示例**

```swift
AuthClient().loginByPhoneCode(phone: "188xxxx8888", code: "1234") { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```

**错误码**

* 2001 短信验证码不正确

<br>

## 手机号一键登录

参考 [手机号一键登录开发指南](/guides/oneauth/)。

```swift
func loginByOneAuth(token: String, accessToken: String, _ netWork: Int? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *token* 运营商返回
* *accessToken* 运营商返回

**示例**

```swift
AuthClient().loginByOneAuth(token: "token", accessToken: "accessToken") { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```

**错误码**

* 2333 帐号或密码错误

<br>

## 获取当前登录的用户信息

获取当前登录的用户信息，需要先登录。

```swift
func getCurrentUser(completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**示例**

```swift
AuthClient().getCurrentUser { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```

**错误码**

* 2020 未登录

<br>

## 退出登录

退出登录。同时清除内存以及本地持久化的 token 和用户信息。

```swift
func logout(completion: @escaping(Int, String?) -> Void)
```

**示例**

```swift
AuthClient().logout { code, message in
}
```

**错误码**

* 1010001 如果用户的 id token 非法或者过期

<br>

## 发送短信验证码

向指定的手机发送短信验证码。

```swift
func sendSms(phone: String, phoneCountryCode: String? = nil, completion: @escaping(Int, String?) -> Void)
```

**参数**

* *phone* 手机号
* *phoneCountryCode* 电话国家码。可以为空，为空时默认为 +86

**示例**

```swift
AuthClient().sendSms(phone: "188xxxx8888", phoneCountryCode: "+86") { code, message in
}
```

**错误码**

* 500 手机号码格式非法

<br>

## 发送邮件

给指定邮箱发送邮件。

```swift
func sendEmail(email: String, scene: String, completion: @escaping(Int, String?) -> Void)
```

**参数**

* *email* 邮箱地址
* *scene* 发送场景，可选值包含：
  - RESET_PASSWORD: 发送重置密码邮件，邮件中包含验证码
  - CHANGE_EMAIL: 发送修改邮箱邮件，邮件中包含验证码
  - MFA_VERIFY: 发送 MFA 验证邮件
  - VERIFY_CODE: 发送验证码

**示例**

```swift
AuthClient().sendEmail(email: "test@example.com", scene: "RESET_PASSWORD") { code, message in
    if (code == 200) {
        // 发送成功
    }
}
```

**错误码**

* 1020017 邮箱地址非法

<br>

## 通过短信验证码重置密码

通过短信验证码重置密码，你可以通过 [发送短信验证码](#发送短信验证码) 方法发送短信验证码。

```swift
func resetPasswordByPhone(phone: String, code: String, newPassword: String, completion: @escaping(Int, String?) -> Void)
```

**参数**

* *phone* 手机号
* *code* 短信验证码
* *password* 明文密码

**示例**

```swift
AuthClient().resetPasswordByPhone(phone: "188xxxx8888", code: "1234", newPassword: "strong") { code, message in
    if (code == 200) {

    }
}
```

**错误码**

* 2004 用户不存在

<br>

## 通过首次登录的 Token 重置密码

通过首次登录的 Token 重置密码，需要在创建用户时设置“强制用户首次登录时修改密码”。

```swift
func resetPasswordByFirstTimeLoginToken(token: String, password: String, completion: @escaping(Int, String?) -> Void)
```

**参数**

* *token* 首次登录后获取的 token
* *password* 明文密码

**示例**

```swift
AuthClient().resetPasswordByFirstTimeLoginToken(token: "token", password: "strong") { code, message in
    if (code == 200) {

    }
}
```

<br>

## 通过邮件验证码重置密码

通过邮件验证码重置密码，你需要先调用 [sendEmail](#发送邮件) 接口发送重置密码邮件（场景值为 `RESET_PASSWORD`）。

```swift
func resetPasswordByEmail(email: String, code: String, newPassword: String, completion: @escaping(Int, String?) -> Void)
```

**参数**

* *email* 邮箱地址
* *code* 邮件验证码
* *password* 明文密码

**示例**

```swift
AuthClient().resetPasswordByEmailCode(email: "test@example.com", code: "1234", newPassword: "newPassword") { code, message, in
    if (code == 200) {

    }
}
```

**错误码**

* 2004 用户不存在

<br>

## 更新用户密码

更新用户密码。如果用户没有设置密码，如通过短信验证码、社会化登录等方式注册的，oldPassword 留空。

```swift
func updatePassword(newPassword: String, oldPassword: String? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *newPassword* 新密码
* *oldPassword* 旧密码。可以为空

**示例**

```swift
AuthClient().updatePassword(newPassword: "newStrong", oldPassword: "oldStrong") { code, message, userInfo in
    if (code == 200) {

    }
}
```

**错误码**

* 2020 未登录
* 1320011 旧密码不正确

<br>

## 绑定手机号

为当前登录用户绑定手机号。调用 [发送短信验证码](#发送短信验证码) 获取验证码。

```swift
func bindPhone(phone: String, code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *phone* 手机号
* *code* 短信验证码

**示例**

```swift
AuthClient().bindPhone(phone: "188xxxx8888", code: "1234") { code, message, userInfo in
    if (code == 200) {

    }
}
```

**错误码**

* 2020 未登录

<br>

## 解绑手机号

用户解绑手机号，如果用户没有绑定其他登录方式（邮箱、社会化登录账号），将无法解绑手机号，会提示错误。

```swift
func unbindPhone(completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**示例**

```swift
AuthClient().unbindPhone { code, message, userInfo in
    if (code == 200) {

    }
}
```

**错误码**

* 2020 未登录
* 1320005 当前用户未绑定其他登录方式

<br>

## 绑定邮箱

为当前登录用户绑定邮箱。调用 [发送邮件](#发送邮件) 获取验证码。

```swift
func bindEmail(email: String, code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *email* 邮箱地址
* *code* 邮件验证码

**示例**

```swift
AuthClient().bindEmail(email: "test@example.com", code: "1234") { code, message, userInfo in
    if (code == 200) {

    }
}
```

**错误码**

* 2020 未登录

<br>

## 解绑邮箱

用户解绑邮箱，如果用户没有绑定其他登录方式（手机号、社会化登录账号），将无法解绑邮箱，会提示错误。

```swift
func unbindEmail(completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**示例**

```swift
AuthClient().unbindEmail { code, message, userInfo in
    if (code == 200) {

    }
}
```

**错误码**

* 2020 未登录
* 1320005 当前用户未绑定邮箱

<br>
