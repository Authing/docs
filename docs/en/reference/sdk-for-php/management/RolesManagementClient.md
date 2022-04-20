---
meta:
  - name: description
    content: Management role
---

# Management role

<LastUpdated/>

> This module is used to manage {{$localeConfig.brandName}} roles, and the role can be used to deduce, role add / delete users, roles add / delete policies.

Please use the module in the following ways:

```php
use Authing\Mgmt\ManagementClient;


// Initialization Resources and Permission Clients
// Initialize with the user pool password via the user pool ID
// $management = new ManagementClient("YOUR_USERPOOL_ID", "YOUR_USERPOOL_SECRET");
// Initialization by callback function
$management = new ManagementClient(function ($options) {
    $options->userPoolId = 'YOUR_USERPOOL_ID';
    $options->secret = 'YOUR_USERPOOL_SECRET';
});

$rolesManagementClient = $management->roles();
$rolesManagementClient->paginate // Get a list of roles
$rolesManagementClient->create   // Creating a Role
$rolesManagementClient->delete // Delete role
```

## Creating a Role

RolesManagementClient->create(string $code, string $description = '', string \$namespace = '')

Creating a Role

#### parameter

- `code` \<string\> Role unique marker
- `description` \<string\> description
- `namespace` \<string\> Permissions group code

#### Example

```php
$rolesManagementClient->create("ROLE_CODE");
```

#### Sample data

```json
{
  "namespace": "default",
  "code": "test-code",
  "arn": "arn:cn:authing:5f819ffdaaf252c4df2c9266:role:60a83b129a1bfb6ecc32a7c0",
  "description": null,
  "createdAt": "2021-05-21T22:58:26+00:00",
  "updatedAt": "2021-05-21T22:58:26+00:00",
  "parent": null
}
```

## Delete role

RolesManagementClient->delete(string $code, string $namespace = null)

Delete role

#### parameter

- `code` \<string\> Role unique marker
- `namespace` \<string\> Code of permission grouping, please see [Use Right Limit Group Management Rights Resources](/guides/access-control/resource-group.md)；

#### Example

```php
$rolesManagementClient->delete("ROLE_CODE");
```

#### Sample data

```json
{
  "message": "delete role succeed",
  "code": 200
}
```

## Batch delete role

RolesManagementClient->deleteMany(array $codeList, string $namespace = null)

Batch delete role

#### parameter

- `codeList` \<string[]\> Role unique logo list
- `namespace` \<string\>Code of permission grouping, please see [Use Right Limit Group Management Rights Resources](/guides/access-control/resource-group.md);

#### Example

```php
$rolesManagementClient->deleteMany(
  [
    "ROLE_CODE_1",
    "ROLE_CODE_2",
  ]
);
```

#### Sample data

```json
{
  "message": "delete role succeed",
  "code": 200
}
```

## Modify the role

RolesManagementClient->update(string $code, array $input)

Modify the role

#### parameter

- `code` \<string\> Role unique marker
- `input` \<array\>
- `input['description']` \<string\> Description
- `input['newCode']` \<string\> New unique marker

#### Example

```php
$rolesManagementClient->update("ROLE_CODE", [
  'description' => 'Newly added instructions'
]);
```

#### Sample data

```json
{
  "namespace": "default",
  "code": "test_role_code",
  "arn": "arn:cn:authing:5f819ffdaaf252c4df2c9266:role:6076a2f503bbc684184a7ed9",
  "description": "Newly added instructions",
  "createdAt": "2021-04-14T08:08:21+00:00",
  "updatedAt": "2021-05-22T07:18:44+00:00",
  "parent": null
}
```

## Get role details

RolesManagementClient->detail(string $code, string $namespace = null)

Get role details

#### parameter

- `code` \<string\> Role unique marker
- `namespace` \<string\> Code of permission grouping, please see [Use Right Limit Group Management Rights Resources](/guides/access-control/resource-group.md)；

#### Example

