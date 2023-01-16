


 任务数据库
 [#](#questdb "永久链接")
=========================================



[任务数据库](https://questdb.io/) 
 是一个开源的NewSQL关系数据库，旨在更快地处理时间序列数据。任务数据库的堆栈是从头开始设计的，没有GC Java和依赖关系。它支持Java API、通过HTTP的SQL和PostgreSQL有线协议。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/questdb/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*执行SQL查询。
*在数据库中插入行。



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在QuestDB中创建表并将数据插入其中。您还可以找到
 [工作流](https://n8n.io/workflows/592) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 [Set]（/integrations/builtin/core nodes/n8n nodes base.Set/）
 -
 QuestDB




 最终的工作流应如下图所示。
 



![具有QuestDB节点的工作流](https://d33wubrfki0l68.cloudfront.net/3806b8bfe7f831a5f86a0f6ad16bbfd92f91e586/657ff/_images/integrations/builtin/app-nodes/questdb/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. QuestDB节点（执行查询）
 [#](#2-questdb-node-execute-query "永久链接")


1. 首先，您必须输入QuestDB节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/questdb/）
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



![使用QuestDB节点创建表](https://d33wubrfki0l68.cloudfront.net/ec34cdd0d1a1161427ed10a2ce609e5ec676789e/6c525/_images/integrations/builtin/app-nodes/questdb/questdb_node.png)



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
 字段。
6. 单击
 ***执行节点***
 以运行节点。



![使用Set节点设置要由QuestDB节点插入的数据](https://d33wubrfki0l68.cloudfront.net/abac4ca44c9315798ef6b8a8ffecf0123a7177c3/9b50a/_images/integrations/builtin/app-nodes/questdb/set_node.png)



### 
 4. QuestDB1节点（插入）
 [#](#4-questdb1-node-insert "永久链接")


1. 选择在上一个QuestDB节点中输入的凭据。
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



![使用QuestDB节点将数据插入表](https://d33wubrfki0l68.cloudfront.net/0b9feef762ea827b1718ee1163172421fd31e13e/1209b/_images/integrations/builtin/app-nodes/questdb/questdb1_node.png)




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
 




