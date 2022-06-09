Use the [UserPool ID](/guides/faqs/get-userpool-id-and-secret.md) and [AppID](/guides/faqs/get-app-id-and-secret.md) to initialize the `AuthenticationClient` of the [Java SDK](/en/reference/sdk-for-java/):

```java
import cn.authing.core.auth.AuthenticationClient;
// Use  AppId 和 appHost 进行初始化
AuthenticationClient authentication = new AuthenticationClient(APP_ID, APP_HOST);
```
