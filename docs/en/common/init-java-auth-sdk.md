Use [用户池 ID（UserPool ID）](/guides/faqs/get-userpool-id-and-secret.md) 和[应用 ID（AppID）](/guides/faqs/get-app-id-and-secret.md) 初始化 [Java SDK](/en/reference/sdk-for-java/) 的 `AuthenticationClient`:

```java
import cn.authing.core.auth.AuthenticationClient;
// Use  AppId 和 appHost 进行初始化
AuthenticationClient authentication = new AuthenticationClient(APP_ID, APP_HOST);

authenticationClient.setSecret("AUTHING_APP_SECRET");
```
