# iOS 

本指南将从  Authing iOS SDK 的安装开始逐步引导你如何快速为你已有或新开发的应用添加用户认证能力。

<AppDetailSiderBar />

## 安装

### 代码地址

| 条目     | 说明                                        |
| -------- | ------------------------------------------- |
| 支持版本 | iOS 11.0 +  
| 仓库地址 | [https://github.com/Authing/guard-ios](https://github.com/Authing/guard-ios) |


### 添加依赖

1. 在 swift package 搜索栏输入：https://github.com/Authing/guard-ios

2. 依赖规则选择 Up to Next Major Version 1.0.0

3. 勾选 Guard 然后点击 Add Package

### 初始化


```swift
//App 启动时，初始化 Authing iOS SDK
import Guard
class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        Authing.start(<#Authing_APPID#>);
    }
}
```



## 认证你的用户

### 注册

```swift
//使用 OIDC 邮箱注册帐号，邮箱不区分大小写且用户池内唯一。
OIDCClient().registerByEmail(email: <#邮箱#>, password: <#明文密码#>) { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```


### 登录


```swift
OIDCClient().loginByAccount(account: <#账号#>, password: <#密码#>) { code,  message,  userInfo in
    print("\(userInfo?.accessToken ?? "")")
    print("\(userInfo?.idToken ?? "")")
    print("\(userInfo?.refreshToken ?? "")")
}
```



## 错误处理
```swift
OIDCClient().loginByAccount(account: "account", password: "password") { code,  message,  userInfo in
    if (code == 200) {
        //当 code 不为 200 时，错误信息将通过 message 返回
    } else {
        // error
        print(code)
        print(message)
    }
}
```
