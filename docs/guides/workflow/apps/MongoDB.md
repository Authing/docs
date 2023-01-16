


 MongoDB数据库数据库
 [#](#mongodb "永久链接")
=========================================



[MongoDB](https://www.mongodb.com/) 
 是由MongoDB股份有限公司开发的一个跨平台面向文档的数据库程序。它被归类为NoSQL数据库程序。MongoDB使用具有可选模式的类似JSON的文档。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/mongodb/）
 .
 




 操作
 [#](#操作 "永久链接")
-----------------------------------------------


*聚合文档
*删除文档
*查找文档
*查找和替换文档
*查找和更新文档
*插入文档
*更新文档



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您将文档插入MongoDB集合。您还可以找到
 [工作流](https://n8n.io/workflows/503) 
 在网站上。此示例使用工作流将使用以下三个节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 [Set]（/integrations/builtin/core nodes/n8n nodes base.Set/）
 -
 MongoDB




 最终的工作流应如下图所示。
 



![使用MongoDB节点的工作流](https://d33wubrfki0l68.cloudfront.net/6305bcd5da2cd4829e6665c12d936fa965f033a9/50968/_images/integrations/builtin/app-nodes/mongodb/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. 设置节点
 [#](#2-集-节点 "永久链接")


1. 单击
 *增加价值*
 按钮，然后从下拉列表中选择“字符串”。
2. 输入
 `我的密钥（_K）`
 在
 *姓名*
 领域
3. 输入
 `我的值（_V）`
 在
 *价值*
 领域


### 
 3. MongoDB节点
 [#](#3-mongodb-node "永久链接")


1. 首先，您必须输入MongoDB节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/mongodb/）
 .
2. 从
 *操作*
 下拉列表。
3. 在
 *集合*
 领域
4. 输入
 `我的密钥（_K）`
 在
 *字段*
 领域
5. 单击
 *执行节点*
 以运行工作流。




