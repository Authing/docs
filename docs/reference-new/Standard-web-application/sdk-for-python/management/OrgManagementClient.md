---
meta:
  - name: description
    content: 管理组织机构
---

# 管理组织机构

<LastUpdated/>


> 一个 {{$localeConfig.brandName}} 用户池可以创建多个组织机构。此模块用于管理 {{$localeConfig.brandName}} 组织机构，可以进行组织机构的增删改查、添加删除移动节点、导入组织机构等操作。

## 创建组织机构
> 创建组织机构，会创建一个只有一个节点的组织机构。
> 如果你想将一个完整的组织树导入进来，请使用 importByJson 方法。

```python
def create(self, name, code=None, description=None)
```
#### 参数
 
- `name` \<str\> 组织机构名称，该名称会作为该组织机构根节点的名称
- `code` \<str\> 根节点唯一标志，必须为合法的英文字符
- `description` \<str\> 根节点描述

#### 示例

```python
management.org.create("xx2")
```
#### 示例数据
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
```python
def delete_by_id(self, id)
```

#### 参数
- `id` \<str\> 组织机构 ID

#### 示例

```python
 management.org.delete_by_id('orgid')
```

#### 示例数据
```json
{
	"message": "delete org succeed",
	"code": 200
}
```

## 获取用户池组织机构列表
> 获取用户池组织机构列表
```python
def list(self, page=1, limit=10, treeify=False)
```
#### 参数
 
- `page` \<int\> 页号 默认值为 : `1`
- `limit` \<int\> 每页记录数 默认值为 : `10`
- `treeify` \<bool\> 返回结果是否树化

#### 示例

```python
management.org.list(treeify=True)
```

#### 示例数据
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

## 根据节点 ID 查询节点
> 根据节点 ID 查询节点
```python
def get_node_by_id(self, node_id)
```
#### 参数
- `node_id` \<str\> 节点 ID
#### 示例
```python
management.org.get_node_by_id("nodeid")
```
#### 示例数据
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

## 添加节点
> 在组织机构中添加一个节点
```python
def add_node(self, org_id, name, parent_node_id,
 code=None, description=None, order=None, name_i18n=None, description_i18n=None)
```


#### 参数
 
- `org_id` \<str\> 组织机构 ID
- `parent_node_id` \<str\> 父节点 ID
- `name` \<str\> 节点名称
- `name_i18n` \<str\> 节点名称 国际化
- `code` \<str\> 节点唯一标志
- `description` \<str\> 节点描述信息
- `description_i18n` \<str\> 节点描述信息 国际化

#### 示例

```python
management.org.add_node(org_id='6142c2c41c6e6c6cc3edf8', 
                        parent_node_id='6142c2c4f8abf18c6c978c',
                        name='add')
```
#### 示例数据
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
## 修改节点
> 修改节点数据
```python
def update_node(self, node_id, name=None, code=None, description=None)
```

#### 参数

- `id` \<str\> 节点唯一标志
- `code` \<str\> 节点唯一标志
- `name` \<str\> 节点名称
- `description` \<str\> 节点描述信息

#### 示例

```python
management.org.update_node('6142c32360021c1a05081579', name='qqqx')
```
#### 示例数据
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
```python
def find_by_id(self, org_id, treeify=False)
```
#### 参数

- `org_id` \<str\> 组织机构 ID
- `treeify` \<bool\> 结果是否树化

#### 示例

```python
management.org.find_by_id('6142c2c41c6e6c6cc3edfd88',treeify=True)
```
#### 示例数据
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
```python
def delete_node(self, org_id, node_id)
```
#### 参数
 
- `org_id` \<str\> 组织机构 ID
- `node_id` \<str\> 节点 ID

#### 示例

```python
 management.org.delete_node(org_id="6142c2c41c6e6c6cc3edfd88", node_id='6142dfc193be89f7dfacf991')
```
#### 示例数据
```json
{
  "message": "删除成功",
  "code": 200
}
```
## 移动节点
> 移动组织机构节点，移动某节点时需要指定该节点新的父节点。注意不能将一个节点移动到自己的子节点下面。
```python
def move_node(self, org_id, node_id, target_parent_id, treeify=False)
```
#### 参数

- `org_id` \<str\> 组织机构 ID
- `node_id` \<str\> 需要移动的节点 ID
- `target_parent_id` \<str\> 目标父节点 ID
- `treeify` \<bool\> 结果是否树化

#### 示例

