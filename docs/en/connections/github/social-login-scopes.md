# Github 支持的 OAuth Scopes
<LastUpdated/>

在发起 Github 登录时，你可以通过指定 scope 参数来请求用户授予所需的 Gtihub 权限。如果用户同意了 scope 中包含的权限，Github Access Token 将会具备的相应的权限。如果用户拒绝了某些权限，那么 Github Access Token 无法用于访问 Github 对应的 API。

当你在配置连接时指定了 scope，Github 会将选择的权限显示在 Github 的确权页面上，让用户确认。

如果你的应用没有浏览器环境让终端用户确认授权，你无需选择任何 scope，更多请查看 [Authorizing OAuth apps](https://docs.github.com/en/developers/apps/authorizing-oauth-apps#device-flow).

你可以携带 Token 向相关的 Github API 发送 Head 请求来查看它需要哪些 scope：

```shell
$ curl -H "Authorization: token OAUTH-TOKEN" https://api.github.com/users/codertocat -I
HTTP/2 200
X-OAuth-Scopes: repo, user
X-Accepted-OAuth-Scopes: user
```

+ X-OAuth-Scopes：当前令牌具备的 scope。
+ X-Accepted-OAuth-Scopes：此 API 需要的 scope。


# Scopes 的作用

| 名称                                     | 描述                                                         |
| :--------------------------------------- | :----------------------------------------------------------- |
| **`(no scope)`**                         | 授予对公共信息的只读权限（包括用户个人资料信息、公共仓库信息和 gist ） |
| **`repo`**                               | 授予对仓库（包括私有仓库）的完全权限。 这包括对仓库和组织的代码、提交状态、仓库和组织项目、邀请、协作者、添加团队成员身份、部署状态以及仓库 webhooks 的读取/写入权限。 还授予管理用户项目的权限。 |
| &nbsp;&nbsp;&nbsp;&nbsp;repo:status      | 授予对公共和私有仓库中的提交状态的读/写权限。此 scope 仅需要授予其他用户或服务对私有存储库提交状态的权限，而不授予对代码的权限。 |
| &nbsp;&nbsp;&nbsp;&nbsp;repo_deployment  | 授予对公共和私有仓库的[部署状态](https://docs.github.com/cn/rest/reference/repos#deployments)的访问权限。 此 scope 仅需要授予其他用户或服务对部署状态的访问权限，而不授予对代码的访问权限。 |
| &nbsp;&nbsp;&nbsp;&nbsp;public_repo      | 将访问权限限制为公共仓库。 这包括对公共仓库和组织的代码、提交状态、仓库项目、协作者以及部署状态的读取/写入权限。 含有星的公共仓库也需要此权限。 |
| **`repo:invite`**                        | 授予接受/拒绝仓库协作邀请的权限。此 scope 仅需要授予其他用户或服务的访问权限，而不授予代码的访问权限。 |
| &nbsp;&nbsp;&nbsp;&nbsp;security_events  | 授予在 [代码扫描 API](https://docs.github.com/cn/rest/reference/code-scanning) 中安全事件的读取和写入权限，对 [密码扫描 API](https://docs.github.com/cn/rest/reference/secret-scanning) 中安全事件的读取和写入权限。此    scope 只需要授予其他用户或服务访问安全事件，而不授予对代码的访问权限。 |
| **`admin:repo_hook`**                    | 在公共或私有仓库中对仓库 hooks 授予读取、写入、ping 和删除权限。 `repo` 和 `public_repo` 的 scopes 授予对仓库（包括仓库 hooks）的完全访问权限。 使用 `admin:repo_hook` 的 scope 将访问权限限制为仅仓库 hooks。 |
| &nbsp;&nbsp;&nbsp;&nbsp;write:repo_hook  | 授予对公共或私有仓库中 hooks 的读取、写入和 ping 权限。      |
| &nbsp;&nbsp;&nbsp;&nbsp;read:repo_hook   | 授予对公共或私有仓库中 hooks 的读取和 ping 权限。            |
| **`admin:org`**                          | 全面管理组织及其团队、项目和成员。                           |
| &nbsp;&nbsp;&nbsp;&nbsp;write:org        | 对组织成员身份、组织项目和团队成员身份的读取和写入权限。     |
| &nbsp;&nbsp;&nbsp;&nbsp;read:org         | 对组织成员身份、组织项目和团队成员身份的只读权限。           |
| **`admin:public_key`**                   | 全面管理公钥。                                               |
| &nbsp;&nbsp;&nbsp;&nbsp;write:public_key | 创建、列出和查看公钥的详细信息。                             |
| &nbsp;&nbsp;&nbsp;&nbsp;read:public_key  | 列出和查看公钥的详细信息。                                   |
| **`admin:org_hook`**                     | 授予对组织 hooks 的读取、写入、ping 和删除权限。 **注：**OAuth 令牌只能对由 OAuth 应用程序创建的组织 hooks 执行这些操作。 个人访问令牌只能对用户创建的组织 hooks 执行这些操作。 |
| **`gist`**                               | 授予对 gist 的写入权限。                                     |
| **`notifications`**                      | 授予对用户通知的读取权限，将线程标记为读取权限，对仓库的关注和取消关注权限，以及对线程订阅的读取、写入和删除权限。 |
| **`user`**                               | 仅授予对个人资料的读取/写入权限。 请注意，此 scope 包括 `user:email` 和 `user:follow`。 |
| &nbsp;&nbsp;&nbsp;&nbsp;read:user        | 授予读取用户个人资料数据的权限。                             |
| &nbsp;&nbsp;&nbsp;&nbsp;user:email       | 授予对用户电子邮件地址的读取权限。                           |
| &nbsp;&nbsp;&nbsp;&nbsp;user:follow      | 授予关注或取消关注其他用户的权限。                           |
| **`delete_repo`**                        | 授予删除可管理仓库的权限。                                   |
| **`write:discussion`**                   | 授予对团队讨论的读取和写入权限。                             |
| &nbsp;&nbsp;&nbsp;&nbsp;read:discussion  | 授予对团队讨论的读取权限。                                   |
| **`write:packages`**                     | 授予在 GitHub Packages 中上传或发布包的权限。                |
| **`read:packages`**                      | 授予从 GitHub Packages 下载或安装包的权限。                  |
| **`delete:packages`**                    | 授予从 GitHub Packages 删除包的权限。                        |
| **`admin:gpg_key`**                      | 全面管理 GPG 密钥。                                          |
| &nbsp;&nbsp;&nbsp;&nbsp;write:gpg_key    | 创建、列出和查看 GPG 密钥的详细信息。                        |
| &nbsp;&nbsp;&nbsp;&nbsp;read:gpg_key     | 列出和查看 GPG 密钥的详细信息。                              |

