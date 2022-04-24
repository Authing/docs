---
meta:
  - name: description
    content: 如何调试
---

# 如何调试

<LastUpdated/>

本文讲述如何使用 {{$localeConfig.brandName}} 控制台调试 Pipeline 函数。

在上一步，我们已经[创建了第一个 Pipeline 函数](./write-your-first-pipeline-function.md)，同时回顾一下该函数代码为：

![](~@imagesZhCn/pipeline/1.png)

该 Pipeline 函数的作用是只允许域名后缀为`example.com`的邮箱注册。

点击 Pipeline 函数的 debug 按钮：

![](~@imagesZhCn/pipeline/2.png)

点击此按钮打开调试窗口：{{$localeConfig.brandName}} 会**根据你的用户池**生产相对应的测试数据。

![](~@imagesZhCn/pipeline/5.png)

![](~@imagesZhCn/pipeline/4.png)

## 查看 log 日志

::: hint-warning
需要使用 {{$localeConfig.brandName}} Pipeline 全局内置函数 `log` 才能查看到运行日志，不是 `console.log` !
:::

使用函数编辑器内修改代码，在函数最前面加入一行 : 注意是 log 而非 console.log 。

```js
log(context);
```

![](~@imagesZhCn/pipeline/6.png)

::: hint-info
如果没有日志输出，请重试几次！
:::

::: hint-info
我们推荐先用调试器调试代码通过之后再将此函数发布到线上。
:::
