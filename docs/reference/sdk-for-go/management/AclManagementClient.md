---
meta:
  - name: description
    content: 管理资源与权限 - Go SDK
---

# 管理资源与权限

<LastUpdated/>

{{$localeConfig.brandName}} 基于 ABAC（Attribute Base Access Control，基于属性的权限控制）构建权限模型，

可以和 RBAC （Role Based Access Control，基于角色的访问控制）结合，实现非常灵活、精细化的权限控制。

此模块将此模型抽象成了两个方法: Allow, IsAllowed。

你可以通过以下方式使用此模块：

```go
client := NewClient(userPoolId, secret)
client.Allow() # 允许某个用户对某个资源进行某个操作
client.IsAllowed() # 判断某个用户是否对某个资源有某个操作权限
```

## 创建权限分组

> 创建权限分组

```go
// CreateNamespace
// 创建权限分组
func (c *Client) CreateNamespace(request *model.EditNamespaceRequest) (*model.Namespace, error)
```

#### 参数

- `request` \<EditNamespaceRequest\>
- `EditNamespaceRequest.Code` \<string\> 权限分组唯一标识符
- `EditNamespaceRequest.Name` \<string\> 权限分组名
- `EditNamespaceRequest.Description` \<string\> 可选，权限分组描述

#### 示例

```go
    client := NewClient(userPoolId, secret)
	log.Println("==========创建权限分组==========")
	code := "qCode"
	name := "qName"
	req := &model.EditNamespaceRequest{
		Code: &code,
		Name: &name,
	}
	resp, err := client.CreateNamespace(req)
```

#### 示例数据

```json
{
  "appId": null,
  "appName": null,
  "name": "Test Namcepace",
  "code": "testNamesapce",
  "description": "This is a Test Namespace",
  "status": 1,
  "id": 38
}
```

## 获取权限分组列表

> 获取权限分组列表

```go
// ListNamespace
// 权限分组列表
func (c *Client) ListNamespace(page, limit int) (*struct {
	List  []model.Namespace `json:"list"`
	Total int64             `json:"total"`
}, error)
```

#### 参数

- `page` \<int\> 页码，默认为 1
- `limit` \<int\> 每页个数，默认为 10

#### 示例

```go
resp, err := client.ListNamespace(1, 10)
```

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

> 更新权限分组

```go
// UpdateNamespace
// 修改权限分组
func (c *Client) UpdateNamespace(id string, request *model.EditNamespaceRequest) (*model.Namespace, error)
```

#### 参数

- `id` \<string\> 权限分组 code
- `request` \<EditNamespaceRequest\>
- `EditNamespaceRequest.Code` \<string\> 可选，权限分组新的 code
- `EditNamespaceRequest.Name` \<string\> 可选，权限分组名称
- `EditNamespaceRequest.Description` \<string\> 可选，权限分组描述

#### 示例

```go
    client := NewClient(userPoolId, secret)
	log.Println("==========修改权限分组==========")
	code := "qCodeww"
	name := "qNameww"
	req := &model.EditNamespaceRequest{
		Code: &code,
		Name: &name,
	}
	resp, err := client.UpdateNamespace("54156", req)
```

#### 示例数据

```json
{
  "id": 38,
  "appId": null,
  "appName": null,
  "name": "Test Namcepace",
  "code": "testNamesapce",
  "description": "A New Name",
  "status": 1
}
```

## 删除权限分组

> 删除权限分组

```go
// DeleteNamespace
// 删除权限分组
func (c *Client) DeleteNamespace(id string) (*string, error)
```

#### 参数

- `id` \<string\> 权限分组标识

#### 示例

```go
resp, err := client.DeleteNamespace("54156")
```

## 获取资源列表

> 根据筛选条件，查询用户池下的资源列表

```go
// ListNamespaceResources
// 获取资源列表
func (c *Client) ListNamespaceResources(req model.ListResourceRequest) (*model.ListNamespaceResourceResponse, error)
```

#### 参数

- `req` \<ListResourceRequest\>
- `ListResourceRequest.Namespace` \<string\> 权限分组命名空间
- `ListResourceRequest.Type` \<EnumResourceType\> 资源类型，可选值为 `DATA`、`API`、`MENU`、`UI`、`BUTTON`
- `ListResourceRequest.Page` \<int\> 分页，获取第几页，默认从 1 开始
- `ListResourceRequest.Limit` \<int\> 每页条目数量，默认为 10

#### 示例

