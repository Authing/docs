!!!include(common/init-swift-auth-sdk.md)!!!

设置自定义字段：

```swift
self.client?.setUdv(key: "HelloDate", value: Date(), completion:{ status in
    if(status.errors == nil) {
        //Success
         print(status.data?.setUdv ?? "")
    } else {
        //Failure
        print(status.errors ?? "")
    }
})
```

获取该用户最新的自定义数据：

```swift
self.client?.listUdv(completion:{ status in
    if(status.errors == nil) {
        //Success
         print(status.data?.udv ?? "")
    } else {
        //Failure
        print(status.errors ?? "")
    }
})
```
