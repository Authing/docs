# Social API 

<LastUpdated/>

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

<br>