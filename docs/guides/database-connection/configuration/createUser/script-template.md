该脚本会在用户注册或者使用 API 和控制台创建用户时执行，你需要将用户信息保存到自己的数据库中。此脚本只在完全使用自定义数据库模式中需要。

### 函数定义

`createUser` 函数定义如下：

```javascript
async function createUser(userinfo, context) {
  // This script should create a user entry in your existing database. It will
  // be executed when a user attempts to sign up, or when a user is created
  // through the Auth0 dashboard or API.
  // When this script has finished executing, the Login script will be
  // executed immediately afterwards, to verify that the user was created
  // successfully.

  // The first argument userinfo contains following properties:
  // * email: the user's email
  // * username: the user's username
  // * phone: the user's phone number
  // * password: the user's password in plain text format
  // * nickname: the user's nickname
  // * photo: the user's photo

  // The Second argument context contains information about the authentication context.
  // see http://core.authing.cn/connections/custom-db/config-custom-db-connection.html for more information.

  //
  // There are three ways this script can finish:
  // 1. A user was successfully created
  // format: https://docs.authing.co/user/profile.html .
  //    return null
  // 2. This user already exists in your database
  //    throw new Error("user allready exists")
  // 3. Something went wrong while trying to reach your database:
  //     throw new Error("my error message")

  const msg =
    "Please implement the Find User script for this database connection ";
  throw new Error(msg);
}
```

| 参数              | 类型   | nullable | 说明                                                                       |
| :---------------- | :----- | :------- | :------------------------------------------------------------------------- |
| userinfo          | object | false    | 查询条件                                                                   |
| userinfo.email    | string | ture     | 邮箱，该参数可能为空。                                                     |
| userinfo.phone    | string | true     | 手机号，该参数可能为空。                                                   |
| userinfo.username | string | true     | 用户名，该参数可能为空。                                                   |
| userinfo.password | string | true     | 明文密码。该参数可能为空，强烈推荐使用 `bcrypt` 加密用户密码，详情见下文。 |
| userinfo.nickname | string | true     | 用户昵称，该参数可能为空。                                                 |
| userinfo.photo    | string | true     | 用户头像，该参数可能为空。                                                 |
| context           | object | true     | 请求上下文 context                                                         |

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

#### 创建成功

当创建用户成功时，你需要返回该用户的用户信息给 Authing，用户信息的详细格式请见：[用户 Profile 详细字段](/guides/user/user-profile.md) 。示例：

```javascript
async function createUser(userinfo, context) {
  // Implement your logic here
  return {
    id: 1, // must not empty
    email: "test@example.com",
    emailVerified: true,
    nickname: "Nick",
    photo: "",
  };
}
```

#### 用户已存在

当用户已存在时，你需要直接抛出错误（错误信息可自由定义），例如：

```javascript
async function createUser(query, password, context) {
  // Implement your logic here
  throw new Error("User allready exists!");
}
```

#### 其他异常错误

当遇到其他异常错误时，你可以捕捉错误之后返回更友好的错误提示，例如：

```javascript
async function createUser(userinfo, context) {
  try {
    // Implement your logic here
  } catch (error) {
    throw new Error("Something went wrong ...");
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
  const result = await client.userinfo("YOUR userinfo");
} finally {
  // NOTE: always call `client.end()` here to close the connection to the database
  client.end();
}
```

### 示例函数

以 `postgres` 数据库为例，有以下几点说明：

- 你可以通过 `env.DB_CONNECTION_URI` 获取数据库连接字符串用于创建数据库连接。
- 根据 `userinfo` 中传过来的查询条件动态创建查询语句（`userinfo.id`, `userinfo.email`, `userinfo.username`, `userinfo.phone` 都可能为空，但不会同时为空）。
- 先查询用户是否存在，如果用户存在，抛出异常，错误信息为：`User allready exists!` .
- 最后返回指定格式的用户信息，用户信息的详细格式请见：[用户 Profile 详细字段](/guides/user/user-profile.md)。
- 在 `try/finally` 中调用 `client.end()` 断开数据库连接。

```javascript
async function createUser(userinfo, context) {
  // get exist user from database
  const queryUser = async (client, query) => {
    const { email, phone, username } = query;
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

    const QUERY = `SELECT * FROM users WHERE ${queries.join(" OR ")} LIMIT 1`;
    const result = await client.query(QUERY, parameters);
    return result;
  };

  // This example uses the "pg" library
  // more info here: https://github.com/brianc/node-postgres
  const { Client } = require("pg");

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

  try {
    const findResult = await queryUser(client, {
      email: userinfo.email,
      phone: userinfo.phone,
      username: userinfo.username,
    });
    if (findResult.rows.length > 0) {
      throw new Error("User allready exists!");
    }

    // Use bcrypt to encrypt password
    // more info here: https://github.com/kelektiv/node.bcrypt.js
    const bcrypt = require("bcrypt");
    let hashedPassword = null;

    // Phone Code Login may not have a password
    if (userinfo.password) {
      hashedPassword = await bcrypt.hash(
        userinfo.password,
        await bcrypt.genSalt(10)
      );
    }
    const insertResult = await client.query(
      `INSERT INTO users(email, username, phone, password, nickname, photo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        userinfo.email,
        userinfo.username,
        userinfo.phone,
        hashedPassword,
        userinfo.nickname,
        userinfo.photo,
      ]
    );
    const user = insertResult.rows[0];
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
