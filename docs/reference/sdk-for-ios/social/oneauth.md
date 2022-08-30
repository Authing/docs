# 手机号一键登录

<LastUpdated/>

## 接入步骤

### 添加依赖

> Guard-iOS-binary 依赖于 Guard 组件

- 在 swift package 搜索栏输入：https://github.com/Authing/authing-binary

- 依赖规则选择 Up to Next Major Version 1.0.0

- Add Package 后勾选 OneAuth

<br>

### 在应用启动的时候设置：

```swift
import Guard
import OneAuth
Authing.start(<#Authing AppId#>);
OneAuth.register(businessId:<#your_businessId#>)
 ```

### 发起认证

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

