# 管理组织机构

<LastUpdated/>

> 一个 {{$localeConfig.brandName}} 用户池可以创建多个组织机构。此模块用于管理 {{$localeConfig.brandName}} 组织机构，可以进行组织机构的增删改查、添加删除移动节点、导入组织机构等操作。

请使用以下方式使用该模块：

```javascript
import { ManagementClient } from 'authing-js-sdk'
const managementClient = new ManagementClient({
  userPoolId: 'YOUR_USERPOOL_ID',
  secret: 'YOUR_USERPOOL_SECRET',
})
managementClient.org.list // 获取用户池组织机构列表
managementClient.org.moveNode // 获取组织机构详情
managementClient.org.listMembers // 获取节点用户列表
```

## 创建组织机构
> 创建组织机构，会创建一个只有一个节点的组织机构。
> 如果你想将一个完整的组织树导入进来，请使用 importByJson 方法。
> 你可以为一个租户创建一个组织机构树，但根节点只能有一个。

```js
OrgManagementClient().create(name, description, code, tenantId)
```


#### 参数

- `name` \<string\> 组织机构名称，该名称会作为该组织机构根节点的名称。
- `description` \<string\> 根节点描述
- `code` \<string\> 根节点唯一标志，必须为合法的英文字符。
- `tenantId` \<string\> 租户 id，可选。

#### 示例

```javascript
const org = await managementClient.org.create(
  '北京某某公司',
  '北京某某科技有限公司',
  'example'
)
```

#### 返回值

```json
{
	"nodes": [{
		"code": null,
		"description": null,
		"updatedAt": "2021-09-23T08:17:38+00:00",
		"children": [],
		"order": null,
		"descriptionI18n": null,
		"depth": 0,
		"orgId": "614c3822355bb8538eb5",
		"path": ["614c3822aafcfc1defae"],
		"nameI18n": null,
		"root": true,
		"id": "614c3822aafcfc1defaedbfd",
		"createdAt": "2021-09-23T08:17:38+00:00",
		"name": "xx21"
	}],
	"rootNode": {
		"code": null,
		"description": null,
		"updatedAt": "2021-09-23T08:17:38+00:00",
		"children": [],
		"order": null,
		"descriptionI18n": null,
		"depth": null,
		"orgId": "614c3822355bb8538eb5",
		"path": ["614c3822aafcfc1defae"],
		"nameI18n": null,
		"root": true,
		"id": "614c3822aafcfc1defae",
		"createdAt": "2021-09-23T08:17:38+00:00",
		"name": "xx21"
	},
	"id": "614c3822355bb8538eb5"
}
```

## 删除组织机构
> 删除组织机构树

```js
OrgManagementClient().deleteById(id)
```

#### 参数

- `id` \<string\> 组织机构 ID

#### 返回值

```json
{
	"message": "delete org succeed",
	"code": 200
}
```

## 获取用户池组织机构列表

> 获取用户池组织机构列表，此方法已经不推荐使用。

```js
OrgManagementClient().list(page, limit)
```


#### 参数

- `page` \<number\> 默认值为 : `1`。
- `limit` \<number\> 默认值为 : `10`。

#### 示例

```javascript
const { totalCount, list } = await managementClient.org.list()
```

