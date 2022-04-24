---
meta:
  - name: description
    content: GroupsManagementClient
---

# GroupsManagementClient

<LastUpdated/>


> This client is used to manage {{$localeConfig.brandName}} groups，It can create/query/update/delete groups, add/delete users to/from groups, add/delete group's policy and perform other operations.

## Create a group

GroupsManagementClient().create(groupInfo)

> Create a Group

#### Parameters

- `groupInfo` \<CreateGroupParam\> Group information
- `groupInfo.code` \<String\> Group unique id
- `groupInfo.name` \<String\> Group name
- `groupInfo.description` \<String\> Description

#### Example

```java
String code = "code1";
String name = "name1";
String description = "desc1";
Group group = managementClient.group().create(new CreateGroupParam(code, name, description)).execute();
```

## Delete a group

GroupsManagementClient().delete(code)

> Delete a Group.

#### Parameter

- `code` \<String\> Group unique id

#### Example

```java
String code = "code1";
CommonMessage message = managementClient.group().delete(code).execute();
```

## Update a group

GroupsManagementClient().update(groupInfo)

> Update a group

#### Parameters

- `groupInfo` \<CreateGroupParam\> Group information
- `groupInfo.code` \<String\> Group unique id
- `groupInfo.name` \<String\> Group name
- `groupInfo.description` \<String\> Description
- `groupInfo.newCode` \<String\> New unique id

#### Example

```java
String code = "code1";
String name = "name1";
String description = "desc1";
String newCode = "code2";
Group group = managementClient.group().update(new UpdateGroupParam(code, name, description, newCode)).execute();
```

## Get group details

GroupsManagementClient().detail(code)

#### Parameter

- `code` \<String\> Group unique id

#### Example

```java
String code = "code1";
Group group = managementClient.group().detail(code).execute();
```

## Get the group list

GroupsManagementClient().list(listParam)

> Get the group list.

#### Parameters

- `listParam` \<GroupsParam\> Pagination request parameters
- `listParam.userId` \<String\> User ID
- `listParam.page` \<Integer\> Page number. Default value: `1`.
- `listParam.limit` \<Integer\> Groups per page. Default value: `10`.
- `listParam.sortBy` \<SortByEnum\> Sorting rules

#### Example

```java
String userId = "userId1";
int page = 1;
int limit = 10;
SortByEnum sortEnum = SortByEnum.CREATEDAT_DESC;
PaginatedGroups groups = managementClient.group().list(new GroupsParam(userId, page, limit, sortEnum)).execute();
```

## Bulk delete groups

GroupsManagementClient().deleteMany(codeList)

> Bulk delete groups

#### Parameter

- `codeList` \<List\<String\>\> A list of unique id of the groups.

#### Example

```java
ArrayList<String> codeList = new ArrayList<>();
codeList.add("code1");
CommonMessage message = managementClient.group().deleteMany(codeList).execute();
```

## Get users list of the group

- GroupsManagementClient().listUsers(groupWithUsersParam)
- GroupsManagementClient().listUsers(code)

> Get users list of the group

#### Parameter

- `code` \<String\> Group unique id
- `groupWithUsersParam` \<GroupWithUsersParam\>
- `groupWithUsersParam.code` \<String\> Group unique id
- `groupWithUsersParam.page` \<Integer\>  Page number, default value:  `1`.
- `groupWithUsersParam.limit` \<Integer\> Users per page, default value:  `10`.

#### Example

```java
String code = "code1";
int page = 1;
int limit = 10;
PaginatedUsers users = managementClient.group().listUsers(new GroupWithUsersParam(code, page, limit)).execute();
```

## Add users to a group

GroupsManagementClient().addUsers(addUserToGroupParam)

> Add users to a group

#### Parameters

- `addUserToGroupParam` \<AddUserToGroupParam\>
- `addUserToGroupParam.code` \<String\> Group unique id
- `addUserToGroupParam.userIds` \<List\<String\>\> User ID list

#### Example

```java
String code = "code1";
List<String> userIds = new ArrayList<>();
userIds.add("userId1");
CommonMessage message = managementClient.group().addUsers(new AddUserToGroupParam(userIds, code)).execute();
```

## Delete users from a group

GroupsManagementClient().removeUsers(removeUserFromGroupParam)

> Delete users from a group

#### Parameter

- `removeUserFromGroupParam` \<RemoveUserFromGroupParam\>
- `removeUserFromGroupParam.code` \<String\> Group unique id
- `removeUserFromGroupParam.userIds` \<List\<String\>\> User ID list

#### Example

```java
String code = "code1";
List<String> userIds = new ArrayList<>();
userIds.add("userId1");
CommonMessage message = managementClient.group().removeUsers(new RemoveUserFromGroupParam(userIds, code)).execute();
```
