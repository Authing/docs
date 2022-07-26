---
meta:
  - name: description
    content: 管理分组
---

# 管理分组

<LastUpdated/>


> 此模块用于管理 {{$localeConfig.brandName}} 分组，可以进行分组的增删改查、分组添加/删除用户、分组添加/删除策略 等操作。

## 创建分组
```csharp
managementClient.Groups.Create(string code, string name, string description = null)
```
> 创建分组

#### 参数

- `code` \<string\> 分组唯一标志符
- `name` \<string\> 分组名称
- `description` \<string\> 描述

#### 示例

```csharp
var list = await managementClient.Groups.Create("code", "name");
```

## 删除分组
```csharp
managementClient.Groups.Delete(string code)
```
> 删除分组

#### 参数

- `code` \<string\> 分组唯一标志符

#### 示例

```csharp
var message = await managementClient.Groups.Delete("code");
```

## 修改分组
```csharp
managementClient.Groups.Update(string code, string name = null, string description = null, string newCode = null)
```
> 修改分组

#### 参数

- `code` \<string\> 分组唯一标志符
- `name` \<string\> 新的名称
- `description` \<string\> 新的描述信息
- `newCode` \<string\> 新的唯一标志符

#### 示例

```csharp
var group = await client.Groups.Update("code", "description", "asd");
```

## 获取分组详情
```csharp
managementClient.Groups.Detail(string code)
```
> 获取分组详情

#### 参数

- `code` \<string\> 分组唯一标志符

#### 示例

```csharp
var policy = await managementClient.Groups.Detail("code");
```

## 获取分组列表
```csharp
managementClient.Groups.List(int page, int limit)
```
> 获取分组列表

#### 参数

- `page` \<int\> 页码数 默认值为 : 1。
- `limit` \<int\> 每页个数 默认值为 : 10。

#### 示例

```csharp
var list = await managementClient.Groups.List(1, 10);
```

## 批量删除分组
```csharp
managementClient.Groups.DeleteMany(IEnumerable<string>  codeList)
```
> 批量删除分组

#### 参数

- `codeList` \<IEnumerable\<string\>\> 分组唯一标志符列表

#### 示例

```csharp
var message = await managementClient.Groups.DeleteMany(new List<string>(){ "code" });
```

## 获取分组用户列表
```csharp
managementClient.Groups.listUsers(string code, int page, int limit)
```
> 获取分组用户列表

#### 参数

- `code` \<string\> 分组唯一标志符
- `page` \<int\> 页码数 默认值为 : 1。
- `limit` \<int\> 每页个数 默认值为 : 10。

#### 示例

```csharp
var users = managementClient.Groups.ListUsers( "code");
```

## 添加用户
```csharp
managementClient.Groups.addUsers(string code, IEnumerable<string> userIds,)
```
> 添加用户

#### 参数

- `code` \<string\> 分组唯一标志符
- `userIds` \<IEnumerable\<string\>\> 用户 ID 列表

#### 示例

```csharp
await managementClient.Groups.AddUsers("code", new List<string>(){ "userId1", "userId2" });
```

## 移除用户
```csharp
managementClient.Groups.RemoveUsers(string code, IEnumerable<string> userIds);
```
> 移除用户

#### 参数

- `code` \<string\> 分组唯一标志符
- `userIds` \<IEnumerable\<string\>\> 用户 ID 列表

#### 示例

```csharp
await managementClient.Groups.RemoveUsers("code", new List<string>(){ "userId1", "userId2" });
```

## 获取分组被授权的所有资源列表
```csharp
managementClient.Groups.ListAuthorizedResources(ListGroupAuthorizedResourcesParam param)
```
> 获取一个分组被授权的所有资源。

#### 参数

- `param` \<ListGroupAuthorizedResourcesParam\>
- `param.code` \<string\> 分组 Code
- `param._namespace` \<string\> 权限分组的 Code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。
- `param.ResourceType` \<string\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
    - `DATA`：数据类型；
    - `API`：API 类型数据；
    - `MENU`：菜单类型数据；
    - `BUTTON`：按钮类型数据。

#### 示例

```csharp
var result = await managementClient.Acl.ListAuthorizedResources
(
  PolicyAssignmentTargetType.USER, TestUserId,
  "test",
  new ListAuthorizedResourcesOptions() { ResourceType = ResourceType.DATA }
);
```

#### 示例数据

- `type` 资源类型
- `code` 资源描述符，如果是 `DATA` 类型资源，格式为 `resourceType:resourceId`，如 `books:*` 表示所有书籍，`books:1` 表示 ID 为 1 的书籍。
- `actions` 用户被授权对该资源的操作

```json
{
  "totalCount": 12,
  "list": [
    {
      "code": "menu_a",
      "type": "MENU"
    },
    {
      "code": "menu_b",
      "type": "MENU"
    },
    {
      "code": "books:1",
      "type": "DATA",
      "actions": ["books:delete", "books:update"]
    }
  ]
}
```
