---
meta:
  - name: description
    content: 管理角色
---

# 管理角色

<LastUpdated/>


此模块用于管理 {{$localeConfig.brandName}} 角色，可以进行角色的增删改查、角色添加/删除用户等操作。


请通过以下方式使用该模块：

```go
client := NewClient(userPoolId, secret)
client.roles.ListRole() # 获取角色列表
client.roles.CreateRole() # 创建角色
```

## 创建角色
>创建角色，可以指定不同的权限分组
```go
// CreateRole 创建角色
func (c *Client) CreateRole(request model.CreateRoleRequest) (*model.Role, error)
```
#### 参数
- `request` \<CreateRoleRequest\> 
- `CreateRoleRequest.Code` \<string\> 角色唯一标志符
- `CreateRoleRequest.Description` \<string\> 描述
- `CreateRoleRequest.Namespace` \<string\> 权限分组 code

#### 示例
```go
    req := model.CreateRoleRequest{
		Code: "develop123456",
	}
	resp, err := client.CreateRole(req)
```

## 删除角色
>删除角色
```go
// DeleteRole
// 删除角色
func (c *Client) DeleteRole(request model.DeleteRoleRequest) (*model.CommonMessageAndCode, error)
```
#### 参数
- `request` \<DeleteRoleRequest\> 
- `DeleteRoleRequest.Code` \<string\> 角色唯一标志符
- `DeleteRoleRequest.Namespace` \<string\> 权限分组 code

#### 示例

```go
    req := model.DeleteRoleRequest{
		Code: "develop123456",
	}
	resp, err := client.DeleteRole(req)
```

## 批量删除角色
>批量删除角色
```go
// BatchDeleteRole
// 批量删除角色
func (c *Client) BatchDeleteRole(request model.BatchDeleteRoleRequest) (*model.CommonMessageAndCode, error)
```
#### 参数
- `request` \<BatchDeleteRoleRequest\>  
- `BatchDeleteRoleRequest.CodeList` \<[]string\> 角色唯一标志符列表
- `BatchDeleteRoleRequest.Namespace` \<string\> 权限分组 code

#### 示例

```go
    req := model.BatchDeleteRoleRequest{
		CodeList: []string{"develop123456", "develop1234562"},
	}
	resp, err := client.BatchDeleteRole(req)
```

## 修改角色
>修改角色
```go
// UpdateRole
// 更新角色
func (c *Client) UpdateRole(request model.UpdateRoleRequest) (*model.Role, error)
```
#### 参数
- `request` \<UpdateRoleRequest\>  
- `UpdateRoleRequest.Code` \<string\> 角色唯一标志符
- `UpdateRoleRequest.Description` \<string\> 描述信息
- `UpdateRoleRequest.NewCode` \<string\> 新的唯一标志符
- `UpdateRoleRequest.Namespace` \<string\> 权限分组 code

#### 示例

```go
    updateRequest := model.UpdateRoleRequest{
		Code: "ttCode",
	}
	resp, err = client.UpdateRole(updateRequest)
```

## 获取角色详情
>获取角色详情
```go
// RoleDetail
// 角色详情
func (c *Client) RoleDetail(request model.RoleDetailRequest) (*model.Role, error)
```
#### 参数
- `request` \<RoleDetailRequest\> 
- `RoleDetailRequest.Code` \<string\> 角色唯一标志符
- `RoleDetailRequest.Namespace` \<string\> 权限分组 code

#### 示例

```go
    req := model.RoleDetailRequest{
		Code: "NewCode",
	}
	resp, err := client.RoleDetail(req)
```

## 获取角色列表
>获取某一个权限分组下的角色列表
```go
// GetRoleList
// 获取角色列表
func (c *Client) GetRoleList(request model.GetRoleListRequest) (*model.PaginatedRoles, error)
```
#### 参数
- `request` \<GetRoleListRequest\> 
- `GetRoleListRequest.Page` \<int\> 页码数 默认值为 : `1`
- `GetRoleListRequest.Limit` \<int\> 每页个数 默认值为 : `10`
- `GetRoleListRequest.Namespace` \<string\> 权限分组 code