```go
    req := model.ListResourceRequest{
		ResourceType: model.EnumResourceTypeAPI,
		Namespace:    "default",
		Page:         1,
		Limit:        10,
	}
	resp, _ := client.ListNamespaceResources(req)
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

> 创建一个资源

```go
// CreateResource
// 创建资源
func (c *Client) CreateResource(req *model.CreateResourceRequest) (*model.ResourceResponse, error)
```

#### 参数

- `req` \<CreateResourceRequest\>
- `CreateResourceRequest.Code` \<string\> 资源标识符
- `CreateResourceRequest.Namespace` \<string\> 权限分组命名空间
- `CreateResourceRequest.Type` \<string\> 资源类型，可选值为 `DATA`、`API`、`MENU`、`UI`、`BUTTON`
- `CreateResourceRequest.Actions` \<[]ActionsModel\> 资源操作对象数组。其中 name 为操作名称，填写一个**动词**，description 为操作描述，填写描述信息
- `CreateResourceRequest.Description` \<string\> 资源描述信息

#### 示例

```go
    req := &model.CreateResourceRequest{
		Code:      "nmw",
		Namespace: "default",
		Actions: []model.ActionsModel{{
			Name:        "qqw",
			Description: "qwe",
		}},
	}
	resp, _ := client.CreateResource(req)
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

## 更新资源

> 更新一个资源

```go
// UpdateResource
// 更新资源
func (c *Client) UpdateResource(code string, req *model.UpdateResourceRequest) (*model.ResourceResponse, error)
```

#### 参数

- `code` \<string\> 资源标识符
- `req` \<UpdateResourceRequest\>
- `UpdateResourceRequest.Namespace` \<string\> 资源所在的权限分组标识
- `UpdateResourceRequest.Type` \<string\> 资源类型，可选值为 `DATA`、`API`、`MENU`、`UI`、`BUTTON`
- `UpdateResourceRequest.Actions` \<[]ActionsModel\> 资源操作对象数组。其中 name 为操作名称，填写一个**动词**，description 为操作描述，填写描述信息
- `UpdateResourceRequest.Description` \<string\> 资源描述信息

#### 示例

```go
    req := &model.UpdateResourceRequest{
		Namespace: "default",
		Actions: []model.ActionsModel{{
			Name:        "qqwcc",
			Description: "qwe",
		}},
	}
	resp, _ := client.UpdateResource("nmw", req)
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

> 删除资源

```go
// DeleteResource
// 删除资源
func (c *Client) DeleteResource(code, namespace string) (*string, error)
```

#### 参数

- `code` \<string\> 资源标识符
- `namespace` \<string\> 资源所在的权限分组标识

#### 示例

```go
resp, _ := client.DeleteResource("nmw", "default")
```

#### 返回数据

```go
bool
```

## 授权资源

> 将一个（类）资源授权给用户、角色、分组、组织机构，且可以分别指定不同的操作权限。

```go
//AuthorizeResource
//将一个（类）资源授权给用户、角色、分组、组织机构，且可以分别指定不同的操作权限。
func (c *Client) AuthorizeResource(request model.AuthorizeResourceRequest) (bool, error)
```

#### 参数

- `request` \<AuthorizeResourceRequest\>
- `AuthorizeResourceRequest.Namespace` \<string\> 权限分组 code
- `AuthorizeResourceRequest.Resource` \<string\> 资源，如一类资源可以表示为 `order`，某一个资源可以表示为 `order:123`
- `AuthorizeResourceRequest.ResourceType` \<EnumResourceType\> 资源类型
- `AuthorizeResourceRequest.Opts` \<[]AuthorizeResourceOpt\> 资源操作类型数组

#### 示例

```go
    var actions []string
	actions = append(actions, "*")
	opt := model.AuthorizeResourceOpt{
		TargetType:       model.EnumPolicyAssignmentTargetTypeUSER,
		TargetIdentifier: "xx",
		Actions:          actions,
	}
	var opts []model.AuthorizeResourceOpt
	opts = append(opts, opt)
	req := model.AuthorizeResourceRequest{
		Namespace:    "xx",
		Resource:     "7629:read",
		ResourceType: model.EnumResourceTypeBUTTON,
		Opts:         opts,
	}
	resp, _ := client.AuthorizeResource(req)
```

## 授权资源（快捷操作）

> 允许某个用户对某个资源进行某个操作

```go
//Allow
//允许某个用户对某个资源进行某个操作
func (c *Client) Allow(request model.AllowRequest) (bool, error)
```

#### 参数

- `request` \<AllowRequest\>
- `AllowRequest.UserId` \<string\> 用户 ID
- `AllowRequest.Action` \<string\> 操作名称，推荐使用 \<resourceType\>:\<actionName\> 的格式，如 `books:edit`, `books:list`
- `AllowRequest.Resource` \<string\> 资源名称, 必须为 \<resourceType\>:\<resourceId\> 格式或者为 _, 如 `_`,`books:123`,`books:\*`
- `AllowRequest.Namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)；

#### 示例

```go
    req := model.AllowRequest{
		Resource:  "7629:read",
		Action:    "add",
		UserId:    "xx",
		Namespace: "xx",
	}
	resp, _ := client.Allow(req)
```

## 取消授权资源

> 取消对某个资源的操作权限

```go
//RevokeResource
//批量撤销资源的授权
func (c *Client) RevokeResource(request model.RevokeResourceRequest) (bool, error)
```

