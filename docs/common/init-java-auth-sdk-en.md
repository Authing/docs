Use the [UserPool ID](/guides/faqs/get-userpool-id-and-secret.md) and [AppID](/guides/faqs/get-app-id-and-secret.md) to initialize the `AuthenticationClient` of the [Java SDK](/reference/sdk-for-java/):

```java
import cn.authing.core.auth.AuthenticationClient;
// 使用 AppId 和 appHost 进行初始化
        AuthenticationClientOptions options = new AuthenticationClientOptions();
        options.setAppId(AUTHING_APP_ID);
        options.setAppHost(AUTHING_APP_HOST);
        AuthenticationClient client = new AuthenticationClient(options);
```
