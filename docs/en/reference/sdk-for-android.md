# SDK for Android

<LastUpdated/>

::: hint-info
Developers can use [{{$localeConfig.brandName}} Java/Kotlin SDK](./sdk-for-java/README.md) to integrate {{$localeConfig.brandName}}'s service.
:::

## Integration method

1. 1. Download the jar package and import the jar package into lib.

Download jar package here:

- [https://download.authing.cn/packages/jar/commons-codec-1.15-rep.jar](https://download.authing.cn/packages/jar/commons-codec-1.15-rep.jar)
- [https://download.authing.cn/packages/jar/core.jar](https://download.authing.cn/packages/jar/core.jar)

Import the Jar package into lib, as shown in the following image:

![](https://cdn.authing.cn/blog/20201218134537.png)

2. Configure `build.gradle`

```
implementation "com.google.code.gson:gson:2.8.6"
implementation "com.squareup.okhttp3:okhttp:4.8.0"
implementation files('libs/core.jar')
implementation files('libs/commons-codec-1.15-rep.jar')
```

3. Install {{$localeConfig.brandName}} Java/Kotlin SDK

For detailed installation instructions, please see:[{{$localeConfig.brandName}} Java/Kotlin SDK](./sdk-for-java/README.md) 。

## Use cases

### Java

- Use user pool id to initialize `AuthenticationClient`。
- Call `AuthenticationClient` method.

```java
AuthenticationClient client = new AuthenticationClient("YOUR_USERPOOL_ID");

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

- Use user pool id to initialize `AuthenticationClient`。
- Call `AuthenticationClient` method.

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

## User registration and login

{{$localeConfig.brandName}} Java SDK supports multiple registration and login methods such as mobile phone number verification code, email, username, etc. Take mobile phone number verification code login as an example:

1. 1. Send SMS code

```java
String phone = "phone number";
authenticationClient.sendSmsCode(phone).execute();
```

2. 2. Use the SMS code to login

```java
String phone = "phone number";
String code = "1234";
User user = authenticationClient.loginByPhoneCode(new LoginByPhoneCodeInput(phone, code)).execute();
```

For detailed documentation, please see: [User Registration and Login API](./sdk-for-java/authentication/README.md) 。

## Manage user-defined data

For an introduction to the use of [user-defined data](/guides/user/user-defined-field/), please see: User-defined fields. You can get, add, and delete user-defined data in the {{$localeConfig.brandName}} Java/Kotlin SDK. For details, see: [Manage user-defined data](/guides/user/user-defined-field/)。


## Other

For other details, please see: [{{$localeConfig.brandName}} SDK for Java/Android](./sdk-for-java/README.md) 。
