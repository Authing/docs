# OIDC API 

<LastUpdated/>

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

<br>

### Use email and password registration

Use the email registration, the mailbox is not case sensitive and the only userpool is unique. This interface does not require the user to verify the mailbox, after the user registration, the emailVerified field will be false.

```dart
static Future<AuthResult> registerByEmail(String email, String password) async
```

**Parameter**

- *email* email address
- *password* password

**example**

```dart
AuthResult result = await OIDCClient.registerByEmail("email", "password");
User user = result.user; // get user info
```

**Error Code**

* `2003` Illegal email address
* `2026` Registered mailbox

<br>

### Register using username

Use the username to register, the username is case sensitive and the only user pool.

```dart
static Future<AuthResult> registerByUserName(String username, String password) async
```

**Parameter**

- *username* username
- *password* password

**Example**

```dart
AuthResult result = await OIDCClient.registerByUserName("username", "password");
User user = result.user; // get user info
```


**Error Code**

* `2026` Registered mailbox

<br>

### Use mobile phone number registration

Use your mobile phone number to register, you can set the initial password of the account at the same time. You can pass [sendSmsCode](#https://docs.authing.cn/v2/en/reference/sdk-for-flutter/apis/authentication/#send-sms-code) method sends SMS verification code.

```dart
  static Future<AuthResult> registerByPhoneCode(String phone, String code, String password) async
```

**Parameter**

- *phone* The phone number
- *code* SMS verification code
- *password* initial password, it can be null

**Example**

```dart
AuthResult result = await OIDCClient.registerByPhoneCode("phone", "code", "password");
User user = result.user; // get user info
```

**Error Code**

* `2001` SMS verification code error
* `2026` Cell phone number registered

<br>

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

<br>

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

<br>

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

<br>

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

<br>

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

<br>