# 自定义数据库概览

<LastUpdated/>

<!-- ::: hint-warning
只有**企业版**用户能够使用连接自定义数据库功能，详情请见 [https://authing.cn/pricing](https://authing.cn/pricing)。如果你想试用，请联系 [Authing 售后服务人员](csm@authing.cn)。
::: -->

使用自定义数据库可以满足以下场景的需求：

- **使用自己的数据库保存用户数据**：完全使用自己的数据库保存用户数据，这种模式下，{{$localeConfig.brandName}} 将不会存储你的任何用户信息。
- **惰性迁移用户到 {{$localeConfig.brandName}}**：这种迁移用户的模式称为**惰性迁移（lazy migration）**，简单来说原理如下：最开始所有的原始用户数据在你的数据库，当用户第一次尝试在 Authing 登录时，Authing 会通过你配置的自定义数据库脚本在你的数据库查找并验证用户，如果成功，会将该用户迁移到 Authing 中；该用户第二次登录时，将使用 Authing 的数据库对其进行验证；当所有的用户都至少登录一次时，意味着迁移上云任务完成。详情请见：[使用自定义数据库实现用户惰性迁移](./lazy-migration.md)。

你可以通过以下方式配置自定义数据库：前往 [Authing 控制台](https://console.authing.cn/console/userpool) 的 **连接身份源** - **自定义数据库** 页面开启自定义数据库连接，详情请见[配置自定义数据库](./configuration/README.md)：

![](~@imagesZhCn/guides/database-connection/Xnip2021-02-24_16-58-19.png)

## How it Works

如下图所示，你可以在 Authing 的认证流中自定义数据库从 Legacy Database 中获取用户的身份信息。取决于你所使用的场景，流程原理也会稍有不同。

<img src="~@imagesZhCn/guides/Lark20210305-144321.png" alt="drawing" height=600 style="display:block;margin: 0 auto;"/>

自定义数据库有两种不同模式，你可以根据自己的业务需求选择合适的模式：

- **惰性迁移用户**：这种迁移用户的模式称为**惰性迁移（lazy migration）**，简单来说原理如下：最开始所有的原始用户数据在你的数据库，当用户第一次尝试在 Authing 登录时，Authing 会通过你配置的自定义数据库脚本在你的数据库查找并验证用户，如果成功，会将该用户迁移到 Authing 中；该用户第二次登录时，将使用 Authing 的数据库对其进行验证；当所有的用户都至少登录一次时，意味着迁移上云任务完成。详情请见：[使用自定义数据库实现用户惰性迁移](./lazy-migration.md)。
- **完全使用自定义数据库**：这种模式下用户数据始终保存在你的数据库中，Authing 永远不会保存你的用户数据。为了让系统正常工作，你需要实现完整的用户增删改查脚本。

## 运行环境

目前 Authing 的自定义数据库脚本运行环境为 `node 12` 环境的完全隔离沙盒实例。

### npm 模块

包含各种数据库连接 Client、axios、bcrypt、lodash 等：

- [bcrypt](https://github.com/kelektiv/node.bcrypt.js): 可用于加密和校验密码，这也是我们推荐的密码加密方式，使用起来也非常简单。示例：

```javascript
const isPasswordValid = await bcrypt.compare(password, user.password);
if (!isPasswordValid) {
  throw new Error('密码错误');
}
```

- [axios](https://github.com/axios/axios): Node.JS 最流行的网络请求库。
- [lodash](https://lodash.com/) v4。
- [pg](https://node-postgres.com/): Node PostgresQL Driver。
- [mongodb](https://mongodb.github.io/node-mongodb-native/): Node Mongodb Driver。
- [mysql2](https://github.com/sidorares/node-mysql2): Node MySQL Driver。
- [mssql](https://github.com/tediousjs/node-mssql): Node Sql Server Driver。

## 添加 IP 白名单

如果你在脚本中访问的服务配置有防火墙，请确保其对以下 IP 地址开放：140.179.19.50, 52.80.250.250 . 你还可以通过以下 API 动态获取 Authing 服务器对外 IP 地址：[https://core.authing.cn/api/v2/system/public-ips](https://core.authing.cn/api/v2/system/public-ips)。
