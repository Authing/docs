
# GroupsManagementClient

<LastUpdated/>



> This client is used to manage Approw groups. It can create/query/update/delete groups, add/delete users to/from groups, add/delete group's policy and perform other operations.



Please follow the instructions below to use this client. Do not initialize directly:
```javascript
import { ManagementClient } from "approw-js-sdk"
const managementClient = new ManagementClient({
   userPoolId: "YOUR_USERPOOL_ID",
   secret: "YOUR_USERPOOL_SECRET",
})
managementClient.groups.list // get group list
managementClient.groups.create // create a group
managementClient.groups.listUsers // get group user list
```




## Create a group

GroupsManagementClient().create(code, name, description)

> Create a group.


#### Parameter

- `code` \<string\> Group unique id
- `name` \<string\> Group name 
- `description` \<string\> Description 

#### Example

```javascript
managementClient.groups.create('group', 'Group xxx')
```

#### Return value

-  `Promise<DeepPartial<Group>>` 


      

## Delete a group

GroupsManagementClient().delete(code)

> Delete a group


#### Parameter

- `code` \<string\> Group unique id

#### Example

```javascript
managementClient.groups.delete('rolea')
```

#### Return value

-  `Promise<CommonMessage>` 


      

## Update a group

GroupsManagementClient().update(code, input)

> Update a group


#### Parameter

- `code` \<string\> Group unique id
- `input` \<Object\>  
- `input.name` \<string\> New group name
- `input.description` \<string\> New description
- `input.newCode` \<string\> New unique id

#### Example

```javascript
managementClient.groups.update('group', {newCode: 'newcode'})
```

#### Return value

-  `Promise<DeepPartial<Group>>` 


      

## Get group details

GroupsManagementClient().detail(code)

> Get group details


#### Parameter

- `code` \<string\> Group unique id

#### Example

```javascript
managementClient.groups.detail('manager')
```

#### Return value

-  `Promise<DeepPartial<Group>>` Detailed information of the group


      

## Get group list

GroupsManagementClient().list(page, limit)

> Get group list


#### Parameter

- `page` \<number\> Page number, default value: `1`.
- `limit` \<number\> Users per page, default value: `10`.

#### Example

```javascript
managementClient.groups.list(1, 10)
```

#### Return value

-  `Promise<DeepPartial<PaginatedGroups>>` 


      

## Bulk delete groups

GroupsManagementClient().deleteMany(codeList)

> Bulk delete groups


#### Parameter

- `codeList` \<string[]\> A list of unique id of the groups.

#### Example

```javascript
managementClient.groups.deleteMany(['groupa', 'groupb'])
```

#### Return value

-  `Promise<CommonMessage>` 


      

## Get users list of the group

GroupsManagementClient().listUsers(code, page, limit)

> Get users list of the group


#### Parameter

- `code` \<string\> Group unique id
- `page` \<number\> Page number, default value: `1`.
- `limit` \<number\> Users per page, default value: `10`.

#### Example

```javascript
managementClient.groups.listUsers(code)
```

#### Return value

-  `Promise<DeepPartial<PaginatedUsers>>` 


      

## Add users to a group

GroupsManagementClient().addUsers(code, userIds)

> Add users to a group.


#### Parameter

- `code` \<string\> Group unique id
- `userIds` \<string[]\> User ID list

#### Example

```javascript
managementClient.groups.addUsers(code, ['USERID1', 'USERID2'])
```

#### Return value

-  `Promise<CommonMessage>` 


      

## Remove users from a group

GroupsManagementClient().removeUsers(code, userIds)

> Remove users from a group


#### Parameter

- `code` \<string\> Group unique id
- `userIds` \<string[]\> User ID list

#### Example

```javascript
managementClient.groups.removeUsers(code, ['USERID1', 'USERID2'])
```

#### Return value

-  `Promise<CommonMessage>` 


