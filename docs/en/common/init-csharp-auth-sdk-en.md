Use the [AppID](/guides/faqs/get-app-id-and-secret.md) to initialize the `AuthenticationClient` of the [C# SDK](/reference/sdk-for-csharp/):

```csharp
using Authing.ApiClient;

var authenticationClient = new AuthenticationClient(opt =>
            {
                opt.AppId = "AUTHING_APP_ID";
            });
```
