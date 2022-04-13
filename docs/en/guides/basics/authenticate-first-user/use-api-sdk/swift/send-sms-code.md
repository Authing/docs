Send SMS code using `sendSmsCode` method.

```swift
self.client?.sendSmsCode(phone: textPhone.text!, completion: { status in
    print(status)
})
```