# SDK for Flutter

<LastUpdated/>

## 添加依赖

在项目的 pubspec.yaml 文件里面，添加如下依赖：

```yaml
authing_sdk: ^1.0.0
```

## 初始化

在 App 启动的时候，调用：

```dart
import 'package:authing_sdk/authing.dart';

Authing.init(String userPoolId, String appId)
```

* *user_pool_id* 是 Authing 用户池 ID
* *app_id* 是 Authing 应用 ID

## 私有化部署

私有化部署的场景，在初始化之后，还需要调用:

```dart
Authing.setOnPremiseInfo(String host, String publicKey)
```

* *host* 是私有化域名，如：mycompany.com
* *publicKey* 是私有化版本的公钥

如果不清楚上述配置，请联系 Authing 售后。

## API

SDK 提供：

* 基础认证 API 如登录 / 注册等
* 用户信息 API 如获取信息、获取角色、获取组织等
* 社会化登录 API
* 多因素验证 API

详细使用文档请参考： [Authing flutter package 官方地址](https://pub.dev/packages/authing_sdk)
