---
meta:
  - name: description
    content: GroupsManagementClient
---

# GroupsManagementClient

<LastUpdated/>


> This client is used to manage {{$localeConfig.brandName}} groups，It can create/query/update/delete groups, add/delete users to/from groups, add/delete group's policy and perform other operations.

## Create a group

GroupsManagementClient().create(code, name, description)

> Create a Group

#### Parameters

- `code` \<string\> Group unique id
- `name` \<string\> Group name
- `description` \<string\> Description

#### Example

```csharp
var list = await managementClient.Groups.Create(code, "name");
```

## Delete a group

GroupsManagementClient().delete(code)

> Delete a group

#### Parameter

- `code` \<string\> Group unique id

#### Example

```csharp
var message = await managementClient.Groups.Delete(code);
```

## Update a group

GroupsManagementClient().update(code, input)

> Update a group.

#### Parameters

- `code` \<string\> The unique id of the group
- `input` \<Object\>
- `input.name` \<string\> new name
- `input.description` \<string\> New description information
- `input.newCode` \<string\> New unique id

#### Example

```csharp
var group = await client.Groups.Update(code, description: "asd");
```

## Get group details

GroupsManagementClient().detail(code)

> Get group details

#### Parameter

- `code` \<string\> Group unique id

#### Example

```csharp
var policy = await managementClient.Groups.Update(code, description: "asd");
```

## Get the group list

GroupsManagementClient().list(page, limit)

> Get the group list

#### Parameters

- `page` \<number\> Page number. Default value:  `1`。
- `limit` \<number\> Groups per page. Default value: `10`。

#### Example

```csharp
var list = await managementClient.Groups.List();
```

## Bulk delete groups

GroupsManagementClient().deleteMany(codeList)

> Bulk delete groups

#### Parameter

- `codeList` \<string[]\> a list of unique id of the groups

#### Example

```csharp
var message = await managementClient.Groups.DeleteMany(new string[] { code });
```

## Get users list of the group

GroupsManagementClient().listUsers(code, page, limit)

> Get users list of the group

#### Parameters

- `code` \<string\> Group unique id
- `page` \<number\> Page number, default value:  `1`。
- `limit` \<number\> Users per page, default value:  `10`。

#### Example

```csharp
var users = managementClient.Groups.ListUsers(code);
```

## Add users to a group

GroupsManagementClient().addUsers(code, userIds)

> Add users to a group

#### Parameters

- `code` \<string\> Group unique id
- `userIds` \<string[]\> User ID list

#### Example

```csharp
await managementClient.Groups.AddUsers(code, new string[] { userId1, userId2 });
```

## Delete users from a group

GroupsManagementClient().removeUsers(code, userIds)

> Delete users from a group

#### Parameters

- `code` \<string\> Group unique id
- `userIds` \<string[]\> User ID list

#### Example

```csharp
await managementClient.Groups.RemoveUsers(code, new string[] { userId1, userId2 });
```
