使用[应用 ID（AppID）](/guides/faqs/get-app-id-and-secret.md) 初始化 [C# SDK](/reference-new/standard-web-application/sdk-for-csharp/) 的 `AuthenticationClient`:


```csharp
using Authing.ApiClient;

var authenticationClient = new AuthenticationClient(opt =>
            {
                opt.AppId = "AUTHING_APP_ID";
            });
```