#### 参数

- `request` \<RevokeResourceRequest\>
- `RevokeResourceRequest.Namespace` \<string\> 权限分组 code
- `RevokeResourceRequest.Resource` \<string\> 资源，如一类资源可以表示为 `order`，某一个资源可以表示为 `order:123`
- `RevokeResourceRequest.ResourceType` \<EnumResourceType\> 资源类型
- `RevokeResourceRequest.Opts` \<[]AuthorizeResourceOpt\> 资源操作类型数组

```go
	opt := model.AuthorizeResourceOpt{
		TargetType:       model.EnumPolicyAssignmentTargetTypeUser,
		TargetIdentifier: "61090ca34e01a3968d3e3b76",
		Actions:          actions,
	}
	var opts []model.AuthorizeResourceOpt
	opts = append(opts, opt)
	req := model.RevokeResourceRequest{
		Namespace:    "default",
		Resource:     "7629:read",
		ResourceType: model.EnumResourceTypeBUTTON,
		Opts:         opts,
	}
	resp, _ := client.RevokeResource(req)
```

## 判断某个用户是否对某个资源有某个操作权限

> 判断某个用户是否对某个资源有某个操作权限

```go
//IsAllowed
//判断某个用户是否对某个资源有某个操作权限
func (c *Client) IsAllowed(request model.IsAllowedRequest) (bool, error)
```

#### 参数

- `request` \<IsAllowedRequest\>
- `IsAllowedRequest.UserId` \<string\> 用户 ID
- `IsAllowedRequest.Action` \<string\> 操作名称，推荐使用 \<resourceType\>:\<actionName\> 的格式，如 `books:edit`, `books:list`
- `IsAllowedRequest.Resource` \<string\> 资源名称, 必须为 \<resourceType\>:\<resourceId\> 格式或者为 _, 如 `_`,`books:123`,`books:\*`
- `IsAllowedRequest.Namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)

#### 示例

```go
    req := model.IsAllowedRequest{
		Resource:  "7629:read",
		Action:    "read",
		UserId:    "611b2ff477d701441c25e29e",
		Namespace: nil,
	}
	resp, _ := client.IsAllowed(req)
```

## 获取用户被授权的所有资源列表

> 获取一个用户被授权的所有资源，用户被授权的所有资源里面包括从角色、分组、组织机构继承的资源

```go
// ListUserAuthorizedResources
// 获取用户被授权的所有资源
func (c *Client) ListUserAuthorizedResources(request model.ListUserAuthResourceRequest) (*model.AuthorizedResources, error)
```

#### 参数

- `request` \<ListUserAuthResourceRequest\>
- `ListUserAuthResourceRequest.UserId` \<string\> 用户 ID
- `ListUserAuthResourceRequest.Namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)
- `ListUserAuthResourceRequest.ResourceType` \<EnumResourceType\> 资源类型，可选值包含 DATA、API、MENU、UI、BUTTON

#### 示例

```go
    req := &model.ListUserAuthResourceRequest{
		Id:           "616d41b7410a33da0cb70e65",
		Namespace:    "default",
		ResourceType: model.EnumResourceTypeAPI,
	}
	resp, err := client.ListUserAuthorizedResources(*req)
```

#### 示例数据

- `type` 为资源类型，一共有以下几种资源类型
  - `DATA`: 数据类型
  - `API`: API 类型数据
  - `MENU`: 菜单类型数据
  - `BUTTON`: 按钮类型数据
- `code`: 资源描述符，如果是 `DATA` 类型资源，格式为 `resourceType:resourceId`，如 `books:*` 表示所有书籍，`books:1` 表示 ID 为 1 的书籍
- `actions`: 用户被授权对该资源的操作

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

> 获取一个角色被授权的所有资源

```go
// ListRoleAuthorizedResources
// 获取角色被授权的所有资源
func (c *Client) ListRoleAuthorizedResources(code, namespace string, resourceType model.EnumResourceType) (*model.AuthorizedResources, error)
```

#### 参数

