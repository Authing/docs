# 在移动端（iOS、Android）中集成 {{$localeConfig.brandName}}

<LastUpdated/>

{{$localeConfig.brandName}} 提供 [Android SDK](/reference/sdk-for-android.md) 和 [iOS SDK](/reference/sdk-for-swift.md) 帮助开发者在移动 APP 中快速集成 {{$localeConfig.brandName}}。

下面以 Android 应用的集成方式为例。

## 安装

1. 下载 jar 包并将 jar 包导入 lib

Jar 包下载地址：

- [https://download.authing.cn/packages/jar/commons-codec-1.15-rep.jar](https://download.authing.cn/packages/jar/commons-codec-1.15-rep.jar)
- [https://download.authing.cn/packages/jar/core.jar](https://download.authing.cn/packages/jar/core.jar)

将 Jar 包导入 lib，如下图所示：

![](https://cdn.authing.cn/blog/20201218134537.png)

2. 配置 `build.gradle`

```
implementation "com.google.code.gson:gson:2.8.6"
implementation "com.squareup.okhttp3:okhttp:4.8.0"
implementation files('libs/core.jar')
implementation files('libs/commons-codec-1.15-rep.jar')
```

3. 安装 {{$localeConfig.brandName}} Java/Kotlin SDK

详细的安装指引请见：[{{$localeConfig.brandName}} Java/Kotlin SDK](/reference/sdk-for-java/README.md) 。

## 使用示例

### Java

- 使用用户池 ID 初始化 `AuthenticationClient`。
- 调用 `AuthenticationClient` 的方法。

```java
// 使用 AppId 和 appHost 进行初始化
AuthenticationClient authentication = new AuthenticationClient(APP_ID, APP_HOST);

client.registerByEmail(new RegisterByEmailInput("xxx@qq.com", "123456")).enqueue(new cn.authing.core.http.Callback<cn.authing.core.types.User>() {
    @Override
    public void onSuccess(cn.authing.core.types.User user) {

    }

    @Override
    public void onFailure(@Nullable GraphQLResponse.ErrorInfo errorInfo) {

    }
});
```

### Kotlin

- 使用用户池 ID 初始化 `AuthenticationClient`。
- 调用 `AuthenticationClient` 的方法。

```kotlin
val authenticationClient = AuthenticationClient("YOUR_USERPOOL_ID")

authenticationClient.registerByEmail(
    RegisterByEmailInput(
        "xxx@.qq.com",
        "123456"
    )
).enqueue(object : cn.authing.core.http.Callback<User> {
    override fun onFailure(error: ErrorInfo?) {

    }

    override fun onSuccess(result: User) {

    }
})
```

## 用户注册登录

{{$localeConfig.brandName}} Java SDK 支持手机号验证码、邮箱、用户名等多种注册登录方式，以手机号验证码登录为例：

1. 发送验证码

```java
String phone = "phone number";
authenticationClient.sendSmsCode(phone).execute();
```

2. 使用验证码登录

```java
String phone = "phone number";
String code = "1234";
User user = authenticationClient.loginByPhoneCode(new LoginByPhoneCodeInput(phone, code)).execute();
```

详细文档请见：[用户注册登录 API](/reference/sdk-for-java/authentication/README.md) 。

## 集成微信登录

你可以使用 `AuthenticationClient` 的 `loginByWechat` 方法，所需四个参数均为微信返回的参数：

| 字段名  | 是否必填 | 类型   | 说明                      |
| ------- | -------- | ------ | ------------------------- |
| code    | REQUIRED | string | 微信返回给 APP 的 code    |
| country | OPTIONAL | string | 微信返回给 APP 的 country |
| lang    | OPTIONAL | string | 微信返回给 APP 的 lang    |
| state   | OPTIONAL | string | 微信返回给 APP 的 state   |

```kotlin
val authenticationClient = AuthenticationClient("YOUR_USERPOOL_ID")

val code = "#returned code from wechat#";

authenticationClient.loginByWechat(code).enqueue(object: cn.authing.core.http.Callback<User> {
    override fun onFailure(error: ErrorInfo?) {

    }

    override fun onSuccess(result: User) {
        val user = result
    }
})
```

## 获取帮助

Join us on forum: [#authing-chat](https://forum.authing.cn/)
