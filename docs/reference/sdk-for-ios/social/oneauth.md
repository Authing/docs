# 手机号一键登录

<LastUpdated/>

## 准备工作

请参阅 [易盾一键登录](https://docs.authing.cn/v2/guides/connections/social/yidun/)。

## 集成一键登录登录步骤

### 步骤 1：添加一键登录登录依赖

1. 在 swift package 搜索栏输入：https://github.com/Authing/authing-binary 。

2. 选择 [Authing-binary](https://github.com/Authing/authing-binary)。
> [Authing-binary](https://github.com/Authing/authing-binary) 依赖于 [Guard-iOS SDK](https://github.com/Authing/guard-ios)。

3. 依赖规则选择 **Up to Next Major Version 1.0.0** 。

4. Add Package 后勾选 **OneAuth** 。

<br>

### 步骤 2：初始化一键登录

1. 在 AppDelegate 或 SceneDelegate 中加入 import Guard 和 import OneAuth 。

2. 调用 Authing.start() 初始化 Guard SDK 。

3. OneAuth.register 需要传入易盾控制台发放的 **businessId** 。

```swift
import Guard
import OneAuth
Authing.start(<#AUTHING_APP_ID#>)
OneAuth.register(businessId:<#your_businessId#>)
 ```

### 步骤 3：发起一键登录认证

```Swift
OneAuth.start(self) { code, message, userInfo in
    if (code == 200) {
        //userInfo
    }
}
```

* 若需要自定义 UI，首先参考 [易盾文档](https://support.dun.163.com/documents/287305921855672320?docId=429869784953151488#%E8%B0%83%E7%94%A8%E7%A4%BA%E4%BE%8B) 生成 NTESQuickLoginModel 对象，然后调用：

```Swift
let model: NTESQuickLoginModel = NTESQuickLoginModel()
OneAuth.start(self, model: model) { code, message, userInfo in
    if (code == 200) {
        //userInfo
    }
}
```

- 若想基于易盾自己实现一键登录流程，在拿到 token 和 access token 后，可以调用：

```Swift
func loginByOneAuth(token: String, accessToken: String, completion: @escaping(Int, String?, UserInfo?) -> Void) {}
```

**参数**

- *token* 运营商返回
- *accessToken* 运营商返回

**示例**

```Swift
AuthClient().loginByOneAuth(token: <#Token#>, accessToken: <#AccessToken#>) { code, message, userInfo in
    //userInfo
}
```