#### 返回值
```json
{
	"totalCount": 1,
	"list": [{
		"nodes": [{
			"code": "codes",
			"description": "",
			"updatedAt": "2021-09-16T10:24:03+00:00",
			"children": [{
				"code": null,
				"description": null,
				"updatedAt": "2021-09-16T06:35:22+00:00",
				"children": [{
					"code": null,
					"description": null,
					"updatedAt": "2021-09-16T06:46:11+00:00",
					"children": [],
					"order": null,
					"descriptionI18n": null,
					"depth": 2,
					"nameI18n": null,
					"path": ["6142c2c4f8abf18c6c978b2c", "6142c32360021c1a05081579", "6142e833716601219e93d813"],
					"root": false,
					"id": "6142e833716601219e93d813",
					"createdAt": "2021-09-16T06:46:11+00:00",
					"name": "q2"
				}, {
					"code": null,
					"description": null,
					"updatedAt": "2021-09-16T06:46:20+00:00",
					"children": [],
					"order": null,
					"descriptionI18n": null,
					"depth": 2,
					"nameI18n": null,
					"path": ["6142c2c4f8abf18c6c978b2c", "6142c32360021c1a05081579", "6142e83c8db6a68ea5e62aca"],
					"root": false,
					"id": "6142e83c8db6a68ea5e62aca",
					"createdAt": "2021-09-16T06:46:20+00:00",
					"name": "q3"
				}],
				"order": null,
				"descriptionI18n": null,
				"depth": 1,
				"nameI18n": null,
				"path": ["6142c2c4f8abf18c6c978b2c", "6142c32360021c1a05081579"],
				"root": false,
				"id": "6142c32360021c1a05081579",
				"createdAt": "2021-09-16T04:08:03+00:00",
				"name": "qqqx"
			}, {
				"code": null,
				"description": null,
				"updatedAt": "2021-09-16T06:12:04+00:00",
				"children": [{
					"code": "code",
					"description": "",
					"updatedAt": "2021-09-16T10:20:39+00:00",
					"children": [],
					"order": null,
					"descriptionI18n": null,
					"depth": 2,
					"nameI18n": null,
					"path": ["6142c2c4f8abf18c6c978b2c", "6142e03436f09aa7e66c1935", "6142e08f64d5a8873598e9fb"],
					"root": false,
					"id": "6142e08f64d5a8873598e9fb",
					"createdAt": "2021-09-16T06:13:35+00:00",
					"name": "add"
				}],
				"order": null,
				"descriptionI18n": null,
				"depth": 1,
				"nameI18n": null,
				"path": ["6142c2c4f8abf18c6c978b2c", "6142e03436f09aa7e66c1935"],
				"root": false,
				"id": "6142e03436f09aa7e66c1935",
				"createdAt": "2021-09-16T06:12:04+00:00",
				"name": "add"
			}, {
				"code": null,
				"description": null,
				"updatedAt": "2021-09-16T06:12:24+00:00",
				"children": [],
				"order": null,
				"descriptionI18n": null,
				"depth": 1,
				"nameI18n": null,
				"path": ["6142c2c4f8abf18c6c978b2c", "6142e0483f54818690c99600"],
				"root": false,
				"id": "6142e0483f54818690c99600",
				"createdAt": "2021-09-16T06:12:24+00:00",
				"name": "add"
			}, {
				"code": null,
				"description": null,
				"updatedAt": "2021-09-16T06:13:18+00:00",
				"children": [],
				"order": null,
				"descriptionI18n": null,
				"depth": 1,
				"nameI18n": null,
				"path": ["6142c2c4f8abf18c6c978b2c", "6142e07e163a22fd3db10e83"],
				"root": false,
				"id": "6142e07e163a22fd3db10e83",
				"createdAt": "2021-09-16T06:13:18+00:00",
				"name": "add"
			}],
			"order": null,
			"descriptionI18n": null,
			"depth": 0,
			"nameI18n": null,
			"path": ["6142c2c4f8abf18c6c978b2c"],
			"root": true,
			"id": "6142c2c4f8abf18c6c978b2c",
			"createdAt": "2021-09-16T04:06:28+00:00",
			"name": "xx2"
		}],
		"rootNode": {
			"code": "codes",
			"description": "",
			"updatedAt": "2021-09-16T10:24:03+00:00",
			"children": ["6142c32360021c1a05081579", "6142e03436f09aa7e66c1935", "6142e0483f54818690c99600", "6142e07e163a22fd3db10e83"],
			"order": null,
			"descriptionI18n": null,
			"depth": null,
			"path": ["6142c2c4f8abf18c6c978b2c"],
			"nameI18n": null,
			"root": true,
			"id": "6142c2c4f8abf18c6c978b2c",
			"createdAt": "2021-09-16T04:06:28+00:00",
			"name": "xx2"
		},
		"id": "6142c2c41c6e6c6cc3edfd88"
	}]
}
```






## 获取租户下组织机构
> 获取租户下组织机构

```js
OrgManagementClient().getOrgByTenantId(tenantId)
```


#### 参数

- `tenantId` \<string\> 租户 Id 。

#### 示例

```javascript
const result = await managementClient.org.getOrgByTenantId(tenantId)
```

#### 返回值
```json
[
  {
    id: '61d699490abab9f144f296cd',
    createdAt: '2022-01-06T07:24:57.684Z',
    updatedAt: '2022-01-06T07:24:57.684Z',
    userPoolId: '61d53225d92b7010a565e668',
    orgId: '61d6994988de6be5745ee57c',
    name: 'main',
    nameI18n: null,
    description: null,
    descriptionI18n: null,
    order: null,
    code: null,
    leaderUserId: null,
    __id: null,
    __parentid: null,
    __groupid: null,
    members: [],
    children: []
  }
]
```



## 添加节点
> 在组织机构中添加一个节点

```js
OrgManagementClient().addNode(orgId, parentNodeId, data)
```


#### 参数

- `orgId` \<string\> 组织机构 ID
- `parentNodeId` \<string\> 父节点 ID
- `data` \<Object\> 节点数据
- `data.name` \<string\> 节点名称
- `data.code` \<string\> 节点唯一标志
- `data.description` \<string\> 节点描述信息
- `data.nameI18n` \<string\> 国际化名称
- `data.descriptionI18n` \<string\> 国际化描述
- `data.order` \<number\> 排序号
 

#### 示例

```javascript
const org = await managementClient.org.create(
  '北京某某公司',
  '北京某某科技有限公司',
  'example'
)
const { id: orgId, rootNode } = org
const node = await managementClient.org.addNode(orgId, rootNode.id, {
  name: '运营部门',
})
```

