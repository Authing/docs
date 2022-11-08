# 完全使用自定义数据库保存用户数据

<LastUpdated/>


<!-- ::: hint-warning
只有**企业版**用户能够使用连接自定义数据库功能，详情请见 [https://authing.cn/pricing](https://authing.cn/pricing)。如果你想试用，请联系 <a href="mailto:csm@authing.cn">Authing 售后服务人员</a>。
::: -->

## 迁移流程

使用这种模式时，用户数据始终保存在你的数据库中，Authing 永远不会保存你的用户数据。为了让系统正常工作，你需要实现完整的用户增删改查脚本。

## 配置脚本

你需要在[Authing 控制台](https://console.authing.cn/console/userpool)，**连接身份源** - **自定义数据库** 页面编写**登录**、**查找用户**、**创建用户**、**更新用户资料**、**删除用户**、**获取用户列表**、**验证密码** 脚本，详情请见：

- [编写登录脚本](./configuration/#编写数据库操作脚本)。
- [编写查找用户脚本](./configuration/#编写数据库操作脚本)。
- [编写创建用户脚本](./configuration/#编写数据库操作脚本)。
- [编写更新用户资料脚本](./configuration/#编写数据库操作脚本)。
- [编写删除用户脚本](./configuration/#编写数据库操作脚本)。
- [编写获取用户列表脚本](./configuration/#编写数据库操作脚本)。
- [编写验证密码脚本](./configuration/#编写数据库操作脚本)。
