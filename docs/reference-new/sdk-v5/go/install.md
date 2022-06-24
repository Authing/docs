# 安装

<LastUpdated/>

```bash
go get -u github.com/Authing/authing-golang-sdk
```

## 初始化

初始化 `ManagementClient` 需要使用 `accessKeyId` 和 `accessKeySecret` 参数:

```go
import (
    "authing-golang-sdk/client"
)

options := client.ManagementClientOptions{
    AccessKeyId:     "AUTHING_USERPOOL_ID",
    AccessKeySecret: "AUTHING_USERPOOL_SECRET",
}
client, err := client.NewClient(&options)
if err != nil {
    // The exception needs to be handled by the developer.
}

```

`ManagementClient` 会自动从 Authing 服务器获取 Management API Token，并通过返回的 Token 过期时间自动对 Token 进行缓存。

完整的参数和释义如下：

- `AccessKeyId`: Authing 用户池 ID;
- `AccessKeySecret`: Authing 用户池密钥;
- `Timeout`: 超时时间，单位为 ms，默认为 10000 ms;
- `Host`: Authing 服务器地址，默认为 `https://api.authing.cn`。如果你使用的是 Authing 公有云版本，请忽略此参数。如果你使用的是私有化部署的版本，此参数必填，格式如下: https://authing-api.my-authing-service.com（最后不带斜杠 /）。
- `Lang`: 接口 Message 返回语言格式（可选），可选值为 zh-CN 和 en-US，默认为 zh-CN。

## 快速开始

初始化完成 `ManagementClient` 之后，你可以获取 `ManagementClient` 的实例，然后调用此实例上的方法。例如：

- 获取用户列表

```go
package main

import (
	"authing-golang-sdk/client"
	"authing-golang-sdk/dto"
	"fmt"
)

func main() {
	options := client.ManagementClientOptions{
		AccessKeyId:     "AUTHING_USERPOOL_ID",
		AccessKeySecret: "AUTHING_USERPOOL_SECRET",
	}
	client, err := client.NewClient(&options)
	request := dto.ListUsersDto{
		Page:  1,
		Limit: 10,
	}
	response := client.listUsers(request)
	fmt.Println(response)
}
```

- 创建角色

```go
package main

import (
	"authing-golang-sdk/client"
	"authing-golang-sdk/dto"
	"fmt"
)

func main() {
	options := client.ManagementClientOptions{
		AccessKeyId:     "AUTHING_USERPOOL_ID",
		AccessKeySecret: "AUTHING_USERPOOL_SECRET",
	}
	client, err := client.NewClient(&options)
	request := dto.CreateRoleDto{
		Code:        "code",
		Namespace:   "namespace",
		Description: "description",
	}
	response := client.createRole(request)
	fmt.Println(response)
}
```

完整的接口列表，你可以在 [Authing Open API](https://api.authing.cn/openapi/) 和 [SDK 文档](https://authing-open-api.readme.io/reference/go) 中获取。

## 错误处理

`ManagementClient` 中的每个方法，遵循统一的返回结构：

- `StatusCode`: 请求是否成功状态码，当 `StatusCode` 为 200 时，表示操作成功，非 200 全部为失败。
- `ApiCode`: 细分错误码，当 `ApiCode` 非 200 时，可通过此错误码得到具体的错误类型。
- `Message`: 具体的错误信息。
- `Data`: 具体返回的接口数据。

一般情况下，如果你只需要判断操作是否成功，只需要对比一下 `Code` 是否为 200。如果非 200，可以在代码中通抛出异常或者任何你项目中使用的异常处理方式。

```go
package main

import (
	"authing-golang-sdk/client"
	"authing-golang-sdk/dto"
	"fmt"
)

func main() {
	options := client.ManagementClientOptions{
		AccessKeyId:     "AUTHING_USERPOOL_ID",
		AccessKeySecret: "AUTHING_USERPOOL_SECRET",
	}
	client, err := client.NewClient(&options)
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

## 私有化部署

如果你使用的是私有化部署的 Authing IDaaS 服务，需要指定此 Authing 私有化实例的 `host`，如：

```go
package main

import (
	"authing-golang-sdk/client"
	"authing-golang-sdk/dto"
	"fmt"
)

func main() {
	options := client.ManagementClientOptions{
		AccessKeyId:     "AUTHING_USERPOOL_ID",
		AccessKeySecret: "AUTHING_USERPOOL_SECRET",
		Host:            "YOUR_HOST", // 您的 Authing 私有化实例 HOST 地址，格式例如 https://core.authing.cn
	}
	client, err := client.NewClient(&options)
	if err != nil {
		// The exception needs to be handled by the developer.
	}

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

如果你不清楚如何获取，可以联系 Authing IDaaS 服务管理员。
