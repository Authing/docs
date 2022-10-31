# Management organization

<LastUpdated/>

> A {{$localeConfig.brandName}} The user pool can create multiple organizations. This module is used to manage the {{$localeConfig.brandName}} organization, which can be used to delete and deduct the organization, add a delete mobile node, and import an organization.

Please use the module in the following ways:

```php
use Authing\Mgmt\ManagementClient;

$manageClient = new ManagementClient('YOUR_USERPOOL_ID', 'YOUR_USERPOOL_SECRET');

$orgManagementClient = $managementClient->orgs();
$orgManagementClient->list // Get list of user pool organization
$orgManagementClient->moveNode // Get the organization's details
$orgManagementClient->listMembers // Get a list of node users
```

## Create an organization

OrgManagementClient->create(string $name, string $description, string \$code)

Creating an organization, creating an organization of only one node.

If you want to import a complete organization tree, use the importByJson method.

#### parameter

- `name` \<string\> Organizational Name, the name will be the name of the root node of the organization.
- `description` \<string\> Root node description
- `code` \<string\> The root node is the only logo, must be a legitimate English character.

#### Example

```php
$orgManagementClient->create(
  '北京某某公司',
  '北京某某公司有限公司',
  'example'
);
```

<!-- #### return value -->

## Delete organization

OrgManagementClient->deleteById(string \$id)

Delete organization tree

#### parameter

- `id` \<string\> Organization ID

#### Example

<!-- #### return value -->

## Get list of user pool organization

OrgManagementClient->paginate(int $page = 1, int $limit = 10)

Get list of user pool organization

#### parameter

- `page` \<number\> Default value : `1`。
- `limit` \<number\> Default value : `10`。

#### Example

```php
$data = $orgManagementClient->paginate();
```

#### Sample data

- `null`

## Add node

OrgManagementClient->addNode(string $orgId, string $parentNodeId, array \$data)

Add a node in an organization

#### parameter

- `orgId` \<string\> Organization ID
- `parentNodeId` \<string\> Parent Node ID
- `data` \<array\> Node data
- `data.name` \<string\> Node name
- `data.code` \<string\> Node unique logo
- `data.description` \<string\> Node Description Information

#### Example

```php
$orgManagementClient->addNode(orgId, parentNodeId, [
  'name' => 'operation department'
]);
```

<!-- #### return value -->

## Get a node details

OrgManagementClient->getNodeById(string \$id)

Get node data

#### parameter

- `id` \<string\> node ID

#### Example

```php
$orgManagementClient->getNodeById('NDOEID');
```

<!-- #### return value -->

## Modify node

OrgManagementClient->updateNode(string $id, array $updates)

Modify node data

#### parameter

- `id` \<string\> node ID
- `updates` \<array\> update node
- `updates.name` \<string\> node name
- `updates.code` \<string\> Node unique logo
- `updates.description` \<string\> Node Description Information

#### Example

```php
$orgManagementClient->updateNode('NDOEID', [
  'name': 'New node name',
]);
```

<!-- #### return value -->

## Get organizational institution details

OrgManagementClient->findById(string \$id)

Get the organization's details through organizational ID

#### parameter

- `id` \<string\> Organization ID

#### Example

```php
$data = $orgManagementClient->findById(id)
```

<!-- #### return value -->

## Delete node

OrgManagementClient->deleteNode(string $orgId, string  $nodeId)

Delete a node in the organizational tree

#### parameter

- `orgId` \<string\> Organization ID
- `nodeId` \<string\> Ndoe ID

#### Example

```php
$orgManagementClient->deleteNode(orgId, rootNode.id)
```

<!-- #### return value

- `Promise<CommonMessage>` -->

## Move node

OrgManagementClient->moveNode(string $orgId, string $nodeId, string \$targetParentId)

Moving an organization node, when moving a node, you need to specify the new parent of the node. Note You cannot move a node below your child node.

#### parameter

- `orgId` \<string\> organization ID
- `nodeId` \<string\> Need to move the node ID
- `targetParentId` \<string\> Target parent node ID

#### Example

```php
$orgManagementClient->moveNode('ORGID', 'NODEID', 'TRAGET_NODE_ID')
```

<!-- #### return value

- `Promise<Org>` latest tree structure -->

## Judgment is the root node

OrgManagementClient->isRootNode(string $orgId, string $nodeId)

Judging a node is not the root node of the tissue tree

#### parameter

- `orgId` \<string\> organization ID
- `nodeId` \<string\> node ID

#### Example

<!-- #### return value

- `Promise<boolean>` -->

## Get a list of child nodes

OrgManagementClient->listChildren(string $orgId, string $nodeId)

Query a list of child nodes in a node

