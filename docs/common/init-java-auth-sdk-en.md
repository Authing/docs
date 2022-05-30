Use the [UserPool ID](/guides/faqs/get-userpool-id-and-secret.md) and [AppID](/guides/faqs/get-app-id-and-secret.md) to initialize the `AuthenticationClient` of the [Java SDK](/reference-new/web/sdk-for-java/):

```java
import cn.approw.core.auth.AuthenticationClient;
// 使用 AppId 和 appHost 进行初始化
AuthenticationClient authentication = new AuthenticationClient(APP_ID, APP_HOST);
```
