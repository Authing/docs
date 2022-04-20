---
meta:
  - name: description
    content: PoliciesManagementClient
---

# PoliciesManagementClient

<LastUpdated/>

> The core of {{$localeConfig.brandName}}'s access and authorization management model is **Resource** and **Policy**. A policy defines an operation privilege for a certain resource. By assigning the policy to a user (or role), you can know whether the user (or role) has operational privilege of a resource.

## Create a policy

PoliciesManagementClient().create(code，statement)

> Create a policy

#### Parameters

- `code` \<string\> Unique id of the policy
- `statements` \<PolicyStatement[]\>
- `description` \<string\> description

#### Example

```php
$code = "code";
$statements = [new PolicyStatementInput("book:123", ["book:edit"])];
$policy = $managementClient->policies()->create($code, $statements);
```

## Delete a policy

PoliciesManagementClient().delete(code)

> Delete a policy. System built-in policies are maintained by {{$localeConfig.brandName}} official. They can not be updated or deleted.

#### Parameter

- `code` \<string\> Unique id of the policy

#### Example

```php
$message = $managementClient->policies()->delete("PolicyCode");
```

## Bulk delete policies

PoliciesManagementClient().deleteMany(codeList)

> Bulk delete policies. System built-in policies are maintained by {{$localeConfig.brandName}} official. They can not be updated or deleted.

#### Parameter

- `codeList` \<string\> Unique id of the policy list

#### Example

```php
$message = $managementClient->policies()->deleteMany(["PolicyCode"]);
```

## Update a policy 

PoliciesManagementClient().update(code, updates)

> Update a policy. System built-in policies are maintained by {{$localeConfig.brandName}} official. They can not be updated or deleted.

#### Parameter

- `code` \<string\> Unique id of the policy
- `updates` \<Object\>
- `updates.description` \<string\> description
- `updates.statements` \<PolicyStatement[]\>
- `updates.newCode` \<string\> The new unique id. If it is passed in, it must be unique in the user pool.

#### Example

```php
$code = "code";
$newStatements = [new PolicyStatementInput("book:123", ["book:edit"])];
$policy = $managementClient->policies()->update(code, $newStatements);
```

## Get policy details

PoliciesManagementClient().detail(code)

> Get policy details

#### Parameter

- `code` \<string\> Unique id of the policy

const policy = await managementClient.policies.detail('CODE');

#### Example

```php
$policy = $managementClient->policies()->detail($policy->code);
```

## Get policy list

PoliciesManagementClient().list(options)

> Get policy list

#### Parameters

- `options` \<Object\>
- `options.page` \<number\> The default value is: `1`.
- `options.limit` \<number\> The default value is: `10`.
- `options.excludeDefault` \<boolean\> Whether to exclude system default resources. The default value is: `true`.

#### Example

```php
$policies = $managementClient->policies()->paginate();
```

## Get policy assignment record

PoliciesManagementClient().listAssignments(code, page, limit)

> List policy assignment records.

#### Parameters

- `code` \<string\> Unique id of the policy
- `page` \<number\> The default value is: `1`.
- `limit` \<number\> The default value is: `10`.

#### Example

```php
$policyAssignments = $managementClient->policies()->listAssignments("code");
```

## Add a policy assignment

PoliciesManagementClient().addAssignments(policies, targetType, targetIdentifiers)

> Add a policy assignment. You can assign the policy to users and roles, and the policy assigned to the role will be inherited by all users in this role. This interface can perform batch operations.

#### Parameters

- `policies` \<string[]\> policy code list
- `targetType` \<PolicyAssignmentTargetType\> Optional values are USER and ROLE
- `targetIdentifiers` \<string[]\> user id list and role code list

#### Example

```php
$managementClient->policies()->addAssignments(["policy code"], PolicyAssignmentTargetType::USER, ["userId"]);
```

## Remove a policy assignment

PoliciesManagementClient().removeAssignments(policies, targetType, targetIdentifiers)

> Remove a policy assignment. This interface can perform batch operations.

#### Parameters

- `policies` \<string[]\> policy code list
- `targetType` \<PolicyAssignmentTargetType\> Optional values are USER and ROLE
- `targetIdentifiers` \<string[]\> user id list and role code list

#### Example

```php
$managementClient->policies()->removeAssignments(["policy code"], PolicyAssignmentTargetType::USER, ["userId"]);
```
