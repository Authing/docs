---
meta:
  - name: description
    content: Golang
---

# {{$localeConfig.brandName}} - Golang

{{$localeConfig.brandName}} Golang SDK 由两部分组成：`ManagementClient` 和 `AuthenticationClient`。

`AuthenticationClient` 以终端用户（End User）的身份进行请求，提供了登录、注册、登出、管理用户资料、获取授权资源等所有管理用户身份的方法；此模块还提供了各种身份协议的 SDK，如 [OpenID Connect](/guides/federation/oidc.md), [OAuth 2.0](/guides/federation/oauth.md), [SAML](/guides/federation/saml.md) 和 [CAS](/guides/federation/cas.md)。此模块适合用于后端交互的服务器环境。

`ManagementClient` 以管理员（Administrator）的身份进行请求，用于管理用户池资源和执行管理任务，提供了管理用户、角色、应用、资源等方法；一般来说，你在 [{{$localeConfig.brandName}} 控制台](https://console.authing.cn/console/userpool) 中能做的所有操作，都能用此模块完成。此模块适合在后端环境下使用。

## GitHub 下载地址

| 条目     | 说明                                        |
| -------- | ------------------------------------------- |
| 支持版本 | Golang 1.8 +                                   |
| 仓库地址 | [https://github.com/Authing/authing-go-sdk](https://github.com/Authing/authing-go-sdk) |

## 安装

安装 golang sdk 库，请运行：

```
go get github.com/Authing/authing-go-sdk
```


## 使用管理模块

初始化 `ManagementClient` 需要 `userPoolId`（用户池 ID） 和 `secret`（用户池密钥）:

> 你可以在此[了解如何获取 UserPoolId 和 Secret](/guides/faqs/get-userpool-id-and-secret.md) .

```go
func main() {
	client := management.NewClient(userPoolId, secret)
}
```

现在 `managementClient` 实例就可以使用了。例如可以导出所有组织机构数据：

```go
func main() {
	client := management.NewClient(userPoolId, secret)
    resp, err := client.ExportAll()
}
```



## 私有化部署

**私有化部署**场景需要指定你私有化的 Authing 服务的 GraphQL 端点（**不带协议头和 Path**）以及密码加密公钥，如果你不清楚可以联系 Authing IDaaS 服务管理员。

如：

```go
func main() {
  // 增加参数配置自定义域名
	client := management.NewClient(userPoolId, secret, host)
}
```



## 获取帮助

请访问 [Authing 论坛](https://forum.authing.cn/)。
