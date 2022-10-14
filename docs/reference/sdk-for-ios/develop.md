# 托管页

<LastUpdated/>

通过 Guard 托管页提供的标准认证流程和界面，应用程序可以 1 分钟完成接入。

首先确保已经完成了 [开发准备工作](./quick.md)，在需要认证的地方调用：

>AuthFlow 对象为 Guard 托管页提供入口。

```swift
import Guard
AuthFlow().start { [weak self] code, message, userInfo in
    if code == 200 {
        // userInfo 为用户信息
    }
}
```

效果如下：

<img src="./images/standard.png" alt="drawing" width="320"/>

<br>

若开发者想使用 OIDC 协议登录，仅需声明一行 flow.authProtocol = .EOIDC 即可：

```swift
import Guard
let flow = AuthFlow()
flow.authProtocol = .EOIDC
flow.start()  { [weak self] code, message, userInfo in
    if code == 200 {
        // userInfo 为用户信息
    }
}
```
