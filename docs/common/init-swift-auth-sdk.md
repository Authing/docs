首先使用[用户池 ID](/guides/faqs/get-userpool-id-and-secret.md) 和[应用 ID](/guides/faqs/get-app-id-and-secret.md) 初始化 [Swift SDK](/reference-new/sdk-for-swift.md)：

```swift
let userPoolId = "userPoolId"
let appId = "appId"

var client: AuthenticationClient?
self.client = AuthenticationClient(userPoolId: userPoolId, appId: appId)
```