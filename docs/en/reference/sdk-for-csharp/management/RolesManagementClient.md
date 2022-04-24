---
meta:
  - name: description
    content: RolesManagementClient
---

# RolesManagementClient

<LastUpdated/>


> This client is used to manage {{$localeConfig.brandName}} roles. It can create, query, update and delete roles, add/delete users to/from roles, add/delete role's policy and perform other operations.

## Create a role

RolesManagementClient().create(code, description)

> Create a role

#### Parameters

- `code` \<string\> Unique id of the role
- `description` \<string\> description

#### Example

```csharp
var code = "code";
var role = await managementClient.Roles.Create(code, "test role");
```

## Delete a role

RolesManagementClient().delete(code)

> Delete a role

#### Parameter

- `code` \<string\> Unique id of the role

#### Example

```csharp
var code = "code";
var message = await managementClient.Roles.Delete(code);
```

## Bulk delete roles

RolesManagementClient().deleteMany(codeList)

> Bulk delete roles.

#### Parameter

- `codeList` \<string[]\> A list of unique ids for roles

#### Example

```csharp
var code = "code";
var message = await managementClient.Roles.DeleteMany(new string[] { code });
```

## Update a role

RolesManagementClient().update(code, input)

> Update a role

#### Parameters

- `code` \<string\> Unique id of the role
- `input` \<Object\>
- `input.description` \<string\> description
- `input.newCode` \<string\> New unique id

#### Example

```csharp
var code = "code";
var desc = "update desc";
var role = await managementClient.Roles.Update(code, desc);
```

## Get role details

RolesManagementClient().detail(code)

> Get role details

#### Parameter

- `code` \<string\> Unique id of the role

#### Example

```csharp
var code = "code";
var role = await managementClient.Roles.Detail(code);
```

## Get roles list

RolesManagementClient().list(page, limit)

> Get roles list

#### Parameters

- `page` \<number\> Page number. The default value is: `1`.
- `limit` \<number\> Number of roles per page. The default value is: `10`.

#### Example

```csharp
var roles = await managementClient.Roles.List();
```

## Get role's users list

RolesManagementClient().listUsers(code)

> Get role's users list

#### Parameter

- `code` \<string\> Unique id of the role

#### Example

```csharp
var code = "code";
var users = await managementClient.Roles.ListUsers(code);
```

## Add users

RolesManagementClient().addUsers(code, userIds)

> Add users

#### Parameters

- `code` \<string\> Unique id of the role
- `userIds` \<string[]\> User ID list

#### Example

```csharp
var code = "code";
var users = new string[] { "userId" };
var message = await managementClient.Roles.AddUsers(code, users);
```

## Remove a user

RolesManagementClient().removeUsers(code, userIds)

> Remove a user 

#### Parameters

- `code` \<string\> Unique id of the role
- `userIds` \<string[]\> User ID list

#### Example

```csharp
var code = "code";
var users = new string[] { "userId" };
var message = await managementClient.Roles.RemoveUsers(code, users);
```

## Get the role policy list

RolesManagementClient().listPolicies(code, page, limit)

> Get the role policy list

#### Parameters

- `code` \<string\> Unique id of the role
- `page` \<number\> Page number. The default value is: `1`.
- `limit` \<number\> Number of policy records shown per page. The default value is: `10`.

#### Example

```csharp
var code = "code";
var policies = await managementClient.Roles.ListPolicies(code);
```

## Add policies

RolesManagementClient().addPolicies(code, policies)

> Add policies for roles.

#### Parameters

- `code` \<string\> Unique id of the role
- `policies` \<string[]\> policy list

#### Example

```csharp
var code = "code";
var policies = new string[] { "policyId" };
var message = await managementClient.Roles.AddPolicies(code, policies);
```

## Remove policies

RolesManagementClient().removePolicies(code, policies)

> Remove policies for roles

#### Parameters

- `code` \<string\> Unique id of the role
- `policies` \<string[]\> policy list

#### Example

```csharp
var code = "code";
var policies = new string[] { "policyId" };
var message = await managementClient.Roles.RemovePolicies(code, policies);
```
