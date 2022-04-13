---
meta:
  - name: description
    content: 使用环境变量
---

# 在 Pipeline 中使用环境变量

::: hint-success
Pipeline 函数中的环境变量和操作系统里环境变量的概念一致，开发者可以通过全局变量 env 获取。环境变量对应用池内所有 Pipelien 函数全部可见。
:::

你可以在**设置** - **环境变量**页面配置环境变量：

![](https://cdn.authing.cn/blog/20200927200619.png)

环境变量为一组 Key-Value Pair 值，可以用于保存 WebHook 链接、密钥等数据。

输入 Key 和 Value 之后点击添加：

![](https://cdn.authing.cn/blog/20200927200707.png)

在此，我们设置了一个 Key 为 `LARK_WEBHOOK` 的环境变量，在 Pipeline 函数中可以通过 `env.LARK_WEBHOOK` 获取对应的 Value 值。如下面这个用户注册之后触发飞书群通知的例子：

```js
async function pipe(user, context, callback) {
  const webhook = env.LARK_WEBHOOK;
  await axios.post(webhook, {
    title: "New User Registered - From {{$localeConfig.brandName}} Rules Pipeline",
    text: `
                用户信息：
                ID: ${user.id}
                昵称：${user.username}
                注册方式：${user.registerSource}
                邮箱：${user.email}
                手机号：${user.phone}
                UA: ${user.device}
                用户池 ID: ${user.userPoolId}
          `,
  });
  return callback(null, user, context);
}
```
