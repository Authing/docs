# 核心认证 API

<LastUpdated/>

## 邮箱密码注册

使用邮箱注册帐号，邮箱不区分大小写且用户池内唯一。此接口不要求用户对邮箱进行验证，用户注册之后 emailVerified 字段会为 false 。

```swift
func registerByEmail(email: String, password: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *email* 邮箱
* *password* 明文密码

**示例**

```swift
AuthClient().registerByEmail(email: "me@gmail.com", password: "strong") { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```

**错误码**

* 2003 非法邮箱地址
* 2026 邮箱已注册

<br>

## 邮箱验证码注册

使用邮箱验证码，邮箱不区分大小写且用户池内唯一。调用此接口之前，需要先调用 [发送邮件](#发送邮件) 接口以获取邮箱验证码

```swift
func registerByEmailCode(email: String, code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *email* 邮箱
* *password* 明文密码

**示例**

```swift
AuthClient().registerByEmailCode(email: "me@gmail.com", code: "code") { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```

**错误码**

* 2003 非法邮箱地址
* 2026 邮箱已注册

<br>

## 用户名注册

通过用户名注册帐号。用户名区分大小写且用户池内唯一。

```swift
func registerByUserName(username: String, password: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *username* 用户名
* *password* 明文密码

**示例**

```swift
AuthClient().registerByUserName(username: "username", password: "strong") { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```

**错误码**

* 2026 用户名已存在

<br>

## 短信验证码注册

通过手机号和短信验证码注册帐号。手机号需要在用户池内唯一。调用此接口之前，需要先调用 [发送短信验证码](#发送短信验证码) 接口以获取短信验证码

```swift
func registerByPhoneCode(phone: String, code: String, password: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *phone* 手机号
* *code* 短信验证码
* *password* 明文密码

**示例**

```swift
AuthClient().registerByPhoneCode(phone: "13012345678", code: "1234", password: "strong") { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```

**错误码**

* 2001 验证码错误
* 2026 手机号已注册

<br>

## 邮箱登录

```swift
func loginByEmail(email: String, code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *email* 邮箱
* *code* 邮箱验证码

**示例**

```swift
AuthClient().loginByEmail(email: "email", code: "code") { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```

**错误码**

* 2001 邮箱验证码错误

<br>

## 帐号密码登录

```swift
func loginByAccount(account: String, password: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *account* 可以是手机号 / 邮箱 / 用户名
* *password* 明文密码

**示例**

```swift
AuthClient().loginByAccount(account: "account", password: "strong") { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```

**错误码**

* 2333 帐号或密码错误

<br>

## 手机验证码登录

通过短信验证码登录，需要先调用 [发送短信验证码](#发送短信验证码) 接口。

```swift
func loginByPhoneCode(phone: String, code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *phone* 手机号
* *code* 短信验证码

**示例**

```swift
AuthClient().loginByPhoneCode(phone: "13012345678", code: "1234") { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```

**错误码**

* 2001 短信验证码不正确

<br>

## LDAP 登录

```swift
func loginByLDAP(username: String, password: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *username* ldap 用户名
* *password* 明文密码

**示例**

```swift
AuthClient().loginByLDAP(username: "username", password: "strong") { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```

**错误码**

* 2333 帐号或密码错误

<br>

## AD 登录

```swift
func loginByAD(username: String, password: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *username* AD 用户名
* *password* 明文密码

**示例**

```swift
AuthClient().loginByAD(username: "username", password: "strong") { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```

**错误码**

<br>

## 手机号一键登录

参考 [手机号一键登录开发指南](/guides/oneauth/)

```swift
func loginByOneAuth(token: String, accessToken: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *token* 运营商返回
* *accessToken* 运营商返回

**示例**

```swift
AuthClient().loginByOneAuth(token: "token", accessToken: "accessToken") { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```

**错误码**

* 2333 帐号或密码错误

<br>

## 获取当前登录的用户信息

获取当前登录的用户信息，需要先登录

```swift
func getCurrentUser(completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**示例**

```swift
AuthClient().getCurrentUser { code, message, userInfo in
    if (code == 200) {
        // userInfo：用户信息
    }
}
```

**错误码**

* 2020 未登录

<br>

## 退出登录

退出登录。同时清除内存以及本地持久化的 token 和用户信息

```swift
func logout(completion: @escaping(Int, String?) -> Void)
```

**示例**

```swift
AuthClient().logout { code, message in
}
```

**错误码**

* 1010001 如果用户的 id token 非法或者过期

<br>

## 发送短信验证码

向指定的手机发送短信验证码

```swift
func sendSms(phone: String, phoneCountryCode: String? = nil, completion: @escaping(Int, String?) -> Void)
```

**参数**

* *phone* 手机号
* *phoneCountryCode* 电话国家码。可以为空，为空时默认为 +86

**示例**

```swift
AuthClient().sendSms(phone: "13012345678", phoneCountryCode: "+86") { code, message in
}
```

**错误码**

* 500 手机号码格式非法

<br>

## 发送邮件

给指定邮箱发送邮件

```swift
func sendEmail(email: String, scene: String, completion: @escaping(Int, String?) -> Void)
```

**参数**

* *email* 邮箱地址
* *scene* 发送场景，可选值包含：
  - RESET_PASSWORD: 发送重置密码邮件，邮件中包含验证码
  - VERIFY_EMAIL: 发送验证邮箱的邮件
  - CHANGE_EMAIL: 发送修改邮箱邮件，邮件中包含验证码
  - MFA_VERIFY: 发送 MFA 验证邮件
  - VERIFY_CODE: 发送验证码

**示例**

```swift
AuthClient().sendEmail(email: "cool@gmail.com", scene: "RESET_PASSWORD") { code, message in
    if (code == 200) {
        // 发送成功
    }
}
```

**错误码**

* 1020017 邮箱地址非法

<br>

## 获取用户自定义数据

获取用户自定义数据，你需要先在用户池 [定义用户自定义数据元信息](/guides/users/user-defined-field/)

用户自定义数据会添加到传入的 userInfo 对象里面

调用此接口需要先登录

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

通过从系统选择一张图片来更新用户头像

调用此接口需要先登录

```swift
func uploadAvatar(image: UIImage, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *image* 图片对象。推荐使用系统默认图片选择器获取

**示例**

启动系统默认图片选择器

```swift
let picker = UIImagePickerController()
picker.delegate = self
picker.allowsEditing = true
picker.sourceType = UIImagePickerController.SourceType.photoLibrary
self.viewController?.present(picker, animated: true, completion: nil)
```

启动代码中，picker.delegate 需要实现 UINavigationControllerDelegate, UIImagePickerControllerDelegate 协议

通过以下回调拿到图片，并调用更新头像接口

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

## 通过短信验证码重置密码

通过短信验证码重置密码，你可以通过 [发送短信验证码](#发送短信验证码) 方法发送短信验证码

```swift
func resetPasswordByPhone(phone: String, code: String, newPassword: String, completion: @escaping(Int, String?) -> Void)
```

**参数**

* *phone* 手机号
* *code* 短信验证码
* *password* 明文密码

**示例**

```swift
AuthClient().resetPasswordByPhone(phone: "13012345678", code: "1234", newPassword: "strong") { code, message in
    if (code == 200) {

    }
}
```

**错误码**

* 2004 用户不存在

<br>

## 通过首次登录的 Token 重置密码

通过首次登录的 Token 重置密码，需要在创建用户时设置“强制用户首次登录时修改密码”

```swift
func resetPasswordByFirstTimeLoginToken(token: String, password: String, completion: @escaping(Int, String?) -> Void)
```

**参数**

* *token* 首次登录后获取的 token
* *password* 明文密码

**示例**

```swift
AuthClient().resetPasswordByFirstTimeLoginToken(token: "token", password: "strong") { code, message in
    if (code == 200) {

    }
}
```

<br>

## 通过邮件验证码重置密码

通过邮件验证码重置密码，你需要先调用 [sendEmail](#发送邮件) 接口发送重置密码邮件（场景值为 `RESET_PASSWORD`）。

```swift
func resetPasswordByEmail(email: String, code: String, newPassword: String, completion: @escaping(Int, String?) -> Void)
```

**参数**

* *email* 邮箱地址
* *code* 邮件验证码
* *password* 明文密码

**示例**

```swift
AuthClient().resetPasswordByEmailCode(email: "me@gmail.com", code: "1234", newPassword: "strong") { code, message, in
    if (code == 200) {

    }
}
```

**错误码**

* 2004 用户不存在

<br>

## 修改用户资料

修改用户资料，此接口不能用于修改手机号、邮箱、密码

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

## 更新用户密码

更新用户密码。如果用户没有设置密码，如通过短信验证码、社会化登录等方式注册的，oldPassword 留空。

```swift
func updatePassword(newPassword: String, oldPassword: String? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *newPassword* 新密码
* *oldPassword* 旧密码。可以为空

**示例**

```swift
AuthClient().updatePassword(newPassword: "newStrong", oldPassword: "oldStrong") { code, message, userInfo in
    if (code == 200) {

    }
}
```

**错误码**

* 2020 未登录
* 1320011 旧密码不正确

<br>

## 绑定手机号

为当前登录用户绑定手机号。调用 [发送短信验证码](#发送短信验证码) 获取验证码。

```swift
func bindPhone(phone: String, code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *phone* 手机号
* *code* 短信验证码

**示例**

```swift
AuthClient().bindPhone(phone: "13012345678", code: "1234") { code, message, userInfo in
    if (code == 200) {

    }
}
```

**错误码**

* 2020 未登录

<br>

## 解绑手机号

用户解绑手机号，如果用户没有绑定其他登录方式（邮箱、社会化登录账号），将无法解绑手机号，会提示错误。

```swift
func unbindPhone(completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**示例**

```swift
AuthClient().unbindPhone { code, message, userInfo in
    if (code == 200) {

    }
}
```

**错误码**

* 2020 未登录
* 1320005 当前用户未绑定其他登录方式

<br>

## 绑定邮箱

为当前登录用户绑定邮箱。调用 [发送邮件](#发送邮件) 获取验证码。

```swift
func bindEmail(email: String, code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *email* 邮箱地址
* *code* 邮件验证码

**示例**

```swift
AuthClient().bindEmail(email: "me@gmail.com", code: "1234") { code, message, userInfo in
    if (code == 200) {

    }
}
```

**错误码**

* 2020 未登录

<br>

## 解绑邮箱

用户解绑邮箱，如果用户没有绑定其他登录方式（手机号、社会化登录账号），将无法解绑邮箱，会提示错误。

```swift
func unbindEmail(completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**示例**

```swift
AuthClient().unbindEmail { code, message, userInfo in
    if (code == 200) {

    }
}
```

**错误码**

* 2020 未登录
* 1320005 当前用户未绑定邮箱

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

获取当前用户能够访问的应用。注意返回的结果数据结构为 NSArray

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

获取用户所在组织机构。由于用户可以在多个独立的组织机构树下，所以本接口返回了一个二位数组。注意返回的结果数据结构为 NSArray

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

获取当前登录用户的角色。注意返回的数据结构为 NSArray

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

>此操作不可逆，请务必给用户足够的提示

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
