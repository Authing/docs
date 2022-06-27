# Login by Alipay

<LastUpdated/>

## Initialize Guard SDK

Introduce Guard dependencies through Swift Package Manager and call the initialization function. [detailed steps](/reference/sdk-for-ios)

## login by Alipay auth code

When you get auth code, please call this API to get Authing user info:

```swift
func loginByAlipay(_ code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Parameter**

* *code* auth code from alipay

**Example**

```swift
AuthClient().loginByAlipay(authCode) { code, message, userInfo in
    if (code == 200) {
        // userInfo
    }
}
```