#### 返回值
```json
{
	"nodes": [{
		"code": null,
		"description": null,
		"updatedAt": "2021-09-23T08:35:31+00:00",
		"children": [],
		"order": null,
		"descriptionI18n": null,
		"depth": 1,
		"orgId": "6142c2c41c6e6c6cc3edf8",
		"path": ["6142c2c4f8abf18c6c978b2c", "614c3c5372b6b3f340ab6937"],
		"nameI18n": null,
		"root": false,
		"id": "614c3c5372b6b3f340ab6937",
		"createdAt": "2021-09-23T08:35:31+00:00",
		"name": "add"
	}],
	"rootNode": {
		"code": "codes",
		"description": "",
		"updatedAt": "2021-09-16T10:24:03+00:00",
		"children": ["614c3c5372b6b3f340ab6937", "6142c32360021c1a05081579", "6142e03436f09aa7e66c1935", "6142e0483f54818690c99600", "6142e07e163a22fd3db10e83"],
		"order": null,
		"descriptionI18n": null,
		"depth": null,
		"orgId": "6142c2c41c6e6c6cc3edfd88",
		"path": ["6142c2c4f8abf18c6c978b2c"],
		"nameI18n": null,
		"root": true,
		"id": "6142c2c4f8abf18c6c978b2c",
		"createdAt": "2021-09-16T04:06:28+00:00",
		"name": "xx2"
	},
	"id": "6142c2c41c6e6c6cc3edfd88"
}
```

## 获取某个节点详情
> 获取节点数据

```js
OrgManagementClient().getNodeById(id)
```


#### 参数

- `id` \<string\> 节点 ID

#### 示例

```javascript
await managementClient.org.getNodeById('NDOEID')
```

#### 返回值
```json
{
  "code": null,
  "description": null,
  "updatedAt": "2021-09-16T06:35:22+00:00",
  "children": ["6142e833716601219e93d813", "6142e83c8db6a68ea5e62aca"],
  "order": null,
  "descriptionI18n": null,
  "depth": null,
  "orgId": "6142c2c41c6e6c6cc3edfd88",
  "path": ["6142c2c4f8abf18c6c978b2c", "6142c32360021c1a05081579"],
  "nameI18n": null,
  "root": false,
  "id": "6142c32360021c1a0508",
  "createdAt": "2021-09-16T04:08:03+00:00",
  "name": "qqqx"
}
```

## 修改节点
> 修改节点数据

```js
OrgManagementClient().updateNode(id, updates)
```


#### 参数

- `id` \<string\> 节点 ID
- `updates` \<Object\> 修改数据
- `updates.name` \<string\> 节点名称
- `updates.code` \<string\> 节点唯一标志
- `updates.description` \<string\> 节点描述信息
- `updates.nameI18n` \<string\> 国际化名称
- `updates.descriptionI18n` \<string\> 国际化描述
- `updates.order` \<number\> 排序号

#### 示例

```javascript
await managementClient.org.updateNode('NDOEID', {
  name: '新的节点名称',
})
```

#### 返回值

```json
{
	"code": null,
	"description": null,
	"updatedAt": "2021-09-16T06:35:22+00:00",
	"children": ["6142e833716601219e93d813", "6142e83c8db6a68ea5e62aca"],
	"order": null,
	"descriptionI18n": null,
	"depth": null,
	"orgId": "6142c2c41c6e6c6cc3edfd88",
	"path": ["6142c2c4f8abf18c6c978b2c", "6142c32360021c1a05081579"],
	"nameI18n": null,
	"users": {
		"totalCount": 1
	},
	"root": false,
	"id": "6142c32360021c1a05081579",
	"createdAt": "2021-09-16T04:08:03+00:00",
	"name": "qqqx"
}
```

## 获取组织机构详情
> 通过组织机构 ID 获取组织机构详情

```js
OrgManagementClient().findById(id)
```


#### 参数

- `id` \<string\> 组织机构 ID

#### 示例
```js
managementClient.org.findById('xx')
```
#### 返回值

