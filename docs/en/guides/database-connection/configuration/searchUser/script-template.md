This script will be called when the admin is using console or API to search the user vaguely.
### Function Definition

Here is the definition of the `searchUser` function:

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

| Parameter   | Type  | Nullable | Explanation          |
| :------ | :----- | :------- | :------------- |
| keyword | string | false    | The keyword of the fuzzy search |
| context        | object | true     | Requiring context                                          |

The context also includes the following information:

| Property Name          | Type   | Explanation                                                                                                        |
| :--------------- | :----- | :---------------------------------------------------------------------------------------------------------- |
| userPoolId       | string | The ID of the user pool.                                                                                                   |
| userPoolName     | string | The Name of the user pool.                                                                                                |
| userPoolMetadata | object | Configurations of the user pool.                                                                                            |
| appId            | string | The ID of the current user, **you can use appId to distinguish the source application of the user requirement**.                                               |
| appName          | string | The name of the current application.                                                                                            |
| appMetadata      | object | Configurations of the current application.                                                                                        |
| application      | string | The ID of the user pool.                                                                                                  |
| request          | object | The detailed information of current requirement, including: <br> `ip`: The IP of the client. <br> `geo`: The geographic location of the client which is parsed from the IP address. <br> `body`: The body of the requirement. |

### The Rule of the Script's Return Value

#### Get User Lists Successfully

When the user exists, you need to return the user list to Approw, the format of user information can be found in document of [detailed fields of user profile](/guides/user/user-profile.md). For example:

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

#### Other Abnormal Errors

When user meets other errors, you can catch the error and return friendly a notice such as:

```javascript
async function searchUser(keyword, context) {
  try {
    // Implement your logic here
  } catch (error) {
    throw new Error('Something went wrong ...')
  }
}
```

### Best Practice

#### Provide Friendly Error Annoncements

When an unknown error occurs, we recommend throwing a standard `Error` object, Approw will catch this error and return it to the end user. For example, using `throw new Error("My nice error message")` and you will find this error log in the **History Log** of the customized database.

![](https://cdn.authing.cn/img/20210111163154.png)

#### Disable the Database Connection When Exit the Function

Remeber to close the database connection after the whole script is run. You can use client.end() in the try/finally to make sure this command will be executed.

```javascript
try {
  const result = await client.query("YOUR QUERY");
} finally {
  // NOTE: always call `client.end()` here to close the connection to the database
  client.end();
}
```

### Example Functions

Assume we are using `mongodb` as our database:

- You can use `env.DB_CONNECTION_URI` to get database connection string to create database connection.
- According to the keyword of fuzzy search in the `keyword` to search user.
- If user does not exist, return `null`.
- Finally return user information in valid format. The format of user information can be found in document of [detailed fields of user profile](/guides/user/user-profile.md).
- Call `try/finally` in `client.end()` to disable database connection.

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