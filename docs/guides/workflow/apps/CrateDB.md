


 板条箱DB
 [#](#cratedb "永久链接")
=========================================



[板条箱](https://crate.io/) 
 是一个开源的分布式SQL数据库管理系统，它基于无共享架构集成了一个完全可搜索的面向文档的数据存储，并设计为具有高可扩展性。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/cratedb/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*执行SQL查询
*在数据库中插入行
*更新数据库中的行



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在板条箱DB中创建表并将数据插入其中。您还可以找到
 [工作流](https://n8n.io/workflows/597) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 [Set]（/integrations/builtin/core nodes/n8n nodes base.Set/）
 -
 CrateDB




 最终的工作流应如下图所示。
 



![具有CrateDB节点的工作流](https://d33wubrfki0l68.cloudfront.net/e13287d1efc719dc210f6c756aada1f5f605b55e/4cd20/_images/integrations/builtin/app-nodes/cratedb/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. CrateDB节点（执行查询）
 [#](#2-cratedb-node-execute-query "永久链接")


1. 首先，您必须输入CrateDB节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/cratedb/）
 .
2. 从
 ***操作***
 下拉列表。
3. 在
 ***查询***
 字段：
 `CREATE TABLE测试（id INT，名称STRING）；`
 .
4. 单击
 ***节点***
 选项卡和切换
 ***始终输出数据***
 为真。
5. 单击
 ***执行节点***
 以运行节点。



![使用CreateDB节点创建表](https://d33wubrfki0l68.cloudfront.net/c71f50e2000674ba4d704d61010e86f517e5a246/9d928/_images/integrations/builtin/app-nodes/cratedb/cratedb_node.png)



### 
 3. 设置节点
 [#](#3-集-节点 "永久链接")


1. 单击
 ***添加值***
 按钮，然后从下拉列表中选择“数字”。
2. 输入
 `id `
 在
 ***姓名***
 领域
3. 单击
 ***添加值***
 按钮，然后从下拉列表中选择“字符串”。
4. 输入
 `名称`
 在
 ***姓名***
 领域
5. 在
 ***价值***
 领域
6. 单击
 ***执行节点***
 以运行节点。



![使用Set节点设置要由CrateDB节点插入的数据](https://d33wubrfki0l68.cloudfront.net/ba73a04a2505545869a1233b8159fc06f44b23b7/6af44/_images/integrations/builtin/app-nodes/cratedb/set_node.png)



### 
 4. CrateB1节点（插入）
 [#](#4-ratedb1-node-insert "永久链接")


1. 选择在上一个CrateDB节点中输入的凭据。
2. 输入
 `测试`
 在
 ***表***
 领域
3. 输入
 `id，名称`
 在
 ***列***
 领域
4. 单击
 ***执行节点***
 以运行节点。



![使用CrateDB节点将数据插入表](https://d33wubrfki0l68.cloudfront.net/2ac7a2e6bcfc4111575cf565cff1f0ec6d9c6f90/e3b70/_images/integrations/builtin/app-nodes/cratedb/cratedb1_node.png)




 常见问题解答
 [#](#faqs "永久链接")
-----------------------------------


### 
 如何指定列的数据类型？
 [#](#如何指定列 "永久链接"的数据类型)



 要指定列的数据类型，请使用
 `：类型`
 哪里
 `类型`
 是该列的数据类型。例如，如果要指定类型
 `整数`
 对于柱
 *编号*
 和类型
 `文本`
 对于柱
 *姓名*
 ，可以在
 ***列***
 字段：
 `id:init，name:text`
 .
 




