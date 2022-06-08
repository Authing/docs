# 惰性迁移用户到 {{$localeConfig.brandName}}

<LastUpdated/>

<!-- ::: hint-warning
只有**企业版**用户能够使用连接自定义数据库功能，详情请见 [https://authing.cn/pricing](https://authing.cn/pricing)。如果你想试用，请联系 176-0250-2507 或 xuziqiang@authing.cn。
::: -->

## 迁移流程

Authing 支持从自定义数据库中以不停机的形式平稳迁移用户到 Authing，当启用此功能时会对登录注册请求产生以下影响：

认证请求：

- 用户第一次认证时会使用你配置的自定义数据脚本认证用户，认证成功之后会将其迁移到 Authing 数据库，否则提示其用户不存在或者密码不正确。
- 用户不需要修改账号密码。
- 该用户接下来的认证都会走 Authing 数据库。
- 当所有用户都至少经过一次成功认证之后，标志着数据库迁移平稳完成。

注册请求：

- 用户注册时会首先检查其在 Authing 数据库中是否存在，如果已存在返回错误提示。
- 如果 Authing 数据库中不存在该用户，通过 `getUser` 接口检查该用户是否在自定义数据库中存在，如果已存在返回错误提示。
- Authing 数据库和自定义数据库都不存在此用户，则注册成功。

## 配置脚本

你需要在[Authing 控制台](https://console.authing.cn/console/userpool)，**连接身份源** - **自定义数据库** 页面编写**登录**和**查找用户**脚本，详情请见：

- [编写登录脚本](./configuration/#编写数据库操作脚本)。
- [编写查找用户脚本](./configuration/#编写数据库操作脚本)。

## 验证迁移效果

当你开启了用户数据迁移之后，你可以通过以下方式验证已完全迁移的用户：

- 使用[获取用户列表或搜索用户的管理 API](/reference/sdk-for-node/management/UsersManagementClient.md#获取用户列表)。
- 在[Authing 控制台](https://console.authing.cn/console/userpool) **用户管理** - **用户列表** 页面查看用户。

## 用户迁移完成之后

当所有用户都迁移完成之后，将自定义数据库关闭即可。

![](https://cdn.authing.cn/blog/20201130175955.png)
