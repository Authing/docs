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

<br>