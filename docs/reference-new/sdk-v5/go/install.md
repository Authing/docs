---
meta:
  - name: description
    content: Go SDK
---

# {{$localeConfig.brandName}} - Go SDK

<LastUpdated/>

{{$localeConfig.brandName}} Go SDK 由两部分组成：用户认证模块（`ManagementClient`） 和管理模块（`AuthenticationClient`）。

用户认证模块（`AuthenticationClient`） 以终端用户（End User）的身份进行请求，提供了登录、注册、登出、管理用户资料、获取授权资源等所有管理用户身份的方法；此模块还提供了各种身份协议的 SDK，如 [OpenID Connect](/guides/federation/oidc.md), [OAuth 2.0](/guides/federation/oauth.md), [SAML](/guides/federation/saml.md) 和 [CAS](/guides/federation/cas.md)。

管理模块（`ManagementClient`） 以管理员（Administrator）的身份进行请求，用于管理用户池资源和执行管理任务，提供了管理用户、角色、应用、资源等方法；一般来说，你在 [{{$localeConfig.brandName}} 控制台](https://console.authing.cn/console/userpool) 中能做的所有操作，都能用此模块完成。

你应该将初始化过后的 `ManagementClient` 实例设置为一个全局变量（只初始化一次），而 `AuthenticationClient` 应该每次请求初始化一个。

### GitHub 地址

| 条目        | 说明                                                                                           |
| ----------- | ---------------------------------------------------------------------------------------------- |
| 支持版本    | Go 1.8 +                                                                                       |
| GitHub 地址 | [https://github.com/Authing/authing-golang-sdk](https://github.com/Authing/authing-golang-sdk) |

## 安装

```bash
go get -u github.com/Authing/authing-golang-sdk
```

## 使用认证模块

`AuthenticationClient` 以终端用户（End User）的身份进行请求，提供了登录、注册、登出、管理用户资料、获取授权资源等所有管理用户身份的方法；此模块还提供了各种身份协议的 SDK，如 [OpenID Connect](/guides/federation/oidc.md), [OAuth 2.0](/guides/federation/oauth.md), [SAML](/guides/federation/saml.md) 和 [CAS](/guides/federation/cas.md)。

### 初始化

#### 获取应用信息

初始化认证模块（`AuthenticationClient`）需要获取应用的相关信息，你可以在 [Authing 控制台](https://console.authing.cn) 的**应用** - **自建应用** - **应用详情** 中获取到相关信息。下面是你会经常使用到的几个配置项：

- 应用 ID（App ID）：应用的唯一标志。
- 应用密钥（App Secret）：用于验证客户端合法性的密钥。

<details>
<summary>取决于你的应用类型和配置的换取 token 身份验证方式，你在初始化 AuthenticationClient 时需要传递应用密钥，以对客户端的身份进行验证。点击展开详情</summary>

<br>

你可以在 [Authing 控制台](https://console.authing.cn) 的**应用** - **自建应用** - **应用详情** - **应用配置** - **其他设置** - **授权配置**
中找到**换取 token 身份验证方式** 配置项：

> 单页 Web 应用和客户端应用隐藏，默认为 \`none\`，不允许修改；后端应用和标准 Web 应用可以修改此配置项。

![](https://files.authing.co/api-explorer/tokenAuthMethod.jpg)

#### 换取 token 身份验证方式为 none 时

初始化 AuthenticationClient 不需要传应用密钥。

#### 换取 token 身份验证方式为 client_secret_post 或 client_secret_basic 时

初始化 AuthenticationClient 需要传应用密钥。

</details>

- 应用域名（App Host）：如 https://example.authing.cn 。
- 登录回调 URL（Redirect Uri）：当用户使用 Authing 的托管登录页进行认证，认证完成之后，会通过浏览器 `302` 重定向回调到此地址。可以配置多个地址，发起登录时可以选择任意一个。
- 退出登录回调 URL（Logout Redirect Uri）：当用户在浏览器端退出登录时，可以通过浏览器 `302` 重定向回调到此地址。可以配置多个地址，发起退出登录时可以选择任意一个。
- 换取 token 身份验证方式（Token Endpoint Auth Method）：调用 OIDC 获取 Token 接口或者 Signin 接口时客户端需要提供的校验方式。
- 检验 token 身份验证方式（Introspection Endpoint Auth Method）：调用 OIDC 校验 Token 合法性时客户端需要提供的校验方式。
- 撤回 token 身份验证方式（Revoke Endpoint Auth Method）：调用 OIDC 校验 Token 合法性时客户端需要提供的校验方式。

#### 初始化

初始化 `AuthenticationClient` 时必须传入 `AppId` 和 `AppHost` 参数:

```go
package main

import (
	"fmt"

	"github.com/Authing/authing-golang-sdk/constant"
	"github.com/Authing/authing-golang-sdk/util"

	// "fmt"
	"strings"

	"github.com/valyala/fasthttp"
)

var clientAuth *Client
var options = AuthenticationClientOptions{
	AppId:       "AUTHING_APP_ID",
	AppSecret:   "AUTHING_APP_SECRET",
	AppHost:      "AUTHING_APP_HOST",
	RedirectUri: "AUTHING_APP_REDIRECT_URI",
}

func main() {

	var err error
	clientAuth, err = NewClient(&options)
	if err != nil {
		panic(err)
	}
}
```

完整的参数和释义如下：

- `AppId`: Authing 应用 ID；
- `AppHost`: 应用域名，例如 https://example.authing.cn；
- `AppSecret`: Authing 应用密钥；
- `RedirectUri`: 认证完成后的重定向目标 URL, 会进行校验，需要和控制台的设置保持一致。可选，默认使用控制台中配置的第一个回调地址。
- `LogoutRedirectUri`: 登出完成后的重定向目标 URL。会进行校验，需要和控制台的设置保持一致。
- `Scope`: 令牌具备的资源权限（应用侧向 Authing 请求的权限），以空格分隔，默认为 'openid profile'，成功获取的权限会出现在 Access Token 的 scope 字段中。更多 scope 定义参见 Authing 相关[文档](https://docs.authing.cn/v2/concepts/oidc-common-questions.html#scope-%E5%8F%82%E6%95%B0%E5%AF%B9%E5%BA%94%E7%9A%84%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF)。
- `Protocol`: 应用协议类型，默认为 oidc。
- `TokenEndPointAuthMethod`: 获取 token 端点认证方式，可选值为 `client_secret_post`, `client_secret_basic` 和 `none`。需要和你在 [Authing 控制台](https://console.authing.cn) 的**应用** - **自建应用** - **应用详情** - **应用配置** - **其他设置** - **授权配置**中的**换取 token 身份验证方式** 配置保持一致。（客户端应用和单页应用默认为 `none` 且不可修改）
- `IntrospectionEndPointAuthMethod`: 校验 token 状态端点认证方式，可选值为 `client_secret_post`, `client_secret_basic` 和 `none`。需要和你在 [Authing 控制台](https://console.authing.cn) 的**应用** - **自建应用** - **应用详情** - **应用配置** - **其他设置** - **授权配置**中的**校验 token 身份验证方式** 配置保持一致。（客户端应用和单页应用默认为 `none` 且不可修改）
- `RevocationEndPointAuthMethod`: 撤回 token 端点认证方式，可选值为 `client_secret_post`, `client_secret_basic` 和 `none`。需要和你在 [Authing 控制台](https://console.authing.cn) 的**应用** - **自建应用** - **应用详情** - **应用配置** - **其他设置** - **授权配置**中的**撤回 token 身份验证方式** 配置保持一致。（客户端应用和单页应用默认为 `none` 且不可修改）
- `Timeout`: 请求超时时间（可选），位为毫秒，默认为 10000（10 秒）。
- `RejectUnauthorized`: 是否拒绝非法的 HTTPS 请求，默认为 true；如果是私有化部署的场景且证书不被信任，可以设置为 false。
- `CookieKey`: 存储认证上下文的 Cookie 名称,用于 方法 loginWithRedirect 和 handleRedirectCallback 上存储用户的认证状态。
- `Lang`: 接口 Message 返回语言格式（可选），可选值为 zh-CN 和 en-US，默认为 zh-CN。

认证侧相关的使用和方法说明，你可以在 [Authing Go SDK 用户认证模块查看](./authentication.html) 中查看。

## 使用管理模块

`ManagementClient` 以管理员（Administrator）的身份进行请求，用于管理用户池资源和执行管理任务，提供了管理用户、角色、应用、资源等方法；一般来说，你在 [{{$localeConfig.brandName}} 控制台](https://console.authing.cn/console/userpool) 中能做的所有操作，都能用此模块完成。

### 初始化

#### 获取 AK/SK

Authing Node SDK 使用 AK/SK 本地对请求数据的摘要进行签名的鉴权机制，客户端在调用 API 时，SDK 使用 AK/SK 对请求数据的摘要进行签名计算，并将签名结果传输给服务器端进行签名验证。

在 Authing 中，目前有两种类型的 AK/SK：

- 用户池全局 AK/SK：具备用户池内所有资源的全局操作权限。你可以在 [Authing 控制台](https://console.authing.cn) 的**设置** - **基础设置** - **密钥管理** 获取到**用户池 ID** 和**用户池密钥**，其中**用户池 ID**为 AK（Access Key ID）,**用户池密钥**为 SK（Access Key Secret）。
- 协作管理员 AK/SK：可针对用户池内的资源进行细粒度授权，协作管理员的 AK/SK 只能调用其被授权的 API。

你可以根据自己的需求选择合适的 AK/SK。

#### 初始化

初始化 `ManagementClient` 时需要使用 `AccessKeyId` 和 `AccessKeySecret` 参数:

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

完整的参数和释义如下：

- `AccessKeyId`: Authing 用户池 ID 或者协作管理员的 AK;
- `AccessKeySecret`: Authing 用户池密钥或者协作管理员的 SK；
- `Timeout`: 超时时间，单位为 ms，默认为 10000 ms；
- `Host`: Authing 服务器地址，默认为 `https://api.authing.cn`。如果你使用的是 Authing 公有云版本，请忽略此参数。如果你使用的是私有化部署的版本，此参数必填，格式如下: https://authing-api.my-authing-service.com（最后不带斜杠 /）。
- `Lang`: 接口 Message 返回语言格式（可选），可选值为 zh-CN 和 en-US，默认为 zh-CN。

### 快速开始

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

## 错误处理

Authing Go SDK 方法在请求接口时，不会抛出 [Error](https://go.dev/doc/tutorial/handle-errors)（网络错误除外），除非特殊说明，所有的方法返回值都会包含两个状态码：`statusCode` 和 `apiCode`：

- `statusCode`: `statusCode` 为请求状态码，不包含具体的业务错误信息。**当且仅当 `statusCode` 为 `200` 时，表示接口请求成功**，此时不会带有 `apiCode`。`statusCode` 不为 `200` 的情况下，
  表示接口请求失败或者需要进行额外操作（比如登录接口需要进行 MFA 二次验证），你需要对此进行关注，进行必要的错误处理。每个 `statusCode` 对应一个类型的错误，
  具体的错误分类请见下文。在大多数情况下，除非你需要对某些特定的异常做出响应，否则你只需要关注 `statusCode`，不需要关注 `apiCode`。
- `apiCode`: `apiCode` 为业务状态码，每个 `apiCode` 具备特定的错误含义，具体的 `apiCode` 列表见下文。`apiCode` 只会在 `statusCode` 非 200 且错误原因具备业务含义时才会返回。
- `requestId`: 请求 ID，当请求失败时会返回。如果你在使用 Node SDK 的过程中遇到了错误，可以使用此 `requestId` 咨询 Authing 开发人员。

详细的 `statusCode` 列表和 `apiCode` 请见[错误码](../../other/error-code.md)。

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
    Host:            "AUTHING_HOST"
	}
	client, err := client.NewClient(&options)
}
```

如果你不清楚如何获取，可以联系 Authing IDaaS 服务管理员。

## 获取帮助

有任何建议或者问题反馈，欢迎在 [Authing 论坛](https://forum.authing.cn/)中提出。
