# 设备管理 API

<LastUpdated/>

:::hint-info
设备管理新增于 [Guard-iOS 1.4.5](https://github.com/Authing/guard-ios) 版本。
:::

<br>

## 上报设备

```swift
func createDevice(_ customData: String? = nil , completion: @escaping(Int, String?, NSDictionary?) -> Void)
```

**参数**

* *customData* 自定义字段

**示例**

```swift
AuthClient().createDevice { code, msg, data in
    if (code == 200) {
        // 成功
    }     
}
```

<br>

## 获取设备信息

```swift
func deviceList(completion: @escaping(Int, String?, NSDictionary?) -> Void)
```

**示例**

```swift
AuthClient().deviceList { code, message, res in
    if (code == 200) {
        // 成功
    }       
}
```

## 根据设备 ID 移除设备

```swift
func removeDevice(deviceId: String, completion: @escaping(Int, String?, NSDictionary?) -> Void)
```

**参数**

* *deviceId* 设备 ID

**示例**

```swift
AuthClient().removeDevice(deviceId: "ID") { code, message, res in
    if (code == 200) {
        // 成功
    }       
}
```

## 根据设备 ID 登出设备

```swift
func logoutByDeviceId(deviceId: String, completion: @escaping(Int, String?, NSDictionary?) -> Void)
```

**参数**

* *deviceId* 设备 ID

**示例**

```swift
AuthClient().logoutByDeviceId(deviceId: "ID") { code, message, res in
    if (code == 200) {
        // 成功
    }       
}
```

## 订阅设备事件

```swift
func func subEvent(eventCode: String, _ accessToken: String? = nil, completion: @escaping (Int, String?) -> Void)
```

**参数**

* *eventCode* 事件编码
* *accessToken* AccessToken

**示例**

```swift
import Foundation
import UIKit
import Guard

enum DeviceForceLogout: Int {
    case LOGOUT_ANOTHER = 0
    case PROFILE_UNBIND = 1
    case SUSPEND_DEVICE_BY_USER = 2
    case SUSPEND_DEVICE = 3
    case DISABLE_DEVICE_BY_USER = 4
    case DISABLE_DEVICE = 5
    case DELETE_DEVICE_BY_USER = 6
    case DELETE_DEVICE = 7
}

class DeviceEventManager: NSObject {
    
    @objc public static let shared = DeviceEventManager()
    private override init() {}

    /**
     - 插入一个事件监听
     - Parameters:
        - host: 事件监听的 host
        - accessToken: 登录成功后的 AccessToken
        - accessTokenId: 登录成功后的 accessTokenId
     */
    func insertEvent(host: String?, accessToken: String?, accessTokenId: String?) {
        
        if let websocketHost = host {
            
            Authing.getConfig() { config in
                if config?.deviceFuncEnabled == true {
                    
                    Authing.setWebsocketHost(websocketHost: websocketHost)
                    
                    AuthClient().subEvent(eventCode: "authing.device.force-logout", accessToken) { code, message in
                        if let jsonString = message {
                            if let data = Utils.convertStringToDictionary(text: jsonString),
                               let atId = data["accessTokenId"] as? String,
                               let appId = data["appId"] as? String,
                               let userId = data["userId"] as? String,
                               let logoutType = data["logoutType"] as? Int,
                               accessTokenId ==  atId {
                                switch DeviceForceLogout(rawValue: logoutType) {
                                case .LOGOUT_ANOTHER:
                                    break
                                case .PROFILE_UNBIND:
                                    break
                                case .SUSPEND_DEVICE_BY_USER, .SUSPEND_DEVICE:
                                    break
                                case .DISABLE_DEVICE_BY_USER, .DISABLE_DEVICE:
                                    break
                                case .DELETE_DEVICE_BY_USER, .DELETE_DEVICE:
                                    break
                                default:
                                    break
                                }
                            }
                        } else {
                            print("message is nil")
                        }
                    }
                }
            }
        }
    }
}

```