```json
{
	"nodes": [{
				"code": "codes",
				"description": "",
				"updatedAt": "2021-09-16T10:24:03+00:00",
				"children": [{
					"code": null,
					"description": null,
					"updatedAt": "2021-09-23T08:35:31+00:00",
					"children": [],
					"order": null,
					"descriptionI18n": null,
					"depth": 1,
					"orgId": "6142c2c41c6e6c6cc3edfd88",
					"path": ["6142c2c4f8abf18c6c978b2c", "614c3c5372b6b3f340ab6937"],
					"nameI18n": null,
					"root": false,
					"id": "614c3c5372b6b3f340ab6937",
					"createdAt": "2021-09-23T08:35:31+00:00",
					"name": "add"
				}],
				"rootNode": {
					"code": "codes",
					"description": "",
					"updatedAt": "2021-09-16T10:24:03+00:00",
					"children": ["614c3c5372b6b3f340ab6937", "6142c32360021c1a05081579", "6142e03436f09aa7e66c1935", "6142e0483f54818690c99600", "6142e07e163a22fd3db10e83"],
					"order": null,
					"descriptionI18n": null,
					"depth": null,
					"orgId": "6142c2c41c6e6c6cc3edfd88",
					"path": ["6142c2c4f8abf18c6c978b2c"],
					"nameI18n": null,
					"root": true,
					"id": "6142c2c4f8abf18c6c978b2c",
					"createdAt": "2021-09-16T04:06:28+00:00",
					"name": "xx2"
				},
				"id": "6142c2c41c6e6c6cc3edfd88"
			}]
}

```

## 删除节点
> 删除组织机构树中的某一个节点

```js
OrgManagementClient().deleteNode(orgId, nodeId)
```


#### 参数

- `orgId` \<string\> 组织机构 ID
- `nodeId` \<string\> 节点 ID

#### 示例

```javascript
const org = await managementClient.org.create(
  '北京某某公司',
  '北京某某科技有限公司',
  'example'
)
const { id: orgId, rootNode } = org
const node = await managementClient.org.deleteNode(orgId, rootNode.id)
```

#### 返回值
```json
{
  "message": "删除成功",
  "code": 200
}
```

## 移动节点
> 移动组织机构节点，移动某节点时需要指定该节点新的父节点。注意不能将一个节点移动到自己的子节点下面。

```js
OrgManagementClient().moveNode(orgId, nodeId, targetParentId)
```


#### 参数

- `orgId` \<string\> 组织机构 ID
- `nodeId` \<string\> 需要移动的节点 ID
- `targetParentId` \<string\> 目标父节点 ID

#### 示例

```javascript
await managementClient.org.moveNode('ORGID', 'NODEID', 'TRAGET_NODE_ID')
```

#### 返回值

```json
{
	"nodes": [{
				"code": "codes",
				"description": "",
				"updatedAt": "2021-09-16T10:24:03+00:00",
				"children": [{
					"code": null,
					"description": null,
					"updatedAt": "2021-09-23T08:35:31+00:00",
					"children": [],
					"order": null,
					"descriptionI18n": null,
					"depth": 1,
					"orgId": "6142c2c41c6e6c6cc3edfd88",
					"path": ["6142c2c4f8abf18c6c978b2c", "614c3c5372b6b3f340ab6937"],
					"nameI18n": null,
					"root": false,
					"id": "614c3c5372b6b3f340ab6937",
					"createdAt": "2021-09-23T08:35:31+00:00",
					"name": "add"
				}],
				"rootNode": {
					"code": "codes",
					"description": "",
					"updatedAt": "2021-09-16T10:24:03+00:00",
					"children": ["614c3c5372b6b3f340ab6937", "6142c32360021c1a05081579", "6142e03436f09aa7e66c1935", "6142e0483f54818690c99600", "6142e07e163a22fd3db10e83"],
					"order": null,
					"descriptionI18n": null,
					"depth": null,
					"orgId": "6142c2c41c6e6c6cc3edfd88",
					"path": ["6142c2c4f8abf18c6c978b2c"],
					"nameI18n": null,
					"root": true,
					"id": "6142c2c4f8abf18c6c978b2c",
					"createdAt": "2021-09-16T04:06:28+00:00",
					"name": "xx2"
				},
				"id": "6142c2c41c6e6c6cc3edfd88"
			}]
}

```

## 判断是否为根节点
> 判断一个节点是不是组织树的根节点

```js
OrgManagementClient().isRootNode(orgId, nodeId)
```


#### 参数

- `orgId` \<string\> 组织机构 ID
- `nodeId` \<string\> 组织机构 ID

#### 示例
```js
management.org.isRootNode('orgid','nodeid')
```
#### 返回值
```js
boolean
``` 

## 获取子节点列表
> 查询一个节点的子节点列表

```js
OrgManagementClient().listChildren(nodeId)
```


#### 参数
 
- `nodeId` \<string\> 组织机构 ID

#### 示例

```javascript
// 子节点列表
const children = await managementClient.org.listChildren("nodeId")
```

#### 返回值
```json
[{
	"code": null,
	"description": null,
	"updatedAt": "2021-09-16T06:46:11+00:00",
	"children": [],
	"order": null,
	"descriptionI18n": null,
	"depth": 1,
	"orgId": "6142c2c41c6e6c6cc3edfd88",
	"path": ["6142c2c4f8abf18c6c978b2c", "6142c32360021c1a05081579", "6142e833716601219e93d813"],
	"nameI18n": null,
	"root": false,
	"id": "6142e833716601219e93d813",
	"createdAt": "2021-09-16T06:46:11+00:00",
	"name": "q2"
} ]
```

