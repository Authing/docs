该脚本会在管理员使用控制台或者 API 获取用户列表时执行，这个接口需要的数据中需要包含用户总数、当前页用户列表。此脚本只在完全使用自定义数据库模式中需要。

### 函数定义

`validatePassword` 函数定义如下：

```javascript
async function validatePassword(id, password, context) {
  // This script should validate password of a exists user entry in your database. It will
  // be executed when a user attempts to change password.

  // The first argument `id` is the user'id in your database

  // The second argument `password` is the password user input in palin text format.

  // The last argument `context` contains information about the authentication context.
  // see http://core.authing.cn/connections/custom-db/config-custom-db-connection.html for more information.

  //
  // There are three ways this script can finish:
  // 1. The password
  // format: https://docs.authing.co/user/profile.html .
  //    return profile
  // 2. A user was not found
  //     return null
  // 3. Something went wrong while trying to reach your database:
  //     throw new Error("my error message")

  const msg =
    'Please implement the Validate Password script for this database connection';
  throw new Error(msg);
}
```

| 参数     | 类型            | nullable | 说明               |
| :------- | :-------------- | :------- | :----------------- |
| id       | number / string | false    | 用户 ID            |
| password | string          | false    | 用户明文密码。     |
| context  | object          | true     | 请求上下文 context |


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

#### 验证密码成功

验证密码成功时，你需要返回 `true`:

```javascript
async function validatePassword(id, password, context) {
  // Implement your logic here
  return true
}
```

#### 验证密码失败

验证密码失败时，你需要返回 `false`:

```javascript
async function validatePassword(id, password, context) {
  // Implement your logic here
  return false
}
```

#### 其他异常错误

当遇到其他异常错误时，你可以捕捉错误之后返回更友好的错误提示，例如：

```javascript
async function validatePassword(id, password, context) {
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
- 执行 `SQL` 语句 `SELECT password FROM users WHERE id = $1`，如果 `result.rows.length` 为 0，表明该用户不存在，抛出异常，错误信息为：`User not exists!` .
- 通过 `bcrypt.compare` 比对密码是否正确。
- 在 `try/finally` 中调用 `client.end()` 断开数据库连接。

```javascript
async function validatePassword(id, password, context) {
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

  // Use bcrypt to validate password
  // more info here: https://github.com/kelektiv/node.bcrypt.js
  const bcrypt = require('bcrypt');

  const QUERY = 'SELECT password FROM users WHERE id = $1';
  try {
    const result = await client.query(QUERY, [id]);
    if (result.rows.length === 0) {
      throw new Error('User not exists!');
    }
    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid;
  } catch (error) {
    throw new Error(`Execute query failed: ${error.message}`);
  } finally {
    // NOTE: always call `client.end()` here to close the connection to the database
    client.end();
  }
}
```