---
meta:
  - name: description
    content: Management application
---

# Management application

<LastUpdated/>

This module is primarily used to manage application-related operations.

Please use the module in the following ways:

```php
$managementClient = new ManagementClient('userPoolId', 'secret');
$managementClient->requestToken();
$applicationsClient = $managementClient->applications();
$list = $applicationsClient->list(['page' => 2, 'limit' => 10]); // Get application list

$app = $applicationsClient->findById('5f97fb40d352ecf69ffe6d98'); // Find Application by ID

```

## Create application

ApplicationsManagementClient->create(array \$params)

Create an app in the userpool

#### parameter

- `params` \<array\> Parameter array
- `params['name']` \<string\> Application Name.
- `params['identifier']` \<string\> Apply unique identifier.
- `params['redirectUris']` \<string\> Jump url.
- `params['logo']` \<string\> Application logo, optional .

#### Example

```php
$res = $appManageClient->create([
    'name' => 'testname',
    'identifier' =>  ' only one ',
    'redirectUris' => 'http://authing.cn',
    'logo' => 'https: //files.authing.co/authing-console/authing-logo-new.svg'
]);

```

<!-- #### return value -->

#### Sample data

```json
{
  "code": 200,
  "message": "\u521b\u5efa\u5e94\u7528\u6210\u529f\uff01",
  "data": {
    "qrcodeScanning": {
      "redirect": false,
      "interval": 1500
    },
    "id": "6073e90329bca4db6b9bfb44",
    "userPoolId": "5f88506c81cd279930195660",
    "protocol": "oidc",
    "name": "testname",
    "secret": "6768151669a410de1e16823f46d9039d",
    "identifier": "only one ",
    "jwks": {
      // ----
    }
  }
}
```

## Delete application

ApplicationsManagementClient->delete(string \$appId)

To delete a user application pool

#### parameter

- `appId` \<string\> appId

#### Example

```php
$res = $appManageClient->delete('606dd67c164539e1c90f4d83');

```

#### Sample data

```json
true
```

## Get the application list

ApplicationsManagementClient->list(array \$params = [ 'page' => 1,'limit' => 10 ])

Get a list of application -related information

#### parameter

- `params` \<array\> Parameter array
- `params['page']` \<number\> Page number, default `1`。
- `params['limit']` \<number\> The number of returned per page, default `10`。

#### Example

```php
$managementClient = new ManagementClient('userPoolId', 'secret');

// Get application manager
$applications = $managementClient->applications();

$list = $applications->list(['page' => 2, 'limit' => 10]);

```

#### Sample data

```json
{
  "code": 200,
  "message": "Get a list of success",
  "data": {
    "list": [],
    "totalCount": 1
  }
}
```

## Get app details

ApplicationsManagementClient->findById(string \$id)

#### parameter

- `id` \<string\> user id

#### Example

```php
// Get application manager
$_client = new ManagementClient('userPoolId', 'secret');
$_client->requestToken();

$applications = $_client->applications();

$app = $applications->findById('5f97fb40d352ecf69ffe6d98');
// Code 200 by determining whether the operation is successful if
```

#### Sample data

```json
{
  "code": 200,
  "message": "\u83b7\u53d6\u5e94\u7528\u914d\u7f6e\u6210\u529f",
  "data": {
    "qrcodeScanning": { "redirect": false, "interval": 1500 },
    "id": "5f97fb40d352ecf69ffe6d98",
    "createdAt": "2020-10-27T10:49:36.817Z",
    "updatedAt": "2021-03-17T10:39:53.650Z",
    "userPoolId": "5f88506c81cd279930195660",
    "protocol": "oidc",
    "isOfficial": false,
    "isDeleted": false,
    "isDefault": false,
    "name": "oo",
    "description": null,
    "secret": "19938f6ef3c84360a9c0ab73c2cc88d7",
    "identifier": "okokiohutuyfrtd",
    "jwks": {
      "keys": {
        "0": {
          // ------
        }
      }
    },
    "ssoPageCustomizationSettings": null,
    "logo": "https://files.authing.co/authing-console/default-app-logo.png",
    // -----
    "casConfig": null,
    "showAuthorizationPage": false,
    "enableSubAccount": false,
    "loginRequireEmailVerified": false,
    "agreementEnabled": false,
    "skipMfa": false,
    "permissionStrategy": {
      "enabled": false,
      "defaultStrategy": "ALLOW_ALL",
      "allowPolicyId": null,
      "denyPolicyId": null
    }
  }
}
```