## 模糊搜索组织节点
> 通过节点名称模糊搜索组织节点
```js
OrgManagementClient().searchNodes(keyword)
```
#### 参数

- `keyword` \<string\> 组织机构名称关键字

#### 示例

```js
managementClient.org.searchNodes('q2')
```
#### 示例数据
```json
[{
	"code": null,
	"description": null,
	"updatedAt": "2021-09-16T06:46:11+00:00",
	"children": [],
	"order": null,
	"descriptionI18n": null,
	"depth": 1,
	"orgId": "6142c2c41c6e6c6cc3edfd88",
	"path": ["6142c2c4f8abf18c6c978b2c", "6142c32360021c1a05081579", "6142e833716601219e93d813"],
	"nameI18n": null,
	"root": false,
	"id": "6142e833716601219e93d813",
	"createdAt": "2021-09-16T06:46:11+00:00",
	"name": "q2"
} ]
```

## 获取根节点
> 获取一个组织的根节点

```js
OrgManagementClient().rootNode(orgId)
```


#### 参数

- `orgId` \<string\> 组织机构 ID

#### 示例

```javascript
const rootNode = await managementClient.org.rootNode('ORGID')
```

#### 返回值
```json
{
	"code": "codes",
	"description": "",
	"updatedAt": "2021-09-16T10:24:03+00:00",
	"children": ["614c3f54d02c0253e13de53e", "6142c32360021c1a05081579", "6142e03436f09aa7e66c1935", "6142e0483f54818690c99600", "6142e07e163a22fd3db10e83"],
	"namePath": ["xx2"],
	"order": null,
	"descriptionI18n": null,
	"depth": null,
	"orgId": "6142c2c41c6e6c6cc3edfd88",
	"path": ["6142c2c4f8abf18c6c978b2c"],
	"nameI18n": null,
	"codePath": ["codes"],
	"root": true,
	"id": "6142c2c4f8abf18c6c978b2c",
	"createdAt": "2021-09-16T04:06:28+00:00",
	"name": "xx2"
}
```

## 通过 JSON 导入
> 通过一个 JSON 树结构导入组织机构

```js
OrgManagementClient().importByJson(json)
```


#### 参数

- `json` \<object\> JSON 格式的树结构，详细格式请见示例代码。

#### 示例

```javascript
const tree = {
  name: '北京某某科技有限公司',
  code: 'example',
  children: [
    {
      code: 'operation',
      name: '运营',
      description: '商业化部门',
    },
    {
      code: 'dev',
      name: '研发',
      description: '研发部门',
      children: [
        {
          code: 'backend',
          name: '后端',
          description: '后端研发部门',
        },
      ],
    },
  ],
}
const org = await managementClient.org.importByJson(tree)
```

#### 返回值

- `Promise<Node[]>`

## 添加成员
> 节点添加成员

```js
OrgManagementClient().addMembers(nodeId, userIds)
```


#### 参数

- `nodeId` \<string\> 节点 ID
- `userIds` \<string[]\> 用户 ID 列表

#### 示例

```javascript
const { totalCount, list } = await managementClient.org.addMembers("NODE_ID", ["USER_ID"])
```

