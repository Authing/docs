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

```go
// CreateOrg
// 创建组织机构
func (c *Client) CreateOrg(req *model.CreateOrgRequest) (*model.OrgResponse, error)
```
#### 参数
- `req` \<CreateOrgRequest\>  
- `CreateOrgRequest.Name` \<string\> 组织机构名称，该名称会作为该组织机构根节点的名称
- `CreateOrgRequest.Code` \<string\> 根节点唯一标志，必须为合法的英文字符
- `CreateOrgRequest.Description` \<string\> 根节点描述

#### 示例

```go
    req := &model.CreateOrgRequest{
		Name: "GoSDKOrg2",
	}
	resp, _ := client.CreateOrg(req)
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
```go
// DeleteOrgById
// 删除组织机构
func (c *Client) DeleteOrgById(id string) (*model.CommonMessageAndCode, error) 
```

#### 参数
- `id` \<string\> 组织机构 ID

#### 示例

```go
resp, _ := client.DeleteOrgById("617224b00869fe94de9357de")
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
```go
// ListOrg
// 获取用户池组织机构列表
func (c *Client) ListOrg(page, limit int) (*model.PaginatedOrgs, error)
```
#### 参数
 
- `page` \<int\> 页号 默认值为 : `1`
- `limit` \<int\> 每页记录数 默认值为 : `10`

#### 示例

```go
resp, _ := client.ListOrg(1, 10)
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
```go
// GetOrgNodeById
// 获取某个节点详情
func (c *Client) GetOrgNodeById(id string) (*model.OrgNodeChildStr, error)
```
#### 参数
- `id` \<string\> 节点 ID
#### 示例
```go
resp, _ := client.GetOrgNodeById("61725b9f3ad07a44b85302b1")
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
```go
// AddOrgNode
// 在组织机构中添加一个节点
func (c *Client) AddOrgNode(req *model.AddOrgNodeRequest) (*model.AddNodeOrg, error)
```


#### 参数
- `req` \<AddOrgNodeRequest\>  
- `AddOrgNodeRequest.OrgId` \<string\> 组织机构 ID
- `AddOrgNodeRequest.ParentNodeId` \<string\> 父节点 ID
- `AddOrgNodeRequest.Name` \<string\> 节点名称
- `AddOrgNodeRequest.NameI18n` \<string\> 节点名称 国际化
- `AddOrgNodeRequest.Code` \<string\> 节点唯一标志
- `AddOrgNodeRequest.Description` \<string\> 节点描述信息
- `AddOrgNodeRequest.DescriptionI18n` \<string\> 节点描述信息 国际化

#### 示例

```go
    req := &model.AddOrgNodeRequest{
		Name:         "qqqw",
		ParentNodeId: "617230eba040848abb3689b7",
		OrgId:        "61722ececf7cd66d1ec27075",
	}
	resp, err := client.AddOrgNode(req)
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
```go
// UpdateOrgNode
// 修改节点
func (c *Client) UpdateOrgNode(req *model.UpdateOrgNodeRequest) (*model.Node, error)
```

#### 参数
- `req` \<UpdateOrgNodeRequest\> 
- `UpdateOrgNodeRequest.Id` \<string\> 节点唯一标志
- `UpdateOrgNodeRequest.Code` \<string\> 节点唯一标志
- `UpdateOrgNodeRequest.Name` \<string\> 节点名称
- `UpdateOrgNodeRequest.Description` \<string\> 节点描述信息

#### 示例

```go
    updateName := "updateName"
	req := &model.UpdateOrgNodeRequest{
		Name: &updateName,
		Id:   "617230eba040848abb3689b7",
	}
	resp, _ := client.UpdateOrgNode(req)
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
```go
// GetOrganizationById
// 获取组织机构详情
func (c *Client) GetOrganizationById(orgId string) (*model.Org, error)
```
#### 参数
- `orgId` \<string\> 组织机构 ID

#### 示例

