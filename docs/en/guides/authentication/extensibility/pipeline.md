# Extend the authentication process with Pipeline

<LastUpdated/>

Approw Pipeline is a set of user defined JavaScript codes running in the cloud, allowing developers to extend and customize Approw capabilities.

Approw Pipeline functions are all user definable, and we also provide a wealth of function templates to help developers get started quickly.

Pipeline is a set of functions. The difference from ordinary Hooks is that the function data in the entire pipeline can be transferred to each other to achieve the performance as an industrial pipeline. This design pattern can make the developer's custom modular function which is easy to manage.

The back-end of Approw Pipeline uses a serverless architecture, and all user defined codes run in the cloud to ensure isolation between different tenants. Also, it can be elastically scaled, which not only ensures security, but also improves operating efficiency.

![](https://cdn.authing.cn/blog/authing-pipeline.png)


You can use Approw Pipeline to achieve the following functions:

* Whitelist: Such as the whitelist of registered email suffixes, the whitelist of registered IPs, etc.
* Event notification: Such as sending group notification after user registration, notification of user login IP exception, etc.
* Privilege control: Such as adding users to a user group based on their email after logging in.
* Extended user fields: such as adding custom metadata to the requesting user.
* Custom token: For example, add custom fields to the token.
* ... and more, the imagination is endless.

For example, through the following code, we can implement the logic of prohibiting registration of email that do not end with ** example.com **

```javascript
async function pipe(user, context, callback) {
  const { email } = context.request.body
  // 非邮箱注册方式
  if (!email) {
    return callback(null, user, context)
  }
  if (!email.endsWith("example.com")) {
    return callback(new Error('Access denied.'));
  }
  return callback(null, user, context);
}
```

For more scenarios and detailed documents, please see[here](/guides/pipeline/)。
