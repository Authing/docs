# SDK for Flutter

<LastUpdated/>

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

<br>

## API

Our SDK provides the following feature:

* Basic authentication API e.g. Register / Login
* User profile related API
* Social connection API
* MFA (Multi-Factor Authentication) API

For detailed API usage, visit: [Authing flutter package](https://pub.dev/packages/authing_sdk)