## Access to resources list

ApplicationsManagementClient->listResources(string $appId, array $options = [])

According to the filter conditions , the query resource list under the pool of users .

#### parameter

- `appId` \<string\> user ID
- `options` \<array\> Optionally , the filter conditions objects
- `options['type']` \<string\> Resource types , optional value `DATA`、`API`、`MENU`、`UI`、`BUTTON`
- `options['page']` \<string\> Page, get the first few pages, the default starts from 1
- `options['limit']` \<string\> Number of entries per page

#### Example

```php
$client = new ManagementClient('userPoolId', 'userPoolSecret');
$client->requestToken();
$applicationsManagementClient = $client->applications();
$res = $applicationsManagementClient->listResources(APP_ID, [
    'type' => 'DATA',
    'page' => 1,
    'type' => 10,
]);
```

#### Return data

```json
{
  "list": [
    {
      "id": "60646ed1c7a558f935c6d49c",
      "createdAt": "2021-03-31T12:45:05.175Z",
      "updatedAt": "2021-03-31T12:45:05.175Z",
      "userPoolId": "600a8f29cead8fc0127f9da6",
      "code": "pihh4j7j4ehh",
      "actions": [
        {
          "name": "book:write",
          "description": "图书写入操作"
        }
      ],
      "type": "DATA",
      "description": "chair",
      "namespaceId": 22997,
      "apiIdentifier": null,
      "namespace": "600a8f4e37708b363024a3ca"
    }
  ],
  "totalCount": 1
}
```

## Create Resource

ApplicationsManagementClient->createResource(string $appId, array $options)

Create a resource.

#### parameter

- `appId` \<string\> user ID
- `options` \<array\> Resource information object
- `options['code']` \<string\> Resource Identifier, unable value `userpool`、`user`、`application`、`role`、`group`、`org`、`*`、`api`、`resource-namespace`、`custom-resource`
- `options['type']` \<string\> Resource type, optional value `DATA`、`API`、`MENU`、`UI`、`BUTTON`
- `options['actions']` \<Array<{ name: string, description: string }>\> Operating array of objects resources. Wherein the name is the name of the operation , a fill **verb** , Description of the operation description , description fill
- `options['description']` \<string\> Description Information Resources
- `options['apiIdentifier']` \<string\> Optional , API resource URL address when the type is API fields are required

#### Example

```php
$client = new ManagementClient('userPoolId', 'userPoolSecret');
$client->requestToken();
$applicationsManagementClient = $client->applications();
$res = $applicationsManagementClient->createResource(APP_ID, [
    'code' => 'codeNames',
    'type' => 'API',
    'actions' => [
        (object)[
            'name' => 'codeNames:actionName',
            'description' => 'actionDescription'
        ]
    ],
    'description' => 'description',
    'apiIdentifier' => 'http://xxx.com'
]);
```

#### Return data

```json
{
  "userPoolId": "600a8f29cead8fc0127f9da6",
  "code": "book",
  "actions": [
    {
      "name": "book:write",
      "description": "Book writing operation"
    }
  ],
  "type": "DATA",
  "description": "book",
  "namespaceId": 22997,
  "createdAt": "2021-04-06T11:49:07.656Z",
  "updatedAt": "2021-04-06T11:49:07.656Z",
  "id": "606c4ab3d7fb66a8e1517132",
  "apiIdentifier": null
}
```

## Bulk create resources

ApplicationsManagementClient->createResourceBatch(string $appId, array $resources)

Create multiple resources at a specified application.

#### parameter

- `appId` \<string\> application ID
- `resources` \<resource []\> Resource information object
- `resource['code']` \<string\> Resource Identifier
- `resource['namespace']` \<string\> Permission group namespace
- `resource['type']` \<string\> Resource type, optional value `DATA`、`API`、`MENU`、`UI`、`BUTTON`
- `resource['actions']` \<Array<{ name: string, description: string }>\> Operating array of objects resources. Wherein the name is the name of the operation , a fill **verb** , Description of the operation description , description fill

- `resource['description']` \<string\> Resource description information
- `resource['nameSpace']` \<string\> Namespace code

#### Example