```php
$rolesManagementClient->detail("ROLE_CODE", 'NAMESPACE_CODE');
```

#### Sample data

```json
{
  "namespace": "default",
  "code": "test_role_code",
  "arn": "arn:cn:authing:5f819ffdaaf252c4df2c9266:role:6076a2f503bbc684184a7ed9",
  "description": "\u6d4b\u8bd5\u4f7f\u7528\u7684 test_role_code",
  "createdAt": "2021-04-14T08:08:21+00:00",
  "updatedAt": "2021-04-14T08:08:21+00:00",
  "parent": null
}
```

## Get a list of roles

RolesManagementClient->paginate(array \$options = [])

Get a list of roles

#### parameter

- `options` \<array\> Optional, filter condition object
- `options['namespace']` \<string\> Code of permission grouping
- `options['page']` \<string\> The number of page numbers is: `1`
- `options['limit']` \<string\> The number of defaults per page is: `10`

#### Example

```php
$rolesManagementClient->paginate();
```

#### Sample data

```json
{
  "totalCount": 2,
  "list": [
    {
      "namespace": "default",
      "code": "test-code",
      "arn": "arn:cn:authing:5f819ffdaaf252c4df2c9266:role:60a83b129a1bfb6ecc32a7c0",
      "description": "Newly added instructions",
      "createdAt": "2021-05-21T22:58:26+00:00",
      "updatedAt": "2021-05-21T23:10:47+00:00"
    },
    {
      "namespace": "default",
      "code": "test_role_code",
      "arn": "arn:cn:authing:5f819ffdaaf252c4df2c9266:role:6076a2f503bbc684184a7ed9",
      "description": "Testing test_role_code",
      "createdAt": "2021-04-14T08:08:21+00:00",
      "updatedAt": "2021-04-14T08:08:21+00:00"
    }
  ]
}
```

## Get a list of users

RolesManagementClient->listUsers(string $code, array $options = [])

Get a list of users

#### parameter

- `code` \<string\> Role unique marker
- `options` \<array\> Optional, filter condition object
- `options['namespace']` \<string\> Code of permission grouping
- `options['page']` <number\> The number of page numbers is: `1`.
- `options['limit']` \<number\> The number of defaults per page is: `10`.
- `options['withCustomData']` \<boolean\> Whether to get custom data, default is false; if set to true, all custom data of the user will be returned in the `customData` field.

#### Example

```php
$rolesManagementClient->listUsers("ROLE_CODE")
```

#### Sample data

```json
{
  "totalCount": 1,
  "list": [
    {
      "id": "6082607a3d19e39ae3b8ea7e",
      "arn": "arn:cn:authing:5f819ffdaaf252c4df2c9266:user:6082607a3d19e39ae3b8ea7e",
      "status": "Activated",
      "userPoolId": "5f819ffdaaf252c4df2c9266",
      "username": null,
      "email": null,
      "emailVerified": false,
      "phone": "17630802710",
      "phoneVerified": false,
      "unionid": null,
      "openid": null,
      "nickname": null,
      "registerSource": ["import:manual"],
      "photo": "https://files.authing.co/authing-console/default-user-avatar.png",
      "password": "9d9a74dd7c61547ef047ebb3d2592cc2",
      "oauth": null,
      "token": "---",
      "tokenExpiredAt": "2021-05-21T22:26:01+00:00",
      "loginsCount": 14,
      "lastLogin": "2021-04-30T10:00:33+00:00",
      "lastIP": null,
      "signedUp": "2021-04-23T05:51:54+00:00",
      "blocked": false,
      "isDeleted": false,
      "device": null,
      "browser": null,
      "company": null,
      "name": null,
      "givenName": null,
      "familyName": null,
      "middleName": null,
      "profile": null,
      "preferredUsername": null,
      "website": null,
      "gender": "U",
      "birthdate": null,
      "zoneinfo": null,
      "locale": null,
      "address": null,
      "formatted": null,
      "streetAddress": null,
      "locality": null,
      "region": null,
      "postalCode": null,
      "city": null,
      "province": null,
      "country": null,
      "createdAt": "2021-04-23T05:51:54+00:00",
      "updatedAt": "2021-05-21T22:26:01+00:00",
      "externalId": null
    }
  ]
}
```

