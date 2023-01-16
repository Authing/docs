


 MySQL数据库数据库
 [#](#mysql "永久链接")
=====================================



[MySQL](https://www.mysql.com/) 
 是一个开源的关系数据库管理系统。MySQL有独立的客户端，允许用户使用SQL直接与MySQL数据库交互，但MySQL通常与其他程序一起使用，以实现需要关系数据库功能的应用程序。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/mysql/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*执行SQL查询。
*在数据库中插入行。
*更新数据库中的行



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在MySQL数据库上创建表并在其中插入数据。您还可以找到
 [工作流](https://n8n.io/workflows/598) 
 此示例使用工作流将使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 [Set]（/integrations/builtin/core nodes/n8n nodes base.Set/）
 -
 MySQL




 最终的工作流应如下图所示。
 



![具有MySQL节点的工作流](https://d33wubrfki0l68.cloudfront.net/a5d528ed063e6bca3b33b0861fdadab9c153feaa/17591/_images/integrations/builtin/app-nodes/mysql/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. MySQL节点（执行查询）
 [#](#2-mysql-node-execute-query "永久链接")


1. 首先，您必须输入MySQL节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/mysql/）
 .
2. 从
 ***操作***
 下拉列表。
3. 在
 ***查询***
 字段：
 `CREATE TABLE测试（id INT，名称VARCHAR（255），PRIMARY KEY（id））；`
 .
4. 单击
 ***执行节点***
 以运行节点。



![使用MySQL节点创建表](https://d33wubrfki0l68.cloudfront.net/c1e27e478b97f09277449479ab817ee434283b28/68d3b/_images/integrations/builtin/app-nodes/mysql/mysql_node.png)



### 
 3. 设置节点
 [#](#3-集-节点 "永久链接")


1. 设置
 ***仅保留集合***
 切换为true。
2. 单击
 ***添加值***
 按钮，然后从下拉列表中选择“数字”。
3. 输入
 `id `
 在
 ***姓名***
 领域
4. 单击
 ***添加值***
 按钮，然后从下拉列表中选择“字符串”。
5. 输入
 `名称`
 在
 ***姓名***
 领域
6. 在
 ***价值***
 领域
7. 单击
 ***执行节点***
 以运行节点。



![使用Set节点设置MySQL节点要插入的数据](https://d33wubrfki0l68.cloudfront.net/0fda8755bb2ab361822736fd1c1277b9cf65573c/1956b/_images/integrations/builtin/app-nodes/mysql/set_node.png)



### 
 4. MySQL1节点（插入）
 [#](#4-mysql1-node-insert "永久链接")


1. 选择在上一个MySQL节点中输入的凭据。
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



![使用MySQL节点将数据插入表](https://d33wubrfki0l68.cloudfront.net/555110a16203708002e79d7bf4bfda84a2e482af/096a7/_images/integrations/builtin/app-nodes/mysql/mysql1_node.png)





