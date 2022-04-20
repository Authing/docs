---
meta:
  - name: description
    content: Manage group
---

# Manage grouping

<LastUpdated/>

> This module is used to manage {{$localeConfig.brandName}} groups, which can be done, grouping / delete users, packet add / delete policies, etc.

## Create grouping

GroupsManagementClient().create(code, name, description)

> Create grouping

#### parameter

- `code` \<string\> Group unique marker
- `name` \<string\> Group Name
- `description` \<string\> description

#### Example

```php
$group = $managementClient->groups()->create("code", "group name");
```

## 删除分组

GroupsManagementClient().delete(code)

> 删除分组

#### parameter

- `code` \<string\> 分组唯一标志符

#### Example

```php
$managementClient->groups()->delete("code");
```

## Modify group

GroupsManagementClient().update(code, input)

> Modify group

#### parameter

- `code` \<string\> Group unique marker
- `input` \<Object\>
- `input.name` \<string\> New name
- `input.description` \<string\> New description information
- `input.newCode` \<string\> New unique marker

#### Example

```php
$group = $managementClient->groups()->update("code", "group name");
```

## Get a group details

GroupsManagementClient().detail(code)

> Get a group details

#### parameter

- `code` \<string\> Group unique marker

#### Example

```php
$group = $managementClient->groups()->detail("code");
```

## Get a list of groups

GroupsManagementClient().list(page, limit)

> Get a list of groups

#### parameter

- `page` \<number\> The number of page numbers is: `1`.
- `limit` \<number\> The number of defaults per page is: `10`.

#### Example

```php
$groups = $managementClient->groups()->paginate();
```

## Batch delete group

GroupsManagementClient().deleteMany(codeList)

> Batch delete group

#### parameter

- `codeList` \<string[]\> Group unique logo list

#### Example

```php
$managementClient->groups()->deleteMany(["code"]);
```

## Get a list of group users

GroupsManagementClient().listUsers(code, page, limit)

> Get a list of group users

#### parameter

- `code` \<string\> Group unique marker
- `page` \<number\> The number of page numbers is: `1`.
- `limit` \<number\> The number of defaults per page is: `10`.

#### Example

```php
$users = $managementClient->groups()->listUsers("code");
```

## Add user

GroupsManagementClient().addUsers(code, userIds)

> Add user

#### parameter

- `code` \<string\> Group unique marker
- `userIds` \<string[]\> User ID list

#### Example

```php
$managementClient->groups()->addUsers("code", ["userId"]);
```

## Removal user

GroupsManagementClient().removeUsers(code, userIds)

> Removal user

#### parameter

- `code` \<string\> Group unique marker
- `userIds` \<string[]\> User ID list

#### Example

```php
$managementClient->groups()->removeUsers("code", ["userId"]);
```