#### 示例
```go
    req := model.GetRoleListRequest{
		Page:   1,
		Limit:  10,
		SortBy: enum.SortByCreatedAtAsc,
	}
	resp, _ := client.GetRoleList(req)
```

## 获取用户列表
>获取用户列表。此接口为分页接口
```go
// GetRoleUserList
// 获取角色用户列表
// GetRoleUserList
// 获取角色用户列表
func (c *Client) GetRoleUserList(request model.GetRoleUserListRequest) (*struct {
	TotalCount int64        `json:"totalCount"`
	List       []model.User `json:"list"`
}, error)
```
#### 参数
- `request` \<GetRoleUserListRequest\> 
- `GetRoleUserListRequest.Code` \<string\> 角色唯一标志符
- `GetRoleUserListRequest.Page` <int\> 页码数 默认值为 : `1`
- `GetRoleUserListRequest.Limit` \<int\> 每页个数 默认值为 : `10`
- `GetRoleUserListRequest.Namespace` \<string\> 权限分组 code

#### 示例
 
```go
    req := model.GetRoleUserListRequest{
		Page:      1,
		Limit:     10,
		Code:      "develop",
		Namespace: &defaultNamespace,
	}
	resp, _ := client.GetRoleUserList(req)
```
 
## 添加用户
> 添加用户

```go
// AssignRole
// 角色 添加用户
func (c *Client) AssignRole(request model.AssignAndRevokeRoleRequest) (*model.CommonMessageAndCode, error)
```


#### 参数
- `request` \<AssignAndRevokeRoleRequest\> 
- `AssignAndRevokeRoleRequest.RoleCodes` \<[]string\> 角色唯一标志符
- `AssignAndRevokeRoleRequest.UserIds` \<[]string\> 用户 ID 列表
- `AssignAndRevokeRoleRequest.Namespace` \<string\> 权限分组 code

#### 示例

```go
    req := model.AssignAndRevokeRoleRequest{
		RoleCodes: []string{"NewCode"},
		UserIds:   []string{"615551a3dcdd486139a917b1"},
	}
	resp, err := client.AssignRole(req)
```

## 移除用户
> 移除用户

```go
// RevokeRole
// 角色 移除用户
func (c *Client) RevokeRole(request model.AssignAndRevokeRoleRequest) (*model.CommonMessageAndCode, error)
```


#### 参数
- `request` \<AssignAndRevokeRoleRequest\> 
- `AssignAndRevokeRoleRequest.RoleCodes` \<[]string\> 角色唯一标志符
- `AssignAndRevokeRoleRequest.UserIds` \<[]string\> 用户 ID 列表
- `AssignAndRevokeRoleRequest.Namespace` \<string\> 权限分组 code

#### 示例

```go
    req := model.AssignAndRevokeRoleRequest{
		RoleCodes: []string{"NewCode"},
		UserIds:   []string{"615551a3dcdd486139a917b1"},
	}
	resp, err := client.RevokeRole(req)
```
 

## 获取某个角色扩展字段列表
>获取某个角色扩展字段列表

```go
// GetRoleUdfValue
// 获取某个角色扩展字段列表
func (c *Client) GetRoleUdfValue(id string) (*[]model.UserDefinedData, error)
```
#### 参数
- `id` \<string\> 角色 ID
#### 示例
```go
resp, err := client.GetRoleUdfValue("61692d23d17aec55f4cfcfa6")
```

#### 示例数据

```json
{
  "key": "value"
}
```
 
## 获取多个角色扩展字段列表
>获取多个角色扩展字段列表
> 
```go
// BatchGetRoleUdfValue
// 获取多个角色扩展字段列表
func (c *Client) BatchGetRoleUdfValue(ids []string) (map[string][]model.UserDefinedData, error)
```
#### 参数
- `ids` \<[]string\> 角色 ID 列表
#### 示例

```go
resp, err := client.BatchGetRoleUdfValue([]string{"61692d23d17aec55f4cfcfa6", "61386f82e3a0b1c8a5bd7491"})
```

