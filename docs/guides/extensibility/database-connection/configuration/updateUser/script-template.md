该脚本会在管理员修改用户资料或者用户自己修改用户资料时执行。此脚本只在完全使用自定义数据库模式中需要。

### 函数定义

`updateUser` 函数定义如下：

```javascript
async function updateUser(id, updates, context) {
  // This script should update a user entry in your existing database. It will
  // be executed when a user attempts to change profile or when a user is updated
  // through the Auth0 dashboard or API.

  // The first argument `id` is the id of user.

  // The second argument `updates` contains following properties:
  // * email: the user's email
  // * username: the user's username
  // * phone: the user's phone number
  // * password: the user's password in plain text format
  // * nickname: the user's nickname
  // * photo: the user's photo
  // * and many other fields

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

| 参数                  | 类型            | nullable | 说明                                                                                              |
| :-------------------- | :-------------- | :------- | :------------------------------------------------------------------------------------------------ |
| id                    | string / number | false    | 用户 ID                                                                                           |
| updates               | object          | false    | 需要修改的用户字段                                                                                |
| updates.email         | string          | ture     | 邮箱，该参数可能为空。                                                                            |
| updates.phone         | string          | true     | 手机号，该参数可能为空。                                                                          |
| updates.username      | string          | true     | 用户名，该参数可能为空。                                                                          |
| updates.password      | string          | true     | 明文密码。该参数可能为空，强烈推荐使用 `bcrypt` 加密用户密码，详情见下文。                        |
| updates.nickname      | string          | true     | 用户昵称，该参数可能为空。                                                                        |
| updates.photo         | string          | true     | 用户头像，该参数可能为空。                                                                        |
| updates.token         | string          | true     | 用户 token，该参数可能为空。                                                                      |
| updates.emailVerified | bool            | true     | 邮箱是否验证，该参数可能为空。                                                                    |
| updates.phoneVerified | bool            | true     | 手机号是否验证，该参数可能为空。                                                                  |
| updates.loginsCount   | number          | true     | 用户登录次数，该参数可能为空。                                                                    |
| updates.xxxx          | any             | true     | 其他更多的用户字段，用户信息的详细格式请见：[用户 Profile 详细字段](/guides/user/user-profile.md) |
| context               | object          | true     | 请求上下文 context                                                                                |

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

#### 修改成功

当修改用户资料成功时，你需要将该用户的最新用户信息返回给 Authing，用户信息的详细格式请见：[用户 Profile 详细字段](/guides/user/user-profile.md) 。示例：

```javascript
async function updateUser(id, updates, context) {
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

#### 用户不存在

当用户不存在时，你需要直接抛出错误（错误信息可自由定义），例如：

```javascript
async function updateUser(id, updates, context) {
  // Implement your logic here
  throw new Error("User not exists!");
}
```

#### 其他异常错误

当遇到其他异常错误时，你可以捕捉错误之后返回更友好的错误提示，例如：

```javascript
async function updateUser(id, updates, context) {
  try {
    // Implement your logic here
  } catch (error) {
    throw new Error("Something went wrong ...");
  }
}
```

## 最佳实践

### 提供友好的错误提示

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
- 根据 `updates` 中传过来的查询条件动态创建 `update` `SQL` 语句（`updates.id`, `updates.email`, `updates.username`, `updates.phone` 都可能为空，但不会同时为空）。
- 如果 `insertResult.rowCount` 为 0，表明该用户不存在，抛出异常，错误信息为：`User not exists!` .
- 最后返回指定格式的用户信息，用户信息的详细格式请见：[用户 Profile 详细字段](/guides/user/user-profile.md)。
- 在 `try/finally` 中调用 `client.end()` 断开数据库连接。

```javascript
async function updateUser(id, updates, context) {
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

  // Authing user attribute to database column
  const userColumnMap = {
    id: "id",
    email: "email",
    name: "name",
    username: "username",
    phone: "phone",
    nickname: "nickname",
    gender: "gender",
    address: "address",
    company: "company",
    birthdate: "birthdate",
    website: "website",
    token: "token",
    password: "password",
    photo: "photo",
    emailVerified: "email_verified",
    phoneVerified: "phone_verified",
    loginsCount: "logins_count",
    lastIp: "last_ip",
  };

  // Make sure to delete cols not exists in your table,
  // or sql might fail.
  for (const key in updates) {
    if (userColumnMap[key] === undefined) {
      delete updates[key];
    }
  }

  // If nothing interested, just return
  if (Object.keys(updates).length === 0) {
    return null;
  }

  function generateQuery(id, cols) {
    const _ = require("lodash");
    // Setup static beginning of query
    var query = ["UPDATE users"];
    query.push("SET");

    // Create another array storing each set command
    // and assigning a number value for parameterized query
    var set = [];
    Object.keys(cols)
      .filter((col) => !!userColumnMap[col])
      .forEach(function(key, i) {
        set.push(userColumnMap[key] + " = ($" + (i + 1) + ")");
      });
    query.push(set.join(", "));

    // Add the WHERE statement to look up by id
    query.push("WHERE id = " + id);

    // Return all fields
    query.push("RETURNING *");

    // Return a complete query string
    return query.join(" ");
  }

  // Use bcrypt to encrypt password
  // more info here: https://github.com/kelektiv/node.bcrypt.js
  const bcrypt = require("bcrypt");

  try {
    const query = generateQuery(id, updates);
    const insertResult = await client.query(
      query,
      Object.keys(updates)
        .filter((col) => !!userColumnMap[col])
        .map((key) => {
          const val = updates[key];
          if (key === "password") {
            // If key is password, use bcrypt to encrypt it
            return bcrypt.hashSync(val, bcrypt.genSaltSync(10));
          }
          return val;
        })
    );
    if (insertResult.rowCount === 0) {
      throw new Error("User not exists!");
    }
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
