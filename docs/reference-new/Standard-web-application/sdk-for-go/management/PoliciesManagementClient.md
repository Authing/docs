---
meta:
  - name: description
    content: 管理策略
---

# 管理策略

<LastUpdated/>

> {{$localeConfig.brandName}} 的访问控制与权限管理模型核心围绕着两个点来设计：**资源（Resource）**和**策略（Policy）**。策略定义了对某个（类）资源的某个（些）操作权限，将策略授权给用户（或角色），就能知道用户（或角色）是否具备对某个资源的某个操作具备操作权限。

## 添加策略
> 添加策略
```go
// CreatePolicy
// 添加策略
func (c *Client) CreatePolicy(req *model.PolicyRequest) (*model.CreatePolicyResponse, error)
```


#### 参数
- `req` \<PolicyRequest\>  
- `PolicyRequest.Code` \<string\> 策略唯一标志
- `PolicyRequest.Statements` \<[]PolicyStatement\>
- `PolicyRequest.Description` \<*string\> 描述

#### 示例

```go
    ef := model.EnumPolicyEffectAllow
	stateMents := &model.PolicyStatement{
		Resource: "book:222c",
		Effect:   &ef,
		Actions:  []string{"'booksc:read'"},
	}
	req := &model.PolicyRequest{
		Code:       "qqx",
		Statements: []model.PolicyStatement{*stateMents},
	}
	resp, err := client.CreatePolicy(req)
```

## 删除策略
> 删除策略，系统内置策略由 {{$localeConfig.brandName}} 官方维护，不能修改和删除。
```go
// DeletePolicy
// 删除策略
func (c *Client) DeletePolicy(code string) (*model.CommonMessageAndCode, error)
```

#### 参数

- `code` \<string\> 策略唯一标志

#### 示例

```go
resp, err := client.DeletePolicy("qqx")
```

## 批量删除策略
> 批量删除策略，系统内置策略由 {{$localeConfig.brandName}} 官方维护，不能修改和删除。
```go
// BatchDeletePolicy
// 删除策略
func (c *Client) BatchDeletePolicy(codeList []string) (*model.CommonMessageAndCode, error)
```
#### 参数

- `codeList` \<[]string\> 策略唯一标志列表

#### 示例

```go
resp, err := client.DeletePolicy([]string{"qqx"})
```

## 修改策略
> 修改策略，系统内置策略由 {{$localeConfig.brandName}} 官方维护，不能修改和删除。
```go
// UpdatePolicy
// 修改策略
func (c *Client) UpdatePolicy(req *model.PolicyRequest) (*model.UpdatePolicyResponse, error) 
```
#### 参数
- `req` \<PolicyRequest\>  
- `PolicyRequest.Code` \<string\> 策略唯一标志
- `PolicyRequest.Statements` \<[]PolicyStatement\>
- `PolicyRequest.Description` \<*string\> 描述

#### 示例

```go
    ef := model.EnumPolicyEffectAllow
	stateMents := &model.PolicyStatement{
		Resource: "book:222cw",
		Effect:   &ef,
		Actions:  []string{"'booksc:read'"},
	}
	req := &model.PolicyRequest{
		Code:       "qqx",
		Statements: []model.PolicyStatement{*stateMents},
	}
	resp, err := client.UpdatePolicy(req)
```

## 获取策略详情
> 获取策略详情
```go
// DetailPolicy
// 获取策略详情
func (c *Client) DetailPolicy(code string) (*model.Policy, error)
```
#### 参数
- `code` \<string\> 策略唯一标志
#### 示例

```go
resp, err := client.DetailPolicy("qqx")
```

## 获取策略列表
> 获取策略列表
```go
// ListPolicy
// 获取策略列表
func (c *Client) ListPolicy(page, limit int) (*model.PaginatedPolicies, error)
```
#### 参数
 
- `page` \<int\>  页号 默认值为 : `1`
- `limit` \<int\>  每页记录数 默认值为 : `10`

#### 示例

```go
	resp, err := client.ListPolicy(1, 10)
```

## 获取策略授权记录
> 获取策略授权记录
```go
// ListAssignments
// 获取策略授权记录
func (c *Client) ListAssignments(code string, page, limit int) (*model.PaginatedPolicyAssignments, error)
```
 

#### 参数

- `code` \<string\> 策略唯一标志
- `page` \<int\>  页号 默认值为 : `1`
- `limit` \<int\>  每页记录数 默认值为 : `10`

#### 示例

```go
resp, err := client.ListAssignments("tliewdutrn", 1, 10)
```