#### 示例数据
```json
{
  "ROLE_ID1": {
    "key1": "value1"
  },
  "ROLE_ID2": {
    "key1": "value2"
  }
}
```

## 设置角色扩展字段
>设置角色扩展字段
```go
// SetRoleUdfValue
// 设置某个角色扩展字段列表
func (c *Client) SetRoleUdfValue(id string, udv *model.KeyValuePair) (*[]model.UserDefinedData, error)
```

#### 参数
- `id` \<string\> 角色 ID
- `udv` \<KeyValuePair\> 扩展字段，key: value
#### 示例

```go
    kv := &model.KeyValuePair{
		Key:   "lhucskosfr",
		Value: "123",
	}
	resp, err := client.SetRoleUdfValue("616d112b7e387494d1ed0676", kv)
```

## 设置多个角色扩展字段列表
>设置多个角色扩展字段列表
```go
// BatchSetRoleUdfValue
// 设置多个角色扩展字段列表
func (c *Client) BatchSetRoleUdfValue(request *[]model.SetUdfValueBatchInput) (*model.CommonMessageAndCode, error)
```
#### 参数
- `request` \<[]SetUdfValueBatchInput\>  
- `SetUdfValueBatchInput.TargetId` \<string\> 目标对象
- `SetUdfValueBatchInput.Key` \<string\> 自定义 Key
- `SetUdfValueBatchInput.Value` \<string\> 自定义 Value
#### 示例

```go
    f := &model.SetUdfValueBatchInput{
		Key:      "lhucskosfr",
		Value:    "123",
		TargetId: "616d112b7e387494d1ed0676",
	}
	tc := &model.SetUdfValueBatchInput{
		Key:      "lhucskosfr",
		Value:    "1235",
		TargetId: "61692d23d17aec55f4cfcfa6",
	}
	param := []model.SetUdfValueBatchInput{*f, *tc}
	resp, err := client.BatchSetRoleUdfValue(&param)
```

## 删除角色的扩展字段
>删除角色的扩展字段
```go
// RemoveRoleUdfValue
// 删除用户的扩展字段
func (c *Client) RemoveRoleUdfValue(id, key string) (*[]model.UserDefinedData, error) 
```
#### 参数

- `id` \<string\> 角色 ID
- `key` \<string\> 扩展字段名
#### 示例
```go
resp, err := client.RemoveRoleUdfValue("61692d23d17aec55f4cfcfa6", "lhucskosfr")
```

## 获取角色策略列表
>获取角色策略列表
```go
// ListRolePolicies
// 获取角色策略列表
func (c *Client) ListRolePolicies(request model.ListPoliciesRequest) (*model.ListPoliciesResponse, error)
```
#### 参数
- `request` \<ListPoliciesRequest\> 
- `ListPoliciesRequest.Code` \<string\> 角色 code
- `ListPoliciesRequest.Page` <int\> 页码数 默认值为 : `1`
- `ListPoliciesRequest.Limit` \<int\> 每页个数 默认值为 : `10`
#### 示例
```go
    req := model.ListPoliciesRequest{
		Code: "NewCode",
	}
	resp, err := client.ListRolePolicies(req)
```

## 给角色授权策略
>给角色授权策略
```go
// AddRolePolicies
// 给角色授权策略
func (c *Client) AddRolePolicies(code string, policiesCode []string) (*model.CommonMessageAndCode, error)
```
#### 参数

- `code` \<string\> 角色 code
- `policiesCode` <[]string\> 策略编码
#### 示例
```go
resp, err := client.AddRolePolicies("develop1234", []string{"ehsncbahxr"})
```

## 角色移除策略
>角色移除策略
```go
// RemoveRolePolicies
// 角色移除策略
func (c *Client) RemoveRolePolicies(code string, policiesCode []string) (*model.CommonMessageAndCode, error)
```
#### 参数
- `code` \<string\> 角色 code
- `policiesCode` <[]string\> 策略编码
#### 示例
```go
resp, err := client.RemoveRolePolicies("develop1234", []string{"ehsncbahxr"})
```
