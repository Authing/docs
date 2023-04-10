# SWITCH

想象这样的场景：从 Authing 用户目录拉取用户，当用户最近 6 个月未登录时，自动禁用账号；当最近一年未登录时，自动归档账号；否则不做任何操作。或者是当用户的账户级别为普通用户时、为 VIP、为超级 VIP 时，分别发送不同的邮件。要实现这样满足什么条件时走什么分支的场景，都需要用到 SWITCH 节点。

Authing 身份自动化的 SWITCH 节点允许你配置非常灵活的可视化判断规则，当满足条件 A 时，执行分支 A；满足条件 B 时，执行分支 B；否则默认走其他分支。

# SWITCH 节点支持的判断表达式

Authing 身份自动化的 SWITCH 支持下面几种非常灵活的判断表达式，你可以根据自己的具体场景选择合适的模式。

## 可视化配置

使用这种模式，可以配置非常灵活的 AND、OR 逻辑，同时支持条件组。先在<strong>设置运行变量</strong>中添加变量，值可以装配之前任意节点的数据；设置的变量可以在<strong>设置条件</strong>的表达式模块中引用（在变量前加一个 $ 符号）。

在<strong>设置</strong><strong>条件</strong><strong>分支组</strong>处：可以分别设置每个分支的满足条件，每个分组的名称和 SWITCH 分支名称对应。

![](../static/boxcn7337DR8mL5bhw00I4PRIHc.png)

每个分支的条件可以支持嵌套的筛选条件，如下图所示，表示当 $value1 为 true 或者 $value2 和 $value3 全部为 true 的时候，走 case_44b8e 分支。

![](../static/boxcnxfRiAgq0I0Pl6VMXhwFsXg.png)

## 自定义代码模式

使用这种模式，可以编写任意的逻辑，以下面的代码为例：当 value1 为 1 时，走 case_1 分支，为 2 时走 case_2 分支，否则走 default 默认分支。

```typescript
// 假如你在上面的数据中定义了一个变量 data，你可以在此通过 data 引用此数据。
// 此 JS 沙箱环境支持 Node.js 14 版本，支持 async/await 语法。
// 如果此代码有返回值，你需要使用 return 返回对应的返回值。

if (value1 === 1) {
  return "case_1"
} else if (value1 === 2) {
  return "case_2"
} else {
  return "default"
}
```
