Use `loginByPhoneCode` method to login.

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