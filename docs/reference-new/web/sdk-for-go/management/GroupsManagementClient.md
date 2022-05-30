# 管理分组

<LastUpdated/>

此模块用于管理 {{$localeConfig.brandName}} 分组，可以进行分组的增删改查、分组添加/删除用户、获取分组被授权的所有资源等操作。

```go
client := NewClient(userPoolId, secret)

client.ListGroups # 获取分组列表
client.CreateGroups # 创建分组
```

## 创建分组

```go
// CreateGroups
// 创建分组
func (c *Client) CreateGroups(req *model.CreateGroupsRequest) (*model.GroupModel, error)
```

创建分组，一个分组必须包含一个用户池全局唯一的标志符（code），此标志符必须为一个合法的英文标志符，如 developers；以及分组名称。

#### 参数
- `req` \<CreateGroupsRequest\> 
- `CreateGroupsRequest.Code` \<string\> 分组唯一标志符
- `CreateGroupsRequest.Name` \<string\> 分组名称
- `CreateGroupsRequest.Description` \<*string\> 描述

#### 示例

```go
    req := &model.CreateGroupsRequest{
		Code: "goSDK",
		Name: "goSDK",
	}
	resp, err := client.CreateGroups(req)
```

#### 返回值

```json
{
    "code": "developers",
    "name": "开发者",
    "description": null,
    "createdAt": "2021-05-06T15:36:33+08:00",
    "updatedAt": "2021-05-06T15:36:33+08:00"
}
```


## 修改分组


```go
// UpdateGroups
// 修改分组
func (c *Client) UpdateGroups(req *model.UpdateGroupsRequest) (*model.GroupModel, error)
```

修改分组，通过 code 唯一标志用户池中的一个分组。你可以修改此分组的 code。

#### 参数
- `req` \<UpdateGroupsRequest\> 
- `UpdateGroupsRequest.Code` \<string\> 分组唯一标志符
- `UpdateGroupsRequest.NewCode` \<*string\> 分组新的 code
- `UpdateGroupsRequest.Name` \<*string\> 新的名称
- `UpdateGroupsRequest.Description` \<*string\> 新的描述信息

#### 示例

```go
    newCode := "newGoSdk"
	req := &model.UpdateGroupsRequest{
		Code:    "goSDK",
		NewCode: &newCode,
	}
	resp, err := client.UpdateGroups(req)
```

#### 返回值

返回新的分组详情：

```json
{
    "code": "new-code",
    "name": "开发者",
    "description": null,
    "createdAt": "2021-05-06T15:36:33+08:00",
    "updatedAt": "2021-05-06T15:36:33+08:00"
}
```

## 获取分组详情

```go
// DetailGroups
// 获取分组详情
func (c *Client) DetailGroups(code string) (*model.GroupModel, error)
```

获取分组详情，通过 code 唯一标志用户池中的一个分组。

#### 参数

- `code` \<string\> 分组唯一标志符

#### 示例

```go
resp, err := client.DetailGroups("newGoSdk")
```

#### 返回值

```json
{
    "code": "developers",
    "name": "开发者",
    "description": null,
    "createdAt": "2021-05-06T15:36:33+08:00",
    "updatedAt": "2021-05-06T15:36:33+08:00"
}
```

## 获取分组列表

```go
// ListGroups
// 获取分组列表
func (c *Client) ListGroups(page, limit int) (*struct {
	TotalCount int64              `json:"totalCount"`
	List       []model.GroupModel `json:"list"`
}, error)
```

获取分组列表，此接口为分页接口。

#### 参数

- `page` \<int\> 页码数 默认值为 : `1`
- `limit` \<int\> 每页个数 默认值为 : `10`

#### 示例

```go
resp, err := client.ListGroups(1, 10)
```

#### 返回值

```json
{
  "totalCount": 2,
  "list": [
    {
      "code": "code1",
      "name": "名称1",
      "description": null,
      "createdAt": "2021-05-06T15:36:33+08:00",
      "updatedAt": "2021-05-06T15:36:33+08:00"
    },
    {
      "code": "code2",
      "name": "名称2",
      "description": null,
      "createdAt": "2021-05-06T15:36:33+08:00",
      "updatedAt": "2021-05-06T15:36:33+08:00"
    }
  ]
}
```

## 删除分组


```go
// DeleteGroups
// 删除分组
func (c *Client) DeleteGroups(code string) (*model.CommonMessageAndCode, error)
```

删除分组，通过 code 唯一标志用户池中的一个分组。

#### 参数

- `code` \<string\> 分组唯一标志符

#### 示例

