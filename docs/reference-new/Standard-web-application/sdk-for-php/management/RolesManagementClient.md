---
meta:
  - name: description
    content: 管理角色
---

# 管理角色

<LastUpdated/>

> 此模块用于管理 {{$localeConfig.brandName}} 角色，可以进行角色的增删改查、角色添加/删除用户、角色添加/删除策略 等操作。

请使用以下方式使用该模块：

```php
use Authing\Mgmt\ManagementClient;


// 初始化资源与权限客户端
// 通过用户池 id 与 用户池密码进行初始化
// $management = new ManagementClient("YOUR_USERPOOL_ID", "YOUR_USERPOOL_SECRET");
// 通过回调函数进行初始化
$management = new ManagementClient(function ($options) {
    $options->userPoolId = 'YOUR_USERPOOL_ID';
    $options->secret = 'YOUR_USERPOOL_SECRET';
});

$rolesManagementClient = $management->roles();
$rolesManagementClient->paginate // 获取角色列表
$rolesManagementClient->create   // 创建角色
$rolesManagementClient->delete // 删除角色
```

## 创建角色

RolesManagementClient->create(string $code, string $description = '', string $namespace = '')

创建角色

#### 参数

- `code` \<string\> 角色唯一标志符
- `description` \<string\> 描述
- `namespace` \<string\> 权限分组 code

#### 示例

```php
$rolesManagementClient->create("ROLE_CODE");
```

#### 示例数据

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

## 删除角色

RolesManagementClient->delete(string $code, string $namespace = null)

删除角色

#### 参数

- `code` \<string\> 角色唯一标志符
- `namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)；

#### 示例

```php
$rolesManagementClient->delete("ROLE_CODE");
```

#### 示例数据

```json
{
    "message": "delete role succeed",
    "code": 200
}
```

## 批量删除角色

RolesManagementClient->deleteMany(array $codeList, string $namespace = null)

批量删除角色

#### 参数

- `codeList` \<string[]\> 角色唯一标志符列表
- `namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)；

#### 示例

```php
$rolesManagementClient->deleteMany(
  [
    "ROLE_CODE_1",
    "ROLE_CODE_2",
  ]
);
```

#### 示例数据

```json
{
    "message": "delete role succeed",
    "code": 200
}
```

## 修改角色

RolesManagementClient->update(string $code, array $input)

修改角色

#### 参数

- `code` \<string\> 角色唯一标志符
- `input` \<array\>
- `input['description']` \<string\> 描述信息
- `input['newCode']` \<string\> 新的唯一标志符

#### 示例

```php
$rolesManagementClient->update("ROLE_CODE", [
  'description' => '新加的相关说明'
]);
```

#### 示例数据

```json
{
    "namespace": "default",
    "code": "test_role_code",
    "arn": "arn:cn:authing:5f819ffdaaf252c4df2c9266:role:6076a2f503bbc684184a7ed9",
    "description": "新加的相关说明",
    "createdAt": "2021-04-14T08:08:21+00:00",
    "updatedAt": "2021-05-22T07:18:44+00:00",
    "parent": null
}
```

## 获取角色详情

RolesManagementClient->detail(string $code, string $namespace = null)

获取角色详情

#### 参数