#### parameter

- `orgId` \<string\> organization ID
- `nodeId` \<string\> node ID

#### Example

```php
// Sub node list
$orgManagementClient->listChildren("ORGID", "NODEID")
```

<!-- #### return value

- `Promise<Node[]>` -->

## Get root nodes

OrgManagementClient->rootNode(string \$orgId)

Get a root node of an organization

#### parameter

- `orgId` \<string\> organization ID

#### Example

```php
$orgManagementClient->rootNode('ORGID')
```

<!-- #### return value

- `Promise<Node[]>` -->

## Import through JSON

OrgManagementClient->importByJson(string \$json)

Import organization through a JSON tree structure

#### parameter

- `json` \<Object\> Tree structure in JSON format, see sample code for details.

#### Example

```php
$tree = (object)[
  'name'=> '北京某某公司有限公司',
  'code'=> 'example',
  'children': [
    (object)[
      'code'=> 'operation',
      'name'=> '运营',
      'description'=> '商业化部门',
    ],
    (object)[
      'code'=> 'dev',
      'name'=> '研发',
      'description'=> '研发部门',
      'children'=> [
        (object)[
          'code'=> 'backend',
          'name'=> '后端',
          'description'=> '后端研发部门',
        ],
      ],
    ],
  ],
];
$orgManagementClient->importByJson(tree)
```

<!-- #### return value

- `Promise<Node[]>` -->

## Add member

OrgManagementClient->addMembers(string $nodeId, array $userIds)

Node Add member

#### parameter

- `nodeId` \<string\> node ID
- `userIds` \<string[]\> User ID list

#### Example

```php
$orgManagementClient->addMembers("NODE_ID", ["USER_ID"])
```

<!-- #### return value

- `Promise<PaginatedUsers>` -->

## Get node members

OrgManagementClient->listMembers(string $nodeId, array $options = []);

Get a member member, you can get the user directly added to the node, or you can get the user of the node node.

#### parameter

- `nodeId` \<string\> node ID
- `options` \<array\> Query parameters
- `options.page` \<number\> Default value : `1`。
- `options.limit` \<number\> Default value : `10`。
- `options.includeChildrenNodes` \<boolean\> Whether to get the default value of all child nodes : `false`。

#### Example

```php
$orgManagementClient->listMembers('NODE_ID');
```

<!-- #### return value

- `Promise<PaginatedUsers>` -->

## Delete member

OrgManagementClient->removeMembers(string $nodeId, array $userIds)

Delete node members

#### parameter

- `nodeId` \<string\> node ID
- `userIds` \<string[]\> User ID list

#### Example

```php
$orgManagementClient->removeMembers('NODEID', ['USER_ID'])
```

<!-- #### return value

- `Promise<PaginatedUsers>` -->

## Set the user main department

OrgManagementClient->setMainDepartment(string $userId, string $departmentId)

Set the user main department

#### parameter

- `userId` \<string\> user ID
- `departmentId` \<string\> Department ID

#### Example

```php
$orgManagementClient->setMainDepartment('NODEID', 'departmentId');
```

<!-- #### return value

- `Promise<PaginatedUsers>` -->

## Export all organization data

OrgManagementClient->exportAll()

Export all organizational institutions, the returned data structure is a recursive number structure.

#### Example

```php
$orgManagementClient->exportAll();
```

#### Sample data

