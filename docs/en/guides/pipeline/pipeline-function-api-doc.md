---
meta:
  - name: description
    content: Pipeline function development guide
---

# Pipeline function development guide

<LastUpdated/>


::: hint-success
Pipeline is a set of functions. The difference from ordinary Hooks is that the function data in the entire pipeline can be transferred to each other to achieve the same effect as an industrial pipeline. This design pattern can make the developer's custom function more modular and easy to manage.
:::

::: hint-danger
For security reasons， {{$localeConfig.brandName}} will use userPoolId and secret to initialize approw-js-sdk in a special way. This process will not send your user pool key to the public network. You can use the global variable **approw**，**please do not initialize the SDK again！**
:::

## Pipeline function type <a id="pipeline-type"></a>

Currently {{$localeConfig.brandName}} supports three types of Pipeline functions:

| Name                         | Description                                                                                                                                                                                                                               |
| :--------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pre-Register Pipeline <img width=300>       | The pipeline before registration will be triggered every time the user officially enters the registration logic. Developers can use this to implement functions such as the whitelist of registered mailboxes and the whitelist of registered IP.                                                                                                                         |
| Post-Register Pipeline       | The registered pipeline will be triggered every time the user completes the registration logic（**it has been saved to the database at this time**），Developers can use this to implement functions such as writing custom metadata to the database and new user registration webhook notification.                                                                       |
| Post-Authentication Pipeline | The authenticated pipeline will be triggered every time the user completes the authentication. Developers can use this to implement functions such as adding custom fields to the token.                                                                                                                                      |
| Pre-OIDCTokenIssued Pipeline | Triggered before the OIDC application code is exchanged for the token. Developers can use this to implement functions such as writing custom fields to the idToken. For details of the code-to-token part of the OIDC authentication process, please check：[Using OIDC Authorization](/federation/oidc/authorization-code/?step=2) |

::: hint-info
Developers must choose a Pipeline type when creating a Pipeline function.
:::

## Function definition <a id="definition"></a>

Pipeline function definition：

```js
async function pipe(user, context, callback)
```

::: hint-success
Pre-Register Pipeline has a null user because it cannot confirm who this user is before registration.
:::

::: hint-success
pipe function supports async / await syntax!
:::

::: hint-danger
Do not rename the pipe function!
:::

Parameter Description：

| Parameter     | Type     | Description                                                            |
| :------- | :------- | :--------------------------------------------------------------- |
| user     | object   | The current requesting user. See the [user object](user-object.md) for detailed fields.         |
| context  | object   | Request authentication context. See the [context object](context-object.md) for detailed fields. |
| callback | function | The callback function, see below for usage documentation.                                       |

### callback function <a id="callback"></a>

Definition：

```js
function callback(error, user, context)
```

Description：

1. The first parameter of the callback function represents the error that the developer wants to pass to the end user. **If it is not null, the entire authentication process will be interrupted and the error will be returned directly to the front end**.
2. 2. If the first parameter is null, be sure to pass the latest user and context to the callback function, otherwise the subsequent pipeline function will not work properly.

### Setting up asynchronous execution <a id="async"></a>

The pipeline function set to asynchronous execution（ **asynchronous non-language level** ）will not block the execution of the registration, login, and OIDC processes. The parameters passed in the callback function have no effect on the subsequent processes. It is suitable for asynchronous notification scenarios, such as social media group notification, trigger external system statistics, etc.

As shown in the figure below, checking this box means to let the pipeline function execute asynchronously:

![](https://cdn.authing.cn/blog/20200927195654.png)

## Pipeline function example <a id="demo"></a>

We implement a **Pre-Register Pipeline** for the whitelist of registered mailbox suffixes here.

```js
async function pipe(context, callback) {
  const email = context.data.userInfo.email;
  // 非邮箱注册方式, 跳过此 pipe 函数
  if (!email) {
    return callback(null, context);
  }

  // 如果域名邮箱不是 example.com, 返回 Access denied. 错误给终端。
  if (!email.endsWith("@example.com")) {
    return callback(new Error("Access denied."));
  }
  return callback(null, context);
}
```

Briefly explain the code here:

- Lines 2-6 determine whether email is included in the request parameters, and if so, it means the email registration method. If not, skip the pipe function directly, and call callback with null and context parameters（**don’t forget this parameter!**）. If you just want to register by email, this step is okay if there is no email to return an error.
- Lines 8-10 determine whether the domain name of the mailbox is`example.com`. If the callback function is not called, the first parameter is `new Error('Access Denied.')`.
- On line 11, call `return callback(null, context)`, and then enter the next pipe function, if there have the next function.