- `code` \<string\> 角色 code
- `namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)
- `resourceType` \<EnumResourceType\> 可选，资源类型

#### 示例

```go
resp, err := client.ListRoleAuthorizedResources("NewCode", "default", model.EnumResourceTypeAPI)
```

#### 示例数据

- `type` \<string\> 资源类型
- `code` \<string\> 资源描述符，如果是 `DATA` 类型资源，格式为 `resourceType:resourceId`，如 `books:*` 表示所有书籍，`books:1` 表示 ID 为 1 的书籍
- `actions` \<string\> 用户被授权对该资源的操作

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

> 传入权限分组、资源标识、资源类型、操作权限项、主体类型，返回具备资源操作权限的主体标识符

```go
// GetAuthorizedTargets
// 获取具备某些资源操作权限的主体
func (c *Client) GetAuthorizedTargets(req *model.GetAuthorizedTargetsRequest) (*struct {
	TotalCount int64 `json:"totalCount"`
	List       []struct {
		Actions          string `json:"actions"`
		TargetType       string `json:"targetType"`
		TargetIdentifier string `json:"targetIdentifier"`
	} `json:"list"`
}, error)
```

#### 参数

- `req` \<GetAuthorizedTargetsRequest\>
- `GetAuthorizedTargetsRequest.Namespace` \<string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)
- `GetAuthorizedTargetsRequest.ResourceType` \<EnumResourceType\> 资源类型
- `GetAuthorizedTargetsRequest.Resource` \<string\> 资源 code
- `GetAuthorizedTargetsRequest.Actions` \<struct\> 操作
- `GetAuthorizedTargetsRequest.Actions.Op` \<struct\> 操作类型
- `GetAuthorizedTargetsRequest.Actions.List` \<struct\> 操作对象
- `GetAuthorizedTargetsRequest.TargetType` \<ResourceTargetTypeEnum\> 主体类型，可选值为 `USER`、`ROLE`、`ORG`、`GROUP`，含义为用户、角色、组织机构节点、用户分组

#### 示例

```go
    req := &model.GetAuthorizedTargetsRequest{
		TargetType:   constant.ROLE,
		Resource:     "cccccc",
		Namespace:    "default",
		ResourceType: model.EnumResourceTypeAPI,
	}
	resp, _ := client.GetAuthorizedTargets(req)
