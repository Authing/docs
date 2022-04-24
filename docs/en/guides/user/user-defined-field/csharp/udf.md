!!!include(common/init-csharp-auth-sdk.md)!!!

首先使用用户的 token 初始化 SDK：

```java
authenticationClient.Token = "user token";
```

设置自定义字段：

```csharp
var key = "key";
var anyValue = "value";
var list = await authenticationClient.SetUdv(key, anyValue);
Console.WriteLine(list.Count());
```

获取该用户最新的自定义数据：

```csharp
var list = await authenticationClient.ListUdv();
Console.WriteLine(list.Count());
```