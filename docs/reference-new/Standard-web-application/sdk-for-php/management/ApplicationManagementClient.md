---
meta:
  - name: description
    content: 管理应用
---

# 管理应用

<LastUpdated/>

此模块主要用来管理应用相关操作。

请使用以下方式使用该模块：

```php
$managementClient = new ManagementClient('userPoolId', 'secret');
$managementClient->requestToken();
$applicationsClient = $managementClient->applications();
$list = $applicationsClient->list(['page' => 2, 'limit' => 10]); // 获取应用列表

$app = $applicationsClient->findById('5f97fb40d352ecf69ffe6d98'); // 通过 id 查找应用

```

## 创建应用

ApplicationsManagementClient->create(array $params)

在用户池中创建一个应用

#### 参数

- `params` \<array\> 参数数组
- `params['name']` \<string\> 应用名称。
- `params['identifier']` \<string\> 应用唯一标识。
- `params['redirectUris']` \<string\> 跳转 url。
- `params['logo']` \<string\> 应用 logo，选填。

#### 示例

```php
$res = $appManageClient->create([
    'name' => 'testname',
    'identifier' =>  ' only one ',
    'redirectUris' => 'http://authing.cn',
    'logo' => 'https: //files.authing.co/authing-console/authing-logo-new.svg'
]);

```

<!-- #### 返回值 -->

#### 示例数据

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

## 删除应用

ApplicationsManagementClient->delete(string $appId)

在用户池中删除一个应用

#### 参数

- `appId` \<string\> appId

#### 示例

```php
$res = $appManageClient->delete('606dd67c164539e1c90f4d83');

```

#### 示例数据

```json
true
```

## 获取应用列表

ApplicationsManagementClient->list(array $params = [ 'page' => 1,'limit' => 10 ])

获取应用列表相关信息

#### 参数

- `params` \<array\> 参数数组
- `params['page']` \<number\> 分页序号, 默认为 `1`。
- `params['limit']` \<number\> 每页返回的个数, 默认为 `10`。

#### 示例

```php
$managementClient = new ManagementClient('userPoolId', 'secret');

// 获取应用管理器
$applications = $managementClient->applications();

$list = $applications->list(['page' => 2, 'limit' => 10]);

```

#### 示例数据

```json
{
  "code": 200,
  "message": "获取列表成功",
  "data": {
    "list": [],
    "totalCount": 1
  }
}
```

## 获取应用详情

ApplicationsManagementClient->findById(string $id)

#### 参数

- `id` \<string\> 应用 id

#### 示例

```php
// 获取应用管理器
$_client = new ManagementClient('userPoolId', 'secret');
$_client->requestToken();

$applications = $_client->applications();

$app = $applications->findById('5f97fb40d352ecf69ffe6d98');
// 通过 code 是否为 200 判断操作是否成功
```

#### 示例数据

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

## 获取资源列表

ApplicationsManagementClient->listResources(string $appId, array $options = [])

根据筛选条件，查询用户池下的资源列表。

#### 参数

- `appId` \<string\> 应用 ID
- `options` \<array\> 可选，筛选条件对象
- `options['type']` \<string\> 资源类型，可选值为 `DATA`、`API`、`MENU`、`UI`、`BUTTON`
- `options['page']` \<string\> 分页，获取第几页，默认从 1 开始
- `options['limit']` \<string\> 每页条目数量

#### 示例

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

#### 返回数据

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

## 创建资源

ApplicationsManagementClient->createResource(string $appId, array $options)

创建一个资源。

#### 参数

- `appId` \<string\> 应用 ID
- `options` \<array\> 资源信息对象
- `options['code']` \<string\> 资源标识符，不可使用值 `userpool`、`user`、`application`、`role`、`group`、`org`、`*`、`api`、`resource-namespace`、`custom-resource`
- `options['type']` \<string\> 资源类型，可选值为 `DATA`、`API`、`MENU`、`UI`、`BUTTON`
- `options['actions']` \<Array<{ name: string, description: string }>\> 资源操作对象数组。其中 name 为操作名称，填写一个**动词**，description 为操作描述，填写描述信息
- `options['description']` \<string\> 资源描述信息
- `options['apiIdentifier']` \<string\> 选填，API 资源 URL 地址，当 type 为 API 时此字段必填

#### 示例

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

#### 返回数据

