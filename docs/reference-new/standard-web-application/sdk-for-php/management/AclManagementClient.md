---
meta:
  - name: description
    content: 管理权限、访问控制
---

# 管理资源与权限

<LastUpdated/>

{{$localeConfig.brandName}} 基于 PBAC（Policy Based Access Control，基于策略的访问控制）构建权限模型，
可以和 RBAC （Role Based Access Control，基于角色的访问控制）结合，实现非常灵活、精细化的权限控制。

此模块将此模型抽象成了两个方法: allow, isAllowed。

请使用以下方式使用该模块，而不要直接初始化该模块：

```php
use Authing\Mgmt\ManagementClient;

// 初始化资源与权限客户端
// 通过用户池 id 与 用户池密码进行初始化
// 通过回调函数进行初始化
// $management = new ManagementClient("AUTHING_USERPOOL_ID", "AUTHING_USERPOOL_SECRET");
$management = new ManagementClient(function ($options) {
    $options->userPoolId = 'AUTHING_USERPOOL_ID';
    $options->secret = 'AUTHING_USERPOOL_SECRET';
});


$aclManagement = $management->acls();
$aclManagement->allow // 允许某个用户对某个资源进行某个操作
$aclManagement->isAllowed // 判断某个用户是否对某个资源有某个操作权限
```

## 创建权限分组

AclManagementClient->createNamespace(string $code, string $name, string $description = '')

创建权限分组

#### 参数

- `code` \<string\> 权限分组唯一标识符
- `name` \<string\> 权限分组名
- `description` \<string\> 可选，权限分组描述

#### 示例

```php
$aclManagement->createNamespace('mycode', 'codename', 'ok');
```
#### 示例数据

```json
{
    "userPoolId": "5f819ffdaaf252c4df2c9266",
    "name": "codename",
    "code": "mycode",
    "description": "ok",
    "status": 1,
    "applicationId": null,
    "id": 32638
}
```

## 获取权限分组列表

AclManagementClient->listNamespaces(int $page = 1, int $limit = 10)

获取权限分组列表

#### 参数

- `page` \<number\> 页码，默认为 1
- `limit` \<number\> 每页个数，默认为 10

#### 示例

```php
$aclManagement->listNamespaces(1, 10);
```

<!-- #### 返回值 -->

#### 示例数据

```json
{
  "list": [
    {
      "appId": null,
      "appName": null,
      "name": "Test Namcepace",
      "code": "testNamesapce",
      "description": "This is a Test Namespace",
      "status": 1,
      "id": 38
    }
  ],
  "totalCount": 1
}
```

## 更新权限分组

AclManagementClient->updateNamespace(string $code, array $updates)

更新权限分组

#### 参数

- `code` \<string\> 权限分组 code
- `updates` \<array\> 需要更新的数据
- `updates['code']` \<string\> 可选，权限分组唯一标识符
- `updates['name']` \<string\> 可选，权限分组名称
- `updates['description']` \<string\> 可选，权限分组描述

#### 示例

```php
$aclManagement->updateNamespace('mycode', [
    'name' => 'new codename',
]);
```

<!-- #### 返回值 -->

#### 示例数据

```json
{
  "id": 38,
  "appId": null,
  "appName": null,
  "name": "new codename",
  "code": "testNamesapce",
  "description": "A New Name",
  "status": 1
}
```

## 删除权限分组

AclManagementClient->deleteNamespace(string $code)

删除权限分组

#### 参数

- `code` \<string\> 权限分组 CODE

#### 示例

```php
$aclManagement->deleteNamespace('mycode');
```

#### 示例数据

```json
true
```

## 获取资源列表

AclManagementClient->getResources(array $options = [])

根据筛选条件，查询用户池下的资源列表。

#### 参数

- `options` \<array\> 可选参数，筛选条件对象
- `options['namespaceCode']` \<string\> 权限分组命名空间
- `options['type']` \<string\> 资源类型，可选值为 `DATA`、`API`、`MENU`、`UI`、`BUTTON`
- `options['page']` \<string\> 分页，获取第几页，默认从 1 开始
- `options['limit']` \<string\> 每页条目数量

