# 使用 SDK 导入用户

<LastUpdated/>

{{$localeConfig.brandName}} 同时支持了 Java、JavaScript/Node.js、Python、PHP、C#、Go、Ruby 等多种语言的 SDK：

- [Java/Kotlin](/reference/sdk-for-java/)
- [JavaScript/Node.js](/reference/sdk-for-node/)
- [Python](/reference/sdk-for-python/)
- [PHP](/reference/sdk-for-php/)
- [C#](/reference/sdk-for-csharp/)
- [Go](/reference/sdk-for-go/)
- [Ruby](/reference/sdk-for-ruby.md)

本文以 Node.js 为例，介绍如何编写脚本导入用户，你可以选择自己熟悉的语言。

## 第一步：使用自定义密码函数（可选）

如果你的用户数据表中密码字段是明文，可以跳过此步骤；如果是密文，需要进入**基础配置** -&gt; **密码管理** -&gt; **自定义密码加密方法**开启选项并编写用于加密和验证密码的函数。详情请见：[编写自定义密码加密函数](./custom-password-script/README.md)。

## 第二步：导出你的用户数据

请将你的用户数据导出为 JSON 格式，内容为一个数组，每个元素是一个对象，其中一个元素对应一条用户的信息，保存为例如 users.json：

```json
[
  {
    "uid": "AUTHING_USER_1",
    "nickname": "zhang",
    "account_id": "zhang",
    "mail": "test1@123.com",
    "password": "$2b$12$nCa3WDbsc3tvM57ifzjwrOAGGuNK7EPV0R17WKcW6f13NZvX97yLe",
    "phone": "13100000001",
    "emailVerified": true,
    "loginsCount": 4
  },
  {
    "uid": "AUTHING_USER_2",
    "nickname": "wang",
    "account_id": "wang",
    "mail": "test2@123.com",
    "password": "$2b$12$HGloOlfz1HzD0v/r5m1r7OCMcx6X85eC5.At3Ckxe.Jn/u/Za/yy2",
    "phone": "13100000002",
    "emailVerified": false,
    "loginsCount": 12
  },
  {
    "uid": "AUTHING_USER_3",
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

## 第三步：确认用户字段映射关系

在正式开始导入之前，你需要先确认你的用户结构与 {{$localeConfig.brandName}} 用户字段之间的映射关系，你可以在[这里](/guides/user/user-profile.md)获取 {{$localeConfig.brandName}} 用户所有字段及其释义。

## 第四步：导入用户数据到 Authing

如果你没有 NodeJS 环境，需要先[安装 NodeJS](http://nodejs.cn/download/)。

创建一个 index.js 文件。

将以下 js 脚本粘贴到 index.js：

```js
const fs = require('fs')
const path = require('path')

const { ManagementClient } = require('authing-js-sdk')
const userPoolId = 'xxxxxxxxxxxxxxxxxxx'
const secret = 'xxxxxxxxxxxxxxxxxxx'

// 如果文件较大建议分批次读入
// 请将用户信息与本文件保存在同一个目录，文件内容为用户数据的数组 JSON，一个元素为一个用户的信息对象，此处读取上文中的 users.json
let users = fs.readFileSync(path.resolve('users.json'), { encoding: 'utf8' })
users = JSON.parse(users)
async function main() {
  const managementClient = new ManagementClient({
    userPoolId,
    secret,
  })

  for (let i = 0; i < users.length; i++) {
    let yourUser = users[i]
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
          // 存储原始数据，以备使用
          oauth: JSON.stringify(yourUser),
        },
        {
          /**
           * 开启这个开关，password 字段会直接写入 Authing 数据库，Authing 不会再次加密此字段
           * 如果你的密码不是明文存储，你应该保持开启，并编写密码函数计算
           */
          keepPassword: true,
        }
      )
    } catch (err) {
      console.log(err)
      // 将导入失败的用户写入文件
      fs.writeFileSync(
        path.resolve('users_failed.json'),
        JSON.stringify(yourUser) + '\n',
        {
          flag: 'a',
        }
      )
    }
  }
}

main()
```

复制完成后请**对字段进行对齐**，再执行

```bash
$ npm install authing-js-sdk
$ node index.js
```

代码可在 GitHub 查看：[users-migration](https://github.com/authing/authing-js-sdk/tree/master-backups-20220901)

## 获取帮助

遇到问题？[联系我们](https://forum.authing.cn/)，Feel free to talk.
