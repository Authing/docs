# Authing - Swift

<LastUpdated/>

> 推荐使用 [iOS Guard SDK](/reference/sdk-for-ios/) 接入。它包含本 SDK 全部内容，并且提供了大量本 SDK 不具备的功能。本 SDK 只作为向下兼容进行维护

<br>

- Authing Swift SDK 仅支持以终端用户（End User）的身份进行请求，提供了登录、注册、登出、管理用户资料、获取授权资源等所有管理用户的方法。目前不支持管理员（Administrator）身份的相关方法。
- SDK 的更新日志，可参阅[ Release Notes](https://github.com/Authing/SwiftyAuthing/releases)

## GitHub 

下载地址

| **条目** | **说明**                                     |
| -------- | -------------------------------------------- |
| 支持版本 | - Swift 5.0 + - Xcode 11 + - iOS 10+         |
| Platform | - iOS - osx - tvos - watchos                 |
| 仓库地址 | https://github.com/Authing/SwiftyAuthing.git |

# 1. 集成 Authing Swift SDK

## 1.1. CocoaPods 方式

-  在 **Podfile** 中加入如下代码：

```swift
    pod 'SwiftAuthing'
```

- 执行 **pod install** 或 **pod update**

​    注：如果执行 **pod update** 无法检测到最新版本，可以先执行 **pod cache clean SwiftAuthing** 清除本地缓存。

## 1.2. Swift Package Manager 方式

- 在 **Package.swift** 文件中加入如下 **dependencies** 代码：

```swift
    dependencies: [
    .package(url: "https://github.com/Authing/SwiftyAuthing.git", .upToNextMajor(from: "4.0.0"))
    ]
```

- 进入工程根目录，打开 SwiftyAuthingExample.xcodeproj ，等待 Swift Package 下载完成

## 1.3. 源码方式

- 从 [GitHub](https://github.com/Authing/SwiftyAuthing) 获取 SDK 的源代码
- 将源代码中 **SwiftyAuthing** 目录导入 App 项目，并选中 **Copy items if needed**

​    注：需要添加依赖库: **Apollo** 和 **Alamofire**

# 2. 初始化 Authing Swift SDK

## 2.1. 初始化 SDK

在 **AppDelegate** 的 **- application: didFinishLaunchingWithOptions:** 中添加初始化代码：

```swift
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

    //        AuthenticationClient.initSDK(userPoolId: <#用户池 ID#>)
    //        AuthenticationClient.initSDK(userPoolId: <#用户池 ID#>, appId: <#App ID#>, domain: <#domain#>)
        AuthenticationClient.initSDK(userPoolId: <#用户池 ID#>, appId: <#App ID#>)

        return true
    }
```

## 2.2. 私有化部署设置

​    私有化部署需要修改 config 目录下 Config.Swift 文件中的 domainDefault 和 domain 两个参数值。

```swift
    public static let domainDefault = "https://xxx.com"
    public static var domain = "https://xxx.com"
```

# 3. SDK API

>  **用户认证模块：**
>
> [邮箱注册](#邮箱注册)
>
> [用户名注册](#用户名注册)
>
> [手机号注册](#手机号注册)
>
> [邮箱登录](#邮箱登录)
>
> [用户名登录](#用户名登录)
>
> [手机号验证码登录](#手机号验证码登录)
>
> [手机号密码登录](#手机号密码登录)
>
> [子账号登录](#子账号登录)
>
> [LDAP 用户名登录](#子账号登录)
>
> [AD 用户名登录](#子账号登录)
>
> [获取当前登录的用户信息](#获取当前登录的用户信息)
>
> [退出登录](#退出登录)
>
> [获取当前用户的自定义数据列表](#获取当前用户的自定义数据列表)
>
> [添加用户自定义数据](#添加用户自定义数据)
>
> [获取用户所在组织机构数据列表](#获取用户所在组织机构数据列表)
>
> [发送短信验证码](#发送短信验证码)
>
> [发送邮件](#发送邮件)
>
> [获取自定义数据](#获取自定义数据)
>
> [删除自定义数据](#删除自定义数据)
>
> [检测登录状态](#检测登录状态)
>
> [通过短信验证码重置密码](#通过短信验证码重置密码)
>
> [通过邮件验证码重置密码](#通过邮件验证码重置密码)
>
> [修改用户资料](#修改用户资料)
>
> [更新用户密码](#更新用户密码)
>
> [绑定手机号](#绑定手机号)
>
> [更新用户手机号](#更新用户手机号)
>
> [绑定邮箱](#绑定邮箱)
>
> [更新用户邮箱](#更新用户邮箱)
>
> [刷新当前用户 Token](#更新用户邮箱)
>
> [计算密码安全等级](#计算密码安全等级)
>
> [获取当前用户能够访问的应用](#获取当前用户能够访问的应用)
>
> [获取用户被授权的所有资源列表](#获取用户被授权的所有资源列表)
>
> [社会化登录](#社会化登录)



## 邮箱注册

> 使用邮箱注册，邮箱不区分大小写且用户池内唯一。此接口不要求用户对邮箱进行验证，用户注册之后 emailVerified 字段会为 false 。如果你希望邮箱未验证的用户不能进行登录，可以在用户池的**设置** - **安全信息** 中开启**禁止未验证邮箱的用户登录**选项。

#### 参数

- `email` \<String\> 邮箱
- `password`\<String\> 密码
- `RegisterProfile` \<RegisterProfile\> 用户资料
- `forceLogin` \<Bool\> 是否走遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook ，同时该用户的累计登录次数会加 1 。默认为 false 。
- `generateToken` \<Bool\> 是否为该用户生成 token，不会触发登录后的完整流程，用户的累计登录次数不会加 1。默认为 false 。
- `clientIp` \<String\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `context` \<String\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](https://docs.authing.cn/v2/guides/pipeline/context-object.html) 中获取到。

#### 示例

```swift
AuthenticationClient.shared.registerByEmail(email: <#邮箱#>, password: <#密码#>, completion: {result in })
```

#### 返回值

- 参阅[ 用户字段释义](https://docs.authing.cn/v2/guides/user/user-profile.html)

## 用户名注册

> 使用用户名注册，用户名区分大小写且用户池内唯一。

#### 参数

- `username` \<String\> 用户名
- `password`\<String\> 密码
- `RegisterProfile` \<RegisterProfile\> 用户资料
- `forceLogin` \<Bool\> 是否走遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook ，同时该用户的累计登录次数会加 1 。默认为 false 。
- `generateToken` \<Bool\> 是否为该用户生成 token，不会触发登录后的完整流程，用户的累计登录次数不会加 1。默认为 false 。
- `clientIp` \<String\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `context` \<String\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](https://docs.authing.cn/v2/guides/pipeline/context-object.html) 中获取到。

#### 示例

```swift
AuthenticationClient.shared.registerByUsername(username: <#用户名#>, password: <#密码#>, completion:{result in })
```

#### 返回值

- 参阅[ 用户字段释义](https://docs.authing.cn/v2/guides/user/user-profile.html)

## 手机号注册

> 使用手机号注册，初始密码为可选参数。发送短信的接口参阅 [sendSmsCode](#发送短信验证码)

#### 参数

- `code` \<String\> 短信验证码
- `phone` \<String\> 手机号
-  password \<String\> 初始密码
- `RegisterProfile` \<RegisterProfile\> 用户资料
- `forceLogin` \<Bool\> 是否走遍完整的登录的，会触发登录前后的 pipeline 函数以及登录事件 webhook ，同时该用户的累计登录次数会加 1 。默认为 false 。
- `generateToken` \<Bool\> 是否为该用户生成 token，不会触发登录后的完整流程，用户的累计登录次数不会加 1。默认为 false 。
- `clientIp` \<String\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `context` \<String\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](https://docs.authing.cn/v2/guides/pipeline/context-object.html) 中获取到。

#### 示例

```swift
AuthenticationClient.shared.registerByPhoneCode(phone: <#手机号#>, code: <#验证码#>,  password: <#初始密码#>, completion:{ result in })
```

## 使用邮箱登录

#### 返回值

- 参阅[ 用户字段释义](https://docs.authing.cn/v2/guides/user/user-profile.html)

## 邮箱登录

> 使用邮箱登录，该接口默认不会限制未验证的邮箱进行登录，如果你希望邮箱未验证的用户不能进行登录，可以在用户池的**设置** - **安全信息** 中开启**禁止未验证邮箱的用户登录**选项。
>
> 如果你的用户池开启了[登录失败检测](/guides/security/config-login-fail-limit.md)，当同一 IP 下登录多次失败的时候会要求用户输入图形验证码（ErrorCode : 2000)。

#### 参数

- `email` \<String\> 邮箱
- `password` \<String\> 密码
- `autoRegister` \<Bool\> 是否自动注册。如果检测到用户不存在，会根据登录账密自动创建一个账号。
- `captchaCode` \<String\> 图形验证码
- `clientIp` \<String\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `context` \<String\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](https://docs.authing.cn/v2/guides/pipeline/context-object.html) 中获取到。

#### 示例

```swift
AuthenticationClient.shared.loginByEmail(email: <#邮箱#>, password: <#密码#>, completion:{ result in })
```

#### 返回值

- 参阅[ 用户字段释义](https://docs.authing.cn/v2/guides/user/user-profile.html)

## 用户名登录

> 使用用户名登录。如果你的用户池开启了[登录失败检测](/guides/security/config-login-fail-limit.md)，当同一 IP 下登录多次失败的时候会要求用户输入图形验证码（ErrorCode : 2000)。

#### 参数

- `username` \<String\> 用户名
- `password`\<String\> 密码
- `autoRegister` \<Bool\> 是否自动注册。如果检测到用户不存在，会根据登录账密自动创建一个账号。
- `captchaCode` \<String\> 图形验证码
- `clientIp` \<String\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `context` \<String\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](https://docs.authing.cn/v2/guides/pipeline/context-object.html) 中获取到。

#### 示例

```swift
AuthenticationClient.shared.loginByUsername(username: <#用户名#>, password: <#密码#>, completion:{ result in })
```

#### 返回值

- 参阅[ 用户字段释义](https://docs.authing.cn/v2/guides/user/user-profile.html)

## 手机号验证码登录

> 使用手机号验证码登录。你需要先使用 [sendSmsCode](#发送短信验证码) 方法发送短信验证码。

#### 参数

- `phone` \<String\> 手机号
- `code` \<String\> 短信验证码，你可以通过 [sendSmsCode](https://docs.authing.cn/v2/reference/sdk-for-swift.html#发送短信验证码) 方法发送短信验证码。
- `clientIp` \<String\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `context` \<String\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](https://docs.authing.cn/v2/guides/pipeline/context-object.html) 中获取到。

#### 示例

```swift
AuthenticationClient.shared.loginByPhoneCode(phone: <#手机号#>, code: <#验证码#>, completion:{ result in })
```

#### 返回值

- 参阅[ 用户字段释义](https://docs.authing.cn/v2/guides/user/user-profile.html)

## 手机号密码登录

> 如果用户绑定了手机号且设置了密码，可以使用手机号 + 密码的方式登录。如果你的用户池开启了[登录失败检测](/guides/security/config-login-fail-limit.md)，当同一 IP 下登录多次失败的时候会要求用户输入图形验证码（ErrorCode : 2000)。

#### 参数

- `phone` \<String\> 手机号
- `password` \<String\> 密码
- `captchaCode` \<String\> 图形验证码
- `clientIp` \<String\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。
- `context` \<String\> 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](https://docs.authing.cn/v2/guides/pipeline/context-object.html) 中获取到。

#### 示例

```swift
AuthenticationClient.shared.loginByPhonePassword(phone: <#手机号#>, password: <#密码#>,, completion:{ result in })
```

#### 返回值

- 参阅[ 用户字段释义](https://docs.authing.cn/v2/guides/user/user-profile.html)

## 子账号登录

> 如果用户开启了子账号登录，可以使用子账号登录。如果你的用户池开启了[登录失败检测](/guides/security/config-login-fail-limit.md)，当同一 IP 下登录多次失败的时候会要求用户输入图形验证码（ErrorCode : 2000)。

#### 参数

- `username` \<String\> 用户名
- `password` \<String\> 密码
- `captchaCode` \<String\> 图形验证码
- `clientIp` \<String\> 客户端真实 IP，如果你在服务器端调用此接口，请务必将此参数设置为终端用户的真实 IP。

#### 示例

```swift
AuthenticationClient.shared.loginBySubAccount(username: <#用户名#>, password: <#密码#>, completion: { (result) in }
```

#### 返回值

- 参阅[ 用户字段释义](https://docs.authing.cn/v2/guides/user/user-profile.html)

## LDAP 用户名登录

> 使用 LDAP 身份源的账号密码登录。如果此账号第一次登录，将会将其用户信息导入到用户池的用户目录中；之后再次登录，将会根据获取到的最新的账号资料更新此账号的用户信息。 点此查看[连接 LDAP 身份源](https://docs.authing.cn/v2/connections/ldap/)文档。

#### 参数

- `username` \<String\> 用户名
- `password` \<String\> 密码

#### 示例

```swift
AuthenticationClient.shared.loginByLdap(username: <#用户名#>, password: <#密码#>) { (result) in }
```

#### 返回值

- 参阅[ 用户字段释义](https://docs.authing.cn/v2/guides/user/user-profile.html)

## AD 用户名登录

> 使用 AD 域的账号登录。如果此账号第一次登录，将会将其用户信息导入到用户池的用户目录中；之后再次登录，将会根据获取到的最新的账号资料更新此账号的用户信息。 点此查看[连接 Active Directory 身份源](https://docs.authing.cn/v2/connections/windows-active-directory/)文档。

#### 参数

- `username` \<String\> 用户名
- `password` \<String\> 密码

#### 示例

```swift
AuthenticationClient.shared.loginByAD(username: <#用户名#>, password: <#密码#>) { (result) in }
```

#### 返回值

- 参阅[ 用户字段释义](https://docs.authing.cn/v2/guides/user/user-profile.html)

## 获取当前登录的用户信息

> 获取当前登录用户的用户信息，需要 AuthenticationClient 当前处于已登录状态。你可以通过两种方式设置 AuthenticationClient 的登录状态：
>
> 1. 调用登录接口（如密码登录、手机号验证码登录、社会化登录）之后，AuthenticationClient 会缓存用户的 [id_token](https://docs.authing.cn/v2/concepts/id-token.html)，从而记住登录状态；
>
> 2. 通过用户的 [id_token](https://docs.authing.cn/v2/concepts/id-token.html) 初始化 AuthenticationClient。

#### 示例

```swift
AuthenticationClient.shared.getCurrentUser(completion: { result in })
```

#### 返回值

- 参阅[ 用户字段释义](https://docs.authing.cn/v2/guides/user/user-profile.html)

## 退出登录

> 用于用户退出登录。
>
> 1. 清空该用户在当前应用下的 session 会话信息。
> 2. 将用户当前的 `id_token` 标记为已失效，使用此 `id_token`将调用 Authing 接口无法获取到相关数据。

#### 示例

```swift
AuthenticationClient.shared.logout(completion:{ result in  })
```

## 获取当前用户的自定义数据列表

> 获取当前用户的自定义数据列表，需要 AuthenticationClient 当前处于已登录状态。
>

#### 示例

```swift
AuthenticationClient.shared.listUdv(completion:{ result in })
```


## 添加用户自定义数据

> 添加用户自定义数据，需要 AuthenticationClient 当前处于已登录状态。

#### 参数

- `key` \<String\> 自定义数据的 Key
- `value` \<String\> 自定义数据的 Value

#### 示例

```swift
AuthenticationClient.shared.setUdv(key: <#Key#>, value: <#Value#>, completion: { (result) in })
```



## 获取用户所在组织机构数据列表

#### 示例

```swift
AuthenticationClient.shared.listOrg(completion: { result in })
```



## 发送短信验证码

> 送短信验证码, 目前仅支持国内手机号；该接口有接口频率限制，请勿频繁请求。

#### 参数

- `phone` \<String\> 手机号

#### 示例

```swift
AuthenticationClient.shared.sendSmsCode(phone: <#手机号#>, completion: { result in })
```

## 发送邮件

> 主动发送邮件给用户，目前支持的 4 类邮件包含：重置密码邮件、验证邮箱邮件、修改邮箱验证码邮件、MFA 验证邮件。同时你可以[自定义邮件模版和配置第三方邮件服务商](/guides/userpool-config/email/)。

#### 参数

- `email` \<String\> 邮箱
- `scene`  \<EmailScene\> 发送场景，可选值包含：
  - RESET_PASSWORD_VERIFY_CODE: 发送重置密码验证码邮件；
  - FIRST_EMAIL_LOGIN_VERIFY: 发送首次邮箱登录验证邮件；
  - CONSOLE_CONDUCTED_VERIFY: 发送控制台发起的验证邮件；
  - EMAIL_BIND_VERIFY_CODE: 发送邮箱绑定验证码邮件；
  - EMAIL_UNBIND_VERIFY_CODE: 发送邮箱解绑验证码邮件；
  - REGISTER_VERIFY_CODE: 发送注册验证码邮件；
  - LOGIN_VERIFY_CODE: 发送登录验证码邮件；
  - MFA_VERIFY_CODE: 发送 MFA 验证码邮件；
  - INFORMATION_COMPLETION_VERIFY_CODE: 发送信息补全验证码邮件；

#### 示例

```swift
AuthenticationClient.shared.sendEmail(email: <#邮箱#>, scene: <#scene#>, completion: { result in })
```

## 获取自定义数据

> 获取用户的所有自定义数据。你需要先在用户池[定义用户自定义数据元信息](/guides/users/user-defined-field/)。

#### 示例

```swift
AuthenticationClient.shared.listUdv(completion:{ result in })
```


## 删除自定义数据

#### 参数

- `key` \<String\> 自定义字段的 key 

#### 示例

```swift
AuthenticationClient.shared.removeUdv(key: <#key#>, completion:{ result in })
```

## 检测登录状态

#### 示例

```swift
AuthenticationClient.shared.checkLoginStatus(token: <#token#>, completion:{ result in })
```

## 通过短信验证码重置密码

> 通过短信验证码重置密码，你可以通过 [sendSmsCode](#发送短信验证码) 方法发送短信验证码。

#### 参数

- `phone` \<String\> 手机号
- `code` \<String\> 验证码
- `newPassword` \<String\> 新的密码

#### 示例

```swift
AuthenticationClient.shared.resetPasswordByPhoneCode(phone: <#手机号#>, code: <#验证码#>, newPassword: <#新的密码#>, completion: { (result) in })
```

## 通过邮件验证码重置密码

> 通过邮件验证码重置密码，你需要先调用 [sendEmail](#发送邮件) 接口发送重置密码邮件（场景值为 `RESET_PASSWORD`）。

#### 参数

- `email` \<String\> 邮箱
- `code` \<String\> 验证码
- `newPassword` \<String\> 新的密码

#### 示例

```swift
AuthenticationClient.shared.resetPasswordByEmailCode(email: <#邮箱#>, code: <#验证码#>, newPassword: <#新的密码#>, completion:{ (result) in })
```

## 修改用户资料

> 修改用户资料，此接口不能用于修改手机号、邮箱、密码，如果需要请调用 [updatePhone](#更新用户手机号)、[updateEmail](#更新用户邮箱)、[updatePassword](#更新用户密码) 接口。

#### 参数

- `username` \<String\> 用户名
- `nickname` \<String\> 昵称
- `photo` \<String\> 头像
- `company` \<String\> 公司
- `browser` \<String\> 浏览器
- `device` \<String\> 设备
- `lastIP` \<String\> 最近登录的 IP
- `name` \<String\> Name
- `givenName` \<String\> Given Name
- `familyName`  \<String\> Family Name
- `formatted` \<String\> 详细地址
- `middleName` \<String\> Middle Name
- `profile` \<String\> Profile Url
- `preferredUsername` \<String\> Preferred Name
- `website` \<String\> 个人网站
- `gender` \<String\> 性别, M（Man） 表示男性、F（Female） 表示女性、未知表示 U（Unknown）
- `birthdate` \<String\> 生日
- `zoneinfo` \<String\> 时区
- `locale` \<String\> 语言
- `address` \<String\> 地址
- `streetAddress` \<String\>  街道地址
- `locality` \<String\> 
- `region`  \<String\> 地域
- `postalCode` \<String\> 邮编
- `city` \<String\> 城市
- `province` \<String\> 省份
- `country` \<String\> 国家

#### 示例

```swift
AuthenticationClient.shared.updateProfile(email: <#邮箱#>, completion: { (result) in })
```

## 更新用户密码

#### 参数

- `newPassword` \<String\> 新密码

#### 示例

```swift
AuthenticationClient.shared.updatePassword(newPassword: <#新密码#>, completion:{ (result) in })
```

## 绑定手机号

> 用户初次绑定手机号，如果需要修改手机号请使用 [updatePhone](#更新用户手机号) 方法。如果该手机号已被绑定，将会绑定失败。发送验证码请使用 [sendSmsCode](#发送短信验证码) 方法。

#### 参数

- `phone` \<String\> 手机号
- `phoneCode` \<String\>短信验证码，你可以通过 [sendSmsCode](#发送短信验证码) 方法发送短信验证码

#### 示例

```swift
AuthenticationClient.shared.bindPhone(phone: <#手机号#>, phoneCode: <#验证码#>, completion: { (result) in })
```

## 解绑手机号

> 用户解绑手机号，如果用户没有绑定其他登录方式（邮箱、社会化登录账号），将无法解绑手机号，会提示错误。
>

#### 示例

```swift
AuthenticationClient.shared.unbindPhone(completion: { (result) in })
```

## 更新用户手机号

> 更新用户手机号，和修改邮箱一样，默认情况下，如果用户当前已经绑定了手机号，需要同时验证原有手机号（目前账号绑定的手机号）和当前邮箱（将要绑定的手机号）。 也就是说，用户 A 当前绑定的手机号为 15888888888，想修改为 15899999999，那么就需要同时验证这两个手机号。 开发者也可以选择不开启 “验证原有手机号“ ，可以在 {{$localeConfig.brandName}} 控制台的**设置**目录下的**安全信息**模块进行关闭。
>
> 用户首次绑定手机号请使用 [bindPhone](#绑定手机号) 接口。

#### 参数

- `phone` \<String\> 新手机号
- `phoneCode` \<String\> 新手机号的验证码
- `oldPhone` \<String\> 旧手机号
- `oldPhoneCode `\<String\> 旧手机号的验证码

#### 示例

```swift
AuthenticationClient.shared.updatePhone(phone: <#手机号#>, phoneCode: <#验证码#>, oldPhone: <#旧手机号#>, oldPhoneCode: <#旧验证码#>, completion: { result in })
```

## 绑定邮箱

> 用于用户初次绑定邮箱，需检验邮箱验证码。如果需要修改邮箱请使用 [updateEmail](#更新用户邮箱) 方法。如果该邮箱已被绑定，将会绑定失败。发送邮件验证码请使用 [sendEmail](#发送邮件) 方法。

#### 参数

- `email`\<String\> 邮箱
- `emailCode`\<String\> 邮件验证码，可通过 [sendEmail](#发送邮件) 方法获得，EmailScene 为 CHANGE_EMAIL

#### 示例

```swift
AuthenticationClient.shared.bindEmail(email: <#邮箱#>, emailCode: <#验证码#>, completion: { (result) in })
```

## 解绑邮箱

> 用户解绑手机号，如果用户没有绑定其他登录方式（手机号、社会化登录账号），将无法解绑邮箱，会提示错误。
>

#### 示例

```swift
AuthenticationClient.shared.unbindEmail(completion: { (result) in })
```

## 更新用户邮箱

> 如果用户已经绑定了邮箱，默认情况下，需要同时验证原有邮箱（目前账号绑定的邮箱）和当前邮箱（将要绑定的邮箱）。也就是说，用户 A 当前绑定的邮箱为 123456@qq.com，想修改为 1234567@qq.com，那么就需要同时验证这两个邮箱。 开发者也可以选择不开启 “验证原有邮箱“ ，可以在 {{$localeConfig.brandName}} 控制台的**设置**目录下的**安全信息**模块进行关闭。
>
> 用户首次绑定邮箱请使用 [bindEmail](#绑定邮箱) 接口。

#### 参数

- `email` \<String\> 新邮箱
- `emailCode` \<String\> 新邮箱的验证码
- `oldEmail`\<String\> 旧邮箱
- `oldEmailCode`\<String\> 旧邮箱的验证码

#### 示例

```swift
AuthenticationClient.shared.updateEmail(email: <#邮箱#>, emailCode: <#验证码#>, oldEmail: <#旧邮箱#>, oldEmailCode: <#旧邮箱验证码#>, completion: { result in })
```

## 刷新当前用户 Token

> 刷新当前用户 Token，调用此接口要求先登录。

#### 示例

```swift
AuthenticationClient.shared.refreshToken(completion:{ result in })
```

## 主账号解绑社会化登录账号

#### 参数

- `primaryUserToken`\<String\> 主账号用户的 `id_token`；
- `provider` \<ProviderType\> 你可以[在此查看支持的所有社会化登录类型](/guides/authentication/social/)。

#### 示例

```swift
AuthenticationClient.shared.socialUnLink(primaryUserToken: <#id_token#>, completion: { (result) in })
```

## 检查密码强度

> 检查密码强度，[点此查看详情](/guides/security/config-password.md)。
>
> 判断密码是否符合密码强度要求。{{$localeConfig.brandName}} 中密码强度等级分为以下几种：
>
> - 任意非空字符串；
> - 至少 6 位字符；
> - 至少 6 位字符，且须包含英文、数字与符号中的两种；
> - 至少 6 位字符，且密码中须包含英文、数字与符号。

#### 参数

- `password `\<String\> 密码

#### 示例

```swift
AuthenticationClient.shared.checkPasswordStrength(password: <#密码#>, completion: { (result) in })
```

## 计算密码安全等级

#### 参数

- `password  ` \<String\>  需要计算的密码（明文格式），必须为 `String` 类型。

#### 示例

```swift
AuthenticationClient.shared.computedPasswordSecurityLevel(proclaimedPassword: <#密码#>, completion: { (result) in })
```

## 获取当前用户能够访问的应用

#### 参数

- `page` \<number\> 分页序号, 默认为 `1`。
- `limit`\<number\> 每页返回的个数, 默认为 `10`。

#### 示例

```swift
AuthenticationClient.shared.listApplications(page: <#page#>, limit: <#limit#>, completion: { (result) in })
```

## 获取用户被授权的所有资源列表

> 用户被授权的所有资源里面包括从角色、分组、组织机构继承的资源。

#### 示例

```swift
AuthenticationClient.shared.listAuthorizedResources(completion: { (result) in })
```

# 4. 社会化登录

> Authing 目前共支持微信扫码、微信网页授权、微信小程序、微信移动应用、GitHub、Google、微博、钉钉、QQ、支付宝移动端、企业微信内部应用扫码登录、企业微信第三方服务商扫码登录、企业微信第三方服务商网页授权登录等 10 余种社会化登录方式。

> Authing Swift 版本目前只支持 Authing H5 Guard 托管，微信和支付宝登录。

> [Authing 社会化登录](./sdk-for-swift/swift-authinglogin.md) 

> [微信社会化登录](./sdk-for-swift/swift-wechatlogin.md) 

> [支付宝社会化登录](./sdk-for-swift/swift-alipaylogin.md) 

