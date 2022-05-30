使用[用户池 ID（`userPoolId`）和用户池密钥（`secret`）](/guides/faqs/get-userpool-id-and-secret.md)初始化 [C# SDK](/reference-new/web/sdk-for-csharp/) 的 `ManagementClient`:

```csharp
using Authing.ApiClient;

var managementClient = new ManagementClient("AUTHING_USERPOOL_ID", "AUTHING_USERPOOL_SECRET");
```