#### 返回值
```json
{
	"code": null,
	"description": null,
	"updatedAt": "2021-09-16T06:46:11+00:00",
	"children": [],
	"order": null,
	"descriptionI18n": null,
	"depth": null,
	"orgId": "6142c2c41c6e6c6cc3edfd88",
	"path": ["6142c2c4f8abf18c6c978b2c", "6142c32360021c1a05081579", "6142e833716601219e93d813"],
	"nameI18n": null,
	"users": {
		"totalCount": 1,
		"list": [{
			"status": "Activated",
			"preferredUsername": null,
			"tokenExpiredAt": "2021-10-06T07:32:16+00:00",
			"locale": null,
			"photo": "https://files.authing.co/authing-console/default-user-avatar.png",
			"updatedAt": "2021-09-22T07:32:16+00:00",
			"formatted": null,
			"device": null,
			"gender": "U",
			"id": "6141876341abedef979c3740",
			"arn": "arn:cn:authing:61384d3e302f1f75e69ce95a:user:6141876341abedef979c3740",
			"blocked": false,
			"loginsCount": 22,
			"city": null,
			"province": null,
			"userPoolId": "61384d3e302f1f75e69ce95a",
			"locality": null,
			"middleName": null,
			"country": null,
			"zoneinfo": null,
			"lastIP": "111.202.167.54",
			"website": null,
			"streetAddress": null,
			"externalId": null,
			"isDeleted": false,
			"postalCode": null,
			"email": "test@example.com",
			"username": null,
			"openid": null,
			"company": null,
			"familyName": null,
			"phone": null,
			"registerSource": ["basic:email"],
			"profile": null,
			"address": null,
			"oauth": null,
			"password": "b9c6556b58ad1b450f9f6487efdd0eaf",
			"nickname": null,
			"createdAt": "2021-09-15T05:40:51+00:00",
			"givenName": null,
			"name": null,
			"emailVerified": false,
			"region": null,
			"birthdate": null,
			"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cGRhdGVkX2F0IjoiMjAyMS0wOS0yMlQwNzozMTowOC43NThaIiwiYWRkcmVzcyI6eyJjb3VudHJ5IjpudWxsLCJwb3N0YWxfY29kZSI6bnVsbCwicmVnaW9uIjpudWxsLCJmb3JtYXR0ZWQiOm51bGx9LCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOmZhbHNlLCJwaG9uZV9udW1iZXIiOm51bGwsImxvY2FsZSI6bnVsbCwiem9uZWluZm8iOm51bGwsImJpcnRoZGF0ZSI6bnVsbCwiZ2VuZGVyIjoiVSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZW1haWwiOiJmcHR2bXpxeXhuQGF1dGhpbmcuY24iLCJ3ZWJzaXRlIjpudWxsLCJwaWN0dXJlIjoiaHR0cHM6Ly9maWxlcy5hdXRoaW5nLmNvL2F1dGhpbmctY29uc29sZS9kZWZhdWx0LXVzZXItYXZhdGFyLnBuZyIsInByb2ZpbGUiOm51bGwsInByZWZlcnJlZF91c2VybmFtZSI6bnVsbCwibmlja25hbWUiOm51bGwsIm1pZGRsZV9uYW1lIjpudWxsLCJmYW1pbHlfbmFtZSI6bnVsbCwiZ2l2ZW5fbmFtZSI6bnVsbCwibmFtZSI6bnVsbCwic3ViIjoiNjE0MTg3NjM0MWFiZWRlZjk3OWMzNzQwIiwiZXh0ZXJuYWxfaWQiOm51bGwsInVuaW9uaWQiOm51bGwsImRhdGEiOnsidHlwZSI6InVzZXIiLCJ1c2VyUG9vbElkIjoiNjEzODRkM2UzMDJmMWY3NWU2OWNlOTVhIiwiYXBwSWQiOiI2MTM4NGQzZWUxYjgxZGQxMzQyZTU2MzUiLCJpZCI6IjYxNDE4NzYzNDFhYmVkZWY5NzljMzc0MCIsInVzZXJJZCI6IjYxNDE4NzYzNDFhYmVkZWY5NzljMzc0MCIsIl9pZCI6IjYxNDE4NzYzNDFhYmVkZWY5NzljMzc0MCIsInBob25lIjpudWxsLCJlbWFpbCI6ImZwdHZtenF5eG5AYXV0aGluZy5jbiIsInVzZXJuYW1lIjpudWxsLCJ1bmlvbmlkIjpudWxsLCJvcGVuaWQiOm51bGwsImNsaWVudElkIjoiNjEzODRkM2UzMDJmMWY3NWU2OWNlOTVhIn0sInVzZXJwb29sX2lkIjoiNjEzODRkM2UzMDJmMWY3NWU2OWNlOTVhIiwiYXVkIjoiNjEzODRkM2VlMWI4MWRkMTM0MmU1NjM1IiwiZXhwIjoxNjMzNTA1NTM2LCJpYXQiOjE2MzIyOTU5MzYsImlzcyI6Imh0dHBzOi8vbjFzajY4LWRlbW8uYXV0aGluZy5jbi9vaWRjIn0.AbHOb16fKlz463533NdgMNtCW9n29u9aamS-LiKAOfQ",
			"phoneVerified": false,
			"lastLogin": "2021-09-22T07:32:16+00:00",
			"unionid": null,
			"browser": null,
			"signedUp": "2021-09-15T05:40:51+00:00"
		}]
	},
	"root": false,
	"id": "6142e833716601219e93d813",
	"createdAt": "2021-09-16T06:46:11+00:00",
	"name": "q2"
}
```

## 获取节点成员
> 获取节点成员，可以获取直接添加到该节点中的用户，也可以获取到该节点子节点的用户。

```js
OrgManagementClient().listMembers(nodeId, options)
```


#### 参数

- `nodeId` \<string\> 节点 ID
- `options` \<object\> 查询参数
- `options.page` \<number\> 默认值为 : `1`。
- `options.limit` \<number\> 默认值为 : `10`。
- `options.includeChildrenNodes` \<boolean\> 是否获取所有子节点的成员 默认值为 : `false`。

#### 示例

```javascript
const { totalCount, list } = await managementClient.org.listMembers('NODE_ID')
```

