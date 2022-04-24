该脚本会在管理员使用控制台或者 API 模糊搜索用户的时候调用。
### 函数定义

`searchUser` 函数定义如下：

```javascript
async function searchUser(keyword, context) {
  // The first argument keyword is the keywork used to Search Users

  // The Second argument context contains information about the authentication context.
  // see http://docs.authing.cn/connections/custom-db/config-custom-db-connection.html for more information.

  // This script should retrieve a user profile from your existing database,
  // without authenticating the user.
  // It is used to check if a user exists before executing flows that do not
  // require authentication (signup and password reset).
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
    'Please implement the Search User script for this database connection ';
  throw new Error(msg);
}

```

| 参数    | 类型   | nullable | 说明           |
| :------ | :----- | :------- | :------------- |
| keyword | string | false    | 模糊搜索关键词 |


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

#### 成功获取用户列表

当用户存时，你需要返回该用户的用户信息给 Authing，用户信息的详细格式请见：[用户 Profile 详细字段](/guides/user/user-profile.md) 。示例：

```javascript
async function searchUser(query, context) {
  // Implement your logic here
  return {
   totalCount: 10,
   list: [
       {
        id: 1, // must not empty
        email: "test@example.com",
        emailVerified: true,
        nickname: "Nick",
        photo: ""
       }
    ]
  }
}
```

#### 其他异常错误

当遇到其他异常错误时，你可以捕捉错误之后返回更友好的错误提示，例如：

```javascript
async function searchUser(keyword, context) {
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
  const result = await client.query("YOUR QUERY");
} finally {
  // NOTE: always call `client.end()` here to close the connection to the database
  client.end();
}
```

### 示例函数

以 `mongodb` 数据库为例，有以下几点说明：

- 你可以通过 `env.DB_CONNECTION_URI` 获取数据库连接字符串用于创建数据库连接。
- 根据 `keyword` 中传过来的模糊搜索关键词搜索用户。
- 如果用户不存在，返回 `null`。
- 最后返回指定格式的用户信息，用户信息的详细格式请见：[用户 Profile 详细字段](/guides/user/user-profile.md)。
- 在 `try/finally` 中调用 `client.end()` 断开数据库连接。

```javascript
async function searchUser(keyword, context) {
  // This example uses the "mongodb" v3.6 library
  // more info here: http://mongodb.github.io/node-mongodb-native/contents.html

  const MongoClient = require('mongodb').MongoClient;
  const client = await MongoClient.connect(env.DB_CONNECTION_URI, {
    useNewUrlParser: true,
  });

  if (!client) {
    throw new Error('连接数据库失败');
  }

  const queries = [
    {
      email: {
        $regex: `.*${keyword}.*`,
      },
    },
    {
      name: {
        $regex: `.*${keyword}.*`,
      },
    },
    {
      nickname: {
        $regex: `.*${keyword}.*`,
      },
    },
  ];

  try {
    const db = client.db();
    const collection = db.collection('Users');
    let list = await collection
      .find({
        $or: queries,
      })
      .toArray();
    list = list.map(user => {
      return {
        id: user._id.toString(),
        blocked: user.blocked,
        email: user.email,
        emailVerified: user.email_verified,
        name: user.name,
        nickname: user.nickname,
        address: user.address,
        company: user.company,
        country: user.country,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
      };
    });
    return {
      list,
      totalCount: list.length,
    };
  } catch (error) {
    throw new Error(`Execute query failed: ${error.message}`);
  } finally {
    client.close();
  }
}
```