```

#### 示例数据

- `targetType` \<string\> 为主体类型
- `targetIdentifier` \<string\> 主体标识符，可能是用户 ID、角色 ID、组织结构节点 ID、用户分组 ID
- `actions` \<string\> 用户被授权对该资源的操作

```json
{
  "totalCount": 1,
  "list": [
    {
      "targetType": "USER",
      "targetIdentifier": "6063fcd01d0d2e39d4596904",
      "actions": ["write"]
    }
  ]
}
```

## 编程访问账号列表

> 编程访问账号列表

```go
// ProgrammaticAccessAccountList
// 编程访问账号列表
func (c *Client) ProgrammaticAccessAccountList(appId string, page, limit int) (*struct {
	TotalCount int64                             `json:"totalCount"`
	List       []model.ProgrammaticAccessAccount `json:"list"`
}, error)
```

#### 参数

- `appId` \<string\> 角色 code
- `page` \<int\> 页码，默认为 1
- `limit` \<int\> 每页个数，默认为 10

#### 示例

```go
resp, _ := client.ProgrammaticAccessAccountList("6168f95e81d5e20f9cb72f22", 1, 10)
```

#### 示例数据

```json
{
  "message": "获取编程访问账号列表成功",
  "code": 200,
  "data": {
    "totalCount": 1,
    "list": [
      {
        "userId": null,
        "updatedAt": "2021-09-15T07:06:34.151Z",
        "enabled": true,
        "secret": "msjjnzks2wwcj58ts632j5hpdxej",
        "appId": "6139c4d24e78a4d706b7",
        "remarks": null,
        "tokenLifetime": 600,
        "id": "61419b782f9c3925662e",
        "createdAt": "2021-09-15T07:06:32.603Z"
      }
    ]
  }
}
```

## 添加编程访问账号

> 添加编程访问账号

```go
// CreateProgrammaticAccessAccount
// 添加编程访问账号
func (c *Client) CreateProgrammaticAccessAccount(appId string, remark *string, tokenLifetime *int) (*model.ProgrammaticAccessAccount, error)
```

#### 参数

- `appId` \<string\> 应用 ID
- `remark` \<string\> 备注
- `tokenLifetime` \<int\> Token 过期时间 默认为 600

#### 示例

```go
resp, _ := client.CreateProgrammaticAccessAccount("6168f95e81d5e20f9cb72f22", nil, nil)
```

#### 示例数据

```json
{
  "message": "创建编程访问账号成功",
  "code": 200,
  "data": {
    "appId": "6139c4d24e78a4d706b754",
    "enabled": true,
    "tokenLifetime": 600,
    "userId": null,
    "secret": "8e202f761f11bdc8a6fa36992115",
    "updatedAt": "2021-09-24T03:38:01.148Z",
    "remarks": null,
    "id": "614d4819fc4f70b4b8b6d",
    "createdAt": "2021-09-24T03:38:01.148Z"
  }
}
```

## 禁用编程访问账号

> 禁用编程访问账号

```go
// DisableProgrammaticAccessAccount
// 禁用编程访问账号
func (c *Client) DisableProgrammaticAccessAccount(programmaticAccessAccountId string) (*model.ProgrammaticAccessAccount, error)
```

#### 参数

- `programmaticAccessAccountId` \<string\> 编程账号 ID

#### 示例

```go
resp, _ := client.DisableProgrammaticAccessAccount("617109c03d185a5092395cab")
```

#### 示例数据

```json
{
  "message": "修改编程访问账号成功",
  "code": 200
}
```

## 删除编程访问账号

> 删除编程访问账号

```go
// DeleteProgrammaticAccessAccount
// 删除编程访问账号
func (c *Client) DeleteProgrammaticAccessAccount(programmaticAccessAccountId string) (*string, error)
```

#### 参数

- `programmaticAccessAccountId` \<string\> 编程账号 ID

#### 示例

```go
resp, _ := client.DeleteProgrammaticAccessAccount("617109c03d185a5092395cab")
```

#### 示例数据

```json
{
  "message": "删除编程访问账号成功",
  "code": 200
}
```

## 启用编程访问账号

> 启用编程访问账号

```go
// EnableProgrammaticAccessAccount
// 启用编程访问账号
func (c *Client) EnableProgrammaticAccessAccount(programmaticAccessAccountId string) (*model.ProgrammaticAccessAccount, error)
```

#### 参数

- `programmaticAccessAccountId` \<string\> 编程账号 ID

#### 示例

```go
resp, _ := client.EnableProgrammaticAccessAccount("617109c03d185a5092395cab")
```

#### 示例数据

```json
{
  "message": "修改编程访问账号成功",
  "code": 200
}
```

## 刷新编程访问账号密钥

> 刷新编程访问账号密钥

```go
// RefreshProgrammaticAccessAccountSecret
// 刷新编程访问账号密钥
func (c *Client) RefreshProgrammaticAccessAccountSecret(programmaticAccessAccountId string, secret *string) (*model.ProgrammaticAccessAccount, error)
```

#### 参数

- `programmaticAccessAccountId` \<string\> 编程账号 ID
- `secret` \<string\> 秘钥

#### 示例

```go
resp, _ := client.RefreshProgrammaticAccessAccountSecret("617109c03d185a5092395cab", nil)
```

#### 示例数据

```json
{
  "message": "修改编程访问账号成功",
  "code": 200,
  "data": {
    "userId": null,
    "updatedAt": "2021-09-24T03:45:05.780Z",
    "enabled": true,
    "secret": "xjefjjst8nrdxk5haza248b4atepwj",
    "appId": "6139c4d24e78a4d706b754",
    "remarks": null,
    "tokenLifetime": 600,
    "id": "614d49c1c1435e85d2a600",
    "createdAt": "2021-09-24T03:45:05.648Z"
  }
}
```

## 根据 ID 获取单个资源

> 根据 ID 获取单个资源

```go
// GetResourceById
// 根据 ID 获取单个资源
func (c *Client) GetResourceById(id string) (*model.ResourceResponse, error)
```

#### 参数

- `id` \<string\> 主键

#### 示例

```go
resp, _ := client.GetResourceById("616cdf9d1642b20d8c2ec555")
```

#### 示例数据

```json
{
  "message": "",
  "code": 200,
  "data": {
    "code": "eyqcalgaeo",
    "description": null,
    "userPoolId": "61384d3e302f1f75e69ce9",
    "apiIdentifier": null,
    "actions": [
      {
        "name": "fwstxqxggy",
        "description": "uzzlxbbuea"
      }
    ],
    "namespaceId": 48070,
    "updatedAt": "2021-09-15T07:33:16.932Z",
    "type": "DATA",
    "id": "6141a1bc2129d0b8341522",
    "createdAt": "2021-09-15T07:33:16.932Z"
  }
}
```

## 根据 Code 获取单个资源

> 根据 Code 获取单个资源

```go
// GetResourceByCode
// 根据 Code 获取单个资源
func (c *Client) GetResourceByCode(code, namespace string) (*model.ResourceResponse, error)
```

#### 参数

- `namespace` \<string\> 命名空间
- `code` \<string\> 资源 Code

#### 示例

```go
resp, _ := client.GetResourceByCode("ddddd", "default")
```

#### 示例数据

```json
{
  "message": "",
  "code": 200,
  "data": {
    "code": "eyqcalgaeo",
    "description": null,
    "userPoolId": "61384d3e302f1f75e69ce9",
    "apiIdentifier": null,
    "actions": [
      {
        "name": "fwstxqxggy",
        "description": "uzzlxbbuea"
      }
    ],
    "namespaceId": 48070,
    "updatedAt": "2021-09-15T07:33:16.932Z",
    "type": "DATA",
    "id": "6141a1bc2129d0b8341522",
    "createdAt": "2021-09-15T07:33:16.932Z"
  }
}
```

## 启用应用访问控制策略

> 启用应用访问控制策略

```go
// EnableApplicationAccessPolicies
// 启用应用访问控制策略
func (c *Client) EnableApplicationAccessPolicies(appId string, req *model.ApplicationAccessPoliciesRequest) (*string, error)
```

#### 参数

- `appId` \<string\> 应用 ID
- `req` \<ApplicationAccessPoliciesRequest\>
- `ApplicationAccessPoliciesRequest.TargetType` \<ResourceTargetTypeEnum\> 对象类型
- `ApplicationAccessPoliciesRequest.TargetIdentifiers` \<[]string\> 对象 ID 集合
- `ApplicationAccessPoliciesRequest.Namespace` \<string\> 命名空间
- `ApplicationAccessPoliciesRequest.InheritByChildren` \<bool\> 是否内联子类

#### 示例

```go
    req := &model.ApplicationAccessPoliciesRequest{
		TargetType:        constant.USER,
		InheritByChildren: true,
		TargetIdentifiers: []string{"616e905ebc18f0f106973a29"},
		Namespace:         "default",
	}
	resp, _ := client.EnableApplicationAccessPolicies("6168f95e81d5e20f9cb72f22", req)
