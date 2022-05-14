# Integrate Authing with mobile client (iOS and Andriod)

<LastUpdated/>

Authing provides [Android SDK](/reference/sdk-for-android.md) and [iOS SDK](/reference/sdk-for-swift.md) to help developers quickly integrate Authing in mobile apps.

Let's take the integration method of Android applications as an example.

## Install

1. 1. Download jar package and import it into lib

Jar package download address:

- [https://download.authing.cn/packages/jar/commons-codec-1.15-rep.jar](https://download.authing.cn/packages/jar/commons-codec-1.15-rep.jar)
- [https://download.authing.cn/packages/jar/core.jar](https://download.authing.cn/packages/jar/core.jar)

Import jar package into lib, as the image shows below:

![](https://cdn.authing.cn/blog/20201218134537.png)

2. Configure `build.gradle`

```
implementation "com.google.code.gson:gson:2.8.6"
implementation "com.squareup.okhttp3:okhttp:4.8.0"
implementation files('libs/core.jar')
implementation files('libs/commons-codec-1.15-rep.jar')
```

3. Install authing Java/Kotlin SDK

Detailed installation guide: [Authing Java/Kotlin SDK](/reference/sdk-for-java/README.md)

## Sample of use

### Java

- Initialize the `AuthenticationClient` with the user pool ID.
- Call the `AuthenticationClient` method.

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

- Initialize the `AuthenticationClient` with the user pool ID.
- Call the `AuthenticationClient` method.

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

Authing Java SDK supports multiple registration and login methods such as mobile SMS verification code, email, username, etc. Take mobile phone number verification code login as an example:

1. Send SMS verification code:

```java
String phone = "phone number";
authenticationClient.sendSmsCode(phone).execute();
```

2. Use SMS verification code to login:

```java
String phone = "phone number";
String code = "1234";
User user = authenticationClient.loginByPhoneCode(new LoginByPhoneCodeInput(phone, code)).execute();
```

For detailed document please see: [User registration and login API](/reference/sdk-for-java/authentication/README.md).

## More help

Join us on forum: [#authing-chat](https://forum.authing.cn/)
