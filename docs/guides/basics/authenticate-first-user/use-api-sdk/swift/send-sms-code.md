使用 `sendSmsCode` 方法发送验证码：

```swift
self.client?.sendSmsCode(phone: textPhone.text!, completion: { status in
    print(status)
})
```