```json
{
  "userPoolId": "600a8f29cead8fc0127f9da6",
  "code": "book",
  "actions": [
    {
      "name": "book:write",
      "description": "图书写入操作"
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


## 批量创建资源

ApplicationsManagementClient->createResourceBatch(string $appId, array $resources)

在指定应用中一次创建多个资源。

#### 参数

- `appId` \<string\> 应用 ID
- `resources` \<resource []\> 资源信息对象
- `resource['code']` \<string\> 资源标识符
- `resource['namespace']` \<string\> 权限分组命名空间
- `resource['type']` \<string\> 资源类型，可选值为 `DATA`、`API`、`MENU`、`UI`、`BUTTON`
- `resource['actions']` \<Array<{ name: string, description: string }>\> 资源操作对象数组。其中 name 为操作名称，填写一个**动词**，description 为操作描述，填写描述信息
- `resource['description']` \<string\> 资源描述信息
- `resource['nameSpace']` \<string\> 命名空间 code

#### 示例

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

#### 返回数据

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
        "description": "这是一段描述",
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
        "description": "这是一段描述",
        "namespaceId": 32638,
        "createdAt": "2021-06-01T03:55:24.872Z",
        "updatedAt": "2021-06-01T03:55:24.872Z",
        "id": "60b5afac1ebd020d341beac1",
        "apiIdentifier": null
    }
]
```


## 更新资源

ApplicationsManagementClient->updateResource(string $appId, array $options)

更新一个资源。

#### 参数

- `appId` \<string\> 应用 ID
- `options` \<array\> 资源信息对象
- `options['code']` \<string\> 资源标识符
- `options['type']` \<string\> 资源类型，可选值为 `DATA`、`API`、`MENU`、`UI`、`BUTTON`
- `options['actions']` \<Array<{ name: string, description: string }>\> 资源操作对象数组。其中 name 为操作名称，填写一个**动词**，description 为操作描述，填写描述信息
- `options['description']` \<string\> 资源描述信息
- `options['apiIdentifier']` \<string\> 选填，API 资源 URL 地址，当 type 为 API 时此字段必填

#### 示例

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

#### 返回数据

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
      "description": "图书写入操作2"
    },
    {
      "name": "book:read",
      "description": "图书读取操作2"
    }
  ],
  "type": "DATA",
  "description": "新的描述",
  "namespaceId": 22997,
  "apiIdentifier": null
}
```

## 删除资源

ApplicationsManagementClient->deleteResource(string $appId, string $code)

删除一个资源。

#### 参数

- `appId` \<string\> 应用 ID
- `code` \<string\> 资源标识符

#### 示例

```php
$client = new ManagementClient('userPoolId', 'userPoolSecret');

$applicationsManagementClient = $client->applications();
$res = $applicationsManagementClient->deleteResource(APP_ID, 'code');
```

#### 返回数据

```json
true
```

## 获取应用访问控制策略

ApplicationsManagementClient->getAccessPolicies(string $appId, array $options = [])

#### 参数

- `appId` \<string\> 应用 ID
- `options` \<array\> 配置参数;
- `options['page']` \<string\> 数据开始页码， 默认为 1;
- `options['limit']` \<string\> 每页数目，默认为 10;

#### 示例

```php
$client = new ManagementClient('userPoolId', 'userPoolSecret');

$applicationsManagementClient = $client->applications();
$res = $applicationsManagementClient->getAccessPolicies(APP_ID, [
    'page' => 1,
    'limit' => 10
]);
```

#### 示例数据

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
        ]
        "totalCount": 2
    }
}
```

## 启用应用访问控制策略

ApplicationsManagementClient->enableAccessPolicy(string $appId, array $options)

#### 参数

- `appId` \<string\> 应用 ID
- `options` \<array\> 配置参数;
- `options['targetType']` \<string\> 主体类型，可选值为 `USER`、`ROLE`、`ORG`、`GROUP`，含义为用户、角色、组织机构节点、用户分组;
- `options['targetIdentifiers']` \<string\> 主体 id;
- `options['inheritByChildren']` \<string\> 子节点是否继承，仅对 `targetType` = `ORG` 时有效， 可选。

#### 示例

```php
$client = new ManagementClient('userPoolId', 'userPoolSecret');

$applicationsManagementClient = $client->applications();
$res = $applicationsManagementClient->enableAccessPolicy(APP_ID, [
    'targetType' => 'ROLE',
    'targetIdentifiers' => [ROLE_ID],
    'inheritByChildren' => null
]);
```

#### 示例数据

```json
{
  "code": 200,
  "message": "启用应用访问控制策略成功"
}
```

## 停用应用访问控制策略

ApplicationsManagementClient->disableAccessPolicy(string $appId, array $options)

停用一个应用的访问控制策略。

#### 参数

