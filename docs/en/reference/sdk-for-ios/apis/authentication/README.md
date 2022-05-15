# Core Authentication API

<LastUpdated/>

## Use email registration

Use the email registration, the mailbox is not case sensitive and the only userpool is unique. This interface does not require the user to verify the mailbox, after the user registration, the emailVerified field will be false.

```swift
func registerByEmail(email: String, password: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Parameter**

* `email` email address
* `password` password

**Example**

```swift
AuthClient().registerByEmail(email: "me@gmail.com", password: "strong") { code, message, userInfo in
    if (code == 200) {
        // userInfo
    }
}
```

**Error Code**

* `2003` Illegal email address
* `2026` Registered mailbox

<br>

## Register using username

Use the username to register, the username is case sensitive and the only user pool.

```swift
func registerByUserName(username: String, password: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Parameter**

* `username` username
* `password` password

**Example**

```swift
AuthClient().registerByUserName(username: "username", password: "strong") { code, message, userInfo in
    if (code == 200) {
        // userInfo
    }
}
```

**Error Code**

* `2026` The user name already exists

<br>

## Use mobile phone number registration

Use your mobile phone number to register, you can set the initial password of the account at the same time. You can pass [sendSmsCode](#Send verification code) method sends SMS verification code.

```swift
func registerByPhoneCode(phone: String, code: String, password: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Parameter**

* `phone` The phone number
* `code` SMS verification code
* `password` initial password, it can be null

**Example**

```swift
AuthClient().registerByPhoneCode(phone: "13012345678", code: "1234", password: "strong") { code, message, userInfo in
    if (code == 200) {
        // userInfo
    }
}
```

**Error Code**

* `2001` SMS verification code error
* `2026` Cell phone number registered

<br>

## Use the email to login

```swift
func loginByEmail(email: String, code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Parameter**

* `email`  email address
* `code` email verification code

**Example**

```swift
AuthClient().loginByEmail(email: "email", code: "code") { code, message, userInfo in
    if (code == 200) {
        // userInfo
    }
}
```

**Error Code**

* `2001` email verification code error

<br>

## Use the username to login

```swift
func loginByAccount(account: String, password: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Parameter**

* `account` The phone number / email address / username
* `password` password

**Example**

```swift
AuthClient().loginByAccount(account: "account", password: "strong") { code, message, userInfo in
    if (code == 200) {
        // userInfo
    }
}
```

**Error Code**

* `2333` The account or password is incorrect

<br>

## Use the mobile phone number verification code to login

Use the mobile phone number verification code to log in. You need to use it first [sendSmsCode](#Send verification code) sends a SMS verification code.

```swift
func loginByPhoneCode(phone: String, code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Parameter**

* `phone` The phone number
* `code` SMS verification code

**Example**

```swift
AuthClient().loginByPhoneCode(phone: "13012345678", code: "1234") { code, message, userInfo in
    if (code == 200) {
        // userInfo
    }
}
```

**Error Code**

* `2001` SMS verification code error

<br>

##  Log in with an LDAP username

```swift
func loginByLDAP(username: String, password: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Parameter**

* `username` ldap username
* `password` password

**Example**

```swift
AuthClient().loginByLDAP(username: "username", password: "strong") { code, message, userInfo in
    if (code == 200) {
        // userInfo
    }
}
```

**Error Code**

* `2333` The account or password is incorrect

<br>

## Login with an AD username

```swift
func loginByAD(username: String, password: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Parameter**

* `username` AD username
* `password` password

**Example**

```swift
AuthClient().loginByAD(username: "username", password: "strong") { code, message, userInfo in
    if (code == 200) {
        // userInfo
    }
}
```

**Error Code**

* `2333` The account or password is incorrect

<br>

## Mobile Fast Auth

```swift
func loginByOneAuth(token: String, accessToken: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**参数**

* *token* Operators return
* *accessToken* Operators return

**示例**

```swift
AuthClient().loginByOneAuth(token: "token", accessToken: "accessToken") { code, message, userInfo in
    if (code == 200) {
        // userInfo
    }
}
```

**Error Code**

* `2333` The account or password is incorrect

<br>

## Get the user information of current login

Get the user information of the current login user, you need that is currently logged in to get it.

```swift
func getCurrentUser(completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Example**

```swift
AuthClient().getCurrentUser { code, message, userInfo in
    if (code == 200) {
        // userInfo
    }
}
```

**Error Code**

* `2020` Not logged in

<br>

## Sign out

Log out. Clear token and user information for both memory and local persistence. Authing.getcurrentuser () returns empty after logging out.

```swift
func logout(completion: @escaping(Int, String?) -> Void)
```

**Example**

```swift
AuthClient().logout { code, message in
}
```

**Error Code**

* `1010001` If the user id token is invalid or expired

<br>

## Send verification code

Sends an SMS verification code to the specified mobile phone.

```swift
func sendSms(phone: String, phoneCountryCode: String? = nil, completion: @escaping(Int, String?) -> Void)
```

**Parameter**

* `phoneCountryCode` Telephone country code, If null, the default value is +86
* `phone` The phone number

**Example**

```swift
AuthClient().sendSms(phone: "13012345678", phoneCountryCode: "+86") { code, message in
}
```

**Error Code**

* `500` The mobile phone number format is invalid

<br>

## Send email

Sends an email to the specified mailbox.

```swift
func sendEmail(email: String, scene: String, completion: @escaping(Int, String?) -> Void)
```

**Parameter**

* `email` email address
* `scene` Send a scene, optional value is ：
  - `RESET_PASSWORD`: Send a reset password message, including the verification code;
  - `VERIFY_EMAIL`: Send a message to verify the mailbox;
  - `CHANGE_EMAIL`: Send a modified mailbox message, including the verification code;
  - `MFA_VERIFY`: Send MFA verification email.

**Example**

```swift
AuthClient().sendEmail(email: "cool@gmail.com", scene: "RESET_PASSWORD") { code, message in
    if (code == 200) {
        // success
    }
}
```

**Error Code**

* `1020017` Invalid email address

<br>

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

## Reset password via SMS verification code

Reset your password by SMS verification code, you can send SMS verification code by [sendSmsCode](#Send verification code) method.

```swift
func resetPasswordByPhone(phone: String, code: String, newPassword: String, completion: @escaping(Int, String?) -> Void)
```

**Parameter**

* `phone` The phone number
* `code` SMS Verification code
* `password` New password

**Example**

```swift
AuthClient().resetPasswordByPhone(phone: "13012345678", code: "1234", newPassword: "strong") { code, message in
    if (code == 200) {

    }
}
```

**Error Code**

* `2004` User does not exist

<br>

## Reset password via mail verification code

eset password by email verification code, you need to call [sendEmail](#Send email) interface to send a reset password message (the scene value `RESET_PASSWORD`).

```swift
func resetPasswordByEmail(email: String, code: String, newPassword: String, completion: @escaping(Int, String?) -> Void)
```

**Parameter**

* `email` Email address
* `code` Verification code
* `password` New password

**Example**

```swift
AuthClient().resetPasswordByEmailCode(email: "me@gmail.com", code: "1234", newPassword: "strong") { code, message, in
    if (code == 200) {

    }
}
```

**Error Code**

* `2004` User does not exist

<br>

## Reset password through the first login Token

Reset password through the first login Token. You need to set Force User to change password at first login when creating a user.

```swift
func resetPasswordByFirstTimeLoginToken(token: String, password: String, completion: @escaping(Int, String?) -> Void)
```

**参数**

* *token* token
* *password* password

**示例**

```swift
AuthClient().resetPasswordByFirstTimeLoginToken(token: "token", password: "strong") { code, message in
    if (code == 200) {

    }
}
```

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

## Update user password

Update the user password. If the user does not set a password, such as SMS verification code, social login, etc., oldPassword is left blank.

```swift
func updatePassword(newPassword: String, oldPassword: String? = nil, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Parameter**

* `newPassword` New password
* `oldPassword` Old password, if the user does not set a password, you can not fill

**Example**

```swift
AuthClient().updatePassword(newPassword: "newStrong", oldPassword: "oldStrong") { code, message, userInfo in
    if (code == 200) {

    }
}
```

**Error Code**

* `2020` Not logged in
* `1320011` The old password is incorrect

<br>

## Binding mobile phone number

Bind the mobile phone number of the current login user.  you can send SMS verification code by [sendSmsCode](#Send verification code) method.

```swift
func bindPhone(phone: String, code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Parameter**

* `phone` Thie phone number
* `code` SMS Verification code

**Example**

```swift
AuthClient().bindPhone(phone: "13012345678", code: "1234") { code, message, userInfo in
    if (code == 200) {

    }
}
```

**Error Code**

* `2020` Not logged in

<br>

## Solution to the mobile number

The user unbinds the mobile phone number. If the user does not bind other login methods (such as email or social login account), the mobile phone number cannot be unbound and an error message is displayed.

```swift
func unbindPhone(completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Example**

```swift
AuthClient().unbindPhone { code, message, userInfo in
    if (code == 200) {

    }
}
```

**Error Code**

* `2020` Not logged in
* `1320005` The current user is not bound to any other login mode

<br>

## Binding mailbox

The mailbox is bound to the current login user. call [Send emai](#Send email) to get the verification code.

```swift
func bindEmail(email: String, code: String, completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Parameter**

* `email` Email address
* `code` Email  verification code

**Example**

```swift
AuthClient().bindEmail(email: "me@gmail.com", code: "1234") { code, message, userInfo in
    if (code == 200) {

    }
}
```

**Error Code**

* `2020`  Not logged in

<br>

##  Menned mailbox

The user solves the mobile phone number. If the user does not bind other login mode (mobile phone number, social login account), it will not be able to decompose the mailbox, will prompt the error.

```swift
func unbindEmail(completion: @escaping(Int, String?, UserInfo?) -> Void)
```

**Example**

```swift
AuthClient().unbindEmail { code, message, userInfo in
    if (code == 200) {

    }
}
```

**Error Code**

* `2020` Not logged in
* `1320005` The current user is not bound to a mailbox

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
