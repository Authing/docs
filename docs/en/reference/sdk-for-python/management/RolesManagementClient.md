---
meta:
  - name: description
    content: RolesManagementClient
---

# RolesManagementClient

<LastUpdated/>


> This client is used to manage Approw roles. It can create, query, update and delete roles, add/delete users to/from roles, add/delete role's policy and perform other operations.

## Create a role

RolesManagementClient().create(code, description)

> Create a role.

#### Parameter

- `code` \<string\> Unique id of the role
- `description` \<string\> description

#### Example

```python
code = 'code'
role = management_client.roles.create(code=code)
```

## Delete a role

RolesManagementClient().delete(code)

> Delete a role.

#### Parameter

- `code` \<string\> Unique id of the role

#### Example

```python
data = management_client.roles.delete(code='code')
code = data['code'] # 200 means success
```

## Bulk delete roles

RolesManagementClient().delete_many(codeList)

> Bulk delete roles.

#### Parameter

- `codeList` \<string[]\> A list of unique ids for roles

#### Example

```python
data = management_client.roles.delete_many([
  'ROLE1',
  'ROLE2'
])
totalCount = data['totalCount']
_list = data['list']
```

## Update a role

RolesManagementClient().update(code, input)

> Update a role.

#### Parameter

- `code` \<string\> Unique id of the role
- `input` \<Object\>
- `input.description` \<string\> description information
- `input.newCode` \<string\> New unique id

#### Example

```python

# modify the description
code = 'code'
desc = 'description'
role = management_client.roles.update(code=code, description=desc)

# modify code
role = management_client.roles.update(code='old', newCode="new")
```

## Get role details

RolesManagementClient().detail(code)

> Get role details

#### Parameter

- `code` \<string\> Unique id of the role

#### Example

```python
code = 'code'
management_client.roles.create(code=code)
```

## Get roles list

RolesManagementClient().list(page, limit)

> Get roles list

#### Parameter

- `page` \<number\> Page number. The default value is: `1`.
- `limit` \<number\> Number of roles per page. The default value is: `10`.

#### Example

```python
data = management_client.roles.list()
totalCount = data['totalCount']
_list = data['list']
```

## Get role's users list

RolesManagementClient().list_users(code)

> Get role's users list

#### Parameter

- `code` \<string\> Unique id of the role

#### Example

```python
data = management_client.roles.list_users('ROLE')
totalCount = data['totalCount']
_list = data['list']
```

## Add users

RolesManagementClient().add_users(code, userIds)

> Add users

#### Parameter

- `code` \<string\> Unique id of the role
- `userIds` \<string[]\> User ID list

#### Example

```python
data = management_client.roles.add_users('ROLE', [
  'USERID1',
  'USERID2'
])
totalCount = data['totalCount']
_list = data['list']
```

##  Remove a user

RolesManagementClient().remove_users(code, userIds)

>  Remove a user.

#### Parameter

- `code` \<string\> Unique id of the role
- `userIds` \<string[]\> User ID list

#### Example

```python
data = management_client.roles.remove_users('ROLE', [
  'USERID1',
  'USERID2'
])
totalCount = data['totalCount']
_list = data['list']
```

## Get the role policy list

RolesManagementClient().list_policies(code, page, limit)

> Get the role policy list

#### Parameter

- `code` \<string\> Unique id of the role
- `page` \<number\> Page number. The default value is: `1`.
- `limit` \<number\> Number of policy records shown per page. The default value is: `10`.

#### Example

```python
data = management_client.roles.list_policies('ROLE')
totalCount = data['totalCount']
_list = data['list']
```

## Add policies

RolesManagementClient().add_policies(code, policies)

> Add policies for roles.

#### Parameter

- `code` \<string\> Unique id of the role
- `policies` \<string[]\> policy list

#### Example

```python
data = management_client.roles.add_policies('ROLE', [
  'Policy1',
  'Policy2'
])
totalCount = data['totalCount']
_list = data['list']
```

## Remove policies

RolesManagementClient().remove_policies(code, policies)

> Remove policies for roles.

#### Parameter

- `code` \<string\> Unique id of the role
- `policies` \<string[]\> policy list

#### Example

```python
data = management_client.roles.remove_policies('ROLE', [
  'Policy1',
  'Policy2'
])
totalCount = data['totalCount']
_list = data['list']
```
