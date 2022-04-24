# How To Debug

This article describes how to use the Approw console to debug Pipeline functions.

In the previous step, we have [created the first Pipeline function](https://docs.authing.cn/v2/guides/pipeline/write-your-first-pipeline-function.html), and at the same time review the function code as:

```js
async function pipe(context, callback) {
  const email = context.data.userInfo.email;
  // 非邮箱注册方式
  if (!email) {
    return callback(null, context);
  }
  if (!email.endsWith("example.com")) {
    return callback(new Error("Access denied."));
  }
  return callback(null, context);
}
```


The function of the Pipeline function is to only allow the [example.com](http://example.com/)registration of mailboxes with thedomain name suffix.

Click the debug button of the Pipeline function:

![](RackMultipart20210320-4-2kprvl_html_845b7f9e9b0056f1.png)

Click this button to open the debugging window: Approw will produce corresponding test data **based on your user pool**.

![](RackMultipart20210320-4-2kprvl_html_21f8b1f1639ba0b7.png)

**Notes that the data.userInfo.emailis**** xxxxxx@example.com ****.**

Click the &quot;Debug&quot; button: the debug result is output below, and we get the latest context object, indicating that this mailbox has passed the Pipeline function.

![](RackMultipart20210320-4-2kprvl_html_86bc29a55b39c300.png)

We then changed the email suffix to qq.com, and we got the corresponding error message in the output area.

![](RackMultipart20210320-4-2kprvl_html_ae4c445ff33422af.png)

## **View logs**

Need to use global Approw Pipeline built-in functionlogto view the running log, notconsole.log!

Use the function editor to modify the code and add a line at the beginning of the function: Note that it is log instead of console.log.

| Plain%20Textlog(context); |
| --- |

![](RackMultipart20210320-4-2kprvl_html_3d491181cdf494b1.png)

Click &quot;Debug&quot; again to see the output log.

![](RackMultipart20210320-4-2kprvl_html_d852a53d53dc23.png)

If there is no log output, please try again!

## **Catch syntax errors**

If your function has a syntax error, Approw Pipeline can also catch it. Here we modify the code and add a line of xxxxxxx at the beginning of the pipe function:

![](RackMultipart20210320-4-2kprvl_html_946314e6519ba3eb.png)

Click again debugging, you can see the corresponding error message:message: &quot;xxxxxxx is not defined&quot;.

![](RackMultipart20210320-4-2kprvl_html_3d2fc08dfc663ce0.png)

We recommend using a debugger to debug the code first, and then post the function online.