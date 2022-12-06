# Core Authentication API

<LastUpdated/>

## Use email registration

Use the email registration, the mailbox is not case sensitive and the only userpool is unique. This interface does not require the user to verify the mailbox, after the user registration, the emailVerified field will be false.

```java
public static void registerByEmail(String email, String password, String context, @NotNull AuthCallback<UserInfo> callback)
```

**Parameter**

* `email` email address
* `password` password
* `context` Request context, set here `context` you can get [pipeline context](https://docs.authing.cn/v2/guides/pipeline/context-object.html). This parameter can be passed to `null` if not required.

**Example**

```java
JSONObject context = new JSONObject();
context.put("userId", "userId");
AuthClient.registerByEmail("test@example.com", "xxxxxx", context.toString(), (code, message, userInfo)->{
    if (code == 200) {
        // userInfo
    }
});
```

**Error Code**

* `2003` Illegal email address
* `2026` Registered mailbox

<br>

## Use email code registration

Use the email registration, the mailbox is not case sensitive and the only userpool is unique. This interface does not require the user to verify the mailbox, after the user registration, the emailVerified field will be false. You need to use it first [sendEmail](#send-email) sends a SMS verification code.

```java
public static void registerByEmailCode(String email, String code, String context, @NotNull AuthCallback<UserInfo> callback)
```

**Parameter**

* `email` email address
* `code` email verification code
* `context` Request context, set here `context` you can get [pipeline context](https://docs.authing.cn/v2/guides/pipeline/context-object.html). This parameter can be passed to `null` if not required.

**Example**

```java
JSONObject context = new JSONObject();
context.put("userId", "userId");
AuthClient.registerByEmailCode("test@example.com", "1234", context.toString(), (code, message, userInfo)->{
    if (code == 200) {
        // userInfo
    }
});
```

**Error Code**

* `2003` Illegal email address
* `2026` Registered mailbox

<br>

## Register using username

Use the username to register, the username is case sensitive and the only user pool.

```java
public static void registerByUserName(String username, String password, String context, @NotNull AuthCallback<UserInfo> callback)
```

**Parameter**

* `username` username
* `password` password
* `context` Request context, set here `context` you can get [pipeline context](https://docs.authing.cn/v2/guides/pipeline/context-object.html). This parameter can be passed to `null` if not required.

**Example**

```java
JSONObject context = new JSONObject();
context.put("userId", "userId");
AuthClient.registerByUserName("username", "strong", context.toString(), (code, message, userInfo)->{
    if (code == 200) {
        // userInfo
    }
});
```

**Error Code**

* `2026` The user name already exists

<br>

## Use mobile phone number registration

Use your mobile phone number to register, you can set the initial password of the account at the same time. You can pass [sendSmsCode](#send-verification-code) method sends SMS verification code.

```java
public static void registerByPhoneCode(String phoneCountryCode, String phone, String code, String password, String context, @NotNull AuthCallback<UserInfo> callback)
```

**Parameter**

* `phoneCountryCode` Telephone country code, If null, the default value is `+86`
* `phone` The phone number
* `code` SMS verification code
* `password` initial password, it can be `null`
* `context` Request context, set here `context` you can get [pipeline context](https://docs.authing.cn/v2/guides/pipeline/context-object.html). This parameter can be passed to `null` if not required.

**Example**

```java
JSONObject context = new JSONObject();
context.put("userId", "userId");
AuthClient.registerByPhoneCode("+86", "188xxxx8888", "1234", "xxxxxx", context.toString(), (code, message, userInfo)->{
    if (code == 200) {
        // userInfo
    }
});
```

**Error Code**

* `2001` SMS verification code error
* `2026` Cell phone number registered

<br>

## Custom field registration

You can directly log in to an account registered with a user-defined field using the account password.

```java
public static void registerByExtendField(String fieldName, String account, String password, String context, @NotNull AuthCallback<UserInfo> callback)
```

**Parameter**

- `fieldName` custom field name

* `account` account
* `password`  initial password, it can be `null`
* `context` Request context, set here `context` you can get [pipeline context](https://docs.authing.cn/v2/guides/pipeline/context-object.html). This parameter can be passed to `null` if not required.

**Example**

```java
JSONObject context = new JSONObject();
context.put("userId", "userId");
AuthClient.registerByExtendField("extendId", "188xxxx8888", "xxxxxx", context.toString(), (code, message, userInfo)->{
    if (code == 200) {
        // userInfo
    }
});
```

**Error Code**

* `2026` The user name already exists

<br>

## Use the username to login

```java
public static void loginByAccount(String account, String password, boolean autoRegister, String context, @NotNull AuthCallback<UserInfo> callback)
```

**Parameter**

* `account` The phone number / email address / username
* `password` Password
* `autoRegister` Whether it is automatically registered. If the user does not exist, an account is automatically created according to the login book.
* `context` Request context, set here `context` you can get [pipeline context](https://docs.authing.cn/v2/guides/pipeline/context-object.html). This parameter can be passed to `null` if not required.

**Example**

```java
JSONObject context = new JSONObject();
context.put("userId", "userId");
AuthClient.loginByAccount("account", "xxxxxx", false, context.toString(), (code, message, userInfo)->{
    if (code == 200) {
        // userInfo
    }
});
```

**Error Code**

* `2333` The account or password is incorrect

<br>

## Use the email code to login

Use the email verification code to log in. You need to use it first [sendEmail](#send-email) sends a email verification code.

```java
public static void loginByEmailCode(String email, String code, boolean autoRegister, String context, @NotNull AuthCallback<UserInfo> callback)
```

**Parameter**

* `email`  email address
* `code` email verification code
* `autoRegister` Whether it is automatically registered. If the user does not exist, an account is automatically created according to the login book.
* `context` Request context, set here `context` you can get [pipeline context](https://docs.authing.cn/v2/guides/pipeline/context-object.html). This parameter can be passed to `null` if not required.

**Example**

```java
JSONObject context = new JSONObject();
context.put("userId", "userId");
AuthClient.loginByEmailCode("test@example.com", "xxxxxx", false, context.toString(), (code, message, userInfo)->{
    if (code == 200) {
        // userInfo
    }
});
```

**Error Code**

* `2001` email verification code error

<br>

## Use the mobile phone number verification code to login

Use the mobile phone number verification code to log in. You need to use it first [sendSmsCode](#send-verification-code) sends a SMS verification code.

```java
public static void loginByPhoneCode(String phoneCountryCode, String phone, String code, boolean autoRegister, String context, @NotNull AuthCallback<UserInfo> callback)
```

**Parameter**

* `phoneCountryCode` Telephone country code, If null, the default value is +86
* `phone` The phone number
* `code` SMS verification code
* `autoRegister` Whether it is automatically registered. If the user does not exist, an account is automatically created according to the login book.
* `context` Request context, set here `context` you can get [pipeline context](https://docs.authing.cn/v2/guides/pipeline/context-object.html). This parameter can be passed to `null` if not required.

**Example**

```java
JSONObject context = new JSONObject();
context.put("userId", "userId");
AuthClient.loginByPhoneCode("+86", "188xxxx8888", "1234", false, context.toString(), (code, message, userInfo)->{
    if (code == 200) {
        // userInfo
    }
});
```

**Error Code**

* `2001` SMS verification code error

<br>

## Get the user information of current login

Get the user information of the current login user, you need that is currently logged in to get it.

```java
public static void getCurrentUser(@NotNull AuthCallback<UserInfo> callback)
```

**Example**

```java
AuthClient.getCurrentUser((code, message, userInfo) -> {
    if (code == 200) {
        // userInfo
    }
});
```

**Error Code**

* `2020` Not logged in

<br>

## Sign out

Log out. Clear token and user information for both memory and local persistence. Authing.getcurrentuser () returns empty after logging out.

```java
public static void logout(@NotNull AuthCallback<?> callback)
```

**Example**

```java
// AuthFlow.start(this) will go to login page
AuthClient.logout((code, message, data)-> AuthFlow.start(this));
```

**Error Code**

* `1010001` If the user id token is invalid or expired

<br>

## Send verification code

Sends an SMS verification code to the specified mobile phone.

```java
public static void sendSms(String phoneCountryCode, String phone, @NotNull AuthCallback<?> callback)
```

**Parameter**

* `phoneCountryCode` Telephone country code, If null, the default value is +86
* `phone` The phone number

**Example**

```java
AuthClient.sendSms("+86", "188xxxx8888", (code, message, data)->{});
```

**Error Code**

* `500` The mobile phone number format is invalid

<br>

## Send email

Sends an email to the specified mailbox.

```java
public static void sendEmail(String emailAddress, String scene, @NotNull AuthCallback<JSONObject> callback)
```

**Parameter**

* `email` email address
* `scene` Send a scene, optional value is ：
  - `RESET_PASSWORD`: Send a reset password message, including the verification code;
  - `VERIFY_EMAIL`: Send a message to verify the mailbox;
  - `CHANGE_EMAIL`: Send a modified mailbox message, including the verification code;
  - `MFA_VERIFY`: Send MFA verification email;
  - VERIFY_CODE:  Send verification code.

**Example**

```java
AuthClient.sendEmail("test@example.com", "RESET_PASSWORD",  (code, message, data)->{
    if (code == 200) {
        // success
    }
});
```

**Error Code**

* `1020017` Invalid email address

<br>

## Get custom data

Get all custom data for the user. You need to be in the user pool [Define user-defined data meta information](https://docs.authing.cn/v2/guides/users/user-defined-field/). User-defined data is added to the passed userInfo object. A login is required to invoke this interface.

```java
public static void getCustomUserData(UserInfo userInfo, @NotNull AuthCallback<UserInfo> callback)
```

**Parameter**

* `userInfo` 

**Example**

```java
AuthClient.getCustomUserData(Authing.getCurrentUser(), (code, message, data)->{
    if (code == 200) {
        
    }
});
```

**Error Code**

* `2020` Not logged in

<br>

## Set custom data

Set the user's custom field. You need to be in the userpool[Define user-defined data meta information](https://docs.authing.cn/v2/guides/users/user-defined-field/), and the type of incoming value must match the defined type. A login is required to invoke this interface.

```java
public static void setCustomUserData(JSONObject customData, @NotNull AuthCallback<JSONObject> callback)
```

**Parameter**

* `customData` JSONObject in the form of key-value

**Example**

```java
JSONObject object = new JSONObject();
object.put("your_custom_data_key", "your_custom_data_value");
AuthClient.setCustomUserData(object, (code, message, res) -> {
    if (code == 200) {

    }
});
```

**Error Code**

* `2020` Not logged in

<br>

## Update user profile picture

Update the user profile picture by selecting an image from the system. A login is required to invoke this interface.

```java
public static void uploadAvatar(InputStream in, @NotNull AuthCallback<UserInfo> callback)
```

**Parameter**

* `in` Image input stream. You are advised to use the default image picker

**Example**

Start the system default image selector

```java
Intent i = new Intent();
i.addCategory(Intent.CATEGORY_OPENABLE);
i.setType("image/*");
i.setAction(Intent.ACTION_GET_CONTENT);
((Activity) getContext()).startActivityForResult(Intent.createChooser(i, "Select Picture"), 1000);
```

Get the image input stream with the following callback and call the update avatar interface

```java
@Override
public void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);

    if (resultCode == RESULT_OK && requestCode == 1000) {
        Uri selectedImageUri = data.getData();
        InputStream in;
        try {
            in = getContentResolver().openInputStream(selectedImageUri);
            AuthClient.uploadAvatar(in, (code, message, userInfo) -> runOnUiThread(()-> {
                // handle result
            }));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```

**Error Code**

* `2020` Not logged in

<br>

## Reset password via SMS verification code

Reset your password by SMS verification code, you can send SMS verification code by [sendSmsCode](#Send verification code) method.

```java
public static void resetPasswordByPhoneCode(String phone, String code, String newPassword, @NotNull AuthCallback<JSONObject> callback)
```

**Parameter**

* `phone` The phone number
* `code` SMS Verification code
* `password` New password

**Example**

```java
AuthClient.resetPasswordByPhoneCode("188xxxx8888", "1234", "xxxxxx", (code, message, data)->{
    if (code == 200) {

    }
});
```

**Error Code**

* `2004` User does not exist

<br>

## Reset password via mail verification code

eset password by email verification code, you need to call [sendEmail](#Send email) interface to send a reset password message (the scene value `RESET_PASSWORD`).

```java
public static void resetPasswordByEmailCode(String emailAddress, String code, String newPassword, @NotNull AuthCallback<JSONObject> callback)
```

**Parameter**

* `email` Email address
* `code` Verification code
* `password` New password

**Example**

```java
AuthClient.resetPasswordByEmailCode("test@example.com", "1234", "xxxxxx", (code, message, data)->{
    if (code == 200) {

    }
});
```

**Error Code**

* `2004` User does not exist

<br>

## Modify user profile

Modify user information, this interface cannot be used to modify the mobile phone number, email, password.

```java
public static void updateProfile(JSONObject object, @NotNull AuthCallback<UserInfo> callback)
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

```java
JSONObject body = new JSONObject();
body.put("username", "elonmusk");
body.put("nickname", "Ironman");
AuthClient.updateProfile(body, (code, message, userInfo)->{
    if (code == 200) {

    }
});
```

**Error Code**

* `2020` Not logged in

<br>

## Update user password

Update the user password. If the user does not set a password, such as SMS verification code, social login, etc., oldPassword is left blank.

```java
public static void updatePassword(String newPassword, String oldPassword, @NotNull AuthCallback<JSONObject> callback)
```

**Parameter**

* `newPassword` New password
* `oldPassword` Old password, if the user does not set a password, you can not fill

**Example**

```java
AuthClient.updatePassword("newStrong", "oldStrong", (code, message, data) -> {
    if (code == 200) {

    }
});
```

**Error Code**

* `2020` Not logged in
* `1320011` The old password is incorrect

<br>

## Update user mobile phone number

Update the user mobile phone number. you can send SMS verification code by [sendSmsCode](#Send verification code) method.

```java
public static void updatePhone(String phoneCountryCode, String phone, String code,
                               String oldPhoneCountryCode, String oldPhone, String oldCode,
                               @NotNull AuthCallback<UserInfo> callback)
```

**Parameter**

* `phoneCountryCode` New mobile phone country code，It must start with a +, for example, +86 in mainland China
* `phone` New mobile phone number
* `code` New mobile phone number verification code
* `oldPhoneCountryCode` Old mobile phone country code，It must start with a +, for example, +86 in mainland China
* `oldPhone` Old mobile phone number
* `oldCode` Old mobile phone number verification code

**Example**

```java
AuthClient.updatePhone("+86", "188xxxx8888", "1234", "+86", "188xxxx1111", "1234",(code, message, data)->{
    if (code == 200) {
    }
});
```

**Error Code**

- `2020` Not logged in

<br>

## Binding mobile phone number

Bind the mobile phone number of the current login user.  you can send SMS verification code by [sendSmsCode](#Send verification code) method.

```java
public static void bindPhone(String phoneCountryCode, String phone, String code, @NotNull AuthCallback<UserInfo> callback)
```

**Parameter**

* `phoneCountryCode` New mobile phone country code，It must start with a +, for example, +86 in mainland China
* `phone` Thie phone number
* `code` SMS Verification code

**Example**

```java
AuthClient.bindPhone("+86", "188xxxx8888", "1234", (code, message, data)->{
    if (code == 200) {
    }
});
```

**Error Code**

* `2020` Not logged in

<br>

## Solution to the mobile number

The user unbinds the mobile phone number. If the user does not bind other login methods (such as email or social login account), the mobile phone number cannot be unbound and an error message is displayed.

```java
public static void unbindPhone(@NotNull AuthCallback<UserInfo> callback)
```

**Example**

```java
AuthClient.unbindPhone((code, message, data)-> {
    if (code == 200) {
    }
});
```

**Error Code**

* `2020` Not logged in
* `1320005` The current user is not bound to any other login mode

<br>

## Binding mailbox

The mailbox is bound to the current login user. call [Send emai](#Send email) to get the verification code.

```java
public static void bindEmail(String email, String code, @NotNull AuthCallback<UserInfo> callback)
```

**Parameter**

* `email` Email address
* `code` Email  verification code

**Example**

```java
AuthClient.bindEmail("test@example.com", "1234", (code, message, data)->{
    if (code == 200) {
    }
});
```

**Error Code**

* `2020`  Not logged in

<br>

##  Menned mailbox

The user solves the mobile phone number. If the user does not bind other login mode (mobile phone number, social login account), it will not be able to decompose the mailbox, will prompt the error.

```java
public static void unbindEmail(@NotNull AuthCallback<UserInfo> callback)
```

**Example**

```java
AuthClient.unbindEmail((code, message, data)-> {
    if (code == 200) {
    }
});
```

**Error Code**

* `2020` Not logged in
* `1320005` The current user is not bound to a mailbox

<br>

## Calculate password security level

Calculate the password security level ：

- `EWeak`: Low
- `EMedium`: Middle
- `EStrong`: High

```java
public static PasswordStrength computePasswordSecurityLevel(String password)
```

**Example**

```java
PasswordStrength result = AuthClient.computePasswordSecurityLevel("123"); // EWeak
```

<br>

## Get user account security level

Get user account security level.

```java
public static void getSecurityLevel(@NotNull AuthCallback<JSONObject> callback)
```

**Example**

```java
AuthClient.getSecurityLevel((code, message, data)-> {
    if (code == 200) {
    }
});
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

```java
public static void updateIdToken(@NotNull AuthCallback<UserInfo> callback)
```

**Example**

```java
AuthClient.updateIdToken((code, message, userInfo) ->{
    if (code == 200) {
    }
});
```

**Error Code**

* `2020` Not logged in

<br>

## Get applications that current users can access

Get the application that the current user can access. Note that the returned result data structure is List\<Application\>.

```java
public static void listApplications(int page, int limit, @NotNull AuthCallback<List<Application>> callback)
```

**Parameter**

* `page` Page serial number, default is `1`.
* `limit` The number of times returned per page, the default is `10`.

**Example**

```java
AuthClient.listApplications((code, message, applications) ->{
    if (code == 200) {
    }
});
```

**Callback data data structure**

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

**Error Code**

* `2020` Not logged in

<br>

## Get list of data data in users

Obtain the organization of the user. Because the user can be in multiple independent organization trees, this interface returns a two-digit array. Note that the returned result data structure is List\<Organization[]\>.

```java
public static void listOrgs(@NotNull AuthCallback<List<Organization[]>> callback)
```

**Example**

```java
AuthClient.listOrgs((code, message, organizations)->{
    if (code == 200) {
    }
});
```

**Callback data data structure**

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
                "name": "JavaDevHR",
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

Get the list of roles owned by users. Note that the returned result data structure is List\<Role\>.

```java
public static void listRoles(String namespace, @NotNull AuthCallback<List<Role>> callback)
```

**Parameter**

* `namespace` Permission group ID, used to filter role data. If empty, all roles of the user are returned

**Example**

```java
AuthClient.listRoles(null, (code, message, roles) ->{
    if (code == 200) {
    }
});
```

**Callback data data structure**

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

**Error Code**

* `2020` Not logged in

<br>

## Get all the list of users authorized to be authorized

Gets all resources authorized by users, and users are authorized to include resources that are inherited from roles, packets, and organizational institutions.

```java
public static void listAuthorizedResources(String namespace, String resourceType, @NotNull AuthCallback<List<Resource>> callback)
```

**Parameter**

* `namespace` Permission group ID.
* `resourceType` Resource type. Can be the following types of DATA, API, MENU, UI, BUTTON. If null, all resource type data is returned.

**Example**

```java
AuthClient.listAuthorizedResources("default", (code, message, resources)->{
    if (code == 200) {
    }
});
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

## Reset password through the first login Token

Reset password through the first login Token. You need to set Force User to change password at first login when creating a user.

```java
public static void resetPasswordByFirstTimeLoginToken(String token, String newPassword, @NotNull AuthCallback<JSONObject> callback)
```

**Parameter**

* `token` First login Token
* `password` Reset password

**Example**

```java
AuthClient.resetPasswordByFirstTimeLoginToken(token, password, (code, message, data)->{
    if (code == 200) {
    }
});
```

<br>

## Delete the account

Users can delete their current login accounts.

>This operation cannot be reversed. Therefore, you must prompt the user.

```java
public static void deleteAccount(AuthCallback<JSONObject> callback)
```

**Example**

```java
private void deleteAccount() {
    new AlertDialog.Builder(this).setIcon(android.R.drawable.ic_dialog_alert)
            .setTitle(R.string.authing_delete_account).setMessage(R.string.authing_delete_account_tip)
            .setPositiveButton(android.R.string.yes, (dialog, which) -> AuthClient.deleteAccount((code, message, data) -> {
                if (code == 200) {
                    AuthFlow.start(UserProfileActivity.this);
                } else {
                    runOnUiThread(()->Toast.makeText(UserProfileActivity.this, message, Toast.LENGTH_LONG).show());
                }
            }))
            .setNegativeButton(android.R.string.no, null).show();
}
```

<br>
