---
meta:
  - name: description
    content: 管理策略
---

# 管理策略

<LastUpdated/>

> {{$localeConfig.brandName}} 的访问控制与权限管理模型核心围绕着两个点来设计：**资源（Resource）**和**策略（Policy）**。策略定义了对某个（类）资源的某个（些）操作权限，将策略授权给用户（或角色），就能知道用户（或角色）是否具备对某个资源的某个操作具备操作权限。

## 添加策略

PoliciesManagementClient().create(code，策略语句)

> 添加策略

#### 参数

- `code` \<String\> 策略唯一标志
- `statements` \<PolicyStatement[]\> 
- `description` \<String\> 描述

#### 示例

```java
ArrayList<PolicyStatementInput> statements = new ArrayList<>();
ArrayList<String> actions = new ArrayList<>();
actions.add("book:edit");
statements.add(new PolicyStatementInput("book:123", actions));
Policy policy = managementClient.policies().create("code", statements).execute();
```

## 删除策略

PoliciesManagementClient().delete(code)

> 删除策略，系统内置策略由 {{$localeConfig.brandName}} 官方维护，不能修改和删除。

#### 参数

- `code` \<String\> 策略唯一标志

#### 示例

```java
managementClient.policies().delete("PolicyCode").execute();
```

## 批量删除策略

PoliciesManagementClient().deleteMany(codeList)

> 批量删除策略，系统内置策略由 {{$localeConfig.brandName}} 官方维护，不能修改和删除。

#### 参数

- `codeList` \<String\> 策略唯一标志列表

#### 示例

```java
ArrayList<String> list = new ArrayList<>();
list.add("PolicyCode");
managementClient.policies().deleteMany(list).execute();
```

## 修改策略

PoliciesManagementClient().update(code, updates)

> 修改策略，系统内置策略由 {{$localeConfig.brandName}} 官方维护，不能修改和删除。

#### 参数

- `code` \<String\> 策略唯一标志
- `updates` \<Object\>
- `updates.description` \<String\> 描述
- `updates.statements` \<PolicyStatement[]\>
- `updates.newCode` \<String\> 新的唯一标志，如果传入，需要保证其在用户池内是唯一的。

#### 示例

```java
ArrayList<PolicyStatementInput> newStatements = new ArrayList<>();
ArrayList<String> newActions = new ArrayList<>();
newActions.add("book:edit");
newStatements.add(new PolicyStatementInput("book:123", newActions));
Policy policy = managementClient.policies().update(code, newStatements, "desc").execute();
```

## 获取策略详情

PoliciesManagementClient().detail(code)

> 获取策略详情

#### 参数

- `code` \<String\> 策略唯一标志

const policy = await managementClient.policies.detail('CODE');

#### 示例

```java
Policy policy = managementClient.policies().detail("PolicyCode").execute();
```

## 获取策略列表

PoliciesManagementClient().list(options)

> 获取策略列表

#### 参数

- `options` \<Object\>
- `options.page` \<Integer\> 默认值为 : `1`。
- `options.limit` \<Integer\> 默认值为 : `10`。
- `options.excludeDefault` \<Boolean\> 是否排除系统默认资源 默认值为 : `true`。

#### 示例

```java
PaginatedPolicies roles = managementClient.policies().list().execute();
```

## 获取策略授权记录

PoliciesManagementClient().listAssignments(code, page, limit)

> 获取策略授权记录

#### 参数

- `code` \<String\> 策略唯一标志
- `page` \<int\> 默认值为 : `1`。
- `limit` \<int\> 默认值为 : `10`。

#### 示例

```java
PaginatedPolicyAssignments policyAssignments = managementClient.policies().listAssignments("code").execute();
```

## 将策略授权给用户、角色、分组、组织机构

PoliciesManagementClient().addAssignments(policies, targetType, targetIdentifiers)

> 将策略授权给用户、角色、分组、组织机构，可以将策略授权给用户和角色，授权给角色的策略会被该角色下的所有用户继承 。此接口可以进行批量操作。

#### 参数

- `policies` List\<String\> 策略 code 列表
- `targetType` \<PolicyAssignmentTargetType\> 可选值为 USER (用户) 和 ROLE (角色)
- `targetIdentifiers` List\<String\> 用户 id 列表和角色 code 列表

#### 示例

```java
ArrayList<String> policies = new ArrayList<>();
policies.add("policy code");

ArrayList<String> targetIdentifiers = new ArrayList<>();
targetIdentifiers.add("userId");

managementClient.policies().addAssignments(policies, PolicyAssignmentTargetType.USER, targetIdentifiers).execute();
```

## 撤销策略授权

PoliciesManagementClient().removeAssignments(policies, targetType, targetIdentifiers)

> 撤销策略授权，此接口可以进行批量操作。

#### 参数

- `policies` List\<String\> 策略 code 列表
- `targetType` \<PolicyAssignmentTargetType\> 可选值为 USER (用户) 和 ROLE (角色)
- `targetIdentifiers` List\<String\> 用户 id 列表和角色 code 列表

#### 示例

```java
ArrayList<String> policies = new ArrayList<>();
policies.add("policy code");

ArrayList<String> targetIdentifiers = new ArrayList<>();
targetIdentifiers.add("userId");

managementClient.policies().removeAssignments(policies, PolicyAssignmentTargetType.USER, targetIdentifiers).execute();
```