```php
$applicationsManagementClient->createResourceBatch(APP_ID,
  [
    [
        'code' => 'default1',
        'description' => '这是一段描述',
        'actions' => [
            (object)[
                'name' => 'default1:write',
                'description' => 'this is description'
            ]
        ],
        'type' => ResourceType::DATA,
    ],
    [
        'code' => 'default2',
        'description' => '这是一段描述',
        'actions' => [
            (object)[
                'name' => 'default2:write',
                'description' => 'this is description'
            ]
        ],
        'type' => ResourceType::DATA,
    ]
]);
```

#### Return data

```json
[
  {
    "userPoolId": "5f819ffdaaf252c4df2c9266",
    "code": "default1",
    "actions": [
      {
        "name": "default1:write",
        "description": "this is description"
      }
    ],
    "type": "DATA",
    "description": "This is a description",
    "namespaceId": 32638,
    "createdAt": "2021-06-01T03:55:24.863Z",
    "updatedAt": "2021-06-01T03:55:24.863Z",
    "id": "60b5afac2f388546bcf80d17",
    "apiIdentifier": null
  },
  {
    "userPoolId": "5f819ffdaaf252c4df2c9266",
    "code": "default2",
    "actions": [
      {
        "name": "default2:write",
        "description": "this is description"
      }
    ],
    "type": "DATA",
    "description": "This is a description",
    "namespaceId": 32638,
    "createdAt": "2021-06-01T03:55:24.872Z",
    "updatedAt": "2021-06-01T03:55:24.872Z",
    "id": "60b5afac1ebd020d341beac1",
    "apiIdentifier": null
  }
]
```

## Update Resource

ApplicationsManagementClient->updateResource(string $appId, array $options)

Update a resource .

#### parameter

- `appId` \<string\> application ID
- `options` \<array\> Resource information object
- `options['code']` \<string\> Resource Identifier
- `options['type']` \<string\> Resource type, optional value `DATA`、`API`、`MENU`、`UI`、`BUTTON`
- `options['actions']` \<Array<{ name: string, description: string }>\> Operating array of objects resources. Where name is the name of the operation ,Fill in a **verb**, description is a description, fill in the description information
- `options['description']` \<string\> Resource description information
- `options['apiIdentifier']` \<string\> Optional, API resource URL address, this field must fill when Type is API

#### Example

```php
$client = new ManagementClient('userPoolId', 'userPoolSecret');

$applicationsManagementClient = $client->applications();
$res = $applicationsManagementClient->updateResource(APP_ID, [
    'type' => 'API',
    'code' => 'RESOURCE_CODE',
    'actions'=> [
        (object)[
            'name' => 'codeNames:actionName',
            'description' => 'actionDescription'
        ],
        (object)[
            'name' => 'codeNames:actionName',
            'description' => 'actionDescription'
        ]
    ],
    'description' => '新的描述',
    'apiIdentifier' => 'http://xxx.com'
]);
```

#### Return data

```json
{
  "id": "606c4ab3d7fb66a8e1517132",
  "createdAt": "2021-04-06T11:49:07.656Z",
  "updatedAt": "2021-04-06T11:59:26.879Z",
  "userPoolId": "600a8f29cead8fc0127f9da6",
  "code": "book",
  "actions": [
    {
      "name": "book:write",
      "description": "Writes books 2"
    },
    {
      "name": "book:read",
      "description": "Book reading operation 2"
    }
  ],
  "type": "DATA",
  "description": "New description",
  "namespaceId": 22997,
  "apiIdentifier": null
}
```

## Delete resources

ApplicationsManagementClient->deleteResource(string $appId, string $code)

Delete a resource.

#### parameter

- `appId` \<string\> application ID
- `code` \<string\> Resource identifier

#### Example

```php
$client = new ManagementClient('userPoolId', 'userPoolSecret');

$applicationsManagementClient = $client->applications();
$res = $applicationsManagementClient->deleteResource(APP_ID, 'code');
```

#### Return data

```json
true
```

## Get application access control policies

ApplicationsManagementClient->getAccessPolicies(string $appId, array $options = [])

#### parameter

- `appId` \<string\> application ID;
- `options` \<array\> Configuration parameters;
- `options['page']` \<string\> Data starting page number , the default is 1 ;
- `options['limit']` \<string\> The number per page, the default is 10;

#### Example