- `appId` \<string\> 应用 ID
- `options` \<array\> 配置参数;
- `options['targetType']` \<string\> 主体类型，可选值为 `USER`、`ROLE`、`ORG`、`GROUP`，含义为用户、角色、组织机构节点、用户分组;
- `options['targetIdentifiers']` \<string\> 主体 id;
- `options['inheritByChildren']` \<string\> 子节点是否继承，仅对 `targetType` = `ORG` 时有效， 可选。

#### 示例

```php
$client = new ManagementClient('userPoolId', 'userPoolSecret');

$applicationsManagementClient = $client->applications();
$res = $applicationsManagementClient->disableAccessPolicy(APP_ID, [
    'targetType' => 'ROLE',
    'targetIdentifiers' => [ROLE_ID],
    'inheritByChildren' => null
]);
```

#### 示例数据

```json
{
  "code": 200,
  "message": "停用应用访问控制策略成功"
}
```

## 删除应用访问控制策略

ApplicationsManagementClient->deleteAccessPolicy(string $appId, array $options)

删除一个应用的访问控制策略。

#### 参数

- `appId` \<string\> 应用 ID
- `options` \<array\> 配置参数;
- `options['targetType']` \<string\> 主体类型，可选值为 `USER`、`ROLE`、`ORG`、`GROUP`，含义为用户、角色、组织机构节点、用户分组;
- `options['targetIdentifiers']` \<string\> 主体 id;
- `options['inheritByChildren']` \<string\> 子节点是否继承，仅对 `targetType` = `ORG` 时有效， 可选。

#### 示例

```php
$client = new ManagementClient('userPoolId', 'userPoolSecret');

$applicationsManagementClient = $client->applications();
$res = $applicationsManagementClient->deleteAccessPolicy(APP_ID, [
    'targetType' => 'ROLE',
    'targetIdentifiers' => [ROLE_ID],
    'inheritByChildren' => null
]);
```

#### 示例数据

```json
{
  "code": 200,
  "message": "删除应用访问控制策略成功"
}
```

## 配置「允许主体（用户、角色、分组、组织机构节点）访问应用」的控制策略

ApplicationsManagementClient->allowAccess(string $appId, array $options)

配置「允许主体（用户、角色、分组、组织机构节点）访问应用」的控制策略。

#### 参数

- `appId` \<string\> 应用 ID
- `options` \<array\> 配置参数;
- `options['targetType']` \<string\> 主体类型，可选值为 `USER`、`ROLE`、`ORG`、`GROUP`，含义为用户、角色、组织机构节点、用户分组;
- `options['targetIdentifiers']` \<string\> 主体 id;
- `options['inheritByChildren']` \<string\> 子节点是否继承，仅对 `targetType` = `ORG` 时有效， 可选。

#### 示例

```php
$client = new ManagementClient('userPoolId', 'userPoolSecret');

$applicationsManagementClient = $client->applications();
$res = $applicationsManagementClient->allowAccess(APP_ID, [
    'targetType' => 'ROLE',
    'targetIdentifiers' => [ROLE_ID],
    'inheritByChildren' => null
]);
```

#### 示例数据

```json
{
  "code": 200,
  "message": "允许主体访问应用的策略配置已生效"
}
```

## 配置「拒绝主体（用户、角色、分组、组织机构节点）访问应用」的控制策略

ApplicationsManagementClient->denyAccess(string $appId, array $options)

配置「拒绝主体（用户、角色、分组、组织机构节点）访问应用」的控制策略。

#### 参数

- `appId` \<string\> 应用 ID
- `options` \<array\> 配置参数;
- `options['targetType']` \<string\> 主体类型，可选值为 `USER`、`ROLE`、`ORG`、`GROUP`，含义为用户、角色、组织机构节点、用户分组;
- `options['targetIdentifiers']` \<string\> 主体 id;
- `options['inheritByChildren']` \<string\> 子节点是否继承，仅对 `targetType` = `ORG` 时有效， 可选。

#### 示例

```php
$client = new ManagementClient('userPoolId', 'userPoolSecret');

$applicationsManagementClient = $client->applications();
$res = $applicationsManagementClient->denyAccess(APP_ID, [
    'targetType' => 'ROLE',
    'targetIdentifiers' => [ROLE_ID],
    'inheritByChildren' => null
]);
```

#### 示例数据

```json
{
  "code": 200,
  "message": "拒绝主体访问应用的策略配置已生效"
}
```

## 更改默认应用访问策略（默认拒绝所有用户访问应用、默认允许所有用户访问应用）

