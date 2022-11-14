# 快速开始

<LastUpdated/>

## 第一步：新建 Flutter 工程

![](./images/create_project1.png)

![](./images/create_project2.png)

![](./images/create_project3.png)


## 第二步：添加 SDK 依赖

在工程的 pubspec.yaml 中，添加以下依赖：

```yaml
authing_sdk: ^1.0.0
```

## 第三步：初始化 SDK

App 启动时，初始化 Authing Flutter SDK。

```dart
import 'package:authing_sdk/authing.dart';

Authing.init(String userPoolId, String appId)
```

**userPoolId** 为 Authing 控制台[用户池 ID](https://docs.authing.cn/v2/guides/faqs/get-userpool-id-and-secret.html)。

**appId** 为 Authing 控制台[应用 ID](https://docs.authing.cn/v2/guides/faqs/get-app-id-and-secret.html)。