```php
$client = new ManagementClient('userPoolId', 'userPoolSecret');

$applicationsManagementClient = $client->applications();
$res = $applicationsManagementClient->getAccessPolicies(APP_ID, [
    'page' => 1,
    'limit' => 10
]);
```

#### Sample data

```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "list": [
      {
        "assignedAt": "2021-04-10T10:24:50.107Z",
        "inheritByChildren": null,
        "enabled": true,
        "policyId": "60716621b0aef91d6bc11c32",
        "code": "ApplicationLoginDeny:lSZlqZL8NP",
        "policy": {
          // ------
        },
        "targetType": "USER",
        "targetIdentifier": "606fd22265371f55fdb1bfad",
        "target": {
          // ----
        },
        "namespace": "5f97fb40d352ecf69ffe6d98"
      },
      {
        "assignedAt": "2021-04-10T08:47:30.066Z",
        "inheritByChildren": null,
        "enabled": true,
        "policyId": "6071662188f47914f51cd284",
        "code": "ApplicationLoginAccess:6aRgXOlfO",
        "policy": {
          // ---
        },
        "targetType": "USER",
        "targetIdentifier": "5fa42fbe8ae63f8e96a68b33",
        "target": {
          // ----
        },
        "namespace": "5f97fb40d352ecf69ffe6d98"
      }
    ],
    "totalCount": 2
  }
}
```

## Enable application access control policy

ApplicationsManagementClient->enableAccessPolicy(string $appId, array $options)

#### parameter

- `appId` \<string\> application ID
- `options` \<array\> Configuration parameters;
- `options['targetType']` \<string\> Main type, optional value `USER`、`ROLE`、`ORG`、`GROUP`, meaning the user, role, organizational node, user groups;
- `options['targetIdentifiers']` \<string\> main body id;
- `options['inheritByChildren']` \<string\> Whether the child node is inherited, only when the `targetType` = `ORG` is optional.

#### Example

```php
$client = new ManagementClient('userPoolId', 'userPoolSecret');

$applicationsManagementClient = $client->applications();
$res = $applicationsManagementClient->enableAccessPolicy(APP_ID, [
    'targetType' => 'ROLE',
    'targetIdentifiers' => [ROLE_ID],
    'inheritByChildren' => null
]);
```

#### Sample data

```json
{
  "code": 200,
  "message": "启用应用访问控制策略成功"
}
```

## Deactivate application access control policies

ApplicationsManagementClient->disableAccessPolicy(string $appId, array $options)

Deactivate an access control policy.

#### parameter

- `appId` \<string\> Application ID
- `options` \<array\> Configuration parameters;
- `options['targetType']` \<string\> Main type, optional value `USER`、`ROLE`、`ORG`、`GROUP`, Meaning is user, role, organizational node, user grouping;
- `options['targetIdentifiers']` \<string\> main body id;
- `options['inheritByChildren']` \<string\> Whether the child node is inherited, only when the `targetType` = `ORG` is optional.

#### Example

```php
$client = new ManagementClient('userPoolId', 'userPoolSecret');

$applicationsManagementClient = $client->applications();
$res = $applicationsManagementClient->disableAccessPolicy(APP_ID, [
    'targetType' => 'ROLE',
    'targetIdentifiers' => [ROLE_ID],
    'inheritByChildren' => null
]);
```

#### Sample data

```json
{
  "code": 200,
  "message": "Deactivate application access control policies success"
}
```

## Delete application access control policy

ApplicationsManagementClient->deleteAccessPolicy(string $appId, array $options)

Access to delete an application control policy .

#### parameter

- `appId` \<string\> application ID
- `options` \<array\> Configuration parameters;
- `options['targetType']` \<string\> Main type, optional value`USER`、`ROLE`、`ORG`、`GROUP`，Meaning is user, role, organizational node, user grouping;
- `options['targetIdentifiers']` \<string\> main body id;
- `options['inheritByChildren']` \<string\> Whether the child node is inherited, only when the `targetType` = `ORG` is optional.

#### Example

```php
$client = new ManagementClient('userPoolId', 'userPoolSecret');

$applicationsManagementClient = $client->applications();
$res = $applicationsManagementClient->deleteAccessPolicy(APP_ID, [
    'targetType' => 'ROLE',
    'targetIdentifiers' => [ROLE_ID],
    'inheritByChildren' => null
]);
```

#### Sample data