```json
[
  {
    "id": "601f59578308478a692a71ea",
    "createdAt": "2021-02-07T03:07:03.822Z",
    "updatedAt": "2021-02-07T03:07:03.822Z",
    "userPoolId": "59f86b4832eb28071bdd9214",
    "orgId": "601f59573abea48cceb188c6",
    "name": "科技公司",
    "nameI18n": null,
    "description": null,
    "descriptionI18n": null,
    "order": null,
    "code": null,
    "children": [
      {
        "id": "601f5966800e61428d4190fb",
        "createdAt": "2021-02-07T03:07:18.835Z",
        "updatedAt": "2021-02-07T03:07:18.835Z",
        "userPoolId": "59f86b4832eb28071bdd9214",
        "orgId": "601f59573abea48cceb188c6",
        "name": "产品",
        "nameI18n": null,
        "description": null,
        "descriptionI18n": null,
        "order": null,
        "code": null,
        "children": [],
        "depth": 1,
        "root": false,
        "members": [
          {
            "id": "5a597f35085a2000144a10ed",
            "createdAt": "2021-02-02T02:36:32.172Z",
            "updatedAt": "2021-02-05T11:30:14.050Z",
            "userPoolId": "59f86b4832eb28071bdd9214",
            "isRoot": true,
            "status": "Activated",
            "oauth": null,
            "email": "root@authing.cn",
            "phone": null,
            "username": "root",
            "unionid": null,
            "openid": null,
            "nickname": null,
            "company": null,
            "photo": "https://files.authing.co/authing-console/default-user-avatar.png",
            "browser": null,
            "device": null,
            "token": "",
            "tokenExpiredAt": "2021-02-19T11:30:13.927Z",
            "loginsCount": 4,
            "lastIp": "::1",
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
            "registerSource": ["offcial:import"],
            "emailVerified": false,
            "phoneVerified": false,
            "lastLogin": "2021-02-05T11:30:14.019Z",
            "blocked": false,
            "isDeleted": false,
            "sendSmsCount": 0,
            "sendSmsLimitCount": 1000,
            "signedUp": "2021-02-02T02:36:32.172Z",
            "externalId": null,
            "mainDepartmentId": null,
            "mainDepartmentCode": null,
            "lastMfaTime": null,
            "passwordSecurityLevel": null
          }
        ]
      },
      {
        "id": "601f59622a1dea5ae5ada750",
        "createdAt": "2021-02-07T03:07:14.163Z",
        "updatedAt": "2021-02-07T03:07:14.163Z",
        "userPoolId": "59f86b4832eb28071bdd9214",
        "orgId": "601f59573abea48cceb188c6",
        "name": "研发",
        "nameI18n": null,
        "description": null,
        "descriptionI18n": null,
        "order": null,
        "code": null,
        "children": [
          {
            "id": "601f597e62eaeda4e17e3352",
            "createdAt": "2021-02-07T03:07:42.475Z",
            "updatedAt": "2021-02-07T03:07:42.475Z",
            "userPoolId": "59f86b4832eb28071bdd9214",
            "orgId": "601f59573abea48cceb188c6",
            "name": "后端",
            "nameI18n": null,
            "description": null,
            "descriptionI18n": null,
            "order": null,
            "code": null,
            "children": [],
            "depth": 2,
            "root": false,
            "members": []
          }
        ],
        "depth": 1,
        "root": false,
        "members": []
      },
      {
        "id": "601f596e89427f0549daf48f",
        "createdAt": "2021-02-07T03:07:26.919Z",
        "updatedAt": "2021-02-07T03:07:26.919Z",
        "userPoolId": "59f86b4832eb28071bdd9214",
        "orgId": "601f59573abea48cceb188c6",
        "name": "商业化",
        "nameI18n": null,
        "description": null,
        "descriptionI18n": null,
        "order": null,
        "code": null,
        "children": [],
        "depth": 1,
        "root": false,
        "members": []
      }
    ],
    "depth": 0,
    "root": true,
    "members": []
  }
]
```

## 导入某个组织机构数据

OrgManagementClient->exportByOrgId()

#### parameter

- `orgId` \<string\> 组织机构 ID

#### Example

```php
$orgManagementClient->exportByOrgId('ORG_ID');
```

#### Sample data