## Add user

RolesManagementClient->addUsers(string $code, array $userIds, string \$namespace = '')

Add user

#### parameter

- `code` \<string\> Role unique marker
- `userIds` \<string[]\> User ID list
- `namespace` \<string\> Code of permission grouping

#### Example

```php
$rolesManagementClient->addUsers(
    "ROLE_CODE",
    [
        "USERID_1",
        "USERID_2"
    ]
);
```

#### Sample data

```json
{
  "message": "Authorized role success",
  "code": 200
}
```

## Removal user

RolesManagementClient->removeUsers(string $code, array $userIds, string \$namespace = '')

Removal user

#### parameter

- `code` \<string\> Role unique marker
- `userIds` \<string[]\> User ID list
- `namespace` \<string\> Code of permission grouping

#### Example

```php
$rolesManagementClient->removeUsers(
    "ROLE_CODE",
    [
        "USERID_1",
        "USERID_2"
    ]
);
```

#### Sample data

```json
{
  "message": "Revoke roles success",
  "code": 200
}
```

<!-- ## 获取角色策略列表

RolesManagementClient->listPolicies(string $code, int $page = 1, int $limit = 10)

> 获取角色策略列表

#### 参数

- `code` \<string\> 角色唯一标志符
- `page` \<number\> 页码数 默认值为 : `1`。
- `limit` \<number\> 页码个数 默认值为 : `10`。

#### 示例

```php
$policies = $managementClient->roles()->listPolicies("code");
```

## 授权策略

RolesManagementClient->addPolicies(string $code, array $policies)

> 给角色授权策略策略

#### 参数

- `code` \<string\> 角色唯一标志符
- `policies` \<string[]\> 策略列表

#### 示例

```php
$message = $managementClient->roles()->addPolicies(
  'code',
  [
    'policy id'
  ]
);
```

## 角色移除策略

RolesManagementClient->removePolicies(string $code, array $policies)

> 角色移除策略

#### 参数

- `code` \<string\> 角色唯一标志符
- `policies` \<string[]\> 策略列表

#### 示例

```php
$message = $managementClient->roles()->removePolicies(
  "code",
  [
    "policy id"
  ]
);
``` -->

## Gets list of all resources authorized by roles

RolesManagementClient->listAuthorizedResources(string $roleCode, string $namespace, string \$resourceType = '')

Get all the resources authorized by a role.

#### parameter

- `roleCode` \<string\> Role code；
- `namespace` \<string\> Code of permission grouping, please see [Use Right Limit Group Management Rights Resources](/guides/access-control/resource-group.md)；
- `resourceType` \<string\> Optional, resource type, default will return all permissions, existing resource types are as follows:
  - `DATA`: type of data;
  - `API`: API type data;
  - `MENU`: Menu type data;
  - `BUTTON`: Button type data.

#### Example

```php
$rolesManagementClient->listAuthorizedResources(
    'ROLE_CODE',
    'NAMESPACE_CODE'
);
```

#### Sample data

- `type` For resource types;
- `code`: Resource descriptor, if it is `DATA` type resource, format is `resourceType:resourceId`, such as `books:*` Represents all books, `books:1` Indicates a book for ID 1.
- `actions`: The user is authorized to operate the resource.

```json
{
  "list": [
    {
      "code": "test_resource:*",
      "type": "DATA",
      "actions": ["*"]
    }
  ],
  "totalCount": 1
}
```

## Get a list of role extensions fields

RolesManagementClient->getUdfValue(string \$roleId)

Get a list of role extensions fields

#### parameter

- `roleId` \<string\> Role ID；

#### Example