```json
{
  "code": 200,
  "message": "Delete application access control policies success"
}
```

## Configure「Allow the body（user , role , group , organization node）access applications」control policy

ApplicationsManagementClient->allowAccess(string $appId, array $options)

Configure「Allow the body（user , role , group , organization node）access applications」control policy

#### parameter

- `appId` \<string\> Application ID
- `options` \<array\> Configuration parameters;
- `options['targetType']` \<string\> Main type, optional value `USER`、`ROLE`、`ORG`、`GROUP`, Meaning the user, role, organizational node, user grouping;
- `options['targetIdentifiers']` \<string\> main body id;
- `options['inheritByChildren']` \<string\> Whether the child node is inherited, only `targetType` = `ORG` , when effective , optional .

#### Example

```php
$client = new ManagementClient('userPoolId', 'userPoolSecret');

$applicationsManagementClient = $client->applications();
$res = $applicationsManagementClient->allowAccess(APP_ID, [
    'targetType' => 'ROLE',
    'targetIdentifiers' => [ROLE_ID],
    'inheritByChildren' => null
]);
```

#### Sample data

```json
{
  "code": 200,
  "message": "Allowing the body to access the application policy configuration in effect"
}
```

## Configure the control policy of「Rejecting the subject（user, role, grouping, organization node）access application」

ApplicationsManagementClient->denyAccess(string $appId, array $options)

Configure the control policy of「Rejecting the subject（user, role, grouping, organization node）access application」

#### parameter

- `appId` \<string\> Application ID
- `options` \<array\> Configuration parameters;
- `options['targetType']` \<string\> Main type, optional value `USER`、`ROLE`、`ORG`、`GROUP`, Meaning the user, role, organizational node, user groups;
- `options['targetIdentifiers']` \<string\> main body id;
- `options['inheritByChildren']` \<string\> Whether the child node is inherited, only when the `targetType` = `ORG` is optional.

#### Example

```php
$client = new ManagementClient('userPoolId', 'userPoolSecret');

$applicationsManagementClient = $client->applications();
$res = $applicationsManagementClient->denyAccess(APP_ID, [
    'targetType' => 'ROLE',
    'targetIdentifiers' => [ROLE_ID],
    'inheritByChildren' => null
]);
```

#### Sample data

```json
{
  "code": 200,
  "message": "Refused access to the main application policy configuration in effect"
}
```

## Changing the default application access policy (default to reject all user access applications, the default allows all users to access applications)

ApplicationsManagementClient->updateDefaultAccessPolicy(string $appId, string $defaultStrategy)

Modify the default application access policies : default deny all users access to the application , the default allows all users access applications

#### parameter

- `appId` \<string\> Application ID
- `defaultStrategy` \<string\> Optional value `ALLOW_ALL`、`DENY_ALL`, meaning the default allow all users to log application , the default deny all users who log application ;

#### Example

```php
$client = new ManagementClient('userPoolId', 'userPoolSecret');

$applicationsManagementClient = $client->applications();
$res = $applicationsManagementClient->updateDefaultAccessPolicy(APP_ID, 'DENY_ALL');
```

#### Sample data

```json
{
  "code": 200,
  "message": "Updates successfully applied !",
  "data": {
    "qrcodeScanning": {
      "redirect": false,
      "interval": 1500
    },
    "id": "5f97fb40d352ecf69ffe6d98",
    "createdAt": "2020-10-27T10:49:36.817Z",
    "updatedAt": "2021-04-10T10:27:11.114Z",
    "userPoolId": "5f88506c81cd279930195660",
    "protocol": "oidc",
    "isOfficial": false,
    "isDeleted": false,
    "isDefault": false,
    "name": "oo",
    "description": null,
    "identifier": "okokiohutuyfrtd",
    "jwks": {
      // ----
    },
    // ----
    "permissionStrategy": {
      "enabled": true,
      "defaultStrategy": "DENY_ALL",
      "allowPolicyId": "6071662188f47914f51cd284",
      "denyPolicyId": "60716621b0aef91d6bc11c32"
    }
  }
}
```

## Create a role in the application

ApplicationsManagementClient->createRole(string $appId, array $options)

Create a role , you can specify different rights groups .

#### parameter

- `appId` \<string\> Application ID
- `options` \<array\> Configuration information
- `options['code']` \<string\> Roles unique identifier
- `options['description']` \<string\> describe

