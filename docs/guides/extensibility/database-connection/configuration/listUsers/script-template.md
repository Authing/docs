该脚本会在管理员使用控制台或者 API 获取用户列表时执行，这个接口需要的数据中需要包含用户总数、当前页用户列表。此脚本只在完全使用自定义数据库模式中需要。

### 函数定义

`listUsers` 函数定义如下：

```javascript
async function listUsers(page, limit, context) {
  // This script should be able to get a list of users of your database.

  // The first argument `page` is 1-based number.

  // The second argument `limit` is page size.

  // The last argument `context` contains information about the authentication context.
  // see http://core.authing.cn/connections/custom-db/config-custom-db-connection.html for more information.

  //
  // There are three ways this script can finish:
  // 1. Get Users Success:
  // return {
  //   totalCount: 101,
  //   list: [], // current page
  // };
  // 2. Something went wrong while trying to reach your database:
  //    throw new Error("my error message")

  const msg =
    'Please implement the List Users script for this database connection';
  throw new Error(msg);
}
```

| 参数    | 类型   | nullable | 说明                |
| :------ | :----- | :------- | :------------------ |
| page    | number | false    | 页码数，从 1 开始。 |
| limit   | number | false    | 每页数目。          |
| context | object | true     | 请求上下文 context  |


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

#### 获取用户列表成功

你需要按照以下格式组装用户数据：返回的数据需要是一个对象，key `totalCount` 表示用户总数，key `list` 表示当前页的用户列表，如：

```javascript
async function listUsers(id, updates, context) {
  // Implement your logic here
  return {
    totalCount: 12,
    list: [
      {
        id: 1,
        ...
      }
    ],
  };
}
```

#### 其他异常错误

当遇到其他异常错误时，你可以捕捉错误之后返回更友好的错误提示，例如：

```javascript
async function listUsers(id, updates, context) {
  try {
    // Implement your logic here
  } catch (error) {
    throw new Error('Something went wrong ...')
  }
}
```

### 最佳实践

#### 提供友好的错误提示

当遇到未知错误时，我们推荐使用抛出一个标准的 `Error` 对象，Authing 会捕捉此错误并最终返回给终端用户。例如：`throw new Error("My nice error message")`，你可以在自定义数据库的 **日志历史** 中看到该错误日志。

![](https://cdn.authing.cn/img/20210111163154.png)

#### 函数结束时断开数据库连接

请切记脚本执行完成时关闭到数据库的连接，比如调用 client.end(). 例如可以在 try/finallly 中执行确保其始终会被执行:

```javascript
try {
  const result = await client.updates("YOUR updates");
} finally {
  // NOTE: always call `client.end()` here to close the connection to the database
  client.end();
}
```

### 示例函数

以 `postgres` 数据库为例，有以下几点说明：

- 你可以通过 `env.DB_CONNECTION_URI` 获取数据库连接字符串用于创建数据库连接。
- 将用户信息组装成 Authing 指定的格式。
- 在 `try/finally` 中调用 `client.end()` 断开数据库连接。

```javascript
async function listUsers(page, limit, context) {
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

  const data = await client.query('SELECT COUNT(*) FROM users');
  const totalCount = parseInt(data.rows[0].count);
  const QUERY = `SELECT * from users LIMIT ${limit} OFFSET ${(page - 1) *
    limit}`;
  try {
    const result = await client.query(QUERY);
    const list = result.rows.map(user => {
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
    });
    return {
      totalCount,
      list,
    };
  } catch (error) {
    throw new Error(`Execute query failed: ${error.message}`);
  } finally {
    // NOTE: always call `client.end()` here to close the connection to the database
    client.end();
  }
}

```