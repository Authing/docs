---
meta:
  - name: description
    content: 管理角色
---

# 管理角色

<LastUpdated/>


> 此模块用于管理 {{$localeConfig.brandName}} 角色，可以进行角色的增删改查、角色添加/删除用户、角色添加/删除策略 等操作。

## 创建角色
```csharp
managementClient.Roles.Create(string code, string description = null,string parentCode = null ,string nameSpace=null)
```

> 创建角色

#### 参数

- `code` \<string\> 角色唯一标志符
- `description` \<string\> 角色描述
- `parentCode` \<string\> 父角色唯一标志符

#### 示例

```csharp
managementClient.Roles.Create("code");
```

## 删除角色
```csharp
managementClient.Roles.Delete(string code)
```
> 删除角色

#### 参数

- `code` \<string\> 角色唯一标志符

#### 示例

```csharp
managementClient.Roles.Delete("code");
```

## 批量删除角色

```csharp
managementClient.Roles.DeleteMany(IEnumerable<string> codeList)
managementClient.Roles.DeleteMany(IEnumerable<string> codeList,string nameSpace = null)
```

> 批量删除角色

#### 参数

- `codeList` \<IEnumerable\<string\> 角色唯一标志符列表

#### 示例

```csharp
var list = new List<string>(){};
managementClient.Roles.DeleteMany(list);
```

## 修改角色

```csharp
managementClient.Roles.Update(string code, string description = null,string newCode = null)
managementClient.Roles.Update(UpdateRoleOptions updateRoleOptions)
```
> 修改角色

#### 参数

- `code` \<string\> 角色唯一标志符
- `description` \<string\> 描述信息
- `newCode` \<string\> 新的唯一标志符
- `input` \<UpdateRoleParam\>
- `input.code` \<string\> 角色唯一标志符
- `input.description` \<string\> 描述信息
- `input.newCode` \<string\> 新的唯一标志符
- `input.namespace` \<string\> 权限分组的 Code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。

#### 示例

```csharp
managementClient.Roles.Update("oldCode","description","newCode);
```

## 查询角色详情
```csharp
managementClient.Roles.FindByCode(string code,string nameSpace = null)
```
> 获取角色详情

#### 参数

- `code` \<string\> 角色唯一标识
- `namespace` \<string\> 权限分组的 Code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。

#### 示例

```csharp
var result = await managementClient.Roles.FindByCode("code","nameSpace");
```

## 获取角色详情
```csharp
managementClient.Roles.Detail(string code,string nameSpace = null)
```
> 获取角色详情

#### 参数

- `code` \<string\> 角色唯一标识
- `namespace` \<string\> 权限分组的 Code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。

#### 示例

```csharp
var result = await managementClient.Roles.Detail("code","nameSpace");
```


## 获取角色列表

```csharp
managementClient.Roles.List(int page = 1,int limit = 10)
```
> 获取角色列表

#### 参数

- `page` \<int\> 页码数，默认值：1。
- `limit` \<int\> 每页个数，默认值：10。

#### 示例

```csharp
var result = await managementClient.Roles.List(int page = 1,int limit = 10);
```

## 获取用户列表

```csharp
managementClient.Roles.ListUsers(string code)
```
> 获取用户列表

#### 参数

- `code` \<string\> 角色唯一标志符

#### 示例

```csharp
var users = await managementClient.Roles.ListUsers("code");
```

## 添加用户
```csharp
managementClient.Roles.AddUsers(string code,IEnumerable<string> userIds, nameSpace = null)
```
> 添加用户

#### 参数

- `code` \<string\> 角色唯一标志符
- `userIds` \<List\<string\>\> 用户 ID 列表
- `nameSpace` \<string\> 分组ID

#### 示例

```csharp
var userIds = new List<string>(){ "userId" };
managementClient.Roles.AddUsers("code", userIds,"nameSpace");
```

## 移除用户

```csharp
 managementClient.Roles.RemoveUsers(string code,IEnumerable<string> userIds,string nameSpace = null)
```

> 移除用户

#### 参数

- `code` \<string\> 角色唯一标志符
- `userIds` \<List\<string\>\> 用户 ID 列表
- `namespace` \<string\> 权限分组的 Code

#### 示例

```csharp
var userIds = new List<string>(){ "userId" };
managementClient.Roles.RemoveUsers("code", userIds);
```

## 获取策略列表

```csharp
managementClient.Roles.ListPolicies(string code,int page = 1,int limit = 10)
```
> 获取策略列表

