---
meta:
  - name: description
    content: 常见问题
---

# Pipeline 常见问题

<LastUpdated/>

#### Q: Pipeline 函数支持  async await 语法吗？

A: 支持。

#### Q: Pipeline 函数中可以使用 {{$localeConfig.brandName}} SDK 吗？

A: 可以，且无需导入和初始化。详情请见[可用的  Node Modules](available-node-modules.md)。

#### Q: 我能用其他语言编写 Pipeline 函数吗？

A: 暂时不能，当前仅支持 Node 语言。

#### Q: 编写 Pipeline 函数有哪些注意事项？

A: 

* 请不要重命名 pipe 函数。

* 推荐不要硬编码，使用[环境变量](env.md)来存放常量值。

#### Q: 刷新用户池  secret 对 Pipeline 函数有何影响？

A: 由于 {{$localeConfig.brandName}} Pipeline 函数完全运行在云端，所以刷新用户池 secret 会同时更新用户池内所有的 Pipeline 函数。这意味着在一小段时间之内 Pipeline 函数中将无法正常使用 authing-js-sdk。

#### Q: 有哪些性能优化方法？

A: 如果是和 pipeline 流程不直接相关的函数，如新用户注册通知等，可以[设置为异步执行](pipeline-function-api-doc.md#设置异步执行)。

