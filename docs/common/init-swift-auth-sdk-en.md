Use the [UserPool ID](/guides/faqs/get-userpool-id-and-secret.md) and [AppID](/guides/faqs/get-app-id-and-secret.md) to initialize the `AuthenticationClient` of the [Swift SDK](/reference-new/sdk-for-swift.md):

```swift
let userPoolId = "userPoolId"
let appId = "appId"

var client: AuthenticationClient?
self.client = AuthenticationClient(userPoolId: userPoolId, appId: appId)
```