# 配置数据库连接和编写脚本

<LastUpdated/>

<!-- ::: hint-warning
只有**企业版**用户能够使用连接自定义数据库功能，详情请见 [https://authing.cn/pricing](https://authing.cn/pricing)。如果你想试用，请联系 176-0250-2507 或 xuziqiang@authing.cn。
::: -->

你可以自定义数据库认证用户，为此你需要配置数据库连接、编写数据库操作脚本、配置环境变量（可选）。

> 请确保你的数据库有 Authing 用户资料必须的一些字段，如 `id`, `email`, `photo`, `nickname`, `username`, `phone` 等，详情请见[Authing 用户 Profile 详细字段及其释义](/guides/user/user-profile.md) 了解 Authing 用户资料 Schema。

Authing 支持直接连接以下几种主流的数据库以及自定义 Web Service：

- MySQL
- PostgresQL
- MongoDB
- Web Services: 你可以将数据库封装成一个服务，不直接对外暴露数据库连接，如你可以把认证操作封装成一个 API: `https://mydomain.com/auth`。

::: hint-info
如果你在脚本中访问的服务配置有防火墙，请确保其对以下 IP 地址开放：140.179.19.50, 52.80.250.250 . 你还可以通过以下 API 动态获取 Authing 服务器对外 IP 地址：[https://core.authing.cn/api/v2/system/public-ips](https://core.authing.cn/api/v2/system/public-ips)。
:::

## 开启自定义数据库连接

::: hint-warning
开启自定义数据库后会立即生效，在你还没有编写自定义脚本之前，用户尝试登录会提示类似 `Please implement the Login script for this database connection` 的错误，这是从默认的脚本提示的错误，请前往修改脚本，或暂时关闭自定义数据库连接。
:::

登录 [Authing 控制台](https://console.authing.cn/console/userpool)，在 **连接身份源** - **自定义数据库** 页面，点击右上角的**开启**按钮：

![](https://cdn.authing.cn/img/20210111180702.png)

## 选择场景

自定义数据库有两种不同模式，你可以根据自己的业务需求选择合适的模式：

- **惰性迁移用户**：这种迁移用户的模式称为**惰性迁移（lazy migration）**，简单来说原理如下：最开始所有的原始用户数据在你的数据库，当用户第一次尝试在 Authing 登录时，Authing 会通过你配置的自定义数据库脚本在你的数据库查找并验证用户，如果成功，会将该用户迁移到 Authing 中；该用户第二次登录时，将使用 Authing 的数据库对其进行验证；当所有的用户都至少登录一次时，意味着迁移上云任务完成。详情请见：[使用自定义数据库实现用户惰性迁移](https://docs.authing.co/connections/custom-db/lazy-migrations.html)。
- **完全使用自定义数据库**：这种模式下用户数据始终保存在你的数据库中，Authing 永远不会保存你的用户数据。为了让系统正常工作，你需要实现完整的用户增删改查脚本。

## 配置数据库连接信息

接下来填写数据库连接信息，你可以选择 **Connection URI** 和 **Programmatic** 两种方式：

### Connection URI 形式

![](https://cdn.authing.cn/blog/20201130162731.png)

Connection URI 一般是 `protocol://username:password@host:port/database` 这种形式的 URI，如 `postgres://postgres:postgres@localhost:5432/database-name`，你可以在脚本中通过全局变量 `env.DB_CONNECTION_URI` 引用，如下所示：

```javascript
const { Client } = require('pg')

const client = new Client({
  connectionString: env.DB_CONNECTION_URI,
})
await client.connect()
```

### Programmatic 形式

![](https://cdn.authing.cn/blog/20201130162823.png)

这种模式分别指定数据库 Host、端口、用户名、密码、database 名称，可以分别在脚本中通过全局变量 `env.DB_HOST`、`env.DB_PORT`、`env.DB_USERNAME`、`env.DB_PASSWORD`、`env.DB_DATABASE` 引用，如下所示：

```javascript
const { Client } = require('pg')
const client = new Client({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
})
await client.connect()
```

## 编写数据库操作脚本

我们目前提供了 **MySQL**、**PostgresQL**、**MongoDB**、**自定义服务** 四种方式的模版，你可以根据需要编写对应的脚本。

选择 **迁移用户数据到 Authing（LAZY_MIGRATION）** 模式时，你一共需要编写两个函数：

- 登录：该脚本会在用户尝试登录的时候执行，如果该用户未同步到 Authing 数据库，会根据你填写的此脚本检验用户账号密码。
- 查找用户：该脚本会在用户尝试注册的时候执行，如果该脚本返回了用户身份信息，会提示用户**用户已存在**而注册失败。

选择 **完全使用自己的数据库（CUSTOM_USER_STORE）** 模式时，你一共需要编写以下几个函数：

- 登录：该脚本会在用户尝试登录的时候执行，如果该用户未同步到 Authing 数据库，会根据你填写的此脚本检验用户账号密码。
- 精确查找用户：该脚本会在用户尝试注册的时候执行，如果该脚本返回了用户身份信息，会提示用户**用户已存在**而注册失败。
- 模糊搜索用户：该脚本会在管理员使用控制台或者 API 模糊搜索用户的时候调用。
- 创建用户：该脚本会在用户注册或者使用 API 和控制台创建用户时执行，你需要将用户信息保存到自己的数据库中。
- 修改用户资料：该脚本会在管理员修改用户资料或者用户自己修改用户资料时执行。
- 删除用户：该脚本会在管理员使用控制台或者 API 删除用户账号时执行。
- 获取用户列表：该脚本会在管理员使用控制台或者 API 获取用户列表时执行，这个接口需要的数据中需要包含用户总数、当前页用户列表。
- 验证密码：该脚本会在用户尝试重置密码，验证其原始密码时执行。

<StackSelector snippet="script-template" selectLabel="选择脚本名称" :order="['login', 'getUser', 'searchUser', 'createUser', 'updateUser', 'deleteUser', 'listUsers', 'validatePassword']"/>

## 测试数据库脚本

我们给开发者提供了一个供快速测试测试的在线数据库，你可以使用此数据库进行快速测试，[点击此](https://db-connections.authing.cn)访问。

:::hint-success
该数据库对所有用户免费开放，数据库连接信息为 postgres://postgres:postgres_root_local@47.74.20.164:31000/custom-db-connection，你可以创建测试用户，或者使用列表中的示例用户。
:::

配置好 Connection URI 之后点击保存，在点击最下方的 **调试** 按钮。

![](https://cdn.authing.cn/blog/20201130173258.png)

<img src="https://cdn.authing.cn/blog/20201130173519.png" height="400px" />

在弹出的表单中填写示例用户池用户列表中的某个用户：

![](https://cdn.authing.cn/blog/20201130173505.png)

<img src="https://cdn.authing.cn/blog/20201130174003.png" height="400px" />

点击**测试**按钮，你应该可以看到相关成功提示。

![](https://cdn.authing.cn/blog/20201130173939.png)
