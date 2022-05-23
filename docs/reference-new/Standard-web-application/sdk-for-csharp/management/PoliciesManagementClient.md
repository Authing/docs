---
meta:
  - name: description
    content: 管理策略
---

# 管理策略

<LastUpdated/>

> {{$localeConfig.brandName}} 的访问控制与权限管理模型核心围绕着两个点来设计：**资源（Resource）**和**策略（Policy）**。策略定义了对某个（类）资源的某个（些）操作权限，将策略授权给用户（或角色），就能知道用户（或角色）是否具备对某个资源的某个操作具备操作权限。

## 添加策略
```csharp
managementClient.Create(string code, List<PolicyStatementInput> statements, string description = null, string nameSpace = null)
```
> 添加策略

#### 参数

- `code` \<string\> 策略唯一标志
- `statements` \<PolicyStatement[]\>
- `description` \<string\> 描述

#### 示例

```csharp
var list = await managementClient.Policies.Create(code, new PolicyStatementInput[] {
    new PolicyStatementInput("book:123", new string[] { "book:edit" })
});
```

## 删除策略

```csharp
 managementClient.Policies.Delete(string code);
```
> 删除策略，系统内置策略由 {{$localeConfig.brandName}} 官方维护，不能修改和删除。

#### 参数

- `code` \<string\> 策略唯一标志

#### 示例

```csharp
var message = await managementClient.Policies.Delete("PolicyCode");
```

## 批量删除策略
```csharp
managementClient.Policies.DeleteMany( List<string> codeList)
```

> 批量删除策略，系统内置策略由 {{$localeConfig.brandName}} 官方维护，不能修改和删除。

#### 参数

- `codeList` \<string []\> 策略唯一标志列表

#### 示例

```csharp
var message = await managementClient.Policies.DeleteMany(new List<string>(){ "code" });
```

## 修改策略
```csharp
managementClient.Policies.Update(string code, List<PolicyStatementInput> statements, string description = null, string newCode = null, string nameSpace = null)
```
> 修改策略，系统内置策略由 {{$localeConfig.brandName}} 官方维护，不能修改和删除。

#### 参数

- `code` \<string\> 策略唯一标志
- `description` \<string\> 描述
- `statements` \<PolicyStatementInput[]\>
- `newCode` \<string\> 新的唯一标志，如果传入，需要保证其在用户池内是唯一的。

#### 示例

```csharp
var policy = await managementClient.Policies.Update("code", "description", "asd");
```

## 获取策略详情
```csharp
managementClient.Policies.Detail(string code, string nameSpace = null);
```
> 获取策略详情

#### 参数

- `code` \<string\> 策略唯一标志

#### 示例

```csharp
var policy = await managementClient.Policies.Detail("code");
```

## 获取策略列表

```csharp
var list = await managementClient.Policies.List(int page = 1, int limit = 10, string nameSpace = null)
```

> 获取策略列表

#### 参数

- `page` \<int\> 默认值为 : 1。
- `limit` \<int\> 默认值为 : 1。
- `nameSpace` \<string\> 命名空间。

#### 示例

```csharp
var list = await managementClient.Policies.List(1，10);
```

## 获取策略授权记录
```csharp
 managementClient.Policies.ListAssignments(PolicyAssignmentsParam option);
```
> 获取策略授权记录

#### 参数
- `option` \<PolicyAssignmentsParam\> 策略唯一标志
- `option.Code` \<string\> 策略唯一标志
- `option.Page` \<int\> 默认值为 : 1。
- `option.Limit` \<int\> 默认值为 : 10。

#### 示例

```csharp
var option = new PolicyAssignmentsParam(){
  Code = "Code"
};
var list = await managementClient.Policies.ListAssignments(option);
```

## 将策略授权给用户、角色、分组、组织机构
```csharp
managementClient.Policies.AddAssignments(List<string> policies, PolicyAssignmentTargetType targetType, List<string> targetIdentifiers, string nameSpace = null)
```
> 将策略授权给用户、角色、分组、组织机构，可以将策略授权给用户和角色，授权给角色的策略会被该角色下的所有用户继承 。此接口可以进行批量操作。

#### 参数

- `policies` \<string[]\> 策略 code 列表
- `targetType` \<PolicyAssignmentTargetType\> 可选值为 USER (用户) 和 ROLE (角色)
- `targetIdentifiers` \<string[]\> 用户 id 列表和角色 code 列表

#### 示例

```csharp
var list = await managementClient.Policies.AddAssignments(new string[] { code }, PolicyAssignmentTargetType.USER, new string[] { userId });
```

## 撤销策略授权
```csharp
managementClient.Policies.RemoveAssignments(List<string> policies, PolicyAssignmentTargetType targetType, List<string> targetIdentifiers, string nameSpace = null)
```
> 撤销策略授权，此接口可以进行批量操作。

#### 参数

- `policies` \<string[]\> 策略 code 列表
- `targetType` \<PolicyAssignmentTargetType\> 可选值为 USER (用户) 和 ROLE (角色)
- `targetIdentifiers` \<string[]\> 用户 id 列表和角色 code 列表

#### 示例

```csharp
var list = await managementClient.Policies.RemoveAssignments(new string[] { code }, PolicyAssignmentTargetType.USER, new string[] { userId });
```


## 设置策略授权状态为关闭
```csharp
managementClient.Policies.DisableAssignment(string policy, PolicyAssignmentTargetType targetType, string targetIdentifier, string nameSpace = null)
```

#### 参数

- `policy` \<string\> 策略 code 
- `targetType` \<PolicyAssignmentTargetType\> 可选值为 USER (用户) 和 ROLE (角色)
- `targetIdentifiers` \<string[]\> 用户 id 列表和角色 code 列表

#### 示例

```csharp
var list = await managementClient.Policies.DisableAssignment("1", Types.PolicyAssignmentTargetType.USER, "qidong5566", "613189b38b6c66cac1d211bd");
```

## 设置策略授权状态为开启
```csharp
managementClient.Policies.EnableAssignment(string policy, PolicyAssignmentTargetType targetType, string targetIdentifier, string nameSpace = null)
```

#### 参数

- `policy` \<string\> 策略 code 
- `targetType` \<PolicyAssignmentTargetType\> 可选值为 USER (用户) 和 ROLE (角色)
- `targetIdentifiers` \<string[]\> 用户 id 列表和角色 code 列表

#### 示例

```csharp
var list = await managementClient.Policies.EnableAssignment("1", Types.PolicyAssignmentTargetType.USER, "qidong5566", "613189b38b6c66cac1d211bd");
```