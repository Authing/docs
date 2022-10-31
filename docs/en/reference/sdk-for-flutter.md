# SDK for Flutter

<LastUpdated/>

# Getting started 

## Add dependency 

in your pubspec.yaml, add the following dependency:

```yaml
authing_sdk: ^1.0.0
```

## SDK initialization 

Upon App start, call:

```dart
import 'package:authing_sdk/authing.dart';

Authing.init(String userPoolId, String appId)
```

where *userPoolId* is your Authing user pool id and *appId* is your Authing app id

## On-premise deployment 

for on-premise deployments, after calling init, call:

```dart
Authing.setOnPremiseInfo(String host, String publicKey)
```

where *host* is your own domain, e.g. mycompany.com and *publicKey* is your organization's public key.

Contact Authing sales if you have any questions.

# APIs 

## [Basic Authentication](#authentication-api) 

- [Register by email](#register-by-email)
- [Register by user name](#register-by-user-name)
- [Register by phone code](#register-by-phone-code)
- [Login by account and password](#login-by-account-and-password)
- [Login by phone code](#login-by-phone-code)
- [Login by LDAP](#login-by-ldap)
- [Login by AD](#login-by-ad)
- [Get current user](#get-current-user)
- [Logout](#logout)
- [Send SMS code](#send-sms-code)
- [Send email](#send-email)
- [Get user custom data](#get-user-custom-data)
- [Set user custom data](#set-user-custom-data)
- [Reset password by phone code](#reset-password-by-phone-code)
- [Reset password by email code](#reset-password-by-email-code)
- [Update user profile](#update-user-profile)
- [Update password](#update-password)
- [Bind phone](#bind-phone)
- [Unbind phone](#unbind-phone)
- [Update phone](#update-phone)
- [Bind email](#bind-email)
- [Unbind email](#unbind-email)
- [Update email](#update-email)
- [Link](#link)
- [Unlink](#unlink)
- [Compute password security level](#compute-password-security-level)
- [Get security level](#get-security-level)
- [List applications](#list-applications)
- [List organizations](#list-organizations)
- [List roles](#list-roles)
- [List authorized resources](#list-authorized-resources)
- [Update id token](#update-id-token)
- [Reset password by first time login token](#reset-password-by-first-time-login-token)

## [Social](#social-api) 

- [Login by wechat](#login-by-wechat)
- [Login by alipay](#login-by-alipay)
- [Login by apple](#login-by-apple)

## [MFA](#mfa-api) 

- [MFA check](#mfa-check)
- [MFA verify by phone](#MFA-verify-by-phone)
- [MFA verify by email](#MFA-verify-by-email)
- [MFA verify by TOTP](#MFA-verify-by-totp)
- [MFA verify by recovery code](#MFA-verify-by-recovery-code)

## [OIDC](#oidc-api) 

- [Login by OIDC authorization code](#auth-by-code)
- [OIDC Login by account and password](#oidc-login-by-account-and-password)
- [OIDC Login by phone code](#oidc-login-by-phone-code)
- [Build authorize URL](#build-authorize-url)
- [Token Change user information](#token-change-userinformation)
- [Refresh Access Token](#refresh-access-token)

## [Scan](#scan-api) 

- [mark QR code scanned](#mark-qr-code-scanned)
- [login by QR code](#login-by-qr-code)



# Authentication API 

for all authentication APIs, you should import:

```dart
import 'package:authing_sdk/client.dart';
```



## Register by email 

Register a new user by email. The email is case insensitive and must be unique within a given user pool. After registration, emailVerified is false.

```dart
static Future<AuthResult> registerByEmail(String email, String password) async
```

**params**

- *email*
- *password* clear text password

**example**

```dart
AuthResult result = await AuthClient.registerByEmail("x@example.com", "strong");
User user = result.user;
```

**error**

- 2003 if email address is mal-formatted
- 2026 if email has been registered already



## Register by user name 

Register a new user by user name. User name is case sensitive and must be unique within a given user pool.

```dart
static Future<AuthResult> registerByUserName(String username, String password) async
```

**params**

- *username*
- *password* clear text password

**example**

```dart
AuthResult result = await AuthClient.registerByUserName("nextgeneration", "strong");
User user = result.user;
```

**error**

- 2026 if username has been registered already



## Register by phone code 

Register a new user by phone number and a verification code. Phone number must be unique within a given user pool.

Must call [sendSms](#send-sms-code) method to get an SMS verification code before calling this method.

```dart
static Future<AuthResult> registerByPhoneCode(String phone, String code, String password) async
```

**params**

- *phone* phone number
- *code* SMS code
- *password* clear text password

**example**

```dart
AuthResult result = await AuthClient.registerByPhoneCode("188xxxx8888", "1121", "strong");
User user = result.user;
```

**error**

- 2001 if verification code is incorrect
- 2026 if phone number has been registered already



## Login by account and password 

```dart
static Future<AuthResult> loginByAccount(String account, String password) async
```

**params**

- *account* can be one of the following: phone number / email / user name
- *password* clear text password

**example**

```dart
AuthResult result = await AuthClient.loginByAccount("your account", "your password");
User user = result.user; // user info
```

**error**

- 2333 incorrect credential



## Login by phone code 

login by phone number and a verification code. Must call [sendSms](#send-sms-code) method to get an SMS verification code before calling this method.

```dart
static Future<AuthResult> loginByPhoneCode(String phone, String code) async
```

**params**

- *phone* phone number
- *code* SMS code

**example**

```dart
AuthResult result = await AuthClient.loginByPhoneCode("188xxxx8888", "1234");
User user = result.user; // get user info
```

**error**

- 2001 if verification code is incorrect



## Login by LDAP 

```dart
static Future<AuthResult> loginByLDAP(String username, String password) async
```

**params**

- *username* ldap username
- *password* clear text password

**example**

```dart
AuthResult result = await AuthClient.loginByLDAP("your username", "your password");
User user = result.user; // user info
```

**error**

- 2333 incorrect credential



## Login by AD 

```dart
static Future<AuthResult> loginByAD(String username, String password) async
```

**params**

- *username* AD username
- *password* clear text password

**example**

```dart
AuthResult result = await AuthClient.loginByAD("your username", "your password");
User user = result.user; // user info
```

**error**

- 2333 incorrect credential



## Get current user 

Get current user information. Must log in first.

```dart
static Future<AuthResult> getCurrentUser() async
```

**example**

```dart
AuthResult result = await AuthClient.getCurrentUser();
User user = result.user; // user info
```

**error**

- 2020 must login first



## Logout 

Logout user.

```dart
static Future<AuthResult> logout() async
```

**example**

```dart
AuthResult result = await AuthClient.logout();
var code = result.code;
```

**error**

- 1010001 if token is invalid or expired



## Send SMS code 

Send an SMS verification code

```dart
static Future<AuthResult> sendSms(String phone, [String? phoneCountryCode]) async
```

**params**

- *phone* phone number to receive the code
- *phoneCountryCode* phone country code starts with +. Optional

**example**

```dart
AuthResult result = await AuthClient.sendSms("188xxxx8888", "+86");
var code = result.code;
```

**error**

- 500 phone number is mal-formatted



## Send email 

Send an email to the given email addrees

```dart
static Future<AuthResult> sendEmail(String email, String scene) async
```

**params**

- *email* email address
- *scene* can be one of the following: RESET_PASSWORD, VERIFY_EMAIL, CHANGE_EMAIL, MFA_VERIFY

**example**

```dart
AuthResult result = await AuthClient.sendEmail("cool@gmail.com", "RESET_PASSWORD");
var code = result.code;
```

**error**

- 1020017 email address is mal-formatted



## Get user custom data 

Firstly add custom field in authing console, then use this API to retrieve user custom data. You can pass *AuthClient.currentUser!.id* as the user id param. Upon success, custom data will be added in *AuthClient.currentUser?.customData*

Must log in first

```dart
static Future<AuthResult> getCustomData(String userId) async
```

**params**

- *userId* user id received after login

**example**

```dart
AuthResult result = await AuthClient.getCustomData("user_id");
var value = AuthClient.currentUser?.customData[0]["key"], "your_custom_field_key");
```

**error**

- 2020 must log in first



## Set user custom data 

Firstly add custom field in authing console, then use this API to set user custom data.

Must log in first

```dart
static Future<AuthResult> setCustomData(List data) async
```

**params**

- *data* a list of custom data that needs to be modified. The easy way is firstly set custom data value in your user object, then pass user object's customData field as parameter.

**example**

```dart
AuthClient.currentUser?.customData[0]["value"] = "hello";
AuthResult result = await AuthClient.setCustomData(AuthClient.currentUser!.customData);
```

**error**

- 2020 must log in first



## Reset password by phone code 

Reset user password using email verification code. Must call [sendSms](#send-sms-code) method to get an SMS verification code before calling this method.

```dart
static Future<AuthResult> resetPasswordByPhoneCode(String phone, String code, String password) async
```

**params**

- *phone* phone number
- *code* SMS verification code
- *password* clear text password

**example**

```dart
AuthResult result = await AuthClient.resetPasswordByPhoneCode("188xxxx8888", "1234", "strong");
expect(result.code, 200);
```

**error**

- 2004 user not exist



## Reset password by email code 

Reset user password using SMS verification code. Must call [sendEmail](#send-email) method with scene "RESET_PASSWORD" to get an emmail verification code before calling this method.

```dart
static Future<AuthResult> resetPasswordByEmailCode(String email, String code, String password) async
```

**params**

- *email* email address
- *code* email verification code
- *password* clear text password

**example**

```dart
AuthResult result = await AuthClient.resetPasswordByEmailCode("cool@gmail.com", "1234", "strong");
expect(result.code, 200);
```

**error**

- 2004 user not exist



## Update user profile 

Update user profile. Note phone, email and password cannot be updated using this method. Please call [updatePhone](#update-phone) / [updateEmail](#update-email) / [updatePassword](#update-password) respectively.

Must log in first.

```dart
static Future<AuthResult> updateProfile(Map map) async
```

**params**

- *map* user data needs to be updated

**full list** of field that can be used as key in the *map* parameter

- username
- nickname
- company
- photo
- browser
- device
- name
- givenName
- familyName
- middleName
- profile
- preferredUsername
- website
- gender
- birthdate
- zoneinfo
- locale
- address
- streetAddress
- locality
- region
- postalCode
- city
- province
- country

**example**

```dart
AuthResult result = await AuthClient.updateProfile({
  "username":"elonmusk",
  "nickname":"Ironman"
});
```

**error**

- 2020 must log in first



## Update password 

Update user password. Must log in first. In case user didn't set a password (e.g. registered by phone code or social connections), the old password parameter should be omitted.

```dart
static Future<AuthResult> AuthClient.updatePassword(String newPassword, [String? oldPassword])
```

**params**

- *newPassword* new password in clear text
- *oldPassword* old password in clear text. Optional

**example**

```dart
AuthResult result = await AuthClient.updatePassword("newPassword", "oldPassword");
var code = result.code;
```

**error**

- 2020 must log in first
- 1320011 old password is incorrect



## Bind phone 

Bind phone number for current user. If already bound, use [updatePhone](#update-phone) instead.

Must log in first

```dart
static Future<AuthResult> bindPhone(String phone, String code) async
```

**params**

- *phone* phone number
- *code* SMS code

**example**

```dart
AuthResult result = await AuthClient.bindPhone("188xxxx8888", "1234");
var code = result.code;
```

**error**

- 2020 must log in first



## Unbind phone 

Unbind phone number for current user.

Must log in first

```dart
static Future<AuthResult> unbindPhone() async
```

**example**

```dart
AuthResult result = await AuthClient.unbindPhone();
```

**error**

- 2020 must log in first
- 1320005 current user has no phone number bound



## Update phone 

Update phone number for current user. Old phone number verification can be disabled in Authing console, in such case, oldPhone, oldPhoneCode and oldPhoneCountryCode must be omitted.

Must log in first

```dart
static Future<AuthResult> updatePhone(String phone, String phoneCode,
      [String? oldPhone,
      String? oldPhoneCode,
      String? phoneCountryCode,
      String? oldPhoneCountryCode]) async
```

**params**

- *phone* new phone number
- *code* SMS code sent to the new phone
- *oldPhone* old phone number. Optional
- *oldPhoneCode* SMS code sent to old phone. Optional
- *phoneCountryCode* phone country code for the new phone. Optional
- *oldPhoneCountryCode* phone country code for the old phone. Optional

**example**

```dart
AuthResult result = await AuthClient.updatePhone("188xxxx8888", "1234");
```

**error**

- 2020 must log in first
- 1320004 phone already bound by other user



## Bind email 

Bind email address for current user. If already bound, use [updateEmail](#update-email) instead.

Must log in first

```dart
static Future<AuthResult> bindEmail(String email, String code) async
```

**params**

- *email* email address
- *code* email verification code

**example**

```dart
AuthResult result = await AuthClient.bindEmail("1@gmail.com", "1234");
var code = result.code;
```

**error**

- 2020 must log in first



## Unbind email 

Unbind email address for current user.

Must log in first

```dart
static Future<AuthResult> unbindEmail() async
```

**example**

```dart
AuthResult result = await AuthClient.unbindEmail();
```

**error**

- 2020 must log in first
- 1320005 current user has no email bound



## Update email 

Update email address for current user. Old email address verification can be disabled in Authing console, in such case, oldEmail and oldEmailCode must be omitted.

Must log in first

```dart
static Future<AuthResult> updateEmail(String email, String emailCode,
      [String? oldEmail,
      String? oldEmailCode) async
```

**params**

- *email* email address
- *code* email verification code
- *oldEmail* old email address. Optional
- *oldEmailCode* email code sent to old email. Optional

**example**

```dart
AuthResult result = await AuthClient.updateEmail("1@gmail.com", "1234");
```

**error**

- 2020 must log in first
- 1320004 email already bound by other user



## Link 

Links current account with another social account.

Must log in first

```dart
static Future<AuthResult> link(String primaryUserToken, String secondaryUserToken) async
```

**params**

- *primaryUserToken* current user's token
- *secondaryUserToken* the target social account's token. Note this token is still Authing token.

**example**

```dart
AuthResult result = await AuthClient.link("first_token", "second_token");
```

**error**

- 2020 must log in first
- 1020020 token is not valid



## Unlink 

Unlinks current account with a social account.

Must log in first

```dart
static Future<AuthResult> unlink(String provider) async
```

**params**

- *provider* type of the social account

**example**

```dart
AuthResult result = await AuthClient.unlink("wechat:mobile");
```

**error**

- 2004 user not exist



## Compute password security level 

Computes the security level for a givenn password and return:

- 0 low
- 1 medium
- 2 high

```dart
static int computePasswordSecurityLevel(String password)
```

**example**

```dart
AuthClient.computePasswordSecurityLevel("123"); // 0
```



## Get security level 

The current account's security level. Note that the result is not AuthResult, it is a general Result oject.

Must log in first

```dart
static Future<Result> getSecurityLevel() async
```

**example**

```dart
Result result = await AuthClient.getSecurityLevel();
int score = result.data["score"];
```

**return**

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

**error**

- 2020 must log in first



## List applications 

Get all applications that the current user has access. Note that the result is not AuthResult, it is a general Result oject.

Must log in first

```dart
static Future<Result> listApplications([int? page = 1, int? limit = 10]) async
```

**params**

- *page* page index. Optional
- *limit* number of applications returned in one page. Optional

**example**

```dart
Result result = await AuthClient.listApplications();
int count = result.data["totalCount"];
```

**return**

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

**error**

- 2020 must log in first



## List organizations 

Get all organizations that the current user is in. Note that the result is not AuthResult, it is a general Result oject.

Must log in first

```dart
static Future<Result> listOrgs() async
```

**example**

```dart
Result result = await AuthClient.listOrgs();
List list = result.data["data"]; // note double data
```

**return**

Since user can be part of separated oragnization trees, this method returns a two-dimensional list stored in result.data["data"]. For example to access one department, do it like this:

```dart
String name = list[0][3]["name"]; // returns the first tree, level 4 department's name
```

**error**

- 2020 must log in first



## List roles 

Get roles of current user. Note that the result is not AuthResult, it is a general Result oject.

Must log in first

```dart
static Future<Result> listRoles([String? namespace]) async
```

**params**

- *namespace* namespace id to filter the result. Optional

**example**

```dart
Result result = await AuthClient.listRoles();
List list = result.data["data"]; // note double data
```

**return**

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

**error**

- 2020 must log in first



## List authorized resources 

Get authorized resources of current user. Note that the result is a **Map**.

Must log in first

```dart
static Future<Map> listAuthorizedResources(String namespace, [String? resourceType]) async
```

**params**

- *namespace* namespace id to filter the result
- *resourceType* resource type to filter the result. Can be DATA, API, MENU, UI, BUTTON. Optional

**example**

```dart
Map result = await AuthClient.listAuthorizedResources("default");
String result["list"][0]["code"];
```

**return**

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

**error**

- 2020 must log in first



## Update id token 

Get new id token using current user's id token

Must log in first

```dart
static Future<AuthResult> updateIdToken() async
```

**example**

```dart
Map result = await AuthClient.updateIdToken();
```

**error**

- 2020 must log in first



## Reset password by first time login token 

If this feature is enabled, user must reset password after first time login

```dart
static Future<AuthResult> resetPasswordByFirstLoginToken(String token, String password) async
```

**params**

- *token* returned after initial login
- *password* clear text password

**example**

```dart
AuthResult result = await AuthClient.resetPasswordByFirstLoginToken("token", "strong");
```



# Social API 

## Login by wechat 

Login by wechat auth code

```dart
static Future<AuthResult> loginByWechat(String connId, String code) async
```

**params**

- *connId* get from social connection config in Authing console
- *code* auth code returned by wechat

**example**

```dart
AuthResult result = await AuthClient.loginByAccount("connId", "code");
```



## Login by alipay 

Login by alipay auth code

```dart
static Future<AuthResult> loginByAlipay(String connId, String code) async
```

**params**

- *connId* get from social connection config in Authing console
- *code* auth code returned by alipay

**example**

```dart
AuthResult result = await AuthClient.loginByAlipay("connId", "code");
```



## Login by apple 

Login by apple auth code

```dart
static Future<AuthResult> loginByApple(String code) async
```

**params**

- *code* auth code returned by apple

**example**

```dart
AuthResult result = await AuthClient.loginByApple("code");
```



# MFA API 

## MFA check 

Checks if a given phone or email can be used for MFA

```dart
static Future<bool> mfaCheck(String? phone, String? email) async
```

**params**

- *phone* phone number to check. Can be null
- *email* email address to check. Can be null

**example**

```dart
bool r1 = await AuthClient.mfaCheck("188xxxx8888", null);
bool r2 = await AuthClient.mfaCheck(null, "abc@gmail.com");
```



## MFA verify by phone 

MFA by SMS verification code sent to phone

```dart
static Future<AuthResult> mfaVerifyByPhone(String phone, String code) async
```

**params**

- *phone* phone number
- *code* SMS verification code

**example**

```dart
AuthResult result = await AuthClient.mfaVerifyByPhone("188xxxx8888", "1234");
```



## MFA verify by email 

MFA by email verification code

```dart
static Future<AuthResult> mfaVerifyByEmail(String email, String code) async
```

**params**

- *email* email address
- *code* email verification code

**example**

```dart
AuthResult result = await AuthClient.mfaVerifyByEmail("1@gmail.com", "1234");
```



## MFA verify by TOTP 

MFA by TOTP (Time-based One Time Password) code. User must firstly bound with TOTP.

```dart
static Future<AuthResult> mfaVerifyByTOTP(String code) async
```

**params**

- *code* TOTP code

**example**

```dart
AuthResult result = await AuthClient.mfaVerifyByTOTP("1234");
```



## MFA verify by recovery code 

MFA by recovery code which should be safely stored after first time bound with TOTP. Note after successful MFA via this method, the recovery code will be refreshed and returned by this method. User should again safely store the new recovery code.

```dart
static Future<AuthResult> mfaVerifyByRecoveryCode(String code) async
```

**params**

- *code* recovery code

**example**

```dart
AuthResult result = await AuthClient.mfaVerifyByRecoveryCode("1234");
```



# OIDC API 

## Auth by code 

After OIDC authentication, we will get an authorization code. Use this API to get user's access token & id token. Note that since we are front end, we cannot set OIDC client secret, instead, we have to use PKCE to get the code.

```dart
static Future<AuthResult> authByCode(String code, String codeVerifier, String redirectUrl) async
```

**params**

- *code* authorization code
- *codeVerifier* PKCE code verifier
- *redirectUrl* a valid url set in Authing console

**example**

```dart
AuthResult result = await AuthClient.authByCode("P6FENDfGSH72PxgJQk17FoGMWY3oL1G0D2PQ1AfyDeo",
        "fu6IivbcEb7DFCytjLmoAICRtFLbG9zkk5QdDbNd0gG",
        "https://guard.authing/redirect");
String ak = result.user?.accessToken;
String idToken = result.user?.token;
```



## OIDC Login by account and password 

```dart
static Future<AuthResult> loginByAccount(String account, String password) async
```

**params**

- *account* can be one of the following: phone number / email / user name
- *password* clear text password

**example**

```dart
AuthResult results = await OIDCClient.loginByAccount("your account", "your password");
User user = result.user; // user info
```



## OIDC Login by phone code 

login by phone number and a verification code. Must call [sendSms](#send-sms-code) method to get an SMS verification code before calling this method.

```dart
static Future<AuthResult> loginByPhoneCode(String phone, String code) async
```

**params**

- *phone* phone number
- *code* SMS code

**example**

```dart
AuthResult result = await OIDCClient.loginByPhoneCode("phone", "code");
User user = result.user; // get user info
```



## Build authorize URL 

The *buildAuthorizeUrl* method can be used to build the login URL, load the URL in your WebView.

```dart
static Future<AuthResult> buildAuthorizeUrl(AuthRequest authRequest) async
```

**params**

- *authRequest* Sets the custom parameters.Valid parameters include 'scope','redirectUrl','state'.For a detailed list, check the AuthRequest().

**example**

```dart
AuthRequest authRequest = AuthRequest();
authRequest.createAuthRequest();
// authRequest.scope = "scope";
// authRequest.redirectUrl = "redirectUrl";
String url = await OIDCClient.buildAuthorizeUrl(authRequest);
```



## Token Change user information 

Use Access token to get user information.

```dart
static Future<AuthResult> getUserInfoByAccessToken(String accessToken, [Map? data]) async 
```

**params**

- *accessToken* Access token

**example**

```dart
AuthResult result = await OIDCClient.getUserInfoByAccessToken("accessToken");
User user = result.user; // get user info
```



## Refresh Access Token 

Get new Access Token with Refresh token.

```dart
static Future<AuthResult> getNewAccessTokenByRefreshToken(String refreshToken) async 
```

**params**

- *refreshToken* Refresh Token

**example**

```dart
AuthResult result = await OIDCClient.getNewAccessTokenByRefreshToken("refreshToken");
User user = result.user; // get user info
```



# Scan API 

In order to support scan-to-login feature, first enable it in Authing console, then in the login web page, a QR code will be shown to user. User will then use your in house app to scan the QR code and if success, the web site will be logged in by the account that was logged into the in house app. As the flow suggests, user must firstly log into your in house app using any login method provided by this SDK.

Authing QR code data structure:

```json
{
    "scene": "APP_AUTH",
    "random": "5e05f0c57fde537d950f7da5",
    "userPoolId": "5e04ae0d5f3cee22fb37612b",
    "createdAt": "2019-12-27T11:53:41.260Z",
    "expireAt": "2019-12-27T11:55:41.260Z",
    "customData": { "hello": "world" }
}
```

## mark QR code scanned 

After calling this API, the web page will show user avatar on top of the QR code

> Must call one of the login method first so that we have a logged in user

```dart
static Future<Result> markQRCodeScanned(String ticket) async
```

**params**

- *ticket* random field in QR code data structure

**example**

```dart
Result result = await AuthClient.markQRCodeScanned(ticket);
```



## login by QR code 

Login the web application by the QR code that has been shown to user

> Must call [mark QR code scanned](#mark-qr-code-scanned) first before calling this API

```dart
static Future<Result> loginByScannedTicket(String ticket) async
```

**params**

- *ticket* random field in QR code data structure

**example**

```dart
Result result = await AuthClient.loginByScannedTicket(random);
```