```go
resp, _ := client.GetOrganizationById("60cd9d3ab98280ce211bc834")
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
```go
// DeleteOrgNode
// 删除节点
func (c *Client) DeleteOrgNode(orgId, nodeId string) (*model.CommonMessageAndCode, error)
```
#### 参数
 
- `orgId` \<string\> 组织机构 ID
- `nodeId` \<string\> 节点 ID

#### 示例

```go
resp, _ := client.DeleteOrgNode("617230eba040848abb3689b7", "6172315f5371116d5ad5ead9")
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
```go
// MoveOrgNode
// 移动节点
func (c *Client) MoveOrgNode(orgId, nodeId, targetParentId string) (*model.AddNodeOrg, error)
```
#### 参数
- `orgId` \<string\> 组织机构 ID
- `nodeId` \<string\> 需要移动的节点 ID
- `targetParentId` \<string\> 目标父节点 ID

#### 示例

```go
resp, _ := client.MoveOrgNode("6142c2c41c6e6c6cc3edfd88", "6142e08f64d5a8873598e9fb", "6142e03436f09aa7e66c1935")
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
```go
// IsRootNode
// 判断是否为根节点
func (c *Client) IsRootNode(orgId, nodeId string) (*bool, error)
```
#### 参数
- `nodeId` \<string\> 组织机构节点 ID
- `orgId` \<string\> 组织机构 ID
#### 示例

```go
resp, _ := client.IsRootNode("6142c2c41c6e6c6cc3edfd88", "6142e08f64d5a8873598e9fb")
```
#### 示例数据
```go
bool
```

## 获取子节点列表
> 查询一个节点的子节点列表
```go
// GetOrganizationChildren
// 获取子节点列表
func (c *Client) GetOrganizationChildren(nodeId string, depth int) (*[]model.Node, error)
```
#### 参数
- `nodeId` \<string\> 组织机构 ID
- `depth` \<int\> 深度

#### 示例
```go
resp, _ := client.GetOrganizationChildren("60cd9d3a4b96cfff16e7e5f4", 1)
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
```go
// SearchNodes
// 搜索组织机构节点
func (c *Client) SearchNodes(keywords string) (*[]model.OrgNodeChildStr, error)
```
#### 参数

- `keyword` \<string\> 组织机构名称关键字

#### 示例

```go
resp, _ := client.SearchNodes("qq")
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
```go
// GetRootNode
// 获取根节点
func (c *Client) GetRootNode(orgId string) (*model.OrgNodeChildStr, error)
```
#### 参数

- `orgId` \<string\> 组织机构 ID

#### 示例

```go
resp, _ := client.GetRootNode("6142c2c41c6e6c6cc3edfd88")
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
```go
// ImportNodeByJSON
// 通过 JSON 导入
func (c *Client) ImportNodeByJSON(jsonStr string) (*string, error) 
```
#### 参数

- `jsonStr` \<string\> JSON 格式的树结构，详细格式请见示例代码

#### 示例

```go
    json := `
	{	
		"name": "北京某某公司有限公司",
		"code": "example",
		"children": []
	}`
	resp, _ := client.ImportNodeByJSON(json)
```

## 添加成员
> 节点添加成员
```go
// AddMembers
// 节点添加成员
func (c *Client) AddMembers(nodeId string, userIds []string) (*model.Node, error)
```

#### 参数

- `nodeId` \<string\> 节点 ID
- `userIds` \<[]string\> 用户 ID 列表

#### 示例

```go
resp, _ := client.AddMembers("61722ece541df9301478b17d", []string{"6141876341abedef979c3740"})
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
```go
// ListMembers
// 获取节点成员
func (c *Client) ListMembers(req *model.ListMemberRequest) (*model.Node, error)
```

#### 参数

- `req` \<ListMemberRequest\> 
- `ListMemberRequest.Page` \<int\> 页号 默认值为 : `1`
- `ListMemberRequest.Limit` \<int\> 每页记录数 默认值为 : `10`
- `ListMemberRequest.IncludeChildrenNodes` \<bool\> 是否获取所有子节点的成员 默认值为 : `false`
- `ListMemberRequest.NodeId` \<string\> 节点 ID

#### 示例

```go
    var req = &model.ListMemberRequest{
		NodeId:               "60cd9d3a4b96cfff16e7e5f4",
		Page:                 1,
		Limit:                10,
		IncludeChildrenNodes: true,
	}
	resp1, _ := client.ListMembers(req)
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
```go
// MoveNodeMembers
// 移动节点成员
func (c *Client) MoveNodeMembers(nodeId, targetNodeId string, userIds []string) (*model.CommonMessageAndCode, error) 
```

