# WebView

<LastUpdated/>

使用 Web 方式登录之前，确保完成了 [开发准备](./../develop.md)

> 此功能要求 Guard 最低版本 1.2.8

## 修改启动代码

参考 [快速开始](./../quick.md)

将

```java
AuthFlow.start(this);
```

替换为

```java
AuthFlow.startWeb(this);
```

即可

## 设置回调

和快速开始的方式完全一致

## 设置 Scope

如果需要自定义 Scope，请调用：

```java
AuthFlow flow = AuthFlow.startWeb(this);
// scopes are divided by white space
flow.setScope("openid profile email phone");
```

> Scope 参数定义请参考 [这里](https://docs.authing.cn/v2/concepts/oidc-common-questions.html#scope-%E5%8F%82%E6%95%B0%E5%AF%B9%E5%BA%94%E7%9A%84%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF)

## 跳过确权页面

当我们的 App 作为第一方应用提供给用户时，我们可以跳过确认授权页：

```java
AuthFlow flow = AuthFlow.startWeb(this);
// By default, a consent page will be shown to user
// The following line will hide it
flow.setSkipConsent(true);
```
