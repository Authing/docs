使用 `sendSmsCode` 方法进行手机号验证码登录：

```swift
self.client?.loginByPhoneCode(phone: textPhone.text!, code: textPhonecode.text!, completion:{ status in
    f(status.errors == nil) {
        //Success
        print(status.data?.loginByPhoneCode ?? "")
    } else {
        //Failure
        print(status.errors ?? "")
    }
})
```