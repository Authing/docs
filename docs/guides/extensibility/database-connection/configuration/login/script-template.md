该脚本会在用户尝试登录的时候执行，如果该用户未同步到 Authing 数据库，会根据你填写的此脚本检验用户账号密码。此脚本在惰性迁移用户和完全使用自定义数据库模式中都需要。

### 函数定义

`login` 函数定义如下：

```javascript
async function login(query, password, context) {
  // The first argument query contains following contents:
  // query.email
  // query.username
  // query.phone

  // The second argument password is user's password in plain text format.

  // The Second argument context contains information about the authentication context.
  // see http://core.authing.cn/connections/custom-db/config-custom-db-connection.html for more information.

  // This script should retrieve a user profile from your existing database,
  // without authenticating the user.

  // It is used to check if a user exists before executing flows that do not
  // require authentication (signup and password reset).
  //
  // There are three ways this script can finish:
  // 1. A user was successfully found, and password is valid, The profile should be in the following
  // format: https://docs.authing.co/user/profile.html .
  //    return profile
  // 2. A user was not found
  //    throw new Error('User not exists!');
  // 3. A user was found, but password is not valid
  //    throw new Error('Password is not valid!');
  // 4. Something went wrong while trying to reach your database:
  //    throw new Error("my error message")

  const msg = 'Please implement the Login script for this database connection';
  throw new Error(msg);
}
```

| 参数           | 类型   | nullable | 说明                                         |
| :------------- | :----- | :------- | :------------------------------------------- |
| query          | object | false    | 查询条件                                     |
| query.email    | string | ture     | 邮箱。当用户使用邮箱登录时该参数不为空。     |
| query.phone    | string | true     | 手机号。当用户使用手机号登录时该参数不为空。 |
| query.username | string | true     | 用户名。当用户使用用户名登录时该参数不为空。 |
| password       | string | false    | 明文密码。强烈推荐使用 `bcrypt` 加密用户密码，详情见下文。                                   |
| context        | object | true     | 请求上下文 context                           |

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

#### 用户存在且密码正确

当用户存在且密码正确时，你需要返回该用户的用户信息给 Authing，用户信息的详细格式请见：[用户 Profile 详细字段](/guides/user/user-profile.md) 。示例：

```javascript
async function login(query, password, context) {
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

当用户不存在时，你需要直接抛出错误（错误信息可自由定义），例如：

```javascript
async function login(query, password, context) {
  // Implement your logic here
  throw new Error('User not exists');
}
```

#### 用户存在但密码不正确

当用户存在但密码不正确，你需要直接抛出错误（错误信息可自由定义），例如：

```javascript
async function login(query, password, context) {
  // Implement your logic here
  throw new Error('User not exists');
}
```

#### 其他异常错误

当遇到其他异常错误时，你可以捕捉错误之后返回更友好的错误提示，例如：

```javascript
async function login(query, password, context) {
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

#### 使用 `bcrypt` 加密密码

我们推荐使用 `bcrypt` 加密保存用户数据，如：

```javascript
const bcrypt = require('bcrypt');
const hashedPassword = await bcrypt.hash(
  'passw0rd',
  await bcrypt.genSalt(10),
);
```

验证密码是否正确：

```javascript
const bcrypt = require('bcrypt');
const valid = await bcrypt.compare('passw0rd', user.password);
```

#### 函数结束时断开数据库连接

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
- 根据 `query` 中传过来的查询条件动态创建查询语句（`query.email`, `query.username`, `query.phone` 三者都可能为空，但不会同时为空）。
- 如果用户不存在，直接抛出异常，错误信息为 `User not exists!`。
- 如果用户存在但密码不正确，直接抛出异常，错误信息为 `Password is not valid!`。
- 最后返回指定格式的用户信息，用户信息的详细格式请见：[用户 Profile 详细字段](/guides/user/user-profile.md)。
- 在 `try/finally` 中调用 `client.end()` 断开数据库连接。

```javascript
async function login(query, password, context) {
  // The first argument query contains following contents:
  // query.email
  // query.username
  // query.phone
  const { email, username, phone } = query;

  // The second argument password is user's password in plain text format.

  // The last argument context contains information about the authentication context.
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

  // Use bcrypt to validate password
  // more info here: https://github.com/kelektiv/node.bcrypt.js
  const bcrypt = require('bcrypt');

  // 构建查询参数
  const queries = [];
  const parameters = [];
  let index = 1;
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
      throw new Error('User not exists!');
    }
    const user = result.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Password is not valid!');
    }

    return {
      id: user.id,
      email: user.email,
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