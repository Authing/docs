---
meta:
  - name: description
    content: Golang
---

# {{$localeConfig.brandName}} - Golang

{{$localeConfig.brandName}} Golang SDK Composed of two parts: `ManagementClient` and `AuthenticationClient`.

`AuthenticationClient` use End User Identity, provide a way to log in, registration, logout, managing user data, access to all management user identity of authorized resources; this module also provides SDK of various identity protocols. Such as [OpenID Connect](/guides/federation/oidc.md), [OAuth 2.0](/guides/federation/oauth.md), [SAML](/guides/federation/saml.md) and [CAS](/guides/federation/cas.md). This module is suitable for server environments for non-trusted browser environments and pure back-end interactions.

`ManagementClient` Administrator identity is requested, used to manage user pool resources and execute management tasks，Provide management users, roles, applications, resources, etc. Generally, you can do all operations[{{$localeConfig.brandName}} console](https://console.authing.cn/console/userpool), can be done with this module. This module is suitable for use in front-end environments of the backend or **trusted**.

## GitHub download link

| entry             | illustrate                                                                             |
| ----------------- | -------------------------------------------------------------------------------------- |
| Support version   | Golang 1.8 +                                                                           |
| Warehouse Address | [https://github.com/Authing/authing-go-sdk](https://github.com/Authing/authing-go-sdk) |

## Install

Install golang sdk, please run:

```
go get github.com/Authing/authing-golang-sdk
```

## Use management module

initialization `ManagementClient` need `userPoolId` and `secret`(UserPool Key):

> You can here [learn how to get UserPoolId and Secret](/guides/faqs/get-userpool-id-and-secret.md) .

```go
func main() {
	client := management.NewClient(userPoolId, appSecret)
}
```

Now `managementClient` instances can be used. For example, all organizational data can be exported:

```go
func main() {
	client := management.NewClient(userPoolId, appSecret)
  resp, err := client.ExportAll()
}
```

## Privatization deployment

**Privatization Deployment** Scene Need to specify the GraphQL endpoint of your privatized Authing service (**without protocol head and Path**) and password encryption key, if you don't know you can contact the Authing IDaaS service administrator.

Such as:

```java
func main() {
  // Add parameter configuration custom domain name
	client := management.NewClient(userPoolId, appSecret, host)
}
```

## Get help

Join us on forum: [#authing-chat](https://forum.authing.cn/)
