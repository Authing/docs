该脚本会在以下场景执行：用户尝试注册时，如果你配置的数据库脚本查找到了用户记录，会拒绝注册请求；OIDC 协议换取用户信息时；通过控制台或者 API 查看用户信息等。此脚本在惰性迁移用户和完全使用自定义数据库模式中都需要。


### 函数定义

`getUser` 函数定义如下：

```javascript
async function getUser(query, context) {
  // The first argument query contains following contents:
  // query.id
  // query.email
  // query.username
  // query.phone

  // The Second argument context contains information about the authentication context.
  // see http://core.authing.cn/connections/custom-db/config-custom-db-connection.html for more information.

  // This script should retrieve a user profile from your existing database,
  // without authenticating the user.
  // It is used to check if a user exists before executing flows that do not
  // require authentication (signup and password reset).
  //
  // There are three ways this script can finish:
  // 1. A user was successfully found. The profile should be in the following
  // format: https://docs.authing.co/user/profile.html .
  //    return profile
  // 2. A user was not found
  //     return null
  // 3. Something went wrong while trying to reach your database:
  //     throw new Error("my error message")

  const msg =
    'Please implement the Find User script for this database connection ';
  throw new Error(msg);
}
```

| 参数           | 类型   | nullable | 说明                                                       |
| :------------- | :----- | :------- | :--------------------------------------------------------- |
| query          | object | false    | 查询条件                                                   |
| query.id       | string | ture     | 用户 ID，该参数可能为空。                                  |
| query.email    | string | ture     | 邮箱，该参数可能为空。                                     |
| query.phone    | string | true     | 手机号，该参数可能为空。                                   |
| query.username | string | true     | 用户名，该参数可能为空。                                   |
| context        | object | true     | 请求上下文 context                                         |

其中 context 中包含包含以下信息：

| 属性名           | 类型   | 说明                                                                                                        |
| :--------------- | :----- | :---------------------------------------------------------------------------------------------------------- |
| userPoolId       | string | 用户池 ID                                                                                                   |
| userPoolName     | string | 用户池 名称                                                                                                 |
| userPoolMetadata | object | 用户池配置信息                                                                                              |
| appId            | string | 当前用户的 ID，**你可以通过 appId 区分用户请求的应用来源。**                                                |
| appName          | string | 当前应用的 名称                                                                                             |
| appMetadata      | object | 当前应用的配置信息                                                                                          |
| application      | string | 用户池 ID                                                                                                   |
| request          | object | 当前请求的详细信息，包括: <br> `ip`: 客户端 IP <br> `geo`: 通过 IP 解析的客户端地理位置 <br> `body`: 请求体 |

### 返回数据约定

#### 用户存在

当用户存时，你需要返回该用户的用户信息给 Authing，用户信息的详细格式请见：[用户 Profile 详细字段](/guides/user/user-profile.md) 。示例：

```javascript
async function getUser(query, context) {
  // Implement your logic here
  return {
    id: 1, // must not empty
    email: "test@example.com",
    emailVerified: true,
    nickname: "Nick",
    photo: ""
  }
}
```

#### 用户不存在

当用户不存在时，你需要返回 `null`，请不要抛出错误。


#### 其他异常错误

当遇到其他异常错误时，你可以捕捉错误之后返回更友好的错误提示，例如：

```javascript
async function getUser(query, context) {
  try {
    // Implement your logic here
  } catch (error) {
    throw new Error('Something went wrong ...')
  }
}
```

## 最佳实践

### 提供友好的错误提示

当遇到未知错误时，我们推荐使用抛出一个标准的 `Error` 对象，Authing 会捕捉此错误并最终返回给终端用户。例如：`throw new Error("My nice error message")`，你可以在自定义数据库的 **日志历史** 中看到该错误日志。

![](https://cdn.authing.cn/img/20210111163154.png)

### 函数结束时断开数据库连接

请切记脚本执行完成时关闭到数据库的连接，比如调用 client.end(). 例如可以在 try/finallly 中执行确保其始终会被执行:

```javascript
try {
  const result = await client.query("YOUR QUERY");
} finally {
  // NOTE: always call `client.end()` here to close the connection to the database
  client.end();
}
```

### 示例函数

以 `postgres` 数据库为例，有以下几点说明：

- 你可以通过 `env.DB_CONNECTION_URI` 获取数据库连接字符串用于创建数据库连接。
- 根据 `query` 中传过来的查询条件动态创建查询语句（`query.id`, `query.email`, `query.username`, `query.phone` 都可能为空，但不会同时为空）。
- 如果用户不存在，返回 `null`。
- 最后返回指定格式的用户信息，用户信息的详细格式请见：[用户 Profile 详细字段](/guides/user/user-profile.md)。
- 在 `try/finally` 中调用 `client.end()` 断开数据库连接。

```javascript
async function getUser(query, context) {
  // The first argument query contains following contents:
  // query.id
  // query.email
  // query.username
  // query.phone

  const { id, email, username, phone } = query;

  // The Second argument context contains information about the authentication context.
  // see http://core.authing.cn/connections/custom-db/config-custom-db-connection.html for more information.

  // This example uses the "pg" library
  // more info here: https://github.com/brianc/node-postgres
  const { Client } = require('pg');

  const client = new Client({
    connectionString: env.DB_CONNECTION_URI,
  });

  // Or you can:
  // const client = new Client({
  //   host: env.DB_HOST,
  //   port: env.DB_PORT,
  //   user: env.DB_USERNAME,
  //   password: env.DB_PASSWORD,
  //   database: env.DB_DATABASE,
  // });

  await client.connect();

  // 构建查询参数
  const queries = [];
  const parameters = [];
  let index = 1;
  if (id) {
    queries.push(`id = $${index}`);
    parameters.push(id);
    index += 1;
  }
  if (email) {
    queries.push(`email = $${index}`);
    parameters.push(email);
    index += 1;
  }
  if (phone) {
    queries.push(`phone = $${index}`);
    parameters.push(phone);
    index += 1;
  }
  if (username) {
    queries.push(`username = $${index}`);
    parameters.push(username);
    index += 1;
  }

  const QUERY = `SELECT * FROM users WHERE ${queries.join(' OR ')}`;

  try {
    const result = await client.query(QUERY, parameters);
    if (result.rows.length === 0) {
      return null;
    }
    const user = result.rows[0];
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      username: user.username,
      photo: user.photo,
      nickname: user.nickname,
      token: user.token,
      emailVerified: user.email_verified,
      phoneVerified: user.phone_verified,
      loginsCount: user.logins_count,
      lastIp: user.last_ip,
      gender: user.gender,
      address: user.address,
      company: user.company,
      birthdate: user.birthdate,
      website: user.website,
    };
  } catch (error) {
    throw new Error(`Execute query failed: ${error.message}`);
  } finally {
    // NOTE: always call `client.end()` here to close the connection to the database
    client.end();
  }
}
```