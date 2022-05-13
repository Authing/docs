# Manage grouping

<LastUpdated/>

This module is used to manage {{$localeConfig.brandName}} groups, which can be packetized, grouping / deleting users, gaining all resources such as packets authorized.

```python
from authing.v2.management import ManagementClient, ManagementClientOptions

management_client = ManagementClient(
  options=ManagementClientOptions(
    user_pool_id='AUTHING_USERPOOL_ID',
    secret='AUTHING_USERPOOL_SECRET',
))

management_client.groups.list # Get a list of groups
management_client.groups.create # Create grouping
management_client.groups.list_users # Get a list of group users
```

## Create grouping

```python
def create(self, code, name, description=None):
  pass
```

Creating a grouping, a packet must contain a user pool globally unique logo (Code), which must be a legitimate English flag, such as developers; and group name.

#### parameter

- `code` \<str\> Group unique marker
- `name` \<str\> Group Name
- `description` \<str\> description

#### Example

```python
management_client.groups.create(
  code='group',
  name='Group xxx'
)
```

#### return value

```json
{
  "code": "developers",
  "name": "开发者",
  "description": null,
  "createdAt": "2021-05-06T15:36:33+08:00",
  "updatedAt": "2021-05-06T15:36:33+08:00"
}
```

## Modify group

```python
def update(self, code, new_code=None, name=None, description=None):
  pass
```

Modify the packet, a group in the unique flag user pool through the Code. You can modify this group's Code.

#### parameter

- `code` \<str\> Group unique marker
- `new_code` \<str\> Packet new code
- `name` \<str\> New name
- `description` \<str\> New description information

#### Example

```python
management_client.groups.update(
  code='code1',
  new_code='code2'
)
```

#### return value

Return new group details:

```json
{
  "code": "new-code",
  "name": "Developer",
  "description": null,
  "createdAt": "2021-05-06T15:36:33+08:00",
  "updatedAt": "2021-05-06T15:36:33+08:00"
}
```

## Get a group details

```python
def detail(self, code):
  pass
```

Get a grouped details, a group in the code unique logo user pool.

#### parameter

- `code` \<str\> Group unique marker

#### Example

```python
management_client.groups.detail('manager')
```

#### return value

```json
{
  "code": "developers",
  "name": "开发者",
  "description": null,
  "createdAt": "2021-05-06T15:36:33+08:00",
  "updatedAt": "2021-05-06T15:36:33+08:00"
}
```

## Get a list of groups

```python
def list(self, page=1, limit=10):
  pass
```

Get a list of groups, this interface is a paging interface.

#### parameter

- `page` \<int\> The number of page numbers is: `1`.
- `limit` \<int\> The number of defaults per page is: `10`.

#### Example

```python
management_client.groups.list(1, 10)
```

#### return value

```json
{
  "totalCount": 2,
  "list": [
    {
      "code": "code1",
      "name": "名称1",
      "description": null,
      "createdAt": "2021-05-06T15:36:33+08:00",
      "updatedAt": "2021-05-06T15:36:33+08:00"
    },
    {
      "code": "code2",
      "name": "名称2",
      "description": null,
      "createdAt": "2021-05-06T15:36:33+08:00",
      "updatedAt": "2021-05-06T15:36:33+08:00"
    }
  ]
}
```

## Delete group

```python
def delete(self, code):
  pass
```

Delete the packet, a group in the unique flag user pool through the Code.

#### parameter

- `code` \<str\> Group unique marker

#### Example

```python
management_client.groups.delete('code')
```

#### return value

```json
{
  "code": 200,
  "massage": "Delete the group success"
}
```

## Batch delete group

```python
def delete_many(self, code_list):
  pass
```

Remove the packet by grouping code batch.

#### parameter

- `code_list` \<str[]\> Group unique logo list.

#### Example

```python
management_client.groups.delete_many(['groupa', 'groupb'])
```

#### return value

```json
{
  "code": 200,
  "massage": "Delete the group success"
}
```

## Get a list of group users

```python
def list_users(self, code, page=1, limit=10, with_custom_data=True):
  pass
```

Get the list of users. This interface is a paging interface.

#### parameter

- `code` \<str\> Group unique marker
- `page` \<int\> The number of page numbers is: `1`.
- `limit` \<int\> The number of defaults per page is: `10`.
- `with_custom_data`: \<bool\> Whether to get custom data, default is false; if set to true, all custom data of the user will be returned in the `customdata` field. Example:

```json
{
  "id": "604a12a261a85949c8ad0259",
  "customData": {
    "school": "清华大学",
    "age": 19
  }
}
```

#### Example

- Get grouping "group1" users (pagination)

```python
management_client.groups.list_users('group1')
```

- Get the user list while getting user custom data

```python
management_client.groups.list_users('group1', with_custom_data=True)
```

#### return value

```json
{
  "totalCount": 2,
  "list": [
    {
      "customData": {
        "school": "清华大学",
        "age": 19
      }
    },
    {
      "customData": {
        "school": "清华大学",
        "age": 19
      }
    }
  ]
}
```

## Add user

```python
def add_users(self, code, user_ids):
  pass
```

Group add users.

#### parameter

- `code` \<str\> Group unique marker
- `user_ids` \<str[]\> User ID list

#### Example

```python
management_client.groups.add_users(code, ['USERID1', 'USERID2'])
```

#### return value

```json
{
  "code": 200,
  "massage": "Add user success"
}
```

## Removal user

```python
def remove_users(self, code, user_ids):
  pass
```

Packet removal user.

#### parameter

- `code` \<str\> Group unique marker
- `user_ids` \<str[]\> User ID list

#### Example

```python
management_client.groups.remove_users(code, ['USERID1', 'USERID2'])
```

#### return value

```json
{
  "code": 200,
  "massage": "Remove user success"
}
```

## Get list of all resources to be authorized

```python
def list_authorized_resources(self, code, namespace, resource_type=None):
  pass
```

Get all the resources that are authorized.

#### parameter

- `code` \<str\> Group code；
- `namespace` \<str\> Permission group code, please see [Use Right Limits Group Management Rights Resources](/guides/access-control/resource-group.md)；
- `resourceType` \<str\> Optional, resource type, default will return all permissions, existing resource types are as follows:
  - `DATA`: type of data;
  - `API`: API Type data;
  - `MENU`: Menu type data;
  - `BUTTON`: Button type data.

#### Example

```python
management_client.groups.list_authorized_resources('GROUP_CODE', 'default')
```

#### Example Data

- `type` For resource types;
- `code`: Resource descriptor, if it is `DATA` type resource, format is `resourceType:resourceId`, such as `books:*` Represents all books, `books:1` Indicates a book for ID 1.
- `actions`: The user is authorized to operate the resource.

```json
{
  "totalCount": 12,
  "list": [
    {
      "code": "menu_a",
      "type": "MENU"
    },
    {
      "code": "menu_b",
      "type": "MENU"
    },
    {
      "code": "books:1",
      "type": "DATA",
      "actions": ["books:delete", "books:update"]
    }
  ]
}
```
