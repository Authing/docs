


 埃梅里亚
 [#](#emelia "永久链接")
=======================================



[埃梅里亚](https://emelia.io) 
 是一种冷邮寄工具。
 




 资格证书
 



 您可以找到此节点的身份验证信息
 [此处]（/integrations/builtin/credential/emelia/）
 .
 




 基本操作
 [#](#基本操作 "永久链接")
-----------------------------------------------------------


*活动
	+添加联系人
	+创建
	+获取
	+全部获取（Get All）
	+暂停
	+开始
*联系人列表
	+添加
	+全部获取（Get All）



 示例用法
 [#](#示例用法 "永久链接")
-----------------------------------------------------



 此工作流允许您创建活动、添加联系人和从埃梅里亚获取活动。您还可以找到
 [工作流](https://n8n.io/workflows/961) 
 此示例使用工作流使用以下节点。
-
 [Start]（/integrations/builtin/core nodes/n8n nodes base.Start/）
 -
 Emelia




 最终的工作流应如下图所示。
 



![具有Emelia节点的工作流](https://d33wubrfki0l68.cloudfront.net/1731d780e774241362d177b845a102afde1e8192/d8f9a/_images/integrations/builtin/app-nodes/emelia/workflow.png)



### 
 1. 开始节点
 [#](#1-start-node "永久链接")



 创建新工作流时，默认情况下“开始”节点存在。
 


### 
 2. Emelia节点（活动：创建）
 [#](#2-emelia-node-campaign-create "永久链接")



 此节点将在Emelia创建新活动。
 


1. 首先，您必须输入Emelia节点的凭据。你可以知道怎么做
 [此处]（/integrations/builtin/credential/emelia/）
 .
2. 从
 ***操作***
 下拉列表。
3. 在
 ***活动名称***
 领域
4. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您将注意到该节点创建了一个新的活动。
 



![使用Emelia节点创建新活动](https://d33wubrfki0l68.cloudfront.net/10edffb78858178d93c22f57907eff9cc493d0d5/b6aa6/_images/integrations/builtin/app-nodes/emelia/emelia_node.png)



### 
 3. Emelia1节点（活动：addContact）
 [#](#3-emelia1-node-campaign-addcontact "永久链接")



 此节点将向我们在上一节点中创建的活动添加联系人。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 从
 ***活动ID***
 下拉列表。
4. 在
 ***联系人电子邮件***
 领域
5. 单击
 ***添加字段***
 按钮，然后选择“名字”。
6. 在
 ***名字***
 领域
7. 单击
 ***执行节点***
 以运行节点。



 在下面的截图中，您将注意到该节点将联系人添加到我们在上一个节点中创建的活动中。
 



![使用Emelia节点向活动添加联系人](https://d33wubrfki0l68.cloudfront.net/edbbe397a985f8d99d54076382646d00d16c48c8/3f35f/_images/integrations/builtin/app-nodes/emelia/emelia1_node.png)



### 
 4. Emelia2节点（活动：获取）
 [#](#4-emelia2-node-campaign-get "永久链接")



 此节点将获取有关我们先前创建的活动的信息。
 


1. 选择在上一个节点中输入的凭据。
2. 从
 ***操作***
 下拉列表。
3. 单击
 ***活动ID***
 字段并单击
 ***添加表达式***
 .
4. 在
 ***变量选择器***
 部分：节点>Emelia>输出数据>JSON>\_id。还可以添加以下表达式：
 `｛｛$node[“Emelia”].json[“_id”]｝｝`
 .
5. 单击
 ***执行节点***
 以运行节点。



 在下面的屏幕截图中，您会注意到该节点返回了活动的信息。
 



![使用Emelia节点返回活动信息](https://d33wubrfki0l68.cloudfront.net/778c01cb4addc7bd118f0086e52f4aabf14d143e/0378f/_images/integrations/builtin/app-nodes/emelia/emelia2_node.png)





