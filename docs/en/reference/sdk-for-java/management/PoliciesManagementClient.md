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
- `description` \<string\> Description

#### Example

```java
ArrayList<PolicyStatementInput> statements = new ArrayList<>();
ArrayList<String> actions = new ArrayList<>();
actions.add("book:edit");
statements.add(new PolicyStatementInput("book:123", actions));
Policy policy = managementClient.policies().create("code", statements).execute();
```

## Delete a policy

PoliciesManagementClient().delete(code)

> Delete a policy. System built-in policies are maintained by {{$localeConfig.brandName}} official. They can not be updated or deleted.

#### Parameter

- `code` \<string\> Unique id of the policy

#### Example

```java
CommonMessage message = managementClient.policies().delete("PolicyCode").execute();
```

## Bulk delete policies

PoliciesManagementClient().deleteMany(codeList)

> Bulk delete policies. System built-in policies are maintained by {{$localeConfig.brandName}} official. They can not be updated or deleted.

#### Parameter

- `codeList` \<string\> Unique id of the policy list

#### Example

```java
ArrayList<String> list = new ArrayList<>();
list.add("PolicyCode");
CommonMessage result = managementClient.policies().deleteMany(list).execute();
```

## Update a policy 

PoliciesManagementClient().update(code, updates)

> Update a policy. System built-in policies are maintained by {{$localeConfig.brandName}} official. They can not be updated or deleted.

#### Parameter

- `code` \<string\> Unique id of the policy
- `updates` \<Object\>
- `updates.description` \<string\> Description
- `updates.statements` \<PolicyStatement[]\>
- `updates.newCode` \<string\> The new unique id. If it is passed in, it must be unique in the user pool.

#### Example

```java
ArrayList<PolicyStatementInput> newStatements = new ArrayList<>();
ArrayList<String> newActions = new ArrayList<>();
newActions.add("book:edit");
newStatements.add(new PolicyStatementInput("book:123", newActions));
Policy policy = managementClient.policies().update(code, newStatements, "desc").execute();
```

## Get policy details

PoliciesManagementClient().detail(code)

> Get policy details

#### Parameter

- `code` \<string\> Unique id of the policy

const policy = await managementClient.policies.detail('CODE');

#### Example

```java
Policy policy = managementClient.policies().detail("PolicyCode").execute();
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

```java
PaginatedPolicies roles = managementClient.policies().list().execute();
```

## Get policy assignment record

PoliciesManagementClient().listAssignments(code, page, limit)

> List policy assignment records.

#### Parameters

- `code` \<string\> Unique id of the policy
- `page` \<number\> The default value is: `1`.
- `limit` \<number\> The default value is: `10`.

#### Example

```java
PaginatedPolicyAssignments policyAssignments = managementClient.policies().listAssignments("code").execute();
```

## Add a policy assignment

PoliciesManagementClient().addAssignments(policies, targetType, targetIdentifiers)

> Add a policy assignment. You can assign the policy to users and roles, and the policy assigned to the role will be inherited by all users in this role. This interface can perform batch operations.

#### Parameters

- `policies` \<string[]\> Policy code list
- `targetType` \<PolicyAssignmentTargetType\> Optional values are USER and ROLE
- `targetIdentifiers` \<string[]\> User id list and role code list

#### Example

```java
ArrayList<String> policies = new ArrayList<>();
policies.add("policy code");

ArrayList<String> targetIdentifiers = new ArrayList<>();
targetIdentifiers.add("userId");

managementClient.policies().addAssignments(policies, PolicyAssignmentTargetType.USER, targetIdentifiers).execute();
```

## Remove a policy assignment

PoliciesManagementClient().removeAssignments(policies, targetType, targetIdentifiers)

> Remove a policy assignment. This interface can perform batch operations.

#### Parameters

- `policies` \<string[]\> Policy code list
- `targetType` \<PolicyAssignmentTargetType\> Optional values are USER and ROLE
- `targetIdentifiers` \<string[]\> User id list and role code list

#### Example

```java
ArrayList<String> policies = new ArrayList<>();
policies.add("policy code");

ArrayList<String> targetIdentifiers = new ArrayList<>();
targetIdentifiers.add("userId");

managementClient.policies().removeAssignments(policies, PolicyAssignmentTargetType.USER, targetIdentifiers).execute();
```