```

## 停用应用访问控制策略

> 停用应用访问控制策略

```go
// DisableApplicationAccessPolicies
// 停用应用访问控制策略
func (c *Client) DisableApplicationAccessPolicies(appId string, req *model.ApplicationAccessPoliciesRequest) (*string, error)
```

#### 参数

- `appId` \<string\> 应用 ID
- `req` \<ApplicationAccessPoliciesRequest\>
- `ApplicationAccessPoliciesRequest.TargetType` \<ResourceTargetTypeEnum\> 对象类型
- `ApplicationAccessPoliciesRequest.TargetIdentifiers` \<[]string\> 对象 ID 集合
- `ApplicationAccessPoliciesRequest.Namespace` \<string\> 命名空间
- `ApplicationAccessPoliciesRequest.InheritByChildren` \<bool\> 是否内联子类

#### 示例

```go
    req := &model.ApplicationAccessPoliciesRequest{
		TargetType:        constant.USER,
		InheritByChildren: true,
		TargetIdentifiers: []string{"616e905ebc18f0f106973a29"},
		Namespace:         "default",
	}
	resp, _ := client.DisableApplicationAccessPolicies("6168f95e81d5e20f9cb72f22", req)
```

## 删除应用访问控制策略

> 删除应用访问控制策略

```go
// DeleteApplicationAccessPolicies
// 删除应用访问控制策略
func (c *Client) DeleteApplicationAccessPolicies(appId string, req *model.ApplicationAccessPoliciesRequest) (*string, error)
```

#### 参数

- `appId` \<string\> 应用 ID
- `req` \<ApplicationAccessPoliciesRequest\>
- `ApplicationAccessPoliciesRequest.TargetType` \<ResourceTargetTypeEnum\> 对象类型
- `ApplicationAccessPoliciesRequest.TargetIdentifiers` \<[]string\> 对象 ID 集合
- `ApplicationAccessPoliciesRequest.Namespace` \<string\> 命名空间
- `ApplicationAccessPoliciesRequest.InheritByChildren` \<bool\> 是否内联子类

#### 示例

```go
    req := &model.ApplicationAccessPoliciesRequest{
		TargetType:        constant.USER,
		InheritByChildren: true,
		TargetIdentifiers: []string{"616e905ebc18f0f106973a29"},
		Namespace:         "default",
	}
	resp, _ := client.DeleteApplicationAccessPolicies("6168f95e81d5e20f9cb72f22", req)
```

## 配置「允许主体（用户、角色、分组、组织机构节点）访问应用」的控制策略

> 配置「允许主体（用户、角色、分组、组织机构节点）访问应用」的控制策略

```go
// AllowApplicationAccessPolicies
// 配置「允许主体（用户、角色、分组、组织机构节点）访问应用」的控制策略
func (c *Client) AllowApplicationAccessPolicies(appId string, req *model.ApplicationAccessPoliciesRequest) (*string, error)
```

#### 参数

- `appId` \<string\> 应用 ID
- `req` \<ApplicationAccessPoliciesRequest\>
- `ApplicationAccessPoliciesRequest.TargetType` \<ResourceTargetTypeEnum\> 对象类型
- `ApplicationAccessPoliciesRequest.TargetIdentifiers` \<[]string\> 对象 ID 集合
- `ApplicationAccessPoliciesRequest.Namespace` \<string\> 命名空间
- `ApplicationAccessPoliciesRequest.InheritByChildren` \<bool\> 是否内联子类

#### 示例

```go
    req := &model.ApplicationAccessPoliciesRequest{
		TargetType:        constant.USER,
		InheritByChildren: true,
		TargetIdentifiers: []string{"616e905ebc18f0f106973a29"},
		Namespace:         "default",
	}
	resp, _ := client.AllowApplicationAccessPolicies("6168f95e81d5e20f9cb72f22", req)