ApplicationsManagementClient->updateDefaultAccessPolicy(string $appId, string $defaultStrategy)

修改默认应用访问策略：默认拒绝所有用户访问应用、默认允许所有用户访问应用

#### 参数

- `appId` \<string\> 应用 ID
- `defaultStrategy` \<string\> 可选值为 `ALLOW_ALL`、`DENY_ALL`，含义为默认允许所有用户登录应用、默认拒绝所有用户登录应用；

#### 示例

```php
$client = new ManagementClient('userPoolId', 'userPoolSecret');

$applicationsManagementClient = $client->applications();
$res = $applicationsManagementClient->updateDefaultAccessPolicy(APP_ID, 'DENY_ALL');
```

#### 示例数据

```json
{
  "code": 200,
  "message": "更新应用成功！",
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

## 在应用下创建角色

ApplicationsManagementClient->createRole(string $appId, array $options)

创建角色，可以指定不同的权限分组。

#### 参数

- `appId` \<string\> 应用 ID
- `options` \<array\> 配置信息
- `options['code']` \<string\> 角色唯一标志符
- `options['description']` \<string\> 描述

#### 示例

```php
$appManageClient->createRole(APP_ID, [
  'code' => 'CODE',
  'description' => 'DESCRIPTION',
]);
```

<!-- #### 返回值 -->

## 删除应用下的角色

ApplicationsManagementClient->deleteRole(string $appId, string $code)

删除角色

#### 参数

- `appId` \<string\> 应用 ID
- `code` \<string\> 角色唯一标志符

#### 示例

```php
$appManageClient->deleteRole(APP_ID, 'rolea');
```

<!-- #### 返回值 -->

## 批量删除应用下的角色

ApplicationsManagementClient->deleteRoles(string $appId, array $codes)

批量删除应用下的角色

- `appId` \<string\> 应用 ID
- `codes` \<string[]\> 角色唯一标志符 数组

#### 示例

```php
$appManageClient->deleteRole(APP_ID, ['CODE_1', 'CODE_2']);
```

<!-- #### 返回值 -->

## 修改应用下的角色

ApplicationsManagementClient->updateRole(string $appId, array $options)

修改角色

#### 参数

- `appId` \<string\> 应用 ID
- `options` \<array\> 配置信息
- `options['code']` \<string\> 角色唯一标志符
- `options['description']` \<string\> 描述信息
- `options['newCode']` \<string\> 新的唯一标志符

#### 示例

```php
$appManageClient->updateRole(APP_ID, [ 'newCode' => 'newcode' ]);
```

<!-- #### 返回值 -->

## 获取应用下的角色详情

ApplicationsManagementClient->findRole(string $appId, string $code)

获取应用下的角色详情。

#### 参数

- `appId` \<string\> 应用 ID
- `code` \<string\> 角色唯一标志符

#### 示例

```php
$appManageClient->findRole(APP_ID, CODE);
```

<!-- #### 返回值 -->

## 获取应用下的角色列表

ApplicationsManagementClient->getRoles(string $appId, array $options = [])

获取应用下的角色列表。

#### 参数

- `appId` \<string\> 应用 ID
- `options` \<array\> 可选，配置信息
- `options.page` \<number\> 页码数 默认值为 : `1`。
- `options.limit` \<number\> 每页个数 默认值为 : `10`。

#### 示例

```php
$appManageClient->getRoles(APP_ID, [
  'page' => 1,
  'limit' => 10,
])
```

<!-- #### 返回值 -->

## 获取应用下角色的用户列表

ApplicationsManagementClient->getUsersByRoleCode(string $appId, string $code)

获取应用下角色的用户列表。

#### 参数

- `appId` \<string\> 应用 ID
- `code` \<string\> 角色唯一标志符

#### 示例

```php
$appManageClient->getUsersByRoleCode(APP_ID, CODE);
```

<!-- #### 返回值 -->

## 应用下的角色添加用户

ApplicationsManagementClient->addUsersToRole(string $appId, string $code, array $userIds)

应用下的角色添加用户。

#### 参数

- `appId` \<string\> 应用 ID
- `code` \<string\> 角色唯一标志符
- `userIds` \<string[]\> 用户 ID 列表

#### 示例

```php
$appManageClient->addUsersToRole(APP_ID, CODE, [
  USER_ID_1,
  USER_ID_2,
]);
```

<!-- #### 返回值 -->

## 应用下的角色移除用户

ApplicationsManagementClient->removeUsersFromRole(string $appId, string $code, array userIds)

应用下的角色移除用户。

#### 参数

- `appId` \<string\> 应用 ID
- `code` \<string\> 角色唯一标志符
- `userIds` \<string[]\> 用户 ID 列表

#### 示例

```php
$appManageClient->removeUsersFromRole(APP_ID, CODE, [
  USER_ID_1,
  USER_ID_2,
]);
```

<!-- #### 返回值 -->

## 获取应用下角色被授权的所有资源列表

ApplicationsManagementClient->listAuthorizedResourcesByRole(string $appId, string $code, string $resourceType = '')

获取应用下角色被授权的所有资源列表。

#### 参数

- `appId` \<string\> 应用 ID
- `code` \<string\> 角色 code；
- `resourceType` \<string\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
  - `DATA`: 数据类型；
  - `API`: API 类型数据；
  - `MENU`: 菜单类型数据；
  - `BUTTON`: 按钮类型数据。

#### 示例

```php
use Authing\Types\ResourceType;