#### 返回值
```json
{
	"code": null,
	"description": null,
	"updatedAt": "2021-09-16T06:46:11+00:00",
	"children": [],
	"order": null,
	"descriptionI18n": null,
	"depth": null,
	"orgId": "6142c2c41c6e6c6cc3edfd88",
	"path": ["6142c2c4f8abf18c6c978b2c", "6142c32360021c1a05081579", "6142e833716601219e93d813"],
	"nameI18n": null,
	"users": {
		"totalCount": 1,
		"list": [{
			"status": "Activated",
			"preferredUsername": null,
			"tokenExpiredAt": "2021-10-06T07:32:16+00:00",
			"locale": null,
			"photo": "https://files.authing.co/authing-console/default-user-avatar.png",
			"updatedAt": "2021-09-22T07:32:16+00:00",
			"formatted": null,
			"device": null,
			"gender": "U",
			"id": "6141876341abedef979c3740",
			"arn": "arn:cn:authing:61384d3e302f1f75e69ce95a:user:6141876341abedef979c3740",
			"blocked": false,
			"loginsCount": 22,
			"city": null,
			"province": null,
			"userPoolId": "61384d3e302f1f75e69ce95a",
			"locality": null,
			"middleName": null,
			"country": null,
			"zoneinfo": null,
			"lastIP": "111.202.167.54",
			"website": null,
			"streetAddress": null,
			"externalId": null,
			"isDeleted": false,
			"postalCode": null,
			"email": "test@example.com",
			"username": null,
			"openid": null,
			"company": null,
			"familyName": null,
			"phone": null,
			"registerSource": ["basic:email"],
			"profile": null,
			"address": null,
			"oauth": null,
			"password": "b9c6556b58ad1b450f9f6487efdd0eaf",
			"nickname": null,
			"createdAt": "2021-09-15T05:40:51+00:00",
			"givenName": null,
			"name": null,
			"emailVerified": false,
			"region": null,
			"birthdate": null,
			"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cGRhdGVkX2F0IjoiMjAyMS0wOS0yMlQwNzozMTowOC43NThaIiwiYWRkcmVzcyI6eyJjb3VudHJ5IjpudWxsLCJwb3N0YWxfY29kZSI6bnVsbCwicmVnaW9uIjpudWxsLCJmb3JtYXR0ZWQiOm51bGx9LCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOmZhbHNlLCJwaG9uZV9udW1iZXIiOm51bGwsImxvY2FsZSI6bnVsbCwiem9uZWluZm8iOm51bGwsImJpcnRoZGF0ZSI6bnVsbCwiZ2VuZGVyIjoiVSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZW1haWwiOiJmcHR2bXpxeXhuQGF1dGhpbmcuY24iLCJ3ZWJzaXRlIjpudWxsLCJwaWN0dXJlIjoiaHR0cHM6Ly9maWxlcy5hdXRoaW5nLmNvL2F1dGhpbmctY29uc29sZS9kZWZhdWx0LXVzZXItYXZhdGFyLnBuZyIsInByb2ZpbGUiOm51bGwsInByZWZlcnJlZF91c2VybmFtZSI6bnVsbCwibmlja25hbWUiOm51bGwsIm1pZGRsZV9uYW1lIjpudWxsLCJmYW1pbHlfbmFtZSI6bnVsbCwiZ2l2ZW5fbmFtZSI6bnVsbCwibmFtZSI6bnVsbCwic3ViIjoiNjE0MTg3NjM0MWFiZWRlZjk3OWMzNzQwIiwiZXh0ZXJuYWxfaWQiOm51bGwsInVuaW9uaWQiOm51bGwsImRhdGEiOnsidHlwZSI6InVzZXIiLCJ1c2VyUG9vbElkIjoiNjEzODRkM2UzMDJmMWY3NWU2OWNlOTVhIiwiYXBwSWQiOiI2MTM4NGQzZWUxYjgxZGQxMzQyZTU2MzUiLCJpZCI6IjYxNDE4NzYzNDFhYmVkZWY5NzljMzc0MCIsInVzZXJJZCI6IjYxNDE4NzYzNDFhYmVkZWY5NzljMzc0MCIsIl9pZCI6IjYxNDE4NzYzNDFhYmVkZWY5NzljMzc0MCIsInBob25lIjpudWxsLCJlbWFpbCI6ImZwdHZtenF5eG5AYXV0aGluZy5jbiIsInVzZXJuYW1lIjpudWxsLCJ1bmlvbmlkIjpudWxsLCJvcGVuaWQiOm51bGwsImNsaWVudElkIjoiNjEzODRkM2UzMDJmMWY3NWU2OWNlOTVhIn0sInVzZXJwb29sX2lkIjoiNjEzODRkM2UzMDJmMWY3NWU2OWNlOTVhIiwiYXVkIjoiNjEzODRkM2VlMWI4MWRkMTM0MmU1NjM1IiwiZXhwIjoxNjMzNTA1NTM2LCJpYXQiOjE2MzIyOTU5MzYsImlzcyI6Imh0dHBzOi8vbjFzajY4LWRlbW8uYXV0aGluZy5jbi9vaWRjIn0.AbHOb16fKlz463533NdgMNtCW9n29u9aamS-LiKAOfQ",
			"phoneVerified": false,
			"lastLogin": "2021-09-22T07:32:16+00:00",
			"unionid": null,
			"browser": null,
			"signedUp": "2021-09-15T05:40:51+00:00"
		}]
	},
	"root": false,
	"id": "6142e833716601219e93d813",
	"createdAt": "2021-09-16T06:46:11+00:00",
	"name": "q2"
}
```