## 将策略授权给用户、角色、分组、组织机构
> 将策略授权给用户、角色、分组、组织机构，可以将策略授权给用户和角色，授权给角色的策略会被该角色下的所有用户继承 。此接口可以进行批量操作。
```go
// AddAssignments
// 添加策略授权
func (c *Client) AddAssignments(req *model.PolicyAssignmentsRequest) (*model.CommonMessageAndCode, error)
```
#### 参数
- `req` \<PolicyAssignmentsRequest\>  
- `PolicyAssignmentsRequest.Policies` \<[]string\> 策略 code 列表
- `PolicyAssignmentsRequest.TargetType` \<EnumPolicyAssignmentTargetType\> 可选值为 USER (用户) 和 ROLE (角色)
- `PolicyAssignmentsRequest.TargetIdentifiers` \<[]string\> 用户 id 列表和角色 code 列表

#### 示例

```go
    req := &model.PolicyAssignmentsRequest{
		Policies:          []string{"tliewdutrn"},
		TargetType:        model.EnumPolicyAssignmentTargetTypeUser,
		TargetIdentifiers: []string{"616e905ebc18f0f106973a29"},
	}
	resp, err := client.AddAssignments(req)
```

## 撤销策略授权
> 撤销策略授权，此接口可以进行批量操作。
```go
// RemoveAssignments
// 撤销策略授权
func (c *Client) RemoveAssignments(req *model.PolicyAssignmentsRequest) (*model.CommonMessageAndCode, error)
```


#### 参数

- `req` \<PolicyAssignmentsRequest\>  
- `PolicyAssignmentsRequest.Policies` \<[]string\> 策略 code 列表
- `PolicyAssignmentsRequest.TargetType` \<EnumPolicyAssignmentTargetType\> 可选值为 USER (用户) 和 ROLE (角色)
- `PolicyAssignmentsRequest.TargetIdentifiers` \<[]string\> 用户 id 列表和角色 code 列表

#### 示例

```go
    req := &model.PolicyAssignmentsRequest{
		Policies:          []string{"tliewdutrn"},
		TargetType:        model.EnumPolicyAssignmentTargetTypeUser,
		TargetIdentifiers: []string{"616e905ebc18f0f106973a29"},
	}
	resp, err := client.RemoveAssignments(req)
```


## 设置策略授权状态为开启
> 设置策略授权状态为开启
```go
// EnableAssignments
// 设置策略授权状态为开启
func (c *Client) EnableAssignments(req *model.SwitchPolicyAssignmentsRequest) (*model.CommonMessageAndCode, error)
```
#### 参数
- `req` \<SwitchPolicyAssignmentsRequest\>  
- `SwitchPolicyAssignmentsRequest.policy` \<string\> 策略 
- `SwitchPolicyAssignmentsRequest.TargetType` \<EnumPolicyAssignmentTargetType\> 可选值为 USER (用户) 和 ROLE (角色)
- `SwitchPolicyAssignmentsRequest.TargetIdentifier` \<string\> 用户 id 列表和角色 code 列表
- `SwitchPolicyAssignmentsRequest.Namespace` \<string\>命名空间
 
#### 示例

```go
    req := &model.SwitchPolicyAssignmentsRequest{
		Policy:           "tliewdutrn",
		TargetType:       model.EnumPolicyAssignmentTargetTypeUser,
		TargetIdentifier: "616e905ebc18f0f106973a29",
	}
	resp, err := client.EnableAssignments(req)
```

## 设置策略授权状态为关闭
> 设置策略授权状态为关闭
```go
// DisableAssignments
// 设置策略授权状态为关闭
func (c *Client) DisableAssignments(req *model.SwitchPolicyAssignmentsRequest) (*model.CommonMessageAndCode, error)
```
#### 参数
- `req` \<SwitchPolicyAssignmentsRequest\>  
- `SwitchPolicyAssignmentsRequest.Policy` \<string\> 策略 
- `SwitchPolicyAssignmentsRequest.TargetType` \<EnumPolicyAssignmentTargetType\> 可选值为 USER (用户) 和 ROLE (角色)
- `SwitchPolicyAssignmentsRequest.TargetIdentifier` \<string\> 用户 id 列表和角色 code 列表
- `SwitchPolicyAssignmentsRequest.Namespace` \<string\>命名空间
#### 示例

```go
    req := &model.SwitchPolicyAssignmentsRequest{
		Policy:           "tliewdutrn",
		TargetType:       model.EnumPolicyAssignmentTargetTypeUser,
		TargetIdentifier: "616e905ebc18f0f106973a29",
	}
	resp, err := client.DisableAssignments(req)
```
