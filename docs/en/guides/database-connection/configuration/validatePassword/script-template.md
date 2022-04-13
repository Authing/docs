This script will be called when users try to reset the password and validate the original password.

### Function Definition

Here is the definition of the `validatePassword` function

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

| Parameter    | Parameter         | Nullable | Explanation              |
| :------- | :-------------- | :------- | :----------------- |
| id       | number / string | false    | User's ID.          |
| password | string          | false    | User's password in cleartext.     |
| context  | object          | true     | Requiring context. |


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

#### Validate Password Successfully

When users' password is validated successfullt, you need to return `true`:

```javascript
async function validatePassword(id, password, context) {
  // Implement your logic here
  return true
}
```

#### Validate Password Failed

When users' password is validated failed, you need to return `false`:

```javascript
async function validatePassword(id, password, context) {
  // Implement your logic here
  return false
}
```

#### Other Abnormal Errors

When the user meets other errors, you can catch the error and return a friendly notice such as

```javascript
async function validatePassword(id, password, context) {
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
- Excute `SQL` command `SELECT password FROM users WHERE id = $1`, if `result.rows.length` is 0 which means the user does not exist, then throw error with error message: `User not exists!`.
- Use `bcrypt.compare` to validate if the password is correct.
- Call `try/finally` in `client.end()` to disable database connection.

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