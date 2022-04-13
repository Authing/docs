---
meta:
  - name: description
    content: RolesManagementClient
---

# RolesManagementClient

<LastUpdated/>

> This client is used to manage {{$localeConfig.brandName}} roles. It can create, query, update and delete roles, add/delete users to/from roles, add/delete role's policy and perform other operations.

## Create a role

- RolesManagementClient().create(code)
- RolesManagementClient().create(code, description)
- RolesManagementClient().create(code, description, parent)
- RolesManagementClient().create(code, description, parent, namespace)

> Create a role

#### Parameters

- `code` \<String\> Unique id of the role.
- `description` \<String\> Description of the role.
- `parent` \<String\> Parent role code.
- `namespace` \<String\> Code of the privilege group. For more details, please refer to: [Use privilege groups to manage privileged resources](/guides/access-control/resource-group.md).

#### Example

```java
Role role = managementClient.roles().create(new CreateRoleParam("code")).execute();
```

## Delete a role

RolesManagementClient().delete(code)

> Delete a role

#### Parameter

- `code` \<String\> Unique id of the role

#### Example

```java
CommonMessage message = managementClient.roles().delete("code").execute();
```

## Bulk delete roles

- RolesManagementClient().deleteMany(codeList)
- RolesManagementClient().deleteMany(param)

> Bulk delete roles.

#### Parameter

- `codeList` \<List\<String\>\> Role code list.
- `param` \<DeleteRolesParam\> Roles delete param object.
- `param.codeList` \<List\<String\>\> Unique id of the roles list.
- `param.namespace` \<String>\> Code of the privilege group. For more details, please refer to: [Use privilege groups to manage privileged resources](/guides/access-control/resource-group.md).

#### Example

```java
ArrayList<String> list = new ArrayList<String>();
list.add("code");
CommonMessage result = managementClient.roles().deleteMany(list).execute();
```

## Update a role

- RolesManagementClient().update(code, input)
- RolesManagementClient().update(code, description)
- RolesManagementClient().update(code, description, newCode)

> Update a role

#### Parameters

- `code` \<String\> Unique id of the role
- `input` \<UpdateRoleParam\>
- `input.description` \<String\> Description
- `input.newCode` \<String\> New unique id
- `description` \<String\> Description
- `newCode` \<String\> New unique id

#### Example

```java
Role role = rolesManagementClient.roles().update(new UpdateRoleParam("code").withDescription("desc")).execute();
```

## Get role details

RolesManagementClient().findByCode(param)

> Get role details

#### Parameter

- `param` \<RoleParam\> Role detail param object.
- `param.code` \<String\> Unique id of the role.
- `param.namespace` \<String\> Code of the privilege group. For more details, please refer to: [Use privilege groups to manage privileged resources](/guides/access-control/resource-group.md).

#### Example

```java
Role role = managementClient.roles().findByCode(new RoleParam(randomRole.getCode())).execute());
```

## Get roles list

- RolesManagementClient().list()
- RolesManagementClient().list(page)
- RolesManagementClient().list(page, limit, sortBy)
- RolesManagementClient().list(page, limit, sortBy, namespace)

> Get roles list

#### Parameters

- `page` \<Integer\> Page number. Default value: `1`.
- `limit` \<Integer\> Roles per page, default value: `10`.
- `sortBy` \<SortByEnum\> Sorting rules.
- `namespace` \<String\> Code of the privilege group. For more details, please refer to: [Use privilege groups to manage privileged resources](/guides/access-control/resource-group.md).

#### Example

```java
PaginatedRoles roles = managementClient.roles().list().execute();
```

## Get role's users list

- RolesManagementClient().listUsers(code)
- RolesManagementClient().listUsers(code, param)

> Get role's users list

#### Parameter

- `code` \<String\> Unique id of the role.
- `param` \<RoleWithUsersParam\> Role's user list query param.
- `param.code` \<String\> Unique id of the role.
- `param.namespace` \<String\> Code of the privilege group. For more details, please refer to: [Use privilege groups to manage privileged resources](/guides/access-control/resource-group.md).
- `param.page` \<Integer\> Page number. Default value: `1`.
- `param.limit` \<Integer\> Roles per page, default value: `10`.

#### Example

```java
PaginatedUsers users = managementClient.roles().listUsers("code").execute();
```

## Add users

- RolesManagementClient().addUsers(code, userIds)
- RolesManagementClient().addUsers(param)

> Add users

#### Parameters

- `code` \<String\> Unique id of the role.
- `userIds` \<List\<String>\> Unique id list of the users.
- `param` \<AssignRoleParam\> Assign role param.
- `param.namespace` \<String\> Code of the privilege group. For more details, please refer to: [Use privilege groups to manage privileged resources](/guides/access-control/resource-group.md).
- `param.roleCode` \<String\> Unique id of the role.
- `param.roleCodes` \<List\<String\>\> Unique id list of the role.
- `param.userIds` \<List\<String\>\> Unique id list of the user.
- `param.groupCodes` \<List\<String\>\> Unique id list of the group.
- `param.nodeCodes` \<List\<String\>\> Unique id list of the group node.