```json
{
  "id": "601f59578308478a692a71ea",
  "createdAt": "2021-02-07T03:07:03.822Z",
  "updatedAt": "2021-02-07T03:07:03.822Z",
  "userPoolId": "59f86b4832eb28071bdd9214",
  "orgId": "601f59573abea48cceb188c6",
  "name": "科技公司",
  "nameI18n": null,
  "description": null,
  "descriptionI18n": null,
  "order": null,
  "code": null,
  "children": [
    {
      "id": "601f5966800e61428d4190fb",
      "createdAt": "2021-02-07T03:07:18.835Z",
      "updatedAt": "2021-02-07T03:07:18.835Z",
      "userPoolId": "59f86b4832eb28071bdd9214",
      "orgId": "601f59573abea48cceb188c6",
      "name": "产品",
      "nameI18n": null,
      "description": null,
      "descriptionI18n": null,
      "order": null,
      "code": null,
      "children": [],
      "depth": 1,
      "root": false,
      "members": [
        {
          "id": "5a597f35085a2000144a10ed",
          "createdAt": "2021-02-02T02:36:32.172Z",
          "updatedAt": "2021-02-05T11:30:14.050Z",
          "userPoolId": "59f86b4832eb28071bdd9214",
          "isRoot": true,
          "status": "Activated",
          "oauth": null,
          "email": "root@authing.cn",
          "phone": null,
          "username": "root",
          "unionid": null,
          "openid": null,
          "nickname": null,
          "company": null,
          "photo": "https://files.authing.co/authing-console/default-user-avatar.png",
          "browser": null,
          "device": null,
          "token": "",
          "tokenExpiredAt": "2021-02-19T11:30:13.927Z",
          "loginsCount": 4,
          "lastIp": "::1",
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
          "registerSource": ["offcial:import"],
          "emailVerified": false,
          "phoneVerified": false,
          "lastLogin": "2021-02-05T11:30:14.019Z",
          "blocked": false,
          "isDeleted": false,
          "sendSmsCount": 0,
          "sendSmsLimitCount": 1000,
          "signedUp": "2021-02-02T02:36:32.172Z",
          "externalId": null,
          "mainDepartmentId": null,
          "mainDepartmentCode": null,
          "lastMfaTime": null,
          "passwordSecurityLevel": null
        }
      ]
    },
    {
      "id": "601f59622a1dea5ae5ada750",
      "createdAt": "2021-02-07T03:07:14.163Z",
      "updatedAt": "2021-02-07T03:07:14.163Z",
      "userPoolId": "59f86b4832eb28071bdd9214",
      "orgId": "601f59573abea48cceb188c6",
      "name": "研发",
      "nameI18n": null,
      "description": null,
      "descriptionI18n": null,
      "order": null,
      "code": null,
      "children": [
        {
          "id": "601f597e62eaeda4e17e3352",
          "createdAt": "2021-02-07T03:07:42.475Z",
          "updatedAt": "2021-02-07T03:07:42.475Z",
          "userPoolId": "59f86b4832eb28071bdd9214",
          "orgId": "601f59573abea48cceb188c6",
          "name": "后端",
          "nameI18n": null,
          "description": null,
          "descriptionI18n": null,
          "order": null,
          "code": null,
          "children": [],
          "depth": 2,
          "root": false,
          "members": []
        }
      ],
      "depth": 1,
      "root": false,
      "members": []
    },
    {
      "id": "601f596e89427f0549daf48f",
      "createdAt": "2021-02-07T03:07:26.919Z",
      "updatedAt": "2021-02-07T03:07:26.919Z",
      "userPoolId": "59f86b4832eb28071bdd9214",
      "orgId": "601f59573abea48cceb188c6",
      "name": "商业化",
      "nameI18n": null,
      "description": null,
      "descriptionI18n": null,
      "order": null,
      "code": null,
      "children": [],
      "depth": 1,
      "root": false,
      "members": []
    }
  ],
  "depth": 0,
  "root": true,
  "members": []
}
```

## Get all resources authorized by organizational nodes

OrgManagementClient->listAuthorizedResourcesByNodeId(string $nodeId, string $namespace, array \$options = [])

Get all resources authorized by organizational nodes

#### parameter

- `nodeId` \<string\> group ID；
- `namespace` \<string\> Code of permission grouping, please see [Use Right Limit Group Management Rights Resources](/guides/access-control/resource-group.md)
- `options` \<array\> Resource configuration information.
- `options.resourceType` \<string\> Optional, resource type, default will return all permissions, existing resource types are as follows:
  - `DATA`: type of data;
  - `API`: API type data;
  - `MENU`: Menu type data;
  - `BUTTON`: Button type data.

#### Example

```php
managementClient->orgs()->listAuthorizedResourcesByNodeId(
  'nodeId',
  'code'
);
```

#### Sample data

## Get all resources authorized by organizational nodes

OrgManagementClient->listAuthorizedResourcesByNodeCode(string $orgId, string $code, string $namespace, array $options = [])

Get all resources authorized by organizational nodes

#### parameter

- `orgId` \<string\> organization Id；
- `code` \<string\> node Code；
- `namespace` \<string\> Code of permission grouping, please see [Use Right Limit Group Management Rights Resources](/guides/access-control/resource-group.md)
- `options` \<array\> Resource configuration information.
- `options.resourceType` \<string\> Optional, resource type, default will return all permissions, existing resource types are as follows:
  - `DATA`: type of data;
  - `API`: API type data;
  - `MENU`: Menu type data;
  - `BUTTON`: Button type data.

#### Example

```php
$managementClient->orgs()->listAuthorizedResourcesByNodeCode('orgId' ,'nodeCode', 'code');
```

<!-- #### Sample data

## 获取组织机构被授权的所有资源列表

OrgManagementClient->listAuthorizedResources($orgCode, $namespace, array )

> 获取一个组织机构被授权的所有资源。

#### parameter

- `groupCode` \<string\> 组织机构 code；
- `namespace` \<string\> 权限分组的 code，详情请见[Use 权限分组管理权限资源](/guides/access-control/resource-group.md)
- `resourceType` \<string\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
  - `DATA`: 数据类型；
  - `API`: API 类型数据；
  - `MENU`: 菜单类型数据；
  - `BUTTON`: 按钮类型数据。

#### 示例

```php
managementClient.org.listAuthorizedResources('ORG_CODE', 'code')
```

#### Sample data

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
