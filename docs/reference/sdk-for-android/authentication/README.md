# 核心认证 API

<LastUpdated/>

## 邮箱注册

使用邮箱注册帐号，邮箱不区分大小写且用户池内唯一。此接口不要求用户对邮箱进行验证，用户注册之后 emailVerified 字段会为 false 。

```java
public static void registerByEmail(String email, String password, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

* *email* 邮箱
* *password* 明文密码

**示例**

```java
AuthClient.registerByEmail("me@gmail.com", "strong", (code, message, userInfo)->{
    if (code == 200) {
        // userInfo：用户信息
    }
});
```

**错误码**

* 2003 非法邮箱地址
* 2026 邮箱已注册

<br>

## 用户名注册

通过用户名注册帐号。用户名区分大小写且用户池内唯一。

```java
public static void registerByUserName(String username, String password, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

* *username* 用户名
* *password* 明文密码

**示例**

```java
AuthClient.registerByUserName("username", "strong", (code, message, userInfo)->{
    if (code == 200) {
        // userInfo：用户信息
    }
});
```

**错误码**

* 2026 用户名已存在

<br>

## 短信验证码注册

通过手机号和短信验证码注册帐号。手机号需要在用户池内唯一。调用此接口之前，需要先调用 [发送短信验证码](#发送短信验证码) 接口以获取短信验证码

```java
public static void registerByPhoneCode(String phone, String code, String password, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

* *phone* 手机号
* *code* 短信验证码
* *password* 明文密码

**示例**

```java
AuthClient.registerByPhoneCode("13012345678", "1234", "strong", (code, message, userInfo)->{
    if (code == 200) {
        // userInfo：用户信息
    }
});
```

**错误码**

* 2001 验证码错误
* 2026 手机号已注册

<br>

## 帐号密码登录

```java
public static void loginByAccount(String account, String password, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

* *account* 可以是手机号 / 邮箱 / 用户名
* *password* 明文密码

**示例**

```java
AuthClient.loginByAccount("account", "strong", (code, message, userInfo)->{
    if (code == 200) {
        // userInfo：用户信息
    }
});
```

**错误码**

* 2333 帐号或密码错误

<br>

## 手机验证码登录

通过短信验证码登录，需要先调用 [发送短信验证码](#发送短信验证码) 接口。

```java
public static void loginByPhoneCode(String phone, String code, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

* *phone* 手机号
* *code* 短信验证码

**示例**

```java
AuthClient.loginByPhoneCode("13012345678", "1234", (code, message, userInfo)->{
    if (code == 200) {
        // userInfo：用户信息
    }
});
```

**错误码**

* 2001 短信验证码不正确

<br>

## LDAP 登录

```java
public static void loginByLDAP(String username, String password, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

* *username* ldap 用户名
* *password* 明文密码

**示例**

```java
AuthClient.loginByLDAP("username", "strong", (code, message, userInfo)->{
    if (code == 200) {
        // userInfo：用户信息
    }
});
```

**错误码**

* 2333 帐号或密码错误

<br>

## AD 登录

```java
public static void loginByAD(String username, String password, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

* *username* AD 用户名
* *password* 明文密码

**示例**

```java
AuthClient.loginByAD("username", "strong", (code, message, userInfo)->{
    if (code == 200) {
        // userInfo：用户信息
    }
});
```

**错误码**

* 2333 帐号或密码错误

<br>

## 获取当前登录的用户信息

获取当前登录的用户信息，需要先登录

```java
public static void getCurrentUser(@NotNull AuthCallback<UserInfo> callback)
```

**示例**

```java
AuthClient.getCurrentUser((code, message, userInfo) -> {
    if (code == 200) {
        // userInfo：用户信息
    }
});
```

**错误码**

* 2020 未登录

<br>

## 退出登录

退出登录。同时清除内存以及本地持久化的 token 和用户信息。退出登录后 Authing.getCurrentUser() 返回空

```java
public static void logout(@NotNull AuthCallback<?> callback)
```

**示例**

```java
// AuthFlow.start(this) will go to login page
AuthClient.logout((code, message, data)-> AuthFlow.start(this));
```

**错误码**

* 1010001 如果用户的 id token 非法或者过期

<br>

## 发送短信验证码

向指定的手机发送短信验证码

```java
public static void sendSms(String phone, String phoneCountryCode, @NotNull AuthCallback<?> callback)
```

**参数**

* *phone* 手机号
* *phoneCountryCode* 电话国家码。可以为空，为空时默认为 +86

**示例**

```java
AuthClient.sendSms("13012345678", "+86", (code, message, data)->{});
```

**错误码**

* 500 手机号码格式非法

<br>

## 发送邮件

给指定邮箱发送邮件

```java
public static void sendEmail(String emailAddress, String scene, @NotNull AuthCallback<JSONObject> callback)
```

**参数**

* *email* 邮箱地址
* *scene* 发送场景，可选值包含：
  - RESET_PASSWORD: 发送重置密码邮件，邮件中包含验证码；
  - VERIFY_EMAIL: 发送验证邮箱的邮件；
  - CHANGE_EMAIL: 发送修改邮箱邮件，邮件中包含验证码；
  - MFA_VERIFY: 发送 MFA 验证邮件。

**示例**

```java
AuthClient.sendEmail("cool@gmail.com", "RESET_PASSWORD",  (code, message, data)->{
    if (code == 200) {
        // 发送成功
    }
});
```

**错误码**

* 1020017 邮箱地址非法

<br>

## 获取用户自定义数据

获取用户自定义数据，你需要先在用户池 [定义用户自定义数据元信息](/guides/users/user-defined-field/)

用户自定义数据会添加到传入的 userInfo 对象里面

调用此接口需要先登录

```java
public static void getCustomUserData(UserInfo userInfo, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

* *userInfo* 用户信息对象

**示例**

```java
AuthClient.getCustomUserData(Authing.getCurrentUser(), (code, message, data)->{
    if (code == 200) {
        
    }
});
```

**错误码**

* 2020 未登录

<br>

## 设置用户自定义数据

设置用户的自定义数据。你需要先在用户池 [定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。

调用此接口需要先登录

```java
public static void setCustomUserData(JSONObject customData, @NotNull AuthCallback<JSONObject> callback)
```

**参数**

* *customData* key-value 形式的 JSONObject 对象

**示例**

```java
JSONObject object = new JSONObject();
object.put("your_custom_data_key", "your_custom_data_value");
AuthClient.setCustomUserData(object, (code, message, res) -> {
    if (code == 200) {

    }
});
```

**错误码**

* 2020 未登录

<br>

## 更新用户头像

通过从系统选择一张图片来更新用户头像

调用此接口需要先登录

```java
public static void uploadAvatar(InputStream in, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

* *in* 图片输入流。推荐使用系统默认图片选择器获取

**示例**

启动系统默认图片选择器

```java
Intent i = new Intent();
i.addCategory(Intent.CATEGORY_OPENABLE);
i.setType("image/*");
i.setAction(Intent.ACTION_GET_CONTENT);
((Activity) getContext()).startActivityForResult(Intent.createChooser(i, "Select Picture"), 1000);
```

通过以下回调拿到图片输入流，并调用更新头像接口

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

**错误码**

* 2020 未登录

<br>

## 通过短信验证码重置密码

通过短信验证码重置密码，你可以通过 [发送短信验证码](#发送短信验证码) 方法发送短信验证码

```java
public static void resetPasswordByPhoneCode(String phone, String code, String newPassword, @NotNull AuthCallback<JSONObject> callback)
```

**参数**

* *phone* 手机号
* *code* 短信验证码
* *password* 明文密码

**示例**

```java
AuthClient.resetPasswordByPhoneCode("13012345678", "1234", "strong", (code, message, data)->{
    if (code == 200) {

    }
});
```

**错误码**

* 2004 用户不存在

<br>

## 通过邮件验证码重置密码

通过邮件验证码重置密码，你需要先调用 [sendEmail](#发送邮件) 接口发送重置密码邮件（场景值为 `RESET_PASSWORD`）。

```java
public static void resetPasswordByEmailCode(String emailAddress, String code, String newPassword, @NotNull AuthCallback<JSONObject> callback)
```

**参数**

* *email* 邮箱地址
* *code* 邮件验证码
* *password* 明文密码

**示例**

```java
AuthClient.resetPasswordByEmailCode("me@gmail.com", "1234", "strong", (code, message, data)->{
    if (code == 200) {

    }
});
```

**错误码**

* 2004 用户不存在

<br>

## 修改用户资料

修改用户资料，此接口不能用于修改手机号、邮箱、密码

```java
public static void updateProfile(JSONObject object, @NotNull AuthCallback<UserInfo> callback)
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

```java
JSONObject body = new JSONObject();
body.put("username", "elonmusk");
body.put("nickname", "Ironman");
AuthClient.updateProfile(body, (code, message, userInfo)->{
    if (code == 200) {

    }
});
```

**错误码**

* 2020 未登录

<br>

## 更新用户密码

更新用户密码。如果用户没有设置密码，如通过短信验证码、社会化登录等方式注册的，oldPassword 留空。

```java
public static void updatePassword(String newPassword, String oldPassword, @NotNull AuthCallback<JSONObject> callback)
```

**参数**

* *newPassword* 新密码
* *oldPassword* 旧密码。可以为空

**示例**

```java
AuthClient.updatePassword("newStrong", "oldStrong", (code, message, data) -> {
    if (code == 200) {

    }
});
```

**错误码**

* 2020 未登录
* 1320011 旧密码不正确

<br>

## 绑定手机号

为当前登录用户绑定手机号。调用 [发送短信验证码](#发送短信验证码) 获取验证码。

```java
public static void bindPhone(String phone, String code, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

* *phone* 手机号
* *code* 短信验证码

**示例**

```java
AuthClient.bindPhone("13012345678", "1234", (code, message, data)->{
    if (code == 200) {
    }
});
```

**错误码**

* 2020 未登录

<br>

## 解绑手机号

用户解绑手机号，如果用户没有绑定其他登录方式（邮箱、社会化登录账号），将无法解绑手机号，会提示错误。

```java
public static void unbindPhone(@NotNull AuthCallback<UserInfo> callback)
```

**示例**

```java
AuthClient.unbindPhone((code, message, data)-> {
    if (code == 200) {
    }
});
```

**错误码**

* 2020 未登录
* 1320005 当前用户未绑定其他登录方式

<br>

## 绑定邮箱

为当前登录用户绑定邮箱。调用 [发送邮件](#发送邮件) 获取验证码。

```java
public static void bindEmail(String email, String code, @NotNull AuthCallback<UserInfo> callback)
```

**参数**

* *email* 邮箱地址
* *code* 邮件验证码

**示例**

```java
AuthClient.bindEmail("me@gmail.com", "1234", (code, message, data)->{
    if (code == 200) {
    }
});
```

**错误码**

* 2020 未登录

<br>

## 解绑邮箱

用户解绑邮箱，如果用户没有绑定其他登录方式（手机号、社会化登录账号），将无法解绑邮箱，会提示错误。

```java
public static void unbindEmail(@NotNull AuthCallback<UserInfo> callback)
```

**示例**

```java
AuthClient.unbindEmail((code, message, data)-> {
    if (code == 200) {
    }
});
```

**错误码**

* 2020 未登录
* 1320005 当前用户未绑定邮箱

<br>

## 计算密码安全等级

计算密码安全等级，返回三种级别：

- `EWeak`: 等级低
- `EMedium`: 等级中
- `EStrong`: 等级高

```java
public static PasswordStrength computePasswordSecurityLevel(String password)
```

**示例**

```java
PasswordStrength result = AuthClient.computePasswordSecurityLevel("123"); // EWeak
```

<br>

## 获取用户账号安全等级

获取当前登录帐号的安全等级。

```java
public static void getSecurityLevel(@NotNull AuthCallback<JSONObject> callback)
```

**示例**

```java
AuthClient.getSecurityLevel((code, message, data)-> {
    if (code == 200) {
    }
});
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

## 刷新当前用户的 Token

```java
public static void updateIdToken(@NotNull AuthCallback<UserInfo> callback)
```

**示例**

```java
AuthClient.updateIdToken((code, message, userInfo) ->{
    if (code == 200) {
    }
});
```

**错误码**

* 2020 未登录

<br>

## 获取当前用户能够访问的应用

获取当前用户能够访问的应用。注意返回的结果数据结构为 List\<Application\>

```java
public static void listApplications(int page, int limit, @NotNull AuthCallback<List<Application>> callback)
```

**参数**

* *page* 分页序号, 默认为 `1`。
* *limit* 每页返回的个数, 默认为 `10`。

**示例**

```java
AuthClient.listApplications((code, message, applications) ->{
    if (code == 200) {
    }
});
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

获取用户所在组织机构。由于用户可以在多个独立的组织机构树下，所以本接口返回了一个二位数组。注意返回的结果数据结构为 List\<Organization[]\>

```java
public static void listOrgs(@NotNull AuthCallback<List<Organization[]>> callback)
```

**示例**

```java
AuthClient.listOrgs((code, message, organizations)->{
    if (code == 200) {
    }
});
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

**错误码**

* 2020 未登录

<br>

## 获取角色

获取当前登录用户的角色。注意返回的数据结构为 List\<Role\>

```java
public static void listRoles(String namespace, @NotNull AuthCallback<List<Role>> callback)
```

**参数**

* *namespace* 权限分组 ID，用来过滤角色数据。如果传空，则返回用户所有角色

**示例**

```java
AuthClient.listRoles(null, (code, message, roles) ->{
    if (code == 200) {
    }
});
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

```java
public static void listAuthorizedResources(String namespace, String resourceType, @NotNull AuthCallback<List<Resource>> callback)
```

**参数**

* *namespace* 权限分组 ID
* *resourceType* 资源类型。可以为以下几种类型 DATA, API, MENU, UI, BUTTON。如果传空，则返回所有资源类型数据

**示例**

```java
AuthClient.listAuthorizedResources("default", (code, message, resources)->{
    if (code == 200) {
    }
});
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

## 通过首次登录的 Token 重置密码

通过首次登录的 Token 重置密码，需要在创建用户时设置“强制用户首次登录时修改密码”

```java
public static void resetPasswordByFirstTimeLoginToken(String token, String newPassword, @NotNull AuthCallback<JSONObject> callback)
```

**参数**

* *token* 首次登录后获取的 token
* *password* 明文密码

**示例**

```java
AuthClient.resetPasswordByFirstTimeLoginToken(token, password, (code, message, data)->{
    if (code == 200) {
    }
});
```

<br>

## 删除帐号

用户自助删除当前登录帐号。

>此操作不可逆，请务必给用户足够的提示

```java
public static void deleteAccount(AuthCallback<JSONObject> callback)
```

**示例**

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
