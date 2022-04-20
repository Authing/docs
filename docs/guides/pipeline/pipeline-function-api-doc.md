---
meta:
  - name: description
    content: Pipeline 函数开发指南
---

# Pipeline 函数开发指南

<LastUpdated/>


::: hint-success
Pipeline 为一组函数，和普通 Hooks 的区别在于，Pipeline 整个流程中的函数数据可以相互传递，实现工业流水线一样的效果。这种设计模式，可以使得开发者的自定义函数更加模块化，便于管理。
:::

::: hint-danger
出于安全考虑， {{$localeConfig.brandName}} 会通过特殊方式，使用你的用户池 ID（userPoolId） 和用户池密钥（secret） 初始化 authing-js-sdk，此过程不会将你的用户池密钥发送到公网。你可以使用使用全局变量 **authing**，**请勿再次初始化 SDK！**
:::

## Pipeline 函数类型 <a id="pipeline-type"></a>

目前 {{$localeConfig.brandName}} 支持六种类型的 Pipeline 函数：

| 触发场景                      | 说明                          |
| --------------------------- | ------------- |
| 注册前   | 在每次用户正式进入注册逻辑前触发，**此时用户信息还没有保存至数据库**。开发者可在此自定义控制用户的注册流程，实现注册邮箱白名单、注册 IP 白名单等功能。                                                    |
| 注册后          | 在每次用户完成注册逻辑之后触发，**此时用户信息已经保存至数据库**。开发者可在此获取并自定义扩展用户的注册信息，实现往数据库写入自定义 metadata 、新用户注册 webhook 通知等功能。       |
| 认证前     | 在每次用户完成认证之前触发，**此时还没有在数据库内写入登录信息**。开发者可在此自定义控制用户的登录流程，实现在特定时间段禁止用户登录，阻止可疑 IP 登录等功能。    |
| 认证后           | 在每次用户完成认证之后触发，**此时已经在数据库内写入登录信息**。开发者可在此获取并自定义扩展用户的登录信息，实现将用户位置信息写入 Metadata，使用 ui-avatars 生成用户头像等功能。    |
| OIDC ID Token 签发前          | OIDC 应用签发 ID Token 之前触发（**只在授权码模式、隐式模式、密码模式下触发**）。开发者可在此向 ID Token 中写入自定义字段。           |
| OIDC Access Token 签发前      | OIDC 应用签发 Access Token 之前触发。开发者可在此向 Access Token 中写入自定义字段。                   |

::: hint-danger
请勿在「注册后」和「认证后」两个场景中断正常认证流程，否则会导致数据库数据和返回结果不一致，从而出现不可预料的错误！
:::

::: hint-info
在 OIDC 认证流程中，授权码模式、隐式模式、密码模式和编程访问账号模式都会签发 Access Token，并触发对应的 Pipeline 函数。

当使用编程访问账号进行认证时，不会签发 OIDC ID Token，对应的 Pipeline 函数也不会触发。
:::

::: hint-info
OIDC 应用使用授权码换取 ID Token 和 Access Token 的详细过程请参见：[使用 OIDC 授权](/federation/oidc/authorization-code/?step=2)。

OIDC 编程访问账号使用 Client ID 和 Client Secret 换取 Access Token 的详细过程请参见：[M2M 授权](/v2/guides/authorization/m2m-authz.html)
:::

## 函数定义 <a id="definition"></a>

Pipeline 函数定义：

```js
async function pipe(user, context, callback)
```

参数说明：

| 参数     | 类型     | 说明                                                             |
| :------- | :------- | :--------------------------------------------------------------- |
| user     | object   | 当前请求用户。详细说明请见 [user 对象](user-object.md)。         |
| context  | object   | 请求认证上下文。详细说明请见 [context 对象](context-object.md)。 |
| callback | function | 回调函数，使用文档见下文。                                       |

::: hint-danger
请勿重命名 pipe 函数！
:::

::: hint-success
注册前触发的 Pipeline 函数的 user 参数为空，因为此时用户对象还没有生成。

当使用编程访问账号进行认证时，OIDC Access Token 签发前触发的 Pipeline 函数的 user 参数为空，因为编程访问账号不存在用户的概念。

:::

::: hint-success
pipe 函数支持 async / await 语法！
:::
### callback 函数 <a id="callback"></a>

定义：

```js
function callback(error, user, context)
```

当你的 Pipeline 函数完成了所需处理，需要向 {{$localeConfig.brandName}} 的后端返回数据，或是需要中断认证流程时，都需要在代码返回前调用 callback 函数。

参数说明：

| 参数      | 类型      | 说明                                                                        |
| :------- | :------- | :-------------------------------------------------------------------------  |
| error    | object   | 错误对象。**如果不为 null，整个认证流程将会中断，直接返回错误给前端。**               |
| user     | object   | 作为返回值的用户对象，其值将会被后端利用，同时用作下一个 Pipeline 函数的参数。         |
| context  | object   | 作为返回值的上下文对象，其值将会被后端利用，同时用作下一个 Pipeline 函数的参数。       |

::: hint-danger
如果 error 参数不为 null ，请务必将最新的 user 和 context 传给 callback 函数，否则之后的 Pipeline 函数将无法正常工作。
:::

### 设置异步执行 <a id="async"></a>

设置为异步执行（ **这里的异步非语言层面上** ）的 pipeline 函数不会阻塞注册、登录、OIDC 流程的执行，callback 函数传入的参数对后续流程无影响，适用于进行异步通知的场景，比如飞书群通知、钉钉群通知、触发外部系统统计等。

如下图所示，勾选上此框表示让该 pipeline 函数异步执行：

![](https://cdn.authing.cn/blog/20200927195654.png)

## Pipeline 函数示例 <a id="demo"></a>

这里我们实现一个注册邮箱后缀白名单的 **Pre-Register Pipeline**。

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

简要解释一下代码：

- 2-6 行判断请求参数中是否包含 email, 如果有的话说明是邮箱注册方式。如果没有，直接跳过此 pipe 函数，调用 callback 的参数分别为 null 和 context（**请勿忘记此参数！**）。当然，如果你只是希望邮箱方式注册，这一步如果没有邮箱返回错误也是可以的 ～
- 8-10 行判断邮箱域名是否为`example.com`，如果不是调用 callback 函数，第一个参数为 `new Error('Access Denied.')`。
- 11 行，调用 `return callback(null, context)`，接着进入下一个 pipe 函数，如果有的话。
