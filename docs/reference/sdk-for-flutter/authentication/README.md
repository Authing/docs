# 核心认证 API

<LastUpdated/>

## 邮箱注册

使用邮箱注册帐号，邮箱不区分大小写且用户池内唯一。此接口不要求用户对邮箱进行验证，用户注册之后 emailVerified 字段会为 false 。

```dart
static Future<AuthResult> registerByEmail(String email, String password) async
```

**参数**

* *email* 邮箱
* *password* 明文密码

**示例**

```dart
AuthResult result = await AuthClient.registerByEmail("x@example.com", "strong");
User user = result.user;
```

**错误码**

* 2003 非法邮箱地址
* 2026 邮箱已注册

<br>

## 用户名注册

通过用户名注册帐号。用户名区分大小写且用户池内唯一。

```dart
static Future<AuthResult> registerByUserName(String username, String password) async
```

**参数**

* *username* 用户名
* *password* 明文密码

**示例**

```dart
AuthResult result = await AuthClient.registerByUserName("nextgeneration", "strong");
User user = result.user;
```

**错误码**

* 2026 用户名已存在

<br>

## 短信验证码注册

通过手机号和短信验证码注册帐号。手机号需要在用户池内唯一。调用此接口之前，需要先调用 [发送短信验证码](#发送短信验证码) 接口以获取短信验证码

```dart
static Future<AuthResult> registerByPhoneCode(String phone, String code, String password) async
```

**参数**

* *phone* 手机号
* *code* 短信验证码
* *password* 明文密码

**示例**

```dart
AuthResult result = await AuthClient.registerByPhoneCode("13012345678", "1121", "strong");
User user = result.user;
```

**错误码**

* 2001 验证码错误
* 2026 手机号已注册

<br>

## 帐号密码登录

```dart
static Future<AuthResult> loginByAccount(String account, String password) async
```

**参数**

* *account* 可以是手机号 / 邮箱 / 用户名
* *password* 明文密码

**示例**

```dart
AuthResult result = await AuthClient.loginByAccount("your account", "your password");
User user = result.user; // user info
```

**错误码**

* 2333 帐号或密码错误

<br>

## 手机验证码登录

通过短信验证码登录，需要先调用 [发送短信验证码](#发送短信验证码) 接口。

```dart
static Future<AuthResult> loginByPhoneCode(String phone, String code) async
```

**参数**

* *phone* 手机号
* *code* 短信验证码

**示例**

```dart
AuthResult result = await AuthClient.loginByPhoneCode("13012345678", "1234");
User user = result.user; // get user info
```

**错误码**

* 2001 短信验证码不正确

<br>

## LDAP 登录

```dart
static Future<AuthResult> loginByLDAP(String username, String password) async
```

**参数**

* *username* ldap 用户名
* *password* 明文密码

**示例**

```dart
AuthResult result = await AuthClient.loginByLDAP("your username", "your password");
User user = result.user; // user info
```

**错误码**

* 2333 帐号或密码错误

<br>

## AD 登录

```dart
static Future<AuthResult> loginByAD(String username, String password) async
```

**参数**

* *username* AD 用户名
* *password* 明文密码

**示例**

```dart
AuthResult result = await AuthClient.loginByAD("your username", "your password");
User user = result.user; // user info
```

**错误码**

<br>

## 获取当前登录的用户信息

获取当前登录的用户信息，需要先登录

```dart
static Future<AuthResult> getCurrentUser() async
```

**示例**

```dart
AuthResult result = await AuthClient.getCurrentUser();
User user = result.user; // user info
```

**错误码**

* 2020 未登录

<br>

## 退出登录

退出登录。同时清除内存以及本地持久化的 token 和用户信息

```dart
static Future<AuthResult> logout() async
```

**示例**

```dart
AuthResult result = await AuthClient.logout();
var code = result.code;
```

**错误码**

* 1010001 如果用户的 id token 非法或者过期

<br>

## 发送短信验证码

向指定的手机发送短信验证码

```dart
static Future<AuthResult> sendSms(String phone, [String? phoneCountryCode]) async
```

**参数**

* *phone* 手机号
* *phoneCountryCode* 电话国家码。可以为空，为空时默认为 +86

**示例**

```dart
AuthResult result = await AuthClient.sendSms("13012345678", "+86");
var code = result.code;
```

**错误码**

* 500 手机号码格式非法

<br>

## 发送邮件

给指定邮箱发送邮件

```dart
static Future<AuthResult> sendEmail(String email, String scene) async
```

**参数**

* *email* 邮箱地址
* *scene* 发送场景，可选值包含：
  - RESET_PASSWORD_VERIFY_CODE: 发送重置密码验证码邮件；
  - FIRST_EMAIL_LOGIN_VERIFY: 发送首次邮箱登录验证邮件；
  - CONSOLE_CONDUCTED_VERIFY: 发送控制台发起的验证邮件；
  - EMAIL_BIND_VERIFY_CODE: 发送邮箱绑定验证码邮件；
  - EMAIL_UNBIND_VERIFY_CODE: 发送邮箱解绑验证码邮件；
  - REGISTER_VERIFY_CODE: 发送注册验证码邮件；
  - LOGIN_VERIFY_CODE: 发送登录验证码邮件；
  - MFA_VERIFY_CODE: 发送 MFA 验证码邮件；
  - INFORMATION_COMPLETION_VERIFY_CODE: 发送信息补全验证码邮件；

**示例**

```dart
AuthResult result = await AuthClient.sendEmail("cool@gmail.com", "RESET_PASSWORD");
var code = result.code;
```

**错误码**

* 1020017 邮箱地址非法

<br>

## 获取用户自定义数据

获取用户自定义数据，你需要先在用户池 [定义用户自定义数据元信息](/guides/users/user-defined-field/)

用户自定义数据会添加到传入的 userInfo 对象里面

调用此接口需要先登录

```dart
static Future<AuthResult> getCustomData(String userId) async
```

**参数**

* *userInfo* 用户信息对象

**示例**

```dart
AuthResult result = await AuthClient.getCustomData("user_id");
var value = AuthClient.currentUser?.customData[0]["key"], "your_custom_field_key");
```

**错误码**

* 2020 未登录

<br>

## 设置用户自定义数据

设置用户的自定义数据。你需要先在用户池 [定义用户自定义数据元信息](/guides/users/user-defined-field/)，且传入值的类型必须和定义的类型匹配。

调用此接口需要先登录

```dart
static Future<AuthResult> setCustomData(List data) async
```

**参数**

* *customData* key-value 形式的 JSONObject 对象

**示例**

```dart
AuthClient.currentUser?.customData[0]["value"] = "hello";
AuthResult result = await AuthClient.setCustomData(AuthClient.currentUser!.customData);
```

**错误码**

* 2020 未登录

<br>

## 通过短信验证码重置密码

通过短信验证码重置密码，你可以通过 [发送短信验证码](#发送短信验证码) 方法发送短信验证码

```dart
static Future<AuthResult> resetPasswordByPhoneCode(String phone, String code, String password) async
```

**参数**

* *phone* 手机号
* *code* 短信验证码
* *password* 明文密码

**示例**

```dart
AuthResult result = await AuthClient.resetPasswordByPhoneCode("13012345678", "1234", "strong");
expect(result.code, 200);
```

**错误码**

* 2004 用户不存在

<br>

## 通过邮件验证码重置密码

通过邮件验证码重置密码，你需要先调用 [sendEmail](#发送邮件) 接口发送重置密码邮件（场景值为 `RESET_PASSWORD`）。

```dart
static Future<AuthResult> resetPasswordByEmailCode(String email, String code, String password) async
```

**参数**

* *email* 邮箱地址
* *code* 邮件验证码
* *password* 明文密码

**示例**

```dart
AuthResult result = await AuthClient.resetPasswordByEmailCode("cool@gmail.com", "1234", "strong");
expect(result.code, 200);
```

**错误码**

* 2004 用户不存在

<br>

## 修改用户资料

修改用户资料，此接口不能用于修改手机号、邮箱、密码

```dart
static Future<AuthResult> updateProfile(Map map) async
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

```dart
AuthResult result = await AuthClient.updateProfile({
  "username":"elonmusk",
  "nickname":"Ironman"
});
```

**错误码**

* 2020 未登录

<br>

## 更新用户密码

更新用户密码。如果用户没有设置密码，如通过短信验证码、社会化登录等方式注册的，oldPassword 留空。

```dart
static Future<AuthResult> AuthClient.updatePassword(String newPassword, [String? oldPassword])
```

**参数**

* *newPassword* 新密码
* *oldPassword* 旧密码。可以为空

**示例**

```dart
AuthResult result = await AuthClient.updatePassword("newPassword", "oldPassword");
var code = result.code;
```

**错误码**

* 2020 未登录
* 1320011 旧密码不正确

<br>

## 绑定手机号

为当前登录用户绑定手机号。调用 [发送短信验证码](#发送短信验证码) 获取验证码。

```dart
static Future<AuthResult> bindPhone(String phone, String code) async
```

**参数**

* *phone* 手机号
* *code* 短信验证码

**示例**

```dart
AuthResult result = await AuthClient.bindPhone("13012345678", "1234");
var code = result.code;
```

**错误码**

* 2020 未登录

<br>

## 解绑手机号

用户解绑手机号，如果用户没有绑定其他登录方式（邮箱、社会化登录账号），将无法解绑手机号，会提示错误。

```dart
static Future<AuthResult> unbindPhone() async
```

**示例**

```dart
AuthResult result = await AuthClient.unbindPhone();
```

**错误码**

* 2020 未登录
* 1320005 当前用户未绑定其他登录方式

<br>

## 更新手机号

更新手机号。可以在Authing控制台禁用旧电话号码验证，此时不传 oldPhone、oldPhoneCode 和 oldPhoneCountryCode

```dart
static Future<AuthResult> updatePhone(String phone, String phoneCode,
      [String? oldPhone,
      String? oldPhoneCode,
      String? phoneCountryCode,
      String? oldPhoneCountryCode]) async
```

**参数**

* *phone* 手机号
* *code* 短信验证码
* *oldPhone* 旧手机号。可以为空
* *oldPhoneCode* 旧手机号短信验证码。可以为空
* *phoneCountryCode* 电话国家码。可以为空
* *oldPhoneCountryCode* 旧手机号电话国家码。可以为空

**示例**

```dart
AuthResult result = await AuthClient.unbindPhone();
```

**错误码**

* 2020 未登录
* 1320004 当前手机号已绑定其他用户

<br>

## 绑定邮箱

为当前登录用户绑定邮箱。调用 [发送邮件](#发送邮件) 获取验证码。

```dart
static Future<AuthResult> bindEmail(String email, String code) async
```

**参数**

* *email* 邮箱地址
* *code* 邮件验证码

**示例**

```dart
AuthResult result = await AuthClient.bindEmail("1@gmail.com", "1234");
var code = result.code;
```

**错误码**

* 2020 未登录

<br>

## 解绑邮箱

用户解绑邮箱，如果用户没有绑定其他登录方式（手机号、社会化登录账号），将无法解绑邮箱，会提示错误。

```dart
static Future<AuthResult> unbindEmail() async
```

**示例**

```dart
AuthResult result = await AuthClient.unbindEmail();
```

**错误码**

* 2020 未登录
* 1320005 当前用户未绑定邮箱

<br>

## 更新邮箱

更新邮箱。在Authing控制台可以禁用旧的邮箱验证，此时不传 oldEmail 和 oldEmailCode 。

```dart
static Future<AuthResult> updateEmail(String email, String emailCode,
      [String? oldEmail,
      String? oldEmailCode) async
```

**参数**

* *email* 邮箱地址
* *code* 邮件验证码
* *oldEmail* 旧邮箱地址。可以为空
* *oldEmailCode* 旧邮件验证码。可以为空

**示例**

```dart
AuthResult result = await AuthClient.updateEmail("1@gmail.com", "1234");
```

**错误码**

* 2020 未登录
* 1320004 当前邮箱已绑定其他用户

<br>

## 合并账号身份信息

将一个 Authing 子账号的外部身份源（如微信、GitHub、自定义 OIDC 身份源等）身份信息合并到一个 Authing 主账号上，同时**删除子账号**。

若用户原先使用某一身份源可以登录到子账号，合并之后，用户再用此身份源登录，将登录到主账号。

**注意，除来自外部身份源的身份信息外，子账号的一切信息都会在合并后丢失！**

```dart
static Future<AuthResult> link(String primaryUserToken, String secondaryUserToken) async
```

**参数**

* *primaryUserToken* 主账号 Token
* *secondaryUserToken* 子账号 Token

**示例**

```dart
AuthResult result = await AuthClient.link("first_token", "second_token");
```

**错误码**

* 2020 未登录
* 1320004 当前邮箱已绑定其他用户

<br>

## 计算密码安全等级

计算密码安全等级，返回三种级别的枚举类型：

- 0 等级低
- 1 等级中
- 2 等级高

```dart
static int computePasswordSecurityLevel(String password)
```

**示例**

```dart
AuthClient.computePasswordSecurityLevel("123"); // 0
```

<br>

## 获取用户账号安全等级

获取当前登录帐号的安全等级。

```dart
static Future<Result> getSecurityLevel() async
```

**示例**

```dart
Result result = await AuthClient.getSecurityLevel();
int score = result.data["score"];
```

**回调 data 数据结构**

```json
{
    "code": 200,
    "message": "请求成功",
    "data": {
        "score": 60,
        "email": false,
        "phone": false,
        "password": true,
        "passwordSecurityLevel": 1,
        "mfa": false
    }
}
```

**错误码**

* 2020 未登录

<br>

## 刷新当前用户的 ID Token

```dart
static Future<AuthResult> updateIdToken() async
```

**示例**

```dart
Map result = await AuthClient.updateIdToken();
```

**错误码**

* 2020 未登录

<br>

## 获取当前用户能够访问的应用

获取当前用户能够访问的应用。注意返回的结果数据结构为 NSArray

```dart
static Future<Result> listApplications([int? page = 1, int? limit = 10]) async
```

**参数**

* *page* 分页序号, 默认为 `1`。
* *limit* 每页返回的个数, 默认为 `10`。

**示例**

```dart
Result result = await AuthClient.listApplications();
int count = result.data["totalCount"];
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

```dart
static Future<Result> listOrgs() async
```

**示例**

```dart
Result result = await AuthClient.listOrgs();
List list = result.data["data"]; // note double data
```

**返回结果示例**

```json
String name = list[0][3]["name"]; // 返回第一层，第四级部门的名称
```

**错误码**

* 2020 未登录

<br>

## 获取角色

获取当前登录用户的角色。注意返回的数据结构为 NSArray

```dart
static Future<Result> listRoles([String? namespace]) async
```

**参数**

* *namespace* 权限分组 ID，用来过滤角色数据。如果传空，则返回用户所有角色

**示例**

```dart
Result result = await AuthClient.listRoles();
List list = result.data["data"]; // note double data
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

```dart
static Future<Map> listAuthorizedResources(String namespace, [String? resourceType]) async
```

**参数**

* *namespace* 权限分组 ID
* *resourceType* 资源类型。可以为以下几种类型 DATA, API, MENU, UI, BUTTON。如果传空，则返回所有资源类型数据

**示例**

```dart
Map result = await AuthClient.listAuthorizedResources("default");
String result["list"][0]["code"];
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

## 首次登录重置密码

在 Authing 控制台启用该功能后，用户首次登录后必须重置密码

```dart
static Future<AuthResult> resetPasswordByFirstLoginToken(String token, String password) async
```

**参数**

- *token* 首次登录后返回
- *password* 密码

**示例**

```dart
AuthResult result = await AuthClient.resetPasswordByFirstLoginToken("token", "strong");
```

<br>