#### Example

```java
ArrayList<String> userIds = new ArrayList<>();
userIds.add("userId");
CommonMessage message = managementClient.roles().addUsers("code", userIds).execute();
```

## Remove a user

- RolesManagementClient().removeUsers(code, userIds)
- RolesManagementClient().removeUsers(param)

> Remove a user

#### Parameters

- `code` \<String\> Unique id of the role.
- `userIds` \<List\<String>\> Unique id list of the users.
- `param` \<RevokeRoleParam\> Revoke role param.
- `param.namespace` \<String\> Code of the privilege group. For more details, please refer to: [Use privilege groups to manage privileged resources](/guides/access-control/resource-group.md).
- `param.roleCode` \<String\> Unique id of the role.
- `param.roleCodes` \<List\<String\>\> Unique id list of the role.
- `param.userIds` \<List\<String\>\> Unique id list of the user.
- `param.groupCodes` \<List\<String\>\> Unique id list of the group.
- `param.nodeCodes` \<List\<String\>\> Unique id list of the group node.

#### Example

```java
ArrayList<String> userIds = new ArrayList<>();
userIds.add("userId");
CommonMessage message = managementClient.roles().removeUsers("code", userIds).execute();
```

## Get the role policy list

- RolesManagementClient().listPolicies(code)
- RolesManagementClient().listPolicies(code, page, limit)
- RolesManagementClient().listPolicies(code, page, limit, namespace)

> Get the role policy list

#### Parameters

- `code` \<String\> Unique id of the role.
- `page` \<Integer\> Page number. Default value: `1`.
- `limit` \<Integer\> Roles per page, default value: `10`.
- `namespage` \<String\> Code of the privilege group. For more details, please refer to: [Use privilege groups to manage privileged resources](/guides/access-control/resource-group.md).

#### Example

```java
PaginatedPolicyAssignments result = managementClient.roles().listPolicies("code").execute();
```

## Add policies

RolesManagementClient().addPolicies(code, policies)

> Add policies for roles.

#### Parameters

- `code` \<String\> Unique id of the role.
- `policies` \<List\<String\>\> Unique id list of the policies.

#### Example

```java
ArrayList<String> policies = new ArrayList<>();
policies.add("policy id");
CommonMessage message = managementClient.roles().addPolicies("code", policies).execute();
```

## Remove policies

RolesManagementClient().removePolicies(code, policies)

> Remove policies for roles

#### Parameters

- `code` \<String\> Unique id of the role.
- `policies` \<List\<String\>\> Unique id list of the policies.

#### Example

```java
ArrayList<String> policies = new ArrayList<>();
policies.add("policy id");
CommonMessage message = managementClient.roles().removePolicies("code", policies).execute();
```

## Get UdfValue

RolesManagementClient().getUdfValue(code)

> Get UdfValue

#### Parameters

- `code` \<String\> Unique id of the role.

#### Example

```java

Map<String, Object> data = managementClient.roles().getUdfValue("code").execute();
```

## Get UdfValue Batch

RolesManagementClient().getUdfValueBatch(codeList)

> Get UdfValue Batch

#### Parameters

- `codeList` \<String\> Unique id list of the role.

#### Example

```java

Map<String, Map<String, Object>> data = managementClient.roles().getUdfValueBatch(Arrays.asList("code1","code2")).execute();

```

## Set UdfValue

- RolesManagementClient().setUdfValue(code, data)
- RolesManagementClient().setUdfValue(code, key, value)

> Set UdfValue

#### Parameters

- `code` \<String\> Unique id of the role.
- `data` \<Map\<String, String\>\> User custom defined data map.
- `key` \<String\> key.
- `value` \<String\> value.

#### Example

```java
Map<String, String> data = new HashMap<>();
data.put("key1", "value1");
data.put("key2", "value2");
List<UserDefinedData> data = managementClient.roles().setUdfValue("code", data).execute();
```

## Set UdfValue Batch

RolesManagementClient().setUdfValueBatch(params)

> Set UdfValue Batch

#### Parameters

- `params` \<List\<RoleSetUdfValueBatchParams>\>
- `params.roleCode` \<String\> Unique id of the role.
- `params.data` \<Map\<String, String\>\> User custom defined data map.

#### Example

```java
Map<String, String> data = new HashMap<>();
data.put("key1", "value1");
data.put("key2", "value2");
List<RoleSetUdfValueBatchParams> params = Arrays.asList(new RoleSetUdfValueBatchParams("code", data));
List<UserDefinedData> data = managementClient.roles().setUdfValueBatch(params).execute();
```

## Remove UdfValue

RolesManagementClient().removeUdfValue(code, key)

> Remove UdfValue

#### Parameters

- `code` \<String\> Unique id of the role.
- `key` \<String\> key.

#### Example

```java

List<UserDefinedData> data = managementClient.roles().removeUdfValue("code", "key").execute();
```