#### Example

```php
$appManageClient->createRole(APP_ID, [
  'code' => 'CODE',
  'description' => 'DESCRIPTION',
]);
```

<!-- #### return value -->

## Role in Removing applications

ApplicationsManagementClient->deleteRole(string $appId, string $code)

Delete role

#### parameter

- `appId` \<string\> application ID
- `code` \<string\> Role unique marker

#### Example

```php
$appManageClient->deleteRole(APP_ID, 'rolea');
```

<!-- #### return value -->

## Batch delete roles in the application

ApplicationsManagementClient->deleteRoles(string $appId, array $codes)

Batch delete roles in the application

- `appId` \<string\> application ID
- `codes` \<string[]\> Role unique marker array

#### Example

```php
$appManageClient->deleteRole(APP_ID, ['CODE_1', 'CODE_2']);
```

<!-- #### return value -->

## Role in modifying the application

ApplicationsManagementClient->updateRole(string $appId, array $options)

Modify roles

#### parameter

- `appId` \<string\> Application ID
- `options` \<array\> Configuration information
- `options['code']` \<string\> Role unique marker
- `options['description']` \<string\> Description
- `options['newCode']` \<string\> A new unique identifier

#### Example

```php
$appManageClient->updateRole(APP_ID, [ 'newCode' => 'newcode' ]);
```

<!-- #### return value -->

## Gets the role details in the application

ApplicationsManagementClient->findRole(string $appId, string $code)

Gets the role details in the application .

#### parameter

- `appId` \<string\> Application ID
- `code` \<string\> Role unique marker

#### Example

```php
$appManageClient->findRole(APP_ID, CODE);
```

<!-- #### return value -->

## Get list of roles in the application

ApplicationsManagementClient->getRoles(string $appId, array $options = [])

Get list of roles in the application .

#### parameter

- `appId` \<string\> Application ID
- `options` \<array\> Alternatively , the configuration information
- `options.page` \<number\> The default value is the number of pages : `1` .
- `options.limit` \<number\> The default value is the number of page : `10` .

#### Example

```php
$appManageClient->getRoles(APP_ID, [
  'page' => 1,
  'limit' => 10,
])
```

<!-- #### return value -->

## Users get a list of applications under the role of

ApplicationsManagementClient->getUsersByRoleCode(string $appId, string $code)

Users get a list of applications under the role.

#### parameter

- `appId` \<string\> Application ID
- `code` \<string\> Role unique marker

#### Example

```php
$appManageClient->getUsersByRoleCode(APP_ID, CODE);
```

<!-- #### return value -->

## Role in the application to add users

ApplicationsManagementClient->addUsersToRole(string $appId, string $code, array \$userIds)

Adding a user role in the application .

#### parameter

- `appId` \<string\> Application ID
- `code` \<string\> Role unique marker
- `userIds` \<string[]\> User ID list

#### Example

```php
$appManageClient->addUsersToRole(APP_ID, CODE, [
  USER_ID_1,
  USER_ID_2,
]);
```

<!-- #### return value -->

## Role in the removal of user applications

ApplicationsManagementClient->removeUsersFromRole(string $appId, string $code, array userIds)

Role in the application to remove the user .

#### parameter

- `appId` \<string\> Application ID
- `code` \<string\> Role unique marker
- `userIds` \<string[]\>User ID list

#### Example

```php
$appManageClient->removeUsersFromRole(APP_ID, CODE, [
  USER_ID_1,
  USER_ID_2,
]);
```

<!-- #### return value -->

## Get a list of all application resources authorized under Roles

ApplicationsManagementClient->listAuthorizedResourcesByRole(string $appId, string $code, string \$resourceType = '')

Get a list of all the resources under application roles are authorized .

#### parameter

- `appId` \<string\> Application ID
- `code` \<string\> Role code;
- `resourceType` \<string\> Alternatively , resource type, default will return all rights to resources , the existing resource types are as follows :
  - `DATA`: type of data;
  - `API`: API type data ;
  - `MENU`: Menu types of data ;
  - `BUTTON`: Button type data.

#### Example

```php
use Authing\Types\ResourceType;

$appManageClient->listAuthorizedResourcesByRole(
  APP_ID,
  CODE,
  ResourceType::BUTTON
);
```

#### Sample data

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

## Creating a Registration Agreement

ApplicationsManagementClient->createAgreement(string $appId, array $agreement)