```go
resp, err := client.DeleteGroups("newGoSdk")
```

#### 返回值

```json
{
  "code": 200,
  "massage": "删除分组成功"
}
```


## 批量删除分组


```go
// BatchDeleteGroups
// 批量删除分组
func (c *Client) BatchDeleteGroups(codes []string) (*model.CommonMessageAndCode, error)
```

通过分组的 code 批量删除分组。

#### 参数

- `codes` \<[]string\> 分组唯一标志符列表

#### 示例

```go
client.BatchDeleteGroups([]string{code})
```

#### 返回值

```json
{
  "code": 200,
  "massage": "删除分组成功"
}
```

## 获取分组用户列表

```go
// ListGroupsUser
// 获取分组用户列表
func (c *Client) ListGroupsUser(code string, page, limit int, withCustomData bool) (*struct {
	TotalCount int          `json:"totalCount"`
	List       []model.User `json:"list"`
}, error) 
```

获取用户列表。此接口为分页接口。

#### 参数

- `code` \<string\> 分组唯一标志符
- `page` \<int\> 页码数 默认值为 : `1`
- `limit` \<int\> 每页个数 默认值为 : `10`
- `withCustomData`: \<bool\> 是否获取自定义数据，默认为 false；如果设置为 true，将会在 `CustomData` 字段返回用户的所有自定义数据

```json
{
  "id": "604a12a261a85949c8ad0259",
  "customData": {
    "school": "清华大学",
    "age": 19
  }
}
```

#### 示例

- 获取分组 「group1」的用户（分页）

```go
resp, err := client.ListGroupsUser("group1", 1, 10, false)
```

- 获取用户列表的同时，获取用户的自定义数据

```go
resp, err := client.ListGroupsUser("group1", 1, 10, true)
```

#### 返回值

```json
{
  "totalCount": 2,
  "list": [
    {
        "customData": {
          "school": "清华大学",
          "age": 19
        }
    },
    {
        "customData": {
          "school": "清华大学",
          "age": 19
        }
    }
  ]
}
```

## 添加用户

```go
// AddUserToGroups
// 添加用户
func (c *Client) AddUserToGroups(code string, userIds []string) (*model.CommonMessageAndCode, error) 
```

分组添加用户。

#### 参数

- `code` \<string\> 分组唯一标志符
- `userIds` \<[]string\> 用户 ID 列表

#### 示例

```go
resp, err := client.AddUserToGroups("group1", []string{"uid"})
```

#### 返回值

```json
{
  "code": 200,
  "massage": "添加用户成功"
}
```

## 移除用户

```go
//RemoveGroupUsers
//移除用户
func (c *Client) RemoveGroupUsers(code string, userIds []string) (*model.CommonMessageAndCode, error)
```

分组移除用户。

#### 参数

- `code` \<string\> 分组唯一标志符
- `userIds` \<[]string\> 用户 ID 列表

#### 示例

```go
resp, err := client.RemoveGroupUsers("group1", []string{"uid"})
```

#### 返回值

```json
{
  "code": 200,
  "massage": "移除用户成功"
}
```

## 获取分组被授权的所有资源列表

```go
//ListGroupsAuthorizedResources
//获取分组被授权的所有资源
func (c *Client) ListGroupsAuthorizedResources(req *model.ListGroupsAuthorizedResourcesRequest) (*struct {
	TotalCount int64                      `json:"totalCount"`
	List       []model.AuthorizedResource `json:"list"`
}, error)
```

获取一个分组被授权的所有资源。

#### 参数

- `req` \<ListGroupsAuthorizedResourcesRequest\>
- `ListGroupsAuthorizedResourcesRequest.Code` \<string\> 分组 code
- `ListGroupsAuthorizedResourcesRequest.Namespace` \<*string\> 权限分组的 code，详情请见[使用权限分组管理权限资源](/guides/access-control/resource-group.md)
- `ListGroupsAuthorizedResourcesRequest.ResourceType` \<*EnumResourceType\> 可选，资源类型，默认会返回所有有权限的资源，现有资源类型如下：
  - `DATA`: 数据类型
  - `API`: API 类型数据
  - `MENU`: 菜单类型数据
  - `BUTTON`: 按钮类型数据

#### 示例

```go
    cc := model.EnumResourceTypeAPI
	nm := "default"
	req := &model.ListGroupsAuthorizedResourcesRequest{
		Code: "kcerb",
		//Code: "kmvnk",
		ResourceType: &cc,
		Namespace:    &nm,
	}
	resp, err := client.ListGroupsAuthorizedResources(req)
```

#### 示例数据

- `type` 为资源类型；
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
