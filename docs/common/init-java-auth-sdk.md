使用应用 ID(AppID) ，应用密钥(App Secret)和应用 Host(App Host)初始化 [Java SDK](/reference/sdk-for-java/) 的 `AuthenticationClient`:

[如何获取？](/guides/faqs/get-app-id-and-secret.md)

```java
import cn.authing.core.auth.AuthenticationClient;
// 使用 AppId, App Secret 和 AppHost 进行初始化
		AuthenticationClientOptions options = 
      new AuthenticationClientOptions();
    options.setAppId("AUTHING_APP_ID");
		options.setAppSecret("AUTHING_APP_SECRET");
    options.setAppHost("AUTHING_APP_HOST");
		AuthenticationClient authenticationClient = 
      new AuthenticationClient(options);
```