#### 参数

- `nodeId` \<string\> 节点 ID
- `targetNodeId` \<string\> 目标节点 ID
- `userIds` \<[]string\> 用户 ID 列表

#### 示例

```go
resp, _ := client.MoveNodeMembers("617230eba040848abb3689b7",'xx', []string{"6141876341abedef979c3740"})
```

## 删除成员
> 删除节点成员
```go
// DeleteNodeMembers
// 删除节点成员
func (c *Client) DeleteNodeMembers(nodeId string, userIds []string) (*model.Node, error)
```

#### 参数

- `nodeId` \<string\> 节点 ID
- `userIds` \<[]string\> 用户 ID 列表

#### 示例

```go
resp, _ := client.DeleteNodeMembers("617230eba040848abb3689b7", []string{"6141876341abedef979c3740"})
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
```go
// ExportAll
// 导出所有组织机构
func (c *Client) ExportAll() ([]model.OrgNode, error) 
```
#### 示例

```go
resp, err := client.ExportAll()
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
```go
// ExportByOrgId
// 导出某个组织机构
func (c *Client) ExportByOrgId(orgId string) (*model.OrgNode, error)
```

#### 参数

- `orgId` \<string\>  组织机构 ID

#### 示例

```go
resp, _ := client.ExportByOrgId("6142c2c41c6e6c6cc3edfd88")
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
```go
// ListAuthorizedResourcesByNodeId
// 获取组织机构节点被授权的所有资源
func (c *Client) ListAuthorizedResourcesByNodeId(req *model.ListAuthorizedResourcesByIdRequest) (*struct {
	TotalCount int64                      `json:"totalCount"`
	List       []model.AuthorizedResource `json:"list"`
}, error)
```

#### 参数
- `req` \<ListAuthorizedResourcesByIdRequest\>  
- `ListAuthorizedResourcesByIdRequest.Id` \<string\> 部门 ID
- `ListAuthorizedResourcesByIdRequest.Namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)
- `ListAuthorizedResourcesByIdRequest.ResourceType` \<string\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
    - `DATA`: 数据类型
    - `API`: API 类型数据
    - `MENU`: 菜单类型数据
    - `BUTTON`: 按钮类型数据

#### 示例

```go
    req := &model.ListAuthorizedResourcesByIdRequest{Id: "61725b9f321fcc1ca9e36ddc"}
	resp, _ := client.ListAuthorizedResourcesByNodeId(req)
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
```go
// ListAuthorizedResourcesByNodeCode
// 获取组织机构节点被授权的所有资源
func (c *Client) ListAuthorizedResourcesByNodeCode(req *model.ListAuthorizedResourcesByNodeCodeRequest) (*struct {
	TotalCount int64                      `json:"totalCount"`
	List       []model.AuthorizedResource `json:"list"`
}, error)
```

#### 参数
- `req` \<ListAuthorizedResourcesByNodeCodeRequest\> 
- `ListAuthorizedResourcesByNodeCodeRequest.Code` \<string\> 资源 code
- `ListAuthorizedResourcesByNodeCodeRequest.Namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)
- `ListAuthorizedResourcesByNodeCodeRequest.ResourceType` \<string\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
    - `DATA`: 数据类型
    - `API`: API 类型数据
    - `MENU`: 菜单类型数据
    - `BUTTON`: 按钮类型数据

#### 示例

```go
    req := &model.ListAuthorizedResourcesByNodeCodeRequest{Code: "code"}
	resp, _ := client.ListAuthorizedResourcesByNodeCode(req)
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
```go
// SetMainDepartment
// 设置用户主部门
func (c *Client) SetMainDepartment(departmentId, userId string) (*model.CommonMessageAndCode, error)
```

#### 参数

- `userId` \<string\> 用户 ID
- `departmentId` \<string\> 部门 ID

#### 示例

```go
resp, _ := client.SetMainDepartment("6142e0483f54818690c99600", "6141876341abedef979c3740")
```

#### 示例数据
```json
{
  "message": "设置主部门成功",
  "code": 200
}
```