```python
management.org.move_node(org_id="6142c2c41c6e6c6cc3edfd88", 
                        node_id='6142e08f64d5a8873598e9fb',
                        target_parent_id='6142e03436f09aa7e66c1935')
```
#### 示例数据
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
```python
def is_root_node(self, org_id, node_id)
```
#### 参数
- `node_id` \<str\> 组织机构节点 ID
- `org_id` \<str\> 组织机构 ID
#### 示例

```python
management.org.is_root_node(org_id="6142c2c41c6e6c6cc3edfd88",node_id='6142e08f64d5a8873598e9fb')
```
#### 示例数据
```python
bool
```

## 获取子节点列表
> 查询一个节点的子节点列表
```python
def list_children(self, node_id)
```
#### 参数
- `node_id` \<str\> 组织机构 ID

#### 示例
```python
management.org.list_children("6142c32360021c1a05081579")
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

## 模糊搜索组织节点
> 通过节点名称模糊搜索组织节点
```python
def search_nodes(self, keyword)
```
#### 参数

- `keyword` \<str\> 组织机构名称关键字

#### 示例

```python
management.org.search_nodes("xx2")
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
```python
def root_node(self, org_id)
```
#### 参数

- `org_id` \<str\> 组织机构 ID

#### 示例

```python
management.org.root_node("6142c2c41c6e6c6cc3edfd88")
```
#### 示例数据
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
```python
def import_by_json(self, json_str)
```
#### 参数

- `json_str` \<str\> JSON 格式的树结构，详细格式请见示例代码

#### 示例

```python
json ="""
                {
                    "name": "北京非凡科技有限公司",
                    "code": "feifan",
                    "children": [{

                    "code": "operation",
                    "name": "运营",
                    "description": "商业化部门"
                },
                {
        
                    "code": "dev",
                    "name": "研发",
                    "description": "研发部门",
                    "children": [{
        
                        "code": "backend",
                        "name": "后端",
                        "description": "后端研发部门"
                    }]
                }
            ]
            } """
        management.org.import_by_json(json)
```

## 添加成员
> 节点添加成员
```python
def add_members(self, node_id, user_ids)
```

#### 参数

- `node_id` \<str\> 节点 ID
- `user_ids` \<list\> 用户 ID 列表

#### 示例

```python
management.org.add_members("6142e833716601219e93d813",["6141876341abedef979c3740"])
```
#### 示例数据
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
			"email": "fptvmzqyxn@authing.cn",
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
```python
def list_members(self,node_id, page=None,limit=None, include_children_nodes=None)
```

#### 参数

- `page` \<int\> 页号 默认值为 : `1`
- `limit` \<int\> 每页记录数 默认值为 : `10`
- `include_children_nodes` \<bool\> 是否获取所有子节点的成员 默认值为 : `false`
- `node_id` \<str\> 节点 ID

#### 示例

```python
management.org.list_members(node_id='6142e833716601219e93d813',page=2)
```
#### 示例数据
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
			"email": "fptvmzqyxn@authing.cn",
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

```python
def move_members(self, user_ids, target_node_id, source_node_id)
```

#### 参数
- `target_node_id` \<str\> 目标节点 ID
- `source_node_id` \<str\> 源节点 ID
- `user_ids` \<str[]\> 用户 ID 列表

#### 示例

```python
management.org.move_members(["6141876341abedef979c3740"], target_node_id="6142e08f64d5a8873598e9fb",
                                             source_node_id="6142e83c8db6a68ea5e62aca")
```


## 删除成员
> 删除节点成员
```python
def delete_members(self, node_id, user_ids)
```

#### 参数

- `node_id` \<str\> 节点 ID
- `user_ids` \<list\> 用户 ID 列表

#### 示例

```python
management.org.delete_members("6142e08f64d5a8873598e9fb",["6141876341abedef979c3740"])
```
#### 示例数据
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

## 导出所有组织机构数据
> 导出所有组织机构，返回的数据结构为一个递归的数结构。
```python
def export_all(self)
```
#### 示例

```python
management.org.export_all()
```

#### 示例数据

