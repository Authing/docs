---
meta:
- name: description
  content: 管理主体认证 - Go SDK
---

# 管理主体认证

<LastUpdated/>

此模块用于为用户进行主体认证，如个人认证或企业认证。

>初始化模块
```go
client := NewClient(userPoolId, secret)
client.PrincipalAuthDetail() # 获取授权详情
client.PrincipalAuthenticate() # 授权
```

### 获取认证详情
> 获取主体认证详情
```go
// PrincipalAuthDetail
// 获取主体认证详情
func (c *Client) PrincipalAuthDetail(userId string) (*struct {
	Message string      `json:"message"`
	Code    int64       `json:"code"`
	Data    interface{} `json:"data"`
}, error)
```
#### 参数

- `userId` \<string\> 用户 ID

#### 示例
```go
resp, err := client.PrincipalAuthDetail("6139c4d24e78a4d706b7545b")
```

#### 示例数据
```json
{
	"message": "获取主体认证信息成功",
	"code": 200,
	"data": {
      "id": "60b4d72f56b49fb97281001b",
      "createdAt": "2021-05-31T12:31:43.416Z",
      "updatedAt": "2021-05-31T12:31:43.416Z",
      "userPoolId": "607fe30c14d1650eb1d888ca",
      "userId": "60a336dc179abb512dd64ae7",
      "principalType": "P", 
      "principalName": "xxx",
      "principalCode": "xxxxxxxxxxxxxxx",
      "authenticationTime": "2021-05-31T12:31:43.414Z"
    }
}
```
### 进行主体认证
> 进行主体认证
```go
// PrincipalAuthenticate
// 进行主体认证
func (c *Client) PrincipalAuthenticate(userId string, req *model.PrincipalAuthenticateRequest) (*struct {
	Message string      `json:"message"`
	Code    int64       `json:"code"`
	Data    interface{} `json:"data"`
}, error)
```
#### 参数

- `userId` \<string\> 用户ID
- `req` \<PrincipalAuthenticateRequest\>  
- `PrincipalAuthenticateRequest.Type` \<PrincipalAuthenticateType\>类型 取值仅 P 或 E
- `PrincipalAuthenticateRequest.Name` \<string\> 名称
- `PrincipalAuthenticateRequest.IdCard` \<string\>
  - type 为 P 时，个人身份证 
  - type 为 E 时，企业统一信用编码
- `PrincipalAuthenticateRequest.Ext` \<string\>  
  - type 为 P 时，银行卡号 
  - type 为 E 时，企业法人名称
 
#### 示例
```go
    req := &model.PrincipalAuthenticateRequest{
		Name:   "xx",
		Type:   constant.P,
		IdCard: "123123",
	}
	resp, err := client.PrincipalAuthenticate("6139c4d24e78a4d706b7545b", req)
```