```

#### 示例数据

```json
{
  "message": "允许访问成功",
  "code": 200
}
```

## 配置「拒绝主体（用户、角色、分组、组织机构节点）访问应用」的控制策略

> 配置「拒绝主体（用户、角色、分组、组织机构节点）访问应用」的控制策略

```go
// DenyApplicationAccessPolicies
// 配置「拒绝主体（用户、角色、分组、组织机构节点）访问应用」的控制策略
func (c *Client) DenyApplicationAccessPolicies(appId string, req *model.ApplicationAccessPoliciesRequest) (*string, error)
```

#### 参数

- `appId` \<string\> 应用 ID
- `req` \<ApplicationAccessPoliciesRequest\>
- `ApplicationAccessPoliciesRequest.TargetType` \<ResourceTargetTypeEnum\> 对象类型
- `ApplicationAccessPoliciesRequest.TargetIdentifiers` \<[]string\> 对象 ID 集合
- `ApplicationAccessPoliciesRequest.Namespace` \<string\> 命名空间
- `ApplicationAccessPoliciesRequest.InheritByChildren` \<bool\> 是否内联子类

#### 示例

```go
    req := &model.ApplicationAccessPoliciesRequest{
		TargetType:        constant.USER,
		InheritByChildren: true,
		TargetIdentifiers: []string{"616e905ebc18f0f106973a29"},
		Namespace:         "default",
	}
	resp, _ := client.DenyApplicationAccessPolicies("6168f95e81d5e20f9cb72f22", req)
