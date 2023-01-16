


 Tapfiliate的的
 [#](#tapfiliate "永久链接")
===============================================



[Tapfiliate](https://tapfiliate.com) 
 允许您创建、跟踪和发展您的联盟营销计划。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/tapfiliate/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*附属公司
	+创建附属公司
	+删除关联公司
	+通过ID获取联盟
	+获取所有关联方
*关联元数据
	+向分支机构添加元数据
	+从关联中删除元数据
	+更新关联方的元数据
*计划关联方
	+将联盟添加到计划
	+批准计划的附属机构
	+不批准附属公司
	+获取计划中的会员
	+获取计划中的所有关联方



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您创建联盟，添加元数据，并将联盟添加到计划中。您还可以找到
 [工作流](https://n8n.io/workflows/936) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Tapfiliate




 最终的工作流应如下图所示。
 



![具有Tapfiliate节点的工作流](https://d33wubrfki0l68.cloudfront.net/35e61675ae0b037dbcc4babf682b272d12010653/8bd24/_images/integrations/builtin/app-nodes/tapfiliate/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. Tapfiliate节点（创建：分支）
 [#](#2-tapfiliate-node-createaffiliate "永久链接")



 此节点将在Tapfiliate中创建分支机构。
 


1. 首先，您必须输入Tapfiliate节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/tapfiliate/）
 .
2. 在
 ***电子邮件***
 领域
3. 在
 ***名字***
 领域
4. 在
 ***姓氏***
 领域
5. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您会注意到该节点在Tapfiliate中创建了一个分支。
 



![使用Tapfiliate节点创建新的分支机构](https://d33wubrfki0l68.cloudfront.net/adf630e55f0befc4eb18f2db5e656b44a95e3b4e/1c42f/_images/integrations/builtin/app-nodes/tapfiliate/tapfiliate_node.png)



### 
 3. Tapfiliate1节点（添加：affiliateMetadata）
 [#](#3-tapfiliate1-node-addafiliatetadata "永久链接")



 此节点将向我们使用上一个节点创建的分支添加元数据。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 单击
 ***关联方ID***
 字段并单击
 ***添加表达式***
 .
5. 在
 ***变量选择器***
 部分：当前节点>输入数据>JSON>id。您还可以添加以下表达式：
 `｛｛$json[“id”]｝｝`
 .
6. 单击
 ***添加元数据***
 按钮
7. 输入
 `标记`
 在
 ***密钥***
 字段。
8. 输入
 `n8n`
 在
 ***价值***
 领域
9. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点将元数据添加到我们使用上一个节点创建的分支。
 



![使用Tapfiliate节点添加元数据](https://d33wubrfki0l68.cloudfront.net/7f97016f93ff50425354b00a1aba97c43f358d39/93697/_images/integrations/builtin/app-nodes/tapfiliate/tapfiliate1_node.png)



### 
 4. Tapfiliate2节点（获取：联系人）
 [#](#4-tapfiliate2-node-getcontact "永久链接")



 该节点将把我们用Tapfiliate节点创建的联盟添加到联盟计划中。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***资源***
 下拉列表。
3. 从
 ***操作***
 下拉列表。
4. 从
 ***程序ID***
 下拉列表。
5. 单击
 ***关联方ID***
 字段并单击
 ***添加表达式***
 .
6. 在
 ***变量选择器***
 section:Nodes>Tapfiliate>Output Data>JSON>id。您还可以添加以下表达式：
 `｛｛$node[“Tapfiliate”].json[“id”]｝｝`
 .
7. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点将分支添加到程序中。
 



![使用Tapfiliate节点向计划添加分支机构](https://d33wubrfki0l68.cloudfront.net/a8208153844a2f2a4e72409cfd42fed6ac84519d/594f0/_images/integrations/builtin/app-nodes/tapfiliate/tapfiliate2_node.png)





