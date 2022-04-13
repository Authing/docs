This script will be called when amdin uses console or API to get a user list. This interface will require the number of total users and the list of users in the current page. This script is only required in CUSTOM_USER_STORE mode.
### Function Definition

Here is the definition of the `listUsers` function:

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

| Parameter    | Type   | Nullable | Explanation                |
| :------ | :----- | :------- | :------------------ |
| page    | number | false    | Page number. It will start at 1. |
| limit   | number | false    | The number of users per page.          |
| context | object | true     | Requiring context  |


The context also includes the following information:

| Property Name           | Type   | Explanation                                                                                                        |
| :--------------- | :----- | :---------------------------------------------------------------------------------------------------------- |
| userPoolId       | string | The ID of the user pool.                                                                                                   |
| userPoolName     | string | The Name of the user pool.                                                                                                |
| userPoolMetadata | object | Configurations of the user pool.                                                                                          |
| appId            | string | The ID of the current user, **you can use appId to distinguish the source application of the user requirement**.                                               |
| appName          | string | The name of the current application.                                                                                       |
| appMetadata      | object | Configurations of the current application.                                                                                        |
| application      | string | The ID of the user pool.                                                                                                   |
| request          | object | The detailed information of current requirement, including: <br> `ip`: The IP of the client. <br> `geo`: The geographic location of the client which is parsed from the IP address. <br> `body`: The body of the requirement. |

### The Rule of the Script's Return Value

#### Get User List Successfully

When the user list is received successfully, you need to build up user information with following formats: the returned result should be an object, the key `totalCount` represents the total number of users in this list and the key `list` represents the pages of the list. For example, 

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

#### Other Abnormal Errors

When the user meets other errors, you can catch the error and return a friendly notice such as

```javascript
async function listUsers(id, updates, context) {
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
  const result = await client.updates("YOUR updates");
} finally {
  // NOTE: always call `client.end()` here to close the connection to the database
  client.end();
}
```

### Example Functions

Assume we are using `postgres` as our database:

- You can use `env.DB_CONNECTION_URI` to get database connection string to create database connection.
- Build up the user information with the formats that Approw acquires.
- Call `try/finally` in `client.end()` to disable database connection.

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