```

#### 示例数据

```json
{
  "message": "拒绝访问成功",
  "code": 200
}
```

## 更改默认应用访问策略（默认拒绝所有用户访问应用、默认允许所有用户访问应用）

> 更改默认应用访问策略（默认拒绝所有用户访问应用、默认允许所有用户访问应用）

```go
// UpdateDefaultApplicationAccessPolicy
// 更改默认应用访问策略（默认拒绝所有用户访问应用、默认允许所有用户访问应用）
func (c *Client) UpdateDefaultApplicationAccessPolicy(appId string, strategy constant.ApplicationDefaultAccessPolicies) (*model.Application, error)
```

#### 参数

- `appId` \<string\> 应用 ID
- `strategy` \<ApplicationDefaultAccessPolicies\> 默认策略 取值范围 ALLOW_ALL,DENY_ALL

#### 示例

```go
resp, _ := client.UpdateDefaultApplicationAccessPolicy("6168f95e81d5e20f9cb72f22", constant.AllowAll)
```

#### 示例数据

```json
{
  "message": "更新应用成功！",
  "code": 200,
  "data": {
    "oidcJWEConfig": null,
    "isOfficial": false,
    "protocol": "oidc",
    "adConnections": [],
    "casConfig": null,
    "isDemo": false,
    "updatedAt": "2021-09-23T07:13:21.225Z",
    "logo": "https://files.authing.co/authing-console/default-app-logo.png",
    "enableDeviceMutualExclusion": false,
    "id": "6139c4d24e78a4d706b75b",
    "isDeleted": false,
    "registerTabs": ["email", "phone"],
    "disabledCasConnections": [],
    "ssoPageCustomizationSettings": null,
    "isIntegrate": false,
    "oauthProviderEnabled": false,
    "userPoolId": "61384d3e302f1f75e69ce",
    "jwks": {
      "keys": [
        {
          "use": "sig",
          "e": "AQAB",
          "d": "DSyYiMZcqFQ_plqFTJ1CXcJ0Vs2x3nMPpt9gShVdh6HgnLTfRbBALIPlyEC0PYL_JnpgZW92qff1q-9YB39zbvUes4ZdrhCPpONyhTj5UVWCb2xvguebzLgdQmMM1GIWP8y7kAL9mk01bNr7yj3Qt0EjIEaXiiwvclg-YvGjyvCHRfCPV5181Ia3Rw_zYvFNXNYqvAKEKrKuk-5fZbz0Mw3CzdMkc4vqCvMk7eGnTaO-uaRZZe3ZKBkStf27N4KOwHT1mBd8XCAK0aWfyG2-zU6hLJRTPVEpOxkWyq7RRwB4_oGUUpqEzxY_ll8yaqHLh3nWY0i9Kny1u6eZjxTh-Q",
          "alg": "RS256",
          "n": "xczXb-UbE9FQjzqvxujGLIDqMqyVNbfATdP277vx-6AQzsOIReF-qqu9YmG8rzJM6nLEdf4DBDNa1xB6Y8n7GPU_UcJ9alf0lwZbpeLxLhZj38tjfM-KBM3auqMdHW_DHcrTw5_pUfq0pAE1-Dw6tgkr5KdBFfoc4tVn0Y1TuaXTBlabmQAJgcqc0CUlKfbUnbBbsPGbA2w3yUnOBB74XBoXSRYr-zRQBJ8aZ0IOsqovrkAFoSBMzmGxwR2IKlyBxYyWZU8_x8Q_l3BUsQRCPXuOkUn_G2aVeV3biT9u6FGKH-tLxfgeC_LFVsbNUjgIT5mHBrPu2lQwu2BHCeAbKw",
          "q": "xf779mhxY66ed2CMxILWQOOdN3uraBML-3kxBB2oNM27sBawyaMylLEvvYx5gyefZbAf0jbYeM4iB_-uOlR5O5vKy6srzekJmfU-aqtgOM8fJrUpywZsU5xr_jWrgxn3DUp3vHgzVTfaGXe81gyzt8AtP6plpd3MXOnfRql0j78",
          "p": "_78q8phf8AOkgQ7A4JI1QxPGkmXhBS5CQAfJTQgMfyv1jFh2QjkE3TuN3fAn5X4T-bWw00YyiKQZQnjcYLTDw7p1ms70NNcFx1_leFvDooAMJYQuwkQ5gbdGFwzA6B8vf6ZwwTPqAIJHUN8NNDea04GPecp_o_7TPHv5oOpzz5U",
          "kty": "RSA",
          "qi": "ONZxbv_aFoh7WIBbYthhbg8KkTg6FMmgkNbXPCcSdWwbetVBXH7Xky-rwg2-ZJbc7lalFnTaTeSi64un4G-YMi7css5zstORCGT0K-MWi39WazE2c783oCwtCH5eZs1PnGWty6adpLFx2b2ESymB9h3nPxWF3NHKqCuTqxLUnPg",
          "kid": "JjhmE834pqVVPHQOYxIu244hrNITJw9SmKVddwxSvN8",
          "dp": "juU3j_kHkcnXPq0Jo_DNhb8k8mOuSQDBz5kKJtpacSwUtOgwm2vUhfBioiEviZDahGm6dTIBxks6OePh7r7Rqykh0O_VjzidZ_ry8j8DnmZBYyzqG22XXB0VMofTuV7DYWWUFr90_ffM9SjL7eMrxQXdLsWwb-dQC7mRjxGwx8k",
          "dq": "r3bkFh_C9QMH_mU6-t-0Pjc42bWoVogio05oiOw7Z-g2_7tsGpWdOra3xzRZb0jK8tQdry7Zsl2DPTFyVtELyy6qjsn3_PgbgSwcj22mzVGImsYL7peXopVKAzPO9lUpYsbuy8B-RXREvTMmz07caehOcVBx2odwF5tPOpDr8oM"
        }
      ]
    },
    "oauthConfig": {
      "introspection_endpoint_auth_method": "client_secret_post",
      "redirect_uris": ["https://www.authing.cn"],
      "access_token_lifetime": 1209600,
      "refresh_token_lifetime": 2592000,
      "grants": ["authorization_code"],
      "revocation_endpoint_auth_method": "client_secret_post",
      "id": "6139c4d24e78a4d706b7545b"
    },
    "extendsFields": [],
    "skipMfa": false,
    "oidcProviderEnabled": true,
    "createdAt": "2021-09-09T08:24:50.150Z",
    "template": null,
    "isDefault": false,
    "extendsFieldsEnabled": false,
    "ssoEnabled": false,
    "samlConfig": null,
    "description": null,
    "disabledSocialConnections": null,
    "samlProviderEnabled": false,
    "enableSubAccount": true,
    "disabledOauth2Connections": [],
    "loginRequireEmailVerified": false,
    "disabledSamlConnections": [],
    "oidcConfig": {
      "token_endpoint_auth_method": "client_secret_post",
      "post_logout_redirect_uris": [],
      "refresh_token_expire": 2592000,
      "cas_expire": 1209600,
      "access_token_expire": 1209600,
      "skip_consent": true,
      "grant_types": ["authorization_code", "password", "refresh_token"],
      "authorization_code_expire": 600,
      "id_token_signed_response_alg": "HS256",
      "redirect_uris": ["https://www.authing.cn"],
      "response_types": ["code"],
      "client_id": "6139c4d24e78a4d706b7545b",
      "id_token_expire": 1209600
    },
    "defaultLoginTab": "password",
    "redirectUris": ["https://www.authing.cn"],
    "showAuthorizationPage": false,
    "casProviderEnabled": false,
    "passwordTabConfig": {
      "enabledLoginMethods": [
        "username-password",
        "email-password",
        "phone-password"
      ]
    },
    "name": "go sdk unittest xtgf",
    "qrcodeScanning": {
      "redirect": false,
      "interval": 1500
    },
    "disabledAzureAdConnections": [],
    "agreementEnabled": false,
    "ext": null,
    "registerDisabled": false,
    "css": "/* \n  Edit login page css\n  eg：\n  .authing-guard-layout {\n    background: black !important;\n  }\n  Change the background color\n*/",
    "disabledOidcConnections": [],
    "ldapConnections": null,
    "identifier": "go-sdk-unittest-tlhs",
    "permissionStrategy": {
      "denyPolicyId": "6141af53fd36e046da0e2b",
      "defaultStrategy": "ALLOW_ALL",
      "enabled": true,
      "allowPolicyId": "6141af531fad402eac9f79"
    },
    "logoutRedirectUris": [],
    "loginTabs": ["phone-code", "password"],
    "defaultRegisterTab": "email"
  }
}
```
