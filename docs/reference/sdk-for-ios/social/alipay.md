# 支付宝登录

<LastUpdated/>

## 初始化 Guard SDK

通过 Swift Package Manager 引入 Guard 依赖并调用初始化函数。[详细步骤](/reference/sdk-for-ios)

## 支付宝授权码登录

在拿到支付宝授权码后调用此接口：

```swift
func loginByAlipay(_ code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *code* 支付宝授权码

**示例**

```swift
AuthClient().loginByAlipay(authCode) { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```