- `code` \<string\> 角色唯一标志符
- `namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)；

#### 示例

```php
$rolesManagementClient->detail("ROLE_CODE", 'NAMESPACE_CODE');
```

#### 示例数据

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

## 获取角色列表

RolesManagementClient->paginate(array $options = [])

获取角色列表

#### 参数

- `options` \<array\> 可选，筛选条件对象
- `options['namespace']` \<string\> 权限分组的 code
- `options['page']` \<string\> 页码数 默认值为 : `1`
- `options['limit']` \<string\> 每页个数 默认值为 : `10`

#### 示例

```php
$rolesManagementClient->paginate();
```

#### 示例数据

```json
{
    "totalCount": 2,
    "list": [
        {
            "namespace": "default",
            "code": "test-code",
            "arn": "arn:cn:authing:5f819ffdaaf252c4df2c9266:role:60a83b129a1bfb6ecc32a7c0",
            "description": "新加的相关说明",
            "createdAt": "2021-05-21T22:58:26+00:00",
            "updatedAt": "2021-05-21T23:10:47+00:00"
        },
        {
            "namespace": "default",
            "code": "test_role_code",
            "arn": "arn:cn:authing:5f819ffdaaf252c4df2c9266:role:6076a2f503bbc684184a7ed9",
            "description": "测试使用的 test_role_code",
            "createdAt": "2021-04-14T08:08:21+00:00",
            "updatedAt": "2021-04-14T08:08:21+00:00"
        }
    ]
}
```

## 获取用户列表

RolesManagementClient->listUsers(string $code, array $options = [])

获取用户列表

#### 参数

- `code` \<string\> 角色唯一标志符
- `options` \<array\> 可选，筛选条件对象
- `options['namespace']` \<string\> 权限分组的 code
- `options['page']` <number\> 页码数 默认值为 : `1`。
- `options['limit']` \<number\> 每页个数 默认值为 : `10`。
- `options['withCustomData']` \<boolean\> 是否获取自定义数据，默认为 false；如果设置为 true，将会在 `customData` 字段返回用户的所有自定义数据。

#### 示例

```php
$rolesManagementClient->listUsers("ROLE_CODE")
```

#### 示例数据

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
            "registerSource": [
                "import:manual"
            ],
            "photo": "https:\/\/files.authing.co\/authing-console\/default-user-avatar.png",
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

## 添加用户

RolesManagementClient->addUsers(string $code, array $userIds, string $namespace = '')

添加用户

#### 参数

- `code` \<string\> 角色唯一标志符
- `userIds` \<string[]\> 用户 ID 列表
- `namespace` \<string\> 权限分组的 code

#### 示例

```php
$rolesManagementClient->addUsers(
    "ROLE_CODE",
    [
        "USERID_1",
        "USERID_2"
    ]
);
```

#### 示例数据

```json
{
    "message": "授权角色成功",
    "code": 200
}
```

## 移除用户

RolesManagementClient->removeUsers(string $code, array $userIds, string $namespace = '')

移除用户

#### 参数

- `code` \<string\> 角色唯一标志符
- `userIds` \<string[]\> 用户 ID 列表
- `namespace` \<string\> 权限分组的 code

#### 示例

```php
$rolesManagementClient->removeUsers(
    "ROLE_CODE",
    [
        "USERID_1",
        "USERID_2"
    ]
);
```


#### 示例数据

```json
{
    "message": "撤销角色成功",
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
$rolesManagementClient->listAuthorizedResources(
    'ROLE_CODE',
    'NAMESPACE_CODE'
);
```

#### 示例数据

- `type` 为资源类型；
- `code`: 资源描述符，如果是 `DATA` 类型资源，格式为 `resourceType:resourceId`，如 `books:*` 表示所有书籍，`books:1` 表示 ID 为 1 的书籍。
- `actions`: 用户被授权对该资源的操作。

```json
{
    "list": [
        {
            "code": "test_resource:*",
            "type": "DATA",
            "actions": [
                "*"
            ]
        }
    ],
    "totalCount": 1
}
```


## 获取某个角色扩展字段列表

RolesManagementClient->getUdfValue(string $roleId)

获取某个角色扩展字段列表

#### 参数

- `roleId` \<string\> 角色 ID；

#### 示例

```php
$rolesManagementClient->getUdfValue('ROLE_ID');
```

<!-- #### 示例数据

```json
true
``` -->

## 获取某个角色某个扩展字段

RolesManagementClient->getSpecificUdfValue(string $roleId, string  $udfKey)

获取某个角色某个扩展字段

#### 参数

- `roleId` \<string\> 角色 ID；
- `udfKey` \<string\> 扩展字段 Key；

#### 示例

```php
$rolesManagementClient->getSpecificUdfValue('ROLEID', 'KEY');
```

#### 示例数据

```json
{
    "test_role_code": "ok"
}
```

## 获取多个角色扩展字段列表

RolesManagementClient->getUdfValueBatch(array $roleIds)

获取多个角色扩展字段列表

#### 参数

- `roleIds` \<string []\> 角色 ID 列表；

#### 示例

```php
$rolesManagementClient->getUdfValueBatch(
  [
    'ROLEID_1', 
    'ROLEID_2'
  ]
);
```

#### 示例数据

```json
{
    "60a815b2e32c6ef56f8fd8ff": {
        "test_role_code": "ok"
    },
    "6076a2f503bbc684184a7ed9": {}
}
```

## 设置某个角色扩展字段列表

RolesManagementClient->setUdfValue(string $roleId, array $data)

设置某个角色扩展字段列表

#### 参数

- `roleId` \<string\> 角色 ID；
- `data` \<array\> 扩展字段，key: value；

#### 示例

```php
$rolesManagementClient->setUdfValue(
    'ROLEID',
    [
        'shcool' => '清华大学',
        'age' => '24'
    ]
);
```
#### 示例数据

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

## 设置多个角色扩展字段列表

RolesManagementClient->setUdfValueBatch(array $input)

设置多个角色扩展字段列表

#### 参数

- `input` \<object\> 数据输入；
- `input['data']` \<KeyValuePair []\> 扩展字段数组；
- `input['roleId']` \<string]\> 角色 ID 列表；

#### 示例

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

#### 示例数据

```json
{
    "code": 200,
    "message": "设置成功！"
}
```

## 删除用户的扩展字段

RolesManagementClient->removeUdfValue(string $roleId, string $key)

删除用户的扩展字段

#### 参数

- `roleId` \<string\> 角色 ID；
- `key` \<string\> 扩展字段名；

#### 示例

```php
$rolesManagementClient->removeUdfValue('ROLEID', 'KEY');
```

#### 示例数据

```json
true
```

## 给指定角色添加策略

RolesManagementClient->addPolicies(string $code, string $policies)

删除用户的扩展字段

#### 参数

- `code` \<string\> 角色 CODE
- `$policies` \<string []\> 策略 ID 列表

#### 示例

```php
$rolesManagementClient->addPolicies('code', '['policies1','policies2']');
```

#### 示例数据

```json
{
  "message": "授权成功",
  "code": 200
}
```

## 通过 CODE 获取角色详情

RolesManagementClient->findByCode(string $code, string $namespace)

删除用户的扩展字段

#### 参数

- `code` \<string\> 角色 CODE
- `namespace` \<string []\> Namespace

#### 示例

```php
$rolesManagementClient->findByCode('code', 'namespace');
```

#### 示例数据

```json
{
  "namespace": "default",
  "code": "732140978",
  "arn": "arn:cn:authing:6131967faf2eb55a2b7cebcc:role:61a9dae20bb7666c5f63adcb",
  "description": null,
  "createdAt": "2021-12-03T08:52:50+00:00",
  "updatedAt": "2021-12-03T08:52:50+00:00",
  "parent": null
}
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
