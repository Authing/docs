# Import users using SDK

<LastUpdated/>

{{$localeConfig.brandName}} supports SDKs in multiple languages such as Java, JavaScript/Node.js, Python, PHP, C#, Go, Ruby, etc.：

- [Java/Kotlin](/en/reference/sdk-for-java/)
- [JavaScript/Node.js](/en/reference/sdk-for-node/)
- [Python](/en/reference/sdk-for-python/)
- [PHP](/en/reference/sdk-for-php/)
- [C#](/en/reference/sdk-for-csharp/)
- [Go](/en/reference/sdk-for-go/)
- [Ruby](/en/reference/sdk-for-ruby.md)

This article uses Node.js as an example of how to write a script to import users. You can choose a language you are familiar with.

## Step 1: Use a custom password function (optional)

If the password field in your user data table is in plain text, you can skip this step. If it is in cipher text, you need to go to the **basic configuration** -&gt; **password management** -&gt; **user-defined password encryption method** to enable the option and write functions for encrypting and verifying passwords. For details: [Writing custom password encryption functions](./custom-password-script/README.md).

## Step 2: Export your user data

Please export your user data to JSON format, the content is an array. Each element is an object. One of the elements corresponds to a piece of information about the user. As shown in the figure below:

```json
[
  {
    "uid": "1",
    "nickname": "zhang",
    "account_id": "zhang",
    "mail": "test1@123.com",
    "password": "$2b$12$nCa3WDbsc3tvM57ifzjwrOAGGuNK7EPV0R17WKcW6f13NZvX97yLe",
    "phone": "13100000001",
    "emailVerified": true,
    "loginsCount": 4
  },
  {
    "uid": "2",
    "nickname": "wang",
    "account_id": "wang",
    "mail": "test2@123.com",
    "password": "$2b$12$HGloOlfz1HzD0v/r5m1r7OCMcx6X85eC5.At3Ckxe.Jn/u/Za/yy2",
    "phone": "13100000002",
    "emailVerified": false,
    "loginsCount": 12
  },
  {
    "uid": "3",
    "nickname": "zhao",
    "account_id": "zhao",
    "mail": "test3@123.com",
    "password": "$2b$12$ia1oUZZFbEUpLvuqUsKideQq9lVkf2kq9vFaTvp7dlfeCx8UlTmDu",
    "phone": "13100000003",
    "emailVerified": true,
    "loginsCount": 0
  }
]
```

## Step 3: Confirm the user field mapping relationship

Before starting the import, you need to confirm the mapping between your user structure and the {{$localeConfig.brandName}} user field. You can get all the fields and their definitions of the Authing user [here](/guides/user/user-profile.md).

## Step 4: Import user data to Authing

If you don't have a NodeJS environment, you need to [install NodeJS](http://nodejs.org/download/).

Create an index.js file.

Paste the following js script into index.js:

```js
const fs = require("fs");
const path = require("path");

const { ManagementClient } = require("authing-js-sdk");
const userPoolId = "xxxxxxxxxxxxxxxxxxx";
const secret = "xxxxxxxxxxxxxxxxxxx";

// 如果文件较大建议分批次读入
// 请将用户信息与本文件保存在同一个目录，文件内容为用户数据的数组 JSON，一个元素为一个用户的信息对象
let users = fs.readFileSync(path.resolve("users.json"), { encoding: "utf8" });
users = JSON.parse(users);
async function main() {
  const managementClient = new ManagementClient({
    userPoolId,
    secret
  });

  for (let i = 0; i < users.length; i++) {
    let yourUser = users[i];
    try {
      // 在此完成字段对齐
      await managementClient.users.create(
        {
          nickname: yourUser.nickname,
          password: yourUser.password,
          email: yourUser.mail,
          emailVerified: yourUser.emailVerified,
          phone: yourUser.phone,
          loginsCount: yourUser.loginsCount,
          // 存储原始数据，以备Use
          oauth: JSON.stringify(yourUser)
        },
        {
          /**
           * 开启这个开关，password 字段会直接写入 Authing 数据库，Authing 不会再次加密此字段
           * 如果你的密码不是明文存储，你应该保持开启，并编写密码函数计算
           */
          keepPassword: true
        }
      );
    } catch (err) {
      console.log(err);
      // 将导入失败的用户写入文件
      fs.writeFileSync(
        path.resolve("users_failed.json"),
        JSON.stringify(yourUser) + "\n",
        {
          flag: "a"
        }
      );
    }
  }
}

main();
```

Please **align the fields** after copying, and then execute

```bash
$ npm install authing-js-sdk
$ node index.js
```

The code can be viewed on GitHub: [users-migration](https://github.com/Authing/users-migration)

## Help

If you have any questions, please [Contact us](https://forum.authing.cn/)，Feel free to talk.
