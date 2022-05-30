---
meta:
  - name: description
    content: 管理注册白名单
---

# 管理注册白名单

<LastUpdated/>


> 为你的用户池配置一个注册白名单，类似于邀请注册规则，开启后，只有白名单里的用户才能进行注册。 {{$localeConfig.brandName}} 目前支持的白名单方式有手机号、邮箱、用户名。

## 获取白名单记录

```csharp
 managementClient.Whitelist.List(WhitelistType type)
```
> 获取白名单记录

#### 参数

- `type` \<WhitelistType\> 白名单类型，USERNAME 为用户名、Email 为邮箱、Phone 为手机号。

#### 示例

```csharp
var list = await managementClient.Whitelist.List(WhitelistType.USERNAME);
```

## 添加白名单

```csharp
managementClient.Whitelist.Add(WhitelistType type, IEnumerable<string> list)
```
> 添加白名单

#### 参数

- `type` \<WhitelistType\> 白名单类型，USERNAME 为用户名、Email 为邮箱、Phone 为手机号。
- `list` \<string[]\> 白名单列表，请注意邮箱不区分大小写。

#### 示例

```csharp
var option = new List<string>(){ "test@test.com" }
var list = await managementClient.Whitelist.Add(WhitelistType.EMAIL,option );
```

## 移除白名单
```csharp
managementClient.Whitelist.Remove(WhitelistType type, IEnumerable<string> list)
```
> 移除白名单

#### 参数

- `type` \<WhitelistType\> 白名单类型，USERNAME 为用户名、Email 为邮箱、Phone 为手机号。
- `list` \<string[]\> 白名单列表，请注意邮箱不区分大小写。

#### 示例

```csharp
var option =  new string[] { "test@test.com" }
var list = await managementClient.Whitelist.Remove(WhitelistType.EMAIL,option);
```

## 开启白名单
```csharp
 managementClient.Whitelist.Enable(WhitelistType type)
```
> 开启白名单

#### 参数

- `type` \<WhitelistType\> 白名单类型，USERNAME 为用户名、Email 为邮箱、Phone 为手机号。

#### 示例

```csharp
var result =  await managementClient.Whitelist.Enable(WhitelistType.EMAIL);
```

## 关闭白名单
```csharp
managementClient.Whitelist.Disable(WhitelistType type)
```

> 关闭白名单

#### 参数

- `type` \<WhitelistType\> 白名单类型，USERNAME 为用户名、Email 为邮箱、Phone 为手机号。

#### 示例

```csharp
var result = await managementClient.Whitelist.Disable(WhitelistType.EMAIL);
```

## 白名单管理模块构造器
```csharp
managementClient.Whitelist.WhitelistManagementClient(ManagementClient client)
```

> 白名单管理模块构造器

#### 参数

- `type` \<ManagementClient\> 

#### 示例

```csharp
var result = await managementClient.Whitelist.WhitelistManagementClient();
```
