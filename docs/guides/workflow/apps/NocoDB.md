


 NocoDB公司
 [#](#nocodb "永久链接")
=======================================



[诺科数据库](https://www.nocodb.com/) 
 是开源的Airtable替代方案。它通过连接到任何关系数据库并将其转换为电子表格界面来工作。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credentials/nocodb/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*行
	+创建一行
	+删除一行
	+检索所有行
	+检索一行
	+更新一行



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您获取表中的所有行。
此示例工作流使用以下两个节点。
 


*[Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
*NocoDB公司



 最终的工作流应如下图所示。
 



![具有NocoDB节点的工作流](https://d33wubrfki0l68.cloudfront.net/e5b30c5ef7770db1aadacbd5f6e045227800a266/5bfe3/_images/integrations/builtin/app-nodes/nocodb/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下会存在开始节点。
 


### 
 2. NocoDB节点
 [#](#2-nocodb-node "永久链接")


1. 首先输入NocoDB节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credentials/nocodb/）
 .
2. 选择项目使用的NocoDB版本。
3
 **行资源**
 默认选中。
4. 选择
 **全部获取**
 来自
 **操作**
 下拉列表。
5. 进入NocoDB
 **项目名称**
 。（旧版本的项目ID）
6. 输入目标的名称
 **表**
 .
7. 单击
 **执行节点**
 以运行工作流。



![NocoDB节点](https://d33wubrfki0l68.cloudfront.net/73b7463c7ed865d23ae0de93c54b236c8477e172/6a8a0/_images/integrations/builtin/app-nodes/nocodb/nocodb_node.png)