$appManageClient->listAuthorizedResourcesByRole(
  APP_ID,
  CODE,
  ResourceType::BUTTON
);
```

#### 示例数据

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

## 创建注册协议

ApplicationsManagementClient->createAgreement(string $appId, array $agreement)

创建一个注册协议

#### 参数

- `appId` \<string\> 应用 ID
- `agreement` \<array\> 注册协议配置；
  - `agreement['title']`: 协议标题，可以包含 HTML A 标签；
  - `agreement['required']`: 是否必须勾选同意才允许注册，默认为 true；
  - `agreement['lang']`: 协议标题语言，可选 zh-CN, en-US，默认为 zh-CN，在托管登录页面中会根据界面语言展示协议；

#### 示例

```php
$appManageClient->createAgreement(APP_ID, [
  'title' =>
    'I agreement this <a href="https://example.com/policy" target="_blank">policy</a>',
  'required' => true,
]);
```

#### 示例数据

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

## 修改注册协议

ApplicationsManagementClient->modifyAgreement(string $appId, string $agreementId, array $updates)

修改注册协议

#### 参数

- `appId` \<string\> 应用 ID
- `agreementId` \<number\> 协议 ID
- `updates` \<array\> 要更新的数据；
  - `updates['title']` \<string\>协议标题，可以包含 HTML A 标签；
  - `updates['required']` \<string\> 是否必须勾选同意才允许注册，默认为 true；
  - `updates['lang']`\<string\> 协议标题语言，可选 zh-CN, en-US，默认为 zh-CN，在托管登录页面中会根据界面语言展示协议；

#### 示例

```php
$appManageClient->modifyAgreement(APP_ID, AGREEMENT_ID, [
  'required' => false,
]);
```

#### 示例数据

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

## 获取注册协议列表

ApplicationsManagementClient->listAgreement(string $appId)

获取注册协议列表

#### 参数

- `appId` \<string\> 应用 ID

#### 示例

```php
$appManageClient->listAgreement(APP_ID);
```

#### 示例数据

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

## 删除注册协议

ApplicationsManagementClient->deleteAgreement(string $appId, string $agreementId)

删除注册协议

#### 参数

- `appId` \<string\> 应用 ID
- `agreementId` \<number\> 协议 ID

#### 示例

```php
$appManageClient->deleteAgreement(APP_ID, AGREEMENT_ID);
```

#### 示例数据

```json
true
```

## 注册协议排序

ApplicationsManagementClient->sortAgreement(string appId, array order)

注册协议排序

#### 参数

- `appId` \<string\> 应用 ID
- `order` \<array\> 应用下所有协议的 ID 列表，按需要的顺序排列

#### 示例

```php
$appManageClient->sortAgreement(APP_ID, [
  AGREEMENT_ID1,
  AGREEMENT_ID2,
  AGREEMENT_ID3,
]);
```

#### 示例数据

```js
true;
```

## 查看已登录用户

ApplicationsManagementClient->activeUsers(string $appId, int $page = 1, int $limit = 10)

查看应用下已登录用户

#### 参数

- `appId` \<string\> 应用 ID
- `page` \<number\> 分页序号, 默认为 `1`。
- `limit` \<number\> 每页返回的个数, 默认为 `10`。

#### 示例

```php
$appManageClient->activeUsers(APP_ID, 1, 10);
```

<!-- #### 示例数据 -->

## 刷新应用密钥

ApplicationsManagementClient->refreshApplicationSecret(string $appId)

刷新应用密钥

#### 参数

- `appId` \<string\> 应用 ID

#### 示例

```php
$appManageClient->refreshApplicationSecret(APP_ID);
```

<!-- #### 示例数据 -->