```json
{
  "message": "导出数据成功",
  "code": 200,
  "data": [{
    "leaderUserId": null,
    "code": "codes",
    "name": "xx2",
    "userPoolId": "61384d3e302f1f75e69ce95a",
    "source": null,
    "sourceData": null,
    "dataVersion": null,
    "__groupid": null,
    "__id": null,
    "order": null,
    "descriptionI18n": null,
    "__parentid": null,
    "orgId": "6142c2c41c6e6c6cc3edfd88",
    "members": [],
    "updatedAt": "2021-09-16T10:24:03.370Z",
    "nameI18n": null,
    "children": [{
      "leaderUserId": null,
      "code": null,
      "name": "add",
      "userPoolId": "61384d3e302f1f75e69ce95a",
      "source": [],
      "sourceData": null,
      "dataVersion": null,
      "__groupid": null,
      "__id": null,
      "order": null,
      "descriptionI18n": null,
      "__parentid": null,
      "orgId": "6142c2c41c6e6c6cc3edfd88",
      "members": [],
      "updatedAt": "2021-09-23T08:48:20.338Z",
      "nameI18n": null,
      "children": [],
      "id": "614c3f54d02c0253e13de53e",
      "createdAt": "2021-09-23T08:48:20.338Z",
      "description": null
    }],
    "id": "6142c2c4f8abf18c6c978b2c",
    "createdAt": "2021-09-16T04:06:28.097Z",
    "description": ""
  }]
}
```

## 导出某个组织机构数据
>导出某个组织机构数据
```python
def export_by_org_id(self,org_id)
```

#### 参数

- `org_id` \<str\>  组织机构 ID

#### 示例

```python
management.org.export_by_org_id('6142c2c41c6e6c6cc3edfd88')
```

#### 示例数据

```json
{
  "message": "导出数据成功",
  "code": 200,
  "data": [{
    "leaderUserId": null,
    "code": "codes",
    "name": "xx2",
    "userPoolId": "61384d3e302f1f75e69ce95a",
    "source": null,
    "sourceData": null,
    "dataVersion": null,
    "__groupid": null,
    "__id": null,
    "order": null,
    "descriptionI18n": null,
    "__parentid": null,
    "orgId": "6142c2c41c6e6c6cc3edfd88",
    "members": [],
    "updatedAt": "2021-09-16T10:24:03.370Z",
    "nameI18n": null,
    "children": [{
      "leaderUserId": null,
      "code": null,
      "name": "add",
      "userPoolId": "61384d3e302f1f75e69ce95a",
      "source": [],
      "sourceData": null,
      "dataVersion": null,
      "__groupid": null,
      "__id": null,
      "order": null,
      "descriptionI18n": null,
      "__parentid": null,
      "orgId": "6142c2c41c6e6c6cc3edfd88",
      "members": [],
      "updatedAt": "2021-09-23T08:48:20.338Z",
      "nameI18n": null,
      "children": [],
      "id": "614c3f54d02c0253e13de53e",
      "createdAt": "2021-09-23T08:48:20.338Z",
      "description": null
    }],
    "id": "6142c2c4f8abf18c6c978b2c",
    "createdAt": "2021-09-16T04:06:28.097Z",
    "description": ""
  }]
}
```

## 获取部门被授权的所有资源列表
> 获取一个部门被授权的所有资源。
```python
def list_authorized_resources(self, node_id, namespace=None, resource_type=None)
```

#### 参数

- `node_id` \<str\> 部门 ID
- `namespace` \<str\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)
- `resourceType` \<str\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
    - `resource_type`: 数据类型；
    - `API`: API 类型数据；
    - `MENU`: 菜单类型数据；
    - `BUTTON`: 按钮类型数据。

#### 示例

```python
management.org.list_authorized_resources(
            node_id=node_id,
            namespace='default'
        )
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


## 获取组织机构节点被授权的所有资源
> 获取组织机构节点被授权的所有资源。
```python
def list_authorized_resources_by_code(self, org_id, code, namespace=None, resource_type=None)
```

#### 参数

- `org_id` \<str\> 部门 ID
- `code` \<str\> 资源 code
- `namespace` \<str\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)
- `resource_type` \<str\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
    - `DATA`: 数据类型；
    - `API`: API 类型数据；
    - `MENU`: 菜单类型数据；
    - `BUTTON`: 按钮类型数据。

#### 示例

```python
management.org.list_authorized_resources_by_code(
            org_id=node_id,
            code='code'
            namespace='default'
        )
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



## 设置用户主部门
> 设置用户主部门。
```python
def set_main_department(self, user_id, department_id)
```

#### 参数

- `user_id` \<str\> 用户 ID
- `department_id` \<str\> 部门 ID

#### 示例

```python
management.org.set_main_department("6141876341abedef979c3740","6142e0483f54818690c99600")
```

#### 示例数据
```json
{
  "message": "设置主部门成功",
  "code": 200
}
```