Creating a Registration Agreement

#### parameter

- `appId` \<string\> Application ID
- `agreement` \<array\> Registration protocol configuration;
  - `agreement['title']`: The protocol title can contain HTML A tags;
  - `agreement['required']`: Whether you must check the consent to allow registration, default is true;
  - `agreement['lang']`: Protocol Title Language, optional zh-CN, en-US, default is zh-CN, which will be displayed according to the interface language display protocol in the hosted login page;

#### Example

```php
$appManageClient->createAgreement(APP_ID, [
  'title' =>
    'I agreement this <a href="https://example.com/policy" target="_blank">policy</a>',
  'required' => true,
]);
```

#### Sample data

```json
{
  "userPoolId": "607543c19f711c9b91fa9400",
  "appId": "607543c1ec30828efb065adb",
  "title": "I agreement this <a href=\"https://example.com/policy\" target=\"_blank\">policy</a>",
  "lang": "zh-CN",
  "required": true,
  "order": 6,
  "id": 148
}
```

## Modify registration protocol

ApplicationsManagementClient->modifyAgreement(string $appId, string $agreementId, array \$updates)

Modify registration protocol

#### parameter

- `appId` \<string\> Application ID
- `agreementId` \<number\> Protocol ID
- `updates` \<array\> To update the data;

  - `updates['title']` \<string\> The protocol title can contain HTML A tags;
  - `updates['required']` \<string\> Whether you must check the consent to allow registration, default is true;
  - `updates['lang']`\<string\> Protocol Title Language, optional zh-CN, eN-US, default is zH-CN, which will be displayed according to the interface language display protocol in the hosted login page;

#### Example

```php
$appManageClient->modifyAgreement(APP_ID, AGREEMENT_ID, [
  'required' => false,
]);
```

#### Sample data

```json
{
  "userPoolId": "607543c19f711c9b91fa9400",
  "appId": "607543c1ec30828efb065adb",
  "title": "I agreement this <a href=\"https://example.com/policy\" target=\"_blank\">policy</a>",
  "lang": "zh-CN",
  "required": true,
  "order": 6,
  "id": 148
}
```

## Get a list of registration protocols

ApplicationsManagementClient->listAgreement(string \$appId)

Get a list of registration protocols

#### parameter

- `appId` \<string\> Application ID

#### Example

```php
$appManageClient->listAgreement(APP_ID);
```

#### Sample data

```json
[
  {
    "userPoolId": "607543c19f711c9b91fa9400",
    "appId": "607543c1ec30828efb065adb",
    "title": "I agreement this <a href=\"https://example.com/policy\" target=\"_blank\">policy</a>",
    "lang": "zh-CN",
    "required": true,
    "order": 6,
    "id": 148
  }
]
```

## Delete registration protocol

ApplicationsManagementClient->deleteAgreement(string $appId, string $agreementId)

Delete registration protocol

#### parameter

- `appId` \<string\> Application ID
- `agreementId` \<number\> Protocol ID

#### Example

```php
$appManageClient->deleteAgreement(APP_ID, AGREEMENT_ID);
```

#### Sample data

```json
true
```

## Registration protocol sort

ApplicationsManagementClient->sortAgreement(string appId, array order)

Registration protocol sort

#### parameter

- `appId` \<string\> Application ID
- `order` \<array\> Apply all the ID lists of all protocols, arrange them in order required

#### Example

```php
$appManageClient->sortAgreement(APP_ID, [
  AGREEMENT_ID1,
  AGREEMENT_ID2,
  AGREEMENT_ID3,
]);
```

#### Sample data

```js
true
```

## View logged in user

ApplicationsManagementClient->activeUsers(string $appId, int $page = 1, int \$limit = 10)

View the logged in user

#### parameter

- `appId` \<string\> Application ID
- `page` \<number\> Page serial number, default is `1`.
- `limit` \<number\> The number of times returned per page, the default is `10`

#### Example

```php
$appManageClient->activeUsers(APP_ID, 1, 10);
```

<!-- #### Sample data -->

## Refresh application key

ApplicationsManagementClient->refreshApplicationSecret(string \$appId)

Refresh application key

#### parameter

- `appId` \<string\> Application ID

#### Example

```php
$appManageClient->refreshApplicationSecret(APP_ID);
```

<!-- #### Sample data -->