#### 参数

- `code` \<string\> 角色唯一标志符
- `page` \<int\> 页码数，默认值：1。
- `limit` \<int\> 每页个数，默认值：10。


#### 示例

```csharp
managementClient.Roles.ListPolicies("code", 1, 10);
```

## 批量添加策略
```csharp
managementClient.Roles.AddPolicies(string code,IEnumerable<string> policies)
```
> 批量添加策略

#### 参数

- `code` \<string\> 角色唯一标志符
- `policies` \<List\<string\>\> 策略唯一标识的集合


#### 示例

```csharp
var list = new List<string>(){ "id" };
managementClient.Roles.AddPolicies("code",list );
```


## 批量移除策略
```csharp
managementClient.Roles.RemovePolicies(string code,IEnumerable<string> policies)
```
> 批量移除策略

#### 参数

- `code` \<string\> 角色唯一标志符
- `policies` \<List\<string\>\> 策略唯一标识的集合


#### 示例

```csharp
var list = new List<string>(){ "id };
managementClient.Roles.RemovePolicies("code", list);
```

## 获取角色被授权的所有资源列表
```csharp
managementClient.Roles.ListAuthorizedResources(string code, string nameSpace, ResourceType resourceType = default)
```
> 获取一个角色被授权的所有资源。

#### 参数

- `code` \<string\> 角色 Code
- `namespace` \<string\> 权限分组的 Code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)。
- `resourceType` \<ResourceType\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
    - `DATA`：数据类型；
    - `API`：API 类型数据；
    - `MENU`：菜单类型数据；
    - `BUTTON`：按钮类型数据。

#### 示例

```csharp
var result = await managementClient.Roles.ListAuthorizedResources("code", "roleGroupCode");
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

## 获取某个角色扩展字段列表
```csharp
managementClient.Roles.GetUdfValue(string roleCode)
```
> 获取某个角色扩展字段列表

#### 参数

- `roleCode` \<string\> 角色 Code

#### 示例

```csharp
managementClient.Roles.GetUdfValue("ROLE_CODE");
```

## 获取某个角色某个扩展字段
```csharp
managementClient.Roles.GetSpecificUdfValue(string roleId, string udfKey)
```
> 获取某个角色某个扩展字段

#### 参数

- `roleCode` \<string\> 角色 Code 
- `udfKey` \<string\> 角色自定义扩展字段的 Key

#### 示例

```csharp
managementClient.Roles.GetSpecificUdfValue("ROLE_CODE");
```

## 获取多个角色扩展字段列表
```csharp
managementClient.Roles.GetUdfValueBatch(IEnumerable<string> roleIds)
```
> 获取多个角色扩展字段列表

#### 参数

- `roleCodes` \<List\<string\>\> 角色 Code 列表

#### 示例

```csharp
var codeList = new List<string>(){ "roleId" };
var udfMap = await managementClient.Roles.GetUdfValueBatch(codeList);
```

## 设置角色扩展字段列表

```csharp
managementClient.Roles.SetUdfValue(SetUdfValueParam setUdfValueParam)
```
> 设置角色扩展字段列表

#### 参数

- `SetUdfValueParam.RoleId` \<string\> 角色 ID
- `SetUdfValueParam.UdvList` \<Map\<string, string\>\> 字段映射 Map
- `UdvList.key` \<string\> 字段 Key
- `UdvList.value` \<string\> 字段 Value

#### 示例

```csharp
var list = await managementClient.Roles.SetUdfValue("RoleId");
```


## 设置多个角色扩展字段列表
```csharp
managementClient.Roles.SetUdfValueBatch(IEnumerable<SetUdfValueParam> setUdfValueBatchParam)
```
> 设置多个角色扩展字段列表

#### 参数

- `setUdfValueBatchParam` \<List\<SetUdfValueParam\>\> 
- \<SetUdfValueParam\>
  - `roleCode` \<string\> 角色 Code
  - `data` \<Map\<string, string\>\> 字段 Map

#### 示例

```csharp
var list = await managementClient.Roles.SetUdfValue("RoleId");
```



## 移除用户自定义数据
```csharp
managementClient.Roles.RemoveUdfValue(string roleId, string key)
```
> 移除用户自定义数据

#### 参数

- `code` \<string\> 角色 Code
- `key` \<string\> 字段 Key

#### 示例

```csharp
managementClient.Roles.RemoveUdfValue("code", "key")
```