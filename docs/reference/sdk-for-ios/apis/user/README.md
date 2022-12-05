# 用户管理 API

<LastUpdated/>

## 获取用户自定义数据

获取用户自定义数据，你需要先在用户池 [定义用户自定义数据元信息](/guides/users/user-defined-field/)，用户自定义数据会添加到传入的 userInfo 对象里面。调用此接口需要先登录。

```swift
func getCustomUserData(userInfo: UserInfo, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *userInfo* 用户信息对象

**示例**

```swift
AuthClient().getCustomUserData(userInfo: Authing.getCurrentUser()) { code, message, userInfo in
    if (code == 200) {
        userInfo.customData // [NSMutableDictionary]?
    }
}
```

**错误码**

* 2020 未登录

<br>

## 设置用户自定义数据

设置用户的自定义数据。你需要先在用户池 [定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。

调用此接口需要先登录

```swift
func setCustomUserData(customData: NSDictionary, completion: @escaping(Int, String?, NSDictionary?) -> Void)
```

**参数**

* *customData* key-value 形式的 JSONObject 对象

**示例**

```swift
let object = ["your_custom_data_key": "your_custom_data_value"]
AuthClient().setCustomUserData(customData: object) { code, message, data in
    if (code == 200) {

    }
}
```

**错误码**

* 2020 未登录

<br>

## 更新用户头像

通过从系统选择一张图片来更新用户头像，调用此接口需要先登录。

```swift
func uploadAvatar(image: UIImage, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *image* 图片对象。推荐使用系统默认图片选择器获取

**示例**

启动系统默认图片选择器。

```swift
let picker = UIImagePickerController()
picker.delegate = self
picker.allowsEditing = true
picker.sourceType = UIImagePickerController.SourceType.photoLibrary
self.viewController?.present(picker, animated: true, completion: nil)
```

启动代码中，picker.delegate 需要实现 UINavigationControllerDelegate, UIImagePickerControllerDelegate 协议

通过以下回调拿到图片，并调用更新头像接口。

```swift
public func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
    if let image = info[.editedImage] as? UIImage {
        AuthClient().uploadAvatar(image: image) { code, message, userInfo in
            if (code == 200) {
                print("upload success")
            } else {
                print("upload failed")
            }
        }
    } else {
        print("pick image error")
    }
    
    picker.dismiss(animated: true, completion:nil)
}
```

**错误码**

* 2020 未登录

<br>

## 修改用户资料

修改用户资料，此接口不能用于修改手机号、邮箱、密码。

```swift
func updateProfile(_ object: NSDictionary, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *object* 需要修改的用户资料对象

可以通过此接口更新资料的字段：

* username
* nickname
* company
* photo
* browser
* device
* name
* givenName
* familyName
* middleName
* profile
* preferredUsername
* website
* gender
* birthdate
* zoneinfo
* locale
* address
* streetAddress
* locality
* region
* postalCode
* city
* province
* country

**示例**

```swift
let object = ["username": "elonmusk", "nickname": "Ironman"]
AuthClient().updateProfile(object: object) { code, message, userInfo in
    if (code == 200) {

    }
}
```

**错误码**

* 2020 未登录

<br>

## 获取用户账号安全等级

获取当前登录帐号的安全等级。

```swift
func getSecurityLevel(completion: @escaping(Int, String?, NSDictionary?) -> Void)
```

**示例**

```swift
AuthClient().getSecurityLevel { code, message, data in
    if (code == 200) {

    }
}
```

**回调 data 数据结构**

```json
{
    "score": 60,
    "email": false,
    "phone": false,
    "password": true,
    "passwordSecurityLevel": 1,
    "mfa": false
}
```

**错误码**

* 2020 未登录

<br>

## 刷新当前用户的 ID Token

```swift
func updateIdToken(completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**示例**

```swift
AuthClient().updateIdToken { code, message, userInfo in
    if (code == 200) {

    }
}
```

**错误码**

* 2020 未登录

<br>

## 获取当前用户能够访问的应用

获取当前用户能够访问的应用。注意返回的结果数据结构为 NSArray。

```swift
func listApplications(page: Int = 1, limit: Int = 10, completion: @escaping(Int, String?, NSArray?) -> Void)
```

**参数**

* *page* 分页序号, 默认为 `1`。
* *limit* 每页返回的个数, 默认为 `10`。

**示例**

```swift
AuthClient().listApplications { code, message, applications in
    if (code == 200) {

    }
}
```

**返回结果示例**

```json
{
    "code": 200,
    "message": "获取可访问的应用列表成功",
    "data": {
        "list": [
            {
                "id": "61ae0c9807451d6f30226bd4",
                "name": "lance-test",
                "logo": "https://files.authing.co/authing-console/default-app-logo.png",
                "domain": "lance-test",
                "description": null,
                "createdAt": "2021-12-06T13:14:01.123Z",
                "updatedAt": "2022-01-20T10:51:02.806Z",
                "protocol": "oidc",
                "isIntegrate": false,
                "appType": "INDIVIDUAL",
                "template": null
            }
        ],
        "totalCount": 1
    }
}
```

**错误码**

* 2020 未登录

<br>

## 获取用户所在组织机构

获取用户所在组织机构。由于用户可以在多个独立的组织机构树下，所以本接口返回了一个二位数组。注意返回的结果数据结构为 NSArray。

```swift
func listOrgs(completion: @escaping(Int, String?, NSArray?) -> Void)
```

**示例**

```swift
AuthClient().listOrgs { code, message, organizations in
    if (code == 200) {

    }
}
```

**返回结果示例**

```json
{
    "code": 200,
    "message": "获取用户组织机构列表成功",
    "data": [
        [
            {
                "type": "org",
                "id": "6108e6fd64c0de1975728fe9",
                "createdAt": "2021-08-03T06:49:33.907Z",
                "updatedAt": "2021-08-03T06:49:33.920Z",
                "userPoolId": "60caaf41da89f1954875cee1",
                "rootNodeId": "6108e6fd552ad0a95a2ac771",
                "logo": null,
                "tenantId": null
            },
            {
                "type": "node",
                "id": "6108e6fd552ad0a95a2ac771",
                "createdAt": "2021-08-03T06:49:33.911Z",
                "updatedAt": "2021-08-03T06:49:33.911Z",
                "userPoolId": "60caaf41da89f1954875cee1",
                "orgId": "6108e6fd64c0de1975728fe9",
                "name": "HR",
                "nameI18n": null,
                "description": null,
                "descriptionI18n": null,
                "order": null,
                "code": null,
                "leaderUserId": null
            },
            {
                "type": "node",
                "id": "6108e710d2120ac0eb9af7d7",
                "createdAt": "2021-08-03T06:49:52.670Z",
                "updatedAt": "2021-08-03T06:49:52.670Z",
                "userPoolId": "60caaf41da89f1954875cee1",
                "orgId": "6108e6fd64c0de1975728fe9",
                "name": "DevHR",
                "nameI18n": null,
                "description": null,
                "descriptionI18n": null,
                "order": null,
                "code": null,
                "leaderUserId": null
            },
            {
                "type": "node",
                "id": "6108e7763c30fecb43f9b6a4",
                "createdAt": "2021-08-03T06:51:34.505Z",
                "updatedAt": "2021-08-03T06:51:34.505Z",
                "userPoolId": "60caaf41da89f1954875cee1",
                "orgId": "6108e6fd64c0de1975728fe9",
                "name": "swiftDevHR",
                "nameI18n": null,
                "description": null,
                "descriptionI18n": null,
                "order": null,
                "code": null,
                "leaderUserId": null
            }
        ],
        [
            {
                "type": "org",
                "id": "61e9408778066eaab14965de",
                "createdAt": "2022-01-20T10:59:19.035Z",
                "updatedAt": "2022-01-20T10:59:19.051Z",
                "userPoolId": "60caaf41da89f1954875cee1",
                "rootNodeId": "61e94087cf40643c9637e03c",
                "logo": null,
                "tenantId": null
            },
            {
                "type": "node",
                "id": "61e94087cf40643c9637e03c",
                "createdAt": "2022-01-20T10:59:19.042Z",
                "updatedAt": "2022-01-20T10:59:19.042Z",
                "userPoolId": "60caaf41da89f1954875cee1",
                "orgId": "61e9408778066eaab14965de",
                "name": "RD",
                "nameI18n": null,
                "description": null,
                "descriptionI18n": null,
                "order": null,
                "code": null,
                "leaderUserId": null
            },
            {
                "type": "node",
                "id": "61e94092ac13f7afd26d05b7",
                "createdAt": "2022-01-20T10:59:30.405Z",
                "updatedAt": "2022-01-20T10:59:30.405Z",
                "userPoolId": "60caaf41da89f1954875cee1",
                "orgId": "61e9408778066eaab14965de",
                "name": "Mobile",
                "nameI18n": null,
                "description": null,
                "descriptionI18n": null,
                "order": null,
                "code": null,
                "leaderUserId": null
            }
        ],
        [
            {
                "type": "org",
                "id": "6108e6fd64c0de1975728fe9",
                "createdAt": "2021-08-03T06:49:33.907Z",
                "updatedAt": "2021-08-03T06:49:33.920Z",
                "userPoolId": "60caaf41da89f1954875cee1",
                "rootNodeId": "6108e6fd552ad0a95a2ac771",
                "logo": null,
                "tenantId": null
            },
            {
                "type": "node",
                "id": "6108e6fd552ad0a95a2ac771",
                "createdAt": "2021-08-03T06:49:33.911Z",
                "updatedAt": "2021-08-03T06:49:33.911Z",
                "userPoolId": "60caaf41da89f1954875cee1",
                "orgId": "6108e6fd64c0de1975728fe9",
                "name": "HR",
                "nameI18n": null,
                "description": null,
                "descriptionI18n": null,
                "order": null,
                "code": null,
                "leaderUserId": null
            },
            {
                "type": "node",
                "id": "6108e710d2120ac0eb9af7d7",
                "createdAt": "2021-08-03T06:49:52.670Z",
                "updatedAt": "2021-08-03T06:49:52.670Z",
                "userPoolId": "60caaf41da89f1954875cee1",
                "orgId": "6108e6fd64c0de1975728fe9",
                "name": "DevHR",
                "nameI18n": null,
                "description": null,
                "descriptionI18n": null,
                "order": null,
                "code": null,
                "leaderUserId": null
            },
            {
                "type": "node",
                "id": "62039e6b017b8cf3b5bb6ec4",
                "createdAt": "2022-02-09T10:58:51.422Z",
                "updatedAt": "2022-02-09T10:59:16.718Z",
                "userPoolId": "60caaf41da89f1954875cee1",
                "orgId": "6108e6fd64c0de1975728fe9",
                "name": "SwiftDevHR",
                "nameI18n": null,
                "description": "",
                "descriptionI18n": null,
                "order": null,
                "code": null,
                "leaderUserId": null
            }
        ]
    ]
}
```

**错误码**

* 2020 未登录

<br>

## 获取角色

获取当前登录用户的角色。注意返回的数据结构为 NSArray。

```swift
func listRoles(namespace: String? = nil, completion: @escaping(Int, String?, NSArray?) -> Void)
```

**参数**

* *namespace* 权限分组 ID，用来过滤角色数据。如果传空，则返回用户所有角色

**示例**

```swift
AuthClient().listRoles { code, message, roles in
    if (code == 200) {

    }
}
```

**返回结果示例**

```json
{
    "code": 200,
    "message": "获取成功",
    "data": [
        {
            "id": "61ada935ce061fe3476f0f09",
            "createdAt": "2021-12-06T06:09:57.523Z",
            "updatedAt": "2021-12-06T06:09:57.523Z",
            "userPoolId": "60caaf41da89f1954875cee1",
            "code": "admin",
            "description": null,
            "parentCode": null,
            "isSystem": false,
            "namespaceId": 36141,
            "namespace": "60caaf414f9323f25f64b2f4"
        }
    ]
}
```

**错误码**

* 2020 未登录

<br>

## 获取用户被授权的所有资源列表

获取一个用户被授权的所有资源，用户被授权的所有资源里面包括从角色、分组、组织机构继承的资源。

```swift
func listAuthorizedResources(namespace: String = "default", resourceType: String? = nil, completion: @escaping(Int, String?, NSArray?) -> Void)
```

**参数**

* *namespace* 权限分组 ID
* *resourceType* 资源类型。可以为以下几种类型 DATA, API, MENU, UI, BUTTON。如果传空，则返回所有资源类型数据

**示例**

```swift
AuthClient().listAuthorizedResources { code, message, resources in
    if (code == 200) {

    }
}
```

**返回结果示例**

```json
{
    "totalCount": 1,
    "list": [
        {
            "code": "ci:*",
            "type": "DATA",
            "actions": [
                "*"
            ],
            "apiIdentifier": null
        }
    ]
}
```

**错误码**

* 2020 未登录

<br>

## 删除帐号

用户自助删除当前登录帐号。

> 此操作不可逆，请谨慎操作。

```swift
func deleteAccount(completion: @escaping(Int, String?) -> Void)
```

**示例**

```swift
let cancel = NSLocalizedString("authing_cancel", bundle: Bundle(for: Self.self), comment: "")
let tip = NSLocalizedString("authing_delete_account_tip", bundle: Bundle(for: Self.self), comment: "")
let alert = UIAlertController(title: nil, message: tip, preferredStyle: UIAlertController.Style.alert)

alert.addAction(UIAlertAction(title: "OK", style: .default, handler: { (action: UIAlertAction!) in
    AuthClient().deleteAccount { code, message in
        if (code == 200) {
            
        }
    }
}))

alert.addAction(UIAlertAction(title: cancel, style: .cancel, handler: { (action: UIAlertAction!) in
    alert.dismiss(animated: true, completion: nil)
}))

viewController?.present(alert, animated: true, completion: nil)
```

<br>


## 获取微信登录返回的数据

```swift
func getDataByWechatlogin(authData: AuthRequest? = nil, code: String, _ context: String? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
``` 

**参数**

* *code* 微信授权码
* *context* 请求上下文，这里设置的 `context` 可以在 [pipeline 的 context](/guides/pipeline/context-object.md) 中获取到。

**示例**

```swift
AuthClient().getDataByWechatlogin(code: "Wechat auth code") { code, message, userInfo in
    if (code == 200) {
        // 登录成功
        // userInfo
    } else if (code == 1640) {
        // 只允许绑定已有账号
        // userInfo.socialBindingData 中返回 method(登录方式) 以及 key(中间态键)
    } else if (code == 1641) {
        // 允许绑定已有账号，或者创建新账号
        // userInfo.socialBindingData 中返回 method(登录方式) 以及 key(中间态键)
    } else if (code == 2921) {
        // 多账号选择后绑定
        // userInfo.socialBindingData 中返回 accounts(账号列表) 以及 key(中间态键)
    }
}
```

<br>

## 注册新账号绑定微信

```swift
func bindWechatWithRegister(key: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
``` 

**参数**

* *key* 中间态键，通过[微信登录](##-获取微信登录返回的数据) API 返回

**示例**

```swift
AuthClient().bindWechatWithRegister(key: "key") { code, message, userInfo in
}
```

<br>

## 通过账号密码绑定微信

```swift
func bindWechatByAccount(account: String, password: String, key: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
``` 

**参数**

* *account* 账号
* *password* 密码
* *key* 中间态键，通过[微信登录](##-获取微信登录返回的数据) API 返回

**示例**

```swift
AuthClient().bindWechatByAccount(account: "account", password: "password", key: "key") { code, message, userInfo in
}
```

<br>

## 通过手机验证码绑定微信

```swift
func bindWechatByPhoneCode(phoneCountryCode: String? = nil, phone: String, code: String, key: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
``` 

**参数**

* *phone* 手机号
* *code* 验证码
* *key* 中间态键，通过[微信登录](##-获取微信登录返回的数据) API 返回

**示例**

```swift
AuthClient().bindWechatByPhoneCode(phone: "188xxxx8888", code: "1234", key: "key") { code, message, userInfo in
}
```

<br>

## 通过邮箱验证码绑定微信

```swift
func bindWechatByEmailCode(email: String, code: String, key: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
``` 

**参数**

* *email* 邮箱
* *code* 验证码
* *key* 中间态键，通过[微信登录](##-获取微信登录返回的数据) API 返回

**示例**

```swift
AuthClient().bindWechatByEmailCode(email: "test@example.com", code: "1234", key: "key") { code, message, userInfo in
}
```

<br>

## 通过账号 ID 绑定微信

```swift
func bindWechatByAccountId(accountId: String, key: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
``` 

**参数**

* *accountId* 账号 id
* *key* 中间态键，通过[微信登录](##-获取微信登录返回的数据) API 返回

**示例**

```swift
AuthClient().bindWechatByAccountId(accountId: "AUTHING_ACCOUNT_ID", key: "key") { code, message, userInfo in
}
```

<br>




