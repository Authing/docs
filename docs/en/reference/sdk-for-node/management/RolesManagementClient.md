# RolesManagementClient

<LastUpdated/>

> This client is used to manage Authing roles. It can create, query, update and delete roles, add/delete users to/from roles, add/delete role's policy and perform other operations.

Please follow the instructions below to use this client. Do not initialize this client directly:

```javascript
import { ManagementClient } from "authing-js-sdk";
const managementClient = new ManagementClient({
  userPoolId: "YOUR_USERPOOL_ID",
  secret: "YOUR_USERPOOL_SECRET"
});
managementClient.roles.list; // get role list
managementClient.roles.create; // create role
managementClient.roles.listUsers; // get user list of the role
```

## Create a role

RolesManagementClient().create(code, description)

> Create a role

#### Parameter

- `code` \<string\> Unique id of the role
- `description` \<string\> description

#### Example

```javascript
managementClient.roles.create("rolea", "RoleA");
```

#### Return value

- `Promise<DeepPartial<Role>>`

## Delete a role

RolesManagementClient().delete(code)

> Delete a role

#### Parameter

- `code` \<string\> Unique id of the role

#### Example

```javascript
managementClient.roles.delete("rolea");
```

#### Return value

- `Promise<CommonMessage>`

## Bulk delete roles

RolesManagementClient().deleteMany(codeList)

> Bulk delete roles

#### Parameter

- `codeList` \<string[]\> A list of unique ids for roles

#### Example

```javascript
managementClient.roles.delete(["rolea"]);
```

#### Return value

- `Promise<CommonMessage>`

## Update a role

RolesManagementClient().update(code, input)

> Update a role

#### Parameter

- `code` \<string\> Unique id of the role
- `input` \<Object\>
- `input.description` \<string\> description
- `input.newCode` \<string\> New unique id

#### Example

```javascript
managementClient.roles.update("rolea", { newCode: "newcode" });
```

#### Return value

- `Promise<DeepPartial<Role>>`

## Get role details

RolesManagementClient().detail(code)

> Get role details

#### Parameter

- `code` \<string\> Unique id of the role

#### Example

```javascript
managementClient.roles.detail("manager");
```

#### Return value

- `Promise<DeepPartial<Role>>` role details

## Get roles list

RolesManagementClient().list(page, limit)

> Get roles list

#### Parameter

- `page` \<number\> Page number. The default value is: `1`.
- `limit` \<number\> Number of roles per page. The default value is: `10`.

#### Example

```javascript
managementClient.roles.list(2, 10);
```

#### Return value

- `Promise<DeepPartial<PaginatedRoles>>`

## Get role's users list

RolesManagementClient().listUsers(code)

> Get role's users list

#### Parameter

- `code` \<string\> Unique id of the role

#### Example

```javascript
managementClient.roles.listUsers(code);
```

#### Return value

- `Promise<DeepPartial<PaginatedUsers>>`

## Add users

RolesManagementClient().addUsers(code, userIds)

> Add users to a role

#### Parameter

- `code` \<string\> Unique id of the role
- `userIds` \<string[]\> User ID list

#### Example

```javascript
managementClient.roles.addUsers(code, ["USERID1", "USERID2"]);
```

#### Return value

- `Promise<CommonMessage>`

## Remove a user

RolesManagementClient().removeUsers(code, userIds)

> Remove a user from a role

#### Parameter

- `code` \<string\> Unique id of the role
- `userIds` \<string[]\> User ID list

#### Example

```javascript
managementClient.roles.removeUsers(code, ["USERID1", "USERID2"]);
```

#### Return value

- `Promise<CommonMessage>`

## Get the role policy list

RolesManagementClient().listPolicies(code, page, limit)

> Get the role policy list

#### Parameter

- `code` \<string\> Unique id of the role
- `page` \<number\> Page number. The default value is: `1`.
- `limit` \<number\> Number of policy records shown per page. The default value is: `10`.

#### Example

```javascript
managementClient.roles.listPolicies("codea", 1, 10);
```

#### Return value

- `Promise<PaginatedPolicyAssignments>`

## Add policies

RolesManagementClient().addPolicies(code, policies)

> Add policies to roles.

#### Parameter

- `code` \<string\> Unique id of the role
- `policies` \<string[]\> policy list

#### Example

```javascript
managementClient.roles.addPolicies("rolea", ["PolicyA", "PolicyB"]);
```

#### Return value

- `Promise<CommonMessage>`

## Remove policies

RolesManagementClient().removePolicies(code, policies)

> Remove policies from a role

#### Parameter

- `code` \<string\> Unique id of the role
- `policies` \<string[]\> policy list

#### Example

```javascript
managementClient.roles.removePolicies("rolea", ["PolicyA", "PolicyB"]);
```

#### Return value

- `Promise<CommonMessage>`