#### 示例

```php
$aclManagement->getResources([
    'namespace' => 'mycode',
    'type' => 'DATA',
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

AclManagementClient->createResource(array $options)

创建一个资源。

#### 参数

- `options` \<array\> 资源信息对象
- `options['code']` \<string\> 资源标识符，不可使用值 `userpool`、`user`、`application`、`role`、`group`、`org`、`*`、`api`、`resource-namespace`、`custom-resource`
- `options['namespace']` \<string\> 权限分组命名空间
- `options['type']` \<string\> 资源类型，可选值为 `DATA`、`API`、`MENU`、`UI`、`BUTTON`
- `options['actions']` \<Array<{ name: string, description: string }>\> 资源操作对象数组。其中 name 为操作名称，填写一个**动词**，description 为操作描述，填写描述信息
- `options['description']` \<string\> 资源描述信息
- `options['nameSpace']` \<string\> 命名空间 code

#### 示例

```php
$aclManagement->createResource([
    'code' => 'createResource',
    'actions' => [
        (object)[
            'name' => 'this is name',
            'description' => 'this is description'
        ]
    ],
    'namespace' => 'mycode'
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

AclManagementClient->createResourceBatch(array $resources)

一次创建多个资源。

#### 参数

- `resources` \<resource []\> 资源信息对象
- `resource['code']` \<string\> 资源标识符
- `resource['namespace']` \<string\> 权限分组命名空间
- `resource['type']` \<string\> 资源类型，可选值为 `DATA`、`API`、`MENU`、`UI`、`BUTTON`
- `resource['actions']` \<Array<{ name: string, description: string }>\> 资源操作对象数组。其中 name 为操作名称，填写一个**动词**，description 为操作描述，填写描述信息
- `resource['description']` \<string\> 资源描述信息
- `resource['nameSpace']` \<string\> 命名空间 code

#### 示例

```php
use Authing\Types\ResourceType;

$aclManagement->createResourceBatch([
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
        'namespace' => 'mycode'
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
        'namespace' => 'mycode'
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

AclManagementClient->updateResource(string $code, array $options)

更新一个资源。

#### 参数

- `code` \<string\> 资源标识符，不可使用值 `userpool`、`user`、`application`、`role`、`group`、`org`、`*`、`api`、`resource-namespace`、`custom-resource`
- `options` \<array\> 资源信息
- `options['namespace']` \<string\> 资源所在的权限分组标识
- `options['type']` \<string\> 资源类型，可选值为 `DATA`、`API`、`MENU`、`UI`、`BUTTON`
- `options['actions']` \<Array<{ name: string, description: string }>\> 资源操作对象数组。其中 name 为操作名称，填写一个**动词**，description 为操作描述，填写描述信息
- `options['description']` \<string\> 资源描述信息

#### 示例

```php
$aclManagement->updateResource('createResource', [
    'description' => '新的描述',
    'type' => 'DATA',
    'actions' => [
        (object)[
            'name' => 'write',
            'description' => 'new description'
        ],
        (object)[
            'name' => 'read',
            'description' => 'new description1'
        ],
    ],
    'namespace' => 'mycode'
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

## 将一个（类）资源授权给用户、角色、分组、组织机构，且可以分别指定不同的操作权限

AclManagementClient->authorizeResource(array $options)

将一个（类）资源授权给用户、角色、分组、组织机构。

#### 参数

- `options` \<array\> 资源信息
- `options['namespace']` \<string\> 资源所在的权限分组标识
- `options['resource']` \<string\> 资源
- `options['opts']` \<Array<{ targetType: string, targetIdentifier: string,actions:[] }>\>

#### 示例

```php
$AuthorizeResourceOpt = ['targetType'=>'USER','targetIdentifier'=>'614fd9ae42b192fc32823b10','actions'=>['aa','bb']];
$aclManagement->authorizeResource(
              ['namespace'=>'default',
             'resource'=>'test_createresource',
             'opts'=>$AuthorizeResourceOpt
             ]);
```

#### 返回数据

```json
{
  "message": "授权资源成功",
  "code": 200
}
```

## 添加编程访问账号

AclManagementClient->createProgrammaticAccessAccount(string $appId)

添加编程访问账号。

#### 参数

- `appId` \<string\> 应用 ID

#### 示例

```php
$aclManagement->createProgrammaticAccessAccount('appId');
```

#### 返回数据

```json
{
  "appId": "61319680ea8b30c9ca9ca071",
  "secret": "4c204c933d63c9cf868ffb763cd0c902",
  "tokenLifetime": 600,
  "createdAt": "2021-12-06T03:35:11.641Z",
  "updatedAt": "2021-12-06T03:35:11.641Z",
  "id": "61ad84efe13b59d7753665e8",
  "remarks": null,
  "userId": null,
  "enabled": true
}
```

## 删除编程访问账号

AclManagementClient->deleteProgrammaticAccessAccount(string $appId)

删除编程访问账号。

#### 参数

- `appId` \<string\> 应用 ID

#### 示例

```php
$aclManagement->deleteProgrammaticAccessAccount('appId');
```

#### 返回数据

```json
true
```

## 刷新编程访问账号秘钥

AclManagementClient->refreshProgrammaticAccessAccountSecret(string $appId)

删除编程访问账号。

#### 参数

- `appId` \<string\> 应用 ID

#### 示例

```php
$aclManagement->refreshProgrammaticAccessAccountSecret('appId');
```

#### 返回数据

```json
{
  "message": "修改编程访问账号成功",
  "code": 200
}
```

## 通过资源 CODE 获取资源

AclManagementClient->getResourceByCode(array $options)

通过资源 CODE 获取资源。

#### 参数

- `options['namespace']` \<string\> 资源所在的权限分组标识
- `options['code']` \<string\> 资源 CODE

#### 示例

```php
$aclManagement->getResourceByCode(['code'=>'code','namespace'=>'default']);
```

#### 返回数据

```json
{
  "id": "61ada8d33f92e5d5bc653893",
  "createdAt": "2021-12-06T06:08:19.585Z",
  "updatedAt": "2021-12-06T06:08:19.585Z",
  "userPoolId": "6131967faf2eb55a2b7cebcc",
  "code": "1703767348",
  "actions": [{
    "name": "1703767348",
    "description": "test_create_resource description"
  }],
  "type": "DATA",
  "description": "description",
  "namespaceId": 46303,
  "apiIdentifier": null
}
```

## 通过资源 ID 获取资源

AclManagementClient->getResourceById(array $options)

通过资源 CODE 获取资源。

#### 参数

- `options['id']` \<string\> 资源 ID

#### 示例

```php
$aclManagement->getResourceById(['id'=>'id']);
```

#### 返回数据

```json
{
  "id": "61ada9a0a3722feabbecef72",
  "createdAt": "2021-12-06T06:11:44.028Z",
  "updatedAt": "2021-12-06T06:11:44.028Z",
  "userPoolId": "6131967faf2eb55a2b7cebcc",
  "code": "1335197067",
  "actions": [{
    "name": "1335197067",
    "description": "test_create_resource description"
  }],
  "type": "DATA",
  "description": "description",
  "namespaceId": 46303,
  "apiIdentifier": null
}
```

## 获取编程访问账号列表

AclManagementClient->programmaticAccessAccountList(string $appId)

获取编程访问账号列表。

#### 参数

- `appId` \<string\> 应用 ID

#### 示例

```php
$aclManagement->programmaticAccessAccountList('appId');
```

#### 返回数据

```json
{
  "list": [{
    "id": "61ad84efe13b59d7753665e8",
    "createdAt": "2021-12-06T03:35:11.641Z",
    "updatedAt": "2021-12-06T03:35:11.641Z",
    "appId": "61319680ea8b30c9ca9ca071",
    "secret": "4c204c933d63c9cf868ffb763cd0c902",
    "remarks": null,
    "tokenLifetime": 600,
    "enabled": true,
    "userId": null
  }, {
    "id": "61ad84c6a9a11aad522fd3f3",
    "createdAt": "2021-12-06T03:34:30.383Z",
    "updatedAt": "2021-12-06T03:34:30.383Z",
    "appId": "61319680ea8b30c9ca9ca071",
    "secret": "9ee95adb41c5aa386284e27385e4d75a",
    "remarks": null,
    "tokenLifetime": 600,
    "enabled": true,
    "userId": null
  }, {
    "id": "61975b10c71d4c735404105a",
    "createdAt": "2021-11-19T08:06:40.191Z",
    "updatedAt": "2021-11-19T08:06:58.190Z",
    "appId": "61319680ea8b30c9ca9ca071",
    "secret": "60b105f584414823198c4845c99ac812",
    "remarks": null,
    "tokenLifetime": 600,
    "enabled": false,
    "userId": null
  }, {
    "id": "61975a347d81f8a11849fbc6",
    "createdAt": "2021-11-19T08:03:00.692Z",
    "updatedAt": "2021-11-19T08:04:23.637Z",
    "appId": "61319680ea8b30c9ca9ca071",
    "secret": "28f77e1ccd1e0fec87d831a78d1ec5fd",
    "remarks": null,
    "tokenLifetime": 600,
    "enabled": true,
    "userId": null
  }, {
    "id": "619757fe167549f3eae756a8",
    "createdAt": "2021-11-19T07:53:34.764Z",
    "updatedAt": "2021-11-19T07:53:34.764Z",
    "appId": "61319680ea8b30c9ca9ca071",
    "secret": "2ea309ca226e25c8ca2fd7f7ec64e86f",
    "remarks": null,
    "tokenLifetime": 600,
    "enabled": true,
    "userId": null
  }, {
    "id": "619757df66ecbc4d286f6e31",
    "createdAt": "2021-11-19T07:53:03.184Z",
    "updatedAt": "2021-11-19T07:54:52.349Z",
    "appId": "61319680ea8b30c9ca9ca071",
    "secret": "24aiw7frrb6afh3wxywy3ddakbae787h",
    "remarks": null,
    "tokenLifetime": 600,
    "enabled": true,
    "userId": null
  }],
  "totalCount": 6
}
```

## 删除资源

AclManagementClient->deleteResource(string $code, string $namespace)

更新一个资源。

#### 参数

- `code` \<string\> 资源标识符
- `namespace` \<string\> 资源所在的权限分组标识

#### 示例

```php
$aclManagement->deleteResource('createResource', 'mycode');
```

#### 返回数据

```json
true
```

## 允许某个用户对某个资源进行某个操作

AclManagementClient->allow(string $userId, string $resource, string $action)

允许某个用户对某个资源进行某个操作

#### 参数

- `userId` \<string\> 用户 ID
- `resource` \<string\> 资源名称, 必须为 \<resourceType\>:\<resourceId\> 格式或者为 _, 如 `_`,`books:123`,`books:\*`
- `action` \<string\> 操作名称，推荐使用 \<resourceType\>:\<actionName\> 的格式，如 `books:edit`, `books:list`

#### 示例

```php
$aclManagement->allow("USER_ID", "DATA:RESOURCE_ID", "5584:read");
```

#### 返回数据

```json
{
    "message": "授权成功！",
    "code": 200
}
```

## 判断某个用户是否对某个资源有某个操作权限

AclManagementClient->isAllowed(string $userId, string $resource, string $action, array $options = [])

判断某个用户是否对某个资源有某个操作权限

#### 参数

- `userId` \<string\> 用户 ID
- `resource` \<string\> 资源名称, 必须为 \<resourceType\>:\<resourceId\> 格式或者为 _, 如 `_`,`books:123`,`books:\*`
- `action` \<string\> 操作名称，推荐使用 \<resourceType\>:\<actionName\> 的格式，如 `books:edit`, `books:list`
- `options` \<array\> 其他选项，可选
  - `options['namespace']`: 资源所属权限分组 code

#### 示例

```php
$aclManagement->isAllowed("USER_ID", "DATA:RESOURCE_ID", "5584:read", [
    'namespace' => 'mycode'
]);
```
#### 返回数据

```json
true
```

<!-- ## 获取某个对象被授权的所有资源列表

AclManagementClient->listAuthorizedResources(string $targetType, string $targetIdentifier, string  $namespace, array opts = [])

> 获取某个对象（用户、角色、分组）被授权的所有资源。

#### 参数

- `targetType` \<string\> 目标对象类型，如 USER， ROLE；
- `targetIdentifier` \<string\> 目标对象唯一标识符；
- `namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)；
- `resourceType` \<string\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
  - `DATA`: 数据类型；
  - `API`: API 类型数据；
  - `MENU`: 菜单类型数据；
  - `BUTTON`: 按钮类型数据。

#### 示例

```php
use Authing\Mgmt\RolesManagementClient;
use Authing\Mgmt\AclManagementClient;
use Authing\Types\PolicyAssignmentTargetType;

$managementClient = new ManagementClient('USERPOOL_ID', 'SECRET');
$managementClient->requestToken();

$aclManagementClient = new AclManagementClient($managementClient);

$data = $aclManagementClient->listAuthorizedResources(
  PolicyAssignmentTargetType::USER,
  'user_id',
  'default'
);
```

#### 示例数据

- `type` 为资源类型；
- `code`: 资源描述符，如果是 `DATA` 类型资源，格式为 `resourceType:resourceId`，如 `books:*` 表示所有书籍，`books:1` 表示 ID 为 1 的书籍。
- `actions`: 用户被授权对该资源的操作。

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
``` -->

## 获取用户被授权的所有资源列表

UsersManagementClient->listAuthorizedResources(string $userId, string  $namespace, string $resourceType = '')

获取一个用户被授权的所有资源，用户被授权的所有资源里面包括从角色、分组、组织机构继承的资源。

#### 参数

- `userId` \<string\> 用户 ID；
- `namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)；
- `resourceType` \<string\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
  - `DATA`: 数据类型；
  - `API`: API 类型数据；
  - `MENU`: 菜单类型数据；
  - `BUTTON`: 按钮类型数据。

#### 示例

```php
use Authing\Types\ResourceType;

$userManagementClient = $management->users();

$res = $userManagementClient->listAuthorizedResources('USER_ID', 'NAMESPACE',ResourceType::DATA);
```

#### 示例数据

- `type` 为资源类型；
- `code`: 资源描述符，如果是 `DATA` 类型资源，格式为 `resourceType:resourceId`，如 `books:*` 表示所有书籍，`books:1` 表示 ID 为 1 的书籍。
- `actions`: 用户被授权对该资源的操作。

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

## 获取角色被授权的所有资源列表

RolesManagementClient->listAuthorizedResources(string $roleCode, string $namespace, string $resourceType = '')

获取某个角色被授权的所有资源。

#### 参数

- `roleCode` \<string\> 角色 code；
- `namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)；
- `resourceType` \<string\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
  - `DATA`: 数据类型；
  - `API`: API 类型数据；
  - `MENU`: 菜单类型数据；
  - `BUTTON`: 按钮类型数据。

#### 示例

```php
use Authing\Types\ResourceType;

$rolesManagementClient = $management->roles();

$res = $rolesManagementClient->listAuthorizedResources('ROLE_CODE', 'NAMESPACE', ResourceType::DATA);
```

#### 示例数据

- `type` 为资源类型；
- `code`: 资源描述符，如果是 `DATA` 类型资源，格式为 `resourceType:resourceId`，如 `books:*` 表示所有书籍，`books:1` 表示 ID 为 1 的书籍。
- `actions`: 用户被授权对该资源的操作。

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

## 获取分组被授权的所有资源列表

GroupsManagementClient->listAuthorizedResources(string $groupCode, string $namespace, string $resourceType = '')

获取某个分组被授权的所有资源。

#### 参数

- `groupCode` \<string\> 分组 code；
- `namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)；
- `resourceType` \<string\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
  - `DATA`: 数据类型；
  - `API`: API 类型数据；
  - `MENU`: 菜单类型数据；
  - `BUTTON`: 按钮类型数据。

#### 示例

```php
use Authing\Types\ResourceType;

$groupsManagementClient = $management->groups();
$res = $groupsManagementClient->listAuthorizedResources('GROUP_CODE', 'NAMESPACE', ResourceType::MENU);
```

#### 示例数据

- `type` 为资源类型；
- `code`: 资源描述符，如果是 `DATA` 类型资源，格式为 `resourceType:resourceId`，如 `books:*` 表示所有书籍，`books:1` 表示 ID 为 1 的书籍。
- `actions`: 用户被授权对该资源的操作。

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

## 获取部门被授权的所有资源列表

OrgManagementClient->listAuthorizedResourcesByNodeId(string $nodeId, string $namespace, string $resourceType = '')

获取一个部门被授权的所有资源。

#### 参数

- `nodeId` \<string\> 部门 id；
- `namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)
- `resourceType` \<string\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
  - `DATA`: 数据类型；
  - `API`: API 类型数据；
  - `MENU`: 菜单类型数据；
  - `BUTTON`: 按钮类型数据。

#### 示例

```php
use Authing\Types\ResourceType;

$orgsManagementClient = $management->orgs();
$res = $orgsManagementClient->listAuthorizedResourcesByNodeId(
    'NODE_ID',
    'NAMESPACE',
    ResourceType::MENU
);
```

#### 示例数据

- `type` 为资源类型；
- `code`: 资源描述符，如果是 `DATA` 类型资源，格式为 `resourceType:resourceId`，如 `books:*` 表示所有书籍，`books:1` 表示 ID 为 1 的书籍。
- `actions`: 用户被授权对该资源的操作。

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

## 获取具备某些资源操作权限的主体

AclManagementClient->getAuthorizedTargets(array $options)

传入权限分组、资源标识、资源类型、操作权限项、主体类型，返回具备资源操作权限的主体标识符。

#### 参数

- `options` \<array\> 筛选条件对象；
- `options['namespace']` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)
- `options['resourceType']` \<string\> 资源类型，现有资源类型如下：
  - `DATA`: 数据类型；
  - `API`: API 类型数据；
  - `MENU`: 菜单类型数据；
  - `BUTTON`: 按钮类型数据。
- `options['actions']` \<object\> 操作
  - `actions.op` \<string\>，可选值为 `AND`、`OR`，表示 list 中的操作关系是和还是或。
  - `actions.list` \<string[]\>，操作，例如 `['read', 'write']`
- `options['targetType']` \<string\>，主体类型，可选值为 `USER`、`ROLE`、`ORG`、`GROUP`，含义为用户、角色、组织机构节点、用户分组。
#### 示例

获取权限分组 6063f88dabb536e9a23a6c80 中，具备 DATA 类型资源 book 的 write 或 read 权限的用户。

```php
use Authing\Types\ResourceType;
use Authing\Types\AuthorizedTargetsActionsInput;
use Authing\Types\Operator;
use Authing\Types\PolicyAssignmentTargetType;

$res = $aclManagement->getAuthorizedTargets(
    [
        'namespace' => 'NAMESPACE',
        'resource' => 'RESOURCE',
        'resourceType' => ResourceType::MENU,
        'actions' => new AuthorizedTargetsActionsInput(Operator::OR, ['read']),
        'targetType' => PolicyAssignmentTargetType::USER
    ]
);
```

#### 示例数据

- `targetType` 为主体类型；
- `targetIdentifier`: 主体标识符，可能是用户 ID、角色 ID、组织结构节点 ID、用户分组 ID；
- `actions`: 用户被授权对该资源的操作；

```json
{
    "totalCount": 1,
    "list": [
        {
            "targetType": "USER",
            "targetIdentifier": "6063fcd01d0d2e39d4596904",
            "actions": [
                "write"
            ]
        }
    ]
}
```