## 移动成员
> 移动节点成员

```js
OrgManagementClient().moveMembers(options)
```

#### 参数
- `options` \<object\> 
- `options.targetNodeId` \<string\> 目标节点 ID
- `options.sourceNodeId` \<string\> 源节点 ID
- `options.userIds` \<string[]\> 用户 ID 列表

#### 示例

```javascript
await managementClient.org.moveMembers({
targetNodeId:'NODEID', 
sourceNodeId:'OtherNodeId',
userIds:['USER_ID'],
})
```


## 删除成员
> 删除节点成员

```js
OrgManagementClient().removeMembers(nodeId, userIds)
```


#### 参数

- `nodeId` \<string\> 节点 ID
- `userIds` \<string[]\> 用户 ID 列表

#### 示例

```javascript
await managementClient.org.removeMembers('NODEID', ['USER_ID'])
```

#### 返回值
```json
{
	"code": null,
	"description": null,
	"updatedAt": "2021-09-16T06:46:11+00:00",
	"children": [],
	"order": null,
	"descriptionI18n": null,
	"depth": null,
	"orgId": "6142c2c41c6e6c6cc3edfd88",
	"path": ["6142c2c4f8abf18c6c978b2c", "6142c32360021c1a05081579", "6142e833716601219e93d813"],
	"nameI18n": null,
	"users": {
		"totalCount": 0,
		"list": []
	},
	"root": false,
	"id": "6142e833716601219e93d813",
	"createdAt": "2021-09-16T06:46:11+00:00",
	"name": "q2"
}
```

## 设置用户主部门
> 设置用户主部门

```js
OrgManagementClient().setMainDepartment(userId, departmentId)
```


#### 参数

- `userId` \<string\> 用户 ID
- `departmentId` \<string\> 部门 ID

#### 示例

```javascript
await managementClient.org.setMainDepartment('NODEID', 'departmentId')
```

#### 返回值
```json
{
  "message": "设置主部门成功",
  "code": 200
}
```

## 导出所有组织机构数据
> 导出所有组织机构，返回的数据结构为一个递归的数结构。

```js
OrgManagementClient().exportAll()
```


#### 示例

```javascript
const data = await managementClient.org.exportAll()
```

#### 示例数据

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

## 导出某个组织机构数据
> 导出某个组织机构数据
```js
OrgManagementClient().exportByOrgId()
```

#### 参数

- `orgId` \<string\> 组织机构 ID

#### 示例

```javascript
const data = await managementClient.org.exportByOrgId('ORG_ID')
```

#### 示例数据

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

## 获取组织机构被授权的所有资源列表
> 获取一个组织机构被授权的所有资源。

```js
OrgManagementClient.listAuthorizedResources(orgCode, namespace, options)

```


#### 参数

- `groupCode` \<string\> 组织机构 code；
- `namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)
- `options` \<object\>  
- `options.resourceType` \<string\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
  - `DATA`: 数据类型；
  - `API`: API 类型数据；
  - `MENU`: 菜单类型数据；
  - `BUTTON`: 按钮类型数据。

#### 示例

```javascript
managementClient.org.listAuthorizedResources('ORG_CODE', 'code')
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

## 获取组织机构节点被授权的所有资源
> 获取组织机构节点被授权的所有资源

```js
OrgManagementClient.listAuthorizedResourcesByNodeId(nodeId, namespace, options)
```


#### 参数

- `nodeId` \<string\> 分组 ID；
- `namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)
- `options` \<object\> 
- `options.resourceType` \<string\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
  - `DATA`: 数据类型；
  - `API`: API 类型数据；
  - `MENU`: 菜单类型数据；
  - `BUTTON`: 按钮类型数据。

#### 示例

```javascript
managementClient.org.listAuthorizedResourcesByNodeId('nodeId', 'code')
```

#### 示例数据

## 获取组织机构节点被授权的所有资源
> 获取组织机构节点被授权的所有资源

```js
OrgManagementClient.listAuthorizedResourcesByNodeCode(orgId, code, namespace, options)

```


#### 参数

- `orgId` \<string\> 组织机构 Id；
- `code` \<string\> 节点 Code；
- `namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)
- `options` \<object\> 
- `options.resourceType` \<string\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
  - `DATA`: 数据类型；
  - `API`: API 类型数据；
  - `MENU`: 菜单类型数据；
  - `BUTTON`: 按钮类型数据。

#### 示例

```javascript
managementClient.org.listAuthorizedResourcesByNodeCode('orgId' ,'nodeCode', 'code')
```