```php
$rolesManagementClient->getUdfValue('ROLE_ID');
```

<!-- #### Sample data

```json
true
``` -->

## Get a role an extension field

RolesManagementClient->getSpecificUdfValue(string $roleId, string  $udfKey)

Get a role an extension field

#### parameter

- `roleId` \<string\> role ID；
- `udfKey` \<string\> extension field Key；

#### Example

```php
$rolesManagementClient->getSpecificUdfValue('ROLEID', 'KEY');
```

#### Sample data

```json
{
  "test_role_code": "ok"
}
```

## Get a list of multiple role extensions fields

RolesManagementClient->getUdfValueBatch(array \$roleIds)

Get a list of multiple role extensions fields

#### parameter

- `roleIds` \<string []\> Role ID list;

#### Example

```php
$rolesManagementClient->getUdfValueBatch(
  [
    'ROLEID_1',
    'ROLEID_2'
  ]
);
```

#### Sample data

```json
{
  "60a815b2e32c6ef56f8fd8ff": {
    "test_role_code": "ok"
  },
  "6076a2f503bbc684184a7ed9": {}
}
```

## Set a list of role extensions fields

RolesManagementClient->setUdfValue(string $roleId, array $data)

Set a list of role extensions fields

#### parameter

- `roleId` \<string\> role ID；
- `data` \<array\> extensions fields, key: value；

#### Example

```php
$rolesManagementClient->setUdfValue(
    'ROLEID',
    [
        'shcool' => '清华大学',
        'age' => '24'
    ]
);
```

#### Sample data

```json
[
  {
    "key": "test_role_code",
    "dataType": "STRING",
    "value": "test",
    "label": "测试用的 test_role_code"
  }
]
```

## Set a list of multiple role extensions fields

RolesManagementClient->setUdfValueBatch(array \$input)

Set a list of multiple role extensions fields

#### parameter

- `input` \<object\> data input;
- `input['data']` \<KeyValuePair []\> Extended field arrays;
- `input['roleId']` \<string]\> Role ID list;

#### Example

```php
$rolesManagementClient->setUdfValueBatch([
    (object)[
        'roleId' => 'ROLEID',
        'data' => [
            'shcool' => '清华大学',
            'age' => '25'
        ]
    ]
]);
```

#### Sample data

```json
{
  "code": 200,
  "message": "Set success!"
}
```

## Delete the user's extension field

RolesManagementClient->removeUdfValue(string $roleId, string $key)

Delete the user's extension field

#### parameter

- `roleId` \<string\> role ID；
- `key` \<string\> Extended field name;

#### Example

```php
$rolesManagementClient->removeUdfValue('ROLEID', 'KEY');
```

#### Sample data

```json
true
```

<!-- ## 获取角色策略列表

RolesManagementClient->listPolicies(code, page, limit)

> 获取角色策略列表

#### 参数

- `code` \<string\> 角色唯一标志符
- `page` \<number\> 页码数 默认值为 : `1`。
- `limit` \<number\> 页码个数 默认值为 : `10`。

#### 示例

```javascript
managementClient.roles.listPolicies('codea', 1, 10)
```

#### 返回值

- `Promise<PaginatedPolicyAssignments>`

## 授权策略

RolesManagementClient->addPolicies(code, policies)

> 给角色授权策略策略

#### 参数

- `code` \<string\> 角色唯一标志符
- `policies` \<string[]\> 策略列表

#### 示例

```javascript
managementClient.roles.addPolicies('rolea', ['PolicyA', 'PolicyB'])
```

#### 返回值

- `Promise<CommonMessage>`

## 角色移除策略

RolesManagementClient->removePolicies(code, policies)

> 角色移除策略

#### 参数

- `code` \<string\> 角色唯一标志符
- `policies` \<string[]\> 策略列表

#### 示例

```javascript
managementClient.roles.removePolicies('rolea', ['PolicyA', 'PolicyB'])
```

#### 返回值

- `Promise<CommonMessage>` -->
