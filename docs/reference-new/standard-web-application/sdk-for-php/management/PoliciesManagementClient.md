---
meta:
  - name: description
    content: 管理策略
---

# 管理策略

<LastUpdated/>

> {{$localeConfig.brandName}} 的访问控制与权限管理模型核心围绕着两个点来设计：**资源（Resource）**和**策略（Policy）**。策略定义了对某个（类）资源的某个（些）操作权限，将策略授权给用户（或角色），就能知道用户（或角色）是否具备对某个资源的某个操作具备操作权限。

请使用以下方式使用该模块：
```php
use Authing\Mgmt\ManagementClient;

$manageClient = new ManagementClient('YOUR_USERPOOL_ID', 'YOUR_USERPOOL_SECRET');

$policiesManagementClient = $managementClient->policies();
$policiesManagementClient->paginate // 获取策略列表
$policiesManagementClient->create   // 添加策略
$policiesManagementClient->delete // 删除策略
```

## 添加策略

PoliciesManagementClient->create($code, $statements, $description = '')

添加策略

#### 参数

- `code` \<string\> 策略唯一标志
- `statements` \<PolicyStatement[]\> 策略语句
- `description` \<string\> 描述

#### 示例

```php
$code = "code";
$statements = [
  new PolicyStatementInput("book:123", ["book:edit"])
];
$policy = $managementClient->policies()->create($code, $statements);
```

## 删除策略

PoliciesManagementClient->delete(string $code)

删除策略，系统内置策略由 {{$localeConfig.brandName}} 官方维护，不能修改和删除。

#### 参数

- `code` \<string\> 策略唯一标志

#### 示例

```php
$message = $managementClient->policies()->delete("PolicyCode");
```

## 批量删除策略

PoliciesManagementClient->deleteMany(array $codeList)

批量删除策略，系统内置策略由 {{$localeConfig.brandName}} 官方维护，不能修改和删除。

#### 参数

- `codeList` \<string []\> 策略唯一标志列表

#### 示例

```php
$message = $managementClient->policies()->deleteMany(["PolicyCode"]);
```

## 修改策略

PoliciesManagementClient->update($code, array $updates)

修改策略，系统内置策略由 {{$localeConfig.brandName}} 官方维护，不能修改和删除。

#### 参数

- `code` \<string\> 策略唯一标志
- `updates` \<array\>
- `updates.description` \<string\> 描述
- `updates.statements` \<PolicyStatement[]\>
- `updates.newCode` \<string\> 新的唯一标志，如果传入，需要保证其在用户池内是唯一的。

#### 示例

```php
$code = "code";
$newStatements = [
  new PolicyStatementInput("book:123", ["book:edit"])
];
$policy = $managementClient->policies()->update(code, $newStatements);
```

## 获取策略详情

PoliciesManagementClient->detail($code)

获取策略详情

#### 参数

- `code` \<string\> 策略唯一标志

const policy = await managementClient.policies.detail('CODE');

#### 示例

```php
$policy = $managementClient->policies()->detail('code');
```

## 获取策略列表

PoliciesManagementClient->paginate(array $options = [ 
  'page' => 1,
  'limit' => 10,
  'excludeDefault' => true
 ])

获取策略列表

#### 参数

- `options` \<array\>
- `options.page` \<number\> 默认值为 : `1`。
- `options.limit` \<number\> 默认值为 : `10`。
- `options.excludeDefault` \<boolean\> 是否排除系统默认资源 默认值为 : `true`。

#### 示例

```php
$policies = $managementClient->policies()->paginate();
```

## 获取策略授权记录

PoliciesManagementClient->listAssignments(string $code, int $page = 1, int $limit = 10)

获取策略授权记录

#### 参数

- `code` \<string\> 策略唯一标志
- `page` \<number\> 默认值为 : `1`。
- `limit` \<number\> 默认值为 : `10`。

#### 示例

```php
$policyAssignments = $managementClient->policies()->listAssignments("code");
```

## 将策略授权给用户、角色、分组、组织机构

PoliciesManagementClient->addAssignments(array $policies, string $targetType, array $targetIdentifiers)

将策略授权给用户、角色、分组、组织机构，可以将策略授权给用户和角色，授权给角色的策略会被该角色下的所有用户继承 。此接口可以进行批量操作。

#### 参数

- `policies` \<string[]\> 策略 code 列表
- `targetType` \<PolicyAssignmentTargetType\> 可选值为 USER (用户) 和 ROLE (角色)
- `targetIdentifiers` \<string[]\> 用户 id 列表和角色 code 列表

#### 示例

```php
$managementClient->policies()->addAssignments(
  ["policy code"], 
  PolicyAssignmentTargetType::USER, 
  ["userId"]
);
```

## 撤销策略授权

PoliciesManagementClient->removeAssignments(array $policies, string $targetType, array $targetIdentifiers)

撤销策略授权，此接口可以进行批量操作。

#### 参数

- `policies` \<string[]\> 策略 code 列表
- `targetType` \<PolicyAssignmentTargetType\> 可选值为 USER (用户) 和 ROLE (角色)
- `targetIdentifiers` \<string[]\> 用户 id 列表和角色 code 列表

#### 示例

```php
$managementClient->policies()->removeAssignments(
  ["policy code"], 
  PolicyAssignmentTargetType::USER, 
  ["userId"]
);
```
