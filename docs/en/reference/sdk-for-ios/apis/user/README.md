# User management API

<LastUpdated/>

## Get custom data

Get all custom data for the user. You need to be in the user pool [Define user-defined data meta information](https://docs.authing.cn/v2/guides/users/user-defined-field/). User-defined data is added to the passed userInfo object. A login is required to invoke this interface.

```swift
func getCustomUserData(userInfo: UserInfo, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Parameter**

* `userInfo` 

**Example**

```swift
AuthClient().getCustomUserData(userInfo: Authing.getCurrentUser()) { code, message, userInfo in
    if (code == 200) {
        userInfo.customData // [NSMutableDictionary]?
    }
}
```

**Error Code**

* `2020` Not logged in

<br>

## Set custom data

Set the user's custom field. You need to be in the userpool[Define user-defined data meta information](https://docs.authing.cn/v2/guides/users/user-defined-field/), and the type of incoming value must match the defined type. A login is required to invoke this interface.

```swift
func setCustomUserData(customData: NSDictionary, completion: @escaping(Int, String?, NSDictionary?) -> Void)
```

**Parameter**

* `customData` JSONObject in the form of key-value

**Example**

```swift
let object = ["your_custom_data_key": "your_custom_data_value"]
AuthClient().setCustomUserData(customData: object) { code, message, data in
    if (code == 200) {

    }
}
```

**Error Code**

* `2020` Not logged in

<br>

## Update user profile picture

Update the user profile picture by selecting an image from the system. A login is required to invoke this interface.

```swift
func uploadAvatar(image: UIImage, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Parameter**

* `image` Image input stream. You are advised to use the default image picker

**Example**

Start the system default image selector

```swift
let picker = UIImagePickerController()
picker.delegate = self
picker.allowsEditing = true
picker.sourceType = UIImagePickerController.SourceType.photoLibrary
self.viewController?.present(picker, animated: true, completion: nil)
```

In the startup code, picker.delegate needs to implement UINavigationControllerDelegate, UIImagePickerControllerDelegate protocol

Get the picture through the following callback, and call the update avatar interface

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

**Error Code**

* `2020` Not logged in

<br>

## Modify user profile

Modify user information, this interface cannot be used to modify the mobile phone number, email, password.

```swift
func updateProfile(_ object: NSDictionary, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Parameter**

* `object` Modified user profile

Fields of data can be updated through this interface：

* `username`
* `nickname`
* `company`
* `photo`
* `browser`
* `device`
* `name`
* `givenName`
* `familyName`
* `middleName`
* `profile`
* `preferredUsername`
* `website`
* `gender`
* `birthdate`
* `zoneinfo`
* `locale`
* `address`
* `streetAddress`
* `locality`
* `region`
* `postalCode`
* `city`
* `province`
* `country`

**Example**

```swift
let object = ["username": "elonmusk", "nickname": "Ironman"]
AuthClient().updateProfile(object: object) { code, message, userInfo in
    if (code == 200) {

    }
}
```

**Error Code**

* `2020` Not logged in

<br>

## Get user account security level

Get user account security level.

```swift
func getSecurityLevel(completion: @escaping(Int, String?, NSDictionary?) -> Void)
```

**Example**

```swift
AuthClient().getSecurityLevel { code, message, data in
    if (code == 200) {

    }
}
```

**Callback data data structure**

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

**Error Code**

* `2020` Not logged in

<br>

## Refreshes the Token of the current user

```swift
func updateIdToken(completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Example**

```swift
AuthClient().updateIdToken { code, message, userInfo in
    if (code == 200) {

    }
}
```

**Error Code**

* `2020` Not logged in

<br>

## Get applications that current users can access

Get the application that the current user can access. Note that the returned result data structure is List\<Application\>.

```swift
func listApplications(page: Int = 1, limit: Int = 10, completion: @escaping(Int, String?, NSArray?) -> Void)
```

**Parameter**

* `page` Page serial number, default is `1`.
* `limit` The number of times returned per page, the default is `10`.

**Example**

```swift
AuthClient().listApplications { code, message, applications in
    if (code == 200) {

    }
}
```

**Callback data data structure**

```json
{
    "code": 200,
    "message": "Success",
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

**Error Code**

* `2020` Not logged in

<br>

## Get list of data data in users

Obtain the organization of the user. Because the user can be in multiple independent organization trees, this interface returns a two-digit array. Note that the returned result data structure is List\<Organization[]\>.

```swift
func listOrgs(completion: @escaping(Int, String?, NSArray?) -> Void)
```

**Example**

```swift
AuthClient().listOrgs { code, message, organizations in
    if (code == 200) {

    }
}
```

**Callback data data structure**

```json
{
    "code": 200,
    "message": "Success",
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

**Error Code**

* `2020` Not logged in

<br>

## Get the list of roles owned by users

Get the list of roles owned by users. Note that the returned result data structure is NSArray\<Role\>.

```swift
func listRoles(namespace: String? = nil, completion: @escaping(Int, String?, NSArray?) -> Void)
```

**Parameter**

* `namespace` Permission group ID, used to filter role data. If empty, all roles of the user are returned

**Example**

```swift
AuthClient().listRoles { code, message, roles in
    if (code == 200) {

    }
}
```

**Callback data data structure**

```json
{
    "code": 200,
    "message": "Success",
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

**Error Code**

* `2020` Not logged in

<br>

## Get all the list of users authorized to be authorized

Gets all resources authorized by users, and users are authorized to include resources that are inherited from roles, packets, and organizational institutions.

```swift
func listAuthorizedResources(namespace: String = "default", resourceType: String? = nil, completion: @escaping(Int, String?, NSArray?) -> Void)
```

**Parameter**

* `namespace` Permission group ID.
* `resourceType` Resource type. Can be the following types of DATA, API, MENU, UI, BUTTON. If null, all resource type data is returned.

**Example**

```swift
AuthClient().listAuthorizedResources { code, message, resources in
    if (code == 200) {

    }
}
```

**Callback data data structure**

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

**Error Code**

* `2020` Not logged in

<br>

## Delete the account

Users can delete their current login accounts.

>This operation cannot be reversed. Therefore, you must prompt the user.


```swift
func deleteAccount(completion: @escaping(Int, String?) -> Void)
```

**Example**

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

## Get the data by wechat login

```swift
func getDataByWechatlogin(authData: AuthRequest? = nil, code: String, _ context: String? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
``` 

**Parameter**

* *code* wechat auth code
* `context` Request context, set here `context` you can get [pipeline context](/guides/pipeline/context-object.md) .

**Example**
```swift
AuthClient().getDataByWechatlogin(code: "Wechat auth code") { code, message, userInfo in
    if (code == 200) {
        // login successful
        // userInfo
    } else if (code == 1640) {
        // Only an existing account can be bound
        // userInfo.socialBindingData return method(login method) and key(intermediate state key)
    } else if (code == 1641) {
        // Allows you to bind existing accounts or create new accounts
        // userInfo.socialBindingData return method(login method) and key(intermediate state key)
    } else if (code == 2921) {
        // Select multiple accounts and bind them
        // userInfo.socialBindingData return accounts(account list) 以及 key(intermediate state key)
    }
}
```

<br>

## Register a new account and bind it to wechat

```swift
func bindWechatWithRegister(key: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
``` 

**Parameter**

* *key* intermediate state key，return by [Get the data by wechat login](##-Get-the-data-by-wechat-login)

**Example**
```swift
AuthClient().bindWechatWithRegister(key: "key") { code, message, userInfo in
}
```

<br>

## Wechat is bound by the account password

```swift
func bindWechatByAccount(account: String, password: String, key: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
``` 

**Parameter**

* *account* account
* *password* password
* *key* intermediate state key，return by [Get the data by wechat login](##-Get-the-data-by-wechat-login)

**Example**
```swift
AuthClient().bindWechatByAccount(account: "account", password: "password", key: "key") { code, message, userInfo in
}
```

<br>

## Wechat is bound by mobile verification code

```swift
func bindWechatByPhoneCode(phoneCountryCode: String? = nil, phone: String, code: String, key: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
``` 

**Parameter**

* *phone* phone
* *code* code
* *key* intermediate state key，return by [Get the data by wechat login](##-Get-the-data-by-wechat-login)

**Example**
```swift
AuthClient().bindWechatByPhoneCode(phone: "188xxxx8888", code: "1234", key: "key") { code, message, userInfo in
}
```

<br>

## Wechat is bound by email verification code

```swift
func bindWechatByEmailCode(email: String, code: String, key: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
``` 

**Parameter**

* *email* email
* *code* code
* *key* intermediate state key，return by [Get the data by wechat login](##-Get-the-data-by-wechat-login)

**Example**
```swift
AuthClient().bindWechatByEmailCode(email: "test@example.com", code: "1234", key: "key") { code, message, userInfo in
}
```

<br>

## Bind Wechat by account ID

```swift
func bindWechatByAccountId(accountId: String, key: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
``` 

**Parameter**

* *accountId* account id
* *key* intermediate state key，return by [Get the data by wechat login](##-Get-the-data-by-wechat-login)

**Example**
```swift
AuthClient().bindWechatByAccountId(accountId: "AUTHING_ACCOUNT_ID", key: "key") { code, message, userInfo in
}
```

<br>




