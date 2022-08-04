# Golang

本指南将从 Authing Golang SDK 的安装开始逐步引导你如何快速为你已有或新开发的应用添加用户认证与管理能力。

<AppDetailSiderBar />

## 安装

```
go get -u github.com/Authing/authing-golang-sdk
```

## 认证你的用户

### 初始化

```go
import (
	"github.com/Authing/authing-golang-sdk/authentication"
)
func main() {
    var authClient *authentication.Client
    var err error
    authClient, err =  authentication.NewClient(&authentication.AuthenticationClientOptions{
        AppId:       "AUTHING_APP_ID",//应用 ID
        AppSecret:   "AUTHING_SECRET",//应用 Secret
        Domain:      "AUTHING_DOMAIN",//应用对应的用户池域名
        RedirectUri: "AUTHING_REDIRECTURI",//认证完成后的重定向目标 URL
        LogoutRedirectUri: "AUTHING_LOGOUTREDIRECTURI"//登出回调地址
        Scope: "AUTHING_SCOPE"// 应用侧向 Authing 请求的权限
    })
}
```

### 简单认证用户

```go
//生成认证地址
result, err = authClient.BuildAuthUrl(&authentication.AuthURLParams{
    State: "请求端生成的上下文数据，可以为空，用户防止跨站攻击",
    Scope: "scope参数，可以为空，为空则使用 NewClient 函数中的 Scope 参数",
    Nonce: "请求端生成的上下文数据，可以为空，会在回调返回的 IDToken 中包含此参数",
    RedirectUri: "回调地址，可以为空，默认使用 NewClient 函数中的 RedirectUri 参数",
    Forced: false,//是否强制重新登录，如果为true，Authing将强制用户重新登录,默认为false
})
```

## 管理你的用户

### 初始化

```go
options := client.ManagementClientOptions {
    AccessKeyId:     "AUTHING_USERPOOL_ID",// 用户池 id
    AccessKeySecret: "AUTHING_USERPOOL_SECRET",// 用户池密钥
}
client, err := client.NewClient(&options)
if err != nil {
    panic(err)
}
```

### 简单管理用户

```go
//创建用户
package main

import (
 "authing-go-sdk/client"
 "authing-go-sdk/dto"
 "fmt"
)

func main() {
  options := client.ManagementClientOptions{
    AccessKeyId:     "AUTHING_USERPOOL_ID",
    AccessKeySecret: "AUTHING_USERPOOL_SECRET",
  }
  client, err := client.NewClient(&options)
  if err != nil {
    panic(err)
  }
  request := dto.CreateUserReqDto{
		Username:      "username_3276",
		Password:      "password_3785",
		Options: dto.CreateUserOptionsDto{
			KeepPassword:              false,
			ResetPasswordOnFirstLogin: false,
		},
	}
	response := client.CreateUser(&request)
	fmt.Println(response)
}
```

## 错误处理

```go
package main

import (
	"github.com/Authing/authing-golang-sdk/management"
	"github.com/Authing/authing-golang-sdk/dto"
	"fmt"
)

func main() {
	options := management.ClientOptions{
		AccessKeyId:     "AUTHING_USERPOOL_ID",
		AccessKeySecret: "AUTHING_USERPOOL_SECRET",
	}
	client, err := management.NewClient(&options)
	request := dto.CreateRoleDto{
		Code:        "code",
		Namespace:   "namespace",
		Description: "description",
	}
	response := client.createRole(request)
	fmt.Println(response)

	if response.Code != 200 {
		// 自定义错误处理逻辑
	}
}
```