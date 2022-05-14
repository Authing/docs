This script will be called when the user registers an account or someone uses console or API to create a user account. You need to save user information into your own database. This script is only required in CUSTOM_USER_STORE mode.

### Function Definition

Here is the definition of the `createUser` function:

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

| Parameter         | Type   | Nullable | Explanation                                                                              |
| :---------------- | :----- | :------- | :--------------------------------------------------------------------------------------- |
| userinfo          | object | false    | Query condition                                                                          |
| userinfo.email    | string | ture     | User's email. This parameter can be empty.                                               |
| userinfo.phone    | string | true     | User's telephone number. This parameter can be empty.                                    |
| userinfo.username | string | true     | User's username. This parameter can be empty.                                            |
| userinfo.password | string | true     | User's password in cleartext. It is recommended to use `bcrypt` to encrypt the password. |
| userinfo.nickname | string | true     | User's nickname. This parameter can be empty.                                            |
| userinfo.photo    | string | true     | User's photo. This parameter can be empty.                                               |
| context           | object | true     | Requiring context.                                                                       |

The context also includes the following information:

| Property Name    | Type   | Explanation                                                                                                                                                                                                                   |
| :--------------- | :----- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| userPoolId       | string | The ID of the user pool.                                                                                                                                                                                                      |
| userPoolName     | string | The Name of the user pool.                                                                                                                                                                                                    |
| userPoolMetadata | object | Configurations of the user pool.                                                                                                                                                                                              |
| appId            | string | The ID of the current user, **you can use appId to distinguish the source application of the user requirement**.                                                                                                              |
| appName          | string | The name of the current application.                                                                                                                                                                                          |
| appMetadata      | object | Configurations of the current application.                                                                                                                                                                                    |
| application      | string | The ID of the user pool.                                                                                                                                                                                                      |
| request          | object | The detailed information of current requirement, including: <br> `ip`: The IP of the client. <br> `geo`: The geographic location of the client which is parsed from the IP address. <br> `body`: The body of the requirement. |

### The Rule of the Script's Return Value

#### User is Created Successfully

When the user is created successfully, you need to return the user information to Authing, the format of user information can be found in the document of [of detailed fields of the user profile](/guides/user/user-profile.md). For example:

```javascript
async function getUser(userinfo, context) {
  // Implement your logic here
  return {
    id: 1, // must not empty
    email: "test@example.com",
    emailVerified: true,
    nickname: "Nick",
    photo: ""
  };
}
```

#### The User Already Exists

When the user already exists, you need to throw an error. You can design different error messages. For example:

```javascript
async function login(query, password, context) {
  // Implement your logic here
  throw new Error("User allready exists!");
}
```

#### Other Abnormal Errors

When the user meets other errors, you can catch the error and return a friendly notice such as

```javascript
async function getUser(userinfo, context) {
  try {
    // Implement your logic here
  } catch (error) {
    throw new Error("Something went wrong ...");
  }
}
```

### Best Practice

#### Provide Friendly Error Annoncements

When an unknown error occurs, we recommend throwing a standard `Error` object, Authing will catch this error and return it to the end user. For example, using `throw new Error("My nice error message")` and you will find this error log in the **History Log** of the customized database.

![](https://cdn.authing.cn/img/20210111163154.png)

#### Disable the Database Connection When Exit the Function

Remeber to close the database connection after the whole script is run. You can use client.end() in the try/finally to make sure this command will be executed.

```javascript
try {
  const result = await client.userinfo("YOUR userinfo");
} finally {
  // NOTE: always call `client.end()` here to close the connection to the database
  client.end();
}
```

### Example Functions

Assume we are using `postgres` as our database:

- You can use `env.DB_CONNECTION_URI` to get database connection string to create database connection.
- According to the query conditions in the `userinfo` to generate query command(`userinfo.id`, `userinfo.email`, `userinfo.username` and `userinfo.phone`, these four parameters won't be empty at the same time).
- Check if the user exists. If the user already exists, return `User allready exists!`.
- Finally return users' information in valid format. The format of user information can be found in document of [detailed fields of user profile](/guides/user/user-profile.md).
- Call `try/finally` in `client.end()` to disable database connection.

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
    connectionString: env.DB_CONNECTION_URI
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
      username: userinfo.username
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
        userinfo.photo
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
      website: user.website
    };
  } catch (error) {
    throw new Error(`Execute query failed: ${error.message}`);
  } finally {
    // NOTE: always call `client.end()` here to close the connection to the database
    client.end();
  }
}
```
