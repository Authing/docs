This script will be called when the admin updates user information or users want to update their information by themselves.This script is only required in CUSTOM_USER_STORE mode.
### Function Definition

Here is the definition of the `updateUser` function:

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
    'Please implement the Find User script for this database connection ';
  throw new Error(msg);
}
```

| Parameter                 | Type           | Nullable | Explanation                                                                                 |
| :-------------------- | :-------------- | :------- | :----------------------------------------------------------------------------------- |
| id                    | string / number | false    | User's ID.                                                                             |
| updates               | object          | false    | Fields that need updating.                                                                  |
| updates.email         | string          | ture     | User's email. This parameter can be empty.                                                              |
| updates.phone         | string          | true     | User's telephone number. This parameter can be empty.                                                             |
| updates.username      | string          | true     | User's username. This parameter can be empty.                                                            |
| updates.password      | string          | true     | User's password in cleartext. It is recommended to use bcrypt to encrypt the password.           |
| updates.nickname      | string          | true     | User's nickname. This parameter can be empty.                                                           |
| updates.photo         | string          | true     | User's photo. This parameter can be empty.                                                           |
| updates.token         | string          | true     | User's token. This parameter can be empty.                                                         |
| updates.emailVerified | bool            | true     | If the user's email is verified. This parameter can be empty.                                                       |
| updates.phoneVerified | bool            | true     | If the user's telephone number is verified. This parameter can be empty.                                                    |
| updates.loginsCount   | number          | true     | User's login counts. This parameter can be empty.                                                       |
| updates.xxxx          | any             | true     | Other user's fields. The format of user information can be found in the document [detailed fields of the user profile](/guides/user/user-profile.md). |
| context               | object          | true     | Requiring context.                                                                  |


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

#### User's Profile is Updated Successfully

When the user's profile is updated successfully, you need to return the latest user information to Approw, the format of user information can be found in the document of [detailed fields of the user profile](/guides/user/user-profile.md). For example:

```javascript
async function updateUser(id, updates, context) {
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

#### The User Does not Exist

When the user does not exist, you need to throw an error. You can design different error messages. For example:

```javascript
async function updateUser(id, updates, context) {
  // Implement your logic here
  throw new Error('User not exists!');
}
```

#### Other Abnormal Errors

When the user meets other errors, you can catch the error and return a friendly notice such as

```javascript
async function updateUser(id, updates, context) {
  try {
    // Implement your logic here
  } catch (error) {
    throw new Error('Something went wrong ...')
  }
}
```

## Best Practice

### Provide Friendly Error Annoncements

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
- According to the query conditions in the `updates` to generate `update` `SQL`  command(`updates.id`, `updates.email`, `updates.username` and `updates.phone`, these four parameters won't be empty at the same time).
- If `insertResult.rowCount` is 0 which means the user does not exist, then throw error with error message `User not exists!`.
- Finally return users' information in valid format. The format of user information can be found in document of [detailed fields of user profile](/guides/user/user-profile.md).
- Call `try/finally` in `client.end()` to disable database connection.

```javascript
async function updateUser(id, updates, context) {
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

  // Authing user attribute to database column
  const userColumnMap = {
    id: 'id',
    email: 'email',
    name: 'name',
    username: 'username',
    phone: 'phone',
    nickname: 'nickname',
    gender: 'gender',
    address: 'address',
    company: 'company',
    birthdate: 'birthdate',
    website: 'website',
    token: 'token',
    password: 'password',
    photo: 'photo',
    emailVerified: 'email_verified',
    phoneVerified: 'phone_verified',
    loginsCount: 'logins_count',
    lastIp: 'last_ip',
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
    const _ = require('lodash');
    // Setup static beginning of query
    var query = ['UPDATE users'];
    query.push('SET');

    // Create another array storing each set command
    // and assigning a number value for parameterized query
    var set = [];
    Object.keys(cols)
      .filter(col => !!userColumnMap[col])
      .forEach(function(key, i) {
        set.push(userColumnMap[key] + ' = ($' + (i + 1) + ')');
      });
    query.push(set.join(', '));

    // Add the WHERE statement to look up by id
    query.push('WHERE id = ' + id);

    // Return all fields
    query.push('RETURNING *');

    // Return a complete query string
    return query.join(' ');
  }

  // Use bcrypt to encrypt password
  // more info here: https://github.com/kelektiv/node.bcrypt.js
  const bcrypt = require('bcrypt');

  try {
    const query = generateQuery(id, updates);
    const insertResult = await client.query(
      query,
      Object.keys(updates)
        .filter(col => !!userColumnMap[col])
        .map(key => {
          const val = updates[key];
          if (key === 'password') {
            // If key is password, use bcrypt to encrypt it
            return bcrypt.hashSync(val, bcrypt.genSaltSync(10));
          }
          return val;
        }),
    );
    if (insertResult.rowCount === 0) {
      throw new Error('User not exists!');
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