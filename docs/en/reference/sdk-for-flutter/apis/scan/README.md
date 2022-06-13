# Scan API 

<LastUpdated/>

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

<br>