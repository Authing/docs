


 Microsoft SQL
 [#](#microsoft sql "永久链接")
=====================================================



[Microsoft SQL]（Microsoft SQL）(https://www.microsoft.com/en-us/sql-server) 
 是一个关系数据库管理系统。作为数据库服务器，它是一种软件产品，其主要功能是存储和检索其他软件应用程序请求的数据，这些应用程序可以在同一台计算机上运行，也可以在网络上的另一台计算机中运行。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/microsoftsql/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*执行SQL查询
*在数据库中插入行
*更新数据库中的行
*删除数据库中的行



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您在Microsoft SQL中执行SQL查询。您还可以找到
 [工作流](https://n8n.io/workflows/479) 
 在网站上。此示例使用工作流将使用以下两个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Microsoft SQL




 最终的工作流应如下图所示。
 



![使用Microsoft SQL节点的工作流](https://d33wubrfki0l68.cloudfront.net/2855e377ebe2443c070012519c06404a92235e73/98179/_images/integrations/builtin/app-nodes/microsoftsql/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. Microsoft SQL节点
 [#](#2-microsoft-sql-node "永久链接")


1. 首先，您必须输入Microsoft SQL节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/microsoftsql/）
 .
2. 从
 *操作*
 下拉列表。
3. 在
 *查询*
 领域
4. 单击
 *执行节点*
 以运行工作流。




